import { Controller, Get, Param } from '@nestjs/common';
import { TruckService } from './truck.service';
import { Truck } from './truck.type';
import { Observable } from 'rxjs';
import { HandlerParams } from './validators/handler-params';

@Controller('truck')
export class TruckController {
    constructor (
        private readonly truckService: TruckService
    ) {
    }

    @Get()
    findAll(): Observable<Truck[]> {
        return this.truckService.findAll();
    }

    @Get(':id')
    findOne(@Param() params: HandlerParams): Observable<Truck> {
        return this.truckService.findOne(params.id);
    }
}
