import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../services/cart/cart.service';
import { ProductService } from '../services/product/product.service';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {
  @Input() showCart: boolean = false;
  @Output() closeCart = new EventEmitter<void>(); 
  cartItems$: Observable<any[]>;
  hasProducts$: Observable<boolean>;

  constructor(
    private cartService: CartService,
    private productService: ProductService,
    private router: Router
  ) {
    // Asegura que cartItems$ emita siempre un array, incluso si está vacío
    this.cartItems$ = this.cartService.cartItems$.pipe(
      startWith([]) // Inicializa con un array vacío si no hay productos
    );
    
    this.hasProducts$ = this.cartItems$.pipe(
      map(items => items && items.length > 0)
    );
  }

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

  goToCheckout() {
    this.router.navigate(['/checkout/cart']);
  }
}
