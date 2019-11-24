import { FormsModule, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterTestingModule } from '@angular/router/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleDetailComponent } from './article-detail.component';
import { Component, Input } from '@angular/core';
import { Breadcrumb } from 'src/app/shared/breadcrumb/breadcrumb.component';
import { By } from '@angular/platform-browser';

@Component({
  selector: 'app-breadcrumb',
  template: ''
})
export class MockBreadcrumbComponent {
  @Input() trace: Breadcrumb[] = [];
}


describe('ArticleDetailComponent', () => {
  let component: ArticleDetailComponent;
  let fixture: ComponentFixture<ArticleDetailComponent>;
  let articleForm: FormGroup;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MockBreadcrumbComponent,
        ArticleDetailComponent
      ],
      imports: [
        RouterTestingModule,
        FontAwesomeModule,
        FormsModule,
        ReactiveFormsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    articleForm = component.articleForm;
  });

  /**
   * Breadcrumb related tests
   */
  it('should call setMode onInit', () => {
    const fnc = spyOn(component, 'setMode');
    component.ngOnInit();
    fixture.detectChanges();
    expect(fnc).toHaveBeenCalled();
  });

  /**
   * Article status related test
   */
  it('should set default status to "draft" if we are in create mode', () => {
    component.mode = 'create';
    fixture.detectChanges();
    component.setStatus();
    fixture.detectChanges();
    const articleForm = component.articleForm as FormGroup;
    expect(articleForm.get('status').value).toBe('draft');
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
    component.articleForm.disable();
    fixture.detectChanges();
    component.onEdit();
    fixture.detectChanges();
    expect(component.articleForm.enabled).toBeTruthy();
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
    component.articleForm.enable();
    fixture.detectChanges();
    component.saveForm();
    fixture.detectChanges();
    expect(component.articleForm.disabled).toBeTruthy();
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
    component.articleForm.enable();
    fixture.detectChanges();
    component.onCancel();
    fixture.detectChanges();
    expect(component.articleForm.disabled).toBeTruthy();
    expect(component.mode).toBe('view');
  });

  /**
   * Publish button related test
   */
  it('should invoke the publishArticle function on user clicks on the publish button', () => {
    component.mode = 'view';
    const articleForm = component.articleForm as FormGroup;
    articleForm.get('status').setValue('draft');
    fixture.detectChanges();
    const fnc = spyOn(component, 'publishArticle').and.callFake(() => {});
    const publishBtn = fixture.debugElement.query(By.css('.--publish')).nativeElement as HTMLButtonElement;
    publishBtn.click();
    fixture.detectChanges();
    expect(fnc).toHaveBeenCalled();
  });

  /**
   * Unpublish button related test
   */
  it('should invoke the unpublishArticle function on user clicks on the unpublish button', () => {
    component.mode = 'view';
    const articleForm = component.articleForm as FormGroup;
    articleForm.get('status').setValue('published');
    fixture.detectChanges();
    const fnc = spyOn(component, 'unpublishArticle').and.callFake(() => {});
    const unpublishBtn = fixture.debugElement.query(By.css('.--unpublish')).nativeElement as HTMLButtonElement;
    unpublishBtn.click();
    fixture.detectChanges();
    expect(fnc).toHaveBeenCalled();
  });

  /**
   * Article status related test
   */
  it('should display article status as "New"', () => {
    component.mode = 'create';
    const articleForm = component.articleForm as FormGroup;
    articleForm.get('status').setValue('draft');
    fixture.detectChanges();
    const articleStatus = fixture.debugElement.query(By.css('.page-title')).nativeElement as HTMLElement;
    expect(articleStatus.innerText).toBe('New');
  });
  it('should display article status as "Draft"', () => {
    component.mode = 'edit';
    const articleForm = component.articleForm as FormGroup;
    articleForm.get('status').setValue('draft');
    fixture.detectChanges();
    const articleStatus = fixture.debugElement.query(By.css('.page-title')).nativeElement as HTMLElement;
    expect(articleStatus.innerText).toBe('Draft');
  });
  it('should display article status as "Published"', () => {
    const articleForm = component.articleForm as FormGroup;
    articleForm.get('status').setValue('published');
    fixture.detectChanges();
    const articleStatus = fixture.debugElement.query(By.css('.page-title')).nativeElement as HTMLElement;
    expect(articleStatus.innerText).toBe('Published');
  });

  /**
   * Form related tests
   */
  it('should have FormControls', () => {
    // Status
    expect(articleForm.get('status')).toBeTruthy();
    // Title
    expect(articleForm.get('title')).toBeTruthy();
  });

  it('should validate FormControl: title', () => {
    let title = articleForm.get('title');
    title.setValue('');
    fixture.detectChanges();
    expect(title.valid).toBeFalsy();
  });

  /**
   * Add paragraph related tests
   */
  it('should invoke the addParagraph function on "New Paragraph" button clicks', () => {
    let btn = fixture.debugElement.query(By.css('.new-btn')).nativeElement as HTMLButtonElement;
    let fnc = spyOn(component, 'addParagraph');
    btn.click();
    fixture.detectChanges();
    expect(fnc).toHaveBeenCalled();
  });
});
