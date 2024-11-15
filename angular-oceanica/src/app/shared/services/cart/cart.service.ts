import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Item, Producto } from '../../models/producto.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems = new BehaviorSubject<Item[]>([]);
  cartItems$ = this.cartItems.asObservable();
  private readonly envioGratisMinimo = 300000; // Precio mínimo para envío gratis
  private readonly porcentajeEnvio = 0.05; // 5% del subtotal

  addItem(producto: Producto, cantidadDeseada: number) {
    const currentItems = this.cartItems.value;
    const existingItemIndex = currentItems.findIndex((cartItem) => cartItem.id === producto.id);

    if (cantidadDeseada > producto.stock) {
      alert(`Lo sentimos, solo tenemos ${producto.stock} unidades en stock.`);
      return;
    }

    if (existingItemIndex > -1) {
      currentItems[existingItemIndex].cantidad = cantidadDeseada;
    } else {
      const newItem: Item = {
        id: producto.id,
        nombre: producto.nombre,
        cantidad: cantidadDeseada,
        precio: producto.precio,
        image: producto.image,
      };
      currentItems.push(newItem);
    }

    this.cartItems.next([...currentItems]);
  }

  removeItem(index: number) {
    const currentItems = this.cartItems.value;
    currentItems.splice(index, 1);
    this.cartItems.next([...currentItems]);
  }

  updateQuantity(index: number, change: number): void {
    const currentItems = this.cartItems.value;
    if (currentItems[index]) {
      currentItems[index].cantidad += change;
      if (currentItems[index].cantidad <= 0) {
        currentItems.splice(index, 1);
      }
      this.cartItems.next([...currentItems]);
    }
  }

  clearCart() {
    this.cartItems.next([]);
  }

  // Método para calcular el subtotal de la compra
  calculateSubtotal(): number {
    return this.cartItems.value.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
  }

  // Método para calcular el costo de envío
  calculateEnvio(subtotal: number): number {
    if (subtotal >= this.envioGratisMinimo) {
      return 0; // Envío gratis
    }
    return subtotal * this.porcentajeEnvio; // 5% del subtotal
  }

  // Método para calcular el total de la compra (subtotal + envío)
  calculateTotal(): number {
    const subtotal = this.calculateSubtotal();
    const envio = this.calculateEnvio(subtotal);
    return subtotal + envio;
  }
}
