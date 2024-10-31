import { IsNotEmpty, IsOptional, IsString, IsNumber } from 'class-validator';

export class UpdateTruckDto {
    @IsOptional()
    @IsString()
    plate?: string; 

    @IsOptional()
    @IsString()
    model?: string;

    @IsOptional()
    @IsString()
    brand?: string; 

    @IsOptional()
    @IsString()
    capacity?: string; // Kept as string based on your example

    @IsOptional()
    @IsString()
    status?: string; // Added status

    @IsOptional()
    @IsNumber()
    year?: number; // Added year

    @IsOptional()
    @IsString()
    lastMaintenance?: string; // Kept as string for the date format
}
