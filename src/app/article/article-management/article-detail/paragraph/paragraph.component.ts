import { Component, OnInit, Input, Output, EventEmitter, NgZone, AfterViewInit } from '@angular/core';
import { ControlValueAccessor, FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { ArticleService } from '../../../article.service';
import { SweetAlertService } from './../../../../shared/sweet-alert.service';
import { uploadImg } from './../../../../shared/utility';

@Component({
  selector: 'paragraph',
  templateUrl: './paragraph.component.html',
  styleUrls: ['./paragraph.component.scss'],
  host: { 'class': 'paragraph' }
})
export class ParagraphComponent implements OnInit, ControlValueAccessor, AfterViewInit {

  // FormGroup bind to this control
  @Input() group: FormGroup;
  @Input() mode: string = 'create';
  @Output() OnRemove = new EventEmitter<void>();

  onChange = (_: any) => {};
  constructor(private fb: FormBuilder,
              private ngZone: NgZone,
              public articleService: ArticleService,
              private sweetAlertService: SweetAlertService) { }

  ngOnInit() {
    this.initFormGroup();
  }

  ngAfterViewInit() {
    this.resizeContainer();
  }

  // Load input into form
  initFormGroup(): void {
    // Only continue if formGroup is passed
    if (!this.group) {
      return;
    }
    console.log('paragraph initial form group', this.group);
    // Add order control
    this.group.addControl('order', this.fb.control('', []));
    // Add text control
    this.group.addControl('text', this.fb.control('text', []));
    // Add image array control
    this.group.addControl('images', this.fb.array([]));
    switch (this.group.get('type').value) {
      case this.articleService.TEXT_ONLY:
        break;
      case this.articleService.IMAGE_ONLY:
        if ((this.group.get('images') as FormArray).controls.length < 1 ) {
          (this.group.get('images') as FormArray).push(this.fb.group({
            id: [''],
            imageData: this.fb.control(''),
            status: 'new'
          }));
        }
        break;
      case this.articleService.TEXT_WITH_ONE_IMAGE_LEFT:
        if ((this.group.get('images') as FormArray).controls.length < 1 ) {
          (this.group.get('images') as FormArray).push(this.fb.group({
            id: [''],
            imageData: this.fb.control(''),
            status: 'new'
          }));
        }
        break;
      case this.articleService.TEXT_WITH_ONE_IMAGE_RIGHT:
        if ((this.group.get('images') as FormArray).controls.length < 1 ) {
          (this.group.get('images') as FormArray).push(this.fb.group({
            id: [''],
            imageData: this.fb.control(''),
            status: 'new'
          }));
        }
        break;
      case this.articleService.TEXT_WITH_TWO_IMAGES_LEFT:
        if ((this.group.get('images') as FormArray).controls.length < 2 ) {
          (this.group.get('images') as FormArray).push(this.fb.group({
            id: [''],
            imageData: this.fb.control(''),
            status: 'new'
          }));
          (this.group.get('images') as FormArray).push(this.fb.group({
            id: [''],
            imageData: this.fb.control(''),
            status: 'new'
          }));
        }
        break;
      case this.articleService.TEXT_WITH_TWO_IMAGES_RIGHT:
        if ((this.group.get('images') as FormArray).controls.length < 2 ) {
          (this.group.get('images') as FormArray).push(this.fb.group({
            id: [''],
            imageData: this.fb.control(''),
            status: 'new'
          }));
          (this.group.get('images') as FormArray).push(this.fb.group({
            id: [''],
            imageData: this.fb.control(''),
            status: 'new'
          }));
        }
        break;
      default: // Default to text only
      this.group.get('type').setValue(this.articleService.TEXT_ONLY);
        break;
    }
  }

  writeValue(value: Object): void {
    if (value !== undefined) {
      console.log('paragraph input', value);
      // this.group.patchValue(value);
    }
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    throw new Error("Method not implemented.");
  }
  setDisabledState?(isDisabled: boolean): void {
    if (isDisabled) {
      this.group.disable();
    } else {
      this.group.enable();
    }
  }

  onRemove(): void {
    this.OnRemove.next();
  }

  // Get images form array
  get formImages() {
    return this.group ? (this.group.get('images') as FormArray).controls : null;
  }

  // On image upload
  onImageUpload(event, index: number): void {
    const group = (this.group.get('images') as FormArray).at(index);
    const ctrl = group.get('imageData') as FormControl;
    const result = uploadImg(event.target.files, ctrl);
    const imageId = group.get('id').value;
    if (imageId) {
      group.get('status').setValue('updated');
    }
    if (result === -2) {
      this.sweetAlertService.warn('Invalid file', 'Only image files are accepted');
    }
  }

  // Resize image container
  resizeContainer(): void {
    const ratio = 300 / 168;
    const imgCtrls = document.getElementsByClassName('img-ctrl') as HTMLCollection;
    for (let i = 0; i < imgCtrls.length; i++) {
      const container = imgCtrls[i] as HTMLElement;
      const width = container.offsetWidth;
      container.style.height = `${width / ratio}px`;
    }
  }
}
