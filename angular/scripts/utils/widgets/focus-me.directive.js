/**
 * Created by JAIR on 4/4/2017.
 */

(function () {
    'use strict';

    angular.module('sys.utils.widgets')
        .directive('focusMe', FocusMe)
        .directive('syncFocusWith', SyncFocusWith)
        .directive('selectAll', SelectAll);

    FocusMe.$inject = ['$timeout', '$parse'];
    SyncFocusWith.$inject = ['$timeout', '$rootScope'];
    SelectAll.$inject = ['$window'];

    function SyncFocusWith($timeout, $parse) {
        return {
            restrict: 'A',
            scope: {
                focusValue: "=syncFocusWith"
            },
            link: function ($scope, $element, attrs) {
                $scope.$watch("focusValue", function (currentValue, previousValue) {
                    if (currentValue === true && !previousValue) {
                        $element[0].focus();
                    } else if (currentValue === false && previousValue) {
                        $element[0].blur();
                    }
                })
            }
        }
    }

    function FocusMe($timeout) {
        return {
            scope: {trigger: '@focusMe'},
            link: function (scope, element) {
                scope.$watch('trigger', function (value) {
                    if (value === "true") {
                        $timeout(function () {
                            element[0].focus();
                        });
                    }
                });
            }
        };
    }

    function SelectAll($window) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                element.on(attrs.selectAll, function () {
                    if (!$window.getSelection().toString()) {
                        // Required for mobile Safari
                        this.setSelectionRange(0, this.value.length)
                    }
                });
            }
        };
    }
})();
