(function () {
    'use strict';


    function LikeButton() {
        return {
            restrict: 'EA',
            replace: true,
            templateUrl: './app/components/like/template/like.html',
            //scope: {},
            scope: true,
            controllerAs: 'vm',
            bindToController: true,
            /*jshint unused:false*/
            controller : 'LikeCtrl',
            link: function (scope, elm, attrs) {}
        };
    }

    angular.module('next.components.like.directives', [])
        .directive('likeButton', LikeButton);
})();
