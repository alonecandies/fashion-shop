import Model from "@src/config/knexConnection";
import { autoImplementWithBase } from "@src/utils";
import IProductTagEntities from './entities';
import ProductModel from '../product';

export default class ProductTagModel extends autoImplementWithBase(Model)<IProductTagEntities>() {

  static get tableName() {
    return "tag";
  }

  static get idColumn() {
    return "id";
  }
}