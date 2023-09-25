## ADMIN Laravel Test (Teste Fullstack para Miner Tecnologia)

ADMIN Laravel Test é um projeto teste desenvolvido em PHP com framework Laravel 10. Para UI foi utilizado React TailAdmin. Esse teste para vaga fullstack na empresa Miner Tecnologia, foi desenvolvido um sistemas de usuários com níveis ADMIN e DEFAULT e permissões individuais para usuários: Produtos, Categorias e Marcas.

## Requerimentos para instalação

* PHP (8.2)
* Node (18.18)
* Database (MySQL)
* Web Server (Nginx)

---

* Documentação [Laravel 10](https://laravel.com/docs/10.x)
* Documentação [TailAdmin](https://github.com/TailAdmin/free-react-tailwind-admin-dashboard)

### Features

#### 1 - Autenticação
**1.1. Login Admin**

#### 2 - Usuários
**2.1. Listagem de usuários**
**2.2. Paginação de usuários**
**2.3. Cadastro de funcionários**
**2.4. Edição de usuários**
**2.6. Exclusão de funcionário**

#### 3 - Permissões
**3.1. Edição de permissão na tela usuários**
**3.2. Edição de permissão na tela listar usuários**

#### 4 - Produtos
**4.1. Listagem de produtos**

#### 5 - Categorias
**5.1. Listagem de categorias**

#### 6 - Marcas
**6.1. Listagem de marcas**

---

### Banco de dados

O projeto tem migrations com a seguinte estrutura:

Tabela - `users`

```
id:                  int
name:      string
role:              enum('ADMIN', 'DEFAULT')
email:              string
created_at :       timestamp
updated_at :     timestamp
```

Tabela - `permissions `

```
id:                  int
idUser:      int
permission :              enum('MARCAS ', 'PRODUTOS ','CATEGORIAS')
created_at :       timestamp
updated_at :     timestamp
```

Tabela - `produtos  `

```
id:                  int
idMarca:      int
idCategoria:      int
title :             string
created_at :       timestamp
updated_at :     timestamp
```

Tabela - `categorias  `

```
id:                  int
title :             string
created_at :       timestamp
updated_at :     timestamp
```

Tabela - `marcas  `

```
id:                  int
title :             string
created_at :       timestamp
updated_at :     timestamp
```
---

## Instalação

* Instale o [Composer](https://getcomposer.org/download) e [Npm](https://nodejs.org/en/download)
* Clone o repositório: <br />
`LINK REPOSITORIO`
* Entre na pasta criada pelo git
* Crie um arquivo .env e configure as variaveis de ambiente e de banco de dados, use de exemplo o arquivo `.env.example`
* Instale as dependencias do projeto PHP: `composer install`
* Gere a chave laravel `php artisan key:generate`
* Rode as migrations `php artisan migrate`
* Rode os sedeers `php artisan db:seed`
* Instale as dependencias node: `npm install`
* Gera arquivos node: `npm run build`

## Úteis

### Acesso administrador padrão
```plain
login: admin@email.com
senha: changeme
```

## Licença

O projeto está vinculado a licença [MIT](https://opensource.org/licenses/MIT).
