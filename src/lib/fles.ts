export function convertFileToBuffer(file: File): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target && event.target.result) {
        resolve(Buffer.from(event.target.result as ArrayBuffer));
      }
    };
    reader.onerror = reject;
    reader.readAsArrayBuffer(file);
  });
}

export function convertBufferToFile(buffer: Buffer, name: string): File {
  return new File([buffer], name);
}

export function convertFileToString(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target && event.target.result) {
        resolve(event.target.result as string);
      }
    };
    reader.onerror = reject;
    reader.readAsText(file);
  });
}
