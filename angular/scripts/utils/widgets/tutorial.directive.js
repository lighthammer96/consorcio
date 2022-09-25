/**
 * Created by JAIR on 4/4/2017.
 */

(function () {
    'use strict';

    angular.module('sys.utils.widgets')
        .controller('TutorialCtrl', TutorialCtrl)
        .directive('ngTutorial', NgTutorial);

    TutorialCtrl.$inject = ['$scope', 'RESTService', 'ValidateFactory', '_', '$window'];

    function NgTutorial() {
        return {
            restrict: 'EA',
            replace: true,
            scope: {
                ngTutorial: '='
            },
            link: {
                pre: function (scope, element, attr) {
                }
            },
            templateUrl: '../static/templates/layouts/partials/tutorial.html'
        }
    }

    function TutorialCtrl($scope, RESTService, ValidateFactory, _, $window) {

        $scope.validate_document = true;
        $scope.voucherSelection = {};
        $scope.methodsSelection = {};
        $scope.taxesSelection = {};
        $scope.user = {};

        get_configurations();

        statusDefault();

        $scope.nextStepTwo = function () {
            $scope.stepTwoShow = false;
            $scope.stepThreeShow = true;
        };


        $scope.nextStepThree = function () {

            $scope.user.role_id = $scope.roleSelected.id;

            var object = {
                'my_shop_id': $scope.my_shop.id,
                'company_id': $scope.my_shop.company_id,
                'vouchers': $scope.voucherSelection.vouchers,
                'taxes': $scope.taxesSelection.taxes,
                'methods': $scope.methodsSelection.methods,
                'user': $scope.user
            };

            RESTService.save('tutorial', object, function (response) {
                $window.location.reload(true);
            });
        };
        //endregion

        $scope.user.validate_username = false;
        $scope.backStepTwo = function () {
            $scope.stepOneShow = true;
            $scope.stepTwoShow = false;
        };

        $scope.backStepTree = function () {
            $scope.stepThreeShow = false;
            $scope.stepTwoShow = true;
        };


        function statusDefault() {
            $scope.stepTwoShow = true;
            $scope.stepThreeShow = false;
            $scope.stepFourShow = false;
        }

        function get_configurations() {
            RESTService.all("my_shop", null, function (response) {
                $scope.my_shop = response.my_shop;
                $scope.tutorial = response.my_shop.tutorial;
                $scope.is_tutorial = response.my_shop.tutorial;
                $scope.vouchers = response.vouchers;
                $scope.taxes = response.taxes;
                $scope.payment_methods = response.payments_methods;
                $scope.roles = response.roles;
                $scope.roleSelected = response.roles[0];
            });
        }

        $scope.$watch('my_shop.ruc', function (new_value, old_value) {
            //console.log(_.isEmpty(new_value));
            if (!_.isEmpty(new_value)) {
                ValidateFactory.findByDocument(new_value, 'company_by_document', 'ruc=' + new_value).then(function (result) {
                    if (!_.isNull(result)) {
                        if ($scope.my_shop.ruc == new_value) {
                            result = !result;
                        }
                        $scope.validate_document = result;
                    }
                });
            }
        });

        $scope.$watch('user.username', function (new_value, old_value) {
            if (!_.isUndefined(new_value)) {
                var action = 'username=' + new_value;
                RESTService.all('unique_username', action, function (response) {
                    $scope.user.validate_username = response.status;
                });
            }
        });
    }

    //endregion
})();
