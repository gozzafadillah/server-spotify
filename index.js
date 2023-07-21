const express = require("express");
const PlaylistRepository = require("./app/repository/Playlist.repo");
const SongRepository = require("./app/repository/Songs.repo");
const PlaylistService = require("./app/business/Playlist.business");
const SongService = require("./app/business/Songs.business");
const setupPlaylistRoutes = require("./app/routers/Route.config");

const app = express();
app.use(express.json());

const playlistRepository = new PlaylistRepository();
const songRepository = new SongRepository();
const songService = new SongService(songRepository);
const playlistService = new PlaylistService(playlistRepository, songService);
const playlistRoutes = setupPlaylistRoutes(playlistService);
app.use("/playlists", playlistRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
