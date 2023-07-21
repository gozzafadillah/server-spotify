const PlaylistRepository = require("../repository/Playlist.repo");
const SongService = require("./Songs.business");

class PlaylistService {
  constructor() {
    this.playlistRepository = new PlaylistRepository();
    this.songService = new SongService();
  }

  createPlaylist(data) {
    if (this.getPlaylistByName(data.name)) {
      return false;
    }
    const newPlaylist = this.playlistRepository.createPlaylist({
      name: data.name,
    });
    const response = {
      name: newPlaylist.name,
    };
    return response;
  }

  getPlaylistByName(name) {
    return this.playlistRepository.getPlaylistByName(name);
  }

  getAllPlaylists() {
    return this.playlistRepository.getAllPlaylists();
  }

  getPlaylistById(id) {
    return this.playlistRepository.getPlaylistById(id);
  }

  updatePlaylist(playlist) {
    return this.playlistRepository.updatePlaylist(playlist);
  }

  addSongToPlaylist(playlistId, songId) {
    const dataPlaylist = this.getPlaylistById(playlistId);
    if (!dataPlaylist) {
      return false;
    }

    const songs = this.songService.getSongById(songId);
    if (!songs) {
      return false;
    }
    this.updatePlaylist({ id: dataPlaylist.id, songs: songs });
    return true;
  }

  incrementSongPlayCount(playlistId, songId) {
    const playlist = this.getPlaylistById(playlistId);
    if (!playlist) {
      return false;
    }

    const song = playlist.songs.find((song) => song.uuid === songId);
    if (!song) {
      return false;
    }

    song.playCount++;
    this.songService.updateSong(song);
    this.updatePlaylist(playlist);
    return true;
  }

  getMostPlayedSongs(playlistId) {
    const playlist = this.playlistRepository.sortSongs(playlistId);
    return playlist;
  }
}

module.exports = PlaylistService;
