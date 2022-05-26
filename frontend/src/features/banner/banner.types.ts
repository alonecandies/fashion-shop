export interface IBanner {
  id: number;
  url: string;
  title: string;
  type: number;
}

export type IClearMsgPayload = `fetchGetAllBannersMsg`;
