import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Device } from '../interfaces/device';
import { environment } from 'src/environments/environment';

const API_URL = `${environment.apiURL}`;

@Injectable({
  providedIn: 'root',
})
export class DeviceService {
  http: HttpClient = inject(HttpClient);

  registerDevice(device: Device): Observable<{ msg: string }> {
    return this.http.post<{ msg: string }>(`${API_URL}/api/devices/`, device);
  }

  getDevices(): Observable<Device[]> {
    return this.http.get<Device[]>(`${API_URL}/api/devices/`);
  }

  getDeviceById(id: number): Observable<Device> {
    return this.http.get<Device>(`${API_URL}/api/devices/${id}/`);
  }

  updateDevice(id: number, device: Device): Observable<any> {
    return this.http.put(`${API_URL}/api/devices/${id}/`, device);
  }
}
