import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Producto, Categoria } from '../../models/producto.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = 'http://localhost:8081/api/productos';

  constructor(private http: HttpClient) { }

  private getToken(): string | null {
    return sessionStorage.getItem('authToken');
  }

  private getHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  obtenerProductos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/public`);
  }

  eliminarProducto(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

  editarProducto(id: number, producto: any): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put(url, producto, { headers: this.getHeaders() });
  }

  getImageUrl(productId: number): string {
    return `${this.apiUrl}/${productId}/image`;
  }

  getProductsByCategory(categoria: string){
    const url = `${this.apiUrl}/${categoria}/public`;
    return this.http.get<Producto[]>(url);
  }
}
