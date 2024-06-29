import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { Device } from 'src/app/shared/interfaces/device';
import { DeviceService } from 'src/app/shared/services/device.service';
import { CustomerService } from 'src/app/shared/services/customer.service';
import { Customer } from 'src/app/shared/interfaces/customer';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-device-registration',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
  ],
  templateUrl: './device-registration.component.html',
  styleUrls: ['./device-registration.component.css'],
})
export class DeviceRegistrationComponent implements OnInit {
  deviceService = inject(DeviceService);
  customerService = inject(CustomerService);
  userService = inject(UserService);
  customers: Customer[] = [];

  registrationStatus: { success: boolean; message: string } = {
    success: false,
    message: 'Not attempted yet',
  };

  form = new FormGroup({
    owner: new FormControl('', Validators.required),
    maker: new FormControl(''),
    device_type: new FormControl('', Validators.required),
    model_type: new FormControl('', Validators.required),
    serial_number: new FormControl('', Validators.required),
    date_of_purchase: new FormControl(''),
  });

  ngOnInit() {
    this.userService.refreshToken().subscribe(() => {});
    
    this.customerService.getCustomers().subscribe({
      next: (response) => {
        this.customers = response;
      },
      error: (err) => {
        console.error('Error fetching customers', err);
      }
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      this.registrationStatus = { success: false, message: 'Invalid form data' };
      return;
    }
    const rawDate = this.form.value.date_of_purchase;
    const formattedDate = rawDate ? new Date(rawDate).toISOString().split('T')[0] : null;

    const deviceData = {
      owner: +this.form.value.owner,
      maker: this.form.value.maker,
      device_type: this.form.value.device_type,
      model_type: this.form.value.model_type,
      serial_number: this.form.value.serial_number,
      date_of_purchase: formattedDate,
    } as Device;

    console.log('Device data being sent:', deviceData);

    this.deviceService.registerDevice(deviceData).subscribe({
      next: (response) => {
        console.log('Device registered', response);
        this.registrationStatus = { success: true, message: response.msg };
        alert('Device registered');
        this.form.reset();
      },
      error: (response) => {
        const message = response.error.msg || 'Unknown error';
        console.error('Error registering device', response);
        this.registrationStatus = { success: false, message };
        alert("Device registration error")
      }
    });
  }
}
