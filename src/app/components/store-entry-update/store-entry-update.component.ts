import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { StoreEntryService } from 'src/app/shared/services/store-entry.service';
import { StoreEntry } from 'src/app/shared/interfaces/store-entry';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { Technician } from 'src/app/shared/interfaces/technician';
import { TechnicianService } from 'src/app/shared/services/technician.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-store-entry-update',
  templateUrl: './store-entry-update.component.html',
  standalone: true,
  imports: [CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,],
  styleUrls: ['./store-entry-update.component.css']
})
export class StoreEntryUpdateComponent implements OnInit {
  storeEntryService = inject(StoreEntryService);
  route = inject(ActivatedRoute);
  router = inject(Router);
  userService = inject(UserService);
  
  technicianService = inject(TechnicianService);
  technicians: Technician[] = [];
  
  form = new FormGroup({
    malfunction_description: new FormControl('', Validators.required),
    device_condition: new FormControl('', Validators.required),
    entry_date: new FormControl('', Validators.required),
    inspection_date: new FormControl(''),
    repair_date: new FormControl(''),
    return_date: new FormControl(''),
    repair_description: new FormControl(''),
    repair_cost: new FormControl<number | null>(null),  // Updated to handle number
    part_description: new FormControl(''),
    part_cost: new FormControl<number | null>(null),  // Updated to handle number
    device: new FormControl<number | null>(null, Validators.required),
    technician: new FormControl<number | null>(null, Validators.required),
  });

  ngOnInit() {
    this.userService.refreshToken().subscribe(() => {});
    
    const entryId = this.route.snapshot.params['id'];
    this.storeEntryService.getStoreEntryById(entryId).subscribe({
      next: (entry) => this.form.setValue({
        malfunction_description: entry.malfunction_description,
        device_condition: entry.device_condition,
        entry_date: entry.entry_date,
        inspection_date: entry.inspection_date,
        repair_date: entry.repair_date,
        return_date: entry.return_date,
        repair_description: entry.repair_description,
        repair_cost: entry.repair_cost,
        part_description: entry.part_description,
        part_cost: entry.part_cost,
        device: entry.device,
        technician: entry.technician,
      }),
      error: (err) => console.error('Error fetching store entry', err)
    });
    this.technicianService.getTechnicians().subscribe({
      next: (response) => {
        this.technicians = response;
      },
      error: (err) => {
        console.error('Error fetching Technicians', err);
      }
    });
  }

  onSubmit() {
    const entryId = this.route.snapshot.params['id'];
    if (this.form.invalid) {
      return;
    }

    const updatedEntry = this.form.value as StoreEntry;
    this.storeEntryService.updateStoreEntry(entryId, updatedEntry).subscribe({
      next: () => {this.router.navigate(['/store-entry-list']);
        alert('Entry update completed successfully!')},
      error: (err) => {console.error('Error updating store entry', err);
      alert('There was an error with entry update!')}
    });
  }
}
