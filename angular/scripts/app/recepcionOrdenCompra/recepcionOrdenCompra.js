/**
 * Created by JAIR on 4/5/2017.
 */

(function () {
    'use strict';
    angular.module('sys.app.recepcionOrdenCompras')
        .config(Config)
        .controller('RecepcionOrdenCompraCtrl', RecepcionOrdenCompraCtrl);

    Config.$inject = ['$stateProvider', '$urlRouterProvider'];
    RecepcionOrdenCompraCtrl.$inject = ['$scope', '_', 'RESTService', 'AlertFactory'];

    function RecepcionOrdenCompraCtrl($scope, _, RESTService, AlertFactory)
    {
        var modalRec = $("#modalRec");
        modalRec.on('hidden.bs.modal', function (e) {
            cleanRec();
        });
        var titleRec = $("#titleRec");
        var modalOC = $('#modalOC');
        modalOC.on('show.bs.modal', function (e) {
            $('#LoadRecordsButtonOC').click();
            modalRec.attr('style', 'display:block; z-index:2030 !important');
        });
        modalOC.on('hidden.bs.modal', function (e) {
            $('#search_oc').val('');
            $('#LoadRecordsButtonOC').click();
            modalRec.attr('style', 'display:block; overflow-y: auto;');
        });

        var r_id = 0;
        var r_state_id = 0;
        var r_oc_id = '';
        var r_oc = $("input#r_oc");
        var r_oc_btn = $("button#r_oc_btn");
        var r_oc_consecutive = $("input#r_oc_consecutive");

        var r_nat_id = '';
        var r_iden_art = '';
        var r_serie_art = '';
        var r_serie_art_q = '';
        var r_serie_art_des = '';
        var r_kit_art = '';
        var r_kit_art_p = '';
        var r_nada_art = '';
        var r_nada_art_p = '';
        var r_lote_id1 = '';
        var r_lote_id2 = '';
        var r_lote_art = '';
        var r_lote_art_p = '';
        var r_serie_r_art = '';
        var r_serie_r_art_p = '';
        var r_lote2 = '';
        var r_lote_pro_ = '';
        var r_series_r_ = '';
        
        var proformas_completas;
        var codigo_actual; //variable para identificar en que fila voy a gregar lotes o series
        var aartML = []; //arrays para guardas lo s datos de lotes
        var acodigos = [];//arrays de codigos;
        var tipoCompra; //variable que contendrá los tipos de  compras
        var aartMK = []; //arrays de id kits
        var aartMLE = [];//arrays lotes exis
        var naturalezaGeneral;
        var aartMSN = [];//ARRAY DE series nueva
        var aartMSE = [];//array series  exis
        var aartMN = [];//arrays de nada
        var LocalizacionesSele;//variable para guardar localizaciones del almacen
        var AlmacenesSele;//variable para guardar almacenes
        var btnguardarMovimiento = $("#btn-guardarMovimiento");//btn pata guardar cabecera del movimiento
        var idTipoOperacion = $("#idTipoOperacion");
        var idMoneda = $("#idMoneda");
        var observaciones = $("#observaciones");
        var p_state = $("#p_state");
        var fecha_registro = $("#fecha_registro");
        var modalRecArticulo = $("#modalRecArticulo");
        var titleRecArticulo = $("#titleRecArticulo");
        var modalLote = $("#modalLote");
        var modalKit = $("#modalKit");
        var modalNada = $("#modalNada");
        var articulo_mov_det = $("#articulo_mov_det");
        var modalAlmacenArticulo = $("#modalAlmacenArticulo");
        var desProductoML = $("#desProductoML");
        var cantProductoML = $("#cantProductoML");
        var lotProductoML = $("#lotProductoML");
        var fIngrePrML = $("#fIngrePrML");
        var fVenPrML = $("#fVenPrML");
        var tablekitdetM = $("#tablekitdetM");
        var cantProductoMK = $("#cantProductoMK");
        var desProductoMK = $("#desProductoMK")
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
        var table_container_cc2;
        var desProductoMN = $("#desProductoMN");
        var cantProductoMN = $("#cantProductoMN");
        var desProductoMll = $("#desProductoMll");
        var cantProductoMll = $("#cantProductoMll");
        var modalLoteR = $("#modalLoteR");
        var codigoLoteMll = $("#codigoLoteMll");
        var fechaVl = $("#fechaVl");
        var modalSerieR = $("#modalSerieR");
        var desProductoMss = $("#desProductoMss");
        var btn_Lotd = $("#btn_Lotd");
        var cantProductoMss = $("#cantProductoMss");
        var table_serie_cabecera = $("#table_serie_cabecera");
        var articulo_serie_det = $("#articulo_serie_det");
        var btnAgreSer = $("#btnAgreSer");
        var identiSelec = "I";
        var table_container_cc4;
        var btn_serC = $("#btn_serC");
        var cont_check = 0;
        var cont_table = 0;
        var btnSeleSerie = $("#btnSeleSerie");
        var btn_movimiento_detalle = $("#btn_movimiento_detalle");
        var btn_imprimirMovimiento = $("#btn_imprimirMovimiento");
        $('.i-checks').iCheck({
            checkboxClass: 'icheckbox_square-green'
        }).on('ifChanged', function (event) {
            $(event.target).click();
            $scope.chkState();
        });

        function cleanRec() {
            cleanRequired();
            titleRec.empty();
            r_id = 0;
            r_state_id = 0;
            r_oc_id = '';
            r_oc.val('');
            r_oc_btn.prop('disabled', false);
            r_oc_consecutive.val('');

            r_nat_id = '';

            idMoneda.val('');
            aartML = [];
            acodigos = [];
            aartMK = [];
            aartMLE = [];
            aartMSN = [];
            aartMSE = [];
            aartMN = [];
            observaciones.val('');
            fecha_registro.val('');
            p_state.val('');
            articulo_mov_det.empty();
            $('input[name=tipo]').attr("disabled", false);
            btnguardarMovimiento.prop('disabled', false);
            btn_movimiento_detalle.prop('disabled', false);
            btnguardarMovimiento.trigger('change');
            procesarTransfBoton.prop('disabled', true);
            procesarTransfBoton.trigger('change');
            var verProforma = 'CR';
        }

        $scope.openOC = function () {
            modalOC.modal('show');
        };

        function getDataForProforma() {
            RESTService.all('recepcionOrdenCompras/data_formProf', '', function (response) {
                if (!_.isUndefined(response.status) && response.status) {

                    proformas_completas = response.proformas_entrega;
                    // console.log("aaaaaaaaaaaa");
                    // console.log(proformas_completas);
                    // console.log("aaaaaaaaaaaa");

                }
            }, function () {
                getDataForProforma();
            });
        }

        getDataForProforma();

        r_oc.change(function () {

            var id = $(this).find(':selected').attr('data-idOrden');
            if (r_oc.val() != '') {
                console.log("entra consecutivo");
                var val = r_oc.val();
                var totRep = val.split('*');
                r_oc_consecutive.val(totRep[1]);
                idMoneda.val(totRep[2]);
                // console.log(id,"console.log")
                RESTService.get('recepcionOrdenCompras/getDetalle_ordenCompra', id, function (response) {
                    if (!_.isUndefined(response.status) && response.status) {
                        var data = response.data;
                        var cont = 0;
                        if (r_id === 0) {
                            articulo_mov_det.empty();

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
                                var costo = r_serie_r_art_p;
                                var costo_total = "";
                                var precio = "";
                                var precioTotal = "";
                                // add
                                cont = cont + 1;
                                // console.log("ejeci _7");
                                var idDetalle = 0;
                                addArticuloTable(idDetalle, index.idProducto,
                                    index.description, Math.trunc(index.cantidad),
                                    ver, index.idDetalleOc, tipo, codl,
                                    datl, idAlmacen,
                                    idLocalizacion,
                                    Number(index.costo),
                                    costo_total,
                                    index.precioUnitario,
                                    precioTotal, Math.trunc(index.cantidadPendiente));

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
            if (r_id !== 0) {
                var str2 = idTipoOperacion.val();
                var complet2 = str2.split("*");
                var nat2 = complet2[1];
                var idtipoOpe = complet2[0];
                var data = {
                    id: id,
                    idtipoOpe: idtipoOpe,

                };
                $scope.loadMovimientoEntregaPDF('recepcionOrdenCompras/pdfMovemen', data);
            }
        });

        modalRecArticulo.on('hidden.bs.modal', function (e) {
            cleanRecArticulo();
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

        btnguardarMovimiento.click(function (e) {
            saveMovimientoCab();
        });

        function seleccionarModal(codigo, descripcionArt, idTipoArt, serie, lote, costo) {
            if (idTipoArt == '3') {
                modalKit.modal('show');
                $('#cantProductoMK').attr('onkeypress', 'return soloNumeros(event)');
                desProductoMK.val(descripcionArt);
                r_kit_art = codigo;
                r_kit_art_p = costo;
            } else if (serie == '1') {
                desProductoMss.val(descripcionArt);
                r_serie_r_art = codigo;
                var str2 = idTipoOperacion.val();
                var complet2 = str2.split("*");
                var nat2 = complet2[1];
                r_serie_r_art_p = costo;
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
                r_lote_art = codigo;
                desProductoMll.val(descripcionArt);
                r_lote_art_p = costo;
            } else {
                $('#cantProductoMN').attr('onkeypress', 'return soloNumeros(event)');
                r_nada_art = codigo;
                desProductoMN.val(descripcionArt);
                modalNada.modal('show');
                r_nada_art_p = costo;
            }
        }

        function findRec(id) {
            RESTService.get('recepcionOrdenCompras/findMovement', id, function (response) {
                if (!_.isUndefined(response.status) && response.status) {
                    r_id = id;
                    var data_ = response.data;
                    r_state_id = parseInt(data_.estado);
                    var disabled_ = (r_state_id > 0);

                    aartMLE = [];
                    aartMSE = [];
                    var mov_ar = '';

                    r_oc_id = data_.oc_id;
                    r_oc.val(data_.oc_);
                    r_oc_consecutive.val(data_.nConsecutivo);
                    r_oc_btn.prop('disabled', disabled_);

                    mov_ar = response.data_movimiento_Articulo_recepcionCompra;

                    $('input[name=tipo]').attr("disabled", true);
                    var lotE = response.data_movimiento_lote;
                    var serE = response.data_movimiento_serie;

                    btn_movimiento_detalle.prop('disabled', false);
                    btn_movimiento_detalle.trigger('change');

                    naturalezaGeneral = data_.naturaleza;
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
                    idTipoOperacion.val(data_.idTipoOperacion + '*' + data_.naturaleza).trigger('change');
                    idTipoOperacion.prop('disabled', true);
                    idTipoOperacion.trigger('change');

                    idMoneda.val(data_.idMoneda).trigger('change');
                    fecha_registro.val(data_.fecha_registro);
                    observaciones.val(data_.observaciones);
                    if (data_.estado == 0) {
                        p_state.val(0).trigger("change");
                    }
                    if (data_.estado == 1) {
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

                    articulo_mov_det.empty();
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
                    });

                    titleRec.html('Editar Recepción');
                    modalRec.modal("show");
                } else {
                    AlertFactory.textType({
                        title: '',
                        message: 'Hubo un error al obtener el Artículo. Intente nuevamente.',
                        type: 'error'
                    });
                }
            });
        }
        
        var search_oc = getFormSearch('frm-search-oc', 'search_oc', 'LoadRecordsButtonOC');

        var table_container_oc = $("#table_container_oc");

        table_container_oc.jtable({
            title: "Lista de Ordenes de Compra",
            paging: true,
            actions: {
                listAction: base_url + '/table_container_oc/listOC'
            },
            toolbar: {
                items: [{
                    cssClass: 'buscador',
                    text: search_oc
                }]
            },
            fields: {
                id: {
                    key: true,
                    create: false,
                    edit: false,
                    list: false
                },
                cCodConsecutivo: {
                    title: 'Código',
                    listClass: 'text-center'
                },
                nConsecutivo: {
                    title: 'Consecutivo',
                    listClass: 'text-center'
                },
                dFecRegistro: {
                    title: 'Fecha Registro',
                    listClass: 'text-center'
                },
                dFecRequerida: {
                    title: 'Fecha Requerida',
                    listClass: 'text-center'
                },
                provider_: {
                    title: 'Proveedor'
                },
                currency_: {
                    title: 'Moneda',
                    listClass: 'text-center'
                },
                total: {
                    title: 'Monto',
                    listClass: 'text-right'
                },
                payment_condition_: {
                    title: 'Condición Pago'
                },
                state: {
                    title: 'Estado'
                },
                comentario: {
                    title: 'Comentarios'
                },
                edit: {
                    width: '1%',
                    sorting: false,
                    edit: false,
                    create: false,
                    listClass: 'text-center',
                    display: function (data) {
                        return '<a href="javascript:void(0)" class="sel-oc" data-id="' + data.record.id
                            + '" title="Editar"><i class="fa fa-check-circle fa-1-5x"></i></a>';
                    }
                }
            },
            recordsLoaded: function (event, data) {
                table_container_oc.find('a.sel-oc').click(function (e) {
                    var id = $(this).attr('data-id');

                    e.preventDefault();
                });
            }
        });

        generateSearchForm('frm-search-oc', 'LoadRecordsButtonOC', function () {
            table_container_oc.jtable('load', {
                search: $('#search_oc').val(),
                state: 'reception',
            });
        }, false);

        function cleanArtLote() {
            r_lote2 = '';
            r_lote_pro_ = '';
            desProductoML.val('');
            cantProductoML.val('');
            lotProductoML.val('');
            fIngrePrML.val('');
            fVenPrML.val('');
        }

        function cleanArtNada() {
            r_nada_art = '';
            desProductoMN.val('');
            cantProductoMN.val('');
        }

        function cleanArtLotell() {
            r_lote_art = '';
            desProductoMll.val('');
            cantProductoMll.val('');
            codigoLoteMll.val('');
            fechaVl.val('');
            btn_Lotd.prop('disabled', true);
            btn_Lotd.trigger('change');
            codigoLoteMll.prop("readonly", false);
            codigoLoteMll.trigger('change');
            r_lote_id1 = '';
            r_lote_id2 = '';
        }

        function cleanArtSeriess() {
            r_serie_r_art = '';
            desProductoMss.val('');
            cantProductoMss.val('');
            btnSeleSerie.prop('disabled', false);
            btnSeleSerie.trigger('change');
            r_series_r_ = '';
            if (identiSelec == "A") {
                table_container_cc4.jtable('destroy');
                identiSelec = "I";
            }
            table_serie_cabecera.empty();
            articulo_serie_det.empty();
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
            tablekitdetM.empty();
            cantProductoMK.val('');
            desProductoMK.val('');
            r_kit_art = '';
        }

        function cleanRecArticulo() {
            articulo_serie_det.empty();
            r_serie_art = '';
            r_serie_art_q = '';
            r_serie_art_des = '';
        }

        codigoLoteMll.keypress(function (e) {

            var code = (e.keyCode ? e.keyCode : e.which);
            if (code == 13) {
                if (r_lote_id2 === '') {
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
                RESTService.get('recepcionOrdenCompras/validateLoteMovement', id, function (response) {
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
                                r_lote_pro_ = r_lote_art;
                                desProductoML.val(desProductoMll.val());
                                modalLote.modal("show");

                            }
                        } else {
                            fechaVl.val(response.fecha);
                            r_lote_id1 = response.codigol;
                            btn_Lotd.prop('disabled', false);
                            codigoLoteMll.prop("readonly", true);
                            codigoLoteMll.trigger('change');
                            btn_Lotd.trigger('change');
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

        $scope.processRec = function () {
            if (articulo_mov_det.html() === '') {
                $scope.showAlert('', 'Debe registrar Articulos en este movimiento. Intente nuevamente.', 'warning');
                return false;
            }
            $scope.showConfirm('', '¿Está seguro que desea procesar la recepción?', function () {
                RESTService.get('recepcionOrdenCompras/procesarTransferenciaMovement', r_id, function (response) {
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
                            LoadRecordsButtonRegister_Movement.click();

                            modalRec.modal('hide');
                        } else {
                            AlertFactory.textType({
                                title: '',
                                message: dta[0]['Mensaje'],
                                type: 'info'
                            });
                        }
                    }
                });
            });
        };

        function seleccionarModal(codigo, descripcionArt, idTipoArt, serie, lote, costo) {
            if (idTipoArt == '3') {
                modalKit.modal('show');
                $('#cantProductoMK').attr('onkeypress', 'return soloNumeros(event)');
                desProductoMK.val(descripcionArt);
                r_kit_art = codigo;
                r_kit_art_p = costo;
            } else if (serie == '1') {
                // $('#cantProductoMS').attr('onkeypress','return soloNumeros(event)');
                // $('#anio_modeloMS').attr('onkeypress','return soloNumeros(event)');
                // $('#anio_fabricacionMS').attr('onkeypress','return soloNumeros(event)');
                desProductoMss.val(descripcionArt);
                r_serie_r_art = codigo;
                var str2 = idTipoOperacion.val();
                var complet2 = str2.split("*");
                var nat2 = complet2[1];
                r_serie_r_art_p = costo;
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
                r_lote_art = codigo;
                desProductoMll.val(descripcionArt);
                r_lote_art_p = costo;
            } else {
                $('#cantProductoMN').attr('onkeypress', 'return soloNumeros(event)');
                r_nada_art = codigo;
                desProductoMN.val(descripcionArt);
                modalNada.modal('show');
                r_nada_art_p = costo;
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
            RESTService.get('recepcionOrdenCompras/getKitMovement', codigo, function (response) {
                if (!_.isUndefined(response.status) && response.status) {
                    var data_ = response.data;
                    _.each(data_, function (c) {
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

        function getLocaStock(idl, ident, idPrAl, idLocalizacion) {
            var idLocali = $("#" + ident);
            var id = idl;
            RESTService.get('recepcionOrdenCompras/getLocaStockMovement', id, function (response) {
                if (!_.isUndefined(response.status) && response.status) {

                    idLocali.empty();
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
            bval = bval && r_oc.required();
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
            }
            ;
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
            }
            ;
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

            }
            ;

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
                    console.log($(item).val(), "data lote");
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
                }
                ;


                var str = idTipoOperacion.val();
                var complet = str.split("*");
                var idTO = complet[0];
                var nat = complet[1];
                naturalezaGeneral = nat;
                var val = r_oc.val();
                var conse = '';
                var ncons = '';
                var totRep = val.split('*');
                conse = totRep[0];
                ncons = totRep[1];

                var paramsCabezera = {
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
                    'ident_detalle': (r_id === 0) ? '' : 'A',
                    'idTipoCompraVenta': idTipoCompraVenta,
                    'nPoliza': nPoliza,
                    'nLoteCompra': nLoteCompra,
                    'identificador_serie_bd': identificador_serie_bd,
                    'ident_serie_bd_serie2': ident_serie_bd_serie2,
                    'ident_serie_bd_serie': ident_serie_bd_serie,
                    'naturaleza': naturalezaGeneral,
                };
                RESTService.updated('recepcionOrdenCompras/saveEntrega', r_id, paramsCabezera, function (response) {
                    if (!_.isUndefined(response.status) && response.status) {
                        r_id = response.code;

                        AlertFactory.textType({
                            title: '',
                            message: 'El registro se guardó correctamente',
                            type: 'success'
                        });
                        procesarTransfBoton.prop('disabled', false);
                        procesarTransfBoton.trigger('change');

                        var natudata = idTipoOperacion.val();
                        var co = natudata.split('*');

                        r_nat_id = co[1];

                        p_state.val(response.estado).trigger('change');
                        btn_movimiento_detalle.prop('disabled', false);
                        btn_movimiento_detalle.trigger('change');
                        findRec(response.code);
                        LoadRecordsButtonRegister_Movement.click();

                        titleRec.html('Editar Recepción');

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

        function addArticuloTable(idDetalle, idProducto, desProducto, cantProducto, ver, codigo, tipo, codl, datl, idAlmacen, idLocalizacion, costo, costo_total, precio, presio_total, cantidaPD) {
            acodigos.push(codigo);

            var costonew = 0;
            var precionew = 0;

            if (costo != 0 || costo != "") {
                costonew = Number(costo);
            }
            ;

            console.log(costonew, "costo unitario");
            if (precio != 0 || precio != "") {
                precionew = Number(precio);
            }
            ;

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
                var inp4 = $('<input type="number" id="cosMs_' + codigo + '" min="1" class="m_articulo_costo form-control input-sm" value="' + costonew.toFixed(2) + '" />');
            } else {
                var td4 = $('<td><p>' + costonew + '</p></td>');
                var inp4 = $('<input type="hidden" id="cosMs_' + codigo + '" min="1" class="m_articulo_costo form-control input-sm" value="' + costonew.toFixed(2) + '" />');
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
            }
            ;
            var tdCheck = $('<td><label class="checkbox-inline i-checks idRevision"><input id="" class="id_RevisionDet"  type="hidden" value="0" ><input id="id_check' + codigo + '" class="check_val"  type="checkbox" ' + checkeado + ' disabled></label></td>');
            var op = $('<option value="" selected>Seleccione</option>');
            var fclt = $('<input type="hidden" id="idLEn' + codigo + '"  class="m_codigo_lote" value="' + codl + '" />');
            var fdlt = $('<input type="hidden" id="dato_lote' + codigo + '"  class="m_dato_lote" value="' + datl + '" />');
            var identificador_serie_bd = $('<input type="hidden" class="identificador_serie_bd" value="' + codigo + '" />');
            td1.append(inp).append(fclt).append(fdlt).append(identificador_serie_bd);
            ;
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

                codigo_actual = codeShow;

                if (tipShow == "SE") {
                    r_series_r_ = codeShow;
                    if ($('#id_check' + codigo).prop('checked')) {
                        cantProductoMss.val($("#tr_idArticulo" + codeShow).find("td:eq(3)").children("input").val());
                        desProductoMss.val(descrip);
                        r_serie_r_art = idProduc;
                        btnAgreSer.prop('disabled', true);
                        btnAgreSer.trigger('change');
                        btn_serC.prop('disabled', false);
                        btn_serC.trigger('change');
                        r_series_r_ = codeShow;
                        if (identiSelec == "A") {
                            table_container_cc4.jtable('destroy');
                        }


                        cargarTableSerie(idProduc, aartMSE);

                        modalSerieR.modal('show');
                    } else {
                        seleccionarModal(idProduc, descrip, '1', '1', '', '');
                    }


                } else if (tipShow == "SN") {
                    r_series_r_ = codeShow;
                    if ($('#id_check' + codigo).prop('checked')) {
                        cantProductoMss.val($("#tr_idArticulo" + codeShow).find("td:eq(3)").children("input").val());
                        desProductoMss.val(descrip);
                        r_serie_r_art = idProduc;
                        btnSeleSerie.prop('disabled', true);
                        btnSeleSerie.trigger('change');
                        btn_serC.prop('disabled', false);
                        btn_serC.trigger('change');
                        r_series_r_ = codeShow;
                        create_caTableSer();
                        addSerieTable(r_serie_r_art, desProductoMss.val(), cantProductoMss.val(), colorMS, chasisMS, motorMS, anio_modeloMS, anio_fabricacionMS)
                        modalSerieR.modal('show');
                    } else {
                        seleccionarModal(idProduc, descrip, '1', '1', '', '');
                    }


                } else if (tipShow == "LE") {


                    if ($('#id_check' + codigo).prop('checked')) {
                        console.log("entro a1");
                        modalLoteR.modal('show');
                        r_lote_art = idProduc;
                        desProductoMll.val(descrip);
                        cantProductoMll.val(cantshow);
                        r_lote_id2 = idProduc;
                        codigoLoteMll.prop("readonly", true);
                        codigoLoteMll.trigger('change');
                        aartMLE.map(function (index) {
                            if (index.identificador == codeShow) {
                                codigoLoteMll.val(index.codig_lote);
                                fechaVl.val(index.fecha_vencimiento);
                                cantProductoMll.val($("#tr_idArticulo" + codeShow).find("td:eq(3)").children("input").val());
                            }

                        })
                    } else {
                        console.log("entro b");
                        seleccionarModal(idProduc, descrip, '1', "", '1', '');
                    }


                } else if (tipShow == "LN") {
                    console.log("entro a2");
                    if ($('#id_check' + codigo).prop('checked')) {
                        r_lote_pro_ = idProduc;
                        desProductoML.val(descrip);
                        r_lote2 = codeShow;
                        aartML.map(function (index) {
                            if (index.identificador == codeShow) {
                                lotProductoML.val(index.lote);
                                fIngrePrML.val(index.fecha_ingreso);
                                cantProductoML.val($("#tr_idArticulo" + codeShow).find("td:eq(3)").children("input").val());
                                fVenPrML.val(index.fecha_vencimiento);
                            }
                        })
                        modalLote.modal("show");
                    } else {
                        console.log("entro b");
                        seleccionarModal(idProduc, descrip, '1', "", '1', '');
                    }


                }

            });

            $('.delMovPro').click(function (e) {
                var code = $(this).attr('data-id');
                var tip = $(this).attr('data-tipo');
                var idDetalle = $(this).attr('data-idDetalle');
                if ($("#p_state").val() != 0) {
                    AlertFactory.textType({
                        title: '',
                        message: 'Solo se puede eliminar artículos de una Orden en estado registrado',
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
                    if (r_id !== 0 && idDetalle != 0) {
                        var id = r_id + '_' + idDetalle;

                        RESTService.get('recepcionOrdenCompras/deleteDetalleST', id, function (response) {
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
                $(this).closest("tr").find("td:eq(6)").children("p").text(importe.toFixed(2));
                $(this).closest("tr").find("td:eq(6)").children("input").val(importe.toFixed(2));
            })
            $('#cosMs_' + codigo).change(function (e) {
                var costop = $(this).val();
                var cantidad = $(this).closest("tr").find("td:eq(3)").children("input").val();
                var importe = Number(cantidad) * Number(costop);
                $(this).closest("tr").find("td:eq(6)").children("p").text(importe.toFixed(2));
                $(this).closest("tr").find("td:eq(6)").children("input").val(importe.toFixed(2));
            })
            if (idAlmacen != "") {
                $("#Al_" + codigo).val(idAlmacen).trigger('change');
                $("#" + codigo).val(idLocalizacion).trigger('change');

                // // $("#cosMs_"+codigo).val(Number(costo));
                // var cos=Number(costo_total);
                // $("#tr_idArticulo"+codigo).find("td:eq(6)").children("p").text(cos);
                // $("#tr_idArticulo"+codigo).find("td:eq(6)").children("input").val(cos);
            }
            ;

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
                addSerieTable(r_serie_r_art, desProductoMss.val(), cantProductoMss.val(), colorMS, chasisMS, motorMS, anio_modeloMS, anio_fabricacionMS)
            }
        }

        function create_caTableSer() {
            table_serie_cabecera.empty();
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
                        if (r_series_r_ !== '') {
                            var updteSe = aartMSE.filter(function (car) {
                                return car.identificador !== r_series_r_;
                            })
                            aartMSE = updteSe;
                            $(".check:checkbox:checked").each(function () {
                                var grubSE = {
                                    'identificador': r_series_r_,
                                    'idProducto': r_serie_r_art,
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
                            $("#tr_idArticulo" + r_series_r_).find("td:eq(3)").children("p").text(cantProductoMss.val());
                            $("#tr_idArticulo" + r_series_r_).find("td:eq(3)").children("input").val(cantProductoMss.val());
                            modalSerieR.modal("hide");
                            modalRecArticulo.modal("hide");
                        } else {
                            $(".check:checkbox:checked").each(function () {
                                var grubSE = {
                                    'identificador': r_series_r_,
                                    'idProducto': r_serie_r_art,
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

                            $("#tr_idArticulo" + r_series_r_).find("td:eq(3)").children("p").text(cantProductoMss.val());
                            $("#tr_idArticulo" + r_series_r_).find("td:eq(3)").children("input").val(cantProductoMss.val());
                            modalSerieR.modal("hide");
                            modalRecArticulo.modal("hide");
                        }
                    } else {
                        AlertFactory.textType({
                            title: '',
                            message: 'Las series seleccionadas debe ser igual a la cantidad',
                            type: 'info'
                        });
                    }
                } else {


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
                            if (r_series_r_ !== '') {

                                if (index.serie == ident.val()) {

                                    if (index.identificador != r_series_r_) {

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
                    }
                    ;

                    if (bval) {
                        camposunicos = camposunicos.join(',');
                        RESTService.get('register_movements/valida_series_serve', camposunicos, function (response) {
                            if (!_.isUndefined(response.status) && response.status) {
                                if (cant == cont_table) {

                                    if (r_series_r_ !== '') {
                                        var updteSN = aartMSN.filter(function (car) {
                                            return car.identificador !== r_series_r_;
                                        })
                                        aartMSN = updteSN;
                                        for (var i = 0; i < cant; i++) {
                                            var grubSN = {
                                                'identificador': r_series_r_,
                                                'idProducto': r_serie_r_art,
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
                                        $("#btn_ver" + r_series_r_).attr('data-tShow', "SN");

                                        $("#id_check" + r_series_r_).prop("checked", true);

                                        $('.i-checks').iCheck({
                                            checkboxClass: 'icheckbox_square-green'
                                        }).on('ifChanged', function (event) {
                                            $(event.target).click();

                                        });

                                        $("#tr_idArticulo" + r_series_r_).find("td:eq(3)").children("p").text(cantProductoMss.val());
                                        $("#tr_idArticulo" + r_series_r_).find("td:eq(3)").children("input").val(cantProductoMss.val());
                                        modalSerieR.modal("hide");
                                        modalRecArticulo.modal("hide");
                                    }
                                } else {
                                    AlertFactory.textType({
                                        title: '',
                                        message: 'Las series  debe ser igual a la cantidad',
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
            bval = bval && cantProductoMll.required();
            bval = bval && codigoLoteMll.required();
            if (bval) {
                var grubLE = {
                    'identificador': codigo_actual,
                    'idProducto': r_lote_art,
                    'idLote': r_lote_id1,
                    'fecha_vencimiento': fechaVl.val(),
                    'codig_lote': codigoLoteMll.val(),
                }
                aartMLE.push(grubLE);
                $("#idLEn" + codigo_actual).val(r_lote_id1);
                $("#btn_ver" + codigo_actual).attr('data-lote', codigoLoteMll.val());
                $("#id_check" + codigo_actual).prop("checked", true);
                $('.i-checks').iCheck({
                    checkboxClass: 'icheckbox_square-green'
                }).on('ifChanged', function (event) {
                    $(event.target).click();

                });
                modalLoteR.modal('hide');
                modalRecArticulo.modal('hide');
            }

        }

        $scope.addSeleccSerie = function () {
            table_serie_cabecera.empty();
            articulo_serie_det.empty();

            var bval = true;
            bval = bval && cantProductoMss.required();
            if (bval) {
                var id = r_serie_r_art + '*' + cantProductoMss.val();
                RESTService.get('recepcionOrdenCompras/validateCantSerieMovement', id, function (response) {
                    if (!_.isUndefined(response.status) && response.status) {
                        if (response.data == 'N') {
                            AlertFactory.textType({
                                title: '',
                                message: 'No hay series de este Artículo ',
                                type: 'info'
                            });
                        } else if (response.data == 'S') {
                            AlertFactory.textType({
                                title: '',
                                message: 'Existen solo ' + response.cantidad + ' series de este Artículo . Ingrese Nueva cantidad.',
                                type: 'info'
                            });
                        } else {
                            identiSelec = "A";
                            cargarTableSerie(r_serie_r_art, aartMSE);
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
                    'idProducto': r_nada_art,
                }
                aartMN.push(grubNa);
                var ver = 'A';
                var tipoArt = 'NA';
                var codl = "";
                var datl = "";
                var idAlmacen = "";
                var idLocalizacion = "";
                var costo = r_nada_art_p;
                var costo_total = "";
                var precio = "";
                var precioTotal = "";

                var idDetalle = 0;
                addArticuloTable(idDetalle, r_nada_art, desProductoMN.val(), cantProductoMN.val(), ver, codigo, tipoArt, codl, datl, idAlmacen, idLocalizacion, costo, costo_total, precio, precioTotal);
                modalNada.modal('hide');
                modalRecArticulo.modal('hide');
            }

        }

        $scope.addArtLote = function () {
            var bval = true;
            bval = bval && lotProductoML.required();
            bval = bval && fIngrePrML.required();
            bval = bval && fVenPrML.required();
            if (bval) {
                if (r_lote2 === '') {
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
                    }
                    ;
                    var codigoLtr = Math.random().toString(36).substr(2, 18);
                    var grubLN = {
                        'identificador': codigo_actual,
                        'idProducto': r_lote_pro_,
                        'cantidad': cantProductoML.val(),
                        'lote': lotProductoML.val(),
                        'fecha_ingreso': fIngrePrML.val(),
                        'fecha_vencimiento': fVenPrML.val(),
                    }
                    aartML.push(grubLN);
                    var datl = r_lote_pro_ + '*' + cantProductoML.val() + '*' + lotProductoML.val() + '*' + fIngrePrML.val() + '*' + fVenPrML.val();

                    $("#dato_lote" + codigo_actual).val(datl);
                    $("#tr_idArticulo" + r_lote2).find("td:eq(0)").children(".m_dato_lote").val(datl);

                    $("#btn_ver" + codigo_actual).attr('data-tShow', "LN");

                    modalLote.modal('hide');
                    modalLoteR.modal('hide');
                    modalRecArticulo.modal('hide');
                } else {
                    var updteSLN = aartML.filter(function (car) {
                        return car.identificador !== r_lote2;
                    })
                    aartML = updteSLN;
                    var grubLN = {
                        'identificador': r_lote2,
                        'idProducto': r_lote_pro_,
                        'cantidad': cantProductoML.val(),
                        'lote': lotProductoML.val(),
                        'fecha_ingreso': fIngrePrML.val(),
                        'fecha_vencimiento': fVenPrML.val(),
                    }
                    aartML.push(grubLN);
                    var datl = r_lote_pro_ + '*' + cantProductoML.val() + '*' + lotProductoML.val() + '*' + fIngrePrML.val() + '*' + fVenPrML.val();
                    $("#tr_idArticulo" + r_lote2).find("td:eq(0)").children(".m_dato_lote").val(datl);
                    modalLote.modal('hide');
                    modalLoteR.modal('hide');
                    modalRecArticulo.modal('hide');

                }

                $("#btn_ver" + codigo_actual).attr('data-lote', codigoLoteMll.val());
                $("#id_check" + codigo_actual).prop("checked", true);
                $('.i-checks').iCheck({
                    checkboxClass: 'icheckbox_square-green'
                }).on('ifChanged', function (event) {
                    $(event.target).click();

                });

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
                    'idProducto': r_kit_art,
                }
                aartMK.push(grubkit);
                var codl = "";
                var datl = "";
                var idAlmacen = "";
                var idLocalizacion = "";
                var costo = r_kit_art_p;
                var costo_total = "";
                var precio = "";
                var precioTotal = "";

                var idDetalle = 0;
                addArticuloTable(idDetalle, r_kit_art, desProductoMK.val(), cantProductoMK.val(), ver, codigo, tipo, codl, datl, idAlmacen, idLocalizacion, costo, costo_total, precio, precioTotal);
                modalKit.modal('hide');
                modalRecArticulo.modal('hide');
            }
        }

        function addSerieTable(idProductoMS, desProductoMS, cantProductoMS, colorMS, chasisMS, motorMS, anio_modeloMS, anio_fabricacionMS) {
            articulo_serie_det.empty();
            if (r_series_r_ !== '') {
                cont_table = 0;
                var contfila = 0;
                aartMSN.map(function (index) {
                    if (index.identificador == r_series_r_) {
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
                if (index.identificador == r_series_r_) {
                    var html2 = "<tr id='tr_idArticulo_" + r_serie_r_art + "' ></tr>";
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

        function newMovimiento() {
            titleRec.html('Nueva Recepción');
            modalRec.modal('show');
        }

        $scope.addArticulo = function () {
            var bval = true;
            bval = bval && idTipoOperacion.required();
            bval = bval && fecha_registro.required();
            if (!idMoneda.prop("disabled")) {
                bval = bval && idMoneda.required();
            }
            if (bval) {
                if (r_id === 0) {
                    saveMovimientoCab();
                }
                titleRecArticulo.html('Nuevo Articulo');
                var str = idTipoOperacion.val();
                var complet = str.split("*");
                var idTO = complet[0];
                var nat = complet[1];

                if (nat == 'E' || nat == 'A' || nat == 'C') {
                    if (r_iden_art !== 'I') {
                        table_container_cc2.jtable('destroy');
                    }
                    cargartableMovAr2();
                    r_iden_art = 'A';
                } else {
                    if (r_iden_art !== 'I') {
                        table_container_cc2.jtable('destroy');
                    }
                    cargartableMovAr();
                    r_iden_art = 'A';
                }

                modalRecArticulo.modal('show');

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
            RESTService.all('recepcionOrdenCompras/data_formRegi', '', function (response) {
                if (!_.isUndefined(response.status) && response.status) {
                    idTipoOperacion.append('<option value="" >Seleccionar</option>');
                    _.each(response.Operation_total_entrega, function (item) {
                        var opera = '1' + '*' + 'E';
                        naturalezaGeneral = 'E';
                        idTipoOperacion.append('<option value="' + item.IdTipoOperacion + '*' + item.idNaturaleza + '" >' + item.descripcion + '</option>');
                    });
                    $("#idTipoOperacion").val("1*E");
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
            title: "Lista de recepción de ordenes de compra",
            paging: true,
            sorting: true,
            actions: {
                listAction: base_url + '/recepcionOrdenCompras/list',
                deleteAction: base_url + '/recepcionOrdenCompras/deleteMovement'
            },
            toolbar: {
                items: [{
                    cssClass: 'buscador',
                    text: search
                }, {
                    cssClass: 'btn-primary',
                    text: '<i class="fa fa-file-excel-o"></i> Exportar a Excel',
                    click: function () {
                        $scope.openDoc('recepcionOrdenCompras/excel', {});
                    }
                }, {
                    cssClass: 'btn-danger-admin',
                    text: '<i class="fa fa-plus"></i> Nueva Recepción',
                    click: function () {
                        newMovimiento();
                    }
                }]
            },
            fields: {
                ident: {
                    title: '#',
                    key: true,
                    list: false,
                    create: false,
                    listClass: 'text-center',
                },
                idMovimiento: {
                    title: '#',
                    create: false,
                },
                idTipoOperacion: {
                    title: 'Tipo Operación',
                    options: base_url + '/recepcionOrdenCompras/getAllOperation'
                },
                idUsuario: {
                    title: 'Usuario',
                    options: base_url + '/recepcionOrdenCompras/getAllUsers'
                },
                estado: {
                    title: 'Estado',
                    values: {'0': 'Registrado', '1': 'Procesado'},
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
                        return '<a href="javascript:void(0)" class="edit-serie" data-id="' + data.record.idMovimiento
                            + '" title="Editar"><i class="fa fa-edit fa-1-5x"></i></a>';
                    }
                }
            },
            recordsLoaded: function (event, data) {
                $('.edit-serie').click(function (e) {
                    var id = $(this).attr('data-id');
                    // cargar_notas();
                    findRec(id);
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
                    listAction: base_url + '/recepcionOrdenCompras/getArticulosSelect'
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
                    listAction: base_url + '/recepcionOrdenCompras/getArticulosMinKit'
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
            }
            ;
            table_container_cc4.jtable({
                title: "Lista de Series",
                paging: true,
                sorting: true,
                actions: {
                    listAction: function (postData, jtParams) {
                        return $.Deferred(function ($dfd) {
                            $.ajax({
                                url: base_url + '/recepcionOrdenCompras/' + url,
                                type: 'POST',
                                dataType: 'json',
                                data: {postData: postData, idProducto: idProducto},
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
                            if (r_series_r_ !== '') {

                                aartMSE.map(function (index) {
                                    if (data.record.serie == index.serie && r_series_r_ == index.identificador) {
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
                        }
                        ;
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
                    if (r_serie_art !== '') {
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

            .state('recepcionOrdenCompras', {
                url: '/recepcionOrdenCompras',
                templateUrl: base_url + '/templates/recepcionOrdenCompras/base.html',
                controller: 'RecepcionOrdenCompraCtrl'
            });

        $urlRouterProvider.otherwise('/');
    }
})
();