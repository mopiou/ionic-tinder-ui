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
      /*
            .state('tab.chats', {
              url: '/chats',
              views: {
                'tab-chats': {
                  templateUrl: 'app/chat/template/chats.html',
                  controller: 'ChatsCtrl'
                }
              }
            })
            */
      .state('tab.chat-detail', {
        url: '/chats/:chatId',
        views: {
          'tab-chats': {
            template: '<chat-detail-page></chat-detail-page> ',
          }
        }
      });


    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/tab/dash');

  };

  angular.module('next.chat.routes', [])
    .config(config)
})();
