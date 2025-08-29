import type { APIRoute } from 'astro';
import { Resend } from 'resend';
import {
  apiLogger,
  logRequest,
  logResponse,
  logError,
  logEmailEvent,
  logSecurityEvent,
  logPerformance,
} from '../../lib/logger';

// Initialize Resend client (only if API key is available)
const resend = (import.meta as any).env.RESEND_API_KEY
  ? new Resend((import.meta as any).env.RESEND_API_KEY)
  : null;

// Form validation types
interface FormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  consent: string;
}

interface ValidationErrors {
  name?: string;
  email?: string;
  phone?: string;
  subject?: string;
  message?: string;
  consent?: string;
  attachment?: string;
}

// Validation functions
function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validatePhone(phone: string): boolean {
  if (!phone) return true; // Optional field
  const phoneRegex = /^[+]?[1-9][\d]{0,15}$/;
  return phoneRegex.test(phone.replace(/[\s\-()]/g, ''));
}

function validateFormData(data: FormData): ValidationErrors {
  const errors: ValidationErrors = {};

  // Name validation
  if (!data.name || data.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters long';
  }

  // Email validation
  if (!data.email) {
    errors.email = 'Email is required';
  } else if (!validateEmail(data.email)) {
    errors.email = 'Please enter a valid email address';
  }

  // Phone validation (optional)
  if (data.phone && !validatePhone(data.phone)) {
    errors.phone = 'Please enter a valid phone number';
  }

  // Subject validation
  if (!data.subject || data.subject === '') {
    errors.subject = 'Please select a subject';
  }

  // Message validation
  if (!data.message || data.message.trim().length < 10) {
    errors.message = 'Message must be at least 10 characters long';
  }

  // Consent validation
  if (!data.consent) {
    errors.consent = 'You must agree to the terms and conditions';
  }

  return errors;
}

// File validation
function validateFile(file: any | null): string | null {
  if (!file) return null; // Optional field

  const maxSize = 5 * 1024 * 1024; // 5MB
  const allowedTypes = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'text/plain',
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/gif',
  ];

  if (file.size > maxSize) {
    return 'File size must be less than 5MB';
  }

  if (!allowedTypes.includes(file.type)) {
    return 'File type not allowed. Please upload PDF, DOC, DOCX, TXT, JPG, JPEG, PNG, or GIF files';
  }

  return null;
}

