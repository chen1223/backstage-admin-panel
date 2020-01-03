import { FormControl } from '@angular/forms';
// On image upload, set result to targeted FormControl

export function uploadImg(files: FileList, ctrl: FormControl): number {
  if (files.length === 0) {
    return -1;
  }
  const mimeType = files[0].type;
  if (mimeType.match(/image\/*/) == null) {
    return -2;
  }

  var reader = new FileReader();
  reader.readAsDataURL(files[0]);
  reader.onload = (_event) => {
    ctrl.setValue(reader.result);
  }
  return 0;
}

export function toCamelCase(input: string): string {
  const stringArray = input.split(' ');
  for (let i = 0; i < stringArray.length; i++) {
    if (i !== 0) {
      // Convert the first character to uppercase
      stringArray[i] = stringArray[i][0].toUpperCase() + stringArray[i].substring(1, stringArray[i].length);
    }
  }
  return stringArray.join('');
}
