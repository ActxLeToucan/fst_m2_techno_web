import { Component, inject, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModal, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { ListTrucksService } from '../../services/listTruck/truck.service';
import { TruckEntity } from '../../services/listTruck/entities/truck.entity';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ToastService } from '../../services/toastService/toast.service';
import { UpdateTruckDto } from '../../services/listTruck/dto/update-truck.dto';
import { ToastsContainer } from './toast-container.compnent';

@Component({
  selector: 'app-list-truck',
  standalone: true,
  imports: [DecimalPipe, FormsModule, NgbPaginationModule, HttpClientModule, ToastsContainer],
  templateUrl: './list-truck.component.html',
  styleUrls: ['./list-truck.component.scss'],
})
export class ListTruckComponent implements OnInit, OnDestroy {
  @ViewChild('successTpl', { static: true }) successTpl!: TemplateRef<any>;
  @ViewChild('errorTpl', { static: true }) errorTpl!: TemplateRef<any>;

  @ViewChild('successUpdate', { static: true }) successUpdate!: TemplateRef<any>;
  @ViewChild('errorUpdate', { static: true }) errorUpdate!: TemplateRef<any>;

  private modalService = inject(NgbModal);
  public truckToUpdate: any;
  // Implement OnInit for lifecycle hook
  page = 1;
  pageSize = 2;
  collectionSize = 0; // Initialize to 0
  trucks: TruckEntity[] = []; // Update the type to TruckEntity
  displayedTrucks: TruckEntity[] = []; 

  constructor(
    private listTrucksService: ListTrucksService,
    private toastService: ToastService = inject(ToastService)
  ) {
    this.refreshTrucks();
  } // Inject the service

  ngOnInit() {
    // Fetch trucks when the component initializes
    this.loadTrucks();
  }

  loadTrucks() {
    this.listTrucksService.findAll().subscribe({
      next: (data) => {
        this.trucks = data;
        this.collectionSize = data.length; // Update the collection size
        this.refreshTrucks();
     
      },
      error: (error) => {
        console.error('Error fetching trucks:', error); // Handle errors
      },
    });
  }

  deleteTruck(truck: TruckEntity) {
    this.listTrucksService.delete(truck.id).subscribe({
      next: () => {
        this.trucks = this.trucks.filter((t) => t.id !== truck.id);
        this.toastService.show({
          template: this.successTpl,
          classname: 'bg-success text-light',
        });
      },
      error: (error) => {
        console.error('Error deleting truck:', error);
        this.toastService.show({
          template: this.errorTpl,
          classname: 'bg-danger text-light',
        });
      },
    });
  }

  openUpdateModal(truck: any, updateModal: TemplateRef<any>) {
    this.truckToUpdate = { ...truck }; // Clone the truck to update
    if (this.truckToUpdate.lastMaintenance) {
      this.truckToUpdate.lastMaintenance = new Date(this.truckToUpdate.lastMaintenance)
        .toISOString()
        .split('T')[0];
    }  
    console.log(truck);
    this.openVerticallyCentered(updateModal); // Open the modal
  }

  updateTruck() {
    // Create a new payload object
    const payload: UpdateTruckDto = {
        plate: this.truckToUpdate.plate,
        brand: this.truckToUpdate.brand,
        model: this.truckToUpdate.model,
        capacity: this.truckToUpdate.capacity,
        status: this.truckToUpdate.status,
        year: this.truckToUpdate.year,
        lastMaintenance: this.truckToUpdate.lastMaintenance,
    };

    // Log the payload for debugging
    console.log('Payload being sent:', payload);

    // Call the update service
    this.listTrucksService.updateById(this.truckToUpdate.id, payload).subscribe({
        next: (updatedTruck) => {
            console.log('Truck updated successfully:', updatedTruck);
            this.toastService.show({
                template: this.successUpdate,
                classname: 'bg-success text-light',
            });
            this.modalService.dismissAll(); // Close the modal
            window.location.reload();
        },
        error: (error) => {
            console.error('Error updating truck:', error);
            this.toastService.show({
                template: this.errorUpdate,
                classname: 'bg-danger text-light',
            });
        },
    });
}

  openVerticallyCentered(content: TemplateRef<any>) {
    this.modalService.open(content, { centered: true });
  }

  refreshTrucks() {
    this.displayedTrucks = this.trucks
      .map((truck, i) => ({ displayId: i + 1, ...truck }))
      .slice((this.page - 1) * this.pageSize, this.page * this.pageSize);
    console.log(this.trucks);

  }

  ngOnDestroy(): void {
		this.toastService.clear();
	}

}