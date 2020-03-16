import * as mongoose from 'mongoose';

export const HotelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  rate: { type: Number, required: true },
  price: { type: Number, required: true },
});

export interface Hotel extends mongoose.Document {
  id: string;
  name: string;
  rate: number;
  price: number;
}