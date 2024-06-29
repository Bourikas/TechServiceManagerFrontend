import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Device } from 'src/app/shared/interfaces/device';
import { StoreEntry } from 'src/app/shared/interfaces/store-entry';
import { Technician } from 'src/app/shared/interfaces/technician';
import { CustomerService } from 'src/app/shared/services/customer.service';
import { DeviceService } from 'src/app/shared/services/device.service';
import { StoreEntryService } from 'src/app/shared/services/store-entry.service';
import { TechnicianService } from 'src/app/shared/services/technician.service';
import { UserService } from 'src/app/shared/services/user.service';


@Component({
  selector: 'app-store-entry-registration',
  standalone: true,
  imports: [CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,],
  templateUrl: './store-entry-registration.component.html',
  styleUrl: './store-entry-registration.component.css'
})
export class StoreEntryRegistrationComponent implements OnInit{
  deviceService = inject(DeviceService);
  customerService = inject(CustomerService);
  storeEntryService = inject(StoreEntryService);
  technicianService = inject(TechnicianService);
  userService = inject(UserService);
  devices: Device[] = [];
  technicians: Technician[] = [];

  registrationStatus: { success: boolean; message: string } = {
    success: false,
    message: 'Not attempted yet',
  };

  form = new FormGroup({
    malfunction_description: new FormControl('', Validators.required),
    device_condition: new FormControl('', Validators.required),
    entry_date: new FormControl('', Validators.required),
    inspection_date: new FormControl(''),
    repair_date: new FormControl(''),
    return_date: new FormControl(''),
    repair_description: new FormControl(''),
    repair_cost: new FormControl(''),
    part_description: new FormControl(''),
    part_cost: new FormControl('',),
    device: new FormControl('', Validators.required),
    technician: new FormControl('', Validators.required),
  });
  
  ngOnInit() {
    this.userService.refreshToken().subscribe(() => {});
    
    this.deviceService.getDevices().subscribe({
      next: (response) => {
        this.devices = response;
      },
      error: (err) => {
        console.error('Error fetching devices', err);
      }
    });
    this.technicianService.getTechnicians().subscribe({
      next: (response) => {
        this.technicians = response;
      },
      error: (err) => {
        console.error('Error fetching Technicians', err);
      }
    });
  }

  onSubmit(){
    if (this.form.invalid) {
      this.registrationStatus = { success: false, message: 'Invalid form data' };
      return;
    }

    const rawEntryDate = this.form.value.entry_date;
    const formattedEntryDate = rawEntryDate ? new Date(rawEntryDate).toISOString().split('T')[0] : null;
    
    const rawInspectionDate = this.form.value.inspection_date;
    const formattedInspectionDate = rawInspectionDate ? new Date(rawInspectionDate).toISOString().split('T')[0] : null;
    
    const rawRepairDate = this.form.value.repair_date;
    const formattedRepairDate = rawRepairDate ? new Date(rawRepairDate).toISOString().split('T')[0] : null;
   
    const rawReturnDate = this.form.value.return_date;
    const formattedReturnDate = rawReturnDate ? new Date(rawReturnDate).toISOString().split('T')[0] : null;
    
    
    const storeEntryData = {
      malfunction_description: this.form.value.malfunction_description,
      device_condition: this.form.value.device_condition,
      entry_date: formattedEntryDate,
      inspection_date: formattedInspectionDate,
      repair_date: formattedRepairDate,
      return_date: formattedReturnDate,
      repair_description: this.form.value.repair_description,
      repair_cost: parseFloat(this.form.value.repair_cost),
      part_description: this.form.value.part_description,
      part_cost: parseFloat(this.form.value.part_cost),
      device: +this.form.value.device,
      technician: +this.form.value.technician,
    }  as StoreEntry;

    this.storeEntryService.registerStoreEntry(storeEntryData).subscribe({
      next: (response) => {
        console.log('Store Entry registered', response);
        this.registrationStatus = { success: true, message: response.msg };
        this.form.reset();
        alert('Entry completed successfully!')
      },
      error: (response) => {
        const message = response.error.msg || 'Unknown error';
        console.error('Error registering store entry', response);
        this.registrationStatus = { success: false, message };
        alert('There was an error with entry!')
      }
    });
  }
}
