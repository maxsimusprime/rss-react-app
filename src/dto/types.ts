type AstronomicalObject = {
  uid: string;
  name: string;
  astronomicalObjectType: AstronomicalObjectType;
  location: {
    uid: string;
    name: string;
  };
};

type AppState = {
  isLoading: boolean;
};

type SearchProps = {
  query: string;
  setQuery: (query: string) => void;
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
  AppState,
  SearchProps,
  AstronomicalObjectType,
};
