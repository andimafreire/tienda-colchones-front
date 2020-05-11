import { NgModule } from '@angular/core';
import { ThemeModule } from '../../../@theme/theme.module';
import { 
  NbCardModule, 
  NbSpinnerModule, 
  NbSelectModule,
  NbInputModule,
  NbButtonModule,
  NbIconModule,
  NbCheckboxModule,
  NbUserModule,
} from '@nebular/theme';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductFormComponent } from './product-form.component';

const NB_MODULES = [
  NbCardModule,
  NbCheckboxModule,
  NbSpinnerModule,
  NbSelectModule,
  NbInputModule,
  NbButtonModule,
  NbIconModule,
  NbUserModule,
];

@NgModule({
  imports: [
    ThemeModule,
    FormsModule,
    ReactiveFormsModule,
    ...NB_MODULES,
  ],
  declarations: [
    ProductFormComponent,
  ],
  exports: [
    ProductFormComponent,
  ],
})

export class ProductFormModule {}
