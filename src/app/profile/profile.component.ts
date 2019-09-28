import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { uploadImg } from '../../shared/utility';

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

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.profileForm.disable();
    this.mode = 'view';
  }

  // On user upload image
  onImgSelected(files): void {
    uploadImg(files, <FormControl> this.profileForm.get('profileLink'));
  }

  // On user clicks on the edit button
  onEdit(): void {
    this.profileForm.enable();
    this.mode = 'edit';
  }

  // On user clicks save form
  saveForm(): void {
    // Disable the form
    this.profileForm.disable();
    // Update mode
    this.mode = 'view';
  }

  // On user clicks on the cancel button
  onCancel(): void {
    // Disable the form
    this.profileForm.disable();
    // Update mode
    this.mode = 'view';
    // TODO: Reset profileForm back to original data
  }
}
