import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, Validators, FormControl, FormGroup } from '@angular/forms';
import { uploadImg } from '../shared/utility';
import { RoleService } from './role.service';
import { SweetAlertService } from './../shared/sweet-alert.service';
import { LoadingService } from './../shared/loading-animation/loading.service';

@Component({
  selector: 'app-role-management',
  templateUrl: './role-management.component.html',
  styleUrls: ['./role-management.component.scss']
})
export class RoleManagementComponent implements OnInit {

  roleForm = this.fb.group({
    roles: this.fb.array([])
  });

  roleData;

  // Determine current mode
  mode: string = 'view';

  deletedRoles = [];

  constructor(private fb: FormBuilder,
              private roleService: RoleService,
              private sweetAlertService: SweetAlertService,
              private loadingService: LoadingService) { }

  ngOnInit() {
    this.roleForm.disable();
    this.mode = 'view';
    this.getRoleData();
  }

  // Get data
  getRoleData(): void {
    this.loadingService.showLoading();
    this.roleService.getRoles()
        .subscribe(
          res => {
            this.loadingService.hideLoading();
            const data = this.mapRoleData(res['roles']);
            this.loadRoleData(data);
          },
          err => {
            this.loadingService.hideLoading();
            const error = err.error;
            if (error.msg) {
              this.sweetAlertService.error(null, error.msg);
            }
          }
        );
  }

  mapRoleData(roles): Object {
    roles.forEach(role => {
      role['status'] = 'untouched';
      const images = role['images'];
      images.forEach(img => {
        img['imgId'] = img['id'];
        img['imgData'] = img['url'];
        delete img['id'];
        delete img['url'];
      });
    });
    return roles;
  }

  // Load API data into form
  loadRoleData(roleData): void {
    this.roleData = roleData;
    // Clear old role formarray
    (this.roleForm.get('roles') as FormArray).clear();
    this.roleData.forEach(role => {
      this.addRole(role);
    });
    // Disable the form
    this.roleForm.disable();
    // Update mode
    this.mode = 'view';
  }

  // On user clicks on add role, add new role to the form array
  addRole(data = null):void {
    const imgArray = this.fb.array([]);
    if (data && data['images']) {
      data['images'].forEach(img => {
        imgArray.push(this.fb.group({
          'imgId': [img['imgId']],
          'imgData': [img['imgData']],
          'imgName': [],
          'status': data ? 'untouched': 'new',
          'deleteImgId': []
        }));
      });
    } else {
      imgArray.push(this.fb.group({
        'imgId': [],
        'imgData': [],
        'imgName': [],
        'status': data ? 'untouched': 'new',
        'deleteImgId': []
      }));
      imgArray.push(this.fb.group({
        'imgId': [],
        'imgData': [],
        'imgName': [],
        'status': data ? 'untouched' : 'new',
        'deleteImgId': []
      }));
    }
    (<FormArray>this.roleForm.get('roles')).push(this.fb.group({
      roleId: [data ? data['id'] : ''],
      title: [data ? data['title'] : '', [Validators.required]],
      status: data ? 'untouched' : 'new', // Field for the Frontend to identify if this role is 'new', 'updated', or 'delete'
      introduction: [data ? data['introduction'] : '', [Validators.required]],
      images: imgArray
    }));
  }

  // On user updates role title or introduction
  onRoleTextUpdate(index): void {
    const role = (<FormArray>this.roleForm.get('roles')).at(index);
    // Set role status to 'updated' if this role has roleId from the Backend
    if (role.get('roleId').value) {
      role.get('status').setValue('updated');
    }
  }

  // On user upload image
  onImgSelected(roleIndex, imgIndex, files): void {
    const role = (<FormArray>this.roleForm.get('roles')).at(roleIndex);
    const imgCtrl = (<FormArray>role.get('images')).at(imgIndex);
    /**
     * 1. Check if this role has an ID (old role being updated)
     * 2. Check if the role image has imgId (old role image being replaced)
     *  a. Set image status as updated (new image to be save)
     *  b. Push old image ID to deleteImages array
     */
    if (role.get('roleId').value) {
      role.get('status').setValue('updated');
      const imgId = imgCtrl.get('imgId').value;
      if (imgId) {
        imgCtrl.get('status').setValue('updated');
        imgCtrl.get('deleteImgId').setValue(imgId);
        imgCtrl.get('imgId').setValue('');
      }
    }
    uploadImg(files, <FormControl>imgCtrl.get(`imgData`));
  }

  // On user clicks on the remove button
  onRemoveRole(index) {
    const roleArray = <FormArray> this.roleForm.get('roles');
    const role = roleArray.at(index) as FormGroup;
    this.deletedRoles.push(role.getRawValue());
    roleArray.removeAt(index);
  }

  // On user clicks on the edit button
  onEdit(): void {
    // Enable the form
    this.roleForm.enable();
    // Update mode
    this.mode = 'edit';
  }

  // Prepare final output
  formatOutput(): Object {
    const body = this.roleForm.getRawValue();
    const output = {
      create: [],
      update: [],
      delete: []
    };
    body['roles'].forEach(role => {
      switch (role['status']) {
        case 'new':
          delete role['status'];
          role['images'].forEach(img => {
            delete img['status'];
          });
          output['create'].push(role);
          break;
        case 'updated':
          const newImages = [];
          const deleteImages = [];
          /**
           * Role can only be considered as update mode if:
           *  1. The status as been set to updated
           *  2. The role has a roleId
           */
          if (role['roleId']) {
            // Check if the role images has been updated as well
            role['images'].forEach(img => {
              if (img['status'] === 'updated') {
                // Push new image data to newImages array
                newImages.push({
                  imgData: img['imgData'],
                  imgName: img['imgName']
                });
                // Push deleted image IDs to deleteImages array
                deleteImages.push(img['deleteImgId']);
              }
            });
            output['update'].push({
              roleId: role['roleId'],
              title: role['title'],
              introduction: role['introduction'],
              newImages: [...newImages],
              deleteImages: [...deleteImages]
            });
          }
          break;
      }
    });
    // Prepare deleted roles
    this.deletedRoles.forEach(deletedRole => {
      // Only push to the delete array if this role has been saved to Backend before
      if (deletedRole['roleId']) {
        output['delete'].push(deletedRole['roleId']);
      }
    });
    return output;
  }

  // On user clicks save form
  saveForm(): void {
    const body = this.formatOutput();
    this.sweetAlertService.confirm('Are you sure?', 'Are you sure you want to save?')
        .then(
          response => {
            const agree = response['value'];
            if (agree) {
              this.loadingService.showLoading();
              this.roleService.updateRoles(body)
                  .subscribe(
                    res => {
                      this.loadingService.hideLoading();
                      const data = this.mapRoleData(res['roles']);
                      this.loadRoleData(data);
                    },
                    err => {
                      this.loadingService.hideLoading();
                      const error = err.error;
                      if (error.msg) {
                        this.sweetAlertService.error(null, error.msg);
                      }
                    }
                  );
            }
          }
        );
  }

  // On user clicks on the cancel button
  onCancel(): void {
    // Disable the form
    this.roleForm.disable();
    // Update mode
    this.mode = 'view';
    this.loadRoleData(this.roleData);
  }
}
