import { ReelManagementComponent } from './reel-management/reel-management.component';
import { ContainerComponent } from './container/container.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { RoleManagementComponent } from './role-management/role-management.component';
import { AuthGuardService } from './shared/auth-guard.service';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    component: ContainerComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path: 'roles',
        component: RoleManagementComponent
      },
      {
        path: 'reels',
        component: ReelManagementComponent
      },
      {
        path: 'videos',
        loadChildren: () => import('./video/video.module').then(m => m.VideoModule)
      },
      {
        path: 'articles',
        loadChildren: () => import('./article/article.module').then(m => m.ArticleModule)
      },
      {
        path: '',
        component: ProfileComponent,
        pathMatch: 'full'
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
