import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Producto } from '../../models/producto.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = 'http://localhost:8081/api/productos';

  constructor(private http: HttpClient) { }

  getProductsByCategory(categoria: string){
    const url = `${this.apiUrl}/${categoria}/public`;
    return this.http.get<Producto[]>(url);
  }

  private apiUrlImage = 'http://localhost:8081/api/productos';

  getImageUrl(productId: number): string {
    return `${this.apiUrlImage}/${productId}/image`;
  }

  obtenerProductos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/public`);
  }

  eliminarProducto(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

}
