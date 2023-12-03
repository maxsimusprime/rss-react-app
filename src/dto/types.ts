export interface FormData {
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
  country: string;
  gender: string;
  photo: string;
  accepted: string;
}

export interface FormState {
  countries: { code: string; name: string }[];
  forms: FormDataState[];
  isNewAdded: boolean;
}
