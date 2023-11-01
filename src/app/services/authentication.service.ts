import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private adminUsername = environment.admUserName;
  private adminPassword = environment.admPassword;
  private isAuthenticated = false;

  login(username: string, password: string): boolean {
    // Verificar o nome de usuário e senha fornecidos com o administrador
    if (username === this.adminUsername && password === this.adminPassword) {
      this.isAuthenticated = true;
      return true;
    } else {
      return false;
    }
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }
}
