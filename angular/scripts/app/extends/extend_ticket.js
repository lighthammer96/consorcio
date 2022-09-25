(function () {
    'use strict';
    angular
        .module('sys.app.extends')
        .controller('ModalTicketCtrl', ModalTicketCtrl)
        .directive('modalTicket', modalTicket);

    ModalTicketCtrl.$inject = ['$scope', 'RESTService', '_'];

    function ModalTicketCtrl($scope, RESTService, _) {
        var modalTicket = angular.element('#myModalTicket');

        $scope.showModalTicket = function (data) {
            $scope.modal_ticket = data;
            $scope.modal_ticket.change_prices = (_.isUndefined(data.change_prices) ? true : data.change_prices);
            modalTicket.modal({
                backdrop: 'static',
                keyboard: false
            });
        };

        $scope.removeItemModal = function (idx) {
            $scope.modal_ticket.data.data.splice(idx, 1);
        };

        $scope.addToModal = function () {
            $scope.modal_ticket.data.data.push({
                description: '',
                price: 0
            });
        };

        $scope.print_now = function () {
            $scope.printTicketNow();
            modalTicket.modal('hide');
        };
    }

    function modalTicket() {
        return {
            restrict: 'EA',
            require: '^ngModel',
            // scope: {
            //     columnsData: '= columnsData'
            // },
            templateUrl: '../../static/templates/partials/modal_ticket.html',
            controller: 'ModalTicketCtrl'
        };
    }

})();