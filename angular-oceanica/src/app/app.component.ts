import { Component, HostListener, OnChanges, SimpleChanges } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './shared/footer/footer.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { CartComponent } from './shared/cart/cart.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FooterComponent, NavbarComponent, CartComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnChanges {
  showCart: boolean = false;

  toggleCart(): void {
    this.showCart = !this.showCart;
    this.updateBodyScroll();
  }

  closeCart(): void {
    this.showCart = false;
    this.updateBodyScroll();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['showCart']) {
      console.log("cambio", this.showCart)
      this.updateBodyScroll();
    }
  }

  private updateBodyScroll(): void {
    console.log('Estado del carrito (showCart):', this.showCart);
    if (this.showCart) {
      document.body.style.overflow = 'hidden';
    } else {
      console.log('Desbloqueando scroll');
      document.body.style.overflow = '';
    }
  }
}
