import * as yup from 'yup';

const MAX_FILE_SIZE = 1024 * 100;

export const schema = yup.object().shape({
  name: yup
    .string()
    .required('Name is required')
    .matches(/^[A-Z]{1}[a-zA-Z]*$/, 'Name first letter must be a Uppercased'),

  age: yup
    .string()
    .required('Age is required')
    .matches(/^\d+$/, 'Age is only positive numbers'),

  email: yup
    .string()
    .required('Email is required')
    .email('Invalid email format')
    .matches(
      /[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]{2,3}/,
      'Invalid email format'
    ),

  password: yup.string().required('Password is required'),

  passwordConfirm: yup
    .string()
    .oneOf([yup.ref('password')], 'Confirm password doesn`t match with password field')
    .required('Password re-input is required'),

  country: yup.string().required('Country is required'),

  gender: yup.string().required('Gender choice is required'),

  photo: yup
    .mixed()
    .test(
      'is-file-added',
      'Photo is required',
      (files) => files instanceof FileList && files.length > 0
    )
    .test(
      'is-single-file',
      'Only one photo is required',
      (files) => files instanceof FileList && files.length === 1
    )
    .test(
      'is-valid-size',
      'Max allowed size of photo is 100 KBytes',
      (files) =>
        files instanceof FileList && files[0] && files[0].size <= MAX_FILE_SIZE
    ),

  accepted: yup
    .string()
    .test('is-confirmed', 'Needs to confirm', (value) => value === 'true'),
});
