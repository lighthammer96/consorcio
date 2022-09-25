/**
 * Created by JAIR on 4/5/2017.
 */
  
(function () {
    'use strict';
    angular.module('sys.app.resumenMensualActividads')
        .config(Config)
        .controller('ResumenMensualActividadCtrl', ResumenMensualActividadCtrl);

    Config.$inject = ['$stateProvider', '$urlRouterProvider'];
    ResumenMensualActividadCtrl.$inject = ['$scope'];

    function ResumenMensualActividadCtrl($scope)
    {
        
         $scope.chkState = function () {
            var txt_state2 = (w_state.prop('checked')) ? 'Activo' : 'Inactivo';
            state_state.html(txt_state2);
        };
        var btn_imprimirMovimiento=$("#btn_imprimirMovimiento");


        

        $("#btn_imprimirExcelMetas").click(function(e){
            
            var data_excel = {
                            Anio: $('#Anio').val(),
                            mes: $('#mes').val(),
            };
            //             $scope.openDoc('projects/excel', data_excel);
            $scope.openDocExeclMesMetas('resumenMensualActividads/excelMetas',data_excel);
        });



        $("#btn_imprimirMovimiento").click(function(e){
            var data_excel = {
                            Anio: $('#Anio').val(),
                            mes: $('#mes').val(),
             };
            //             $scope.openDoc('projects/excel', data_excel);
            $scope.loadReporResumenMensualPDF('resumenMensualActividads/pdf',data_excel);
        });

        var search = getFormSearch('frm-search-ResumenMensualActividad', 'search_b', 'LoadRecordsButtonResumenMensualActividad');

        var table_container_ResumenMensualActividad = $("#table_container_ResumenMensualActividad");

        table_container_ResumenMensualActividad.jtable({
            title: "Lista de Categorías",
            paging: true,
            sorting: true,
            actions: { 
                listAction: base_url + '/resumenMensualActividads/list',
                createAction: base_url + '/resumenMensualActividads/create',
                updateAction: base_url + '/resumenMensualActividads/update',
                deleteAction: base_url + '/resumenMensualActividads/delete',
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
                        $scope.openDoc('resumenMensualActividads/excel', {});
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

        generateSearchForm('frm-search-ResumenMensualActividad', 'LoadRecordsButtonResumenMensualActividad', function(){
            table_container_ResumenMensualActividad.jtable('load', {
                search: $('#search_b').val()
            });
        }, true);
    }

    function Config($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('resumenMensualActividads', {
                url: '/resumenMensualActividads',
                templateUrl: base_url + '/templates/resumenMensualActividads/base.html',
                controller: 'ResumenMensualActividadCtrl'
            });

        $urlRouterProvider.otherwise('/');
    }
})
();