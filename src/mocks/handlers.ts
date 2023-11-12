import { http, HttpResponse } from 'msw';
import astronomicalObject from './astronomicalObject';

export const handlers = [
  http.get(
    'https://stapi.co/api/v2/rest/astronomicalObject/?uid=ASMA0000288988',
    () => {
      return HttpResponse.json({ astronomicalObject });
    }
  ),
];
