import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, Validators, FormControl } from '@angular/forms';
import { uploadImg } from '../shared/utility';

@Component({
  selector: 'app-role-management',
  templateUrl: './role-management.component.html',
  styleUrls: ['./role-management.component.scss']
})
export class RoleManagementComponent implements OnInit {

  roleForm = this.fb.group({
    roles: this.fb.array([])
  });

  // Determine current mode
  mode: string = 'view';

  deletedRoles = [];

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.roleForm.disable();
    this.mode = 'view';
  }

  // On user clicks on add role, add new role to the form array
  addRole(data = null):void {
    (<FormArray>this.roleForm.get('roles')).push(this.fb.group({
      title: [data ? data['title'] : '', [Validators.required]],
      description: [data ? data['description'] : '', [Validators.required]],
      img1: [data ? data['img1'] : ''],
      img1Link: [data ? data['img1Link']: ''],
      img2: [data ? data['img2'] : ''],
      img2Link: [data ? data['img2Link'] : '']
    }));
  }

  // On user upload image
  onImgSelected(index, target, files): void {
    uploadImg(files, <FormControl>(<FormArray>this.roleForm.get('roles')).at(index).get(`img${target}Link`));
  }

  // On user clicks on the remove button
  onRemoveRole(index) {
    const roleArray = <FormArray> this.roleForm.get('roles');
    const role = roleArray.at(index);
    this.deletedRoles.push(role);
    roleArray.removeAt(index);
  }

  // On user clicks on the edit button
  onEdit(): void {
    // Enable the form
    this.roleForm.enable();
    // Update mode
    this.mode = 'edit';
  }

  // On user clicks save form
  saveForm(): void {
    // Disable the form
    this.roleForm.disable();
    // Update mode
    this.mode = 'view';
  }

  // On user clicks on the cancel button
  onCancel(): void {
    // Disable the form
    this.roleForm.disable();
    // Update mode
    this.mode = 'view';
    // TODO: Reset roleForm back to original data
  }
}
