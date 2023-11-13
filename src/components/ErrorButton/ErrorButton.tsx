export default function ErrorButton() {
  return (
    <button
      onClick={() => {
        throw new Error('Error button handle');
      }}
    >
      Error
    </button>
  );
}
