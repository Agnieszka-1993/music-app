class Stats {
  constructor(globalObj) {

    this.global = globalObj;
    this.listenedSongsCatObj = {};
    this.listenedSongsCounter = 0;
    this.playedSongId = null;

  }

  playedSongIdCheck(player) {
    if (this.playedSongId !== player.className.slice(-1)) {
      this.playedSongId = player.className.slice(-1);
      const playedSongCategories = this.global.songList[this.playedSongId - 1].categories;
      this.playedSongCategories(playedSongCategories);
      this.playedSongsCounter();
    }
  }

  playedSongCategories(song) {
    for (let songCategory of song) {
      if (!this.listenedSongsCatObj[songCategory]) {
        this.listenedSongsCatObj[songCategory] = 1;
      } else this.listenedSongsCatObj[songCategory]++;
    }
  }

  playedSongsCounter() {
    this.listenedSongsCounter++;
  }

}


export default Stats;