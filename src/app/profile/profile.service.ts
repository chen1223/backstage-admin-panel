import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from './../shared/api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient,
              private apiService: ApiService) { }

  // get profile
  getProfile(): Observable<Object> {
    const url = this.apiService.API.profile;
    return this.http.get(url);
  }

  // update profile
  updateProfile(data: Object): Observable<Object> {
    const url = this.apiService.API.profile;
    return this.http.patch(url, data);
  }
}
