import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MgtCardComponent } from './mgt-card.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('MgtCardComponent', () => {
  let component: MgtCardComponent;
  let fixture: ComponentFixture<MgtCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MgtCardComponent
      ],
      imports: [
        RouterTestingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MgtCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
