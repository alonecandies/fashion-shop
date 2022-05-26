import Model from "@src/config/knexConnection";
import { autoImplementWithBase } from "@src/utils";
import IBannerImageEntities from './entities';

export default class BannerImageModel extends autoImplementWithBase(Model)<IBannerImageEntities>() {
    static get tableName() {
        return "banner_image";
    }

    static get idColumn() {
        return "id";
    }
}