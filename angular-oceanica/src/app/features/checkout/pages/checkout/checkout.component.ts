import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
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
  cartItems$: Observable<Item[]>; // Usa el tipo Item para más claridad

  constructor(private cartService: CartService) {
    this.cartItems$ = this.cartService.cartItems$;
  }

  // Método para obtener la URL de la imagen del producto
  getImageUrl(productId: number): string {
    return `http://localhost:8080/api/productos/${productId}/image`; // Endpoint actualizado
  }

  // Método para aumentar la cantidad de un producto
  increaseQuantity(index: number): void {
    this.cartService.updateQuantity(index, 1);
  }

  // Método para disminuir la cantidad de un producto
  decreaseQuantity(index: number): void {
    this.cartService.updateQuantity(index, -1);
  }

  // Método para calcular el subtotal de la compra
  calculateSubtotal(): number {
    let subtotal = 0;
    this.cartItems$.subscribe((items: Item[]) => {
      subtotal = items.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);
    }).unsubscribe(); // Desuscribirse para evitar fugas de memoria
    return subtotal;
  }

  // Método para calcular el total de la compra
  calculateTotal(): number {
    return this.calculateSubtotal(); // Ajusta si necesitas sumar otros costos
  }
}
