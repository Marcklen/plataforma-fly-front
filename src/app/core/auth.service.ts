import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

interface JwtPayload {
  sub: string; // Nome do usuário
  roles: string[]; // Papéis do usuário
  exp: number; // Data de expiração do token
  //para buscar dados do usuário
  nome?: string;
  login?: string;
  admin?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${environment.apiBaseUrl}/auth/login`; // URL de autenticação da API atraves do Gateway
  private tokenKey = 'auth_token'; // Chave para armazenar o token no localStorage
  private usuarioApiUrl = `${environment.apiBaseUrl}/usuario`; // URL da API de usuários

  constructor(private http: HttpClient, private router: Router) {}

  // Método para fazer login (refatorado)
  login(credentials: {
    login: string;
    password: string;
  }): Observable<{ token: string }> {
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

  // Método para evitar bug de expiração do token e sessão inválida
  clearToken(): void {
    localStorage.removeItem(this.tokenKey);
  }

  // Método para verificar se o usuário está autenticado (refatorado)
  isAuthenticated(): boolean {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  // Método para fazer logout (refatorado)
  logout(): void {
    this.clearToken();
    this.router.navigate(['/login']);
  }

  // Método para buscar o usuário logado (refatorado)
  getUsername(): string | null {
    return this.decodeToken()?.sub || null;
  }

  // Método para buscar os papéis do usuário logado (refatorado)
  getRoles(): string[] {
    return this.decodeToken()?.roles || [];
  }

  // Método para verificar se o usuário é um administrador
  isAdmin(): boolean {
    return this.getRoles().includes('ROLE_ADMIN');
  }

  // Método para buscar o token decodificado
  getDecodedToken(): JwtPayload | null {
    return this.decodeToken();
  }

  // Método para buscar os dados do usuário por login
  getDadosUsuario(): Observable<any> {
    const login = this.getUsername();
    return this.http.get<any>(`${this.usuarioApiUrl}/login/${login}`);
  }

  // Método para verificar se o token está expirado
  private isTokenExpired(token: string): boolean {
    try {
      const decoded: JwtPayload = jwtDecode(token);
      if (!decoded.exp) return false;
      const now = Math.floor(Date.now() / 1000);
      return decoded.exp < now;
    } catch {
      return true;
    }
  }
  // Método para decodificar o token JWT
  private decodeToken(): JwtPayload | null {
    const token = this.getToken();
    if (!token) return null;
    try {
      return jwtDecode<JwtPayload>(token);
    } catch {
      return null;
    }
  }
}
