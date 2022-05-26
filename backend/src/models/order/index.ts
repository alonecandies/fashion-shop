import Model from "@src/config/knexConnection";
import { autoImplementWithBase } from "@src/utils";
import moment from "moment";
import IOrderEntities from './entities'

export default class OrderModel extends autoImplementWithBase(Model)<IOrderEntities>() {
  public created_at?: string;
  public updated_at?: string;
  static get tableName() {
    return "order";
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