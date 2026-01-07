const express = require("express");
const path = require("path");


const routes = express();

routes.set("view engine", "ejs");
routes.set("views", path.join(__dirname, "views"));


routes.use(express.static("public"));
routes.use(express.urlencoded({ extended: true }));

// Array para armazenar os e-mails em memória
let emails = [];

// Rota para a página principal
routes.get("/", (req, res) => {
  res.render("index");
});

// Rota para lidar com o cadastro de e-mails
routes.post("/signup", (req, res) => {
  const { email } = req.body;

  if (email) {
    emails.push(email);
    res.redirect("/success");
  } else {
    res.redirect("/");
  }
});

// Rota para a página de sucesso após o cadastro
routes.get("/success", (req, res) => {
  res.render("success");
});

// Rota para a página de visualização dos e-mails cadastrados
routes.get("/emails", (req, res) => {
  res.render("emails", { emails: emails });
});

// Rota para excluir um e-mail da lista
routes.post("/emails/delete", (req, res) => {
  const { email } = req.body;
  emails = emails.filter((item) => item !== email);
  res.redirect("/emails");
});

// Inicialização do servidor
const PORT = 3000;
routes.listen(PORT, () => {
  console.log(`Servidor rodando Perfeitamente: http://localhost:${PORT}/`);
});
