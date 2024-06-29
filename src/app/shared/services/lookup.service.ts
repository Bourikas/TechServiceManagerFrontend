import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const API_URL = `${environment.apiURL}/customers`;
@Injectable({ //you can inject injectable services globally
  providedIn: 'root'
})
export class LookupService {

  http: HttpClient = Inject(HttpClient);

  getLookup() {
    return this.http.post<{msg: string}>(`${API_URL}/lookup`, {
      headers: {
        Accept: 'application/json'
      }
    })
  }
}
