type AstronomicalObject = {
  "uid": string;
  "name": string;
  "astronomicalObjectType": string;
  "location": {
    "uid": string;
    "name": string;
  }
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
}

export type { AstronomicalObject, AppState, SearchProps };
