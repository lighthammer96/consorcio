/**
 * Created by JAIR on 4/4/2017.
 */

(function () {
    'use strict';
    angular
        .module('sys.utils.widgets')
        .constant('DOCUMENTS', {
            "DNI_DIGITS": 8,
            "RUC_DIGITS": 11
        })
        .directive('inputDocumentDni', InputDocumentDni)
        .directive('inputEmail', InputEmail);

    InputDocumentDni.$inject = ['_', 'DOCUMENTS', 'ValidateFactory'];
    InputEmail.$inject = ['_', 'REGEX', 'ValidateFactory'];

    function InputEmail(_, REGEX, ValidateFactory) {
        return {
            restrict: 'E',
            scope: {
                ngModel: '=',
                urlData: '@'
            },
            require: 'ngModel',
            template: '<input type="text" class="stv_inputAlt" allow-only-emails ' +
            'name="email" id="email" ' +
            'ng-class=\"{\'input-error\': error_email }\"\n\n ng-model="ngModel">' +
            '<i ng-show="validate" class="fa fa-spinner fa-pulse input-spinner"></i>' +
            '<span ng-show="error_email_exist">El email ya existe</span>',

            link: function (scope, $element, $attrs, ngModel) {

                scope.$watch('ngModel', function (newValue, oldValue) {
                    scope.error_email_exist = false;
                    if (!_.isUndefined(newValue)) {
                        if (!REGEX.EMAIL1.test(newValue)) {
                            ngModel.$setValidity($attrs.ngModel, false);
                            scope.error_email = true;
                        } else {
                            if (_.isUndefined(scope.urlData)) {
                                return false;
                            }
                            ValidateFactory.findByEmail(newValue, scope.urlData).then(function (result) {
                                if (result) {
                                    ngModel.$setValidity($attrs.ngModel, true);
                                    scope.error_email = false;
                                } else {
                                    ngModel.$setValidity($attrs.ngModel, false);
                                    scope.error_email = true;
                                    scope.error_email_exist = true;
                                }
                            });


                        }
                    }
                });

            }
        };
    }

    function InputDocumentDni(_, DOCUMENTS, ValidateFactory) {
        return {
            restrict: 'E',
            scope: {
                ngModel: '=ngModel',
                urlData: '@',
                maxDigits: '='
            },
            require: 'ngModel',

            template: '<input type="text" allow-only-numbers ' +
            ' char-limit="8" name="document" ng-class=\"{\'input-error\': error_document }\"\n\n class="stv_inputAlt" ' +
            'ng-model="ngModel"><i ng-show="validate"  class="fa fa-spinner fa-pulse input-spinner"></i>' +
            '<span ng-show="error_document">El documento ya existe</span>',

            link: function ($scope, $element, $attrs, ngModel) {
                $scope.$watch('ngModel', function (newValue, oldValue) {
                    if (!_.isUndefined(newValue)) {
                        if (DOCUMENTS.DNI_DIGITS == newValue.length
                            || DOCUMENTS.RUC_DIGITS == newValue.length) {
                            $scope.validate = true;
                            ValidateFactory.findByDocument(newValue, $scope.urlData).then(function (result) {
                                $scope.validate = false;
                                if (result) {
                                    hide_error();
                                } else {
                                    show_error();
                                }
                            });
                        }
                    }
                });

                function show_error() {
                    ngModel.$setValidity($attrs.ngModel, false);
                    $scope.error_document = true;
                }

                function hide_error() {
                    ngModel.$setValidity($attrs.ngModel, true);
                    $scope.error_document = false;
                }
            }
        };
    }

})();