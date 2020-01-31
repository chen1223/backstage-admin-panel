import { LayoutDialogComponent } from './layout-dialog/layout-dialog.component';
import { FormBuilder, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Breadcrumb } from 'src/app/shared/breadcrumb/breadcrumb.component';
import { SweetAlertService } from './../../../shared/sweet-alert.service';
import { ArticleService } from './../../article.service';
import { map } from 'rxjs/operators';
import { Location } from '@angular/common';
import { LoadingService } from './../../../shared/loading-animation/loading.service';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.scss']
})
export class ArticleDetailComponent implements OnInit, AfterViewInit {

  // Layout dialog
  @ViewChild('dialog', { static: false }) layoutDialog: LayoutDialogComponent;

  // Breadcrumb
  breadcrumb: Breadcrumb[] = [];

  mode: string;

  articleData;
  articleId;

  // Cover photo preview image
  coverPreview = null;
  articleForm = this.fb.group({
    status: ['draft'],
    coverPhotoName: [],
    coverImg: [],
    title: ['', [Validators.required]],
    paragraphs: this.fb.array([])
  });


  constructor(private activatedRoute: ActivatedRoute,
              private sweetAlertService: SweetAlertService,
              private articleService: ArticleService,
              private fb: FormBuilder,
              private location: Location,
              private loadingService: LoadingService) { }

  ngOnInit() {
    this.setMode();
  }

  ngAfterViewInit() {
    this.setCoverSize();
  }

  paragraphCtrls() {
    return this.articleForm.get('paragraphs') as FormArray;
  }

  // Set mode
  setMode(): void {
    this.activatedRoute.url.subscribe(url => {
      switch (url[0].path) {
        case 'new':
          this.mode = 'create';
          // Set focus to title control if we're in create mode
          (document.getElementById('title') as HTMLInputElement).focus();
          this.setBreadcrumb({
            link: '',
            text: 'New Article'
          });
          break;
        case 'view':
          this.mode = 'view';
          this.articleId = url[1].path;
          this.getArticleData();
          this.setBreadcrumb({
            link: '',
            text: 'View Article'
          });
          break;
        case 'update':
          this.mode = 'update';
          this.articleId = url[1].path;
          this.getArticleData();
          this.setBreadcrumb({
            link: '',
            text: 'Update Article'
          });
          break;
      }
    })
  }

  // Set breadcrumb
  setBreadcrumb(currentTrace: Breadcrumb): void {
    this.breadcrumb = [
      {
        link: '/articles',
        text: 'Article Management'
      },
      {
        link: currentTrace.link,
        text: currentTrace.text
      }
    ];
  }

  // Load article data
  loadArticleData(data): void {
    this.articleForm.patchValue(data);
    this.coverPreview = this.articleForm.get('coverImg').value;
    // Clear paragraph array
    (this.articleForm.get('paragraphs') as FormArray).clear();
    data['paragraphs'].forEach(paragraph => {
      this.insertParagraph(paragraph);
    });
  }

  // Map paragraph
  mapParagraphData(res): Object {
    res['data']['paragraphs'].forEach(paragraph => {
      paragraph['type'] = paragraph['layout'];
      paragraph['status'] = 'view';
      delete paragraph['layout'];
    });
    return res;

  }

  // Get article data
  getArticleData(): void {
    this.loadingService.showLoading();
    this.articleService.getArticle(this.articleId)
        .pipe(
          map(res => {
            return this.mapParagraphData(res);
          })
        )
        .subscribe(
          res => {
            this.loadingService.hideLoading();
            const data = res['data'];
            data['paragraphs'].sort((a, b) => {
              return a.order - b.order;
            });
            this.articleData = data;
            this.loadArticleData(this.articleData);
          },
          err => {
            this.loadingService.hideLoading();
            const errObj = err.error;
            if (errObj.msg) {
              this.sweetAlertService.error(null, errObj.msg);
            }
          }
        );
  }

  // On user clicks on the edit button
  onEdit(): void {
    this.articleForm.enable();
    this.mode = 'edit';
  }

  // Format output
  formatOutput(): Object {
    const data = this.articleForm.getRawValue();
    const output = {
      title: data['title'],
      coverImg: data['coverImg'],
      status: 'draft'
    };
    if (this.mode === 'create') {
      output['paragraphs'] = data['paragraphs'];
    } else {
      output['paragraphs'] = {
        create: [],
        update: [],
        delete: []
      };
      data['paragraphs'].forEach(paragraph => {
        if (paragraph['status'] === 'new') {
          output['paragraphs']['create'].push(paragraph);
        } else if (paragraph['status'] === 'deleted') {
          output['paragraphs']['delete'].push(paragraph['id']);
        } else if (paragraph['status'] === 'view') {
          output['paragraphs']['update'].push(paragraph);
        }
      });
    }
    return output;
  }

