import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ListTrucksService } from '../../services/listTruck/truck.service';

@Component({
  selector: 'app-add-truck',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-truck.component.html',
  styleUrl: './add-truck.component.scss'
})
export class AddTruckComponent {
  truckForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private truckService: ListTrucksService,
    private router: Router
  ) {
    this.truckForm = this.fb.group({
      id: ['', Validators.required],
      brand: ['', Validators.required],
      model: ['', Validators.required],
      capacity: ['', Validators.required],
      status: ['', Validators.required],
      year: [null, [Validators.required, Validators.min(1900), Validators.max(new Date().getFullYear())]], // year must be valid
      lastMaintenance: [null],
    });
  }

  onSubmit() {
    if (this.truckForm.valid) {
      this.truckService.create(this.truckForm.value).subscribe(() => {
        this.router.navigate(['application/lister-camions']); // Navigate to the truck list after successful addition
      });
    }
  }
}
