class STTError extends Error {

  constructor(message: string, errorcode: number) {
    super(message);
    this.name = message;
    this.code = errorcode;
  }
  code = 0;
}

export default STTError;