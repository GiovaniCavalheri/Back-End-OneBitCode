const fs = require("node:fs"); // Manipulação de arquivos
const path = require("node:path"); // Manipulação de caminhos
const readLine = require("node:readline");


function escapeHtmlSpecialCharacters(text) {
  // Substitui todos os caracteres <, > e & encontrados no texto
  return text.replace(/[<>&]/g, (match) => {
    switch (match) {
      case "<":
        return "&lt"; 
      case ">":
        return "&gt"; 
      case "&":
        return "&amp"; 
      default:
        return match; 
    }
  });
}

// -----------------------------------------------------
// Função lê um arquivo HTML. 
// aplica a conversão de caracteres especiais,
// e grava o resultado em um novo arquivo.
// -----------------------------------------------------

function escapeHtmlFile(inputFilePath, outputFilePath) {
  try {
    // Lê o conteúdo do arquivo de entrada (modo texto)
    const fileContent = fs.readFileSync(inputFilePath, "utf-8");

    // Escapa os caracteres especiais chamando a função anterior
    const escapedContent = escapeHtmlSpecialCharacters(fileContent);

    // Grava o conteúdo já escapado no novo arquivo
    fs.writeFileSync(outputFilePath, escapedContent, "utf-8");

    // Exibe mensagem de sucesso no console
    console.log(` Arquivo escapado com sucesso: ${outputFilePath}`);
  } catch (error) {
    // Caso algo dê errado (ex: arquivo não existe), mostra o erro e encerra o processo
    console.log("Erro ao processar arquivo:", error.message);
    process.exit(1);
  }
}