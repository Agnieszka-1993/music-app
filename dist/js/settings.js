export const select = {
  templateOf: {
    songList: '#template-songs-list',
    home: '#template-home',
    categories: '#template-categories',
    audioList: '#template-songs-list',
  },
  containerOf: {
    pages: '#pages',
    menu: '.menu-links',
    home: '.home-wrapper',
    categories: '.categories-wrapper',
    audioList: '#home .song-list',
  },
  menu: {
    menuLinks: '.menu-links a'
  },
  player: {
    ready: '.ready-player-'
  },


};

export  const classNames = {
  nav: {
    active: 'active',
  },
  pages: {
    active: 'active',
  }
};

export const settings = {


  db: {
    url: '//' + window.location.hostname + (window.location.hostname == 'localhost' ? ':3131' : ''),
    songs: 'songs',
  },
};

export const templates = {
  home: Handlebars.compile(document.querySelector(select.templateOf.home).innerHTML),
  categories: Handlebars.compile(document.querySelector(select.templateOf.categories).innerHTML),
  audio: Handlebars.compile(document.querySelector(select.templateOf.audioList).innerHTML),
};

