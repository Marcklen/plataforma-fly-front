import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EmailService } from 'src/app/services/email.service';

@Component({
  selector: 'app-emails-form',
  templateUrl: './emails-form.component.html',
  styleUrls: ['./emails-form.component.scss'],
})
export class EmailsFormComponent {
  form: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private emailService: EmailService,
    private snackBar: MatSnackBar
  ) {
    this.form = this.fb.group({
      assunto: ['', Validators.required],
      corpo: ['', Validators.required],
      usuarioId: [null],
    });
  }

  // Método para enviar para um usuário
  enviarParaUsuario(): void {
    if (this.form.invalid || !this.form.value.usuarioId) {
      this.snackBar.open('Informe o ID do usuário para envio.', 'Fechar', {
        duration: 4000,
        panelClass: ['custom-snackbar-warn'],
        verticalPosition: 'top',
      });
      return;
    }

    this.loading = true;

    this.emailService
      .notificarUsuarioComum(this.form.value.usuarioId, {
        assunto: this.form.value.assunto,
        corpo: this.form.value.corpo,
      })
      .subscribe({
        next: () => {
          this.snackBar.open(
            'E-mail enviado para o usuário com sucesso!',
            'Fechar',
            {
              duration: 4000,
              panelClass: ['custom-snackbar-success'],
              verticalPosition: 'top',
            }
          );
          this.form.reset();
        },
        error: () => {
          this.snackBar.open(
            'Erro ao enviar e-mail para o usuário.',
            'Fechar',
            {
              duration: 4000,
              panelClass: ['custom-snackbar-error'],
              verticalPosition: 'top',
            }
          );
        },
      })
      .add(() => (this.loading = false));
  }

  // Método para enviar para usuario ADMIN
  enviarParaAdmins(): void {
    if (this.form.invalid) return;
    this.loading = true;
    this.emailService
      .notificarTodosAdmins({
        assunto: this.form.value.assunto,
        corpo: this.form.value.corpo,
      })
      .subscribe({
        next: () => {
          this.snackBar.open('E-mail enviado para todos os admins!', 'Fechar', {
            duration: 4000,
            panelClass: ['custom-snackbar-success'],
            verticalPosition: 'top',
          });
          this.form.reset();
        },
        error: () => {
          this.snackBar.open('Erro ao enviar e-mail para admins.', 'Fechar', {
            duration: 4000,
            panelClass: ['custom-snackbar-error'],
            verticalPosition: 'top',
          });
        },
      })
      .add(() => (this.loading = false));
  }
}
