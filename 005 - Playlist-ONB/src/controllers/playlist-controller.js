const playlists = [
  {
    id: 1,
    name: "Musicas para Estudos - 2026",
    tags: ["calmaria", "instrumental", "foco"],
    musicas: [
      {
        title: "The Days - Notion Remix",
        year: 2020,
        artist: "LucidDreams",
        album: "Days For Live - Notion",
      },
    ],
  },

  {
    id: 2,
    name: "Musicas para Estudos - 2026",
    tags: ["relaxar", "instrumental", "praiano"],
    musicas: [
      {
        title: "Let U Go - Notion Remix",
        year: 2024,
        artist: "LucidDreams",
        album: "Days For Live - Notion",
      },
    ],
  },
];

const controllerPlaylist = {
  //GET- Todas Playllist -/playlists
  allPlaylists: (req, res) => {
    res.json(playlists);
  },

  //GET buscar pelo id: /playlist/:id
  searchID: (req, res) => {
    const { id } = req.params;

    // ==> 400 → o cliente mandou coisa errada
    // ==> 404 → o cliente mandou certo, mas não existe

    if (typeof id !== "number") {
      res.status(400).json({ message: "Invalid Id. Must be a number." });
    }

    const playlist = playlists.find((playlist) => playlist.id === Number(id));

    if (!playlist) {
      res.status(404);
      res.json({ message: "Playlist is not defined!" });
    } else {
      res.json(playlist);
    }
  },

  //POST-create /playlist
  create: (req, res) => {
    const { name, tags } = req.body;

    const newPlaylist = {
      id: Math.floor(Math.random() * 99999),
      name,
      tags,
    };
    playlists.push(newPlaylist);

    res.status(201);
    res.json(newPlaylist);
  },

  //PUT /playlist/:id
  updatePlaylist: (req, res) => {
    const id = parseInt(req.params.id);
    const { name, tags } = req.body;

    const playlistSearch = playlists.find((playlist) => playlist.id === id);

    if (!playlistSearch) {
      return res.status(404).json({ message: "Playlist não encontrada" });
    }

    // ==> Verifica se a variável name foi enviada
    if (name !== undefined) {
      if (typeof name === "string") {
        playlistSearch.name = name;
      } else {
        return res.status(400).json({ error: "Name must be a string" });
      }
    }

    // ==> verifica se a variável tags foi enviada
    if (tags !== undefined) {
      if (typeof tags === "string") {
        playlistSearch.tags = tags;
      } else {
        return res.status(400).json({ error: "Tags must be a string" });
      }
    }

    res.json(playlistSearch);
  },

  //DELETE /playlist/:id
  deletePlaylist: (req, res) => {
    const id = req.params.id;

    const playlistIndex = playlists.findIndex(
      (playlist) => playlist.id === Number(id)
    );

    if (playlistIndex === -1) {
      return res.status(404).json({ message: "Playlist not found!" });
    }

    playlists.splice(playlistIndex, 1);

    res.status(204).end();
  },
  //POST /playlists/:id/musicas
  addMusicPlaylist: (req, res) => {
    const id = req.params.id;
    const { title, year, artist, album } = req.body;

    const playlistSearch = playlists.find(
      (playlist) => playlist.id === Number(id)
    );

    if (!playlistSearch) {
      return res.status(404).json({ message: "Playlist não encontrada" });
    }

    // valida title
    if (!title || typeof title !== "string") {
      return res.status(400).json({ message: "Título inválido" });
    }

    // valide year
    if (!year || typeof year !== "number") {
      return res.status(400).json({ message: "Ano inválido" });
    }

    // valida artist
    if (!artist || typeof artist !== "string") {
      return res.status(400).json({ message: "Artista Inválido" });
    }

    //valida album
    if (!album || typeof album !== "string") {
      return res.status(400).json({ message: "Album inválido" });
    }

    const newMusic = {
      title,
      year,
      artist,
      album,
    };

    playlistSearch.musicas.push(newMusic);

    return res.status(201).json(newMusic);
  },


  deleteMusicPlaylist: (req, res) => {
    const playlistId = parseInt(req.params.id);
    // ==> musicaIndex vai pegar o indice que vou passar na req
    const musicaIndex = parseInt(req.params.musicaIndex);

    const playlistSearch = playlists.find(
      (playlist) => playlist.id === playlistId
    );

    if (!playlistSearch) {
      return res.status(404).json({ message: "Playlist não encontrada" });
    }

    // Verifica se o índice é válido
    if (musicaIndex < 0 || musicaIndex >= playlistSearch.musicas.length) {
      return res.status(404).json({ message: "Música não encontrada" });
    }

    playlistSearch.musicas.splice(musicaIndex, 1);

    return res.sendStatus(204);
  },
};

module.exports = controllerPlaylist;
