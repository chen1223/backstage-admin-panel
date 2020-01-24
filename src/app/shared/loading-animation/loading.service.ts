import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  constructor() { }

  // Attach loading animation
  showLoading(): void {
    (document.querySelector('.loading .canvas') as HTMLDivElement).classList.add('show');
  }

  // Hide loading animation
  hideLoading(): void {
    (document.querySelector('.loading .canvas') as HTMLDivElement).classList.remove('show');
  }
}
