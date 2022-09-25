/**
 * Created by JAIR on 4/5/2017.
 */
  
(function () {
    'use strict';
    angular.module('sys.app.register_transfers')
        .config(Config)
        .controller('Register_TrasnferCtrl', Register_TrasnferCtrl);

    Config.$inject = ['$stateProvider', '$urlRouterProvider'];
    Register_TrasnferCtrl.$inject = ['$scope','_', 'RESTService', 'AlertFactory', 'Notify'];

    function Register_TrasnferCtrl($scope, _, RESTService, AlertFactory, Notify)
    {
        var  aartML= []; //arrays para guardas los datos de lotes
        var  acodigos=[];//arrays de codigos;
        var  alotML=[];
        var  afinML=[];
        var  avenML=[];

        var aartMK=[]; //arrays de id kits 
        var aartMLE=[];//arrays lotes exis

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
        var modalMovimietoArticulo=$("#modalMovimietoArticulo");
        var titlemodalMovimietoArticulo=$("#titlemodalMovimietoArticulo");
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
        var idTransferenciaProcesar=$("#idTransferenciaProcesar");
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
        var anio_modeloMS=$("#anio_modeloMS");
        var anio_fabricacionMS=$("#anio_fabricacionMS");
        var articulo_serie_det=$("#articulo_serie_det");
        var idLoteML2=$("#idLoteML2");
        var idArtSerie=$("#idArtSerie");
        var cantArtSerie=$("#cantArtSerie");
        var desArtSerie=$("#desArtSerie");
        var s_serie=$(".s_serie");
        var procesarTransfBoton=$("#ProcesarTransferenciaBoton");
        var table_container_cc2;
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
        var btn_movimiento_detalle=$("#btn_movimiento_detalle");
        var modalProcesarTransferencia=$("#modalProcesarTransferencia");
        var msg_cont_ProcesarTransferencia=$("#msg_cont_ProcesarTransferencia");
        var btn_imprimirTransferencia=$("#btn_imprimirTransferencia");
        $('.i-checks').iCheck({
            checkboxClass: 'icheckbox_square-green'
        }).on('ifChanged', function (event) {
            $(event.target).click();
            $scope.chkState();
        });

        btn_imprimirTransferencia.click(function(e){
            // var data = {
            //                     referral_guide_id:1,
                               
            // };
            // // window.open(base_url + '/templates/register_transfers/reporte.html', 'name'); 
            // localStorage.setItem('Nombre', 'Miguel Antonio')
            //  $scope.loadTransferPDF('referral_guides/referralGuidePDF', data);
            var id= idMovimiento.val();
            if(id!=''){
                 var data = {
                                id: id,
                                
                };
              $scope.loadTransferPDF('register_transfers/pdf', data);
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
        modalKit.on('hidden.bs.modal', function (e) {
            cleanArtKit();
        });
        // modalSerie.on('hidden.bs.modal', function (e) {
        //     cleanArtSerie();
        // });  
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
         modalProcesarTransferencia.on('hidden.bs.modal', function (e) {
            cleanmodalProcesarTransferencia();
        }); 


        btnguardarMovimiento.click(function(e){
            saveMovimientoCab();
        });
         function findRegister_Trasnfer(id)
        {
            
       
            RESTService.get('register_transfers/find', id, function(response) {
                if (!_.isUndefined(response.status) && response.status) {
                    var data_p = response.data;
                    var lotE=response.data_movimiento_lote;
                    var serE=response.data_movimiento_serie;
                    titlemodalMovimieto.html('Editar Transferencia '+'['+ data_p.idTransferencia+ ']');
                    btn_movimiento_detalle.prop('disabled',false);
                    btn_movimiento_detalle.trigger('change');
                    ident_detalle.val("A");
                    if(lotE!=''){
                         lotE.map(function(index) {
                                var grubLE={
                               'identificador': index.consecutivo,
                               'idProducto':index.idArticulo,
                               'idLote':index.idLote,
                               'fecha_vencimiento':index.fechaVencimiento,
                               'codig_lote': index.Lote,
                               }
                              aartMLE.push(grubLE);
                         });
                    }
                    if(serE!=''){
                        serE.map(function(index) {
                             var grubSE={
                                       'identificador': index.identificador,
                                       'idProducto':index.idArticulo,
                                       'serie':index.nombreSerie,
                                       'idSerie': index.idSerie,
                                       'cantidad':index.cantiTotal,
                                    }
                            aartMSE.push(grubSE);
                        });
                    }

                    idTipoOperacion.val(data_p.idTipoOperacion+'*'+data_p.tipoTransferencia).trigger('change');
                    idTipoOperacion.prop('disabled',true);
                    idTipoOperacion.trigger('change');
                    idMovimiento.val(data_p.idTransferencia);
                    fecha_registro.val(data_p.fecha_registro);
                    observaciones.val(data_p.observaciones);
                   
                    if(data_p.estado==0){
                            p_state.val("REGISTRADO");
                        }
                    if(data_p.estado==1){
                             p_state.val("PROCESADO");
                    }
                    if(p_state.val()=="PROCESADO"){
                            procesarTransfBoton.prop('disabled',true);
                            procesarTransfBoton.trigger('change');
                            btnguardarMovimiento.prop('disabled',true);
                            btnguardarMovimiento.trigger('change');
                            btn_movimiento_detalle.prop('disabled',true);
                            btn_movimiento_detalle.trigger('change');
                        }else{
                            procesarTransfBoton.prop('disabled',false);
                            procesarTransfBoton.trigger('change');
                            btnguardarMovimiento.prop('disabled',false);
                            btnguardarMovimiento.trigger('change');
                            btn_movimiento_detalle.prop('disabled',false);
                            btn_movimiento_detalle.trigger('change');
                        }
                    var mov_ar=response.movimiento_Ar;
                     mov_ar.map(function(index) {
                        var ver='A';
                        var tipo='NA';
                        var codl="";
                        var datl="";
                        if(index.serie=='1'){
                            ver='N';
                        }
                        if(index.serie=='1'){
                            tipo='SE';
                        }else if(index.lote=='1'){
                            tipo='LE';
                            codl=index.idlote;
                        }
                        addArticuloTable(index.idArticulo,index.description,Math.trunc(index.cantidad),ver,index.consecutivo,tipo,codl,datl,index.idAlmacenOrigen,index.idLocalizacionOrigen,index.costo2,index.costo_total,index.idAlmacenDestino,index.idLocalizacionDestino);                      
                      })
                    
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
        function cleanArtLote(){
            idLoteML.val('');
            idLoteML2.val('');
            idProductoML.val('');
            desProductoML.val('');
            cantProductoML.val('');
            lotProductoML.val('');
            fIngrePrML.val('');
            fVenPrML.val('');
        }
        function cleanArtNada(){
            idProductoMN.val("");
            desProductoMN.val("");
            cantProductoMN.val("");

        }
        function cleanArtLotell(){ 
            idProductoMll.val("");
            desProductoMll.val("");
            cantProductoMll.val("");
            codigoLoteMll.val("");
            fechaVl.val("");
            btn_Lotd.prop('disabled',true);
            btn_Lotd.trigger('change');
            codigoLoteMll.prop("readonly",false);
            codigoLoteMll.trigger('change');
            idLoteMll.val("");
            idLoteMll2.val("");
        }
        function cleanDeleteMovimiento(){
          
            idMovimientoDelete.val("");
            msg_cont_EliminarMovimiento.removeClass('show')
            $("#msg_cont_EliminarMovimiento p").html("");

        }
        function cleanmodalProcesarTransferencia(){
          
            idTransferenciaProcesar.val("");
            msg_cont_ProcesarTransferencia.removeClass('show')
            $("#msg_cont_ProcesarTransferencia p").html("");

        }
        function cleanArtSeriess(){
            idProductoMss.val("");
            desProductoMss.val("");
            cantProductoMss.val("");
            btnSeleSerie.prop('disabled',false);
            btnSeleSerie.trigger('change');
            identSerAr.val(""); 
            if(identiSelec=="A"){
                table_container_cc4.jtable('destroy');
                identiSelec="I";
            }
            table_serie_cabecera.html("");
            articulo_serie_det.html("");
            btn_serC.prop('disabled',true);
            btn_serC.trigger('change');

        }
        function cleanArtSerie(){
            idSerieMS.val('');
            idProductoMS.val('');
            desProductoMS.val('');
            cantProductoMS.val('');
            colorMS.val('');
            chasisMS.val('');
            motorMS.val('');
            anio_modeloMS.val('');
            anio_fabricacionMS.val('');
        }
        function cleanArtKit(){
            tablekitdetM.html("");
            cantProductoMK.val('');
            desProductoMK.val('');
            idProductoMK.val('');
        }
         function cleanMovimiento () {
            cleanRequired();
            titlemodalMovimieto.html('');
            idMovimiento.val('');
            idTipoOperacion.val('');
            idMoneda.val('');
            ident_detalle.val('');
            aartML= [];
            acodigos=[];
            aartMK=[];
            aartMLE=[];
            aartMSN=[];
            aartMSE=[];
            aartMN=[];
            observaciones.val('');
            idNaturaleza.val('');
            fecha_registro.val('');
            idTipoOperacion.prop('disabled',false);
            idTipoOperacion.trigger('change');
            p_state.val('');
            articulo_mov_det.html('');
            btn_movimiento_detalle.prop('disabled',true);
            btn_movimiento_detalle.trigger('change');
            btnguardarMovimiento.prop('disabled',false);
            btnguardarMovimiento.trigger('change');
            procesarTransfBoton.prop('disabled',true);
            procesarTransfBoton.trigger('change');
        }
        function cleanMovimientoArticulo(){
            articulo_serie_det.html('');
            idArtSerie.val('');
            cantArtSerie.val('');
            desArtSerie.val('');
            

        }

        codigoLoteMll.keypress(function(e) {
        var code = (e.keyCode ? e.keyCode : e.which);
            if(code==13){
                if(idLoteMll2.val()==""){
                    getlotes();
                }
              
            }
        });
        cantProductoMK.keypress(function(e) {
        var code = (e.keyCode ? e.keyCode : e.which);
            if(code==13){
                addArtkit();
            }
        });
        cantProductoMN.keypress(function(e) {
        var code = (e.keyCode ? e.keyCode : e.which);
            if(code==13){
                addArtNada();
            }
        });
        function getlotes(){
            var id=codigoLoteMll.val();
            RESTService.get('register_transfers/validateLote', id, function(response) {
                 if (!_.isUndefined(response.status) && response.status) {
                      if(response.data=="N"){
                        AlertFactory.textType({
                        title: '',
                        message: 'El lote no existe . Intente nuevamente.',
                        type: 'info'
                          });
                      }else{
                        fechaVl.val(response.fecha);
                        idLoteMll.val(response.codigol);
                        btn_Lotd.prop('disabled',false);
                        codigoLoteMll.prop("readonly",true);
                        codigoLoteMll.trigger('change');
                        btn_Lotd.trigger('change');
                      }
                     
                 }else {
                    AlertFactory.textType({
                        title: '',
                        message: 'Hubo un error . Intente nuevamente.',
                        type: 'info'
                    });
                }

               });
        }
        function seleccionarModal(codigo,descripcionArt,idTipoArt,serie,lote,costo) {
            if(idTipoArt=='3'){
                modalKit.modal('show');
                $('#cantProductoMK').attr('onkeypress','return soloNumeros(event)');
                desProductoMK.val(descripcionArt);
                idProductoMK.val(codigo);
                costoMK.val(costo);
            }else if(serie=='1'){
                desProductoMss.val(descripcionArt);
                idProductoMss.val(codigo);
                costoAS.val(costo);
                addSeleccSerie();
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
        function addToKit(idArticulo,descripcion,cantidad){

            var tr = $('<tr id="tr_idArticulo' + idArticulo + '"></tr>');
            var td1 = $('<td>' + descripcion + '</td>');
            var td2 = $('<td class="text-center" >' + cantidad + '</td>');
            tr.append(td1).append(td2);
            tablekitdetM.append(tr);
        }
        function getkitDet(codigo){
             RESTService.get('register_transfers/getKit', codigo, function(response) {
                 if (!_.isUndefined(response.status) && response.status) {
                      var data_p = response.data;
                     _.each(data_p, function (c) {
                        addToKit(c.idArticulo,c.description, Math.trunc(c.cantidad));
                    });
                 }else {
                    AlertFactory.textType({
                        title: '',
                        message: 'Hubo un error . Intente nuevamente.',
                        type: 'error'
                    });
                }

               });
        }
        function getLocalizacion(idAlmacen){
             var id=idAlmacen;
             RESTService.get('register_transfers/getLocalizacionSelec', id, function(response) {
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
         function getLocalizacionD(idAlmacen){
             var id=idAlmacen;
             RESTService.get('register_transfers/getLocalizacionSelec', id, function(response) {
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
        function addlocSeleO(codigo){
            var idLocali=$("#"+codigo);
            idLocali.append('<option value="" selected>Seleccionar</option>');
              _.each(LocalizacionesSele, function(item) {
                 idLocali.append('<option value="'+item.idLocalizacion+'" >'+item.descripcion+'</option>');
            });

        }
        function addAlmaSelecO(codigo){
           var idAlmacenSele=$("#Al_"+codigo);
            idAlmacenSele.append('<option value="" selected>Seleccionar</option>');
              _.each(AlmacenesSele, function(item) {
                 idAlmacenSele.append('<option value="'+item.idAlmacen+'" >'+item.descripcion+'</option>');
            }); 
        }
         function addAlmaSelecD(codigo){
           var idAlmacenSele=$("#AlD_"+codigo);
            idAlmacenSele.append('<option value="" selected>Seleccionar</option>');
              _.each(AlmacenesSele, function(item) {
                 idAlmacenSele.append('<option value="'+item.idAlmacen+'" >'+item.descripcion+'</option>');
            }); 
        }
        function addlocSeleD(codigo){
            var idLocali=$("#loD_"+codigo);
            idLocali.append('<option value="" selected>Seleccionar</option>');
              _.each(LocalizacionesSele, function(item) {
                 idLocali.append('<option value="'+item.idLocalizacion+'" >'+item.descripcion+'</option>');
            });

        }
        function getLocaStock(idl,ident,idPrAl,idLocalizacion){
            var idLocali=$("#"+ident);
            var idLocaliD=$("#loD_"+ident);
            var id=idl;
            var idPrAl =idPrAl;
            llenarLocalizacionOrigen(idLocali,id,idPrAl,idLocalizacion)
        }
        function getLocaStock2(idl,ident,idPrAl,idLocalizacion){
            var idLocali=$("#loD_"+ident);
            var idPrAl =idPrAl;
            var id=idl;
            llenarLocalizacionDestino(idLocali,id,idPrAl,idLocalizacion)
        }
        function llenarLocalizacionOrigen(idLocali,id,idPrAl,idLocalizacion){
             RESTService.get('register_transfers/getLocaStock',id, function(response) {
                 if (!_.isUndefined(response.status) && response.status) {
                        idLocali.html('');
                        idLocali.append('<option value="" selected>Seleccionar</option>');
                        var cont=0;
                        _.each(response.LocalizacionAlmacen, function(itemdos) {
                            var stock=0;
                              _.each(response.data, function(item) {
                                if(idPrAl==item.idArticulo && itemdos.idLocalizacion==item.idLocalizacion){
                                     stock=Math.trunc(item.total);
                                  }
                              });
                              if (stock>0 || p_state.val()=="PROCESADO"){

                                 if(itemdos.idLocalizacion==idLocalizacion){
                                  idLocali.append('<option selected value="'+itemdos.idLocalizacion+'" >'+itemdos.descripcion+' / '+stock+'</option>'); 
                                  }else{
                                     idLocali.append('<option value="'+itemdos.idLocalizacion+'" >'+itemdos.descripcion+' / '+stock+'</option>');
                                  }
                                 cont=cont+1 
                              }
                        });
                       if(cont<1){
                                AlertFactory.textType({
                                        title: '',
                                        message: 'No existe stock de artículos en las localizaciones. Intente nuevamente.',
                                        type: 'info'
                                });
                        }
                    //   _.each(response.data, function(item) {
                    //     if(idPrAl==item.idArticulo || item.idArticulo==null ){
                    //         var stock=0;
                    //         if(item.idArticulo!=null){
                    //             stock=Math.trunc(item.total);
                    //         }
                    //         if(idLocalizacion==item.idLocalizacion){
                    //             idLocali.append('<option selected value="'+item.idLocalizacion+'" >'+item.descripcion+' / '+stock+'</option>');
                    //         }else{
                    //            idLocali.append('<option value="'+item.idLocalizacion+'" >'+item.descripcion+' / '+stock+'</option>'); 
                    //         }
                            
                    //     }
                    // }); 
                 }else {
                    AlertFactory.textType({
                        title: '',
                        message: 'No se pudo obtener las Localizaciones. Intente nuevamente.',
                        type: 'info'
                    });
                }

               });
        }
        function llenarLocalizacionDestino(idLocali,id,idPrAl,idLocalizacion){
             RESTService.get('register_transfers/getLocaStock',id, function(response) {
                 if (!_.isUndefined(response.status) && response.status) {
                        idLocali.html('');
                        idLocali.append('<option value="" selected>Seleccionar</option>');
                        var cont=0;
                        _.each(response.LocalizacionAlmacen, function(itemdos) {
                            var stock=0;
                              _.each(response.data, function(item) {
                                if(idPrAl==item.idArticulo && itemdos.idLocalizacion==item.idLocalizacion){
                                     stock=Math.trunc(item.total);
                                  }
                              });
                           
                              if(itemdos.idLocalizacion==idLocalizacion){
                                  idLocali.append('<option selected value="'+itemdos.idLocalizacion+'" >'+itemdos.descripcion+' / '+stock+'</option>'); 
                              }else{
                                 idLocali.append('<option value="'+itemdos.idLocalizacion+'" >'+itemdos.descripcion+' / '+stock+'</option>');
                              }
                            
                        });
                 }else {
                    AlertFactory.textType({
                        title: '',
                        message: 'No se pudo obtener las Localizaciones. Intente nuevamente.',
                        type: 'info'
                    });
                }

               });
        }
        $scope.guardarMovimientoDetalle = function(){

            var bval =true;
            if (bval && articulo_mov_det.html() === '' ) {
                AlertFactory.showWarning({
                    title: '',
                    message: 'Debe agregar mínimo 1 Artículo'
                });
                return false;
            }
            acodigos.forEach(function(val,index) {
                    var idAr=$('#Al_'+val);
                    var idLr=$('#'+val);
                    var canr=$('#canMs_'+val);
                    var cosr=$('#cosMs_'+val);
                    var idA2=$('#AlD_'+val);
                    var idL2=$('#loD_'+val);
                    bval = bval && idAr.required();
                    bval = bval && idLr.required();
                    bval = bval && idA2.required();
                    bval = bval && idL2.required();
                    bval = bval && canr.required();
                    bval = bval && cosr.required();    
                })
            var cosrIn='A';
            acodigos.forEach(function(val,index) {
                    var cosr=$('#cosMs_'+val).val();
                    if(cosr<1){
                        cosrIn='I';
                    }
                    
            })
            if(cosrIn=='I'){
                AlertFactory.showWarning({
                    title: '',
                    message: 'El costo de los Articulos no puede ser cero'
                });
                cosrIn='A';
                return false; 
            }
            var cantrIn='A';
            acodigos.forEach(function(val,index) {
                    var cantEn=$('#canMs_'+val).val();
                    if(cantEn<1){
                        cantrIn='I';
                    }
                    
            })
            if(cantrIn=='I'){
                AlertFactory.showWarning({
                    title: '',
                    message: 'La cantidad de los Articulos no puede ser cero'
                });
                cantrIn='A';
                return false; 
            }
            if(bval){
                 var idartEnv = [];
                    $.each($('.m_articulo_id'), function (idx, item) {
                        idartEnv[idx] = $(item).val();
                    });
                    
                idartEnv = idartEnv.join(',');
                var idalmaEnv = [];
                    $.each($('.m_articulo_idAlm '), function (idx, item) {
                        idalmaEnv[idx] = $(item).val();
                    });
                    
                idalmaEnv = idalmaEnv.join(',');
                var idalLocEnv = [];
                    $.each($('.m_articulo_idLoc'), function (idx, item) {
                        idalLocEnv[idx] = $(item).val();
                    });
                    
                idalLocEnv = idalLocEnv.join(',');

                var identificador_serie_bd = [];
                    $.each($('.identificador_serie_bd'), function (idx, item) {
                        identificador_serie_bd[idx] = $(item).val();
                    });
                    
                identificador_serie_bd = identificador_serie_bd.join(',');

                
                var idalmaDEnv = [];
                    $.each($('.m_articulo_idAlmD'), function (idx, item) {
                        idalmaDEnv[idx] = $(item).val();
                    });
                    
                idalmaDEnv = idalmaDEnv.join(',');
                var idalLocDEnv = [];
                    $.each($('.m_articulo_idLocD'), function (idx, item) {
                        idalLocDEnv[idx] = $(item).val();
                    });
                idalLocDEnv = idalLocDEnv.join(',');



                var idalcantEnv = [];
                    $.each($('.m_articulo_cantidad'), function (idx, item) {
                        idalcantEnv[idx] = $(item).val();
                    });
                    
                idalcantEnv = idalcantEnv.join(',');
                var idalcostEnv = [];
                    $.each($('.m_articulo_costo'), function (idx, item) {
                        idalcostEnv[idx] = $(item).val();
                    });
                    
                idalcostEnv = idalcostEnv.join(',');
                var idalcostotalEnv = [];
                    $.each($('.m_articulo_costoTotal'), function (idx, item) {
                        idalcostotalEnv[idx] = $(item).val();
                    });
                    
                idalcostotalEnv = idalcostotalEnv.join(',');
                


                var idloteEnvi = [];
                    $.each($('.m_codigo_lote'), function (idx, item) {
                        idloteEnvi[idx] = $(item).val();
                    });
                    
                idloteEnvi = idloteEnvi.join(',');

                var datloteEnvi = [];
                    $.each($('.m_dato_lote'), function (idx, item) {
                        datloteEnvi[idx] = $(item).val();
                    });
                    
                datloteEnvi = datloteEnvi.join(',');
                var idProductoSe = [];
                var serieSe=[];
                var idSerieSe=[];
                var cantSe=[];
                var ident_serie_bd_serie=[];
                var cont=0;
                aartMSE.map(function(index) {
                         ident_serie_bd_serie[cont]=index.identificador;
                         idProductoSe[cont] = index.idProducto;
                         serieSe[cont] = index.serie;
                         idSerieSe[cont]=index.idSerie;
                         cantSe[cont]=index.cantidad;
                         cont=cont+1;
                      })
                  idProductoSe = idProductoSe.join(',');
                  serieSe = serieSe.join(',');
                idSerieSe = idSerieSe.join(',');
                cantSe=cantSe.join(',');
                ident_serie_bd_serie=ident_serie_bd_serie.join(",");


                
                var serieNenv = [];
                var idProductoSeN = [];
                var chasiNs=[];
                var motorNs=[];
                var anioNFs=[];
                var anioNVs=[];
                var colorNs=[];
                var cont2=0;
                aartMSN.map(function(index) {
                        serieNenv[cont2] = index.serie;
                        idProductoSeN[cont2] = index.idProducto;
                        chasiNs[cont2] = index.chasis;
                        motorNs[cont2] = index.motor;
                        anioNFs[cont2] = index.anio_fabricacion;
                        anioNVs[cont2] = index.anio_modelo;
                        colorNs[cont2] = index.color;
                         cont2=cont2+1;
                      })
                serieNenv = serieNenv.join(',');
                idProductoSeN = idProductoSeN.join(',');
                chasiNs = chasiNs.join(',');
                motorNs = motorNs.join(',');
                anioNFs = anioNFs.join(',');
                anioNVs = anioNVs.join(',');
                colorNs = colorNs.join(',');
                var ident_det="";
                if(articulo_mov_det.html() !=''){
                    ident_det="A";
                };
                var params = {
                    'art_nada':aartMN,
                    'idArticulo':idartEnv,
                    'idAlmacen':idalmaEnv,
                    'idLocalizacion':idalLocEnv,
                    'idalmacenDestino':idalmaDEnv,
                    'idLocalizacionDestino':idalLocDEnv,
                    'cantidad':idalcantEnv,
                    'costo':idalcostEnv,
                    'costo_total':idalcostotalEnv,
                    'idLote':idloteEnvi,
                    'dataLote':datloteEnvi,
                    'idProductoSe':idProductoSe,
                    'serieSe':serieSe,
                    'idSerieSe':idSerieSe,
                    'cantSe':cantSe,
                    'serieNenv':serieNenv,
                    'idProductoSeN':idProductoSeN,
                    'chasiNs':chasiNs,
                    'motorNs':motorNs,
                    'anioNFs':anioNFs,
                    'anioNVs':anioNVs,
                    'colorNs':colorNs,
                    'ident_detalle':ident_det,
                    'identificador_serie_bd':identificador_serie_bd,
                    'ident_serie_bd_serie':ident_serie_bd_serie,
                };
                 var id_Movimiento = (idMovimiento.val() === '') ? 0 : idMovimiento.val();
                RESTService.updated('register_transfers/saveMovimientArticulo',id_Movimiento, params, function(response) {
                    if (!_.isUndefined(response.status) && response.status) {
                        console.log(response.data);
                        AlertFactory.textType({
                            title: '',
                            message: 'El registro se guardó correctamente',
                            type: 'success'
                        });
                        procesarTransfBoton.prop('disabled',false);
                        procesarTransfBoton.trigger('change');
                        LoadRecordsButtonRegister_Trasnfer.click();
                    } else {
                        var msg_ = (_.isUndefined(response.message)) ?
                            'No se pudo guardar La transferencia. Intente nuevamente.' : response.message;
                        AlertFactory.textType({
                            title: '',
                            message: msg_,
                            type: 'info'
                        });
                    }
                });
                
            }    
        }

        function addArticuloTable(idProducto,desProducto,cantProducto,ver,codigo,tipo,codl,datl,idAlmacen,idLocalizacion,costo,costo_total,idAlmacenDestino,idLocalizacionDestino){
            acodigos.push(codigo);
            var costonew=1;
            if(costo !=0 || costo!="" ||  costo!=null){
                costonew=Number(costo);
            };
          
            var impor=Number(cantProducto) * Number(costo);
            var tr = $('<tr  id="tr_idArticulo' + codigo + '"></tr>');
            var td1 = $('<td>' + desProducto + '</td>');
            var td2 = $('<td></td>');
            var tdy = $('<td></td>');
            var tdA = $('<td></td>');
            var tdL= $('<td></td>');
            var td3;
            var inp3;
            if (ver=='A'){
                var td3 = $('<td class="text-center"></td>');
                var inp3 = $('<input type="text" id="canMs_'+codigo+'" onkeypress="return soloNumeros(event)" class="m_articulo_cantidad form-control input-sm" value="' + cantProducto + '" />');
            }else{
                var td3 = $('<td><p>' + cantProducto + '</p></td>');
                var inp3 = $('<input type="hidden" id="canMs_'+codigo+'" class="m_articulo_cantidad" value="' + cantProducto + '" />');
            }
           
            var td4 =  $('<td><p>'+ costonew + '</p></td>');
            var inp4 = $('<input type="hidden" id="cosMs_'+codigo+'" min="1" class="m_articulo_costo form-control input-sm" value="' + costonew + '" />');
           
          
            var td5 = $('<td><p>'+impor.toFixed(2) +'</p></td>');
            var inp = $('<input type="hidden" class="m_articulo_id" value="' + idProducto + '" />');
            var inpl=$('<select id="'+codigo+'" data-idArl="'+idProducto+'" class="m_articulo_idLoc form-control input-sm"></select>');
            var inpLD=$('<select id="loD_'+codigo+'" data-idArlD="'+idProducto+'" class="m_articulo_idLocD form-control input-sm"></select>');
            var inp5 = $('<input type="hidden" class="m_articulo_costoTotal" value="'+impor.toFixed(2)+'" />');
            var inpy=$('<select  data-arts="'+idProducto+'" id="Al_'+codigo+'" data-idAraAl="'+codigo+'" class="m_articulo_idAlm form-control input-sm"></select>');
            var inpAD=$('<select  data-artsD="'+idProducto+'" id="AlD_'+codigo+'" data-idAraAlD="'+codigo+'" class="m_articulo_idAlmD form-control input-sm"></select>');
            var op=$('<option value="" selected>Seleccione</option>');
            var fclt=$('<input type="hidden" class="m_codigo_lote" value="' +codl+ '" />');
            var fdlt=$('<input type="hidden" class="m_dato_lote" value="' +datl+ '" />');
            var identificador_serie_bd=$('<input type="hidden" class="identificador_serie_bd" value="' +codigo+ '" />');
            td1.append(inp).append(fclt).append(fdlt).append(identificador_serie_bd);
            td2.append(inpy);
            tdy.append(inpl);
            td3.append(inp3);
            td4.append(inp4);
            td5.append(inp5);
            tdA.append(inpAD);
            tdL.append(inpLD);
            var td6 = $('<td class="text-center"></td>');
            var btn1 = $('<button class="btn btn-info btn-xs verUpdate" title="ver" data-cantiShow="'+cantProducto+'" data-descrip="'+desProducto+'" data-idProducto="'+idProducto+'" data-tShow="'+tipo+'" data-idv="' + codigo + '" type="button"><span class="fa fa-eye"></span></button>');
            var td8 = $('<td class="text-center"></td>');
            var btn3 = $('<button class="btn btn-danger btn-xs delMovPro" data-tipo="'+tipo+'" title="Eliminar" data-id="' + codigo + '" type="button"><span class="fa fa-trash"></span></button>');
            td6.append(btn1);
            td8.append(btn3);
            tr.append(td1).append(td2).append(tdy).append(tdA).append(tdL).append(td3).append(td4).append(td5).append(td6).append(td8);
            articulo_mov_det.append(tr);
            addAlmaSelecO(codigo);
            addAlmaSelecD(codigo);
            addlocSeleO(codigo);
            addlocSeleD(codigo);
           
            
            $('.verUpdate').click(function(e){
                var tipShow = $(this).attr('data-tShow');
                var codeShow = $(this).attr('data-idv');
                var idProduc = $(this).attr('data-idProducto');
                var descrip = $(this).attr('data-descrip');
                var cantshow = $(this).attr('data-cantiShow');
                if(tipShow=="SE"){
                    cantProductoMss.val($("#tr_idArticulo"+codeShow).find("td:eq(5)").children("input").val());
                    desProductoMss.val(descrip);
                    idProductoMss.val(idProduc);
                    btnAgreSer.prop('disabled',true);
                    btnAgreSer.trigger('change');
                    btn_serC.prop('disabled',false);
                    btn_serC.trigger('change');
                    identSerAr.val(codeShow);
                    if(identiSelec=="A"){
                        table_container_cc4.jtable('destroy');
                    }
                    cargarTableSerie(idProduc,aartMSE);
                    modalSerieR.modal('show');

                }else if(tipShow=="SN"){
                    cantProductoMss.val($("#tr_idArticulo"+codeShow).find("td:eq(3)").children("input").val());
                    desProductoMss.val(descrip);
                    idProductoMss.val(idProduc);
                    btnSeleSerie.prop('disabled',true);
                    btnSeleSerie.trigger('change');
                    btn_serC.prop('disabled',false);
                    btn_serC.trigger('change');
                    create_caTableSer();
                    identSerAr.val(codeShow);
                    addSerieTable(idProductoMss.val(),desProductoMss.val(),cantProductoMss.val(),colorMS,chasisMS,motorMS,anio_modeloMS,anio_fabricacionMS)
                    modalSerieR.modal('show');
                }else if(tipShow=="LE"){
                    modalLoteR.modal('show');
                    idProductoMll.val(idProduc);
                    desProductoMll.val(descrip);
                    cantProductoMll.val(cantshow);
                    idLoteMll2.val(idProduc);
                    codigoLoteMll.prop("readonly",true);
                    codigoLoteMll.trigger('change');
                    aartMLE.map(function(index) {
                        if(index.identificador==codeShow){
                             codigoLoteMll.val(index.codig_lote);
                             fechaVl.val(index.fecha_vencimiento);
                             cantProductoMll.val($("#tr_idArticulo"+codeShow).find("td:eq(5)").children("input").val());
                        }
                       
                    })

                }else if(tipShow=="LN"){
                        idProductoML.val(idProduc);
                        desProductoML.val(descrip);
                        idLoteML2.val(codeShow);
                        aartML.map(function(index) {
                        if(index.identificador==codeShow){
                             lotProductoML.val(index.lote);
                             fIngrePrML.val(index.fecha_ingreso);
                             cantProductoML.val($("#tr_idArticulo"+codeShow).find("td:eq(3)").children("input").val());
                             fVenPrML.val(index.fecha_vencimiento);
                        }
                       })
                        modalLote.modal("show");
                }

            });

             $('.delMovPro').click(function (e) {
                var code = $(this).attr('data-id');
                var tip = $(this).attr('data-tipo');
                AlertFactory.confirm({
                    title: '',
                    message: '¿Está seguro que desea quitar este Artículo?',
                    confirm: 'Si',
                    cancel: 'No'
                }, function () {
                    if(tip=="NA"){
                        var arrTna = aartMN.filter(function(car) {
                         return car.identificador !==code; 
                        })
                        aartMN=arrTna;
                    }else if(tip=="K"){
                        var arrTK = aartMK.filter(function(car) {
                         return car.identificador !==code; 
                        })
                        aartMK=arrTK;
                    }else if(tip=="LE"){
                        var arrTLE = aartMLE.filter(function(car) {
                         return car.identificador !==code; 
                        })
                        aartMLE=arrTLE;
                    }else if(tip=="LN"){
                        var arrTLN = aartML.filter(function(car) {
                         return car.identificador !==code; 
                        })
                        aartML=arrTLN;
                    }else if(tip=="SN"){
                        var arrTSN = aartMSN.filter(function(car) {
                         return car.identificador !==code; 
                        })
                        aartMSN=arrTSN;
                    }else if(tip=="SE"){
                        var arrTSE = aartMSE.filter(function(car) {
                         return car.identificador !==code; 
                        })
                        aartMSE=arrTSE;
                    }
                    $('#tr_idArticulo' + code).remove();
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
            // $('.m_articulo_idLoc').change(function (e) {
            //     var idl = $(this).val();
            //     var idAl=$(this).attr('data-idArl');
            //     var stock=getStock(idl,idAl);
            //     e.preventDefault();
            // }); 
             $('.m_articulo_idAlm').change(function (e) {
                var idl = $(this).val();
                var ident=$(this).attr('data-idAraAl');
                var idPrAl=$(this).attr('data-arts');
                getLocaStock(idl,ident,idPrAl,idLocalizacion);
                e.preventDefault();
            }); 
             $('.m_articulo_idAlmD').change(function (e) {
                var idl = $(this).val();
                var ident=$(this).attr('data-idAraAlD');
                var idPrAl=$(this).attr('data-artsD');
                getLocaStock2(idl,ident,idPrAl,idLocalizacionDestino);
                e.preventDefault();
            }); 
            $('.m_articulo_cantidad').keyup(function (e) {
                var cantidap = $(this).val();
                var costo=$(this).closest("tr").find("td:eq(6)").children("input").val();
                var importe=Number(cantidap) * Number(costo);
                $(this).closest("tr").find("td:eq(7)").children("p").text(importe.toFixed(2));
                $(this).closest("tr").find("td:eq(7)").children("input").val(importe.toFixed(2));

            })
            $('.m_articulo_costo').keyup(function (e) {
                  var costop = $(this).val();
                  var cantidad=$(this).closest("tr").find("td:eq(5)").children("input").val();
                  var importe=Number(cantidad) * Number(costop);
                  $(this).closest("tr").find("td:eq(7)").children("p").text(importe.toFixed(2));
                  $(this).closest("tr").find("td:eq(7)").children("input").val(importe.toFixed(2));
            })
            $('#cosMs_'+codigo).change(function (e) {
                  var costop = $(this).val();
                  var cantidad=$(this).closest("tr").find("td:eq(5)").children("input").val();
                  var importe=Number(cantidad) * Number(costop);
                  $(this).closest("tr").find("td:eq(7)").children("p").text(importe.toFixed(2));
                  $(this).closest("tr").find("td:eq(7)").children("input").val(importe.toFixed(2));
            }) 
            if(idAlmacen!=""){
             $("#Al_"+codigo).val(idAlmacen).trigger('change');
             $("#AlD_"+codigo).val(idAlmacenDestino).trigger('change');
             $("#"+codigo).val(idLocalizacion).trigger('change');
             $("#loD_"+codigo).val(idLocalizacionDestino).trigger('change'); 
             $("#cosMs_"+codigo).val(Number(costo));
             var cos=Number(costo_total);
             $("#tr_idArticulo"+codigo).find("td:eq(7)").children("p").text(cos);
             $("#tr_idArticulo"+codigo).find("td:eq(7)").children("input").val(cos);
            };

        }
        $scope.addtableSerie = function(){
            if(identiSelec=="A"){
                table_container_cc4.jtable('destroy');
            }
            identiSelec="I";
            var bval =true;
            bval = bval && cantProductoMss.required();
            if (bval) {
                create_caTableSer();
                addSerieTable(idProductoMss.val(),desProductoMss.val(),cantProductoMss.val(),colorMS,chasisMS,motorMS,anio_modeloMS,anio_fabricacionMS)
            }
        }
        function create_caTableSer(){
               table_serie_cabecera.html("");
                btn_serC.prop('disabled',false);
                btn_serC.trigger('change');
                var html="<tr>";
                html+="<th width='250px'>Artículo</th>";
                html+="<th width='250px' height='20px'>Nr° Serie</th>";
                html+=" <th width='250px' height='20px'>Chasis</th>";
                html+="<th width='250px' height='20px'>Motor</th>";
                html+="<th width='100px' height='20px'>Color</th>";
                html+="<th width='150px' height='20px'>Año fabricación</th>";
                html+="<th width='100px' height='20px'>Año Modelo</th>";
                html+="</tr>";
                table_serie_cabecera.append(html);
        }
        $scope.addSerieCompleTab = function(){
            var bval =true;
            var cant=cantProductoMss.val();
            bval = bval && cantProductoMss.required();
            if (bval) {
                    var conta1=0;
                    $(".valcheck:checked").each(function(){
                        conta1=conta1+1
                    });
                    
                    if(cant==conta1){
                       if(identSerAr.val()!=""){
                            var updteSe = aartMSE.filter(function(car) {
                             return car.identificador !==identSerAr.val(); 
                            })
                            aartMSE=updteSe;
                            $(".check:checkbox:checked").each(function() {
                                var grubSE={
                                       'identificador': identSerAr.val(),
                                       'idProducto':idProductoMss.val(),
                                       'serie': $(this).attr('data-code'),
                                       'idSerie': $(this).attr('data_idSerie'),
                                       'cantidad':cantProductoMss.val(),
                                    }
                                aartMSE.push(grubSE);
                                });
                                $("#tr_idArticulo"+identSerAr.val()).find("td:eq(5)").children("p").text(cantProductoMss.val());
                                $("#tr_idArticulo"+identSerAr.val()).find("td:eq(5)").children("input").val(cantProductoMss.val());
                                var costoActual=$("#tr_idArticulo"+identSerAr.val()).find("td:eq(6)").children("input").val();
                                var importe=Number(cantProductoMss.val()) * Number(costoActual);
                                $("#tr_idArticulo"+identSerAr.val()).find("td:eq(7)").children("p").text(importe.toFixed(2));
                                $("#tr_idArticulo"+identSerAr.val()).find("td:eq(7)").children("input").val(importe.toFixed(2));
                                modalSerieR.modal("hide");
                                modalMovimietoArticulo.modal("hide");
                        }else{
                                var vers ='N';
                                var codigoLSr=Math.random().toString(36).substr(2, 18);
                                var tipoArtLSr='SE';
                                $(".check:checkbox:checked").each(function() {
                                var grubSE={
                                       'identificador': codigoLSr,
                                       'idProducto':idProductoMss.val(),
                                       'serie': $(this).attr('data-code'),
                                       'idSerie': $(this).attr('data_idSerie'),
                                       'cantidad':cantProductoMss.val(),
                                    }
                                aartMSE.push(grubSE);
                                });
                                var codl="";
                                var datl="";
                                var idAlmacen="";
                                var idLocalizacion="";
                                var costo=costoAS.val();
                                var costo_total="";
                                var idAlmacenDesti="";
                                var idlocalizacion="";
                                addArticuloTable(idProductoMss.val(),desProductoMss.val(),cantProductoMss.val(),vers,codigoLSr,tipoArtLSr,codl,datl,idAlmacen,idLocalizacion,costo,costo_total,idAlmacenDesti,idlocalizacion);
                                modalSerieR.modal("hide");
                                modalMovimietoArticulo.modal("hide");
                      
                            }
               }else{
                AlertFactory.textType({
                        title: '',
                        message: 'Las series seleccionadas debe ser igual a la cantidad',
                        type: 'info'
                 });
               }
            }
            
           
        }
        $scope.addLoteExi = function(){
            var bval = true;
            bval = bval && cantProductoMll.required();
            bval = bval && codigoLoteMll.required();
            if (bval) {
                var ver ='A';
                var codigoLr=Math.random().toString(36).substr(2, 18);
                var tipoArtLr='LE';
                var grubLE={
                       'identificador': codigoLr,
                       'idProducto':idProductoMll.val(),
                       'idLote':idLoteML.val(),
                       'fecha_vencimiento':fechaVl.val(),
                       'codig_lote': codigoLoteMll.val(),
                }
                aartMLE.push(grubLE);
                var codl=idLoteMll.val();
                var datl="";
                var datl="";
                var idAlmacen="";
                var idLocalizacion="";
                var costo=costoAL.val();
                var costo_total="";
                 var idAlmacenDesti="";
                                var idlocalizacion="";
                addArticuloTable(idProductoMll.val(),desProductoMll.val(),cantProductoMll.val(),ver,codigoLr,tipoArtLr,codl,datl,idAlmacen,idLocalizacion,costo,costo_total,idAlmacenDesti,idlocalizacion);
                modalLoteR.modal('hide');
                modalMovimietoArticulo.modal('hide');
            }

        }
        $scope.EliminarMovimiento = function(){
            var id=idMovimientoDelete.val();
            RESTService.get('register_transfers/delete', id, function(response) {
                 if (!_.isUndefined(response.status) && response.status) {
                    var dta=response.data;
                    if(dta[0]['Mensaje']!=""){
                        AlertFactory.textType({
                                title: '',
                                message: dta[0]['Mensaje'],
                                type: 'info'
                        }); 
                        modalDeleteMovimiento.modal("hide"); 
                    }else{
                         AlertFactory.textType({
                            title: '',
                            message: 'El registro se eliminó correctamente',
                            type: 'success'
                        });
                        modalDeleteMovimiento.modal("hide"); 
                        LoadRecordsButtonRegister_Trasnfer.click();
                    }
                  
                    
                    }
               });

               
          

        }
        $scope.ProcesarTransferencia = function(){
            var id=idTransferenciaProcesar.val();
            RESTService.get('register_transfers/procesarTransferencia', id, function(response) {
                 if (!_.isUndefined(response.status) && response.status) {
                    var dta=response.data;
                    if(dta[0]['Mensaje']=="OK"){
                         AlertFactory.textType({
                            title: '',
                            message: 'El registro se procesó con exitó',
                            type: 'success'
                        });
                       
                        procesarTransfBoton.prop('disabled',true);
                        procesarTransfBoton.trigger('change');
                        btnguardarMovimiento.prop('disabled',true);
                        btnguardarMovimiento.trigger('change');
                        btn_movimiento_detalle.prop('disabled',true);
                        btn_movimiento_detalle.trigger('change');
                     
                        modalProcesarTransferencia.modal("hide"); 
                        LoadRecordsButtonRegister_Trasnfer.click(); 

                    }else{
                         AlertFactory.textType({
                                title: '',
                                message: dta[0]['Mensaje'],
                                type: 'info'
                        }); 
                        modalProcesarTransferencia.modal("hide"); 
                       
                    }
                  
                    }
               });

               
          

        }
        function addSeleccSerie(){
            table_serie_cabecera.html("");
            articulo_serie_det.html("");
            var bval = true;
            // bval = bval && cantProductoMss.required();
            if (bval) {
                var id=idProductoMss.val()+'*'+1;
                RESTService.get('register_transfers/validateCantSerie', id, function(response) {
                 if (!_.isUndefined(response.status) && response.status) {
                    if(response.data=='N'){
                       AlertFactory.textType({
                        title: '',
                        message: 'No hay series de este Artículo ',
                        type: 'info'
                        }); 
                    }
                    else if(response.data=='S'){
                        AlertFactory.textType({
                        title: '',
                        message: 'Existen solo '+ response.cantidad +' series de este Artículo . Ingrese Nueva cantidad.',
                        type: 'info'
                        }); 
                    }else{
                        identiSelec="A";
                        cargarTableSerie(idProductoMss.val(),aartMSE);
                        btn_serC.prop('disabled',false);
                        btn_serC.trigger('change');
        
                    }
                    }else {
                        AlertFactory.textType({
                        title: '',
                        message: 'Nose pudo obtener las Series . Intente nuevamente.',
                        type: 'info'
                    });
                    }
               });

               
            }
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
                 var idAlmacenDesti="";
                                var idlocalizacion="";
                addArticuloTable(idProductoMN.val(),desProductoMN.val(),cantProductoMN.val(),ver,codigo,tipoArt,codl,datl,idAlmacen,idLocalizacion,costo,costo_total,idAlmacenDesti,idlocalizacion);
                modalNada.modal('hide');
                modalMovimietoArticulo.modal('hide');
            }

         }
        
        $scope.addArtLote = function(){
            var bval = true;
            bval = bval && cantProductoML.required();
            bval = bval && lotProductoML.required();
            bval = bval && fIngrePrML.required();
            bval = bval && fVenPrML.required();
            if (bval) {
                if(idLoteML2.val()==""){
                     var validaLote= aartML.map(function(index) {
                        if(index.lote==lotProductoML.val()){
                             return index.lote;
                        }
                       
                    })
                    if(validaLote!=""){
                     AlertFactory.textType({
                                    title: '',
                                    message: 'El lote ' +validaLote+ ' ya existe en este movimiento',
                                    type: 'info'
                        });
                     return false;
                    };
                    var codigoLtr=Math.random().toString(36).substr(2, 18);
                    var grubLN={
                           'identificador': codigoLtr,
                           'idProducto':idProductoML.val(),
                           'cantidad':cantProductoML.val(),
                           'lote':lotProductoML.val(),
                           'fecha_ingreso':fIngrePrML.val(),
                           'fecha_vencimiento':fVenPrML.val(),
                    }
                    aartML.push(grubLN);
                    var ver='A';
                    var tipolr='LN';
                    var codl="";
                    var idAlmacen="";
                var idLocalizacion="";
                var costo="";
                var costo_total="";
                 var idAlmacenDesti="";
                                var idlocalizacion="";
                    var datl=idProductoML.val()+'*'+cantProductoML.val()+'*'+lotProductoML.val()+'*'+fIngrePrML.val()+'*'+fVenPrML.val();
                    addArticuloTable(idProductoML.val(),desProductoML.val(),cantProductoML.val(),ver,codigoLtr,tipolr,codl,datl,idAlmacen,idLocalizacion,costo,costo_total,idAlmacenDesti,idlocalizacion);
                    modalLote.modal('hide');
                    modalLoteR.modal('hide');
                    modalMovimietoArticulo.modal('hide');
                }else{
                     var updteSLN = aartML.filter(function(car) {
                             return car.identificador !==idLoteML2.val(); 
                            })
                    aartML=updteSLN;
                    var grubLN={
                           'identificador': idLoteML2.val(),
                           'idProducto':idProductoML.val(),
                           'cantidad':cantProductoML.val(),
                           'lote':lotProductoML.val(),
                           'fecha_ingreso':fIngrePrML.val(),
                           'fecha_vencimiento':fVenPrML.val(),
                    }
                    aartML.push(grubLN);
                    var datl=idProductoML.val()+'*'+cantProductoML.val()+'*'+lotProductoML.val()+'*'+fIngrePrML.val()+'*'+fVenPrML.val();
                    $("#tr_idArticulo"+idLoteML2.val()).find("td:eq(0)").children(".m_dato_lote").val(datl);
                    $("#tr_idArticulo"+idLoteML2.val()).find("td:eq(3)").children(".m_articulo_cantidad").val(cantProductoML.val());
                    modalLote.modal('hide');
                    modalLoteR.modal('hide');
                    modalMovimietoArticulo.modal('hide');

                }
                
            }
               
        }
        
        function addArtkit (){
            var bval = true;
            bval = bval && cantProductoMK.required();
            if (bval) {
                var ver='A';
                var codigo=Math.random().toString(36).substr(2, 18);
                var tipo="K";
                var grubkit={
                       'identificador': codigo,
                       'idProducto':idProductoMK.val(),
                }
                aartMK.push(grubkit);
                var codl="";
                var datl="";
                var idAlmacen="";
                var idLocalizacion="";
                var costo=costoMK.val();
                var costo_total="";
                 var idAlmacenDesti="";
                                var idlocalizacion="";
                addArticuloTable(idProductoMK.val(),desProductoMK.val(),cantProductoMK.val(),ver,codigo,tipo,codl,datl,idAlmacen,idLocalizacion,costo,costo_total,idAlmacenDesti,idlocalizacion);
                modalKit.modal('hide');
                modalMovimietoArticulo.modal('hide');
            }
        }
        function addSerieTable(idProductoMS,desProductoMS,cantProductoMS,colorMS,chasisMS,motorMS,anio_modeloMS,anio_fabricacionMS){
            articulo_serie_det.html('');
            if(identSerAr.val()!=""){
                cont_table=0;   
              
                var contfila=0;
                aartMSN.map(function(index) {
                    if(index.identificador==identSerAr.val()){
                        contfila=contfila+1;
                    }
                });
                
                if(cantProductoMss.val()!=contfila){
                        if(cantProductoMss.val()!=0){
                            var updteSN = aartMSN.filter(function(car) {
                             return car.identificador !==identSerAr.val(); 
                            })
                        aartMSN=updteSN;
                        crearTableSerie2(cantProductoMS,idProductoMS,desProductoMS);
                        }else{
                           crearTableSerie();
                        }
                }else if(cantProductoMS==contfila){
                    crearTableSerie();
                }
            }else{
                crearTableSerie2(cantProductoMS,idProductoMS,desProductoMS);
            }
        }
        function crearTableSerie2(cantProductoMS,idProductoMS,desProductoMS){
                cont_table=0;
                for (var i = 0; i < cantProductoMS; i++) {
                var html2="<tr id='tr_idArticulo_"+ idProductoMS +"' ></tr>";
                html2+="<td>"+desProductoMS +"</td>";
                html2+="<td><input type='text' id='s_serie"+i+"' class='s_serie form-control input-sm'/></td>";
                html2+="<td><input type='text' id='s_chasis"+i+"' class='s_chasis form-control input-sm'/></td>";
                html2+="<td><input type='text' id='s_motor"+i+"' class='s_motor form-control input-sm'/></td>";
                html2+="<td><input type='text' id='s_color"+i+"' class='s_color form-control input-sm'/></td>";
                html2+="<td><input type='text' id='s_aniof"+i+"' class='s_aniof form-control input-sm' onkeypress='return soloNumeros(event)' maxlength='4' /></td>";
                html2+="<td><input type='text' id='s_aniom"+i+"' class='s_aniom form-control input-sm' onkeypress='return soloNumeros(event)' maxlength='4'/></td>";
                html2+="</tr>";
                articulo_serie_det.append(html2);
                cont_table= cont_table+1;
             }

        }
        function crearTableSerie(){
              var contuni=0;
             aartMSN.map(function(index) {
                            if(index.identificador==identSerAr.val()){
                                var html2="<tr id='tr_idArticulo_"+ idProductoMS +"' ></tr>";
                                html2+="<td>"+desProductoMS +"</td>";
                                html2+="<td><input type='text' id='s_serie"+contuni+"' class='s_serie form-control input-sm' value='"+index.serie+"'/></td>";
                                html2+="<td><input type='text' id='s_chasis"+contuni+"' class='s_chasis form-control input-sm' value='"+index.chasis+"'/></td>";
                                html2+="<td><input type='text' id='s_motor"+contuni+"' class='s_motor form-control input-sm' value='"+index.motor+"'/></td>"; 
                                html2+="<td><input type='text' id='s_color"+contuni+"' class='s_color form-control input-sm' value='"+index.color+"'/></td>";
                                html2+="<td><input type='text' id='s_aniof"+contuni+"' class='s_aniof form-control input-sm' value='"+index.anio_fabricacion+"' onkeypress='return soloNumeros(event)' maxlength='4' /></td>";
                                html2+="<td><input type='text' id='s_aniom"+contuni+"' class='s_aniom form-control input-sm' value='"+index.anio_modelo+"' onkeypress='return soloNumeros(event)' maxlength='4'/></td>";
                                html2+="</tr>";
                                articulo_serie_det.append(html2);
                                cont_table= cont_table+1;
                                contuni=contuni+1
                            }
            });
        }
        function saveMovimientoCab(){
            var bval = true;
             bval = bval && idTipoOperacion.required();
            bval = bval && fecha_registro.required();
            if (bval) {
                var str=idTipoOperacion.val();
                var complet=str.split("*");
                var idTO=complet[0];
                var nat=complet[1];
                var params = {
                    'tipoTransferencia':nat,
                    'idTransferencia':idMovimiento.val(),
                    'idTipoOperacion':idTO,
                    'estado':0,
                    'fecha_registro': fecha_registro.val(),
                    'observaciones': observaciones.val(),
                };
                var movimiento_id = (idMovimiento.val() === '') ? 0 : idMovimiento.val();

                RESTService.updated('register_transfers/saveMovimiento', movimiento_id, params, function(response) {
                    if (!_.isUndefined(response.status) && response.status) {
                        titlemodalMovimieto.html('Nueva Transferencia '+'['+ response.code+ ']');
                        AlertFactory.textType({
                            title: '',
                            message: 'El registro se guardó correctamente',
                            type: 'success'
                        });
                        idMovimiento.val(response.code);
                        if(response.estado==0){
                            p_state.val("REGISTRADO");
                        }else if(response.estado==1){
                             p_state.val("PROCESADO");
                        }

                        idTipoOperacion.prop('disabled',true);
                        idTipoOperacion.trigger('change');
                        btn_movimiento_detalle.prop('disabled',false);
                        btn_movimiento_detalle.trigger('change');
                        if(p_state.val()=="PROCESADO"){
                            procesarTransfBoton.prop('disabled',true);
                            procesarTransfBoton.trigger('change');
                            btnguardarMovimiento.prop('disabled',true);
                            btnguardarMovimiento.trigger('change');
                            btn_movimiento_detalle.prop('disabled',true);
                            btn_movimiento_detalle.trigger('change');
                        }
                        LoadRecordsButtonRegister_Trasnfer.click();
                    } else {
                        AlertFactory.textType({
                            title: '',
                            message: 'Hubo un error al guardar la Transferencia. Intente nuevamente.',
                            type: 'error'
                        });
                    }
                });
          }

        };
        function newMovimiento()
        {
            titlemodalMovimieto.html('Nueva Transferencia');
            modalMovimieto.modal('show');
        }
         $scope.addArticulo = function()
        {   
            var bval = true;
            bval = bval && idTipoOperacion.required();
            bval = bval && fecha_registro.required();
            if (bval) {
                if(idMovimiento.val()==""){
                     saveMovimientoCab();
                };
                titlemodalMovimietoArticulo.html('Nuevo Articulo');
                if(idenifcador_table_art.val()!='I'){
                     table_container_cc2.jtable('destroy');
                  }
                cargartableMovAr();
                idenifcador_table_art.val("A");  
                modalMovimietoArticulo.modal('show');
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
            RESTService.all('register_transfers/data_form', '', function(response) {
                if (!_.isUndefined(response.status) && response.status) {
                    idTipoOperacion.append('<option value="" selected>Seleccionar</option>');
                     _.each(response.operaciones, function(item) {
                        idTipoOperacion.append('<option value="'+item.IdTipoOperacion+'*'+item.idNaturaleza+'">'+item.descripcion+'</option>');
                    });
                    AlmacenesSele=response.almacen_usuario;
                }
            }, function() {
                getDataFormMovement();
            });
        }
        getDataFormMovement();


        var search = getFormSearch('frm-search-Register_Trasnfer', 'search_b', 'LoadRecordsButtonRegister_Trasnfer');

        var table_container_Register_Trasnfer = $("#table_container_Register_Trasnfer");

        table_container_Register_Trasnfer.jtable({
            title: "Lista de Transferencias",
            paging: true,
            sorting: true,
            actions: { 
                listAction: base_url + '/register_transfers/list',
            },
            toolbar: {
                items: [{
                    cssClass: 'buscador',
                    text: search
                },{
                    cssClass: 'btn-primary',
                    text: '<i class="fa fa-file-excel-o"></i> Exportar a Excel',
                    click: function () {
                        $scope.openDoc('register_transfers/excel', {});
                    }
                },{
                    cssClass: 'btn-danger-admin',
                    text: '<i class="fa fa-plus"></i> Nueva Transferencia',
                    click: function () {
                        newMovimiento();
                    }
                }]
            },
            fields: {
                idTransferencia: {
                    title: '#',
                    key: true,
                    create: false,
                },
                tipoTransferencia: {
                    title: 'Tipo Transferencia',
                    values: { 'N': 'Sin recepción', 'R': 'Con recepción' },
                    type: 'checkbox',
                },
                estado: {
                    title: 'Estado',
                    values: { '0': 'Registrado', '1': 'Procesado' },
                    type: 'checkbox',
                    
                   
                },edit: {
                    width: '1%',
                    sorting: false,
                    edit: false,
                    create: false,
                    listClass: 'text-center',
                    display: function (data) {
                        return '<a href="javascript:void(0)" class="edit-serie" data-id="'+data.record.idTransferencia
                            +'" title="Editar"><i class="fa fa-edit fa-1-5x"></i></a>';
                    }

                },Eliminar: {
                    width: '1%',
                    sorting: false,
                    edit: false,
                    create: false,
                    listClass: 'text-center',
                    display: function (data) {
                        return '<a data-target="#"  data-ide="'+data.record.idTransferencia+'"   title="Eliminar" class="jtable-command-button eliminar-movimiento"><i class="fa fa-trash fa-1-5x fa-red"><span>Eliminar</span></i></a>';
                    }
                    
                }

            },
            recordsLoaded: function(event, data) {
                $('.edit-serie').click(function(e){
                    var id = $(this).attr('data-id');
                    findRegister_Trasnfer(id);
                    e.preventDefault();
                });
                  $('.eliminar-movimiento').click(function(e){
                    var ide = $(this).attr('data-ide');
                    idMovimientoDelete.val(ide);
                    modalDeleteMovimiento.modal("show");
                    e.preventDefault();
                });
           }
           
        });
      
        generateSearchForm('frm-search-Register_Trasnfer', 'LoadRecordsButtonRegister_Trasnfer', function(){
            table_container_Register_Trasnfer.jtable('load', {
                search: $('#search_b').val()
            });
        }, true);
         $('#ProcesarTransferenciaBoton').click(function(e){
                    if(articulo_mov_det.html()!=""){
                        var id=idMovimiento.val();
                        RESTService.get('register_transfers/validaDetalle', id, function(response) {
                         if (!_.isUndefined(response.status) && response.status) {
                                var ide = idMovimiento.val();
                                idTransferenciaProcesar.val(ide);
                                modalProcesarTransferencia.modal("show");
                                e.preventDefault();
                                
                         }else {
                            var msg_ = (_.isUndefined(response.message)) ?
                                    'No se pudo procesar la transferencia. Intente nuevamente.' : response.message;
                                AlertFactory.textType({
                                    title: '',
                                    message: msg_,
                                    type: 'info'
                                });
                        }

                       });
                           


                    }else{
                         AlertFactory.textType({
                        title: '',
                        message: 'Debe registrar Articulos en esta transferencia. Intente nuevamente.',
                        type: 'info'
                        });
                    }
                  
        });
        function cargartableMovAr(){
        var search_cc2 = getFormSearch('frm-search-cc2', 'search_cc2', 'LoadRecordsButtonCC2');
        table_container_cc2 = $("#table_container_Register_Articulo");
        table_container_cc2.jtable({
            title: "Lista de Articulos",
            paging: true,
            sorting: true,
             cache: false,
            actions: {
                listAction: base_url + '/register_transfers/getArticulosSelectTrans'
            },
            toolbar: {
                items: [{
                    cssClass: 'buscador',
                    text: search_cc2
                }]
            },
            fields: {
                id: {
                    key: true,
                    create: false,
                    edit: false,
                    list: false
                },
                type_id: {
                    create: false,
                    edit: false,
                    list: false
                },
                serie: {
                    create: false,
                    edit: false,
                    list: false
                },
                lote: {
                    create: false,
                    edit: false,
                    list: false
                },
                code_article: {
                    title: 'Código'

                },
                description: {
                    title: 'Articulos'

                },
                costo: {
                    title: 'costo'

                },
                select: {
                    width: '1%',
                    sorting: false,
                    edit: false,
                    create: false,
                    listClass: 'text-center',
                    display: function (data) {
                        return '<a href="javascript:void(0)" title="Seleccionar" class="select_cc" data-costo="'+data.record.costo+'" data-name="'+
                            data.record.description+'" data-type="'+data.record.type_id+'"  data-serie="'+data.record.serie+'" data-lote="'+data.record.lote+'" data-code="'+data.record.id+'"><i class="fa fa-'+
                            icon_select+' fa-1-5x"></i></a>';
                   }
                }
            },
            recordsLoaded: function(event, data) {
                $('.select_cc').click(function(e){
                    var codigo = $(this).attr('data-code');
                    var descripcionArt = $(this).attr('data-name');
                    var idTipoArt = $(this).attr('data-type');
                    var serie = $(this).attr('data-serie');
                    var lote = $(this).attr('data-lote');
                    var costo = $(this).attr('data-costo');
                    seleccionarModal(codigo,descripcionArt,idTipoArt,serie,lote,costo); 
                    e.preventDefault();
                });
            }
        });

        generateSearchForm('frm-search-cc2', 'LoadRecordsButtonCC2', function(){
            table_container_cc2.jtable('load', {
                search: $('#search_cc2').val()
            });
        }, false);

        }

        // function cargartableMovAr2(){
        //      var search_cc22 = getFormSearch('frm-search-cc22', 'search_cc22', 'LoadRecordsButtonCC22');
        //  table_container_cc2 = $("#table_container_Register_Articulo");
        // table_container_cc2.jtable({
        //     title: "Lista de Articulos",
        //     paging: true,
        //     sorting: true,
        //      cache: false,
        //     actions: {
        //         listAction: base_url + '/register_transfers/getArticulosMinKit'
        //     },
        //     toolbar: {
        //         items: [{
        //             cssClass: 'buscador',
        //             text: search_cc22
        //         }]
        //     },
        //     fields: {
        //         id: {
        //             key: true,
        //             create: false,
        //             edit: false,
        //             list: false
        //         },
        //         type_id: {
        //             create: false,
        //             edit: false,
        //             list: false
        //         },
        //         serie: {
        //             create: false,
        //             edit: false,
        //             list: false
        //         },
        //         lote: {
        //             create: false,
        //             edit: false,
        //             list: false
        //         },
        //         description: {
        //             title: 'Articulos'

        //         },
        //         costo: {
        //             title: 'costo'

        //         },
        //         select: {
        //             width: '1%',
        //             sorting: false,
        //             edit: false,
        //             create: false,
        //             listClass: 'text-center',
        //             display: function (data) {
        //                 return '<a href="javascript:void(0)" title="Seleccionar" class="select_cc" data-costo="'+data.record.costo+'" data-name="'+
        //                     data.record.description+'" data-type="'+data.record.type_id+'"  data-serie="'+data.record.serie+'" data-lote="'+data.record.lote+'" data-code="'+data.record.id+'"><i class="fa fa-'+
        //                     icon_select+' fa-1-5x"></i></a>';
        //            }
        //         }
        //     },
        //     recordsLoaded: function(event, data) {
        //         $('.select_cc').click(function(e){
        //             var codigo = $(this).attr('data-code');
        //             var descripcionArt = $(this).attr('data-name');
        //             var idTipoArt = $(this).attr('data-type');
        //             var serie = $(this).attr('data-serie');
        //             var lote = $(this).attr('data-lote');
        //             var costo = $(this).attr('data-costo');
        //             seleccionarModal(codigo,descripcionArt,idTipoArt,serie,lote,costo); 
        //             e.preventDefault();
        //         });
        //     }
        // });

        // generateSearchForm('frm-search-cc22', 'LoadRecordsButtonCC22', function(){
        //     table_container_cc2.jtable('load', {
        //         search: $('#search_cc22').val()
        //     });
        // }, false);

        // }
        
       

        function cargarTableSerie(idProducto,aarraySe){
            cont_check=0;
            identiSelec="A";
            var search_cc4 = getFormSearch('frm-search-cc4', 'search_cc4', 'LoadRecordsButtonCC4');
            table_container_cc4 = $("#table_container_Series_Articulo");
            table_container_cc4.jtable({
                title: "Lista de Series",
                paging: true,
                sorting: true,
                actions: {
                    listAction: function (postData, jtParams) {
                    return $.Deferred(function ($dfd) {
                        $.ajax({
                            url:  base_url + '/register_transfers/getProductoSerie',
                            type: 'POST',
                            dataType: 'json',
                            data:{postData: postData,idProducto:idProducto},
                            success: function (data) {
                                $dfd.resolve(data);
                            },
                            error: function () {
                                $dfd.reject();
                            }
                        });
                    });
                    }
                },
                toolbar: {
                    items: [{
                        cssClass: 'buscador',
                        text: search_cc4
                    }]
                },
                fields: {
                    idSerie: {
                        key: true,
                        create: false,
                        edit: false,
                        list: false
                    },
                    serie: {
                        create: false,
                        edit: false,
                        title: 'N° Serie'
                    },
                    chasis: {
                        create: false,
                        edit: false,
                        title: 'Chasis'
                      
                    },
                    motor: {
                        create: false,
                        edit: false,
                        title: 'Motor'
                    
                    },
                    anio_fabricacion: {
                        title: 'Año de Fabricación'
                    },
                    anio_modelo: {
                        title: 'Año de Modelo'
                    },
                    select: {
                        width: '1%',
                        sorting: false,
                        edit: false,
                        create: false,
                        listClass: 'text-center',
                        display: function (data) {
                            var ichc='N';
                            if(identSerAr.val()!=""){
                                aartMSE.map(function(index) {
                                    if(data.record.serie==index.serie && identSerAr.val()==index.identificador){
                                        if(identSerAr.val()==index.identificador){
                                            ichc='A';  
                                         }
                                       }      
                                    });
                                 if(ichc=='A'){
                                    cont_check=cont_check+1;
                                    
                                    ichc='N';
                                    return '<label class="checkbox-inline i-checks"> <input class="check valcheck" type="checkbox" id="p_state" data_idSerie="'+data.record.idSerie+'" data-code="'+data.record.serie+'" checked ></label>';
                                 }else{
                                    return '<label class="checkbox-inline i-checks"> <input class="check valcheck" type="checkbox" id="p_state" data_idSerie="'+data.record.idSerie+'" data-code="'+data.record.serie+'"  ></label>';
                                 }
                             }else{
                                 return '<label class="checkbox-inline i-checks"> <input class="check valcheck" type="checkbox" id="p_state" data_idSerie="'+data.record.idSerie+'" data-code="'+data.record.serie+'"  ></label>';
                             }
                           
                          
                       }
                    }
                },
                recordsLoaded: function(event, data) {
                    // $('.select_cc').click(function(e){
                    //     var codigo = $(this).attr('data-code');
                    //     var descripcionArt = $(this).attr('data-name');
                    //     var idTipoArt = $(this).attr('data-type');
                    //     var serie = $(this).attr('data-serie');
                    //     var lote = $(this).attr('data-lote');
                    //     e.preventDefault();
                    // });
                    
                     $('.i-checks').iCheck({
                        checkboxClass: 'icheckbox_square-green'
                    }).on('ifChanged', function (event) {
                        if($(this).prop('checked')){
                           cont_check=cont_check+1
                        }else{
                           cont_check=cont_check-1; 
                        };
                        var codigo = $(this).attr('data-code');
                       
                        // $(event.target).click();
                    });

                }
            });

            generateSearchForm('frm-search-cc4', 'LoadRecordsButtonCC4', function(){
                table_container_cc4.jtable('load', {
                    search: $('#search_cc4').val()
                });
            }, true);
        }

        // var search_cc3 = getFormSearch('frm-search-cc3', 'search_cc3', 'LoadRecordsButtonCC3');
        // var table_container_cc3 = $("#table_container_Almacen_Articulo");
        // table_container_cc3.jtable({
        //     title: "Lista de Articulos",
        //     paging: true,
        //     sorting: true,
        //     actions: {
        //         listAction: function (postData, jtParams) {
        //             return $.Deferred(function ($dfd) {
        //                 $.ajax({  
        //                     url: base_url + '/lots/getArticulosSelect?jtStartIndex=' + jtParams.jtStartIndex + '&jtPageSize=' + jtParams.jtPageSize + '&jtSorting=' + jtParams.jtSorting,
        //                     type: 'POST',
        //                     dataType: 'json',
        //                     data: postData,
        //                     success: function (data) {
        //                         $dfd.resolve(data);
        //                     },
        //                     error: function () {
        //                         $dfd.reject();
        //                     }
        //                 });
        //             });
        //         },
        //     },
        //     toolbar: {
        //         items: [{
        //             cssClass: 'buscador',
        //             text: search_cc3
        //         }]
        //     },
        //     fields: {
        //         id: {
        //             key: true,
        //             create: false,
        //             edit: false,
        //             list: false
        //         },
        //         type_id: {
        //             create: false,
        //             edit: false,
        //             list: false
        //         },
        //         serie: {
        //             create: false,
        //             edit: false,
        //             list: false
        //         },
        //         lote: {
        //             create: false,
        //             edit: false,
        //             list: false
        //         },
        //          code_article: {
        //             title: 'Código'

        //         },
        //         description: {
        //             title: 'Articulos'

        //         },
        //         select: {
        //             width: '1%',
        //             sorting: false,
        //             edit: false,
        //             create: false,
        //             listClass: 'text-center',
        //             display: function (data) {
        //                 return '<a href="javascript:void(0)" title="Seleccionar" class="select_cc" data-name="'+
        //                     data.record.description+'" data-type="'+data.record.type_id+'"  data-serie="'+data.record.serie+'" data-lote="'+data.record.lote+'" data-code="'+data.record.id+'"><i class="fa fa-'+
        //                     icon_select+' fa-1-5x"></i></a>';
        //            }
        //         }
        //     },
        //     recordsLoaded: function(event, data) {
        //         $('.select_cc').click(function(e){
        //             var codigo = $(this).attr('data-code');
        //             var descripcionArt = $(this).attr('data-name');
        //             var idTipoArt = $(this).attr('data-type');
        //             var serie = $(this).attr('data-serie');
        //             var lote = $(this).attr('data-lote');
        //             var costo=$(this).attr('data-lote');
        //             if(idArtSerie.val()!=''){
        //                  AlertFactory.textType({
        //                     title: '',
        //                     message: 'Ya seleccionó un artículo serie',
        //                     type: 'error'
        //                 });
        //             }else{
        //                  seleccionarModal(codigo,descripcionArt,idTipoArt,serie,lote,costo); 
        //             }
                   
        //             e.preventDefault();
        //         });
        //     }
        // });

        // generateSearchForm('frm-search-cc3', 'LoadRecordsButtonCC3', function(){
        //     table_container_cc3.jtable('load', {
        //         search: $('#search_cc3').val()
        //     });
        // }, false);
    }

    function Config($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('register_transfers', {
                url: '/register_transfers',
                templateUrl: base_url + '/templates/register_transfers/base.html',
                controller: 'Register_TrasnferCtrl'
            });

        $urlRouterProvider.otherwise('/');
    }
})
();