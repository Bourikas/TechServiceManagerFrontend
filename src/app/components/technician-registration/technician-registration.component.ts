import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TechnicianService } from 'src/app/shared/services/technician.service';
import { Technician } from 'src/app/shared/interfaces/technician';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-technician-registration',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './technician-registration.component.html',
  styleUrls: ['./technician-registration.component.css']
})
export class TechnicianRegistrationComponent {
  technicianService = inject(TechnicianService);
  userService = inject(UserService);
  
  registrationStatus: { success: boolean; message: string } = {
    success: false,
    message: 'Not attempted yet',
  };

  form = new FormGroup({
    first_name: new FormControl('', Validators.required),
    last_name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    bio: new FormControl(''),
    shop: new FormControl(''),
    password: new FormControl('', [Validators.required]),
    password_confirm: new FormControl('', [Validators.required]),
  });
  ngOnInit() {
    
    this.userService.refreshToken().subscribe(() => {});
  }
  onSubmit() {
    if (this.form.invalid) {
      this.registrationStatus = { success: false, message: 'Invalid form data' };
      return;
    }

    const technician = this.form.value as Technician;
    this.technicianService.registerTechnician(technician).subscribe({
      next: (response) => {
        console.log('Technician registered', response);
        this.registrationStatus = { success: true, message: 'Technician registered successfully' };
        alert('Technician Registered, await for your activation.')
      },
      error: (error) => {
        console.error('Error registering Technician', error);
        this.registrationStatus = { success: false, message: 'Registration failed' };
        alert('technician registration failed, check your input.')
      },
    });
  }
}
