(function () {
    'use strict';

    function Like(
        $log
        , $scope
        , $rootScope
        , $ionicModal
        , $ionicSlideBoxDelegate
        , $ionicActionSheet
        , $ionicPopup
        , TDCardDelegate
        , $timeout
    ) {
        var vm = this;


        //$scope.showEditProfile = showEditProfile;

        vm.like = function (liked) {


            var index = 0;
            var activeCardsSize = $scope.cards.active.length;
            var element = $scope.$parent.swipeCard;

            $log.info("Element like directive : ");
            $log.info(element);

            if (activeCardsSize > 0) {
                $log.info('function like() call from directive <like-button>: ' + liked);

                $log.info("il reste " + activeCardsSize + " profils a liker");

                var card = $scope.cards.active[index];

                if (liked) {
                    $scope.cards.liked.push(card);
                    element.onClickTransitionRight();
                    $scope.itsAMatch();
                } else {
                    element.onClickTransitionLeft();
                    $scope.cards.disliked.push(card);
                }

                $scope.cardDestroyed(index);

            } else {
                $log.info('PLUS PERSONNE A LIKER ' + liked);
            }



            // $scope.$emit('removeCard', element, card);



            //param ? $scope.transitionRight() : $scope.transitionLeft();
        }

    }

    angular.module('next.components.like.controllers', [])
        .controller('LikeCtrl', Like);

})();



