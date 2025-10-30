const fs = require("node:fs");

const content = "Conteudo novo arquivo assincrono"; 

fs.writeFile("./arquivo.txt", content, "utf-8", (error) => {
    if(error) {
        console.log("Erro ao escrever o arquivo: ", error.message);
        return
    }
    console.log("Arquivo criado com sucesso. ");
});

// try {
//     fs.writeFileSync("./arquivo.txt", "Olá, Mundo!", "utf-8");
//     console.log("Arquivo criado com sucesso!");
// } catch (error) {
//     console.log("Erro ao escrever o arquivo: ", error.message);
// }