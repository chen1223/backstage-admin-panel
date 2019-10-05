import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoManagementComponent } from './video-management/video-management.component';
import { VideoRoutingModule } from './video-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [VideoManagementComponent],
  imports: [
    CommonModule,
    VideoRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule
  ]
})
export class VideoModule { }
