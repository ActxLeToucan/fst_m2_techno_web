import { Module } from '@nestjs/common';
import { TruckModule } from './truck/truck.module';

@Module({
  imports: [TruckModule],
})
export class AppModule {}
