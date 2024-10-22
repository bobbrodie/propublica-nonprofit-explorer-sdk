import { NTEEKey } from '../constants';
import { Filing } from './filing';

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
  ein: string;
  /**
   * Organization name.
   */
  name: string;
  /**
   * Care of Name
   */
  careofname?: string;
  /**
   * Street address
   */
  address: string;
  /**
   * City
   */
  city: string;
  /**
   * State
   */
  state: string;
  /**
   * ZIP code
   */
  zipcode: string;
  /**
   * Exemption Number
   */
  exemption_number?: number;
  /**
   * Subsection Code
   */
  subsection_code: number;
  /**
   * Affiliation Code
   */
  affiliation_code: number;
  /**
   * Classification Codes
   */
  classification_codes?: string;
  /**
   * Ruling Date
   */
  ruling_date?: string;
  /**
   * Deductibility Code
   */
  deductibility_code?: number;
  /**
   * Foundation Code
   */
  foundation_code?: number;
  /**
   * Activity Codes
   */
  activity_codes?: string;
  /**
   * Organization Code
   */
  organization_code?: number;
  /**
   * Exempt Organization Status Code
   */
  exempt_organization_status_code: number;
  /**
   * Tax Period
   */
  tax_period: string;
  /**
   * Asset Code
   */
  asset_code?: number;
  /**
   * Income Code
   */
  income_code: number;
  /**
   * Filing Requirement Code
   */
  filing_requirement_code: number;
  /**
   * PF Filing Requirement Code
   */
  pf_filing_requirement_code: number;
  /**
   * Accounting Period
   */
  accounting_period: number;
  /**
   * Asset Amount
   */
  asset_amount: number;
  /**
   * Income Amount
   */
  income_amount: number;
  /**
   * Revenue Amount
   */
  revenue_amount: number;
  /**
   * National Taxonomy of Exempt Entities (NTEE) category
   *
   * @see {@link https://www.irs.gov/pub/irs-soi/eobk13.doc|IRS}
   */
  ntee_code: NTEEKey;
  /**
   * Sort Name
   */
  sort_name?: string;
  /**
   * Created At
   */
  created_at: Date;
  /**
   * Updated At
   */
  updated_at: Date;
  /**
   * Data Source
   */
  data_source: string;
  /**
   * Have Extracts
   */
  have_extracts?: boolean;
  /**
   * Have PDFs
   */
  have_pdfs?: boolean;
  /**
   * Latest Object ID
   */
  latest_object_id?: string;
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
   * @see {@link Filing}
   */
  filings_with_data: Filing[];
  /**
   * Filings without data
   *
   * @see {@link Filing}
   */
  filings_without_data: Filing[];
}
