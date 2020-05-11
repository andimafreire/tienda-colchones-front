import { Component, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';


@Component({
  selector: 'ngx-confirm-dialog',
  templateUrl: 'confirm-dialog.component.html',
  styleUrls: ['confirm-dialog.component.scss'],
})
export class ConfirmDialogComponent {
  @Input() message: string;

  submit: string;
  back: string;

  constructor(public ref: NbDialogRef<ConfirmDialogComponent>,) { }
}
