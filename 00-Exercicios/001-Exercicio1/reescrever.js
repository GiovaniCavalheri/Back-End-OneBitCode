import fs from "node:fs";
import deflate from "node:zlib";

const novoTexto = "Conteúdo modificado!";

function reescreverArquivo() {
  fs.writeFile("meuarquivo.txt", novoTexto, "utf-8", (error) => {
    if (error) {
      console.log("Erro ao reescrever o arquivo:", error.message);
      return;
    }
    console.log("Arquivo reescrito com sucesso!");
  });
}

export default reescreverArquivo;
