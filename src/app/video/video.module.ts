import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoManagementComponent } from './video-management/video-management.component';
import { VideoRoutingModule } from './video-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VideoDetailComponent } from './video-management/video-detail/video-detail.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    VideoManagementComponent,
    VideoDetailComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    VideoRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class VideoModule { }
