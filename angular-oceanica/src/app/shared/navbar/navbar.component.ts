import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  ngOnInit(): void {
    // Configuración inicial, si es necesario
  }

  // Escucha el evento de scroll en la ventana
  @HostListener('window:scroll', [])
  onWindowScroll() {
    const topbar = document.querySelector(".topbar") as HTMLElement;
    const envioBar = document.querySelector(".envio-bar") as HTMLElement;
    const navbar = document.querySelector(".navbar") as HTMLElement;

    if (window.scrollY > 0) {
      if (envioBar) {
        envioBar.style.display = "none"; // Oculta el envio-bar al hacer scroll
      }
      if (topbar) {
        topbar.style.top = "-30px"; // Oculta la topbar al hacer scroll
      }
      if (navbar) {
        navbar.style.top = "0"; // Mantén la navbar en la parte superior
        navbar.style.height = "80px"; // Reduce la altura del navbar al hacer scroll
      }
    } else {
      if (envioBar) {
        envioBar.style.display = "block"; // Muestra el envio-bar al estar arriba
      }
      if (topbar) {
        topbar.style.top = "0"; // Restaura la posición de la topbar
      }
      if (navbar) {
        navbar.style.top = "30px"; // Coloca la navbar debajo de la topbar
        navbar.style.height = "100px"; // Altura original del navbar
      }
    }
  }
}
