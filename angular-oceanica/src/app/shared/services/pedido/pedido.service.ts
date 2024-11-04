import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  private baseUrl = 'http://localhost:8081/api/pedido';

  constructor(private http: HttpClient) {}

  getPedidosPendientes(token: string): Observable<any[]> {
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    return this.http.get<any[]>(`${this.baseUrl}/pendientes`, { headers });
  }

  enviarPedido(id: number, token: string): Observable<void> {
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    return this.http.put<void>(`${this.baseUrl}/${id}`, {}, { headers });
  }
}
