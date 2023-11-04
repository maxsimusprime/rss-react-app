import type { AstronomicalObject } from '../dto/types';
import { BASE_URI } from '../dto/constants';

const getAstronomicalObject = async (params: {
  searchQuery?: string;
  offset?: number;
  limit: number;
}): Promise<AstronomicalObject[] | []> => {
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
    const resObj = await response.json();
    const items = resObj.astronomicalObjects as AstronomicalObject[];
    return items;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export { getAstronomicalObject };
