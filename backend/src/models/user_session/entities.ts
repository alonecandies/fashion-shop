export default interface IUserSessionEntities {
    id: number;
    user_id: number;
    access_token: string;
    refresh_token: string;
    expires_in: number;
    created_at: string;
    updated_at: string;
}
