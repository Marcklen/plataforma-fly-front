import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  form!: FormGroup;
  sucesso = false;
  erro = false;

  constructor(private fb: FormBuilder, private http: HttpClient, private snackBar: MatSnackBar, private router: Router) {
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
      this.http.post('http://localhost:8080/usuario', this.form.value).subscribe({
        next: () => {
          this.snackBar.open('Usuário cadastrado com sucesso!', 'Fechar', {
            duration: 3000,
            panelClass: ['feedback-sucesso']
          });
          this.form.reset();
          setTimeout(() => this.router.navigate(['/login']), 3000);
        },
        error: () => {
          this.snackBar.open('Erro ao cadastrar usuário. Tente novamente.', 'Fechar', {
            duration: 3000,
            panelClass: ['feedback-erro']
          });
        }
      });
    }
  }

}
