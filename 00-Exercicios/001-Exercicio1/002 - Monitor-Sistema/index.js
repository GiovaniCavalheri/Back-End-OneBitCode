const os = require("node:os");
const fs = require("node:fs");
const path = require("node:path");

function viewData() {
  setInterval(() => {
    const version = os.version();
    const arch = os.arch();
    const model = os.cpus()[0].model;
    const timeSO = os.uptime();
    const memory = os.freemem();
    const totalMemory = os.totalmem();
    const usedMemory = totalMemory - memory;

    const data = `Mostrando informações do Sistema:
Versão do Sistema Operacional: ${version}
Arquitetura do SO: ${arch}
Modelo do Processador: ${model}
Tempo de Atividade do Sistema (em minutos): ${(timeSO / 60).toFixed(2)}
Uso de Memória: ${(usedMemory / 1024 / 1024 / 1024).toFixed(2)} GB
-------------------------------
`;

    createFile(data);
  }, 1000);
}

function createFile(data) {
  return new Promise((resolve, reject) => {
    const logDir = path.join(__dirname, "log");
    const filePath = path.join(logDir, "log.txt");

    if (!fs.existsSync(logDir)) {
      console.log(`A pasta ${logDir} não existe. Criando...`);
      fs.mkdirSync(logDir);
    }

    fs.appendFile(filePath, data, (error) => {
      if (error) {
        reject(error.message);
      } else {
        resolve();
      }
    });
  });
}

viewData();
