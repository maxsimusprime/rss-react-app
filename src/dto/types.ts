import { Dispatch, SetStateAction } from 'react';

type AstronomicalObject = {
  uid: string;
  name: string;
  astronomicalObjectType: AstronomicalObjectType;
  location: {
    uid: string;
    name: string;
  };
};

type Page = {
  pageNumber: number;
  pageSize: number;
  numberOfElements: number;
  totalElements: number;
  totalPages: number;
  firstPage: boolean;
  lastPage: boolean;
};

type AstronomicalObjectBaseResponse = {
  page: Page;
  sort: { clauses: string[] };
  astronomicalObjects: AstronomicalObject[];
};

type ResponseError = {
  error: string;
};

type SearchProps = {
  setSearchParams: (params: URLSearchParams) => void;
};

type AstronomicalObjectType =
  | 'COMET'
  | 'GALAXY'
  | 'NEBULA'
  | 'PLANET'
  | 'REGION'
  | 'SECTOR'
  | 'STAR_SYSTEM';

export type {
  AstronomicalObject,
  AstronomicalObjectType,
  AstronomicalObjectBaseResponse,
  Page,
  ResponseError,
  SearchProps,
};

export type ContextInitialState = {
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
  items: AstronomicalObject[];
  page: Page;
};
