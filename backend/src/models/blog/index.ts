import Knex from "knex";

import Model from "@src/config/knexConnection";
import { autoImplementWithBase } from "@src/utils";
import moment from "moment";
import IBlogEntities from './entities'

export default class BlogModel extends autoImplementWithBase(Model)<IBlogEntities>() {
  public created_at?: string;
  public updated_at?: string;
  static get tableName() {
    return "blog";
  }

  static get idColumn() {
    return "id";
  }
  public $beforeInsert() {
    this.created_at = moment().format("YYYY-MM-DD HH:mm:ss");
    this.updated_at = moment().format("YYYY-MM-DD HH:mm:ss");
    this.is_deleted = 0;
  }

  public $beforeUpdate() {
    this.updated_at = moment().format("YYYY-MM-DD HH:mm:ss");
  }

  // static relationMappings = {
  //   tags: {
  //     relation: Model.ManyToManyRelation,
  //     modelClass: ProductTagModel,
  //     join: {
  //       from: 'product.id',
  //       through: {
  //         from: 'product_has_tag.product_id',
  //         to: 'product_has_tag.tag_id'
  //       },
  //       to: 'tag.id'
  //     }
  //   }
  // };
}