/**
 * Created by JAIR on 4/5/2017.
 */
  
(function () { 
    'use strict';
    angular.module('sys.app.solicitudCompras')
        .config(Config)
        .controller('SolicitudCompraCtrl', SolicitudCompraCtrl);

    Config.$inject = ['$stateProvider', '$urlRouterProvider'];
    SolicitudCompraCtrl.$inject = ['$scope','_', 'RESTService', 'AlertFactory', 'Notify'];

    function SolicitudCompraCtrl($scope, _, RESTService, AlertFactory, Notify)
    {
        var xmlAdd=$("#xmlAdd"); 
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
        var estado=$("#estado");
         var btn_movimiento_detalle=$("#btn_movimiento_detalle");
        var btn_movimiento_aprobar=$("#btn_movimiento_aprobar");
        var btn_movimiento_cancelar=$("#btn_movimiento_cancelar");
        var btn_movimiento_cerrar=$("#btn_movimiento_cerrar");

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

        btn_movimiento_aprobar.click(function(e){
            cambiarEstado(1);
        });
        btn_movimiento_cancelar.click(function(e){
            cambiarEstado(4);
        });

        btn_movimiento_cerrar.click(function(e){
            cambiarEstado(3);
        });


        function cambiarEstado(estadoCambio){
               var params = {
                    'estadoCambio':estadoCambio,
                }; 
               var id=idMovimiento.val();
               RESTService.updated('solicitudCompras/cambiarEstado',id, params, function(response) {
                    if (!_.isUndefined(response.status) && response.status) {
                        var messan=response.mensaje;
                         AlertFactory.textType({
                            title: '',
                            message:'el registró se ' + messan + ' con éxito',
                            type: 'success'
                         });
                         findSolicitudCompra(id);
                         LoadRecordsButtonSolicitudCompra.click();
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


        $('.i-checks').iCheck({
            checkboxClass: 'icheckbox_square-green'
        }).on('ifChanged', function (event) {
            $(event.target).click();
            $scope.chkState();
        });
         btn_imprimirMovimiento.click(function(e){
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
              $scope.loadMovimientoPDF('solicitudCompras/pdf', data);
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
         function cleanmodalProcesarTransferencia(){
          
            idTransferenciaProcesar.val("");
            msg_cont_ProcesarTransferencia.removeClass('show')
            $("#msg_cont_ProcesarTransferencia p").html("");

        }
         function findSolicitudCompra(id)
        {
            titlemodalMovimieto.html('Editar Solicitud Compra');
          
            RESTService.get('solicitudCompras/find', id, function(response) {
                if (!_.isUndefined(response.status) && response.status) {
                    var data_p = response.data;

                    var opera_fin_data=response.operaciones;
                    // idTipoOperacion.html("");
                    // idTipoOperacion.append('<option value="" selected>Seleccionar</option>');
                    //  _.each(response.operaciones, function(item) {
                    //     idTipoOperacion.append('<option value="'+item.idTipoOperacion+'*'+item.idNaturaleza+'">'+item.descripcion+'</option>');
                    // });
                    // console.log(data_p);

                    titlemodalMovimieto.html('Editar Solicitud Compra '+'['+ data_p.idMovimiento+ ']');
                    var lotE=response.data_movimiento_lote;
                    var serE=response.data_movimiento_serie;
                    btn_movimiento_detalle.prop('disabled',false);
                    btn_movimiento_detalle.trigger('change');

                    ident_detalle.val("A");

                    naturalezaGeneral=data_p.naturaleza;
                    aartMLE=[];
                    aartMSE=[];
                    console.log("entro1");
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
                    console.log("entro2");
                    cCodConsecutivo.val(data_p.cCodConsecutivo);
                    nConsecutivo.val(data_p.nConsecutivo);
                    idMovimiento.val(data_p.idMovimiento);
                    fecha_registro.val(data_p.fecha_registro);
                    observaciones.val(data_p.observaciones);
                    console.log(data_p.idArea)
                    console.log("data_solo_");
                    console.log(data_p.fecha_requerida);
                    console.log("data_solo_a");
                    console.log(data_p.fecha_registro);
                    console.log("data_solo");
                    fecha_requerida.val(data_p.fecha_requerida);
                    prioridad.val(data_p.prioridad).trigger('change');
                    area.val(data_p.idArea).trigger('change');
                     estado.val(data_p.estado);

                     if(data_p.estado==0){
                         btn_movimiento_aprobar.prop('disabled',false);
                         btn_movimiento_cancelar.prop('disabled',true);
                         btn_movimiento_cerrar.prop('disabled',true);
                         btnguardarMovimiento.prop('disabled',false);
                         btn_movimiento_detalle.prop('disabled',false);
                     }else if(data_p.estado==1){
                         btn_movimiento_aprobar.prop('disabled',true);
                         btn_movimiento_cancelar.prop('disabled',false);
                         btn_movimiento_cerrar.prop('disabled',true);
                         btnguardarMovimiento.prop('disabled',true);
                         btn_movimiento_detalle.prop('disabled',true);
                     }else if(data_p.estado==2){
                         btn_movimiento_aprobar.prop('disabled',true);
                         btn_movimiento_cancelar.prop('disabled',true);
                         btn_movimiento_cerrar.prop('disabled',false);
                         btnguardarMovimiento.prop('disabled',true);
                         btn_movimiento_detalle.prop('disabled',true);
                     }else{
                        btn_movimiento_aprobar.prop('disabled',true);
                         btn_movimiento_cancelar.prop('disabled',true);
                         btn_movimiento_cerrar.prop('disabled',true);
                         btnguardarMovimiento.prop('disabled',true);
                         btn_movimiento_detalle.prop('disabled',true);
                     }

                    // idTipoOperacion.val(data_p.idTipoOperacion+'*'+data_p.naturaleza).trigger('change');
                    //  console.log("entro3");
                    // idTipoOperacion.prop('disabled',true);
                    
                    // idTipoOperacion.trigger('change');
                   
                  
                    // idMoneda.val(data_p.idMoneda).trigger('change');
                   
                    // observaciones.val(data_p.observaciones);
                    // if(data_p.estado==0){
                    //     p_state.val('REGISTRADO');
                    // }
                    // if(data_p.estado==1){
                    //          p_state.val("PROCESADO");
                    // }
                    // if(p_state.val()=="PROCESADO"){
                    //         procesarTransfBoton.prop('disabled',true);
                    //         procesarTransfBoton.trigger('change');
                    //         btnguardarMovimiento.prop('disabled',true);
                    //         btnguardarMovimiento.trigger('change');
                    //         btn_movimiento_detalle.prop('disabled',true);
                    //         btn_movimiento_detalle.trigger('change');
                    // }else{
                    //        procesarTransfBoton.prop('disabled',false);
                    //         procesarTransfBoton.trigger('change');
                    //         btnguardarMovimiento.prop('disabled',false);
                    //         btnguardarMovimiento.trigger('change');
                    //         btn_movimiento_detalle.prop('disabled',false);
                    //         btn_movimiento_detalle.trigger('change');
                    // }
                    var mov_ar=response.movimiento_Ar;
                    console.log(mov_ar);
                    console.log("ddd");
                    articulo_mov_det.html("");
                     mov_ar.map(function(index) {
                        var ver='A';
                        var tipo='NA';
                        var codl="";
                        var datl="";
                        // if(index.serie=='1'){
                        //     ver='N';
                        // }
                        // if(index.serie=='1'){
                        //     tipo='SE';
                            
                        // }else if(index.lote=='1'){
                        //     tipo='LE';
                        //     codl=index.idLote;
                        // }
                        console.log(index.costo2);
                        console.log("sss");
                        var estado="N";
 
                        console.log(fecharequerida,index.fecha_requerida_ad);
                        console.log("fecha requeria");
                        var unida="";
                        var obser=index.observaciones;
                        if(index.observaciones==null){
                            obser='';
                        }
                        var idDetalle=0;
                        addArticuloTable(index.consecutivo,index.idArticulo,index.description,Math.trunc(index.cantidad),ver,index.consecutivo,tipo,codl,datl,index.estado,index.fecha_requerida_ad,index.unidaMedida,obser);                      
                      })
                    // if(p_state.val()=="REGISTRADO"){
                    //     procesarTransfBoton.prop('disabled',false);
                    //     procesarTransfBoton.trigger('change');
                    // }else{
                    //     procesarTransfBoton.prop('disabled',true);
                    //     procesarTransfBoton.trigger('change');
                    // } 
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
            getDataFormMovement();
            xmlAdd.val("");
            nConsecutivo.val("");
            titlemodalMovimieto.html('');
            idMovimiento.val('');
            idTipoOperacion.val('');
            idMoneda.val('');
            ident_detalle.val('');
            estado.val("");
            prioridad.val("");
            observaciones.val("");

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
            RESTService.get('solicitudCompras/validateLote', id, function(response) {
                 if (!_.isUndefined(response.status) && response.status) {
                      if(response.data=="N"){
                        if(naturalezaGeneral=="S"){
                            AlertFactory.textType({
                                title: '',
                                message: 'No existe Lote . Intente nuevamente.',
                                type: 'info'
                            });
                        }else{
                            lotProductoML.val(codigoLoteMll.val());
                            idProductoML.val(idProductoMll.val());
                            desProductoML.val(desProductoMll.val());
                            modalLote.modal("show");
                        }
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
         $('#ProcesarTransferenciaBoton').click(function(e){
            var id=idMovimiento.val();
          if(articulo_mov_det.html()!=""){
                    RESTService.get('solicitudCompras/validaDetalle', id, function(response) {
                 if (!_.isUndefined(response.status) && response.status) {
                        var ide = idMovimiento.val();
                        idTransferenciaProcesar.val(ide);
                        modalProcesarTransferencia.modal("show");

                        e.preventDefault();
                 }else {
                    var msg_ = (_.isUndefined(response.message)) ?
                            'No se pudo guardar el movimiento. Intente nuevamente.' : response.message;
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
                    message: 'Debe registrar Articulos en este movimiento. Intente nuevamente.',
                    type: 'info'
                    });

          }
                    
        });
         $('#btn_xml').click(function(e){
            var bval = true;
            bval = bval && idTipoOperacion.required();
            bval = bval && idMoneda.required();
            bval = bval && fecha_registro.required();
            bval = bval && xmlAdd.required();
            if(idTipoOperacion.val()!='1*E'){
                  AlertFactory.textType({
                                title: '',
                                message: 'La operación deber ser tipo compra',
                                type: 'info'
                        });
                   bval=false;      
            }
            if (bval) {
                if(idMovimiento.val()==""){
                    saveMovimientoCab(); 
                }
                cargarXML2(); 
            }
        });
         function cargarXML(xml) {
               var docXML = xml.responseXML;
                var tabla = "<tr><th>Artista</th><th>Titulo</th></tr>";
                var discos = docXML.getElementsByTagName("CD");
                for (var i = 0; i < discos.length; i++) {
                    tabla += "<tr><td>";
                    tabla += discos[i].getElementsByTagName("ARTIST")[0].textContent;
                    tabla += "</td><td>";
                    tabla += discos[i].getElementsByTagName("TITLE")[0].textContent;
                    tabla += "</td></tr>";
                }
             // document.getElementById("demo").innerHTML = tabla;
          
        }
         function cargarXML2() {
        
              var formData = new FormData();
        
          formData.append('file',xmlAdd[0].files[0]);

          console.log(FormData);
             $.ajax({
                url: base_url + '/solicitudCompras/xml',
                type: 'post',
                data: formData,
                contentType: false,
                processData: false,
                success: function (response) {
                    // var xml=response.info;
                    // var xmlDoc  = $.parseXML(xml);
                    //   var $xml = $( xmlDoc );
                    //  var title = $xml.find( "DigestValue" );
                    // console.log(title);

                    console.log(response.Result);
                    if(!response.Result){
                         AlertFactory.textType({
                                title: '',
                                message: 'Hay un inconvenientes con el xml',
                                type: 'info'
                        }); 
                    }else{
                        if(response.monedFac==idMoneda.val()){
                            var idProd=response.arrayIdsProdE;
                            var costPd=response.arrayCostoUnE;
                            var descPd=response.arrayDescripE;
                            var cantPd=response.arrayCantidaE;
                            var codPdN=response.arrayCodProdN;
                            var desPdN=response.arrayDescripN;
                            var canPdN=response.arrayCantidaN;
                            var cosPdN=response.arrayCostoUnN;
                            articulo_mov_det.html("");
                            var grubNa={};
                            for (var i in idProd){
                                var codigo=Math.random().toString(36).substr(2, 18);
                                 grubNa={
                                       'identificador': codigo,
                                       'idProducto':idProd[i],
                                }
                                aartMN.push(grubNa);
                                var ver='A';
                                var tipoArt='NA';
                                var codl="";
                                var datl="";
                                var idAlmacen="";
                                var idLocalizacion="";
                                var costo=Number(costPd[i]);
                                var costo_total="";
                                var precio="";
                                var precioTotal="";
                                var estado="N";
                                var unida='';
                                var obser="";
                                var idDetalle=0;
                                addArticuloTable(idDetalle,idProd[i],descPd[i],Number(cantPd[i]),ver,codigo,tipoArt,codl,datl,estado,fecharequerida,unida,obser);
                            }
                            if(codPdN.length!=0){
                                 AlertFactory.textType({
                                title: '',
                                message: 'Existen Articulos que no están registrados en el sistema',
                                type: 'info'
                                }); 
                                    const a = document.createElement("a");
                                    var contenido = [];
                                    contenido.push("#  CÓDIGO    DESCRIPCIÓN    CANTIDAD     COSTO UNITARIO  \n");
                                    for (var i in codPdN){
                                        contenido.push(i+" "+codPdN[i]+"  "+ desPdN[i]+"   ,  "+ Number(canPdN[i])+"   ,   "+Number(cosPdN[i])+"\n");
                                    }

                                     var contenidoAdd = contenido.join("");
                                    const archivo = new Blob([contenidoAdd], { type: 'text/plain' });
                                    const url = URL.createObjectURL(archivo);
                                    a.href = url;
                                    a.download ="Articulos no registrados "+fecha_registro.val()+".txt";
                                    a.click();
                                    URL.revokeObjectURL(url);
                            }
                          
                        }else{
                             AlertFactory.textType({
                                title: '',
                                message: 'La moneda del xml no coincide con el movimiento',
                                type: 'info'
                            }); 
                        }
                        // console.log("2");
                    }
   

                },
                error: function (ajaxContext) {
                    // angular.element('#show_loading').addClass('ng-hide');
                    AlertFactory.showErrors({
                        title: 'Hubo un error',
                        message: 'Intente nuevamente'
                    });
                }
            });
          
        }
        function getFiles()
{
    var idFiles=document.getElementById("xmlAdd");
    // Obtenemos el listado de archivos en un array
    var archivos=idFiles.files;
    // Creamos un objeto FormData, que nos permitira enviar un formulario
    // Este objeto, ya tiene la propiedad multipart/form-data
    var data=new FormData();
    // Recorremos todo el array de archivos y lo vamos añadiendo all
    // objeto data
    for(var i=0;i<archivos.length;i++)
    {
        // Al objeto data, le pasamos clave,valor
        data.append("archivo"+i,archivos[i]);
    }
    return data;
}
         $scope.ProcesarTransferencia = function(){
            var id=idTransferenciaProcesar.val();
            RESTService.get('solicitudCompras/procesarTransferencia', id, function(response) {
                 if (!_.isUndefined(response.status) && response.status) {
                    var dta=response.data;
                    if(dta[0]['Mensaje']=="OK"){
                         AlertFactory.textType({
                            title: '',
                            message: 'El registro se procesó con exitó',
                            type: 'success'
                        });
                        p_state.val("PROCESADO");
                        if(p_state.val()=="PROCESADO"){
                            procesarTransfBoton.prop('disabled',true);
                            procesarTransfBoton.trigger('change');
                            btnguardarMovimiento.prop('disabled',true);
                            btnguardarMovimiento.trigger('change');
                            btn_movimiento_detalle.prop('disabled',true);
                            btn_movimiento_detalle.trigger('change');
                        }
                        modalProcesarTransferencia.modal("hide");
                        LoadRecordsButtonSolicitudCompra.click(); 
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
        function seleccionarModal(codigo,descripcionArt,idTipoArt,serie,lote,costo) {
            console.log(idTipoArt,serie,lote);
            // TODO: Debido a estas sentencias todos los articulos abren el modal ModalNada, pero hay ciertos articulos que deberian abrir
            // con otro modal, para solucionarlo comente o borre las 3 lineas siguientes, pero debera implementar las funciones para manejar
            // esos articulos y sus modales!.
            /*
            idTipoArt=1;
            serie=0;
            lote=0;
            console.log("total");
            */
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
        function addToKit(idArticulo,descripcion,cantidad){

            var tr = $('<tr id="tr_idArticulo' + idArticulo + '"></tr>');
            var td1 = $('<td>' + descripcion + '</td>');
            var td2 = $('<td class="text-center" >' + cantidad + '</td>');
            tr.append(td1).append(td2);
            tablekitdetM.append(tr);
        }
        function getkitDet(codigo){
             RESTService.get('solicitudCompras/getKit', codigo, function(response) {
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
             RESTService.get('solicitudCompras/getLocalizacionSelec', id, function(response) {
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
        function addlocSele(codigo){
            var idLocali=$("#"+codigo);
            idLocali.append('<option value="" selected>Seleccionar</option>');
              _.each(LocalizacionesSele, function(item) {
                 idLocali.append('<option value="'+item.idLocalizacion+'" >'+item.descripcion+'</option>');
            });

        }
        function addAlmaSelec(codigo){
          console.log("entro1")
           var idAlmacenSele=$("#Al_"+codigo);
            idAlmacenSele.append('<option value="" selected>Seleccionar</option>');
              _.each(AlmacenesSele, function(item) {
                 idAlmacenSele.append('<option value="'+item.idAlmacen+'" >'+item.descripcion+'</option>');
            }); 
        }
        // function getStock(idl,idAl){
        //      var id=idl+','+idAl;
        //      RESTService.get('solicitudCompras/getStockLoc', id, function(response) {
        //          if (!_.isUndefined(response.status) && response.status) {
        //             console.log(response.data);
        //             var stock = Math.trunc(response.data);
        //             $('#tr_idArticulo'+ idAl).find("td:eq(2)").children("p").text(stock);
        //          }else {
        //             AlertFactory.textType({
        //                 title: '',
        //                 message: 'Hubo un error al obtener el Stock. Intente nuevamente.',
        //                 type: 'error'
        //             });
        //         }

        //        });
        // }
        function getLocaStock(idl,ident,idPrAl,idLocalizacion){
            var idLocali=$("#"+ident);
            var id=idl;
             RESTService.get('solicitudCompras/getLocaStock', id, function(response) {
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

        $scope.guardarMovimientoDetalle = function(){
            var bval =true;

            if (bval && articulo_mov_det.html() === '' ) {
                AlertFactory.showWarning({
                    title: '',
                    message: 'Debe agregar mínimo 1 Artículo'
                });
                return false;
            }
            // if(naturalezaGeneral=="C"){
            //     //  acodigos.forEach(function(val,index) {
            //     //     var cosr=$('#cosMs_'+val);
            //     //     bval = bval && cosr.required();    
            //     // });
            // }else{
            //      acodigos.forEach(function(val,index) {
            //         // var idAr=$('#Al_'+val);
            //         // var idLr=$('#'+val);
            //         var canr=$('#canMs_'+val);
            //         // var cosr=$('#cosMs_'+val);
            //         // bval = bval && idAr.required();
            //         // bval = bval && idLr.required();
            //         bval = bval && canr.required();
            //         // bval = bval && cosr.required();    
            //     });
            // }
            acodigos.forEach(function(val,index) {
                var canr=$('#canMs_'+val);
                bval = bval && canr.required();
            });

            // var precirIn='A';
            // if(naturalezaGeneral=="S" || naturalezaGeneral=="A"){
            //       acodigos.forEach(function(val,index) {
            //         var preM=$('#preMs_'+val);
            //         bval = bval && preM.required();
            //     });
              
            //     acodigos.forEach(function(val,index) {
            //         var cosr=$('#preMs_'+val).val();
            //         if(cosr<1){
            //             precirIn='I';
            //         }
                    
            //     }) 
            // };
            // if(precirIn=='I'){
            //     AlertFactory.showWarning({
            //         title: '',
            //         message: 'El precio de los artículos no puede ser cero'
            //     });
            //     precirIn='A';
            //     return false; 
            // }
            var cosrIn='A';
            acodigos.forEach(function(val,index) {
                    var cosr=$('#fechareEnv_'+val).val();
                    if(cosr<$("#fecha_registro").val()){
                        cosrIn='I';
                    }
                   
                    
            })
          
            var cantrIn='A';
            // if(naturalezaGeneral!="C"){
            acodigos.forEach(function(val,index) {
                    var cantEn=$('#canMs_'+val).val();
                    if(cantEn<1){
                        cantrIn='I';
                    }
                    
            });
            // };
            if(cosrIn=='I'){
                AlertFactory.showWarning({
                    title: '',
                    message: 'La fecha requerida del articulo no puede ser menor a fecha registro'
                });
                cosrIn='A';
                return false; 
            }
             if(cantrIn=='I'){
                AlertFactory.showWarning({
                    title: '',
                    message: 'La cantidad no puede ser menor a 1'
                });
                cantrIn='A';
                return false; 
            }
            if($("#fecha_requerida").val()<$("#fecha_registro").val()){
                 AlertFactory.showWarning({
                    title: '',
                    message: 'La fecha requerida no puede ser menor a fecha registro'
                });
                return false; 
            }
            
            if(bval){
                 var idartEnv = [];
                    $.each($('.m_articulo_id'), function (idx, item) {
                        idartEnv[idx] = $(item).val();
                    });
                    
                idartEnv = idartEnv.join(',');
                // var idalmaEnv = [];
                //     $.each($('.m_articulo_idAlm '), function (idx, item) {
                //         idalmaEnv[idx] = $(item).val();
                //     });
                    
                // idalmaEnv = idalmaEnv.join(',');
                // var idalLocEnv = [];
                //     $.each($('.m_articulo_idLoc'), function (idx, item) {
                //         idalLocEnv[idx] = $(item).val();
                //     });
                    
                // idalLocEnv = idalLocEnv.join(',');
                var idalcantEnv = [];
                    $.each($('.m_articulo_cantidad'), function (idx, item) {
                        idalcantEnv[idx] = $(item).val();
                    });
                
                var identificador_serie_bd = [];
                    $.each($('.identificador_serie_bd'), function (idx, item) {
                        identificador_serie_bd[idx] = $(item).val();
                    });
                    
                identificador_serie_bd = identificador_serie_bd.join(',');    

                idalcantEnv = idalcantEnv.join(',');

                // var idalcostEnv = [];
                //     $.each($('.m_articulo_costo'), function (idx, item) {
                //         idalcostEnv[idx] = $(item).val();
                //     });
                    
                // idalcostEnv = idalcostEnv.join(',');
                // var idalcostotalEnv = [];
                //     $.each($('.m_articulo_costoTotal'), function (idx, item) {
                //         idalcostotalEnv[idx] = $(item).val();
                //     });
                    
                // idalcostotalEnv = idalcostotalEnv.join(',');
                
                // var idalpretEnv = [];
                //     $.each($('.m_articulo_precio'), function (idx, item) {
                //         idalpretEnv[idx] = $(item).val();
                //     });
                    
                // idalpretEnv = idalpretEnv.join(',');

                // var idalPrtolEnv = [];
                //     $.each($('.m_articulo_precioTotal'), function (idx, item) {
                //         idalPrtolEnv[idx] = $(item).val();
                //     });
                    
                // idalPrtolEnv = idalPrtolEnv.join(',');
                


                var estadodeta = [];
                    $.each($('.m_idestado'), function (idx, item) {
                        estadodeta[idx] = $(item).val();
                    });
                    
                estadodeta = estadodeta.join(',');

                 var fecharequeridadeta = [];
                    $.each($('.fecharequerida'), function (idx, item) {
                        fecharequeridadeta[idx] = $(item).val();
                    });
                    
                fecharequeridadeta = fecharequeridadeta.join(',');


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

                var dataObserva = [];
                    $.each($('.observrequerida'), function (idx, item) {
                        dataObserva[idx] = $(item).val();
                    });
                    
                dataObserva = dataObserva.join(',');

                
                var idProductoSe = [];
                var serieSe=[];
                var idSerieSe=[];
                var cont=0;
                var ident_serie_bd_serie=[]; 
                aartMSE.map(function(index) {
                         ident_serie_bd_serie[cont]=index.identificador;
                         idProductoSe[cont] = index.idProducto;
                         serieSe[cont] = index.serie;
                         idSerieSe[cont]=index.idSerie;
                         cont=cont+1;
                      })
                ident_serie_bd_serie=ident_serie_bd_serie.join(",");
                  idProductoSe = idProductoSe.join(',');
                  serieSe = serieSe.join(',');
                idSerieSe = idSerieSe.join(',');


                
                var serieNenv = [];
                var idProductoSeN = [];
                var chasiNs=[];
                var motorNs=[];
                var anioNFs=[];
                var anioNVs=[];
                var colorNs=[];
                var idTipoCompraVenta=[];
                var nPoliza=[];
                var nLoteCompra=[];
                var cont2=0;
                var ident_serie_bd_serie2=[];
                aartMSN.map(function(index) {
                        ident_serie_bd_serie2[cont2]=index.identificador;
                        serieNenv[cont2] = index.serie;
                        idProductoSeN[cont2] = index.idProducto;
                        chasiNs[cont2] = index.chasis;
                        motorNs[cont2] = index.motor;
                        anioNFs[cont2] = index.anio_fabricacion;
                        anioNVs[cont2] = index.anio_modelo;
                        colorNs[cont2] = index.color;
                        idTipoCompraVenta[cont2]=index.idTipoCompraVenta;
                        nPoliza[cont2]=index.nPoliza;
                        nLoteCompra[cont2]=index.nLoteCompra;
                         cont2=cont2+1;
                      })
                serieNenv = serieNenv.join(',');
                idProductoSeN = idProductoSeN.join(',');
                chasiNs = chasiNs.join(',');
                motorNs = motorNs.join(',');
                anioNFs = anioNFs.join(',');
                anioNVs = anioNVs.join(',');
                colorNs = colorNs.join(',');
                idTipoCompraVenta=idTipoCompraVenta.join(',');
                nPoliza=nPoliza.join(',');
                nLoteCompra=nLoteCompra.join(',');
                ident_serie_bd_serie2=ident_serie_bd_serie2.join(",");
                var ident_det="";
                if(articulo_mov_det.html() !=''){
                    ident_det="A";
                };
                 
               

                var params = {
                    'art_nada':aartMN,
                    'idArticulo':idartEnv,
                    // 'idAlmacen':idalmaEnv,
                    // 'idLocalizacion':idalLocEnv,
                    'estadodeta':estadodeta,
                    'fecharequeridadeta':fecharequeridadeta,
                    'cantidad':idalcantEnv,
                    // 'costo':idalcostEnv,
                    // 'costo_total':idalcostotalEnv,
                    // 'precio':idalpretEnv,
                    // 'precio_total':idalPrtolEnv,
                    'idLote':idloteEnvi,
                    'dataLote':datloteEnvi,
                    'dataObserva':dataObserva,

                    'idProductoSe':idProductoSe,
                    'serieSe':serieSe,
                    'idSerieSe':idSerieSe,
                    'serieNenv':serieNenv,
                    'idProductoSeN':idProductoSeN,
                    'chasiNs':chasiNs,
                    'motorNs':motorNs,
                    'anioNFs':anioNFs,
                    'anioNVs':anioNVs,
                    'colorNs':colorNs,
                    'ident_detalle':ident_det,
                    'idTipoCompraVenta':idTipoCompraVenta,
                    'nPoliza':nPoliza,
                    'nLoteCompra':nLoteCompra,
                    'identificador_serie_bd':identificador_serie_bd,
                    'ident_serie_bd_serie2':ident_serie_bd_serie2,
                    'ident_serie_bd_serie':ident_serie_bd_serie,
                    'naturaleza':naturalezaGeneral,
                };
                console.log(params);
                 var id_Movimiento = (idMovimiento.val() === '') ? 0 : idMovimiento.val();
                RESTService.updated('solicitudCompras/saveMovimientArticulo',id_Movimiento, params, function(response) {
                    if (!_.isUndefined(response.status) && response.status) {
                        AlertFactory.textType({
                            title: '',
                            message: 'El registro se guardó correctamente',
                            type: 'success'
                        });

                        procesarTransfBoton.prop('disabled',false);
                        procesarTransfBoton.trigger('change');
                         articulo_mov_det.html("");
                         findSolicitudCompra(id_Movimiento);
                         LoadRecordsButtonSolicitudCompra.click();
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

        function addArticuloTable(idDetalle,idProducto,desProducto,cantProducto,ver,codigo,tipo,codl,datl,estado,fecharequerida,unida,obser){
            acodigos.push(codigo);
        
            var costonew=0;
            var precionew=0;
            naturalezaGeneral='E';
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

            var tr = $('<tr id="tr_idArticulo' + codigo + '"></tr>');
            var td1 = $('<td>' + desProducto + '</td>');
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
                // var td2 = $('<td></td>');
                // var tdy = $('<td></td>');
                // var inpy=$('<select  data-idLocalizacion="'+idLocalizacion+'" data-arts="'+idProducto+'" id="Al_'+codigo+'" data-idAraAl="'+codigo+'" class="m_articulo_idAlm form-control input-sm"></select>');
                // var inpl=$('<select id="'+codigo+'" data-idArl="'+idProducto+'" class="m_articulo_idLoc form-control input-sm"></select>');
            
            // }
            var td4 = $('<td class="text-center"></td>');
            var tdObser = $('<td class="text-center"></td>');
            var estadoda=$('<select id="estadoEnv_'+codigo+'" class="m_idestado form-control input-sm" disabled ><option value="N"></option><option value="0">Registrado</option><option value="1">Aprobado</option><option value="2">C/Orden de Compra</option><option value="3">Cerrado</option><option value="4">Cancelado</option></select>');
            var td5 = $('<td class="text-center"></td>');
            var inp5 = $('<input type="date" id="fechareEnv_'+codigo+'" class="fecharequerida form-control input-sm" value="' + fecharequerida + '" />');
            var inpObse = $('<input type="input" id="observa_'+codigo+'" class="observrequerida form-control input-sm" value="' + obser + '" />');
            td4.append(estadoda);
             td5.append(inp5);
             tdObser.append(inpObse);
            // var td5 = $('<td><p>'+impor.toFixed(2) +'</p></td>');
            // var tdpreT = $('<td><p>'+pretotal.toFixed(2) +'</p></td>');
            var inp = $('<input type="hidden" class="m_articulo_id" value="' + idProducto + '" />');
           
            // var inp5 = $('<input type="hidden" class="m_articulo_costoTotal" value="'+impor.toFixed(2)+'" />');
            // var inpPreTo = $('<input type="hidden" class="m_articulo_precioTotal" value="'+pretotal.toFixed(2)+'" />');
            
            var op=$('<option value="" selected>Seleccione</option>');
            var fclt=$('<input type="hidden" class="m_codigo_lote" value="' +codl+ '" />');
            var fdlt=$('<input type="hidden" class="m_dato_lote" value="' +datl+ '" />');
            var identificador_serie_bd=$('<input type="hidden" class="identificador_serie_bd" value="' +codigo+ '" />');
            td1.append(inp).append(fclt).append(fdlt).append(identificador_serie_bd);
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
            var btn3 = $('<button class="btn btn-danger btn-xs delMovPro"  data-idDetalle="'+idDetalle+'" data-tipo="'+tipo+'" title="Eliminar" data-id="' + codigo + '" type="button"><span class="fa fa-trash"></span></button>');
            td6.append(btn1);
            td8.append(btn3);
            tr.append(td1).append(td2).append(td3).append(td12).append(td5).append(tdObser).append(td4).append(td6).append(td8);
            articulo_mov_det.append(tr);
            addAlmaSelec(codigo);
            addlocSele(codigo);
           console.log("entro 123456");
              $('#estadoEnv_'+codigo+' option[value='+estado+']').prop('selected', 'selected').change();
            $('.verUpdate').click(function(e){
                var tipShow = $(this).attr('data-tShow');
                var codeShow = $(this).attr('data-idv');
                var idProduc = $(this).attr('data-idProducto');
                var descrip = $(this).attr('data-descrip');
                var cantshow = $(this).attr('data-cantiShow');
                if(tipShow=="SE"){
                    cantProductoMss.val($("#tr_idArticulo"+codeShow).find("td:eq(1)").children("input").val());
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
                    cantProductoMss.val($("#tr_idArticulo"+codeShow).find("td:eq(1)").children("input").val());
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
                             cantProductoMll.val($("#tr_idArticulo"+codeShow).find("td:eq(1)").children("input").val());
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
                             cantProductoML.val($("#tr_idArticulo"+codeShow).find("td:eq(1)").children("input").val());
                             fVenPrML.val(index.fecha_vencimiento);
                        }
                       })
                        modalLote.modal("show");
                }

            });

             $('.delMovPro').click(function (e) {
                var code = $(this).attr('data-id');
                var tip = $(this).attr('data-tipo');
                var idDet=$(this).attr('data-idDetalle');
                if($("#estado").val()!=0){
                     AlertFactory.textType({
                                title: '',
                                message: 'Solo se puede eliminar artículos de una Solicitud de compra en estado registrado',
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
                    if(idMovimiento.val()!='' && idDet!=0){
                        var id=idMovimiento.val()+'_'+idDet;
                        RESTService.get('solicitudCompras/deleteDetalleSC', id, function(response) {
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
            //  $('.m_articulo_idAlm').change(function (e) {
            //     var idl = $(this).val();
            //     var ident=$(this).attr('data-idAraAl');
            //     var idPrAl=$(this).attr('data-arts');
            //     var idLocalizacion=$(this).attr('data-idLocalizacion');
            //     console.log("entro33333");
            //     getLocaStock(idl,ident,idPrAl,idLocalizacion);
            //     e.preventDefault();
            // }); 
            $('.m_articulo_cantidad').keyup(function (e) {
                var cantidap = $(this).val();
                var costo=$(this).closest("tr").find("td:eq(4)").children("input").val();
                var importe=Number(cantidap) * Number(costo);
                $(this).closest("tr").find("td:eq(5)").children("p").text(importe.toFixed(2));
                $(this).closest("tr").find("td:eq(5)").children("input").val(importe.toFixed(2));
                 if(naturalezaGeneral=="S" || naturalezaGeneral=="A"){
                     var preciUni=$(this).closest("tr").find("td:eq(6)").children("input").val();
                     var precioTotal=Number(cantidap) * Number(preciUni);
                    $(this).closest("tr").find("td:eq(7)").children("p").text(precioTotal.toFixed(2));
                      $(this).closest("tr").find("td:eq(7)").children("input").val(precioTotal.toFixed(2));
                 }
            })
            //  $('.m_articulo_precio').keyup(function (e) {
            //       var preciop = $(this).val();
            //       var cantidad=$(this).closest("tr").find("td:eq(1)").children("input").val();
            //       var precioTotal=Number(cantidad) * Number(preciop);
            //       $(this).closest("tr").find("td:eq(7)").children("p").text(precioTotal.toFixed(2));
            //       $(this).closest("tr").find("td:eq(7)").children("input").val(precioTotal.toFixed(2));
            // })

            // $('.m_articulo_precio').change(function (e) {
            //       var preciop = $(this).val();
            //       var cantidad=$(this).closest("tr").find("td:eq(1)").children("input").val();
            //       var precioTotal=Number(cantidad) * Number(preciop);
            //       $(this).closest("tr").find("td:eq(7)").children("p").text(precioTotal.toFixed(2));
            //       $(this).closest("tr").find("td:eq(7)").children("input").val(precioTotal.toFixed(2));
            // }) 

            // $('.m_articulo_costo').keyup(function (e) {
            //       var costop = $(this).val();
            //       var cantidad=$(this).closest("tr").find("td:eq(1)").children("input").val();
            //       var importe=Number(cantidad) * Number(costop);
            //       $(this).closest("tr").find("td:eq(5)").children("p").text(importe.toFixed(2));
            //       $(this).closest("tr").find("td:eq(5)").children("input").val(importe.toFixed(2));
            // })
            // $('#cosMs_'+codigo).change(function (e) {
            //       var costop = $(this).val();
            //       var cantidad=$(this).closest("tr").find("td:eq(1)").children("input").val();
            //       var importe=Number(cantidad) * Number(costop);
            //       $(this).closest("tr").find("td:eq(5)").children("p").text(importe.toFixed(2));
            //       $(this).closest("tr").find("td:eq(5)").children("input").val(importe.toFixed(2));
            // }) 
            // if(idAlmacen!=""){
            //  $("#Al_"+codigo).val(idAlmacen).trigger('change');
            //  $("#"+codigo).val(idLocalizacion).trigger('change');

            //  $("#cosMs_"+codigo).val(Number(costo));
            //  var cos=Number(costo_total);
            //  $("#tr_idArticulo"+codigo).find("td:eq(5)").children("p").text(cos);
            //  $("#tr_idArticulo"+codigo).find("td:eq(5)").children("input").val(cos);
            // };

        }
        // $(document).on("change", ".m_articulo_idAlm", function () {
        //          var idl = $(this).val();
        //         var ident=$(this).attr('data-idAraAl');
        //         var idPrAl=$(this).attr('data-arts');
        //         var idLocalizacion=$(this).attr('data-idLocalizacion');
        //         console.log("entro33333");
        //         getLocaStock(idl,ident,idPrAl,idLocalizacion);
        // });
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
                html+="<th width='200px' height='20px'>Motor</th>";
                html+="<th width='100px' height='20px'>Color</th>";
                html+="<th width='100px' height='20px'>Año fabricación</th>";
                html+="<th width='100px' height='20px'>Año Modelo</th>";
                html+="<th width='200px' height='20px'>Tipo Compra</th>";
                html+="<th width='100px' height='20px'>N° Poliza</th>";
                html+="<th width='100px' height='20px'>N° Lote</th>";
                html+="</tr>";
                table_serie_cabecera.append(html);
        }
        $scope.addSerieCompleTab = function(){
            var bval =true;
            var cant=cantProductoMss.val();
            bval = bval && cantProductoMss.required();
            if (bval) {
                if(identiSelec=="A"){
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
                                $("#tr_idArticulo"+identSerAr.val()).find("td:eq(1)").children("p").text(cantProductoMss.val());
                                $("#tr_idArticulo"+identSerAr.val()).find("td:eq(1)").children("input").val(cantProductoMss.val());
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
                                var precio="";
                                var precioTotal="";
                                var estado="N";
                                var unida="";
                                var idDetalle=0;
                                addArticuloTable(idDetalle,idProductoMss.val(),desProductoMss.val(),cantProductoMss.val(),vers,codigoLSr,tipoArtLSr,codl,datl,estado,fecharequerida,unida);
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
            else{
               

                var camposunicos=[];
                var vali="";
              
                for (var i = 0; i < cant ; i++) {
                        var ident="#s_serie"+i;
                        var ident=$(ident);
                        bval = bval && ident.required();
                }
                for (var i = 0; i < cant ; i++) {
                        var ident="#s_serie"+i;
                        var ident=$(ident).val();
                        camposunicos.push(ident);
                }
                for (var i = 0; i < cant ; i++) {
                        var ident="#s_serie"+i;
                        var ident=$(ident).val();
                        var ctr=0;  
                     for (var e in camposunicos ){
                          if(camposunicos[e]==ident){
                             ctr=ctr+1;
                             if(ctr==2){
                                vali=ident;
                                break;
                             }
                          }

                     }
                }  
                if(vali!=""){
                     AlertFactory.textType({
                                title: '',
                                message: 'La serie ' +vali+ ' ya existe en esta lista',
                                type: 'info'
                    });
                    return false;
                }
                var validaSerie="";
                var val="";
                for (var i = 0; i < cant ; i++) {
                        var ident="#s_serie"+i;
                        var ident=$(ident);
                      
                        validaSerie= aartMSN.map(function(index) {
                         if(identSerAr.val()!=''){
                           
                            if(index.serie==ident.val()){
                               
                                  if(index.identificador!=identSerAr.val()){
                                  
                                        if(val==""){
                                        
                                            val=index.serie;
                                        }
                                  }
                            }
                         }else{
                             if(index.serie==ident.val()){
                               if(val==""){
                                    
                                    val=index.serie;
                                }
                             }
                         }   
                       
                      })
                } 
                if(val!=""){
                 AlertFactory.textType({
                                title: '',
                                message: 'La serie ' +val+ ' ya existe en este movimiento',
                                type: 'info'
                    });
                 return false;
                }; 
                  
                if (bval) {
                     camposunicos = camposunicos.join(',');
                     RESTService.get('solicitudCompras/valida_series_serve', camposunicos, function(response) {
                     if (!_.isUndefined(response.status) && response.status) {
                        if(cant==cont_table){
                        if(identSerAr.val()!=""){
                            var updteSN = aartMSN.filter(function(car) {
                             return car.identificador !==identSerAr.val(); 
                            })
                            aartMSN=updteSN;
                            for (var i = 0; i < cant ; i++) {
                                 var grubSN={
                                'identificador': identSerAr.val(),
                                'idProducto':idProductoMss.val(),
                                'serie':$("#s_serie"+i).val(),
                                'chasis':$("#s_chasis"+i).val(),
                                'motor':$("#s_motor"+i).val(),
                                'anio_fabricacion':$("#s_aniof"+i).val(),
                                'anio_modelo':$("#s_aniom"+i).val(),
                                'color':$("#s_color"+i).val(),
                                'idTipoCompraVenta':$("#s_tipoCompra"+i).val(),
                                'nPoliza':$("#s_nroPoliza"+i).val(),
                                'nLoteCompra':$("#s_nroLote"+i).val(),
                                }
                                aartMSN.push(grubSN);
                            }
                            $("#tr_idArticulo"+identSerAr.val()).find("td:eq(1)").children("p").text(cantProductoMss.val());
                            $("#tr_idArticulo"+identSerAr.val()).find("td:eq(1)").children("input").val(cantProductoMss.val());
                            modalSerieR.modal("hide");
                            modalMovimietoArticulo.modal("hide");  

                    }else{
                        var ver ='N';
                        var codigoLr=Math.random().toString(36).substr(2, 18);
                        var tipoArtLr='SN';
                        for (var i = 0; i < cant ; i++) {
                        var grubSN={
                        'identificador': codigoLr,
                        'idProducto':idProductoMss.val(),
                        'serie':$("#s_serie"+i).val(),
                        'chasis':$("#s_chasis"+i).val(),
                        'motor':$("#s_motor"+i).val(),
                        'anio_fabricacion':$("#s_aniof"+i).val(),
                        'anio_modelo':$("#s_aniom"+i).val(),
                        'color':$("#s_color"+i).val(),
                        'idTipoCompraVenta':$("#s_tipoCompra"+i).val(),
                        'nPoliza':$("#s_nroPoliza"+i).val(),
                        'nLoteCompra':$("#s_nroLote"+i).val(),
                        }
                        aartMSN.push(grubSN);
                        }  
                       var codl="";
                       var datl=""; 
                        var codl="";
                        var datl="";
                        var idAlmacen="";
                        var idLocalizacion="";
                        var costo=costoAS.val();
                        var costo_total="";
                        var precio="";
                        var precioTotal="";
                        var estado="N";
                        var unida="";
                        var idDetalle=0;
                       addArticuloTable(idDetalle,idProductoMss.val(),desProductoMss.val(),cantProductoMss.val(),ver,codigoLr,tipoArtLr,codl,datl,estado,fecharequerida,unida);
                       modalSerieR.modal("hide");
                       modalMovimietoArticulo.modal("hide");
                        }
                     }else{
                        AlertFactory.textType({
                        title: '',
                        message: 'Las series  debe ser igual a la cantidad',
                        type: 'info'
                        });
                     }

                     }else {
                        var msg_ = (_.isUndefined(response.message)) ?
                            'No se pudo guardar la Serie. Intente nuevamente.' : response.message;
                        AlertFactory.textType({
                            title: '',
                            message: msg_,
                            type: 'info'
                        });

                        }  
                    }); 
                    
                     
                }
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
                var precio="";
                var precioTotal="";
                var estado="N";
                var unida="";
                var idDetalle=0;
                addArticuloTable(idDetalle,idProductoMll.val(),desProductoMll.val(),cantProductoMll.val(),ver,codigoLr,tipoArtLr,codl,datl,estado,fecharequerida,unida);
                modalLoteR.modal('hide');
                modalMovimietoArticulo.modal('hide');
            }

        }

        $scope.EliminarMovimiento = function(){

            var id=idMovimientoDelete.val();
            console.log("****");
             console.log(idMovimientoDelete.val());
             var estaoel=$("#estadoDelete").val();
             if(estaoel==0){
            RESTService.get('solicitudCompras/delete', id, function(response) {
                 if (!_.isUndefined(response.status) && response.status) {
                        var dta=response.data;
                         AlertFactory.textType({
                            title: '',
                            message: 'El registro se eliminó correctamente',
                            type: 'success'
                        });
                        modalDeleteMovimiento.modal("hide"); 
                        LoadRecordsButtonSolicitudCompra.click();
                    }
               });
            }else{
                modalDeleteMovimiento.modal("hide"); 
                 AlertFactory.textType({
                        title: '',
                        message: 'Solo se puede eliminar compras en estado registrado ',
                        type: 'info'
                }); 

            }

        }

        $scope.addSeleccSerie = function(){
            table_serie_cabecera.html("");
            articulo_serie_det.html("");
           
            var bval = true;
            bval = bval && cantProductoMss.required();
            if (bval) {
                var id=idProductoMss.val()+'*'+cantProductoMss.val();
                RESTService.get('solicitudCompras/validateCantSerie', id, function(response) {
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

        $scope.addArtNada = function() {
            console.log("entro a la función addArtNada");
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
                var idDetalle=0;
                RESTService.get('solicitudCompras/getDataArticulo', idpr, function(response) {
                        var datapro=response.data;
                      addArticuloTable(idDetalle,idProductoMN.val(),desProductoMN.val(),cantProductoMN.val(),ver,codigo,tipoArt,codl,datl,estado,fecharequerida,datapro[0].unidadMedida,obser);
                        modalNada.modal('hide');
                        modalMovimietoArticulo.modal('hide');    
                });
              
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
                    var costo=costoAL.val();
                    var costo_total="";
                    var datl=idProductoML.val()+'*'+cantProductoML.val()+'*'+lotProductoML.val()+'*'+fIngrePrML.val()+'*'+fVenPrML.val();
                    var precio="";
                    var precioTotal="";
                    var estado="N";
                    var unida='';
                    var obser='';
                    var idDetalle=0;
                    addArticuloTable(idDetalle,idProductoML.val(),desProductoML.val(),cantProductoML.val(),ver,codigoLtr,tipolr,codl,datl,estado,fecharequerida,unida,obser);
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
                    $("#tr_idArticulo"+idLoteML2.val()).find("td:eq(1)").children(".m_articulo_cantidad").val(cantProductoML.val());
                    modalLote.modal('hide');
                    modalLoteR.modal('hide');
                    modalMovimietoArticulo.modal('hide');

                }
                console.log(aartML);
                
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
                var precio="";
                var precioTotal="";
                var estado="N";
                var unida="";
                var obser="";
                var idDetalle=0;
                addArticuloTable(idDetalle,idProductoMK.val(),desProductoMK.val(),cantProductoMK.val(),ver,codigo,tipo,codl,datl,estado,fecharequerida,unida,obser);
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
                html2+="<td><select id='s_tipoCompra"+i+"' class='form-control input-sm'></select></td>";
                html2+="<td><input type='text' id='s_nroPoliza"+i+"' class='s_motor form-control input-sm'/></td>";
                html2+="<td><input type='text' id='s_nroLote"+i+"' class='s_color form-control input-sm'/></td>";
                html2+="</tr>";
                articulo_serie_det.append(html2);
                cont_table= cont_table+1;
                $("#s_tipoCompra"+i).append('<option value="" selected>Seleccionar</option>');
                 _.each(tipoCompra, function(item) {
                        $("#s_tipoCompra"+i).append('<option value="'+item.idTipoCompraVenta+'">'+item.descripcion+'</option>');
                });
             }

        }
        function crearTableSerie(){
              var contuni=0;
             aartMSN.map(function(index) {
                            if(index.identificador==identSerAr.val()){
                                var html2="<tr id='tr_idArticulo_"+ idProductoMss.val()+"' ></tr>";
                                html2+="<td>"+desProductoMss.val()+"</td>";
                                html2+="<td><input type='text' id='s_serie"+contuni+"' class='s_serie form-control input-sm' value='"+index.serie+"'/></td>";
                                html2+="<td><input type='text' id='s_chasis"+contuni+"' class='s_chasis form-control input-sm' value='"+index.chasis+"'/></td>";
                                html2+="<td><input type='text' id='s_motor"+contuni+"' class='s_motor form-control input-sm' value='"+index.motor+"'/></td>"; 
                                html2+="<td><input type='text' id='s_color"+contuni+"' class='s_color form-control input-sm' value='"+index.color+"'/></td>";
                                html2+="<td><input type='text' id='s_aniof"+contuni+"' class='s_aniof form-control input-sm' value='"+index.anio_fabricacion+"' onkeypress='return soloNumeros(event)' maxlength='4' /></td>";
                                html2+="<td><input type='text' id='s_aniom"+contuni+"' class='s_aniom form-control input-sm' value='"+index.anio_modelo+"' onkeypress='return soloNumeros(event)' maxlength='4'/></td>";

                                html2+="<td><select id='s_tipoCompra"+contuni+"' class='form-control input-sm'></select></td>";


                                html2+="<td><input type='text' id='s_nroPoliza"+contuni+"' class='s_motor form-control input-sm' value='"+index.nPoliza+"'/></td>";
                                html2+="<td><input type='text' id='s_nroLote"+contuni+"' class='s_color form-control input-sm' value='"+index.nLoteCompra+"'/></td>";
                                html2+="</tr>";

                                articulo_serie_det.append(html2);
                                  $("#s_tipoCompra"+contuni).append('<option value="" selected>Seleccionar</option>');
                                 _.each(tipoCompra, function(item) {
                                        $("#s_tipoCompra"+contuni).append('<option value="'+item.idTipoCompraVenta+'">'+item.descripcion+'</option>');
                                });
                                 $("#s_tipoCompra"+contuni).val(index.idTipoCompraVenta).trigger('change');
                                cont_table= cont_table+1;
                                contuni=contuni+1;
                               


                            }
            });
        }
        function saveMovimientoCab(){
            var bval = true;
            
            // bval = bval && idTipoOperacion.required();
            

            bval = bval && cCodConsecutivo.required();
            bval = bval && fecha_registro.required();
            bval = bval && prioridad.required();
            bval = bval && fecha_requerida.required();
            bval = bval && area.required();  
            // if(!idMoneda.prop("disabled")){
            //     bval = bval && idMoneda.required();
            // }
             if($("#fecha_requerida").val()<$("#fecha_registro").val()){
                 AlertFactory.showWarning({
                    title: '',
                    message: 'La fecha requerida no puede ser menor a fecha registro'
                });
                return false; 
            }
            if (bval) {
                var params = {
                    'idMovimiento': idMovimiento.val(),
                    'estado':0,
                    'cCodConsecutivo': cCodConsecutivo.val(),
                    'nConsecutivo': nConsecutivo.val(),
                    'fecha_registro': fecha_registro.val(),
                    'prioridad': prioridad.val(),
                    'fecha_requerida': fecha_requerida.val(),
                    'observaciones':observaciones.val(),
                    'area': area.val(),
                };
                var movimiento_id = (idMovimiento.val() === '') ? 0 : idMovimiento.val();

                RESTService.updated('solicitudCompras/saveMovimiento', movimiento_id, params, function(response) {
                    if (!_.isUndefined(response.status) && response.status) {
                        titlemodalMovimieto.html('Nueva Solicitud de Compra');
                        AlertFactory.textType({
                            title: '',
                            message: 'El registro se guardó correctamente',
                            type: 'success'
                        });
                        nConsecutivo.val(response.nco);
                        estado.val(response.estado);
                        idMovimiento.val(response.code);
                        idTipoOperacion.prop('disabled',true);
                        idTipoOperacion.trigger('change');
                        btn_movimiento_detalle.prop('disabled',false);
                        btn_movimiento_detalle.trigger('change');
                        LoadRecordsButtonSolicitudCompra.click();
                    } else {
                        AlertFactory.textType({
                            title: '',
                            message: 'Hubo un error al guardar el artículo. Intente nuevamente.',
                            type: 'error'
                        });
                    }
                });
          }

        };
        function newMovimiento()
        {
            titlemodalMovimieto.html('Nueva Solicitud de Compra');
            modalMovimieto.modal('show');
        }
         $scope.addArticulo = function()
        {   
            var bval = true;
            bval = bval && fecha_registro.required();

            bval = bval && $("#prioridad").required();
            bval = bval && $("#fecha_requerida").required();

            bval = bval && $("#area").required();

            if(!idMoneda.prop("disabled")){
                bval = bval && idMoneda.required();
            }
            if (bval) {
                if(idMovimiento.val()==""){
                    saveMovimientoCab(); 
                }
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
            RESTService.all('solicitudCompras/data_form', '', function(response) {
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
                    console.log(response.operaciones);
                    var areato=response.area;
                    var consecutivoto=response.consecutivo;
                    
                    cCodConsecutivo.html("");
                    _.each(response.consecutivo, function (item) {
                        cCodConsecutivo.append('<option value="' + item.cCodConsecutivo + '">' + item.cCodConsecutivo + '</option>');
                    });

                    idTipoOperacion.html("");
                    idTipoOperacion.append('<option value="" selected>Seleccionar</option>');
                     _.each(response.operaciones, function(item) {
                        idTipoOperacion.append('<option value="'+item.IdTipoOperacion+'*'+item.idNaturaleza+'">'+item.descripcion+'</option>');
                    });
                    area.html("");
                    area.append('<option value="" selected>Seleccionar</option>');
                     _.each(response.area, function(item) {
                        area.append('<option value="'+item.id+'">'+item.descripcion+'</option>');
                    }); 
                    idMoneda.html("");
                    idMoneda.append('<option value="" selected>Seleccionar</option>');
                     _.each(response.moneda, function(item) {
                        idMoneda.append('<option  value="'+item.Value+'">'+item.DisplayText+'</option>');
                    });
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
        getDataFormMovement();

        function getDataFormSerie () {
            RESTService.all('series/data_form', '', function(response) {
                if (!_.isUndefined(response.status) && response.status) {
                    tipoCompra=response.tipoCompra
                    //  _.each(response.tipoCompra, function(item) {
                    //     tipoCompra.append('<option value="'+item.idTipoCompraVenta+'">'+item.descripcion+'</option>');
                    // });
                    
                }
            }, function() {
                getDataFormSerie();
            });
        }
        getDataFormSerie();

        var search = getFormSearch('frm-search-SolicitudCompra', 'search_b', 'LoadRecordsButtonSolicitudCompra');

        var table_container_SolicitudCompra = $("#table_container_SolicitudCompra");

        table_container_SolicitudCompra.jtable({
            title: "Lista de Solicitudes Compras",
            paging: true,
            sorting: true,
            actions: { 
                listAction: base_url + '/solicitudCompras/list',
            },
            toolbar: {
                items: [{
                    cssClass: 'buscador',
                    text: search
                },{
                    cssClass: 'btn-primary',
                    text: '<i class="fa fa-file-excel-o"></i> Exportar a Excel',
                    click: function () {
                        $scope.openDoc('solicitudCompras/excel', {});
                    }
                },{
                    cssClass: 'btn-danger-admin',
                    text: '<i class="fa fa-plus"></i> Nuevo Compra',
                    click: function () {
                        newMovimiento();
                    }
                }]
            },
            fields: {
                idMovimiento: {
                    title: '#',
                    key: true,
                    create: false,
                    listClass: 'text-center',
                },
                 cCodConsecutivo: {
                    title: 'Código',
                    
                },
                 nConsecutivo: {
                    title: 'Consecutivo',
                    
                },
                idUsuario: {
                    title: 'Usuario',
                    options: base_url + '/solicitudCompras/getAllUserRegMov' 
                }, 
                estado: {
                    title: 'Estado',
                    values: { '0': 'Registrado', '1': 'Aprobado','2':'C/Orden de Compra','3':'Cerrado','4':'Cancelado' },
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
                        return '<a href="javascript:void(0)" class="edit-serie" data-id="'+data.record.idMovimiento
                            +'" title="Editar"><i class="fa fa-edit fa-1-5x"></i></a>';
                    }

                },Eliminar: {
                    width: '1%',
                    sorting: false,
                    edit: false,
                    create: false,
                    listClass: 'text-center',
                    display: function (data) {
                        return '<a data-target="#" data-estado="'+data.record.estado+'" data-ide="'+data.record.idMovimiento+'"   title="Eliminar" class="jtable-command-button eliminar-movimiento"><i class="fa fa-trash fa-1-5x fa-red"><span>Eliminar</span></i></a>';
                    }
                    
                }

            },
            recordsLoaded: function(event, data) {
                $('.edit-serie').click(function(e){
                    var id = $(this).attr('data-id');

                    findSolicitudCompra(id);
                    e.preventDefault();
                });
                  $('.eliminar-movimiento').click(function(e){
                    var ide = $(this).attr('data-ide');
                    var estadoEli = $(this).attr('data-estado');
                    idMovimientoDelete.val(ide);
                    $("#estadoDelete").val(estadoEli);
                    console.log( idMovimientoDelete.val());
                    modalDeleteMovimiento.modal("show");
                    e.preventDefault();
                });
           }
           
        });

        generateSearchForm('frm-search-SolicitudCompra', 'LoadRecordsButtonSolicitudCompra', function(){
            table_container_SolicitudCompra.jtable('load', {
                search: $('#search_b').val()
            });
        }, true);

        function cargartableMovAr(){
             var search_cc2 = getFormSearch('frm-search-cc2', 'search_cc2', 'LoadRecordsButtonCC2');
         table_container_cc2 = $("#table_container_Register_Articulo");
        table_container_cc2.jtable({
            title: "Lista de Articulos 1",
            paging: true,
            sorting: true,
             cache: false,
            actions: {
                listAction: base_url + '/solicitudCompras/getArticulosSelect'
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

        function cargartableMovAr2(){
             var search_cc22 = getFormSearch('frm-search-cc22', 'search_cc22', 'LoadRecordsButtonCC22');
         table_container_cc2 = $("#table_container_Register_Articulo");
        table_container_cc2.jtable({
            title: "Lista de Articulos",
            paging: true,
            sorting: true,
             cache: false, 
            actions: {
                listAction: base_url + '/solicitudCompras/getArticulosMinKit'
            },
            toolbar: {
                items: [{
                    cssClass: 'buscador',
                    text: search_cc22
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

        generateSearchForm('frm-search-cc22', 'LoadRecordsButtonCC22', function(){
            table_container_cc2.jtable('load', {
                search: $('#search_cc22').val()
            });
        }, false);

        }
        
       

        function cargarTableSerie(idProducto,aarraySe){
            cont_check=0;
            identiSelec="A";
            var search_cc4 = getFormSearch('frm-search-cc4', 'search_cc4', 'LoadRecordsButtonCC4');
            table_container_cc4 = $("#table_container_Series_Articulo");
            var url='getProductoSerie';
            if(naturalezaGeneral=="S"){
                url='getProductoSerieStock';
            };
            table_container_cc4.jtable({
                title: "Lista de Series",
                paging: true,
                sorting: true,
                actions: {
                    listAction: function (postData, jtParams) {
                    return $.Deferred(function ($dfd) {
                        $.ajax({
                            url:  base_url + '/solicitudCompras/'+url,
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
                                console.log("entro");
                                aartMSE.map(function(index) {
                                    if(data.record.serie==index.serie && identSerAr.val()==index.identificador){
                                        ichc='A';
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

        var search_cc3 = getFormSearch('frm-search-cc3', 'search_cc3', 'LoadRecordsButtonCC3');
        var table_container_cc3 = $("#table_container_Almacen_Articulo");
        table_container_cc3.jtable({
            title: "Lista de Articulos 3",
            paging: true,
            sorting: true,
            actions: {
                listAction: function (postData, jtParams) {
                    return $.Deferred(function ($dfd) {
                        $.ajax({  
                            url: base_url + '/lots/getArticulosSelect?jtStartIndex=' + jtParams.jtStartIndex + '&jtPageSize=' + jtParams.jtPageSize + '&jtSorting=' + jtParams.jtSorting,
                            type: 'POST',
                            dataType: 'json',
                            data: postData,
                            success: function (data) {
                                $dfd.resolve(data);
                            },
                            error: function () {
                                $dfd.reject();
                            }
                        });
                    });
                },
            },
            toolbar: {
                items: [{
                    cssClass: 'buscador',
                    text: search_cc3
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
                description: {
                    title: 'Articulos'

                },
                select: {
                    width: '1%',
                    sorting: false,
                    edit: false,
                    create: false,
                    listClass: 'text-center',
                    display: function (data) {
                        return '<a href="javascript:void(0)" title="Seleccionar" class="select_cc" data-name="'+
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
                    var costo=$(this).attr('data-lote');
                    if(idArtSerie.val()!=''){
                         AlertFactory.textType({
                            title: '',
                            message: 'Ya seleccionó un artículo serie',
                            type: 'error'
                        });
                    }else{
                         seleccionarModal(codigo,descripcionArt,idTipoArt,serie,lote,costo); 
                    }
                   
                    e.preventDefault();
                });
            }
        });

        generateSearchForm('frm-search-cc3', 'LoadRecordsButtonCC3', function(){
            table_container_cc3.jtable('load', {
                search: $('#search_cc3').val()
            });
        }, false);

    }


    function Config($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('solicitudCompras', {
                url: '/solicitudCompras',
                templateUrl: base_url + '/templates/solicitudCompras/base.html',
                controller: 'SolicitudCompraCtrl'
            });

        $urlRouterProvider.otherwise('/');
    }
})
();
