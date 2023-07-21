const Playlist = require("../models/Playlist.model");

class PlaylistRepository {
  constructor() {
    // Simulasi data playlist dalam array
    this.playlists = [];
  }

  createPlaylist(data) {
    const id = this.playlists.length + 1;
    const newPlaylist = new Playlist(id, data.name);
    newPlaylist.songs = [];
    this.playlists.push(newPlaylist);
    return newPlaylist;
  }

  getAllPlaylists() {
    return this.playlists;
  }

  getPlaylistById(id) {
    return this.playlists.find((playlist) => playlist.id === id);
  }

  getPlaylistByName(name) {
    return this.playlists.find((playlist) => playlist.name === name);
  }

  updatePlaylist(data) {
    const index = this.playlists.findIndex((p) => p.id === data.id);
    if (index !== -1) {
      const existingSongIndex = this.playlists[index].songs.findIndex(
        (song) => song.name === data.songs.name
      );
      if (existingSongIndex === -1) {
        // Jika songs tidak ada di playlist, tambahkan dengan durasi 1
        data.songs.duration = 1;
        this.playlists[index].songs.push(data.songs);
      } else {
        // Jika songs sudah ada di playlist, iterasi durasi
        this.playlists[index].songs[existingSongIndex].duration++;
      }

      return true;
    }
    return false;
  }

  sortSongs(playlistId) {
    const index = this.playlists.findIndex((p) => p.id === playlistId);

    if (index !== -1) {
      // Deklarasikan data
      const list = [...this.playlists[index].songs];

      // menukar posisi lagu dari duration
      const sortedSongs = list.sort((a, b) => b.duration - a.duration);

      return sortedSongs;
    }

    console.log("Playlist not found");
    return null; // Return null when the playlist is not found
  }
}

module.exports = PlaylistRepository;
