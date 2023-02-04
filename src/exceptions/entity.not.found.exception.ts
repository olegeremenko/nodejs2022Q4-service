export default class EntityNotFoundException extends Error {
  constructor(entity: string, entityId: string) {
    super(`${entity} with ID [${entityId}] does not exist`);
    this.name = this.constructor.name;
  }
}
