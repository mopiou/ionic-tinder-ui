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
            $log.info('function like() call from directive <like-button>: ' + liked);
            $scope.like(liked);
            //param ? $scope.transitionRight() : $scope.transitionLeft();
        }

    }

        angular.module('next.components.like.controllers', [])
            .controller('LikeCtrl', Like);

    })();



