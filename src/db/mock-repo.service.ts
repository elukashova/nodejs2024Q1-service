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

  delete({ id }: Pick<T, 'id'>) {
    const index = this.getIndexById({ id });
    if (!index) {
      return null;
    }

    this.table = this.table.splice(index, 1);
  }

  getIndexById({ id }: Pick<T, 'id'>) {
    return this.table.findIndex((ent: T) => ent.id === id);
  }
}
