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
    // Simulate API response for demo purpose
    return new Observable(observer => {
      setTimeout(() => {
        observer.next({
          'code':200,
          'profile':{
             'firstname':'John',
             'lastname':'Smith',
             'email':'john@example.com',
             'intro':'John Smith is a top secret agent.',
             'contactMe':'Interested in working with me? Great! Send me an email or reach out to me via social media and I\u2019ll get back to you shortly! I look forward to our collaboration :)',
             'resume':'https://www.kcdrwebshop.nl/sample-resume-format-pdf.html',
             'profileLink':'https://via.placeholder.com/400x250',
             'facebookLink':'https:\/\/www.facebook.com\/example',
             'facebookEnable':true,
             'vimeoLink': null,
             'vimeoEnable':false,
             'youtubeLink': null,
             'youtubeEnable':false,
             'instagramLink': null,
             'instagramEnable':false
          }
       });
        observer.complete();
      }, 500);
    });
  }

  // update profile
  updateProfile(data: Object): Observable<Object> {
    // Simulate API response for demo purpose
    return new Observable(observer => {
      setTimeout(() => {
        observer.next({
          'code': 200,
          'msg': 'Profile updated successfully!'
        });
        observer.complete();
      }, 300);
    });
  }
}
