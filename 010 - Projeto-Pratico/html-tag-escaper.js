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

function askFilePath(question) {
  const rl = readLine.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promisse((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
      rl.close();
    });
  });
}

async function userInteraction() {
  // node html-escaper.js <inputPath> <outputPath>
  let inputPath = process.argv[2];
  if (!inputPath) {
    inputPath = await askFilePath("Informe o caminho do arquivo de entrada: ");
  }
  inputPath = path.resolve(inputPath);

  const defaultName = `escaped_${path.basename(inputPath)}.txt`;
  const answer = await askFilePath(
    `Informe o caminho do arquivo de sída (padrão: ${defaultName}): `
  );
  let outputPath = answer.length > 0 ? answer : defaultName;
  outputPath = path.resolve(outputPath);

  escapeHtmlFile(inputPath, outputPath);
}

function run() {
  if (process.argv.length >= 4) {
    escapeHtmlFile(
      path.resolve(process.argv[2]),
      path.resolve(process.argv[3])
    );
  } else {
    console.log("---------------------");
    console.log("HTML Tag Escaper v1.0");
    console.log("---------------------\n");
    console.log(
      "Argumentos não informados! Por favor, informe os caminhos dos arquivos para realizar o escape."
    );
    userInteraction();
  }
}
