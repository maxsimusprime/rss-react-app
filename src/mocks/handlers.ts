import { http, HttpResponse } from 'msw';
import astronomicalObject from './astronomicalObject';
import { astronomicalObjectBaseResponse } from './objects';

export const handlers = [
  http.get(
    'https://stapi.co/api/v2/rest/astronomicalObject/?uid=ASMA0000288988',
    () => {
      return HttpResponse.json({ astronomicalObject });
    }
  ),

  http.get(
    'https://stapi.co/api/v2/rest/astronomicalObject/search?pageNumber=0&pageSize=10',
    () => {
      return HttpResponse.json({ astronomicalObjectBaseResponse });
    }
  ),

  http.post(
    'https://stapi.co/api/v2/rest/astronomicalObject/search',
    () => {
      return HttpResponse.json({ astronomicalObjectBaseResponse });
    }
  ),
];
