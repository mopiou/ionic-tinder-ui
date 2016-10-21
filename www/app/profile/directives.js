(function () {
    'use strict';


    function ProfilePage() {
        return {
            restrict: 'EA',
            replace: true,
            templateUrl: './app/profile/template/profile.html',
            scope: {},
            controllerAs: 'vm',
            bindToController: true,
            controller: 'ProfilePageCtrl',
            link: function (scope, elm, attrs) {
            }
        };
    }

    function ProfileModal() {
        return {
            restrict: 'EA',
            replace: true,
            templateUrl: './app/profile/template/profileModal.html',
            scope: true,
            controllerAs: 'vm',
            bindToController: true,
            controller: 'ProfileModalCtrl',
            link: function (scope, elm, attrs) {}

        };
    }

    function EditProfileModal() {
        return {
            restrict: 'EA',
            replace: true,
            templateUrl: './app/profile/template/editProfileModal.html',
            scope: true,
            controllerAs: 'vm',
            bindToController: true,
            controller: 'EditProfileModalCtrl',
            link: function (scope, elm, attrs) { }
        };
    }
    angular.module('next.profile.directives', [])
        .directive('profilePage', ProfilePage)
        .directive('profileModal', ProfileModal)
        .directive('editProfileModal', EditProfileModal);
})();
