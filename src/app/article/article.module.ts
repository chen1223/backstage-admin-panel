import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArticleRoutingModule } from './article-routing.module';
import { ArticleManagementComponent } from './article-management/article-management.component';
import { ArticleDetailComponent } from './article-management/article-detail/article-detail.component';

@NgModule({
  declarations: [
    ArticleManagementComponent,
    ArticleDetailComponent
  ],
  imports: [
    CommonModule,
    ArticleRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ArticleModule { }
