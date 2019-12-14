import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArticleRoutingModule } from './article-routing.module';
import { ArticleManagementComponent } from './article-management/article-management.component';
import { ArticleDetailComponent } from './article-management/article-detail/article-detail.component';
import { LayoutDialogComponent } from './article-management/article-detail/layout-dialog/layout-dialog.component';
import { ParagraphComponent } from './article-management/article-detail/paragraph/paragraph.component';

@NgModule({
  declarations: [
    ArticleManagementComponent,
    ArticleDetailComponent,
    LayoutDialogComponent,
    ParagraphComponent
  ],
  imports: [
    CommonModule,
    ArticleRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    SweetAlert2Module
  ]
})
export class ArticleModule { }
