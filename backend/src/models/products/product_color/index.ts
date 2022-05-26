import Model from "@src/config/knexConnection";
import { autoImplementWithBase } from "@src/utils";
import IProductColorEntities from './entities';

export default class ProductColorModel extends autoImplementWithBase(Model)<IProductColorEntities>() {
    static get tableName() {
        return "color_product";
    }

    static get idColumn() {
        return "id";
    }
}