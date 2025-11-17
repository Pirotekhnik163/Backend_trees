import {Body, Controller, Delete, Get, Param, Post} from "@nestjs/common";
import {CitiesService} from "./cities.service";
import {CitiesEntity} from "./entity/cities.entity";

@Controller('cities')
export class CitiesController {
    constructor(private readonly citiesService: CitiesService) {}

    @Get('/get')
    async getAllCities(): Promise<CitiesEntity[]> {
       return this.citiesService.getAllCities();
    }

    @Get('/get/:name')
    async getCityByName(@Param('name') city: string): Promise<CitiesEntity> {
        return this.citiesService.getCityByName(city);
    }

    @Post('/create')
    async createCity(@Body() body: { city: string }): Promise<CitiesEntity> {
        return this.citiesService.newCity(body.city);
    }

    @Delete('/delete/:name')
    async deleteCity(@Param('name') name: string): Promise<boolean> {
        return this.citiesService.DeleteCityByName(name);
    }
}