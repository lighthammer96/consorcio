/**
 * Created by JAIR on 12/12/2016.
 */
(function () {
    'use strict';
    angular
        .module('sys.app.extends')
        .controller('ModalPaymentCtrl', ModalPaymentCtrl)
        .directive('modalPayment', modalPayment);

    ModalPaymentCtrl.$inject = ['$scope'];

    function ModalPaymentCtrl($scope) {
        var modalPayment = angular.element('#modalPayment');

        $scope.data_payment = [];

        $scope.showModalPayment = function (data) {
            console.log(data);
            $scope.showTab('tab1');
            $scope.data_payment = data;
            $scope.total_detail = 0;
            $scope.total_payment = 0;
            _.each($scope.data_payment.detail, function (item) {
                $scope.total_detail += item.nights * item.price * item.quantity;
            });
            _.each($scope.data_payment.payments, function (item) {
                item.edit = false;
                $scope.total_payment += parseFloat(item.amount);
            });
            modalPayment.modal({
                backdrop: 'static',
                keyboard: false
            });
        };
    }

    function modalPayment() {
        return {
            restrict: 'EA',
            require: '^ngModel',
            templateUrl: '../../static/templates/partials/modal_payment.html',
            controller: 'ModalPaymentCtrl'
        };
    }

})();