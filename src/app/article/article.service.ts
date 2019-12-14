import { Injectable } from '@angular/core';

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

  constructor() { }
}
