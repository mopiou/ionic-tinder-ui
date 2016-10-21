(function () {
    'use strict';

    function SettingsModal() {
        return {
            restrict: 'EA',
            replace: true,
            templateUrl: './app/settings/template/settingsModal.html',
            scope: true,
            controllerAs: 'vm',
            bindToController: true,
            controller: 'SettingsModalCtrl',
            link: function (scope, elm, attrs) {}

        };
    }

    angular.module('next.settings.directives', [])
        .directive('settingsModal', SettingsModal);
})();
