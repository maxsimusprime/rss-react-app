import { http, HttpResponse } from 'msw';
import astronomicalObject from './astronomicalObject';
import {
  astronomicalObjectBaseResponse,
  nullAstronomicalObjectBaseResponse,
} from './objects';

export const astronomicalObjectResponse = http.get(
  'https://stapi.co/api/v2/rest/astronomicalObject/',
  () => {
    return HttpResponse.json({ astronomicalObject });
  }
);

export const astronomicalObjectBaseResponseHandle = http.post(
  'https://stapi.co/api/v2/rest/astronomicalObject/search',
  () => {
    return HttpResponse.json({ ...astronomicalObjectBaseResponse });
  }
);

export const nullAstronomicalObjectBaseResponseHandle = http.post(
  'https://stapi.co/api/v2/rest/astronomicalObject/search',
  () => {
    return HttpResponse.json({ ...nullAstronomicalObjectBaseResponse });
  }
);

export const handlers = [
  astronomicalObjectResponse,
  astronomicalObjectBaseResponseHandle,
];