export const POST: APIRoute = async ({ request }) => {
  const startTime = Date.now();

  try {
    // Log incoming request
    logRequest(request, startTime);

    const formData = await request.formData();

    // Extract form data
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const subject = formData.get('subject') as string;
    const message = formData.get('message') as string;
    const consent = formData.get('consent') as string;
    const attachment = formData.get('attachment') as any | null;

    // Log form submission attempt
    apiLogger.info({
      msg: 'Contact form submission attempt',
      email: email ? `${email.substring(0, 3)}***@${email.split('@')[1]}` : 'missing', // Mask email for privacy
      subject,
      hasAttachment: !!attachment,
      attachmentSize: attachment?.size || 0,
    });

    // Validate form data
    const formDataObj: FormData = {
      name,
      email,
      phone,
      subject,
      message,
      consent,
    };

    const errors = validateFormData(formDataObj);
    const fileError = validateFile(attachment);

    if (fileError) {
      errors.attachment = fileError;
    }

    // If there are validation errors, log and return them
    if (Object.keys(errors).length > 0) {
      apiLogger.warn({
        msg: 'Contact form validation failed',
        errors: Object.keys(errors),
        email: email ? `${email.substring(0, 3)}***@${email.split('@')[1]}` : 'missing',
      });

      const response = new Response(
        JSON.stringify({
          success: false,
          errors,
          data: formDataObj,
        }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      logResponse(request, response, startTime);
      return response;
    }

    // Log successful validation
    apiLogger.info({
      msg: 'Contact form validation passed',
      email: email ? `${email.substring(0, 3)}***@${email.split('@')[1]}` : 'missing',
      subject,
    });

    // Prepare email content
    const subjectOptions = {
      general: 'General Inquiry',
      support: 'Technical Support',
      partnership: 'Partnership Opportunity',
      feedback: 'Feedback & Suggestions',
      other: 'Other',
    };

    const emailSubject = `Contact Form: ${subjectOptions[subject as keyof typeof subjectOptions] || subject}`;

    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1f2937; margin-bottom: 20px;">New Contact Form Submission</h2>
        
        <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <h3 style="color: #374151; margin-top: 0;">Contact Information</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          ${phone ? `<p><strong>Phone:</strong> <a href="tel:${phone}">${phone}</a></p>` : ''}
          <p><strong>Subject:</strong> ${subjectOptions[subject as keyof typeof subjectOptions] || subject}</p>
        </div>
        
        <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px;">
          <h3 style="color: #374151; margin-top: 0;">Message</h3>
          <p style="white-space: pre-wrap; line-height: 1.6;">${message}</p>
        </div>
        
        ${
          attachment
            ? `
          <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin-top: 20px;">
            <h3 style="color: #374151; margin-top: 0;">Attachment</h3>
            <p><strong>File:</strong> ${attachment.name}</p>
            <p><strong>Size:</strong> ${(attachment.size / 1024 / 1024).toFixed(2)} MB</p>
            <p><strong>Type:</strong> ${attachment.type}</p>
          </div>
        `
            : ''
        }
        
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
          <p style="color: #6b7280; font-size: 14px;">
            This message was sent from the contact form on your website.
          </p>
        </div>
      </div>
    `;

    // Log email sending attempt
    logEmailEvent('sending', {
      to: (import.meta as any).env.TO_EMAIL || 'hello@example.com',
      subject: emailSubject,
      hasAttachment: !!attachment,
    });

    const emailStartTime = Date.now();

    // Send email using Resend
    if (!resend) {
      logError(new Error('Resend API key not configured'), {
        context: 'email_send',
        email: email ? `${email.substring(0, 3)}***@${email.split('@')[1]}` : 'missing',
      });

      const response = new Response(
        JSON.stringify({
          success: false,
          error: 'Email service not configured. Please try again later.',
        }),
        {
          status: 500,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      logResponse(request, response, startTime);
      return response;
    }

    const { data: emailData, error: emailError } = await resend.emails.send({
      from: (import.meta as any).env.FROM_EMAIL || 'noreply@yourdomain.com',
      to: (import.meta as any).env.TO_EMAIL || 'hello@example.com',
      subject: emailSubject,
      html: emailHtml,
      attachments: attachment
        ? [
            {
              filename: attachment.name,
              content: (globalThis as any).Buffer.from(await attachment.arrayBuffer()),
            },
          ]
        : undefined,
    });

    const emailDuration = Date.now() - emailStartTime;
    logPerformance('email_send', emailDuration, {
      provider: 'resend',
      hasAttachment: !!attachment,
    });

    if (emailError) {
      logError(new Error(`Resend error: ${emailError.message}`), {
        context: 'email_send',
        emailError,
        email: email ? `${email.substring(0, 3)}***@${email.split('@')[1]}` : 'missing',
      });

      const response = new Response(
        JSON.stringify({
          success: false,
          error: 'Failed to send email. Please try again later.',
        }),
        {
          status: 500,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      logResponse(request, response, startTime);
      return response;
    }

    // Log successful email send
    logEmailEvent('sent', {
      emailId: emailData?.id,
      duration: emailDuration,
      email: email ? `${email.substring(0, 3)}***@${email.split('@')[1]}` : 'missing',
    });

    // Return success response
    const response = new Response(
      JSON.stringify({
        success: true,
        message: 'Email sent successfully',
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    logResponse(request, response, startTime);
    return response;
  } catch (error) {
    // Log unexpected errors
    logError(error instanceof Error ? error : new Error(String(error)), {
      context: 'contact_form',
      requestUrl: request.url,
      requestMethod: request.method,
    });

    // Log security event for unexpected errors
    logSecurityEvent('unexpected_error', {
      endpoint: '/api/contact',
      method: request.method,
      userAgent: request.headers.get('user-agent'),
      ip: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip'),
    });

    const response = new Response(
      JSON.stringify({
        success: false,
        error: 'An unexpected error occurred. Please try again later.',
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    logResponse(request, response, startTime);
    return response;
  }
};
