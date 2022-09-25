/**
 * Created by JAIR on 4/5/2017.
 */

(function () {
    'use strict';
    angular.module('sys.app.currencys')
        .config(Config)
        .controller('CurrencyCtrl', CurrencyCtrl);

    Config.$inject = ['$stateProvider', '$urlRouterProvider'];
    CurrencyCtrl.$inject = ['$scope'];

    function CurrencyCtrl($scope)
    {
        var search = getFormSearch('frm-search-Currency', 'search_b', 'LoadRecordsButtonCurrency');

        var table_container_Currency = $("#table_container_currency");

        table_container_Currency.jtable({
            title: "Lista de Monedas",
            paging: true,
            sorting: true,
            actions: {
                listAction: base_url + '/currencys/list',
                createAction: base_url + '/currencys/create',
                updateAction: base_url + '/currencys/update',
                deleteAction: base_url + '/currencys/delete',
            },
            messages: {
                addNewRecord: 'Nueva Moneda',
                editRecord: 'Editar Moneda',
            },
            toolbar: {
                items: [{
                    cssClass: 'buscador',
                    text: search
                },{
                    cssClass: 'btn-primary',
                    text: '<i class="fa fa-file-excel-o"></i> Exportar a Excel',
                    click: function () {
                        $scope.openDoc('currencys/excel', {});
                    }
                }]
            },
            fields: {
                IdMoneda: {
                    key: true,
                    create: false,
                    edit: false,
                    list: false
                },
                Moneda: {
                    title: 'Moneda'
                },
                
                Simbolo: {
                    title: 'Simbolo'
                },
                Equivalencia: {
                    title: 'Equivalencia'
                },
                Abreviatura: {
                    title: 'Abreviatura'
                }, 
                Estado: {
                    title: 'Estado',
                    values: { 'I': 'Inactivo', 'A': 'Activo' },
                    type: 'checkbox',
                    listClass: 'text-center',
                    defaultValue: 'A',
                   
                   
                },
                
            },
            formCreated: function (event, data) {
                data.form.find('input[name="Moneda"]').attr('onkeypress','return soloLetras(event)');
            },
            formSubmitting: function (event, data) {
                var bval = true;
                bval = bval && data.form.find('input[name="Moneda"]').required();
                return bval;
            }
        });

        generateSearchForm('frm-search-Currency', 'LoadRecordsButtonCurrency', function(){
            table_container_Currency.jtable('load', {
                search: $('#search_b').val()
            });
        }, true);
    }

    function Config($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('currencys', {
                url: '/currencys',
                templateUrl: base_url + '/templates/currencys/base.html',
                controller: 'CurrencyCtrl'
            });

        $urlRouterProvider.otherwise('/');
    }
})
();