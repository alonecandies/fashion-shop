import UserSessionModel from "@src/models/user_session";
import { BaseRepository } from "./baseRepository";

export class UserSessionRepository extends BaseRepository<UserSessionModel>{
  /** remove all token expires by user */
  public async removeAllExpiresByUser(idUser: number) {
    try {
      const result = await UserSessionModel.query()
        .where({ user_id: idUser })
        .whereRaw(`updated_at + expires_in < UTC_TIMESTAMP()`)
        .del();
      return result;
    } catch (err) {
      throw err;
    }
  }

  public async removeAllByUserId(idUser: number) {
    try {
      const result = await UserSessionModel.query()
        .where({ user_id: idUser })
        .del();
      return result;
    } catch (err) {
      throw err;
    }
  }
}