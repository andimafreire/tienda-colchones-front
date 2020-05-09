import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { 
  NbCardModule, 
  NbSpinnerModule, 
  NbSelectModule,
  NbInputModule,
  NbButtonModule,
  NbUserModule,
  NbIconModule,
} from '@nebular/theme';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductListComponent } from './product-list.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';

const NB_MODULES = [
  NbCardModule,
  NbSpinnerModule,
  NbSelectModule,
  NbInputModule,
  NbButtonModule,
  NbUserModule,
  NbIconModule,
];

@NgModule({
  imports: [
    ThemeModule,
    FormsModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatTableModule,
    ...NB_MODULES,
  ],
  declarations: [
    ProductListComponent,
  ],
  entryComponents: [
  ],
})

export class ProductListModule {}
