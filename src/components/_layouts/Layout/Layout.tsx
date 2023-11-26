import Search from '@/components/Search/Search';
import PageSize from '@/components/Search/PageSize'
import { FC, PropsWithChildren } from 'react';

const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <header className='header'>
        <Search />
        <PageSize/>
      </header>
      {children}
    </>
  );
};

export default Layout;
