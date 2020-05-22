import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'mgt-card',
  templateUrl: './mgt-card.component.html',
  styleUrls: ['./mgt-card.component.scss'],
  host: { 'class': 'mgt-card' }
})
export class MgtCardComponent implements OnInit {

  @Input() data: MgtData = null;
  @Input() canNavigate = true;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  onClick(e) {
    if (!this.canNavigate) {
      e.preventDefault();
      return false;
    } else {
      this.router.navigateByUrl(this.data.link);
    }
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
