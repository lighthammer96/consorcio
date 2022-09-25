/**
 * Created by JAIR on 4/4/2017.
 */

(function () {
    'use strict';

    angular.module('sys.utils.widgets')
        .directive('chosen', Chosen);

    function Chosen() {
        var linker = function (scope, element, attrs) {
            var list = attrs['chosen'];

            scope.$watch(list, function () {
                element.trigger('chosen:updated');
            });

            scope.$watch(attrs['ngModel'], function () {
                element.trigger('chosen:updated');
            });

            element.chosen({width: '100%'});
        };

        return {
            restrict: 'A',
            link: linker
        };
    }
})();