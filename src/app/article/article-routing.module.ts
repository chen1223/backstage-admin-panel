import { ArticleDetailComponent } from './article-management/article-detail/article-detail.component';
import { ArticleManagementComponent } from './article-management/article-management.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: ArticleManagementComponent,
    pathMatch: 'full'
  },
  {
    path: 'new',
    component: ArticleDetailComponent
  },
  {
    path: 'view/:id',
    component: ArticleDetailComponent
  },
  {
    path: 'update/:id',
    component: ArticleDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
exports: [RouterModule]
})
export class ArticleRoutingModule { }
