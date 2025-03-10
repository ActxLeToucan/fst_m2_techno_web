import { Exclude, Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

@Exclude()
export class TruckEntity {
    @ApiProperty({
        name: 'id',
        description: 'Plate number',
        example: 'AA123BB',
    })
    @Expose()
    id: string;

    @ApiProperty({
        name: 'brand',
        description: 'Brand',
        example: 'Renault',
    })
    @Expose()
    brand: string;

    @ApiProperty({
        name: 'model',
        description: 'Model',
        example: 'T',
    })
    @Expose()
    model: string;

    @ApiProperty({
        name: 'year',
        description: 'Year of commissioning',
        example: 2021,
    })
    @Expose()
    year: number;

    @ApiProperty({
        name: 'capacity',
        description: 'Capacity',
        example: '8m3',
    })
    @Expose()
    capacity: string;

    @ApiProperty({
        name: 'status',
        description: 'Status',
        example: 'Maintenance',
    })
    @Expose()
    status: string;

    @ApiProperty({
        name: 'lastMaintenance',
        description: 'Last maintenance',
        example: '2021-09-01',
    })
    @Expose()
    lastMaintenance: string | null;
}
