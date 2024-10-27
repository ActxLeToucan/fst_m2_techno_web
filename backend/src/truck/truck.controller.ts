import { Body, ClassSerializerInterceptor, Controller, Get, Param, Post, UseInterceptors } from '@nestjs/common';
import { TruckService } from './truck.service';
import { Observable } from 'rxjs';
import { HandlerParams } from './validators/handler-params';
import {
    ApiBadRequestResponse,
    ApiConflictResponse,
    ApiCreatedResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiTags
} from '@nestjs/swagger';
import { HttpExceptionResponse } from '../app.types';
import { TruckEntity } from './entities/truck.entity';
import { CreateTruckDto } from './dto/create-truck.dto';

@Controller('truck')
@ApiTags('Truck')
@UseInterceptors(ClassSerializerInterceptor)
export class TruckController {
    constructor (
        private readonly truckService: TruckService
    ) {
    }

    @ApiOkResponse({ description: 'Get all trucks', type: TruckEntity, isArray: true, })
    @Get()
    findAll (): Observable<TruckEntity[]> {
        return this.truckService.findAll();
    }

    @ApiOkResponse({ description: 'Get a truck by its registration number', type: TruckEntity, })
    @ApiBadRequestResponse({ description: 'Bad request', type: HttpExceptionResponse })
    @ApiNotFoundResponse({ description: 'Truck not found', type: HttpExceptionResponse })
    @Get(':plate')
    findOne (@Param() params: HandlerParams): Observable<TruckEntity> {
        return this.truckService.findOne(params.plate);
    }

    @ApiCreatedResponse({ description: 'Create a truck', type: TruckEntity, })
    @ApiConflictResponse({ description: 'Truck already exists', type: HttpExceptionResponse })
    @Post()
    create (@Body() body: CreateTruckDto): Observable<TruckEntity> {
        return this.truckService.create(body);
    }
}
