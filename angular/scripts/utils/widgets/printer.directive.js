/**
 * Created by JAIR on 4/4/2017.
 */

(function () {
    'use strict';

    angular.module('sys.utils.widgets')
        .factory('Printer', Printer);

    Printer.$inject = ['$rootScope', '$compile', '$http', '$timeout', '$q', 'EventsFactory'];

    function Printer($rootScope, $compile, $http, $timeout, $q, EventsFactory) {
        var printHtml = function (html) {
            var deferred = $q.defer();
            var hiddenFrame = $('<iframe style="display: none"></iframe>').appendTo('body')[0];
            hiddenFrame.contentWindow.printAndRemove = function () {
                hiddenFrame.contentWindow.print();

                //trigger close windows print
                EventsFactory.pushBroadcast('onCloseWindowPrint');
                $(hiddenFrame).remove();
            };
            var htmlContent = "<!doctype html>" +
                "<html>" +
                '<body onload="printAndRemove();">' +
                html +
                '</body>' +
                "</html>";
            var doc = hiddenFrame.contentWindow.document.open("text/html", "replace");
            doc.write(htmlContent);

            deferred.resolve();
            doc.close();
            return deferred.promise;
        };

        var openNewWindow = function (html) {
            var newWindow = window.open("printTest.html");
            newWindow.addEventListener('load', function () {
                $(newWindow.document.body).html(html);
            }, false);
        };

        var print = function (templateUrl, data) {
            $http.get(templateUrl).success(function (template) {
                var printScope = $rootScope.$new();
                angular.extend(printScope, data);
                var element = $compile($('<div>' + template + '</div>'))(printScope);
                var waitForRenderAndPrint = function () {
                    if (printScope.$$phase || $http.pendingRequests.length) {
                        $timeout(waitForRenderAndPrint);
                    } else {
                        // Replace printHtml with openNewWindow for debugging
                        printHtml(element.html());
                        printScope.$destroy();
                    }
                };
                waitForRenderAndPrint();
            });
        };

        var printFromScope = function (templateUrl, scope, callback) {
            $rootScope.isBeingPrinted = true;
            $http.get(templateUrl).success(function (template) {
                var printScope = scope;
                var element = $compile($('<div>' + template + '</div>'))(printScope);

                var waitForRenderAndPrint = function () {
                    if (printScope.$$phase || $http.pendingRequests.length) {
                        $timeout(waitForRenderAndPrint);
                    } else {
                        printHtml(element.html()).then(function () {
                            $rootScope.isBeingPrinted = false;
                            if (_.isFunction(callback)) {
                                setTimeout(function() {
                                    callback();
                                }, 500);
                            }
                        });
                    }
                };
                waitForRenderAndPrint();
            });
        };
        return {
            print: print,
            printFromScope: printFromScope
        }
    }

})();