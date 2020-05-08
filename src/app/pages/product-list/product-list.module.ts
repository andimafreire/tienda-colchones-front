import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { 
  NbCardModule, 
  NbSpinnerModule, 
  NbSelectModule,
  NbInputModule,
  NbButtonModule,
  NbUserModule,
} from '@nebular/theme';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductListComponent } from './product-list.component';


const NB_MODULES = [
  NbCardModule,
  NbSpinnerModule,
  NbSelectModule,
  NbInputModule,
  NbButtonModule,
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
    ProductListComponent,
  ],
  entryComponents: [
  ],
})

export class ProductListModule {}
