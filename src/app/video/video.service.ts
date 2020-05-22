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
    const url = this.apiService.API.categories;
    return this.http.post(url, body);
  }
  // Get all categories
  getCategories(): Observable<Object> {
    const url = this.apiService.API.categories;
    return this.http.get(url);
  }

  // Get Vimeo video data
  getVimeoPhoto(videoID) {
    return this.http.get(`https://vimeo.com/api/v2/video/${videoID}.json`);
  }
  // Get all video list
  getVideos(): Observable<Object> {
    const url = this.apiService.API.videos;
    return this.http.get(url);
  }
  // Save video order
  saveOrder(body: Object): Observable<Object> {
    const url = this.apiService.API.videoOrder;
    return this.http.patch(url, body);
  }
  // Get single video details
  getVideo(videoId): Observable<Object> {
    const url = `${this.apiService.API.video}/${videoId}`;
    return this.http.get(url);
  }
  // Save video
  createVideo(body: Object): Observable<Object> {
    const url = this.apiService.API.video;
    return this.http.post(url, body);
  }
  // Update video
  updateVideo(videoId, body): Observable<Object> {
    const url = `${this.apiService.API.video}/${videoId}`;
    return this.http.patch(url, body);
  }
  // Publish / Unpublish video
  updateVideoStatus(videoId, body): Observable<Object> {
    const url = `${this.apiService.API.videoStatus}/${videoId}`;
    return this.http.put(url, body);
  }
}
