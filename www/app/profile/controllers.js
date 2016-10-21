(function () {
    'use strict';


    function ProfilePageCtrl($log, $scope, $ionicModal) {
        var vm = this;

        $scope.showProfile = function() {
            $scope.profileModal = $ionicModal.fromTemplate('<profile-modal></profile-modal>', {
                scope: $scope,
                animation: 'animated _zoomOut',
            })
        };
        $scope.showEditProfile = function() {
            $scope.editProfileModal = $ionicModal.fromTemplate('<edit-profile-modal></edit-profile-modal>', {
                scope: $scope,
                animation: 'animated _zoomOut',
            })
        };

        $scope.showSettings = function() {
            $log.info('show settings function ');
            
            $scope.settingsModal = $ionicModal.fromTemplate('<settings-modal></settings-modal>', {
                scope: $scope,
                animation: 'animated _zoomOut',
            })

        };

    }


    function ProfileModalCtrl($log, $scope, $ionicModal, $ionicActionSheet) {
        var vm = this;

        $scope.profileModal.show();

        vm.showEditProfile = function () {
            $scope.editProfileModal = $ionicModal.fromTemplate('<edit-profile-modal></edit-profile-modal>', {
                scope: $scope,
                animation: 'animated _zoomOut',
            })
        };

        vm.hideProfile = function () {
            $scope.profileModal.hide();
            //$scope.profileModal.remove();
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

        $scope.editProfileModal.show();

        vm.hideEditProfile = function () {
            $scope.editProfileModal.hide();
        }
    }



    angular.module('next.profile.controllers', [])
        .controller('ProfilePageCtrl', ProfilePageCtrl)
        .controller('ProfileModalCtrl', ProfileModalCtrl)
        .controller('EditProfileModalCtrl', EditProfileModalCtrl)

})();