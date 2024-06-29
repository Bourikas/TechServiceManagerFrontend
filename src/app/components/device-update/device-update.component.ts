// device-update.component.ts

import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DeviceService } from 'src/app/shared/services/device.service';
import { Device } from 'src/app/shared/interfaces/device';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-device-update',
  templateUrl: './device-update.component.html',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  styleUrls: ['./device-update.component.css']
})
export class DeviceUpdateComponent implements OnInit {
  deviceService = inject(DeviceService);
  route = inject(ActivatedRoute);
  router = inject(Router);
  
  form = new FormGroup({
    device_type: new FormControl('', Validators.required),
    serial_number: new FormControl('', Validators.required),
    model_type: new FormControl('', Validators.required),
    owner: new FormControl<number | null>(null, Validators.required),
    // Add more form controls as necessary
  });

  ngOnInit() {
    const deviceId = this.route.snapshot.params['id'];
    this.deviceService.getDeviceById(deviceId).subscribe({
      next: (device) => this.form.patchValue(device),
      error: (err) => console.error('Error fetching device', err)
    });
  }

  onSubmit() {
    const deviceId = this.route.snapshot.params['id'];
    if (this.form.invalid) {
      return;
    }

    const updatedDevice = this.form.value as Device;
    this.deviceService.updateDevice(deviceId, updatedDevice).subscribe({
      next: () => {
        this.router.navigate(['/device-list']);
        alert('Device update completed successfully!');
      },
      error: (err) => {
        console.error('Error updating device', err);
        alert('There was an error with device update!');
      }
    });
  }
}
