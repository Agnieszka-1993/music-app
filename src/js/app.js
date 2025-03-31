import {settings, select, classNames} from './settings.js';
import Home from './components/Home.js';
import Categories from './components/Categories.js';
import Audio from './components/Audio.js';
import Stats from './components/Stats.js';

const app = {
  initData: function() {
    const thisApp = this;

    thisApp.data = {};
    const url= settings.db.url + '/' + settings.db.songs;

    fetch(url)
      .then(function (rawResonse){
        return rawResonse.json();
      })
      .then(function (parsedResponse){
        thisApp.data.songs = parsedResponse;
        thisApp.initAudio();
        thisApp.initCategories();
        thisApp.initStats();
      });
  },

  initAudio: function() {
    const thisApp = this;
    thisApp.audioList = thisApp.data.songs;

    thisApp.audioHomeWrapper = select.containerOf.audioList;

    for (let song in thisApp.audioList){
      new Audio(thisApp.audioList[song], thisApp.audioHomeWrapper);
    }

    thisApp.homePlayer = document.querySelectorAll('#home .songs');

    for (const player of thisApp.homePlayer){
      const playButton = player.querySelector('audio');
      playButton.addEventListener('play', function(){
        app.stats.playedSongIdCheck(player);
      });
    }
  },

  initPages: function(){
    const thisApp = this;

    thisApp.pages = document.querySelector(select.containerOf.pages).children;
    thisApp.menu = document.querySelectorAll(select.menu.menuLinks);
    thisApp.quickLinks = document.querySelector(select.containerOf.menu);

    const idFromHash = window.location.hash.replace('#/', '');
    let pageMatchingHash = thisApp.pages[0].id;

    for(let page of thisApp.pages) {
      if (page.id == idFromHash) {
        pageMatchingHash = page.id;
        break;
      }
    }
    thisApp.activatePage(pageMatchingHash);

    for (let link of thisApp.menu){
      link.addEventListener('click', function (event){
        event.preventDefault();
        const clickcedEl = this;
        const id = clickcedEl.getAttribute('href').replace('#','');
        thisApp.activatePage(id);
        window.location.hash = '#/' + id;
      });
    }
  },

  activatePage: function (pageId) {
    const thisApp = this;


    for (let page of thisApp.pages) {
      page.classList.toggle(classNames.pages.active, page.id == pageId);
    }

    for (let link of thisApp.menu) {
      link.classList.toggle(
        classNames.nav.active,
        link.getAttribute('href') == '#' + pageId
      );

    }
  },

  initHome: function(){
    const thisApp = this;

    thisApp.homeContainer = document.querySelector(select.containerOf.home);

    thisApp.home = new Home(thisApp.homeContainer);
  },

  initCategories: function () {
    const thisApp = this;
    const songCategories = new Set();
    for (let song in thisApp.data.songs) {
      for (let category of thisApp.data.songs[song].categories) {
        songCategories.add(category);
      }
    }
    const categories = Array.from(songCategories);
    thisApp.categoriesObject = { categories };

    thisApp.categoriesContainer = document.querySelector(select.containerOf.categories);

    thisApp.categories = new Categories(thisApp.categoriesContainer, thisApp.categoriesbject, thisApp.data, app);
  },

  initStats() {
    const thisApp = this;

    thisApp.stats = new Stats(app);
  },

  stopPlayer() {
    const players = document.querySelectorAll('.songs audio');
    for (let i = 0; i < players.length; i++) {
      // eslint-disable-next-line no-undef
      GreenAudioPlayer.pausePlayer(players[i]);
    }
  },

  init: function(){
    const thisApp = this;

    thisApp.initData();
    thisApp.initPages();
    thisApp.initHome();
  }
};

app.init();