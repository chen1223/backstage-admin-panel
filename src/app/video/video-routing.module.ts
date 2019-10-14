import { VideoManagementComponent } from './video-management/video-management.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VideoDetailComponent } from './video-management/video-detail/video-detail.component';

const routes: Routes = [
    {
      path: '',
      component: VideoManagementComponent,
      pathMatch: 'full'
    },
    {
      path: 'view/:id',
      component: VideoDetailComponent
    },
    {
      path: 'update/:id',
      component: VideoDetailComponent
    },
    {
      path: 'new',
      component: VideoDetailComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
exports: [RouterModule]
  })
export class VideoRoutingModule { }
