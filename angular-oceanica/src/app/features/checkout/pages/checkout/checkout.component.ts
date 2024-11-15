import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common'; // Importa el servicio Location
import { CartService } from '../../../../shared/services/cart/cart.service';
import { Observable } from 'rxjs';
import { Item } from '../../../../shared/models/producto.model'; // Asegúrate de importar correctamente el tipo Item

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent {
  cartItems$: Observable<Item[]>; 

  constructor(private cartService: CartService, private location: Location) {
    this.cartItems$ = this.cartService.cartItems$;
  }

  getImageUrl(productId: number): string {
    return `http://localhost:8080/api/productos/${productId}/image`; 
  }

  increaseQuantity(index: number): void {
    this.cartService.updateQuantity(index, 1);
  }

  decreaseQuantity(index: number): void {
    this.cartService.updateQuantity(index, -1);
  }

  calculateSubtotal(): number {
    let subtotal = 0;
    this.cartItems$.subscribe((items: Item[]) => {
      subtotal = items.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);
    }).unsubscribe(); 
    return subtotal;
  }

  calculateTotal(): number {
    return this.calculateSubtotal(); 
  }

  calculateEnvio(): number {
    const subtotal = this.calculateSubtotal();
    return subtotal >= 300000 ? 0 : subtotal * 0.05;
  }

  goBack(): void {
    this.location.back(); 
  }
}
