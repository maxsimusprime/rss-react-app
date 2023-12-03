export interface FormData {
  name: string;
  age: string;
  email: string;
  password: string;
  passwordConfirm: string;
  country: string;
  gender: string;
  photo?: FileList | undefined;
  accepted: string | undefined;
}

export interface FormDataSource {
  type: 'controlled' | 'uncontrolled';
  name: string;
  age: string;
  email: string;
  password: string;
  passwordConfirm: string;
  country: string;
  gender: string;
  photo?: FileList;
  accepted: string | undefined;
}

export interface FormDataState {
  type: 'controlled' | 'uncontrolled';
  name: string;
  age: string;
  email: string;
  password: string;
  passwordConfirm: string;
  country: CountryCode;
  gender: string;
  photo: string;
  accepted: string;
}

export interface FormState {
  countries: { code: CountryCode; name: string }[];
  forms: FormDataState[];
  isNewAdded: boolean;
}

export type CountryCode = 'CA' | 'US' | 'BY' | 'PL' | 'NL';

export enum Countries {
  CA = 'Canada',
  US = 'USA',
  BY = 'Belarus',
  PL = 'Poland',
  NL = 'Netherlands',
}
