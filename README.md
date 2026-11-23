# Backend Template

A Fastify and Prisma starter for REST APIs with file-based routing.

The project exposes a small blog API (articles, categories, users, comments) on top of PostgreSQL. It serves as a starting point for new backends: routes are loaded from the folder tree, the environment is validated with Zod, and the API is documented through OpenAPI and Scalar.

## Table of contents

- [Backend Template](#backend-template)
	- [Table of contents](#table-of-contents)
	- [How it works](#how-it-works)
	- [Tech stack](#tech-stack)
	- [Repository structure](#repository-structure)
	- [Prerequisites](#prerequisites)
	- [Installation](#installation)
	- [Configuration](#configuration)
	- [Running locally](#running-locally)
	- [Useful scripts](#useful-scripts)
	- [API](#api)
	- [Tests and quality](#tests-and-quality)
	- [License](#license)

## How it works

1. **Startup**: `src/start/server.ts` creates the Fastify instance, registers Swagger and Scalar, loads the routes, then listens on `PORT`.
2. **Environment**: `src/start/env.ts` loads `.env` and validates it with Zod. The server stops if a variable is missing.
3. **Routing**: the autoloader walks `src/routes`. The file name gives the HTTP method (`get.ts` is `GET`) and the folder path gives the URL, where `[id]` becomes the `:id` parameter. Each file exports a `handler` and a `schema`.
4. **Data access**: handlers query PostgreSQL through a Prisma client singleton (`src/start/prisma.ts`).
5. **Documentation**: the route schemas feed `@fastify/swagger`, and Scalar renders the result at `/scalar`.
6. **Seeding**: `prisma:migrate` applies the migrations, then runs a seeder that wipes the tables and fills them with fake users, categories, articles and comments.

## Tech stack

| Layer | Technologies |
| --- | --- |
| Backend | Node.js, Fastify 5, TypeScript, Zod, `@fastify/one-line-logger` |
| Data | PostgreSQL, Prisma 5, `@faker-js/faker` (seed data) |
| API docs | `@fastify/swagger`, Scalar (`@scalar/fastify-api-reference`) |
| Tooling | pnpm, `@swc-node/register`, nodemon, ESLint, `tsconfig-paths` |

## Repository structure

```
.
├── .vscode/                 Editor settings, snippets and file templates
├── src/
│   ├── config/              Logger, Swagger and Scalar options
│   ├── openapi/             Shared OpenAPI schemas
│   ├── prisma/
│   │   ├── migrations/      SQL migrations
│   │   ├── schema/          Prisma models, one file per model
│   │   └── seeder/          Seed scripts
│   ├── routes/              HTTP routes, loaded from the folder tree
│   ├── start/               Server, environment, Prisma client, route autoloader
│   └── utils/               Pagination and helper functions
├── .env.example             Environment variable template
├── .eslintrc.json           ESLint configuration
├── package.json
└── tsconfig.json
```

The `#/` import alias points to `src/`. Prisma uses the `prismaSchemaFolder` preview feature: models are split in `src/prisma/schema`, configured through the `prisma.schema` field of `package.json`.

Routes follow the folder convention described above. For example, `routes/articles/[id]/get.ts` exposes `GET /articles/:id`.

## Prerequisites

- [Node.js](https://nodejs.org/) (the project uses the `@types/node` 22 typings)
- [pnpm](https://pnpm.io/) (`npm install -g pnpm`)
- A PostgreSQL instance

You can start PostgreSQL quickly with Docker:

```bash
docker run -d --name backend-template-db -e POSTGRES_USER=user -e POSTGRES_PASSWORD=password -e POSTGRES_DB=database -p 5432:5432 postgres
```

## Installation

```bash
git clone git@github.com:maxencebonamy/Backend-Template.git
cd Backend-Template
pnpm install
```

Generate the Prisma client:

```bash
pnpm prisma:generate
```

## Configuration

Copy the example file and fill in the values.

```bash
cp .env.example .env
```

| Variable | Description | Example |
| --- | --- | --- |
| `DATABASE_URL` | PostgreSQL connection URL | `postgresql://user:password@localhost:5432/database` |
| `PORT` | Listening port | `8000` |

## Running locally

Apply the migrations and seed the database. The seeder deletes all existing rows first.

```bash
pnpm prisma:migrate
```

Start the server with automatic reload:

```bash
pnpm dev
```

- API: <http://localhost:8000>
- Documentation: <http://localhost:8000/scalar>

To run without reload, use `pnpm start`.

## Useful scripts

| Command | Effect |
| --- | --- |
| `pnpm dev` | Start the server with nodemon |
| `pnpm start` | Start the server |
| `pnpm lint` | Lint `src` |
| `pnpm lint:fix` | Lint `src` with auto-fix |
| `pnpm ts:check` | Type-check without emitting files |
| `pnpm prisma:generate` | Regenerate the Prisma client |
| `pnpm prisma:migrate` | Create and apply a migration, then run the seeder |

## API

The OpenAPI documentation is available at `/scalar` when the server runs.

| Method | Route | Description |
| --- | --- | --- |
| `GET` | `/articles` | List articles, with pagination, search, author and category filters |
| `GET` | `/articles/{id}` | Article details |
| `DELETE` | `/articles/{id}` | Delete an article |
| `GET` | `/categories` | List categories |
| `GET` | `/categories/{id}` | Category details |

## Tests and quality

The project has no automated tests.

```bash
pnpm lint
pnpm ts:check
```

ESLint uses the `@maxencebonamy/eslint-plugin` presets (`base` and `typescript`).

## License

This project is licensed under the [MIT License](LICENSE).
