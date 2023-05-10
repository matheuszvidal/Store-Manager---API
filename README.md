# Descrição do projeto

O projeto Store Manager é uma API RESTful para gerenciamento de vendas no formato dropshipping. A API permite criar, visualizar, atualizar e deletar produtos e vendas. O banco de dados utilizado é o MySQL. A arquitetura do projeto segue o padrão MSC (model-service-controller).

# Tecnologias utilizadas

O projeto foi desenvolvido utilizando a linguagem de programação JavaScript e o runtime Node.js. O banco de dados utilizado foi o MySQL, e o framework utilizado para construir a API foi o Express.js.

## Como instalar e utilizar

Para instalar o projeto, siga as instruções abaixo:

Clone o repositório
- Instale as dependências do projeto com o comando `npm install`
- Configure as variáveis de ambiente no arquivo `.env`
- Execute o projeto com o comando `npm run dev`

# Estrutura do projeto

A estrutura do projeto está organizada em pastas e arquivos da seguinte forma:

- `src/controllers`: Contém os controladores da API.
- `src/models`: Contém os modelos de dados da aplicação e configurações de conexão com o banco de dados..
- `src/routes`: Contém as rotas da API.
- `src/services`: Contém os serviços da aplicação.
- `src/app.js`: Arquivo principal da aplicação.

## Endpoints disponíveis

A API possui os seguintes endpoints disponíveis:

- /products: Endpoints para criar, listar, atualizar e deletar produtos.
- /sales: Endpoints para criar, listar, atualizar e deletar vendas.

## Considerações finais

O projeto Store Manager foi desenvolvido seguindo boas práticas de arquitetura e design de API RESTful. O código foi testado e está pronto para uso em produção. Qualquer dúvida ou problema, sinta-se à vontade para entrar em contato com a equipe de desenvolvimento.
