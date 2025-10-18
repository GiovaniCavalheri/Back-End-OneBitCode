// const args = process.argv.slice(2);
// console.log("Argumentos informados:", args);

// ==> O slice() é um método que copia uma parte de um array ou string sem modificar o original.

const namedArguments = {};

process.argv.forEach((arg, index, array) => {
  if (arg.startsWith("--")) {
    const argName = arg.slice(2); // retira o " -- " 
    const argValue = array[index + 1];
    namedArguments[argName] = argValue;
  }
});

console.log("Argumentos Informados: ");
console.log(namedArguments);
