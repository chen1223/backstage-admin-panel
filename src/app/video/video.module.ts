import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoManagementComponent } from './video-management/video-management.component';
import { VideoRoutingModule } from './video-routing.module';

@NgModule({
  declarations: [VideoManagementComponent],
  imports: [
    CommonModule,
    VideoRoutingModule
  ]
})
export class VideoModule { }
