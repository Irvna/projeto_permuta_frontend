# PermutaJá — Front-end

Plataforma que conecta servidores públicos interessados em trocar de cidade de lotação. O servidor publica uma solicitação de permuta e consulta as solicitações de outros servidores.

Este repositório contém o **front-end**. O back-end fica em outro repositório (`projeto_permuta_backend`).

## Funcionalidades

- Cadastro e login de servidores (autenticação por token JWT)
- Minhas Solicitações: listagem, detalhes, cancelamento e exclusão de permutas
- Nova Solicitação: escolha da cidade desejada, justificativa e observações
- Permutas Disponíveis: permutas de outros servidores que ainda estão em aberto
- Detalhes da Permuta: mostra "Cancelar Permuta" para o dono e "Solicitar Permuta" para os demais
- Meu Perfil e Edição de Perfil
- Home com as permutas mais recentes e o nome do usuário logado

## Tecnologias

- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS

## Pré-requisitos

- Node.js
- Back-end rodando (`projeto_permuta_backend`) na porta 3000
- MongoDB conectado ao back-end

## Como rodar

```bash
npm install
npm run dev
```

O front sobe em [http://localhost:3001](http://localhost:3001).

- `lib/api.ts` centraliza o envio do token, o redirecionamento ao login quando a sessão expira (401/403) e a formatação de cidade e data. É usado pelas telas internas; login e cadastro fazem a requisição direto, pois ainda não existe token nessas telas.

## Estrutura

```
src/
├── app/
│   ├── home/               # Home
│   ├── login/              # Login
│   ├── cadastro/           # Cadastro
│   ├── servidor/           # Meu Perfil
│   │   └── editar/         # Edição de Perfil
│   └── permutas/           # Minhas Solicitações
│       ├── [id]/           # Detalhes da Permuta
│       ├── disponiveis/    # Permutas Disponíveis
│       └── nova/           # Nova Solicitação
├── components/
│   ├── MenuLateral.tsx
│   ├── PaginaLayout.tsx
│   ├── CabecalhoPagina.tsx
│   ├── SeloStatus.tsx
│   └── ModalConfirmar.tsx
|   └── Footer.tsx
└── lib/
    └── api.ts              # Helpers de requisição, token, formatação e status
```

## Decisões de projeto

- `lib/api.ts` centraliza o envio do token, o redirecionamento ao login quando a sessão expira (401/403) e a formatação de cidade e data.
- A data de publicação é extraída do `_id` do MongoDB, sem campo de data no banco.
- As cidades são salvas em maiúsculo pelo back-end e formatadas no front para exibição.
- Os componentes de layout (`PaginaLayout`, `CabecalhoPagina`) evitam repetir menu, margens e cabeçalho em cada tela.

## Autenticação

O token JWT fica no `localStorage` e é enviado no header `Authorization: Bearer <token>`. Ele expira em 1 hora; depois disso o usuário volta para o login.

## Telas

As telas seguem o protótipo no Figma.