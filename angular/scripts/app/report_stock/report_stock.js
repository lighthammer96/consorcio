/**
 * Created by JAIR on 4/5/2017.
 */
  
(function () {
    'use strict';
    angular.module('sys.app.report_stocks')
        .config(Config)
        .controller('Report_StockCtrl', Report_StockCtrl);

    Config.$inject = ['$stateProvider', '$urlRouterProvider'];
    Report_StockCtrl.$inject = ['$scope'];

    function Report_StockCtrl($scope)
    {
        
        var titlemodalReporteStock=$("#titlemodalReporteStock");
        var modalReporteStock=$("#modalReporteStock");

        function newReporteStock()
        {
            titlemodalReporteStock.html('Nueva Reporte Stock');
            modalReporteStock.modal('show');
        }

         $scope.chkState = function () {
            var txt_state2 = (w_state.prop('checked')) ? 'Activo' : 'Inactivo';
            state_state.html(txt_state2);
        };
        
        var search = getFormSearch('frm-search-Report_Stock', 'search_b', 'LoadRecordsButtonReport_Stock');

        var table_container_Report_Stock = $("#table_container_Report_Stock");

        table_container_Report_Stock.jtable({
            title: "Lista de Categorías",
            paging: true,
            sorting: true,
            actions: { 
                listAction: base_url + '/categories/list',
                // createAction: base_url + '/report_stocks/create',
                // updateAction: base_url + '/report_stocks/update',
                // deleteAction: base_url + '/report_stocks/delete',
            },
            messages: {
                addNewRecord: 'Nueva Categoría',
                editRecord: 'Editar Categoría',
            },
            toolbar: {
                items: [{
                    cssClass: 'buscador',
                    text: search
                },{
                    cssClass: 'btn-primary',
                    text: '<i class="fa fa-file-excel-o"></i> Exportar a Excel',
                    click: function () {
                        $scope.openDoc('report_stocks/excel', {});
                    }
                },{
                    cssClass: 'btn-danger-admin',
                    text: '<i class="fa fa-plus"></i> Nuevo Reporte Stock',
                    click: function () {
                        newReporteStock();
                    }
                }]
            },
            fields: {
                idCategoria: {
                    key: true,
                    create: false,
                    edit: false,
                    list: false
                },
                Categoria: {
                    title: 'Categoría',
                     

                },
                estado: {
                    title: 'Estado',
                    values: { 'I': 'Inactivo', 'A': 'Activo' },
                    type: 'checkbox',
                    defaultValue: 'A',
                   
                },

            },
           

            formCreated: function (event, data) {
                data.form.find('input[name="Categoria"]').attr('onkeypress','return soloLetras(event)');
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
                bval = bval && data.form.find('input[name="Categoria"]').required();
                return bval;
            }
        });

        generateSearchForm('frm-search-Report_Stock', 'LoadRecordsButtonReport_Stock', function(){
            table_container_Report_Stock.jtable('load', {
                search: $('#search_b').val()
            });
        }, true);
    }

    function Config($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('report_stocks', {
                url: '/report_stocks',
                templateUrl: base_url + '/templates/report_stocks/base.html',
                controller: 'Report_StockCtrl'
            });

        $urlRouterProvider.otherwise('/');
    }
})
();