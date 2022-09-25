/**
 * Created by EVER on 4/5/2017.
 */

(function () {
    'use strict';
    angular.module('sys.app.payment_condition')
        .config(Config)
        .controller('PaymentConditionCtrl', PaymentConditionCtrl);

    Config.$inject = ['$stateProvider', '$urlRouterProvider'];
    PaymentConditionCtrl.$inject = ['$scope'];

    function PaymentConditionCtrl($scope)
    {
        var search = getFormSearch('frm-search-PaymentCondition', 'search_c', 'LoadRecordsButtonPaymentCondition');

        var table_container_PaymentCondition = $("#table_container_payment_condition");

        table_container_PaymentCondition.jtable({
            title: "Lista de Condiciones de Pago",
            paging: true,
            sorting: true,
            actions: {
                listAction: base_url + '/payment_condition/list',
                createAction: base_url + '/payment_condition/create',
                updateAction: base_url + '/payment_condition/update',
                deleteAction: base_url + '/payment_condition/delete'
            },
            messages: {
                addNewRecord: 'Nueva Condición de Pago',
                editRecord: 'Editar Condición de Pago'
            },
            toolbar: {
                items: [{
                    cssClass: 'buscador',
                    text: search
                },{
                    cssClass: 'btn-primary',
                    text: '<i class="fa fa-file-excel-o"></i> Exportar a Excel',
                    click: function () {
                        $scope.openDoc('payment_condition/excel', {});
                    }
                }]
            },
            fields: {
                id: {
                    key: true,
                    create: false,
                    edit: false,
                    list: false
                },
                code: {
                    title: 'Código',
                    width: '3%'
                },
                description: {
                    title: 'Descripción'
                },
                days: {
                    title: 'Días',
                    width: '1%',
                    listClass: 'text-right'
                }
            },
            formCreated: function (event, data) {
                 data.form.find('input[name="days"]').attr('onkeypress','return soloNumeros(event)');
            },
            formSubmitting: function (event, data) {
                var bval = true;
                bval = bval && data.form.find('input[name="code"]').required();
                bval = bval && data.form.find('input[name="days"]').required();
                bval = bval && data.form.find('input[name="description"]').required();
                return bval;
            }
        });

        generateSearchForm('frm-search-PaymentCondition', 'LoadRecordsButtonPaymentCondition', function(){
            table_container_PaymentCondition.jtable('load', {
                search: $('#search_c').val()
            });
        }, true);
    }

    function Config($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('payment_condition', {
                url: '/payment_condition',
                templateUrl: base_url + '/templates/payment_condition/base.html',
                controller: 'PaymentConditionCtrl'
            });

        $urlRouterProvider.otherwise('/');
    }
})
();