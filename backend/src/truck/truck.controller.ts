import {
    Body,
    ClassSerializerInterceptor,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Post,
    Put,
    Res,
    UseInterceptors,
} from '@nestjs/common';
import { TruckService } from './truck.service';
import { Observable, tap } from 'rxjs';
import { HandlerParams } from './validators/handler-params';
import {
    ApiBadRequestResponse,
    ApiConflictResponse,
    ApiCreatedResponse,
    ApiNoContentResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiTags,
} from '@nestjs/swagger';
import { HttpExceptionResponse } from '../app.types';
import { TruckEntity } from './entities/truck.entity';
import { CreateTruckDto } from './dto/create-truck.dto';
import { UpdateTruckDto } from './dto/update-truck.dto';
import { FastifyReply } from 'fastify';

@Controller('truck')
@ApiTags('Truck')
@UseInterceptors(ClassSerializerInterceptor)
export class TruckController {
    constructor (
        private readonly truckService: TruckService,
    ) {
    }

    @ApiOkResponse({ description: 'Get all trucks', type: TruckEntity, isArray: true })
    @Get()
    findAll (): Observable<TruckEntity[]> {
        return this.truckService.findAll();
    }

    @ApiOkResponse({ description: 'Get a truck by its registration number', type: TruckEntity })
    @ApiBadRequestResponse({ description: 'Bad request', type: HttpExceptionResponse })
    @ApiNotFoundResponse({ description: 'Truck not found', type: HttpExceptionResponse })
    @Get(':id')
    findOne (@Param() params: HandlerParams): Observable<TruckEntity> {
        return this.truckService.findOne(params.id);
    }

    @ApiCreatedResponse({ description: 'Truck successfully created', type: TruckEntity })
    @ApiConflictResponse({ description: 'Truck already exists', type: HttpExceptionResponse })
    @Post()
    create (@Res({ passthrough: true }) res: FastifyReply, @Body() body: CreateTruckDto): Observable<TruckEntity> {
        return this.truckService.create(body).pipe(
            tap((truck) => res.header('Location', `/truck/${truck.id}`)),
        );
    }

    @ApiNoContentResponse({ description: 'Truck successfully deleted' })
    @ApiBadRequestResponse({ description: 'Bad request', type: HttpExceptionResponse })
    @ApiNotFoundResponse({ description: 'Truck not found', type: HttpExceptionResponse })
    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    delete (@Param() params: HandlerParams): Observable<void> {
        return this.truckService.delete(params.id);
    }

    @ApiOkResponse({ description: 'Truck successfully updated', type: TruckEntity })
    @ApiNotFoundResponse({ description: 'Truck not found', type: HttpExceptionResponse })
    @ApiBadRequestResponse({ description: 'Bad request', type: HttpExceptionResponse })
    @Put(':id')
    update (@Param() params: HandlerParams, @Body() body: UpdateTruckDto): Observable<TruckEntity> {
        return this.truckService.update(params.id, body);
    }
}
