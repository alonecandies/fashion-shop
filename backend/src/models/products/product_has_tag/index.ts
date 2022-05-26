import Model from "@src/config/knexConnection";
import { autoImplementWithBase } from "@src/utils";
import IEntities from "./entities";

export default class ProductHasTagsModel extends autoImplementWithBase(Model)<IEntities>() {
  static get tableName() {
    return "product_has_tag";
  }
}
