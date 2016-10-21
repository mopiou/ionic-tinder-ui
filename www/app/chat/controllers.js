(function() {
  'use strict';

  function ChatsCtrl($scope, Chats) {
    //$scope.$on('$ionicView.enter', function(e) { } );

    $scope.chats = Chats.all();
    $scope.remove = function(chat) {
        Chats.remove(chat);
    };
  }

  function ChatDetailCtrl($scope, $stateParams, Chats,$ionicHistory,$log) {
      $scope.chat = Chats.get($stateParams.chatId);
        $log.info($scope.chat);


      $log.info('ChatDetailCtrl');

      //$log.info($ionicHistory.backTitle());

      
  }

  angular.module('next.chat.controllers', [])
    .controller('ChatsCtrl', ChatsCtrl)
    .controller('ChatDetailCtrl', ChatDetailCtrl);

})();