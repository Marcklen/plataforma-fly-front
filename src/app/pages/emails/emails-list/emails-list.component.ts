import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth.service';
import { EmailService } from 'src/app/services/email.service';
import { Email } from 'src/app/shared/models/email.model';

@Component({
  selector: 'app-emails-list',
  templateUrl: './emails-list.component.html',
  styleUrls: ['./emails-list.component.scss'],
})
export class EmailsListComponent implements OnInit {
  emails: Email[] = [];
  carregando = false;

  constructor(
    private emailService: EmailService,
    private router: Router,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.carregarEmails();
  }

  carregarEmails(): void {
    this.carregando = true;

    this.emailService.listar().subscribe({
      next: (dados) => {
        this.emails = dados;
      },
      error: (erro) => {
        console.error('Erro ao carregar e-mails:', erro);
      },
      complete: () => {
        this.carregando = false;
      },
    });
  }

  visualizar(email: Email): void {
    this.router.navigate(['/email', email.id]);
  }
}
