  export interface Producto {
    id: number;
    descripcion: string;
    image: string;
    nombre: string;
    precio: number;
    stock: number;
    categorias: string[];
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
  