/**
 * Created by JAIR on 4/5/2017.
 */

(function () {
    'use strict';
    angular.module('sys.app.formas_pago')
        .config(Config)
        .controller('FormasPagoCtrl', FormasPagoCtrl);

    Config.$inject = ['$stateProvider', '$urlRouterProvider'];
    FormasPagoCtrl.$inject = ['$scope'];

    function FormasPagoCtrl($scope)
    {
        var search = getFormSearch('frm-search-brand', 'search_b', 'LoadRecordsButtonBrand');

        var table_container_formas_pago = $("#table_container_formas_pago");

        table_container_formas_pago.jtable({
            title: "Lista de Formas Pago",
            paging: true,
            sorting: true,
            actions: {
                listAction: base_url + '/formas_pago/list',
                createAction: base_url + '/formas_pago/create',
                updateAction: base_url + '/formas_pago/update',
                deleteAction: base_url + '/formas_pago/delete',
            },
            messages: {
                addNewRecord: 'Nueva Forma Pago',
                editRecord: 'Editar Forma Pago'
            },
            toolbar: {
                items: [{
                    cssClass: 'buscador',
                    text: search
                },{
                    cssClass: 'btn-primary',
                    text: '<i class="fa fa-file-excel-o"></i> Exportar a Excel',
                    click: function () {
                        $scope.openDoc('formas_pago/excel', {});
                    }
                }]
            },
            fields: {
                codigo_formapago: {
                    key: true,
                    create: true,
                    edit: false,
                    list: true,
                    title: 'Código Tipo',
                   
                },
                forma_pago: {
                    title: 'Forma Pago'
                }
            },
            formCreated: function (event, data) {
                data.form.find('input[name="codigo_formapago"]').attr('maxlength', '5');
                // data.form.find('input[name="forma_pago"]').attr('onkeypress','return soloLetras(event)');

                // console.log(data.form);
            },
            formSubmitting: function (event, data) {
                var bval = true;
                bval = bval && data.form.find('input[name="codigo_formapago"]').required();
                bval = bval && data.form.find('input[name="forma_pago"]').required();
                return bval;
            }
        });

        generateSearchForm('frm-search-brand', 'LoadRecordsButtonBrand', function(){
            table_container_formas_pago.jtable('load', {
                search: $('#search_b').val()
            });
        }, true);
    }

    function Config($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('formas_pago', {
                url: '/formas_pago',
                templateUrl: base_url + '/templates/formas_pago/base.html',
                controller: 'FormasPagoCtrl'
            });

        $urlRouterProvider.otherwise('/');
    }
})
();