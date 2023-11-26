import Search from '@/components/Search/Search';
import PageSize from '@/components/Search/PageSize';
import { FC, PropsWithChildren } from 'react';
import ErrorButton from '@/components/ErrorButton/ErrorButton';

const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <header className="header">
        <Search />
        <PageSize />
        <ErrorButton/>
      </header>
      {children}
    </>
  );
};

export default Layout;
