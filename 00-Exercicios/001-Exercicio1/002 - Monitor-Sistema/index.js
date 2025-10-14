const os = require("node:os");
const fs = require("node:fs");
const path = require("node:path");
const { time, log } = require("node:console");
const { rejects } = require("node:assert");
const { text } = require("node:stream/consumers");

function viewData() {
  setInterval(() => {
    const version = os.version();

    const arch = os.arch();

    const model = os.cpus()[0].model;

    const timeSO = os.uptime();

    const memory = os.freemem();

    const totalMemory = os.totalmem();

    const usedMemory = totalMemory - memory;

    function createFile(text) {
      return new Promise((resolve, reject) => {
        const logDir = path.join(__dirname, "log"); // Pasta 'log' no diretório atual
        const filePath = path.join(logDir, "log.txt"); // Caminho completo do arquivo

        if (fs.existsSync(logDir)) {
          console.log(`A pasta ${logDir} existe.`);
        } else {
          console.log(`A pasta ${logDir} não existe.`);
          fs.mkdir(logDir);
        }

        fs.appendFile(filePath, text, (error) => {
          if (error) {
            reject(error.message);
          } else {
            resolve();
          }
        });
      });
    }

    console.log(
      `Mostrando infomações do Sistema: \n Versão do Sistema Operacional: ${version}\n Arquitetura do SO: ${arch}\n Modelo do Processador: ${model}\n Tempo de Atividade do Sistema(Em Minutos):  ${
        timeSO / 60
      }\n Uso de Memória: ${usedMemory / 1024 / 1024 / 1024} GB; \n`
    );
    
  }, 1000);
}


viewData()