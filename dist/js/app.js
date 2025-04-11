import {settings, select, classNames} from './settings.js';
import Home from './components/Home.js';
import Categories from './components/Categories.js';
import Audio from './components/Audio.js';
import Stats from './components/Stats.js';
import Search from './components/Search.js';
import Discovery from './components/Discovery.js';

const app = {
  initData: function() {
    const thisApp = this;

    thisApp.data = {};
    const url= settings.db.url + '/' + settings.db.songs;

    thisApp.loader();
    thisApp.displayLoader();

    fetch(url)
      .then(function (rawResonse){
        return rawResonse.json();
      })
      .then(function (parsedResponse){
        thisApp.data.songs = parsedResponse;
        thisApp.removeLoader();
        thisApp.initAudio();
        thisApp.initCategories();
        thisApp.initStats();
        thisApp.initDiscovert();
        thisApp.initSearch();
      });
  },

  loader: function () {
    const thisApp = this;

    const loader = document.querySelector('.preload');

    thisApp.displayLoader = function () {
      loader.classList.add('display');
    };

    thisApp.removeLoader = function () {
      loader.classList.remove('display');
    };
  },

  initDiscovert: function() {
    const thisApp = this;

    thisApp.discoveryConteiner = document.querySelector(select.containerOf.discovery);

    thisApp.discovery = new Discovery(thisApp.discoveryConteiner, thisApp.data.songs, thisApp, app);
  },

  initSearch: function() {
    const thisApp = this;

    thisApp.searchConteiner = document.querySelector(select.containerOf.search);

    if (!thisApp.data.songs || !Array.isArray(thisApp.data.songs)) {
      console.error('Error: `data.songs` We don\'t see.');
      return;
    }

    thisApp.search = new Search(thisApp.searchConteiner, thisApp.data.songs, thisApp.categoriesObject);
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
    for (let song of thisApp.data.songs) {
      for (let category of song.categories) {
        songCategories.add(category);
      }
    }
    const categories = Array.from(songCategories);
    thisApp.categoriesObject = { categories };

    thisApp.categoriesContainer = document.querySelector(select.containerOf.categories);

    thisApp.categories = new Categories(thisApp.categoriesContainer, thisApp.categoriesObject, thisApp.data, app);
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