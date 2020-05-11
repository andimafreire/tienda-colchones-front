import { Component, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';


@Component({
  selector: 'ngx-edit-product-dialog',
  templateUrl: './edit-product-dialog.component.html',
  styleUrls: ['./edit-product-dialog.component.scss'],
})
export class EditProductDialogComponent {
  
  @Input() product: any;

  constructor(public ref: NbDialogRef<EditProductDialogComponent>) {}
}
