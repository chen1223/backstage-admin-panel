import { VideoModule } from './video/video.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { HeaderComponent } from './header/header.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUser,
         faUserTie,
         faFilm,
         faVideo,
         faPenFancy,
         faSignOutAlt,
         faBars,
         faTimes,
         faPen,
         faUserAlt,
         faUpload,
         faPlusCircle,
         faUndo,
         faArrowRight,
         faArrowLeft,
         faHashtag,
         faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { ContainerComponent } from './container/container.component';
import { RoleManagementComponent } from './role-management/role-management.component';
import { ReelManagementComponent } from './reel-management/reel-management.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProfileComponent,
    SideNavComponent,
    HeaderComponent,
    ContainerComponent,
    RoleManagementComponent,
    ReelManagementComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    SweetAlert2Module.forRoot(),
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    [faUser, faUserTie, faFilm,
     faVideo, faPenFancy, faSignOutAlt,
     faBars, faTimes, faPen,
     faUserAlt, faUpload, faPlusCircle,
     faUndo, faArrowLeft, faArrowRight,
     faHashtag, faChevronRight].forEach(icon => {
      library.add(icon);
    });
  }
}
