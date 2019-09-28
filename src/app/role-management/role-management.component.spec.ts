import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleManagementComponent } from './role-management.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule, FormArray, FormGroup, FormControl, Validators } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('RoleManagementComponent', () => {
  let component: RoleManagementComponent;
  let fixture: ComponentFixture<RoleManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        RoleManagementComponent
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
    fixture = TestBed.createComponent(RoleManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should have a form called roleForm', () => {
    expect(component.roleForm).toBeTruthy();
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
    component.roleForm.disable();
    fixture.detectChanges();
    component.onEdit();
    fixture.detectChanges();
    expect(component.roleForm.enabled).toBeTruthy();
    expect(component.mode).toBe('edit');
  });
  it('should disable form and set mode to "view" on page init', () => {
    component.mode = 'edit';
    component.roleForm.enable();
    fixture.detectChanges();
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.mode).toBe('view');
    expect(component.roleForm.disabled).toBeTruthy();
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
    component.roleForm.enable();
    fixture.detectChanges();
    component.saveForm();
    fixture.detectChanges();
    expect(component.roleForm.disabled).toBeTruthy();
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
    component.roleForm.enable();
    fixture.detectChanges();
    component.onCancel();
    fixture.detectChanges();
    expect(component.roleForm.disabled).toBeTruthy();
    expect(component.mode).toBe('view');
  });

  /**
   * Add role related test
   */
  it('should invoke the addRole function on add role button clicks', () => {
    component.mode = 'edit';
    fixture.detectChanges();
    const addRoleFnc = spyOn(component, 'addRole');
    const addRoleBtn = <HTMLButtonElement> (fixture.debugElement.query(By.css('.new-btn'))).nativeElement;
    addRoleBtn.click();
    expect(addRoleFnc).toHaveBeenCalled();
  });
  it('should push new form group into form group on addRole called', () => {
    // Clear array before testing
    const roles = <FormArray> component.roleForm.get('roles');
    roles.setValue([]);
    fixture.detectChanges();
    // Call the addRole function
    component.addRole();
    fixture.detectChanges();
    expect(roles.length).toBe(1);
  });

  it('should add FormControls to form array group', () => {
    // Clear array before testing
    const roles = <FormArray> component.roleForm.get('roles');
    roles.setValue([]);
    fixture.detectChanges();
    component.addRole();
    fixture.detectChanges();
    // title
    expect(roles.at(0).get('title')).toBeTruthy();
    // description
    expect(roles.at(0).get('description')).toBeTruthy();
    // img1
    expect(roles.at(0).get('img1')).toBeTruthy();
    // img1Link
    expect(roles.at(0).get('img1Link')).toBeTruthy();
    // img2
    expect(roles.at(0).get('img2')).toBeTruthy();
    // img2Link
    expect(roles.at(0).get('img2Link')).toBeTruthy();
  });
  it('should render roles according to form array', () => {
    // Set an entry in the form array
    const roles = <FormArray> component.roleForm.get('roles');
    roles.setValue([]);
    roles.push(
      new FormGroup({
        'title': new FormControl('test', [Validators.required]),
        'description': new FormControl('role description', [Validators.required]),
        'img1': new FormControl(''),
        'img1Link': new FormControl(''),
        'img2': new FormControl(''),
        'img2Link': new FormControl('')
      })
    );
    fixture.detectChanges();
    const roleRow = fixture.debugElement.queryAll(By.css('.role-wrapper'));
    expect(roleRow.length).toBe(1);
  });

  /**
   * Remove button related test
   */
  it('should call invoke the onRemoveRole function on user clicks the remove button', () => {
    // Clear array before testing
    const roles = <FormArray> component.roleForm.get('roles');
    roles.setValue([]);
    component.addRole();
    fixture.detectChanges();
    const removeBtn = <HTMLButtonElement> (fixture.debugElement.query(By.css('.remove-btn'))).nativeElement;
    const onRemoveRoleFnc = spyOn(component, 'onRemoveRole');
    removeBtn.click();
    expect(onRemoveRoleFnc).toHaveBeenCalled();
  });
  it('should remove role properly', () => {
    // Clear the deletedList before testing
    component.deletedRoles = [];
    const roles = <FormArray> component.roleForm.get('roles');
    roles.setValue([]);
    component.addRole();
    fixture.detectChanges();
    const removeBtn = <HTMLButtonElement> (fixture.debugElement.query(By.css('.remove-btn'))).nativeElement;
    removeBtn.click();
    fixture.detectChanges();
    expect(component.deletedRoles.length).toBe(1);
    expect(roles.length).toBe(0);
  });
});
