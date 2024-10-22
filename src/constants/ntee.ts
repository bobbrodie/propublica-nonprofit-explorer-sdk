/**
 * National Taxonomy of Exempt Entities (NTEE) Major Group
 *
 * @see {@link https://urbaninstitute.github.io/nccs-legacy/ntee/ntee-history.html|National Taxonomy of Exempt Entities (NTEE) Codes}
 */
export const NTEE = {
  ARTS_CULTURE_HUMANITIES: 1,
  EDUCATION: 2,
  ENVIRONMENT_ANIMAL_WELFARE: 3,
  HEALTH: 4,
  HUMAN_SERVICES: 5,
  INTERNATIONAL_FOREIGN_AFFAIRS: 6,
  PUBLIC_SOCIETAL_BENEFIT: 7,
  RELIGION_RELATED: 8,
  MUTUAL_MEMBERSHIP_BENEFIT: 9,
  UNKNOWN_UNCLASSIFIED: 10,
} as const;

export type NTEEKey = keyof typeof NTEE;
export type NTEEValue = (typeof NTEE)[NTEEKey];
