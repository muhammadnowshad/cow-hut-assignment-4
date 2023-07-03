import { SortOrder } from 'mongoose'
import { paginationHelpers } from '../../../helpers/paginationHelper'
import { IGenericResponse } from '../../../interfaces/common'
import { IPaginationOptions } from '../../../interfaces/pagination'
import { ICow, ICowFilters } from './cows.interface'
import { Cow } from './cows.model'

const createCow = async (cow: ICow): Promise<ICow | null> => {
  const createdCow = await Cow.create(cow)
  if (!createCow) {
    throw new Error('Failed to create cow!')
  }
  return createdCow
}
const getAllCow = async (
  filters: ICowFilters,
  paginationOption: IPaginationOptions
): Promise<IGenericResponse<ICow[]>> => {
  const {
    searchTerm,
    location,
    breed,
    category,
    minPrice,
    maxPrice,
    ...filtersData
  } = filters
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOption)

  const andConditions = []

  if (searchTerm) {
    andConditions.push({
      $or: [
        { location: { $regex: searchTerm, $options: 'i' } },
        { breed: { $regex: searchTerm, $options: 'i' } },
        { category: { $regex: searchTerm, $options: 'i' } },
      ],
    })
  }

  if (location) {
    andConditions.push({ location })
  }

  if (breed) {
    andConditions.push({ breed })
  }

  if (category) {
    andConditions.push({ category })
  }

  if (minPrice !== undefined && maxPrice !== undefined) {
    andConditions.push({
      price: { $gte: minPrice, $lte: maxPrice },
    })
  } else if (minPrice !== undefined) {
    andConditions.push({
      price: { $gte: minPrice },
    })
  } else if (maxPrice !== undefined) {
    andConditions.push({
      price: { $lte: maxPrice },
    })
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    })
  }

  // ...

  const sortConditions: { [key: string]: SortOrder } = {}

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder
  }
  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {}

  const result = await Cow.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit)

  const total = await Cow.countDocuments()

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
}
//get single cow
const getSingleCow = async (id: string): Promise<ICow | null> => {
  const result = await Cow.findById(id)
  return result
}
//delete cow
const deleteCow = async (id: string): Promise<ICow | null> => {
  const result = await Cow.findByIdAndDelete(id)
  return result
}

//update cow
const updateCow = async (
  id: string,
  payload: Partial<ICow>
): Promise<ICow | null> => {
  const result = await Cow.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  })
  return result
}

export const CowService = {
  createCow,
  getAllCow,
  getSingleCow,
  deleteCow,
  updateCow,
}
