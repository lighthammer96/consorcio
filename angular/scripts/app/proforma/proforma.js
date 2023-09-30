(function () {
    'use strict';
    angular.module('sys.app.proformas')
        .config(Config)
        .controller('ProformaCtrl', ProformaCtrl);

    Config.$inject = ['$stateProvider', '$urlRouterProvider'];
    ProformaCtrl.$inject = ['$scope', '_', 'RESTService', 'AlertFactory'];

    function ProformaCtrl($scope, _, RESTService, AlertFactory) {
        moment.locale('es');
        var start = moment().startOf('month');
        var end = moment().endOf('month');

        var chk_date_range = $('#chk_date_range');
        chk_date_range.click(function () {
            $('#LoadRecordsButtonProforma').click();
        });
        generateCheckBox('.chk_date_range_pro');

        var reqDates = $('#reqDates');

        var showDate = function (from, to) {
            start = from;
            end = to;
            reqDates.find('span').html(from.format('MMM D, YYYY') + ' - ' + to.format('MMM D, YYYY'));
            if (chk_date_range.prop('checked')) {
                $('#LoadRecordsButtonProforma').click();
            }
        };
        generateDateRangePicker(reqDates, start, end, showDate);
        showDate(start, end);

        var proformaTotal = [];
        var descuentos;
        var articuloPrecio;
        var redondeo;
        var decimales_redondeo;
        var articuloPrecioRepuesto;
        var acodigos = [];
        var bcodigos = [];
        var desTotal = $("#desTotal");
        var servicios;
        var igv;
        var dataServicioGeneral;
        var montoTotal = $("#montoTotal");
        var porcentajeTotal = $("#porcentajeTotal");
        var btn_aprobarProforma = $(".btn_aprobarProforma");
        var btn_guardarProforma = $(".btn_guardarProforma");
        var estado = $("#estado");
        var btn_cerrar = $("#btn_cerrar");
        var btn_cancelar_servicio = $("#btn_cancelar_servicio");
        var modalDeleteProforma = $("#modalDeleteProforma");
        var idProformaDelete = $("#idProformaDelete");
        var totalMO = $("#totalMO");
        var totalDescuento = $("#totalDescuento");
        var repuestos_array;
        var estado = $("#estado");
        var table_repuestos = $("#table_repuestos");
        var table_servicios = $("#table_servicios");
        var modalDeleteDetalle = $("#modalDeleteDetalle");
        var idAsesor = $("#idAsesor");
        var cCodConsecutivo = $("#cCodConsecutivo");
        var idcCondicionPago = $("#idcCondicionPago");
        var modalProforma = $("#modalProforma");
        var id_cliente_tipo_or = $("#id_cliente_tipo_or");
        var cCodConsecutivo_orden = $("#cCodConsecutivo_orden");
        var idMoneda = $("#IdMoneda");
        var titlemodalProforma = $("#titlemodalProforma");
        var idcliente = $("#idcliente");
        var documento_or = $("#documento_or");
        var razonsocial_cliente_or = $("#razonsocial_cliente_or");
        var placa = $("#placa");
        var nKilometraje = $("#nKilometraje");
        var motor = $("#motor");
        var color = $("#color");
        var cCodConsecutivoOS = $("#cCodConsecutivoOS");
        var nConsecutivoOS = $("#nConsecutivoOS");
        var articulos_repuestos = $("#articulos_repuestos");
        var tipo_totales_slec = $("#tipo_totales_slec");
        var tipo_totales_slec2 = $("#tipo_totales_slec2");
        var servicios_select = $("#servicios_select");
        var btn_cambio_delete = $("#btn_cambio_delete");
        var mo_revision = $("#mo_revision");
        var mo_mecanica = $("#mo_mecanica");
        var terceros = $("#terceros");
        var otros_mo = $("#otros_mo");
        var subtotal_moa = $("#subtotal_moa");
        var nConsecutivo = $("#nConsecutivo");
        var repuestos = $("#repuestos");
        var accesorios = $("#accesorios");
        var lubricantes = $("#lubricantes");
        var otros_rep = $("#otros_rep");
        var subtotal_mob = $("#subtotal_mob");
        var total = $("#total");
        var totalDetalle = $("#totalDetalle");
        var dFecEntrega = $("#dFecEntrega");
        var nEstimadoHoras = $("#nEstimadoHoras");
        var idProforma = $("#idProforma");
        var btn_imprimirProforma = $(".btn_imprimirProforma");
        btn_imprimirProforma.click(function (e) {
            var id = cCodConsecutivo.val() + "_" + nConsecutivo.val();
            if (id != '') {
                var data = {
                    id: id,
                };
                $scope.loadProformaPDF('proformas/pdf', data);
            }
        });

        function cleandatos() {
            id_cliente_tipo_or.val('');
            idcliente.val('');
            documento_or.val('');
            razonsocial_cliente_or.val('');
            placa.val('');
            nKilometraje.val('');
            motor.val('');
            color.val('');
            cCodConsecutivoOS.val('');
            nConsecutivoOS.val('');
            idMoneda.val('');
            idcCondicionPago.val('');
            idAsesor.val('').trigger('change');
        }

        totalDescuento.select2();
        btn_aprobarProforma.click(function () {
            Aprobar_Proforma_servicio();
        });

        function Aprobar_Proforma_servicio() {
            var id = cCodConsecutivo.val() + "_" + nConsecutivo.val();
            var params = {
                'estado': 1,
            };
            RESTService.updated('proformas/cambiar_estado', id, params, function (response) {
                if (!_.isUndefined(response.status) && response.status) {
                    var data = response.data;
                    if (data[0].Mensaje == 'OK') {
                        AlertFactory.textType({
                            title: '',
                            message: 'La Proforma se aprobó correctamente',
                            type: 'success'
                        });
                        btn_guardarProforma.prop('disabled', true);
                        estado.val(1);
                        LoadRecordsButtonProforma.click();
                    } else {


                        AlertFactory.textType({
                            title: '',
                            message: data[0].Mensaje,
                            type: 'info'
                        });

                    }
                } else {
                    var msg_ = (_.isUndefined(response.message)) ?
                        'No se pudo guardar el Vehiculo. Intente nuevamente.' : response.message;
                    AlertFactory.textType({
                        title: '',
                        message: msg_,
                        type: 'info'
                    });
                }

            });
        }

        totalDescuento.change(function () {
            sumar_key();
            var codigo = $(this).attr('data-desc');
            var val = $(this).val();
            if (val == "") {

                porcentajeTotal.val(0);
                montoTotal.val(0);


            } else {

                var arrayRe = val.split("*");
                var code = arrayRe[0];
                var porc = arrayRe[1];
                var mont = Number(arrayRe[2]);
                var porTotal = Number((Number(porc) * Number(desTotal.val())) / 100);
                console.log("porcentaje total");
                console.log(porTotal);
                $("#porcentajeTotal").val(porc);
                if (porc == 0 || porc == "") {
                    var porTotal = mont;
                }
                $("#montoTotal").val(porTotal.toFixed(decimales_redondeo));
            }
            sumar_key();
            var totalDes = desTotal.val();
            totalDes = Number(totalDes);
            if (totalDescuento.val() != '') {
                if (montoTotal.val() < 1) {
                    totalDes = Number(totalDes) - Number(montoTotal.val());
                } else {

                    totalDes = Number(totalDes) - Number(montoTotal.val());
                }
            }
            desTotal.val(totalDes.toFixed(decimales_redondeo));


        });

        function findRegister_Proforma(id) {

            RESTService.get('proformas/find', id, function (response) {
                if (!_.isUndefined(response.status) && response.status) {

                    var data = response.data;
                    titlemodalProforma.html('Editar Proforma ' + '[' + data[0].nConsecutivo + ']');
                    console.log(data);
                    console.log(response.data_repuesto);
                    console.log(response.data_servicio);
                    cCodConsecutivo.prop('disabled', true);
                    cCodConsecutivo.val(data[0].cCodConsecutivo).trigger("change");
                    nConsecutivo.prop('disabled', true);
                    nConsecutivo.val(data[0].nConsecutivo);
                    var valor_orden_servicio = data[0].cCodConsecutivoOS + '*' + data[0].nConsecutivoOS + '*' + data[0].IdMoneda + '*' + data[0].idcCondicionPago + '*' + data[0].idAsesor + '*' + data[0].asesor + '*' + data[0].idCliente + '*' + data[0].documento + '*' + data[0].idTipoCliente + '*' + data[0].razonsocial_cliente + '*' + data[0].cPlacaVeh + '*' + data[0].nKilometraje + '*' + data[0].cMotor + '*' + data[0].cColor;
                    var val = data[0].cCodConsecutivoOS + '*' + data[0].nConsecutivoOS;
                    cCodConsecutivo_orden.val(val).trigger("change");
                    idAsesor.val(data[0].idAsesorProforma).trigger("change");
                    var hor = Number(data[0].nEstimadoHoras);
                    nEstimadoHoras.val(hor.toFixed(decimales_redondeo));
                    estado.val(data[0].iEstado);
                    if (data[0].iEstado != '0') {
                        btn_guardarProforma.prop('disabled', true);
                    }

                    dFecEntrega.val(data.dFechaRegistro2);
                    _.each(response.data_repuesto, function (b) {
                        var modo_m = 1;
                        var porcen = Number(b.nPorcDescuento);
                        var monto = Number(b.nDescuento);
                        if (porcen > 0) {
                            monto = 0;
                        }
                        ;
                        var idDescuento = "";
                        if (b.nIdDscto != 0) {
                            idDescuento = b.nIdDscto + "*" + porcen + '*' + monto;
                        }

                        //   (idRepues,prodDescrip,precio,tipoTo,tipoText,cantidad,impuesto,modo_ser,iddet,opera,idDescuento)
                        addRepuesto(b.idProducto, b.description, b.nPrecioUnitario, b.id_tipototal, b.descripcioText, Number(b.nCant), b.impuesto, modo_m, b.idDetalleRepues, b.cOperGrat, idDescuento, b.nImpuesto, Number(b.nPorcDescuento), Number(b.nDescuento));
                    });


                    _.each(response.data_servicio, function (b) {
                        var modo_m = 1;
                        var vto = b.idProducto + '*' + b.description + '*' + b.nPrecioUnitario + '*' + b.impuesto;
                        var idDescuento = "";
                        var porcen = Number(b.nPorcDescuento);
                        var monto = Number(b.nDescuento);
                        if (porcen > 0) {
                            monto = 0;
                        }
                        ;
                        if (b.nIdDscto != 0) {
                            idDescuento = b.nIdDscto + "*" + porcen + '*' + monto;
                        }
                        var nImpue = 0;
                        var nPorcDescuento = 0;
                        var nDescuento = 0;
                        addServicios(vto, b.id_tipototal, b.descripcioText, modo_m, b.idDetalleServicio, b.nCant, b.cOperGrat, idDescuento, b.nImpuesto, Number(b.nPorcDescuento), Number(b.nDescuento));

                        //  addServicios(vto,tipoTo,tipoText,modo_servi,idte,cant,opera,idDescuento);
                    });
                    var destotal = "";
                    if (data[0].nIdDsctoPr != 0) {
                        var porcen = Number(data[0].porDes);
                        var monto = Number(data[0].montoDes);
                        destotal = data[0].nIdDsctoPr + "*" + porcen + '*' + monto;
                    }
                    totalDescuento.val(destotal).trigger("change");
                    if (data[0].iEstado == '0') {
                        btn_aprobarProforma.prop('disabled', false);
                    }
                    modalProforma.modal("show");
                } else {
                    AlertFactory.textType({
                        title: '',
                        message: 'Hubo un error al obtener la Proforma. Intente nuevamente.',
                        type: 'error'
                    });
                }
            });
        }

        btn_cancelar_servicio.click(function () {
            cCodConsecutivo_orden.val(cCodConsecutivo_orden.data("prev")).trigger("change");
        });
        btn_cerrar.click(function () {
            cCodConsecutivo_orden.val(cCodConsecutivo_orden.data("prev")).trigger("change");
        });
        $scope.EliminarProforma = function () {
            var id = idProformaDelete.val();
            RESTService.get('proformas/delete', id, function (response) {
                if (!_.isUndefined(response.status) && response.status) {
                    var dta = response.data;
                    if (dta[0]['Mensaje'] != "") {
                        AlertFactory.textType({
                            title: '',
                            message: dta[0]['Mensaje'],
                            type: 'info'
                        });
                        modalDeleteProforma.modal("hide");
                    } else {
                        AlertFactory.textType({
                            title: '',
                            message: 'El registro se eliminó correctamente',
                            type: 'success'
                        });
                        modalDeleteProforma.modal("hide");
                        LoadRecordsButtonProforma.click();
                    }


                }
            });
        }
        $scope.saveProforma = function () {
            var bval = true;
            bval = bval && cCodConsecutivo.required();
            bval = bval && idAsesor.required();

            bval = bval && dFecEntrega.required();
            bval = bval && nEstimadoHoras.required();

            bval = bval && documento_or.required();
            bval = bval && placa.required();

            if ($("#table_repuestos").html() == '' && $("#table_servicios").html() == '') {
                AlertFactory.showWarning({
                    title: '',
                    message: 'Debe agregar un mínimo de 1  Repuesto o Servicio'
                });
                return false;
            }
            //  if($("#table_servicios").html()==''){
            //    AlertFactory.showWarning({
            //         title: '',
            //         message: 'Debe agregar un mínimo de 1 Servicio'
            //     });
            //     return false;
            // }

            acodigos.forEach(function (val, index) {
                var canr = $('#tr_cant' + val);
                bval = bval && canr.required();
            });
            bcodigos.forEach(function (val, index) {
                var canr = $('#tr_cantidadRe_' + val);
                bval = bval && canr.required();
            });
            if ($("#total").val() < 0) {
                AlertFactory.showWarning({
                    title: '',
                    message: 'La operacion gratuita no puede ser menor a 0 '
                });
                return false;
            }
            if ($("#desTotal").val() < 0) {
                AlertFactory.showWarning({
                    title: '',
                    message: 'El total no puede ser menor a 0'
                });
                return false;
            }
            if (bval) {

                var id_repuesto_array = [];
                $.each($('.idRepuesto_select'), function (idx, item) {
                    id_repuesto_array[idx] = $(item).val();
                });
                id_repuesto_array = id_repuesto_array.join(',');

                var id_repuesto_cantidad = [];
                $.each($('.cantidad_m'), function (idx, item) {
                    id_repuesto_cantidad[idx] = $(item).val();
                });
                id_repuesto_cantidad = id_repuesto_cantidad.join(',');


                var idDescuenRepues = [];
                $.each($('.descuentosSelectRe'), function (idx, item) {
                    var valo = $(item).val();
                    var arrayRe = valo.split("*");
                    var coded = arrayRe[0];
                    idDescuenRepues[idx] = coded
                });

                idDescuenRepues = idDescuenRepues.join(',');

                var id_repuesto_tipoTotal = [];
                $.each($('.idTipoRepuesto_select'), function (idx, item) {
                    id_repuesto_tipoTotal[idx] = $(item).val();
                });
                id_repuesto_tipoTotal = id_repuesto_tipoTotal.join(',');

                var id_repuesto_precio = [];
                $.each($('.precioRepuesto_m'), function (idx, item) {
                    id_repuesto_precio[idx] = $(item).val();
                });
                id_repuesto_precio = id_repuesto_precio.join(',');


                var id_repuesto_impuesto = [];
                $.each($('.totalImpuesto_repuesto'), function (idx, item) {
                    id_repuesto_impuesto[idx] = $(item).val();
                });
                id_repuesto_impuesto = id_repuesto_impuesto.join(',');


                var modo_array_repuesto = [];
                $.each($('.modo_serRepuestoDet'), function (idx, item) {
                    modo_array_repuesto[idx] = $(item).val();
                });
                modo_array_repuesto = modo_array_repuesto.join(',');


                var subTotalServicio = [];
                $.each($('.subtotal_servicio '), function (idx, item) {
                    subTotalServicio[idx] = $(item).val();
                });
                subTotalServicio = subTotalServicio.join(',');

                var modo_array_repuesto = [];
                $.each($('.modo_serRepuestoDet'), function (idx, item) {
                    modo_array_repuesto[idx] = $(item).val();
                });
                modo_array_repuesto = modo_array_repuesto.join(',');

                var operacionGraRep = [];
                $.each($('.subtotal_repuesto '), function (idx, item) {
                    operacionGraRep[idx] = $(item).val();
                });
                operacionGraRep = operacionGraRep.join(',');

                var staOperacionRepu = [];
                $.each($('.checkClassOpe'), function (idx, item) {
                    var checkOpera = ($(this).prop('checked')) ? 'S' : 'N';
                    staOperacionRepu[idx] = checkOpera;
                });
                staOperacionRepu = staOperacionRepu.join(',');

                var staOperacion = [];
                $.each($('.checkClass'), function (idx, item) {
                    var checkOpera = ($(this).prop('checked')) ? 'S' : 'N';
                    staOperacion[idx] = checkOpera;
                });
                staOperacion = staOperacion.join(',');

                var idDetalleGrupRep = [];
                $.each($('.idDetalleRepuestoGrup'), function (idx, item) {
                    idDetalleGrupRep[idx] = $(item).val();
                });
                idDetalleGrupRep = idDetalleGrupRep.join(',');

                var montoRepu = [];
                $.each($('.montoRe'), function (idx, item) {

                    var montod = $(item).val();
                    if (montod == "") {
                        montod = 0;
                    }
                    montoRepu[idx] = montod;
                });
                montoRepu = montoRepu.join(',');

                var porRepu = [];
                $.each($('.porcentRe'), function (idx, item) {

                    var porcen = $(item).val();
                    if (porcen == "") {
                        porcen = 0;
                    }
                    porRepu[idx] = porcen;
                });
                porRepu = porRepu.join(',');

                /////////
                var id_revision_array = [];
                $.each($('.idRevision_select'), function (idx, item) {
                    id_revision_array[idx] = $(item).val();
                });
                id_revision_array = id_revision_array.join(',');

                var id_tipo_array = [];
                $.each($('.idTipo_select'), function (idx, item) {
                    id_tipo_array[idx] = $(item).val();
                });
                id_tipo_array = id_tipo_array.join(',');

                var cantidDeta = [];
                $.each($('.cantOrde '), function (idx, item) {
                    cantidDeta[idx] = $(item).val();
                });
                cantidDeta = cantidDeta.join(',');

                var montoDeta = [];
                $.each($('.monto'), function (idx, item) {

                    var montod = $(item).val();
                    if (montod == "") {
                        montod = 0;
                    }
                    montoDeta[idx] = montod;
                });
                montoDeta = montoDeta.join(',');

                var idDescuenServ = [];
                $.each($('.descuentosSelect'), function (idx, item) {
                    var valo = $(item).val();
                    var arrayRe = valo.split("*");
                    var coded = arrayRe[0];
                    idDescuenServ[idx] = coded
                });

                idDescuenServ = idDescuenServ.join(',');
                var precio_array = [];
                $.each($('.precio_m'), function (idx, item) {
                    precio_array[idx] = $(item).val();
                });
                precio_array = precio_array.join(',');

                var impuesto_servicio = [];
                $.each($('.totalImpuesto_servicio'), function (idx, item) {
                    impuesto_servicio[idx] = $(item).val();
                });
                impuesto_servicio = impuesto_servicio.join(',');

                var modo_array_servicio = [];
                $.each($('.modo_serDet'), function (idx, item) {
                    modo_array_servicio[idx] = $(item).val();
                });
                modo_array_servicio = modo_array_servicio.join(',');


                var idDetalleGrup = [];
                $.each($('.idDetalleGrup'), function (idx, item) {
                    idDetalleGrup[idx] = $(item).val();
                });
                idDetalleGrup = idDetalleGrup.join(',');

                var porDeta = [];
                $.each($('.porcent'), function (idx, item) {

                    var porcen = $(item).val();
                    if (porcen == "") {
                        porcen = 0;
                    }
                    porDeta[idx] = porcen;
                });
                porDeta = porDeta.join(',');
                var idDescuenDeta = [];
                $.each($('.descuentosSelect'), function (idx, item) {

                    var valo = $(item).val();
                    var arrayRe = valo.split("*");
                    var coded = arrayRe[0];
                    idDescuenDeta[idx] = coded
                });

                idDescuenDeta = idDescuenDeta.join(',');


                var cantidDeta = [];
                $.each($('.cantOrde '), function (idx, item) {
                    cantidDeta[idx] = $(item).val();
                });
                cantidDeta = cantidDeta.join(',');

                var idDetalleRepuestoGrup = [];
                $.each($('.idDetalleRepuestoGrup'), function (idx, item) {
                    idDetalleRepuestoGrup[idx] = $(item).val();
                });
                idDetalleRepuestoGrup = idDetalleRepuestoGrup.join(',');
                var con = $("#nConsecutivo").val();
                if ($("#nConsecutivo").val() == "") {
                    con = 0;
                }
                ;
                var val = totalDescuento.val();
                var arrayRe = val.split("*");
                var coded = arrayRe[0];
                var porcd = arrayRe[1];
                var montd = arrayRe[2];

                var porcenTotal = porcentajeTotal.val();
                if (porcenTotal == "") {
                    porcenTotal = 0;
                }
                var montoTotals = montoTotal.val();
                if (montoTotals == "") {
                    montoTotals = 0;
                }
                console.log(staOperacionRepu);
                console.log("esta operacion repu");
                var params = {
                    'cCod': cCodConsecutivo.val(),
                    'nCons': con,
                    'cCodOS': cCodConsecutivoOS.val(),
                    'nConsOS': nConsecutivoOS.val(),
                    'cMoneda': idMoneda.val(),
                    'nidCliente': idcliente.val(),
                    'nidAsesor': idAsesor.val(),
                    'cPlacaVeh': placa.val(),
                    'dFecRec': dFecEntrega.val(),
                    'nEstimado': nEstimadoHoras.val(),
                    'idDetalleRepuestoGrup': idDetalleRepuestoGrup,
                    'id_repuesto_array': id_repuesto_array,
                    'id_repuesto_cantidad': id_repuesto_cantidad,
                    'id_repuesto_precio': id_repuesto_precio,
                    'id_repuesto_impuesto': id_repuesto_impuesto,
                    'id_repuesto_tipoTotal': id_repuesto_tipoTotal,
                    'modo_array_repuesto': modo_array_repuesto,
                    'id_revision_array': id_revision_array,
                    'id_tipo_array': id_tipo_array,
                    'idDetalleGrup': idDetalleGrup,
                    'precio_array_servicio': precio_array,
                    'impuesto_servicio': impuesto_servicio,
                    'modo_array_servicio': modo_array_servicio,
                    'nDescuentoP': montoTotals,
                    'totalDetalle': totalDetalle.val(),
                    'totalMO': totalMO.val(),
                    'nIdDsctoP': coded,
                    'nPorcDescuentoP': porcenTotal,
                    'nOperGratuitaP': total.val(),
                    'montoRepu': montoRepu,
                    'porRepu': porRepu,
                    'idDescuenRepues': idDescuenRepues,
                    'staOperacionRepu': staOperacionRepu,
                    'operacionGraRep': operacionGraRep,

                    'cantidDeta': cantidDeta,
                    'montoDeta': montoDeta,
                    'porDeta': porDeta,
                    'idDescuenDeta': idDescuenDeta,
                    'staOperacion': staOperacion,
                    'subTotalServicio': subTotalServicio,

                };
                console.log("esto son los id");
                console.log(id_revision_array);

                console.log(id_repuesto_array);
                console.log(idDetalleRepuestoGrup);
                console.log(idDetalleGrup);

                var id = (idProforma.val() === '') ? 0 : idProforma.val();
                RESTService.updated('proformas/createProforma', id, params, function (response) {
                    if (!_.isUndefined(response.status) && response.status) {
                        var data_p = response.res;
                        var tes = response.test;
                        console.log("test");
                        console.log(response.test);
                        if (Number(data_p[0].Mensaje)) {
                            $("#nConsecutivo").val(data_p[0].Mensaje);
                            estado.val("0");
                            btn_aprobarProforma.prop('disabled', false);
                            // btn_guardarProforma.prop('disabled',true);
                            llenarTablas(data_p[0].Mensaje);
                            cCodConsecutivo.prop('disabled', true);
                            AlertFactory.textType({
                                title: '',
                                message: 'La Proforma se registró correctamente.',
                                type: 'success'
                            });
                            LoadRecordsButtonProforma.click();
                        } else {
                            AlertFactory.textType({
                                title: '',
                                message: data_p[0].Mensaje,
                                type: 'info'
                            });
                        }

                    } else {
                        var msg_ = (_.isUndefined(response.message)) ?
                            'No se pudo guardar el Vehiculo. Intente nuevamente.' : response.message;
                        AlertFactory.textType({
                            title: '',
                            message: msg_,
                            type: 'info'
                        });
                    }

                });
            }
        }
        $scope.chkState = function () {
            var txt_state2 = (w_state.prop('checked')) ? 'Activo' : 'Inactivo';
            state_state.html(txt_state2);
        };
        modalProforma.on('hidden.bs.modal', function (e) {
            cleanProforma();
        });
        $('#btn_cambio_delete').click(function (e) {
            EliminarServiciosDetalle();
        });

        function sumar_key() {
            var subA = Number(mo_revision.val()) + Number(mo_mecanica.val()) + Number(terceros.val()) + Number(otros_mo.val());
            var subB = Number(repuestos.val()) + Number(accesorios.val()) + Number(lubricantes.val()) + Number(otros_rep.val());
            subtotal_moa.val(subA.toFixed(decimales_redondeo));
            subtotal_mob.val(subB.toFixed(decimales_redondeo));
            var totalfin = Number(subtotal_moa.val()) + Number(subtotal_mob.val());
            // total.val(totalfin.toFixed(decimales_redondeo));
            // var val=totalDescuento.val();
            // if(val==""){
            //     porcentajeTotal.val(0);
            //     montoTotal.val(0);
            // }else{
            //     var arrayRe=val.split("*");
            //     var code=arrayRe[0];
            //     var porc=arrayRe[1];
            //     var mont=arrayRe[2];
            //     var porTotal=Number((Number(porc)*Number(total.val()))/100);
            //     $("#porcentajeTotal").val(porTotal.toFixed(decimales_redondeo));
            //     $("#montoTotal").val(mont);
            // }
            // var totalDes=total.val();
            // totalDes=Number(totalDes);
            // if(totalDescuento.val()!='' ){
            //     if(montoTotal.val()<1){
            //             var por=Number(porcentajeTotal.val());
            //             totalDes=totalDes-por;
            //         }else{

            //             totalDes=Number(totalDes)-Number(montoTotal.val());
            //         }
            // }
            desTotal.val(totalfin.toFixed(decimales_redondeo));

        }

        function clean_totale() {
            mo_revision.val(0);
            mo_mecanica.val(0);
            terceros.val(0);
            otros_mo.val(0);
            repuestos.val(0);
            accesorios.val(0);
            lubricantes.val(0);
            otros_rep.val(0);
        }

        function llenarTablas(Consecutivo) {
            var id = cCodConsecutivo.val() + '_' + Consecutivo;
            RESTService.get('proformas/find', id, function (response) {
                if (!_.isUndefined(response.status) && response.status) {
                    table_repuestos.html("");
                    table_servicios.html("");
                    var data = response.data;
                    _.each(response.data_repuesto, function (b) {
                        var modo_m = 1;
                        var porcen = Number(b.nPorcDescuento);
                        var monto = Number(b.nDescuento);
                        if (porcen > 0) {
                            monto = 0;
                        }
                        ;
                        var idDescuento = "";
                        if (b.nIdDscto != 0) {
                            idDescuento = b.nIdDscto + "*" + porcen + '*' + monto;
                        }

                        //   (idRepues,prodDescrip,precio,tipoTo,tipoText,cantidad,impuesto,modo_ser,iddet,opera,idDescuento)
                        addRepuesto(b.idProducto, b.description, b.nPrecioUnitario, b.id_tipototal, b.descripcioText, Number(b.nCant), b.impuesto, modo_m, b.idDetalleRepues, b.cOperGrat, idDescuento, b.nImpuesto, Number(b.nPorcDescuento), Number(b.nDescuento));
                    });


                    _.each(response.data_servicio, function (b) {
                        var modo_m = 1;
                        var vto = b.idProducto + '*' + b.description + '*' + b.nPrecioUnitario + '*' + b.impuesto;
                        var idDescuento = "";
                        var porcen = Number(b.nPorcDescuento);
                        var monto = Number(b.nDescuento);
                        if (porcen > 0) {
                            monto = 0;
                        }
                        ;
                        if (b.nIdDscto != 0) {
                            idDescuento = b.nIdDscto + "*" + porcen + '*' + monto;
                        }
                        addServicios(vto, b.id_tipototal, b.descripcioText, modo_m, b.idDetalleServicio, b.nCant, b.cOperGrat, idDescuento, b.nImpuesto, Number(b.nPorcDescuento), Number(b.nDescuento));

                        //  addServicios(vto,tipoTo,tipoText,modo_servi,idte,cant,opera,idDescuento);
                    });
                    var destotal = "";
                    if (data[0].nIdDsctoPr != 0) {
                        var porcen = Number(data[0].porDes);
                        var monto = Number(data[0].montoDes);
                        destotal = data[0].nIdDsctoPr + "*" + porcen + '*' + monto;
                    }
                    totalDescuento.val(destotal).trigger("change");

                } else {
                    AlertFactory.textType({
                        title: '',
                        message: 'Hubo un error al obtener la Proforma. Intente nuevamente.',
                        type: 'error'
                    });
                }
            });
        }

        function EliminarServiciosDetalle() {

            if (nConsecutivo.val() != "") {
                var id = cCodConsecutivo.val() + "_" + nConsecutivo.val();
                var id_revision_array = [];
                $.each($('.idDetalleGrup'), function (idx, item) {
                    id_revision_array[idx] = $(item).val();

                });
                id_revision_array = id_revision_array.join(',');

                var idDetalleRepuestoGrup = [];
                $.each($('.idDetalleRepuestoGrup'), function (idx, item) {
                    idDetalleRepuestoGrup[idx] = $(item).val();

                });
                idDetalleRepuestoGrup = idDetalleRepuestoGrup.join(',');

                var params = {
                    'id_revision_array': id_revision_array,
                    'idDetalleRepuestoGrup': idDetalleRepuestoGrup,
                };

                RESTService.updated('proformas/deleteDetalleMO', id, params, function (response) {
                    if (!_.isUndefined(response.status) && response.status) {
                        var data = response.dato;

                        if (data[0].Mensaje != '') {
                            AlertFactory.textType({
                                title: '',
                                message: data[0].Mensaje,
                                type: 'info'
                            });
                            cCodConsecutivo_orden.data("prev", cCodConsecutivo_orden.val());
                            modalDeleteDetalle.modal("hide");
                        } else {

                            table_servicios.html("");
                            cCodConsecutivo_orden.data("prev", cCodConsecutivo_orden.val());

                            AlertFactory.textType({
                                title: '',
                                message: 'Repuestos y  servicios se eliminaron correctamente',
                                type: 'success'
                            });
                            table_servicios.html("");
                            table_repuestos.html("");
                            clean_totale();
                            calcular_total_repuesto();
                            calcular_total_MO();
                            sumar_key();
                            modalDeleteDetalle.modal("hide");
                        }
                    } else {
                        var msg_ = (_.isUndefined(response.message)) ?
                            'No se pudo eliminar. Intente nuevamente.' : response.message;
                        AlertFactory.textType({
                            title: '',
                            message: msg_,
                            type: 'error'
                        });
                        cCodConsecutivo_orden.data("prev", cCodConsecutivo_orden.val());
                        modalDeleteDetalle.modal("hide");
                    }
                });
            } else {
                modalDeleteDetalle.modal("hide");
                table_servicios.html("");
                table_repuestos.html("");
                clean_totale();
                calcular_total_repuesto();
                calcular_total_MO();
                sumar_key();
            }
        }

        tipo_totales_slec2.change(function () {
            var tipoTo = tipo_totales_slec2.val();
            var tipoText = $("#tipo_totales_slec2 option:selected").text();
            var vto = articulos_repuestos.val();
            if (vto != '' && tipoTo != '') {
                var modo_ser = 0;
                var iddet = 0;
                var cantidad = 1;
                var totRep = vto.split('*');
                var idRepues = totRep[0];
                var precio = totRep[1];
                var prodDescrip = totRep[2];
                var impuesto = totRep[3];
                var opera = 'N';
                var idDescuento = "";
                var totaldata = articuloPrecioRepuesto.split('*');
                var nImpue = 0;
                var nPorcDescuento = 0;
                var nDescuento = 0;
                addRepuesto(totaldata[0], totaldata[1], totaldata[2], tipoTo, tipoText, cantidad, totaldata[3], modo_ser, iddet, opera, idDescuento, nImpue, nPorcDescuento, nDescuento);
            }
        });
        tipo_totales_slec.change(function () {
            var tipoTo = tipo_totales_slec.val();
            var tipoText = $("#tipo_totales_slec option:selected").text();
            var vto = servicios_select.val();
            if (vto != '' && tipoTo != '') {
                var modo_ser = 0;
                var iddet = 0;
                var cant = 1;
                var opera = 'N';
                var idDescuento = "";
                console.log(articuloPrecio);
                console.log("articuloprecios");
                var nImpue = 0;
                var nPorcDescuento = 0;
                var nDescuento = 0;
                addServicios(articuloPrecio, tipoTo, tipoText, modo_ser, iddet, cant, opera, idDescuento, nImpue, nPorcDescuento, nDescuento);
            }
        });

        function calcular_impueso(precio, cantidad) {
            var impu = (Number(precio) * Number(cantidad)) * ((Number(igv) / 100));
            impu = impu.toFixed(decimales_redondeo);
            return impu;
        }

        function calcular_total_repuesto() {
            var totalt = 0;
            $("#table_repuestos tr").each(function () {
                var cantidadt = $(this).find("td:eq(1)").children("input").val();
                var preciot = Number($(this).find("td:eq(2)").children("input").val());
                var estadoImpues = $(this).find("td:eq(3)").children("input").attr('data-impuestoRepuesto');
                var impu = Number($(this).find("td:eq(3)").children("input").val());
                if (estadoImpues == "1") {
                    impu = Number((Number(preciot) * Number(cantidadt)) * ((Number(igv) / 100)));
                }
                ;
                var porce = Number($(this).find("td:eq(6)").children("input").val());
                var monto = Number($(this).find("td:eq(7)").children("input").val());
                var subtota = (cantidadt * preciot) + (impu);
                $(this).find("td:eq(3)").children("input").val(impu.toFixed(decimales_redondeo));
                var codigo = $(this).find("td:eq(1)").children("input").attr('data-cantCoRe');


                if ($("#id_descRe_" + codigo).prop("disabled")) {
                    console.log("check repuestop");

                    subtota = 0;
                } else {
                    console.log("check repuesto");
                    if (porce != '0') {
                        var porcet = Number($(this).find("td:eq(6)").children("input").val());
                        var montopor = subtota * porcet / 100;
                        $("#montoRe_" + codigo).val(montopor.toFixed(decimales_redondeo));
                        subtota = subtota - Number(porce);
                    } else {
                        subtota = subtota - Number(monto);
                    }
                }
                ;

                $(this).find("td:eq(8)").children("input").val(subtota.toFixed(decimales_redondeo));
                totalt = totalt + subtota;

            });
            totales_nuevo();
            totalDetalle.val(totalt.toFixed(decimales_redondeo));

            var totalDes = totalt;
            desTotal.val(totalDes.toFixed(decimales_redondeo));
            totalDescuento.val("").trigger("change");
        }

        function calcular_total_MO() {
            var totalt = 0;
            var operacionGratuita = 0;
            $("#table_servicios tr").each(function () {
                var cantidadt = $(this).find("td:eq(1)").children("input").val();
                var preciot = Number($(this).find("td:eq(2)").children("input").val());
                var estadoImpues = $(this).find("td:eq(3)").children("input").attr('data-impuestoSer');
                var impu = Number($(this).find("td:eq(3)").children("input").val());

                if (estadoImpues == "1") {
                    impu = Number((Number(preciot) * Number(cantidadt)) * ((Number(igv) / 100)));
                }
                ;
                var porce = Number($(this).find("td:eq(6)").children("input").val());
                var monto = Number($(this).find("td:eq(7)").children("input").val());
                var subtota = (cantidadt * preciot) + (impu);
                $(this).find("td:eq(3)").children("input").val(impu.toFixed(decimales_redondeo));
                var codigo = $(this).find("td:eq(1)").children("input").attr('data-codigoC');

                if ($("#id_desc_" + codigo).prop("disabled")) {
                    subtota = 0;
                } else {

                    if (porce != '0') {
                        var porcet = Number($(this).find("td:eq(6)").children("input").val());
                        var montopor = subtota * porcet / 100;
                        $("#monto_" + codigo).val(montopor.toFixed(decimales_redondeo));
                        subtota = subtota - Number(montopor);
                    } else {
                        subtota = subtota - Number(monto);
                    }
                }
                ;

                $(this).find("td:eq(8)").children("input").val(subtota.toFixed(decimales_redondeo));
                totalt = totalt + subtota;
            });

            totales_nuevo();
            totalMO.val(totalt.toFixed(decimales_redondeo));
            var totalDes = totalt;

            desTotal.val(totalDes.toFixed(decimales_redondeo));
            totalDescuento.val("").trigger("change");
        }

        function totales_nuevo() {
            clean_totale()
            console.log("mamamamamammaamammamamamamamamamam");
            var operacionGratuita = 0;
            $("#table_servicios tr").each(function () {
                var data_prec = 'data-precio';
                var tr_pre = 'tr_subtotalSer';
                var tipoTo = $(this).find("td:eq(1)").children("input").attr('data-tipoto');
                var code = $(this).find("td:eq(1)").children("input").attr('data-codigoC');
                var precio_ant = 0;
                var precio_act = $(this).closest("tr").find("td:eq(8)").children("input").val();


                calcular_precio_totales(precio_ant, precio_act, tipoTo, code, tr_pre, data_prec);

                var cantidadt = $(this).find("td:eq(1)").children("input").val();
                var preciot = Number($(this).find("td:eq(2)").children("input").val());
                var estadoImpues = $(this).find("td:eq(3)").children("input").attr('data-impuestoSer');
                var impu = 0;

                if (estadoImpues == "1") {
                    impu = Number((Number(preciot) * Number(cantidadt)) * ((Number(igv) / 100)));
                }
                ;
                var subtota = (cantidadt * preciot) + (impu);

                if ($("#id_desc_" + code).prop("disabled")) {
                    operacionGratuita = operacionGratuita + subtota;
                }
            });
            $("#table_repuestos tr").each(function () {
                var data_prec = 'data-precio';
                var tr_pre = 'tr_subtotalSer';
                var tipoTo = $(this).find("td:eq(1)").children("input").attr('data_idTipoCanti');
                var code = $(this).find("td:eq(1)").children("input").attr('data-cantCoRe');
                var precio_ant = 0;
                var precio_act = $(this).closest("tr").find("td:eq(8)").children("input").val();
                var cantidadt = $(this).find("td:eq(1)").children("input").val();
                var preciot = Number($(this).find("td:eq(2)").children("input").val());
                var estadoImpues = $(this).find("td:eq(3)").children("input").attr('data-impuestoRepuesto');
                var impu = 0;
                if (estadoImpues == "1") {
                    impu = Number((Number(preciot) * Number(cantidadt)) * ((Number(igv) / 100)));
                }
                ;
                var subtota = (cantidadt * preciot) + (impu);

                calcular_precio_totales(precio_ant, precio_act, tipoTo, code, tr_pre, data_prec);

                if ($("#id_descRe_" + code).prop("disabled")) {
                    operacionGratuita = operacionGratuita + subtota;
                }
            });
            total.val(operacionGratuita.toFixed(decimales_redondeo));

        }

        function calcular_precio_totales(precio_ant, precio_act, tipoTo, code, tr_pre, data_prec) {
            if (tipoTo == '1') {
                var mo = mo_revision.val();
                var precio_temp = Number(mo) - Number(precio_ant);
                var mont = Number(precio_temp) + Number(precio_act);
                $("#" + tr_pre + code).attr(data_prec, mont.toFixed(decimales_redondeo));
                mo_revision.val(mont.toFixed(decimales_redondeo));
            } else if (tipoTo == '2') {
                var mo = mo_mecanica.val();
                var precio_temp = Number(mo) - Number(precio_ant);
                var mont = Number(precio_temp) + Number(precio_act);
                $("#" + tr_pre + code).attr(data_prec, mont.toFixed(decimales_redondeo));
                mo_mecanica.val(mont.toFixed(decimales_redondeo));
            } else if (tipoTo == '3') {
                var mo = terceros.val();
                var precio_temp = Number(mo) - Number(precio_ant);
                var mont = Number(precio_temp) + Number(precio_act);
                $("#" + tr_pre + code).attr(data_prec, mont.toFixed(decimales_redondeo));
                terceros.val(mont.toFixed(decimales_redondeo));
            } else if (tipoTo == '4') {
                var mo = otros_mo.val();
                var precio_temp = Number(mo) - Number(precio_ant);
                var mont = Number(precio_temp) + Number(precio_act);
                $("#" + tr_pre + code).attr(data_prec, mont.toFixed(decimales_redondeo));
                otros_mo.val(mont.toFixed(decimales_redondeo));
            } else if (tipoTo == '5') {
                var mo = repuestos.val();
                var precio_temp = Number(mo) - Number(precio_ant);
                var mont = Number(precio_temp) + Number(precio_act);
                $("#" + tr_pre + code).attr(data_prec, mont.toFixed(decimales_redondeo));
                repuestos.val(mont.toFixed(decimales_redondeo));
            } else if (tipoTo == '6') {
                var mo = accesorios.val();
                var precio_temp = Number(mo) - Number(precio_ant);
                var mont = Number(precio_temp) + Number(precio_act);
                $("#" + tr_pre + code).attr(data_prec, mont.toFixed(decimales_redondeo));
                accesorios.val(mont.toFixed(decimales_redondeo));
            } else if (tipoTo == '7') {
                var mo = lubricantes.val();
                var precio_temp = Number(mo) - Number(precio_ant);
                var mont = Number(precio_temp) + Number(precio_act);
                $("#" + tr_pre + code).attr(data_prec, mont.toFixed(decimales_redondeo));
                lubricantes.val(mont.toFixed(decimales_redondeo));
            } else if (tipoTo == '8') {
                var mo = otros_rep.val();
                var precio_temp = Number(mo) - Number(precio_ant);
                var mont = Number(precio_temp) + Number(precio_act);
                $("#" + tr_pre + code).attr(data_prec, mont.toFixed(decimales_redondeo));
                otros_rep.val(mont.toFixed(decimales_redondeo));
            }
        }

        function cambio(codigo) {


            if ($("#pOper" + codigo).prop('checked')) {

                $("#id_desc_" + codigo).prop("disabled", false);
                calcular_total_MO();

                sumar_key();
            } else {


                $("#id_desc_" + codigo).val("").trigger('change');
                $("#id_desc_" + codigo).prop("disabled", true);
                calcular_total_MO();
                sumar_key();


            }

        }

        function cambio2(codigo) {
            var code = codigo;
            if ($("#pOperRe" + code).prop('checked')) {
                console.log("entro al disabled");
                $("#id_descRe_" + code).prop("disabled", false);
            } else {
                $("#id_descRe_" + code).val("").trigger('change');
                $("#id_descRe_" + code).prop("disabled", true);
            }
            calcular_total_repuesto();
            sumar_key();
        }

        function addDescuentosRepuestos(codigo, idDescuento) {
            var selectDescuento = $("#id_descRe_" + codigo);
            selectDescuento.select2();
            var hoy = new Date();
            var hAnio = hoy.getFullYear();
            var hmes = hoy.getMonth() + 1;
            if (Number(hmes) < 10) {
                hmes = '0' + String(hmes);
            }

            var hdia = hoy.getDate();
            if (Number(hdia) < 10) {
                hdia = '0' + String(hdia);
            }
            var actu = hAnio + '-' + hmes + '-' + hdia;
            var descuentos_agregados = [];
            selectDescuento.append('<option value="" selected>Seleccionar</option>');
            _.each(descuentos, function (item) {
                var mo = idMoneda.val();

                // if(item.nIdProducto==codigo || item.cTipoAplica=='T'){
                //        var por=Number(item.nPorcDescuento);
                //        var monto=Number(item.nMonto);
                //     if((item.idMoneda==mo || item.nPorcDescuento!=0) && (item.nSaldoUso>0 || item.nLimiteUso==0) && item.cTipoAplica=='L'){
                //         if(item.dFecIni<=actu && item.dFecFin>actu){
                //             var valDes=item.id+'*'+por+'*'+monto;

                //             // if(valDes==idDescuento){
                //             //     selectDescuento.append('<option value="'+item.id+'*'+por+'*'+monto+'" selected>'+item.descripcion+'</option>');
                //             // }else{
                //                 selectDescuento.append('<option value="'+item.id+'*'+por+'*'+monto+'" >'+item.descripcion+'</option>');
                //             // }


                //         }
                //     }
                // }
                if (item.dFecIni <= actu && item.dFecFin > actu) {
                    var por = Number(item.nPorcDescuento);
                    var monto = Number(item.nMonto);
                    if (item.cTipoAplica == 'T') {
                        // if(item.idMoneda==mo || item.nPorcDescuento!=0){
                        //     if(item.nSaldoUso>0 || item.nLimiteUso==0){
                        //           selectDescuento.append('<option value="'+item.id+'*'+por+'*'+monto+'" >'+item.descripcion+'</option>');
                        //     }

                        // }
                    } else {
                        // solo para el detalle
                        if (item.cTipoAplica == 'L' && descuentos_agregados.indexOf(item.id) == -1) {
                            if (item.todos_articulos == "N") { // cuando es no, valida por articulo

                                if (item.nIdProducto == idarticulo) {

                                    if ((item.idMoneda == mo || item.nPorcDescuento != 0) && (item.nSaldoUso > 0 || item.nLimiteUso == 0)) {

                                        selectDescuento.append('<option value="' + item.id + '*' + por + '*' + monto + '" >' + item.descripcion + '</option>');

                                    }
                                }
                            } else {
                                if ((item.idMoneda == mo || item.nPorcDescuento != 0) && (item.nSaldoUso > 0 || item.nLimiteUso == 0)) {

                                    selectDescuento.append('<option value="' + item.id + '*' + por + '*' + monto + '" >' + item.descripcion + '</option>');

                                }
                            }
                        }

                    }
                    descuentos_agregados.push(item.id);

                }
                $("#id_descRe_" + codigo).val(idDescuento).trigger("change");

            });
        }

        function addRepuesto(idRepues, prodDescrip, precio, tipoTo, tipoText, cantidad, impuesto, modo_ser, iddet, opera, idDescuento, impuesTotal, nPorcDescuento, nDescuento) {
            var code = idRepues;
            var producto = prodDescrip;
            var precio = precio;
            var porcentajeid = 0;
            var montoid = 0;
            var precio_cam = precio;
            var check = "";
            var disab = "";
            if (opera == "S") {
                check = "checked";
                disab = "disabled";
            }
            var preci_t = Number(precio).toFixed(decimales_redondeo);
            var impuesto_can = Number(impuesTotal);
            if (iddet != 0) {
                impuesto = 0;
                if (idDescuento != "") {
                    porcentajeid = nPorcDescuento;
                    montoid = nDescuento;
                }
            }
            if (impuesto == 1) {
                impuesto_can = calcular_impueso(preci_t, cantidad);
            }
            ;


            var subt = Number(preci_t) * Number(cantidad) + Number(impuesto_can);
            // if(idDescuento!=""){
            //     var arrayDe=idDescuento.split("*");
            //      porcentajeid=arrayDe[1];
            //      var montoAdd=Number(subt)*Number(porcentajeid)/100;
            //      montoid=montoAdd.toFixed(decimales_redondeo);
            //      if(porcentajeid==0 || porcentajeid==""){
            //          montoid=arrayDe[2];
            //      }
            // }

            if ($('#tr_rep_' + code).length > 0) {
                AlertFactory.showWarning({
                    title: '',
                    message: 'Ya se asignó este repuesto'
                });
                return false;
            }
            bcodigos.push(code);
            var tr = $('<tr id="tr_rep_' + code + '"></tr>');
            var td1 = $('<td>' + producto + '</td>');
            var tdcant = $('<td></td>');
            var tda = $('<td></td>');
            var tdImpu = $('<td></td>');
            var tsImp = $('<td></td>');
            var tdOper = $('<td></td>');
            var tdSubT = $('<td></td>');
            var tdb = $('<td></td>');
            var tdPorcentaje = $('<td></td>');
            var tdMonto = $('<td></td>');
            var tdim = $('<td></td>');
            var td2 = $('<td class="text-center"></td>');
            var ngratuito = $('<input type="hidden" id="gratRe' + code + '" class="nGratuito form-control input-sm"  value=""/>');
            var chek = $(' <div class="col-sm-1"><label class="checkbox-inline i-checks"><input data-idCheckRe="' + code + '" data-tipotoChekRe="' + tipoTo + '" class="checkClassOpe" type="checkbox" id="pOperRe' + code + '" ' + check + '  /> </label></div>');
            var monto = $('<input type="type" id="montoRe_' + code + '" class="montoRe form-control input-sm"  value="' + montoid + '"  readonly/>');
            var porc = $('<input type="type" id="porcRe_' + code + '" class="porcentRe form-control input-sm"  value="' + porcentajeid + '"  readonly/>');
            var inpDes = $('<select id="id_descRe_' + code + '" data-tipotoSeRe="' + tipoTo + '"  class="descuentosSelectRe form-control input-sm" data-descRe="' + code + '"  style="width: 100%"  ' + disab + ' ></select>');
            var idRepuesto_input = $('<input type="hidden" class="idRepuesto_select form-control input-sm"  value="' + code + '" />');
            var idTipo_input = $('<input type="hidden" class="idTipoRepuesto_select form-control input-sm"  value="' + tipoTo + '" />');
            var idGrupDe_input = $('<input type="hidden" class="idDetalleRepuestoGrup form-control input-sm"  value="' + iddet + '" />');
            var idinput_modoser = $('<input type="hidden" class="modo_serRepuestoDet form-control input-sm"  value="' + modo_ser + '" />');
            var tipototal = $('<input class="total_repuesto form-control input-sm" data-idTipoRepuesto="' + tipoTo + '" data-idS="' + code + '" id="tr_pre' + code + '"  value="' + tipoText + '" readonly/>');
            var impuestoRe = $('<input type="number" class="totalImpuesto_repuesto form-control input-sm" data-impuestoRepuesto="' + impuesto + '"  id="tr_impu' + code + '"  value="' + impuesto_can + '" readonly/>');
            var subtotal_input = $('<input type="number" class="subtotal_repuesto form-control input-sm" data-Subtotal="' + subt + '"  id="tr_subtotal' + code + '"  value="' + subt.toFixed(decimales_redondeo) + '" readonly/>');
            var cantidad = $('<input type="text" onkeypress="return soloNumeros(event)" class="cantidad_m form-control input-sm" data-cantCoRe="' + code + '"  data_idTipoCanti="' + tipoTo + '"  data-cantImpues="' + impuesto + '" data-cantidad="' + cantidad + '" id="tr_cantidadRe_' + code + '" value="' + cantidad + '"  />');
            var precio = $('<input type="text" min="1" class="precioRepuesto_m form-control input-sm" data-codigoCanRe="' + code + '"  data_idTipoPresRepuesto="' + tipoTo + '" id="tr_prec_Repuesto' + code + '" data-precioRepuesto="' + preci_t + '" value="' + preci_t + '"  onkeypress="return validDecimals(event, this, 2)"/>');
            var btn = $('<button class="btn btn-danger btn-xs deltotalRepues" data-idedetRepues="' + iddet + '" data_idTipoDelRepues="' + tipoTo + '"   data-idRepues="' + code + '" type="button"><span class="fa fa-trash"></span></button>');
            tdImpu.append(inpDes);
            tdOper.append(chek);
            tdPorcentaje.append(porc);
            tdcant.append(cantidad);
            tdMonto.append(monto);
            tda.append(precio);
            tsImp.append(impuestoRe);
            tdcant.append(cantidad);
            tdSubT.append(subtotal_input);
            tdb.append(tipototal);
            td2.append(btn).append(idRepuesto_input).append(idTipo_input).append(idinput_modoser).append(idGrupDe_input).append(ngratuito);
            tr.append(td1).append(tdcant).append(tda).append(tsImp).append(tdOper).append(tdImpu).append(tdPorcentaje).append(tdMonto).append(tdSubT).append(tdb).append(td2);
            table_repuestos.append(tr);

            cCodConsecutivo_orden.data("prev", cCodConsecutivo_orden.val());
            var precio = precio_cam;
            addDescuentosRepuestos(code, idDescuento);
            calcular_total_repuesto();
            sumar_key();
            articulos_repuestos.val("").trigger("change");
            tipo_totales_slec2.val("").trigger("change");


            $('.cantidad_m').keyup(function (e) {
                calcular_total_repuesto();
                sumar_key();
            });

            $(".checkClassOpe").click(function () {
                var codigo2 = $(this).closest("tr").find("td:eq(2)").children("input").attr('data-codigoCanRe');

                cambio2(codigo2);
            });
            $('#pOperRe' + code).iCheck({
                checkboxClass: 'icheckbox_square-green'
            }).on('ifChanged', function (event) {
                $(event.target).click();


            });
            //  $("#tr_cantidad_"+code).keypress(function(e) {

            //  var tecl = (e.keyCode ? e.keyCode : e.which);
            //     if(tecl==13){
            //     var tipoTo =$("#tr_prec_Repuesto"+code).attr('data_idTipoPresRepuesto');
            //     var precio_ant =$("#tr_prec_Repuesto"+code).attr('data-precioRepuesto');
            //     var impuEstado=$("#tr_impu"+code).attr('data-impuestoRepuesto');
            //     var impuesto_can=0;
            //     var cantidad=Number($("#tr_cantidad_"+code).val());
            //     var precio_act=$("#tr_prec_Repuesto"+code).val()*cantidad;
            //     if(impuEstado=='1'){
            //         var preci=$("#tr_prec_Repuesto"+code).val();
            //         impuesto_can=calcular_impueso(preci,cantidad);
            //     }
            //     precio_act=Number(precio_act)+Number(impuesto_can);
            //     $("#tr_impu"+code).val(impuesto_can);
            //     calcular_total_repuesto();
            //     var tr_pre='tr_prec_Repuesto';
            //     var data_prec='data-precioRepuesto';
            //     calcular_precio_totales(precio_ant,precio_act,tipoTo,code,tr_pre,data_prec);
            //     sumar_key();
            //     }
            //  });
            $(".descuentosSelectRe").change(function () {
                var codigo = $(this).attr('data-descRe');
                var val = $(this).val();
                var arrayRe = val.split("*");
                var code = arrayRe[0];
                var porc = arrayRe[1];
                var mont = arrayRe[2];
                if ($(this).val() != "") {
                    if (porc != '0') {
                        var cantidadt = $(this).closest("tr").find("td:eq(1)").children("input").val();
                        var preciot = Number($(this).closest("tr").find("td:eq(2)").children("input").val());
                        var impuestot = Number($(this).closest("tr").find("td:eq(3)").children("input").val());
                        var subtota = (cantidadt * preciot) + (impuestot);
                        var porTotal = Number((Number(porc) * Number(subtota)) / 100);
                        $("#porcRe_" + codigo).val(porc);
                        $("#montoRe_" + codigo).val(0);
                    } else {
                        $("#montoRe_" + codigo).val(mont);
                        $("#porcRe_" + codigo).val(0);
                    }
                } else {
                    $("#montoRe_" + codigo).val("");
                    $("#porcRe_" + codigo).val("");
                }

                calcular_total_repuesto();
                sumar_key();


            });
            $('.precioRepuesto_m').blur(function (e) {

                var preciOr = $(this).attr('data-precioRepuesto');
                var precioEs = $(this).val();
                var newpp = Number(preciOr) + Number(redondeo);
                var newpn = Number(preciOr) - Number(redondeo);
                if (precioEs > newpp || precioEs < newpn) {
                    AlertFactory.textType({
                        title: '',
                        message: 'El precio del producto solo se puede ajustar +- ' + redondeo,
                        type: 'info'
                    });
                    $(this).val(preciOr);

                }
                calcular_total_repuesto();
                sumar_key();
            });
            $('.precioRepuesto_m').keypress(function (e) {

                var preciOr = $(this).attr('data-precioRepuesto');
                var code = (e.keyCode ? e.keyCode : e.which);
                if (code == 13) {
                    var precioEs = $(this).val();
                    var newpp = Number(preciOr) + Number(redondeo);
                    var newpn = Number(preciOr) - Number(redondeo);
                    if (precioEs > newpp || precioEs < newpn) {
                        AlertFactory.textType({
                            title: '',
                            message: 'El precio del producto solo se puede ajustar +- ' + redondeo,
                            type: 'info'
                        });
                        $(this).val(preciOr);

                    }
                    calcular_total_repuesto();
                    sumar_key();
                }
            });
            $('.deltotalRepues').click(function (e) {
                var code = $(this).attr('data-idRepues');
                var idTipo = $(this).attr('data_idTipoDelRepues');
                var idedet = $(this).attr('data-idedetRepues');
                AlertFactory.confirm({
                    title: '',
                    message: '¿Está seguro que desea quitar este repuesto ?',
                    confirm: 'Si',
                    cancel: 'No'
                }, function () {
                    if (nConsecutivo.val() != '' && idedet) {
                        var id = cCodConsecutivo.val() + '_' + nConsecutivo.val() + '_' + idedet;
                        RESTService.get('proformas/deleteDetalleRepuesto', id, function (response) {
                            if (!_.isUndefined(response.status) && response.status) {
                                var data = response.data;
                                if (data[0].Mensaje != '') {
                                    AlertFactory.textType({
                                        title: '',
                                        message: data[0].Mensaje,
                                        type: 'info'
                                    });
                                } else {
                                    AlertFactory.textType({
                                        title: '',
                                        message: 'El repuesto se eliminó correctamente',
                                        type: 'success'
                                    });
                                    $('#tr_rep_' + code).remove();
                                    calcular_total_repuesto()
                                    sumar_key();
                                }
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
                    } else {

                        var precio_borrar = $("#tr_subtotal" + code).val();

                        if (idTipo == '1') {
                            var mo_r = mo_revision.val();
                            var new_mor = Number(mo_r) - Number(precio_borrar);
                            mo_revision.val(new_mor.toFixed(decimales_redondeo));
                        } else if (idTipo == '2') {
                            var mo_m = mo_mecanica.val();
                            var new_mo_m = Number(mo_m) - Number(precio_borrar);

                            mo_mecanica.val(new_mo_m.toFixed(decimales_redondeo));
                        } else if (idTipo == '3') {
                            var mo_tr = terceros.val();
                            var new_mo_tr = Number(mo_tr) - Number(precio_borrar);
                            terceros.val(new_mo_tr.toFixed(decimales_redondeo));
                        } else if (idTipo == '4') {
                            var mo_otr = otros_mo.val();
                            var new_mo_otr = Number(mo_otr) - Number(precio_borrar);
                            otros_mo.val(new_mo_otr.toFixed(decimales_redondeo));
                        } else if (idTipo == '5') {
                            var mo_rp = repuestos.val();
                            var new_mo_rp = Number(mo_rp) - Number(precio_borrar);
                            repuestos.val(new_mo_rp.toFixed(decimales_redondeo));
                        } else if (idTipo == '6') {
                            var mo_ac = accesorios.val();
                            var new_mo_ac = Number(mo_ac) - Number(precio_borrar);
                            accesorios.val(new_mo_ac.toFixed(decimales_redondeo));
                        } else if (idTipo == '7') {
                            var mo_lub = lubricantes.val();
                            var new_mo_lub = Number(mo_lub) - Number(precio_borrar);
                            lubricantes.val(new_mo_lub.toFixed(decimales_redondeo));
                        } else if (idTipo == '8') {
                            var mo_trp = otros_rep.val();
                            var new_trp = Number(mo_trp) - Number(precio_borrar);
                            otros_rep.val(new_trp.toFixed(decimales_redondeo));
                        }

                        $('#tr_rep_' + code).remove();

                    }
                    calcular_total_repuesto()
                    sumar_key();

                });
                e.preventDefault();
            });
        }

        function addServicios(vto, tipoTo, tipoText, modo_ser, iddet, cant, opera, idDescuento, impuesTotal, nPorcDescuento, nDescuento) {
            var cat_servicio = $("#servicios_select").find(':selected').attr('data-categoria');
            var arrayRe = vto.split("*");
            var porcentajeid = 0;
            var montoid = 0;
            var code = arrayRe[0];
            var producto = arrayRe[1];
            var precio = arrayRe[2];
            var impuesto = arrayRe[3];
            var preci_t = Number(precio).toFixed(decimales_redondeo);
            var impuesto_can = Number(impuesTotal);
            var cantidad = cant;
            cantidad = Number(cantidad);
            if (iddet != 0) {
                impuesto = 0;
                if (idDescuento != "") {
                    porcentajeid = nPorcDescuento;
                    montoid = nDescuento;
                }
            }
            if (impuesto == 1) {
                impuesto_can = calcular_impueso(preci_t, cantidad);
            }
            ;

            var check = "";
            var disab = "";
            if (opera == "S") {
                check = "checked";
                disab = "disabled";
            }
            var subt = 0;
            subt = Number(preci_t) * Number(cantidad) + Number(impuesto_can);
            // if(idDescuento!=""){
            //     var arrayDe=idDescuento.split("*");
            //      porcentajeid=arrayDe[1];
            //      var montoAdd=Number(subt)*Number(porcentajeid)/100;
            //      montoid=montoAdd.toFixed(decimales_redondeo);
            //      if(porcentajeid==0 || porcentajeid==""){
            //          montoid=arrayDe[2];
            //      }
            // }
            if ($('#tr_b_' + code).length > 0) {
                AlertFactory.showWarning({
                    title: '',
                    message: 'Ya se asignó este servicio'
                });
                return false;
            }


            acodigos.push(code);
            var tr = $('<tr id="tr_b_' + code + '"></tr>');
            var td1 = $('<td>' + producto + '</td>');
            var tdCant = $('<td></td>');
            var tda = $('<td></td>');
            var tdImpu = $('<td></td>');
            var tdOper = $('<td></td>');
            var tdb = $('<td></td>');
            var tdim = $('<td></td>');
            var tdPorcentaje = $('<td></td>');
            var tdMonto = $('<td></td>');
            var tdim = $('<td></td>');
            var tdsub = $('<td></td>');
            var td2 = $('<td class="text-center"></td>');
            var ngratuito = $('<input type="hidden" id="grat' + code + '" class="nGratuito form-control input-sm"  value=""/>');
            var preVer = $('<input type="text" class="form-control input-sm"  value="' + preci_t + '"  />');
            var cantidad = $('<input type="text" onkeypress="return soloNumeros(event)" class="cantOrde form-control input-sm" data-cant="' + impuesto + '"  id="tr_cant' + code + '" data-codigoC="' + code + '" data-tipoto="' + tipoTo + '" value="' + cantidad + '"/>');
            var chek = $(' <div class="col-sm-1"><label class="checkbox-inline i-checks"><input data-idCheck="' + code + '" data-tipotoChek="' + tipoTo + '" class="checkClass" type="checkbox" id="pOper' + code + '" ' + check + '  /> </label></div>');
            var monto = $('<input type="type" id="monto_' + code + '" class="monto form-control input-sm"  value="' + montoid + '"  readonly/>');
            var porc = $('<input type="type" id="porc_' + code + '" class="porcent form-control input-sm"  value="' + porcentajeid + '"  readonly/>');
            var inpDes = $('<select id="id_desc_' + code + '" data-tipotoSe="' + tipoTo + '"  class="descuentosSelect form-control input-sm" data-desc="' + code + '"  style="width: 100%"  ' + disab + ' ></select>');
            var idRevision_input = $('<input type="hidden" class="idRevision_select form-control input-sm"  value="' + code + '"  />');
            var impuestoRe = $('<input type="number" class="totalImpuesto_servicio form-control input-sm" data-impuestoSer="' + impuesto + '"  id="tr_impSer' + code + '" data-imp="' + impuesto_can + '" value="' + impuesto_can + '" readonly/>');
            var subtotal_input = $('<input type="number" class="subtotal_servicio form-control input-sm" data-SubtotalSer="' + subt + '" data-precio="' + subt.toFixed(decimales_redondeo) + '"  id="tr_subtotalSer' + code + '"  value="' + subt.toFixed(decimales_redondeo) + '" readonly/>');
            var idTipo_input = $('<input type="hidden" class="idTipo_select form-control input-sm"  value="' + tipoTo + '" />');
            var idGrupDe_input = $('<input type="hidden" class="idDetalleGrup form-control input-sm"  value="' + iddet + '" />');
            var idinput_modoser = $('<input type="hidden" class="modo_serDet form-control input-sm"  value="' + modo_ser + '" />');
            var tipototal = $('<input class="total_revision form-control input-sm" data-idTipo="' + tipoTo + '" data-idS2="' + code + '"  value="' + tipoText + '" readonly/>');
            var precio = $('<input type="text" class="precio_m form-control input-sm"  data_idTipoPres="' + tipoTo + '" id="tr_prec_' + code + '"  data-categoriaServicio="' + cat_servicio + '" data-precioOrigen="' + preci_t + '" value="' + preci_t + '"   onkeypress="return validDecimals(event, this, 2)" />');
            var btn = $('<button class="btn btn-danger btn-xs deltotal" data-idedet="' + iddet + '" data_idTipoDel="' + tipoTo + '" data-id="' + code + '" type="button"><span class="fa fa-trash"></span></button>');
            tdImpu.append(inpDes);
            tdOper.append(chek);
            tdPorcentaje.append(porc);
            tdCant.append(cantidad);
            tdMonto.append(monto);
            tda.append(precio);
            tdb.append(tipototal);
            tdim.append(impuestoRe);
            tdsub.append(subtotal_input);
            tda.append(precio);
            td2.append(btn).append(idRevision_input).append(idTipo_input).append(idinput_modoser).append(idGrupDe_input).append(ngratuito);

            tr.append(td1).append(tdCant).append(tda).append(tdim).append(tdOper).append(tdImpu).append(tdPorcentaje).append(tdMonto).append(tdsub).append(tdb).append(td2);
            table_servicios.append(tr);
            //  idMoneda.data("prev",idMoneda.val());
            //  id_tipocli.data("prev",id_cliente_tipo_or.val());
            var precio = arrayRe[2];
            var precio_antT = 0;
            var precio_actT = Number(precio) + Number(impuesto_can);
            var data_prec = 'data-precio';
            var tr_pre = 'tr_subtotalSer';
            if (idProforma != "") {
                if (opera == "S") {
                    precio_actT = 0;
                } else {

                    precio_actT = (Number(cant) * Number(precio)) + Number(impuesto_can) - Number(porcentajeid) - Number(montoid);
                    precio_actT = precio_actT.toFixed(decimales_redondeo);
                }
                ;
            }
            addDescuentos(code, idDescuento);
            calcular_total_MO();
            sumar_key();
            $('.precio_m').blur(function (e) {
                var preciOr = $(this).attr('data-precioOrigen');
                var catServicio = $(this).attr('data-categoriaservicio');
                var precioEs = $(this).val();
                var newpp = Number(preciOr) + Number(redondeo);
                var newpn = Number(preciOr) - Number(redondeo);
                console.log(catServicio, dataServicioGeneral, " servicios data ");
                if (catServicio != dataServicioGeneral) {
                    console.log("entro a validar");
                    if (precioEs > newpp || precioEs < newpn) {
                        AlertFactory.textType({
                            title: '',
                            message: 'El precio del producto solo se puede ajustar +- ' + redondeo,
                            type: 'info'
                        });
                        $(this).val(preciOr);

                    }
                }
                calcular_total_MO();
                sumar_key();


            });
            $('.precio_m').keypress(function (e) {

                var preciOr = $(this).attr('data-precioOrigen');
                var catServicio = $(this).attr('data-categoriaservicio');

                var code = (e.keyCode ? e.keyCode : e.which);
                if (code == 13) {
                    var precioEs = $(this).val();
                    var newpp = Number(preciOr) + Number(redondeo);
                    var newpn = Number(preciOr) - Number(redondeo);
                    if (catServicio != dataServicioGeneral) {
                        if (precioEs > newpp || precioEs < newpn) {
                            AlertFactory.textType({
                                title: '',
                                message: 'El precio del producto solo se puede ajustar +- ' + redondeo,
                                type: 'info'
                            });
                            $(this).val(preciOr);

                        }
                    }
                    calcular_total_MO();
                    sumar_key();

                }
            });


            $('.checkClass').change(function (e) {
                console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
            });
            $('.checkClass').on('change', function () {
                console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
            });
            $(".checkClass").click(function () {
                var codigo2 = $(this).closest("tr").find("td:eq(1)").children("input").attr('data-codigoC');

                cambio(codigo2);
            });
            $('#pOper' + code).iCheck({
                checkboxClass: 'icheckbox_square-green'
            }).on('ifChanged', function (event) {
                $(event.target).click();
                console.log("vueltaa");

            });


            $('.cantOrde').keyup(function (e) {
                calcular_total_MO();
                sumar_key();

            });

            $(".descuentosSelect").change(function () {
                var codigo = $(this).attr('data-desc');
                var val = $(this).val();
                var arrayRe = val.split("*");
                var code = arrayRe[0];
                var porc = arrayRe[1];
                var mont = arrayRe[2];
                if ($(this).val() != "") {
                    if (porc != '0') {
                        var cantidadt = $(this).closest("tr").find("td:eq(1)").children("input").val();
                        var preciot = Number($(this).closest("tr").find("td:eq(2)").children("input").val());
                        var impuestot = Number($(this).closest("tr").find("td:eq(3)").children("input").val());
                        var subtota = (cantidadt * preciot) + (impuestot);
                        var porTotal = Number((Number(porc) * Number(subtota)) / 100);
                        $("#porc_" + codigo).val(porc);
                        $("#monto_" + codigo).val(0);
                    } else {
                        $("#monto_" + codigo).val(mont);
                        $("#porc_" + codigo).val(0);
                    }
                } else {
                    $("#monto_" + codigo).val("");
                    $("#porc_" + codigo).val("");
                }

                calcular_total_MO();
                sumar_key();

            });
            servicios_select.val("").trigger("change");
            tipo_totales_slec.val("").trigger("change");
            $('.deltotal').click(function (e) {
                var code = $(this).attr('data-id');
                var idTipo = $(this).attr('data_idTipoDel');
                var idedet = $(this).attr('data-idedet');
                AlertFactory.confirm({
                    title: '',
                    message: '¿Está seguro que desea quitar este servicio ?',
                    confirm: 'Si',
                    cancel: 'No'
                }, function () {
                    if (nConsecutivo.val() != '' && idedet) {
                        var id = cCodConsecutivo.val() + '_' + nConsecutivo.val() + '_' + idedet;
                        RESTService.get('proformas/deleteDetalleServicio', id, function (response) {
                            if (!_.isUndefined(response.status) && response.status) {
                                var data = response.data;
                                if (data[0].Mensaje != '') {
                                    AlertFactory.textType({
                                        title: '',
                                        message: data[0].Mensaje,
                                        type: 'info'
                                    });
                                } else {
                                    AlertFactory.textType({
                                        title: '',
                                        message: 'El Servicio se eliminó correctamente',
                                        type: 'success'
                                    });
                                    $('#tr_b_' + code).remove();
                                    calcular_total_MO();
                                    sumar_key();
                                }
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
                    } else {
                        var idcod = '#tr_' + code;
                        //     var precio_borrar=$("#tr_subtotalSer"+code).val();
                        // if(idTipo=='1'){
                        //     var mo_r=mo_revision.val();
                        //     var new_mor=Number(mo_r)-Number(precio_borrar);
                        //     mo_revision.val(new_mor.toFixed(decimales_redondeo));
                        //  }else if(idTipo=='2'){
                        //     var mo_m=mo_mecanica.val();
                        //     var new_mo_m=Number(mo_m)-Number(precio_borrar);

                        //     mo_mecanica.val(new_mo_m.toFixed(decimales_redondeo));
                        //  }else if(idTipo=='3'){
                        //     var mo_tr=terceros.val();
                        //     var new_mo_tr=Number(mo_tr)-Number(precio_borrar);
                        //     terceros.val(new_mo_tr.toFixed(decimales_redondeo));
                        //  }else if(idTipo=='4'){
                        //     var mo_otr=otros_mo.val();
                        //     var new_mo_otr=Number(mo_otr)-Number(precio_borrar);
                        //     otros_mo.val(new_mo_otr.toFixed(decimales_redondeo));
                        //  }else if(idTipo=='5'){
                        //     var mo_rp=repuestos.val();
                        //     var new_mo_rp=Number(mo_rp)-Number(precio_borrar);
                        //     repuestos.val(new_mo_rp.toFixed(decimales_redondeo));
                        //  }else if(idTipo=='6'){
                        //     var mo_ac=accesorios.val();
                        //     var new_mo_ac=Number(mo_ac)-Number(precio_borrar);
                        //     accesorios.val(new_mo_ac.toFixed(decimales_redondeo));
                        //  }else if(idTipo=='7'){
                        //     var mo_lub=lubricantes.val();
                        //     var new_mo_lub=Number(mo_lub)-Number(precio_borrar);
                        //     lubricantes.val(new_mo_lub.toFixed(decimales_redondeo));
                        //  }else if(idTipo=='8'){
                        //     var mo_trp=otros_rep.val();
                        //     var new_trp=Number(mo_trp)-Number(precio_borrar);
                        //     otros_rep.val(new_trp.toFixed(decimales_redondeo));
                        //  }

                        $('#tr_b_' + code).remove();

                    }

                    calcular_total_MO();
                    sumar_key();

                });
                e.preventDefault();
            });

        }

        articulos_repuestos.change(function () {
            if (articulos_repuestos.val() != "") {
                var bval = true;
                if (idMoneda.val() == "") {
                    AlertFactory.textType({
                        title: '',
                        message: 'Debe seleccionar una moneda',
                        type: 'info'
                    });
                    articulos_repuestos.val("").trigger("change");
                    bval = false;
                }
                if (razonsocial_cliente_or.val() == "") {
                    AlertFactory.textType({
                        title: '',
                        message: 'Debe seleccionar un cliente',
                        type: 'info'
                    });
                    articulos_repuestos.val("").trigger("change");
                    bval = false;
                }
                if (bval) {
                    var id = articulos_repuestos.val() + '_' + id_cliente_tipo_or.val() + '_' + idMoneda.val();
                    RESTService.get('proformas/get_precios_listProfor', id, function (response) {
                        if (!_.isUndefined(response.status) && response.status) {
                            console.log(response.data);
                            $("#tipo_totales_slec2").val("");
                            var datos = response.data;
                            var precio = response.newPrecio;
                            if (datos == '') {
                                var producto = $("#articulos_repuestos option:selected").text();
                                AlertFactory.textType({
                                    title: '',
                                    message: 'No existe precios para este producto: ' + producto,
                                    type: 'info'
                                });
                                articuloPrecio = "";
                                articulos_repuestos.val("").trigger("change");
                            } else {
                                if (precio == '') {
                                    precio = datos[0].nPrecio;
                                }
                                articuloPrecioRepuesto = datos[0].idProducto + '*' + datos[0].description + '*' + precio + '*' + datos[0].impuesto;
                                console.log(articuloPrecio);
                            }
                            console.log("precios");
                            // servicios_select.val("").trigger("change");
                        } else {
                            AlertFactory.textType({
                                title: '',
                                message: 'Hubo un error . Intente nuevamente.',
                                type: 'info'
                            });
                        }
                    });
                }
            }
        });
        servicios_select.change(function () {
            if (servicios_select.val() != "") {
                var bval = true;
                if (idMoneda.val() == "") {
                    AlertFactory.textType({
                        title: '',
                        message: 'Debe seleccionar una moneda',
                        type: 'info'
                    });
                    servicios_select.val("").trigger("change");
                    bval = false;
                }
                if (razonsocial_cliente_or.val() == "") {
                    AlertFactory.textType({
                        title: '',
                        message: 'Debe seleccionar un cliente',
                        type: 'info'
                    });
                    servicios_select.val("").trigger("change");
                    bval = false;
                }
                if (bval) {
                    var id = servicios_select.val() + '_' + id_cliente_tipo_or.val() + '_' + idMoneda.val();
                    RESTService.get('proformas/get_precios_listProfor', id, function (response) {
                        if (!_.isUndefined(response.status) && response.status) {
                            console.log(response.data);
                            var datos = response.data;
                            var precio = response.newPrecio;
                            if (datos == '') {
                                var producto = $("#servicios_select option:selected").text();
                                AlertFactory.textType({
                                    title: '',
                                    message: 'No existe precios para este producto: ' + producto,
                                    type: 'info'
                                });
                                articuloPrecio = "";
                                servicios_select.val("").trigger("change");
                            } else {
                                if (precio == '') {
                                    precio = datos[0].nPrecio;
                                }
                                articuloPrecio = datos[0].idProducto + '*' + datos[0].description + '*' + precio + '*' + datos[0].impuesto;
                                console.log(articuloPrecio);
                            }
                            console.log("precios");
                            // servicios_select.val("").trigger("change");
                        } else {
                            AlertFactory.textType({
                                title: '',
                                message: 'Hubo un error . Intente nuevamente.',
                                type: 'info'
                            });
                        }
                    });
                }
            }
        });

        function addDescuentos(codigo, idDescuento) {
            var selectDescuento = $("#id_desc_" + codigo);
            selectDescuento.select2();
            var hoy = new Date();
            var hAnio = hoy.getFullYear();
            var hmes = hoy.getMonth() + 1;
            if (Number(hmes) < 10) {
                hmes = '0' + String(hmes);
            }

            var hdia = hoy.getDate();
            if (Number(hdia) < 10) {
                hdia = '0' + String(hdia);
            }
            var actu = hAnio + '-' + hmes + '-' + hdia;

            selectDescuento.append('<option value="" selected>Seleccionar</option>');
            _.each(descuentos, function (item) {
                var mo = idMoneda.val();
                // if(item.nIdProducto==codigo || item.cTipoAplica=='T'){
                //        var por=Number(item.nPorcDescuento);
                //        var monto=Number(item.nMonto);
                //     if((item.idMoneda==mo || item.nPorcDescuento!=0) && (item.nSaldoUso>0 || item.nLimiteUso==0) && item.cTipoAplica=='L'){
                //         if(item.dFecIni<=actu && item.dFecFin>actu){
                //             var valDes=item.id+'*'+por+'*'+monto;

                //             // if(valDes==idDescuento){
                //             //     selectDescuento.append('<option value="'+item.id+'*'+por+'*'+monto+'" selected>'+item.descripcion+'</option>');
                //             // }else{
                //                 selectDescuento.append('<option value="'+item.id+'*'+por+'*'+monto+'" >'+item.descripcion+'</option>');
                //             // }


                //         }
                //     }
                // }
                // $("#id_desc_"+codigo).val(idDescuento).trigger("change");
                if (item.dFecIni <= actu && item.dFecFin > actu) {
                    var por = Number(item.nPorcDescuento);
                    var monto = Number(item.nMonto);
                    if (item.cTipoAplica == 'T') {
                        // if(item.idMoneda==mo || item.nPorcDescuento!=0){
                        //     if(item.nSaldoUso>0 || item.nLimiteUso==0){
                        //           selectDescuento.append('<option value="'+item.id+'*'+por+'*'+monto+'" >'+item.descripcion+'</option>');
                        //     }

                        // }
                    } else {
                        if (item.idMoneda == mo || item.nPorcDescuento != 0) {
                            if (item.nSaldoUso > 0 || item.nLimiteUso == 0) {
                                if (item.nIdProducto == codigo) {
                                    selectDescuento.append('<option value="' + item.id + '*' + por + '*' + monto + '" >' + item.descripcion + '</option>');
                                }
                            }

                        }
                    }

                }
                $("#id_desc_" + codigo).val(idDescuento).trigger("change");

            });
        }

        function llenarServicios() {
            var bval = true;
            bval = bval && cCodConsecutivo.required();
            if (bval) {
                var mone_ser = idMoneda.val();
                var clientipo_ser = id_cliente_tipo_or.val();
                servicios_select.html('');
                servicios_select.append('<option value="" selected>Seleccionar </option>');
                _.each(servicios, function (item) {
                    servicios_select.append('<option data-categoria="' + item.idCategoria + '" value="' + item.id + '">' + item.code_article + ' ' + item.description + '</option>');
                });
                var id = cCodConsecutivo.val();
                RESTService.get('proformas/get_repuestos_consecutivo', id, function (response) {
                    if (!_.isUndefined(response.status) && response.status) {
                        articulos_repuestos.html('');
                        articulos_repuestos.append('<option value="">Seleccionar</option>');
                        _.each(response.data, function (item) {
                            articulos_repuestos.append('<option value="' + item.idProducto + '">' + item.code_article + ' ' + item.description + ' / ' + Number(item.stock) + '</option>');
                        });
                    }
                });
            }

        }

        function cleanProforma() {

            cCodConsecutivo.val("").trigger('change');
            nConsecutivo.val("");
            table_servicios.html("");
            idMoneda.val("").trigger("change");
            idAsesor.val("").trigger("change");
            articulos_repuestos.val("").trigger("change");
            tipo_totales_slec2.val("").trigger("change");
            servicios_select.val("").trigger("change");
            tipo_totales_slec.val("").trigger("change");
            dFecEntrega.val("");
            nEstimadoHoras.val("");
            table_repuestos.html("");
            totalDescuento.val("").trigger("change");
            cCodConsecutivo_orden.val("").trigger('change');
            servicios_select.html('');
            servicios_select.append('<option value="" selected>Seleccionar </option>');
            articulos_repuestos.html('');
            articulos_repuestos.append('<option value="" selected>Seleccionar </option>');
            btn_aprobarProforma.prop('disabled', true);
            btn_guardarProforma.prop('disabled', false);
            cCodConsecutivo.prop('disabled', false);
            estado.val("");
            cleandatos();
            clean_totale();
            calcular_total_repuesto();
            calcular_total_MO();
            llenarproformasFiltro();
            sumar_key();

        }

        cCodConsecutivo.change(function () {
            var bval = true;
            bval = bval && cCodConsecutivo_orden.required();
            if (bval) {
                llenarServicios();
            }
        });

        cCodConsecutivo_orden.change(function () {

            if (table_servicios.html() != "" || table_repuestos.html() != "") {
                modalDeleteDetalle.modal("show");
            }

            if (cCodConsecutivo_orden.val() == "") {
                cleandatos();
            } else {
                var totalf = cCodConsecutivo_orden.val();
                var total = $('#cCodConsecutivo_orden').find(':selected').data('info');
                console.log(total);
                console.log("ggagagag");
                total = total.split('*');

                id_cliente_tipo_or.val(total[8]);
                idMoneda.val(total[2]);
                idcCondicionPago.val(total[3]);
                var ase = total[4];
                if (total[4] == 0) {
                    ase = '';
                }
                idAsesor.val(ase).trigger('change');
                idcliente.val(total[6]);
                documento_or.val(total[7]);
                razonsocial_cliente_or.val(total[9]);
                placa.val(total[10]);
                nKilometraje.val(total[11]);
                motor.val(total[12]);
                color.val(total[13]);
                cCodConsecutivoOS.val(total[0]);
                nConsecutivoOS.val(total[1]);
            }
            llenarServicios();

        });

        cCodConsecutivo_orden.select2();
        articulos_repuestos.select2();
        idAsesor.select2();
        servicios_select.select2();
        $.fn.modal.Constructor.prototype.enforceFocus = function () {
        };

        var search = getFormSearch('frm-search-Proforma', 'search_b',
            'LoadRecordsButtonProforma');

        var table_container_Proforma = $("#table_container_Proforma");

        //  articulos_repuestos.change(function () {
        //         var vto =articulos_repuestos.val();
        //         if(vto!=''){
        //             var modo_t=0;
        //             // addMante(vto,modo_t);
        //         }


        // });

        function newProforma() {
            // var hoy = new Date();
            // var actu=hoy.getFullYear()+"-"+ (hoy.getMonth()+1)+ "-" +hoy.getDate() ;
            // var hora = hoy.getHours() + ':' + hoy.getMinutes();
            modalProforma.modal('show');
            titlemodalProforma.html('Nueva Proforma');
        }

        function llenarproformasTotal(id) {
            cCodConsecutivo_orden.html('<option value="">Seleccionar</option>');
            _.each(proformaTotal, function (item) {
                var idt = item.cCodConsecutivo + '_' + item.nConsecutivo;
                if (item.est == '0' || item.est == '1' || item.est == '2') {
                    cCodConsecutivo_orden.append('<option data-info="' + item.cCodConsecutivo + '*' + item.nConsecutivo +
                        '*' + item.IdMoneda + '*' + item.idcCondicionPago + '*' + item.idAsesor + '*' + item.asesor +
                        '*' + item.idCliente + '*' + item.documento + '*' + item.idTipoCliente + '*' +
                        item.razonsocial_cliente + '*' + item.cPlacaVeh + '*' + item.nKilometraje + '*' + item.cMotor +
                        '*' + item.cColor + '" value="' + item.cCodConsecutivo + '*' + item.nConsecutivo + '">' +
                        item.cCodConsecutivo + ' ' + item.nConsecutivo + ' ' + item.razonsocial_cliente + ' ' +
                        item.cPlacaVeh + '</option>');
                } else if (item.cCodConsecutivo + '_' + item.nConsecutivo == id) {
                    cCodConsecutivo_orden.append('<option data-info="' + item.cCodConsecutivo + '*' + item.nConsecutivo +
                        '*' + item.IdMoneda + '*' + item.idcCondicionPago + '*' + item.idAsesor + '*' + item.asesor +
                        '*' + item.idCliente + '*' + item.documento + '*' + item.idTipoCliente + '*' +
                        item.razonsocial_cliente + '*' + item.cPlacaVeh + '*' + item.nKilometraje + '*' + item.cMotor +
                        '*' + item.cColor + '" value="' + item.cCodConsecutivo + '*' + item.nConsecutivo + '">' +
                        item.cCodConsecutivo + ' ' + item.nConsecutivo + ' ' + item.razonsocial_cliente + ' ' +
                        item.cPlacaVeh + '</option>');
                }

            });
        }

        function llenarproformasFiltro() {
            cCodConsecutivo_orden.html('<option value="">Seleccionar</option>');
            _.each(proformaTotal, function (item) {
                if (item.est == '0' || item.est == '1' || item.est == '2') {
                    cCodConsecutivo_orden.append('<option data-info="' + item.cCodConsecutivo + '*' + item.nConsecutivo +
                        '*' + item.IdMoneda + '*' + item.idcCondicionPago + '*' + item.idAsesor + '*' + item.asesor +
                        '*' + item.idCliente + '*' + item.documento + '*' + item.idTipoCliente + '*' +
                        item.razonsocial_cliente + '*' + item.cPlacaVeh + '*' + item.nKilometraje + '*' + item.cMotor +
                        '*' + item.cColor + '" value="' + item.cCodConsecutivo + '*' + item.nConsecutivo + '">' +
                        item.cCodConsecutivo + ' ' + item.nConsecutivo + ' ' + item.razonsocial_cliente + ' ' +
                        item.cPlacaVeh + '</option>');
                }
            });
        }

        function getDataForProforma() {
            RESTService.all('proformas/data_form', '', function (response) {
                if (!_.isUndefined(response.status) && response.status) {
                    cCodConsecutivo_orden.html("");
                    cCodConsecutivo_orden.append('<option value="">Seleccionar</option>');
                    proformaTotal = response.codigo_proforma;
                    dataServicioGeneral = response.data_servicioGeneral[0].value;
                    _.each(response.codigo_proforma, function (item) {
                        if (item.est == '0' || item.est == '1' || item.est == '2') {
                            cCodConsecutivo_orden.append('<option data-info="' + item.cCodConsecutivo + '*' + item.nConsecutivo + '*' + item.IdMoneda + '*' + item.idcCondicionPago + '*' + item.idAsesor + '*' + item.asesor + '*' + item.idCliente + '*' + item.documento + '*' + item.idTipoCliente + '*' + item.razonsocial_cliente + '*' + item.cPlacaVeh + '*' + item.nKilometraje + '*' + item.cMotor + '*' + item.cColor + '" value="' + item.cCodConsecutivo + '*' + item.nConsecutivo + '">' + item.cCodConsecutivo + ' ' + item.nConsecutivo + ' ' + item.razonsocial_cliente + ' ' + item.cPlacaVeh + '</option>');
                        }
                    });
                    igv = response.igv[0].value;

                    var tipo_clie = response.tipo_clie;
                    id_cliente_tipo_or.append('<option value="">Seleccionar</option>');
                    tipo_clie.map(function (index) {
                        id_cliente_tipo_or.append('<option value="' + index.id + '">' + index.descripcion + '</option>');
                    });

                    descuentos = response.descuentos;
                    redondeo = response.dataredondeo;
                    decimales_redondeo = response.decimales_redondeo;
                    cCodConsecutivo.append('<option value="">Seleccionar</option>');
                    _.each(response.codigo_proforma2, function (item) {
                        cCodConsecutivo.append('<option value="' + item.cCodConsecutivo + '">' +
                            item.cCodConsecutivo + '</option>');
                    });
                    var hoy = new Date();
                    var hAnio = hoy.getFullYear();
                    var hmes = hoy.getMonth() + 1;
                    if (Number(hmes) < 10) {
                        hmes = '0' + String(hmes);
                    }
                    var hdia = hoy.getDate();
                    if (Number(hdia) < 10) {
                        hdia = '0' + String(hdia);
                    }
                    var actu = hAnio + '-' + hmes + '-' + hdia;
                    totalDescuento.append('<option value="">Seleccionar</option>');
                    _.each(response.descuentos, function (item) {
                        if (item.cTipoAplica == 'T') {
                            var mo = idMoneda.val();
                            var por = Number(item.nPorcDescuento);
                            var monto = Number(item.nMonto);
                            if ((item.idMoneda == mo || item.nPorcDescuento != '0') && (item.nSaldoUso > 0 || item.nLimiteUso == '0')) {
                                if (item.dFecIni <= actu && item.dFecFin > actu) {
                                    totalDescuento.append('<option value="' + item.id + '*' + por + '*' + monto + '" >' + item.descripcion + '</option>');
                                }
                            }
                        }
                    });
                    //   cCodConsecutivo.append('<option value="'+item.cCodConsecutivo+'*'+item.nConsecutivo+'">'+item.cCodConsecutivo+'</option>');
                    idcCondicionPago.append('<option value="">Seleccionar</option>');
                    _.each(response.condicion_pago, function (item) {
                        idcCondicionPago.append('<option value="' + item.id + '">' + item.description + '</option>');
                    });

                    idAsesor.append('<option value="">Seleccionar</option>');
                    _.each(response.asesor, function (item) {
                        idAsesor.append('<option value="' + item.id + '">' + item.descripcion + '</option>');
                    });

                    servicios = response.servicios_todos;
                    idMoneda.append('<option value="">Seleccionar</option>');
                    _.each(response.moneda, function (item) {
                        idMoneda.append('<option value="' + item.IdMoneda + '">' + item.Descripcion + '</option>');
                    });
                    tipo_totales_slec.append('<option value="">Tipo</option>');
                    _.each(response.totales, function (item) {
                        tipo_totales_slec.append('<option value="' + item.id + '">' + item.descripcion + '</option>');
                    });
                    tipo_totales_slec2.append('<option value="">Tipo</option>');
                    _.each(response.totales, function (item) {
                        tipo_totales_slec2.append('<option value="' + item.id + '">' + item.descripcion + '</option>');
                    });
                }
            }, function () {
                getDataForProforma();
            });
        }

        getDataForProforma();

        table_container_Proforma.jtable({
            title: "Lista de Proformas",
            paging: true,
            sorting: true,
            actions: {
                listAction: base_url + '/proformas/list',
            },
            messages: {
                addNewRecord: 'Nueva Categoría',
                editRecord: 'Editar Categoría',
            },
            toolbar: {
                items: [{
                    cssClass: 'buscador',
                    text: search
                }, {
                    cssClass: 'btn-primary',
                    text: '<i class="fa fa-file-excel-o"></i> Exportar a Excel',
                    click: function () {
                        $scope.openDoc('proformas/excel', {});
                    }
                }, {
                    cssClass: 'btn-danger-admin',
                    text: '<i class="fa fa-plus"></i> Nueva Proforma',
                    click: function () {
                        newProforma();
                    }
                }]
            },
            fields: {
                cCodConsecutivo: {
                    key: true,
                    create: false,
                    edit: false,
                    list: true,
                    title: 'Código Proforma',
                },
                nConsecutivo: {
                    title: 'Nro',


                },
                razonsocial_cliente: {
                    title: 'Cliente',

                },
                cCodConsecutivoOS: {
                    title: 'Código Orden',

                },
                nConsecutivoOS: {
                    title: 'Nro ',

                },
                dFechaRegistro: {
                    title: 'Fecha Registro',
                    display: function (data) {
                        return moment(data.record.dFechaRegistro).format('DD/MM/YYYY');
                    }
                },
                iEstado: {
                    title: 'Estado',
                    options: {
                        0: 'Registrado',
                        1: 'Aprobada',
                        2: 'Entregada',
                        3: 'Entrega parcial',
                        4: 'Con devolucion',
                        5: 'Cerrada',
                        6: 'Cancelada'
                    },

                },
                edit: {
                    width: '1%',
                    sorting: false,
                    edit: false,
                    create: false,
                    listClass: 'text-center',
                    display: function (data) {
                        return '<a href="javascript:void(0)" class="edit-proforma" data-idOt="' + data.record.cCodConsecutivoOS
                            + '_' + data.record.nConsecutivoOS + '" data-id="' + data.record.cCodConsecutivo
                            + '_' + data.record.nConsecutivo + '" title="Editar"><i class="fa fa-edit fa-1-5x"></i></a>';
                    }

                }, Eliminar: {
                    width: '1%',
                    sorting: false,
                    edit: false,
                    create: false,
                    listClass: 'text-center',
                    display: function (data) {
                        return '<a data-target="#"  data-ide="' + data.record.cCodConsecutivo + '_' + data.record.nConsecutivo + '"   title="Eliminar" class="jtable-command-button eliminar-Proforma"><i class="fa fa-trash fa-1-5x fa-red"><span>Eliminar</span></i></a>';
                    }

                }

            },

            recordsLoaded: function (event, data) {
                $('.edit-proforma').click(function (e) {
                    var id = $(this).attr('data-id');
                    var idt = $(this).attr('data-idOt');
                    llenarproformasTotal(idt);
                    findRegister_Proforma(id);
                    e.preventDefault();
                });
                $('.eliminar-Proforma').click(function (e) {
                    var ide = $(this).attr('data-ide');
                    idProformaDelete.val(ide);
                    modalDeleteProforma.modal("show");
                    e.preventDefault();
                });
            },
            formCreated: function (event, data) {
                data.form.find('input[name="Categoria"]').attr('onkeypress', 'return soloLetras(event)');
                $('#Edit-estado').parent().addClass('i-checks');

                $('.i-checks').iCheck({
                    checkboxClass: 'icheckbox_square-green'
                }).on('ifChanged', function (e) {
                    $(e.target).click();
                    if (e.target.value == 'A') {
                        $("#Edit-estado").val("I");
                        $(".i-checks span").text("Inactivo");

                    } else {
                        $("#Edit-estado").val("A");
                        $(".i-checks span").text("Activo");
                    }
                    ;
                });
            },
            formSubmitting: function (event, data) {
                var bval = true;
                bval = bval && data.form.find('input[name="Categoria"]').required();
                return bval;
            }
        });

        generateSearchForm('frm-search-Proforma', 'LoadRecordsButtonProforma', function () {
            table_container_Proforma.jtable('load', {
                search: $('#search_b').val(),
                check: (chk_date_range.prop('checked')),
                from: start.format('YYYY-MM-DD'),
                to: end.format('YYYY-MM-DD')
            });
        }, true);
    }

    function Config($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('proformas', {
                url: '/proformas',
                templateUrl: base_url + '/templates/proformas/base.html',
                controller: 'ProformaCtrl'
            });

        $urlRouterProvider.otherwise('/');
    }
})
();