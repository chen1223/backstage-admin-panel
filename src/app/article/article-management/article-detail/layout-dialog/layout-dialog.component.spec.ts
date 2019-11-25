import { SweetAlert2Module, SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutDialogComponent } from './layout-dialog.component';

describe('LayoutDialogComponent', () => {
  let component: LayoutDialogComponent;
  let fixture: ComponentFixture<LayoutDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        LayoutDialogComponent,
      ],
      imports: [
        SweetAlert2Module
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

});
