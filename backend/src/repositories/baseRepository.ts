import Model from "@src/config/knexConnection";
import { ModelClass, transaction } from "objection";
import { IRead } from "./interfaces/read";
import { IWrite } from "./interfaces/write";

export abstract class BaseRepository<T extends Model> implements IWrite<T>, IRead<T> {
  private model: ModelClass<T>;

  constructor(model: ModelClass<T>) {
    this.model = model;
  }

  public async create(item: T): Promise<Model> {
    const knex = this.model.knex();
    try {
      const result = await transaction(knex, trx => {
        return this.model.query(trx).insert(item);
      });
      return result;
    } catch (err) {
      throw err;
    }
  }

  public async update(id: string, item: T): Promise<number> {
    const knex = this.model.knex();
    try {
      const result = await transaction(knex, trx => {
        return this.model
          .query(trx)
          .where({ id })
          .update(item);
      });
      return result;
    } catch (err) {
      throw err;
    }
  }

  public delete(id: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }

  public findById(id: number): Promise<T> {
    throw new Error("Method not implemented.");
  }

  public async find(item: T): Promise<any> {
    try {
      const result = await this.model.query().findOne(item);
      return result;
    } catch (err) {
      throw err;
    }
  }


  // public async find(item: T): Promise<T> {
  //   try {
  //     const result = await this.model.query().findOne(item);
  //     return result;
  //   } catch (err) {
  //     throw err;
  //   }
  // }
}
