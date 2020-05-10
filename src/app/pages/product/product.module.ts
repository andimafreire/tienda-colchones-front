import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { 
  NbCardModule, 
  NbSpinnerModule, 
  NbSelectModule,
  NbInputModule,
  NbButtonModule,
  NbIconModule,
} from '@nebular/theme';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductComponent } from './product.component';

const NB_MODULES = [
  NbCardModule,
  NbSpinnerModule,
  NbSelectModule,
  NbInputModule,
  NbButtonModule,
  NbIconModule,
];

@NgModule({
  imports: [
    ThemeModule,
    FormsModule,
    ReactiveFormsModule,
    ...NB_MODULES,
  ],
  declarations: [
    ProductComponent,
  ],
  entryComponents: [
  ],
})

export class ProductModule {}
