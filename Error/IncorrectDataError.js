class IncorrectDataError extends Error {
  constructor(message) {
    super(message);
    this.name = 'IncorrectDataError';
    this.errorCode = 400;
  }
}
module.exports = { IncorrectDataError };
