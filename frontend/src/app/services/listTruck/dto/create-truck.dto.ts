export interface CreateTruckDto {
    plate: string;
    brand: string;
    model: string;
    capacity: string;
    status?: string;
    year?: number;
    lastMaintenance?: string;
}