import { error } from "node:console";
import fs from "node:fs";
import deflate from "node:zlib";


function readArq() {
    try {
    const data = fs.readFile("meuarquivo.txt", 'utf-8', (error, data) => {
        console.log(data);
    }) 
} catch (error) {
     console.log("Erro ao ler o arquivo: ", error.message);
}
}


export default readArq; 