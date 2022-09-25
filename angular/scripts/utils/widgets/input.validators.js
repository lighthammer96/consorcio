/**
 * Created by JAIR on 4/4/2017.
 */

(function () {
    'use strict';

    angular.module('sys.utils.widgets')
        .directive('allowOnlyNumbers', AllowOnlyNumbers)
        .directive('allowOnlyEmails', AllowOnlyEmails)
        .directive('capitalize', Capitalize)
        .directive('passwordVerify', PasswordVerify)
        .directive('replace', Replace);


    function PasswordVerify() {
        return {
            require: "ngModel",
            scope: {
                passwordVerify: '='
            },
            link: function (scope, element, attrs, ctrl) {
                scope.$watch(function () {
                    var combined;

                    if (scope.passwordVerify || ctrl.$viewValue) {
                        combined = scope.passwordVerify + '_' + ctrl.$viewValue;
                    }
                    return combined;
                }, function (value) {
                    if (value) {
                        ctrl.$parsers.unshift(function (viewValue) {
                            var origin = scope.passwordVerify;
                            if (origin !== viewValue) {
                                ctrl.$setValidity('noMatch', false);
                                return undefined;
                            } else {
                                ctrl.$setValidity('noMatch', true);
                                return viewValue;
                            }
                        });
                    }
                });
            }
        };
    }

    function Capitalize() {
        return {
            require: 'ngModel',
            link: function (scope, element, attrs, modelCtrl) {
                var capitalize = function (inputValue) {
                    if (inputValue == undefined) inputValue = '';
                    var capitalized = inputValue.toUpperCase();
                    if (capitalized !== inputValue) {
                        modelCtrl.$setViewValue(capitalized);
                        modelCtrl.$render();
                    }
                    return capitalized;
                }
                modelCtrl.$parsers.push(capitalize);
                capitalize(scope[attrs.ngModel]);  // capitalize initial value
            }
        };
    }

    function Replace() {
        return {
            require: 'ngModel',
            scope: {
                regex: '@replace',
                with: '@with'
            },
            link: function (scope, element, attrs, model) {
                model.$parsers.push(function (val) {
                    if (!val) {
                        return;
                    }
                    var regex = new RegExp(scope.regex);
                    var replaced = val.replace(regex, scope.with);
                    if (replaced !== val) {
                        model.$setViewValue(replaced);
                        model.$render();
                    }
                    return replaced;
                });
            }
        };
    }

    function AllowOnlyNumbers() {
        return {
            restrict: 'A',
            link: function (scope, elm, attrs, ctrl) {
                elm.on('keydown keyup', function (event) {
                    if (event.keyCode !== 9 && event.type === 'keyup') {
                        var $input = $(this);
                        var value = $input.val();
                        value = value.replace(/[^0-9]{1,8}/g, '');
                        $input.val(value);
                        if (event.which == 64 || event.which == 16) {
                            // to allow numbers
                            return false;
                        } else if (event.which >= 48 && event.which <= 57) {
                            // to allow numbers
                            return true;
                        } else if (event.which >= 96 && event.which <= 105) {
                            // to allow numpad number
                            return true;
                        } else if ([8, 13, 27, 37, 38, 39, 40].indexOf(event.which) > -1) {
                            // to allow backspace, enter, escape, arrows
                            return true;
                        } else {
                            event.preventDefault();
                            // to stop others
                            //alert("Sorry Only Numbers Allowed");
                            return false;
                        }
                    }
                });
            }
        }
    }

    function AllowOnlyEmails() {
        return {
            replace: true,
            template: '<input replace="[^a-zA-Z0-9@._-]" with="">'
        }
    }

})();