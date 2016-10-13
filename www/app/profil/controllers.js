(function() {
  'use strict';

  function ChatsCtrl($scope, Chats) {
    //$scope.$on('$ionicView.enter', function(e) { } );

    $scope.chats = Chats.all();
    $scope.remove = function(chat) {
        Chats.remove(chat);
    };
  }

  function ChatDetailCtrl($scope, $stateParams, Chats) {
      $scope.chat = Chats.get($stateParams.chatId);
  }

  angular.module('next.chat.controllers', [])
    .controller('ChatsCtrl', ChatsCtrl)
    .controller('ChatDetailCtrl', ChatDetailCtrl);

})();