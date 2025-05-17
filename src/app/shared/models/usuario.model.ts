export interface Usuario {
  id?: number;
  nome: string;
  login: string;
  email: string;
  password?: string;
  admin: boolean;
  criadoEm?: string;
  atualizadoEm?: string;
}
