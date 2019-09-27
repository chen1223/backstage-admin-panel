import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  profileForm = this.fb.group({
    /* Profile Section */
    profileLink: [''],
    profileImgId: [null],
    firstname: ['', [Validators.required, Validators.maxLength(60)]],
    lastname: ['', [Validators.required, Validators.maxLength(60)]],
    email: ['', [Validators.required]],
    resumeLink: ['']
  });

  // Determine current mode: view / edit
  mode: string = 'view';

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
  }

}
