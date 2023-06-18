interface DialogUser {
  id: number;
  login: string;
}

export interface Dialog {
  id: number;
  users: DialogUser[];
  createdAt: number;
}

export interface AddMessageAction {
  text: string;
  ownerId: number;
}

export interface Message {
  id: number;
  dialogId: number;
  text: string;
  ownerId: number;
  createdAt: number;
}
