import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from './../shared/api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  constructor(private http: HttpClient,
              private apiService: ApiService) { }

  // Update categories
  updateCategories(body: Object): Observable<Object> {
    // Simulate API response for demo purpose
    return new Observable(observer => {
      setTimeout(() => {
        observer.next({
          'code':200,
          'data':[
             {
                'id':1,
                'text':'Comedy',
                'status':'inUsed'
             },
             {
                'id':2,
                'text':'Horror',
                'status':'inUsed'
             },
             {
                'id':4,
                'text':'Action',
                'status':'unUsed'
             },
             {
                'id':5,
                'text':'Drama',
                'status':'unUsed'
             }
          ]
       });
        observer.complete();
      }, 500);
    });
  }
  // Get all categories
  getCategories(): Observable<Object> {
    // Simulate API response for demo purpose
    return new Observable(observer => {
      setTimeout(() => {
        observer.next({
          'code':200,
          'data':[
             {
                'id':1,
                'text':'Comedy',
                'status':'inUsed'
             },
             {
                'id':2,
                'text':'Horror',
                'status':'inUsed'
             },
             {
                'id':4,
                'text':'Action',
                'status':'unUsed'
             },
             {
                'id':5,
                'text':'Drama',
                'status':'unUsed'
             }
          ]
       });
        observer.complete();
      }, 500);
    });
  }

  // Get Vimeo video data
  getVimeoPhoto(videoID) {
    return this.http.get(`https://vimeo.com/api/v2/video/${videoID}.json`);
  }
  // Get all video list
  getVideos(): Observable<Object> {
    // Simulate API response for demo purpose
    return new Observable(observer => {
      setTimeout(() => {
        observer.next({
          'code':200,
          'data':[
             {
                'id':2,
                'title':'Video 1',
                'url':'https:\/\/www.youtube.com\/watch?v=123456789',
                'coverImg':'https://via.placeholder.com/400x250',
                'year':2019,
                'status':'published',
                'categoryId':2,
                'datePublished':'2020-01-31'
             },
             {
                'id':3,
                'title':'Video 2',
                'url':'https:\/\/vimeo.com\/123456789',
                'coverImg':'https://via.placeholder.com/400x250',
                'year':2018,
                'status':'draft',
                'categoryId':1,
                'datePublished': null
             }
          ]
       });
        observer.complete();
      }, 500);
    });
  }
  // Get single video details
  getVideo(videoId): Observable<Object> {
    // Simulate API response for demo purpose
    return new Observable(observer => {
      setTimeout(() => {
        observer.next({
          'code':200,
          'data':{
             'id':2,
             'title':'Video 1',
             'year':2019,
             'description':'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
             'url':'https:\/\/www.youtube.com\/watch?v=123456789',
             'status':'published',
             'categoryId':2,
             'genres':[
                {
                   'id':15,
                   'genre':'Horror',
                   'video_id':2
                }
             ]
          }
       });
        observer.complete();
      }, 500);
    });
  }
  // Save video
  createVideo(body): Observable<Object> {
    // Simulate API response for demo purpose
    return new Observable(observer => {
      setTimeout(() => {
        observer.next({
          'code':200,
          'data':{
             'id':2,
             'title':'Video 1',
             'year':2019,
             'description':'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
             'url':'https:\/\/www.youtube.com\/watch?v=123456789',
             'status':'published',
             'categoryId':2,
             'genres':[
                {
                   'id':15,
                   'genre':'Horror',
                   'video_id':2
                }
             ]
          }
       });
        observer.complete();
      }, 500);
    });
  }
  // Update video
  updateVideo(videoId, body): Observable<Object> {
    // Simulate API response for demo purpose
    return new Observable(observer => {
      setTimeout(() => {
        observer.next({
          'code':200,
          'data':{
             'id':2,
             'title':'Video 1',
             'year':2019,
             'description':'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
             'url':'https:\/\/www.youtube.com\/watch?v=123456789',
             'status':'published',
             'categoryId':2,
             'genres':[
                {
                   'id':15,
                   'genre':'Horror',
                   'video_id':2
                }
             ]
          }
       });
        observer.complete();
      }, 500);
    });
  }
  // Publish / Unpublish video
  updateVideoStatus(videoId, body): Observable<Object> {
    // Simulate API response for demo purpose
    return new Observable(observer => {
      setTimeout(() => {
        observer.next({
          'code':200,
          'status': 'published'
       });
        observer.complete();
      }, 500);
    });
  }
}
