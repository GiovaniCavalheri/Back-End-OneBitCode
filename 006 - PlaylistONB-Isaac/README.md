1 ==> Instalando as dependências
code: npm install init -y 

2 ==> Intalando o Express, para codificar nossa API
code: npm i express

3 ==> Criando o SRC/Server.js

## 🎓 Fluxo de Pensamento

### Para CRIAR um Recurso (POST):
```
1. Receber dados do body
2. Validar TODOS os campos obrigatórios
3. Validar TIPOS dos dados
4. Criar objeto novo
5. Adicionar no array
6. Retornar 201 + objeto criado
```

### Para BUSCAR um Recurso (GET):
```
1. Receber ID dos params
2. Buscar no array (find ou findIndex)
3. Verificar se encontrou
   └─ Não encontrou? → 404
   └─ Encontrou? → 200 + objeto
```

### Para ATUALIZAR um Recurso (PUT):
```
1. Receber ID dos params
2. Receber dados do body
3. Buscar no array
4. Verificar se encontrou → 404 se não
5. Validar campos enviados
6. Atualizar APENAS campos válidos
7. Retornar 200 + objeto atualizado
```

### Para DELETAR um Recurso (DELETE):
```
1. Receber ID dos params
2. Buscar índice no array (findIndex)
3. Verificar se encontrou → 404 se não
4. Remover com splice
5. Retornar 204 (sem body)



❌ Evite:
Criar objetos antes de validar
Esquecer o return nos erros
Confundir find() com findIndex()
Usar typeof para arrays (use Array.isArray())
Não validar se o recurso existe