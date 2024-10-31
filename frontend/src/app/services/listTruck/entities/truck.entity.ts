export interface TruckEntity {
    id: string;
    plate: string;
    brand: string;
    model: string;
    year: number;
    capacity: string;
    status: string;
    lastMaintenance: string | null;
}