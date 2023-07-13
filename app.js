const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs')
const app = express();
const port = 3000;

// Configurações
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(bodyParser.urlencoded({ extended: true }));

// rotas
const indexRouter = require('./routes/index');
app.use('/', indexRouter);

//servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
