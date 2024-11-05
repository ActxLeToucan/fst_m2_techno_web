import { Module } from '@nestjs/common';
import { TruckController } from './truck.controller';
import { TruckService } from './truck.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TruckSchema } from './schemas/truck.schema';
import { TruckInitdbService } from './truck-initdb.service';

@Module({
    controllers: [TruckController],
    providers: [TruckService, TruckInitdbService],
    imports: [
        MongooseModule.forFeature([{ name: 'Truck', schema: TruckSchema }])
    ]
})
export class TruckModule {
}
