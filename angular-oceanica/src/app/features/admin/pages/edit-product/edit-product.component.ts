import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../../shared/services/product/product.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Categoria } from '../../../../shared/models/producto.model';

interface Producto {
  id: number;
  descripcion: string;
  image: string;
  nombre: string;
  precio: number;
  stock: number;
  categorias: string[];
}

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {
  productos: Producto[] = [];
  categorias: string[] = ['playa', 'ropa', 'buceo', 'piscina', 'electronica', 'mantenimiento', 'deporte'];
  productosFiltrados: Producto[] = [];
  productosPaginados: Producto[] = [];
  selectedFilter: string = 'todos';
  selectedCategory: string = '';
  selectedId: number | null = null;
  paginaActual: number = 1;
  itemsPorPagina: number = 10;
  totalPaginas: number = 1;

  // Almacenará las categorías seleccionadas por producto
  categoriasSeleccionadas: { [key: number]: (Categoria | string)[] } = {};

  constructor(private productoService: ProductService) {}

  ngOnInit(): void {
    this.cargarProductos();
  }

  cargarProductos(): void {
    this.productoService.obtenerProductos().subscribe((data: Producto[]) => {
      this.productos = data;
      this.productosFiltrados = [...this.productos]; // Inicializa `productosFiltrados` con todos los productos
      this.productos.forEach(producto => {
        this.categoriasSeleccionadas[producto.id] = producto.categorias || [];
      });
      this.actualizarPaginacion();
    });
  }

  onFilterChange(): void {
    this.selectedCategory = '';
    this.selectedId = null;
  }

  filtrar(): void {
    console.log(this.selectedFilter, this.selectedCategory);
    if (this.selectedFilter === 'todos') {
      this.productosFiltrados = [...this.productos];
      this.paginaActual = 1; // Reiniciar a la primera página al aplicar un filtro
      this.actualizarPaginacion();
    } else if (this.selectedFilter === 'categoria' && this.selectedCategory) {
      // Llamada al servicio para obtener productos por categoría
      this.productoService.getProductsByCategory(this.selectedCategory).subscribe((data: Producto[]) => {
        this.productosFiltrados = data;
        this.paginaActual = 1; // Reiniciar a la primera página al aplicar un filtro
        this.actualizarPaginacion();
      });
    } else if (this.selectedFilter === 'id' && this.selectedId !== null) {
      this.productosFiltrados = this.productos.filter(producto => producto.id === this.selectedId);
      this.paginaActual = 1; // Reiniciar a la primera página
      this.actualizarPaginacion();
    }
  }

  actualizarPaginacion(): void {
    this.totalPaginas = Math.ceil(this.productosFiltrados.length / this.itemsPorPagina);
    const inicio = (this.paginaActual - 1) * this.itemsPorPagina;
    const fin = inicio + this.itemsPorPagina;
    this.productosPaginados = this.productosFiltrados.slice(inicio, fin);
  }

  cambiarPagina(nuevaPagina: number): void {
    this.paginaActual = nuevaPagina;
    this.actualizarPaginacion();
  }

  eliminarProducto(id: number): void {
    this.productoService.eliminarProducto(id).subscribe(() => {
      this.productos = this.productos.filter((producto) => producto.id !== id);
      delete this.categoriasSeleccionadas[id];
      this.productosFiltrados = [...this.productos]; // Actualiza el filtro después de eliminar
      this.actualizarPaginacion();
    });
  }

  editarProducto(producto: Producto): void {
    const productoEditado = { ...producto, categorias: this.categoriasSeleccionadas[producto.id] };
    this.productoService.editarProducto(producto.id, productoEditado).subscribe(() => {
      alert('Producto actualizado exitosamente');
    });
  }

  getImageUrl(productId: number): string {
    return this.productoService.getImageUrl(productId);
  }

  isSelected(productoId: number, categoria: string): boolean {
    const seleccionadas = this.categoriasSeleccionadas[productoId];
    const estaSeleccionada = seleccionadas?.some(cat =>
      typeof cat === 'string' ? cat === categoria : cat.nombre === categoria
    ) || false;
    return estaSeleccionada;
  }

  toggleCategory(productoId: number, categoria: string): void {
    const selectedCategories = this.categoriasSeleccionadas[productoId] || [];

    const index = selectedCategories.findIndex(cat =>
      typeof cat === 'string' ? cat === categoria : cat.nombre === categoria
    );

    if (index !== -1) {
      this.categoriasSeleccionadas[productoId] = [
        ...selectedCategories.slice(0, index),
        ...selectedCategories.slice(index + 1)
      ];
    } else {
      this.categoriasSeleccionadas[productoId] = [
        ...selectedCategories,
        categoria
      ];
    }
  }
}
