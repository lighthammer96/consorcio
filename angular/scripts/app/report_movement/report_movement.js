/**
 * Created by JAIR on 4/5/2017.
 */
  
(function () {
    'use strict';
    angular.module('sys.app.report_movements')
        .config(Config)
        .controller('Report_movementCtrl', Report_movementCtrl);

    Config.$inject = ['$stateProvider', '$urlRouterProvider'];
    Report_movementCtrl.$inject = ['$scope'];

    function Report_movementCtrl($scope)
    {
        var titlemodalReportMovement=$("#titlemodalReportMovement");
        var modalReportMovement=$("#modalReportMovement");

        function newReportMovement()
        {
            titlemodalReportMovement.html('Nueva Report Movement');
            modalReportMovement.modal('show');
        }

         $scope.chkState = function () {
            var txt_state2 = (w_state.prop('checked')) ? 'Activo' : 'Inactivo';
            state_state.html(txt_state2);
        };
        
        var search = getFormSearch('frm-search-Report_movement', 'search_b', 'LoadRecordsButtonReport_movement');

        var table_container_Report_movement = $("#table_container_Report_movement");

        table_container_Report_movement.jtable({
            title: "Lista de Categorías",
            paging: true,
            sorting: true,
            actions: { 
                listAction: base_url + '/categories/list',
                // createAction: base_url + '/report_movements/create',
                // updateAction: base_url + '/report_movements/update',
                // deleteAction: base_url + '/report_movements/delete',
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
                        $scope.openDoc('report_movements/excel', {});
                    }
                },{
                    cssClass: 'btn-danger-admin',
                    text: '<i class="fa fa-plus"></i> Nueva Reporte Movimiento',
                    click: function () {
                        newReportMovement();
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

        generateSearchForm('frm-search-Report_movement', 'LoadRecordsButtonReport_movement', function(){
            table_container_Report_movement.jtable('load', {
                search: $('#search_b').val()
            });
        }, true);
    }

    function Config($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('report_movements', {
                url: '/report_movements',
                templateUrl: base_url + '/templates/report_movements/base.html',
                controller: 'Report_movementCtrl'
            });

        $urlRouterProvider.otherwise('/');
    }
})
();