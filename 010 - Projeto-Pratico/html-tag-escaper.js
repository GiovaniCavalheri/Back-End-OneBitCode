const { match } = require("node:assert");
const fs = require("node:fs");
const path = require("node:path");
const readLine = require("node:readline");

function escapeHtmlSpecialCharacters(text) {
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

function escapeHtmlFile(inputFilePath, outputFilePath) {
    try {
        const fileContent = fs.readFileSync(inputFilePath, "utf-8");
        const escapedContent = escapeHtmlSpecialCharacters(fileContent);
        fs.writeFileSync(outputFilePath, escapedContent, "utf-8");
        console.log(` Arquivo Escapado com Sucesso: ${outputFilePath}`);
    } catch (error) {
        console.log("Error", error.message);
        process.exit(1);
    }
}


function askFilePath(question) {
  const rl = readLine.createInterface({ input: process.stdin, output: process. })
}