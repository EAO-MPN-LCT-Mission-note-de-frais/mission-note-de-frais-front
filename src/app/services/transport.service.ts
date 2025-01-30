import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@/environments/environment';

interface Transport {
  id: number;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class TransportService {
  private apiUrl = environment.apiURL + '/transports';

  constructor(private http: HttpClient) {}

  getAllTransports(): Observable<Transport[]> {
    return this.http.get<Transport[]>(this.apiUrl);
  }

  createTransport(transport: { name: string }): Observable<Transport> {
    return this.http.post<Transport>(this.apiUrl, transport);
  }
}
