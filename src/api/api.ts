import type {
  AstronomicalObjectBaseResponse,
  AstronomicalObject,
  ResponseError,
} from '../dto/types';
import { BASE_URI } from '../dto/constants';

const getAstronomicalObjectBaseResponse = async (params: {
  searchQuery?: string;
  offset?: number;
  limit: number;
}): Promise<AstronomicalObjectBaseResponse | ResponseError> => {
  const url = `${BASE_URI}search?pageNumber=${params.offset || 0}&pageSize=${
    params.limit
  }`;
  const postData = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: `name=${params.searchQuery ?? ''}`,
  };

  try {
    const response = await fetch(url, postData);
    if (response.ok) {
      return (await response.json()) as AstronomicalObjectBaseResponse;
    }
    return { error: `Response error: ${response.statusText}` };
  } catch (error) {
    console.log(error);
    return { error: 'Network error' };
  }
};

const getAstronomicalObjectById = async (params: {
  uid: string;
}): Promise<AstronomicalObject | ResponseError> => {
  const { uid } = params;
  const url = `${BASE_URI}?uid=${uid}`;

  try {
    const response = await fetch(url);
    if (response.ok) {
      const obj = await response.json();
      return obj.astronomicalObject as AstronomicalObject;
    }
    return { error: `Response error: ${response.statusText}` };
  } catch (error) {
    console.log(error);
    return { error: 'Network error' };
  }
};

export { getAstronomicalObjectBaseResponse, getAstronomicalObjectById };
