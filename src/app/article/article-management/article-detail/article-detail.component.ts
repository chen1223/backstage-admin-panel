import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Breadcrumb } from 'src/app/shared/breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.scss']
})
export class ArticleDetailComponent implements OnInit {

  // Breadcrumb
  breadcrumb: Breadcrumb[] = [];

  mode: string;

  articleForm = this.fb.group({
    status: ['draft'],
    title: ['', [Validators.required]]
  });

  constructor(private activatedRoute: ActivatedRoute,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.setMode();
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
          })
          this.setStatus();
          break;
        case 'view':
          this.mode = 'view';
          this.setBreadcrumb({
            link: '',
            text: 'View Article'
          })
          // TODO: Set Breadcrumb with article title
          this.setStatus();
          break;
        case 'update':
          this.mode = 'update';
          this.setBreadcrumb({
            link: '',
            text: 'Update Article'
          })
          // TODO: Set Breadcrumb with article title
          this.setStatus();
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

  // Set status
  setStatus(): void {
    if (this.mode === 'create') {
      this.articleForm.get('status').setValue('draft');
    } else {
      // When we are in view or update mode, get status from Backend instead
      // TODO: Set video status
    }
  }

  // On user clicks on the edit button
  onEdit(): void {
    this.articleForm.enable();
    this.mode = 'edit';
  }

  // On user clicks save form
  saveForm(): void {
    // Disable the form
    this.articleForm.disable();
    // Update mode
    this.mode = 'view';
  }

  // On user clicks on the publish button
  publishArticle(): void {

  }

  // On user clicks on the unpublish button
  unpublishArticle(): void {

  }

  // On user clicks on the cancel button
  onCancel(): void {
    // Disable the form
    this.articleForm.disable();
    // Update mode
    this.mode = 'view';
    // TODO: Reset articleForm back to original data
  }

  // On user clicks on the "New Paragraph" button
  addParagraph(): void {

  }
}
