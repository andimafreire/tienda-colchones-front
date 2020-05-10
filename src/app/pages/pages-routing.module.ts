import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ProductListComponent } from './product-list/product-list.component';
import { PagesComponent } from './pages.component';
import { ProductComponent } from './product/product.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: '',
      component: ProductListComponent,
    },
    {
      path: 'colchones',
      component: ProductListComponent,
    },
    {
      path: 'somieres',
      component: ProductListComponent,
    },
    {
      path: 'colchones/:id',
      component: ProductComponent,
    },
    {
      path: 'somieres/:id',
      component: ProductComponent,
    },
    
    {
      path: '',
      redirectTo: '',
      pathMatch: 'full',
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
