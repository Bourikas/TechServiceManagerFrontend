import { MatInputModule  } from '@angular/material/input';
import { MatButtonModule  } from '@angular/material/button';
import { MatFormFieldModule  } from '@angular/material/form-field';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators, } from '@angular/forms';
import { CustomerService } from 'src/app/shared/services/customer.service';
import { Customer } from 'src/app/shared/interfaces/customer';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-customer-registration',
  standalone: true,
  imports: [ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule],
  templateUrl: './customer-registration.component.html',
  styleUrl: './customer-registration.component.css'
})
export class CustomerRegistrationComponent {
  userService = inject(UserService);
  customerService = inject(CustomerService);

  registrationStatus: { success: boolean; message: string } = {
    success: false,
    message: 'Not attempted yet',
  };


  form = new FormGroup({
    first_name: new FormControl('', Validators.required),
    last_name: new FormControl('', Validators.required),
    email: new FormControl('', Validators.email),
    city: new FormControl(''),
    phone_number: new FormControl('', [Validators.required, Validators.pattern('^[- +()0-9]+$')]),
  });

  ngOnInit() {
    
    this.userService.refreshToken().subscribe(() => {});
  }
  onSubmit(value:any){
    console.log(value)

    if (this.form.invalid) {
      this.registrationStatus = { success: false, message: 'Invalid form data' };
      return;
    }

    const customer = this.form.value as Customer;
    this.customerService.registerCustomer(customer).subscribe({
      next: (response) => {
        console.log('Customer registered', response);
        this.registrationStatus  = { success: true, message: response.msg };
        alert('Customer Registered successfully.')
      },
      error: (response) => {
        const message = response.error.msg;
        console.log('Error registering Customer', message);
        this.registrationStatus = { success: false, message };
        
        alert('Customer Registration error.')
        
        
      },
    })

  }
}
