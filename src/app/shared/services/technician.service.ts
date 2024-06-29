import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Technician, LoggedInTechnician} from '../interfaces/technician';
import { Observable } from 'rxjs';


const API_URL = `${environment.apiURL}`
@Injectable({
  providedIn: 'root'
})
export class TechnicianService {

  http: HttpClient = inject(HttpClient)

  technician = signal<LoggedInTechnician | null>(null);

  registerTechnician(technician: Technician){
    return this.http.post<{msg: string}>(`${API_URL}/api/technicians/register/`, technician)
  }

  getTechnicians(): Observable<Technician[]> {
    return this.http.get<Technician[]>(`${API_URL}/api/technicians/`)
  }

  getTechnicianDetails(userId: number): Observable<any> {
    return this.http.get<Technician>(`${API_URL}/api/technicians/${userId}/`);
  }
  loggedInTechnician(): LoggedInTechnician | null {
    return this.technician();
  }
}
