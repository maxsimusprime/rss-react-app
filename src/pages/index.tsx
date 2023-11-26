import Layout from '@/components/_layouts/Layout/Layout';
import Loading from '@/components/_ui/bars/Loading/Loading';
import CardList from '@/components/CardList/CardList';
import Details from '@/components/Details/Details';
import { useAppSelector } from '@/hooks/useAppSelector';
import {
  getItemById,
  getItems,
  getRunningQueriesThunk,
  useGetItemsQuery,
} from '@/services/api';
import { type SearchState, setSearchState } from '@/store/slices/searchSlice';
import { AppStore, wrapper } from '@/store/store';
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';
import { setDetailState } from '@/store/slices/detailSlice';

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps(
    (store: AppStore) => async (context: GetServerSidePropsContext) => {
      const searchQuery = context.req.cookies['searchQuery'] || '';
      const pageNumber = Number(context.query.pageNumber || 0);
      const pageSize = Number(context.query.pageSize || 10);
      const details = context.query.details;

      const payload: Partial<SearchState> = {
        pageNumber,
        pageSize,
        searchQuery,
      };
      store.dispatch(setSearchState(payload));
      store.dispatch(getItems.initiate({ pageNumber, pageSize, searchQuery }));

      const uid = typeof details === 'string' ? details : null;
      store.dispatch(setDetailState({ uid }));
      if (uid) store.dispatch(getItemById.initiate(String(details)));

      await Promise.all(store.dispatch(getRunningQueriesThunk()));

      return { props: {} };
    }
  );

const RootPage: NextPage = () => {
  const { searchQuery, pageNumber, pageSize } = useAppSelector(
    (state) => state.search
  );

  const { uid } = useAppSelector((state) => state.detail);

  const result = useGetItemsQuery({
    searchQuery,
    pageNumber,
    pageSize,
  });
  const { isLoading, isError, data } = result;

  return (
    <Layout>
      <main className="main">
        {isLoading && <Loading />}
        {isError && <div>Some Network error</div>}
        {data && <CardList {...data} />}
        {data && uid && <Details uid={uid} />}
      </main>
    </Layout>
  );
};

export default RootPage;
