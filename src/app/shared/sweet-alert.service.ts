import { Injectable } from '@angular/core';
import Swal, { SweetAlertResult } from 'sweetalert2';

// Button animation class
const FADE_IN_CLASS = {
  popup: 'fade-in-right'
};
const FADE_OUT_CLASS = {
  popup: 'fade-out-left'
};

// Number in miliseconds until the dialog is close
const TIME_TO_CLOSE = 2000;

@Injectable({
  providedIn: 'root'
})
export class SweetAlertService {

  constructor() { }

  // Show warning dialog
  warn(title?: string, text?: string): void {
    Swal.fire({
      title: title ? title : 'Warning!',
      text: text ? text : '',
      position: 'top-end',
      showClass: FADE_IN_CLASS,
      hideClass: FADE_OUT_CLASS,
      buttonsStyling: false,
      customClass: {
        confirmButton: 'btn sweet-btn --warning',
      }
    });
  }

  // Show success dialog
  success(title?: string, text?: string): void {
    Swal.fire({
      title: title ? title : 'Success!',
      text: text ? text : '',
      position: 'top-end',
      showClass: FADE_IN_CLASS,
      hideClass: FADE_OUT_CLASS,
      buttonsStyling: false,
      customClass: {
        confirmButton: 'btn sweet-btn --success'
      }
    });
  }

  // Show error dialog
  error(title?: string, text?: string): void {
    Swal.fire({
      title: title ? title : 'Error!',
      text: text ? text : '',
      position: 'top-end',
      showClass: FADE_IN_CLASS,
      hideClass: FADE_OUT_CLASS,
      buttonsStyling: false,
      customClass: {
        confirmButton: 'btn sweet-btn --error'
      }
    });
  }

  // Show confirm dialog
  confirm(title?: string, text?: string): Promise<SweetAlertResult> {
    return Swal.fire({
      title: title ? title : 'Are you sure?',
      text: text ? text : '',
      showClass: {
        popup: 'fade-in-top'
      },
      hideClass: {
        popup: 'fade-out-bottom'
      },
      buttonsStyling: false,
      showCancelButton: true,
      customClass: {
        confirmButton: 'btn sweet-btn --info',
        cancelButton: 'btn sweet-btn --cancel'
      }
    });
  }

  // Show info dialog
  info(title?: string, text?: string): void {
    Swal.fire({
      title: title ? title : 'Information',
      text: text ? text : '',
      position: 'top-end',
      showClass: FADE_IN_CLASS,
      hideClass: FADE_OUT_CLASS,
      buttonsStyling: false,
      showConfirmButton: false,
      timer: TIME_TO_CLOSE
    });
  }
}
