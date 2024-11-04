import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PedidoService } from '../../../../shared/services/pedido/pedido.service';

@Component({
  selector: 'app-shipments',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './shipments.component.html',
  styleUrl: './shipments.component.scss'
})
export class ShipmentsComponent implements OnInit {
  
  token: string | null = '';
  pedidos: any[] = [];
  showModal: boolean = false;  
  selectedPedido: any = null;

  constructor(private pedidoService: PedidoService) {}
  
  ngOnInit(): void {
    if (this.isBrowser()) {
      this.token = sessionStorage.getItem('authToken');
      console.log('Token:', this.token);
    } 
    if (this.token) {
      this.loadPedidos();
    } else {
      console.error('Token no encontrado. No se pueden cargar los pedidos.');
    }
  }

  isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof sessionStorage !== 'undefined';
  }

  loadPedidos(): void {
    this.pedidoService.getPedidosPendientes(this.token!).subscribe(
      (data) => {
        this.pedidos = data;
      },
      (error) => {
        console.error('Error al cargar los pedidos:', error);
      }
    );
  }

  openModal(pedido: any): void {
    this.selectedPedido = pedido;
    this.showModal = true;  
  }

  closeModal(): void {
    this.showModal = false; 
    this.selectedPedido = null;
  }

  enviarPedido(id: number): void {
    this.pedidoService.enviarPedido(id, this.token!).subscribe(
      () => {
        this.pedidos = this.pedidos.filter(pedido => pedido.id !== id);
      },
      (error) => {
        console.error('Error al cambiar el estado del pedido:', error);
      }
    );
  }
}