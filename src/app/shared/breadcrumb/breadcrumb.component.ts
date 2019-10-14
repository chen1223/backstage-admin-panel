import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
  host: { 'class': 'breadcrumb-list' }
})
export class BreadcrumbComponent implements OnInit {

  @Input() trace: Breadcrumb[] = [];
  constructor() { }

  ngOnInit() {
  }

}
export interface Breadcrumb {
  link: string, // RouterLink
  text: string, // Text display
}
