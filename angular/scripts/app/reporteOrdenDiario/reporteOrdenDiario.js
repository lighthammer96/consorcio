/**
 * Created by JAIR on 4/5/2017.
 */
  
(function () {
    'use strict';
    angular.module('sys.app.reporteOrdenDiarios')
        .config(Config)
        .controller('ReporteOrdenDiarioCtrl', ReporteOrdenDiarioCtrl);

    Config.$inject = ['$stateProvider', '$urlRouterProvider'];
    ReporteOrdenDiarioCtrl.$inject = ['$scope', '_', 'RESTService', 'AlertFactory', 'Helpers'];

    function ReporteOrdenDiarioCtrl($scope, _, RESTService, AlertFactory, Helpers)
    {
        
         $scope.chkState = function () {
            var txt_state2 = (w_state.prop('checked')) ? 'Activo' : 'Inactivo';
            state_state.html(txt_state2);
        };
        
        var search = getFormSearchReporteOrdenesDiario('frm-search-ReporteOrdenDiario', 'search_b', 'LoadRecordsButtonReporteOrdenDiario');

        var table_container_ReporteOrdenDiario = $("#table_container_ReporteOrdenDiario");

        table_container_ReporteOrdenDiario.jtable({
            title: "Lista de Ordenes de Servicio",
            paging: true,
            sorting: true,
            actions: { 
                listAction: base_url + '/reporteOrdenDiarios/list',
            },
            messages: {
                addNewRecord: 'Nueva Categoría',
                editRecord: 'Editar Categoría',
            },
            toolbar: {
                items: [{
                    cssClass: 'buscador',
                    text: search
                }]
            },
            fields: {
                idCategoria: {
                    key: true,
                    create: false,
                    edit: false,
                    list: false
                },
                dFecRec: {
                    title: 'Fecha',
                     display: function (data) {
                        return moment(data.record.dFecRec).format('DD/MM/YYYY');
                    } 

                },
                
                 codigo_consecutivo: {
                    title: 'Código',
                },
                Marca: {
                    title: 'Marca',
                    display: function (data) {
                        var mar=data.record.marca_serie;
                        if(data.record.marca_serie==null){
                            mar=data.record.marca_vet;
                        }
                        return mar;
                    } 
                },
                cChasis: {
                    title: 'Chasis',
                },
                descripcion: {
                    title: 'Tipo Vehículo',
                },
                 razonsocial_cliente: {
                    title: 'Razon social cliente',
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


        generateSearchForm('frm-search-ReporteOrdenDiario', 'LoadRecordsButtonReporteOrdenDiario', function(){
            table_container_ReporteOrdenDiario.jtable('load', {
                            idMarca: $('#idMarca').val(),
                            idtipoveh: $('#idtipoveh').val(),
                            FechaInicioFiltro: $('#FechaInicioFiltro').val(),
                            FechaFinFiltro: $('#FechaFinFiltro').val(),
                            search: '',
            });
        }, true);

        function getDataForm () {
            RESTService.all('reporteOrdenDiarios/data_form', '', function(response) {
                if (!_.isUndefined(response.status) && response.status) {
                    var marcas=response.marcas;
                    var tiposVehicu=response.tiposVehicu;
                   
                      $("#idMarca").append('<option value="" selected>Marca</option>');
                      marcas.map(function (index) {
                         $("#idMarca").append('<option value="'+index.id+'">'+index.description+'</option>');
                      });
                       $("#idtipoveh").append('<option value="" selected>Tipo Vehículo</option>');
                      tiposVehicu.map(function (index) {
                         $("#idtipoveh").append('<option value="'+index.id+'">'+index.descripcion+'</option>');
                      });

                }
            }, function() {
                getDataForm();
            });
        }
        getDataForm();
        $("#btn_expExcel").click(function(e){
            var data_excel = {
                            idMarca: $('#idMarca').val(),
                            idtipoveh: $('#idtipoveh').val(),
                            Marca:$("#idMarca option:selected").text(),
                            tipoveh:  $("#idtipoveh option:selected").text(),

                            FechaInicioFiltro: $('#FechaInicioFiltro').val(),
                            FechaFinFiltro: $('#FechaFinFiltro').val(),
                            search: '',
             };
            //             $scope.openDoc('projects/excel', data_excel);
            $scope.openDoc('reporteOrdenDiarios/excel',data_excel);
        });


        $(".jtable-title-text").removeClass('col-md-4');
        $(".jtable-title-text").addClass('col-md-2');
        $(".buscador").removeClass('jtable-toolbar-item');

        $(".jtable-toolbar").removeClass('col-md-8');
        $(".jtable-toolbar").addClass('col-md-10');
    }

    function Config($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('reporteOrdenDiarios', {
                url: '/reporteOrdenDiarios',
                templateUrl: base_url + '/templates/reporteOrdenDiarios/base.html',
                controller: 'ReporteOrdenDiarioCtrl'
            });

        $urlRouterProvider.otherwise('/');
    }
})
();