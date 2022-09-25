/**
 * Created by JAIR on 4/5/2017.
 */

(function () {
    'use strict';
    angular.module('sys.app.brands')
        .config(Config)
        .controller('BrandCtrl', BrandCtrl);

    Config.$inject = ['$stateProvider', '$urlRouterProvider'];
    BrandCtrl.$inject = ['$scope'];

    function BrandCtrl($scope)
    {
        var search = getFormSearch('frm-search-brand', 'search_b', 'LoadRecordsButtonBrand');

        var table_container_brand = $("#table_container_brand");

        table_container_brand.jtable({
            title: "Lista de Marcas",
            paging: true,
            sorting: true,
            actions: {
                listAction: base_url + '/brands/list',
                createAction: base_url + '/brands/create',
                updateAction: base_url + '/brands/update',
                deleteAction: base_url + '/brands/delete',
            },
            messages: {
                addNewRecord: 'Nueva Marca',
                editRecord: 'Editar Marca'
            },
            toolbar: {
                items: [{
                    cssClass: 'buscador',
                    text: search
                },{
                    cssClass: 'btn-primary',
                    text: '<i class="fa fa-file-excel-o"></i> Exportar a Excel',
                    click: function () {
                        $scope.openDoc('brands/excel', {});
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
                marca: {
                    title: 'Marca'
                }
            },
            formCreated: function (event, data) {
                data.form.find('input[name="marca"]').attr('onkeypress','return soloLetras(event)');
            },
            formSubmitting: function (event, data) {
                var bval = true;
                bval = bval && data.form.find('input[name="marca"]').required();
                return bval;
            }
        });

        generateSearchForm('frm-search-brand', 'LoadRecordsButtonBrand', function(){
            table_container_brand.jtable('load', {
                search: $('#search_b').val()
            });
        }, true);
    }

    function Config($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('brands', {
                url: '/brands',
                templateUrl: base_url + '/templates/brands/base.html',
                controller: 'BrandCtrl'
            });

        $urlRouterProvider.otherwise('/');
    }
})
();