import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/shared/models/usuario.model';

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
    private router: Router
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
    if (id) {
      this.isEdit = true;
      this.userId = +id;
      this.usuarioService
        .buscarUsuarioPorId(this.userId)
        .subscribe((usuario) => {
          this.form.patchValue(usuario);
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

    const operacao = this.isEdit
      ? this.usuarioService.atualizarUsuario(this.userId, usuario)
      : this.usuarioService.cadastrarUsuario(usuario);

    operacao.subscribe({
      next: () => this.router.navigate(['/usuarios']),
      error: (err) => console.error('Erro ao salvar usuário', err),
      complete: () => (this.carregando = false),
    });
  }
}
