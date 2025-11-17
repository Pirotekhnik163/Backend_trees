import {Injectable, Logger} from "@nestjs/common";
import {Repository} from "typeorm";
import {CitiesEntity} from "./entity/cities.entity";
import {InjectRepository} from "@nestjs/typeorm";

@Injectable()
export class CitiesService {
    private readonly logger = new Logger(CitiesService.name);
    constructor(
        @InjectRepository(CitiesEntity)
        private readonly citiesRepository: Repository<CitiesEntity>
    ) {}

    public async getAllCities(): Promise<CitiesEntity[]> {
        this.logger.log("Get all cities");
        try {
            const cities = await this.citiesRepository.find();

            if (cities.length === 0) {
                this.logger.warn("No cities found");
            }

            this.logger.log(`Found ${cities.length} cities.`);

            return cities;
        } catch (e) {
            this.logger.error('Failed to get cities');
            throw e;
        }
    }

    public async newCity(city: string): Promise<CitiesEntity> {
        this.logger.log("Add city");
        try {
            const newCity = this.citiesRepository.create({
                city: city,
            })

            const saved = await this.citiesRepository.save(newCity);
            this.logger.log(`Saved cities with Id: ${saved.id}`);

            return saved;
        } catch (e) {
            this.logger.error('Failed to create city', e.stack);
            throw e;
        }
    }

    public async getCityByName(city: string): Promise<CitiesEntity> {
        this.logger.log(`Get city by name: ${city}`);
        try {
            const findCities = await this.citiesRepository.findOneBy({
                city: city,
            });

            if (!findCities) {
                this.logger.warn(`Cities with name: ${city} not found`);
                throw new Error(`Cities with name: ${city} not found`)
            }

            return findCities;
        } catch (e) {
            this.logger.error('Failed to get city', e.stack);
            throw e;
        }
    }

    public async DeleteCityByName(name: string): Promise<boolean> {
        this.logger.log("Delete city by name");
        try {
            const findCity = await this.getCityByName(name);

            this.logger.log(`Find city with email: ${findCity}`);

            await this.citiesRepository.delete(findCity.id);

            return true;
        } catch (error) {
            this.logger.error('Failed to delete city by name', error.stack);
            return false;
        }
    }
}