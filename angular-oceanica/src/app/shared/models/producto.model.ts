  export interface Producto {
    id: number;
    nombre: string;
    precio: number;
    stock: number;
    descripcion: string;
    image: string;
  }

  export interface Item {
    id: number;
    nombre: string;
    cantidad: number;
    precio: number;
    image: string;
  }
  
  export interface Categoria {
    id: number;
    nombre: string;
  }
  