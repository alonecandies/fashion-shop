import Model from "@src/config/knexConnection";
import { autoImplementWithBase } from "@src/utils";
import IBlogCategoryEntities from './entities';

export default class BlogCategoryModel extends autoImplementWithBase(Model)<IBlogCategoryEntities>() {
    static get tableName() {
        return "blog_category";
    }

    static get idColumn() {
        return "id";
    }
}