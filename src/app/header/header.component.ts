import { Component, OnInit, AfterViewInit, OnDestroy, HostListener } from '@angular/core';
import { AuthService } from './../login/auth.service';
import { SweetAlertService } from 'src/app/shared/sweet-alert.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  host: { 'class': 'header' }
})
export class HeaderComponent implements OnInit, AfterViewInit, OnDestroy {

  menuStatus: string = 'collapsed';

  constructor(private authService: AuthService,
              private sweetAlertService: SweetAlertService,
              private router: Router) { }

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
    const body = {
      'username': localStorage.getItem('username')
    };
    this.authService.logout(body)
        .subscribe(
          res => {
            if (+res['code'] === 200) {
              localStorage.removeItem('token');
              localStorage.removeItem('username');
              this.router.navigate(['/login']);
              this.sweetAlertService.success(null, 'Logout successfully.');
            }
          },
          err => {
            const error = err.error;
            if (error) {
              this.sweetAlertService.error(null, err.error.msg);
            } else {
              this.sweetAlertService.error(null, err.message);
            }
          }
        );
  }

  // On toggle menu
  toggleMenu(): void {
    this.menuStatus = this.menuStatus === 'collapsed' ? 'opened' : 'collapsed';
  }

}
