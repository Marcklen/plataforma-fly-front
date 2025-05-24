import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/auth.service';

@Component({
  selector: 'app-usuario-dashboard',
  templateUrl: './usuario-dashboard.component.html',
  styleUrls: ['./usuario-dashboard.component.scss'],
})
export class UsuarioDashboardComponent implements OnInit {
  nome: string = '';
  login: string = '';
  isAdmin: boolean = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.getDadosUsuario().subscribe({
      next: (usuario) => {
        this.nome = usuario.nome || 'N/A';
        this.login = usuario.login || 'N/A';
        this.isAdmin = usuario.admin || false;
      },
      error: (err) => {
        console.error('Erro ao buscar dados do usuário:', err);
      },
    });
  }
}
