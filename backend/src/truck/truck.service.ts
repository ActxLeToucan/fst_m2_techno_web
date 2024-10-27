import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { from, map, mergeMap, Observable } from 'rxjs';
import { TruckEntity } from './entities/truck.entity';
import { CreateTruckDto } from './dto/create-truck.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { TruckDocument } from './schemas/truck.schema';

@Injectable()
export class TruckService {
    constructor (
        @InjectModel('Truck') private readonly truckModel: Model<TruckDocument>
    ) {
    }

    findAll = (): Observable<TruckEntity[]> =>
        from(this.truckModel.find()).pipe(
            map((trucks: TruckDocument[]) => trucks.map(this.toEntity))
        );


    findOne = (plate: string): Observable<TruckEntity> =>
        from(this.truckModel.findOne({ plate })).pipe(
            map((truck: TruckDocument) => {
                if (!truck) {
                    throw new NotFoundException(`Truck with plate ${plate} not found`);
                }
                return this.toEntity(truck);
            })
        );

    create = (createTruckDto: CreateTruckDto): Observable<TruckEntity> =>
        from(this.truckModel.exists({ plate: createTruckDto.plate })).pipe(
            mergeMap((res: any) => {
                if (!!res?._id) {
                    throw new ConflictException(`Truck with plate ${createTruckDto.plate} already exists`);
                }
                return from(this.truckModel.create(createTruckDto));
            }),
            map(this.toEntity)
        );

    private toEntity = (truck: TruckDocument): TruckEntity => {
        const entity = Object.assign(new TruckEntity(), truck.toJSON());
        entity.lastMaintenance ??= null;
        return entity;
    }
}
