import { z } from 'zod';
import { FilingSchema } from './filing';

export const OrganizationSchema = z.object({
  /**
   * Organization ID
   */
  id: z.number(),
  /**
   * Employer Identification Number
   */
  ein: z.number(),
  /**
   * Organization name.
   */
  name: z.string(),
  /**
   * Care of Name
   */
  careofname: z.string().nullable(),
  /**
   * Street address
   */
  address: z.string().nullable(),
  /**
   * City
   */
  city: z.string().nullable(),
  /**
   * State
   */
  state: z.string().nullable(),
  /**
   * ZIP code
   */
  zipcode: z.string().nullable(),
  /**
   * Exemption Number
   */
  exemption_number: z.number().optional().nullable(),
  /**
   * Subsection Code
   */
  subsection_code: z.number().nullable(),
  /**
   * Affiliation Code
   */
  affiliation_code: z.number().nullable(),
  /**
   * Classification Codes
   */
  classification_codes: z.string().optional().nullable(),
  /**
   * Ruling Date
   */
  ruling_date: z.string().optional().nullable(),
  /**
   * Deductibility Code
   */
  deductibility_code: z.number().optional().nullable(),
  /**
   * Foundation Code
   */
  foundation_code: z.number().optional().nullable(),
  /**
   * Activity Codes
   */
  activity_codes: z.string().optional().nullable(),
  /**
   * Organization Code
   */
  organization_code: z.number().optional().nullable(),
  /**
   * Exempt Organization Status Code
   */
  exempt_organization_status_code: z.number().nullable(),
  /**
   * Tax Period
   */
  tax_period: z.string().nullable(),
  /**
   * Asset Code
   */
  asset_code: z.number().optional().nullable(),
  /**
   * Income Code
   */
  income_code: z.number().nullable(),
  /**
   * Filing Requirement Code
   */
  filing_requirement_code: z.number().nullable(),
  /**
   * PF Filing Requirement Code
   */
  pf_filing_requirement_code: z.number().nullable(),
  /**
   * Accounting Period
   */
  accounting_period: z.number().nullable(),
  /**
   * Asset Amount
   */
  asset_amount: z.number().nullable(),
  /**
   * Income Amount
   */
  income_amount: z.number().nullable(),
  /**
   * Revenue Amount
   */
  revenue_amount: z.number().nullable(),
  /**
   * National Taxonomy of Exempt Entities (NTEE) category
   *
   * @see {@link https://www.irs.gov/pub/irs-soi/eobk13.doc|IRS}
   */
  ntee_code: z.string().nullable(),
  /**
   * Sort Name
   */
  sort_name: z.string().nullable(),
  /**
   * Created At
   */
  created_at: z.coerce.date().nullable(),
  /**
   * Updated At
   */
  updated_at: z.coerce.date().nullable(),
  /**
   * Data Source
   */
  data_source: z.string().nullable(),
  /**
   * Have Extracts
   */
  have_extracts: z.boolean().nullable(),
  /**
   * Have PDFs
   */
  have_pdfs: z.boolean().nullable(),
  /**
   * Latest Object ID
   */
  latest_object_id: z.string().optional().nullable(),
});

/**
 * Organization object
 */
export type IOrganization = z.infer<typeof OrganizationSchema>;

export const OrganizationResponseSchema = z.object({
  /**
   * Organization object
   *
   * @see {@link IOrganization}
   */
  organization: OrganizationSchema,

  /**
   * Citation of data sources
   */
  data_source: z.string(),

  /**
   * Version of the Nonprofit Explorer API used to generate the response
   */
  api_version: z.number(),

  /**
   * Filings with data
   *
   * @see {@link IFiling}
   */
  filings_with_data: z.array(FilingSchema),

  /**
   * Filings without data
   *
   * @see {@link IFiling}
   */
  filings_without_data: z.array(FilingSchema),
});

/**
 * Organization response object
 */
export type IOrganizationResponse = z.infer<typeof OrganizationResponseSchema>;

export function validateOrganizationResponse(
  response: IOrganizationResponse,
): IOrganizationResponse {
  return OrganizationResponseSchema.parse(response);
}
