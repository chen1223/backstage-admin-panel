import { Component, OnInit } from '@angular/core';
import { MgtData } from 'src/app/shared/mgt-card/mgt-card.component';

@Component({
  selector: 'app-article-management',
  templateUrl: './article-management.component.html',
  styleUrls: ['./article-management.component.scss']
})
export class ArticleManagementComponent implements OnInit {

  // Article statistics
  totalPublished: number = 0;
  totalDrafts: number = 0;
  articleTypeSelection: string = 'all';

  // Full article list
  fullArticleList: MgtData[] = [];
  // Article list shown after filter
  filteredArticlelist: MgtData[] = [];
  constructor() { }

  ngOnInit() {
    // TODO: Replace this line with actual API call
    this.fullArticleList = [
      {
        link: '/articles/view/1',
        status: 'published',
        datePublished: 'Sep 21, 2019',
        title: 'Toyota Spec Commercial | “Safety First”',
        coverImg: 'https://www.brianchenfilm.com/assets/img/director1.jpg'
      },
      {
        link: '/articles/view/1',
        status: 'published',
        datePublished: 'Sep 21, 2019',
        title: 'Toyota Spec Commercial | “Safety First”',
        coverImg: 'https://www.brianchenfilm.com/assets/img/director1.jpg'
      },
      {
        link: '/articles/view/1',
        status: 'published',
        datePublished: 'Sep 21, 2019',
        title: 'Toyota Spec Commercial | “Safety First”',
        coverImg: 'https://www.brianchenfilm.com/assets/img/director1.jpg'
      },
      {
        link: '/articles/view/1',
        status: 'published',
        datePublished: 'Sep 21, 2019',
        title: 'Toyota Spec Commercial | “Safety First”',
        coverImg: 'https://www.brianchenfilm.com/assets/img/director1.jpg'
      },
      {
        link: '/articles/view/1',
        status: 'published',
        datePublished: 'Sep 21, 2019',
        title: 'Toyota Spec Commercial | “Safety First”',
        coverImg: 'https://www.brianchenfilm.com/assets/img/director1.jpg'
      },
      {
        link: '/articles/view/1',
        status: 'published',
        datePublished: 'Sep 21, 2019',
        title: 'Toyota Spec Commercial | “Safety First”',
        coverImg: 'https://www.brianchenfilm.com/assets/img/director1.jpg'
      },
      {
        link: '/articles/view/1',
        status: 'published',
        datePublished: 'Sep 21, 2019',
        title: 'Toyota Spec Commercial | “Safety First”',
        coverImg: 'https://www.brianchenfilm.com/assets/img/director1.jpg'
      },
      {
        link: '/articles/view/1',
        status: 'published',
        datePublished: 'Sep 21, 2019',
        title: 'Toyota Spec Commercial | “Safety First”',
        coverImg: 'https://www.brianchenfilm.com/assets/img/director1.jpg'
      },
      {
        link: '/articles/view/1',
        status: 'published',
        datePublished: 'Sep 21, 2019',
        title: 'Toyota Spec Commercial | “Safety First”',
        coverImg: 'https://www.brianchenfilm.com/assets/img/director1.jpg'
      },
      {
        link: '/articles/view/1',
        status: 'published',
        datePublished: 'Sep 21, 2019',
        title: 'Toyota Spec Commercial | “Safety First”',
        coverImg: 'https://www.brianchenfilm.com/assets/img/director1.jpg'
      },
      {
        link: '/articles/view/2',
        status: 'draft',
        datePublished: null,
        title: '7 Days Since Death',
        coverImg: 'https://www.brianchenfilm.com/assets/img/director2.jpg'
      }
    ];
    this.filterArticle();
    this.setUpArticleStats();
  }

  // Set up article statistic number
  setUpArticleStats(): void {
    this.totalPublished = 0;
    this.totalDrafts = 0;
    this.fullArticleList.forEach(article => {
      if (article.status === 'published') {
        this.totalPublished++;
      } else {
        this.totalDrafts++;
      }
    });
  }

  /**
   * Article related functions
   */
  // On user selects article type, filter article shown
  filterArticle(): void {
    this.filteredArticlelist = this.fullArticleList.filter(obj => {
      return (obj.status === this.articleTypeSelection || this.articleTypeSelection === 'all');
    });
  }
}
