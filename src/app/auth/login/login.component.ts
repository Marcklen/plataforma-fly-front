import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  form!: FormGroup;
  error = '';

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private snackBar: MatSnackBar) {
    this.form = this.fb.group({
      login: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void{
    if (this.form.valid) {
      this.authService.login(this.form.value).subscribe({
        next: (response: any) => {
          this.authService.saveToken(response.token);
          this.router.navigate(['/home']);
          this.snackBar.open('Login realizado com sucesso!', 'Fechar', {
            duration: 3000,
            panelClass: ['feedback-successo']
          });
        },
        error: () => {
          this.snackBar.open('Credenciais inválidas!', 'Fechar', {
            duration: 3000,
            panelClass: ['feedback-erro']
          });
        }
      });
    }
  }
}
