import { Module } from '@nestjs/common';
import { TruckModule } from './truck/truck.module';
import { HealthcheckModule } from './healthcheck/healthcheck.module';

@Module({
    imports: [HealthcheckModule, TruckModule],
})
export class AppModule {
}
