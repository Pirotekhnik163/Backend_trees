import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CitiesModule } from "../cities/cities.module";
import {ShareModule} from "../share/share.module";
import {FeedbackModule} from "../feedback/feedback.module";


@Module({
  imports: [
    ConfigModule.forRoot({
      load: [],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: "postgres",
        host: configService.get<string>("DB_HOST"),
        port: configService.get<number>("DB_PORT"),
        username: configService.get<string>("DB_USER"),
        password: configService.get<string>("DB_PASSWORD"),
        database: configService.get<string>("DB_NAME"),
        ssl: false,
        autoLoadEntities: true,
        synchronize: true,
      })
    }),
    CitiesModule,
    ShareModule,
    FeedbackModule,
  ]
})
export class AppModule {}