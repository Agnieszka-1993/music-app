export const select = {
  templateOf: {
    songList: '#template-songs-list',
    home: '#template-home',
    categories: '#template-categories',
    audioList: '#template-songs-list',
    search: '#template-search',
    discovery: '#template-discover',
  },
  containerOf: {
    pages: '#pages',
    menu: '.menu-links',
    home: '.home-wrapper',
    categories: '.categories-wrapper',
    audioList: '#home .song-list',
    search: '.search-wrapper',
    searchAudio: '#search .song-list',
    discovery: '.discover-wrapper',
    randomSong: '#discover .song-list',
  },
  menu: {
    menuLinks: '.menu-links a'
  },
  link: {
    search: '.menu-links a[href="#search"]',
    discover: '.menu-links a[href="#discover"]',
  },
  player: {
    ready: '.ready-player-'
  },
  search: {
    input: '.input-song',
    form: '.song-search',
    result: '.result-text',
    category: '.category-input'
  },
  discover: {
    subtitle: '.discover-subtitle',
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
  search: Handlebars.compile(document.querySelector(select.templateOf.search).innerHTML),
  discovery: Handlebars.compile(document.querySelector(select.templateOf.discovery).innerHTML),
};

