import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArticleManagementComponent } from './article-management/article-management.component';

const routes: Routes = [
  {
    path: '',
    component: ArticleManagementComponent,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
exports: [RouterModule]
})
export class ArticleRoutingModule { }
