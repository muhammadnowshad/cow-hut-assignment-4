'use strict'
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value)
          })
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value))
        } catch (e) {
          reject(e)
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value))
        } catch (e) {
          reject(e)
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected)
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next())
    })
  }
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
exports.UserService = void 0
const config_1 = __importDefault(require('../../../config'))
const users_model_1 = require('./users.model')
const users_utils_1 = require('./users.utils')
//create user
const createUser = user =>
  __awaiter(void 0, void 0, void 0, function* () {
    const id = yield (0, users_utils_1.generateUserId)()
    user.id = id
    if (!user.password) {
      user.password = config_1.default.default_user_pass
    }
    const createdUser = yield users_model_1.User.create(user)
    if (!createUser) {
      throw new Error('Failed to created users!')
    }
    return createdUser
  })
//get all users
const getAllUser = paginationOption =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { page = 1, limit = 10 } = paginationOption
    const skip = (page - 1) * limit
    const result = yield users_model_1.User.find()
      .sort()
      .skip(skip)
      .limit(limit)
    const total = yield users_model_1.User.countDocuments()
    return {
      meta: {
        page,
        limit,
        total,
      },
      data: result,
    }
  })
//get single user
const getSingleUser = id =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield users_model_1.User.findById(id)
    return result
  })
//delete user
const deleteUser = id =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield users_model_1.User.findByIdAndDelete(id)
    return result
  })
//update user
const updateUser = (id, payload) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield users_model_1.User.findOneAndUpdate(
      { _id: id },
      payload,
      {
        new: true,
      }
    )
    return result
  })
exports.UserService = {
  createUser,
  getAllUser,
  getSingleUser,
  deleteUser,
  updateUser,
}
