import config from '../../../config'
import { IGenericResponse } from '../../../interfaces/common'
import { IPaginationOptions } from '../../../interfaces/pagination'
import { IUser } from './users.interface'
import { User } from './users.model'

//create user
const createUser = async (user: IUser): Promise<IUser | null> => {

  if (!user.password) {
    user.password = config.default_user_pass as string
  }

  const createdUser = await User.create(user)
  if (!createUser) {
    throw new Error('Failed to created users!')
  }
  return createdUser
}

//get all users
const getAllUser = async (
  paginationOption: IPaginationOptions
): Promise<IGenericResponse<IUser[]>> => {
  const { page = 1, limit = 10 } = paginationOption
  const skip = (page - 1) * limit
  const result = await User.find().sort().skip(skip).limit(limit)
  const total = await User.countDocuments()
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
}

//get single user
const getSingleUser = async (id: string): Promise<IUser | null> => {
  const result = await User.findById(id)
  return result
}

//delete user
const deleteUser = async (id: string): Promise<IUser | null> => {
  const result = await User.findByIdAndDelete(id)
  return result
}

//update user
const updateUser = async (
  id: string,
  payload: Partial<IUser>
): Promise<IUser | null> => {
  const result = await User.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  })
  return result
}

export const UserService = {
  createUser,
  getAllUser,
  getSingleUser,
  deleteUser,
  updateUser,
}
