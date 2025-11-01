const express = require("express");

const path = require("node:path");

const server = express();

// ==> Registra emails cadastrados;
let emailsUsers = [];

server.set("view engine", "ejs");
server.set("views", path.join(__dirname, "views"));

server.use(express.urlencoded({ extended: true }));

server.get("/", (req, res) => {
  res.render("FormRegister", {
    title: "Homepage de Registros de Email",
    message: "Preencha por favor os requisitos abaixo: ",
  });
});

server.post("/register", (req, res) => {
  const emailUser = req.body.email;
  const password = req.body.password;

  emailsUsers.push({ emailUser, password });

  res.redirect("/usuarios");
});

server.get("/usuarios", (req, res) => {
  res.render("PageSucess", { emails: emailsUsers });
});

server.get("/allemails", (req, res) => {
  res.render("All-Emails", { emailsUsers: emailsUsers });
});
const PORT = 3000;

server.listen(PORT, () => {
  console.log(`Servidor rodando Perfeitamente: http://localhost:${PORT}/`);
});
