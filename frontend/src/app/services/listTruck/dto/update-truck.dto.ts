export class UpdateTruckDto {
    plate?: string;        // Truck's license plate
    brand?: string;        // Brand of the truck
    model?: string;        // Model of the truck
    capacity?: string;     // Capacity of the truck (e.g., "8m3")
    status?: string;       // Current status of the truck (e.g., "Maintenance")
    year?: number;         // Year of the truck
    lastMaintenance?: string;  // Last maintenance date
}