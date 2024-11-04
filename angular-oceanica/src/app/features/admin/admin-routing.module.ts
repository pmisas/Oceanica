import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './pages/products/products.component';
import { ShipmentsComponent } from './pages/shipments/shipments.component';
import { EditProductComponent } from './pages/edit-product/edit-product.component';

const routes: Routes = [
  {path: 'new-product', component: ProductsComponent},
  {path: 'edit-product', component: EditProductComponent},
  {path: 'shipments', component: ShipmentsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
