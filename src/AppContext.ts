import type { ContextInitialState } from './dto/types';
import { createContext } from 'react';

export const AppContext = createContext<Partial<ContextInitialState>>({});
