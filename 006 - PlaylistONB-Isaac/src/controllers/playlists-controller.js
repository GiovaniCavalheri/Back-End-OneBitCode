// Array que armazena todas as playlists na memória
// Como não tem banco de dados, os dados são perdidos ao reiniciar o servidor
let playlists = [];

// Função auxiliar que gera um ID aleatório entre 0 e 999999
// Math.random() gera número entre 0 e 1
// Multiplicar por 999999 dá um número entre 0 e 999999
// Math.floor() remove as casas decimais
function generateRandomID() {
  return Math.floor(Math.random() * 999999);
}

// Exporta um objeto com todas as funções (controllers)
// Cada função representa uma rota/ação da API
module.exports = {
  // ============================================
  // GET /api/playlists
  // Lista TODAS as playlists
  // ============================================
  index: (req, res) => {
    // Simplesmente retorna o array completo
    // Se vazio, retorna []
    res.json(playlists);
  },

  // ============================================
  // GET /api/playlists/:id
  // Busca UMA playlist específica por ID
  // ============================================
  show: (req, res) => {
    const { id } = req.params;

    // find() procura no array e retorna o OBJETO
    // +id converte string para número (operador unário +)
    // Equivalente a: Number(id) ou parseInt(id)
    const playlist = playlists.find((pl) => pl.id === +id);

    // Se não encontrou, find() retorna undefined
    if (!playlist)
      return res.status(404).json({ message: "playlist not found" });

    // Se encontrou, retorna a playlist
    res.json(playlist);
  },

  // ============================================
  // POST /api/playlists
  // Cria uma NOVA playlist
  // ============================================
  save: (req, res) => {
    // Pega os dados enviados no body da requisição
    // musics é opcional (pode não vir)
    const { name, tags, musics } = req.body;

    // Validação 1: name deve ser string
    if (typeof name !== "string") {
      return res.status(400).json({ message: "name must be a string" });
    }

    // Validação 2: tags deve ser um array
    // Array.isArray() verifica se é array
    if (!Array.isArray(tags)) {
      return res.status(400).json({ message: "tags must be an array" });
    }

    // Validação 3: SE musics foi enviado, deve ser array
    // musics && verifica se existe primeiro
    // Se não existir (undefined), nem executa a segunda parte
    if (musics && !Array.isArray(musics)) {
      return res.status(400).json({ message: "musics must be an array" });
    }

    // Cria o objeto da nova playlist
    const newPlaylist = {
      id: generateRandomID(), // Gera ID aleatório
      name: name, // Poderia ser só: name (shorthand)
      tags: tags, // Poderia ser só: tags
      musics: musics ?? [], 
      // Se musics for undefined, usa []
      // Se musics existir, usa o valor enviado
    };

    // Adiciona a nova playlist no array
    playlists.push(newPlaylist);

    // Retorna 201 (Created) com a playlist criada
    // 201 indica que um recurso novo foi criado
    res.status(201).json(newPlaylist);
  },

  // ============================================
  // PUT /api/playlists/:id
  // Atualiza nome e/ou tags de uma playlist
  // ============================================
  update: (req, res) => {
    // Pega o ID da URL
    const { id } = req.params;

    // Pega os campos que podem ser atualizados
    const { name, tags } = req.body;

    // findIndex() retorna a POSIÇÃO no array (0, 1, 2...)
    // Retorna -1 se não encontrar
    // +id converte string para número
    const playlistIndex = playlists.findIndex((pl) => pl.id === +id);

    // Se não encontrou (retornou -1)
    if (playlistIndex === -1) {
      return res.status(404).json({ message: "playlist not found" });
    }

    // Atualização PARCIAL: só atualiza SE o campo foi enviado
    // Se name existe E é string, atualiza
    if (typeof name === "string") {
      playlists[playlistIndex].name = name;
    }

    // Se tags existe E é array, atualiza
    // tags && verifica se existe primeiro
    if (tags && Array.isArray(tags)) {
      playlists[playlistIndex].tags = tags;
    }

    // Retorna a playlist atualizada
    // 200 (OK) é implícito quando não especifica status
    res.json(playlists[playlistIndex]);
  },

  // ============================================
  // DELETE /api/playlists/:id
  // Remove uma playlist
  // ============================================
  delete: (req, res) => {
    // Pega o ID da URL
    const { id } = req.params;

    // Encontra a posição da playlist no array
    const playlistIndex = playlists.findIndex((pl) => pl.id === +id);

    // Se não encontrou
    if (playlistIndex === -1) {
      return res.status(404).json({ message: "playlist not found" });
    }

    // splice(posição, quantidade) remove do array
    // splice RETORNA um array com os elementos removidos
    // Como removemos 1 elemento, retorna [playlist removida]
    const deletedPlaylist = playlists.splice(playlistIndex, 1);

    // Retorna a playlist que foi deletada
    // Nota: poderia usar 204 sem body (padrão REST)
    // Mas aqui retorna 200 com o que foi deletado
    res.json(deletedPlaylist);
  },

  // ============================================
  // POST /api/playlists/:id/musics
  // Adiciona uma música em uma playlist
  // ============================================
  addMusic: (req, res) => {
    // Pega os dados da música do body
    const { title, year, artist, album } = req.body;

    // Pega o ID da playlist da URL
    const { id } = req.params;

    // Busca a playlist (retorna o objeto, não o índice)
    const playlist = playlists.find((pl) => pl.id === +id);

    // Se playlist não existe, retorna 404
    if (!playlist)
      return res.status(404).json({ message: "playlist not found" });

    // Valida TODOS os campos de uma vez
    // Usa || (OU) para verificar se ALGUM está errado
    // Se qualquer um não for do tipo correto, retorna erro
    if (
      typeof title !== "string" ||
      typeof year !== "number" ||
      typeof artist !== "string" ||
      typeof album !== "string"
    ) {
      return res.status(400).json({ message: "invalid fields" });
    }

    // Cria o objeto da nova música
    // Aqui as músicas TÊM ID (diferente da sua versão com índice)
    const newMusic = {
      id: generateRandomID(), // ID único para a música
      title, 
      year, 
      artist, 
      album, 
    };

    // playlist.musics é o array dentro do objeto playlist
    playlist.musics.push(newMusic);

    // Retorna 201 (Created) com a música criada
    res.status(201).json(newMusic);
  },

  // ============================================
  // DELETE /api/playlists/:playlistId/musics/:musicId
  // Remove uma música de uma playlist
  // ============================================
  removeMusic: (req, res) => {
    // Pega DOIS parâmetros da URL
    // :playlistId e :musicId (nomes definidos na rota)
    const { playlistId, musicId } = req.params;

    // Busca a playlist pelo ID
    const playlist = playlists.find((pl) => pl.id === +playlistId);

    // Se playlist não existe, retorna 404

    if (!playlist) {
      return res.status(404).json({ message: "playlist not found" });
    }

    // Busca o ÍNDICE da música dentro do array de músicas
    // Usa findIndex porque precisa da posição para usar splice
    // Compara pelo ID da música (não pelo índice do array)
    const musicIndex = playlist.musics.findIndex(
      (music) => music.id === +musicId
    );

    // Se música não existe, retorna 404

    if (musicIndex === -1) {
      return res.status(404).json({ message: "music not found" });
    }

    playlist.musics.splice(musicIndex, 1);
    res.status(204).end();
  },
};
