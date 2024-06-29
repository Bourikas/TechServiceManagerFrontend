// customer-update.component.ts

import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomerService } from 'src/app/shared/services/customer.service';
import { Customer } from 'src/app/shared/interfaces/customer';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-customer-update',
  templateUrl: './customer-update.component.html',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  styleUrls: ['./customer-update.component.css']
})
export class CustomerUpdateComponent implements OnInit {
  customerService = inject(CustomerService);
  route = inject(ActivatedRoute);
  router = inject(Router);
  
  form = new FormGroup({
    first_name: new FormControl('', Validators.required),
    last_name: new FormControl('', Validators.required),
    email: new FormControl('', [ Validators.email]),
    city: new FormControl('',),
    phone_number: new FormControl('', Validators.required),
    // Add more form controls as necessary
  });

  ngOnInit() {
    const customerId = this.route.snapshot.params['id'];
    this.customerService.getCustomerById(customerId).subscribe({
      next: (customer) => this.form.patchValue(customer),
      error: (err) => console.error('Error fetching customer', err)
    });
  }

  onSubmit() {
    const customerId = this.route.snapshot.params['id'];
    if (this.form.invalid) {
      return;
    }

    const updatedCustomer = this.form.value as Customer;
    this.customerService.updateCustomer(customerId, updatedCustomer).subscribe({
      next: () => {
        this.router.navigate(['/customer-list']);
        alert('Customer update completed successfully!');
      },
      error: (err) => {
        console.error('Error updating customer', err);
        alert('There was an error with customer update!');
      }
    });
  }
}
