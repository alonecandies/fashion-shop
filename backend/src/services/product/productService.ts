import { CATEGORY_LEVEL, COMMON_STATUS, IS_DELETED, PAGE_SIZE, TYPE_PRODUCT, TYPE_PRODUCT_PRICE, TYPE_UPDATE_RELATIONS_PRODUCT } from "@src/config";
import HttpException from "@src/middleware/exceptions/httpException";
import logger from "@src/middleware/logger";
import { ok } from "@src/middleware/response";
import ProductModel from '@src/models/products/product';
import ProductColorModel from "@src/models/products/product_color";
import ProductSizeModel from "@src/models/products/product_size";
import ProductTagModel from '@src/models/products/product_tag';
import ProductHasColorsModel from '@src/models/products/product_has_colors';
import ProductHasSizesModel from '@src/models/products/product_has_size';
import ProductHasTagsModel from '@src/models/products/product_has_tag';
import { raw, transaction } from "objection";

export default class ProductService {

  public async getAllProduct(
    category,
    levelCategory = CATEGORY_LEVEL.LEVEL2,
    name,
    code,
    status = COMMON_STATUS.ALL,
    type = TYPE_PRODUCT.DEFAULT,
    money = TYPE_PRODUCT_PRICE.ALL,
    tag,
    orderNo = 0,
    page = 0, pageSize = PAGE_SIZE.Standand
  ): Promise<any> {
    try {
      const orderArrays = this.getOrder(typeof orderNo === 'string' ? Number.parseInt(orderNo) : orderNo);
      const orderArraysTypeProduct = this.getOrderTypeProduct(typeof type === 'string' ? Number.parseInt(type) : type);
      let query = ProductModel.query().select(["product.*", "C.name as product_category_name"])
        .leftJoin("category as C", "C.id", "product.category_id")
        .withGraphFetched('[tags, colors, sizes]')
        .where("product.is_deleted", IS_DELETED.No)
        .andWhere("C.is_deleted", IS_DELETED.No);
      if (tag) {
        query = query
          .leftJoin("product_has_tag as pht", "product.id", "pht.product_id")
          .leftJoin("tag as t", "pht.tag_id", "t.id")
          .where("t.id", tag);
      }
      if (name) {
        query = query.where(builder => builder.where("product.title", "like", `%${name}%`))
      }
      if (code) {
        query = query.where(builder => builder.where("product.code_product", "like", `%${code}%`))
      }
      if (status && status != COMMON_STATUS.ALL) {
        query = query.where("product.status", status);
      }
      if (category) {
        const whereCategory = this.checkFilterCategoryProduct(category, Number.parseInt(levelCategory.toString()));
        query = query.whereRaw(whereCategory);
        //query = query.where("product.category_id", category);
      }
      if (type) {
        query = query.orderBy(orderArraysTypeProduct[0], orderArraysTypeProduct[1])
      } else {
        query = query.orderBy(orderArrays[0], orderArrays[1])
      }
      if (money) {
        type = typeof money === 'string' ? Number.parseInt(money) : money;
        if (type !== TYPE_PRODUCT_PRICE.ALL) {
          const wherePrice = this.checkFilterPriceProduct(type);
          query = query.whereRaw(wherePrice);
        }
      }
      return query.page(page, pageSize);
    } catch (err) {
      throw new HttpException(500, err.message);
    }
  }

  public checkFilterCategoryProduct(category: number, levelCategory: number) {
    switch (levelCategory) {
      case CATEGORY_LEVEL.LEVEL0:
        return `product.category_id in (SELECT id FROM category 
          WHERE category.category_level_1_id in (SELECT id FROM category_level_1 
          WHERE category_level_1.category_level_0_id = ${category}))`;
      case CATEGORY_LEVEL.LEVEL1:
        return `product.category_id in (SELECT id FROM category WHERE category.category_level_1_id = ${category})`;
      case CATEGORY_LEVEL.LEVEL2:
        return `(product.category_id = ${category} )`;
    }
  }

  public checkFilterPriceProduct(type) {
    switch (type) {
      case TYPE_PRODUCT_PRICE.LEVEL_0:
        return `(product.web_price >= 500000)`;
      case TYPE_PRODUCT_PRICE.LEVEL_1:
        return `(product.web_price >= 500000 and product.web_price <= 1000000)`;
      case TYPE_PRODUCT_PRICE.LEVEL_2:
        return `(product.web_price >= 1000000 and product.web_price <= 2000000)`;
      case TYPE_PRODUCT_PRICE.LEVEL_3:
        return `(product.web_price >= 2000000)`;
    }
  }

  public async getAllProductByCategory(categoryId): Promise<ProductModel[]> {
    try {
      let results = ProductModel.query().select(["product.*", "C.name as product_category_name"])
        .leftJoin("category as C", "C.id", "product.category_id").where("product.is_deleted", IS_DELETED.No).andWhere("product.category_id", categoryId);
      return results;
    } catch (err) {
      throw new HttpException(500, err.message);
    }
  }

