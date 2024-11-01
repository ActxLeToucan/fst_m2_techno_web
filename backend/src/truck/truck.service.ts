import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { from, map, mergeMap, Observable } from 'rxjs';
import { TruckEntity } from './entities/truck.entity';
import { CreateTruckDto } from './dto/create-truck.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { TruckDocument } from './schemas/truck.schema';
import { UpdateTruckDto } from './dto/update-truck.dto';

@Injectable()
export class TruckService {
    constructor (
        @InjectModel('Truck') private readonly truckModel: Model<TruckDocument>,
    ) {
    }

    findAll = (): Observable<TruckEntity[]> =>
        from(this.truckModel.find()).pipe(
            map((trucks: TruckDocument[]) => trucks.map(this.toEntity)),
        );

    findOne = (id: string): Observable<TruckEntity> =>
        from(this.truckModel.findById(id)).pipe(
            map((truck: TruckDocument) => {
                if (!truck) {
                    throw new NotFoundException(`Truck with id ${id} not found`);
                }
                return this.toEntity(truck);
            }),
        );

    create = (createTruckDto: CreateTruckDto): Observable<TruckEntity> =>
        from(this.truckModel.exists({ _id: createTruckDto.id })).pipe(
            mergeMap((res: any) => {
                if (!!res?._id) {
                    throw new ConflictException(
                        `Truck with id ${createTruckDto.id} already exists`,
                    );
                }
                return from(this.truckModel.create(this.toDocument(createTruckDto)));
            }),
            map(this.toEntity),
        );

    delete = (id: string): Observable<void> =>
        from(this.truckModel.findByIdAndDelete(id)).pipe(
            map((result) => {
                if (!result) {
                    throw new NotFoundException(`Truck with id ${id} not found`);
                }
                return;
            }),
        );

    update = (id: string, updateTruckDto: UpdateTruckDto): Observable<TruckEntity> =>
        from(this.truckModel.findByIdAndUpdate(id, updateTruckDto, { new: true })).pipe(
            map((truck: TruckDocument) => {
                if (!truck) {
                    throw new NotFoundException(`Truck with id ${id} not found`);
                }
                return this.toEntity(truck);
            }),
        );

    private toEntity = (truck: TruckDocument): TruckEntity => {
        const entity = Object.assign(new TruckEntity(), truck.toJSON());
        entity.lastMaintenance ??= null;
        return entity;
    };

    private toDocument = (truck: CreateTruckDto): TruckDocument => {
        const { id, ...data } = truck;
        return { _id: id, ...data } as TruckDocument;
    };
}
