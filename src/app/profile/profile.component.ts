import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { uploadImg } from '../shared/utility';
import { SweetAlertService } from 'src/app/shared/sweet-alert.service';
import { ProfileService } from './profile.service';
import { LoadingService } from './../shared/loading-animation/loading.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  profileForm = this.fb.group({
    /* Profile Section */
    profileImg: [''],
    profileLink: [''],
    profileImgId: [null],
    firstname: ['', [Validators.required, Validators.maxLength(60)]],
    lastname: ['', [Validators.required, Validators.maxLength(60)]],
    email: ['', [Validators.required]],
    resumeLink: ['', [Validators.required]],
    resume: [''],

    /* Social Section */
    facebookLink: ['', [Validators.required]],
    facebookEnable: [true],
    vimeoLink: [''],
    vimeoEnable: [false],
    youtubeLink: [''],
    youtubeEnable: [false],
    instagramLink: [''],
    instagramEnable: [false],

    /* About Section */
    intro: ['', [Validators.required]],
    contactMe: ['', [Validators.required]]
  });

  // Determine current mode: view / edit
  mode: string = 'view';

  // Original profile data
  oriProfileData = null;

  // Resume name
  filename: string = '';

  constructor(private fb: FormBuilder,
              private sweetAlertService: SweetAlertService,
              private profileService: ProfileService,
              private loadingService: LoadingService) { }

  ngOnInit() {
    this.profileForm.disable();
    this.mode = 'view';
    this.getProfile();
  }

  // Get profile data
  getProfile(): void {
    this.loadingService.showLoading();
    this.profileService.getProfile()
        .subscribe(
          res => {
            this.loadingService.hideLoading();
            const profileData = res['profile'];
            this.oriProfileData = profileData;
            this.profileForm.patchValue(profileData);
          },
          err => {
            this.loadingService.hideLoading();
            this.sweetAlertService.error(null, err.error.msg);
          }
        );
  }

  // On user upload image
  onImgSelected(files): void {
    const result = uploadImg(files, <FormControl> this.profileForm.get('profileLink'));
    if (result === -2) {
      this.sweetAlertService.warn('Invalid file', 'Only image files are accepted');
    }
  }

  // On user upload resume
  onFileUpload(file: FileList): void {
    this.filename = file.length > 0 ? file[0].name : '';
    if(file && file[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        this.profileForm.get('resume').setValue(reader.result);
      };
      reader.readAsDataURL(file[0]);
    }
  }

  // On user clicks on the edit button
  onEdit(): void {
    this.profileForm.enable();
    this.mode = 'edit';
  }

  formIsValid(): boolean {
    let valid = true;
    ['firstname', 'lastname', 'email', 'intro', 'contactMe', 'facebookLink'].forEach(ctrl => {
      if(!this.profileForm.get(ctrl).valid) {
        valid = false;
      }
    });
    // Validate profile picture and resume
    if (!this.profileForm.get('profileLink').value || !this.profileForm.get('resume').value) {
      valid = false;
    }
    return valid;
  }

  // On user clicks save form
  saveForm(): void {
    if (this.formIsValid()) {
      this.sweetAlertService.confirm('Are you sure?', 'Are you sure you want to save?')
          .then(
            response => {
              const agree = response['value'];
              if (agree) {
                const data = this.profileForm.getRawValue();
                this.profileService.updateProfile(data)
                    .subscribe(
                      res => {
                        if (+res['code'] === 200) {
                          this.sweetAlertService.success(null, res['msg']);
                          // Disable the form
                          this.profileForm.disable();
                          // Update mode
                          this.mode = 'view';
                        }
                      },
                      err => {
                        this.sweetAlertService.error(null, err.error.msg);
                      }
                    );
              }
            }
          );
    } else {
      this.sweetAlertService.warn('Invalid Operation', 'Please fill in all required fields');
    }
  }

  // On user clicks on the cancel button
  onCancel(): void {
    // Disable the form
    this.profileForm.disable();
    // Update mode
    this.mode = 'view';
    // Reset profileForm back to original data
    this.profileForm.patchValue(this.oriProfileData);
  }
}
