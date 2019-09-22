import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
  host: { 'class': 'side-nav' }
})
export class SideNavComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
