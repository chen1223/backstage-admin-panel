import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MgtCardComponent } from './mgt-card/mgt-card.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    MgtCardComponent
  ],
  exports: [
    MgtCardComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class SharedModule { }
