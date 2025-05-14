import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:8080/auth/login'; // URL de autenticação da API atraves do Gateway
  private tokenKey = 'auth_token'; // Chave para armazenar o token no localStorage

  constructor(private http: HttpClient, private router: Router) { }
  
  // Método para fazer login
  login(credentials: { login: string, password: string }) {
    return this.http.post<{ token: string }>(this.apiUrl, credentials);
  }

  // Método para salvar o token no localStorage
  saveToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  // Método para obter o token do localStorage
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  // Método para verificar se o usuário está autenticado
  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  // Método para fazer logout
  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(['/login']);
  }

  // Método para buscar o usuário logado
  getUsername(): string | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      const decoded: any = jwtDecode(token);
      return decoded.sub || null;
    } catch (e) {
      return null;
    }
  }

  // Método para buscar os papéis do usuário logado
  getRoles(): string[] {
    const token = this.getToken();
    if (!token) return [];

    try {
      const decoded: any = jwtDecode(token);
      return decoded.roles || [];
    } catch {
      return [];
    }
  }

  // Método para verificar se o usuário é um administrador
  isAdmin(): boolean {
    return this.getRoles().includes('ADMIN');
  }

}
