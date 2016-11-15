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

/*
    var initHideProfilText = function (){
        vm.settings.hideProfilText = "Vote profil"+(vm.settings.hide_profil ? " ne sera pas " : " sera " ) + "visible par les utilisateurs NEXT";
    }
        
    vm.hideProfilChanged = function(){
        initHideProfilText();
    }
*/


    Settings.get()
        .then(function(settings) {
            $log.debug('settings in directives :',settings.data);
            vm.settings = settings.data[0];
            var lookedSex = vm.settings.look_sex ;
            vm.settings.look_sex =   lookedSex === 'M' ? 'Hommes' : (lookedSex ==='F' ? 'Femmes' : 'Hommes, Femmes' ) ;

            console.log(vm.settings.showProfil);

            vm.settings.showProfil = !(!!+vm.settings.hide_profil);
            console.log(vm.settings.showProfil);
            //initHideProfilText();
        
            vm.slider = {
                minValue: vm.settings.look_age_min,
                maxValue: vm.settings.look_age_max,
                options: {
                    floor: 18,
                    ceil: 120,
                    step:1
                }
            };

/*
            floor: 0,
            ceil: 10,
            step: 1,
            precision: 0,
            draggableRange: false,
            showSelectionBar: false,
            hideLimitLabels: false,
            readOnly: false,
            disabled: false,
            showTicks: false,
            showTicksValues: false
*/

        }, function(error){
            $log.error('Error settings', error);
        });

    }

    angular.module('next.settings.controllers', [])
        .controller('SettingsModalCtrl', SettingsModalCtrl)

})();

