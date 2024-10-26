import { Injectable, NotFoundException } from '@nestjs/common';
import { Truck } from './truck.type';
import { DATA } from '../data';
import { find, from, iif, mergeMap, Observable, of, throwError } from 'rxjs';

@Injectable()
export class TruckService {
    findAll = (): Observable<Truck[]> =>
        of(DATA.trucks);


    findOne = (id: string): Observable<Truck> =>
        from(DATA.trucks).pipe(
            find((truck: Truck) => truck.id === id),
            mergeMap((truck: Truck) =>
                iif(() => !!truck,
                    of(truck),
                    throwError(() => new NotFoundException(`Truck with id '${id}' not found`))
                )
            )
        );
}
