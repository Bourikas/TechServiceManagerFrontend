import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { DeviceService } from 'src/app/shared/services/device.service';
import { Device } from 'src/app/shared/interfaces/device';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-device-list',
  templateUrl: './device-list.component.html',
  styleUrls: ['./device-list.component.css'],
  imports: [
    CommonModule,
    MatListModule,
    MatDividerModule,
    MatTableModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  standalone: true
})
export class DeviceListComponent implements OnInit {
  deviceService = inject(DeviceService);
  router = inject(Router);
  devices: Device[] = [];
  dataSource = new MatTableDataSource<Device>();
  displayedColumns: string[] = ['device_type', 'serial_number', 'model_type', 'owner', 'edit'];

  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit() {
    this.deviceService.getDevices().subscribe({
      next: (devices) => {
        this.dataSource.data = devices;
        this.dataSource.sort = this.sort;
        this.dataSource.filterPredicate = this.createFilter();
      },
      error: (err) => console.error('Error fetching devices', err)
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  createFilter(): (data: Device, filter: string) => boolean {
    return (data: Device, filter: string): boolean => {
      const searchStr = (
        data.device_type + 
        data.serial_number + 
        data.model_type + 
        data.owner
      ).toLowerCase();
      return searchStr.includes(filter);
    };
  }

  onEdit(deviceId: number) {
    this.router.navigate([`/device-update/${deviceId}`]);
  }
}
