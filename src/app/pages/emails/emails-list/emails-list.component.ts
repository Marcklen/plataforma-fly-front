import { Component, OnInit } from '@angular/core';
import { EmailService } from 'src/app/services/email.service';
import { Email } from 'src/app/shared/models/email.model';

@Component({
  selector: 'app-emails-list',
  templateUrl: './emails-list.component.html',
  styleUrls: ['./emails-list.component.scss'],
})
export class EmailsListComponent implements OnInit {
  emails: Email[] = [];
  displayedColumns: string[] = ['destinatario', 'assunto', 'status', 'acoes'];
  carregando = false;

  // constructor(private emailService: EmailService) {}

  ngOnInit(): void {
    // this.carregarEmails();
    this.carregarMockEmails();
  }
  carregarMockEmails() {
    throw new Error('Method not implemented.');
  }

  carregarMock(): void {
    this.carregando = true;
    setTimeout(() => {
      this.emails = [
        {
          id: 1,
          destinatario: 'usuario@teste.com',
          assunto: 'Bem-vindo!',
          corpo: 'Obrigado por se cadastrar!',
          enviado: true,
          dataEnvio: new Date().toISOString(),
          dataCriacao: '',
        },
        {
          id: 2,
          destinatario: 'admin@teste.com',
          assunto: 'Atualização do sistema',
          corpo: 'O sistema será atualizado às 22h.',
          enviado: false,
          dataEnvio: undefined,
          dataCriacao: '',
        },
      ];
      this.carregando = false;
    }, 1000);
  }

  // carregarEmails(): void {
  //   this.carregando = true;

  //   this.emailService.listar().subscribe({
  //     next: (dados) => {
  //       this.emails = dados;
  //     },
  //     error: (erro) => {
  //       console.error('Erro ao carregar e-mails:', erro);
  //     },
  //     complete: () => {
  //       this.carregando = false;
  //     },
  //   });
  // }
}
