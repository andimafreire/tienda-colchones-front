import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { 
  NbCardModule, 
  NbSpinnerModule,
  NbIconModule,
} from '@nebular/theme';
import { ProductComponent } from './product.component';
import { ProductFormModule } from '../components/product-form/product-form.module';

const NB_MODULES = [
  NbCardModule,
  NbSpinnerModule,
  NbIconModule,
];

@NgModule({
  imports: [
    ThemeModule,
    ProductFormModule,
    ...NB_MODULES,
  ],
  declarations: [
    ProductComponent,
  ],
  entryComponents: [
  ],
})

export class ProductModule {}
