import { FormControl } from '@angular/forms';
// On image upload, set result to targeted FormControl

export function uploadImg(files: FileList, ctrl: FormControl): void {
  if (files.length === 0) {
    return;
  }
  const mimeType = files[0].type;
  if (mimeType.match(/image\/*/) == null) {
    return;
  }

  var reader = new FileReader();
  reader.readAsDataURL(files[0]);
  reader.onload = (_event) => {
    ctrl.setValue(reader.result);
  }
}
