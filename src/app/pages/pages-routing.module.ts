import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ProductListComponent } from './product-list/product-list.component';
import { PagesComponent } from './pages.component';

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
   /*  {
      path: 'colchones/:id',
      component: ProductComponent,
    },
    {
      path: 'somieres/:id',
      component: ProductComponent,
    },
    {
      path: 'login',
      component: LoginComponent,
    }, */
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
