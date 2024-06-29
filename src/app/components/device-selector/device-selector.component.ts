import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDialog } from '@angular/material/dialog';
import { Device } from 'src/app/shared/interfaces/device';
import { DeviceService } from 'src/app/shared/services/device.service';
import { CommonModule } from '@angular/common';
import { DeviceDialogComponent } from '../device-dialog/device-dialog.component';

@Component({
  selector: 'app-device-selector',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatInputModule, MatButtonModule],
  templateUrl: './device-selector.component.html',
  styleUrls: ['./device-selector.component.css']
})
export class DeviceSelectorComponent implements OnInit {
  deviceService = inject(DeviceService);
  searchControl = new FormControl('');
  devices: Device[] = [];
  filteredDevices: Device[] = [];

  @Output() deviceSelected = new EventEmitter<number>(); // Emit the device ID

  constructor(private dialog: MatDialog) {}

  ngOnInit() {
    this.deviceService.getDevices().subscribe({
      next: (response) => {
        this.devices = response;
        this.filteredDevices = response;
      },
      error: (err) => console.error('Error fetching devices', err)
    });

    this.searchControl.valueChanges.subscribe((searchTerm) => {
      this.filteredDevices = this.devices.filter(device =>
        device.device_type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        device.model_type.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
  }

  selectDevice(device: Device) {
    this.deviceSelected.emit(device.id); // Emit only the device ID
  }

  openAddDeviceDialog() {
    const dialogRef = this.dialog.open(DeviceDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.devices.push(result);
        this.filteredDevices.push(result);
      }
    });
  }
}
