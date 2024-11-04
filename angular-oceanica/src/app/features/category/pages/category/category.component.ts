// src/app/features/category/pages/category/category.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../../shared/services/product/product.service';
import { CartService } from '../../../../shared/services/cart/cart.service';
import { Producto } from '../../../../shared/models/producto.model';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  categoryName!: string;
  productos: Producto[] = [];
  bannerImage: string = '';

  selectedProduct: Producto | null = null;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService
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
      default:
        this.bannerImage = 'assets/images/baner/default_banner.jpg';
        break;
    }
  }

  getImageUrl(productId: number): string {
    return this.productService.getImageUrl(productId); // Usa el servicio para obtener la URL de la imagen
  }

  quickBuy(product: Producto): void {
    this.selectedProduct = product;
  }

  closeQuickView(): void {
    this.selectedProduct = null;
  }
}
