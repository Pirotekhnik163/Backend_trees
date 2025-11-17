import {Body, Controller, Get, Post} from "@nestjs/common";
import {FeedbackService} from "./feedback.service";
import {FeedbackEntity} from "./entity/feedback.entity";
import {FeedbackDTO} from "./DTO/feedback.dto";

@Controller('feedback')
export class FeedbackController {
    constructor(private readonly feedbackService: FeedbackService) {}

    @Get('/get')
    async getAllFeedback(): Promise<FeedbackEntity[]> {
        return this.feedbackService.getAllFeedbacks();
    }

    @Post('/create')
    async createFeedback(@Body() createData: FeedbackDTO): Promise<FeedbackEntity> {
        return this.feedbackService.createFeedback(createData);
    }
}