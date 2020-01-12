import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, Validators, FormArray, FormControl, FormGroup } from '@angular/forms';
import { uploadImg } from '../shared/utility';
import { SweetAlertService } from './../shared/sweet-alert.service';
import { ReelService } from './reel.service';

@Component({
  selector: 'app-reel-management',
  templateUrl: './reel-management.component.html',
  styleUrls: ['./reel-management.component.scss']
})
export class ReelManagementComponent implements OnInit {

  // Determine current mode
  mode: string = 'view';

  // Determine active carousel index
  lgActiveCarousel: number = 0;
  smActiveCarousel: number = 0;
  // Carousel position
  lgCarouselPos = 0;
  smCarouselPos = 0;

  reelData = null;
  reelForm = this.fb.group({
    reelUrl: ['', Validators.required],
    reelType: [''],
    reelLgImgs: this.fb.array([]),
    reelSmImgs: this.fb.array([])
  });

  constructor(private fb: FormBuilder,
              private sweetAlertService: SweetAlertService,
              private reelService: ReelService) { }

  ngOnInit() {
    this.mode = 'view';
    this.reelForm.disable();
    this.getReelData();
  }

  getReelData(): void {
    this.reelService.getReel()
        .subscribe(
          res => {
            const data = this.mapReelData(res['reel']);
            this.loadReelData(data);
          },
          err => {
            const error = err.error;
            if (error.msg) {
              this.sweetAlertService.error(null, error.msg);
            }
          }
        );
  }

  // On user clicks on the edit button
  onEdit(): void {
    this.reelForm.enable();
    this.mode = 'edit';
  }

  // Check if video type is either vimeo or youtube
  checkVideoType(): void {
    const url = this.reelForm.get('reelUrl').value;
    if (url) {
      let type = '';
      if (url.indexOf('youtube') > -1) {
        type = 'youtube';
        this.reelForm.get('reelType').setValue(type);
      } else if (url.indexOf('vimeo') > -1) {
        type = 'vimeo';
        this.reelForm.get('reelType').setValue(type);
      } else {
        this.reelForm.get('reelUrl').setValue('');
        this.sweetAlertService.warn('Invalid url', 'Only vimeo or youtube link is allowed');
      }
    }
  }

  /**
   * On user add new images
   */
  onAddNewImg(files: FileList, type: string): void {
    const fileUploaded = files && files.item(0);
    // Push new imaage to corresponding image array
    switch (type) {
      case 'large':
        const newImgGroupLg = this.fb.group({
          id: null,
          imgName: fileUploaded.name,
          imgData: '',
          size: 'desktop',
          deleted: false
        });
        (<FormArray> this.reelForm.get('reelLgImgs')).push(newImgGroupLg);
        uploadImg(files, <FormControl> newImgGroupLg.get('imgData'));
        break;
      case 'small':
        const newImgGroupSm = this.fb.group({
          id: null,
          imgName: fileUploaded.name,
          imgData: '',
          size: 'mobile',
          deleted: false
        });
        (<FormArray> this.reelForm.get('reelSmImgs')).push(newImgGroupSm);
        uploadImg(files, <FormControl> newImgGroupSm.get('imgData'));
        break;
    }
  }

  /**
   *
   * @param type: 'large' or 'small'
   * @param index:  index of image in array
   * @param action: 'remove' or 'undo'
   */
  onImageAction(type: string, index: number, action: string): void {
    switch (type) {
      case 'large':
        const imgItemLg = <FormGroup> (<FormArray> this.reelForm.get('reelLgImgs')).at(index);
        imgItemLg.get('deleted').setValue(action === 'remove');
        break;
      case 'small':
        const imgItemSm = <FormGroup> (<FormArray> this.reelForm.get('reelSmImgs')).at(index);
        imgItemSm.get('deleted').setValue(action === 'remove');
        break;
    }
  }

