/**
 * Created by JAIR on 4/5/2017.
 */
  
(function () {
    'use strict';
    angular.module('sys.app.movimiento_cierres')
        .config(Config)
        .controller('Movimiento_cierreCtrl', Movimiento_cierreCtrl);

    Config.$inject = ['$stateProvider', '$urlRouterProvider'];
    Movimiento_cierreCtrl.$inject = ['$scope','_', 'RESTService', 'AlertFactory', 'Notify'];

    function Movimiento_cierreCtrl($scope, _, RESTService, AlertFactory, Notify)
    {
        var  modalMovimietoCierre=$("#modalMovimietoCierre");
        var  titlemodalMovimietoCierre=$("#titlemodalMovimietoCierre");
 

        var periodo=$("#periodo");
        var estado=$("#estado");
        var btnPreCierre=$("#btnPreCierre");
        var btnReversar=$("#btnReversar");
        var table_movi_cierre=$("#table_movi_cierre");
        var btnCierreInventario=$("#btnCierreInventario");
        var idMovimiento=$("#idMovimiento");
        var btnImprimir=$("#btnImprimir");
        var btnExcel=$("#btnExcel"); 

        $("#btnExcel").click(function(e){
            if(periodo.val()!=''){
                if(estado.val()!=''){
                     var data_excel = {
                                periodo: periodo.val(),
                                estado:$("#estado option:selected").text(),
                     }
                    $scope.openDoc('movimiento_cierres/excelPerido',data_excel);
             };
            }


        });


        periodo.select2();
         $scope.chkState = function () {
            var txt_state2 = (w_state.prop('checked')) ? 'Activo' : 'Inactivo';
            state_state.html(txt_state2);
        };
         modalMovimietoCierre.on('hidden.bs.modal', function (e) {
            cleanMoCi();
        });
         $("#btnImprimir").click(function(e){
            if(periodo.val()!=''){
                if(estado.val()!=''){
                 var data_pdf = {
                            periodo: periodo.val(),
                            estado:$("#estado option:selected").text(),
                }
                 $scope.loadQueryStockPDFCierre('movimiento_cierres/pdf', data_pdf);
             };
                       //             $scope.openDoc('projects/excel', data_pdf);
            }
           
            // $scope.openDoc('query_movements/pdf',data_pdf);
        });

         function cleanMoCi(){
            periodo.val("").trigger("change");
            estado.val("");
            btnPreCierre.val("");
            idMovimiento.val("");
            periodo.prop('disabled',false);
            btnPreCierre.prop('disabled',false);
            btnReversar.prop('disabled',false);
            btnCierreInventario.prop('disabled',false);
         };
        //  function findRegister_movement(id)
        // {
        //     titlemodalMovimieto.html('Editar Movimiento');
          
        //     RESTService.get('register_movements/find', id, function(response) {
        //         if (!_.isUndefined(response.status) && response.status) {
                   
        //              mov_ar.map(function(index) {
        //                 var ver='A';
        //                 var tipo='NA';
        //                 var codl="";
        //                 var datl="";
        //                 if(index.serie=='1'){
        //                     ver='N';
        //                 }
        //                 if(index.serie=='1'){
        //                     tipo='SE';
        //                 }else if(index.lote=='1'){
        //                     tipo='LE';
        //                     codl=index.idLote;
        //                 }
        //                 console.log(index.costo2);
        //                 console.log("sss");

        //                 addArticuloTable(index.idArticulo,index.description,Math.trunc(index.cantidad),ver,index.consecutivo,tipo,codl,datl,index.idAlmacen,index.idLocalizacion,index.costo2,index.costo_total,index.precio,index.precio_total);                      
        //               })
                   
        //             modalMovimieto.modal("show");
                   
        //         } else {
        //             AlertFactory.textType({
        //                 title: '',
        //                 message: 'Hubo un error al obtener el Artículo. Intente nuevamente.',
        //                 type: 'error'
        //             });
        //         }
        //     });
        // }

        btnCierreInventario.click(function(e){
            saveCierre();
        });
        btnReversar.click(function(e){
             AlertFactory.confirm({
                    title: '',
                    message: '¿Está seguro que desea Reversar este periodo?',
                    confirm: 'Si',
                    cancel: 'No'
                }, function () {
                    saveReversar();
                });
            
        });
         btnPreCierre.click(function(e){

            savePreCierre();
        });
         function saveReversar(){
             
                    var periodos=periodo.val();
                var myArray = periodos.split("*");
                var periodoEnvi=myArray[0];
                   var id=periodoEnvi;
              RESTService.get('movimiento_cierres/reversarCierre', id, function(response) {
                if (!_.isUndefined(response.status) && response.status) {
                    AlertFactory.textType({
                            title: '',
                            message: 'El registro se reversó correctamente',
                            type: 'success'
                        });
                        btnPreCierre.prop('disabled',false);
                        btnReversar.prop('disabled',false);
                        btnCierreInventario.prop('disabled',true);
                        periodo.prop('disabled',false);
                        estado.val("");
                        periodo.val("").trigger("change");
                        $("#LoadRecordsButtonMovimiento_cierre").click();
                        $("#LoadRecordsButtonMovimiento_cierre2").click();
                } else {
                    AlertFactory.textType({
                        title: '',
                        message: 'Hubo un error al obtener el Artículo. Intente nuevamente.',
                        type: 'error'
                    });
                }
            });
         }
         function findRegister_movementCierre(id){
            titlemodalMovimietoCierre.html('Ver Cierre');
             RESTService.get('movimiento_cierres/findMov', id, function(response) {
                if (!_.isUndefined(response.status) && response.status) {
                    var data_p = response.data;
                    periodo.html("");
                        periodo.append('<option value="">Seleccionar</option>');
                       _.each(response.periodos, function(item) {
                        periodo.append('<option value="'+item.periodo+'*'+item.estado+'">'+item.periodo+'</option>');
                    });
                  
                    var per=data_p[0].periodo+'*'+data_p[0].estado;
                    console.log(per);
                    periodo.val(per).trigger("change");
                    periodo.prop('disabled',true);
                    if(estado.val()=='C'){
                        btnPreCierre.prop('disabled',true);
                        btnReversar.prop('disabled',true);
                        btnCierreInventario.prop('disabled',true);
                    }else if(estado.val()=='P'){
                         btnPreCierre.prop('disabled',true);
                         btnReversar.prop('disabled',false);
                         btnCierreInventario.prop('disabled',false);
                    }
                    $("#LoadRecordsButtonMovimiento_cierre2").click();
                    modalMovimietoCierre.modal('show');
                } else {
                    AlertFactory.textType({
                        title: '',
                        message: 'Hubo un error al obtener el Artículo. Intente nuevamente.',
                        type: 'error'
                    });
                }
            });
           
         }
        function savePreCierre(){
            var bval =true;
            bval = bval && periodo.required();

            if(bval){
                var periodos=periodo.val();
                var myArray = periodos.split("*");
                var periodoEnvi=myArray[0];
                var params = {
                    'periodo':periodoEnvi,
                    'estado':estado.val(),
                };
               
                var id_Movimiento = (idMovimiento.val() === '') ? 0 : idMovimiento.val();
                RESTService.updated('movimiento_cierres/saveMovimientArticuloPreCierre',id_Movimiento, params, function(response) {
                    if (!_.isUndefined(response.status) && response.status) {
                        AlertFactory.textType({
                            title: '',
                            message: 'El registro se guardó correctamente',
                            type: 'success'
                        });
                        periodo.prop('disabled',true);
                        btnPreCierre.prop('disabled',true);
                        btnReversar.prop('disabled',false);
                        btnCierreInventario.prop('disabled',false);
                        estado.val('P');
                         $('#LoadRecordsButtonMovimiento_cierre2').click();
                        $('#LoadRecordsButtonMovimiento_cierre').click();
                    } else {
                        var msg_ = (_.isUndefined(response.message)) ?
                            'No se pudo guardar el movimiento. Intente nuevamente.' : response.message;
                        AlertFactory.textType({
                            title: '',
                            message: msg_,
                            type: 'info'
                        });
                    }
                });
                
            }    
        }
        function saveCierre(){
            var bval =true;
            bval = bval && periodo.required();
            if(bval){
                var params = {
                    'periodo':periodo.val(),
                    'estado':estado.val(),
                };
               
                var id_Movimiento = (idMovimiento.val() === '') ? 0 : idMovimiento.val();
                RESTService.updated('movimiento_cierres/saveMovimientArticuloCierre',id_Movimiento, params, function(response) {
                    if (!_.isUndefined(response.status) && response.status) {
                        AlertFactory.textType({
                            title: '',
                            message: 'El registro se guardó correctamente',
                            type: 'success'
                        });
                        periodo.prop('disabled',true);
                        btnPreCierre.prop('disabled',true);
                        btnReversar.prop('disabled',true);
                        btnCierreInventario.prop('disabled',true);
                        estado.val('C');
                        $('#LoadRecordsButtonMovimiento_cierre2').click();
                        $('#LoadRecordsButtonMovimiento_cierre').click();
                    } else {
                        var msg_ = (_.isUndefined(response.message)) ?
                            'No se pudo guardar el movimiento. Intente nuevamente.' : response.message;
                        AlertFactory.textType({
                            title: '',
                            message: msg_,
                            type: 'info'
                        });
                    }
                });
                
            }    
        }
        function getDataFormMovimientoCierre () {
            RESTService.all('movimiento_cierres/data_formMoviCierre', '', function(response) {
                if (!_.isUndefined(response.status) && response.status) {
                        var periodosTotal=response.periodos;
                        console.log(periodosTotal);
                        periodo.html("");
                        periodo.append('<option value="">Seleccionar</option>');
                       _.each(response.periodos, function(item) {
                        periodo.append('<option value="'+item.periodo+'*'+item.estado+'">'+item.periodo+'</option>');
                    });
                } 
            }, function() {
                getDataFormMovimientoCierre();
            });
        }

        getDataFormMovimientoCierre(); 
        function newCierreMovimiento()
        {
            titlemodalMovimietoCierre.html('Nuevo Cierre');
            modalMovimietoCierre.modal('show');
             $('#LoadRecordsButtonMovimiento_cierre2').click();
        }
        periodo.change(function () {
             var periodos=periodo.val();
             var myArray = periodos.split("*");
             estado.val(myArray[1]);
            
        });
        
        var search = getFormSearch('frm-search-Movimiento_cierre', 'search_b', 'LoadRecordsButtonMovimiento_cierre');

        var table_container_Movimiento_cierre = $("#table_container_Movimiento_cierre");

        table_container_Movimiento_cierre.jtable({
            title: "Lista de Cierres de Inventario",
            paging: true,
            sorting: true,
            actions: { 
                listAction: base_url + '/movimiento_cierres/list',
            },
            messages: {
                addNewRecord: 'Nuevo Cierre',
                editRecord: 'Editar Cierre',
            },
            toolbar: { 
                items: [{
                    cssClass: 'buscador',
                    text: search
                },{
                    cssClass: 'btn-primary',
                    text: '<i class="fa fa-file-excel-o"></i> Exportar a Excel',
                    click: function () {
                        $scope.openDoc('movimiento_cierres/excel', {});
                    }
                },{
                    cssClass: 'btn-danger-admin',
                    text: '<i class="fa fa-plus"></i> Nuevo Cierre',
                    click: function () {
                        newCierreMovimiento();
                    }
                }]
            },
            fields: {
                periodo: {
                    title: '#',
                    key: true,
                    create: false,
                },
                  estado: {
                    title: 'Estado',
                    values: { 'C': 'Cerrado', 'A': 'Abierto' ,'P':'Pre-Cerrado'},
                    type: 'checkbox',
                    defaultValue: 'A',
                }
                ,edit: {
                    width: '1%',
                    sorting: false,
                    edit: false,
                    create: false,
                    listClass: 'text-center',
                    display: function (data) {
                        return '<a href="javascript:void(0)" class="edit-idMovimientoCierre" data-id="'+data.record.periodo
                            +'" title="Editar"><i class="fa fa-edit fa-1-5x"></i></a>';
                    }

                },

            },
            recordsLoaded: function(event, data) {
                $('.edit-idMovimientoCierre').click(function(e){
                    var id = $(this).attr('data-id');
                    findRegister_movementCierre(id);
                    e.preventDefault();
                });
                  
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

        generateSearchForm('frm-search-Movimiento_cierre', 'LoadRecordsButtonMovimiento_cierre', function(){
            table_container_Movimiento_cierre.jtable('load', {
                search: $('#search_b').val()
            });
        }, true);

        var search2 = getFormSearchCierre('frm-search-Movimiento_cierre2', 'search_b2', 'LoadRecordsButtonMovimiento_cierre2',$("#periodo").val(),$("#estado").val(),$("#idMovimiento").val());

        var table_container_Movimiento_cierre2 = $("#table_container_Movimiento_cierre2");

        table_container_Movimiento_cierre2.jtable({
            title: "Lista  Movimientos",
            paging: true,
            sorting: true,
            actions: { 
                listAction: base_url + '/movimiento_cierres/list_movimientosCerrados',
            }, 
            messages: {
                addNewRecord: 'Nuevo Cierre',
                editRecord: 'Editar Cierre',
            },
            toolbar: { 
                items: [{
                    cssClass: 'buscador',
                    text: search2
                }]
            },
            fields: {
                id: {
                    title: '#',
                    key: true,
                    create: false,
                    list:false,
                },
                Almacen: {
                    title: 'Almacen',
                },
                Localizacion: {
                    title: 'Localizacion',
                    
                },
                code_article: {
                    title: 'Cod. Artículo',
                },
                 Articulo: {
                    title: 'Articulo',
                },
                Unidad: {
                      title: 'Unidad',
                },
                 Lote: {
                      title: 'Lote',
                },
                 Serie: {
                      title: 'Serie',
                },
                Disponible: {
                      title: 'Disponible',
                },
                 Transito: {
                      title: 'En transito',
                },
                 Remitido: {
                      title: 'Remitido',
                },
                 Total: {
                      title: 'Total',
                         width: '10%',
                },
                CostoCierre: {
                      title: 'Costo',
                },
                TotalCosto: {
                    title: 'Costo Total',
                     width: '10%',
                    display: function (data) {
                        var total=Number(data.record.Total)*Number(data.record.CostoCierre);
                        return total.toFixed(2);
                    },
                },
               
               
            },
             recordsLoaded: function(event, data) {
                $('.edit-idMovimiento').click(function(e){
                    var id = $(this).attr('data-id');
                    // findRegister_movement(id);
                    e.preventDefault();
                });
                  
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

        generateSearchForm('frm-search-Movimiento_cierre2', 'LoadRecordsButtonMovimiento_cierre2', function(){
            $("#table_container_Movimiento_cierre2").jtable('load', {
                search: $('#search_b2').val(),
                perido_busquedad:$('#periodo').val(),
                // estado_busquedad:$('#estado').val(),
                // idMovimientoBusquedad:$('#idMovimiento').val(),
            });
        }, true);
    }



    function Config($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('movimiento_cierres', {
                url: '/movimiento_cierres',
                templateUrl: base_url + '/templates/movimiento_cierres/base.html',
                controller: 'Movimiento_cierreCtrl'
            });

        $urlRouterProvider.otherwise('/');
    }
})
();