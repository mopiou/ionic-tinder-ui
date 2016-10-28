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

        vm.like = function (param) {
            $log.info('function like() call from directive <like-button>: ' + param);
            $scope.like();
            //param ? $scope.transitionRight() : $scope.transitionLeft();
            $scope.itsAMatch();
        }

    }

        angular.module('next.components.like.controllers', [])
            .controller('LikeCtrl', Like);

    })();



