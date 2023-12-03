import { Dispatch, Middleware, createAction } from '@reduxjs/toolkit';
import { addForm } from '../slices.ts/formSlice';
import { FormData, FormDataState } from '../../dto/types';
import { fileToBase64 } from '../../helpers/fileToBase64';

export const addFormSource = createAction<FormData>('addFormSource');

export const converter: Middleware<Promise<Dispatch>> =
  (storeAPI) => (next) => (action) => {
    if (action.type === 'addFormSource') {
      const file = action.payload.photo[0];
      fileToBase64(file).then((base64String) => {
        const newPayload: FormDataState = Object.assign(action.payload, {
          photo: base64String,
        });
        storeAPI.dispatch(addForm(newPayload));
      });
    } else {
      return next(action);
    }
  };
