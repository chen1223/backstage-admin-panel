import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleManagementComponent } from './article-management.component';
import { Component, Input } from '@angular/core';
import { MgtData } from 'src/app/shared/mgt-card/mgt-card.component';
import { By } from '@angular/platform-browser';

@Component({
  selector: 'mgt-card',
  template: '',
  host: { 'class': 'mgt-card' }
})
export class MockMgtCardComponent {
  @Input() data: MgtData = null;
}

describe('ArticleManagementComponent', () => {
  let component: ArticleManagementComponent;
  let fixture: ComponentFixture<ArticleManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MockMgtCardComponent,
        ArticleManagementComponent
      ],
      imports: [
        FormsModule,
        FontAwesomeModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /**
   * Article related tests
   */
  it('should invoke the filterArticle on article type changed', () => {
    const onChangeFnc = spyOn(component, 'filterArticle');
    const articleTypeMenu = <HTMLSelectElement> fixture.debugElement.query(By.css('.menu.--type')).nativeElement;
    articleTypeMenu.value = articleTypeMenu.options[1].value;
    articleTypeMenu.dispatchEvent(new Event('change'));
    fixture.detectChanges;
    expect(onChangeFnc).toHaveBeenCalled();
  });
  it('should invoke the filterArticle on article category changed', () => {
    const onChangeFnc = spyOn(component, 'filterArticle');
    const categoryMenu = <HTMLSelectElement> fixture.debugElement.query(By.css('.menu.--category')).nativeElement;
    categoryMenu.value = categoryMenu.options[0].value;
    categoryMenu.dispatchEvent(new Event('change'));
    fixture.detectChanges();
    expect(onChangeFnc).toHaveBeenCalled();
  });
  it('should filter the article list on filterArticle called', () => {
    const dummyData = [
      {
        link: 'article/1',
        status: 'published',
        datePublished: 'Sep 21, 2019',
        category: 'helloWorld',
        title: 'article1',
        coverImg: ''
      },
      {
        link: 'article/2',
        status: 'draft',
        datePublished: null,
        category: 'helloWorld2',
        title: 'article2',
        coverImg: ''
      }
    ];
    component.fullArticleList = dummyData;
    component.filteredArticlelist = dummyData;
    fixture.detectChanges();

    component.articleTypeSelection = 'published';
    component.filterArticle();
    fixture.detectChanges();

    component.filteredArticlelist.forEach(articleShown => {
      expect(articleShown.status).toBe('published');
    });
  });
  it('should show filterArticleList on screen', () => {
    const dummyData = [
      {
        link: 'articles/1',
        status: 'published',
        datePublished: 'Sep 21, 2019',
        title: 'article1',
        coverImg: ''
      },
      {
        link: 'articles/2',
        status: 'draft',
        datePublished: null,
        title: 'article2',
        coverImg: ''
      }
    ];
    component.filteredArticlelist = dummyData;
    fixture.detectChanges();
    const filteredArticles = fixture.debugElement.queryAll(By.css('.mgt-card'));
    expect(filteredArticles.length).toBe(2);
  });
  it('should set up article statistic number on init', () => {
    const fnc = spyOn(component, 'setUpArticleStats');
    component.ngOnInit();
    expect(fnc).toHaveBeenCalled();
  });
});
