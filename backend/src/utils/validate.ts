import Joi from "joi";
import moment from "moment";

export default class MsValidate {
  private joi: Joi.AnySchema;

  public validateSignup(signupObj: any) {
    const object = {
      password: Joi.string().min(6)
        .required(),
      email: Joi.string()
        .email({ minDomainSegments: 2 }),
      full_name: Joi.string(),
      phone: Joi.allow(),
      address: Joi.string(),
    };
    return this.setUpJoi(object, signupObj);
  }

  public validateUpateUser(userObj: any) {
    const object = {
      full_name: Joi.string(),
      phone: Joi.string(),
      address: Joi.string(),
    };
    return this.setUpJoi(object, userObj);
  }

  private setUpJoi(objectInit: any, objectUpdate: any) {
    this.joi = Joi.object(objectInit);
    // delete objectUpdate["g-recaptcha-response"];
    return this.joi.validateAsync(objectUpdate);
  }

  public validateCheckMail(signupObj: any) {
    const object = {
      email: Joi.string()
        .email({ minDomainSegments: 2 })
    };
    return this.setUpJoi(object, signupObj);
  }

  public validateUpdateCart(cartObj: any) {
    const object = {
      // user_id: Joi.number().required(),
      address: Joi.string().required(),
      phone: Joi.string().required(),
      full_name: Joi.string().required(),
      orders: Joi.any().required(),
    };
    return this.setUpJoi(object, cartObj);
  }

  public validateUpdateProduct(productObj: any) {
    const object = {
      code_product: Joi.string().allow(null),
      title: Joi.string().required(),
      web_price: Joi.number().required(),
      out_of_stock: Joi.number().required().allow(null),
      sale: Joi.number().required(),
      // type: Joi.number().allow(null),
      status: Joi.number().allow(null),
      number_of_likes: Joi.number().allow(null),
      category_id: Joi.number().required(),
      description: Joi.string().required().allow(''),
      tags: Joi.array().required().allow(null),
      colors: Joi.array().required().allow(null),
      sizes: Joi.array().required().allow(null),
      viewd: Joi.number().allow(null),
      id: Joi.number()
    };
    return this.setUpJoi(object, productObj);
  }

  public validateUpdateCategory(categoryObj: any) {
    const object = {
      name: Joi.string().required(),
      level: Joi.number().required(),
      parent_id: Joi.number().required().allow(null).allow(""),
    };
    return this.setUpJoi(object, categoryObj);
  }

  public validateUpdateBlog(blogObj: any) {
    const object = {
      title: Joi.string().required(),
      type: Joi.number().allow(null),
      status: Joi.number().allow(null),
      number_of_likes: Joi.number().allow(null),
      blog_category_id: Joi.number().required(),
      content: Joi.string().allow(),
      viewd: Joi.number().allow(null)
    };
    return this.setUpJoi(object, blogObj);
  }

}