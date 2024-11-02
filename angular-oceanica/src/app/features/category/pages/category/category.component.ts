import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Producto } from '../../../../shared/models/producto.model';
import { ProductService } from '../../../../shared/services/product.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  categoryName!: string; 
  productos: Producto[] = []; // Almacena los productos obtenidos

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService // Inyecta el servicio
  ) {}

  ngOnInit(): void {
    // Captura el parámetro de la ruta
    this.route.paramMap.subscribe(params => {
      this.categoryName = params.get('category') || ''; 
      this.getProductsByCategory(this.categoryName); // Llama al método para obtener productos
    });
  }

  getProductsByCategory(category: string): void {
    this.productService.getProductsByCategory(category).subscribe(
      (productos) => {
        this.productos = productos;
        console.log('Productos obtenidos:', productos);
      },
      (error) => console.error('Error al obtener los productos', error)
    );
  }
}
