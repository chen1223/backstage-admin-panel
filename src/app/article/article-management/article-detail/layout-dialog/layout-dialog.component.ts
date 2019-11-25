import { Component, OnInit, ViewChild } from '@angular/core';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';

@Component({
  selector: 'app-layout-dialog',
  templateUrl: './layout-dialog.component.html',
  styleUrls: ['./layout-dialog.component.scss']
})
export class LayoutDialogComponent implements OnInit {
  @ViewChild('layout', {static: false}) dialog: SwalComponent;

  // tslint:disable-next-line: max-line-length
  textPlaceholder = `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`;
  imgPlaceholder = '/assets/img/img-placeholder.jpg';
  // Custom classes of SweetAlertDialog
  layoutClasses = {
    container: 'layout-dialog',
    popup: 'dialog-container'
  };

  constructor() { }

  ngOnInit() {
  }

  show() {
    this.dialog.fire();
  }

  deleteFile(): void {

  }
}
