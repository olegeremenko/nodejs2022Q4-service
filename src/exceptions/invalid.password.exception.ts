export default class InvalidPasswordException extends Error {
  constructor() {
    super(`oldPassword is wrong `);
    this.name = this.constructor.name;
  }
}
