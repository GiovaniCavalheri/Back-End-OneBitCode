const os = require("node:os");

// ==> Qual é o sistema que está utilizando; 
const plataform = os.platform()
console.log("Plataforma do SO: ", plataform);

// ==> Arquitetura do SO
const arch = os.arch() 
console.log("Arquitetura do SO: ", arch);

// ==> Nucleos
const processadores = os.cpus()
console.log("Informações da CPU: ", processadores);

//==> Retorna a quantidade total de memória do sistema em bytes.
const memoria = os.totalmem()
console.log("Total de Memoria do PC: ", memoria / 1024 / 1024 / 1024);

const versao = os.version()
console.log("Versao: ", versao);