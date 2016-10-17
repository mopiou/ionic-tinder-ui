(function () {
    'use strict';

    function Match() {
        // Might use a resource here that returns a JSON array

        // Some fake testing data
        var matchs = [
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
                return matchs;
            },
            remove: function (chat) {
                matchs.splice(matchs.indexOf(chat), 1);
            },
            get: function (chatId) {
                for (var i = 0; i < matchs.length; i++) {
                    if (matchs[i].id === parseInt(chatId)) {
                        return matchs[i];
                    }
                }
                return null;
            }
        };
    }

    angular.module('next.match.services', [])
        .factory('Match', Match);

})();