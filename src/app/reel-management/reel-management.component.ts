import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, Validators, FormArray, FormControl, FormGroup } from '@angular/forms';
import { uploadImg } from '../../shared/utility';

@Component({
  selector: 'app-reel-management',
  templateUrl: './reel-management.component.html',
  styleUrls: ['./reel-management.component.scss']
})
export class ReelManagementComponent implements OnInit, AfterViewInit {

  // Determine current mode
  mode: string = 'view';

  // Determine active carousel index
  lgActiveCarousel: number = 0;
  smActiveCarousel: number = 0;
  // Carousel position
  lgCarouselPos = 0;
  smCarouselPos = 0;

  reelForm = this.fb.group({
    reelUrl: ['', Validators.required],
    reelType: [''],
    reelLgImgs: this.fb.array([]),
    reelSmImgs: this.fb.array([])
  });

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    // this.mode = 'view';
    // this.reelForm.disable();
  }

  ngAfterViewInit() {
    // if (window.matchMedia("(orientation: portrait)").matches) {
    //   this.carouselDistance = 9;
    // } else {
    //   this.carouselDistance = 3;
    // }
  }

  // On user clicks on the edit button
  onEdit(): void {
    this.reelForm.enable();
    this.mode = 'edit';
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
          img: fileUploaded,
          imgLink: '',
          size: 'desktop',
          deleted: false
        });
        (<FormArray> this.reelForm.get('reelLgImgs')).push(newImgGroupLg);
        uploadImg(files, <FormControl> newImgGroupLg.get('imgLink'));
        break;
      case 'small':
        const newImgGroupSm = this.fb.group({
          id: null,
          img: fileUploaded,
          imgLink: '',
          size: 'mobile',
          deleted: false
        });
        (<FormArray> this.reelForm.get('reelSmImgs')).push(newImgGroupSm);
        uploadImg(files, <FormControl> newImgGroupSm.get('imgLink'));
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

  // On user clicks save form
  saveForm(): void {
    // Disable the form
    this.reelForm.disable();
    // Update mode
    this.mode = 'view';
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
