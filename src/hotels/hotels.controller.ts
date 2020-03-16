import {
    Controller,
    Post,
    Body,
    Get,
    Param,
    Patch,
    Delete,
  } from '@nestjs/common';
  
  import { HotelsService } from './hotels.service';
  
  @Controller('hhotels')
  export class HotelsController {
    constructor(private readonly hotelsService: HotelsService) {}
  
    @Post()
    async addHotel(
      @Body('name') hotName: string,
      @Body('rate') hotRate: number,
      @Body('price') hotPrice: number,
    ) {
      const generatedId = await this.hotelsService.insertHotel(
        hotName,
        hotRate,
        hotPrice,
      );
      return { id: generatedId };
    }
  
    @Get()
    async getAllHotels() {
      const hotels = await this.hotelsService.getHotels();
      return hotels;
    }
  
    @Get(':id')
    getHotel(@Param('id') hotId: string) {
      return this.hotelsService.getSingleHotel(hotId);
    }
  
    @Patch(':id')
    async updateHotel(
      @Param('id') hotId: string,
      @Body('name') hotName: string,
      @Body('rate') hotRate: number,
      @Body('price') hotPrice: number,
    ) {
      await this.hotelsService.updateHotel(hotId, hotName, hotRate, hotPrice);
      return null;
    }
  
    @Delete(':id')
    async removeHotel(@Param('id') hotId: string) {
        await this.hotelsService.deleteHotel(hotId);
        return null;
    }
  }