export interface Email {
  id: number;
  destinatario: string;
  assunto: string;
  corpo: string;
  enviado: boolean;
  dataCriacao: string;
  dataEnvio?: string;
}

export interface EmailDTO {
  destinatario: string;
  assunto: string;
  corpo: string;
}

export interface EmailMessageDTO {
  assunto: string;
  corpo: string;
}
