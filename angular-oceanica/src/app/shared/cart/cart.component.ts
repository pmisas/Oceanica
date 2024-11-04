import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CartService } from '../services/cart/cart.service';
import { ProductService } from '../services/product/product.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports:[CommonModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {
  @Input() showCart: boolean = false;
  @Output() closeCart = new EventEmitter<void>(); 
  cartItems$ = this.cartService.cartItems$;

  constructor(private cartService: CartService, private productService: ProductService) {}

  getImageUrl(productId: number): string {
    return this.productService.getImageUrl(productId); 
  }

  removeItem(index: number) {
    this.cartService.removeItem(index);
  }

  clearCart() {
    this.cartService.clearCart();
  }

  onCloseCart() {
    this.closeCart.emit(); 
  }

  calculateTotal(): number {
    let total = 0;
    this.cartItems$.subscribe(items => {
      total = items.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);
    });
    return parseFloat(total.toFixed(2)); 
  }

}
