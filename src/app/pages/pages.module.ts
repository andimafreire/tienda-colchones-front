import { NgModule } from '@angular/core';
import { 
  NbMenuModule, 
  NbCardModule, 
  NbButtonModule, 
  NbIconModule,
} from '@nebular/theme';
import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { PagesRoutingModule } from './pages-routing.module';
import { ProductListModule } from './product-list/product-list.module';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { ProductModule } from './product/product.module';


const NB_MODULES = [
  NbCardModule,
  NbButtonModule,
  NbIconModule,
];

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    ProductListModule,
    ProductModule,
    ...NB_MODULES,
  ],
  declarations: [
    PagesComponent,
    ConfirmDialogComponent,
  ],
  entryComponents: [
    ConfirmDialogComponent,
  ],
})

export class PagesModule {}
