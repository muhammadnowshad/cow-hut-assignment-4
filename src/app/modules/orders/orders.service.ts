/* eslint-disable @typescript-eslint/consistent-type-definitions */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-undef */

import { Document } from 'mongoose'
import IOrder, { Order } from './orders.model'
import { ICow } from '../cows/cows.interface'
import { IUser } from '../users/users.interface'
import { Cow } from '../cows/cows.model'
import { User } from '../users/users.model'

interface TransactionData {
  cow: ICow
  buyer: IUser
}

const initiateTransaction = async (data: TransactionData): Promise<void> => {
  const session = await Order.startSession()
  session.startTransaction()

  try {
    const { cow, buyer } = data

    if (!cow || !cow.id) {
      throw new Error('Invalid cow object');
    }

    // Update cow's status to 'sold out'
    await Cow.findByIdAndUpdate(cow.id, { status: 'sold out' }, { session })

    // Deduct the cost of the cow from the buyer's budget
    buyer.budget! -= cow.price!
    await buyer.save({ session })

    // Add the same amount of cost to the seller's income
    const seller = await User.findById(cow.seller)
    if (seller) {
      seller.income += cow.price!
      await seller.save({ session })
    } else {
      throw new Error('Seller not found')
    }

    // Create the order entry
    await Order.create([data], { session })

    await session.commitTransaction()
  } catch (error) {
    await session.abortTransaction()
    throw error
  } finally {
    session.endSession()
  }
}

const createOrder = async (
  data: TransactionData
): Promise<Document<any, any, any> | null> => {
  await initiateTransaction(data)
  const order = await Order.findOne(data).populate('cow').populate('buyer')
  return order
}

const getAllOrders = async (): Promise<IOrder[]> => {
  const orders = await Order.find()
  // .populate('cow').populate('buyer')
  return orders
}

export const OrderService = {
  createOrder,
  getAllOrders,
}
