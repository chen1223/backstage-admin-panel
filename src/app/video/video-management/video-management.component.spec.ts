import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoManagementComponent } from './video-management.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule, FormGroup, FormArray, FormControl } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Component, Input } from '@angular/core';
import { MgtData } from '../../shared/mgt-card/mgt-card.component';

@Component({
  selector: 'mgt-card',
  template: '',
  host: { 'class': 'mgt-card' }
})
export class MockMgtCardComponent {
  @Input() data: MgtData = null;
}

describe('VideoManagementComponent', () => {
  let component: VideoManagementComponent;
  let fixture: ComponentFixture<VideoManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        VideoManagementComponent,
        MockMgtCardComponent
      ],
      imports: [
        FontAwesomeModule,
        FormsModule,
        ReactiveFormsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoManagementComponent);
    component = fixture.componentInstance;
    const categoryForm = <FormGroup> component.categoryForm;
    const categoryArray = <FormArray> categoryForm.get('categories');
    for (let i = categoryArray.length - 1; i >= 0; i--) {
      categoryArray.removeAt(i);
    }
    fixture.detectChanges();
  });

  /**
   * Form related tests
   */
  it('should have a form called categoryForm', () => {
    expect(component.categoryForm).toBeTruthy();
  });
  it('should have correct FormControls', () => {
    const categoryForm = <FormGroup> component.categoryForm;
    expect(categoryForm.get('categories')).toBeTruthy();
  });

  it('should set mode to view mode and disable form on page init', () => {
    // Set initial status before testing
    component.mode = 'edit';
    component.categoryForm.enable();
    fixture.detectChanges();
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.mode).toBe('view');
    expect(component.categoryForm.enabled).toBeFalsy();
  });

  /**
   * Edit button related test
   */
  it('should call onEdit on user clicks on the pencel icon', () => {
    component.mode = 'view';
    fixture.detectChanges();
    const onEditFnc = spyOn(component, 'onEdit');
    const editBtn = <HTMLButtonElement> (fixture.debugElement.query(By.css('.action-btn.--edit'))).nativeElement;
    editBtn.click();
    fixture.detectChanges();
    expect(onEditFnc).toHaveBeenCalled();
  });
  it('should enable form and update mode on onEdit called', () => {
    component.mode = 'view';
    component.categoryForm.disable();
    fixture.detectChanges();
    component.onEdit();
    fixture.detectChanges();
    expect(component.categoryForm.enabled).toBeTruthy();
    expect(component.mode).toBe('edit');
  });

  /**
   * Save button related test
   */
  it('should call saveForm on user clicks on the save button', () => {
    component.mode = 'edit';
    fixture.detectChanges();
    const saveFormFnc = spyOn(component, 'saveForm');
    const saveBtn = <HTMLButtonElement> (fixture.debugElement.query(By.css('.action-btn.--save'))).nativeElement;
    saveBtn.click();
    fixture.detectChanges();
    expect(saveFormFnc).toHaveBeenCalled();
  });
  it('should disable the form and change mode on saveForm called', () => {
    component.mode = 'edit';
    component.categoryForm.enable();
    fixture.detectChanges();
    component.saveForm();
    fixture.detectChanges();
    expect(component.categoryForm.disabled).toBeTruthy();
    expect(component.mode).toBe('view');
  });

  /**
   * Cancel button related test
   */
  it('should call cancel on cancel clicks', () => {
    component.mode = 'edit';
    fixture.detectChanges();
    const cancelFn = spyOn(component, 'onCancel');
    const cancelBtn = <HTMLButtonElement> (fixture.debugElement.query(By.css('.--cancel'))).nativeElement;
    cancelBtn.click();
    fixture.detectChanges();
    expect(cancelFn).toHaveBeenCalled();
  });
  it('should disable the form and change mode on cancel called', () => {
    component.mode = 'edit';
    component.categoryForm.enable();
    fixture.detectChanges();
    component.onCancel();
    fixture.detectChanges();
    expect(component.categoryForm.disabled).toBeTruthy();
    expect(component.mode).toBe('view');
  });

  /**
   * Category related tests
   */
  it('should call addNew on add new button clicks', () => {
    component.mode = 'edit';
    fixture.detectChanges();
    const addFn = spyOn(component, 'onAdd');
    const addBtn = <HTMLButtonElement> (fixture.debugElement.query(By.css('.--add'))).nativeElement;
    addBtn.click();
    fixture.detectChanges();
    expect(addFn).toHaveBeenCalled();
  });
  it('should add new category to the list when onAdd is called', () => {
    const categoryForm = <FormGroup> component.categoryForm;
    const categoryArray = <FormArray> categoryForm.get('categories');
    component.mode = 'edit';
    fixture.detectChanges();
    categoryForm.get('newCategory').setValue('hello world');
    component.onAdd();
    fixture.detectChanges();
    expect(categoryArray.length).toBe(1);
  });
  it('should NOT add new category to the list when onAdd is called if input is empty', () => {
    const categoryForm = <FormGroup> component.categoryForm;
    const categoryArray = <FormArray> categoryForm.get('categories');
    categoryForm.get('newCategory').setValue('');
    component.mode = 'edit';
    fixture.detectChanges();
    component.onAdd();
    fixture.detectChanges();
    expect(categoryArray.length).toBe(0);
  });
  it('should NOT add new category to the list when onAdd is called if the same category already exist', () => {
    component.mode = 'edit';
    const categoryForm = <FormGroup> component.categoryForm;
    const categoryArray = <FormArray> categoryForm.get('categories');
    // Add dummy data to category arry
    categoryForm.get('newCategory').setValue('hello world');
    component.onAdd();
    fixture.detectChanges();
    expect(categoryArray.controls.length).toBe(1);
    categoryForm.get('newCategory').setValue('hello world');
    component.onAdd();
    fixture.detectChanges();
    expect(categoryArray.controls.length).toBe(1);
  });
  it('should show correct number of categories on screen', () => {
    const categoryForm = <FormGroup> component.categoryForm;
    const categoryArray = <FormArray> categoryForm.get('categories');
    // Add two dummy data to category arry
    categoryForm.get('newCategory').setValue('hello world');
    component.onAdd();
    categoryForm.get('newCategory').setValue('hello world2');
    component.onAdd();
    fixture.detectChanges();
    // Test if categories are correctly displayed on the screen
    expect(fixture.nativeElement.querySelectorAll('.category').length).toBe(2);
  });
  it('should call removeCategory on category remove button clicks', () => {
    component.mode = 'edit';
    const categoryForm = <FormGroup> component.categoryForm;
    // Add dummy data to category arry
    categoryForm.get('newCategory').setValue('hello world');
    component.onAdd();
    fixture.detectChanges();

    const removeBtn = <HTMLButtonElement> fixture.debugElement.query(By.css('.category-btn.--remove')).nativeElement;
    const removeFn = spyOn(component, 'onRemoveCategory');
    removeBtn.click();
    expect(removeFn).toHaveBeenCalledWith(0);
  });
  it('should remove category on removeCategory called', () => {
    component.mode = 'edit';
    const categoryForm = <FormGroup> component.categoryForm;
    const categoryArray = <FormArray> categoryForm.get('categories');
    // Add dummy data to category arry
    categoryForm.get('newCategory').setValue('hello world');
    component.onAdd();
    fixture.detectChanges();

    component.onRemoveCategory(0);
    fixture.detectChanges();
    expect(categoryArray.controls.length).toBe(0);
  });
  it('should NOT remove category on removeCategory called IF status is "inUsed"', () => {
    component.mode = 'edit';
    const categoryForm = <FormGroup> component.categoryForm;
    const categoryArray = <FormArray> categoryForm.get('categories');
    // Add dummy data to category arry
    categoryArray.push(new FormGroup({
      tag: new FormControl('helloWorld'),
      text: new FormControl('hello world'),
      status: new FormControl('inUsed')
    }));
    fixture.detectChanges();

    component.onRemoveCategory(0);
    fixture.detectChanges();
    expect(categoryArray.controls.length).toBe(1);
  });

  /**
   * Video related tests
   */
  it('should invoke the filterVideo on video type changed', () => {
    const onChangeFnc = spyOn(component, 'filterVideo');
    const videoTypeMenu = <HTMLSelectElement> fixture.debugElement.query(By.css('.menu.--type')).nativeElement;
    videoTypeMenu.value = videoTypeMenu.options[1].value;
    videoTypeMenu.dispatchEvent(new Event('change'));
    fixture.detectChanges;
    expect(onChangeFnc).toHaveBeenCalled();
  });
  it('should invoke the filterVideo on video category changed', () => {
    const onChangeFnc = spyOn(component, 'filterVideo');
    const categoryMenu = <HTMLSelectElement> fixture.debugElement.query(By.css('.menu.--category')).nativeElement;
    categoryMenu.value = categoryMenu.options[0].value;
    categoryMenu.dispatchEvent(new Event('change'));
    fixture.detectChanges();
    expect(onChangeFnc).toHaveBeenCalled();
  });
  it('should filter the video list on filterVideo called', () => {
    const dummyData = [
      {
        link: 'videos/1',
        status: 'published',
        datePublished: 'Sep 21, 2019',
        category: 'helloWorld',
        title: 'video1',
        coverImg: ''
      },
      {
        link: 'videos/2',
        status: 'draft',
        datePublished: null,
        category: 'helloWorld2',
        title: 'video2',
        coverImg: ''
      }
    ];
    component.fullVideoList = dummyData;
    component.filteredVideolist = dummyData;
    fixture.detectChanges();

    component.videoCategorySelection = 'helloWorld';
    component.videoTypeSelection = 'published';
    component.filterVideo();
    fixture.detectChanges();

    component.filteredVideolist.forEach(videoShown => {
      expect(videoShown.status).toBe('published');
      expect(videoShown.category).toBe('helloWorld');
    });
  });
  it('should show filterVideoList on screen', () => {
    const dummyData = [
      {
        link: 'videos/1',
        status: 'published',
        datePublished: 'Sep 21, 2019',
        category: 'helloWorld',
        title: 'video1',
        coverImg: ''
      },
      {
        link: 'videos/2',
        status: 'draft',
        datePublished: null,
        category: 'helloWorld2',
        title: 'video2',
        coverImg: ''
      }
    ];
    component.filteredVideolist = dummyData;
    fixture.detectChanges();
    const filteredVideos = fixture.debugElement.queryAll(By.css('.mgt-card'));
    expect(filteredVideos.length).toBe(2);
  });
  it('should set up video statistic number on init', () => {
    const fnc = spyOn(component, 'setUpVideoStats');
    component.ngOnInit();
    expect(fnc).toHaveBeenCalled();
  });
});