  /**
   * On carousel button clicks
   * @param type: 'large' or 'small'
   * @param action: 'next' or 'prev'
   */
  onCarouselClicks(type: string, action: string): void {
    if (type === 'large') {
      const distance = (<HTMLLIElement> document.querySelector('.img-section.--lg .carousel-item')).offsetWidth;
      const length = (<FormArray> this.reelForm.get('reelLgImgs')).length;
      if ((this.lgActiveCarousel === 0 && action === 'prev') || (this.lgActiveCarousel === length - 1 && action === 'next')) {
        return;
      }
      this.lgActiveCarousel +=  (action === 'next' ? 1 : -1);
      this.lgCarouselPos +=  (action === 'next' ? distance * -1 : distance);
      (<HTMLDivElement> document.querySelector('.img-section.--lg .carousel-inner-wrapper')).style.transform
        = `translate3d(${this.lgCarouselPos}px, 0, 0)`;
    } else {
      const distance = (<HTMLLIElement> document.querySelector('.img-section.--sm .carousel-item')).offsetWidth;
      const length = (<FormArray> this.reelForm.get('reelSmImgs')).length;
      if ((this.smActiveCarousel === 0 && action === 'prev') || (this.smActiveCarousel === length - 1 && action === 'next')) {
        return;
      }
      this.smActiveCarousel =  this.smActiveCarousel + (action === 'next' ? 1 : -1);
      this.smCarouselPos +=  (action === 'next' ? distance * -1 : distance);
      (<HTMLDivElement> document.querySelector('.img-section.--sm .carousel-inner-wrapper')).style.transform
        = `translate3d(${this.smCarouselPos}px, 0, 0)`;
    }
  }

  mapReelData(reelData): Object {
    const reelLgImgs = [];
    const reelSmImgs = [];
    reelData['imgs'].forEach(img => {
      if (img['size'] === 'desktop') {
        reelLgImgs.push({
          id: img['id'],
          imgName: '',
          imgData: img['url'],
          size: 'desktop',
          deleted: false
        });
      } else {
        reelSmImgs.push({
          id: img['id'],
          imgName: '',
          imgData: img['url'],
          size: 'mobile',
          deleted: false
        });
      }
    });
    reelData['reelLgImgs'] = reelLgImgs;
    reelData['reelSmImgs'] = reelSmImgs;
    delete reelData['imgs'];
    return reelData;
  }

  // Load data
  loadReelData(reelData): void {
    this.reelData = reelData;
    // Clear old array
    (this.reelForm.get('reelLgImgs') as FormArray).clear();
    (this.reelForm.get('reelSmImgs') as FormArray).clear();
    this.reelData['reelLgImgs'].forEach(lgImg => {
      const newImgGroupLg = this.fb.group({
        id: '',
        imgName: '',
        imgData: '',
        size: 'desktop',
        deleted: false
      });
      newImgGroupLg.patchValue(lgImg);
      (<FormArray> this.reelForm.get('reelLgImgs')).push(newImgGroupLg);
    });
    this.reelData['reelSmImgs'].forEach(smImg => {
      const newImgGroupSm = this.fb.group({
        id: '',
        imgName: '',
        imgData: '',
        size: 'mobile',
        deleted: false
      });
      newImgGroupSm.patchValue(smImg);
      (<FormArray> this.reelForm.get('reelSmImgs')).push(newImgGroupSm);
    });
    this.reelForm.patchValue(this.reelData);

    // Disable the form
    this.reelForm.disable();
    // Update mode
    this.mode = 'view';
  }

  formatOutput(): Object {
    const body = this.reelForm.getRawValue();
    const output = {
      reelUrl: body['reelUrl'],
      reelType: body['reelType'],
      create: [],
      delete: []
    };
    const createArray = [];
    const deleteArray = [];
    body['reelLgImgs'].forEach(lgImg => {
      /**
       * Only push to create array if:
       *  1. deleted is false
       *  2. does not have id (new image)
       */
      if (lgImg['deleted']) {
        deleteArray.push(lgImg['id']);
      } else if (lgImg['id'] === null) {
        delete lgImg['deleted'];
        delete lgImg['id'];
        createArray.push(lgImg);
      }
    });
    body['reelSmImgs'].forEach(smImg => {
      /**
       * Only push to create array if:
       *  1. deleted is false
       *  2. does not have id (new image)
       */
      if (smImg['deleted']) {
        deleteArray.push(smImg['id']);
      } else if (smImg['id'] === null) {
        delete smImg['deleted'];
        delete smImg['id'];
        createArray.push(smImg);
      }
    });
    output['create'] = createArray;
    output['delete'] = deleteArray;
    return output;
  }

  // On user clicks save form
  saveForm(): void {
    const body = this.formatOutput();
    this.reelService.saveReel(body)
        .subscribe(
          res => {
            const data = this.mapReelData(res['reel']);
            this.loadReelData(data);
          },
          err => {
            const error = err.error;
            if (error.msg) {
              this.sweetAlertService.error(null, error.msg);
            }
          }
        );
  }

  // On user clicks on the cancel button
  onCancel(): void {
    // Disable the form
    this.reelForm.disable();
    // Update mode
    this.mode = 'view';
    // TODO: Reset profileForm back to original data
  }
}
