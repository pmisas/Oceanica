import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router) {}

  ngOnInit(): void {}

  navigateToCategory(category: string): void {
    this.router.navigate([`/${category}`]); 
  }

  navigateToLogin(): void {
    this.router.navigate(['/auth/login']); // Redirige a la página de login
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const topbar = document.querySelector(".topbar") as HTMLElement;
    const envioBar = document.querySelector(".envio-bar") as HTMLElement;
    const navbar = document.querySelector(".navbar") as HTMLElement;

    if (window.scrollY > 0) {
      if (envioBar) {
        envioBar.style.display = "none"; 
      }
      if (topbar) {
        topbar.style.top = "-30px"; 
      }
      if (navbar) {
        navbar.style.top = "0"; 
        navbar.style.height = "80px"; 
      }
    } else {
      if (envioBar) {
        envioBar.style.display = "block"; 
      }
      if (topbar) {
        topbar.style.top = "0"; 
      }
      if (navbar) {
        navbar.style.top = "30px"; 
        navbar.style.height = "100px"; 
      }
    }
  }
}
