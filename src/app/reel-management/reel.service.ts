import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from './../shared/api.service';

@Injectable({
  providedIn: 'root'
})
export class ReelService {

  constructor(private http: HttpClient,
              private apiService: ApiService) { }

  // Get reel
  getReel(): Observable<Object> {
    const url = this.apiService.API.reel;
    return this.http.get(url);
  }

  // Save reel
  saveReel(body): Observable<Object> {
    const url = this.apiService.API.reel;
    return this.http.post(url, body);
  }
}
