import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { StoreEntryService } from 'src/app/shared/services/store-entry.service';
import { StoreEntryDetailed } from 'src/app/shared/interfaces/store-entry';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-store-entry-list',
  templateUrl: './store-entry-list.component.html',
  styleUrls: ['./store-entry-list.component.css'], 
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
export class StoreEntryListComponent implements OnInit {
  storeEntryService = inject(StoreEntryService);
  router = inject(Router);
  userService = inject(UserService);
  storeEntries: StoreEntryDetailed[] = [];
  dataSource = new MatTableDataSource<StoreEntryDetailed>();
  displayedColumns: string[] = ['device_type', 'serial_number', 'model_type', 'owner_last_name', 'malfunction_description', 'entry_date', 'return_date','edit',];

  @ViewChild(MatSort) sort!: MatSort;
  
  ngOnInit() {
    this.userService.refreshToken().subscribe(() => {});
    
    this.storeEntryService.getStoreEntriesDetailed().subscribe({
      next: (entries) => {
        this.dataSource.data = entries;
        this.dataSource.sort = this.sort;
        this.dataSource.filterPredicate = this.createFilter();
      },
      error: (err) => console.error('Error fetching store entries', err)
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  createFilter(): (data: StoreEntryDetailed, filter: string) => boolean {
    return (data: StoreEntryDetailed, filter: string): boolean => {
      const searchStr = (
        data.device.device_type + 
        data.device.serial_number + 
        data.device.model_type + 
        data.owner.last_name + 
        data.malfunction_description
      ).toLowerCase();
      return searchStr.includes(filter);
    };
  }

  onEdit(entryId: number) {
    this.router.navigate([`/store-entry-update/${entryId}`]);
  }
}
