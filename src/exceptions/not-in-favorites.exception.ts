export default class NotInFavoritesException extends Error {
  constructor(entity: string, entityId: string) {
    super(`${entity} [${entityId}] has not been added to favorites`);
    this.name = this.constructor.name;
  }
}
