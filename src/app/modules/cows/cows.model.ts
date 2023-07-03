/* eslint-disable @typescript-eslint/consistent-type-definitions */
import { Schema, model, Model } from 'mongoose'
import { ICow, Location, Breed, Label, Category } from './cows.interface'

type CowModel = Model<ICow, object>

// Cow schema
const cowSchema = new Schema<ICow>({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  price: { type: Number, required: true },
  location: { type: String, enum: Object.values(Location), required: true },
  breed: { type: String, enum: Object.values(Breed), required: true },
  weight: { type: Number, required: true },
  label: { type: String, enum: Object.values(Label), default: Label.ForSale },
  category: { type: String, enum: Object.values(Category), required: true },
  seller: { type: String, required: true },
})

export const Cow = model<ICow, CowModel>('Cow', cowSchema)
