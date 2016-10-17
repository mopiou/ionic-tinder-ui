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

      .state('tab.dash2', {
        url: '/dash2',
        views: {
          'tab-dash2': {
            template: '<recommendation></recommendation>',
            //templateUrl: 'app/recommendation/template.html',
            //controller: 'DashCtrl'
          }
        }
      });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/tab/dash');

  };

  angular.module('next.recommendation.routes', [])
    .config(config)
})();
