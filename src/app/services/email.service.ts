import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Email, EmailDTO, EmailMessageDTO } from '../shared/models/email.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  private apiUrl = `${environment.apiBaseUrl}/usuario`;

  constructor(private http: HttpClient) {}

  notificarUsuarioComum(
    id: number,
    mensagem: EmailMessageDTO
  ): Observable<any> {
    return this.http.post(`${this.apiUrl}/notificar/${id}`, mensagem);
  }

  notificarTodosAdmins(mensagem: EmailMessageDTO): Observable<any> {
    return this.http.post(`${this.apiUrl}/notificar/admins`, mensagem);
  }

  buscarPorId(id: number): Observable<Email> {
    return this.http.get<Email>(`${this.apiUrl}/email/${id}`);
  }

  listar(): Observable<Email[]> {
    return this.http.get<Email[]>(`${this.apiUrl}/email`);
  }
}
