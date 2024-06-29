import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDialog } from '@angular/material/dialog';
import { Technician } from 'src/app/shared/interfaces/technician';
import { TechnicianService } from 'src/app/shared/services/technician.service';
import { CommonModule } from '@angular/common';
import { TechnicianDialogComponent } from '../technician-dialog/technician-dialog.component';

@Component({
  selector: 'app-technician-selector',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatInputModule, MatButtonModule],
  templateUrl: './technician-selector.component.html',
  styleUrls: ['./technician-selector.component.css']
})
export class TechnicianSelectorComponent implements OnInit {
  technicianService = inject(TechnicianService);
  searchControl = new FormControl('');
  technicians: Technician[] = [];
  filteredTechnicians: Technician[] = [];

  @Output() technicianSelected = new EventEmitter<number>(); // Emit the technician ID

  constructor(private dialog: MatDialog) {}

  ngOnInit() {
    this.technicianService.getTechnicians().subscribe({
      next: (response) => {
        this.technicians = response;
        this.filteredTechnicians = response;
      },
      error: (err) => console.error('Error fetching technicians', err)
    });

    this.searchControl.valueChanges.subscribe((searchTerm) => {
      this.filteredTechnicians = this.technicians.filter(technician =>
        technician.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        technician.first_name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
  }

  selectTechnician(technician: Technician) {
    this.technicianSelected.emit(technician.id); // Emit only the technician ID
  }

  openAddTechnicianDialog() {
    const dialogRef = this.dialog.open(TechnicianDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.technicians.push(result);
        this.filteredTechnicians.push(result);
      }
    });
  }
}
