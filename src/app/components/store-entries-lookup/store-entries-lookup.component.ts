import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { environment } from 'src/environments/environment';

const API_URL = `${environment.apiURL}`;

@Component({
  selector: 'store-entries-lookup',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './store-entries-lookup.component.html',
  styleUrls: ['./store-entries-lookup.component.css'],
})
export class StoreEntriesLookupComponent {
  http: HttpClient = inject(HttpClient);
  invalidLookup = false;
  lookupResult: any = null;

  form = new FormGroup({
    phone_number: new FormControl('+300000000000', [Validators.required]),
    serial_number: new FormControl('', Validators.required),
  });

  onSubmit() {
    if (this.form.invalid) {
      this.invalidLookup = true;
      return;
    }

    const lookupData = this.form.value;
    this.http.post(`${API_URL}/api/lookup/`, lookupData).subscribe({
      next: (response) => {
        console.log('Lookup successful', response);
        this.invalidLookup = false;
        this.lookupResult = response; // Store the response data
      },
      error: (error) => {
        console.error('Lookup error', error);
        this.invalidLookup = true;
        this.lookupResult = null; // Clear previous results on error
      }
    });
  }
}
