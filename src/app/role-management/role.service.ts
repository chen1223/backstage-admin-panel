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
    // Simulate API response for demo purpose
    return new Observable(observer => {
      setTimeout(() => {
        observer.next({
          'code':200,
          'roles':[
             {
                'id':21,
                'title':'Writer',
                'introduction':`Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.`,
                'images':[
                   {
                      'id':42,
                      'url':'https://via.placeholder.com/400x250',
                      'role_id':21
                   },
                   {
                      'id':43,
                      'url':'https://via.placeholder.com/400x250',
                      'role_id':21
                   }
                ]
             },
             {
                'id':22,
                'title':'Editor',
                'introduction':'It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
                'images':[
                   {
                      'id':44,
                      'url':'https://via.placeholder.com/400x250',
                      'role_id':22
                   },
                   {
                      'id':45,
                      'url':'https://via.placeholder.com/400x250',
                      'role_id':22
                   }
                ]
             }
          ]
       });
        observer.complete();
      }, 500);
    });
  }

  // update roles
  updateRoles(body): Observable<Object> {
    // Simulate API response for demo purpose
    return new Observable(observer => {
      setTimeout(() => {
        observer.next({
          'code':200,
          'roles':[
             {
                'id':21,
                'title':'Writer',
                'introduction':`Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.`,
                'images':[
                   {
                      'id':42,
                      'url':'https://via.placeholder.com/400x250',
                      'role_id':21
                   },
                   {
                      'id':43,
                      'url':'https://via.placeholder.com/400x250',
                      'role_id':21
                   }
                ]
             },
             {
                'id':22,
                'title':'Editor',
                'introduction':'It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
                'images':[
                   {
                      'id':44,
                      'url':'https://via.placeholder.com/400x250',
                      'role_id':22
                   },
                   {
                      'id':45,
                      'url':'https://via.placeholder.com/400x250',
                      'role_id':22
                   }
                ]
             }
          ]
       });
        observer.complete();
      }, 500);
    });
  }
}
