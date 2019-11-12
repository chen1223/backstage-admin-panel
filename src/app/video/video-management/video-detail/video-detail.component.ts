import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Breadcrumb } from '../../../shared/breadcrumb/breadcrumb.component';
import { FormBuilder, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-video-detail',
  templateUrl: './video-detail.component.html',
  styleUrls: ['./video-detail.component.scss']
})
export class VideoDetailComponent implements OnInit {

  // Breadcrumb
  breadcrumb: Breadcrumb[] = [];
  // Determine current mode: 'create', 'view', 'update'
  mode: string;

  // Determine current video status
  videoStatus: string;

  videoForm = this.fb.group({
    title: ['', Validators.required],
    categoryId: ['', Validators.required],
    year: ['', [Validators.required, Validators.maxLength(4), Validators.minLength(4)]],
    url: ['', Validators.required],
    videoID: [''],
    description: ['', Validators.required],
    status: ['draft'],
    generes: ['']
  });

  // Category list
  categoryList = [];

  constructor(private activatedRoute: ActivatedRoute,
              private fb: FormBuilder,
              private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.setMode();
    // TODO: Remove the following dummy code
    this.categoryList = [
      {
        id: 1,
        tag: 'animation',
        text: 'Animation'
      },
      {
        id: 2,
        tag: 'drama',
        text: 'Drama'
      },
      {
        id: 3,
        tag: 'comedy',
        text: 'Comedy'
      }
    ];
  }

  // Set current mode according to url
  setMode(): void {
    this.activatedRoute.url.subscribe(url => {
      switch (url[0].path) {
        case 'new':
          this.mode = 'create';
          this.setBreadcrumb({
            link: '',
            text: 'New Video'
          })
          this.setStatus();
          break;
        case 'view':
          this.mode = 'view';
          // TODO: Set Breadcrumb with video title
          this.setStatus();
          break;
        case 'update':
          this.mode = 'update';
          // TODO: Set Breadcrumb with video title
          this.setStatus();
          break;
      }
    })
  }

  // Set breadcrumb
  setBreadcrumb(currentTrace: Breadcrumb): void {
    this.breadcrumb = [
      {
        link: '/videos',
        text: 'Video Management'
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
      this.videoForm.get('status').setValue('draft');
    } else {
      // When we are in view or update mode, get status from Backend instead
      // TODO: Set video status
    }
  }

  // On user enters video url, set video ID
  setVideoID(): void {
    const url = this.videoForm.get('url').value as string;
    console.log('url', url);
    const trimmedUrl = url.substring(0, url.indexOf('&') > -1 ? url.indexOf('&') : url.length);
    console.log('trimmedUrl', trimmedUrl)
    this.videoForm.get('url').setValue(trimmedUrl);
    let id = '';
    // Get video ID from vimeo url
    if (trimmedUrl.indexOf('vimeo') > -1) {
      id = trimmedUrl.replace('https://vimeo.com/', '');
    } else if (trimmedUrl.indexOf('youtube') > -1) {
      id = trimmedUrl.replace('https://www.youtube.com/watch?v=', '');
    } else {
      // TODO: Replace with customize alert message
      alert('Only Youtube and Vimeo urls are allowed');
    }
    console.log('id', id);
    this.videoForm.get('videoID').setValue(id);
  }

  // On user clicks on the edit button
  onEdit(): void {
    this.videoForm.enable();
    this.mode = 'edit';
  }

  // On user clicks save form
  saveForm(): void {
    // Disable the form
    this.videoForm.disable();
    // Update mode
    this.mode = 'view';
  }

  // On user clicks on the publish button
  publishVideo(): void {

  }

  // On user clicks on the unpublish button
  unpublishVideo(): void {

  }

  // On user clicks on the cancel button
  onCancel(): void {
    // Disable the form
    this.videoForm.disable();
    // Update mode
    this.mode = 'view';
    // TODO: Reset videoForm back to original data
  }

  // Transform video link to by pass security check
  transform(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
