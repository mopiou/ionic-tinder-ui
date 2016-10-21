(function () {
    'use strict';

    function RecommendationCtrl(
        $scope
        , $log
        , $rootScope
        , $ionicModal
        , $ionicSlideBoxDelegate
        , $ionicActionSheet
        , $ionicPopup
        , TDCardDelegate
        , $timeout) {


        $scope.slideHasChanged = slideHasChanged;
        $scope.showProfile = showProfile;
        $scope.showEditProfile = showEditProfile;
        $scope.showSettings = showSettings;
        $scope.showActionSheet = showActionSheet;
        $scope.slideTo = slideTo;
        $scope.slideToNext = slideToNext;
        $scope.slideToPrevious = slideToPrevious;

        $scope.deviceHeight = window.innerHeight;
        $scope.myToggle = true;
        $scope.slideIndex = 0;


        function slideTo(index) {
            $ionicSlideBoxDelegate.slide(index);
        }

        function slideToNext() {
            var nextSlide = $scope.slideIndex + 1;
            $ionicSlideBoxDelegate.slide(nextSlide < 2 ? nextSlide : 2);
        }

        function slideToPrevious() {
            var previousSlide = $scope.slideIndex - 1;
            $ionicSlideBoxDelegate.slide(previousSlide > 0 ? previousSlide : 0);
        }


        $scope.$watch(function (scope) { return scope.slideIndex },
            function (newValue, oldValue) {
                switch (newValue) {
                    case 0:
                    case 2:
                        $ionicSlideBoxDelegate.enableSlide(false);
                        break;
                }
            }
        );





        $scope.onTouch = function () {
            $ionicSlideBoxDelegate.enableSlide(false);
            console.log('touched');
        }
        $scope.onRelease = function () {
            $ionicSlideBoxDelegate.enableSlide(true);
            console.log('released');
        }

        function slideHasChanged(index) {
            console.log('slideHasChanged ...')
            $scope.slideIndex = index
        }





        // showProfile();
        function showProfile() {

            $log.info('show profil in recommendation controller call by directive page-recommendation');

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


        function showActionSheet() {

            // Show the action sheet
            var hideSheet = $ionicActionSheet.show({
                buttons: [
                    { text: 'Ne plus être notifié' }
                    , { text: 'Signaler' }
                    , { text: 'Je n\'aime plus' }
                    , { text: "Voir le profil" }
                ],
                cancelText: '<span class="color-white">Annuler</span>',
                cssClass: 'tinder-actionsheet',
                cancel: function () {
                    // add cancel code..
                },
                buttonClicked: function (index) {
                    return true;
                }
            });
        }

        function showEditProfile() {
            $ionicModal.fromTemplateUrl('templates/modals/edit-profile.html', {
                scope: $scope,
                animation: 'slide-in-up',
                hideDelay: 920
            }).then(function (modal) {
                $scope.modalSettings = modal;
                $scope.modalSettings.show();
                $scope.hideSettings = function () {
                    $scope.modalSettings.hide();
                }
            });
        };


        function showSettings() {
            $ionicModal.fromTemplateUrl('templates/modals/settings.html', {
                scope: $scope,
                animation: 'slide-in-up',
                hideDelay: 920
            }).then(function (modal) {
                $scope.modalSettings = modal;
                $scope.modalSettings.show();
                $scope.hideSettings = function () {
                    $scope.modalSettings.hide();
                }
            });
        };
    }

    angular.module('next.recommendation.controllers', [])
        .controller('DashCtrl', RecommendationCtrl);

})();



