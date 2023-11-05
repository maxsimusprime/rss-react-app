export default function SearchLimit({
  setPageLimit,
}: {
  setPageLimit: (pageLimit: number) => void;
}) {
  return (
    <div style={{ display: 'flex', columnGap: '10px' }}>
      <span>Page limit</span>
      <button onClick={() => setPageLimit(10)}>10</button>
      <button onClick={() => setPageLimit(20)}>20</button>
      <button onClick={() => setPageLimit(50)}>50</button>
    </div>
  );
}
