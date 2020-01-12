import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from './../shared/api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private http: HttpClient,
              private apiService: ApiService) { }

  // Get all roles
  getRoles(): Observable<Object> {
    const url = this.apiService.API.roles;
    return this.http.get(url);
  }

  // update roles
  updateRoles(body): Observable<Object> {
    const url = this.apiService.API.roles;
    return this.http.post(url, body);
  }
}
