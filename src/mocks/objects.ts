import {
  AstronomicalObject,
  AstronomicalObjectBaseResponse,
} from '../dto/types';

export const astronomicalObject: AstronomicalObject = {
  uid: 'ASMA0000288988',
  name: '39 Serpentis',
  astronomicalObjectType: 'STAR_SYSTEM',
  location: {
    uid: 'ASMA0000025892',
    name: 'Alpha Quadrant',
  },
};

export const astronomicalObjects: AstronomicalObject[] = [
  {
    uid: 'ASMA0000015822',
    name: "'aucdet IX",
    astronomicalObjectType: 'PLANET',
    location: {
      uid: 'ASMA0000025892',
      name: 'Alpha Quadrant',
    },
  },
  {
    uid: 'ASMA0000264696',
    name: "'etnap Nebula",
    astronomicalObjectType: 'NEBULA',
    location: {
      uid: 'ASMA0000002015',
      name: 'Beta Quadrant',
    },
  },
  {
    uid: 'ASMA0000289027',
    name: '1 Centauri',
    astronomicalObjectType: 'STAR_SYSTEM',
    location: {
      uid: 'ASMA0000002015',
      name: 'Beta Quadrant',
    },
  },
  {
    uid: 'ASMA0000229695',
    name: '11 Leonis Minoris',
    astronomicalObjectType: 'STAR_SYSTEM',
    location: {
      uid: 'ASMA0000025892',
      name: 'Alpha Quadrant',
    },
  },
  {
    uid: 'ASMA0000177695',
    name: '1889 V',
    astronomicalObjectType: 'COMET',
    location: {
      uid: 'ASMA0000020577',
      name: 'Earth',
    },
  },
  {
    uid: 'ASMA0000174468',
    name: '1892 III Holmes',
    astronomicalObjectType: 'COMET',
    location: {
      uid: 'ASMA0000020577',
      name: 'Earth',
    },
  },
  {
    uid: 'ASMA0000174419',
    name: '1892 V',
    astronomicalObjectType: 'COMET',
    location: {
      uid: 'ASMA0000020577',
      name: 'Earth',
    },
  },
  {
    uid: 'ASMA0000065314',
    name: '2279 PL',
    astronomicalObjectType: 'REGION',
    location: null,
  },
  {
    uid: 'ASMA0000065315',
    name: '2466 PM',
    astronomicalObjectType: 'REGION',
    location: null,
  },
  {
    uid: 'ASMA0000189720',
    name: '3 kpc Arm',
    astronomicalObjectType: 'REGION',
    location: {
      uid: 'ASMA0000000662',
      name: 'Delta Quadrant',
    },
  },
];

export const page = {
  pageNumber: 0,
  pageSize: 10,
  numberOfElements: 10,
  totalElements: 2404,
  totalPages: 241,
  firstPage: true,
  lastPage: false,
};

export const astronomicalObjectBaseResponse: AstronomicalObjectBaseResponse = {
  astronomicalObjects,
  page,
  sort: {
    clauses: [],
  },
};
