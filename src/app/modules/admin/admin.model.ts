/* eslint-disable @typescript-eslint/no-this-alias */

import { Schema, model, Model } from 'mongoose'
import { IAdmin } from './admin.interface'
import bcrypt from 'bcrypt'
import config from '../../../config'

type AdminModel = Model<IAdmin, object>

const adminSchema = new Schema<IAdmin>(
  {
    password: {
      type: String,
      required: true,
      // select: 0,
    },
    role: {
      type: String,
      required: true,
    },
    name: {
      firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
        required: true,
      },
    },
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
    },
    address: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
)

// admin.create() 
adminSchema.pre('save', async function (next) {
  // hashing user password
  const admin = this
  admin.password = await bcrypt.hash(
    admin.password,
    Number(config.bycrypt_salt_rounds)
  );
  next();
});

export const Admin = model<IAdmin, AdminModel>('Admin', adminSchema)
