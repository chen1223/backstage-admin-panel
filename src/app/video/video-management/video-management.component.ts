import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, FormGroup } from '@angular/forms';
import { toCamelCase } from '../../../shared/utility';

@Component({
  selector: 'app-video-management',
  templateUrl: './video-management.component.html',
  styleUrls: ['./video-management.component.scss']
})
export class VideoManagementComponent implements OnInit {

  // Determine current mode
  mode: string = 'view';

  categoryForm = this.fb.group({
    categories: this.fb.array([]),
    // Frontend only control
    newCategory: ['']
  });

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.categoryForm.disable();
    this.mode = 'view';
  }

  // On user clicks on the edit button
  onEdit(): void {
    this.categoryForm.enable();
    this.mode = 'edit';
  }

  // On user clicks on the add button
  onAdd(): void {
    const categoryArray = <FormArray> this.categoryForm.get('categories');
    const newCategory = this.categoryForm.get('newCategory').value;
    if (!newCategory) {
      return;
    }
    const tag = toCamelCase(newCategory);
    for (let i = 0; i < categoryArray.controls.length; i++) {
      const oldCategory = categoryArray.at(i);
      if (oldCategory.get('tag').value === tag) {
        // TODO: Show warning message
        window.alert('The same category already exist');
        return;
      }
    }
    (categoryArray).push(this.fb.group({
      tag: [tag],
      text: [newCategory],
      status: ['new']
    }));
  }

  // On user clicks on the remove button on any category
  onRemoveCategory(index: number): void {
    const categoryArray = <FormArray> this.categoryForm.get('categories');
    const category = <FormGroup> categoryArray.at(index);
    if (category.get('status').value !== 'inUsed') {
      categoryArray.removeAt(index);
    }
  }

  // On user clicks save form
  saveForm(): void {
    // Disable the form
    this.categoryForm.disable();
    // Update mode
    this.mode = 'view';
  }

  // On user clicks on the cancel button
  onCancel(): void {
    // Disable the form
    this.categoryForm.disable();
    // Update mode
    this.mode = 'view';
    // TODO: Reset profileForm back to original data
  }
}
