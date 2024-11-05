import { Component, Input, Output, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { Producto } from '../models/producto.model';
import { CommonModule } from '@angular/common';
import { CartService } from '../services/cart/cart.service';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit, OnDestroy{
  @Input() product!: Producto;
  @Output() close = new EventEmitter<void>();
  quantity: number = 1;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    document.body.classList.add('no-scroll');
  }

  ngOnDestroy(): void {
    document.body.classList.remove('no-scroll');
  }

  getImageUrl(productId: number): string {
    return `http://localhost:8080/api/productos/${productId}/image`;
  }

  increaseQuantity(): void {
    this.quantity++;
  }

  decreaseQuantity(): void {
    if (this.quantity > 1) this.quantity--;
  }

  addToCart(): void {
    if (this.product) {
      this.cartService.addItem(this.product, this.quantity);
    }
    this.closeModal();
  }

  closeModal(): void {
    this.close.emit();
    this.ngOnDestroy();
  }
}
