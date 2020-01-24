import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from './../shared/api.service';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  // Layout types
  TEXT_ONLY = 1;
  IMAGE_ONLY = 2;
  TEXT_WITH_ONE_IMAGE_RIGHT = 3;
  TEXT_WITH_ONE_IMAGE_LEFT = 4;
  TEXT_WITH_TWO_IMAGES_RIGHT = 5;
  TEXT_WITH_TWO_IMAGES_LEFT = 6;

  constructor(private http: HttpClient,
              private apiService: ApiService) { }

  // Create article
  createArticle(body): Observable<Object> {
    const url = this.apiService.API.article;
    return this.http.post(url, body);
  }

  // Get a single article data
  getArticle(articleId): Observable<Object> {
    const url = `${this.apiService.API.article}/${articleId}`;
    return this.http.get(url);
  }

  // Update an article
  updateArticle(articleId, body): Observable<Object> {
    const url = `${this.apiService.API.article}/${articleId}`;
    return this.http.patch(url, body)
  }

  // Update article status
  updateArticleStatus(articleId, body): Observable<Object> {
    const url = `${this.apiService.API.article}/status/${articleId}`;
    return this.http.put(url, body);
  }

  // Get all articles
  getArticles(): Observable<Object> {
    const url = this.apiService.API.articles;
    return this.http.get(url);
  }
}
