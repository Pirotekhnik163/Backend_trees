import {Body, Controller, Get, Post} from "@nestjs/common";
import {ShareService} from "./share.service";
import {ShareEntity} from "./entity/share.entity";
import {ShareDTO} from "./DTO/share.dto";

@Controller('share')
export class ShareController {
    constructor(private readonly shareService: ShareService) {}

    @Get('/get')
    async getAll(): Promise<ShareEntity[]> {
        return this.shareService.getAllShare();
    }

    @Post('/create')
    async createShare(@Body() createData: ShareDTO): Promise<ShareEntity> {
        return this.shareService.addedShare(createData);
    }
}