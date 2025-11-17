import {FeedbackEntity} from "./entity/feedback.entity";
import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {FeedbackController} from "./feedback.controller";
import {FeedbackService} from "./feedback.service";

const entity = [FeedbackEntity]

@Module({
    imports: [
        TypeOrmModule.forFeature(entity)
    ],
    controllers: [FeedbackController],
    providers: [FeedbackService],
})

export class FeedbackModule {}