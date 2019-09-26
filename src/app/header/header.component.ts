import { Component, OnInit, AfterViewInit, OnDestroy, HostListener } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  host: { 'class': 'header' }
})
export class HeaderComponent implements OnInit, AfterViewInit, OnDestroy {

  menuStatus: string = 'collapsed';

  constructor() { }

  headerHeight;

  // Variables for controlling side nav shown/hidden on scroll
  scrollInterval = null;
  didScroll = true;
  lastScrollTop: number = 0;
  scrollDelta = 10;

  @HostListener('window:scroll', ['$event'])
  onScroll(event) {
    this.didScroll = true;
  }

  ngOnInit() {
    this.scrollInterval = setInterval(() => {
      if (this.didScroll) {
        this.hasScrolled();
        this.didScroll = false;
      }
    }, 250);

  }

  hasScrolled() {
    const scrollTop = window.pageYOffset;
    // Skip if user scolled less than delta distance
    if (Math.abs(this.lastScrollTop - scrollTop) <= this.scrollDelta) {
      return;
    }
    // User has scrolled down and passed header
    if (scrollTop > this.lastScrollTop && scrollTop > this.headerHeight) {
      const sideNav = (<HTMLDivElement> document.querySelector('.header'));
      sideNav.classList.remove('nav-up');
      sideNav.classList.add('nav-down');
    } else {
      // Scrolled up
      if (scrollTop + window.innerHeight < document.documentElement.offsetHeight) {
        const sideNav = (<HTMLDivElement> document.querySelector('.header'));
        sideNav.classList.remove('nav-down')
        sideNav.classList.add('nav-up');
      }
    }
    this.lastScrollTop = scrollTop;
  }

  ngAfterViewInit() {
    const header = <HTMLDivElement> document.querySelector('.header');
    this.headerHeight = header.offsetHeight;
  }

  ngOnDestroy() {
    clearInterval(this.scrollInterval);
  }

  // On user clicks log out
  onLogout(): void {

  }

  // On toggle menu
  toggleMenu(): void {
    this.menuStatus = this.menuStatus === 'collapsed' ? 'opened' : 'collapsed';
  }

}
