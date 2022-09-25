/**
 * Created by JAIR on 4/5/2017.
 */

(function () {
    'use strict';
    angular.module('sys.app.tipos_movimiento')
        .config(Config)
        .controller('TiposMovimientoCtrl', TiposMovimientoCtrl);

    Config.$inject = ['$stateProvider', '$urlRouterProvider'];
    TiposMovimientoCtrl.$inject = ['$scope'];

    function TiposMovimientoCtrl($scope)
    {
        var search = getFormSearch('frm-search-brand', 'search_b', 'LoadRecordsButtonBrand');

        var table_container_tipos_movimiento = $("#table_container_tipos_movimiento");

        table_container_tipos_movimiento.jtable({
            title: "Lista de Tipos Movimiento",
            paging: true,
            sorting: true,
            actions: {
                listAction: base_url + '/tipos_movimiento/list',
                createAction: base_url + '/tipos_movimiento/create',
                updateAction: base_url + '/tipos_movimiento/update',
                deleteAction: base_url + '/tipos_movimiento/delete',
            },
            messages: {
                addNewRecord: 'Nuevo Tipo Movimiento',
                editRecord: 'Editar Tipo Movimiento'
            },
            toolbar: {
                items: [{
                    cssClass: 'buscador',
                    text: search
                },{
                    cssClass: 'btn-primary',
                    text: '<i class="fa fa-file-excel-o"></i> Exportar a Excel',
                    click: function () {
                        $scope.openDoc('tipos_movimiento/excel', {});
                    }
                }]
            },
            fields: {
                codigo_tipo: {
                    key: true,
                    create: true,
                    edit: false,
                    list: true,
                    title: 'Código Tipo',
                   
                },
                tipo_movimiento: {
                    title: 'Tipo Movimiento'
                }
            },
            formCreated: function (event, data) {
                data.form.find('input[name="codigo_tipo"]').attr('maxlength', '5');
                // data.form.find('input[name="tipo_movimiento"]').attr('onkeypress','return soloLetras(event)');

                // console.log(data.form);
            },
            formSubmitting: function (event, data) {
                var bval = true;
                bval = bval && data.form.find('input[name="codigo_tipo"]').required();
                bval = bval && data.form.find('input[name="tipo_movimiento"]').required();
                return bval;
            }
        });

        generateSearchForm('frm-search-brand', 'LoadRecordsButtonBrand', function(){
            table_container_tipos_movimiento.jtable('load', {
                search: $('#search_b').val()
            });
        }, true);
    }

    function Config($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('tipos_movimiento', {
                url: '/tipos_movimiento',
                templateUrl: base_url + '/templates/tipos_movimiento/base.html',
                controller: 'TiposMovimientoCtrl'
            });

        $urlRouterProvider.otherwise('/');
    }
})
();