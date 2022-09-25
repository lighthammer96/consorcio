/**
 * Created by JAIR on 4/5/2017.
 */

(function () {
    'use strict';
    angular.module('sys.app.cuentas_bancarias')
        .config(Config)
        .controller('CuentasBancariasCtrl', CuentasBancariasCtrl);

    Config.$inject = ['$stateProvider', '$urlRouterProvider'];
    CuentasBancariasCtrl.$inject = ['$scope'];

    function CuentasBancariasCtrl($scope)
    {
        var search = getFormSearch('frm-search-brand', 'search_b', 'LoadRecordsButtonBrand');

        var table_container_cuentas_bancarias = $("#table_container_cuentas_bancarias");

        table_container_cuentas_bancarias.jtable({
            title: "Lista de Cuentas Bancarias",
            paging: true,
            sorting: true,
            actions: {
                listAction: base_url + '/cuentas_bancarias/list',
                createAction: base_url + '/cuentas_bancarias/create',
                updateAction: base_url + '/cuentas_bancarias/update',
                deleteAction: base_url + '/cuentas_bancarias/delete',
            },
            messages: {
                addNewRecord: 'Nueva Cuenta Bancaria',
                editRecord: 'Editar Cuenta Bancaria'
            },
            toolbar: {
                items: [{
                    cssClass: 'buscador',
                    text: search
                },{
                    cssClass: 'btn-primary',
                    text: '<i class="fa fa-file-excel-o"></i> Exportar a Excel',
                    click: function () {
                        $scope.openDoc('cuentas_bancarias/excel', {});
                    }
                }]
            },
            fields: {
                id_cuentabancaria: {
                    key: true,
                    create: false,
                    edit: false,
                    list: false,
                },
                idbanco: {
                    title: 'Banco',
                    options: base_url + '/cuentas_bancarias/getBancos' 

                },
                IdMoneda: {
                    title: 'Moneda',
                    options: base_url + '/type_change/getMonedas',
                },
                numero_cuenta: {
                    title: 'Número Cuenta'
                },
                descripcion_cuenta: {
                    title: 'Descripcion Cuenta'
                },
                
            },
            formCreated: function (event, data) {
     
                //data.form.find('input[name="convenio"]').attr('onkeypress','return soloLetras(event)');
               
            },
            formSubmitting: function (event, data) {
                var bval = true;
                // bval = bval && data.form.find('input[name="codigo_formapago"]').required();
                bval = bval && data.form.find('input[name="numero_cuenta"]').required();
                bval = bval && data.form.find('input[name="descripcion_cuenta"]').required();
                return bval;
            }
        });

        generateSearchForm('frm-search-brand', 'LoadRecordsButtonBrand', function(){
            table_container_cuentas_bancarias.jtable('load', {
                search: $('#search_b').val()
            });
        }, true);
    }

    function Config($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('cuentas_bancarias', {
                url: '/cuentas_bancarias',
                templateUrl: base_url + '/templates/cuentas_bancarias/base.html',
                controller: 'CuentasBancariasCtrl'
            });

        $urlRouterProvider.otherwise('/');
    }
})
();