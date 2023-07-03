/* eslint-disable @typescript-eslint/consistent-type-definitions */

import { Schema, model, Document } from 'mongoose'

export default interface IOrder extends Document {
  cow: Schema.Types.ObjectId
  buyer: Schema.Types.ObjectId
}

const orderSchema = new Schema<IOrder>(
  {
    cow: {
      type: Schema.Types.ObjectId,
      ref: 'Cow',
      required: true,
    },
    buyer: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  }
)

export const Order = model<IOrder>('Order', orderSchema)
