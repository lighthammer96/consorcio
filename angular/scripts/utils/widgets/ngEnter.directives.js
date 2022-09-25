/**
 * Created by JAIR on 4/4/2017.
 */

(function () {
    'use strict';

    angular.module('sys.utils.widgets')
        .directive('ngEnter', NgEnter)
        .directive('ngEnterSales', ngEnterSales);

    function ngEnterSales() {
        return {
            scope: {
                status: '='
            },
            link: function (scope, element, attrs) {
                element.bind("keydown keypress", function (event) {
                    if (event.which === 13) {
                        scope.$apply(function () {
                            scope.$eval(attrs.ngEnter);
                        });
                        event.preventDefault();
                    }
                });
            }
        }
    }

    function NgEnter() {
        return {
            link: function (scope, element, attrs) {
                element.bind("keydown keypress", function (event) {
                    console.log("enter");
                    if (event.which === 13 && !event.ctrlKey) {
                        scope.$apply(function () {
                            scope.$eval(attrs.ngEnter);
                        });

                        event.preventDefault();
                    }
                });
            }
        }
    }

})();
