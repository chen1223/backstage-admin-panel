import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { MgtCardComponent } from './mgt-card/mgt-card.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    MgtCardComponent,
    BreadcrumbComponent
  ],
  exports: [
    MgtCardComponent,
    BreadcrumbComponent,
    FontAwesomeModule
  ],
  imports: [
    CommonModule,
    RouterModule,
    FontAwesomeModule
  ]
})
export class SharedModule { }
