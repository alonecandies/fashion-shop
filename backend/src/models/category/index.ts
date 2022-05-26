import Model from "@src/config/knexConnection";
import { autoImplementWithBase } from "@src/utils";
import ICategoryEntities from './entities';

export default class CategoryModel extends autoImplementWithBase(Model)<ICategoryEntities>() {
    static get tableName() {
        return "category";
    }

    static get idColumn() {
        return "id";
    }
}