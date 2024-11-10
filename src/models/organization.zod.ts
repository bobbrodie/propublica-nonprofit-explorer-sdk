import { z } from 'zod';
import { FilingSchema } from './filing.zod';
import { IOrganizationResponse } from './organization';

export const OrganizationSchema = z.object({
  id: z.number(),
  ein: z.number(),
  name: z.string(),
  careofname: z.string().nullable(),
  address: z.string().nullable(),
  city: z.string().nullable(),
  state: z.string().nullable(),
  zipcode: z.string().nullable(),
  exemption_number: z.number().optional().nullable(),
  subsection_code: z.number().nullable(),
  affiliation_code: z.number().nullable(),
  classification_codes: z.string().optional().nullable(),
  ruling_date: z.string().optional().nullable(),
  deductibility_code: z.number().optional().nullable(),
  foundation_code: z.number().optional().nullable(),
  activity_codes: z.string().optional().nullable(),
  organization_code: z.number().optional().nullable(),
  exempt_organization_status_code: z.number().nullable(),
  tax_period: z.string().nullable(),
  asset_code: z.number().optional().nullable(),
  income_code: z.number().nullable(),
  filing_requirement_code: z.number().nullable(),
  pf_filing_requirement_code: z.number().nullable(),
  accounting_period: z.number().nullable(),
  asset_amount: z.number().nullable(),
  income_amount: z.number().nullable(),
  revenue_amount: z.number().nullable(),
  ntee_code: z.string().nullable(),
  sort_name: z.string().nullable(),
  created_at: z.coerce.date().nullable(),
  updated_at: z.coerce.date().nullable(),
  data_source: z.string().nullable(),
  have_extracts: z.boolean().nullable(),
  have_pdfs: z.boolean().nullable(),
  latest_object_id: z.string().optional().nullable(),
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
