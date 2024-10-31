import { Body, ClassSerializerInterceptor, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, UseInterceptors } from '@nestjs/common';
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
import { UpdateTruckDto } from './dto/update-truck.dto';

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

    @ApiOkResponse({ description: 'Truck successfully deleted' })
    @ApiNotFoundResponse({ description: 'Truck not found', type: HttpExceptionResponse })
    @ApiBadRequestResponse({ description: 'Bad request', type: HttpExceptionResponse })
    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT) // Use 204 status code for successful delete without content
    delete(@Param('id') id: string): Observable<void> {
        return this.truckService.delete(id);
    }

    @ApiOkResponse({ description: 'Truck successfully updated', type: TruckEntity })
    @ApiNotFoundResponse({ description: 'Truck not found', type: HttpExceptionResponse })
    @ApiBadRequestResponse({ description: 'Bad request', type: HttpExceptionResponse })
    @Put(':id') // Change from ':plate' to ':id'
    update(@Param('id') id: string, @Body() body: UpdateTruckDto): Observable<TruckEntity> {
        return this.truckService.update(id, body);
    }
}
