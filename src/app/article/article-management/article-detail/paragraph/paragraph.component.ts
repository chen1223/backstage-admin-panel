import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ControlValueAccessor, FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ArticleService } from '../../../article.service';
import { SweetAlertService } from './../../../../shared/sweet-alert.service';

@Component({
  selector: 'paragraph',
  templateUrl: './paragraph.component.html',
  styleUrls: ['./paragraph.component.scss'],
  host: { 'class': 'paragraph' }
})
export class ParagraphComponent implements OnInit, ControlValueAccessor {

  // FormGroup bind to this control
  @Input('formGroup') formGroup: FormGroup;
  @Output() OnRemove = new EventEmitter<void>();

  onChange = (_: any) => {};

  // Image preview array
  imagePreview = [];
  constructor(private fb: FormBuilder,
              public articleService: ArticleService,
              private sweetAlertService: SweetAlertService) { }

  ngOnInit() {
    this.initFormGroup();
  }

  // Load input into form
  initFormGroup(): void {
    // Only continue if formGroup is passed
    if (!this.formGroup) {
      return;
    }
    console.log('paragraph initial form group', this.formGroup);
    // Add order control
    this.formGroup.addControl('order', this.fb.control('', []));
    // Add text control
    this.formGroup.addControl('text', this.fb.control('text', []));
    // Add image array control
    this.formGroup.addControl('images', this.fb.array([]));
    switch (this.formGroup.get('type').value) {
      case this.articleService.TEXT_ONLY:
        break;
      case this.articleService.IMAGE_ONLY:
        (this.formGroup.get('images') as FormArray).push(this.fb.control(''));
        this.imagePreview.push('');
        break;
      case this.articleService.TEXT_WITH_ONE_IMAGE_LEFT:
        (this.formGroup.get('images') as FormArray).push(this.fb.control(''));
        this.imagePreview.push('');
        break;
      case this.articleService.TEXT_WITH_ONE_IMAGE_RIGHT:
        (this.formGroup.get('images') as FormArray).push(this.fb.control(''));
        this.imagePreview.push('');
        break;
      case this.articleService.TEXT_WITH_TWO_IMAGES_LEFT:
        (this.formGroup.get('images') as FormArray).push(this.fb.control(''));
        (this.formGroup.get('images') as FormArray).push(this.fb.control(''));
        this.imagePreview.push('');
        this.imagePreview.push('');
        break;
      case this.articleService.TEXT_WITH_TWO_IMAGES_RIGHT:
        (this.formGroup.get('images') as FormArray).push(this.fb.control(''));
        (this.formGroup.get('images') as FormArray).push(this.fb.control(''));
        this.imagePreview.push('');
        this.imagePreview.push('');
        break;
      default: // Default to text only
      this.formGroup.get('type').setValue(this.articleService.TEXT_ONLY);
        break;
    }
  }

  writeValue(value: Object): void {
    if (value !== undefined) {
      console.log('paragraph input', value);
      // this.formGroup.patchValue(value);
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
      this.formGroup.disable();
    } else {
      this.formGroup.enable();
    }
  }

  onRemove(): void {
    this.OnRemove.next();
  }

  // Get images form array
  get formImages() {
    return this.formGroup ? (this.formGroup.get('images') as FormArray).controls : null;
  }

  // On image upload
  onImageUpload(event, index: number): void {
    const fileData = event.target.files[0];
    if (fileData.type.match(/image\/*/) == null) {
      this.sweetAlertService.warn('Invalid file', 'Only image files are accepted');
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(fileData);
    reader.onload = () => {
      this.imagePreview[index] = reader.result;
    }
  }
}
