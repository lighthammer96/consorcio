/**
 * Created by JAIR on 4/5/2017.
 */

(function () {
    'use strict';
    angular.module('sys.app.carroceria')
        .config(Config)
        .controller('CarroceriaCtrl', CarroceriaCtrl);

    Config.$inject = ['$stateProvider', '$urlRouterProvider'];
    CarroceriaCtrl.$inject = ['$scope'];

    function CarroceriaCtrl($scope)
    {
        var search = getFormSearch('frm-search-brand', 'search_b', 'LoadRecordsButtonBrand');

        var table_container_carroceria = $("#table_container_carroceria");

        table_container_carroceria.jtable({
            title: "Lista de Carroceria",
            paging: true,
            sorting: true,
            actions: {
                listAction: base_url + '/carroceria/list',
                createAction: base_url + '/carroceria/create',
                updateAction: base_url + '/carroceria/update',
                deleteAction: base_url + '/carroceria/delete',
            },
            messages: {
                addNewRecord: 'Nueva Carroceria',
                editRecord: 'Editar Carroceria'
            },
            toolbar: {
                items: [{
                    cssClass: 'buscador',
                    text: search
                },{
                    cssClass: 'btn-primary',
                    text: '<i class="fa fa-file-excel-o"></i> Exportar a Excel',
                    click: function () {
                        $scope.openDoc('carroceria/excel', {});
                    }
                }]
            },
            fields: {
                idcarroceria: {
                    key: true,
                    create: false,
                    edit: false,
                    list: false
                },
                carroceria: {
                    title: 'Carroceria'
                }
            },
            formCreated: function (event, data) {
                // data.form.find('input[name="banco"]').attr('onkeypress','return soloLetras(event)');
            },
            formSubmitting: function (event, data) {
                var bval = true;
                bval = bval && data.form.find('input[name="banco"]').required();
                return bval;
            }
        });

        generateSearchForm('frm-search-brand', 'LoadRecordsButtonBrand', function(){
            table_container_carroceria.jtable('load', {
                search: $('#search_b').val()
            });
        }, true);
    }

    function Config($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('carroceria', {
                url: '/carroceria',
                templateUrl: base_url + '/templates/carroceria/base.html',
                controller: 'CarroceriaCtrl'
            });

        $urlRouterProvider.otherwise('/');
    }
})
();