/**
 * Created by JAIR on 4/5/2017.
 */

(function () {
    'use strict';
    angular.module('sys.app.factor_credito')
        .config(Config)
        .controller('FactorCreditoCtrl', FactorCreditoCtrl);

    Config.$inject = ['$stateProvider', '$urlRouterProvider'];
    FactorCreditoCtrl.$inject = ['$scope'];

    function FactorCreditoCtrl($scope)
    {
        var search = getFormSearch('frm-search-brand', 'search_b', 'LoadRecordsButtonBrand');

        var table_container_factor_credito = $("#table_container_factor_credito");
        // alert("hola ss");
        table_container_factor_credito.jtable({
            title: "Lista de Factores de Crédito",
            paging: true,
            sorting: true,
            actions: {
                listAction: base_url + '/factor_credito/list',
                createAction: base_url + '/factor_credito/create',
                updateAction: base_url + '/factor_credito/update',
                deleteAction: base_url + '/factor_credito/delete',
            },
            messages: {
                addNewRecord: 'Nuevo Factor Credito',
                editRecord: 'Editar Factor Credito'
            },
            toolbar: {
                items: [{
                    cssClass: 'buscador',
                    text: search
                },{
                    cssClass: 'btn-primary',
                    text: '<i class="fa fa-file-excel-o"></i> Exportar a Excel',
                    click: function () {
                        $scope.openDoc('factor_credito/excel', {});
                    }
                }]
            },
            fields: {
                idfactor: {
                    key: true,
                    create: false,
                    edit: false,
                    list: false
                },
                nrocuotas: {
                    title: 'Nro Cuotas'
                },
                porcentaje: {
                    title: 'Porcentaje'
                }
            },
            formCreated: function (event, data) {
                data.form.find('input[name="nrocuotas"]').attr('type','number');
                data.form.find('input[name="porcentaje"]').attr('type','number');
            },
            formSubmitting: function (event, data) {
                var bval = true;
                bval = bval && data.form.find('input[name="nrocuotas"]').required();
                bval = bval && data.form.find('input[name="porcentaje"]').required();
                return bval;
            }
        });

        generateSearchForm('frm-search-brand', 'LoadRecordsButtonBrand', function(){
            table_container_factor_credito.jtable('load', {
                search: $('#search_b').val()
            });
        }, true);
    }

    function Config($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('factor_credito', {
                url: '/factor_credito',
                templateUrl: base_url + '/templates/factor_credito/base.html',
                controller: 'FactorCreditoCtrl'
            });

        $urlRouterProvider.otherwise('/');
    }
})
();