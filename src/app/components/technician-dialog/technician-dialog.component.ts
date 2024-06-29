import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogRef } from '@angular/material/dialog';
import { TechnicianService } from 'src/app/shared/services/technician.service';
import { Technician } from 'src/app/shared/interfaces/technician';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-technician-dialog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './technician-dialog.component.html',
  styleUrls: ['./technician-dialog.component.css']
})
export class TechnicianDialogComponent {
  technicianService = inject(TechnicianService);
  
  form = new FormGroup({
    first_name: new FormControl('', Validators.required),
    last_name: new FormControl('', Validators.required),
    // Add more form controls as necessary
  });

  constructor(private dialogRef: MatDialogRef<TechnicianDialogComponent>) {}

  onSubmit() {
    if (this.form.invalid) {
      return;
    }

    const newTechnician = this.form.value as Technician;

    this.technicianService.registerTechnician(newTechnician).subscribe({
      next: (createdTechnician) => {
        this.dialogRef.close(createdTechnician);
      },
      error: (err) => console.error('Error creating technician', err)
    });
  }
}
