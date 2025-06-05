import { Component, OnInit, ViewChild } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/shared/models/usuario.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { MatSort } from '@angular/material/sort';

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
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.carregarUsuarios();
  }

  ngAfterViewInit(): void {
    // Atribui o paginator e ordenação ao dataSource
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  carregarUsuarios(): void {
    this.usuarioService.buscarUsuarios().subscribe({
      next: (usuarios) => {
        this.dataSource.data = usuarios;
      },
      error: (err) => {
        console.error('Erro ao carregar usuários:', err);
        this.snackBar.open('Erro ao carregar usuários.', 'Fechar', {
          duration: 4000,
          verticalPosition: 'top',
          panelClass: ['custom-snackbar-error'],
        });
      },
    });
  }

  aplicarFiltro(event: Event): void {
    const filtroValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filtroValue.trim().toLowerCase();
    // Resetar o paginador para a primeira página ao aplicar filtro
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // Método para abrir o modal de criação de usuário
  novoUsuario(): void {
    this.router.navigate(['/usuarios/novo']);
  }

  editarUsuario(usuario: Usuario): void {
    this.router.navigate([`/usuarios/editar/${usuario.id}`]);
  }

  excluirUsuario(usuario: Usuario): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '360px',
      data: {
        titulo: 'Excluir Usuário',
        mensagem: `Tem certeza que deseja excluir o usuário "${usuario.nome}"?`,
        textoConfirmar: 'Sim, excluir',
        textoCancelar: 'Cancelar',
      },
    });

    dialogRef.afterClosed().subscribe((confirmado: boolean) => {
      if (confirmado) {
        this.usuarioService.excluirUsuario(usuario.id!).subscribe({
          next: () => {
            this.snackBar.open('Usuário excluído com sucesso!', 'Fechar', {
              duration: 4000,
              verticalPosition: 'top',
              panelClass: ['custom-snackbar-success'],
            });
            this.carregarUsuarios();
          },
          error: (err) => {
            if (err.status === 403) {
              this.snackBar.open(
                'Apenas administradores podem excluir usuários.',
                'Fechar',
                {
                  duration: 4000,
                  verticalPosition: 'top',
                  panelClass: ['custom-snackbar-warn'],
                }
              );
            } else {
              const mensagem =
                err?.error?.message ||
                (Array.isArray(err?.error?.errors)
                  ? err.error.errors.join(', ')
                  : null) ||
                err.message ||
                'Erro ao excluir o usuário.';
              this.snackBar.open(mensagem, 'Fechar', {
                duration: 4000,
                verticalPosition: 'top',
                panelClass: ['custom-snackbar-error'],
              });
            }
          },
        });
      }
    });
  }
}
