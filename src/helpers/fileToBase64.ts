export const fileToBase64 = (file: File): Promise<string | undefined> => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      resolve(reader.result?.toString());
    };
  });
};
