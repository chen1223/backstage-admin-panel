import { Component, OnInit, AfterViewInit, OnDestroy, HostListener } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  host: { 'class': 'header' }
})
export class HeaderComponent implements OnInit {

  menuStatus: string = 'collapsed';

  constructor() { }



  ngOnInit() {

  }

  // On user clicks log out
  onLogout(): void {

  }

  // On toggle menu
  toggleMenu(): void {
    this.menuStatus = this.menuStatus === 'collapsed' ? 'opened' : 'collapsed';
  }

}
