# Homework module 2.3

## Installation

1. please clone this repository
2. do this `npm install` in your project
3. `npm run dev` for run the nodemon
4. I was not used database sql or noSQL just save in memory

## MVP

- [x] Make playlist as a model
- [x] Track song play count in the playlist
- [x] Add feature to Get list of songs to be sorted by most played

## Make playlist as a model

### Playlist model

```javascript
class Playlist {
  constructor(id, name, songs) {
    this.id = id;
    this.name = name;
    this.songs = songs;
  }
}

module.exports = Playlist;
```

### SongModel

```javascript
class Songs {
  constructor(uuid, name, artist, genre, year, album, duration) {
    this.uuid = uuid;
    this.name = name;
    this.artist = artist;
    this.genre = genre;
    this.year = year;
    this.album = album;
    this.duration = duration;
  }
}

module.exports = Songs;
```

## Track song play count in the playlist

```js
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

      return this.playlists[index];
    }
    return false;
  }
```

## Add feature to Get list of songs to be sorted by most played

```js
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
```
