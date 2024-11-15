import { Component, EventEmitter, Output, OnInit, HostListener } from '@angular/core';
import { Router, NavigationEnd, Event } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { CartService } from '../services/cart/cart.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isAdmin: boolean = false;
  isLoggedIn: boolean = false;
  cartCount: number = 0;
  showNavbar: boolean = true; // Controla la visibilidad del navbar

  @Output() toggleCart = new EventEmitter<void>();

  constructor(private router: Router, private authService: AuthService, private cartService: CartService) {}

  ngOnInit(): void {
    this.authService.isLoggedIn$.subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;
    });
    this.authService.isAdmin$.subscribe((admin) => {
      this.isAdmin = admin;
    });

    this.cartService.cartItems$.subscribe(items => {
      this.cartCount = Array.isArray(items) ? items.length : 0;
    });

    // Escucha cambios de ruta para actualizar showNavbar
    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd)
      )
      .subscribe((event: NavigationEnd) => {
        // Oculta el navbar en la página de resumen de compra
        this.showNavbar = !event.url.includes('/checkout/cart');
      });

    this.onWindowScroll();
  }

  openCart(): void {
    this.toggleCart.emit();
  }

  navigateToAdmin(route: string): void {
    if (route === 'create-product') {
      this.router.navigate(['/admin/new-product']);
    } else if (route === 'edit-products') {
      this.router.navigate(['/admin/edit-product']);
    } else {
      this.router.navigate([`/admin/${route}`]);
    }
  }

  navigateToCategory(category: string): void {
    this.router.navigate([`/${category}`]);
  }

  navigateToLogin(): void {
    if (this.isLoggedIn) {
      this.logout();
    } else {
      this.router.navigate(['/auth/login']);
    }
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const topbar = document.querySelector(".topbar") as HTMLElement;
    const envioBar = document.querySelector(".envio-bar") as HTMLElement;
    const navbar = document.querySelector(".navbar") as HTMLElement;

    if (window.scrollY > 0) {
      if (envioBar) envioBar.style.display = "none"; 
      if (topbar) topbar.style.top = "-30px"; 
      if (navbar) {
        navbar.style.top = "0"; 
        navbar.style.height = "80px"; 
      }
    } else {
      if (envioBar) envioBar.style.display = "block"; 
      if (topbar) topbar.style.top = "0"; 
      if (navbar) {
        navbar.style.top = "30px"; 
        navbar.style.height = "100px"; 
      }
    }
  }
}
