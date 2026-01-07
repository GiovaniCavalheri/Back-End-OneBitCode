const express = require("express");
const gamesControllers = require("./src/controllers/games-controllers");
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Hello, World!" }); 
});


app.get("/games", gamesControllers.index)
app.get("/games/:id", gamesControllers.show)
app.post("/games", gamesControllers.save)
app.post("/games/:id/genres", gamesControllers.addGenre);
app.put("/games/:id", gamesControllers.update)
app.delete("/games/:id", gamesControllers.delete)
app.delete("/games/:id/genres/:name",gamesControllers.removeGenre);

const PORT = 3000;
appSs.listen(PORT, () =>
  console.log(`Servidor rodando Perfeitamente: http://localhost:${PORT}/`)
);

