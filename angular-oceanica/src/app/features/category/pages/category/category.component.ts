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
  productos: Producto[] = [];
  bannerImage: string = '';

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.categoryName = params.get('category') || '';
      this.setBannerImage(this.categoryName);
      this.getProductsByCategory(this.categoryName);
    });
  }

  getProductsByCategory(category: string): void {
    this.productService.getProductsByCategory(category).subscribe(
      (productos) => {
        this.productos = productos;
      },
      (error) => console.error('Error al obtener los productos', error)
    );
  }

  setBannerImage(category: string): void {
    switch (category.toLowerCase()) {
      case 'buceo':
        this.bannerImage = 'assets/images/baner/buceo_baner.jpg';
        break;
      case 'ropa':
        this.bannerImage = 'assets/images/baner/ropa_baner.jpg';
        break;
      case 'playa':
        this.bannerImage = 'assets/images/baner/playa_baner.jpg';
        break;
      case 'piscina':
        this.bannerImage = 'assets/images/baner/piscina_baner.png';
        break;
      case 'electronica':
        this.bannerImage = 'assets/images/baner/electronica_baner.jpg';
        break;
      case 'deporte':
        this.bannerImage = 'assets/images/baner/deportes_baner.png';
        break;
      case 'mantenimiento':
        this.bannerImage = 'assets/images/baner/seguridad_baner.jpg';
        break;
    }
  }

  getImageUrl(productId: number): string {
    // Construye la URL de la imagen usando el ID del producto y el endpoint específico
    return `http://localhost:8081/api/productos/${productId}/image`;
  }
}
