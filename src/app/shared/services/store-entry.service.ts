import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { StoreEntry, StoreEntryDetailed } from '../interfaces/store-entry';
import { Observable } from 'rxjs';

const API_URL = `${environment.apiURL}/api/store_entries/`;

@Injectable({
  providedIn: 'root'
})
export class StoreEntryService {
  private http = inject(HttpClient);

  getStoreEntries(): Observable<StoreEntry[]> {
    return this.http.get<StoreEntry[]>(API_URL);
  }

  getStoreEntriesDetailed(): Observable<StoreEntryDetailed[]> {
    return this.http.get<StoreEntryDetailed[]>(`${environment.apiURL}/api/store_entries_detailed/`);
  }

  getStoreEntryById(id: number): Observable<StoreEntry> {
    return this.http.get<StoreEntry>(`${API_URL}${id}/`);
  }

  updateStoreEntry(id: number, entry: StoreEntry): Observable<StoreEntry> {
    return this.http.put<StoreEntry>(`${API_URL}${id}/`, entry);
  }


  registerStoreEntry(storeEntry: StoreEntry){
    return this.http.post<{msg: string}>(`${API_URL}`, storeEntry)
  }
}
