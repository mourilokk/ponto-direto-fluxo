# Projeto Full Stack - React + Django

Este projeto utiliza **React + TypeScript** no front-end e **Django** no back-end. Siga as instruções abaixo para rodar ambos os servidores localmente em sua máquina.

---

## Pré-requisitos

- [Node.js](https://nodejs.org/) instalado
- [Python 3.8+](https://www.python.org/downloads/) instalado
- Git (opcional, para clonar o repositório)

## Como Rodar o Projeto

Você precisará abrir **duas abas do terminal** (CMD ou outro terminal de sua preferência): uma para o front-end e outra para o back-end.

---

## Rodando o Front-end (React)
Certifique-se que você esteja na pasta correspondente no seu prompt de comando (CMD). Por exemplo: se baixou o arquivo na pasta Downloads, seu caminho será algo como:

C:/Users/Downloads

Digite o comando: cd ponto-direto-fluxo

C:/Users/Downloads/ponto-direto-fluxo

1. Abra seu prompt de comando (CMD) e digite o comando: cd ponto-direto-fluxo
2. Baixe as dependências: npm i
3. Rode o servidor: npm run dev
4. Utilize a URL disponibilizada no seu navegador: localhost:8080

## Rodando o Back-end (Python)
1. Abra seu prompt de comando (CMD) e digite o comando: cd ponto-direto-fluxo
2. Crie um ambiente virtual (boa prática), digite o comando: python -m venv venv
3. Ative seu ambiente virtual: venv/Scripts/activate
4. Baixe as dependências com o comando: pip install -r requirements.txt
5. Execute as migrações com o comando: python manage.py migrate
6. Rode o servidor: python manage.py runserver
7. Utilize a URL disponibilizada no seu navegador: localhost:8000

Para acessar o painel de administração, entre na URL: localhost:8000/admin

Usuário: teste
Senha: teste123
