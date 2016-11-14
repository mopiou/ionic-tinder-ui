(function () {
    'use strict';




function SettingsModalCtrl($log, $scope, $ionicModal, $ionicActionSheet,Settings) {
    var vm = this;

    $log.info('SettingsModalCtrl');

    $scope.settingsModal.show();

    vm.hideSettings = function () {
        $scope.settingsModal.hide();
        //$scope.settingsModal.remove();
    };

    var initHideProfilText = function (){
        vm.settings.hideProfilText = "Vote profil"+(vm.settings.hide_profil ? " ne sera pas " : " sera " ) + "visible par les utilisateurs NEXT";
    }
        
    vm.hideProfilChanged = function(){
        initHideProfilText();
    }



    Settings.get()
        .then(function(settings) {
            $log.debug('settings in directives :',settings.data);
            vm.settings = settings.data[0];
            var lookedSex = vm.settings.look_sex ;
            vm.settings.look_sex =   lookedSex === 'M' ? 'Hommes' : (lookedSex ==='F' ? 'Femmes' : 'Hommes, Femmes' ) ;

            initHideProfilText();
            

        }, function(error){
            $log.error('Error settings', error);
        });

    }

    angular.module('next.settings.controllers', [])
        .controller('SettingsModalCtrl', SettingsModalCtrl)

})();

