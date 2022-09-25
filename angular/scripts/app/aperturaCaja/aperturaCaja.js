/**
 * Created by JAIR on 4/5/2017.
 */
  
(function () {
    'use strict';
    angular.module('sys.app.aperturaCajas')
        .config(Config)
        .controller('AperturaCajaCtrl', AperturaCajaCtrl);

    Config.$inject = ['$stateProvider', '$urlRouterProvider'];
    AperturaCajaCtrl.$inject = ['$scope','_', 'RESTService', 'AlertFactory', 'Notify'];

    function AperturaCajaCtrl($scope, _, RESTService, AlertFactory, Notify)
    {   
        
        var usuarioActual;
        var modalAperturaCaja=$("#modalAperturaCaja");
        var titlemodalAperturaCaja=$("#titlemodalAperturaCaja");
        
        var idUsuario=$("#idUsuario");  
        var idCaja=$("#idCaja");
        var estado=$("#estado");
        var btn_imprimirCaja=$("#btn_imprimirCaja");
        var ventanaP;
        
        var idCajaDiaria=$("#idCajaDiaria");
        var fechaCaja=$("#fechaCaja");
        
        var consecutivo=$("#consecutivo");
        var btn_procesarApertura=$("#btn_procesarApertura");
        var totalEfectivo=$("#totalEfectivo");
        var totalEgresos=$("#totalEgresos");
        var totalOtrosIngresos=$("#totalOtrosIngresos");
        var totalNoEfectivo=$("#totalNoEfectivo");
        var totalEfectivoDol=$("#totalEfectivoDol");
        var totalEgresosDol=$("#totalEgresosDol");
        var totalOtrosIngresosDol=$("#totalOtrosIngresosDol");
        var totalNoEfectivoDol=$("#totalNoEfectivoDol");

        var btn_apertura=$("#btn_apertura");
        var btn_cierra=$("#btn_cierra");

        var table_demoninacionesSoles=$("#table_demoninacionesSoles");
        var totalSoles=$("#totalSoles");
        var table_demoninacionesDolares=$("#table_demoninacionesDolares");
        var totalDolares=$("#totalDolares");
        

        idUsuario.select2(); 
        idCaja.select2();

        btn_imprimirCaja.click(function (e) {
                var data = {idUsuario:idUsuario.val(),fechaCaja:fechaCaja.val()};
               
                    if($("#estadReporte").val()==1){
                       $scope.loadMovimientoCajaPDF('aperturaCajas/pdfdiar', data);
                    }else if($("#estadReporte").val()==2){
                       $scope.loadMovimientoCuadreCajaPDF('aperturaCajas/Cuadrepdfdiar', data);
                    }else if($("#estadReporte").val()==3){
                        // alert($("#idCajaDiaria").val());
                        // $scope.loadMovimientoEmisionComproPDF('aperturaCajas/EmisionComprpdfdiar', data);
                        window.open("aperturaCajas/reporte_EmisionComprpdf/"+$("#idCajaDiaria").val());
                    }
            
        });
         function findCajaDiaria(id) {
            titlemodalAperturaCaja.html('Editar Apertura de Caja');
            RESTService.get('aperturaCajas/find', id, function (response) {
                if (!_.isUndefined(response.status) && response.status) {
                    var data_p = response.data;
                    var data_fecha = response.fechaCaja;
                    var data_detalle = response.dataDetalle;
                    var dataDenominacion = response.dataDenominacion;

                    idUsuario.val(data_p.idUsuario).trigger("change");
                    idCaja.val(data_p.idCaja).trigger("change");
                    estado.val(data_p.estado);
                    idCajaDiaria.val(data_p.idCajaDiaria);
                    fechaCaja.val(data_p.fechaCaja2);

                    totalEfectivo.val(data_p.totalEfectivo);
                    totalEgresos.val(data_p.totalEgresos);
                    totalOtrosIngresos.val(data_p.totalOtrosIngresos);
                    totalNoEfectivo.val(data_p.totalNoEfectivo);
                    totalEfectivoDol.val(data_p.totalEfectivoDol);
                    totalEgresosDol.val(data_p.totalEgresosDol);
                    totalOtrosIngresosDol.val(data_p.totalOtrosIngresosDol);
                    totalNoEfectivoDol.val(data_p.totalNoEfectivoDol);

                    fechaCaja.prop('disabled',true);
                    idCaja.prop('disabled',true);
                    if(data_p.estado==0){
                        btn_procesarApertura.prop('disabled',true);
                    }
                    ventanaP='A';
                   // console.log(data_p);
                   // console.log(data_detalle);
                   console.log(dataDenominacion);

                   consecutivo.val(data_detalle[0].consecutivo);
                   
                    _.each(dataDenominacion, function (c) {
                       if(c.idMoneda=='1' && c.tipo=='1'){
                            var estadoCant='disabled';
                            addDenominacionSoles(c.id_denominacion,c.descripcion,Number(c.cantidad),Number(c.monto),estadoCant);
                        }else if(c.idMoneda=='2' && c.tipo=='1'){
                            var estadoCant='disabled';
                            addDenominacionDolar(c.id_denominacion,c.descripcion,Number(c.cantidad),Number(c.monto),estadoCant);
                        }
                    });
                   sumar_cantidades();
                    modalAperturaCaja.modal('show');
                   
                } else {
                    AlertFactory.textType({
                        title: '',
                        message: 'Hubo un error al obtener la caja. Intente nuevamente.',
                        type: 'error'
                    });
                }
            });
        }
        function printCaja(id) {
          var ide =moment(id).format('YYYY-MM-DD');
            var data = {
                id: ide,
            };
        
            $scope.loadMovimientoCajaPDF('aperturaCajas/pdf_diarioApert', data);
          
        }
        function getDataFormDescuento () {
            RESTService.all('aperturaCajas/data_formDesc', '', function(response) {
                if (!_.isUndefined(response.status) && response.status) {
                        idUsuario.append('<option value="">Seleccionar</option>');
                       _.each(response.usuarios, function(item) {
                        idUsuario.append('<option value="'+item.id+'">'+item.name+'</option>');

                    });
                } 
            }, function() {
                getDataFormDescuento();
            });
        }
        getDataFormDescuento();

        function getDataFormCajaDiaria() {
            RESTService.all('aperturaCajas/data_form', '', function(response) {
                if (!_.isUndefined(response.status) && response.status) {
                    console.log(response.cajas);
                        idCaja.append('<option value="">Seleccionar</option>');
                       _.each(response.cajas, function(item) {
                        idCaja.append('<option value="'+item.idcaja+'">'+item.nombre_caja+'</option>');
                    });
                    idUsuario.val(response.usuario).trigger("change");
                    usuarioActual=response.usuario;
                } 
            }, function() {
                getDataFormCajaDiaria();
            });
        }
        getDataFormCajaDiaria();
        $('#btn_apertura').click(function (e) {
            ventanaP='A';
             if(estado.val()==""){
                 generarTablaApertura();      
             }else{
                var apertura='1';
                generarTablaView(apertura);
             }
        });
        $('#btn_cierra').click(function (e) {
            ventanaP='C';
             if(estado.val()==""){
                AlertFactory.textType({
                        title: '',
                        message: 'Debe aperturar la caja',
                        type: 'info'
                    });
            }else if(estado.val()==1){
                generarTablaApertura();
            }else if(estado.val()==0){
                var apertura='0';
                generarTablaView(apertura);
            }
            // else{

            // }    
        });
        function generarTablaView(apertura){
            table_demoninacionesSoles.html("");
            table_demoninacionesDolares.html("");
            var id=idCajaDiaria.val();
            RESTService.get('aperturaCajas/getDenominacionesView', id, function(response) {
                 if (!_.isUndefined(response.status) && response.status) {
                      var data_p = response.dataDenominacion;
                      table_demoninacionesSoles.html("");
                      table_demoninacionesDolares.html("");
                     _.each(data_p, function (c) {
                        if(c.idMoneda=='1' && c.tipo==apertura){
                            var estadoCant='disabled';
                            addDenominacionSoles(c.id_denominacion,c.descripcion,Number(c.cantidad),Number(c.monto),estadoCant);
                        }else if(c.idMoneda=='2' && c.tipo==apertura){
                            var estadoCant='disabled';
                            addDenominacionDolar(c.id_denominacion,c.descripcion,Number(c.cantidad),Number(c.monto),estadoCant);
                        }
                    });
                     sumar_cantidades();
                     console.log(data_p);
                 }else {
                    AlertFactory.textType({
                        title: '',
                        message: 'Hubo un error . Intente nuevamente.',
                        type: 'error'
                    });
                }

               });
        }
        function sumar_cantidades(){
            console.log("sumando");
            var totalt=0;
            var totalD=0;
            $("#table_demoninacionesSoles tr").each(function(){
                var cantidadt=Number($(this).find("td:eq(1)").children("input").val());
                var monto=Number($(this).find("td:eq(2)").children("input").val());
                var subtota=cantidadt*monto;
                totalt=totalt+monto;
                console.log("sumando2");
            });
            totalSoles.val(totalt.toFixed(2));
            $("#table_demoninacionesDolares tr").each(function(){
                var cantidadt=Number($(this).find("td:eq(1)").children("input").val());
                var monto=Number($(this).find("td:eq(2)").children("input").val());
                var subtota=cantidadt*monto;
                totalD=totalD+monto;
                console.log("sumando2");
            });
            totalDolares.val(totalD.toFixed(2));
            if(estado.val()==''){
                totalEfectivo.val(totalt.toFixed(2));
                totalEfectivoDol.val(totalD.toFixed(2));
            }
        }
        function generarTablaApertura(){
            table_demoninacionesSoles.html("");
            table_demoninacionesDolares.html("");
            var id="0";
            RESTService.get('aperturaCajas/getDenominaciones', id, function(response) {
                 if (!_.isUndefined(response.status) && response.status) {
                      var data_p = response.dataDenominacion;
                     _.each(data_p, function (c) {
                        if(c.idMoneda=='1'){
                            var cantidad=0;
                            var estadoCant='';
                            addDenominacionSoles(c.id_denominacion,c.descripcion,cantidad,Number(c.valor),estadoCant);
                        }else if(c.idMoneda=='2'){
                            var cantidad=0;
                            var estadoCant='';
                            addDenominacionDolar(c.id_denominacion,c.descripcion,cantidad,Number(c.valor),estadoCant);
                        }
                      
                    });
                      sumar_cantidades();
                     console.log(data_p);
                 }else {
                    AlertFactory.textType({
                        title: '',
                        message: 'Hubo un error . Intente nuevamente.',
                        type: 'error'
                    });
                }

               });
        }

        function addDenominacionSoles(idDenominacion,denominacion,cantidad,monto,estadoCant) {
             var tr = $('<tr id="tr_b_' + idDenominacion + '"></tr>');
             var td1 = $('<td>' + denominacion + '</td>');
             var td2 =$('<td></td>');
             var td3 =$('<td></td>');
             var iddenominacion =$('<input type="hidden" name="idDenominacionS[]" class="idDenominacionS form-control input-sm"  value="' +idDenominacion+ '"  />');
             var cantidad = $('<input type="text" name="cantidadS[]" class="cantidadS form-control input-sm"   value="' +cantidad+ '"  onkeypress="return soloNumeros(event)" '+estadoCant+'/>');
             var monto = $('<input type="text" name="montoS[]" class="montoS form-control input-sm"  value="' +monto+ '"  disabled/>');
             td1.append(iddenominacion);
             td2.append(cantidad);
             td3.append(monto);
             tr.append(td1).append(td2).append(td3);
             table_demoninacionesSoles.append(tr);
             $('.cantidadS').keyup(function (e) {
                 sumar_cantidades();
            });
        } 
        function addDenominacionDolar(idDenominacion,denominacion,cantidad,monto,estadoCant) {
             var tr = $('<tr id="tr_b_' + idDenominacion + '"></tr>');
             var td1 = $('<td>' + denominacion + '</td>');
             var td2 =$('<td></td>');
             var td3 =$('<td></td>');
             var iddenominacion =$('<input type="hidden" name="idDenominacionD[]" class="idDenominacionD form-control input-sm"  value="' +idDenominacion+ '"  />');
             var cantidad = $('<input type="text" name="cantidadD[]" class="cantidadD form-control input-sm"  value="' +cantidad+ '"  onkeypress="return soloNumeros(event)" '+estadoCant+'/>');
             var monto = $('<input type="text" name="montoD[]" class="montoD form-control input-sm"  value="' +monto+ '"  disabled/>');
             td1.append(iddenominacion);
             td2.append(cantidad);
             td3.append(monto);
             tr.append(td1).append(td2).append(td3);
             table_demoninacionesDolares.append(tr);
             $('.cantidadD').keyup(function (e) {
                 sumar_cantidades();
            });
        } 
        function cleanAperturaCaja() {
            cleanRequired();
            titlemodalAperturaCaja.html('');
            idUsuario.val(usuarioActual).trigger("change");
            idCaja.val("").trigger("change");
            estado.val("").trigger("change");
            $("#estadReporte").val("");
            idCajaDiaria.val("");
            fechaCaja.val("");
            totalEfectivo.val("");
            totalEgresos.val("");
            totalOtrosIngresos.val("");
            totalNoEfectivo.val("");
            totalEfectivoDol.val("");
            totalEgresosDol.val("");
            totalOtrosIngresosDol.val("");
            totalNoEfectivoDol.val("");
            consecutivo.val("");
            totalSoles.val("");
            table_demoninacionesDolares.html("");
            table_demoninacionesSoles.html("");
            fechaCaja.prop('disabled',false);
            idCaja.prop('disabled',false);
            btn_procesarApertura.prop('disabled',false);
            totalDolares.val("");
        }

        modalAperturaCaja.on('hidden.bs.modal', function (e) {
            cleanAperturaCaja();
        });
         $scope.chkState = function () {
            var txt_state2 = (w_state.prop('checked')) ? 'Activo' : 'Inactivo';
            state_state.html(txt_state2);
        };
        function newAperturaCaja()
        {
            titlemodalAperturaCaja.html('Nueva Apertura de Caja');
            modalAperturaCaja.modal('show');
        }

        $scope.saveCajasDiarias = function()
        {
            var bval = true;
            bval = bval && fechaCaja.required();
            bval = bval && idCaja.required();
            bval = bval && idUsuario.required();



           if($("#table_demoninacionesSoles").html()==''){
               AlertFactory.showWarning({
                    title: '',
                    message: 'Debe aperturar o cerrar la caja',
                     type: 'info'
                });
                return false;  
            }
             if($("#table_demoninacionesDolares").html()==''){
               AlertFactory.showWarning({
                    title: '',
                    message: 'Debe aperturar o cerrar la caja',
                     type: 'info'
                });
                return false;  
            }


            if(estado.val()==''){
               if(totalEfectivo.val()<1){
                AlertFactory.showWarning({
                    title: '',
                    message: 'El total efectivo no puede ser menor a cero',
                     type: 'info',
                });
                return false;  
               } 
                if(totalEfectivoDol.val()<1){
                AlertFactory.showWarning({
                    title: '',
                    message: 'El total efectivo no puede ser menor a cero',
                     type: 'info',
                });
                return false;  
               } 

            }else if(estado.val()==1){
                if(Number(totalEfectivo.val())!=Number(totalSoles.val())){
                AlertFactory.showWarning({
                    title: '',
                    message: 'El total efectivo soles no es igual al monto ingresado',
                     type: 'info'
                });
                return false;  
               } 
                if(Number(totalEfectivoDol.val())!=Number(totalDolares.val())){
                AlertFactory.showWarning({
                    title: '',
                    message: 'El total efectivo dólares no es igual al monto ingresado',
                     type: 'info',
                });
                return false;  
               } 
               if(ventanaP=='A'){
                AlertFactory.showWarning({
                    title: '',
                    message: 'Ingrese montos para cerrar caja',
                     type: 'info',
                });
                return false;  
               } 

            }

            if(bval){
                 AlertFactory.confirm({
                    title: '',
                    message: '¿Está seguro que desea procesar esta caja?',
                    confirm: 'Si',
                    cancel: 'No'
                }, function () {
                    
                    var idDenominacionS =[];
                    $.each($('.idDenominacionS'), function (idx, item) {
                        idDenominacionS[idx] = $(item).val();
                    });
                    idDenominacionS = idDenominacionS.join(',');

                    var cantidadS =[];
                    $.each($('.cantidadS'), function (idx, item) {
                        cantidadS[idx] = $(item).val();
                    });
                      cantidadS = cantidadS.join(',');

                    var montoS =[];
                    $.each($('.montoS'), function (idx, item) {
                        montoS[idx] = $(item).val();
                    });
                    montoS = montoS.join(',');

                    var idDenominacionD =[];
                    $.each($('.idDenominacionD'), function (idx, item) {
                        idDenominacionD[idx] = $(item).val();
                    });
                    idDenominacionD = idDenominacionD.join(',');

                    var cantidadD =[];
                    $.each($('.cantidadD'), function (idx, item) {
                        cantidadD[idx] = $(item).val();
                    });
                    cantidadD = cantidadD.join(',');

                    var montoD =[];
                    $.each($('.montoD'), function (idx, item) {
                        montoD[idx] = $(item).val();
                    });
                    montoD = montoD.join(',');

                    var params = {
                        'fechaCaja':fechaCaja.val(),
                        'idCaja':idCaja.val(),
                        'idUsuario':idUsuario.val(),
                        'idDenominacionS':idDenominacionS,
                        'cantidadS':cantidadS,
                        'montoS':montoS,
                        'idDenominacionD':idDenominacionD,
                        'cantidadD':cantidadD,
                        'montoD':montoD,
                        'totalEfectivo':totalEfectivo.val(),
                        'totalEgresos':totalEgresos.val(),
                        'totalOtrosIngresos':totalOtrosIngresos.val(),
                        'totalNoEfectivo':totalNoEfectivo.val(),
                        'totalEfectivoDol':totalEfectivoDol.val(),
                        'totalEgresosDol':totalEgresosDol.val(),
                        'totalOtrosIngresosDol':totalOtrosIngresosDol.val(),
                        'totalNoEfectivoDol':totalNoEfectivoDol.val(),
                        'estado':estado.val(),
                        'consecutivo':consecutivo.val(),
                     };
                    var id = (idCajaDiaria.val() === '') ? 0 : idCajaDiaria.val();
                    RESTService.updated('aperturaCajas/saveCajasDiarias', id, params, function(response) {
                        if (!_.isUndefined(response.status) && response.status) {
                            console.log(response.data);
                            AlertFactory.textType({
                                title: '',
                                message: 'Se registró correctamente.',
                                type: 'success'
                            });

                             modalAperturaCaja.modal('hide');
                            LoadRecordsButtonAperturaCaja.click();
                        } else {
                            var msg_ = (_.isUndefined(response.message)) ?
                                'No se pudo guardar . Intente nuevamente.' : response.message;
                            AlertFactory.textType({
                                title: '',
                                message: msg_,
                                type: 'info'
                            });
                        }
                            
                      }); 
                });
              
                 
            } 
        }

        var search = getFormSearch('frm-search-AperturaCaja', 'search_b', 'LoadRecordsButtonAperturaCaja');

        var table_container_AperturaCaja = $("#table_container_AperturaCaja");

        table_container_AperturaCaja.jtable({
            title: "Lista de Aperturas de caja",
            paging: true,
            sorting: true, 
            actions: { 
                listAction: base_url + '/aperturaCajas/list',
                // deleteAction: base_url + '/aperturaCajas/delete',
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
                        $scope.openDoc('aperturaCajas/excel', {});
                    }
                }
                // ,{
                //     cssClass: 'btn-danger-admin',
                //     text: '<i class="fa fa-plus"></i> Apertura de Caja',
                //     click: function () {
                //         newAperturaCaja();
                //     }
                // }
                ]
            },
            fields: {
                idCajaDiaria: {
                    key: true,
                    create: false,
                    edit: false,
                    list: false
                },
                idCaja: {
                    title: 'Caja',
                    options: base_url + '/aperturaCajas/getAllApert', 

                },
                fechaCaja: {
                    title: 'Fecha',   
                     display: function (data) {
                            return moment(data.record.fechaCaja).format('DD/MM/YYYY');
                        }
                },
                idUsuario: {
                    title: 'Usuario',   
                    options: base_url + '/aperturaCajas/getAllApeUser',
                },
                 totalEfectivo: {
                    title: 'Total Soles',   

                },
                 totalEfectivoDol: {
                    title: 'Total Dólares',   

                },

                estado: {
                    title: 'Estado',
                    values: { '1': 'Aperturado', '0': 'Cerrado' },
                    type: 'checkbox',
                    defaultValue: 'A',
                   
                },
                edit: {
                    width: '1%',
                    sorting: false,
                    edit: false,
                    create: false,
                    listClass: 'text-center',
                    display: function (data) {
                        return '<a href="javascript:void(0)" title="Editar" class="edit_cont" data-code="' +
                            data.record.idCajaDiaria + '"><i class="fa fa-pencil-square-o fa-1-5x fa-green"></i></a>';
                    }
                },
                //  print: {
                //     width: '1%',
                //     sorting: false,
                //     edit: false,
                //     create: false,
                //     listClass: 'text-center', 
                //     display: function (data) {
                //         return '<a href="javascript:void(0)" title="Imprimir" class="print_content" data-code="' +
                //             data.record.fechaCaja + '"><i class="fa fa-print fa-1-5x fa-blue"></i></a>';
                //     }
                // }

            },
            recordsLoaded: function (event, data) {
                $('.edit_cont').click(function (e) {
                    var id = $(this).attr('data-code');
                    findCajaDiaria(id);
                    e.preventDefault();
                });
                  $('.print_content').click(function (e) {
                    var id = $(this).attr('data-code');
                    printCaja(id);
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

        generateSearchForm('frm-search-AperturaCaja', 'LoadRecordsButtonAperturaCaja', function(){
            table_container_AperturaCaja.jtable('load', {
                search: $('#search_b').val()
            });
        }, true);
    }

    function Config($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('aperturaCajas', {
                url: '/aperturaCajas',
                templateUrl: base_url + '/templates/aperturaCajas/base.html',
                controller: 'AperturaCajaCtrl'
            });

        $urlRouterProvider.otherwise('/');
    }
})
();