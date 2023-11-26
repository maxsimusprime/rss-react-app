import type { ReactNode } from 'react';
import { store } from '../../store/store';
import { Provider } from 'react-redux';

export default function Wrapper(props: { children: ReactNode }) {
  return <Provider store={store}>{props.children}</Provider>;
}
