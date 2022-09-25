/**
 * Created by JAIR on 4/5/2017.
 */
 
(function () {
    'use strict';
    angular.module('sys.app.typechanges')
        .config(Config)
        .controller('TypeChangeCtrl', TypeChangeCtrl);

    Config.$inject = ['$stateProvider', '$urlRouterProvider'];
    TypeChangeCtrl.$inject = ['$scope'];

    function TypeChangeCtrl($scope)
    {
        var search = getFormSearch('frm-search-typechange', 'search_tc', 'LoadRecordsButtonTypeChange');

        var table_container_typechange = $("#table_container_typechange");

        table_container_typechange.jtable({
            title: "Lista de Tipos de Cambios",
            paging: true,
            sorting: true,
            actions: {
                listAction: base_url + '/type_change/list',
                createAction: base_url + '/type_change/create',
                updateAction: base_url + '/type_change/update',
                deleteAction: base_url + '/type_change/delete'
            },
            messages: {
                addNewRecord: 'Nuevo Tipo de Cambio',
                editRecord: 'Editar Tipo de Cambio'
            },
            toolbar: {
                items: [{
                    cssClass: 'buscador',
                    text: search
                },{
                    cssClass: 'btn-primary',
                    text: '<i class="fa fa-file-excel-o"></i> Exportar a Excel',
                    click: function () {
                        $scope.openDoc('type_change/excel', {});
                    }
                 }]
            },
            fields: {
                id: {
                    title: 'Fecha-id',
                    type: 'date',
                    key: true,
                    create: false,
                    edit: false,
                    list: false
                },

                Fecha: {
                    title: 'Fecha',
                    type: 'date',
                    listClass:'text-center',
                    displayFormat: 'dd/mm/yy'
                },

                IdMoneda: {
                    title: 'Moneda',
                    listClass:'text-right',
                    options: base_url + '/type_change/getMonedas',
                    defaultValue: 2,
                },
                Compra: {
                    title: 'Sunat Compra',
                    listClass:'text-right'
                },
                Venta: {
                    title: 'Sunat Venta',
                    listClass:'text-right'
                },
                 cambioComercialCompra: {
                    title: 'Comercial Compra',
                    listClass:'text-right'
                },
                 cambioComercialVenta: {
                    title: 'Comercial Venta',
                    listClass:'text-right'
                },
            },
            formCreated: function (event, data) {
                data.form.find('input[name="Compra"]').attr('onkeypress','return validDecimals(event, this, 4)')
                    .attr('onblur','return roundDecimals(this, 3)');
                data.form.find('input[name="Venta"]').attr('onkeypress','return validDecimals(event, this, 4)')
                    .attr('onblur','return roundDecimals(this, 3)');
                data.form.find('input[name="cambioComercialCompra"]').attr('onkeypress','return validDecimals(event, this, 4)')
                    .attr('onblur','return roundDecimals(this, 3)');
                data.form.find('input[name="cambioComercialVenta"]').attr('onkeypress','return validDecimals(event, this, 4)')
                    .attr('onblur','return roundDecimals(this, 3)');    
                var date_cong = data.form.find('input[name="Fecha"]');
                var data_moneda = data.form.find('select[name="IdMoneda"]');
                if (date_cong.val() !== '') {
                    date_cong.prop('disabled', true);
                    data_moneda.prop('disabled', true);
                }
                
                // generateSarkDecimal();
            },
            formSubmitting: function (event, data) {
                var bval = true;
                bval = bval && data.form.find('input[name="Fecha"]').required();
                bval = bval && data.form.find('input[name="Compra"]').required();
                bval = bval && data.form.find('input[name="Venta"]').required();
                bval = bval && data.form.find('input[name="cambioComercialCompra"]').required();
                bval = bval && data.form.find('input[name="cambioComercialVenta"]').required();
                return bval;
            }
        });

        generateSearchForm('frm-search-typechange', 'LoadRecordsButtonTypeChange', function(){
            table_container_typechange.jtable('load', {
                search: $('#search_tc').val()
            });
        }, true);
    }

    function Config($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('type_change', {
                url: '/type_change',
                templateUrl: base_url + '/templates/typechanges/base.html',
                controller: 'TypeChangeCtrl'
            });

        $urlRouterProvider.otherwise('/');
    }
})
();
