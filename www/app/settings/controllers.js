(function () {
    'use strict';




function SettingsModalCtrl($log, $scope, $ionicModal, $ionicActionSheet,Settings) {
    var vm = this;

    $log.info('SettingsModalCtrl');

    $scope.settingsModal.show();

    vm.hideSettings = function () {

        vm.settings.look_age_min = vm.slider.lookedAge.minValue;
        vm.settings.look_age_max = vm.slider.lookedAge.maxValue;

        vm.settings.look_sex = vm.settings.lookedSex.id;


        vm.settings.hide_profil = vm.settings.showProfil? "0":"1";

        $log.info(vm.settings.hide_profil);
        $log.info(vm.settings.showProfil);

        Settings.update(vm.settings)
            .then(function(data) {
                $log.debug('update settings in ctrl :',data);
            }, function(error){
                $log.error('Error settings', error);
            });


        $scope.settingsModal.hide();


    };

    vm.slider = {};
  
  vm.lookedSexChange = function() {
      $log.info('changeeee');
      $log.info(vm.settings.lookedSex);
        vm.settings.look_sex = vm.settings.lookedSex.id;

  }
  

    Settings.get()
        .then(function(settings) {
            $log.debug('settings in directives :',settings.data);
            vm.settings = settings.data[0];

            vm.lookSexOptions = [ {id: "H", name: 'Hommes uniquement'}, {id: "F", name: 'Femmes Uniquement'}, {id: "B", name: 'Hommes & femmes'} ];

            var lookedSex = vm.settings.look_sex ;
            vm.settings.lookedSex =   lookedSex === "H" ? vm.lookSexOptions[0] : (lookedSex ==="F" ? vm.lookSexOptions[1]  : vm.lookSexOptions[2] ) ;

            vm.settings.showProfil = !(!!+vm.settings.hide_profil);
        
            vm.slider.lookedAge = {
                minValue: vm.settings.look_age_min,
                maxValue: vm.settings.look_age_max,
                options: {
                    floor: 18,
                    ceil: 100,
                    step:1
                }
            };

        }, function(error){
            $log.error('Error settings', error);
        });

    }

    angular.module('next.settings.controllers', [])
        .controller('SettingsModalCtrl', SettingsModalCtrl)

})();






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