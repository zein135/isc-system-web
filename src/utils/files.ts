

export const downloadFile = async (file: Blob, fileName: string) => {
  const link = document.createElement('a');
  link.href = URL.createObjectURL(file);
  link.download = fileName;
  link.click();
}