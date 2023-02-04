export default class InvalidPasswordException extends Error {
  constructor() {
    super(`Invalid user password`);
    this.name = this.constructor.name;
  }
}
