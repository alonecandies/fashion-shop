import Model from "@src/config/knexConnection";
import { autoImplementWithBase } from "@src/utils";
import moment from "moment";
import IShoppingCartEntities from './entities'

export default class ShoppingCartModel extends autoImplementWithBase(Model)<IShoppingCartEntities>() {
  public created_at?: string;
  public updated_at?: string;
  static get tableName() {
    return "shopping_cart";
  }

  static get idColumn() {
    return "id";
  }
  public $beforeInsert() {
    this.created_at = moment().format("YYYY-MM-DD HH:mm:ss");
    this.is_deleted = 0;
  }

  public $beforeUpdate() {
    this.updated_at = moment().format("YYYY-MM-DD HH:mm:ss");
  }
}