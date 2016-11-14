(function () {
  'use strict';

  /**
   * @name  config
   * @description config block
   */
  function config($stateProvider, $urlRouterProvider) {


    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider

      // setup an abstract state for the tabs directive
      .state('tab', {
        url: '/tab',
        abstract: true,
        templateUrl: 'app/general/template/tabs.html',
      })

      // Each tab has its own nav history stack:


      .state('tab.dash', {
        url: '/dash',
        views: {
          'tab-dash': {
            templateUrl: 'app/general/template/structure.html',
            controller: 'GeneralCtrl'
          }
        }
      })


    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/tab/dash');

  };

  angular.module('next.general.routes', [])
    .config(config)
})();










      /*

      .state('tab.dash-match', {
        url: '/dash/:matchId',
        views: {
          'tab-dash': {
            templateUrl: 'templates/tab-dash-match.html',
            controller: 'MessageCtrl'
          }
        }
      })

      .state('tab.account', {
        url: '/account',
        views: {
          'tab-account': {
            templateUrl: 'app/general/template/tab-account.html',
            controller: 'AccountCtrl'
          }
        }
      });
      
      */