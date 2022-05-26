import Model from "@src/config/knexConnection";
import { autoImplementWithBase } from "@src/utils";
import moment from "moment";
import IEntities from "./entities";

export default class UserPasswordResetModel extends autoImplementWithBase(Model)<IEntities>() {
  public created_at: string;
  static get tableName() {
    return "user_password_resets";
  }

  static get idColumn() {
    return "id";
  }
  public $beforeInsert() {
    this.created_at = moment().utc().format("YYYY-MM-DD HH:mm:ss");
  }
}