# PetGram

Rede social de fotos de pets no estilo Instagram — projeto de estudo em React, usando a [API Dogs (Origamid)](https://dogsapi.origamid.dev/json).

## Funcionalidades

- Feed vertical com abas **Para você** e **Seguindo**
- Explorar em grade, stories (demo), curtidas, salvos e seguir (persistidos no `localStorage`)
- Login, cadastro, recuperação de senha, postagem, comentários e exclusão via API real
- Perfil com grid de publicações e aba Salvos

## Requisitos

- Node.js 18+

## Como rodar

```bash
npm install
npm run dev
```

Abra o endereço exibido no terminal (geralmente `http://localhost:5173`).

## Build

```bash
npm run build
npm run preview
```

## Modo demonstração

Curtidas, seguir, stories vistos, salvos e o feed **Seguindo** usam `localStorage` no navegador — não são sincronizados com o servidor. O restante (fotos, comentários, auth) depende da API Origamid.

## Limitações

- A API é focada em cães (campos peso/idade); o branding é **pets** de forma geral
- Sem mensagens diretas nem notificações push
- Se a API estiver offline, o app exibe mensagem de erro amigável
