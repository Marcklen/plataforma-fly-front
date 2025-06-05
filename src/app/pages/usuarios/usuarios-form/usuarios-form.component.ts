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
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      nome: ['', Validators.required],
      login: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: [''],
      admin: [false],
    });

    const id = this.route.snapshot.paramMap.get('id');
    const isAdmin = this.authService.isAdmin();

    if (id) {
      this.isEdit = true;
      this.userId = +id;

      this.usuarioService
        .buscarUsuarioPorId(this.userId)
        .subscribe((usuario) => {
          // prencher campos do form com os dados do usuario SEM A SENHA
          const { password, ...usuarioSemSenha } = usuario;
          this.form.patchValue(usuarioSemSenha);
          // Oculta o campo de login da validação se o usuário não for admin
          if (!isAdmin) {
            this.form.get('login')?.clearValidators();
            this.form.get('login')?.updateValueAndValidity();
          }
          // Senha será opcional na edição caso o usuário seja do TIPO ADMIN
          this.form.get('password')?.clearValidators();
          this.form.get('password')?.updateValueAndValidity();
        });
    } else {
      this.form.get('password')?.setValidators(Validators.required);
    }
    // Se não for admin e está editando, não exibe o campo de login
    if (this.isEdit && !isAdmin) {
      this.form.get('login')?.clearValidators();
      this.form.get('login')?.updateValueAndValidity();
    }
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    this.carregando = true;

    const usuario = this.form.value;
    const isAdmin = this.authService.isAdmin();

    // criado um novo objeto para evitar mutações diretas no form
    // e para aplicar as regras de negócio de forma mais clara
    const payload = { ...usuario };

    // Regra 1: Se não for admin, não permite enviar o campo admin
    if (!isAdmin) {
      delete payload.admin;
    }

    // 2. Se for edição, usuário comum não pode alterar senha
    if (this.isEdit) {
      delete payload.password;
    }

    const operacao = this.isEdit
      ? this.usuarioService.atualizarUsuario(this.userId, payload)
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
        const mensagem =
          err?.error?.message ||
          (Array.isArray(err?.error?.errors)
            ? err.error.errors.join(', ')
            : null) ||
          err.message ||
          'Erro desconhecido.';
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
