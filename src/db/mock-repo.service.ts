export class Repository<T extends { id: string }> {
  private table: T[] = [];

  getOneById({ id }: Pick<T, 'id'>) {
    return this.table.find((ent: T) => ent.id === id) || null;
  }

  getAll() {
    return this.table;
  }

  add(entity: T) {
    const index = this.getIndexById(entity);
    if (index !== -1) {
      this.table[index] = entity;
    } else {
      this.table.push(entity);
    }
    return entity;
  }

  delete(entityOrEntities: T | T[]): T | T[] {
    const entitiesToRemove = Array.isArray(entityOrEntities)
      ? entityOrEntities
      : [entityOrEntities];

    this.table = this.table.filter((ent) => !entitiesToRemove.includes(ent));

    return entityOrEntities;
  }

  getIndexById({ id }: Pick<T, 'id'>) {
    return this.table.findIndex((ent: T) => ent.id === id);
  }
}
