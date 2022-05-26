import Model from "@src/config/knexConnection";
import { autoImplementWithBase } from "@src/utils";
import IProductImageEntities from './entities';

export default class ProductImageModel extends autoImplementWithBase(Model)<IProductImageEntities>() {
    static get tableName() {
        return "image_product";
    }

    static get idColumn() {
        return "id";
    }
}