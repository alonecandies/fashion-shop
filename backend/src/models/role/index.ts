import Model from "@src/config/knexConnection";
import { autoImplementWithBase } from "@src/utils";
import IRoleEntities from './entities'

export default class RoleModal extends autoImplementWithBase(Model)<IRoleEntities>(){
    static get tableName() {
        return "role";
    }

    static get idColumn() {
        return "id";
    }
}