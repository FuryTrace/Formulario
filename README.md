# Formulário – Média do Aluno

Aplicação simples em Node.js (Express) que recebe o nome do aluno e duas notas, calcula a média e exibe a situação conforme a regra:

- Aprovado: média >= 6
- Exame Final: 2 <= média < 6
- Reprovado: média < 2

## Como executar

Pré-requisitos: Node.js instalado.

1. Instale as dependências
   
	- No VS Code, abra o terminal e rode:
   
	npm install

2. Inicie o servidor

	npm start

3. Acesse no navegador

	http://localhost:3000

## Participantes da equipe

- William César da Silva Rodrigues

## Estrutura

- `server.js`: servidor Express e regra de negócio
- `pagina/index.html`: formulário
- `pagina/style.css`: estilos