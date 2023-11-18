import '@testing-library/jest-dom';
import { beforeAll, afterEach, afterAll } from 'vitest';
import { cleanup } from '@testing-library/react';
import { server } from './src/mocks/server';
import { store } from './src/store/store';
import { api } from './src/services/api';

beforeAll(() => server.listen());

afterEach(() => {
  server.resetHandlers();
  cleanup();
  store.dispatch(api.util.resetApiState());
});

afterAll(() => server.close());
