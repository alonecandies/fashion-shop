import Knex from "knex";
import { Model } from "objection";
import config from ".";

const knex = Knex({
  client: "mysql",
  connection: {
    host: config.DB_HOST_NAME,
    database: config.DB_NAME,
    user: config.DB_ADMIN_USERNAME,
    password: config.DB_ADMIN_PASSWORD,
    port: parseInt(config.DB_PORT)
  },
  debug: false
});
Model.knex(knex);

export default Model;
