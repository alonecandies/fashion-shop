import Knex from "knex";

import Model from "@src/config/knexConnection";
import { autoImplementWithBase } from "@src/utils";
import moment from "moment";
import IProductEntities from './entities'
import ProductTagModel from '../product_tag';
import ProductSizeModel from '../product_size';
import ProductColorModel from '../product_color';

export default class ProductModel extends autoImplementWithBase(Model)<IProductEntities>() {
  public created_at?: string;
  public updated_at?: string;
  static get tableName() {
    return "product";
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

  static relationMappings = {
    tags: {
      relation: Model.ManyToManyRelation,
      modelClass: ProductTagModel,
      join: {
        from: 'product.id',
        through: {
          from: 'product_has_tag.product_id',
          to: 'product_has_tag.tag_id'
        },
        to: 'tag.id'
      }
    },

    colors: {
      relation: Model.ManyToManyRelation,
      modelClass: ProductColorModel,
      join: {
        from: 'product.id',
        through: {
          from: 'product_has_color_product.product_id',
          to: 'product_has_color_product.color_product_id'
        },
        to: 'color_product.id'
      }
    },

    sizes: {
      relation: Model.ManyToManyRelation,
      modelClass: ProductSizeModel,
      join: {
        from: 'product.id',
        through: {
          from: 'product_has_size_product.product_id',
          to: 'product_has_size_product.size_product_id'
        },
        to: 'size_product.id'
      }
    }
  };
}