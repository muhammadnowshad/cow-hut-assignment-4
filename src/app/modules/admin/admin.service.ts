import config from '../../../config'
import { IGenericResponse } from '../../../interfaces/common'
import { IPaginationOptions } from '../../../interfaces/pagination'
import { IAdmin } from './admin.interface'
import { Admin } from './admin.model'

//create admin
const createAdmin = async (admin: IAdmin): Promise<IAdmin | null> => {
  //default password
  if (!admin.password) {
    admin.password = config.default_admin_pass as string
  };

  const createdAdmin = await Admin.create(admin)
  if (!createAdmin) {
    throw new Error('Failed to created admin!')
  }
  return createdAdmin
}


//get all admin
const getAllAdmin = async (
  paginationOption: IPaginationOptions
): Promise<IGenericResponse<IAdmin[]>> => {
  const { page = 1, limit = 10 } = paginationOption
  const skip = (page - 1) * limit
  const result = await Admin.find().sort().skip(skip).limit(limit)
  const total = await Admin.countDocuments()
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
}

export const AdminService = {
  createAdmin,
  getAllAdmin,
}
