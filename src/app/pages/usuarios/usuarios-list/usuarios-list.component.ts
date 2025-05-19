import { Component, OnInit, ViewChild } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/shared/models/usuario.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-usuarios-list',
  templateUrl: './usuarios-list.component.html',
  styleUrls: ['./usuarios-list.component.scss'],
})
export class UsuariosListComponent implements OnInit {
  // Definindo as colunas que serão exibidas na tabela
  displayedColumns: string[] = [
    'nome',
    'login',
    'email',
    'admin',
    'criadoEm',
    'atualizadoEm',
    'acoes',
  ];
  dataSource = new MatTableDataSource<Usuario>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.carregarUsuarios();
  }

  carregarUsuarios(): void {
    this.usuarioService.buscarUsuarios().subscribe({
      next: (usuarios) => {
        this.dataSource.data = usuarios;
        this.dataSource.paginator = this.paginator;
      },
      error: (err) => {
        console.error('Erro ao carregar usuários:', err);
      },
    });
  }

  aplicarFiltro(event: Event): void {
    const filtroValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filtroValue.trim().toLowerCase();
  }

  // Método para abrir o modal de criação de usuário
  novoUsuario(): void {
    this.router.navigate(['/usuarios/novo']);
  }

  editarUsuario(usuario: Usuario): void {
    this.router.navigate(['/usuarios', usuario.id]);
  }

  excluirUsuario(usuario: Usuario): void {
    const confirmacao = confirm(
      `Tem certeza que deseja excluir o usuário ${usuario.nome}?`
    );
    if (confirmacao) {
      this.usuarioService.excluirUsuario(usuario.id!).subscribe({
        next: () => {
          this.snackBar.open('Usuário excluído com sucesso.', 'Fechar', {
            duration: 3000,
            panelClass: ['feedback-sucesso'],
            verticalPosition: 'top',
          });
          this.carregarUsuarios(); // recarrega lista
        },
        error: () => {
          this.snackBar.open('Erro ao excluir o usuário.', 'Fechar', {
            duration: 3000,
            panelClass: ['feedback-erro'],
            verticalPosition: 'top',
          });
        },
      });
    }
  }
}
