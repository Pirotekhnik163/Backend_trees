import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {ShareEntity} from "./entity/share.entity";
import {ShareController} from "./share.controller";
import {ShareService} from "./share.service";

const entity = [ShareEntity]

@Module({
    imports: [
        TypeOrmModule.forFeature(entity)
    ],
    controllers: [ShareController],
    providers: [ShareService]
})

export class ShareModule {}