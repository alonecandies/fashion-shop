import Model from "@src/config/knexConnection";
import { autoImplementWithBase } from "@src/utils";
import moment from "moment";
import IUserEntities from './entities'

export default class UserModel extends autoImplementWithBase(Model)<IUserEntities>() {
  public created_at?: string;
  public updated_at?: string;
  static get tableName() {
    return "user";
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