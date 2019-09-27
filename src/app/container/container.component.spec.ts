import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerComponent } from './container.component';
import { Component } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

/**
 * Mock Sidenav component
 */
@Component({
  selector: 'side-nav',
  template: '',
  host: { 'class': 'side-nav' }
})
class MockSideNavComponent {}

/**
 * Mock Header component
 */
@Component({
  selector: 'app-header',
  template: '',
  host: { 'class': 'header' }
})
class MockHeaderComponent {}

describe('ContainerComponent', () => {
  let component: ContainerComponent;
  let fixture: ComponentFixture<ContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MockSideNavComponent,
        MockHeaderComponent,
        ContainerComponent,
      ],
      imports: [
        RouterTestingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
