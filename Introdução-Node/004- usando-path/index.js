const path = require("node:path");

const dir = "src";
const file = "app.js";

const fullPath = path.join(__dirname);

// const relativePath = path.join(".", dir, file);

console.log(fullPath);
console.log(relativePath);


// const path = require("node:path");
// O módulo path é nativo do Node.js.
// ==> Ele serve para manipular caminhos de arquivos e pastas de forma segura e compatível com qualquer sistema operacional.

// ==> Principais métodos do path
// path.join();
// ==> Junta várias partes de um caminho (como pastas e arquivos).
// Exemplo: path.join("src", "app.js"); // → src/app.js

// path.resolve()
// ==> Cria um caminho absoluto (completo desde a raiz).
// Resolve referências como .. (voltar uma pasta).
// path.resolve("../arquivos/relatorio.pdf");
// // → C:\Users\Giovani\arquivos\relatorio.pdf (no Windows)

// path.basename()
// ==> Retorna o nome do arquivo (última parte do caminho).
// path.basename("../arquivos/relatorio.pdf");
// // → relatorio.pdf

// path.dirname()
// ==> Retorna o diretório pai (sem o arquivo).
// Exemplo: path.dirname("/home/user/app.js");
// // → /home/user

// path.extname()
// ==> Retorna a extensão do arquivo (como .js, .txt, .pdf).
// Exemplo:
// path.extname("relatorio.pdf");
// // → .pdf

