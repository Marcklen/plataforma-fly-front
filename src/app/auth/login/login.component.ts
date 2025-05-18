import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  form!: FormGroup;
  error = '';
  carregando = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.form = this.fb.group({
      login: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.carregando = true;

      this.authService
        .login(this.form.value)
        .subscribe({
          next: (response) => {
            const token = response.token;
            this.authService.saveToken(token);

            // Decodifica e redireciona com base nas roles
            const roles = this.authService.getRoles();

            if (roles.includes('ROLE_ADMIN')) {
              this.router.navigate(['/admin-dashboard']);
            } else if (roles.includes('ROLE_USER')) {
              this.router.navigate(['/usuario-dashboard']);
            } else {
              this.router.navigate(['/home']); // ou para /not-found
            }
            this.snackBar.open('Login realizado com sucesso!', 'Fechar', {
              duration: 3000,
              panelClass: ['feedback-sucesso'],
              verticalPosition: 'top',
            });
          },
          error: () => {
            this.snackBar.open('Credenciais inválidas!', 'Fechar', {
              duration: 3000,
              panelClass: ['feedback-erro'],
              verticalPosition: 'top',
            });
          },
        })
        .add(() => (this.carregando = false));
    }
  }
}
