import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Hotel } from './hotel.model';

@Injectable()
export class HotelsService {
  constructor(
    @InjectModel('Hotel') private readonly hotelModel: Model<Hotel>,
  ) {}

  async insertHotel(name: string, rating: number, price: number) {
    const newHotel = new this.hotelModel({
      name,
      rating,
      price,
    });
    const result = await newHotel.save();
    return result.id as string;
  }

  async getHotels() {
    const hotels = await this.hotelModel.find().exec();
    return hotels.map(hot => ({
      id: hot.id,
      name: hot.name,
      rating: hot.rating,
      price: hot.price,
    }));
  }

  async getSingleHotel(hotelId: string) {
    const hotel = await this.findHotel(hotelId);
    return {
      id: hotel.id,
      name: hotel.name,
      rating: hotel.rating,
      price: hotel.price,
    };
  }

  async updateHotel(
    hotelId: string,
    name: string,
    rating: number,
    price: number,
  ) {
    const updatedHotel = await this.findHotel(hotelId);
    if (name) {
      updatedHotel.name = name;
    }
    if (rating) {
      updatedHotel.rating = rating;
    }
    if (price) {
      updatedHotel.price = price;
    }
    //updatedHotel.save();
  }

  async deleteHotel(hotId: string) {
    const result = await this.hotelModel.deleteOne({_id: hotId}).exec();
    if (result.n === 0) {
      throw new NotFoundException('Could not find hotel.');
    }
  }

  private async findHotel(id: string): Promise<Hotel> {
    let hotel;
    try {
      hotel = await this.hotelModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Could not find hotel.');
    }
    if (!hotel) {
      throw new NotFoundException('Could not find hotel.');
    }
    return hotel;
  }
}