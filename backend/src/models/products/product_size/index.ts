import Model from "@src/config/knexConnection";
import { autoImplementWithBase } from "@src/utils";
import IProductSizeEntities from './entities';

export default class ProductSizeModel extends autoImplementWithBase(Model)<IProductSizeEntities>() {
    static get tableName() {
        return "size_product";
    }

    static get idColumn() {
        return "id";
    }
}