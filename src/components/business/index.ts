/**
 * Business components for SME landing pages
 * Reusable components for services, team, testimonials, etc.
 */

export { default as ServiceCard } from './ServiceCard.astro';
export { default as ServiceGrid } from './ServiceGrid.astro';
export { default as TeamMember } from './TeamMember.astro';
export { default as TeamGrid } from './TeamGrid.astro';

// Export types
export type { Props as ServiceCardProps } from './ServiceCard.astro';
export type { Props as ServiceGridProps, Service } from './ServiceGrid.astro';
export type { Props as TeamMemberProps } from './TeamMember.astro';
export type { Props as TeamGridProps, TeamMemberData } from './TeamGrid.astro';
