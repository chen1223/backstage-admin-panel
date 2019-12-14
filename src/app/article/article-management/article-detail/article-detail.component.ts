import { LayoutDialogComponent } from './layout-dialog/layout-dialog.component';
import { FormBuilder, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Breadcrumb } from 'src/app/shared/breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.scss']
})
export class ArticleDetailComponent implements OnInit {

  // Layout dialog
  @ViewChild('dialog', { static: false }) layoutDialog: LayoutDialogComponent;

  // Breadcrumb
  breadcrumb: Breadcrumb[] = [];

  mode: string;

  articleForm = this.fb.group({
    status: ['draft'],
    title: ['', [Validators.required]],
    paragraphs: this.fb.array([])
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
    this.layoutDialog.show();
  }

  // Insert paragraph into the FormArray: paragraphs
  insertParagraph(data: Object): void {
    const newGroup = this.fb.group({
      type: [data['type']],
      order: [data['order']],
      text: data['text'] ? data['text'] : '',
      images: this.fb.array([])
    });
    for (let i = 0; i < data['images'].length; i++) {
      (newGroup.get('images') as FormArray).push(this.fb.control(data['images'][i]));
    }
    (this.articleForm.get('paragraphs') as FormArray).push(newGroup);
  }

  // On user selects new layout, insert a new paragraph into the FormArray: paragraphs
  insertLayout(layoutType: number): void {
    console.log('layout type', layoutType);
    this.insertParagraph({
      type: layoutType,
      order: (this.articleForm.get('paragraphs') as FormArray).length +1,
      text: '',
      images: []
    });
  }

  // On user remove paragraph
  removeParagraph(index: number): void {
    (this.articleForm.get('paragraphs') as FormArray).removeAt(index);
  }
}
