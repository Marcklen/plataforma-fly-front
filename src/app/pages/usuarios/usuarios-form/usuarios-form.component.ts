import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/shared/models/usuario.model';
import { AuthService } from 'src/app/core/auth.service';

@Component({
  selector: 'app-usuarios-form',
  templateUrl: './usuarios-form.component.html',
  styleUrls: ['./usuarios-form.component.scss'],
})
export class UsuariosFormComponent implements OnInit {

  form!: FormGroup;
  isEdit = false;
  carregando = false;
  userId!: number;

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private route: ActivatedRoute,
    private router: Router,
    private snackbar: MatSnackBar,
    public authService: AuthService
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      nome: ['', Validators.required],
      login: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: [''],
      admin: [false],
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.userId = +id;
      this.usuarioService
        .buscarUsuarioPorId(this.userId)
        .subscribe((usuario) => {
          // prencher campos do form com os dados do usuario SEM A SENHA
          const { password, ...usuarioSemSenha } = usuario;
          this.form.patchValue(usuarioSemSenha);
          // Senha será opcional na edição caso o usuário seja do TIPO ADMIN
          this.form.get('password')?.clearValidators();
          this.form.get('password')?.updateValueAndValidity();
        });
    } else {
      this.form.get('password')?.setValidators(Validators.required);
    }
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    this.carregando = true;
    const usuario: Usuario = this.form.value;

    // Lógica para restringir alteração de SENHA conforme regra de NEGOCIO somente ADMIN poderá alterar a senha
    if (this.isEdit) {
      if (!usuario.password) {
        delete usuario.password; // Remove a senha se não for fornecida
      } else if (!this.authService.isAdmin()) {
        this.snackbar.open('Somente administradores podem alterar a senha.', 'Fechar', {
          duration: 4000,
          verticalPosition: 'top',
          panelClass: ['custom-snackbar-warn'],
        });
        this.carregando = false;
        return;
      }
    }

    const operacao = this.isEdit
      ? this.usuarioService.atualizarUsuario(this.userId, usuario)
      : this.usuarioService.cadastrarUsuario(usuario);

    operacao.subscribe({
      next: () => {
        this.snackbar.open('Usuário salvo com sucesso!', 'Fechar', {
          duration: 4000,
          verticalPosition: 'top',
          panelClass: ['custom-snackbar-success'],
        });
        this.router.navigate(['/usuarios']);
      },
      error: (err) => {
        console.error('Erro ao salvar usuário:', err);
        const mensagem = err?.error?.message || err.message || 'Erro desconhecido.';
        this.snackbar.open('Erro ao salvar usuário: ' + mensagem, 'Fechar', {
          duration: 4000,
          verticalPosition: 'top',
          panelClass: ['custom-snackbar-error'],
        });
        this.carregando = false;
      },
      complete: () => {
        this.carregando = false;
      },
    });
  }

  cancelar() {
    this.router.navigate(['/usuarios']);
  }
  
}
