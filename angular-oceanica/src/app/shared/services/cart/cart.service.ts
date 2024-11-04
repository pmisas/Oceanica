import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Item, Producto } from '../../models/producto.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems = new BehaviorSubject<Item[]>([]);
  cartItems$ = this.cartItems.asObservable();

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
        image: producto.image
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

  clearCart() {
    this.cartItems.next([]);
  }
}
