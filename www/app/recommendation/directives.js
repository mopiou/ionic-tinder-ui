(function () {
    'use strict';


    function Recommendation() {
        return {
            restrict: 'EA',
            replace: true,
            templateUrl: './app/recommendation/template/recommendations.html',
            scope: {},
            controllerAs: 'vm',
            bindToController: true,
            /*jshint unused:false*/
            controller : 'RecommendationCtrl',
            link: function (scope, elm, attrs) {    }
        };
    }

    angular.module('next.recommendation.directives', [])
        .directive('recommendationsPage', Recommendation);
})();
