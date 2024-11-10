import { IFiling } from './filing';

/**
 * Organization object
 */
export interface IOrganization {
  /**
   * Organization ID
   */
  id: number;
  /**
   * Employer Identification Number
   */
  ein: number;
  /**
   * Organization name.
   */
  name: string;
  /**
   * Care of Name
   */
  careofname: string | null;
  /**
   * Street address
   */
  address: string | null;
  /**
   * City
   */
  city: string | null;
  /**
   * State
   */
  state: string | null;
  /**
   * ZIP code
   */
  zipcode: string | null;
  /**
   * Exemption Number
   */
  exemption_number?: number | null;
  /**
   * Subsection Code
   */
  subsection_code: number | null;
  /**
   * Affiliation Code
   */
  affiliation_code: number | null;
  /**
   * Classification Codes
   */
  classification_codes?: string | null;
  /**
   * Ruling Date
   */
  ruling_date?: string | null;
  /**
   * Deductibility Code
   */
  deductibility_code?: number | null;
  /**
   * Foundation Code
   */
  foundation_code?: number | null;
  /**
   * Activity Codes
   */
  activity_codes?: string | null;
  /**
   * Organization Code
   */
  organization_code?: number | null;
  /**
   * Exempt Organization Status Code
   */
  exempt_organization_status_code: number | null;
  /**
   * Tax Period
   */
  tax_period: string | null;
  /**
   * Asset Code
   */
  asset_code?: number | null;
  /**
   * Income Code
   */
  income_code: number | null;
  /**
   * Filing Requirement Code
   */
  filing_requirement_code: number | null;
  /**
   * PF Filing Requirement Code
   */
  pf_filing_requirement_code: number | null;
  /**
   * Accounting Period
   */
  accounting_period: number | null;
  /**
   * Asset Amount
   */
  asset_amount: number | null;
  /**
   * Income Amount
   */
  income_amount: number | null;
  /**
   * Revenue Amount
   */
  revenue_amount: number | null;
  /**
   * National Taxonomy of Exempt Entities (NTEE) category
   *
   * @see {@link https://www.irs.gov/pub/irs-soi/eobk13.doc|IRS}
   */
  ntee_code: string | null;
  /**
   * Sort Name
   */
  sort_name: string | null;
  /**
   * Created At
   */
  created_at: Date | null;
  /**
   * Updated At
   */
  updated_at: Date | null;
  /**
   * Data Source
   */
  data_source: string | null;
  /**
   * Have Extracts
   */
  have_extracts: boolean | null;
  /**
   * Have PDFs
   */
  have_pdfs: boolean | null;
  /**
   * Latest Object ID
   */
  latest_object_id?: string | null;
}

/**
 * Organization response object
 */
export interface IOrganizationResponse {
  /**
   * Organization object
   *
   * @see {@link IOrganization}
   */
  organization: IOrganization;
  /**
   * Citation of data sources
   */
  data_source: string;
  /**
   * Version of the Nonprofit Explorer API used to generate the response
   */
  api_version: number;
  /**
   * Filings with data
   *
   * @see {@link IFiling}
   */
  filings_with_data: IFiling[];
  /**
   * Filings without data
   *
   * @see {@link IFiling}
   */
  filings_without_data: IFiling[];
}
