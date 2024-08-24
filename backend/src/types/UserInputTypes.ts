export interface UserInputAttributes extends UserInputT {
  size: number
}

export interface UserInputT {
  userID: number
  subject: string
  algorithm: string
  actionDate: Date
  input: string
  size?: number
  from?: string[]
  to?: string[]
  weight?: string[]
}

export interface IUserGetInput {
  userID: number
  subject: string
  algorithm: string
}

export interface IUserDeleteInput {
  userID: number
  subject: string
  algorithm: string
  input: string
}
