/**
 * Created by JAIR on 4/5/2017.
 */

(function () {
    'use strict';
    angular.module('sys.app.entrega_servicesTecnicos')
        .config(Config)
        .controller('Entrega_servicesTecnicoCtrl', Entrega_servicesTecnicoCtrl);

    Config.$inject = ['$stateProvider', '$urlRouterProvider'];
    Entrega_servicesTecnicoCtrl.$inject = ['$scope', '_', 'RESTService', 'AlertFactory'];

    function Entrega_servicesTecnicoCtrl($scope, _, RESTService, AlertFactory) {

        var proformas_completas;
        var codigo_actual; //variable para identificar en que fila voy a gregar lotes o series
        var cCodConsecutivoOS = $("#cCodConsecutivoOS");
        var nConsecutivoOS = $("#nConsecutivoOS");
        var aartML = []; //arrays para guardas lo s datos de lotes
        var acodigos = [];//arrays de codigos;
        var alotML = [];
        var afinML = [];
        var avenML = [];
        var tipoCompra; //variable que contendrá los tipos de  compras
        var aartMK = []; //arrays de id kits
        var aartMLE = [];//arrays lotes exis
        var naturalezaGeneral;
        var aartMSN = [];//ARRAY DE series nueva
        var aartMSE = [];//array series  exis
        var acantMS = [];
        var achasis = [];
        var acolor = [];
        var aaniomodelo = [];
        var aaniofabricacion = [];
        var aaserie = [];
        var idMovimientoDelete = $("#idMovimientoDelete");
        var aartMN = [];//arrays de nada
        var costoMK = $("#costoMK");
        var costoNa = $("#costoNa");
        var costoAS = $("#costoAS");
        var costoAL = $("#costoAL");
        var idTransferenciaProcesar = $("#idTransferenciaProcesar");
        var LocalizacionesSele;//variable para guardar localizaciones del almacen
        var AlmacenesSele;//variable para guardar almacenes
        var btnguardarMovimiento = $("#btn-guardarMovimiento");//btn pata guardar cabecera del movimiento
        var titlemodalMovimieto = $("#titlemodalMovimieto");
        var modalMovimieto = $("#modalMovimieto");
        var idMovimiento = $("#idMovimiento");
        var idTipoOperacion = $("#idTipoOperacion");
        var operacionid;
        var naturalezaid;
        var modalDeleteMovimiento = $("#modalDeleteMovimiento");
        var idMoneda = $("#idMoneda");
        var idAlmacen = $("#idAlmacen");
        var observaciones = $("#observaciones");
        var p_state = $("#p_state");
        var fecha_registro = $("#fecha_registro");
        var modalMovimietoArticulo = $("#modalMovimietoArticulo");
        var titlemodalMovimietoArticulo = $("#titlemodalMovimietoArticulo");
        var modalLote = $("#modalLote");
        var modalSerie = $("#modalSerie");
        var modalKit = $("#modalKit");
        var modalNada = $("#modalNada");
        var articulo_mov_det = $("#articulo_mov_det");
        var modalAlmacenArticulo = $("#modalAlmacenArticulo")
        var idLoteML = $("#idLoteML");
        var idProductoML = $("#idProductoML");
        var desProductoML = $("#desProductoML");
        var cantProductoML = $("#cantProductoML");
        var lotProductoML = $("#lotProductoML");
        var fIngrePrML = $("#fIngrePrML");
        var fVenPrML = $("#fVenPrML");
        var idNaturaleza = $("#idNaturaleza");
        var tablekitdetM = $("#tablekitdetM");
        var cantProductoMK = $("#cantProductoMK");
        var desProductoMK = $("#desProductoMK")
        var idProductoMK = $("#idProductoMK");
        var ident_detalle = $("#ident_detalle");//identificador de cambio en el detalle
        var idSerieMS = $("#idSerieMS");
        var idProductoMS = $("#idProductoMS");
        var desProductoMS = $("#desProductoMS");
        var cantProductoMS = $("#cantProductoMS");
        var colorMS = $("#colorMS");
        var chasisMS = $("#chasisMS");
        var motorMS = $("#motorMS");
        var procesarTransfBoton = $("#ProcesarTransferenciaBoton");
        var anio_modeloMS = $("#anio_modeloMS");
        var anio_fabricacionMS = $("#anio_fabricacionMS");
        var articulo_serie_det = $("#articulo_serie_det");
        var idLoteML2 = $("#idLoteML2");
        var idArtSerie = $("#idArtSerie");
        var cantArtSerie = $("#cantArtSerie");
        var desArtSerie = $("#desArtSerie");
        var s_serie = $(".s_serie");
        var table_container_cc2;
        var table_container_cc22;
        var idProductoMN = $("#idProductoMN");
        var desProductoMN = $("#desProductoMN");
        var cantProductoMN = $("#cantProductoMN");
        var msg_cont_EliminarMovimiento = $("#msg_cont_EliminarMovimiento");
        var tabla_articulo_movi = $("#tabla_articulo_movi");
        var idProductoMll = $("#idProductoMll");
        var desProductoMll = $("#desProductoMll");
        var cantProductoMll = $("#cantProductoMll");
        var modalLoteR = $("#modalLoteR");
        var codigoLoteMll = $("#codigoLoteMll");
        var fechaVl = $("#fechaVl");
        var modalSerieR = $("#modalSerieR");
        var idProductoMss = $("#idProductoMss");
        var desProductoMss = $("#desProductoMss");
        var codigoSerieMss = $("#codigoSerieMss");
        var btn_Lotd = $("#btn_Lotd");
        var cantProductoMss = $("#cantProductoMss");
        var table_container_Series_Articulo = $("#table_container_Series_Articulo");
        var table_serie_cabecera = $("#table_serie_cabecera");
        var articulo_serie_det = $("#articulo_serie_det");
        var btnAgreSer = $("#btnAgreSer");
        var identiSelec = "I";
        var table_container_cc4;
        var btn_serC = $("#btn_serC");
        var cont_check = 0;
        var cont_table = 0;
        var idLoteMll = $("#idLoteMll");
        var idLoteMll2 = $("#idLoteMll2");
        var identSerAr = $("#identSerAr");//identificador para modificar el array de series esxisten
        var btnSeleSerie = $("#btnSeleSerie");
        var idenifcador_table_art = $("#idenifcador_table_art");
        var idenifcador_table_art2 = $("#idenifcador_table_art");
        var btn_movimiento_detalle = $("#btn_movimiento_detalle");
        var modalProcesarTransferencia = $("#modalProcesarTransferencia");
        var msg_cont_ProcesarTransferencia = $("#msg_cont_ProcesarTransferencia");
        var btn_imprimirMovimiento = $("#btn_imprimirMovimiento");
        $('.i-checks').iCheck({
            checkboxClass: 'icheckbox_square-green'
        }).on('ifChanged', function (event) {
            $(event.target).click();
            $scope.chkState();
        });
        function cargar_proformas(esta) {
            if (esta == 'ED') {
                cCodConsecutivoOS.html('');
                cCodConsecutivoOS.append('<option value="">Seleccionar</option>');
                _.each(proformas_completas, function (item) {
                    cCodConsecutivoOS.append('<option value="' + item.cCodConsecutivo + '*' + item.nConsecutivo + '*' + item.IdMoneda + '">' + item.cCodConsecutivo + ' ' + item.nConsecutivo + ' ' + item.razonsocial_cliente + ' ' + item.cPlacaVeh + '</option>');
                });
            } else {
                cCodConsecutivoOS.html('');
                cCodConsecutivoOS.append('<option value="">Seleccionar</option>');
                _.each(proformas_completas, function (item) {
                    if (item.est == '1' || item.est == '3') {
                        cCodConsecutivoOS.append('<option value="' + item.cCodConsecutivo + '*' + item.nConsecutivo + '*' + item.IdMoneda + '">' + item.cCodConsecutivo + ' ' + item.nConsecutivo + ' ' + item.razonsocial_cliente + ' ' + item.cPlacaVeh + '</option>');
                    }
                });
            }

        }
        cCodConsecutivoOS.select2();
        $.fn.modal.Constructor.prototype.enforceFocus = function () { };
        function getDataForProforma() {
            RESTService.all('entrega_servicesTecnicos/data_formProf', '', function (response) {
                if (!_.isUndefined(response.status) && response.status) {

                    proformas_completas = response.proformas_entrega;
                    console.log("aaaaaaaaaaaa");
                    console.log(proformas_completas);
                    console.log("aaaaaaaaaaaa");

                }
            }, function () {
                getDataForProforma();
            });
        }
        getDataForProforma();
        cCodConsecutivoOS.change(function () {
            var val = cCodConsecutivoOS.val();
            var totRep = val.split('*');
            nConsecutivoOS.val(totRep[1]);
            idMoneda.val(totRep[2]);
            if (cCodConsecutivoOS.val() != '') {
                var id = totRep[0] + '_' + totRep[1];
                RESTService.get('entrega_servicesTecnicos/getDetalle_entradaProf', id, function (response) {
                    if (!_.isUndefined(response.status) && response.status) {
                        var data = response.data;
                        var cont = 0;
                        if (idMovimiento.val() == '') {
                            articulo_mov_det.html("");

                            data.map(function (index) {
                                var ver = 'A';
                                var tipo = 'NA';
                                var codl = "";
                                var datl = "";
                                if (index.serie == '1') {
                                    ver = 'N';
                                }
                                if (index.serie == '1') {
                                    tipo = 'SE';
                                } else if (index.lote == '1') {
                                    tipo = 'LE';
                                    codl = index.idLote;
                                }
                                var codl = "";
                                var datl = "";
                                var idAlmacen = "";
                                var idLocalizacion = "";
                                var costo = costoAS.val();
                                var costo_total = "";
                                var precio = "";
                                var precioTotal = "";
                                // add
                                cont = cont + 1;
                                console.log("ejeci _7");
                                var idDetalle = 0;
                                addArticuloTable(idDetalle, index.idProducto,
                                    index.description, Math.trunc(index.nCant),
                                    ver, index.idDetalleRepues, tipo, codl,
                                    datl, idAlmacen,
                                    idLocalizacion,
                                    index.costo,
                                    costo_total,
                                    index.nPrecioUnitario,
                                    precioTotal, Math.trunc(index.nCantidadPendienteEntregar));

                            })
                        }

                    } else {
                        AlertFactory.textType({
                            title: '',
                            message: 'Hubo un error . Intente nuevamente.2',
                            type: 'info'
                        });
                    }
                });
            }
        });
        btn_imprimirMovimiento.click(function (e) {

            var id = idMovimiento.val();
            if (id != '') {
                var str2 = idTipoOperacion.val();
                var complet2 = str2.split("*");
                var nat2 = complet2[1];
                var idtipoOpe = complet2[0];
                var data = {
                    id: id,
                    idtipoOpe: idtipoOpe,

                };
                $scope.loadMovimientoEntregaPDF('entrega_servicesTecnicos/pdfMovemen', data);
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

        btnguardarMovimiento.click(function (e) {
            saveMovimientoCab();
        });

        function cleanmodalProcesarTransferencia() {

            idTransferenciaProcesar.val("");
            msg_cont_ProcesarTransferencia.removeClass('show')
            $("#msg_cont_ProcesarTransferencia p").html("");

        }

        function findRegister_movement(id) {
            titlemodalMovimieto.html('Editar Entrega');

            RESTService.get('entrega_servicesTecnicos/findMovement', id, function (response) {

                if (!_.isUndefined(response.status) && response.status) {
                    console.log("a1");
                    aartMLE = [];
                    aartMSE = [];
                    var verProforma = 'ED';
                    cargar_proformas(verProforma);
                    console.log("a2");
                    var data_p = response.data;
                    var data_ventaMovimiento = response.data_ventaMovimiento;
                    console.log(data_ventaMovimiento);
                    console.log("data_movimiento_info");
                    var mov_ar = '';
                    console.log("a3");
                    var cons = data_p.cCodConsecutivo + '*' + data_p.nConsecutivo + '*' + data_p.idMoneda;
                    idMovimiento.val(data_p.idMovimiento);
                    console.log("primer");
                    console.log("a4");
                    if (data_p.idTipoOperacion == '2') {
                        console.log("a5");
                        $("#idventa").append('<option data-conse="' + data_ventaMovimiento[0].cCon_ve + '*' + data_ventaMovimiento[0].nconse_ve + '*' + data_ventaMovimiento[0].idmoneda + '" data-documento="' + data_ventaMovimiento[0].cCon_ve + '-' + data_ventaMovimiento[0].nconse_ve + '" value="' + data_ventaMovimiento[0].idventa + '">' + data_ventaMovimiento[0].cCon_ve + ' ' + data_ventaMovimiento[0].nconse_ve + ' ' + data_ventaMovimiento[0].razonsocial_cliente + '</option>');
                        console.log("primersss");
                        $("input[name=tipo][value='N']").prop("checked", true);
                        $("input[name=tipo][value='N']").trigger("change");
                        console.log("primersss");
                        // $("#idventa option[value="+data_ventaMovimiento[0].idventa+"]").prop("selected", true);
                        $("#idventa").val(data_ventaMovimiento[0].idventa).trigger("change");
                        // $("#idventa").change(function(event) {
                        //    event.preventDefault();
                        // });
                        mov_ar = response.data_movimiento_Articulo_entrega_venta;

                    } else {
                        console.log("a6");
                        console.log("primersaaaa");
                        cCodConsecutivoOS.append('<option value="' + data_p.cCodConsecutivo + '*' + data_p.nConsecutivo + '*' + data_p.idMoneda + '">' + data_p.cCodConsecutivo + ' ' + data_p.nConsecutivo + ' ' + data_p.razonsocial_cliente + ' ' + data_p.cPlacaVeh + '</option>');
                        cCodConsecutivoOS.val(cons);
                        nConsecutivoOS.val(data_p.nConsecutivo);
                        mov_ar = response.data_movimiento_Articulo_entrega;
                    }
                    console.log("a7");
                    console.log("segundo");

                    $("#idventa").prop('disabled', true);
                    cCodConsecutivoOS.prop('disabled', true);
                    $('input[name=tipo]').attr("disabled", true);
                    titlemodalMovimieto.html('Editar Entrega ' + '[' + data_p.idMovimiento + ']');
                    var lotE = response.data_movimiento_lote;
                    var serE = response.data_movimiento_serie;
                    console.log(lotE);
                    console.log(serE);
                    console.log("fgfg");
                    btn_movimiento_detalle.prop('disabled', false);
                    btn_movimiento_detalle.trigger('change');
                    ident_detalle.val("A");
                    console.log("a8");
                    naturalezaGeneral = data_p.naturaleza;
                    if (lotE != '') {
                        console.log("a9");
                        lotE.map(function (index) {
                            var grubLE = {
                                'identificador': index.consecutivo,
                                'idProducto': index.idArticulo,
                                'idLote': index.idLote,
                                'fecha_vencimiento': index.fechaVencimiento,
                                'codig_lote': index.Lote,
                            }
                            aartMLE.push(grubLE);
                        });
                    }
                    if (serE != '') {
                        serE.map(function (index) {
                            var grubSE = {
                                'identificador': index.identificador,
                                'idProducto': index.idArticulo,
                                'serie': index.nombreSerie,
                                'idSerie': index.idSerie,
                                'cantidad': index.cantiTotal,
                            }
                            aartMSE.push(grubSE);
                        });
                    }
                    console.log(serE);
                    console.log("serey");
                    console.log("a10");
                    console.log(data_p.idTipoOperacion, data_p.naturaleza, 'operacion');
                    idTipoOperacion.val(data_p.idTipoOperacion + '*' + data_p.naturaleza).trigger('change');
                    console.log("a11a");
                    idTipoOperacion.prop('disabled', true);
                    console.log("a12");
                    idTipoOperacion.trigger('change');

                    idMoneda.val(data_p.idMoneda).trigger('change');
                    fecha_registro.val(data_p.fecha_registro);
                    observaciones.val(data_p.observaciones);
                    console.log("a11");
                    if (data_p.estado == 0) {
                        p_state.val(0).trigger("change");
                    }
                    if (data_p.estado == 1) {
                        p_state.val(1).trigger("change");
                    }
                    if (p_state.val() == 1) {
                        procesarTransfBoton.prop('disabled', true);
                        procesarTransfBoton.trigger('change');
                        btnguardarMovimiento.prop('disabled', true);
                        btnguardarMovimiento.trigger('change');
                        btn_movimiento_detalle.prop('disabled', true);
                        btn_movimiento_detalle.trigger('change');
                    } else {
                        procesarTransfBoton.prop('disabled', false);
                        procesarTransfBoton.trigger('change');
                        btnguardarMovimiento.prop('disabled', false);
                        btnguardarMovimiento.trigger('change');
                        btn_movimiento_detalle.prop('disabled', false);
                        btn_movimiento_detalle.trigger('change');
                    }


                    if (p_state.val() == 0) {
                        procesarTransfBoton.prop('disabled', false);
                        procesarTransfBoton.trigger('change');
                    } else {
                        procesarTransfBoton.prop('disabled', true);
                        procesarTransfBoton.trigger('change');
                    }

                    modalMovimieto.modal("show");
                    articulo_mov_det.html("");

                    var conta = 0;
                    mov_ar.map(function (index) {
                        conta = conta + 1;
                        var ver = 'A';
                        var tipo = 'NA';
                        var codl = "";
                        var datl = "";
                        if (index.serie == '1') {
                            ver = 'N';
                        }
                        if (index.serie == '1') {
                            tipo = 'SE';
                        } else if (index.lote == '1') {
                            tipo = 'LE';
                            codl = index.idLote;
                        }
                        var idLoteEnviar = index.idLote;
                        if (index.idLote == null) {
                            idLoteEnviar = '';
                        }
                        var idCodLoteEnviar = index.cod_lote;
                        if (index.cod_lote == null) {
                            idCodLoteEnviar = '';
                        }
                        console.log(idCodLoteEnviar);
                        console.log(idLoteEnviar);



                        addArticuloTable(index.consecutivo, index.idArticulo,
                            index.description, Math.trunc(index.cantidad),
                            ver, index.consecutivo, tipo, idLoteEnviar,
                            idCodLoteEnviar,
                            index.idAlmacen,
                            index.idLocalizacion,
                            index.costo2,
                            index.costo_total,
                            index.precio,
                            index.precio_total,
                            Math.trunc(index.nCantidadPendienteEntregar));
                    })



                } else {
                    AlertFactory.textType({
                        title: '',
                        message: 'Hubo un error al obtener el Artículo. Intente nuevamente.',
                        type: 'error'
                    });
                }
            });
        }
        function cleanArtLote() {
            idLoteML.val('');
            idLoteML2.val('');
            idProductoML.val('');
            desProductoML.val('');
            cantProductoML.val('');
            lotProductoML.val('');
            fIngrePrML.val('');
            fVenPrML.val('');
        }
        function cleanArtNada() {
            idProductoMN.val("");
            desProductoMN.val("");
            cantProductoMN.val("");

        }
        function cleanArtLotell() {
            idProductoMll.val("");
            desProductoMll.val("");
            cantProductoMll.val("");
            codigoLoteMll.val("");
            fechaVl.val("");
            btn_Lotd.prop('disabled', true);
            btn_Lotd.trigger('change');
            codigoLoteMll.prop("readonly", false);
            codigoLoteMll.trigger('change');
            idLoteMll.val("");
            idLoteMll2.val("");
        }
        function cleanDeleteMovimiento() {

            idMovimientoDelete.val("");
            msg_cont_EliminarMovimiento.removeClass('show')
            $("#msg_cont_EliminarMovimiento p").html("");

        }
        function cleanArtSeriess() {
            idProductoMss.val("");
            desProductoMss.val("");
            cantProductoMss.val("");
            btnSeleSerie.prop('disabled', false);
            btnSeleSerie.trigger('change');
            identSerAr.val("");
            if (identiSelec == "A") {
                table_container_cc4.jtable('destroy');
                identiSelec = "I";
            }
            table_serie_cabecera.html("");
            articulo_serie_det.html("");
            btn_serC.prop('disabled', true);
            btn_serC.trigger('change');

        }
        function cleanArtSerie() {
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
        function cleanArtKit() {
            tablekitdetM.html("");
            cantProductoMK.val('');
            desProductoMK.val('');
            idProductoMK.val('');
        }
        function cleanMovimiento() {
            cleanRequired();
            cCodConsecutivoOS.val("").trigger("change");
            nConsecutivoOS.val("");
            titlemodalMovimieto.html('');
            idMovimiento.val('');
            idMoneda.val('');
            ident_detalle.val('');
            aartML = [];
            acodigos = [];
            aartMK = [];
            aartMLE = [];
            aartMSN = [];
            aartMSE = [];
            aartMN = [];
            observaciones.val('');
            idNaturaleza.val('');
            fecha_registro.val('');
            p_state.val('');
            articulo_mov_det.html('');
            cCodConsecutivoOS.prop('disabled', false);
            $("#idventa").prop('disabled', false);
            $('input[name=tipo]').attr("disabled", false);
            btnguardarMovimiento.prop('disabled', false);
            btn_movimiento_detalle.prop('disabled', false);
            btnguardarMovimiento.trigger('change');
            procesarTransfBoton.prop('disabled', true);
            procesarTransfBoton.trigger('change');
            var verProforma = 'CR';
            cargar_proformas(verProforma);
        }
        function cleanMovimientoArticulo() {
            articulo_serie_det.html('');
            idArtSerie.val('');
            cantArtSerie.val('');
            desArtSerie.val('');


        }
        modalProcesarTransferencia.on('hidden.bs.modal', function (e) {
            cleanmodalProcesarTransferencia();
        });


        codigoLoteMll.keypress(function (e) {

            var code = (e.keyCode ? e.keyCode : e.which);
            if (code == 13) {
                if (idLoteMll2.val() == "") {

                    getlotes();
                }

            }
        });
        cantProductoMK.keypress(function (e) {
            var code = (e.keyCode ? e.keyCode : e.which);
            if (code == 13) {
                addArtkit();
            }
        });
        cantProductoMN.keypress(function (e) {
            var code = (e.keyCode ? e.keyCode : e.which);
            if (code == 13) {
                addArtNada();
            }
        });
        function getlotes() {
            var id = codigoLoteMll.val();
            if (id != '') {
                RESTService.get('entrega_servicesTecnicos/validateLoteMovement', id, function (response) {
                    if (!_.isUndefined(response.status) && response.status) {
                        if (response.data == "N") {
                            if (naturalezaGeneral == "S" || naturalezaGeneral == 'R') {
                                AlertFactory.textType({
                                    title: '',
                                    message: 'No existe Lote . Intente nuevamente.',
                                    type: 'info'
                                });
                            } else {
                                lotProductoML.val(codigoLoteMll.val());
                                idProductoML.val(idProductoMll.val());
                                desProductoML.val(desProductoMll.val());
                                modalLote.modal("show");

                            }
                        } else {

                            $("#idLEn" + codigo_actual).val(response.codigol);

                            fechaVl.val(response.fecha);
                            idLoteMll.val(response.codigol);
                            btn_Lotd.prop('disabled', false);
                            // codigoLoteMll.prop("readonly",true);
                            codigoLoteMll.trigger('change');
                            btn_Lotd.trigger('change');
                            $("#btn_ver" + codigo_actual).attr('data-lote', codigoLoteMll.val());
                            $("#id_check" + codigo_actual).prop("checked", true);
                            $('.i-checks').iCheck({
                                checkboxClass: 'icheckbox_square-green'
                            }).on('ifChanged', function (event) {
                                $(event.target).click();

                            });
                            // addArticuloTable(idProductoMll.val(),desProductoMll.val(),cantProductoMll.val(),ver,codigoLr,tipoArtLr,codl,datl,idAlmacen,idLocalizacion,costo,costo_total,precio,precioTotal);
                            modalLoteR.modal('hide');
                            modalMovimietoArticulo.modal('hide');

                        }

                    } else {
                        AlertFactory.textType({
                            title: '',
                            message: 'Hubo un error . Intente nuevamente.3',
                            type: 'info'
                        });
                    }

                });
            }

        }
        $('#ProcesarTransferenciaBoton').click(function (e) {
            var id = idMovimiento.val();
            if (articulo_mov_det.html() != "") {
                RESTService.get('entrega_servicesTecnicos/validaDetalleMovement', id, function (response) {
                    if (!_.isUndefined(response.status) && response.status) {
                        var ide = idMovimiento.val();
                        idTransferenciaProcesar.val(ide);
                        modalProcesarTransferencia.modal("show");

                        e.preventDefault();
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

            } else {
                AlertFactory.textType({
                    title: '',
                    message: 'Debe registrar Articulos en este movimiento. Intente nuevamente.',
                    type: 'info'
                });

            }

        });
        $scope.ProcesarTransferencia = function () {
            var id = idTransferenciaProcesar.val();
            RESTService.get('entrega_servicesTecnicos/procesarTransferenciaMovement', id, function (response) {
                if (!_.isUndefined(response.status) && response.status) {
                    var dta = response.data;
                    if (dta[0]['Mensaje'] == "OK") {
                        AlertFactory.textType({
                            title: '',
                            message: 'El registro se procesó con exitó',
                            type: 'success'
                        });
                        p_state.val(1);
                        procesarTransfBoton.prop('disabled', true);
                        procesarTransfBoton.trigger('change');
                        btnguardarMovimiento.prop('disabled', true);
                        btnguardarMovimiento.trigger('change');
                        btn_movimiento_detalle.prop('disabled', true);
                        btn_movimiento_detalle.trigger('change');
                        modalProcesarTransferencia.modal("hide");
                        LoadRecordsButtonRegister_Movement.click();
                    } else {
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
        function seleccionarModal(codigo, descripcionArt, idTipoArt, serie, lote, costo) {
            if (idTipoArt == '3') {
                modalKit.modal('show');
                $('#cantProductoMK').attr('onkeypress', 'return soloNumeros(event)');
                desProductoMK.val(descripcionArt);
                idProductoMK.val(codigo);
                costoMK.val(costo);
            } else if (serie == '1') {
                // $('#cantProductoMS').attr('onkeypress','return soloNumeros(event)');
                // $('#anio_modeloMS').attr('onkeypress','return soloNumeros(event)');
                // $('#anio_fabricacionMS').attr('onkeypress','return soloNumeros(event)');
                desProductoMss.val(descripcionArt);
                idProductoMss.val(codigo);
                var str2 = idTipoOperacion.val();
                var complet2 = str2.split("*");
                var nat2 = complet2[1];
                costoAS.val(costo);
                if (nat2 == 'S') {

                    btnAgreSer.prop('disabled', true);
                    btnAgreSer.trigger('change');
                } else {
                    btnAgreSer.prop('disabled', false);
                    btnAgreSer.trigger('change');
                }
                modalSerieR.modal('show');
            } else if (lote == '1') {
                modalLoteR.modal('show');
                idProductoMll.val(codigo);
                desProductoMll.val(descripcionArt);
                costoAL.val(costo);
            } else {
                $('#cantProductoMN').attr('onkeypress', 'return soloNumeros(event)');
                idProductoMN.val(codigo);
                desProductoMN.val(descripcionArt);
                modalNada.modal('show');
                costoNa.val(costo);

            }

        }
        function addToKit(idArticulo, descripcion, cantidad) {

            var tr = $('<tr id="tr_idArticulo' + idArticulo + '"></tr>');
            var td1 = $('<td>' + descripcion + '</td>');
            var td2 = $('<td class="text-center" >' + cantidad + '</td>');
            tr.append(td1).append(td2);
            tablekitdetM.append(tr);
        }
        function getkitDet(codigo) {
            RESTService.get('entrega_servicesTecnicos/getKitMovement', codigo, function (response) {
                if (!_.isUndefined(response.status) && response.status) {
                    var data_p = response.data;
                    _.each(data_p, function (c) {
                        addToKit(c.idArticulo, c.description, Math.trunc(c.cantidad));
                    });
                } else {
                    AlertFactory.textType({
                        title: '',
                        message: 'Hubo un error . Intente nuevamente.4',
                        type: 'error'
                    });
                }

            });
        }
        function getLocalizacion(idAlmacen) {
            var id = idAlmacen;
            RESTService.get('getLocalizacionSelecMovement/getLocalizacionSelecMovement', id, function (response) {
                if (!_.isUndefined(response.status) && response.status) {
                    LocalizacionesSele = response.data;
                } else {
                    AlertFactory.textType({
                        title: '',
                        message: 'No se pudo  obtener las Localizaciones. Intente nuevamente.',
                        type: 'info'
                    });
                }

            });
        }
        function addlocSele(codigo) {
            var idLocali = $("#" + codigo);
            idLocali.append('<option value="" selected>Seleccionar</option>');
            _.each(LocalizacionesSele, function (item) {
                idLocali.append('<option value="' + item.idLocalizacion + '" >' + item.descripcion + '</option>');
            });

        }
        function addAlmaSelec(codigo) {

            var idAlmacenSele = $("#Al_" + codigo);
            idAlmacenSele.append('<option value="" selected>Seleccionar</option>');
            _.each(AlmacenesSele, function (item) {
                idAlmacenSele.append('<option value="' + item.idAlmacen + '" >' + item.descripcion + '</option>');
            });
        }
        // function getStock(idl,idAl){
        //      var id=idl+','+idAl;
        //      RESTService.get('register_movements/getStockLoc', id, function(response) {
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
        function getLocaStock(idl, ident, idPrAl, idLocalizacion) {
            var idLocali = $("#" + ident);
            var id = idl;
            RESTService.get('entrega_servicesTecnicos/getLocaStockMovement', id, function (response) {
                if (!_.isUndefined(response.status) && response.status) {

                    idLocali.html('');
                    idLocali.append('<option value="" selected>Seleccionar</option>');
                    _.each(response.LocalizacionAlmacen, function (itemdos) {
                        var stock = 0;
                        _.each(response.data, function (item) {
                            if (idPrAl == item.idArticulo && itemdos.idLocalizacion == item.idLocalizacion) {
                                stock = Math.trunc(item.disponible);
                            }
                        });
                        if (naturalezaGeneral == "S" || naturalezaGeneral == "R") {
                            if (stock > 0) {
                                if (itemdos.idLocalizacion == idLocalizacion) {
                                    idLocali.append('<option selected value="' + itemdos.idLocalizacion + '" >' + itemdos.descripcion + ' / ' + stock + '</option>');
                                } else {
                                    idLocali.append('<option value="' + itemdos.idLocalizacion + '" >' + itemdos.descripcion + ' / ' + stock + '</option>');
                                }
                            }
                        } else {
                            if (itemdos.idLocalizacion == idLocalizacion) {

                                idLocali.append('<option selected value="' + itemdos.idLocalizacion + '" >' + itemdos.descripcion + ' / ' + stock + '</option>');
                            } else {

                                idLocali.append('<option value="' + itemdos.idLocalizacion + '" >' + itemdos.descripcion + ' / ' + stock + '</option>');
                            }
                        }
                    });
                } else {
                    if (naturalezaGeneral != 'C') {

                        AlertFactory.textType({
                            title: '',
                            message: 'No se pudo obtener las Localizaciones. Intente nuevamente.',
                            type: 'info'
                        });
                    }
                }

            });
        }
        $scope.guardarMovimientoDetalle = function () {
            var bval = true;
            if (idTipoOperacion.val() == '2*S') {
                bval = bval && $("#idventa").required();
            } else {
                bval = bval && cCodConsecutivoOS.required();
            }
            bval = bval && fecha_registro.required();
            var iChe = 'I';
            var cont_se = 0;//contador de check de lotes y series
            var cont_che = 0;// contador de check selecionados
            $(".check_val").each(function () {
                cont_se = cont_se + 1
                if ($(this).prop('checked')) {
                    cont_che = cont_che + 1;
                }
            });

            if (bval && articulo_mov_det.html() === '') {
                AlertFactory.showWarning({
                    title: '',
                    message: 'Debe agregar mínimo 1 Artículo'
                });
                return false;
            }
            if (naturalezaGeneral == "C") {
                acodigos.forEach(function (val, index) {
                    var cosr = $('#cosMs_' + val);
                    bval = bval && cosr.required();
                });
            } else {
                acodigos.forEach(function (val, index) {
                    var idAr = $('#Al_' + val);
                    var idLr = $('#' + val);
                    var canr = $('#canMs_' + val);
                    var cosr = $('#cosMs_' + val);
                    bval = bval && idAr.required();
                    bval = bval && idLr.required();
                    bval = bval && canr.required();
                    bval = bval && cosr.required();
                });
            }

            var precirIn = 'A';
            if (naturalezaGeneral == "S" || naturalezaGeneral == "A") {
                acodigos.forEach(function (val, index) {
                    var preM = $('#preMs_' + val);
                    bval = bval && preM.required();
                });

                acodigos.forEach(function (val, index) {
                    var cosr = $('#preMs_' + val).val();
                    if (cosr <= 0) {
                        precirIn = 'I';
                    }

                })
            };
            if (precirIn == 'I') {
                AlertFactory.showWarning({
                    title: '',
                    message: 'El precio de los artículos no puede ser menor a cero'
                });
                precirIn = 'A';
                return false;
            }
            var cosrIn = 'A';
            acodigos.forEach(function (val, index) {
                var cosr = $('#cosMs_' + val).val();
                if (cosr <= 0) {
                    cosrIn = 'I';
                }

            })
            if (cosrIn == 'I') {
                AlertFactory.showWarning({
                    title: '',
                    message: 'El costo de los artículos no puede ser menor a cero'
                });
                cosrIn = 'A';
                return false;
            }
            var cantrIn = 'A';
            if (naturalezaGeneral != "C") {
                acodigos.forEach(function (val, index) {
                    var cantEn = $('#canMs_' + val).val();
                    if (cantEn < 1) {
                        cantrIn = 'I';
                    }

                });
            };
            if (cantrIn == 'I') {
                AlertFactory.showWarning({
                    title: '',
                    message: 'La cantidad de los Articulos no puede ser cero'
                });
                cantrIn = 'A';
                return false;
            }

            if (cont_che != cont_se) {
                bval = false;
                AlertFactory.showWarning({
                    title: '',
                    message: 'Debe seleccionar serie o lote para los productos'
                });
                return false;

            };

            acodigos.forEach(function (val, index) {
                var cantP = $('#canMs_' + val).val();
                var CantV = $('#id_pendi' + val).val();

                if (Number(cantP) > Number(CantV)) {
                    AlertFactory.showWarning({
                        title: '',
                        message: 'La cantidad ingresada no puede ser mayor a la cantidad pendiente ',
                    });
                    bval = false;
                }
            });


            if (bval) {

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

                var idalpretEnv = [];
                $.each($('.m_articulo_precio'), function (idx, item) {
                    idalpretEnv[idx] = $(item).val();
                });

                idalpretEnv = idalpretEnv.join(',');

                var idalPrtolEnv = [];
                $.each($('.m_articulo_precioTotal'), function (idx, item) {
                    idalPrtolEnv[idx] = $(item).val();
                });

                idalPrtolEnv = idalPrtolEnv.join(',');

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
                var serieSe = [];
                var idSerieSe = [];
                var cont = 0;
                var ident_serie_bd_serie = [];
                aartMSE.map(function (index) {
                    ident_serie_bd_serie[cont] = index.identificador;
                    idProductoSe[cont] = index.idProducto;
                    serieSe[cont] = index.serie;
                    idSerieSe[cont] = index.idSerie;
                    cont = cont + 1;
                })

                ident_serie_bd_serie = ident_serie_bd_serie.join(",");
                idProductoSe = idProductoSe.join(',');
                serieSe = serieSe.join(',');
                idSerieSe = idSerieSe.join(',');
                console.log(aartMSE);
                console.log(ident_serie_bd_serie);
                console.log(identificador_serie_bd);
                console.log("sss");


                var serieNenv = [];
                var idProductoSeN = [];
                var chasiNs = [];
                var motorNs = [];
                var anioNFs = [];
                var anioNVs = [];
                var colorNs = [];
                var idTipoCompraVenta = [];
                var nPoliza = [];
                var nLoteCompra = [];
                var cont2 = 0;
                var ident_serie_bd_serie2 = [];
                aartMSN.map(function (index) {
                    ident_serie_bd_serie2[cont2] = index.identificador;
                    serieNenv[cont2] = index.serie;
                    idProductoSeN[cont2] = index.idProducto;
                    chasiNs[cont2] = index.chasis;
                    motorNs[cont2] = index.motor;
                    anioNFs[cont2] = index.anio_fabricacion;
                    anioNVs[cont2] = index.anio_modelo;
                    colorNs[cont2] = index.color;
                    idTipoCompraVenta[cont2] = index.idTipoCompraVenta;
                    nPoliza[cont2] = index.nPoliza;
                    nLoteCompra[cont2] = index.nLoteCompra;
                    cont2 = cont2 + 1;
                })
                serieNenv = serieNenv.join(',');
                idProductoSeN = idProductoSeN.join(',');
                chasiNs = chasiNs.join(',');
                motorNs = motorNs.join(',');
                anioNFs = anioNFs.join(',');
                anioNVs = anioNVs.join(',');
                colorNs = colorNs.join(',');
                idTipoCompraVenta = idTipoCompraVenta.join(',');
                nPoliza = nPoliza.join(',');
                nLoteCompra = nLoteCompra.join(',');
                ident_serie_bd_serie2 = ident_serie_bd_serie2.join(",");
                var ident_det = "";
                if (articulo_mov_det.html() != '') {
                    ident_det = "A";
                };

                var params = {
                    'art_nada': aartMN,
                    'idArticulo': idartEnv,
                    'idAlmacen': idalmaEnv,
                    'idLocalizacion': idalLocEnv,
                    'cantidad': idalcantEnv,
                    'costo': idalcostEnv,
                    'costo_total': idalcostotalEnv,
                    'precio': idalpretEnv,
                    'precio_total': idalPrtolEnv,
                    'idLote': idloteEnvi,
                    'dataLote': datloteEnvi,

                    'idProductoSe': idProductoSe,
                    'serieSe': serieSe,
                    'idSerieSe': idSerieSe,
                    'serieNenv': serieNenv,
                    'idProductoSeN': idProductoSeN,
                    'chasiNs': chasiNs,
                    'motorNs': motorNs,
                    'anioNFs': anioNFs,
                    'anioNVs': anioNVs,
                    'colorNs': colorNs,
                    'ident_detalle': ident_det,
                    'idTipoCompraVenta': idTipoCompraVenta,
                    'nPoliza': nPoliza,
                    'nLoteCompra': nLoteCompra,
                    'identificador_serie_bd': identificador_serie_bd,
                    'ident_serie_bd_serie2': ident_serie_bd_serie2,
                    'ident_serie_bd_serie': ident_serie_bd_serie,
                    'naturaleza': naturalezaGeneral,
                };

                var str = idTipoOperacion.val();
                var complet = str.split("*");
                var idTO = complet[0];
                var nat = complet[1];
                naturalezaGeneral = nat;
                var val = cCodConsecutivoOS.val();
                var conse = '';
                var ncons = '';
                if (idTipoOperacion.val() == '2*S') {
                    var documentocons = $('#idventa').find(':selected').data('conse');
                    var conTO = documentocons.split('*');
                    conse = conTO[0];
                    ncons = conTO[1]

                } else {
                    var totRep = val.split('*');
                    conse = totRep[0];
                    ncons = totRep[1];
                }

                var paramsCabezera = {
                    'idMovimiento': idMovimiento.val(),
                    'estado': 0,
                    'fecha_registro': fecha_registro.val(),
                    'idMoneda': idMoneda.val(),
                    'observaciones': observaciones.val(),
                    'idTipoOperacion': idTO,
                    'nConsecutivo': ncons,
                    'cCodConsecutivo': conse,
                    'art_nada': aartMN,
                    'idArticulo': idartEnv,
                    'idAlmacen': idalmaEnv,
                    'idLocalizacion': idalLocEnv,
                    'cantidad': idalcantEnv,
                    'costo': idalcostEnv,
                    'costo_total': idalcostotalEnv,
                    'precio': idalpretEnv,
                    'precio_total': idalPrtolEnv,
                    'idLote': idloteEnvi,
                    'dataLote': datloteEnvi,

                    'idProductoSe': idProductoSe,
                    'serieSe': serieSe,
                    'idSerieSe': idSerieSe,
                    'serieNenv': serieNenv,
                    'idProductoSeN': idProductoSeN,
                    'chasiNs': chasiNs,
                    'motorNs': motorNs,
                    'anioNFs': anioNFs,
                    'anioNVs': anioNVs,
                    'colorNs': colorNs,
                    'ident_detalle': ident_det,
                    'idTipoCompraVenta': idTipoCompraVenta,
                    'nPoliza': nPoliza,
                    'nLoteCompra': nLoteCompra,
                    'identificador_serie_bd': identificador_serie_bd,
                    'ident_serie_bd_serie2': ident_serie_bd_serie2,
                    'ident_serie_bd_serie': ident_serie_bd_serie,
                    'naturaleza': naturalezaGeneral,
                };
                var movimiento_id = (idMovimiento.val() === '') ? 0 : idMovimiento.val();
                console.log("bbbbbbbbbbbbbbbbbb");
                console.log(paramsCabezera);
                console.log("aaaaaaaaaaaaaaaaaa");
                RESTService.updated('entrega_servicesTecnicos/saveEntrega', movimiento_id, paramsCabezera, function (response) {
                    if (!_.isUndefined(response.status) && response.status) {
                        titlemodalMovimieto.html('Nueva Entrega ' + '[' + response.code + ']');
                        AlertFactory.textType({
                            title: '',
                            message: 'El registro se guardó correctamente',
                            type: 'success'
                        });
                        cCodConsecutivoOS.prop('disabled', true);
                        $("#idventa").prop('disabled', true);
                        procesarTransfBoton.prop('disabled', false);
                        procesarTransfBoton.trigger('change');

                        var natudata = idTipoOperacion.val();
                        var co = natudata.split('*');
                        var na = co[1];
                        idNaturaleza.val(na);
                        idMovimiento.val(response.code);
                        p_state.val(response.estado).trigger('change');
                        btn_movimiento_detalle.prop('disabled', false);
                        btn_movimiento_detalle.trigger('change');
                        findRegister_movement(response.code);
                        LoadRecordsButtonRegister_Movement.click();
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

                // var id_Movimiento = (idMovimiento.val() === '') ? 0 : idMovimiento.val();
                // RESTService.updated('register_movements/saveMovimientArticulo',id_Movimiento, params, function(response) {
                //     if (!_.isUndefined(response.status) && response.status) {
                //         AlertFactory.textType({
                //             title: '',
                //             message: 'El registro se guardó correctamente',
                //             type: 'success'
                //         });
                //         procesarTransfBoton.prop('disabled',false);
                //         procesarTransfBoton.trigger('change');
                //          LoadRecordsButtonRegister_Movement.click();
                //     } else {
                //         var msg_ = (_.isUndefined(response.message)) ?
                //             'No se pudo guardar el movimiento. Intente nuevamente.' : response.message;
                //         AlertFactory.textType({
                //             title: '',
                //             message: msg_,
                //             type: 'info'
                //         });
                //     }
                // });

            }
        }

        function addArticuloTable(idDetalle, idProducto, desProducto, cantProducto, ver, codigo, tipo, codl, datl, idAlmacen, idLocalizacion, costo, costo_total, precio, presio_total, cantidaPD) {
            acodigos.push(codigo);

            var costonew = 0;
            var precionew = 0;

            if (costo != 0 || costo != "") {
                costonew = Number(costo);
            };
            if (precio != 0 || precio != "") {
                precionew = Number(precio);
            };

            var impor = Number(cantProducto) * Number(costonew);
            var pretotal = Number(cantProducto) * Number(precionew);
            if (naturalezaGeneral == "C") {
                impor = 0;
            }
            var tr = $('<tr id="tr_idArticulo' + codigo + '"></tr>');
            var td1 = $('<td>' + desProducto + '</td>');


            var td3;
            var inp3;
            if (naturalezaGeneral == "S" || naturalezaGeneral == 'R' || naturalezaGeneral == "A") {
                var tdpr = $('<td></td>');
                var inpr = $('<input type="number" id="preMs_' + codigo + '" min="1" class="m_articulo_precio form-control input-sm" value="' + precionew + '" readonly/>');
            } else {
                precionew = "";
                var tdpr = $('<td><p>' + precionew + '</p></td>');
                var inpr = $('<input type="hidden" id="preMs_' + codigo + '" min="1" class="m_articulo_precio form-control input-sm" value="' + precionew + '" />');
            }

            if (naturalezaGeneral == "E" || naturalezaGeneral == "C") {
                var td4 = $('<td></td>');
                var inp4 = $('<input type="number" id="cosMs_' + codigo + '" min="1" class="m_articulo_costo form-control input-sm" value="' + costonew + '" />');
            } else {
                var td4 = $('<td><p>' + costonew + '</p></td>');
                var inp4 = $('<input type="hidden" id="cosMs_' + codigo + '" min="1" class="m_articulo_costo form-control input-sm" value="' + costonew + '" />');
            }

            if (naturalezaGeneral == "C") {
                var tdy = $('<td></td>');
                var td2 = $('<td></td>');
                var inpy = $('<select  data-arts="' + idProducto + '" id="Al_' + codigo + '" data-idAraAl="' + codigo + '" class="m_articulo_idAlm form-control input-sm" disabled></select>');
                var inpl = $('<select id="' + codigo + '" data-idArl="' + idProducto + '" class="m_articulo_idLoc form-control input-sm" disabled ></select>');
                var td3 = $('<td><p></p></td>');
                var inp3 = $('<input type="hidden" id="canMs_' + codigo + '" class="m_articulo_cantidad" value="0" />');
            } else {
                if (ver == 'A') {
                    var td3 = $('<td class="text-center"></td>');
                    var inp3 = $('<input type="text" id="canMs_' + codigo + '" onkeypress="return soloNumeros(event)" class="m_articulo_cantidad form-control input-sm" value="' + cantProducto + '" />');
                } else {
                    var td3 = $('<td><p>' + cantProducto + '</p></td>');
                    var inp3 = $('<input type="hidden" id="canMs_' + codigo + '" class="m_articulo_cantidad" value="' + cantProducto + '" />');
                }
                var td2 = $('<td></td>');
                var tdy = $('<td></td>');
                var inpy = $('<select  data-arts="' + idProducto + '" id="Al_' + codigo + '" data-idAraAl="' + codigo + '" class="m_articulo_idAlm form-control input-sm"></select>');
                var inpl = $('<select id="' + codigo + '" data-idArl="' + idProducto + '" class="m_articulo_idLoc form-control input-sm"></select>');

            }


            var td5 = $('<td><p>' + impor.toFixed(2) + '</p></td>');
            // var tdpreT = $('<td><p>'+pretotal.toFixed(2) +'</p></td>');
            var tdCantPen = $('<td><p>' + cantidaPD + '</p></td>');
            var inp = $('<input type="hidden" class="m_articulo_id" value="' + idProducto + '" />');
            var inPendiente = $('<input type="hidden" id="id_pendi' + codigo + '" class="" value="' + cantidaPD + '" />');
            var inp5 = $('<input type="hidden" class="m_articulo_costoTotal" value="' + impor.toFixed(2) + '" />');
            var inpPreTo = $('<input type="hidden" class="m_articulo_precioTotal" value="' + pretotal.toFixed(2) + '" />');
            var inpPend = $('<input type="hidden" class="m_pendiente_entregar" value="' + pretotal.toFixed(2) + '" />');
            var checkeado = '';
            if (tipo == 'NA' || idAlmacen != '') {
                checkeado = 'checked';
            };
            var tdCheck = $('<td><label class="checkbox-inline i-checks idRevision"><input id="" class="id_RevisionDet"  type="hidden" value="0" ><input id="id_check' + codigo + '" class="check_val"  type="checkbox" ' + checkeado + ' disabled></label></td>');
            var op = $('<option value="" selected>Seleccione</option>');
            var fclt = $('<input type="hidden" id="idLEn' + codigo + '"  class="m_codigo_lote" value="' + codl + '" />');
            var fdlt = $('<input type="hidden" class="m_dato_lote" value="' + datl + '" />');
            var identificador_serie_bd = $('<input type="hidden" class="identificador_serie_bd" value="' + codigo + '" />');
            td1.append(inp).append(fclt).append(fdlt).append(identificador_serie_bd);;
            td2.append(inpy);
            tdy.append(inpl);
            td3.append(inp3);
            td4.append(inp4);
            td5.append(inp5);
            tdpr.append(inpr).append(inpPreTo);
            tdCantPen.append(inpPend).append(inPendiente);
            // tdpreT
            var td6 = $('<td class="text-center"></td>');
            var btn1 = $('<button class="btn btn-info btn-xs verUpdate" id="btn_ver' + codigo + '" title="añadir" data-cantiShow="' + cantProducto + '" data-descrip="' + desProducto + '" data-idProducto="' + idProducto + '" data-tShow="' + tipo + '" data-idv="' + codigo + '" data-lote="' + datl + '" type="button"><span class="fa fa-eye"></span></button>');
            var td8 = $('<td class="text-center"></td>');
            var btn3 = $('<button class="btn btn-danger btn-xs delMovPro" data-idDetalle="' + idDetalle + '" data-tipo="' + tipo + '" title="Eliminar" data-id="' + codigo + '" type="button"><span class="fa fa-trash"></span></button>');
            td6.append(btn1);
            td8.append(btn3);
            tr.append(td1).append(td2).append(tdy).append(td3).append(tdCantPen).append(td4).append(td5).append(tdpr).append(tdCheck).append(td6).append(td8);
            articulo_mov_det.append(tr);
            addAlmaSelec(codigo);
            addlocSele(codigo);

            $('.i-checks').iCheck({
                checkboxClass: 'icheckbox_square-green'
            }).on('ifChanged', function (event) {
                $(event.target).click();

            });

            $('.verUpdate').click(function (e) {
                var tipShow = $(this).attr('data-tShow');
                var codeShow = $(this).attr('data-idv');
                var idProduc = $(this).attr('data-idProducto');
                var descrip = $(this).attr('data-descrip');
                var cantshow = $(this).attr('data-cantiShow');
                var data_lote = $(this).attr('data-lote');

                if (tipShow == "SE") {
                    cantProductoMss.val($("#tr_idArticulo" + codeShow).find("td:eq(3)").children("input").val());
                    desProductoMss.val(descrip);
                    idProductoMss.val(idProduc);
                    btnAgreSer.prop('disabled', true);
                    btnAgreSer.trigger('change');
                    btn_serC.prop('disabled', false);
                    btn_serC.trigger('change');
                    identSerAr.val(codeShow);
                    if (identiSelec == "A") {
                        table_container_cc4.jtable('destroy');
                    }
                    codigo_actual = codeShow;

                    cargarTableSerie(idProduc, aartMSE);

                    modalSerieR.modal('show');

                } else if (tipShow == "SN") {
                    cantProductoMss.val($("#tr_idArticulo" + codeShow).find("td:eq(3)").children("input").val());
                    desProductoMss.val(descrip);
                    idProductoMss.val(idProduc);
                    btnSeleSerie.prop('disabled', true);
                    btnSeleSerie.trigger('change');
                    btn_serC.prop('disabled', false);
                    btn_serC.trigger('change');
                    create_caTableSer();
                    identSerAr.val(codeShow);
                    addSerieTable(idProductoMss.val(), desProductoMss.val(), cantProductoMss.val(), colorMS, chasisMS, motorMS, anio_modeloMS, anio_fabricacionMS)
                    modalSerieR.modal('show');
                } else if (tipShow == "LE") {
                    codigo_actual = codeShow;
                    codigoLoteMll.val(data_lote);
                    if ($('#id_check' + codigo_actual).prop('checked')) {

                    } else {
                        getlotes();
                    }

                    modalLoteR.modal('show');
                    idProductoMll.val(idProduc);
                    desProductoMll.val(descrip);
                    cantProductoMll.val(cantshow);
                    // idLoteMll2.val("");
                    // codigoLoteMll.prop("readonly",true);
                    // codigoLoteMll.trigger('change');
                    aartMLE.map(function (index) {
                        if (index.identificador == codeShow) {
                            // codigoLoteMll.val(index.codig_lote);
                            fechaVl.val(index.fecha_vencimiento);
                            // cantProductoMll.val($("#tr_idArticulo"+codeShow).find("td:eq(3)").children("input").val());
                        }

                    })
                    // console.log(aartMLE);

                } else if (tipShow == "LN") {
                    idProductoML.val(idProduc);
                    desProductoML.val(descrip);
                    idLoteML2.val(codeShow);
                    aartML.map(function (index) {
                        if (index.identificador == codeShow) {
                            lotProductoML.val(index.lote);
                            fIngrePrML.val(index.fecha_ingreso);
                            cantProductoML.val($("#tr_idArticulo" + codeShow).find("td:eq(3)").children("input").val());
                            fVenPrML.val(index.fecha_vencimiento);
                        }
                    })
                    modalLote.modal("show");
                }

            });

            $('.delMovPro').click(function (e) {
                var code = $(this).attr('data-id');
                var tip = $(this).attr('data-tipo');
                var idDetalle = $(this).attr('data-idDetalle');
                if ($("#p_state").val() != 0) {
                    AlertFactory.textType({
                        title: '',
                        message: 'Solo se puede eliminar artículos de una Entrega en estado registrado',
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
                    if (tip == "NA") {
                        var arrTna = aartMN.filter(function (car) {
                            return car.identificador !== code;
                        })
                        aartMN = arrTna;
                    } else if (tip == "K") {
                        var arrTK = aartMK.filter(function (car) {
                            return car.identificador !== code;
                        })
                        aartMK = arrTK;
                    } else if (tip == "LE") {
                        var arrTLE = aartMLE.filter(function (car) {
                            return car.identificador !== code;
                        })
                        aartMLE = arrTLE;
                    } else if (tip == "LN") {
                        var arrTLN = aartML.filter(function (car) {
                            return car.identificador !== code;
                        })
                        aartML = arrTLN;
                    } else if (tip == "SN") {
                        var arrTSN = aartMSN.filter(function (car) {
                            return car.identificador !== code;
                        })
                        aartMSN = arrTSN;
                    } else if (tip == "SE") {
                        var arrTSE = aartMSE.filter(function (car) {
                            return car.identificador !== code;
                        })
                        aartMSE = arrTSE;
                    }
                    if (idMovimiento.val() != '' && idDetalle != 0) {
                        var id = idMovimiento.val() + '_' + idDetalle;

                        RESTService.get('entrega_servicesTecnicos/deleteDetalleST', id, function (response) {
                            if (!_.isUndefined(response.status) && response.status) {
                                AlertFactory.textType({
                                    title: '',
                                    message: 'El Articulo se eliminó correctamente',
                                    type: 'success'
                                });
                            } else {
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
            $('.m_articulo_idAlm').change(function (e) {
                var idl = $(this).val();
                var ident = $(this).attr('data-idAraAl');
                var idPrAl = $(this).attr('data-arts');
                console.log("entro almacen");

                getLocaStock(idl, ident, idPrAl, idLocalizacion);
                e.preventDefault();
            });
            $('.m_articulo_cantidad').keyup(function (e) {
                var cantidap = $(this).val();
                var costo = $(this).closest("tr").find("td:eq(5)").children("input").val();
                var importe = Number(cantidap) * Number(costo);
                $(this).closest("tr").find("td:eq(6)").children("p").text(importe.toFixed(2));
                $(this).closest("tr").find("td:eq(6)").children("input").val(importe.toFixed(2));
                if (naturalezaGeneral == "S" || naturalezaGeneral == "A") {
                    var preciUni = $(this).closest("tr").find("td:eq(6)").children("input").val();
                    var precioTotal = Number(cantidap) * Number(preciUni);
                    $(this).closest("tr").find("td:eq(7)").children("p").text(precioTotal.toFixed(2));
                    $(this).closest("tr").find("td:eq(7)").children("input").val(precioTotal.toFixed(2));
                }
            })
            $('.m_articulo_precio').keyup(function (e) {
                var preciop = $(this).val();
                var cantidad = $(this).closest("tr").find("td:eq(3)").children("input").val();
                var precioTotal = Number(cantidad) * Number(preciop);
                $(this).closest("tr").find("td:eq(7)").children("p").text(precioTotal.toFixed(2));
                $(this).closest("tr").find("td:eq(7)").children("input").val(precioTotal.toFixed(2));
            })

            $('.m_articulo_precio').change(function (e) {
                var preciop = $(this).val();
                var cantidad = $(this).closest("tr").find("td:eq(3)").children("input").val();
                var precioTotal = Number(cantidad) * Number(preciop);
                $(this).closest("tr").find("td:eq(7)").children("p").text(precioTotal.toFixed(2));
                $(this).closest("tr").find("td:eq(7)").children("input").val(precioTotal.toFixed(2));
            })

            $('.m_articulo_costo').keyup(function (e) {
                var costop = $(this).val();
                var cantidad = $(this).closest("tr").find("td:eq(3)").children("input").val();
                var importe = Number(cantidad) * Number(costop);
                $(this).closest("tr").find("td:eq(5)").children("p").text(importe.toFixed(2));
                $(this).closest("tr").find("td:eq(5)").children("input").val(importe.toFixed(2));
            })
            $('#cosMs_' + codigo).change(function (e) {
                var costop = $(this).val();
                var cantidad = $(this).closest("tr").find("td:eq(3)").children("input").val();
                var importe = Number(cantidad) * Number(costop);
                $(this).closest("tr").find("td:eq(5)").children("p").text(importe.toFixed(2));
                $(this).closest("tr").find("td:eq(5)").children("input").val(importe.toFixed(2));
            })
            if (idAlmacen != "") {
                $("#Al_" + codigo).val(idAlmacen).trigger('change');
                $("#" + codigo).val(idLocalizacion).trigger('change');

                $("#cosMs_" + codigo).val(Number(costo));
                var cos = Number(costo_total);
                $("#tr_idArticulo" + codigo).find("td:eq(5)").children("p").text(cos);
                $("#tr_idArticulo" + codigo).find("td:eq(5)").children("input").val(cos);
            };

        }
        $scope.addtableSerie = function () {
            if (identiSelec == "A") {
                table_container_cc4.jtable('destroy');
            }
            identiSelec = "I";
            var bval = true;
            bval = bval && cantProductoMss.required();
            if (bval) {
                create_caTableSer();
                addSerieTable(idProductoMss.val(), desProductoMss.val(), cantProductoMss.val(), colorMS, chasisMS, motorMS, anio_modeloMS, anio_fabricacionMS)
            }
        }
        function create_caTableSer() {
            table_serie_cabecera.html("");
            btn_serC.prop('disabled', false);
            btn_serC.trigger('change');
            var html = "<tr>";
            html += "<th width='250px'>Artículo</th>";
            html += "<th width='250px' height='20px'>Nr° Serie</th>";
            html += " <th width='250px' height='20px'>Chasis</th>";
            html += "<th width='200px' height='20px'>Motor</th>";
            html += "<th width='100px' height='20px'>Color</th>";
            html += "<th width='100px' height='20px'>Año fabricación</th>";
            html += "<th width='100px' height='20px'>Año Modelo</th>";
            html += "<th width='200px' height='20px'>Tipo Compra</th>";
            html += "<th width='100px' height='20px'>N° Poliza</th>";
            html += "<th width='100px' height='20px'>N° Lote</th>";
            html += "</tr>";
            table_serie_cabecera.append(html);
        }
        $scope.addSerieCompleTab = function () {
            var bval = true;
            var cant = cantProductoMss.val();
            bval = bval && cantProductoMss.required();
            if (bval) {
                if (identiSelec == "A") {
                    var conta1 = 0;
                    $(".valcheck:checked").each(function () {
                        conta1 = conta1 + 1
                    });
                    if (cant == conta1) {
                        if (identSerAr.val() != "") {
                            var updteSe = aartMSE.filter(function (car) {
                                return car.identificador !== identSerAr.val();
                            })
                            aartMSE = updteSe;
                            $(".check:checkbox:checked").each(function () {
                                var grubSE = {
                                    'identificador': identSerAr.val(),
                                    'idProducto': idProductoMss.val(),
                                    'serie': $(this).attr('data-code'),
                                    'idSerie': $(this).attr('data_idSerie'),
                                    'cantidad': cantProductoMss.val(),
                                }
                                aartMSE.push(grubSE);
                            });

                            $("#id_check" + codigo_actual).prop("checked", true);

                            $('.i-checks').iCheck({
                                checkboxClass: 'icheckbox_square-green'
                            }).on('ifChanged', function (event) {
                                $(event.target).click();

                            });
                            $("#tr_idArticulo" + identSerAr.val()).find("td:eq(3)").children("p").text(cantProductoMss.val());
                            $("#tr_idArticulo" + identSerAr.val()).find("td:eq(3)").children("input").val(cantProductoMss.val());
                            modalSerieR.modal("hide");
                            modalMovimietoArticulo.modal("hide");
                        } else {
                            var vers = 'N';
                            var codigoLSr = Math.random().toString(36).substr(2, 18);
                            var tipoArtLSr = 'SE';
                            $(".check:checkbox:checked").each(function () {
                                var grubSE = {
                                    'identificador': codigoLSr,
                                    'idProducto': idProductoMss.val(),
                                    'serie': $(this).attr('data-code'),
                                    'idSerie': $(this).attr('data_idSerie'),
                                    'cantidad': cantProductoMss.val(),
                                }
                                aartMSE.push(grubSE);
                            });
                            var codl = "";
                            var datl = "";
                            var idAlmacen = "";
                            var idLocalizacion = "";
                            var costo = costoAS.val();
                            var costo_total = "";
                            var precio = "";
                            var precioTotal = "";
                            console.log("ejeci _1");
                            var idDetalle = 0;
                            addArticuloTable(idDetalle, idProductoMss.val(), desProductoMss.val(), cantProductoMss.val(), vers, codigoLSr, tipoArtLSr, codl, datl, idAlmacen, idLocalizacion, costo, costo_total, precio, precioTotal);
                            modalSerieR.modal("hide");
                            modalMovimietoArticulo.modal("hide");

                        }
                    } else {
                        AlertFactory.textType({
                            title: '',
                            message: 'Las series seleccionadas debe ser igual a la cantidad AV',
                            type: 'info'
                        });
                    }
                }
                else {


                    var camposunicos = [];
                    var vali = "";

                    for (var i = 0; i < cant; i++) {
                        var ident = "#s_serie" + i;
                        var ident = $(ident);
                        bval = bval && ident.required();
                    }
                    for (var i = 0; i < cant; i++) {
                        var ident = "#s_serie" + i;
                        var ident = $(ident).val();
                        camposunicos.push(ident);
                    }
                    for (var i = 0; i < cant; i++) {
                        var ident = "#s_serie" + i;
                        var ident = $(ident).val();
                        var ctr = 0;
                        for (var e in camposunicos) {
                            if (camposunicos[e] == ident) {
                                ctr = ctr + 1;
                                if (ctr == 2) {
                                    vali = ident;
                                    break;
                                }
                            }

                        }
                    }
                    if (vali != "") {
                        AlertFactory.textType({
                            title: '',
                            message: 'La serie ' + vali + ' ya existe en esta lista',
                            type: 'info'
                        });
                        return false;
                    }
                    var validaSerie = "";
                    var val = "";
                    for (var i = 0; i < cant; i++) {
                        var ident = "#s_serie" + i;
                        var ident = $(ident);

                        validaSerie = aartMSN.map(function (index) {
                            if (identSerAr.val() != '') {

                                if (index.serie == ident.val()) {

                                    if (index.identificador != identSerAr.val()) {

                                        if (val == "") {

                                            val = index.serie;
                                        }
                                    }
                                }
                            } else {
                                if (index.serie == ident.val()) {
                                    if (val == "") {

                                        val = index.serie;
                                    }
                                }
                            }

                        })
                    }
                    if (val != "") {
                        AlertFactory.textType({
                            title: '',
                            message: 'La serie ' + val + ' ya existe en este movimiento',
                            type: 'info'
                        });
                        return false;
                    };

                    if (bval) {
                        camposunicos = camposunicos.join(',');
                        RESTService.get('entrega_servicesTecnicos/valida_series_serve', camposunicos, function (response) {
                            if (!_.isUndefined(response.status) && response.status) {
                                if (cant == cont_table) {
                                    if (identSerAr.val() != "") {
                                        var updteSN = aartMSN.filter(function (car) {
                                            return car.identificador !== identSerAr.val();
                                        })
                                        aartMSN = updteSN;
                                        for (var i = 0; i < cant; i++) {
                                            var grubSN = {
                                                'identificador': identSerAr.val(),
                                                'idProducto': idProductoMss.val(),
                                                'serie': $("#s_serie" + i).val(),
                                                'chasis': $("#s_chasis" + i).val(),
                                                'motor': $("#s_motor" + i).val(),
                                                'anio_fabricacion': $("#s_aniof" + i).val(),
                                                'anio_modelo': $("#s_aniom" + i).val(),
                                                'color': $("#s_color" + i).val(),
                                                'idTipoCompraVenta': $("#s_tipoCompra" + i).val(),
                                                'nPoliza': $("#s_nroPoliza" + i).val(),
                                                'nLoteCompra': $("#s_nroLote" + i).val(),
                                            }
                                            aartMSN.push(grubSN);
                                        }
                                        $("#tr_idArticulo" + identSerAr.val()).find("td:eq(3)").children("p").text(cantProductoMss.val());
                                        $("#tr_idArticulo" + identSerAr.val()).find("td:eq(3)").children("input").val(cantProductoMss.val());
                                        modalSerieR.modal("hide");
                                        modalMovimietoArticulo.modal("hide");

                                    } else {
                                        var ver = 'N';
                                        var codigoLr = Math.random().toString(36).substr(2, 18);
                                        var tipoArtLr = 'SN';
                                        for (var i = 0; i < cant; i++) {
                                            var grubSN = {
                                                'identificador': codigoLr,
                                                'idProducto': idProductoMss.val(),
                                                'serie': $("#s_serie" + i).val(),
                                                'chasis': $("#s_chasis" + i).val(),
                                                'motor': $("#s_motor" + i).val(),
                                                'anio_fabricacion': $("#s_aniof" + i).val(),
                                                'anio_modelo': $("#s_aniom" + i).val(),
                                                'color': $("#s_color" + i).val(),
                                                'idTipoCompraVenta': $("#s_tipoCompra" + i).val(),
                                                'nPoliza': $("#s_nroPoliza" + i).val(),
                                                'nLoteCompra': $("#s_nroLote" + i).val(),
                                            }
                                            aartMSN.push(grubSN);
                                        }
                                        var codl = "";
                                        var datl = "";
                                        var codl = "";
                                        var datl = "";
                                        var idAlmacen = "";
                                        var idLocalizacion = "";
                                        var costo = costoAS.val();
                                        var costo_total = "";
                                        var precio = "";
                                        var precioTotal = "";
                                        console.log("ejeci _2");
                                        var idDetalle = 0;
                                        addArticuloTable(idDetalle, idProductoMss.val(), desProductoMss.val(), cantProductoMss.val(), ver, codigoLr, tipoArtLr, codl, datl, idAlmacen, idLocalizacion, costo, costo_total, precio, precioTotal);
                                        modalSerieR.modal("hide");
                                        modalMovimietoArticulo.modal("hide");
                                    }
                                } else {
                                    AlertFactory.textType({
                                        title: '',
                                        message: 'Las series  debe ser igual a la cantidad A',
                                        type: 'info'
                                    });
                                }

                            } else {
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
        $scope.addLoteExi = function () {
            var bval = true;
            // bval = bval && cantProductoMll.required();
            bval = bval && codigoLoteMll.required();
            if (bval) {
                // var ver ='A';
                // var codigoLr=Math.random().toString(36).substr(2, 18);
                // var tipoArtLr='LE';
                // var grubLE={
                //        'identificador': codigoLr,
                //        'idProducto':idProductoMll.val(),
                //        'idLote':idLoteMll .val(),
                //        'fecha_vencimiento':fechaVl.val(),
                //        'codig_lote': codigoLoteMll.val(),
                // }
                // aartMLE.push(grubLE);
                // var codl=idLoteMll.val();
                // var datl="";
                // var datl="";
                // var idAlmacen="";
                // var idLocalizacion="";
                // var costo=costoAL.val();
                // var costo_total="";
                // var precio="";
                // var precioTotal="";
                // console.log(aartMLE);

                $("#btn_ver" + codigo_actual).attr('data-lote', codigoLoteMll.val());
                $("#id_check" + codigo_actual).prop("checked", true);
                $('.i-checks').iCheck({
                    checkboxClass: 'icheckbox_square-green'
                }).on('ifChanged', function (event) {
                    $(event.target).click();

                });
                // addArticuloTable(idProductoMll.val(),desProductoMll.val(),cantProductoMll.val(),ver,codigoLr,tipoArtLr,codl,datl,idAlmacen,idLocalizacion,costo,costo_total,precio,precioTotal);
                modalLoteR.modal('hide');
                modalMovimietoArticulo.modal('hide');
            }

        }
        $scope.EliminarMovimiento = function () {
            var id = idMovimientoDelete.val();
            RESTService.get('entrega_servicesTecnicos/deleteMovement', id, function (response) {
                if (!_.isUndefined(response.status) && response.status) {
                    var dta = response.data;
                    if (dta[0]['Mensaje'] != "") {
                        AlertFactory.textType({
                            title: '',
                            message: dta[0]['Mensaje'],
                            type: 'info'
                        });
                        modalDeleteMovimiento.modal("hide");
                    } else {
                        AlertFactory.textType({
                            title: '',
                            message: 'El registro se eliminó correctamente',
                            type: 'success'
                        });
                        modalDeleteMovimiento.modal("hide");
                        LoadRecordsButtonRegister_Movement.click();
                    }


                }
            });




        }
        $scope.addSeleccSerie = function () {
            table_serie_cabecera.html("");
            articulo_serie_det.html("");

            var bval = true;
            bval = bval && cantProductoMss.required();
            if (bval) {
                var id = idProductoMss.val() + '*' + cantProductoMss.val();
                RESTService.get('entrega_servicesTecnicos/validateCantSerieMovement', id, function (response) {
                    if (!_.isUndefined(response.status) && response.status) {
                        if (response.data == 'N') {
                            AlertFactory.textType({
                                title: '',
                                message: 'No hay series de este Artículo ',
                                type: 'info'
                            });
                        }
                        else if (response.data == 'S') {
                            AlertFactory.textType({
                                title: '',
                                message: 'Existen solo ' + response.cantidad + ' series de este Artículo . Ingrese Nueva cantidad.',
                                type: 'info'
                            });
                        } else {
                            identiSelec = "A";
                            cargarTableSerie(idProductoMss.val(), aartMSE);
                            btn_serC.prop('disabled', false);
                            btn_serC.trigger('change');

                        }
                    } else {
                        AlertFactory.textType({
                            title: '',
                            message: 'Nose pudo obtener las Series . Intente nuevamente.',
                            type: 'info'
                        });
                    }
                });


            }
        }
        function addArtNada() {
            var bval = true;
            bval = bval && cantProductoMN.required();
            if (bval) {
                var codigo = Math.random().toString(36).substr(2, 18);
                var grubNa = {
                    'identificador': codigo,
                    'idProducto': idProductoMN.val(),
                }
                aartMN.push(grubNa);
                var ver = 'A';
                var tipoArt = 'NA';
                var codl = "";
                var datl = "";
                var idAlmacen = "";
                var idLocalizacion = "";
                var costo = costoNa.val();
                var costo_total = "";
                var precio = "";
                var precioTotal = "";
                console.log("ejeci _3");
                var idDetalle = 0;
                addArticuloTable(idDetalle, idProductoMN.val(), desProductoMN.val(), cantProductoMN.val(), ver, codigo, tipoArt, codl, datl, idAlmacen, idLocalizacion, costo, costo_total, precio, precioTotal);
                modalNada.modal('hide');
                modalMovimietoArticulo.modal('hide');
            }

        }

        $scope.addArtLote = function () {
            var bval = true;
            bval = bval && cantProductoML.required();
            bval = bval && lotProductoML.required();
            bval = bval && fIngrePrML.required();
            bval = bval && fVenPrML.required();
            if (bval) {
                if (idLoteML2.val() == "") {
                    var validaLote = aartML.map(function (index) {
                        if (index.lote == lotProductoML.val()) {
                            return index.lote;
                        }

                    })
                    if (validaLote != "") {
                        AlertFactory.textType({
                            title: '',
                            message: 'El lote ' + validaLote + ' ya existe en este movimiento',
                            type: 'info'
                        });
                        return false;
                    };
                    var codigoLtr = Math.random().toString(36).substr(2, 18);
                    var grubLN = {
                        'identificador': codigoLtr,
                        'idProducto': idProductoML.val(),
                        'cantidad': cantProductoML.val(),
                        'lote': lotProductoML.val(),
                        'fecha_ingreso': fIngrePrML.val(),
                        'fecha_vencimiento': fVenPrML.val(),
                    }
                    aartML.push(grubLN);
                    var ver = 'A';
                    var tipolr = 'LN';
                    var codl = "";
                    var idAlmacen = "";
                    var idLocalizacion = "";
                    var costo = costoAL.val();
                    var costo_total = "";
                    var datl = idProductoML.val() + '*' + cantProductoML.val() + '*' + lotProductoML.val() + '*' + fIngrePrML.val() + '*' + fVenPrML.val();
                    var precio = "";
                    var precioTotal = "";
                    console.log("ejeci _4");
                    var idDetalle = 0;
                    addArticuloTable(idDetalle, idProductoML.val(), desProductoML.val(), cantProductoML.val(), ver, codigoLtr, tipolr, codl, datl, idAlmacen, idLocalizacion, costo, costo_total, precio, precioTotal);
                    modalLote.modal('hide');
                    modalLoteR.modal('hide');
                    modalMovimietoArticulo.modal('hide');
                } else {
                    var updteSLN = aartML.filter(function (car) {
                        return car.identificador !== idLoteML2.val();
                    })
                    aartML = updteSLN;
                    var grubLN = {
                        'identificador': idLoteML2.val(),
                        'idProducto': idProductoML.val(),
                        'cantidad': cantProductoML.val(),
                        'lote': lotProductoML.val(),
                        'fecha_ingreso': fIngrePrML.val(),
                        'fecha_vencimiento': fVenPrML.val(),
                    }
                    aartML.push(grubLN);
                    var datl = idProductoML.val() + '*' + cantProductoML.val() + '*' + lotProductoML.val() + '*' + fIngrePrML.val() + '*' + fVenPrML.val();
                    $("#tr_idArticulo" + idLoteML2.val()).find("td:eq(0)").children(".m_dato_lote").val(datl);
                    $("#tr_idArticulo" + idLoteML2.val()).find("td:eq(3)").children(".m_articulo_cantidad").val(cantProductoML.val());
                    modalLote.modal('hide');
                    modalLoteR.modal('hide');
                    modalMovimietoArticulo.modal('hide');

                }


            }

        }

        function addArtkit() {
            var bval = true;
            bval = bval && cantProductoMK.required();
            if (bval) {
                var ver = 'A';
                var codigo = Math.random().toString(36).substr(2, 18);
                var tipo = "K";
                var grubkit = {
                    'identificador': codigo,
                    'idProducto': idProductoMK.val(),
                }
                aartMK.push(grubkit);
                var codl = "";
                var datl = "";
                var idAlmacen = "";
                var idLocalizacion = "";
                var costo = costoMK.val();
                var costo_total = "";
                var precio = "";
                var precioTotal = "";
                console.log("ejeci _5");
                var idDetalle = 0;
                addArticuloTable(idDetalle, idProductoMK.val(), desProductoMK.val(), cantProductoMK.val(), ver, codigo, tipo, codl, datl, idAlmacen, idLocalizacion, costo, costo_total, precio, precioTotal);
                modalKit.modal('hide');
                modalMovimietoArticulo.modal('hide');
            }
        }
        function addSerieTable(idProductoMS, desProductoMS, cantProductoMS, colorMS, chasisMS, motorMS, anio_modeloMS, anio_fabricacionMS) {
            articulo_serie_det.html('');
            if (identSerAr.val() != "") {
                cont_table = 0;
                var contfila = 0;
                aartMSN.map(function (index) {
                    if (index.identificador == identSerAr.val()) {
                        contfila = contfila + 1;
                    }
                });

                if (cantProductoMss.val() != contfila) {
                    if (cantProductoMss.val() != 0) {

                        crearTableSerie2(cantProductoMS, idProductoMS, desProductoMS);
                    } else {
                        crearTableSerie();
                    }
                } else if (cantProductoMS == contfila) {
                    crearTableSerie();
                }
            } else {
                crearTableSerie2(cantProductoMS, idProductoMS, desProductoMS);
            }
        }
        function crearTableSerie2(cantProductoMS, idProductoMS, desProductoMS) {
            cont_table = 0;
            for (var i = 0; i < cantProductoMS; i++) {
                var html2 = "<tr id='tr_idArticulo_" + idProductoMS + "' ></tr>";
                html2 += "<td>" + desProductoMS + "</td>";
                html2 += "<td><input type='text' id='s_serie" + i + "' class='s_serie form-control input-sm'/></td>";
                html2 += "<td><input type='text' id='s_chasis" + i + "' class='s_chasis form-control input-sm'/></td>";
                html2 += "<td><input type='text' id='s_motor" + i + "' class='s_motor form-control input-sm'/></td>";
                html2 += "<td><input type='text' id='s_color" + i + "' class='s_color form-control input-sm'/></td>";
                html2 += "<td><input type='text' id='s_aniof" + i + "' class='s_aniof form-control input-sm' onkeypress='return soloNumeros(event)' maxlength='4' /></td>";
                html2 += "<td><input type='text' id='s_aniom" + i + "' class='s_aniom form-control input-sm' onkeypress='return soloNumeros(event)' maxlength='4'/></td>";
                html2 += "<td><select id='s_tipoCompra" + i + "' class='form-control input-sm'></select></td>";
                html2 += "<td><input type='text' id='s_nroPoliza" + i + "' class='s_motor form-control input-sm'/></td>";
                html2 += "<td><input type='text' id='s_nroLote" + i + "' class='s_color form-control input-sm'/></td>";
                html2 += "</tr>";
                articulo_serie_det.append(html2);
                cont_table = cont_table + 1;
                $("#s_tipoCompra" + i).append('<option value="" selected>Seleccionar</option>');
                _.each(tipoCompra, function (item) {
                    $("#s_tipoCompra" + i).append('<option value="' + item.idTipoCompraVenta + '">' + item.descripcion + '</option>');
                });
            }

        }
        function crearTableSerie() {
            var contuni = 0;
            aartMSN.map(function (index) {
                if (index.identificador == identSerAr.val()) {
                    var html2 = "<tr id='tr_idArticulo_" + idProductoMss.val() + "' ></tr>";
                    html2 += "<td>" + desProductoMss.val() + "</td>";
                    html2 += "<td><input type='text' id='s_serie" + contuni + "' class='s_serie form-control input-sm' value='" + index.serie + "'/></td>";
                    html2 += "<td><input type='text' id='s_chasis" + contuni + "' class='s_chasis form-control input-sm' value='" + index.chasis + "'/></td>";
                    html2 += "<td><input type='text' id='s_motor" + contuni + "' class='s_motor form-control input-sm' value='" + index.motor + "'/></td>";
                    html2 += "<td><input type='text' id='s_color" + contuni + "' class='s_color form-control input-sm' value='" + index.color + "'/></td>";
                    html2 += "<td><input type='text' id='s_aniof" + contuni + "' class='s_aniof form-control input-sm' value='" + index.anio_fabricacion + "' onkeypress='return soloNumeros(event)' maxlength='4' /></td>";
                    html2 += "<td><input type='text' id='s_aniom" + contuni + "' class='s_aniom form-control input-sm' value='" + index.anio_modelo + "' onkeypress='return soloNumeros(event)' maxlength='4'/></td>";

                    html2 += "<td><select id='s_tipoCompra" + contuni + "' class='form-control input-sm'></select></td>";


                    html2 += "<td><input type='text' id='s_nroPoliza" + contuni + "' class='s_motor form-control input-sm' value='" + index.nPoliza + "'/></td>";
                    html2 += "<td><input type='text' id='s_nroLote" + contuni + "' class='s_color form-control input-sm' value='" + index.nLoteCompra + "'/></td>";
                    html2 += "</tr>";

                    articulo_serie_det.append(html2);
                    $("#s_tipoCompra" + contuni).append('<option value="" selected>Seleccionar</option>');
                    _.each(tipoCompra, function (item) {
                        $("#s_tipoCompra" + contuni).append('<option value="' + item.idTipoCompraVenta + '">' + item.descripcion + '</option>');
                    });
                    $("#s_tipoCompra" + contuni).val(index.idTipoCompraVenta).trigger('change');
                    cont_table = cont_table + 1;
                    contuni = contuni + 1;



                }
            });
        }
        function saveMovimientoCab() {
            var bval = true;

            bval = bval && idTipoOperacion.required();
            bval = bval && fecha_registro.required();
            if (!idMoneda.prop("disabled")) {
                bval = bval && idMoneda.required();
            }

            if (bval) {
                var str = idTipoOperacion.val();
                var complet = str.split("*");
                var idTO = complet[0];
                var nat = complet[1];
                naturalezaGeneral = nat;
                var params = {
                    'idMovimiento': idMovimiento.val(),
                    'estado': 0,
                    'fecha_registro': fecha_registro.val(),
                    'idMoneda': idMoneda.val(),
                    'observaciones': observaciones.val(),
                    'idTipoOperacion': idTO,
                };
                var movimiento_id = (idMovimiento.val() === '') ? 0 : idMovimiento.val();

                RESTService.updated('entrega_servicesTecnicos/saveMovimientoMovement', movimiento_id, params, function (response) {
                    if (!_.isUndefined(response.status) && response.status) {
                        titlemodalMovimieto.html('Nueva Entrega ' + '[' + response.code + ']');
                        AlertFactory.textType({
                            title: '',
                            message: 'El registro se guardó correctamente',
                            type: 'success'
                        });
                        var natudata = idTipoOperacion.val();
                        var co = natudata.split('*');
                        var na = co[1];
                        idNaturaleza.val(na);
                        idMovimiento.val(response.code);
                        if (response.estado == 0) {
                            p_state.val("REGISTRADO");
                        } else {
                            p_state.val("PROCESADO");
                        };
                        idTipoOperacion.prop('disabled', true);
                        idTipoOperacion.trigger('change');
                        btn_movimiento_detalle.prop('disabled', false);
                        btn_movimiento_detalle.trigger('change');
                        findRegister_movement(response.code);
                        LoadRecordsButtonRegister_Movement.click();
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
        $(document).on("change", "input[name='tipo']", function () {
            var tipo = $(this).val();
            // proforma
            if (tipo == "P") {
                console.log("entro acáaaaaaaaaa");

                $("#idventa").val("").trigger("change");
                console.log("entro acáaaaaaaaaa1");
                $("#documento").val("");
                console.log("entro acáaaaaaaaaa2");
                $(".venta").hide();
                $(".proforma").show();

                $("#idTipoOperacion").val("7*R");
                console.log("entro acáaaaaaaaaa");

            }
            // nota
            if (tipo == "N") {
                $("#cCodConsecutivoOS").val("").trigger("change");
                $("#nConsecutivoOS").val("");

                $("#idTipoOperacion").val("2*S");

                $(".proforma").hide();
                $(".venta").show();
            }
            aartMLE = [];
            aartMSE = [];
        });

        function newMovimiento() {
            titlemodalMovimieto.html('Nueva Entrega');
            modalMovimieto.modal('show');
            var verProforma = 'CR';
            RESTService.all('entrega_servicesTecnicos/data_formProf', '', function (response) {
                if (!_.isUndefined(response.status) && response.status) {

                    proformas_completas = response.proformas_entrega;
                    cargar_proformas(verProforma);

                }
            }, function () {

            });

            cargar_notas()
        }
        $(document).on("change", "#idventa", function () {
            aartMLE = [];
            aartMSE = [];
            var idventa = $(this).val();
            var documento = $('#idventa').find(':selected').data('documento');
            var data = $('#idventa').find(':selected').data('conse');
            // alert(documento);
            if (idventa == "") {
                return false;
            }
            var todata = data.split("*");
            idMoneda.val(todata[2]);
            $("#documento").val(documento);
            if (idMovimiento.val() == "") {

                RESTService.get('entrega_servicesTecnicos/get_venta_detalle', idventa, function (response) {
                    if (!_.isUndefined(response.status) && response.status) {
                        var data = response.data;
                        var cont = 0;
                        if (idMovimiento.val() == '') {
                            articulo_mov_det.html("");

                            var lotE = response.data_movimiento_lote_entrega;
                            var serE = response.data_movimiento_serie_entrega;
                            console.log(lotE);
                            console.log(serE);
                            console.log(data);
                            if (lotE.length > 0) {
                                console.log("entroA");
                                lotE.map(function (index) {
                                    var grubLE = {
                                        'identificador': index.consecutivo,
                                        'idProducto': index.idarticulo,
                                        'idLote': index.idLote,
                                        'fecha_vencimiento': index.fechaVencimiento,
                                        'codig_lote': index.Lote,
                                    }
                                    aartMLE.push(grubLE);
                                });
                            }
                            if (serE.length > 0) {
                                console.log("entroB");
                                serE.map(function (index) {
                                    var grubSE = {
                                        'identificador': index.identificador,
                                        'idProducto': index.idarticulo,
                                        'serie': index.nombreSerie,
                                        'idSerie': index.idSerie,
                                        'cantidad': index.cantiTotal,
                                    }
                                    aartMSE.push(grubSE);
                                });
                            }
                            if (data.length == 0) {
                                AlertFactory.textType({
                                    title: '',
                                    message: 'No existe artículos pendientes de esta venta',
                                    type: 'info'
                                });
                            } else {


                                data.map(function (index) {
                                    var ver = 'A';
                                    var tipo = 'NA';
                                    var codl = "";
                                    var datl = "";

                                    if (index.serie == '1') {
                                        ver = 'N';
                                    }
                                    if (index.serie == '1') {
                                        tipo = 'SE';
                                    } else if (index.lote == '1') {
                                        tipo = 'LE';
                                        codl = index.idLote;
                                    }
                                    var idLoteEnviar = index.idLote;
                                    if (index.idLote == null) {
                                        idLoteEnviar = '';
                                    }
                                    var idCodLoteEnviar = index.cod_lote;
                                    if (index.cod_lote == null) {
                                        idCodLoteEnviar = '';
                                    }
                                    console.log(idLoteEnviar);
                                    console.log(idCodLoteEnviar);
                                    console.log("enviadolote");
                                    var cost = parseFloat(index.costo2);
                                    var cottota = parseFloat(index.costo_total);
                                    console.log("ejeci _6");
                                    var idDetalle = 0;
                                    addArticuloTable(idDetalle, index.idArticulo,
                                        index.description, Math.trunc(index.cantidad),
                                        ver, index.consecutivo, tipo, idLoteEnviar,
                                        idCodLoteEnviar, index.idAlmacen,
                                        index.idLocalizacion,
                                        cost,
                                        cottota,
                                        index.precio,
                                        index.precio_total,
                                        Math.trunc(index.nCantidadPendienteEntregar));

                                })

                            }



                        }

                    } else {
                        AlertFactory.textType({
                            title: '',
                            message: 'Hubo un error . Intente nuevamente.1',
                            type: 'info'
                        });
                    }
                });
            }
        });
        function cargar_notas() {
            $.post("entrega_servicesTecnicos/get_ventas_entrega", {},
                function (data, textStatus, jqXHR) {

                    console.log("carga ventas");
                    console.log(data);
                    $("#idventa").html('');
                    $("#idventa").append('<option value="">Seleccionar</option>');
                    _.each(data, function (item) {
                        $("#idventa").append('<option data-conse="' + item.serie_comprobante + '*' + item.numero_comprobante + '*' + item.IdMoneda + '" data-documento="' + item.serie_comprobante + '-' + item.numero_comprobante + '" value="' + item.idventa + '">' + item.serie_comprobante + ' ' + item.numero_comprobante + ' ' + item.razonsocial_cliente + '</option>');
                    });
                    $("#idventa").select2();
                },
                "json"
            );
        }

        $scope.addArticulo = function () {
            var bval = true;
            bval = bval && idTipoOperacion.required();
            bval = bval && fecha_registro.required();
            if (!idMoneda.prop("disabled")) {
                bval = bval && idMoneda.required();
            }
            if (bval) {
                if (idMovimiento.val() == "") {
                    saveMovimientoCab();
                }
                titlemodalMovimietoArticulo.html('Nuevo Articulo');
                var str = idTipoOperacion.val();
                var complet = str.split("*");
                var idTO = complet[0];
                var nat = complet[1];

                if (nat == 'E' || nat == 'A' || nat == 'C') {
                    if (idenifcador_table_art.val() != 'I') {

                        table_container_cc2.jtable('destroy');
                    }
                    cargartableMovAr2();
                    idenifcador_table_art.val("A");
                } else {
                    if (idenifcador_table_art.val() != 'I') {
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
        idTipoOperacion.change(function () {
            var natudata = idTipoOperacion.val();
            var co = natudata.split('*');
            var na = co[1];

            if (na == 'S') {
                idMoneda.prop("disabled", true);
                idMoneda.trigger('change');
                idMoneda.val('1').trigger('change');

            } else {
                // idMoneda.prop("disabled", false);
                idMoneda.trigger('change');

            }
        });
        function getDataFormMovement() {
            RESTService.all('entrega_servicesTecnicos/data_formRegi', '', function (response) {
                if (!_.isUndefined(response.status) && response.status) {
                    idTipoOperacion.append('<option value="" >Seleccionar</option>');
                    _.each(response.Operation_total_entrega, function (item) {
                        var opera = '7' + '*' + 'R';
                        naturalezaGeneral = 'R';
                        idTipoOperacion.append('<option value="' + item.IdTipoOperacion + '*' + item.idNaturaleza + '" selected>' + item.descripcion + '</option>');
                    });
                    $("#idTipoOperacion").val("7*R");
                    idMoneda.append('<option value="" selected>Seleccionar</option>');
                    _.each(response.moneda, function (item) {
                        idMoneda.append('<option  value="' + item.Value + '">' + item.DisplayText + '</option>');
                    });
                    AlmacenesSele = response.almacen_usuario;
                    // idAlmacen.append('<option value="" selected>Seleccionar</option>');
                    //  _.each(response.almacen, function(item) {
                    //     idAlmacen.append('<option value="'+item.Value+'">'+item.DisplayText+'</option>');
                    // });

                }
            }, function () {
                getDataFormMovement();
            });
        }
        getDataFormMovement();
        function getDataFormSerie() {
            RESTService.all('series/data_form', '', function (response) {
                if (!_.isUndefined(response.status) && response.status) {
                    tipoCompra = response.tipoCompra
                    //  _.each(response.tipoCompra, function(item) {
                    //     tipoCompra.append('<option value="'+item.idTipoCompraVenta+'">'+item.descripcion+'</option>');
                    // });

                }
            }, function () {
                getDataFormSerie();
            });
        }
        getDataFormSerie();

        var search = getFormSearch('frm-search-Register_Movement', 'search_b', 'LoadRecordsButtonRegister_Movement');

        var table_container_Register_Movement = $("#table_container_Register_Movement");

        table_container_Register_Movement.jtable({
            title: "Lista de entrega a servicios técnicos",
            paging: true,
            sorting: true,
            actions: {
                listAction: base_url + '/entrega_servicesTecnicos/list',
            },
            toolbar: {
                items: [{
                    cssClass: 'buscador',
                    text: search
                }, {
                    cssClass: 'btn-primary',
                    text: '<i class="fa fa-file-excel-o"></i> Exportar a Excel',
                    click: function () {
                        $scope.openDoc('entrega_servicesTecnicos/excel', {});
                    }
                }, {
                    cssClass: 'btn-danger-admin',
                    text: '<i class="fa fa-plus"></i> Nueva Entrega',
                    click: function () {
                        newMovimiento();
                    }
                }]
            },
            fields: {
                // idMovimiento: {
                //     title: '#',
                //     key: true,
                //     create: false,
                // },
                // idTipoOperacion: {
                //     title: 'Tipo Operación',
                //     options: base_url + '/entrega_servicesTecnicos/getAllOperation'
                // },
                // idUsuario: {
                //     title: 'Usuario',
                //     options: base_url + '/entrega_servicesTecnicos/getAllUsers'
                // },
                // estado: {
                //     title: 'Estado',
                //     values: { '0': 'Registrado', '1': 'Procesado' },
                //     type: 'checkbox',
                //     defaultValue: 'A',

                // }, edit: {
                //     width: '1%',
                //     sorting: false,
                //     edit: false,
                //     create: false,
                //     listClass: 'text-center',
                //     display: function (data) {
                //         return '<a href="javascript:void(0)" class="edit-serie" data-id="' + data.record.idMovimiento
                //             + '" title="Editar"><i class="fa fa-edit fa-1-5x"></i></a>';
                //     }

                // }, Eliminar: {
                //     width: '1%',
                //     sorting: false,
                //     edit: false,
                //     create: false,
                //     listClass: 'text-center',
                //     display: function (data) {
                //         return '<a data-target="#"  data-ide="' + data.record.idMovimiento + '"   title="Eliminar" class="jtable-command-button eliminar-movimiento"><i class="fa fa-trash fa-1-5x fa-red"><span>Eliminar</span></i></a>';
                //     }

                // }
                nro: {
                    title: '#',
                    key: true,
                    create: false,
                },
                fecha: {
                    title: 'Fecha',
                    // display: function (data) {
                    //     return moment(data.record.fecha).format('DD/MM/YYYY');
                    // }
                    // options: base_url + '/entrega_servicesTecnicos/getAllOperation'
                },
                tipooperacion: {
                    title: 'Tipo Operación',
                    // options: base_url + '/entrega_servicesTecnicos/getAllUsers'
                },
                Usuario: {
                    title: 'Usuario',
                    // options: base_url + '/entrega_servicesTecnicos/getAllUsers'
                },
                estado: {
                    title: 'Estado',
                    // values: { '0': 'Registrado', '1': 'Procesado' },
                    // type: 'checkbox',
                    // defaultValue: 'A',

                },
                documento: {
                    title: 'Documento',

                },
                cliente: {
                    title: 'Cliente',

                },
                edit: {
                    width: '1%',
                    sorting: false,
                    edit: false,
                    create: false,
                    listClass: 'text-center',
                    display: function (data) {
                        return '<a href="javascript:void(0)" class="edit-serie" data-id="' + data.record.nro
                            + '" title="Editar"><i class="fa fa-edit fa-1-5x"></i></a>';
                    }

                }, Eliminar: {
                    width: '1%',
                    sorting: false,
                    edit: false,
                    create: false,
                    listClass: 'text-center',
                    display: function (data) {
                        return '<a data-target="#"  data-ide="' + data.record.nro + '"   title="Eliminar" class="jtable-command-button eliminar-movimiento"><i class="fa fa-trash fa-1-5x fa-red"><span>Eliminar</span></i></a>';
                    }

                }

            },
            recordsLoaded: function (event, data) {
                $('.edit-serie').click(function (e) {
                    var id = $(this).attr('data-id');
                    cargar_notas();
                    findRegister_movement(id);
                    e.preventDefault();
                });
                $('.eliminar-movimiento').click(function (e) {
                    var ide = $(this).attr('data-ide');
                    idMovimientoDelete.val(ide);
                    modalDeleteMovimiento.modal("show");
                    e.preventDefault();
                });
            }

        });

        generateSearchForm('frm-search-Register_Movement', 'LoadRecordsButtonRegister_Movement', function () {
            table_container_Register_Movement.jtable('load', {
                search: $('#search_b').val()
            });
        }, true);

        function cargartableMovAr() {
            var search_cc2 = getFormSearch('frm-search-cc2', 'search_cc2', 'LoadRecordsButtonCC2');
            table_container_cc2 = $("#table_container_Register_Articulo");
            table_container_cc2.jtable({
                title: "Lista de Articulos",
                paging: true,
                sorting: true,
                cache: false,
                actions: {
                    listAction: base_url + '/entrega_servicesTecnicos/getArticulosSelect'
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
                            return '<a href="javascript:void(0)" title="Seleccionar" class="select_cc" data-costo="' + data.record.costo + '" data-name="' +
                                data.record.description + '" data-type="' + data.record.type_id + '"  data-serie="' + data.record.serie + '" data-lote="' + data.record.lote + '" data-code="' + data.record.id + '"><i class="fa fa-' +
                                icon_select + ' fa-1-5x"></i></a>';
                        }
                    }
                },
                recordsLoaded: function (event, data) {
                    $('.select_cc').click(function (e) {
                        var codigo = $(this).attr('data-code');
                        var descripcionArt = $(this).attr('data-name');
                        var idTipoArt = $(this).attr('data-type');
                        var serie = $(this).attr('data-serie');
                        var lote = $(this).attr('data-lote');
                        var costo = $(this).attr('data-costo');
                        seleccionarModal(codigo, descripcionArt, idTipoArt, serie, lote, costo);
                        e.preventDefault();
                    });
                }
            });

            generateSearchForm('frm-search-cc2', 'LoadRecordsButtonCC2', function () {
                table_container_cc2.jtable('load', {
                    search: $('#search_cc2').val()
                });
            }, false);

        }

        function cargartableMovAr2() {
            var search_cc22 = getFormSearch('frm-search-cc22', 'search_cc22', 'LoadRecordsButtonCC22');
            table_container_cc2 = $("#table_container_Register_Articulo");
            table_container_cc2.jtable({
                title: "Lista de Articulos",
                paging: true,
                sorting: true,
                cache: false,
                actions: {
                    listAction: base_url + '/entrega_servicesTecnicos/getArticulosMinKit'
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
                            return '<a href="javascript:void(0)" title="Seleccionar" class="select_cc" data-costo="' + data.record.costo + '" data-name="' +
                                data.record.description + '" data-type="' + data.record.type_id + '"  data-serie="' + data.record.serie + '" data-lote="' + data.record.lote + '" data-code="' + data.record.id + '"><i class="fa fa-' +
                                icon_select + ' fa-1-5x"></i></a>';
                        }
                    }
                },
                recordsLoaded: function (event, data) {
                    $('.select_cc').click(function (e) {
                        var codigo = $(this).attr('data-code');
                        var descripcionArt = $(this).attr('data-name');
                        var idTipoArt = $(this).attr('data-type');
                        var serie = $(this).attr('data-serie');
                        var lote = $(this).attr('data-lote');
                        var costo = $(this).attr('data-costo');
                        seleccionarModal(codigo, descripcionArt, idTipoArt, serie, lote, costo);
                        e.preventDefault();
                    });
                }
            });

            generateSearchForm('frm-search-cc22', 'LoadRecordsButtonCC22', function () {
                table_container_cc2.jtable('load', {
                    search: $('#search_cc22').val()
                });
            }, false);

        }



        function cargarTableSerie(idProducto, aarraySe) {
            cont_check = 0;
            identiSelec = "A";
            var search_cc4 = getFormSearch('frm-search-cc4', 'search_cc4', 'LoadRecordsButtonCC4');
            table_container_cc4 = $("#table_container_Series_Articulo");
            var url = 'getProductoSerie';
            if (naturalezaGeneral == "S") {
                url = 'getProductoSerieStock';
            };
            table_container_cc4.jtable({
                title: "Lista de Series",
                paging: true,
                sorting: true,
                actions: {
                    listAction: function (postData, jtParams) {
                        return $.Deferred(function ($dfd) {
                            $.ajax({
                                url: base_url + '/entrega_servicesTecnicos/' + url,
                                type: 'POST',
                                dataType: 'json',
                                data: { postData: postData, idProducto: idProducto },
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
                            var ichc = 'N';
                            if (identSerAr.val() != "") {

                                aartMSE.map(function (index) {
                                    if (data.record.serie == index.serie && identSerAr.val() == index.identificador) {
                                        ichc = 'A';
                                    }
                                });
                                if (ichc == 'A') {
                                    cont_check = cont_check + 1;
                                    ichc = 'N';
                                    return '<label class="checkbox-inline i-checks"> <input class="check valcheck" type="checkbox" id="p_state" data_idSerie="' + data.record.idSerie + '" data-code="' + data.record.serie + '" checked ></label>';
                                } else {
                                    return '<label class="checkbox-inline i-checks"> <input class="check valcheck" type="checkbox" id="p_state" data_idSerie="' + data.record.idSerie + '" data-code="' + data.record.serie + '"  ></label>';
                                }
                            } else {
                                return '<label class="checkbox-inline i-checks"> <input class="check valcheck" type="checkbox" id="p_state" data_idSerie="' + data.record.idSerie + '" data-code="' + data.record.serie + '"  ></label>';
                            }


                        }
                    }
                },
                recordsLoaded: function (event, data) {
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
                        if ($(this).prop('checked')) {
                            cont_check = cont_check + 1
                        } else {
                            cont_check = cont_check - 1;
                        };
                        var codigo = $(this).attr('data-code');

                        // $(event.target).click();
                    });

                }
            });

            generateSearchForm('frm-search-cc4', 'LoadRecordsButtonCC4', function () {
                table_container_cc4.jtable('load', {
                    search: $('#search_cc4').val()
                });
            }, true);
        }

        var search_cc3 = getFormSearch('frm-search-cc3', 'search_cc3', 'LoadRecordsButtonCC3');
        var table_container_cc3 = $("#table_container_Almacen_Articulo");
        table_container_cc3.jtable({
            title: "Lista de Articulos",
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
                        return '<a href="javascript:void(0)" title="Seleccionar" class="select_cc" data-name="' +
                            data.record.description + '" data-type="' + data.record.type_id + '"  data-serie="' + data.record.serie + '" data-lote="' + data.record.lote + '" data-code="' + data.record.id + '"><i class="fa fa-' +
                            icon_select + ' fa-1-5x"></i></a>';
                    }
                }
            },
            recordsLoaded: function (event, data) {
                $('.select_cc').click(function (e) {
                    var codigo = $(this).attr('data-code');
                    var descripcionArt = $(this).attr('data-name');
                    var idTipoArt = $(this).attr('data-type');
                    var serie = $(this).attr('data-serie');
                    var lote = $(this).attr('data-lote');
                    var costo = $(this).attr('data-lote');
                    if (idArtSerie.val() != '') {
                        AlertFactory.textType({
                            title: '',
                            message: 'Ya seleccionó un artículo serie',
                            type: 'error'
                        });
                    } else {
                        seleccionarModal(codigo, descripcionArt, idTipoArt, serie, lote, costo);
                    }

                    e.preventDefault();
                });
            }
        });

        generateSearchForm('frm-search-cc3', 'LoadRecordsButtonCC3', function () {
            table_container_cc3.jtable('load', {
                search: $('#search_cc3').val()
            });
        }, false);
    }

    function Config($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('entrega_servicesTecnicos', {
                url: '/entrega_servicesTecnicos',
                templateUrl: base_url + '/templates/entrega_servicesTecnicos/base.html',
                controller: 'Entrega_servicesTecnicoCtrl'
            });

        $urlRouterProvider.otherwise('/');
    }
})
();