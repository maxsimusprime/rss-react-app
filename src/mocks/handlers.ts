import { http, HttpResponse } from 'msw';
import astronomicalObject from './astronomicalObject';
import { astronomicalObjectBaseResponse } from './objects';

export const handlers = [
  http.get('https://stapi.co/api/v2/rest/astronomicalObject/', () => {
    return HttpResponse.json({ astronomicalObject });
  }),

  http.post('https://stapi.co/api/v2/rest/astronomicalObject/search', () => {
    return HttpResponse.json({ ...astronomicalObjectBaseResponse });
  }),
];
