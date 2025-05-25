import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmailService } from 'src/app/services/email.service';
import { Email } from 'src/app/shared/models/email.model';

@Component({
  selector: 'app-emails-detalhe',
  templateUrl: './emails-detalhe.component.html',
  styleUrls: ['./emails-detalhe.component.scss'],
})
export class EmailsDetalheComponent implements OnInit {
  email?: Email;
  carregando = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private emailService: EmailService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (isNaN(id)) {
      this.router.navigate(['/email']);
      return;
    }

    this.emailService.buscarPorId(id).subscribe({
      next: (dados) => (this.email = dados),
      error: (erro) => {
        console.error('Erro ao buscar e-mail:', erro);
        this.router.navigate(['/email']);
      },
      complete: () => (this.carregando = false),
    });
  }

  voltar(): void {
    this.router.navigate(['/email']);
  }
}
