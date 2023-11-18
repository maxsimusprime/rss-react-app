import { http, HttpResponse } from 'msw';
import astronomicalObject from './astronomicalObject';
import {
  astronomicalObjectBaseResponse,
  nullAstronomicalObjectBaseResponse,
} from './objects';

export const astronomicalObjectResponseHandler = http.get(
  'https://stapi.co/api/v2/rest/astronomicalObject/',
  () => {
    return HttpResponse.json({ astronomicalObject });
  }
);

export const astronomicalObjectBaseResponseHandler = http.post(
  'https://stapi.co/api/v2/rest/astronomicalObject/search',
  () => {
    return HttpResponse.json({ ...astronomicalObjectBaseResponse });
  }
);

export const nullAstronomicalObjectBaseResponseHandler = http.post(
  'https://stapi.co/api/v2/rest/astronomicalObject/search',
  () => {
    return HttpResponse.json({ ...nullAstronomicalObjectBaseResponse });
  }
);

export const handlers = [
  astronomicalObjectResponseHandler,
  astronomicalObjectBaseResponseHandler,
];
