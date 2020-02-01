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
    // Simulate API response for demo purpose
    return new Observable(observer => {
      setTimeout(() => {
        observer.next({
          'code':200,
          'token': 'exampletoken'
       });
        observer.complete();
      }, 500);
    });
  }

  logout(body): Observable<Object> {
    // Simulate API response for demo purpose
    return new Observable(observer => {
      setTimeout(() => {
        observer.next({
          'code':200,
          'msg': 'Logout successfully!'
       });
        observer.complete();
      }, 500);
    });
  }
}
