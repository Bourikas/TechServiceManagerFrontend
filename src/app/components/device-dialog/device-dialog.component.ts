import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogRef } from '@angular/material/dialog';
import { DeviceService } from 'src/app/shared/services/device.service';
import { Device } from 'src/app/shared/interfaces/device';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-device-dialog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './device-dialog.component.html',
  styleUrls: ['./device-dialog.component.css']
})
export class DeviceDialogComponent {
  deviceService = inject(DeviceService);
  
  form = new FormGroup({
    owner: new FormControl('', Validators.required),
    maker: new FormControl(''),
    device_type: new FormControl('', Validators.required),
    model_type: new FormControl('', Validators.required),
    serial_number: new FormControl('', Validators.required),
    date_of_purchase: new FormControl(''),
  });

  constructor(private dialogRef: MatDialogRef<DeviceDialogComponent>) {}

  onSubmit() {
    if (this.form.invalid) {
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

    this.deviceService.registerDevice(deviceData).subscribe({
      next: (createdDevice) => {
        this.dialogRef.close(createdDevice);
      },
      error: (err) => console.error('Error creating device', err)
    });
  }
}
