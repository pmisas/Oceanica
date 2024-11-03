import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../shared/services/auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: string = 'admin@gmail.com';
  password: string = 'contraseña';
  loginError: string = ''; 

  constructor(private router: Router, private authService: AuthService) {}

  closeModal() {
    this.router.navigate(['/']);
  }

  onSubmit() {
    this.authService.login(this.email, this.password).subscribe(
      response => {
        console.log('Login exitoso', response);
        this.router.navigate(['/admin/panel']);
      },
      error => {
        this.loginError = 'Email y/o contraseña incorrectos';
      }
    );
  }
  
}
