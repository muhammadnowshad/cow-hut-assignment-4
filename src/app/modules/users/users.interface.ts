/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose'
import { IAdmin } from '../admin/admin.interface'

export type IUser = {
  id: string;
  role: string
  password: string
  needsPasswordChange: boolean
  passwordChangedAt?: Date
  name: {
    firstName: string
    lastName: string
  }
  phoneNumber: string
  address: string
  budget: number
  income: number
  admin?: Types.ObjectId | IAdmin
}

export type UserModel = {
  isUserExist(
    phoneNumber: string
  ): Promise<
    Pick<IUser, 'phoneNumber' | 'password' | 'role' | 'needsPasswordChange'>
  >
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>
} & Model<IUser>


