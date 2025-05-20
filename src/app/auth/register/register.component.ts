import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  form!: FormGroup;
  sucesso = false;
  erro = false;
  carregando = false;

  constructor(private fb: FormBuilder, private usuarioService: UsuarioService, private snackBar: MatSnackBar, private router: Router) {
    this.form = this.fb.group({
      nome: ['', Validators.required],
      login: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      admin: [false]
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.carregando = true;
      this.usuarioService.cadastrarUsuario(this.form.value).subscribe({
        next: () => {
          this.snackBar.open('Usuário cadastrado com sucesso!', 'Fechar', {
            duration: 4000,
            verticalPosition: 'top',
            panelClass: ['custom-snackbar-success']
          });
          this.form.reset();
          setTimeout(() => this.router.navigate(['/login']), 4000);
        },
        error: () => {
          this.snackBar.open('Erro ao cadastrar usuário. Tente novamente.', 'Fechar', {
            duration: 4000,
            verticalPosition: 'top',
            panelClass: ['custom-snackbar-error'],
          });
        }
      }).add(() => this.carregando = false);
    }
  }

}
