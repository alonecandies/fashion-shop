export interface IContactBody {
  full_name: string;
  email: string;
  phone: string;
  content: string;
}

export type IClearMsgPayload = `fetchContactMsg`;
