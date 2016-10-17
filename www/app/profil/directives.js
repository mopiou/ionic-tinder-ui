(function () {
    'use strict';


    function Profil() {
        return {
            restrict: 'EA',
            replace: true,
            templateUrl: './app/profil/template/profil.html',
            scope: {},
            controllerAs: 'vm',
            bindToController: true,
            /*jshint unused:false*/
            controller: function (
                $log
                , $scope
                , $rootScope
                , $ionicModal
                , $ionicSlideBoxDelegate
                , $ionicActionSheet
                , $ionicPopup
                , TDCardDelegate
                , $timeout) {
                var vm = this;

                $scope.like = like;
                $scope.slideHasChanged = slideHasChanged;
                $scope.showProfile = showProfile;
                $scope.deviceHeight = window.innerHeight;
                $scope.myToggle = true;
                $scope.slideIndex = 0;


                /* Recommendations image */

                var cardTypes = [
                    { image: 'img/tony.jpg' },
                    { image: 'img/anthony.jpg' },
                    { image: 'img/tony.jpg' },
                    { image: 'img/julia.jpg' },
                    { image: 'img/elie.jpg' },
                    { image: 'img/margaux.jpg' },
                    { image: 'img/lisa.jpg' },
                    { image: 'img/brian.jpg' },
                    { image: 'img/elie.jpg' },
                    { image: 'img/margaux.jpg' },
                    { image: 'img/julia.jpg' },
                    { image: 'img/brian.jpg' },
                    { image: 'img/anthony.jpg' },
                    { image: 'img/tony.jpg' },
                ];

                $scope.cards = {
                    master: Array.prototype.slice.call(cardTypes, 0),
                    active: Array.prototype.slice.call(cardTypes, 0),
                    discards: [],
                    liked: [],
                    disliked: []
                }


                $scope.cardDestroyed = function (index) {
                    $scope.cards.active.splice(index, 1);
                };

                $scope.addCard = function () {
                    var newCard = cardTypes[0];
                    $scope.cards.active.push(angular.extend({}, newCard));
                }

                $scope.refreshCards = function () {
                    // Set $scope.cards to null so that directive reloads
                    $scope.cards.active = null;
                    $timeout(function () {
                        $scope.cards.active = Array.prototype.slice.call($scope.cards.master, 0);
                    });
                }

                $scope.$on('removeCard', function (event, element, card) {
                    var discarded = $scope.cards.master.splice($scope.cards.master.indexOf(card), 1);
                    $scope.cards.discards.push(discarded);
                });

                $scope.cardSwipedLeft = function (index) { $log.info('LEFT SWIPE'); };
                $scope.cardSwipedRight = function (index) { $log.info('RIGHT SWIPE'); };



                $scope.transitionRight = function (index) {
                    $log.info('RIGHT transition');
                    var card = $scope.cards.active[index];
                    $scope.cards.liked.push(card);
                    // 1 like = 1 match ->  only for test
                    // timeout simulate asynchonous call to the api  and lets swipe the card completely
                    $timeout(function () {
                        itsAMatch();
                    }, 100);
                };

                $scope.transitionLeft = function (index) {
                    $log.info('LEFT transition');
                    var card = $scope.cards.active[index];
                    $scope.cards.disliked.push(card);
                };



                function like(param) {
                    $log.info('function like() call : ' + param)
                    //param ? $scope.transitionRight() : $scope.transitionLeft();
                }


                $scope.onTouch = function () {
                    $ionicSlideBoxDelegate.enableSlide(false);
                    console.log('touched');
                }
                $scope.onRelease = function () {
                    $ionicSlideBoxDelegate.enableSlide(true);
                    console.log('released');
                }

                function slideHasChanged(index) {
                    console.log('slideHasChanged')
                    $scope.slideIndex = index
                }

                // showProfile();
                function showProfile() {
                    $ionicModal.fromTemplateUrl('templates/modals/profile.html', {
                        scope: $scope,
                        animation: 'animated _zoomOut',
                        hideDelay: 920
                    }).then(function (modal) {
                        $scope.modalProfile = modal;
                        $scope.modalProfile.show();
                        $scope.hideProfile = function () {
                            $scope.modalProfile.hide();
                        }
                    });
                };


            },
            link: function (scope, elm, attrs) {
            }
        };
    }

    angular.module('next.profil.directives', [])
        .directive('profilPage', Profil);
})();
