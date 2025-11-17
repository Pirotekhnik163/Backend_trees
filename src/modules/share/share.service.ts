import {Injectable, Logger} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {ShareEntity} from "./entity/share.entity";
import {Repository} from "typeorm";
import {ShareDTO} from "./DTO/share.dto";

@Injectable()
export class ShareService {
    private readonly logger = new Logger(ShareService.name);
    constructor(
        @InjectRepository(ShareEntity)
        private readonly shareEntityRepository: Repository<ShareEntity>
    ) {}

    public async getAllShare(): Promise<ShareEntity[]> {
        this.logger.log("Get all cities");
        try {
            const findShare = await this.shareEntityRepository.find()

            if (findShare.length === 0) {
                this.logger.warn("No share found");
            }

            this.logger.log(`Found ${findShare.length} share.`);

            return findShare;
        } catch (e) {
            this.logger.error('Failed to get all share', e.stack);
            throw e;
        }
    }

    public async addedShare(createData: ShareDTO): Promise<ShareEntity> {
        this.logger.log(`Add share`);
        try {
            const newShare =  this.shareEntityRepository.create({
                city: createData.city,
                special: createData.special,
                price: createData.price,
            })

            const saved = await this.shareEntityRepository.save(newShare);
            this.logger.log(`Saved share with Id: ${saved.id}`);
            return saved;
        } catch (e) {
            this.logger.error('Failed to add share', e.stack);
            throw e;
        }
    }
}