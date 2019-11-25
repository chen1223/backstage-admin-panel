import { SweetAlertService } from './../../../shared/sweet-alert.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoDetailComponent } from './video-detail.component';
import { Input, Component } from '@angular/core';
import { Breadcrumb } from '../../../shared/breadcrumb/breadcrumb.component';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { By } from '@angular/platform-browser';

@Component({
  selector: 'app-breadcrumb',
  template: ''
})
export class MockBreadcrumbComponent {
  @Input() trace: Breadcrumb[] = [];
}

class MockSweetAlertService {
  warn(): void {}
  success(): void {}
  info(): void {}
  confirm(): Promise<Object> {
    return new Promise(() => {});
  }
  error(): void {}
}

describe('VideoDetailComponent', () => {
  let component: VideoDetailComponent;
  let fixture: ComponentFixture<VideoDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        VideoDetailComponent,
        MockBreadcrumbComponent
      ],
      imports: [
        RouterTestingModule,
        FormsModule,
        ReactiveFormsModule,
        FontAwesomeModule
      ],
      providers: [
        { provide: SweetAlertService, useClass: MockSweetAlertService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should set mode on init', () => {
    const fnc = spyOn(component, 'setMode');
    component.ngOnInit();
    fixture.detectChanges();
    expect(fnc).toHaveBeenCalled();
  });

  /**
   * Form related test
   */
  it('should have FormControls', () => {
    const videoForm = component.videoForm as FormGroup;
    // title
    expect(videoForm.get('title')).toBeTruthy();
    // category id
    expect(videoForm.get('categoryId')).toBeTruthy();
    // year
    expect(videoForm.get('year')).toBeTruthy();
    // url
    expect(videoForm.get('url')).toBeTruthy();
    // videoID
    expect(videoForm.get('videoID')).toBeTruthy();
    // description
    expect(videoForm.get('description')).toBeTruthy();
    // status
    expect(videoForm.get('status')).toBeTruthy();
    // generes
    expect(videoForm.get('generes')).toBeTruthy();
  });
  it('should validate FormControl: title', () => {
    const videoForm = component.videoForm as FormGroup;
    // Required validation
    videoForm.get('title').setValue('');
    fixture.detectChanges();
    expect(videoForm.get('title').valid).toBeFalsy();
  });
  it('should validate FormControl: categoryId', () => {
    const videoForm = component.videoForm as FormGroup;
    // Required validation
    videoForm.get('categoryId').setValue('');
    fixture.detectChanges();
    expect(videoForm.get('categoryId').valid).toBeFalsy();
  });
  it('should validate FormControl: year', () => {
    const videoForm = component.videoForm as FormGroup;
    // Required validation
    videoForm.get('year').setValue('');
    fixture.detectChanges();
    expect(videoForm.get('year').valid).toBeFalsy();
    // Maxlength validation
    videoForm.get('year').setValue('123456');
    fixture.detectChanges();
    expect(videoForm.get('year').valid).toBeFalsy();
    // Minlength validation
    videoForm.get('year').setValue('1');
    fixture.detectChanges();
    expect(videoForm.get('year').valid).toBeFalsy();
  });
  it('should validate FormControl: url', () => {
    const videoForm = component.videoForm as FormGroup;
    // Required validation
    videoForm.get('url').setValue('');
    fixture.detectChanges();
    expect(videoForm.get('url').valid).toBeFalsy();
  });
  it('should validate FormControl: description', () => {
    const videoForm = component.videoForm as FormGroup;
    // Required validation
    videoForm.get('description').setValue('');
    fixture.detectChanges();
    expect(videoForm.get('description').valid).toBeFalsy();
  });

  /**
   * Video status related test
   */
  it('should set default status to "draft" if we are in create mode', () => {
    component.mode = 'create';
    fixture.detectChanges();
    component.setStatus();
    fixture.detectChanges();
    const videoForm = component.videoForm as FormGroup;
    expect(videoForm.get('status').value).toBe('draft');
  });

  /**
   * Edit button related test
   */
  it('should call onEdit on user clicks on the pencel icon', () => {
    component.mode = 'view';
    fixture.detectChanges();
    const onEditFnc = spyOn(component, 'onEdit');
    const editBtn = (fixture.debugElement.query(By.css('.action-btn.--edit'))).nativeElement as HTMLButtonElement;
    editBtn.click();
    fixture.detectChanges();
    expect(onEditFnc).toHaveBeenCalled();
  });
  it('should enable form and update mode on onEdit called', () => {
    component.mode = 'view';
    component.videoForm.disable();
    fixture.detectChanges();
    component.onEdit();
    fixture.detectChanges();
    expect(component.videoForm.enabled).toBeTruthy();
    expect(component.mode).toBe('edit');
  });

  /**
   * Save button related test
   */
  it('should call saveForm on user clicks on the save button', () => {
    component.mode = 'edit';
    fixture.detectChanges();
    const saveFormFnc = spyOn(component, 'saveForm');
    const saveBtn = (fixture.debugElement.query(By.css('.action-btn.--save'))).nativeElement as HTMLButtonElement;
    saveBtn.click();
    fixture.detectChanges();
    expect(saveFormFnc).toHaveBeenCalled();
  });
  it('should disable the form and change mode on saveForm called', () => {
    component.mode = 'edit';
    component.videoForm.enable();
    fixture.detectChanges();
    component.saveForm();
    fixture.detectChanges();
    expect(component.videoForm.disabled).toBeTruthy();
    expect(component.mode).toBe('view');
  });

  /**
   * Cancel button related test
   */
  it('should call cancel on cancel clicks', () => {
    component.mode = 'edit';
    fixture.detectChanges();
    const cancelFn = spyOn(component, 'onCancel');
    const cancelBtn = (fixture.debugElement.query(By.css('.--cancel'))).nativeElement as HTMLButtonElement;
    cancelBtn.click();
    fixture.detectChanges();
    expect(cancelFn).toHaveBeenCalled();
  });
  it('should disable the form and change mode on cancel called', () => {
    component.mode = 'edit';
    component.videoForm.enable();
    fixture.detectChanges();
    component.onCancel();
    fixture.detectChanges();
    expect(component.videoForm.disabled).toBeTruthy();
    expect(component.mode).toBe('view');
  });

  /**
   * Publish button related test
   */
  it('should invoke the publishVideo function on user clicks on the publish button', () => {
    component.mode = 'view';
    const videoForm = component.videoForm as FormGroup;
    videoForm.get('status').setValue('draft');
    fixture.detectChanges();
    const fnc = spyOn(component, 'publishVideo').and.callFake(() => {});
    const publishBtn = fixture.debugElement.query(By.css('.--publish')).nativeElement as HTMLButtonElement;
    publishBtn.click();
    fixture.detectChanges();
    expect(fnc).toHaveBeenCalled();
  });

  /**
   * Unpublish button related test
   */
  it('should invoke the unpublishVideo function on user clicks on the unpublish button', () => {
    component.mode = 'view';
    const videoForm = component.videoForm as FormGroup;
    videoForm.get('status').setValue('published');
    fixture.detectChanges();
    const fnc = spyOn(component, 'unpublishVideo').and.callFake(() => {});
    const unpublishBtn = fixture.debugElement.query(By.css('.--unpublish')).nativeElement as HTMLButtonElement;
    unpublishBtn.click();
    fixture.detectChanges();
    expect(fnc).toHaveBeenCalled();
  });

  /**
   * Video status related test
   */
  it('should display video status as "New"', () => {
    component.mode = 'create';
    const videoForm = component.videoForm as FormGroup;
    videoForm.get('status').setValue('draft');
    fixture.detectChanges();
    const videoStatus = fixture.debugElement.query(By.css('.page-title')).nativeElement as HTMLElement;
    expect(videoStatus.innerText).toBe('New');
  });
  it('should display video status as "Draft"', () => {
    component.mode = 'edit';
    const videoForm = component.videoForm as FormGroup;
    videoForm.get('status').setValue('draft');
    fixture.detectChanges();
    const videoStatus = fixture.debugElement.query(By.css('.page-title')).nativeElement as HTMLElement;
    expect(videoStatus.innerText).toBe('Draft');
  });
  it('should display video status as "Published"', () => {
    const videoForm = component.videoForm as FormGroup;
    videoForm.get('status').setValue('published');
    fixture.detectChanges();
    const videoStatus = fixture.debugElement.query(By.css('.page-title')).nativeElement as HTMLElement;
    expect(videoStatus.innerText).toBe('Published');
  });

  /**
   * FormControl: 'url' related test
   */
  it('should invoke the "setVideoID" function on url changed', () => {
    const fnc = spyOn(component, 'setVideoID');
    const urlInput = fixture.debugElement.query(By.css('#url'));
    urlInput.triggerEventHandler('change', 'test');
    fixture.detectChanges();
    expect(fnc).toHaveBeenCalled();
  });

  /**
   * setVideoID related tests
   */
  it('should successfully set video ID when user enters a vimeo url', () => {
    const videoForm = component.videoForm as FormGroup;
    const dummyUrl = 'https://vimeo.com/abc';
    videoForm.get('url').setValue(dummyUrl);
    fixture.detectChanges();
    component.setVideoID();
    fixture.detectChanges();
    expect(videoForm.get('videoID').value).toEqual('abc');
  });
  it('should successfully set video ID when user enters an youtube url', () => {
    const videoForm = component.videoForm as FormGroup;
    const dummyUrl = 'https://www.youtube.com/watch?v=abc';
    videoForm.get('url').setValue(dummyUrl);
    fixture.detectChanges();
    component.setVideoID();
    fixture.detectChanges();
    expect(videoForm.get('videoID').value).toEqual('abc');
  });
});
