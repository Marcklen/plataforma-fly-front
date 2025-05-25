import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Email } from 'src/app/shared/models/email.model';

@Component({
  selector: 'app-emails-detalhe',
  templateUrl: './emails-detalhe.component.html',
  styleUrls: ['./emails-detalhe.component.scss'],
})
export class EmailsDetalheComponent implements OnInit {
  email: Email | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    // 🔧 MOCK - substituir futuramente por chamada ao service
    this.email = {
      id: Number(id),
      destinatario: 'exemplo@dominio.com',
      assunto: 'Assunto do E-mail',
      corpo: 'Este é o conteúdo completo da mensagem de e-mail enviada.',
      enviado: true,
      dataCriacao: new Date().toISOString(),
      dataEnvio: new Date().toISOString(),
    };
  }
}
