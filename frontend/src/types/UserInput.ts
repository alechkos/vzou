export interface GetUserInput {
  userID: number;
  subject: string;
  algorithm: string;
}

export interface AddUserInput extends GetUserInput {
  input: string;
  actionDate?: Date;
  size?: number;
}
