const express = require("express");
const path = require("path");
const router = require("./routes");

const server = express();

server.set("view engine", "ejs");
server.set("views", path.join(__dirname, "views"));

// Config para ler dados do formulário;
server.use(express.urlencoded({ extended: true }));

// => Acesso direto aos arquivo 'public'
server.use(express.static("public"));

// !! ==> Rotas do server. 
server.use(router);

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`Servidor rodando Perfeitamente: http://localhost:${PORT}/`);
});
