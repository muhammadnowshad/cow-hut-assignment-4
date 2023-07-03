/* eslint-disable @typescript-eslint/consistent-type-definitions */

import { Document } from 'mongoose'
export interface IAdmin extends Document {
  password: string
  role: string
  name: {
    firstName: string
    lastName: string
  }
  phoneNumber: string
  address: string
}
