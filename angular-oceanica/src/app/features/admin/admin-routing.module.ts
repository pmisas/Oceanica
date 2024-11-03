import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './pages/products/products.component';
import { ShipmentsComponent } from './pages/shipments/shipments.component';

const routes: Routes = [
  {path: 'products', component: ProductsComponent},
  {path: 'panel', component: ShipmentsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
