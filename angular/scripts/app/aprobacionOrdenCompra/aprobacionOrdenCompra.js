/**
 * Created by JAIR on 4/5/2017.
 */
  
(function () {
    'use strict';
    angular.module('sys.app.aprobacionOrdenCompras')
        .config(Config)
        .controller('AprobacionOrdenCompraCtrl', AprobacionOrdenCompraCtrl);

    Config.$inject = ['$stateProvider', '$urlRouterProvider'];
    AprobacionOrdenCompraCtrl.$inject = ['$scope', '_', 'RESTService', 'AlertFactory', 'Helpers'];

    function AprobacionOrdenCompraCtrl($scope, _, RESTService, AlertFactory, Helpers)
    {   var btn_verAprobacio=$(".btn_verAprobacio"); 
        var modalVerAproba=$("#modalVerAproba"); 
        var btn_Rechazar=$(".btn_Rechazar");  
        var modalObservacion=$("#modalObservacion");
        var comentario_aprobacion=$("#comentario_aprobacion");
        var titleModalProduct=$("#titleModalProduct"); 
        var xmlAdd=$("#xmlAdd"); 
         var aprobaComentario=$("#AprobaComentario"); 
           var estadoApro=$("#estadoApro");
        var btn_Aprobar=$(".btn_Aprobar");
         var descuentosTotales;
        var idProveedor=$("#idProveedor");
        var totalDescuento=$("#totalDescuento");
        var desTotal=$("#desTotal");
        var montoTotal=$("#montoTotal");
        var porcentajeTotal=$("#porcentajeTotal");
         var totales;
         var direccionEntrega=$("#direccionEntrega");
         var igv;
         var comentario=$("#comentario");
         var comentarioAprobacion=$("#comentarioAprobacion");
        var descuentos;
        var idcondicion_pago=$("#idcondicion_pago");
        var redondeo;
        var  aartML= []; //arrays para guardas los datos de lotes
        var  acodigos=[];//arrays de codigos;
        var  alotML=[];
        var  afinML=[]; 
        var  avenML=[];
        var  tipoCompra; //variable que contendrá los tipos de  compras
        var aartMK=[]; //arrays de id kits 
        var aartMLE=[];//arrays lotes exis
        var naturalezaGeneral='E';
        var aartMSN=[];//ARRAY DE series nueva
        var aartMSE=[];//array series  exis 
        var acantMS=[];
        var achasis=[];
        var acolor=[];
        var aaniomodelo=[];
        var aaniofabricacion=[];
        var aaserie=[];
        var idMovimientoDelete=$("#idMovimientoDelete");
        var aartMN=[];//arrays de nada 
        var costoMK=$("#costoMK");
        var costoNa=$("#costoNa");
        var costoAS=$("#costoAS");
        var costoAL=$("#costoAL");
        var btn_xml=$("#btn_xml");
        var idTransferenciaProcesar=$("#idTransferenciaProcesar");
        var LocalizacionesSele;//variable para guardar localizaciones del almacen
        var AlmacenesSele;//variable para guardar almacenes
        var btnguardarMovimiento=$("#btn-guardarMovimiento");//btn pata guardar cabecera del movimiento
        var titlemodalMovimieto=$("#titlemodalMovimieto");
        var modalMovimieto=$("#modalMovimieto");
        var idMovimiento=$("#idMovimiento");
        var idTipoOperacion=$("#idTipoOperacion");
        var operacionid;
        var naturalezaid;
        var modalDeleteMovimiento=$("#modalDeleteMovimiento");
        var idMoneda=$("#idMoneda");
        var idAlmacen=$("#idAlmacen");
        var observaciones=$("#observaciones");
        var p_state=$("#p_state");
        var fecha_registro=$("#fecha_registro");
        var fecha_requerida=$("#fecha_requerida");
        var modalMovimietoArticulo=$("#modalMovimietoArticulo");
        var titlemodalMovimietoArticulo=$("#titlemodalMovimietoArticulo");
        var modalSolicitudArticulo=$("#modalSolicitudArticulo");
        var modalLote=$("#modalLote"); 
        var modalSerie=$("#modalSerie");
        var modalKit=$("#modalKit");
        var modalNada=$("#modalNada");
        var articulo_mov_det=$("#articulo_mov_det");
        var modalAlmacenArticulo=$("#modalAlmacenArticulo")
        var idLoteML=$("#idLoteML");
        var idProductoML=$("#idProductoML");
        var desProductoML=$("#desProductoML");
        var cantProductoML=$("#cantProductoML");
        var lotProductoML=$("#lotProductoML");
        var fIngrePrML=$("#fIngrePrML");
        var fVenPrML=$("#fVenPrML");
        var idNaturaleza=$("#idNaturaleza");
        var tablekitdetM=$("#tablekitdetM");
        var cantProductoMK=$("#cantProductoMK");
        var desProductoMK =$("#desProductoMK")
        var idProductoMK=$("#idProductoMK");
        var ident_detalle=$("#ident_detalle");//identificador de cambio en el detalle
        var idSerieMS=$("#idSerieMS");
        var idProductoMS=$("#idProductoMS");
        var desProductoMS=$("#desProductoMS");
        var cantProductoMS=$("#cantProductoMS");
        var colorMS=$("#colorMS");
        var chasisMS=$("#chasisMS");
        var motorMS=$("#motorMS");
        var procesarTransfBoton=$("#ProcesarTransferenciaBoton");
        var anio_modeloMS=$("#anio_modeloMS");
        var anio_fabricacionMS=$("#anio_fabricacionMS");
        var articulo_serie_det=$("#articulo_serie_det");
        var idLoteML2=$("#idLoteML2");
        var idArtSerie=$("#idArtSerie");
        var cantArtSerie=$("#cantArtSerie");
        var desArtSerie=$("#desArtSerie");
        var s_serie=$(".s_serie");
        var table_container_cc2;
        var table_container_ccsolart;
        var table_container_cc22;
        var idProductoMN=$("#idProductoMN");
        var desProductoMN=$("#desProductoMN");
        var cantProductoMN=$("#cantProductoMN");
        var msg_cont_EliminarMovimiento=$("#msg_cont_EliminarMovimiento");
        var tabla_articulo_movi=$("#tabla_articulo_movi");
        var idProductoMll=$("#idProductoMll");
        var desProductoMll=$("#desProductoMll");
        var cantProductoMll=$("#cantProductoMll");
        var modalLoteR=$("#modalLoteR");
        var codigoLoteMll=$("#codigoLoteMll");
        var fechaVl=$("#fechaVl");
        var modalSerieR=$("#modalSerieR");
        var idProductoMss=$("#idProductoMss");
        var desProductoMss=$("#desProductoMss");
        var codigoSerieMss=$("#codigoSerieMss");
        var btn_Lotd=$("#btn_Lotd");
        var cantProductoMss=$("#cantProductoMss");
        var table_container_Series_Articulo=$("#table_container_Series_Articulo");
        var table_serie_cabecera=$("#table_serie_cabecera");
        var articulo_serie_det=$("#articulo_serie_det");
        var btnAgreSer=$("#btnAgreSer");
        var identiSelec="I";
        var table_container_cc4;
        var btn_serC=$("#btn_serC");
        var cont_check=0;
        var cont_table=0;
        var idLoteMll=$("#idLoteMll");
        var idLoteMll2=$("#idLoteMll2");
        var identSerAr=$("#identSerAr");//identificador para modificar el array de series esxisten
        var btnSeleSerie=$("#btnSeleSerie");
        var idenifcador_table_art=$("#idenifcador_table_art");
        var idenifcador_table_art2=$("#idenifcador_table_art");
       
        var modalProcesarTransferencia=$("#modalProcesarTransferencia");
        var msg_cont_ProcesarTransferencia=$("#msg_cont_ProcesarTransferencia");
         var btn_imprimirMovimiento=$("#btn_imprimirMovimiento");
        var cCodConsecutivo=$("#cCodConsecutivo");
        var nConsecutivo=$("#nConsecutivo");
        var prioridad=$("#prioridad");
        var area=$("#area");
        var modalAprobar=$("#modalAprobar");
        var estado=$("#estado");
         var btn_movimiento_detalle=$("#btn_movimiento_detalle");
        var btn_movimiento_aprobar=$("#btn_movimiento_aprobar");
        var btn_movimiento_cancelar=$("#btn_movimiento_cancelar");
        var btn_movimiento_cerrar=$("#btn_movimiento_cerrar");
        var btn_observacion=$(".btn_observacion");
        var btn_guardarObservacion=$("#btn_guardarObservacion");
         var hoy = new Date();
        var hAnio=hoy.getFullYear();
        var hmes=hoy.getMonth()+1;
        if(Number(hmes)<10){
            hmes='0'+String(hmes);
        }

        var hdia=hoy.getDate();
        if(Number(hdia)<10){
            hdia='0'+String(hdia);
        }
        var hora = hoy.getHours();
        if(Number(hora)<10){
            hora='0'+String(hora);
        }
        var minutos= hoy.getMinutes();
        if(Number(minutos)<10){
            minutos='0'+String(minutos);
        }
        var actu=hAnio+'-'+hmes+'-'+hdia;

        var fecharequerida= actu;
        modalVerAproba.on('hidden.bs.modal', function (e) {
            cleanAprobadores();
        });
        function cleanAprobadores() {
           $("#aprobadores_table").html("");
        }
        $scope.aprobarSolitud = function () {
            var bval = true;
            if (bval) {
                var params = {
                    'nCodConformidad': $("#nCodConformidad").val(),
                    'aprobaComentario': aprobaComentario.val(),
                    'iEstado': estadoApro.val(), 
                };
                var idPe =idMovimiento.val();
                console.log(idPe);
                RESTService.updated('aprobacionOrdenCompras/AprobarRechazar', idPe, params, function (response) {
                    if (!_.isUndefined(response.status) && response.status) {
                        var ms=response.msg;
                        console.log(ms);

                        // if(response.conformidad.length > 0 && response.solicitud.length > 0) {
                        //     if(response.solicitud[0].tipo_solicitud == 2 && ms == "Aprobada") {

                               

                        //         var id = response.conformidad[0].cCodConsecutivo + "|" + response.conformidad[0].nConsecutivo;

                        //         window.open("movimientoCajas/imprimir_cronograma/" + id);


                        //     }
                          
                      
                        // }   

                        if(ms!='OK'){
                            AlertFactory.textType({
                                title: '',
                                message: ms,
                                type: 'info'
                                });
                        }else{
                           AlertFactory.textType({
                                title: '',
                                message: 'El registro se guardó correctamente',
                                type: 'success'
                            });
                           
                            // $("#modalSolicitud").modal("hide");
                        }

                        modalAprobar.modal("hide"); 
                        $("#modalMovimieto").modal("hide");

                        btn_Aprobar.prop('disabled',true);
                        btn_Rechazar.prop('disabled',true);
                        $("#LoadRecordsButtonAprobacionOrdenCompra").click(); 
                        // modalPersona.modal('hide');
                       
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
            }
        }
        function addAprobadores(Aprbador,comentarios,estadoText,fre,fmo){
                var tr = $('<tr></tr>');
                var td1 = $('<td id="tr_identO ">' + Aprbador + '</td>');
                var tda = $('<td>' + comentarios + '</td>');
                var tdb = $('<td>' + fre + '</td>');
                var td2 = $('<td>' + fmo + '</td>');
                var td3 = $('<td>' + estadoText + '</td>');
                tr.append(td1).append(tda).append(tdb).append(td2).append(td3);
                $("#aprobadores_table").append(tr);
        } 
        $("#btn_movimiento_Por_aprobar").click(function(e){
            cambiarEstado(2);
        });
        btn_Aprobar.click(function (e) {
               
                    titleModalProduct.html("Aprobar");
                    estadoApro.val("1");
                    modalAprobar.modal('show');
        
        });
         btn_Rechazar.click(function (e) {
                
                    titleModalProduct.html("Rechazar");
                    estadoApro.val("2");
                    modalAprobar.modal('show');
        });
         modalAprobar.on('hidden.bs.modal', function (e) {
            cleanAprobar();
        });
         function cleanAprobar() {
            titleModalProduct.html("");
           $("#aprobacion_ventas").html("");
            $("#AprobaComentario").val("");
        } 
         btn_observacion.click(function (e) {
                    modalObservacion.modal('show');
        });
         modalObservacion.on('hidden.bs.modal', function (e) {
          comentario_aprobacion.val("");
        }); 
         btn_verAprobacio.click(function (e) {
             var id=cCodConsecutivo.val()+'*'+nConsecutivo.val();
              RESTService.get('registerOrdenCompras/getAprobadores', id, function (response) {
                if (!_.isUndefined(response.status) && response.status) {
                    var data_p = response.data;
                    console.log(data_p);
                     data_p.map(function(index) {
                        var com='';
                        if(index.cObservacion!=null){
                            com=index.cObservacion;
                        }
                        var est='Por Aprobar'; 
                                if(index.iEstado==1){
                                    est='Aprobado';
                                }else if(index.iEstado==2){
                                    est='Rechazado';
                                };
                         var fre=moment(index.dFecReg).format('DD/MM/YYYY');;
                         var fmo=moment(index.updated_at).format('DD/MM/YYYY');;      

                        addAprobadores(index.name,com,est,fre,fmo);
                         });
                  
                    modalVerAproba.modal('show');
                } else {
                    AlertFactory.textType({
                        title: '',
                        message: 'Hubo un error al obtener el Cliente. Intente nuevamente.',
                        type: 'error'
                    });
                } 
            });
        
        });


         btn_guardarObservacion.click(function (e) {
            var bval = true;
            bval = bval && comentario_aprobacion.required();
            if (bval) {
                var params = {
                    'comentarioAprobacion': comentario_aprobacion.val(),
                };
                var cli_id =cCodConsecutivo.val()+'_'+nConsecutivo.val();

                RESTService.updated('aprobacionOrdenCompras/updateComentarioAprobacion', cli_id, params, function (response) {
                    if (!_.isUndefined(response.status) && response.status) {
                           AlertFactory.textType({
                                title: '',
                                message: 'El comentario se guardó correctamente',
                                type: 'success'
                            });
                            comentarioAprobacion.val(response.data_comentario);
                            modalObservacion.modal("hide");
                            comentario_aprobacion.val(""); 
                       // response.data_comentario;

                    } else {
                        var msg_ = (_.isUndefined(response.message)) ?
                            'No se pudo guardar el Cliente. Intente nuevamente.' : response.message;
                        AlertFactory.textType({
                            title: '',
                            message: msg_,
                            type: 'info'
                        });
                    }
                });
            }
        });

        // btn_movimiento_cancelar.click(function(e){
        //     cambiarEstado(4);
        // });

        // btn_movimiento_cerrar.click(function(e){
        //     cambiarEstado(3);
        // });


       


       
         btn_imprimirMovimiento.click(function(e){
          
            var id= idMovimiento.val();
            if(id!=''){
                 var data = {
                                id: id,
                                
                };
              $scope.loadMovimientoPDF('aprobacionOrdenCompras/pdf', data);
            }
        });

        modalMovimietoArticulo.on('hidden.bs.modal', function (e) {
            cleanMovimientoArticulo();
        });

        modalMovimieto.on('hidden.bs.modal', function (e) {
            cleanMovimiento();
        });
         modalLote.on('hidden.bs.modal', function (e) {
            cleanArtLote();
        });
       
        // modalSerie.on('hidden.bs.modal', function (e) {
        //     cleanArtSerie();
        // });
        function cleanArtNada(){
            idProductoMN.val("");
            desProductoMN.val("");
            cantProductoMN.val("");

        }  
        modalNada.on('hidden.bs.modal', function (e) {
            cleanArtNada();
        });
        modalSerieR.on('hidden.bs.modal', function (e) {
            cleanArtSeriess();
        });
        modalLoteR.on('hidden.bs.modal', function (e) {
            cleanArtLotell();
        });  

         modalDeleteMovimiento.on('hidden.bs.modal', function (e) {
            cleanDeleteMovimiento();
        });  

        btnguardarMovimiento.click(function(e){
            saveMovimientoCab();
        });
        
          xmlAdd.change(function (e) {
             const file = e.currentTarget.files[0];
              if (file.type !== 'text/xml') {
                //reseteo el valor del input
                e.currentTarget.value = '';
                //muestro una alerta (estas alertas son feas,
                //ya tu las puedes cambiar por una librería o una alerta tuya)
                AlertFactory.textType({
                                title: '',
                                message: 'Ingrese un archivo xml',
                                type: 'info'
                            });
            }
          });
        
         function findRegisterOrdenCompra(id)

        {  
            console.log($("#iEstadoConformidad").val(),"estado ddd");
             if($("#iEstadoConformidad").val()!=0){
            console.log("entro acá");
                btn_Aprobar.prop('disabled',true);
                btn_Rechazar.prop('disabled',true);
            }else{
                 btn_Aprobar.prop('disabled',false);
                btn_Rechazar.prop('disabled',false);
                console.log("entro aca bbb");
            }
            
            RESTService.get('aprobacionOrdenCompras/find', id, function(response) {
                if (!_.isUndefined(response.status) && response.status) {
                    var data_p = response.data;
                    var dataDescuento=response.dataDescuento;


                    var mov_ar=response.movimiento_Ar;


                   
                    
                    btn_movimiento_detalle.prop('disabled',false);
                    btn_movimiento_detalle.trigger('change');

                    console.log(data_p);
                    console.log(mov_ar); 

                    cCodConsecutivo.val(data_p.cCodConsecutivo).trigger('change');;
                    nConsecutivo.val(data_p.nConsecutivo);
                    idMovimiento.val(data_p.id);
                    fecha_registro.val(data_p.fecha_registro);
                    fecha_requerida.val(data_p.fecha_requerida);
                    prioridad.val(data_p.prioridad).trigger('change');
                    comentario.val(data_p.comentario);
                    comentarioAprobacion.val(data_p.comentarioAprobacion);
                    idMoneda.val(data_p.idMoneda).trigger('change');;
                    idProveedor.val(data_p.idProveedor).trigger('change');
                    idcondicion_pago.val(data_p.idcondicion_pago);
                    estado.val(data_p.iEstado).trigger('change');
                    direccionEntrega.val(data_p.direccionEntrega);

                    var chk_impuesto = (data_p.impuesto === '1');
                    p_state.prop('checked', chk_impuesto).iCheck('update');
                    var descuentTotal="";
                    if(data_p.nIdDscto!=0){
                        var porcen=Number(dataDescuento[0].nPorcDescuento);
                        var monto=Number(dataDescuento[0].nMonto);
                        descuentTotal =data_p.nIdDscto+"*"+porcen+'*'+monto;
                     }
                    console.log(descuentTotal,"descuento total ajaaja"); 
                    totalDescuento.val(descuentTotal);
                    porcentajeTotal.val(addCommas(redondeodecimale(data_p.nPorcDescuento).toFixed(0)));
                    montoTotal.val(addCommas(redondeodecimale(data_p.nDescuento).toFixed(2)));

                    $('#desTotal').attr('data-total', addCommas(redondeodecimale(data_p.total).toFixed(2)));
                    $('#desTotal').val(addCommas(redondeodecimale(data_p.total).toFixed(2)));
                    $('#desTotal').attr('data-impuesto', addCommas(redondeodecimale(data_p.nImpuesto).toFixed(2)));

                    articulo_mov_det.html("");
                     mov_ar.map(function(index) {
                        var ver='A';
                        var tipoArt='NA';
                        var codl="";
                        var datl="";
                        var ident_impuesto=(p_state.prop('checked')) ? '1' : '0';
                        var codSoli=0;

                        var porcen=Number(index.nPorcDescuento);
                        var monto=Number(index.nDescuento);
                        if(porcen>0){
                            monto=0;
                         };
                        var idDescuento="";
                        if(index.nIdDscto!=0){
                            idDescuento =index.nIdDscto+"*"+porcen+'*'+monto;
                         }
                        addArticuloTable(index.idDetalle,index.idArticulo,index.productoDescripcion,Math.trunc(index.cantidad),ver,index.idDetalle,tipoArt,codl,datl,index.iEstado,index.dFecRequerida_add,"","",Math.trunc(index.cantidad),Math.trunc(index.cantidadRecibida),Math.trunc(index.cantidadDevuelta),Number(index.precioUnitario),Number(index.precioTotal),idDescuento,index.nImpuesto,Number(index.nPorcDescuento),Number(index.nDescuento),ident_impuesto,codSoli,Number(index.total),Number(index.valorCompra));
                        // addArticuloTable(iddet,index.idArticulo,index.description,Math.trunc(index.cantidad),ver,index.consecutivo,tipo,codl,datl,index.estado,index.fecha_requerida_ad,index.unidaMedida,obser);                      
                      })
                   activarbotones();
                    modalMovimieto.modal("show");
                    
                   
                } else {
                    AlertFactory.textType({
                        title: '',
                        message: 'Hubo un error al obtener el Artículo. Intente nuevamente.',
                        type: 'error'
                    });
                }
            });
        }
        
         function cleanMovimiento () {
            cleanRequired();
            getDataFormMovement();
            nConsecutivo.val("");
            titlemodalMovimieto.html('');
            idMovimiento.val('');
            comentario.val('');
            comentarioAprobacion.val("");
            idMoneda.val('');
            ident_detalle.val('');
            estado.val("");
            prioridad.val("");
           

            aartML= [];
            acodigos=[];
            aartMK=[];
            aartMLE=[];
            aartMSN=[];
            aartMSE=[];
            aartMN=[];
            porcentajeTotal.val(0);
            montoTotal.val(0);
            $('#desTotal').val(0);
            $('#desTotal').attr('data-total', 0);
            $('#desTotal').attr('data-impuesto', 0);
            totalDescuento.val("").trigger("change");
            idcondicion_pago.val("").trigger("change");
            direccionEntrega.val("");
            p_state.prop('checked', false).iCheck('update');
            fecha_registro.val('');
            idTipoOperacion.prop('disabled',false);
            idTipoOperacion.trigger('change');
            p_state.val('');
            articulo_mov_det.html('');
            btnguardarMovimiento.prop('disabled',false);
            btnguardarMovimiento.trigger('change');
            btn_movimiento_detalle.prop('disabled',true);
            btn_movimiento_detalle.trigger('change');
            procesarTransfBoton.prop('disabled',true);
            procesarTransfBoton.trigger('change');
            btn_movimiento_aprobar.prop('disabled',true);
            btn_movimiento_cancelar.prop('disabled',true);
            btn_movimiento_cerrar.prop('disabled',true);
        }
        function cleanMovimientoArticulo(){
            articulo_serie_det.html('');
            idArtSerie.val('');
            cantArtSerie.val('');
            desArtSerie.val('');
            

        }
          modalProcesarTransferencia.on('hidden.bs.modal', function (e) {
            cleanmodalProcesarTransferencia();
        }); 

       
        cantProductoMN.keypress(function(e) {
        var code = (e.keyCode ? e.keyCode : e.which);
            if(code==13){
                addArtNada();
            }
        });
        $('#p_state').iCheck({
            checkboxClass: 'icheckbox_square-green'
        }).on('ifChanged', function (event) {
            // $(event.target).click();
            console.log("enntro checkakakakakakkaka");
        });
      


        $(document).on("ifChanged", "#p_state", function () {
          
           console.log("total chekk");

           calcular_total_orden();
        });

        
        function seleccionarModal(codigo,descripcionArt,idTipoArt,serie,lote,costo) {
           
            idTipoArt=1;
            serie=0;
            lote=0;
           
            if(idTipoArt=='3'){
                modalKit.modal('show');
                $('#cantProductoMK').attr('onkeypress','return soloNumeros(event)');
                desProductoMK.val(descripcionArt);
                idProductoMK.val(codigo);
                costoMK.val(costo);
            }else if(serie=='1'){
                // $('#cantProductoMS').attr('onkeypress','return soloNumeros(event)');
                // $('#anio_modeloMS').attr('onkeypress','return soloNumeros(event)');
                // $('#anio_fabricacionMS').attr('onkeypress','return soloNumeros(event)');
                desProductoMss.val(descripcionArt);
                idProductoMss.val(codigo);
                var nat2 ='C';
                if(nat2=='S'){
                    btnAgreSer.prop('disabled',true);
                    btnAgreSer.trigger('change');
                }else{
                    btnAgreSer.prop('disabled',false);
                    btnAgreSer.trigger('change');
                }
                modalSerieR.modal('show');
            }else if (lote=='1'){
                modalLoteR.modal('show');
                idProductoMll.val(codigo);
                desProductoMll.val(descripcionArt);
                costoAL.val(costo);
            }else{
                $('#cantProductoMN').attr('onkeypress','return soloNumeros(event)');
                idProductoMN.val(codigo);
                desProductoMN.val(descripcionArt);
                modalNada.modal('show');
                costoNa.val(costo);

            }

        }
        
        function getLocalizacion(idAlmacen){
             var id=idAlmacen;
             RESTService.get('aprobacionOrdenCompras/getLocalizacionSelec', id, function(response) {
                 if (!_.isUndefined(response.status) && response.status) {
                    LocalizacionesSele=response.data;
                 }else {
                    AlertFactory.textType({
                        title: '',
                        message: 'No se pudo  obtener las Localizaciones. Intente nuevamente.',
                        type: 'info'
                    });
                }

               });
        }
       
        function getLocaStock(idl,ident,idPrAl,idLocalizacion){
            var idLocali=$("#"+ident);
            var id=idl;
             RESTService.get('aprobacionOrdenCompras/getLocaStock', id, function(response) {
                 if (!_.isUndefined(response.status) && response.status) {
                        console.log("dddd");
                        idLocali.html('');
                        idLocali.append('<option value="" selected>Seleccionar</option>');
                      _.each(response.LocalizacionAlmacen, function(itemdos) {
                            var stock=0;
                              _.each(response.data, function(item) {
                                if(idPrAl==item.idArticulo && itemdos.idLocalizacion==item.idLocalizacion){
                                     stock=Math.trunc(item.total);
                                  }
                              });
                              if(naturalezaGeneral=="S"){
                                 if(stock>0){
                                    if(itemdos.idLocalizacion==idLocalizacion){
                                        idLocali.append('<option selected value="'+itemdos.idLocalizacion+'" >'+itemdos.descripcion+' / '+stock+'</option>'); 
                                        }else{
                                             idLocali.append('<option value="'+itemdos.idLocalizacion+'" >'+itemdos.descripcion+' / '+stock+'</option>');
                                        }  
                                 }
                              } else{ 
                                if(itemdos.idLocalizacion==idLocalizacion){

                                  idLocali.append('<option selected value="'+itemdos.idLocalizacion+'" >'+itemdos.descripcion+' / '+stock+'</option>'); 
                                }else{

                                     idLocali.append('<option value="'+itemdos.idLocalizacion+'" >'+itemdos.descripcion+' / '+stock+'</option>');
                                  }
                              }
                        });
                 }else {
                    if(naturalezaGeneral!='C'){
                   
                    AlertFactory.textType({
                        title: '',
                        message: 'No se pudo obtener las Localizaciones. Intente nuevamente.',
                        type: 'info'
                    });
                  }
                }

               });
        }
        $scope.addArtsolicitud = function(){

              
                var ver='A';
                var tipoArt='NA';
                var codl="";
                var datl="";
                var idAlmacen="";
                var idLocalizacion="";
                var costo=costoNa.val();
                var costo_total="";
                var precio="";
                var precioTotal="";
                var estado="N";
                var idpr=idProductoMN.val();
                var obser='';
                var cantPend='0';
                var cantReci='0';
                var cantDevu='0';
                var precio=0;
                var precioTotal=0;
                var idDescuento="";
                var impuesTotal=0;
                var nPorcDescuento=0;
                var nDescuento=0;
                var iddet=0;
                var ident_impuesto=0;
                var codSoli=0;
                var valorCompra=0;
                $(".check:checkbox:checked").each(function() {
                         ident_impuesto = $(this).attr('data-impuesto');
                        var cantidad = $(this).attr('data-cantida');
                        var idProduc = $(this).attr('data-idProducto');
                        var desProducto = $(this).attr('data-DesProducto');
                        var unidadMedida = $(this).attr('data-unidaMedida');
                         codSoli = $(this).attr('data-consecutivo');
                        var nConsecutivo = $(this).attr('data-nConsecutivo');
                        var totaldetalle=0;
                        var codigo=Math.random().toString(36).substr(2, 18);
                        if($(".tr_idSolicitud"+ codSoli).length > 0){
                            AlertFactory.showWarning({
                                title: '',
                                message: 'Ya se agregó el artículo de la solicitud '+nConsecutivo,
                             });
                        }else{
                            console.log(codSoli);
                            addArticuloTable(iddet,idProduc,desProducto,Number(cantidad),ver,codigo,tipoArt,codl,datl,estado,fecharequerida,unidadMedida,obser,Number(cantidad),cantReci,cantDevu,precio,precioTotal,idDescuento,impuesTotal,nPorcDescuento,nDescuento,ident_impuesto,codSoli,totaldetalle,valorCompra);
                        }
                      
                });
                 modalSolicitudArticulo.modal('hide');
             
        }


       
        function addDescuentos(idProducto,idDescuento,codigo){
            console.log("entro acá 222222222");
            console.log(codigo);
            var selectDescuento=$("#id_desc_"+codigo);
            selectDescuento.select2();
            var hoy = new Date();
            var hAnio=hoy.getFullYear();
            var hmes=hoy.getMonth()+1;
            if(Number(hmes)<10){
                hmes='0'+String(hmes);
            }

            var hdia=hoy.getDate();
            if(Number(hdia)<10){
                hdia='0'+String(hdia);
            }
            var actu=hAnio+'-'+hmes+'-'+hdia;

            selectDescuento.append('<option value="" selected>Seleccionar</option>');
             console.log("descuentos totales");
             console.log(descuentos);
             console.log("descuentos total");
              _.each(descuentos, function(item) {
             
                var mo=idMoneda.val();
                
                if(item.dFecIni<=actu && item.dFecFin>actu){
                     var por=Number(item.nPorcDescuento);
                     var monto=Number(item.nMonto);
                    if(item.cTipoAplica=='T'){
                     
                    }else{
                      
                         if(item.idMoneda==mo || item.nPorcDescuento!=0){
                           
                            if(item.nSaldoUso>0 || item.nLimiteUso==0){
                                 console.log("entro acá aplica BBB");
                                 console.log(item.nIdProducto,codigo);
                                if(item.nIdProducto==idProducto){
                                     console.log("entro acá aplica CCC");
                                     var idDescu=item.id+'*'+por+'*'+monto;
                                    if(idDescu==idDescuento){
                                        selectDescuento.append('<option value="'+item.id+'*'+por+'*'+monto+'" selected>'+item.descripcion+'</option>');
                                    }else{
                                        selectDescuento.append('<option value="'+item.id+'*'+por+'*'+monto+'" >'+item.descripcion+'</option>');
                                    }
                                    
                                }
                            }
                          
                        }
                    }

                }
                console.log("entro acá 333333333333333");
                console.log(idDescuento);
                // $("#id_desc_"+codigo).val(idDescuento).trigger("change");
            }); 
        }

        function addArticuloTable(iddet,idProducto,desProducto,cantProducto,ver,codigo,tipo,codl,datl,estado,fecharequerida,unida,obser,cantPend,cantReci,cantDevu,precio,precioTotal,idDescuento,impuesTotal,nPorcDescuento,nDescuento,ident_impuesto,codSoli,totaldetalle,valorCompra){
            acodigos.push(codigo);
            console.log(idDescuento,"descuentos id total");
            var costonew=0;
            var precionew=0;
            naturalezaGeneral='E';
           
            var impuesto_can=Number(impuesTotal);
            // if(idDescuento!=""){
            //          porcentajeid=nPorcDescuento;
            //          montoid=nDescuento;
            // }
          
            console.log(codSoli);
            console.log("entro"); 
            // if(ident_impuesto==1){
            //     impuesto_can=calcular_impueso(preci_t,cantProducto);
            // };
            var precionew=0;

            if(precio !=0 || precio!=""){
                precionew=Number(precio);
            };
            
            // var subt=0;
            // subt=Number(preci_t)*Number(cantidad)+Number(impuesto_can);
            var tdim = $('<td></td>');

            var impuestoRe = $('<input type="number" class="totalImpuesto_articulo form-control input-sm" data-impues="'+ident_impuesto+'" value="'+impuesto_can+'" readonly/>');

            tdim.append(impuestoRe);

            var tdpr = $('<td></td>');
            var inpr = $('<input type="number" id="preMs_'+codigo+'" min="1" class="m_articulo_precio form-control input-sm" value="' + precionew + '" />');

            var inpModoDetalle = $('<input type="hidden"   class="modo_detalle form-control input-sm" value="' + iddet + '" />');

            tdpr.append(inpr).append(inpModoDetalle);

            var tdpreT = $('<td></td>');
            var inpPreTo = $('<input type="text" class="m_articulo_precioTotal form-control input-sm " value="'+addCommas(redondeodecimale(precioTotal).toFixed(2))+'" disabled />');

            tdpreT.append(inpPreTo);
            // if(costo !=0 || costo!=""){
            //     costonew=Number(costo);
            // };
            //  if(precio !=0 || precio!=""){
            //     precionew=Number(precio);
            // };

            // var impor=Number(cantProducto) * Number(costonew);
            // var pretotal=Number(cantProducto) * Number(precionew);
            //  if(naturalezaGeneral=="C"){
            //     impor=0;
            //  }
            var tdDescue = $('<td></td>');
            var tdPorcentaje = $('<td></td>');
            var tdMonto = $('<td></td>');
 
            var tr = $('<tr id="tr_idArticulo' + codigo + '" class="tr_idSolicitud'+codSoli+'" ></tr>');
            var td1 = $('<td id="tr_idArt' + idProducto + '">' + desProducto + '</td>');
            var td12 = $('<td>' + unida + '</td>');
          
            var td2;
            var td3;
            var td4;
            var inp3;
            
            if (ver=='A'){
             var td3 = $('<td class="text-center"></td>');
             var inp3 = $('<input type="text" id="canMs_'+codigo+'" onkeypress="return soloNumeros(event)" class="m_articulo_cantidad form-control input-sm" value="' + cantProducto + '" />');
            }else{
                var td3 = $('<td><p>' + cantProducto + '</p></td>');
                var inp3 = $('<input type="hidden" id="canMs_'+codigo+'" class="m_articulo_cantidad" value="' + cantProducto + '" />');
            }
             var tdCanP = $('<td class="text-center"></td>');
             var inpCanP = $('<input type="text"  onkeypress="return soloNumeros(event)" class="m_articulo_cantidadCanP form-control input-sm" disabled value="' + cantPend + '" />');

             var tdCanR= $('<td class="text-center"></td>');
             var inpCanR = $('<input type="text"  onkeypress="return soloNumeros(event)" class="m_articulo_cantidadCanR form-control input-sm" disabled value="' + cantReci + '" />');

             var tdCanD= $('<td class="text-center"></td>');
             var inpCanD = $('<input type="text"  onkeypress="return soloNumeros(event)" class="m_articulo_cantidadCanD form-control input-sm" disabled value="' + cantDevu + '" />');


             var tdValComp= $('<td class="text-center"></td>');
             var inpValComp = $('<input type="text"  disabled  class="valor_compra_detalle form-control input-sm" value="' +addCommas(redondeodecimale(valorCompra).toFixed(2))  + '" />');

             var tdTotalComp= $('<td class="text-center"></td>');
             var inpTotalComp = $('<input type="text"  disabled  class="m_total_detalle form-control input-sm" value="' +addCommas(redondeodecimale(totaldetalle).toFixed(2))  + '" />');

                // var td2 = $('<td></td>');
                // var tdy = $('<td></td>');
                // var inpy=$('<select  data-idLocalizacion="'+idLocalizacion+'" data-arts="'+idProducto+'" id="Al_'+codigo+'" data-idAraAl="'+codigo+'" class="m_articulo_idAlm form-control input-sm"></select>');
                // var inpl=$('<select id="'+codigo+'" data-idArl="'+idProducto+'" class="m_articulo_idLoc form-control input-sm"></select>');
            
            // }
            var monto=$('<input type="text" id="monto_'+codigo+'" class="monto form-control input-sm"  value="'+addCommas(redondeodecimale(nDescuento).toFixed(2))+'"  readonly/>');
            var porc=$('<input type="text" id="porc_'+codigo+'" class="porcent form-control input-sm"  value="'+addCommas(redondeodecimale(nPorcDescuento).toFixed(0))+'"  readonly/>');
            var inpDes=$('<select id="id_desc_'+codigo+'" class="descuentosSelect form-control input-sm" data-desc="'+codigo+'"  style="width: 100%"  ></select>');


            var td4 = $('<td class="text-center"></td>');
            var tdObser = $('<td class="text-center"></td>');
            var estadoda=$('<select id="estadoEnv_'+codigo+'" class="m_idestado form-control input-sm" disabled ><option value="N"></option><option value="1">Registrado</option><option value="2">Por Aprobar</option><option value="3">Aprobado</option><option value="4">Recibido</option><option value="5">Backorder</option><option value="6">Cerrado</option><option value="7">Cancelado</option><option value="8">Rechazado</option></select>');
            var td5 = $('<td class="text-center"></td>');
            var inp5 = $('<input type="date" id="fechareEnv_'+codigo+'" class="fecharequerida form-control input-sm" value="' + fecharequerida + '" />');
            var inpObse = $('<input type="input" id="observa_'+codigo+'" class="observrequerida form-control input-sm" value="' + obser + '" />');
            td4.append(estadoda);
            td5.append(inp5);
            tdObser.append(inpObse);
            tdCanP.append(inpCanP);
            tdCanR.append(inpCanR);
            tdCanD.append(inpCanD);

            tdDescue.append(inpDes);
            tdPorcentaje.append(porc);
            tdMonto.append(monto);

            tdValComp.append(inpValComp);
            tdTotalComp.append(inpTotalComp);
 
            // var td5 = $('<td><p>'+impor.toFixed(2) +'</p></td>');
            // var tdpreT = $('<td><p>'+pretotal.toFixed(2) +'</p></td>');
            var inp = $('<input type="hidden" class="m_articulo_id" value="' + idProducto + '" />');
            var inpCodSol = $('<input type="hidden"   class="cod_solicitud_compra form-control input-sm" value="' + codSoli + '" />');
            // var inp5 = $('<input type="hidden" class="m_articulo_costoTotal" value="'+impor.toFixed(2)+'" />');
            // var inpPreTo = $('<input type="hidden" class="m_articulo_precioTotal" value="'+pretotal.toFixed(2)+'" />');
            
            var op=$('<option value="" selected>Seleccione</option>');
            var fclt=$('<input type="hidden" class="m_codigo_lote" value="' +codl+ '" />');
            var fdlt=$('<input type="hidden" class="m_dato_lote" value="' +datl+ '" />');
            var identificador_serie_bd=$('<input type="hidden" class="identificador_serie_bd" value="' +codigo+ '" />');
            td1.append(inp).append(inpCodSol).append(fclt).append(fdlt).append(identificador_serie_bd);
            // td2.append(inpy);
            // tdy.append(inpl);
            td3.append(inp3);
            // td4.append(inp4);
            // td5.append(inp5);
            // tdpr.append(inpr);
            // tdpreT.append(inpPreTo);
            var td6 = $('<td class="text-center"></td>');
            var btn1 = $('<button class="btn btn-info btn-xs verUpdate" title="ver" data-cantiShow="'+cantProducto+'" data-descrip="'+desProducto+'" data-idProducto="'+idProducto+'" data-tShow="'+tipo+'" data-idv="' + codigo + '" type="button"><span class="fa fa-eye"></span></button>');
            var td8 = $('<td class="text-center"></td>');
            var btn3 = $('<button class="btn btn-danger btn-xs delMovPro" data-tipo="'+tipo+'" data-ident="'+iddet+'" title="Eliminar" data-id="' + codigo + '" type="button"><span class="fa fa-trash"></span></button>');
            td6.append(btn1);
            td8.append(btn3);
            tr.append(td1).append(td2).append(td3).append(tdCanP).append(tdCanR).append(tdCanD).append(tdpr).append(tdpreT).append(tdDescue).append(tdPorcentaje).append(tdMonto).append(tdValComp).append(tdim).append(tdTotalComp).append(td5).append(td4).append(td8);
            articulo_mov_det.append(tr);
           //  addAlmaSelec(codigo);
           //  addlocSele(codigo);
           // console.log("entro 123456");
            addDescuentos(idProducto,idDescuento,codigo);
              $('#estadoEnv_'+codigo+' option[value='+estado+']').prop('selected', 'selected').change();
           

             $('.delMovPro').click(function (e) {
                var code = $(this).attr('data-id');
                var tip = $(this).attr('data-tipo');
                var iddet = $(this).attr('data-ident');
                if($("#estado").val()!=1 && $("#estado").val()!=''){
                  
                     AlertFactory.textType({
                                title: '',
                                message: 'Solo se puede eliminar Artículos de una orden es estado registrado',
                                type: 'info'
                        });
                    return false; 
                 }
                AlertFactory.confirm({
                    title: '',
                    message: '¿Está seguro que desea quitar este Artículo?',
                    confirm: 'Si',
                    cancel: 'No'
                }, function () {
                    console.log(idMovimiento.val(),"id movimiento");
                    console.log(iddet,"ide detalle");
                    if(idMovimiento.val()!='' && iddet!=0){
                        console.log("entro a eliminar");
                        var id=iddet; 
                        RESTService.get('aprobacionOrdenCompras/deleteDetalleST', id, function(response) {
                        if (!_.isUndefined(response.status) && response.status) {
                                   AlertFactory.textType({
                                    title: '',
                                    message: 'El Articulo se eliminó correctamente',
                                    type: 'success'
                                });
                            }else {
                                var msg_ = (_.isUndefined(response.message)) ?
                                'No se pudo eliminar. Intente nuevamente.' : response.message;
                                    AlertFactory.textType({
                                        title: '',
                                        message: msg_,
                                        type: 'error'
                                    });
                            }
                        });
                        }
                        $('#tr_idArticulo' + code).remove();
                        calcular_total_orden(); 
                });
                e.preventDefault();
            });
             $('.addMovPro').click(function (e) {
                var idArticuloAl = $(this).attr('data-ida');
                modalAlmacenArticulo.modal('show');
                $('#search_cc3').val('');
                $('#LoadRecordsButtonCC3').click();
                e.preventDefault();
            });
           

        }
        totalDescuento.change(function() { 
                var val=$(this).val();
                if(val==""){
                    porcentajeTotal.val(0);
                    montoTotal.val(0);
                }else{
                    var arrayRe=val.split("*");
                    var code=arrayRe[0];
                    var porc=arrayRe[1];
                    var mont=Number(arrayRe[2]);
                    var porTotal=Number((Number(porc)*Number($("#desTotal").attr('data-total')))/100);
                    console.log(porTotal,"porcenataje total");
                    $("#porcentajeTotal").val(porc);
                    if(porc==0 || porc==""){
                           var porTotal=mont;
                    }
                    $("#montoTotal").val(porTotal.toFixed(2));
                 
                    
                }
              
                var totalDes=$("#desTotal").attr('data-total');
                totalDes=Number(totalDes);
                if(totalDescuento.val()!='' ){
                    if(montoTotal.val()<1){
                           totalDes=Number(totalDes)-Number(montoTotal.val());
                        }else{
                           
                            totalDes=Number(totalDes)-Number(montoTotal.val());
                        }
                }
                desTotal.val(addCommas(redondeodecimale(totalDes).toFixed(2)));
        });
         function  calcular_total_orden(){

            console.log("bbbbbbbbbbbbbbbbbbbbbbbbbbbbb");
            var suma_total=0;
            console.log("entro tabla2");
            var impuesDetalleTotal=0;
             $("#articulo_mov_det tr").each(function(){
              console.log("entro tabla");
            
            var valorCant= $(this).closest("tr").find("td:eq(1)").children("input").val();
          
            $(this).closest("tr").find("td:eq(2)").children("input").val(valorCant);
            var precioUnitario=$(this).closest("tr").find("td:eq(5)").children("input").val();
            var precioTotal=Number(valorCant)*Number(precioUnitario);
            $(this).closest("tr").find("td:eq(6)").children("input").val(addCommas(redondeodecimale(precioTotal).toFixed(2)));
            var desto=$(this).closest("tr").find("td:eq(7)").children("select");
            calcularDescuentoDetalle(desto)
            var montoDesc= $(this).closest("tr").find("td:eq(9)").children("input").val();
            var valCompr=Number(precioTotal)-Number(montoDesc);
            $(this).closest("tr").find("td:eq(10)").children("input").val(addCommas(redondeodecimale(valCompr).toFixed(2)));
            var idenImpue= (p_state.prop('checked')) ? '1' : '0';
            var valoImpue=0.00;

            console.log(idenImpue,"aaaaaaaa");
            if(idenImpue!=0){
                valoImpue=calcular_impueso(precioUnitario,valorCant);

            }
            impuesDetalleTotal=Number(valoImpue)+Number(impuesDetalleTotal);
            $(this).closest("tr").find("td:eq(11)").children("input").val(addCommas(redondeodecimale(valoImpue).toFixed(2)));
            var total=Number(valCompr)+Number(valoImpue);
             $(this).closest("tr").find("td:eq(12)").children("input").val(addCommas(redondeodecimale(total).toFixed(2)));


                var total_detalle=$(this).closest("tr").find("td:eq(12)").children("input").val();
                suma_total=suma_total+Number(total_detalle);
                console.log(total_detalle,'dsdsss');
                
            });
          console.log("entro tabla3");

        $('#desTotal').attr('data-total', addCommas(redondeodecimale(suma_total).toFixed(2)));
        $('#desTotal').val(addCommas(redondeodecimale(suma_total).toFixed(2)));
        $('#desTotal').attr('data-impuesto', addCommas(redondeodecimale(impuesDetalleTotal).toFixed(2)));
        totalDescuento.val("").trigger("change");

        
        }
        
        $(document).on("keyup", ".m_articulo_cantidad",".m_articulo_precio", function () {
          
            calcular_total_orden();
        });
           $(document).on("keyup",".m_articulo_precio", function () {
           
            calcular_total_orden();
        });
         $(document).on("change",".m_articulo_precio", function () {
          
            calcular_total_orden();
        });
        function calcularDescuentoDetalle(e){
            console.log("entro descontrooeoeoeooeoe");
            var codigo=$(e).attr('data-desc');
            var val=$(e).val();
            console.log(val);
             console.log("dhdhdhhdhdhdhdhdh");
            var arrayRe=val.split("*");
            console.log("tratatatatatatatatattata");
            var code=arrayRe[0];
            var porc=arrayRe[1];
            var mont=arrayRe[2];
            if($(e).val()!=""){
                    if(porc!='0'){
                        var precioTotal=Number($(e).closest("tr").find("td:eq(6)").children("input").val());
                        var montopor=precioTotal*Number(porc)/100;
                        console.log(precioTotal,"aaaaaaaaaaaaaaaaaaaaa");
                        $("#porc_"+codigo).val(porc);
                        $("#monto_"+codigo).val(montopor.toFixed(2));   
                    }else{
                        $("#monto_"+codigo).val(mont);
                        $("#porc_"+codigo).val(0);
                    }
                }else{
                    $("#monto_"+codigo).val("");
                    $("#porc_"+codigo).val("");
                }
        } 
           $(document).on("change",".descuentosSelect", function () {
            
            calcularDescuentoDetalle(this)
            calcular_total_orden();
        });
        

        // $(document).on("keyup", ".m_articulo_cantidad", function () {
        //     var valorCant=$(this).val();
        //     $(this).closest("tr").find("td:eq(3)").children("input").val(valorCant);
        //     var precioUnitario=$(this).closest("tr").find("td:eq(6)").children("input").val();
        //     var precioTotal=Number(valorCant)*Number(precioUnitario);
        //     $(this).closest("tr").find("td:eq(7)").children("input").val(addCommas(redondeodecimale(precioTotal).toFixed(2)));
        // });
        $scope.addArticuloSolicitud = function(){
           
                
                titlemodalMovimietoArticulo.html('Nuevo Articulo');
                if($("#identificador_solicitud_compra").val()!='I'){
                     table_container_ccsolart.jtable('destroy');
                  }
                // cargartableSolicitufArti();
                $("#identificador_solicitud_compra").val("A");  
                modalSolicitudArticulo.modal('show');
            
                $('#search_ccsolart').val('');
                $('#LoadRecordsButtonCCsolart').click();
                $("#table_container_solicitudCompra .jtable-main-container .jtable-bottom-panel .jtable-left-area .jtable-goto-page select ").val("1").trigger("change");
          
            
        }

        
        
         function getDataForProforma () {
            RESTService.all('aprobacionOrdenCompras/data_formOrdenPro', '', function(response) {
                if (!_.isUndefined(response.status) && response.status) {
                     igv=response.igv[0].value;
                    //   articulos_repuestos.append('<option value="">Seleccionar</option>');
                    //  _.each(response.articulos_repuestos, function(item) {
                    //     articulos_repuestos.append('<option value="'+item.id+'*'+item.nPrecio+'">'+item.code_article+' '+item.description+'</option>');
                    // });
                } 
            }, function() {
                getDataForProforma();
            });
        }
        getDataForProforma();

         function calcular_impueso(precio,cantidad){
            var impu=(Number(precio)*Number(cantidad))*((Number(igv)/100));
            impu=impu.toFixed(2);
            return impu;
        }
        function addArtNada(){
          
            var bval = true;
            bval = bval && cantProductoMN.required();
            if (bval) {
                var codigo=Math.random().toString(36).substr(2, 18);
                var grubNa={
                       'identificador': codigo,
                       'idProducto':idProductoMN.val(),
                }
                aartMN.push(grubNa);
                var ver='A';
                var tipoArt='NA';
                var codl="";
                var datl="";
                var idAlmacen="";
                var idLocalizacion="";
                var costo=costoNa.val();
                var costo_total="";
                var precio="";
                var precioTotal="";
                var estado="N";
                var idpr=idProductoMN.val();
                var obser='';
                var cantPend='0';
                var cantReci='0';
                var cantDevu='0';
                var precio=0;
                var precioTotal=0;
                var idDescuento="";
                var impuesTotal=0;
                var nPorcDescuento=0;
                var nDescuento=0;
                var iddet=0;
                var ident_impuesto=0;
                var codSoli=0;
                var totalDetalle=0;
                var valorCompra=0;
                RESTService.get('aprobacionOrdenCompras/getDataArticulo', idpr, function(response) {
                        var datapro=response.data;
                        // console.log(datapro[0].impuesto,"impuesto_ident");
                         ident_impuesto=(p_state.prop('checked')) ? '1' : '0';
                         if ($('#tr_idArt' + idProductoMN.val()).length > 0) {
                            AlertFactory.showWarning({
                                title: '',
                                message: 'Ya se asignó este Artículo'
                                    });
                                    return false;
                                }else{

                                      addArticuloTable(iddet,idProductoMN.val(),desProductoMN.val(),cantProductoMN.val(),ver,codigo,tipoArt,codl,datl,estado,fecharequerida,datapro[0].unidadMedida,obser,cantProductoMN.val(),cantReci,cantDevu,precio,precioTotal,idDescuento,impuesTotal,nPorcDescuento,nDescuento,ident_impuesto,codSoli,totalDetalle,valorCompra);
                                            modalNada.modal('hide');
                                            modalMovimietoArticulo.modal('hide');     
                                }
                    
                });
              
            }

         }
        
       
     
        function activarbotones(){
            if($("#estado").val()=="1"){
                console.log("entro accccccccccccccccccccccccccccccc");
                $("#btn_movimiento_detalle").prop('disabled',false);
                $("#btn_movimiento_Por_aprobar").prop('disabled',false);
            }else if($("#estado").val()=="2"){
                 console.log("entro accaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
                $("#btn_movimiento_detalle").prop('disabled',true);
                $("#btn_movimiento_Por_aprobar").prop('disabled',true);
            }else if($("#estado").val()==""){
                 console.log("entro accbbbbbbbbbbbbbbb");
                $("#btn_movimiento_detalle").prop('disabled',false);
                $("#btn_movimiento_Por_aprobar").prop('disabled',true);
            }else{
                $("#btn_movimiento_detalle").prop('disabled',true);
                $("#btn_movimiento_Por_aprobar").prop('disabled',true);
            }
        }
        function newMovimiento()
        {    idMoneda.val("1").trigger("change");
            titlemodalMovimieto.html('Nueva Orden de Compra');
            activarbotones();
           
            modalMovimieto.modal('show');

        }
         $scope.addArticulo = function()
        {   
            var bval = true;
            bval = bval && idTipoOperacion.required();
            bval = bval && fecha_registro.required();
            if(!idMoneda.prop("disabled")){
                bval = bval && idMoneda.required();
            }
            if (bval) {
                // if(idMovimiento.val()==""){
                //     saveMovimientoCab(); 
                // }
                titlemodalMovimietoArticulo.html('Nuevo Articulo');
              
                var nat='C';
              
                if(nat=='E' || nat=='A' || nat=='C' ){
                    if(idenifcador_table_art.val()!='I'){

                         table_container_cc2.jtable('destroy');
                      }
                      cargartableMovAr2();
                      idenifcador_table_art.val("A");  
                }else{
                    if(idenifcador_table_art.val()!='I'){
                         table_container_cc2.jtable('destroy');
                      }
                     cargartableMovAr();
                     idenifcador_table_art.val("A");  
                }
              
                
                modalMovimietoArticulo.modal('show');
            
                $('#search_cc2').val('');
                $('#LoadRecordsButtonCC2').click();
                 $('#search_cc22').val('');
                $('#LoadRecordsButtonCC22').click();
                $("#table_container_Register_Articulo .jtable-main-container .jtable-bottom-panel .jtable-left-area .jtable-goto-page select ").val("1").trigger("change");
            }
           

            
        }
        idTipoOperacion.change(function(){
           var natudata = idTipoOperacion.val();
           var co=natudata.split('*');
           var na=co[1];

           if(na=='S'){
               idMoneda.prop("disabled", true);
               idMoneda.trigger('change');
               idMoneda.val('1').trigger('change');
                           
           }else{
               idMoneda.prop("disabled", false);
               idMoneda.trigger('change'); 
             
           }
        });
        function getDataFormMovement () {
            RESTService.all('aprobacionOrdenCompras/data_form', '', function(response) {
                if (!_.isUndefined(response.status) && response.status) {
                        var hoy = new Date();
                        var hAnio=hoy.getFullYear();
                        var hmes=hoy.getMonth()+1;
                        if(Number(hmes)<10){
                            hmes='0'+String(hmes);
                        }

                        var hdia=hoy.getDate();
                        if(Number(hdia)<10){
                            hdia='0'+String(hdia);
                        }
                        var hora = hoy.getHours();
                        if(Number(hora)<10){
                            hora='0'+String(hora);
                        }
                        var minutos= hoy.getMinutes();
                        if(Number(minutos)<10){
                            minutos='0'+String(minutos);
                        }
                        var actu=hAnio+'-'+hmes+'-'+hdia;
                         fecha_registro.val(actu);
                        fecha_requerida.val(actu);
                   
                    var areato=response.area;
                    var consecutivoto=response.consecutivo;
                 
                    cCodConsecutivo.html("");
                    cCodConsecutivo.append('<option value="">Seleccionar</option>');
                    _.each(response.consecutivo, function (item) {
                        cCodConsecutivo.append('<option value="' + item.cCodConsecutivo + '">' + item.cCodConsecutivo + '</option>');
                    });

                    idProveedor.html("");
                    idProveedor.append('<option value="">Seleccionar</option>');
                    _.each(response.idProveedor, function (item) {
                        idProveedor.append('<option value="' + item.id + '">' + item.razonsocial + '</option>');
                    });

                    // idTipoOperacion.html("");
                    // idTipoOperacion.append('<option value="" selected>Seleccionar</option>');
                    //  _.each(response.operaciones, function(item) {
                    //     idTipoOperacion.append('<option value="'+item.IdTipoOperacion+'*'+item.idNaturaleza+'">'+item.descripcion+'</option>');
                    // });
                    area.html("");
                    area.append('<option value="" selected>Seleccionar</option>');
                     _.each(response.area, function(item) {
                        area.append('<option value="'+item.id+'">'+item.descripcion+'</option>');
                    }); 
                    // idMoneda.html("");
                    // idMoneda.append('<option value="" selected>Seleccionar</option>');
                    //  _.each(response.moneda, function(item) {
                    //     idMoneda.append('<option  value="'+item.Value+'">'+item.DisplayText+'</option>');
                    // });
               
                    AlmacenesSele=response.almacen_usuario;
                    // idAlmacen.append('<option value="" selected>Seleccionar</option>');
                    //  _.each(response.almacen, function(item) {
                    //     idAlmacen.append('<option value="'+item.Value+'">'+item.DisplayText+'</option>');
                    // }); 
                   
                }
            }, function() {
                getDataFormMovement();
            });
        }
        idProveedor.select2();
        getDataFormMovement();

       
        idMoneda.change(function () {
           
              // if(table_servicios.html()!=""){
              //    modalDeleteDetalle.modal("show");
              // }
               var hoy = new Date();
            var hAnio=hoy.getFullYear();
            var hmes=hoy.getMonth()+1;
            if(Number(hmes)<10){
                hmes='0'+String(hmes);
            }

            var hdia=hoy.getDate();
            if(Number(hdia)<10){
                hdia='0'+String(hdia);
            }
            var actu=hAnio+'-'+hmes+'-'+hdia;
                totalDescuento.html("");
                totalDescuento.append('<option value="">Seleccionar</option>');
              _.each(descuentosTotales, function(item) {
                        if( item.cTipoAplica=='T'){
                          
                            var mo=idMoneda.val();
                             var por=Number(item.nPorcDescuento);
                            var monto=Number(item.nMonto);
                           
                            if((item.idMoneda==mo || item.nPorcDescuento!=0) && (item.nSaldoUso>0 || item.nLimiteUso==0)){
                               
                                

                                if(item.dFecIni<=actu && item.dFecFin>actu){
                                    console.log("entro aaaaaaaaaaaaa");
                                    totalDescuento.append('<option value="'+item.id+'*'+por+'*'+monto+'" >'+item.descripcion+'</option>');
                                 }
                            }
                    } 
                    });
              // llenarServicios();
        });
        function getDataForOrdenServicio () {
            RESTService.all('aprobacionOrdenCompras/data_formOrden', '', function(response) {
                if (!_.isUndefined(response.status) && response.status) {
                   
                     descuentos=response.descuentos;
                     redondeo=response.dataredondeo
                   
                    var hoy = new Date();
                    var hAnio=hoy.getFullYear();
                    var hmes=hoy.getMonth()+1;
                    if(Number(hmes)<10){
                        hmes='0'+String(hmes);
                    }

                    var hdia=hoy.getDate();
                    if(Number(hdia)<10){
                        hdia='0'+String(hdia);
                    }
                    var actu=hAnio+'-'+hmes+'-'+hdia;

                    //  cCodConsecutivo.append('<option value="">Seleccionar</option>');
                    //  _.each(response.codigo, function(item) {
                    //     cCodConsecutivo.append('<option value="'+item.cCodConsecutivo+'">'+item.cCodConsecutivo+'</option>');
                    // });
                      // cCodConsecutivo.append('<option value="'+item.cCodConsecutivo+'*'+item.nConsecutivo+'">'+item.cCodConsecutivo+'</option>');
                          idcondicion_pago.html("");
                       idcondicion_pago.append('<option value="">Seleccionar</option>');
                     _.each(response.condicion_pago, function(item) {
                        if(item.id==1){
                               idcondicion_pago.append('<option value="'+item.id+'" selected>'+item.description+'</option>');
                        }else{
                               idcondicion_pago.append('<option value="'+item.id+'">'+item.description+'</option>');
                        }
                     
                    });
                   idMoneda.html("");
                        idMoneda.append('<option value="">Seleccionar</option>');
                       _.each(response.moneda, function(item) {
                        idMoneda.append('<option value="'+item.IdMoneda+'">'+item.Descripcion+'</option>');
                    });
                       idMoneda.val("1").trigger('change');
                       // totalDescuento.append('<option value="">Seleccionar</option>');
                        
                        descuentosTotales=response.descuentos;
                     
                
                } 
            }, function() {
                getDataForOrdenServicio();
            });
        }
        getDataForOrdenServicio();

       

       

        // function cargartableSolicitufArti(){
        //      var search_ccsolart = getFormSearchSolicitudCompra('frm-search-ccsolart', 'search_ccsolart', 'LoadRecordsButtonCCsolart');
        //     table_container_ccsolart = $("#table_container_solicitudCompra");
        //     table_container_ccsolart.jtable({
        //         title: "Lista de Articulos",
        //         paging: true,
        //         sorting: true,
        //          cache: false, 
        //         actions: {
        //             listAction: base_url + '/aprobacionOrdenCompras/getScompraArticulo'
        //         },
        //         toolbar: {
        //             items: [{
        //                 cssClass: 'buscador',
        //                 text: search_ccsolart
        //             }]
        //         },
                
        //         fields: {
        //             consecutivo: {
        //                 key: true,
        //                 create: false,
        //                 edit: false,
        //                 list: false
        //             },
        //             select: {
        //                 width: '1%', 
        //                 sorting: false,
        //                 edit: false,
        //                 create: false,
        //                 listClass: 'text-center',
        //                 display: function (data) {
        //                    return '<label class="checkbox-inline i-checks"> <input name="idSolicitud" class="check valcheck" type="checkbox" id="p_state" data-nConsecutivo="'+data.record.nConsecutivo+'" data-consecutivo="'+data.record.consecutivo+'" data-cantida="'+data.record.cantidad+'" data-idProducto="'+data.record.idArticulo+'" data-DesProducto="'+data.record.articulo+'" data-unidaMedida="'+data.record.unidadMedida+'" data-impuesto="'+data.record.impuesto+'"></label>';
        //                }
        //             },
        //             cCodConsecutivo: {
        //                 title: 'Código'
        //             },
        //             nConsecutivo: {
        //                  title: 'Consecutivo'
        //             },
        //             idArticulo: {
        //                 create: false,
        //                 edit: false,
        //                 list: false
        //             },
        //             articulo: {
        //                 title: 'Artículo'

        //             },
                    
        //             unidadMedida: {
        //                 title: 'Unida Medida'

        //             },
        //             cantidad: {
        //                 title: 'Cantidad',
        //                 display: function (data) {
        //                    return Number(data.record.cantidad);
        //                }
        //             },
        //             fecha_requerida: {
        //                 title: 'Fecha Requerida',
        //                  display: function (data) {
        //                     return moment(data.record.fecha_requerida).format('DD/MM/YYYY');
        //                 }
        //             },

                    
        //         },
        //         recordsLoaded: function(event, data) {
        //             $('.i-checks').iCheck({
        //                 checkboxClass: 'icheckbox_square-green'
        //             }).on('ifChanged', function (event) {
        //                     $(event.target).click();
        //             });

        //             $('.select_cc').click(function(e){
        //                 var codigo = $(this).attr('data-code');
        //                 var descripcionArt = $(this).attr('data-name');
        //                 var idTipoArt = $(this).attr('data-type');
        //                 var serie = $(this).attr('data-serie');
        //                 var lote = $(this).attr('data-lote');
        //                 var costo = $(this).attr('data-costo');
        //                 seleccionarModal(codigo,descripcionArt,idTipoArt,serie,lote,costo); 
        //                 e.preventDefault();
        //             });
        //         }
        //     });

        //     generateSearchForm('frm-search-ccsolart', 'LoadRecordsButtonCCsolart', function(){
        //         table_container_ccsolart.jtable('load', {
        //             search: $('#search_ccsolart').val(),
        //             consecutivo: $('#consecutivo').val(),
        //             FechaRegistro: $('#FechaRegistro').val(),
        //         });
        //     }, false);

        // }
        
        var search = getFormSearch('frm-search-AprobacionOrdenCompra', 'search_b', 'LoadRecordsButtonAprobacionOrdenCompra');

        var table_container_AprobacionOrdenCompra = $("#table_container_AprobacionOrdenCompra");

        table_container_AprobacionOrdenCompra.jtable({
            title: "Lista de Ordenes de Compra",
            paging: true,
            sorting: true, 
            actions: { 
                listAction: base_url + '/aprobacionOrdenCompras/list',
                // createAction: base_url + '/aprobacionOrdenCompras/create',
                // updateAction: base_url + '/aprobacionOrdenCompras/update',
                // deleteAction: base_url + '/aprobacionOrdenCompras/delete',
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
                idOrdenCompra: {
                    key: true,
                    create: false,
                    edit: false,
                    list: false
                },
                Codigo: {
                    create: false,
                    edit: false,
                    list: false
                }, 
                Conformidad: {
                    title: 'Conformidad',
                     

                },
                 Consecutivo: {
                    title: 'Consecutivo',
                     

                },
                 Usuario: {
                    title: 'Usuario',
                     

                },
                EstadoAprob: {
                    title: 'Estado Aprobación',
                    values: {'0':'Por Aprobar', '1': 'Aprobado', '2': 'Rechazado'},
                    type: 'checkbox',
                    defaultValue: 'A',
                     

                },
                 Fecha: {
                    title: 'Fecha',
                    display: function (data) {
                            return moment(data.record.Fecha).format('DD/MM/YYYY');
                    } 

                },
                 FechaReq: {
                    title: 'Fecha Requerida',
                     display: function (data) {
                            return moment(data.record.FechaReq).format('DD/MM/YYYY');
                    }

                },
                 TipoDoc: {
                    title: 'TipoDoc',
                     

                },
                 NumeroDoc: {
                    title: 'NumeroDoc',
                     

                },
                 Proveedor: {
                    title: 'Proveedor',
                     

                },
                 Moneda: {
                    title: 'Moneda',
                     

                },
                Total: {
                    title: 'Total',
                     

                },
                 EstadoOC: {
                    title: 'Estado Orden Compra',
                     

                },
                edit: {
                    width: '1%',
                    sorting: false,
                    edit: false,
                    create: false,
                    listClass: 'text-center',
                    display: function (data) {
                        return '<a href="javascript:void(0)" class="edit-solicitud" data-nrConfr="' + data.record.Conformidad
                            + '" data-id="' + data.record.idOrdenCompra+'" data-iEstadoCompra="' + data.record.EstadoAprob+'" title="Editar"><i class="fa fa-search fa-1-5x"></i></a>';
                    }

                },

            },
           
            recordsLoaded: function (event, data) {
                $('.edit-solicitud').click(function (e) {
                    var id = $(this).attr('data-id');
                    var conformi = $(this).attr('data-nrConfr');
                    var estado = $(this).data('estado');
                    var estadoConf = $(this).attr('data-iEstadoCompra');
                    $("#nCodConformidad").val(conformi);
                    $("#iEstadoConformidad").val(estadoConf);

                    // if (estado != "1" && estado != "4") {
                    //     AlertFactory.textType({
                    //         title: '',
                    //         message: 'No se puede modificar, la solicitud ya no se encuentra en estado Registrado',
                    //         type: 'info'
                    //     });
                    //     return false;
                    // }
                    // console.log(id);
                    findRegisterOrdenCompra(id);
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

        generateSearchForm('frm-search-AprobacionOrdenCompra', 'LoadRecordsButtonAprobacionOrdenCompra', function(){
            table_container_AprobacionOrdenCompra.jtable('load', {
                search: $('#search_b').val()
            });
        }, true);
    }

    function Config($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('aprobacionOrdenCompras', {
                url: '/aprobacionOrdenCompras',
                templateUrl: base_url + '/templates/aprobacionOrdenCompras/base.html',
                controller: 'AprobacionOrdenCompraCtrl'
            });

        $urlRouterProvider.otherwise('/');
    }
})
();