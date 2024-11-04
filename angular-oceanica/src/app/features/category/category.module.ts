import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryRoutingModule } from './category-routing.module';
import { CategoryComponent } from './pages/category/category.component';
import { ModalComponent } from '../../shared/modal/modal.component';

@NgModule({
  declarations: [CategoryComponent],
  imports: [
    CommonModule,
    CategoryRoutingModule,
    ModalComponent 
  ]
})
export class CategoryModule { }
