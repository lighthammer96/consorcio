/**
 * Created by JAIR on 4/5/2017.
 */

(function () {
    'use strict';
    angular.module('sys.app.vendedores')
        .config(Config)
        .controller('VendedoresCtrl', VendedoresCtrl);

    Config.$inject = ['$stateProvider', '$urlRouterProvider'];
    VendedoresCtrl.$inject = ['$scope'];

    function VendedoresCtrl($scope)
    {
        var search = getFormSearch('frm-search-brand', 'search_b', 'LoadRecordsButtonBrand');

        var table_container_vendedores = $("#table_container_vendedores");

        table_container_vendedores.jtable({
            title: "Lista de Vendedores",
            paging: true,
            sorting: true,
            actions: {
                listAction: base_url + '/vendedores/list',
                createAction: base_url + '/vendedores/create',
                updateAction: base_url + '/vendedores/update',
                deleteAction: base_url + '/vendedores/delete',
            },
            messages: {
                addNewRecord: 'Nuevo Vendedor',
                editRecord: 'Editar Vendedor'
            },
            toolbar: {
                items: [{
                    cssClass: 'buscador',
                    text: search
                },{
                    cssClass: 'btn-primary',
                    text: '<i class="fa fa-file-excel-o"></i> Exportar a Excel',
                    click: function () {
                        $scope.openDoc('vendedores/excel', {});
                    }
                }]
            },
            fields: {
                idvendedor: {
                    key: true,
                    create: false,
                    edit: false,
                    list: false
                },
                descripcion: {
                    title: 'Vendedor'
                },
                estado: {
                    title: 'Estado',
                    values: { 'I': 'Inactivo', 'A': 'Activo' },
                    type: 'checkbox',
                    defaultValue: 'A',
                   
                },
            },
            formCreated: function (event, data) {
                // data.form.find('input[name="descripcion"]').attr('onkeypress','return soloLetras(event)');

                $('#Edit-estado').parent().addClass('i-checks');
               
                $('.i-checks').iCheck({
                    checkboxClass: 'icheckbox_square-green'
                }).on('ifChanged', function (e) {
                    $(e.target).click();
                     if(e.target.value=='A'){
                        $("#Edit-estado").val("I");
                        $(".i-checks span").text("Inactivo");

                     }else{
                        $("#Edit-estado").val("A");
                        $(".i-checks span").text("Activo");
                     };
                });
            },
            formSubmitting: function (event, data) {
                var bval = true;
                bval = bval && data.form.find('input[name="descripcion"]').required();
                return bval;
            }
        });

        generateSearchForm('frm-search-brand', 'LoadRecordsButtonBrand', function(){
            table_container_vendedores.jtable('load', {
                search: $('#search_b').val()
            });
        }, true);
    }

    function Config($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('vendedores', {
                url: '/vendedores',
                templateUrl: base_url + '/templates/vendedores/base.html',
                controller: 'VendedoresCtrl'
            });

        $urlRouterProvider.otherwise('/');
    }
})
();