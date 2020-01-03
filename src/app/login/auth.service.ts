import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from './../shared/api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient,
              private apiService: ApiService) { }

  login(body): Observable<Object> {
    const url = this.apiService.API.login;
    return this.http.post(url, body);
  }

  logout(body): Observable<Object> {
    const url = this.apiService.API.logout;
    return this.http.post(url, body);
  }
}
