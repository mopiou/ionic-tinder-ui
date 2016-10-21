(function () {
    'use strict';


    function SettingsModalCtrl($log, $scope, $ionicModal, $ionicActionSheet) {
        var vm = this;

        $log.info('SettingsModalCtrl');

        $scope.settingsModal.show();


        vm.hideSettings = function () {
            $scope.settingsModal.hide();
            //$scope.settingsModal.remove();
        };
    }

    angular.module('next.settings.controllers', [])
        .controller('SettingsModalCtrl', SettingsModalCtrl)

})();