import { ReelManagementComponent } from './reel-management/reel-management.component';
import { ContainerComponent } from './container/container.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { RoleManagementComponent } from './role-management/role-management.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    component: ContainerComponent,
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
        loadChildren: './video/video.module#VideoModule'
      },
      {
        path: 'articles',
        loadChildren: './article/article.module#ArticleModule'
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
