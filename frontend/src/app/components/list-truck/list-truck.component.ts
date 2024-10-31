import { Component, inject, OnInit, TemplateRef } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModal, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { ListTrucksService } from '../../services/listTruck/truck.service';
import { TruckEntity } from '../../services/listTruck/entities/truck.entity';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ToastService } from '../../services/toastService/toast.service';

@Component({
  selector: 'app-list-truck',
  standalone: true,
  imports: [DecimalPipe, FormsModule, NgbPaginationModule, HttpClientModule],
  templateUrl: './list-truck.component.html',
  styleUrls: ['./list-truck.component.scss'],
})
export class ListTruckComponent implements OnInit {
  private modalService = inject(NgbModal);
  public truckToUpdate: any;
  // Implement OnInit for lifecycle hook
  page = 1;
  pageSize = 2;
  collectionSize = 0; // Initialize to 0
  trucks: TruckEntity[] = []; // Update the type to TruckEntity

  constructor(
    private listTrucksService: ListTrucksService,
    private toastService: ToastService
  ) {} // Inject the service

  ngOnInit() {
    // Fetch trucks when the component initializes
    this.loadTrucks();
  }

  loadTrucks() {
    this.listTrucksService.findAll().subscribe({
      next: (data) => {
        this.trucks = data;
        this.collectionSize = data.length; // Update the collection size
        this.refreshTrucks(); // Call refreshTrucks to paginate
      },
      error: (error) => {
        console.error('Error fetching trucks:', error); // Handle errors
      },
    });
  }

  deleteTruck(truck: TruckEntity) {
    this.listTrucksService.delete(truck.plate).subscribe({
      next: () => {
        this.trucks = this.trucks.filter((t) => t.plate !== truck.plate);
        this.toastService.show({
          template: `Truck ${truck.plate} deleted successfully!`,
          classname: 'bg-success text-light',
        });
      },
      error: (error) => {
        console.error('Error deleting truck:', error);
        this.toastService.show({
          template: `Failed to delete truck ${truck.plate}.`,
          classname: 'bg-danger text-light',
        });
      },
    });
  }

  openUpdateModal(truck: any, updateModal: TemplateRef<any>) {
	this.truckToUpdate = { ...truck }; // Clone the truck to update
	this.openVerticallyCentered(updateModal); // Open the modal
  }

  updateTruck(updatedTruck: any) {
    // Logic to update the truck, e.g., make an API call
    console.log('Updating truck', updatedTruck);
    // After updating, you may want to refresh the trucks list or close the modal
  }

  openVerticallyCentered(content: TemplateRef<any>) {
    this.modalService.open(content, { centered: true });
  }

  refreshTrucks() {
    this.trucks = this.trucks
      .map((truck, i) => ({ displayId: i + 1, ...truck }))
      .slice((this.page - 1) * this.pageSize, this.page * this.pageSize);
  }
}