  public async checkHaveTagProduct(id): Promise<boolean> {
    try {
      let check = false;
      const listProducts = await ProductModel.query().select(["product.*", "C.name as product_category_name"])
        .leftJoin("category as C", "C.id", "product.category_id").withGraphFetched('[tags]').where("product.is_deleted", IS_DELETED.No);
      listProducts.map(product => {
        if (!product.tags || product.tags.length <= 0) return false;
        const index = product.tags.findIndex(tag => tag.id == id);
        if (index >= 0) check = true;
      })
      return check;
    } catch (err) {
      throw new HttpException(500, err.message);
    }
  }

  public async checkHaveSizeProduct(id): Promise<boolean> {
    try {
      let check = false;
      const listProducts = await ProductModel.query().select(["product.*", "C.name as product_category_name"])
        .leftJoin("category as C", "C.id", "product.category_id").withGraphFetched('[sizes]').where("product.is_deleted", IS_DELETED.No).andWhere("C.is_deleted", IS_DELETED.No);;
      listProducts.map(product => {
        if (!product.sizes || product.sizes.length <= 0) return false;
        const index = product.sizes.findIndex(size => size.id == id);
        if (index >= 0) check = true;
      })
      return check;
    } catch (err) {
      throw new HttpException(500, err.message);
    }
  }

  public async checkHaveColorProduct(id): Promise<boolean> {
    try {
      let check = false;
      const listProducts = await ProductModel.query().select(["product.*", "C.name as product_category_name"])
        .leftJoin("category as C", "C.id", "product.category_id").withGraphFetched('[colors]').where("product.is_deleted", IS_DELETED.No);
      listProducts.map(product => {
        if (!product.colors || product.colors.length <= 0) return false;
        const index = product.colors.findIndex(color => color.id == id);
        if (index >= 0) check = true;
      })
      return check;
    } catch (err) {
      throw new HttpException(500, err.message);
    }
  }

  public async getDetailsProductRelated(id): Promise<ProductModel> {
    try {
      const result = await ProductModel.query()
        .select(["product.*", "C.name as product_category_name"])
        .leftJoin("category as C", "C.id", "product.category_id")
        .findById(id)
        .withGraphFetched('[tags, colors, sizes]');
      return result;
    } catch (err) {
      throw new HttpException(500, err.message);
    }
  }

  public async getDetailsProduct(id): Promise<ProductModel> {
    try {
      const result = await ProductModel.query()
        .select(["product.*"])
        .findById(id)
        .withGraphFetched('[tags, colors, sizes]');
      return result;
    } catch (err) {
      throw new HttpException(500, err.message);
    }
  }

  public async createProduct(product: ProductModel, tags: number[], sizes: number[], colors: number[]): Promise<any> {
    try {
      const scrappy = await transaction(ProductModel, ProductHasColorsModel, ProductHasSizesModel, ProductHasTagsModel,
        async (productModel, productHasColorsModel, productHasSizesModel, productHasTagsModel) => {
          // add product
          product.is_deleted = IS_DELETED.No;
          product.status = COMMON_STATUS.Active;
          const newProduct = await productModel.query().insert(product);

          // add product has tags
          if (tags && tags.length > 0) {
            await Promise.all(
              tags.map(async (tagId: number) => {
                if (typeof tagId !== 'number') throw new HttpException(500, "Tags must be array number");
                const tagRelations = {
                  product_id: newProduct.id,
                  tag_id: tagId
                } as ProductHasTagsModel;
                return productHasTagsModel.query().insert(tagRelations);
              }));
          }

          // add product has colors
          if (sizes && sizes.length > 0) {
            await Promise.all(
              sizes.map(async (sizeId: number) => {
                if (typeof sizeId !== 'number') throw new HttpException(500, "Sizes must be array number");
                const sizeRelations = {
                  product_id: newProduct.id,
                  size_product_id: sizeId
                } as ProductHasSizesModel;
                return productHasSizesModel.query().insert(sizeRelations);
              }));
          }

          // add product has size
          if (colors && colors.length > 0) {
            await Promise.all(
              colors.map(async (colorId: number) => {
                if (typeof colorId !== 'number') throw new HttpException(500, "Colors must be array number");
                const colorRelations = {
                  product_id: newProduct.id,
                  color_product_id: colorId
                } as ProductHasColorsModel;
                return productHasColorsModel.query().insert(colorRelations);
              }));
          }
          return newProduct;
        });
      logger.info("create Product");
      logger.info(JSON.stringify(scrappy));
      const result = await this.getDetailsProduct(scrappy.id);
      return result;
    } catch (err) {
      throw new HttpException(500, err.message);
    }
  }

