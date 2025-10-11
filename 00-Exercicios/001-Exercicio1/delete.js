import fs from "node:fs";
import deflate from "node:zlib";

function deleteArq() {
  fs.unlink("meuarquivo.txt", (error) => {
    if (error) {
      console.log("Erro ao Excluir o Arquivo!!");
      return;
    }
    console.log("Arquivo removido com sucesso.");
  });
}

export default deleteArq;
