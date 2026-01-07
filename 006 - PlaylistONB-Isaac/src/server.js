const express = require("express");
const playlistsRouter = require("./routes");
const app = express();

app.use(express.json());

app.use("/api/playlists", playlistsRouter);

// ==> Criando uma PORTA
const PORT = 3000;
app.listen(PORT, () =>
  console.log(`Servidor rodando Perfeitamente: http://localhost:${PORT}/`)
);
