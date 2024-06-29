import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { CustomerService } from 'src/app/shared/services/customer.service';
import { Customer } from 'src/app/shared/interfaces/customer';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.css'],
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
export class CustomerListComponent implements OnInit {
  customerService = inject(CustomerService);
  router = inject(Router);
  customers: Customer[] = [];
  dataSource = new MatTableDataSource<Customer>();
  displayedColumns: string[] = ['first_name', 'last_name', 'email', 'phone', 'address', 'edit'];

  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit() {
    this.customerService.getCustomers().subscribe({
      next: (customers) => {
        this.dataSource.data = customers;
        this.dataSource.sort = this.sort;
        this.dataSource.filterPredicate = this.createFilter();
      },
      error: (err) => console.error('Error fetching customers', err)
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  createFilter(): (data: Customer, filter: string) => boolean {
    return (data: Customer, filter: string): boolean => {
      const searchStr = (
        data.first_name + 
        data.last_name + 
        data.email + 
        data.phone_number + 
        data.address
      ).toLowerCase();
      return searchStr.includes(filter);
    };
  }

  onEdit(customerId: number) {
    this.router.navigate([`/customer-update/${customerId}`]);
  }
}
