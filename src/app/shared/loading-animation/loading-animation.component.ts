import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading-animation',
  templateUrl: './loading-animation.component.html',
  styleUrls: ['./loading-animation.component.scss'],
  host: { 'class': 'loading' }
})
export class LoadingAnimationComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
