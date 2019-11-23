import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArticleRoutingModule } from './article-routing.module';
import { ArticleManagementComponent } from './article-management/article-management.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ArticleManagementComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    ArticleRoutingModule
  ]
})
export class ArticleModule { }
