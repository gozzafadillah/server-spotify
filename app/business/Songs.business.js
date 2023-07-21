const SongRepository = require("../repository/Songs.repo");

class SongService {
  constructor() {
    this.songRepository = new SongRepository();
  }

  getAllSongs() {
    return this.songRepository.getAllSongs();
  }

  getSongById(uuid) {
    return this.songRepository.getSongById(uuid);
  }

  countDurationSong(song) {
    return this.songRepository.updateSong(song);
  }
}

module.exports = SongService;
