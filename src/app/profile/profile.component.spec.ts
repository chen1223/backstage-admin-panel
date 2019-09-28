import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileComponent } from './profile.component';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ProfileComponent
      ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        FontAwesomeModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should have a form called profileForm', () => {
    expect(component.profileForm).toBeTruthy();
  });
  it('should have FormControls', () => {
    const profileForm = <FormGroup> component.profileForm;
    // profileLink
    expect(profileForm.get('profileLink')).toBeTruthy();
    // profileImgId
    expect(profileForm.get('profileImgId')).toBeTruthy();
    // firstname
    expect(profileForm.get('firstname')).toBeTruthy();
    // lastname
    expect(profileForm.get('lastname')).toBeTruthy();
    // email
    expect(profileForm.get('email')).toBeTruthy();
    // resumeLink
    expect(profileForm.get('resumeLink')).toBeTruthy();
    // facebookLink
    expect(profileForm.get('facebookLink')).toBeTruthy();
    // facebookEnable
    expect(profileForm.get('facebookEnable')).toBeTruthy();
    // vimeoLink
    expect(profileForm.get('vimeoLink')).toBeTruthy();
    // vimeoEnable
    expect(profileForm.get('vimeoEnable')).toBeTruthy();
    // youtubeLink
    expect(profileForm.get('youtubeLink')).toBeTruthy();
    // youtubeEnable
    expect(profileForm.get('youtubeEnable')).toBeTruthy();
    // instagramLink
    expect(profileForm.get('instagramLink')).toBeTruthy();
    // instagramEnable
    expect(profileForm.get('instagramEnable')).toBeTruthy();
    // intro
    expect(profileForm.get('intro')).toBeTruthy();
    // contactMe
    expect(profileForm.get('contactMe')).toBeTruthy();
  });
  it('should validate FormControl: firstname', () => {
    // Prepare a test string of length 70
    let testString = '';
    for (let i = 0; i < 7; i++) {
      testString += '0123456789';
    }
    const profileForm = <FormGroup> component.profileForm;
    // Maxlength validation
    profileForm.get('firstname').setValue(testString);
    fixture.detectChanges();
    expect(profileForm.get('firstname').valid).toBeFalsy();
    // Required validation
    profileForm.get('firstname').setValue('');
    fixture.detectChanges();
    expect(profileForm.get('firstname').valid).toBeFalsy();
  });
  it('should validate FormControl: lastname', () => {
    // Prepare a test string of length 70
    let testString = '';
    for (let i = 0; i < 7; i++) {
      testString += '0123456789';
    }
    const profileForm = <FormGroup> component.profileForm;
    // Maxlength validation
    profileForm.get('lastname').setValue(testString);
    fixture.detectChanges();
    expect(profileForm.get('lastname').valid).toBeFalsy();
    // Required validation
    profileForm.get('lastname').setValue('');
    fixture.detectChanges();
    expect(profileForm.get('lastname').valid).toBeFalsy();
  });
  it('should validate FormControl: email', () => {
    const profileForm = <FormGroup> component.profileForm;
    // Required validation
    profileForm.get('email').setValue('');
    fixture.detectChanges();
    expect(profileForm.get('email').valid).toBeFalsy();
  });
  it('should validate FormControl: resumeLink', () => {
    const profileForm = <FormGroup> component.profileForm;
    // Required validation
    profileForm.get('resumeLink').setValue('');
    fixture.detectChanges();
    expect(profileForm.get('resumeLink').valid).toBeFalsy();
  });
  it('should validate FormControl: facebookLink', () => {
    const profileForm = <FormGroup> component.profileForm;
    // Required validation
    profileForm.get('facebookLink').setValue('');
    fixture.detectChanges();
    expect(profileForm.get('facebookLink').valid).toBeFalsy();
  });
  it('should validate FormControl: intro', () => {
    const profileForm = <FormGroup> component.profileForm;
    // Required validation
    profileForm.get('intro').setValue('');
    fixture.detectChanges();
    expect(profileForm.get('intro').valid).toBeFalsy();
  });
  it('should validate FormControl: contactMe', () => {
    const profileForm = <FormGroup> component.profileForm;
    // Required validation
    profileForm.get('contactMe').setValue('');
    fixture.detectChanges();
    expect(profileForm.get('contactMe').valid).toBeFalsy();
  });
});
