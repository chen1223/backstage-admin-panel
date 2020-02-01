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
    // Simulate API response for demo purpose
    return new Observable(observer => {
      setTimeout(() => {
        observer.next({
          'code':200,
          'reel':{
             'reelUrl':'https:\/\/vimeo.com\/123456789',
             'reelType':'vimeo',
             'imgs':[
                {
                   'id':1,
                   'url':'https://via.placeholder.com/400x250',
                   'size':'desktop'
                },
                {
                   'id':2,
                   'url':'https://via.placeholder.com/400x250',
                   'size':'desktop'
                },
                {
                   'id':3,
                   'url':'https://via.placeholder.com/400x250',
                   'size':'desktop'
                },
                {
                   'id':4,
                   'url':'https://via.placeholder.com/400x250',
                   'size':'desktop'
                },
                {
                   'id':9,
                   'url':'https://via.placeholder.com/300x400',
                   'size':'mobile'
                },
                {
                   'id':10,
                   'url':'https://via.placeholder.com/300x400',
                   'size':'mobile'
                },
                {
                   'id':11,
                   'url':'https://via.placeholder.com/300x400',
                   'size':'mobile'
                },
                {
                   'id':12,
                   'url':'https://via.placeholder.com/300x400',
                   'size':'mobile'
                }
             ]
          }
       });
        observer.complete();
      }, 500);
    });
  }

  // Save reel
  saveReel(body): Observable<Object> {
    // Simulate API response for demo purpose
    return new Observable(observer => {
      setTimeout(() => {
        observer.next({
          'code':200,
          'reel':{
             'reelUrl':'https:\/\/vimeo.com\/123456789',
             'reelType':'vimeo',
             'imgs':[
                {
                   'id':1,
                   'url':'https://via.placeholder.com/400x250',
                   'size':'desktop'
                },
                {
                   'id':2,
                   'url':'https://via.placeholder.com/400x250',
                   'size':'desktop'
                },
                {
                   'id':3,
                   'url':'https://via.placeholder.com/400x250',
                   'size':'desktop'
                },
                {
                   'id':4,
                   'url':'https://via.placeholder.com/400x250',
                   'size':'desktop'
                },
                {
                   'id':9,
                   'url':'https://via.placeholder.com/300x400',
                   'size':'mobile'
                },
                {
                   'id':10,
                   'url':'https://via.placeholder.com/300x400',
                   'size':'mobile'
                },
                {
                   'id':11,
                   'url':'https://via.placeholder.com/300x400',
                   'size':'mobile'
                },
                {
                   'id':12,
                   'url':'https://via.placeholder.com/300x400',
                   'size':'mobile'
                }
             ]
          }
       });
        observer.complete();
      }, 500);
    });
  }
}
