# 🛠️ Plataforma Fly — Frontend Angular

Este repositório contém o frontend da aplicação **Plataforma Fly**, desenvolvido com **Angular 15.2.11**.  
Ele se comunica com os microsserviços da plataforma via **API Gateway**, oferecendo uma interface moderna, responsiva e segura.

---

## 🚀 Funcionalidades principais

- Tela de login com autenticação via JWT  
- Registro de usuários com validação de campos  
- Dashboard dinâmico com gráficos (Admin e Usuário)  
- Gerenciamento de usuários (CRUD)  
- Envio e histórico de e-mails  
- Redirecionamento e menus baseados em roles (ADMIN/USER)  
- Suporte a Progressive Web App (PWA) — em desenvolvimento  

---

## 📄 Documento do desafio original

Este projeto foi construído com base no desafio técnico **Treino Desenvolvedor**, que propõe a criação de um sistema completo utilizando Angular + Spring Boot + Microsserviços.

📁 [Acesse o Gist com o desafio completo aqui](https://gist.github.com/Marcklen/7bd61084e9561e5be02d0b0c1d36650d)

---

## 🧪 Tecnologias utilizadas

- ✅ Angular 15.2.11  
- ✅ TypeScript  
- ✅ Angular Material + CDK  
- ✅ RxJS  
- ✅ JWT (Auth0 Angular JWT + jwt-decode)  
- ✅ ng2-charts / Chart.js 3.9  
- ✅ SCSS customizado  
- ✅ Comunicação com backend via API Gateway  

---

## ⚙️ Como executar o projeto

### 1. Instale as dependências

```bash
npm install
```

## ⚙️ Configuração de ambiente

### 2. Configure as variáveis de ambiente

Crie o arquivo `src/environments/environment.ts` com os dados de desenvolvimento:

```ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080' // URL do API Gateway
};
```

## ⚙️ Iniciando a aplicação

### 3. Execute o comando

```bash
npm start
```

---
## 🌐 Traduções e anonimização

`|🇧🇷| Removido alguns nomes para não mostrar a empresa que solicitou esse desafio.` <br>
`|🇺🇸| Some names were removed to avoid showing the company that requested this challenge.` <br>
`|🇪🇸| Se eliminaron algunos nombres para no mostrar la empresa que solicitó este desafío`

---
## 📌 Observações finais

Este frontend consome as APIs protegidas da Plataforma Fly e foi construído com foco em:

- Escalabilidade

- Responsividade

- Integração total com a arquitetura de microsserviços em Java

- O layout e a navegação foram pensados para diferentes perfis de usuário (administrador e usuário comum).

---

## 🧰 Suporte ao desenvolvedor

> Este projeto foi gerado com [Angular CLI](https://angular.io/cli) versão 15.2.11.

### Gerar novo componente ou serviço

```bash
ng generate component MeuComponente
ng generate service MeuServico
```

