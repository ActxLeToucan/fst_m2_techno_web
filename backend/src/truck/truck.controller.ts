import { ClassSerializerInterceptor, Controller, Get, Param, UseInterceptors } from '@nestjs/common';
import { TruckService } from './truck.service';
import { Truck } from './truck.type';
import { Observable } from 'rxjs';
import { HandlerParams } from './validators/handler-params';
import { ApiBadRequestResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { HttpExceptionResponse } from '../app.types';

@Controller('truck')
@ApiTags('Truck')
@UseInterceptors(ClassSerializerInterceptor)
export class TruckController {
    constructor (
        private readonly truckService: TruckService
    ) {
    }

    @ApiOkResponse({
        description: 'Get all trucks',
        type: Truck,// TODO: use TruckEntity and document it
        isArray: true,
    })
    @Get()
    findAll(): Observable<Truck[]> {
        return this.truckService.findAll();
    }

    @ApiOkResponse({
        description: 'Get a truck by its registration number',
        type: Truck,// TODO: use TruckEntity and document it
    })
    @ApiBadRequestResponse({ description: 'Bad request', type: HttpExceptionResponse })
    @ApiNotFoundResponse({ description: 'Truck not found', type: HttpExceptionResponse })
    @Get(':id')
    findOne(@Param() params: HandlerParams): Observable<Truck> {
        return this.truckService.findOne(params.id);
    }
}
