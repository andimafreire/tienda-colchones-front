import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { 
  NbCardModule, 
  NbSpinnerModule, 
  NbIconModule,
} from '@nebular/theme';
import { ProductListComponent } from './product-list.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { ProductFormModule } from '../components/product-form/product-form.module';
import { EditProductDialogComponent } from '../components/edit-product-dialog/edit-product-dialog.component';

const NB_MODULES = [
  NbCardModule,
  NbSpinnerModule,
  NbIconModule,
];

@NgModule({
  imports: [
    ThemeModule,
    ProductFormModule,
    MatPaginatorModule,
    MatTableModule,
    ...NB_MODULES,
  ],
  declarations: [
    ProductListComponent,
    EditProductDialogComponent,
  ],
  entryComponents: [
    EditProductDialogComponent,
  ],
})

export class ProductListModule {}
