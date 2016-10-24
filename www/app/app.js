// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'next' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'next.chat.controllers' is found in app/chat/controllers.js
// 'starter.controllers' is found in controllers.js
angular.module('next', ['ionic',

  // GENERAL
  , 'next.general.controllers'
  , 'next.general.services'
  , 'next.general.directives'
  , 'next.general.routes'

  // CHAT
  , 'next.chat.controllers'
  , 'next.chat.services'
  , 'next.chat.directives'
  , 'next.chat.routes'

  // MATCH
  //, 'next.match.controllers'
  //, 'next.match.services'
  //, 'next.match.directives'
  //, 'next.match.routes'

  // RECOMENDATIONS
  , 'next.recommendation.controllers'
  //, 'next.recommendation.services'
  , 'next.recommendation.directives'
  , 'next.recommendation.routes'


  // PROFIL
  , 'next.profile.controllers'
  //, 'next.profile.services'
  , 'next.profile.directives'
  //, 'next.profile.routes'


  // SETTINGS
  , 'next.settings.controllers'
  //, 'next.settings.services'
  , 'next.settings.directives'
  //, 'next.settings.routes'



  // OTHERS
  , 'monospaced.elastic'
  , 'ksSwiper'
  , 'ionic.contrib.ui.tinderCards2'
])

  .run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);

      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }
    });
  })
  .config(function ($provide, $ionicConfigProvider, $compileProvider) {
    $ionicConfigProvider.tabs.position('bottom');
    // $ionicConfigProvider.scrolling.jsScrolling(false);
    // $translateProvider.useStaticFilesLoader({
    //     prefix: 'l10n/',
    //     suffix: '.json'
    //   });
    // $translateProvider.preferredLanguage("en");
    // $translateProvider.fallbackLanguage("en");
    $ionicConfigProvider.scrolling.jsScrolling(false);
    $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|cdvfile|file|filesystem|blob):|data:image\//);
    $ionicConfigProvider.backButton.text(null).icon('ion-arrow-left-c color-coral');
  });
