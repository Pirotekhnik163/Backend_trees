import {CitiesEntity} from "./entity/cities.entity";
import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {CitiesController} from "./cities.controller";
import {CitiesService} from "./cities.service";

const entity = [CitiesEntity];

@Module({
    imports: [
        TypeOrmModule.forFeature(entity),
    ],
    controllers: [CitiesController],
    providers: [CitiesService],
    exports: [],
})

export class CitiesModule {}