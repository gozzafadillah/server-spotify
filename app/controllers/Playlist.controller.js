// controllers/playlistController.js

const SongsBusiness = require("../business/Songs.business");
const PlaylistBusiness = require("../business/Playlist.business");

class PlaylistController {
  constructor() {
    this.playlistService = new PlaylistBusiness();
    this.songService = new SongsBusiness();
  }

  createPlaylist(req, res) {
    const { name } = req.body;
    const newPlaylist = this.playlistService.createPlaylist({ name });
    if (newPlaylist == false) {
      res.status(409).json({
        status: "error",
        message: "Playlist already exists",
        data: null,
      });
    } else {
      res.status(201).json({
        status: "success",
        message: "Playlist created",
        data: newPlaylist,
      });
    }
  }

  getAllPlaylists(req, res) {
    const playlists = this.playlistService.getAllPlaylists();
    res.json({
      status: "success",
      message: "Retrieved all playlists",
      data: playlists,
    });
  }

  getPlaylistById(req, res) {
    const { id } = req.params;
    const playlist = this.playlistService.getPlaylistById(Number(id));
    if (playlist) {
      res.json({
        status: "success",
        message: "Retrieved playlist by ID",
        data: playlist,
      });
    } else {
      res.status(404).json({
        status: "error",
        message: "Playlist not found",
        data: null,
      });
    }
  }

  addSongToPlaylist(req, res) {
    const { playlistId, songId } = req.params;
    const success = this.playlistService.addSongToPlaylist(
      Number(playlistId),
      Number(songId)
    );
    if (success) {
      res.json({
        status: "success",
        message: "Song added to playlist",
        data: null,
      });
    } else {
      res.status(404).json({
        status: "error",
        message: "Playlist or song not found",
        data: null,
      });
    }
  }

  incrementSongPlayCount(req, res) {
    const { playlistId, songId } = req.params;
    const success = this.playlistService.incrementSongPlayCount(
      Number(playlistId),
      songId
    );
    if (success) {
      res.json({
        status: "success",
        message: "Song play count incremented",
        data: null,
      });
    } else {
      res.status(404).json({
        status: "error",
        message: "Playlist or song not found",
        data: null,
      });
    }
  }

  getFamousSongs(req, res) {
    const { playlistId } = req.params;
    const songs = this.playlistService.getMostPlayedSongs(Number(playlistId));
    res.json({
      status: "success",
      message: "Retrieved most played songs",
      data: songs,
    });
  }

  getAllSongs(req, res) {
    const songs = this.songService.getAllSongs();
    res.json({
      status: "success",
      message: "Retrieved all songs",
      data: songs,
    });
  }
}

module.exports = PlaylistController;
