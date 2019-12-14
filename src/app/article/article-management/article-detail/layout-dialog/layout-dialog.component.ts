import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { ArticleService } from './../../../article.service';

@Component({
  selector: 'app-layout-dialog',
  templateUrl: './layout-dialog.component.html',
  styleUrls: ['./layout-dialog.component.scss']
})
export class LayoutDialogComponent implements OnInit {

  @ViewChild('layout', {static: false}) dialog: SwalComponent;
  @Output('OnSelectLayout') OnSelectLayout = new EventEmitter<number>();

  // tslint:disable-next-line: max-line-length
  textPlaceholder = `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`;
  imgPlaceholder = '/assets/img/img-placeholder.jpg';
  // Custom classes of SweetAlertDialog
  layoutClasses = {
    container: 'layout-dialog',
    popup: 'dialog-container'
  };

  constructor(public articleService: ArticleService) { }

  ngOnInit() {
  }

  show() {
    this.dialog.fire();
  }

  // On user selects layout, emit selection and close dialog
  onSelectLayout(layoutType: number): void {
    this.OnSelectLayout.next(layoutType);
    this.dialog.dismiss();
  }
}
