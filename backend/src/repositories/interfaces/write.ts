import { Model } from "objection";

export interface IWrite<T> {
    create(item: T): Promise<Model>;
    update(id: string, item: T): Promise<number>;
    delete(id: string): Promise<boolean>;
}