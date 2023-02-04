import * as lodash from 'lodash';

interface Options<T, K extends keyof T> {
  key: K;
  equals?: T[K];
  equalsAnyOf?: T[K][];
}
type OptionsEquals<T, K extends keyof T> = Required<
  Pick<Options<T, K>, 'key' | 'equals'>
>;
type OptionsEqualsAnyOf<T, K extends keyof T> = Required<
  Pick<Options<T, K>, 'key' | 'equalsAnyOf'>
>;

export default abstract class Repository<
  Entity extends { id: string },
  UpdateDTO,
  CreateDTO,
> {
  protected entities: Entity[] = [];

  abstract create(createDto: CreateDTO): Promise<Entity>;

  private runChecks<T extends Entity, K extends keyof T>(
    entity: T,
    options: Options<T, K>,
  ) {
    if (options.equals) {
      return lodash.isEqual(entity[options.key], options.equals);
    }

    if (options.equalsAnyOf) {
      return options.equalsAnyOf.some((inputValue) =>
        lodash.isEqual(entity[options.key], inputValue),
      );
    }

    return false;
  }

  async findOne<K extends keyof Entity>(
    option: OptionsEquals<Entity, K>,
  ): Promise<Entity | null>;

  async findOne<K extends keyof Entity>(
    option: OptionsEqualsAnyOf<Entity, K>,
  ): Promise<Entity | null>;

  async findOne<K extends keyof Entity>(
    options: Options<Entity, K>,
  ): Promise<Entity | null> {
    return (
      this.entities.find((entity) => this.runChecks(entity, options)) ?? null
    );
  }

  async findMany<K extends keyof Entity>(
    options: OptionsEquals<Entity, K>,
  ): Promise<Entity[]>;
  async findMany<K extends keyof Entity>(
    option: OptionsEqualsAnyOf<Entity, K>,
  ): Promise<Entity[]>;

  async findMany<K extends keyof Entity>(): Promise<Entity[]>;

  async findMany<K extends keyof Entity>(
    options?: Options<Entity, K>,
  ): Promise<Entity[]> {
    if (!options) {
      return this.entities;
    }
    return this.entities.filter((entity) => this.runChecks(entity, options));
  }

  async delete(id: string): Promise<Entity> {
    const idx = this.entities.findIndex((entity) => entity.id === id);
    if (idx === -1) {
      throw new Error('delete');
    }
    const deleted = this.entities[idx];
    this.entities.splice(idx, 1);
    return deleted;
  }

  async update(id: string, updateDTO: UpdateDTO): Promise<Entity> {
    const idx = this.entities.findIndex((entity) => entity.id === id);
    if (idx === -1) {
      throw new Error('update');
    }
    const changed = { ...this.entities[idx], ...updateDTO };
    this.entities.splice(idx, 1, changed);
    return changed;
  }
}
