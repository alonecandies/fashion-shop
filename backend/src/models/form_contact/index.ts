import Model from "@src/config/knexConnection";
import moment from "moment";
import { autoImplementWithBase } from "@src/utils";
import IContactFormEntities from './entities';

export default class ContactFormModel extends autoImplementWithBase(Model)<IContactFormEntities>() {
    public created_at?: string;
    public updated_at?: string;
    static get tableName() {
        return "contact_form";
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