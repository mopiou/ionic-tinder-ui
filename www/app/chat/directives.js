(function () {
    'use strict';


    function ChatsPage() {
        return {
            restrict: 'EA',
            replace: true,
            templateUrl: './app/chat/template/chats.html',
            scope: {},
            controllerAs: 'vm',
            bindToController: true,
            /*jshint unused:false*/
            controller: 'ChatsCtrl',
            link: function (scope, elm, attrs) {
            }
        };
    }


    function ChatDetailPage() {
        return {
            restrict: 'EA',
            replace: true,
            templateUrl: './app/chat/template/chat-detail.html',
            scope: {},
            controllerAs: 'vm',
            bindToController: true,
            /*jshint unused:false*/
            //controller: 'ChatDetailCtrl',
            controller: 'MessageCtrl',
            link: function (scope, elm, attrs) {

            }
        };
    }


    angular.module('next.chat.directives', [])
        .directive('chatsPage', ChatsPage)
        .directive('chatDetailPage', ChatDetailPage);
})();
