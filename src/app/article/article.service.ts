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
    // Simulate API response for demo purpose
    return new Observable(observer => {
      setTimeout(() => {
        observer.next({
          'code':200,
          'data':{
             'id':2,
             'title':'Article 1',
             'status':'draft',
             'coverImg':'https://via.placeholder.com/800x450',
             'paragraphs':[
                {
                   'id':3,
                   'layout':1,
                   'article_id':2,
                   'order':1,
                   'text':`Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
                   'images':[

                   ]
                },
                {
                   'id':12,
                   'layout':5,
                   'article_id':2,
                   'order':2,
                   'text':`Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`,
                   'images':[
                      {
                         'id':16,
                         'url':'https://via.placeholder.com/400x250',
                         'paragraph_id':12
                      },
                      {
                         'id':17,
                         'url':'https://via.placeholder.com/400x250',
                         'paragraph_id':12
                      }
                   ]
                },
                {
                   'id':13,
                   'layout':4,
                   'article_id':2,
                   'order':3,
                   'text':`Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`,
                   'images':[
                      {
                         'id':18,
                         'url':'https://via.placeholder.com/400x250',
                         'paragraph_id':13
                      }
                   ]
                }
             ]
          }
       });
        observer.complete();
      }, 500);
    });
  }

  // Get a single article data
  getArticle(articleId): Observable<Object> {
    // Simulate API response for demo purpose
    return new Observable(observer => {
      setTimeout(() => {
        observer.next({
          'code':200,
          'data':{
             'id':2,
             'title':'Article 1',
             'status':'draft',
             'coverImg':'https://via.placeholder.com/800x450',
             'paragraphs':[
                {
                   'id':3,
                   'layout':1,
                   'article_id':2,
                   'order':1,
                   'text':`Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
                   'images':[

                   ]
                },
                {
                   'id':12,
                   'layout':5,
                   'article_id':2,
                   'order':2,
                   'text':`Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`,
                   'images':[
                      {
                         'id':16,
                         'url':'https://via.placeholder.com/400x250',
                         'paragraph_id':12
                      },
                      {
                         'id':17,
                         'url':'https://via.placeholder.com/400x250',
                         'paragraph_id':12
                      }
                   ]
                },
                {
                   'id':13,
                   'layout':4,
                   'article_id':2,
                   'order':3,
                   'text':`Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`,
                   'images':[
                      {
                         'id':18,
                         'url':'https://via.placeholder.com/400x250',
                         'paragraph_id':13
                      }
                   ]
                }
             ]
          }
       });
        observer.complete();
      }, 500);
    });
  }

  // Update an article
  updateArticle(articleId, body): Observable<Object> {
    // Simulate API response for demo purpose
    return new Observable(observer => {
      setTimeout(() => {
        observer.next({
          'code':200,
          'data':{
             'id':2,
             'title':'Article 1',
             'status':'draft',
             'coverImg':'https://via.placeholder.com/800x450',
             'paragraphs':[
                {
                   'id':3,
                   'layout':1,
                   'article_id':2,
                   'order':1,
                   'text':`Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
                   'images':[

                   ]
                },
                {
                   'id':12,
                   'layout':5,
                   'article_id':2,
                   'order':2,
                   'text':`Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`,
                   'images':[
                      {
                         'id':16,
                         'url':'https://via.placeholder.com/400x250',
                         'paragraph_id':12
                      },
                      {
                         'id':17,
                         'url':'https://via.placeholder.com/400x250',
                         'paragraph_id':12
                      }
                   ]
                },
                {
                   'id':13,
                   'layout':4,
                   'article_id':2,
                   'order':3,
                   'text':`Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`,
                   'images':[
                      {
                         'id':18,
                         'url':'https://via.placeholder.com/400x250',
                         'paragraph_id':13
                      }
                   ]
                }
             ]
          }
       });
        observer.complete();
      }, 500);
    });
  }

  // Update article status
  updateArticleStatus(articleId, body): Observable<Object> {
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

  // Get all articles
  getArticles(): Observable<Object> {
    // Simulate API response for demo purpose
    return new Observable(observer => {
      setTimeout(() => {
        observer.next({
          'code':200,
          'data':[
             {
                'id':2,
                'title':'Article 1',
                'status':'draft',
                'datePublished':null,
                'coverImg':'https://via.placeholder.com/400x250'
             },
             {
                'id':3,
                'title':'Article 2',
                'status':'published',
                'datePublished':'2020-01-24',
                'coverImg':'https://via.placeholder.com/400x250'
             }
          ]
       });
        observer.complete();
      }, 500);
    });
  }
}
