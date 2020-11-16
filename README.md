# Loja Fantástica

A loja fantástica é uma agência de viagens que te leva para os destinos mais mágicos que você pode imaginar. Compre suas passagens com poucos cliques :)

Aplicação desenvolvida para o desafio técnico da **Jusbrasil**.

## Tecnologias

### API
-   Node.js + Express.js
-   Mongodb + Mongoose
-   GraphQL + Apollo

### Client
-   React.js + TypeScript
-   GraphQL + Apollo

## Rodando o projeto

### API

No diretório raiz do projeto:

`$ cd server`

`$ docker-compose build`

`$ docker-compose up`

Os comandos acima criam uma instância local do **MongoDB** e populam automaticamente a collection ***products*** com dados pré cadastrados no servidor.

A rota principal da API ficará disponível em: `http://localhost:4000/graphql`


Também ficará disponível uma sessão do **adminMongo** para visualização do banco de dados:
 `http://localhost:8082`

Nesta página, basta dar um nome qualquer para a conexão e digitar no campo **connection string**: `mongodb://mongo/shoppingcartdb`


### Client
Com o servidor rodando e estando no diretório raiz do projeto:

`$ cd client`

`$ npm start`

A página inicial da aplicação será iniciada em: `http://localhost:3000`
