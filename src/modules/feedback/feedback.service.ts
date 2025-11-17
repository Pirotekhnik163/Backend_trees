import {Injectable, Logger} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {FeedbackEntity} from "./entity/feedback.entity";
import {Repository} from "typeorm";
import {FeedbackDTO} from "./DTO/feedback.dto";

@Injectable()
export class FeedbackService {
    private readonly logger = new Logger(FeedbackService.name);
    constructor(
        @InjectRepository(FeedbackEntity)
        private readonly feedbackEntityRepository: Repository<FeedbackEntity>
    ) {}

    public async getAllFeedbacks(): Promise<FeedbackEntity[]> {
        this.logger.log("Get all feedbacks");
        try {
            const findFeedback = await this.feedbackEntityRepository.find();

            if (findFeedback.length === 0) {
                this.logger.warn("No feedback found");
            }

            this.logger.log(`Found ${findFeedback.length} feedback.`);

            return findFeedback;
        } catch (e) {
            this.logger.error('Failed to find a feedback', e.stack);
            throw e;
        }
    }

    public async createFeedback(createData: FeedbackDTO): Promise<FeedbackEntity> {
        this.logger.log("create feedback");
        try {
            const createFeedback = this.feedbackEntityRepository.create({
                name: createData.name,
                email: createData.email,
                phone: createData.phone,
            });

            const saved = await this.feedbackEntityRepository.save(createFeedback);
            this.logger.log(`Saved feedback with Id: ${saved.id}`);

            return saved;
        } catch (e) {
            this.logger.error('Failed to create feedback', e.stack);
            throw e;
        }
    }
}