  public async updateProduct(product: ProductModel, tags: number[], sizes: number[], colors: number[]): Promise<any> {
    try {

      if (product?.created_at) delete product.created_at;
      if (product?.updated_at) delete product.updated_at;

      const scrappy = await transaction(ProductModel, ProductHasColorsModel, ProductHasSizesModel, ProductHasTagsModel,
        async (productModel, productHasColorsModel, productHasSizesModel, productHasTagsModel) => {
          // update product
          const updateProduct = await productModel.query().updateAndFetchById(product.id, product);

          // add product has tags
          if (tags && tags.length > 0) {
            await tags.map(async (tagId: number) => {
              if (typeof tagId !== 'number') throw new HttpException(500, "Tags must be array number");
            });
            let listOldData = await ProductHasTagsModel.query().select(["*"]).where("product_id", updateProduct.id);
            await Promise.all(
              listOldData.map(async data => {
                return productHasTagsModel.query().delete().where("product_id", data.product_id);
              })
            )
            await Promise.all(
              tags.map(async (tagId: number) => {
                const tagRelations = {
                  product_id: updateProduct.id,
                  tag_id: tagId
                } as ProductHasTagsModel;
                return productHasTagsModel.query().insert(tagRelations);
              }));
          }

          // add product has Size
          if (sizes && sizes.length > 0) {
            await sizes.map(async (sizeId: number) => {
              if (typeof sizeId !== 'number') throw new HttpException(500, "Sizes must be array number");
            });
            let listOldData = await productHasSizesModel.query().select(["*"]).where("product_id", updateProduct.id);
            await Promise.all(
              listOldData.map(async data => {
                return productHasSizesModel.query().delete().where("product_id", data.product_id);
              })
            )
            await Promise.all(
              sizes.map(async (sizeId: number) => {
                const sizeRelations = {
                  product_id: updateProduct.id,
                  size_product_id: sizeId
                } as ProductHasSizesModel;
                return productHasSizesModel.query().insert(sizeRelations);
              }));
          }

          // add product has color
          if (colors && colors.length > 0) {
            await colors.map(async (colorId: number) => {
              if (typeof colorId !== 'number') throw new HttpException(500, "Colors must be array number");
            });
            let listOldData = await productHasColorsModel.query().select(["*"]).where("product_id", updateProduct.id);
            await Promise.all(
              listOldData.map(async data => {
                return productHasColorsModel.query().delete().where("product_id", data.product_id);
              })
            )
            await Promise.all(
              colors.map(async (colorId: number) => {
                const colorRelations = {
                  product_id: updateProduct.id,
                  color_product_id: colorId
                } as ProductHasColorsModel;
                return productHasColorsModel.query().insert(colorRelations);
              }));
          }
          const result = await productModel.query().findById(updateProduct.id).withGraphFetched('[tags, colors, sizes]');
          return result;
        });

      logger.info("update Product");
      logger.info(JSON.stringify(scrappy));
      return scrappy;
    } catch (err) {
      throw new HttpException(500, err.message);
    }
  }

  public async updateStatusProduct(product: ProductModel, status): Promise<ProductModel> {
    try {
      product.status = status;
      const newProduct = await ProductModel.query().updateAndFetchById(product.id, product);
      return newProduct;
    } catch (err) {
      throw new HttpException(500, err.message);
    }
  }

  public async updateQuantityProduct(product: ProductModel, status): Promise<ProductModel> {
    try {
      product.out_of_stock = status;
      const newProduct = await ProductModel.query().updateAndFetchById(product.id, product);
      return newProduct;
    } catch (err) {
      throw new HttpException(500, err.message);
    }
  }

  public async updateLikeProduct(product: ProductModel): Promise<ProductModel> {
    try {
      product.number_of_likes = product.number_of_likes + 1;
      const newProduct = await ProductModel.query().updateAndFetchById(product.id, product);
      return newProduct;
    } catch (err) {
      throw new HttpException(500, err.message);
    }
  }

  public async updateViewedProduct(product: ProductModel): Promise<ProductModel> {
    try {
      product.viewd = product.viewd + 1;
      const newProduct = await ProductModel.query().updateAndFetchById(product.id, product);
      return newProduct;
    } catch (err) {
      throw new HttpException(500, err.message);
    }
  }

  public async deleteProduct(product: ProductModel): Promise<ProductModel> {
    try {
      product.is_deleted = IS_DELETED.Yes;
      const newProduct = await ProductModel.query().updateAndFetchById(product.id, product);
      return newProduct;
    } catch (err) {
      throw new HttpException(500, err.message);
    }
  }

  public getOrder(orderBy: number) {
    let orders;
    switch (orderBy) {
      case 0:
        orders = ["product.created_at", "desc"];
        break;
      case 1:
        orders = ["product.created_at", "asc"];
        break;
      default:
        orders = ["product.created_at", "desc"];
        break;
    }
    return orders;
  }

  public getOrderTypeProduct(type: number) {
    let orders;
    switch (type) {
      case TYPE_PRODUCT.HOT:
        orders = ["product.number_of_likes", "desc"];
        break;
      case TYPE_PRODUCT.VIEW:
        orders = ["product.viewd", "desc"];
        break;
      case TYPE_PRODUCT.DEFAULT:
        orders = ["product.created_at", "desc"];
        break;
    }
    return orders;
  }
}