// src/app/shared/models/producto.model.ts

export interface Producto {
    id: number;
    nombre: string;
    precio: number;
    stock: number;
    descripcion: string;
    image: string;
  }
  
  export interface Categoria {
    id: number;
    nombre: string;
  }
  