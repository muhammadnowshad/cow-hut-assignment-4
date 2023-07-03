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
const sendResponse_1 = __importDefault(require('../../../shared/sendResponse'))
const catchAsync_1 = __importDefault(require('../../../shared/catchAsync'))
const pick_1 = __importDefault(require('../../../shared/pick'))
const http_status_1 = __importDefault(require('http-status'))
const users_service_1 = require('./users.service')
const pagination_1 = require('../../../constants/pagination')
const createUser = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const { user } = req.body
      const result = yield users_service_1.UserService.createUser(user)
      res.status(200).json({
        success: true,
        statusCode: 200,
        message: 'Users created successfully',
        data: result,
      })
    } catch (err) {
      res.status(400).json({
        success: false,
        message: 'Failed to created users',
      })
    }
  })
const getAllUsers = (0, catchAsync_1.default)((req, res, next) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const paginationOptions = (0, pick_1.default)(
      req.query,
      pagination_1.paginationFields
    )
    const result = yield users_service_1.UserService.getAllUser(
      paginationOptions
    )
    ;(0, sendResponse_1.default)(res, {
      success: true,
      statusCode: http_status_1.default.OK,
      message: 'Users retrieved successfully',
      meta: result.meta,
      data: result.data,
    })
    next()
  })
)
const getSingleUser = (0, catchAsync_1.default)((req, res, next) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id
    const result = yield users_service_1.UserService.getSingleUser(id)
    ;(0, sendResponse_1.default)(res, {
      statusCode: http_status_1.default.OK,
      success: true,
      message: 'Single User retrieved successfully !',
      data: result,
    })
    next()
  })
)
const deleteUser = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id
    const result = yield users_service_1.UserService.deleteUser(id)
    ;(0, sendResponse_1.default)(res, {
      statusCode: http_status_1.default.OK,
      success: true,
      message: 'User deleted successfully !',
      data: result,
    })
  })
)
const updateUser = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id
    const updatedData = req.body
    const result = yield users_service_1.UserService.updateUser(id, updatedData)
    ;(0, sendResponse_1.default)(res, {
      statusCode: http_status_1.default.OK,
      success: true,
      message: 'User updated successfully !',
      data: result,
    })
  })
)
exports.default = {
  createUser,
  getAllUsers,
  getSingleUser,
  deleteUser,
  updateUser,
}
