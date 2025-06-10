# SmartFireWatch API

API oficial do sistema **SmartFireWatch**, parte do TCC de Engenharia da Computação. Esta versão utiliza **Node.js** com **SQLite** para armazenamento local de incidentes e logs de incêndio.

## 🚒 Funcionalidades

- Registro de incidentes com imagem base64
- Consulta de incidentes
- Marcação de incidentes como resolvidos
- Registro de logs operacionais
- Banco de dados leve com SQLite

## 🔧 Tecnologias Utilizadas

- **Node.js** com **Express**
- **SQLite** para armazenamento
- **Dotenv** para variáveis de ambiente
- **Body-parser** para requisições JSON

## ▶️ Como executar localmente

1. Instale as dependências:

```bash
npm install
```

2. Crie um arquivo `.env` com as variáveis necessárias (se aplicável):

```env
PORT=3000
```

3. Execute o servidor:

```bash
node app.js
```

> O banco de dados `database.sqlite` será utilizado/localizado na raiz do projeto.

## 🔒 Endpoints Disponíveis

| Método | Rota               | Descrição                         |
|--------|--------------------|-----------------------------------|
| POST   | /incidents         | Registra um novo incidente        |
| GET    | /incidents         | Lista todos os incidentes         |
| PATCH  | /incidents/:id     | Marca incidente como resolvido    |
| DELETE | /incidents/:id     | Remove um incidente               |
| POST   | /logs              | Registra um novo log              |
| GET    | /logs              | Lista todos os logs               |

> A estrutura dos dados pode variar conforme o `app.js`. Verifique o corpo esperado nas rotas ao testar.

## 🗃️ Estrutura do Projeto

```
api-smart-fire-watch/
├── .env
├── .gitignore
├── app.js
├── database.sqlite
├── package-lock.json
└── README.md
```

## 🧪 Funcionalidades Futuras

- Autenticação JWT
- Filtros e paginação por status e data
- Dashboard web
- Integração com APIs externas (ex: alertas)



---

Esta API é parte integrante do sistema **SmartFireWatch**, que visa a prevenção de incêndios com uso de inteligência artificial, câmeras e resposta em tempo real.