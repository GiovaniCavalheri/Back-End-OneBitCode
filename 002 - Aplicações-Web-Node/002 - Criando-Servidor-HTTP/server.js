const http = require("node:http");
//   console.log(Request);
//   Response.writeHead(200);
//   Response.write("Servidor HTTP em Node.JS funcionando;");
//   Response.end();

const server = http.createServer((request, response) => {
  const path = request.url;

  switch (path) {
    case "/":
      response.writeHead(200);
      response.write("Você está na página inicial!");
      break;
    case "/artigos":
      response.writeHead(200);
      response.write('Você está na página "artigos"!');
      break;
    default:
      response.writeHead(404);
      response.write("Caminho não encontrado!");
      break;
  }

  response.end();
});

const PORT = 3002;

// ==> Método para ficar "ouvindo", na porta 3000;
server.listen(PORT, () => {
  console.log(`Sucesso, servidor rodando em http://localhost:${PORT}/`);
});
