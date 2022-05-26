import Model from "@src/config/knexConnection";
import { autoImplementWithBase } from "@src/utils";
import IUserSessionEntities from './entities';

export default class UserSessionMOdel extends autoImplementWithBase(Model)<IUserSessionEntities>() {
    static get tableName() {
        return "user_session";
    }

    static get idColumn() {
        return "id";
    }
}