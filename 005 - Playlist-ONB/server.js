const express = require("express");
const controllerPlaylist = require("./src/controllers/playlist-controller");
const appService = express();
appService.use(express.json());

appService.get("/", (req, res) => {
  res.send("API de Playlists funcionando!");
});

// ==> ALL Playlists
appService.get("/playlists", controllerPlaylist.allPlaylists)

// ==> Buscar pelo id
appService.get("/playlists/:id", controllerPlaylist.searchID);

//==> Criar nova playlist
appService.post("/playlists", controllerPlaylist.create);

// ==> Atualizar dados playlist
appService.put("/playlists/:id", controllerPlaylist.updatePlaylist); 

// ==> Deletar playlist
appService.delete("/playlists/:id", controllerPlaylist.deletePlaylist);

// ==> ADD music playlist 
appService.post("/playlists/:id/musicas", controllerPlaylist.addMusicPlaylist)

// ==> Remove musica da playlist
appService.delete("/playlists/:id/musicas/:musicaIndex", controllerPlaylist.deleteMusicPlaylist);

const PORT = 3000;
appService.listen(PORT, () =>
  console.log(`Servidor rodando Perfeitamente: http://localhost:${PORT}/`)
);

