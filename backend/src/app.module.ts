import { Module } from '@nestjs/common';
import { TruckModule } from './truck/truck.module';
import { HealthcheckModule } from './healthcheck/healthcheck.module';
import { MongooseModule } from '@nestjs/mongoose';
import * as Config from 'config';

@Module({
    imports: [
        HealthcheckModule,
        TruckModule,
        MongooseModule.forRoot(Config.get<string>('mongodb.uri')),
    ],
})
export class AppModule {
}
