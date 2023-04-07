interface DialogUser {
  id: number;
  login: string;
}

export interface Dialog {
  id: number;
  users: DialogUser[];
  created_at: string;
}

export interface Message {
  id: number;
  dialog_id: number;
  text: string;
  owner_id: number;
  created_at: string;
}
