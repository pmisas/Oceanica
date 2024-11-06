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
  imageSrc: string | null = null;
  croppedImage: string | null = null;

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
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageSrc = e.target.result;
        this.autoResizeImage();
      };
      reader.readAsDataURL(file);
    }
  }

  autoResizeImage() {
    if (!this.imageSrc) return;

    const img = new Image();
    img.src = this.imageSrc;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      // Mantener la proporción de 500x611
      const aspectRatio = 500 / 611;
      let width = img.width;
      let height = img.width / aspectRatio;

      if (height > img.height) {
        height = img.height;
        width = img.height * aspectRatio;
      }

      canvas.width = width;
      canvas.height = height;

      if (ctx) {
        ctx.drawImage(img, 0, 0, width, height);
        this.croppedImage = canvas.toDataURL('image/png');
      }
    };
  }

  onCategoryChange(event: any) {
    const categoryName = event.target.value;
    if (event.target.checked) {
      this.product.categorias.push({ nombre: categoryName });
    } else {
      this.product.categorias = this.product.categorias.filter(c => c.nombre !== categoryName);
    }
  }

  uploadImage() {
    if (!this.croppedImage || !this.productId) return;

    const uploadUrl = `${this.apiUrl}/${this.productId}/uploadImage`;
    const formData = new FormData();
    formData.append('image', this.dataURItoBlob(this.croppedImage), 'croppedImage.png');

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

  dataURItoBlob(dataURI: string) {
    const byteString = atob(dataURI.split(',')[1]);
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: 'image/png' });
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
    this.imageSrc = null;
    this.croppedImage = null;
  }
}
