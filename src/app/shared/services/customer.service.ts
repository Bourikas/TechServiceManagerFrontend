import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Customer } from '../interfaces/customer';
import { Observable } from 'rxjs';


const API_URL = `${environment.apiURL}`
@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  http: HttpClient = inject(HttpClient)

  registerCustomer(customer: Customer){
    return this.http.post<{msg: string}>(`${API_URL}/api/customers/`, customer)
  }

  getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${API_URL}/api/customers/`);
  }
  
  getCustomerById(id: number): Observable<Customer> {
    return this.http.get<Customer>(`${API_URL}/api/customers/${id}/`);
  }

  updateCustomer(id: number, customer: Customer): Observable<any> {
    return this.http.put(`${API_URL}/api/customers/${id}/`, customer);
  }
}
