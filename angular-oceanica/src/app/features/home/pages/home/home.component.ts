import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CarouselComponent } from '../../../../shared/carousel/carousel.component';



interface Product {
  name: string;
  image: string;
  price: number;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, CarouselComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})

export class HomeComponent {

  constructor(private router: Router) {}

  navigateToCategory(category: string): void {
    console.log(category)
    this.router.navigate([`/${category}`]); 
  }

  products: Product[] = [
    {
      name: 'Vestido De Baño Hydrasuit Warped Flow Mujer',
      image: 'assets/images/swimsuit1.png',
      price: 209900
    },
    {
      name: 'Pantaloneta De Baño Jammer Dive Hombre',
      image: 'assets/images/swimsuit2.png',
      price: 199900
    },
    // Añade más productos aquí
  ];

  ngOnInit(): void { }
}

