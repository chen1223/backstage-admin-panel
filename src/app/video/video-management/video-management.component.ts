import { SweetAlertService } from './../../shared/sweet-alert.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, FormGroup } from '@angular/forms';
import { toCamelCase } from '../../shared/utility';
import { MgtData } from '../../shared/mgt-card/mgt-card.component';
import { VideoService } from './../video.service';
import { map } from 'rxjs/operators';
import { LoadingService } from './../../shared/loading-animation/loading.service';

@Component({
  selector: 'app-video-management',
  templateUrl: './video-management.component.html',
  styleUrls: ['./video-management.component.scss']
})
export class VideoManagementComponent implements OnInit {

  // Determine current mode
  mode = 'view';

  categoryData;
  categoryForm = this.fb.group({
    categories: this.fb.array([]),
    // Frontend only control
    newCategory: ['']
  });

  // Video statistics
  totalPublished = 0;
  totalDrafts = 0;
  videoTypeSelection = 'all';
  videoCategorySelection = 'all';

  // Full video list
  fullVideoList: MgtData[] = [];
  // Video list shown after filter
  filteredVideolist: MgtData[] = [];

  constructor(private fb: FormBuilder,
              private sweetAlertService: SweetAlertService,
              private videoService: VideoService,
              private loadingService: LoadingService) { }

  ngOnInit() {
    this.categoryForm.disable();
    this.mode = 'view';
    this.getCategories();
    this.getVideos();
  }

  loadCategoryData(data): void {
    this.categoryData = data;
    // Clear old data
    (this.categoryForm.get('categories') as FormArray).clear();
    this.categoryForm.get('newCategory').reset();
    // Load new data
    this.categoryData.forEach(category => {
      const tag = toCamelCase(category['text']);
      (this.categoryForm.get('categories') as FormArray).push(this.fb.group({
        categoryId: [category['id']],
        tag: [tag],
        text: [category['text']],
        status: [category['status']]}));
    });
  }

  // Get all categories
  getCategories(): void {
    this.videoService.getCategories()
        .subscribe(
          res => {
            const data = res['data'];
            this.loadCategoryData(data);
          },
          err => {
            const errObj = err.error;
            if (errObj.msg) {
              this.sweetAlertService.error(null, errObj.msg);
            }
          }
        );
  }

  // On user clicks on the edit button
  onEdit(): void {
    this.categoryForm.enable();
    this.mode = 'edit';
  }

  // On user clicks on the add button
  onAdd(): void {
    const categoryArray = this.categoryForm.get('categories') as FormArray;
    const newCategory = this.categoryForm.get('newCategory').value;
    if (!newCategory) {
      return;
    }
    const tag = toCamelCase(newCategory);
    for (let i = 0; i < categoryArray.controls.length; i++) {
      const oldCategory = categoryArray.at(i);
      if (oldCategory.get('tag').value === tag) {
        this.sweetAlertService.warn(null, 'The same category already exist');
        return;
      }
    }
    (categoryArray).push(this.fb.group({
      categoryId: [''],
      tag: [tag],
      text: [newCategory],
      status: ['new']
    }));
    this.categoryForm.get('newCategory').reset();
  }

  // On user clicks on the remove button on any category
  onRemoveCategory(index: number): void {
    const categoryArray = this.categoryForm.get('categories') as FormArray;
    const category = categoryArray.at(index) as FormGroup;
    const status = category.get('status').value;
    // Remove it from array directly if its a new category
    if (status === 'new') {
      categoryArray.removeAt(index);
    } else if (status === 'unUsed') {
      category.get('status').setValue('deleted');
    } else if (status === 'inUsed') {
      this.sweetAlertService.warn(null, `${category.get('text').value} is currently in used`);
    }
  }

  // Format category list output
  formatCategoryOutput(): Object {
    const output = {
      create: [],
      delete: []
    };
    const data = this.categoryForm.getRawValue();
    data['categories'].forEach(category => {
      const text = category['text'];
      const status = category['status'];
      const categoryId = category['categoryId'];
      if (status === 'new') {
        output['create'].push(text);
      } else if (status === 'deleted') {
        output['delete'].push(categoryId);
      }
    });
    return output;
  }

  // On user clicks save form
  saveForm(): void {
    const body = this.formatCategoryOutput();
    this.loadingService.showLoading();
    this.videoService.updateCategories(body)
        .subscribe(
          res => {
            this.loadingService.hideLoading();
            const categories = res['data'];
            this.loadCategoryData(categories);
            // Disable the form
            this.categoryForm.disable();
            // Update mode
            this.mode = 'view';
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

  // On user clicks on the cancel button
  onCancel(): void {
    // Disable the form
    this.categoryForm.disable();
    // Update mode
    this.mode = 'view';
  }

  // Get video id
  getVideoTypeId(videoLink): Object {
    const trimmedUrl = videoLink.substring(0, videoLink.indexOf('&') > -1 ? videoLink.indexOf('&') : videoLink.length);
    let id = '';
    let type = '';
    // Get video ID from vimeo url
    if (trimmedUrl.indexOf('vimeo') > -1) {
      id = trimmedUrl.replace('https://vimeo.com/', '');
      type = 'vimeo';
    } else if (trimmedUrl.indexOf('youtube') > -1) {
      id = trimmedUrl.replace('https://www.youtube.com/watch?v=', '');
      type = 'youtube';
    }
    return {
      type: type,
      id: id
    };
  }

  // Get videos
  getVideos(): void {
    this.loadingService.showLoading();
    this.videoService.getVideos()
        .pipe(
          map(res => {
            res['data'].forEach(video => {
              video['link'] = `/videos/view/${video['id']}`;
              video['category'] = video['categoryId'];
            });
            return res;
          })
        )
        .subscribe(
          res => {
            this.loadingService.hideLoading();
            const data = res['data'];
            this.fullVideoList = data;
            this.filterVideo();
            this.setUpVideoStats();
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


  // Set up video statistic number
  setUpVideoStats(): void {
    this.totalPublished = 0;
    this.totalDrafts = 0;
    this.fullVideoList.forEach(video => {
      if (video.status === 'published') {
        this.totalPublished++;
      } else {
        this.totalDrafts++;
      }
    });
  }

  /**
   * Video related functions
   */
  // On user selects video category or video type, filter videos shown
  filterVideo(): void {
    this.filteredVideolist = this.fullVideoList.filter(obj => {
      return (obj.category === this.videoCategorySelection || this.videoCategorySelection === 'all') &&
             (obj.status === this.videoTypeSelection || this.videoTypeSelection === 'all');
    });
  }
}
