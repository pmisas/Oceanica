import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { CommonModule } from '@angular/common';

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

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.isLoggedIn$.subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;
    });
    this.authService.isAdmin$.subscribe((admin) => {
      this.isAdmin = admin;
    });
  }

  navigateToAdmin(name: string): void {
    this.router.navigate([`/admin/${name}`]);
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
