// routes/playlistRoutes.js

const express = require("express");
const PlaylistController = require("../controllers/Playlist.controller");

function setupPlaylistRoutes(playlistService, songService) {
  const router = express.Router();
  const playlistController = new PlaylistController(
    playlistService,
    songService
  );

  router.post("/", playlistController.createPlaylist.bind(playlistController));
  router.get("/", playlistController.getAllPlaylists.bind(playlistController));
  router.get(
    "/:id",
    playlistController.getPlaylistById.bind(playlistController)
  );
  router.put(
    "/add/:playlistId/songs/:songId",
    playlistController.addSongToPlaylist.bind(playlistController)
  );
  router.put(
    "/:playlistId/songs/:songId/playcount",
    playlistController.incrementSongPlayCount.bind(playlistController)
  );
  router.get(
    "/get/songs",
    playlistController.getAllSongs.bind(playlistController)
  );
  router.get(
    "/famous/songs/:playlistId",
    playlistController.getFamousSongs.bind(playlistController)
  );

  return router;
}

module.exports = setupPlaylistRoutes;
