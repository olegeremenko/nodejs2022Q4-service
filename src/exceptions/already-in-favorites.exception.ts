export default class AlreadyInFavoritesException extends Error {
  constructor (entity: string, entityId: string) {
    super(`${entity} [${entityId}] has been added to favorites already`);
    this.name = this.constructor.name;
  }
}
