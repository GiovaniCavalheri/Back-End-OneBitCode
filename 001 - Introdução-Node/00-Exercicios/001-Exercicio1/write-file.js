import fs from "node:fs";
import deflate from "node:zlib";

const conteudo =
  "Conteúdo inicial do arquivo.\nCriado com o módulo fs do Node.js.\nFim";

function write() {
  fs.writeFile("meuarquivo.txt", conteudo, "utf-8", (error) => {
    if (error) {
      console.log("Erro ao escrever o arquivo!", error.message);
      return;
    }
  });
}

export default write;
