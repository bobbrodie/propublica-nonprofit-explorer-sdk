/**
 * Form Type
 */
export const FORMTYPE = {
  '990': 0,
  '990_EZ': 1,
  '990_PF': 2,
};

export type FORMTYPEKey = keyof typeof FORMTYPE;
export type FORMTYPEValue = (typeof FORMTYPE)[FORMTYPEKey];
