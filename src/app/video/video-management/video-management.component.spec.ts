import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoManagementComponent } from './video-management.component';

describe('VideoManagementComponent', () => {
  let component: VideoManagementComponent;
  let fixture: ComponentFixture<VideoManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
