import Model from "@src/config/knexConnection";
import { autoImplementWithBase } from "@src/utils";
import ICategoryEntities from './entities';

export default class CategoryLevel1Model extends autoImplementWithBase(Model)<ICategoryEntities>() {
    static get tableName() {
        return "category_level_1";
    }

    static get idColumn() {
        return "id";
    }
}