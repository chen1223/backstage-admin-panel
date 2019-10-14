import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoManagementComponent } from './video-management/video-management.component';
import { VideoRoutingModule } from './video-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { VideoDetailComponent } from './video-management/video-detail/video-detail.component';
import { MgtCardComponent } from '../shared/mgt-card/mgt-card.component';
import { BreadcrumbComponent } from '../shared/breadcrumb/breadcrumb.component';

@NgModule({
  declarations: [
    MgtCardComponent,
    VideoManagementComponent,
    VideoDetailComponent,
    BreadcrumbComponent
  ],
  imports: [
    CommonModule,
    VideoRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
  ]
})
export class VideoModule { }
