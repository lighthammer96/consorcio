(function () {
    'use strict';
    angular
        .module('sys.app.extends')
        .controller('ModalPayCtrl', ModalPayCtrl)
        .directive('modalPay', modalPay);

    ModalPayCtrl.$inject = ['$scope', 'RESTService', 'Notify', 'AlertFactory'];

    function ModalPayCtrl($scope, RESTService, Notify, AlertFactory) {
        var document_pay = angular.element('#document_pay');
        var address_pay = angular.element('#address_pay');
        var modalPay = angular.element('#myModal');

        var cleanModalPay = function () {
            $scope.data_pay = {
                vouchers: [],
                concepts: [],
                payment_methods: [],
                correlative: '',
                voucher_id: 1,
                voucher_name: '',
                methods: [],
                // method_id: '',
                // concept_id: '',
                price_sale: 0,
                detail_sale: 'Por consumo',
                // glosa: '',
                // show_glosa: false,
                check_custom: false,
                is_pay_all: true
            };
        };
        cleanModalPay();

        $scope.showModalPay = function () {
            cleanModalPay();
            getDataPayment();
            modalPay.modal({
                backdrop: 'static',
                keyboard: false
            });
            $scope.is_pay_all = true;
            console.log($scope.data_ticket);
            $scope.data_ticket.client_pay.type_document = (_.isUndefined($scope.data_ticket.client_pay.type_document))
                ? 1 : $scope.data_ticket.client_pay.type_document;
            $scope.data_ticket.client_pay.document = (_.isUndefined($scope.data_ticket.client_pay.document))
                ? '' : $scope.data_ticket.client_pay.document;
            $scope.data_ticket.client_pay.address = (_.isUndefined($scope.data_ticket.client_pay.address))
                ? '' : $scope.data_ticket.client_pay.address;
            $scope.data_pay.is_pay_all = (_.isUndefined($scope.data_ticket.is_pay_all))
                ? true : $scope.data_ticket.is_pay_all;
            $scope.data_pay.voucher_id = (_.isUndefined($scope.data_ticket.client_pay.type_document)
                || $scope.data_ticket.client_pay.type_document > 2)
                ? 0 : $scope.data_ticket.client_pay.type_document;
            $scope.data_pay.price_sale = $scope.data_ticket.total;
            angular.element('#payClient_value').val($scope.data_ticket.client_pay.label);
        };

        $scope.changeTypeDocument = function () {
            if (_.isNull($scope.data_pay.voucher_id)) {
                $scope.data_pay.voucher_id = 1;
            }
            setNameVoucher();
            RESTService.get('serie', $scope.data_pay.voucher_id, function (response) {
                if (!_.isUndefined(response.status)) {
                    $scope.data_pay.correlative = response.correlative;
                }
            });
        };

        $scope.changePaymentMethod = function () {
            if ($scope.data_pay.method_id == 1) {
                $scope.data_pay.show_glosa = false;
                $scope.data_pay.glosa = '';
            } else {
                $scope.data_pay.show_glosa = true;
            }
        };

        $scope.actionPay = function () {
            if (angular.element('#payClient_value').val() == '') {
                Notify.warning('Debe ingresar el cliente que realizará el pago');
                return false;
            }
            if ($scope.data_pay.voucher_id == 2) {
                if (_.isNull($scope.data_ticket.client_pay.document) || $scope.data_ticket.client_pay.document == '' ||
                    $scope.data_ticket.client_pay.document.length < 11) {
                    Notify.warning('Debe ingresar un número de RUC válido');
                    return false;
                } else if ($scope.data_ticket.client_pay.address == '' || _.isNull($scope.data_ticket.client_pay.address)) {
                    Notify.warning('Debe ingresar la direccion del cliente');
                    return false;
                }
            }
            if ($scope.data_pay.check_custom) {
                if ($scope.data_pay.detail_sale == '') {
                    Notify.warning('Si va a realizar un pago personalizado debe ingresar el texto a mostrar ' +
                        'en el comprobante');
                    return false;
                } else if (parseFloat($scope.data_pay.price_sale) < parseFloat($scope.data_ticket.total)) {
                    Notify.warning('Si va a realizar un pago personalizado el monto a mostrar no puede ser menor que ' +
                        'el que debe pagar');
                    return false;
                }
            }
            $scope.data_ticket.client_pay.label = angular.element('#payClient_value').val();
            if ($scope.data_ticket.client_pay.is_client == false ||
                _.isUndefined($scope.data_ticket.client_pay.type_document_name)) {
                $scope.data_ticket.client_pay.type_document_name = 'DNI';
            }
            var total_pay = 0; var validMethod = true;
            _.each($scope.data_pay.methods, function (item) {
                if (_.isNull(item.amount)) {
                    Notify.warning('Por favor ingrese el monto a pagar correctamente');
                    validMethod = false;
                    return false;
                } else if (item.amount <= 0) {
                    Notify.warning('Por favor ingrese un monto que no sea menor o igual a S/ 0.00');
                    validMethod = false;
                    return false;
                }
                total_pay += item.amount;
            });
            if (validMethod == false) {
                return false;
            }
            if ($scope.data_pay.is_pay_all == true && total_pay != $scope.data_ticket.total) {
                Notify.warning('El monto a pagar no puede ser diferente al de el total');
                return false;
            }
            if (total_pay == 0) {
                Notify.warning('El monto a pagar no puede tener un total de S/ 0.00');
                return false;
            } else if (total_pay > $scope.data_ticket.total) {
                Notify.warning('El monto a pagar no puede ser mayor al monto total');
                return false;
            }
            var data_pay = {
                data_sale: $scope.data_ticket,
                voucher_id: $scope.data_pay.voucher_id,
                methods: $scope.data_pay.methods
            };
            $scope.data_ticket.subtotal = total_pay;

            var options = {
                message: '¿Está seguro que desea realizar el pago?',
                confirm: 'Si',
                cancel: 'No'
            };
            AlertFactory.confirm(options, function (options) {
                var url_pay = ($scope.data_pay.is_pay_all) ? 'pay' : 'pay_reception';
                RESTService.updated(url_pay, $scope.data_ticket.order_id, data_pay, function (response) {
                    if (!_.isUndefined(response.status) && response.status == true) {
                        modalPay.modal('hide');
                        $scope.printTicketPay(response);
                    } else {
                        AlertFactory.textType({
                            title: '',
                            message: response.message,
                            type: 'warning'
                        });
                    }
                });
            });
        };

        $scope.clientSelectedPay = function (response) {
            if (!_.isUndefined(response)) {
                var client = response.originalObject;
                $scope.$broadcast('angucomplete-alt:changeInput', 'payClient', client.label);
                $scope.data_ticket.client_pay = client;
                $scope.data_ticket.client_pay.is_client = true;
            }
        };

        $scope.isEmpty = function (response) {
            if (response == '') {
                if ($scope.data_ticket.client_pay.is_client == true) {
                    $scope.data_ticket.client_pay.is_client = false;
                    $scope.data_ticket.client_pay.document = '';
                    $scope.data_ticket.client_pay.address = '';
                }
            }
        };

        $scope.addToMethod = function (amount) {
            if (!_.isUndefined($scope.data_pay.concepts[0]) &&
                !_.isUndefined($scope.data_pay.payment_methods[0])) {
                $scope.data_pay.methods.push({
                    method_id: $scope.data_pay.payment_methods[0].id,
                    concept_id: $scope.data_pay.concepts[0].id,
                    amount: amount,
                    glosa: ''
                });
            }
            // console.log($scope.data_pay.methods);
        };

        $scope.removeMethod = function (idx) {
            $scope.data_pay.methods.splice(idx, 1);
        };

        var getDataPayment = function () {
            var concept = (_.isUndefined($scope.data_ticket.concept)) ? 1 : $scope.data_ticket.concept;
            var data = 'concept=' + concept;
            RESTService.all('data_payment', data, function (response) {
                if (!_.isUndefined(response.status)) {
                    $scope.data_pay.vouchers = response.vouchers;
                    $scope.data_pay.concepts = response.concepts;
                    $scope.data_pay.payment_methods = response.payment_methods;
                    $scope.data_pay.correlative = response.correlative;
                    $scope.addToMethod($scope.data_ticket.total);
                    setNameVoucher();
                }
            });
        };

        var setNameVoucher = function () {
            var find = _.find($scope.data_pay.vouchers, function (item) {
                return item.id === $scope.data_pay.voucher_id
            });
            if (find) { $scope.data_pay.voucher_name = find.description; }
        };
    }

    function modalPay() {
        return {
            restrict: 'EA',
            require: '^ngModel',
            // scope: {
            //     columnsData: '= columnsData'
            // },
            templateUrl: '../../static/templates/partials/modal_pay.html',
            controller: 'ModalPayCtrl'
        };
    }

})();