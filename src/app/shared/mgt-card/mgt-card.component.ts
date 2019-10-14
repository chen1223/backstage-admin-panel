import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'mgt-card',
  templateUrl: './mgt-card.component.html',
  styleUrls: ['./mgt-card.component.scss'],
  host: { 'class': 'mgt-card' }
})
export class MgtCardComponent implements OnInit {

  @Input() data: MgtData = null;

  constructor() { }

  ngOnInit() {
  }

}

export interface MgtData {
  link: string,
  status: string, // 'published' | 'draft'
  datePublished: string, // Date string
  category?: string, // Category (optional field for video only)
  title: string,
  coverImg: string // Cover image url
}
