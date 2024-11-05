import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
  product = {
    nombre: '',
    precio: 0,
    stock: 0,
    descripcion: '',
    categorias: [] as { nombre: string }[]
  };
  availableCategories = ['playa', 'buceo', 'ropa', 'piscina', 'electronica', 'mantenimiento', 'deporte'];
  productId: string | null = null;
  selectedFile: File | null = null;

  private apiUrl = 'http://localhost:8080/api/productos';
  private token = sessionStorage.getItem('authToken') || '';

  constructor(private http: HttpClient) {}

  createProduct() {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);

    this.http.post(this.apiUrl, this.product, { headers }).subscribe(
      (response: any) => {
        console.log('Producto creado:', response);
        this.productId = response.id;
      },
      (error) => {
        console.error('Error al crear el producto:', error);
      }
    );
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  uploadImage() {
    if (!this.selectedFile || !this.productId) return;

    const uploadUrl = `${this.apiUrl}/${this.productId}/uploadImage`;
    const formData = new FormData();
    formData.append('image', this.selectedFile);

    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);

    this.http.post(uploadUrl, formData, { headers }).subscribe(
      (response) => {
        console.log('Imagen subida exitosamente:', response);
        this.resetForm();
        window.location.reload(); 
      },
      (error) => {
        console.error('Error al subir la imagen:', error);
      }
    );
  }

  onCategoryChange(event: any) {
    const categoryName = event.target.value;
    if (event.target.checked) {
      this.product.categorias.push({ nombre: categoryName });
    } else {
      this.product.categorias = this.product.categorias.filter(c => c.nombre !== categoryName);
    }
  }

  resetForm() {
    this.product = {
      nombre: '',
      precio: 0,
      stock: 0,
      descripcion: '',
      categorias: []
    };
    this.productId = null;
    this.selectedFile = null;
  }
}
