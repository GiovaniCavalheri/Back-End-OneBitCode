const express = require("express")

const app = express();

const PORT = 3000;

app.use(express.static("public"));

app.get("/", (request, response) => {
  response.sendFile(__dirname + "/views/index.html");
});

app.listen(PORT, () => {
  console.log(` Servidor Express rodando na Porta: http://localhost:${PORT}/`);
});
