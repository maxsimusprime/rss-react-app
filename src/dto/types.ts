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
  items: AstronomicalObject[];
  offset: number;
  limit: number;
  isLoading: boolean;
  searchQuery: string;
};

type SearchProps = {
  searchQuery: string;
  setAppState: (state: Partial<AppState>) => void;
  updateItems: () => void;
};

type AstronomicalObjectType = 'COMET' | 'GALAXY' | 'NEBULA' | 'PLANET' | 'REGION' | 'SECTOR' | 'STAR_SYSTEM';

export type { AstronomicalObject, AppState, SearchProps, AstronomicalObjectType };
