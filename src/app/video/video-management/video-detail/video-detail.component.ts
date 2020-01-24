import { SweetAlertService } from './../../../shared/sweet-alert.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Breadcrumb } from '../../../shared/breadcrumb/breadcrumb.component';
import { FormBuilder, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { VideoService } from './../../video.service';
import { Location } from '@angular/common';
import { LoadingService } from './../../../shared/loading-animation/loading.service';

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

  videoId: string = '';

  // Original data
  videoData;

  // Determine current video status
  videoStatus: string;

  youtubeLink;
  vimeoLink;

  videoForm = this.fb.group({
    title: ['', Validators.required],
    categoryId: ['', Validators.required],
    year: ['', [Validators.required, Validators.maxLength(4), Validators.minLength(4)]],
    url: ['', Validators.required],
    videoID: [''],
    coverImg: [''],
    description: ['', Validators.required],
    status: ['draft'],
    genres: ['']
  });

  // Category list
  categoryList = [];

  constructor(private activatedRoute: ActivatedRoute,
              private fb: FormBuilder,
              private sanitizer: DomSanitizer,
              private videoService: VideoService,
              private sweetAlertService: SweetAlertService,
              private location: Location,
              private loadingService: LoadingService) { }

  ngOnInit() {
    this.setMode();
    this.getCategories();
  }

  // Get category data
  getCategories(): void {
    this.loadingService.showLoading();
    this.videoService.getCategories()
        .subscribe(
          res => {
            this.loadingService.hideLoading();
            const data = res['data'];
            this.categoryList = data;
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
          break;
        case 'view':
          this.mode = 'view';
          this.videoId = url[1].path;
          this.getVideoData();
          this.setBreadcrumb({
            link: '',
            text: 'View Video'
          })
          // Disable the form
          this.videoForm.disable();
          break;
        case 'update':
          this.mode = 'update';
          this.videoId = url[1].path;
          this.getVideoData();
          this.setBreadcrumb({
            link: '',
            text: 'Update Video'
          })
          break;
      }
    });
  }

  // Get video data
  getVideoData(): void {
    this.videoService.getVideo(this.videoId)
        .subscribe(
          res => {
            const data = res['data'];
            this.videoData = data;
            this.loadVideoData(this.videoData);
          },
          err => {
            const errObj = err.error;
            if (errObj.msg) {
              this.sweetAlertService.error(null, errObj.msg);
            }
          }
        );
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

  // On user enters video url, set video ID
  setVideoID(): void {
    const url = this.videoForm.get('url').value as string;
    if (!url) {
      return;
    }
    const trimmedUrl = url.substring(0, url.indexOf('&') > -1 ? url.indexOf('&') : url.length);
    this.videoForm.get('url').setValue(trimmedUrl);
    let id = '';
    this.youtubeLink = null;
    this.vimeoLink = null;
    // Get video ID from vimeo url
    if (trimmedUrl.indexOf('vimeo') > -1) {
      id = trimmedUrl.replace('https://vimeo.com/', '');
      this.vimeoLink = this.transform(`https://player.vimeo.com/video/${id}`);
      this.getVimeoPhoto(id);
    } else if (trimmedUrl.indexOf('youtube') > -1) {
      id = trimmedUrl.replace('https://www.youtube.com/watch?v=', '');
      this.youtubeLink = this.transform(`https://www.youtube.com/embed/${id}`);
      this.videoForm.get('coverImg').setValue(`https://img.youtube.com/vi/${id}/maxresdefault.jpg`);
    } else {
      this.sweetAlertService.warn(null, 'Only Youtube and Vimeo urls are allowed');
    }
    this.videoForm.get('videoID').setValue(id);
  }

  // Get vimeo cover photo
  getVimeoPhoto(videoId): void {
    this.videoService.getVimeoPhoto(videoId)
        .subscribe(
          res => {
            this.videoForm.get('coverImg').setValue(res[0]['thumbnail_large']);
          }
        );
  }

  // On user clicks on the edit button
  onEdit(): void {
    this.videoForm.enable();
    this.mode = 'edit';
  }

  // Load API data into form
  loadVideoData(data: Object): void {
    if (data) {
      const mappedGeneres = data['genres'].map(genre => genre['genre']);
      data['genres'] = mappedGeneres.join();
      this.videoForm.patchValue(data);
      this.setVideoID();
    }
  }

  // Format output
  formatOutput(status = 'draft'): Object {
    const output = this.videoForm.getRawValue();
    const genres = output['genres'].split(',');
    genres.forEach(genere => {
      genere = genere.trim();
    });
    output['year'] = +output['year'];
    // Whenever user made changes, always set the status to draft
    output['status'] = status;
    output['genres'] = genres;
    delete output['videoID'];
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
                  this.videoService.createVideo(body) :
                  this.videoService.updateVideo(this.videoId, body);
              stream.subscribe(
                res => {
                  this.loadingService.hideLoading();
                  const data = res['data'];
                  this.videoData = data;
                  this.loadVideoData(this.videoData);
                  // Disable the form
                  this.videoForm.disable();
                  // Update mode
                  this.mode = 'view';
                  this.videoId = data['id'];
                  this.location.go(`/videos/view/${data['id']}`);
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

  // Update video status
  updateVideoStatus(body, publish: boolean = false): void {
    this.videoService.updateVideoStatus(this.videoId, body)
        .subscribe(
          res => {
            this.loadingService.hideLoading();
            const newStatus = res['status'];
            this.videoForm.get('status').setValue(newStatus);
            if (publish) {
              this.sweetAlertService.success(null, 'Video published successfully!');
            } else {
              this.sweetAlertService.success(null, 'Video unpublished successfully!');
            }
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

  // On user clicks on the publish button
  publishVideo(): void {
    this.sweetAlertService.confirm('Are you sure?', 'Are you sure you want to publish this video?')
        .then(
          response => {
            const agree = response['value'];
            if (agree) {
              this.loadingService.showLoading();
              const body = this.formatOutput('published');
              this.updateVideoStatus(body, true);
            }
          }
        );
  }

  // On user clicks on the unpublish button
  unpublishVideo(): void {
    this.sweetAlertService.confirm('Are you sure?', 'Are you sure you want to unpublish this video?')
        .then(
          response => {
            const agree = response['value'];
            if (agree) {
              this.loadingService.showLoading();
              const body = this.formatOutput('draft');
              this.updateVideoStatus(body, false);
            }
          }
        );
  }

  // On user clicks on the cancel button
  onCancel(): void {
    // Disable the form
    this.videoForm.disable();
    // Update mode
    this.mode = 'view';
    this.loadVideoData(this.videoData);
  }

  // Transform video link to by pass security check
  transform(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
