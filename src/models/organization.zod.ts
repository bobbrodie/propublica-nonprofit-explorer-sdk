import { z } from 'zod';
import { FilingSchema } from './filing.zod';
import { IOrganizationResponse } from './organization';

export const OrganizationSchema = z.object({
  id: z.number(),
  ein: z.number(),
  name: z.string(),
  careofname: z.string().nullable(),
  address: z.string(),
  city: z.string(),
  state: z.string(),
  zipcode: z.string(),
  exemption_number: z.number().optional(),
  subsection_code: z.number(),
  affiliation_code: z.number(),
  classification_codes: z.string().optional(),
  ruling_date: z.string().optional(),
  deductibility_code: z.number().optional(),
  foundation_code: z.number().optional(),
  activity_codes: z.string().optional(),
  organization_code: z.number().optional(),
  exempt_organization_status_code: z.number(),
  tax_period: z.string(),
  asset_code: z.number().optional(),
  income_code: z.number(),
  filing_requirement_code: z.number(),
  pf_filing_requirement_code: z.number(),
  accounting_period: z.number(),
  asset_amount: z.number(),
  income_amount: z.number(),
  revenue_amount: z.number(),
  ntee_code: z.string(),
  sort_name: z.string().nullable(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
  data_source: z.string(),
  have_extracts: z.boolean().nullable(),
  have_pdfs: z.boolean().nullable(),
  latest_object_id: z.string().optional(),
});

export const OrganizationResponseSchema = z.object({
  organization: OrganizationSchema,
  data_source: z.string(),
  api_version: z.number(),
  filings_with_data: z.array(FilingSchema),
  filings_without_data: z.array(FilingSchema),
});

export function validateOrganizationResponse(
  response: IOrganizationResponse,
): IOrganizationResponse {
  return OrganizationResponseSchema.parse(response);
}
