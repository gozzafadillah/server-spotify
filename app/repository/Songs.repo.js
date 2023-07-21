const dataSong = require("../data/songs.data");

class SongRepository {
  constructor() {
    // Simulasi data lagu dalam array
    this.songs = [...dataSong];
  }

  getAllSongs() {
    return this.songs;
  }

  getSongById(uuid) {
    const song = this.songs.find((song) => song.uuid == uuid);
    if (song) {
      return song;
    }
    return null;
  }

  countPlaySong(song) {
    const index = this.songs.findIndex((s) => s.uuid == song.uuid);
    if (index !== -1) {
      const newDuration = this.songs[index].duration++;
      this.song[index] = { ...song[index], newDuration };
      return { data: this.song[index], err: null };
    }
    return { data: null, err: "Invalid duration" };
  }
}

module.exports = SongRepository;
