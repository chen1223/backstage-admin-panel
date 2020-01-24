import { Component, OnInit } from '@angular/core';
import { MgtData } from '../../shared/mgt-card/mgt-card.component';
import { ArticleService } from './../article.service';
import { SweetAlertService } from './../../shared/sweet-alert.service';
import { map } from 'rxjs/operators';
import { LoadingService } from './../../shared/loading-animation/loading.service';

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
  constructor(private articleService: ArticleService,
              private sweetalertService: SweetAlertService,
              private loadingService: LoadingService) { }

  ngOnInit() {
    this.getArticles();
  }

  // Get articles data
  getArticles(): void {
    this.loadingService.showLoading();
    this.articleService.getArticles()
        .pipe(
          map(res => {
            res['data'].forEach(article => {
              article['link'] = `/articles/view/${article['id']}`;
            });
            return res;
          })
        )
        .subscribe(
          res => {
            this.loadingService.hideLoading();
            const data = res['data'];
            this.fullArticleList = data;
            this.filterArticle();
            this.setUpArticleStats();
          },
          err => {
            this.loadingService.hideLoading();
            const errObj = err.error;
            if (errObj.msg) {
              this.sweetalertService.error(null, errObj.msg);
            }
          }
        );
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