  // On user clicks save form
  saveForm(): void {
    this.sweetAlertService.confirm('Are you sure?', 'Are you sure you want to save?')
        .then(
          response => {
            const agree = response['value'];
            if (agree) {
              this.loadingService.showLoading();
              const body = this.formatOutput();
              const stream = this.mode === 'create' ?
                              this.articleService.createArticle(body) :
                              this.articleService.updateArticle(this.articleId, body);
              stream
                .pipe(
                  map(res => {
                    return this.mapParagraphData(res);
                  })
                )
                .subscribe(
                    res => {
                      this.loadingService.hideLoading();
                      const msg = this.mode === 'create' ? 'Article created successfully' : 'Article updated successfully';
                      this.sweetAlertService.success(null, msg);
                      const data = res['data'];
                      this.articleData = data;
                      this.loadArticleData(this.articleData);
                      // Disable the form
                      this.articleForm.disable();
                      this.mode = 'view';
                      this.location.go(`/articles/view/${data['id']}`);
                    },
                    err => {
                      this.loadingService.hideLoading();
                      const errObj = err.error;
                      if (errObj.msg) {
                        this.sweetAlertService.error(null, errObj.msg);
                      }
                    }
                  );
            }
          }
        );
  }

  // Update article status
  updateStatus(body, publish: boolean = false): void {
    this.articleService.updateArticleStatus(this.articleId, body)
        .subscribe(
          res => {
            const msg = publish ? 'Article published successfully' : 'Article unpublished successfully';
            this.sweetAlertService.success(null, msg);
            this.articleForm.get('status').setValue(res['status']);
          },
          err => {
            const errObj = err.error;
            if (errObj.msg) {
              this.sweetAlertService.error(null, errObj.msg);
            }
          }
        );
  }

  // On user clicks on the publish button
  publishArticle(): void {
    this.sweetAlertService.confirm('Are you sure?', 'Are you sure you want to publish this article?')
        .then(response => {
          const agree = response['value'];
          if (agree) {
            const body = {
              status: 'published'
            };
            this.updateStatus(body, true);
          }
        });
  }

  // On user clicks on the unpublish button
  unpublishArticle(): void {
    this.sweetAlertService.confirm('Are you sure?', 'Are you sure you want to unpublish this article?')
        .then(response => {
          const agree = response['value'];
          if (agree) {
            const body = {
              status: 'draft'
            };
            this.updateStatus(body, true);
          }
        });
  }

  // On user clicks on the cancel button
  onCancel(): void {
    // Disable the form
    this.articleForm.disable();
    // Update mode
    this.mode = 'view';
    this.loadArticleData(this.articleData);
  }

  // Set cover photo image container size
  setCoverSize(): void {
    const ratio = 300 / 168;
    const container = document.getElementsByClassName('--cover-container')[0] as HTMLDivElement;
    const width = container.offsetWidth;
    container.style.height = `${width / ratio}px`;
  }

  // On cover photo upload
  onCoverUpload(event): void {
    const fileData = event.target.files[0];
    if (fileData.type.match(/image\/*/) == null) {
      this.sweetAlertService.warn('Invalid file', 'Only image files are accepted');
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(fileData);
    reader.onload = () => {
      this.coverPreview = reader.result;
      this.articleForm.get('coverImg').setValue(reader.result);
    }
  }

  // On user clicks on the "New Paragraph" button
  addParagraph(): void {
    this.layoutDialog.show();
  }

  // Insert paragraph into the FormArray: paragraphs
  insertParagraph(data: Object): void {
    const newGroup = this.fb.group({
      id: data['id'] ? data['id'] : '',
      type: data['type'],
      order: data['order'],
      text: data['text'] ? data['text'] : '',
      images: this.fb.array([]),
      status: this.mode === 'create' ? 'new' : (data['status'] ? data['status'] : 'new')
    });
    for (let i = 0; i < data['images'].length; i++) {
      (newGroup.get('images') as FormArray).push(this.fb.group({
        id: data['images'][i]['id'],
        imageData: data['images'][i]['url'],
        status: this.mode === 'create' ? 'new' : 'view'
      }));
    }
    (this.articleForm.get('paragraphs') as FormArray).push(newGroup);
  }

  // On user selects new layout, insert a new paragraph into the FormArray: paragraphs
  insertLayout(layoutType: number): void {
    this.insertParagraph({
      id: [''],
      type: layoutType,
      order: (this.articleForm.get('paragraphs') as FormArray).length +1,
      text: '',
      images: [],
      status: 'new'
    });
  }

  // On user remove paragraph
  removeParagraph(index: number): void {
    if (this.mode === 'create') {
      (this.articleForm.get('paragraphs') as FormArray).removeAt(index);
    } else {
      (this.articleForm.get('paragraphs') as FormArray).at(index).get('status').setValue('deleted');
    }
  }
}
