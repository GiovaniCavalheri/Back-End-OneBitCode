// ==> Obter as informações do Sistema
const os = require("node:os");

// ==> Salvar o arquivo "log"
const fs = require("node:fs");

// ==> Lidar com caminhos do Sistema de arquivos, de forma segura.
const path = require("node:path");

const SystemPlataformMap = {
  win32: "Windows",
  linux: "Linux",
  darwin: "MacOS",
  freebsd: "FreeBSD",
};

function getSystemInfo() {
  const system = SystemPlataformMap[os.platform()];
  const arch = os.arch();
  const cpu = os.cpus()[0].model;

  const uptimeDays = Math.floor(os.uptime() / 60 / 60 / 24);
  const uptimeDaysInSeconds = uptimeDays * 24 * 60 * 60;

  const uptimeHours = Math.floor((os.uptime() - uptimeDaysInSeconds) / 60 / 60);
  const uptimeHoursInSeconds = uptimeHours * 60 * 60;

  const uptimeMins = Math.floor(
    (os.uptime() - uptimeDaysInSeconds - uptimeHoursInSeconds) / 60
  );
  const uptimeMinsInSeconds = uptimeMins * 60;

  const uptimeSecs = Math.floor(
    os.uptime() -
      uptimeDaysInSeconds -
      uptimeHoursInSeconds -
      uptimeMinsInSeconds
  );

  const uptime = `${uptimeDays}:${uptimeHours}:${uptimeMins}:${uptimeSecs}`;

  const ramTotal = os.totalmem() / 1024 / 1024 / 1024;
  const ramUsage = (os.totalmem() - os.freemem()) / 1024 / 1024 / 1024;
  const ramUsagePercent = Math.round((ramUsage / ramTotal) * 100);

  return { system, arch, cpu, uptime, ramUsage, ramTotal, ramUsagePercent };
}

// ==> Função que vai exibir no console as informações do SO;
function printLog({
  system,
  arch,
  cpu,
  uptime,
  ramUsage,
  ramTotal,
  ramUsagePercent,
}) {
  console.clear();
  console.log(" --- Detalhes do Sistema ---");
  console.log(` Sistema Operacional: ${system}`);
  console.log(` Arquitetura do Sistema: ${arch} `);
  console.log(` Modelo do Processador: ${cpu}`);
  console.log(`Tempo de Atividade do Sistema: ${uptime}`);
  console.log(
    `Uso de Memória RAM: ${ramUsage.toFixed(2)} GB / ${ramTotal.toFixed(
      2
    )} GB (${ramUsagePercent} %)`
  );
}

function saveLog({
  system,
  arch,
  cpu,
  uptime,
  ramUsage,
  ramTotal,
  ramUsagePercent,
}) {
  const log = `--- Detalhes do Sistema --- |   Sistema Operacional: ${system} | Arquitetura do Sistema: ${arch} |  Modelo do Processador: ${cpu} | Tempo de Atividade do Sistema: ${uptime} | Uso de Memória RAM: ${ramUsage.toFixed(2)} GB / ${ramTotal.toFixed(
      2
    )} GB (${ramUsagePercent} %)`;

    const logdir = path.join("/" , "log"); 

    if(!fs.existsSync(logdir)) {
      fs.mkdirSync(logdir); 
    }

    const logPath = path.join(logdir, "log.txt");
    fs.appendFileSync(logPath, log);
}



setInterval(() => {
  const systemInfo = getSystemInfo()
  printLog(systemInfo);
  saveLog(systemInfo);
}, 1000);
// ==> Função para salvar as informações no arquivo "Log";
