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
      this.setBannerImage(this.categoryName); // Cambia la imagen según la categoría
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
    // Cambia las URLs de las imágenes según la categoría
    switch (category.toLowerCase()) {
      case 'buceo':
        this.bannerImage = 'assets/images/baner/buceo_baner.jpg';
        break;
      case 'ropa':
        this.bannerImage = 'assets/images/baner/ropa_baner.jpg';
        break;
      case 'seguridad':
        this.bannerImage = 'assets/images/baner/seguridad_baner.jpg';
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
      case 'deportes':
        this.bannerImage = 'assets/images/baner/deportes_baner.png';
        break;
      case 'accesorios':
          this.bannerImage = 'assets/images/baner/accesorios_baner.jpg';
          break;
    }
  }
}
