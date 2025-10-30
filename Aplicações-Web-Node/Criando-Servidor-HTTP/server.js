const http = require("node:http");

const server = http.createServer((Request, Response) => {
//   console.log(Request);
//   Response.writeHead(200);
//   Response.write("Servidor HTTP em Node.JS funcionando;");
//   Response.end();


    const path = request.url()

    switch (path) {
        case '/':
            Response.writHead(200); 
            Response.write("Você está ná Página inicial");
            break;
        case '/artigos': 
            Response.writeHead(200); 
            Response.write('Você está na página de artigos.')
            break;
        default:
            Response._writeHead(404);
            Response.write('Archive not Found.')
            break;
    }

    Response.end();
});

const PORT = 3002;

// ==> Método para ficar "ouvindo", na porta 3000;
server.listen(PORT, () => {
  console.log(`Sucesso, servidor rodando em http://localhost:${PORT}/`);
});
