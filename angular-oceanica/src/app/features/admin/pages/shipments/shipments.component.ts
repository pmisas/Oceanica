import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PedidoService } from '../../../../shared/services/shipment/pedido.service';

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
  showModal: boolean = false;  // Asegúrate de que el modal comienza cerrado
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
    this.showModal = true;  // Abre el modal
  }

  closeModal(): void {
    this.showModal = false;  // Cierra el modal
    this.selectedPedido = null;
  }
}