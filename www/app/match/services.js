(function () {
    'use strict';

    function matchs() {
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
            }, /*{
                id: 2,
                name: 'Elie Seroussi',
                lastText: 'I should buy a boat',
                face: 'img/elie.jpg'
            },*/ {
                id: 3,
                name: 'Tony Elbaz',
                lastText: 'Look at my mukluks!',
                face: 'img/tony.jpg'
            }, {
                id: 4,
                name: 'Margaux Baer',
                lastText: 'This is wicked good ice cream.',
                face: 'img/margaux.jpg'
            }, {
                id: 5,
                name: 'Lisa Melaim',
                lastText: 'This is wicked good ice cream.',
                face: 'img/lisa.jpg'
            }, {
                id: 6,
                name: 'Julia Guedj',
                lastText: 'This is wicked good ice cream.',
                face: 'img/julia.jpg'
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
        .factory('Matchs', matchs);

})();