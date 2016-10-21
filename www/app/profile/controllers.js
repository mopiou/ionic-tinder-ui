(function () {
    'use strict';


    function ProfilePageCtrl($log, $scope, $ionicModal) {
        var vm = this;

        $scope.showProfile = function() {
            $scope.modalProfile = $ionicModal.fromTemplate('<profile-modal></profile-modal>', {
                scope: $scope,
                animation: 'animated _zoomOut',
            })
        };
        $scope.showEditProfile = function() {
            $scope.editModalProfile = $ionicModal.fromTemplate('<edit-profile-modal></edit-profile-modal>', {
                scope: $scope,
                animation: 'animated _zoomOut',
            })
        };

        $scope.showSettings = function() {
            $scope.settingModal = $ionicModal.fromTemplate('<setting-modal></setting-modal>', {
                scope: $scope,
                animation: 'animated _zoomOut',
            })
        };

    }


    function ProfileModalCtrl($log, $scope, $ionicModal, $ionicActionSheet) {
        var vm = this;

        $scope.modalProfile.show();

        vm.showEditProfile = function () {
            $scope.editModalProfile = $ionicModal.fromTemplate('<edit-profile-modal></edit-profile-modal>', {
                scope: $scope,
                animation: 'animated _zoomOut',
            })
        };

        vm.hideProfile = function () {
            $scope.modalProfile.hide();
            //$scope.modalProfile.remove();
        };

        vm.showActionSheet = function () {
            $log.info('show action sheet');

            // Show the action sheet
            var hideSheet = $ionicActionSheet.show({
                buttons: [
                    { text: 'Ne plus être notifié' }
                    , { text: 'Signaler' }
                    , { text: 'Je n\'aime plus' }
                    , { text: "Modifier le profil" }
                ],
                cancelText: '<span class="color-white">Annuler</span>',
                cssClass: 'tinder-actionsheet',
                cancel: function () {
                    $log.info("Annul moi ca man");
                },
                buttonClicked: function (index) {

                    switch (index) {
                        case 0: $log.info("ne plus etre notif poto");
                            break;
                        case 1: $log.info("signalement sa mere");
                            break;
                        case 2: $log.info("je naime pas ca gadjo");
                            break;
                        case 3: vm.showEditProfile();
                            break;
                        default: $log.info("Autre button clicked sa emreeee");
                    }

                    return true;
                }
            });
        }

    }



    function EditProfileModalCtrl($log, $scope) {
        var vm = this;

        $scope.editModalProfile.show();

        vm.hideEditProfile = function () {
            $scope.editModalProfile.hide();
        }
    }



    angular.module('next.profile.controllers', [])
        .controller('ProfilePageCtrl', ProfilePageCtrl)
        .controller('ProfileModalCtrl', ProfileModalCtrl)
        .controller('EditProfileModalCtrl', EditProfileModalCtrl)

})();