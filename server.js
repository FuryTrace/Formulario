const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Servir arquivos estáticos da pasta pagina
app.use(express.static(path.join(__dirname, 'pagina')));

// Regra de negócio encapsulada
function calcularSituacao(media) {
  if (media >= 6) return 'Aprovado';
  if (media >= 2 && media < 6) return 'Exame Final';
  return 'Reprovado';
}

// Rota POST para calcular a média e retornar o resultado
app.post('/calcular', (req, res) => {
  const nome = (req.body.nome || '').toString().trim();
  const nota1 = parseFloat(req.body.nota1);
  const nota2 = parseFloat(req.body.nota2);

  // Validações básicas
  const erros = [];
  if (!nome) erros.push('Nome é obrigatório.');
  if (Number.isNaN(nota1)) erros.push('Nota 1 inválida.');
  if (Number.isNaN(nota2)) erros.push('Nota 2 inválida.');
  const notasDentroFaixa =
    !Number.isNaN(nota1) && nota1 >= 0 && nota1 <= 10 &&
    !Number.isNaN(nota2) && nota2 >= 0 && nota2 <= 10;
  if (!notasDentroFaixa) erros.push('As notas devem estar entre 0 e 10.');

  if (erros.length > 0) {
    return res.status(400).send(`<!doctype html>
      <html lang="pt-br">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Erro de validação</title>
        <link rel="stylesheet" href="/style.css" />
      </head>
      <body>
        <main class="container">
          <h1>Erro de validação</h1>
          <ul class="erros">${erros.map(e => `<li>${e}</li>`).join('')}</ul>
          <a class="btn" href="/">Voltar ao formulário</a>
        </main>
      </body>
      </html>`);
  }

  const media = Number(((nota1 + nota2) / 2).toFixed(2));
  const situacao = calcularSituacao(media);

  return res.send(`<!doctype html>
    <html lang="pt-br">
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>Resultado</title>
      <link rel="stylesheet" href="/style.css" />
    </head>
    <body>
      <main class="container">
        <h1>Resultado</h1>
        <table class="tabela">
          <tbody>
            <tr><th>Nome</th><td>${nome}</td></tr>
            <tr><th>Nota 1</th><td>${nota1}</td></tr>
            <tr><th>Nota 2</th><td>${nota2}</td></tr>
            <tr><th>Média</th><td>${media}</td></tr>
            <tr><th>Situação</th><td class="situacao ${situacao.replace(/\s/g,'-').toLowerCase()}">${situacao}</td></tr>
          </tbody>
        </table>
        <a class="btn" href="/">Calcular novamente</a>
      </main>
    </body>
    </html>`);
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
