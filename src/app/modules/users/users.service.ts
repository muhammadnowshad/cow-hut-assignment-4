
import config from '../../../config'
import { IGenericResponse } from '../../../interfaces/common'
import { IPaginationOptions } from '../../../interfaces/pagination'
import { IUser } from './users.interface'
import { User } from './users.model'
import { generateUserId } from './users.utils'

//create user
const createUser = async (user: IUser): Promise<IUser | null> => {
  const id = await generateUserId()
  user.id = id
  if (!user.password) {
    user.password = config.default_user_pass as string
  }

  const createdUser = await User.create(user)
  if (!createUser) {
    throw new Error('Failed to created users!')
  }
  return createdUser
}

// const createUser = async (
//   user: IUser
// ): Promise<IUser | null> => {
//   // If password is not given,set default password
//     if (!user.password) {
//       user.password = config.default_user_pass as string
//     }

//   let newUserAllData = null
//   const session = await mongoose.startSession()
//   try {
//     session.startTransaction()

//     // Create student using sesssin
//     const createdUser = await User.create([user], { session })
//     //   const createdUser = await User.create(user)
//     //   if (!createUser) {
//     //     throw new Error('Failed to created users!')
//     //   }

//     if (!createdUser.length) {
//       throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create student')
//     }
    
//     newUserAllData = createdUser[0]._id

//     await session.commitTransaction()
//     await session.endSession()
//   } catch (error) {
//     await session.abortTransaction()
//     await session.endSession()
//     throw error
//   }

//   return newUserAllData
// }

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
