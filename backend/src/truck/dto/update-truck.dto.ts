import { IsDateString, IsInt, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsYearLowerOrEqualThanCurrentYear } from '../../shared/year.validator';

export class UpdateTruckDto {
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        name: 'brand',
        description: 'Brand',
        example: 'Renault',
    })
    brand?: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        name: 'model',
        description: 'Model',
        example: 'T',
    })
    model?: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        name: 'capacity',
        description: 'Capacity',
        example: '8m3',
    })
    capacity?: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        name: 'status',
        description: 'Status',
        example: 'Maintenance',
    })
    status?: string;

    @IsOptional()
    @IsInt()
    @Min(1900)
    @IsYearLowerOrEqualThanCurrentYear({ message: 'year must be lower or equal to the current year' })
    @ApiProperty({
        name: 'year',
        description: 'Year of commissioning',
        example: 2021,
    })
    year?: number;

    @IsOptional()
    @IsDateString()
    @ApiProperty({
        name: 'lastMaintenance',
        description: 'Date of last maintenance',
        example: '2021-07-12T00:00:00.000Z',
    })
    lastMaintenance?: string;
}
