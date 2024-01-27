# API - Gerenciador de Arquivos Juridicos

## Descrição
Esta é a API do Gerenciador de Arquivos Juridicos Feita em Express. A API cria e autentica usuario e realizar upload de arquivos.

## Instalação

Certifique-se de ter o Node.js e o Yarn instalados em sua máquina.

1. Clone o repositório:

```bash

  git clone https://github.com/dickbr/jurisoft-api-manager.git
  cd jurisoft-api-manager
```

2. Instale as dependências:

```bash

  yarn install
```

3. Configure as variáveis de ambiente:

  Crie um arquivo .env na raiz do projeto e configure as variáveis necessárias.


4. Inicie o servidor de desenvolvimento:

```bash


  yarn dev
```
A API estará disponível em http://localhost:3000.


Endpoints

    POST /documents/uploads: Salva um documento.
    PUT /documents/uploads/:id: Atualiza um arquivo pelo ID.
    DELETE /documents/uploads/:id: Deleta arquivo pelo ID.
    GET /documents/uploads: Captura documento.


Tecnologias Utilizadas

    Express
    MongoDB
    JWT

Scripts

    yarn test: Teste unitario.
    yarn start: Inicia o servidor de produção.
    yarn dev: Inicia o servidor de desenvolvimento.

Licença

Este projeto é licenciado sob a MIT License.

