import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReelManagementComponent } from './reel-management.component';

describe('ReelManagementComponent', () => {
  let component: ReelManagementComponent;
  let fixture: ComponentFixture<ReelManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReelManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReelManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
