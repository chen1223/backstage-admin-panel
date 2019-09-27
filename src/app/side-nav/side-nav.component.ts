import { Component, OnInit, HostListener, AfterViewInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
  host: { 'class': 'side-nav' }
})
export class SideNavComponent implements OnInit, AfterViewInit, OnDestroy {

  headerHeight;

  // Variables for controlling side nav shown/hidden on scroll
  scrollInterval = null;
  didScroll = true;
  lastScrollTop: number = 0;
  scrollDelta = 5;

  @HostListener('window:scroll', ['$event'])
  onScroll(event) {
    this.didScroll = true;
  }

  constructor() { }

  ngOnInit() {
    this.scrollInterval = setInterval(() => {
      if (this.didScroll) {
        this.hasScrolled();
        this.didScroll = false;
      }
    }, 200);
  }

  hasScrolled() {
    const scrollTop = window.pageYOffset;
    // Skip if user scolled less than delta distance
    if (Math.abs(this.lastScrollTop - scrollTop) <= this.scrollDelta) {
      return;
    }
    // User has scrolled down and passed header
    if (scrollTop > this.lastScrollTop && scrollTop > this.headerHeight) {
      const sideNav = (<HTMLDivElement> document.querySelector('.side-nav'));
      sideNav.classList.remove('nav-up');
      sideNav.classList.add('nav-down');
    } else {
      // Scrolled up
      if (scrollTop + window.innerHeight < document.documentElement.offsetHeight) {
        const sideNav = (<HTMLDivElement> document.querySelector('.side-nav'));
        sideNav.classList.remove('nav-down')
        sideNav.classList.add('nav-up');
      }
    }
    this.lastScrollTop = scrollTop;
  }

  ngAfterViewInit() {
    const header = <HTMLDivElement> document.querySelector('.header');
    if (header) {
      this.headerHeight = header.offsetHeight;
    }
  }

  ngOnDestroy() {
    clearInterval(this.scrollInterval);
  }
}
