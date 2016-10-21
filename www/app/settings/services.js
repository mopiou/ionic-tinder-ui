(function () {
    'use strict';

    function Profile() {
        // Might use a resource here that returns a JSON array

        // Some fake testing data
        var chats = [
            {
                id: 0,
                name: 'Brian Soufir',
                lastText: 'Amateur de canard laque',
                face: 'img/brian.jpg'
            }, {
                id: 1,
                name: 'Anthony Zakine',
                lastText: 'Hey, it\'s me',
                face: 'img/anthony.jpg'
            }

        ];

        return {
            all: function () {
                return chats;
            },
            remove: function (chat) {
                chats.splice(chats.indexOf(chat), 1);
            },
            get: function (chatId) {
                for (var i = 0; i < chats.length; i++) {
                    if (chats[i].id === parseInt(chatId)) {
                        return chats[i];
                    }
                }
                return null;
            }
        };
    }

    angular.module('next.settings.services', [])
        .factory('Settings', Settings);

})();