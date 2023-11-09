export default function SearchLimit({
  setPageLimit,
  setSearchParams,
}: {
  setPageLimit: (pageLimit: number) => void;
  setSearchParams: (params: URLSearchParams) => void;
}) {
  const setLimitHandle = (limit: number): void => {
    setSearchParams(new URLSearchParams({ page: '0' }));
    setPageLimit(limit);
  };

  return (
    <div style={{ display: 'flex', columnGap: '10px' }}>
      <span>Page limit</span>
      <button onClick={() => setLimitHandle(10)}>10</button>
      <button onClick={() => setLimitHandle(20)}>20</button>
      <button onClick={() => setLimitHandle(50)}>50</button>
    </div>
  );
}
