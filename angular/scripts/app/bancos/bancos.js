/**
 * Created by JAIR on 4/5/2017.
 */

(function () {
    'use strict';
    angular.module('sys.app.bancos')
        .config(Config)
        .controller('BancosCtrl', BancosCtrl);

    Config.$inject = ['$stateProvider', '$urlRouterProvider'];
    BancosCtrl.$inject = ['$scope'];

    function BancosCtrl($scope)
    {
        var search = getFormSearch('frm-search-brand', 'search_b', 'LoadRecordsButtonBrand');

        var table_container_bancos = $("#table_container_bancos");

        table_container_bancos.jtable({
            title: "Lista de Bancos",
            paging: true,
            sorting: true,
            actions: {
                listAction: base_url + '/bancos/list',
                createAction: base_url + '/bancos/create',
                updateAction: base_url + '/bancos/update',
                deleteAction: base_url + '/bancos/delete',
            },
            messages: {
                addNewRecord: 'Nuevo Banco',
                editRecord: 'Editar Banco'
            },
            toolbar: {
                items: [{
                    cssClass: 'buscador',
                    text: search
                },{
                    cssClass: 'btn-primary',
                    text: '<i class="fa fa-file-excel-o"></i> Exportar a Excel',
                    click: function () {
                        $scope.openDoc('bancos/excel', {});
                    }
                }]
            },
            fields: {
                idbanco: {
                    key: true,
                    create: false,
                    edit: false,
                    list: false
                },
                banco: {
                    title: 'Banco'
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
            table_container_bancos.jtable('load', {
                search: $('#search_b').val()
            });
        }, true);

        
    }

    function Config($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('bancos', {
                url: '/bancos',
                templateUrl: base_url + '/templates/bancos/base.html',
                controller: 'BancosCtrl'
            });

        $urlRouterProvider.otherwise('/');
    }
})
();