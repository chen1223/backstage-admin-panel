import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReelManagementComponent } from './reel-management.component';
import { FormsModule, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { By } from '@angular/platform-browser';

describe('ReelManagementComponent', () => {
  let component: ReelManagementComponent;
  let fixture: ComponentFixture<ReelManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ReelManagementComponent
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
    fixture = TestBed.createComponent(ReelManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should set mode to view mode and disable form on page init', () => {
    // Set initial status before testing
    component.mode = 'edit';
    component.reelForm.enable();
    fixture.detectChanges();
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.mode).toBe('view');
    expect(component.reelForm.enabled).toBeFalsy();
  });

  /**
   * Form related tests
   */
  it('should have a form called reelForm', () => {
    expect(component.reelForm).toBeTruthy();
  });
  it('should define FormControls', () => {
    const reelForm = <FormGroup> component.reelForm;
    // reelUrl
    expect(reelForm.get('reelUrl')).toBeTruthy();
    // reelType
    expect(reelForm.get('reelType')).toBeTruthy();
    // reelLgImgs
    expect(reelForm.get('reelLgImgs')).toBeTruthy();
    // reelSmImgs
    expect(reelForm.get('reelSmImgs')).toBeTruthy();
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
    component.reelForm.disable();
    fixture.detectChanges();
    component.onEdit();
    fixture.detectChanges();
    expect(component.reelForm.enabled).toBeTruthy();
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
    component.reelForm.enable();
    fixture.detectChanges();
    component.saveForm();
    fixture.detectChanges();
    expect(component.reelForm.disabled).toBeTruthy();
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
    component.reelForm.enable();
    fixture.detectChanges();
    component.onCancel();
    fixture.detectChanges();
    expect(component.reelForm.disabled).toBeTruthy();
    expect(component.mode).toBe('view');
  });

});
