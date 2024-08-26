export interface GetUserInput {
  userID: number;
  subject: string;
}

export interface AddUserInput extends GetUserInput {
  input: string;
  algorithm?: string;
  actionDate?: Date;
  size?: number;
  to?: string[];
  from?: string[];
  weight?: string[];
}
