/**
 * Created by JAIR on 4/5/2017.
 */

(function () {
    'use strict';
    angular.module('sys.app.orden_servicios')
        .config(Config)
        .controller('Orden_ServicioCtrl', Orden_ServicioCtrl);

    Config.$inject = ['$stateProvider', '$urlRouterProvider'];
    Orden_ServicioCtrl.$inject = ['$scope', '_', 'RESTService', 'AlertFactory'];

    function Orden_ServicioCtrl($scope, _, RESTService, AlertFactory) {
        var cambCan;
        var cambioChe;
        var cambioDes;
        var descuentosTotales;
        var dataServicioGeneral;
        var redondeo;
        var decimales_redondeo;
        var cEstadoCivil = $("#cEstadoCivil");
        var acodigos = [];
        var totalMO = $("#totalMO");
        var totales;
        var btn_editar_cliente = $("#btn_editar_cliente");
        var articuloPrecio;
        var btn_imprimir = $(".btn_imprimir");
        var igv;
        var desTotal = $("#desTotal");
        var descuentos;
        var servicios;
        var porcentajeTotal = $("#porcentajeTotal");
        var montoTotal = $("#montoTotal");
        var valor_moneda;
        var btn_save_cliente = $("#btn_save_cliente");
        var id_tipoDoc_Venta = $("#id_tipoDoc_Venta");
        var modalDeleteDetalle = $("#modalDeleteDetalle");
        var id_tipomant = $("#id_tipomant");
        var tipo_totales_slec = $("#tipo_totales_slec");
        var id_cliente_tipo_or = $("#id_cliente_tipo_or");
        var table_servicios = $("#table_servicios");
        var servicios_select = $("#servicios_select");
        var idMoneda = $("#IdMoneda");
        var btn_cancelar_servicio = $("#btn_cancelar_servicio");
        var tipo_vehi = $("#tipo_vehi");
        var idTipoVehi_add = $("#idTipoVehi_add");
        var tipoCliente_or = $("#tipoCliente_or");
        var id_tipocli = $("#id_tipocli");
        var idOrdenDelete = $("#idOrdenDelete");
        var modalDeleteOrden = $("#modalDeleteOrden");
        var modaClientes = $('#modaClientes');
        var titleModalClientes = $('#titleModalClientes');
        var btn_guardarOrden = $(".btn_guardarOrden");
        var modaVehiculosTerceros = $("#modaVehiculosTerceros");
        var titleModalVehiculosTerceros = $("#titleModalVehiculosTerceros");
        var estado = $("#estado");
        var motor = $("#motor");
        var idOrden = $("#idOrden");
        var motor_add = $("#motor_add");
        var departamento = $('#departamento');
        var provincia = $('#provincia');
        var distrito = $('#distrito');
        var observaciones = $("#observaciones");
        var cCodConsecutivo = $("#cCodConsecutivo");
        var idcCondicionPago = $("#idcCondicionPago");
        var id_tipo = $("#id_tipo");
        var idDocumentoCli = $("#idDocumentoCli");
        var gru_revisiones = $("#gru_revisiones");
        var idTecnico = $("#idTecnico");
        var idAsesor = $("#idAsesor");
        var horaEnt = $("#horaEnt");
        var nKilometraje = $("#nKilometraje");
        var dFecRec = $('#dFecRec');
        var horaRec = $("#horaRec");
        var dFecEntrega = $("#dFecEntrega");
        var articulo_dd_det = $("#articulo_dd_det");
        var modalOrdenServivio = $("#modalOrdenServivio");
        var titlemodalOrdenServivio = $("#titlemodalOrdenServivio");
        var tabla_grupo_revision = $("#articulo_dd_det");
        var tipodoc = $("#tipodoc");
        var razonsocial_cliente = $("#razonsocial_cliente");
        var btn_cerrar = $("#btn_cerrar");
        var documento = $("#documento");
        var contacto = $("#contacto");
        var direccion = $("#direccion");
        var correo_electronico = $("#correo_electronico");
        var id_tipoDoc_Venta_or = $("#id_tipoDoc_Venta_or");
        var celular = $("#celular");
        var telefono = $("#telefono");
        var cliente_id = $("#cliente_id");
        var distrito = $('#distrito');
        var distrito_ver = $('#distrito_ver');
        var nConsecutivo = $('#nConsecutivo');
        var mo_revision = $("#mo_revision");
        var mo_mecanica = $("#mo_mecanica");
        var terceros = $("#terceros");
        var otros_mo = $("#otros_mo");
        var subtotal_moa = $("#subtotal_moa");
        var idsector = $("#idsector");
        var totalDescuento = $("#totalDescuento");

        var btn_ejecucion = $(".btn_ejecucion");
        var btn_terminada = $(".btn_terminada");
        var btn_cancelar = $(".btn_cancelar");

        var repuestos = $("#repuestos");
        var accesorios = $("#accesorios");
        var lubricantes = $("#lubricantes");
        var otros_rep = $("#otros_rep");
        var subtotal_mob = $("#subtotal_mob");
        var total = $("#total");

        var idDocumentoCli = $("#idDocumentoCli");
        var documento_or = $("#documento_or");
        var razonsocial_cliente_or = $("#razonsocial_cliente_or");
        var contacto_or = $("#contacto_or");
        var direccion_or = $("#direccion_or");
        var correo_electronico_or = $("#correo_electronico_or");
        var celular_or = $("#celular_or");
        var telefono_or = $("#telefono_or");
        var cliente_id_or = $("#cliente_id_or");
        var distrito_or = $('#distrito_or');

        var idVehiculo_add = $('#idVehiculo_add');
        var idMarca_add = $('#idMarca_add');
        var idModelo_add = $('#idModelo_add');
        var n_chasis_add = $('#n_chasis_add');
        var anio_fabricacion_add = $('#anio_fabricacion_add');
        var color_add = $('#color_add');
        var placa_add = $('#placa_add');

        var placa = $("#placa");
        var marca = $("#marca");
        var modelo = $("#modelo");
        var chasis = $("#chasis");
        var anio_fabricacion = $("#anio_fabricacion");
        var color = $("#color");
        // totalDescuento.change(function () {
        //     var bandera='xxxxxx';
        //     var id=departamento.val();
        //     getProvincia(bandera,id);
        // });
        $("#btn_editar_articulo").click(function (e) {

            if ($("#placa").val() == '') {
                AlertFactory.textType({
                    title: '',
                    message: 'Debe seleccionar un producto',
                    type: 'info'
                });

                return false;
            }

            $.post("orden_servicios/update_articulo", $("#form-articulo").serialize(),
                function (data, textStatus, jqXHR) {
                    if (data.status == "m") {
                        AlertFactory.textType({
                            title: '',
                            message: data.msg,
                            type: 'info'
                        });
                    } else {
                        AlertFactory.textType({
                            title: '',
                            message: data.msg,
                            type: 'error'
                        });
                    }
                },
                "json"
            );
        })

        btn_editar_cliente.click(function (e) {
            if (cliente_id_or.val() == '') {
                AlertFactory.textType({
                    title: '',
                    message: 'Debe seleccionar un cliente',
                    type: 'info'
                });
            } else {
                titleModalClientes.html('Editar Cliente');
                var id = cliente_id_or.val();
                RESTService.get('orden_servicios/findCliOrde', id, function (response) {
                    if (!_.isUndefined(response.status) && response.status) {
                        var data_p = response.data;
                        tipodoc.val(data_p[0].tipodoc).trigger('change');
                        razonsocial_cliente.val(data_p[0].razonsocial_cliente);
                        documento.val(data_p[0].documento);
                        contacto.val(data_p[0].contacto);
                        direccion.val(data_p[0].direccion);
                        correo_electronico.val(data_p[0].correo_electronico);
                        celular.val(data_p[0].celular);
                        telefono.val(data_p[0].telefono);
                        cEstadoCivil.val(data_p[0].cEstadoCivil);
                        cliente_id.val(data_p[0].id);
                        id_tipocli.val(data_p[0].id_tipocli).trigger('change');
                        id_tipoDoc_Venta.val(data_p[0].IdTipoDocumento).trigger("change");
                        getDepartamento(data_p[0].cDepartamento);
                        getProvincia(data_p[0].cProvincia, data_p[0].cDepartamento);
                        getDistrito(data_p[0].cCodUbigeo, data_p[0].cProvincia);

                        getSector(data_p[0].idsector, data_p[0].cCodUbigeo);
                        modaClientes.modal('show');
                        console.log(data_p);

                        $.post("orden_servicios/validar_cliente", { id_cliente: id },
                            function (data, textStatus, jqXHR) {
                              
                                if(data.length > 0) {
                                    $("#tipodoc").prop("disabled", true);
                                    $("#documento").prop("readonly", true);
                                    $("#razonsocial_cliente").prop("readonly", true);
                                    $("#cNombres_c").prop("readonly", true);
                                    $("#cApepat_c").prop("readonly", true);
                                    $("#cApemat_c").prop("readonly", true);
                                } else {
                                    $("#tipodoc").prop("disabled", false);
                                    $("#documento").prop("readonly", false);
                                    $("#razonsocial_cliente").prop("readonly", false);
                                    $("#cNombres_c").prop("readonly", false);
                                    $("#cApepat_c").prop("readonly", false);
                                    $("#cApemat_c").prop("readonly", false);
                                }
                            },
                            "json"
                        );
                    
                    } else {
                        AlertFactory.textType({
                            title: '',
                            message: 'Hubo un error al obtener el Cliente. Intente nuevamente.',
                            type: 'error'
                        });
                    }
                });
            }
        });
        btn_imprimir.click(function (e) {
            var id = cCodConsecutivo.val() + "_" + nConsecutivo.val();
            if (id != '') {
                var data = {
                    id: id,
                };

                // alert(id_tipo.val());
                if (id_tipo.val() == "3") {
                    $scope.loadOrdenServicioXpressPDF('orden_servicios/pdf', data);
                } else {

                    $scope.loadOrdenServicioPDF('orden_servicios/pdf', data);
                }
            }
        });
        btn_cancelar.click(function () {
            cancelar_orden_servicio();
        });
        btn_ejecucion.click(function () {
            ejecucion_orden_servicio();
        });
        btn_terminada.click(function () {
            terminada_orden_servicio();
        });
        $('.i-checks').iCheck({
            checkboxClass: 'icheckbox_square-green'
        }).on('ifChanged', function (event) {
            $(event.target).click();
            // $scope.chkState();
        });
        function cancelar_orden_servicio() {
            var id = cCodConsecutivo.val() + "_" + nConsecutivo.val();
            var params = {
                'estado': 4,
            };
            RESTService.updated('orden_servicios/cambiar_estado', id, params, function (response) {
                if (!_.isUndefined(response.status) && response.status) {
                    var data = response.data;
                    if (data[0].Mensaje == 'OK') {
                        AlertFactory.textType({
                            title: '',
                            message: 'La orden se registró correctamente',
                            type: 'success'
                        });
                        estado.val(4);

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
        totalDescuento.select2();
        $("#idmarca").select2();
        $("#idmodelo").select2();

        $("#idmarca").change(function () {
            var bandera = 'xxxxxx';
            var id = $("#idmarca").val();
            if (id != "") {
                getModelo(bandera, id);

            }


        });

        function getModelo(bandera, id) {
            RESTService.get('orden_servicios/TraerModelos', id, function (response) {
                if (!_.isUndefined(response.status) && response.status) {
                    var data_p = response.data;
                    $("#idmodelo").html('');
                    $("#idmodelo").append('<option value="" selected>Seleccione</option>');
                    _.each(response.data, function (item) {

                        if (item.idModelo == bandera) {

                            $("#idmodelo").append('<option value="' + item.idModelo + '" selected >' + item.descripcion + '</option>');
                        } else {
                            $("#idmodelo").append('<option value="' + item.idModelo + '" >' + item.descripcion + '</option>');
                        };

                    });

                } else {
                    AlertFactory.textType({
                        title: '',
                        message: 'Hubo un error al obtener el Modelo. Intente nuevamente.',
                        type: 'error'
                    });
                }

            });
        }

        // totalDescuento.change(function () {

        // });
        function ejecucion_orden_servicio() {
            var id = cCodConsecutivo.val() + "_" + nConsecutivo.val();
            var params = {
                'estado': 2,
                'idTecnico': idTecnico.val(),
            };
            var bval = true;
            bval = bval && idTecnico.required();
            if (idTecnico.val() == '') {
                AlertFactory.textType({
                    title: '',
                    message: "Seleccione un técnico",
                    type: 'info'
                });
            }
            if (bval) {
                RESTService.updated('orden_servicios/cambiar_estado', id, params, function (response) {
                    if (!_.isUndefined(response.status) && response.status) {
                        var data = response.data;
                        if (data[0].Mensaje == 'OK') {
                            AlertFactory.textType({
                                title: '',
                                message: 'La orden se registró correctamente',
                                type: 'success'
                            });
                            estado.val(2);
                            $(".btn_terminada").removeAttr("disabled");
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
        }
        function terminada_orden_servicio() {
            var id = cCodConsecutivo.val() + "_" + nConsecutivo.val();
            var params = {
                'estado': 3,
            };
            $(".btn_terminada").attr("disabled", "disabled");
            RESTService.updated('orden_servicios/cambiar_estado', id, params, function (response) {
                if (!_.isUndefined(response.status) && response.status) {
                    var data = response.data;
                    if (data[0].Mensaje == 'OK') {
                       
                        AlertFactory.textType({
                            title: '',
                            message: 'La orden se registró correctamente',
                            type: 'success'
                        });
                        estado.val(3);
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

        function deshabilitar_inputs() {
            $("input").attr("readonly", "readonly");
            $("select").attr("disabled", "disabled");
            $("#idAsesor").prop("disabled", true);
        }

        function findRegister_Orden(id) {

            RESTService.get('orden_servicios/find', id, function (response) {
                if (!_.isUndefined(response.status) && response.status) {

                    var data = response.data;
                    // console.log(response.val);
                    // console.log("datos");
                    // deshabilitar_inputs();


                    titlemodalOrdenServivio.html('Editar Orden ' + '[' + data[0].nConsecutivo + ']');
                    cCodConsecutivo.prop('disabled', true);
                    cCodConsecutivo.val(data[0].cCodConsecutivo).trigger("change");
                    // cCodConsecutivo.val(data[0].cCodConsecutivo+'*'+data[0].nConsecutivo).trigger("change");
                    nConsecutivo.prop('disabled', true);
                    nConsecutivo.val(data[0].nConsecutivo);
                    idMoneda.val(data[0].IdMoneda).trigger("change");
                    idcCondicionPago.val(data[0].idcCondicionPago).trigger("change");
                    cliente_id_or.val(data[0].idCliente);
                    console.log(data.dFecRec2);
                    dFecRec.val(data.dFecRec2);
                    horaEnt.val(data[0].horaEnt);
                    horaRec.val(data[0].horaRec);
                    dFecEntrega.val(data.dFecEntrega2);
                    var tecni = data[0].idTecnico;
                    if (data[0].idTecnico == 0) {
                        tecni = '';
                    }
                    idTecnico.val(tecni).trigger('change');
                    idAsesor.val(data[0].idAsesor).trigger("change");
                    id_tipo.val(data[0].id_tipo).trigger("change");
                    id_tipomant.val(data[0].id_tipomant).trigger("change");
                    idTipoVehi_add.val(data[0].id_tipoveh).trigger("change");
                    tipodoc.val(data[0].tipodoc).trigger("change");
                    estado.val(data[0].iEstado).trigger("change");
                    id_tipoDoc_Venta_or.val(data[0].idDocumentoVenta).trigger("change");
                    var data_cliente = response.data_cliente;

                    cliente_id_or.val(data_cliente[0].id);
                    documento_or.val(data_cliente[0].documento);
                    getCliente();
                    observaciones.val(data[0].cObservaciones);
                    $("#comentario_facturacion").val(data[0].comentario_facturacion);
                    nKilometraje.val(Number(data[0].nKilometraje));
                    placa.val(data[0].cPlacaVeh);
                    getPlaca();
                    var data_matenimiento = response.data_matenimiento;
                    _.each(data_matenimiento, function (b) {
                        var vto = b.idMantenimiento + '*' + b.nombre;
                        var modo_m = 1;
                        addMante(vto, modo_m);
                    });

                    var data_detalle = response.data_detalle;
                    console.log(data_detalle);
                    _.each(data_detalle, function (b) {
                        var nImpue = 0;
                        var vto = b.idProducto + '*' + b.description + '*' + b.nPrecioUnitario + '*' + b.impuesto;
                        var tipoTo = b.totaltipo;
                        var tipoText = b.descripcioText;
                        var modo_servi = 1;
                        var idte = b.idDetalleSer;
                        var cant = b.nCant;
                        var opera = b.cOperGrat;
                        var porcen = Number(b.nPorcDescuento);

                        var monto = Number(b.nDescuento);
                        if (porcen > 0) {
                            monto = 0;
                        };
                        var idDescuento = "";
                        if (b.nIdDscto != 0) {
                            idDescuento = b.nIdDscto + "*" + porcen + '*' + monto;
                        }


                        addServicios(vto, tipoTo, tipoText, modo_servi, idte, cant, opera, idDescuento, b.nImpuesto, Number(b.nPorcDescuento), Number(b.nDescuento));
                        //  function addServicios(vto,tipoTo,tipoText,modo_ser,iddet)
                    });


                    // _.each(data_detalle, function (b) {
                    //     var vto=b.idProducto;
                    //      var idDescuento=b.nIdDscto+"*"+porcen+'*'+monto;
                    //      $("#id_desc_"+vto).val(idDescuento).trigger("change");

                    // });



                    // gru_revisiones
                    // idTecnico
                    // idAsesor
                    // horaEnt
                    // nKilometraje
                    if (data[0].iEstado != '0') {
                        btn_guardarOrden.prop('disabled', true);
                    }
                    id_tipocli.data("prev", id_cliente_tipo_or.val());
                    idMoneda.data("prev", idMoneda.val());
                    if (estado.val() != '') {
                        if (estado.val() == 0 || estado.val() == 1) {
                            btn_ejecucion.prop('disabled', false);
                        };
                        if (estado.val() == 1 || estado.val() == 2) {
                            btn_cancelar.prop('disabled', false);
                        };
                        if (estado.val() == 2) {
                            btn_terminada.prop('disabled', false);
                        };
                    }
                    var destotal = "";
                    if (data[0].nIdDscto != 0) {
                        var porcen = Number(data[0].porDes);
                        var monto = Number(data[0].montoDes);
                        destotal = data[0].nIdDscto + "*" + porcen + '*' + monto;
                    }

                    totalDescuento.val(destotal).trigger("change");

                    //0: 'Registrado', 1: 'Con Proforma', 2:'En ejecución'
                    if (data[0].iEstado <= 2) { // solo estados 0,1,2
                        $("#comentario_facturacion").removeAttr("readonly");
                        $("#observaciones").removeAttr("readonly");
                        $(".btn_guardarOrden").removeAttr("disabled");
                    } else {
                        $("#comentario_facturacion").attr("readonly", "readonly");
                        $("#observaciones").attr("readonly", "readonly");
                        $(".btn_guardarOrden").attr("disabled", "disabled");
                    }


                    modalOrdenServivio.modal("show");
                } else {
                    AlertFactory.textType({
                        title: '',
                        message: 'Hubo un error al obtener el Artículo. Intente nuevamente.',
                        type: 'error'
                    });
                }
            });
        }
        function newOrdenServicio() {
            $(".btn_terminada").removeAttr("disabled");
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
            var hora = hoy.getHours();
            if (Number(hora) < 10) {
                hora = '0' + String(hora);
            }
            var minutos = hoy.getMinutes();
            if (Number(minutos) < 10) {
                minutos = '0' + String(minutos);
            }
            var actu = hAnio + '-' + hmes + '-' + hdia;
            var hora_ac = hora + ':' + minutos;
            dFecRec.val(actu);
            dFecEntrega.val(actu);
            horaRec.val(hora_ac);
            idcCondicionPago.val('1').trigger("change");
            idMoneda.val('1').trigger("change");
            if (estado.val() != '') {
                if (estado.val() == 0 || estado.val() == 1) {
                    btn_ejecucion.prop('disabled', false);
                };
                if (estado.val() == 1 || estado.val() == 2) {
                    btn_cancelar.prop('disabled', false);
                };
                if (estado.val() == 2) {
                    btn_terminada.prop('disabled', false);
                };
            }
            $("#observaciones").removeAttr("readonly");
            $("#comentario_facturacion").removeAttr("readonly");
            modalOrdenServivio.modal('show');
            titlemodalOrdenServivio.html('Nuevo Orden de Servicio');
        }
        idTecnico.select2();
        servicios_select.select2();
        $.fn.modal.Constructor.prototype.enforceFocus = function () { };
        idAsesor.select2();
        documento_or.keypress(function (e) {
            var code = (e.keyCode ? e.keyCode : e.which);
            if (code == 13) {
                getCliente();
            }
        });
        placa.keypress(function (e) {
            var code = (e.keyCode ? e.keyCode : e.which);
            if (code == 13) {
                getPlaca();
            }
        });

        function getDepartamento(bandera) {
            var id = "0";
            RESTService.get('orden_servicios/TraerDepartamentosOrde', id, function (response) {
                if (!_.isUndefined(response.status) && response.status) {
                    var data_p = response.data;
                    departamento.html('');
                    departamento.append('<option value="" selected >Seleccione</option>');
                    _.each(response.data, function (item) {
                        if (item.cDepartamento == bandera) {
                            departamento.append('<option value="' + item.cDepartamento + '" selected>' + item.cDepartamento + '</option>');
                        } else {
                            departamento.append('<option value="' + item.cDepartamento + '">' + item.cDepartamento + '</option>');
                        };

                    });

                } else {
                    AlertFactory.textType({
                        title: '',
                        message: 'Hubo un error al obtener el Artículo. Intente nuevamente.',
                        type: 'error'
                    });
                }

            });
        }
        function getProvincia(bandera, id) {
            RESTService.get('orden_servicios/TraerProvinciasOrde', id, function (response) {
                if (!_.isUndefined(response.status) && response.status) {
                    var data_p = response.data;

                    provincia.html('');
                    provincia.append('<option value="" >Seleccione</option>');
                    _.each(response.data, function (item) {
                        if (item.cProvincia == bandera) {
                            provincia.append('<option value="' + item.cProvincia + '" selected>' + item.cProvincia + '</option>');
                        } else {
                            provincia.append('<option value="' + item.cProvincia + '">' + item.cProvincia + '</option>');
                        }

                    });

                } else {
                    AlertFactory.textType({
                        title: '',
                        message: 'Hubo un error . Intente nuevamente.',
                        type: 'error'
                    });
                }

            });
        }
        function getSector(bandera, id) {
            RESTService.get('orden_servicios/traerSectorOrd', id, function (response) {
                if (!_.isUndefined(response.status) && response.status) {
                    var data_p = response.data;
                    console.log(data_p);
                    idsector.html('');
                    idsector.append('<option value="" >Seleccione</option>');
                    _.each(response.data, function (item) {
                        if (item.id == bandera) {
                            idsector.append('<option value="' + item.id + '" selected>' + item.descripcion + '</option>');
                        } else {
                            idsector.append('<option value="' + item.id + '">' + item.descripcion + '</option>');
                        }

                    });

                } else {
                    AlertFactory.textType({
                        title: '',
                        message: 'Hubo un error al obtener el Artículo. Intente nuevamente.',
                        type: 'error'
                    });
                }

            });
        }
        function getDistrito(bandera, id) {
            RESTService.get('orden_servicios/TraerDistritosOrde', id, function (response) {
                if (!_.isUndefined(response.status) && response.status) {
                    var data_p = response.data;

                    distrito.html('');
                    distrito.append('<option value="" >Seleccione</option>');
                    _.each(response.data, function (item) {
                        if (item.cCodUbigeo == bandera) {
                            distrito.append('<option value="' + item.cCodUbigeo + '" selected>' + item.cDistrito + '</option>');
                        } else {
                            distrito.append('<option value="' + item.cCodUbigeo + '">' + item.cDistrito + '</option>');
                        }

                    });

                } else {
                    AlertFactory.textType({
                        title: '',
                        message: 'Hubo un error al obtener el Artículo. Intente nuevamente.',
                        type: 'error'
                    });
                }

            });
        }
        function getCliente() {
            var bval = true;
            bval = bval && documento_or.required();
            if (bval) {
                var id = documento_or.val();
                RESTService.get('orden_servicios/get_cliente', id, function (response) {
                    if (!_.isUndefined(response.status) && response.status) {
                        var datos = response.data;
                        console.log("entro")
                        if (datos.length == 0) {
                            $("#formulario-clientes").trigger("reset");
                            titleModalClientes.html('Nuevo Cliente');
                            modaClientes.modal('show');
                            var bandera = 'xxxxx';
                            getDepartamento(bandera);
                            distrito_ver.val("");
                            distrito_or.val("");
                            idDocumentoCli.val("");
                            razonsocial_cliente_or.val("");
                            documento.val(documento_or.val());
                            documento_or.val("");
                            contacto_or.val("");
                            direccion_or.val("");
                            correo_electronico_or.val("");
                            id_tipoDoc_Venta_or.val("").trigger('change');
                            celular_or.val("");
                            telefono_or.val("");
                            cliente_id_or.val("");
                            tipoCliente_or.val("");
                            id_tipocli.data("prev", id_cliente_tipo_or.val());
                            id_tipocli.val(id_cliente_tipo_or.val());
                            // id_cliente_tipo_or.val("")
                            // llenarServicios();
                        } else {
                            distrito_ver.val(datos[0].cDistrito);
                            distrito_or.val(datos[0].ubigeo);
                            idDocumentoCli.val(datos[0].tipodoc).trigger('change');
                            razonsocial_cliente_or.val(datos[0].razonsocial_cliente);
                            documento_or.val(datos[0].documento);
                            contacto_or.val(datos[0].contacto);
                            direccion_or.val(datos[0].direccion);
                            correo_electronico_or.val(datos[0].correo_electronico);

                            celular_or.val(datos[0].celular);
                            telefono_or.val(datos[0].telefono);
                            cliente_id_or.val(datos[0].idCliente);
                            tipoCliente_or.val(datos[0].tipo_cliente_descr).trigger('change');
                            id_cliente_tipo_or.val(datos[0].id_tipocli)
                            id_tipocli.data("prev", id_cliente_tipo_or.val());
                            id_tipoDoc_Venta_or.val(datos[0].IdTipoDocumento).trigger("change");
                            if (nConsecutivo.val() == "") {
                                id_tipoDoc_Venta_or.focus();
                            }
                            $("#dFechanacimiento").val(datos[0].dFechanacimiento_server);

                            // llenarServicios();

                        }
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
        function getPlaca() {
            var bval = true;
            bval = bval && placa.required();
            if (bval) {
                var id = placa.val();
                RESTService.get('orden_servicios/get_Placa', id, function (response) {
                    if (!_.isUndefined(response.status) && response.status) {
                        var datos = response.data;


                        idMarca_add.html("");
                        idMarca_add.append('<option value="" selected>Seleccionar</option>');
                        _.each(response.marca, function (item) {
                            idMarca_add.append('<option value="' + item.id + '" >' + item.description + '</option>');
                        });
                        if (datos.length == 0) {
                            titleModalVehiculosTerceros.html('Nuevo Vehiculo');
                            modaVehiculosTerceros.modal('show');
                            placa.val("");
                            marca.val("");
                            modelo.val("");
                            chasis.val("");
                            anio_fabricacion.val("");
                            color.val("");
                            motor.val("");
                            tipo_vehi.val("");
                            $("#tipo_articulo").val("");
                            $("#idmarca").val("").trigger("change");
                            $("#idmodelo").val("").trigger("change");
                            $("#id_").val("");
                            $("#idproducto").val("");
                        } else {
                            $("#idmarca").val(datos[0].idMarca).trigger('change');
                            getModelo(datos[0].idModelo, datos[0].idMarca);
                            $("#tipo_articulo").val(datos[0].tipo);
                            $("#id_").val(datos[0].id);
                            $("#idproducto").val(datos[0].idproducto);
                            placa.val(datos[0].placa);
                            marca.val(datos[0].marca);
                            modelo.val(datos[0].modelo);
                            chasis.val(datos[0].n_chasis);
                            anio_fabricacion.val(datos[0].anio_fabricacion);
                            color.val(datos[0].color);
                            motor.val(datos[0].motor);
                            tipo_vehi.val(datos[0].tipo_vehiculo);
                            if (nConsecutivo.val() == "") {
                                nKilometraje.focus();
                            }

                        }
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

        function getVehiculo() {
            var bval = true;
            // bval = bval && placa.required();
            if (bval) {
                var id = $("#id_").val();
                id = id + "|" + $("#tipo_articulo").val();

                RESTService.get('orden_servicios/get_vehiculo', id, function (response) {
                    if (!_.isUndefined(response.status) && response.status) {
                        var datos = response.data;


                        idMarca_add.html("");
                        idMarca_add.append('<option value="" selected>Seleccionar</option>');
                        _.each(response.marca, function (item) {
                            idMarca_add.append('<option value="' + item.id + '" >' + item.description + '</option>');
                        });
                        if (datos.length == 0) {
                            titleModalVehiculosTerceros.html('Nuevo Vehiculo');
                            modaVehiculosTerceros.modal('show');
                            placa.val("");
                            marca.val("");
                            modelo.val("");
                            chasis.val("");
                            anio_fabricacion.val("");
                            color.val("");
                            motor.val("");
                            tipo_vehi.val("");
                            $("#tipo_articulo").val("");
                            $("#idmarca").val("").trigger("change");
                            $("#idmodelo").val("").trigger("change");
                            $("#id_").val("");
                            $("#idproducto").val("");
                        } else {
                            $("#idmarca").val(datos[0].idMarca).trigger('change');
                            getModelo(datos[0].idModelo, datos[0].idMarca);
                            $("#tipo_articulo").val(datos[0].tipo);
                            $("#id_").val(datos[0].id);
                            $("#idproducto").val(datos[0].idproducto);
                            placa.val(datos[0].placa);
                            marca.val(datos[0].marca);
                            modelo.val(datos[0].modelo);
                            chasis.val(datos[0].n_chasis);
                            anio_fabricacion.val(datos[0].anio_fabricacion);
                            color.val(datos[0].color);
                            motor.val(datos[0].motor);
                            tipo_vehi.val(datos[0].tipo_vehiculo);
                            if (nConsecutivo.val() == "") {
                                nKilometraje.focus();
                            }

                        }
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
        //  $scope.chkState = function () {
        //     var checkOpera= (pOper.prop('checked')) ? '1' : '2';
        //     console.log("entro");
        //     if(checkOpera=='1'){
        //          var dataCheck= $(this).data("idCheck").val();
        //          console.log(dataCheck)
        //     }else{
        //         console.log('fuePe');
        //     }
        // };
        departamento.change(function () {
            var bandera = 'xxxxxx';
            var id = departamento.val();
            getProvincia(bandera, id);
        });
        idMoneda.change(function () {
            console.log("algo");
            if (table_servicios.html() != "") {
                modalDeleteDetalle.modal("show");
            }
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
            totalDescuento.html("");
            totalDescuento.append('<option value="">Seleccionar</option>');
            _.each(descuentosTotales, function (item) {
                if (item.cTipoAplica == 'T') {
                    console.log("entro acá");
                    var mo = idMoneda.val();
                    var por = Number(item.nPorcDescuento);
                    var monto = Number(item.nMonto);
                    console.log("item tota dhdhdh");
                    console.log(item.idMoneda);
                    console.log(mo);
                    console.log(item.nPorcDescuento);
                    console.log(item.nSaldoUso);
                    console.log(item.nLimiteUso);
                    console.log("item tota");
                    if ((item.idMoneda == mo || item.nPorcDescuento != 0) && (item.nSaldoUso > 0 || item.nLimiteUso == 0)) {

                        console.log("entro acá2", item.descripcion);

                        if (item.dFecIni <= actu && item.dFecFin > actu) {
                            console.log("entro aaaaaaaaaaaaa");
                            totalDescuento.append('<option value="' + item.id + '*' + por + '*' + monto + '" >' + item.descripcion + '</option>');
                        }
                    }
                }
            });
            // llenarServicios();
        });

        id_cliente_tipo_or.change(function () {

            // llenarServicios();
        });
        id_tipocli.change(function () {

            if (id_cliente_tipo_or.val() != "") {

                if (id_tipocli.val() != id_cliente_tipo_or.val() && id_tipocli.val() != "") {
                    if (table_servicios.html() != "") {


                        modalDeleteDetalle.modal('show');
                    }
                }
            }

        });
        btn_cancelar_servicio.click(function () {
            idMoneda.val(idMoneda.data("prev")).trigger("change");
            id_tipocli.val(id_tipocli.data("prev")).trigger("change");

        });

        btn_cerrar.click(function () {
            idMoneda.val(idMoneda.data("prev")).trigger("change");
            id_tipocli.val(id_tipocli.data("prev")).trigger("change");
        });
        // idMoneda.click(function () {
        //     valor_moneda=$(this).val();
        //     console.log(valor_moneda);
        // });
        function llenarServicios() {

            var mone_ser = idMoneda.val();
            var clientipo_ser = id_cliente_tipo_or.val();

        }
        idMarca_add.change(function () {
            var id = idMarca_add.val();
            RESTService.get('orden_servicios/get_Modelo', id, function (response) {
                if (!_.isUndefined(response.status) && response.status) {
                    idModelo_add.html('');
                    _.each(response.modelo, function (item) {
                        idModelo_add.append('<option value="' + item.idModelo + '" selected>' + item.descripcion + '</option>');
                    });
                } else {
                    AlertFactory.textType({
                        title: '',
                        message: 'No se pudo obtner los modelos . Intente nuevamente.',
                        type: 'info'
                    });
                }

            });
        });
        distrito.change(function () {
            var bandera = 'xxxxxx';
            var id = distrito.val();
            getSector(bandera, id);
        });

        provincia.change(function () {
            var bandera = 'xxxxxx';
            var id = provincia.val();
            getDistrito(bandera, id);

        });
        gru_revisiones.change(function () {
            var vto = gru_revisiones.val();
            if (vto != '') {
                var modo_t = 0;
                addMante(vto, modo_t);
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
                console.log("articuloPrecio");
                var nImpue = 0;
                var nPorcDescuento = 0;
                var nDescuento = 0;
                addServicios(articuloPrecio, tipoTo, tipoText, modo_ser, iddet, cant, opera, idDescuento, nImpue, nPorcDescuento, nDescuento);

            }
        });
        // function addServicios(vto,tipoTo,tipoText,modo_ser,iddet){
        //     var arrayRe=vto.split("*");
        //     var code=arrayRe[0];
        //     var producto=arrayRe[1];
        //     var precio=arrayRe[2];
        //     var impuesto=arrayRe[3];
        //     var preci_t=Number(precio).toFixed(decimales_redondeo);

        //     if ($('#tr_b_' + code).length > 0) {
        //         AlertFactory.showWarning({
        //             title: '',
        //             message: 'Ya se asignó este servicio'
        //         });
        //         return false;
        //     }
        //      var tr = $('<tr id="tr_b_' + code + '"></tr>');
        //      var td1 = $('<td>' + producto + '</td>');
        //      var tda = $('<td></td>');
        //      var tdb = $('<td></td>');
        //      var td2 = $('<td class="text-center"></td>');
        //      var idRevision_input = $('<input type="hidden" class="idRevision_select form-control input-sm"  value="'+code+'" />');
        //      var idTipo_input = $('<input type="hidden" class="idTipo_select form-control input-sm"  value="'+tipoTo+'" />');
        //     var idGrupDe_input= $('<input type="hidden" class="idDetalleGrup form-control input-sm"  value="'+iddet+'" />');
        //      var idinput_modoser = $('<input type="hidden" class="modo_serDet form-control input-sm"  value="'+modo_ser+'" />');
        //      var tipototal = $('<input class="total_revision form-control input-sm" data-idTipo="'+tipoTo+'" data-idS="' + code + '" id="tr_pre' + code + '"  value="'+tipoText+'" readonly/>');
        //      var precio = $('<input type="number" min="1" class="precio_m form-control input-sm"  data_idTipoPres="'+tipoTo+'" id="tr_prec_'+code+'" data-precio="' +preci_t+ '" value="' +preci_t+ '"  />');
        //      var btn = $('<button class="btn btn-danger btn-xs deltotal" data-idedet="'+iddet+'" data_idTipoDel="'+tipoTo+'" data-id="' + code + '" type="button"><span class="fa fa-trash"></span></button>');
        //      tda.append(precio);
        //      tdb.append(tipototal);
        //      td2.append(btn).append(idRevision_input).append(idTipo_input).append(idinput_modoser).append(idGrupDe_input);
        //      tr.append(td1).append(tda).append(tdb).append(td2);
        //      table_servicios.append(tr);
        //     idMoneda.data("prev",idMoneda.val()); 
        //     id_tipocli.data("prev",id_cliente_tipo_or.val());   
        //     var precio=arrayRe[2];
        //      if(tipoTo=='1'){
        //         var mo_r=mo_revision.val();


        //         var new_mor=Number(mo_r)+Number(precio);
        //         mo_revision.val(new_mor.toFixed(decimales_redondeo));
        //      }else if(tipoTo=='2'){
        //         var mo_m=mo_mecanica.val();
        //         var new_mo_m=Number(mo_m)+Number(precio);
        //         mo_mecanica.val(new_mo_m.toFixed(decimales_redondeo));
        //      }else if(tipoTo=='3'){
        //         var mo_tr=terceros.val();
        //         var new_mo_tr=Number(mo_tr)+Number(precio);
        //         terceros.val(new_mo_tr.toFixed(decimales_redondeo));
        //      }else if(tipoTo=='4'){
        //         var mo_otr=otros_mo.val();
        //         var new_mo_otr=Number(mo_otr)+Number(precio);
        //         otros_mo.val(new_mo_otr.toFixed(decimales_redondeo));
        //      }else if(tipoTo=='5'){
        //         var mo_rp=repuestos.val();
        //         var new_mo_rp=Number(mo_rp)+Number(precio);
        //         repuestos.val(new_mo_rp.toFixed(decimales_redondeo));
        //      }else if(tipoTo=='6'){
        //         var mo_ac=accesorios.val();
        //         var new_mo_ac=Number(mo_ac)+Number(precio);
        //         accesorios.val(new_mo_ac.toFixed(decimales_redondeo));
        //      }else if(tipoTo=='7'){
        //         var mo_lub=lubricantes.val();
        //         var new_mo_lub=Number(mo_lub)+Number(precio);
        //         lubricantes.val(new_mo_lub.toFixed(decimales_redondeo));
        //      }else if(tipoTo=='8'){
        //         var mo_trp=otros_rep.val();
        //         var new_trp=Number(mo_trp)+Number(precio);
        //         otros_rep.val(new_trp.toFixed(decimales_redondeo));
        //      }
        //     sumar_key(); 
        //     servicios_select.val("").trigger("change");
        //     tipo_totales_slec.val("").trigger("change");
        //     //  var totales_table=$("#tr_pre"+code);
        //     // totales_table.append('<option value="" selected>Seleccionar </option>');
        //     // _.each(totales, function(item) {
        //     // totales_table.append('<option value="'+item.id+'">'+item.descripcion+'</option>');
        //     // });
        //      // $('.total_revision').change(function (e) {
        //      //    var code = $(this).val();

        //      // });
        //         $("#tr_prec_"+code).keypress(function(e) {
        //          var code = (e.keyCode ? e.keyCode : e.which);
        //             if(code==13){
        //             var tipoTo =$(this).attr('data_idTipoPres');


        //             var precio_ant =$(this).attr('data-precio');
        //             var precio_act=$(this).val();

        //                if(tipoTo=='1'){
        //                     var mo=mo_revision.val();
        //                     var precio_temp=Number(mo)-Number(precio_ant);
        //                     var mont=Number(precio_temp)+Number(precio_act);
        //                     $(this).attr('data-precio',mont.toFixed(decimales_redondeo));
        //                     mo_revision.val(mont.toFixed(decimales_redondeo));
        //                  }else if(tipoTo=='2'){
        //                     var mo=mo_mecanica.val();
        //                     var precio_temp=Number(mo)-Number(precio_ant);
        //                     var mont=Number(precio_temp)+Number(precio_act);
        //                     $(this).attr('data-precio',mont.toFixed(decimales_redondeo));
        //                     mo_mecanica.val(mont.toFixed(decimales_redondeo));
        //                  }else if(tipoTo=='3'){
        //                     var mo=terceros.val();
        //                      var precio_temp=Number(mo)-Number(precio_ant);
        //                     var mont=Number(precio_temp)+Number(precio_act);
        //                     $(this).attr('data-precio',mont.toFixed(decimales_redondeo));
        //                     terceros.val(mont.toFixed(decimales_redondeo));
        //                  }else if(tipoTo=='4'){
        //                     var mo=otros_mo.val();
        //                     var precio_temp=Number(mo)-Number(precio_ant);
        //                     var mont=Number(precio_temp)+Number(precio_act);
        //                     $(this).attr('data-precio',mont.toFixed(decimales_redondeo));
        //                     otros_mo.val(mont.toFixed(decimales_redondeo));
        //                  }else if(tipoTo=='5'){
        //                     var mo=repuestos.val();
        //                     var precio_temp=Number(mo)-Number(precio_ant);
        //                     var mont=Number(precio_temp)+Number(precio_act);
        //                     $(this).attr('data-precio',mont.toFixed(decimales_redondeo));
        //                     repuestos.val(mont.toFixed(decimales_redondeo));
        //                  }else if(tipoTo=='6'){
        //                     var mo=accesorios.val();
        //                     var precio_temp=Number(mo)-Number(precio_ant);
        //                     var mont=Number(precio_temp)+Number(precio_act);
        //                     $(this).attr('data-precio',mont.toFixed(decimales_redondeo));
        //                     accesorios.val(mont.toFixed(decimales_redondeo));
        //                  }else if(tipoTo=='7'){
        //                     var mo=lubricantes.val();
        //                     var precio_temp=Number(mo)-Number(precio_ant);
        //                     var mont=Number(precio_temp)+Number(precio_act);
        //                     $(this).attr('data-precio',mont.toFixed(decimales_redondeo));
        //                     lubricantes.val(mont.toFixed(decimales_redondeo));
        //                  }else if(tipoTo=='8'){
        //                     var mo=otros_rep.val();
        //                     var precio_temp=Number(mo)-Number(precio_ant);
        //                     var mont=Number(precio_temp)+Number(precio_act);
        //                     $(this).attr('data-precio',mont.toFixed(decimales_redondeo));
        //                     otros_rep.val(new_trp.toFixed(decimales_redondeo));
        //                  }
        //                 sumar_key(); 
        //             }
        //          });

        //      $('.deltotal').click(function (e) {
        //         var code = $(this).attr('data-id');
        //         var idTipo = $(this).attr('data_idTipoDel');
        //         var idedet=$(this).attr('data-idedet');
        //         AlertFactory.confirm({
        //             title: '',
        //             message: '¿Está seguro que desea quitar este servicio ?',
        //             confirm: 'Si',
        //             cancel: 'No'
        //         }, function () {
        //             if(nConsecutivo.val()!='' && idedet){

        //                 var id=cCodConsecutivo.val()+'_'+nConsecutivo.val()+'_'+idedet;

        //                 RESTService.get('orden_servicios/deleteDetalle', id, function(response) {
        //                 if (!_.isUndefined(response.status) && response.status) {
        //                     var data=response.data;
        //                     if(data[0].Mensaje!=''){
        //                           AlertFactory.textType({
        //                             title: '',
        //                             message: data[0].Mensaje,
        //                             type: 'info'
        //                         });
        //                     }else{
        //                            AlertFactory.textType({
        //                             title: '',
        //                             message: 'El servicio se eliminó correctamente',
        //                             type: 'success'
        //                         });
        //                         $('#tr_b_' + code).remove();
        //                     }
        //              }else {
        //                 var msg_ = (_.isUndefined(response.message)) ?
        //                     'No se pudo eliminar. Intente nuevamente.' : response.message;
        //                         AlertFactory.textType({
        //                             title: '',
        //                             message: msg_,
        //                             type: 'error'
        //                         });
        //                  }
        //                 });
        //             }else{
        //                 var idcod='#tr_' + code;
        //             var precio_borrar=$("#tr_prec_"+code).val();
        //         if(idTipo=='1'){
        //             var mo_r=mo_revision.val();
        //             var new_mor=Number(mo_r)-Number(precio_borrar);
        //             mo_revision.val(new_mor.toFixed(decimales_redondeo));
        //          }else if(idTipo=='2'){
        //             var mo_m=mo_mecanica.val();
        //             var new_mo_m=Number(mo_m)-Number(precio_borrar);

        //             mo_mecanica.val(new_mo_m.toFixed(decimales_redondeo));
        //          }else if(idTipo=='3'){
        //             var mo_tr=terceros.val();
        //             var new_mo_tr=Number(mo_tr)-Number(precio_borrar);
        //             terceros.val(new_mo_tr.toFixed(decimales_redondeo));
        //          }else if(idTipo=='4'){
        //             var mo_otr=otros_mo.val();
        //             var new_mo_otr=Number(mo_otr)-Number(precio_borrar);
        //             otros_mo.val(new_mo_otr.toFixed(decimales_redondeo));
        //          }else if(idTipo=='5'){
        //             var mo_rp=repuestos.val();
        //             var new_mo_rp=Number(mo_rp)-Number(precio_borrar);
        //             repuestos.val(new_mo_rp.toFixed(decimales_redondeo));
        //          }else if(idTipo=='6'){
        //             var mo_ac=accesorios.val();
        //             var new_mo_ac=Number(mo_ac)-Number(precio_borrar);
        //             accesorios.val(new_mo_ac.toFixed(decimales_redondeo));
        //          }else if(idTipo=='7'){
        //             var mo_lub=lubricantes.val();
        //             var new_mo_lub=Number(mo_lub)-Number(precio_borrar);
        //             lubricantes.val(new_mo_lub.toFixed(decimales_redondeo));
        //          }else if(idTipo=='8'){
        //             var mo_trp=otros_rep.val();
        //             var new_trp=Number(mo_trp)-Number(precio_borrar);
        //             otros_rep.val(new_trp.toFixed(decimales_redondeo));
        //          }
        //             sumar_key(); 
        //             $('#tr_b_' + code).remove();
        //         }



        //         });
        //         e.preventDefault();
        //     });

        // }
        function calcular_impueso(precio, cantidad) {
            var impu = (Number(precio) * Number(cantidad)) * ((Number(igv) / 100));
            impu = impu.toFixed(decimales_redondeo);
            return impu;
        }
        function calcular_precio_totales(precio_ant, precio_act, tipoTo, code, tr_pre, data_prec) {
            console.log("entroprecios");
            if (tipoTo == '1') {
                var mo = mo_revision.val();
                console.log("***********");
                console.log(mo);

                var precio_temp = Number(mo) - Number(precio_ant);
                console.log(precio_temp);
                var mont = Number(precio_temp) + Number(precio_act);
                $("#" + tr_pre + code).attr(data_prec, mont.toFixed(decimales_redondeo));
                mo_revision.val(mont.toFixed(decimales_redondeo));
                console.log("********");
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

        $.fn.modal.Constructor.prototype.enforceFocus = function () { };
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
                //             console.log(valDes,idDescuento);
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

                $("#id_desc_" + codigo).val(idDescuento).trigger("change");
            });
        }
        function totales_nuevo() {
            clean_totale()
            $("#table_servicios tr").each(function () {
                var data_prec = 'data-precio';
                var tr_pre = 'tr_subtotalSer';
                var tipoTo = $(this).find("td:eq(1)").children("input").attr('data-tipoto');
                var code = $(this).find("td:eq(1)").children("input").attr('data-codigoC');
                var precio_ant = 0;
                var precio_act = $(this).closest("tr").find("td:eq(8)").children("input").val();
                calcular_precio_totales(precio_ant, precio_act, tipoTo, code, tr_pre, data_prec);

            });

        }
        function cambio(codigo) {
            console.log("entro");
            var data_prec = 'data-precio';
            var tr_pre = 'tr_subtotalSer';
            var tipoTo = $("#pOper" + codigo).attr('data-tipotoChek');
            var code = codigo;


            if ($("#pOper" + codigo).prop('checked')) {
                console.log("entroA");
                // console.log("tewrcer actualizado");
                $("#id_desc_" + code).val("").trigger('change');
                $("#id_desc_" + code).prop("disabled", true);
                // var precio_ant=$("#tr_subtotalSer"+code).attr('data-precio');
                // var precio_act=$("#tr_subtotalSer"+code).val();

                // console.log(precio_ant,precio_act);
                // var precio_ant=$("#tr_subtotalSer"+code).attr('data-precio',precio_act);
                // var precio_act=$("#tr_subtotalSer"+code).val();
            } else {
                // console.log("cuarto actualizado");
                // console.log("entrodd");
                $("#id_desc_" + code).prop("disabled", false);
                // var precio_ant=$("#tr_subtotalSer"+code).attr('data-precio');
                // var precio_act=$("#tr_subtotalSer"+code).val();
                // console.log(precio_ant,precio_act,tipoTo);
                // var precio_ant=$("#tr_subtotalSer"+code).attr('data-precio',precio_act);


            }
            calcular_total_MO();
            sumar_key();
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
            console.log("impues");
            console.log(impuesto_can);
            if (iddet != 0) {
                impuesto = 0;
                if (idDescuento != "") {
                    porcentajeid = nPorcDescuento;
                    montoid = nDescuento;
                }
            }
            if (impuesto == 1) {
                impuesto_can = calcular_impueso(preci_t, cantidad);
            };


            var check = "";
            var disab = "";
            if (opera == "S") {
                check = "checked";
                disab = "disabled";
            }
            var subt = 0;
            subt = Number(preci_t) * Number(cantidad) + Number(impuesto_can);

            if ($('#tr_b_' + code).length > 0) {
                AlertFactory.showWarning({
                    title: '',
                    message: 'Ya se asignó este servicio'
                });
                return false;
            }
            console.log("ver precio mal ");
            console.log(subt.toFixed(decimales_redondeo));
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
            var chek = $(' <div class="col-sm-1"><label class="checkbox-inline i-checks"><input data-idCheck="' + code + '" data-tipotoChek="' + tipoTo + '" class="checkClass" type="checkbox" id="pOper' + code + '" ' + check + '  > </label></div>');
            var monto = $('<input type="type" id="monto_' + code + '" class="monto form-control input-sm"  value="' + montoid + '"  readonly/>');
            var porc = $('<input type="type" id="porc_' + code + '" class="porcent form-control input-sm"  value="' + porcentajeid + '"  readonly/>');
            var inpDes = $('<select id="id_desc_' + code + '" data-tipotoSe="' + tipoTo + '"  class="descuentosSelect form-control input-sm" data-desc="' + code + '"  style="width: 100%"  ' + disab + ' ></select>');
            var idRevision_input = $('<input type="hidden" class="idRevision_select form-control input-sm"  value="' + code + '"  />');
            var impuestoRe = $('<input type="number" class="totalImpuesto_servicio form-control input-sm" data-impuestoSer="' + impuesto + '"  id="tr_impSer' + code + '" data-imp="' + impuesto_can + '" value="' + impuesto_can + '" readonly/>');
            var subtotal_input = $('<input type="number" class="subtotal_repuesto form-control input-sm" data-SubtotalSer="' + subt + '" data-precio="' + subt.toFixed(decimales_redondeo) + '"  id="tr_subtotalSer' + code + '"  value="' + subt.toFixed(decimales_redondeo) + '" readonly/>');
            var idTipo_input = $('<input type="hidden" class="idTipo_select form-control input-sm"  value="' + tipoTo + '" />');
            var idGrupDe_input = $('<input type="hidden" class="idDetalleGrup form-control input-sm"  value="' + iddet + '" />');
            var idinput_modoser = $('<input type="hidden" class="modo_serDet form-control input-sm"  value="' + modo_ser + '" />');
            var tipototal = $('<input class="total_revision form-control input-sm" data-idTipo="' + tipoTo + '" data-idS2="' + code + '"  value="' + tipoText + '" readonly/>');
            var precio = $('<input type="text" class="precio_m form-control input-sm"  data_idTipoPres="' + tipoTo + '" id="tr_prec_' + code + '" data-categoriaServicio="' + cat_servicio + '"   data-precioOrigen="' + preci_t + '" value="' + preci_t + '"  onkeypress="return validDecimals(event, this, 2)"/>');
            var btn = $('<button class="btn btn-danger btn-xs deltotal" data-idedet="' + iddet + '" data_idTipoDel="' + tipoTo + '" data-id="' + code + '" type="button"><span class="fa fa-trash"></span></button>');
            // if($("#estado").val() == "3") { // estado terminado
            //     btn = "";
            // }
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
            idMoneda.data("prev", idMoneda.val());
            id_tipocli.data("prev", id_cliente_tipo_or.val());
            var precio = arrayRe[2];
            var precio_antT = 0;
            var precio_actT = Number(precio) + Number(impuesto_can);
            var data_prec = 'data-precio';
            var tr_pre = 'tr_subtotalSer';
            if (idOrden != "") {
                if (opera == "S") {
                    precio_actT = 0;
                } else {
                    console.log(cantidad, precio, impuesto_can, porcentajeid, montoid)
                    precio_actT = (Number(cant) * Number(precio)) + Number(impuesto_can) - Number(porcentajeid) - Number(montoid);
                    precio_actT = precio_actT.toFixed(decimales_redondeo);
                };
            }

            console.log("precios actuales ver");
            console.log(impuesto_can);
            console.log(precio_antT, precio_actT);
            addDescuentos(code, idDescuento);


            calcular_total_MO();
            sumar_key();


            $('.i-checks').iCheck({
                checkboxClass: 'icheckbox_square-green'
            }).on('ifChanged', function (event) {
                $(event.target).click();
                console.log("vuelta");
                var codigo2 = $(this).closest("tr").find("td:eq(1)").children("input").attr('data-codigoC');

                cambio(codigo2);
            });
            $(".precio_m").blur(function () {
                console.log("perdio");
                var preciofin = $(this).val();
                var precioOr = $(this).attr('data-precioOrigen');
                var catServicio = $(this).attr('data-categoriaservicio');
                var newpp = Number(precioOr) + Number(redondeo);
                var newpn = Number(precioOr) - Number(redondeo);
                if (catServicio != dataServicioGeneral) {
                    if (preciofin > newpp || preciofin < newpn) {
                        AlertFactory.textType({
                            title: '',
                            message: 'El precio del producto solo se puede ajustar +- ' + redondeo,
                            type: 'info'
                        });
                        $(this).val(precioOr);

                    }
                }
                calcular_total_MO();
                sumar_key();

            });


            $('.precio_m').keypress(function (e) {

                var precioOr = $(this).attr('data-precioOrigen');
                var catServicio = $(this).attr('data-categoriaservicio');

                var code = (e.keyCode ? e.keyCode : e.which);
                if (code == 13) {
                    var preciofin = $(this).val();
                    var newpp = Number(precioOr) + Number(redondeo);
                    var newpn = Number(precioOr) - Number(redondeo);
                    if (catServicio != dataServicioGeneral) {
                        if (preciofin > newpp || preciofin < newpn) {
                            AlertFactory.textType({
                                title: '',
                                message: 'El precio del producto solo se puede ajustar +- ' + redondeo,
                                type: 'info'
                            });
                            $(this).val(precioOr);

                        }
                    }
                    calcular_total_MO();
                    sumar_key();

                }
            });
            //   $('.checkClass').click(function (e) {
            //         var data_prec='data-precio';
            //         var tr_pre='tr_subtotalSer';
            //         var tipoTo=$(this).attr('data-tipotoChek');
            //         var code=$(this).attr('data-idCheck');
            //     if($(this).prop('checked')){
            //         calcular_total_MO();
            //         $("#id_desc_"+code).prop("disabled",false);
            //         // var precio_ant=$(this).closest("tr").find("td:eq(8)").children("input").attr('data-precio');
            //         // var precio_act=$(this).closest("tr").find("td:eq(8)").children("input").val();
            //         // calcular_precio_totales(precio_ant,precio_act,tipoTo,code,tr_pre,data_prec);
            //         // sumar_key();
            //     }else{  var data_prec='data-precio';
            //         $("#id_desc_"+code).val("").trigger('change');
            //         $("#id_desc_"+code).prop("disabled",true);
            //         calcular_total_MO();
            //          var precio_ant=$(this).closest("tr").find("td:eq(8)").children("input").attr('data-precio');
            //         var precio_act=$(this).closest("tr").find("td:eq(8)").children("input").val();
            //         calcular_precio_totales(precio_ant,precio_act,tipoTo,code,tr_pre,data_prec);
            //         sumar_key();
            //     }
            //   });
            $('.cantOrde').keyup(function (e) {
                // console.log("entro cant");
                // // var cantidap = $(this).val();
                // // var impuestoOri=$(this).closest("tr").find("td:eq(3)").children("input").attr('data-imp');
                // // console.log("****");
                // // var totalImp=Number(cantidap)*Number(impuestoOri);
                // // totalImp=totalImp.toFixed(decimales_redondeo)
                // //  $(this).closest("tr").find("td:eq(3)").children("input").val(totalImp);
                // //  id_tipocli.data("prev",id_tipocli.val());
                //   var data_prec='data-precio';
                //   var tr_pre='tr_subtotalSer';
                //   var code=$(this).attr('data-codigoC');
                //   var tipoTo=$(this).attr('data-tipoto');

                //   if($("#id_desc_"+code).val()!=""){
                //       if( $("#porc_"+code).val()>0){
                //           var val=$("#id_desc_"+code).val();
                //           var arrayRe=val.split("*");
                //           var code=arrayRe[0];
                //           var porc=arrayRe[1];
                //           var cantidadt=Number($(this).closest("tr").find("td:eq(1)").children("input").val());
                //           if(cantidadt==""){
                //               cantidadt=0;
                //           }
                //           var preciot=Number($(this).closest("tr").find("td:eq(2)").children("input").val());
                //           var impuestot=Number($(this).closest("tr").find("td:eq(3)").children("input").val());
                //           var subtota=(cantidadt*preciot)+(impuestot);
                //           var porTotal=Number((Number(porc)*Number(subtota))/100);


                //           $(this).closest("tr").find("td:eq(6)").children("input").val(porTotal.toFixed(decimales_redondeo));
                //           console.log($("#porc_"+code).val());
                //             calcular_total_MO();
                //       }
                //   }

                //   if($("#pOper"+code).prop('checked')){
                //       console.log("puede sumar ");
                //   }else{
                //       console.log("primer actualizado");
                //       calcular_total_MO();
                //       var precio_ant=$(this).closest("tr").find("td:eq(8)").children("input").attr('data-precio');
                //       var precio_act=$(this).closest("tr").find("td:eq(8)").children("input").val();

                //       $(this).closest("tr").find("td:eq(8)").children("input").attr('data-precio',precio_act);
                //       sumar_key();

                //   }
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

                // var data_prec='data-precio';
                // var tr_pre='tr_subtotalSer';
                // var tipoTo=$(this).attr('data-tipotoSe');

                // if($("#pOper"+codigo).prop('checked')){
                //     console.log("no puede sumar ")
                // }else{
                //     console.log("entro a sumar ");
                //     console.log("segundo actualizado");
                //     calcular_total_MO();
                //     var precio_ant=$(this).closest("tr").find("td:eq(8)").children("input").attr('data-precio');
                //     var precio_act=$(this).closest("tr").find("td:eq(8)").children("input").val();

                //     $(this).closest("tr").find("td:eq(8)").children("input").attr('data-precio',precio_act);
                //     sumar_key();
                //     calcular_total_MO();


                // }
                calcular_total_MO();
                sumar_key();



            });
            servicios_select.val("").trigger("change");
            tipo_totales_slec.val("").trigger("change");
            //  var totales_table=$("#tr_pre"+code);
            // totales_table.append('<option value="" selected>Seleccionar </option>');
            // _.each(totales, function(item) {
            // totales_table.append('<option value="'+item.id+'">'+item.descripcion+'</option>');
            // });
            // $('.total_revision').change(function (e) {
            //    var code = $(this).val();

            // });
            // $("#tr_prec_"+code).keypress(function(e) {
            //  var tecl = (e.keyCode ? e.keyCode : e.which);
            //     if(tecl==13){
            //     var tipoTo =$(this).attr('data_idTipoPres');
            //     var precio_ant =$(this).attr('data-precio');
            //     var precio_act=$(this).val();
            //     var impuEstado=$("#tr_impSer"+code).attr('data-impuestoSer');
            //     var impuesto_can=0;
            //     var cantidad=1;
            //     if(impuEstado=='1'){
            //         impuesto_can=calcular_impueso(precio_act,cantidad);
            //     }
            //     precio_act=Number(precio_act)+Number(impuesto_can);
            //     $("#tr_impSer"+code).val(impuesto_can);
            //     var data_prec='data-precio';
            //     var tr_pre='tr_subtotalSer';
            //     calcular_precio_totales(precio_ant,precio_act,tipoTo,code,tr_pre,data_prec);
            //     calcular_total_MO();
            //     sumar_key();

            //     }
            //  });

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
                        RESTService.get('orden_servicios/deleteDetalle', id, function (response) {
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
                        var precio_borrar = $("#tr_subtotalSer" + code).val();
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

                        $('#tr_b_' + code).remove();

                    }
                    calcular_total_MO();
                    sumar_key();


                });
                e.preventDefault();
            });

        }

        function getDataForProforma() {
            RESTService.all('orden_servicios/data_formOrden', '', function (response) {
                if (!_.isUndefined(response.status) && response.status) {
                    igv = response.igv[0].value;
                    dataServicioGeneral = response.data_servicioGeneral[0].value;
                    //   articulos_repuestos.append('<option value="">Seleccionar</option>');
                    //  _.each(response.articulos_repuestos, function(item) {
                    //     articulos_repuestos.append('<option value="'+item.id+'*'+item.nPrecio+'">'+item.code_article+' '+item.description+'</option>');
                    // });
                }
            }, function () {
                getDataForProforma();
            });
        }
        getDataForProforma();
        function calcular_total_MO() {
            var totalt = 0;
            var operacionGratuita = 0;
            $("#table_servicios tr").each(function () {
                var cantidadt = $(this).find("td:eq(1)").children("input").val();
                var preciot = Number($(this).find("td:eq(2)").children("input").val());
                var estadoImpues = $(this).find("td:eq(3)").children("input").attr('data-impuestoSer');
                var impu = Number($(this).find("td:eq(3)").children("input").val());
                console.log(estadoImpues);
                console.log("Estado impuesto");
                if (estadoImpues == 1) {
                    impu = Number((Number(preciot) * Number(cantidadt)) * ((Number(igv) / 100)));
                };
                var porce = Number($(this).find("td:eq(6)").children("input").val());
                var monto = Number($(this).find("td:eq(7)").children("input").val());

                var subtota = (cantidadt * preciot) + (impu);

                $(this).find("td:eq(3)").children("input").val(impu.toFixed(decimales_redondeo));
                // $("#monto_"+codigo).val(0);
                var codigo = $(this).find("td:eq(1)").children("input").attr('data-codigoC');

                if ($("#pOper" + codigo).prop('checked')) {
                    $("#grat" + codigo).val(subtota.toFixed(decimales_redondeo));
                    operacionGratuita = operacionGratuita + subtota;
                    subtota = 0;
                } else {
                    if ($(this).find("td:eq(5)").children(".descuentosSelect").val() != "") {
                        if (porce != '0') {
                            var porcet = Number($(this).find("td:eq(6)").children("input").val());
                            var montopor = subtota * porcet / 100;
                            $("#monto_" + codigo).val(montopor.toFixed(decimales_redondeo));
                            subtota = subtota - Number(montopor);
                        } else {
                            subtota = subtota - Number(monto);
                        }
                    };
                }



                $(this).find("td:eq(8)").children("input").val(subtota.toFixed(decimales_redondeo));
                totalt = totalt + subtota;
            });

            totales_nuevo();
            totalMO.val(totalt.toFixed(decimales_redondeo));
            var totalDes = totalt;
            totalDes = Number(totalDes);
            total.val(operacionGratuita.toFixed(decimales_redondeo));
            desTotal.val(totalDes.toFixed(decimales_redondeo));
            totalDescuento.val("").trigger("change");
        }
        function addMante(total, modo_t) {
            var arrayRe = total.split("*");
            var code = arrayRe[0];
            var username = arrayRe[1];

            if ($('#tr_b_' + code).length > 0) {
                AlertFactory.showWarning({
                    title: '',
                    message: 'Ya se asignó este mantenimiento'
                });
                return false;

            }

            var tr = $('<tr id="tr_b_' + code + '"></tr>');
            var td1 = $('<td>' + username + '</td>');
            var td2 = $('<td class="text-center"></td>');
            var inpcodigo = $('<input type="hidden" class="total_revision" id="tr_' + code + '" value="' + total + '" />');
            var modo_mant = $('<input type="hidden" class="modo_mant" id="tr_' + code + '" value="' + modo_t + '" />');
            var codigo_mantenimiento = $('<input type="hidden" class="id_mantenimiento_group"  value="' + code + '"  />');
            var btn = $('<button class="btn btn-danger btn-xs delRevi" data-id="' + code + '" type="button"><span class="fa fa-trash"></span></button>');


            // if($("#estado").val() == "3") { // estado terminado
            //     btn = "";
            // }

            td2.append(btn).append(codigo_mantenimiento).append(modo_mant);
            tr.append(td1).append(td2).append(inpcodigo);
            tabla_grupo_revision.append(tr);
            gru_revisiones.val("").trigger("change");
            // var mo_r=arrayRe[2];
            // var mo_me=arrayRe[3];
            // var mo_ter=arrayRe[4];
            // var mo_otros_mo=arrayRe[5];

            // var mo_rep=arrayRe[6];
            // var mo_acc=arrayRe[7];
            // var mo_lu=arrayRe[8];
            // var mo_ot_re=arrayRe[9];

            // sumar(mo_r,mo_me,mo_ter,mo_otros_mo,mo_rep,mo_acc,mo_lu,mo_ot_re)

            $('.delRevi').click(function (e) {
                var code = $(this).attr('data-id');
                AlertFactory.confirm({
                    title: '',
                    message: '¿Está seguro que desea quitar este mantenimiento?',
                    confirm: 'Si',
                    cancel: 'No'
                }, function () {
                    var idcod = '#tr_' + code;
                    if (nConsecutivo.val() != '') {
                        var id = cCodConsecutivo.val() + '_' + nConsecutivo.val() + '_' + code;
                        RESTService.get('orden_servicios/deleteMovimiento', id, function (response) {
                            if (!_.isUndefined(response.status) && response.status) {
                                var data = response.data;
                                console.log(data);
                                if (data[0].Mensaje != '') {
                                    AlertFactory.textType({
                                        title: '',
                                        message: data[0].Mensaje,
                                        type: 'info'
                                    });
                                } else {
                                    AlertFactory.textType({
                                        title: '',
                                        message: 'El mantenimiento se eliminó correctamente',
                                        type: 'success'
                                    });
                                    $('#tr_b_' + code).remove();
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
                        $('#tr_b_' + code).remove();
                    }

                });
                e.preventDefault();
            });
        }
        $("#mo_revision").keyup(function () {
            sumar_key();
        });
        $("#mo_mecanica").keyup(function () {
            sumar_key();
        });
        $("#terceros").keyup(function () {
            sumar_key();
        });
        $("#otros_mo").keyup(function () {
            sumar_key();
        });
        $("#repuestos").keyup(function () {
            sumar_key();
        });
        $("#accesorios").keyup(function () {
            sumar_key();
        });
        $("#lubricantes").keyup(function () {
            sumar_key();
        });
        $("#otros_rep").keyup(function () {
            sumar_key();
        });



        $("#mo_revision").change(function () {
            sumar_key();
        });
        $("#mo_mecanica").change(function () {
            sumar_key();
        });
        $("#terceros").change(function () {
            sumar_key();
        });
        $("#otros_mo").change(function () {
            sumar_key();
        });
        $("#repuestos").change(function () {
            sumar_key();
        });
        $("#accesorios").change(function () {
            sumar_key();
        });
        $("#lubricantes").change(function () {
            sumar_key();
        });
        $("#otros_rep").change(function () {
            sumar_key();
        });

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

        function sumar_key() {
            var subA = Number(mo_revision.val()) + Number(mo_mecanica.val()) + Number(terceros.val()) + Number(otros_mo.val());
            var subB = Number(repuestos.val()) + Number(accesorios.val()) + Number(lubricantes.val()) + Number(otros_rep.val());
            subtotal_moa.val(subA.toFixed(decimales_redondeo));
            subtotal_mob.val(subB.toFixed(decimales_redondeo));
            var totalfin = Number(subtotal_moa.val()) + Number(subtotal_mob.val());
            // total.val(totalfin.toFixed(decimales_redondeo));

            desTotal.val(totalfin.toFixed(decimales_redondeo));

        }
        function sumar(m1, m2, m3, m4, m5, m6, m7, m8) {
            var mo_revision_va = mo_revision.val();
            var mo_mecanica_va = mo_mecanica.val();
            var terceros_va = terceros.val();
            var otros_mo_va = otros_mo.val();

            mo_revision.val(Number(mo_revision_va) + Number(m1));
            mo_mecanica.val(Number(mo_mecanica_va) + Number(m2));
            terceros.val(Number(terceros_va) + Number(m3));
            otros_mo.val(Number(otros_mo_va) + Number(m4));


            subtotal_moa.val(Number(mo_revision.val()) + Number(mo_mecanica.val()) + Number(terceros.val()) + Number(otros_mo.val()))



            var re_c = repuestos.val();
            var acc_c = accesorios.val();
            var lu_c = lubricantes.val();
            var ot_c = otros_rep.val();

            repuestos.val(Number(re_c) + Number(m5));
            accesorios.val(Number(acc_c) + Number(m6));
            lubricantes.val(Number(lu_c) + Number(m7));
            otros_rep.val(Number(ot_c) + Number(m8));

            subtotal_mob.val(Number(repuestos.val()) + Number(accesorios.val()) + Number(lubricantes.val()) + Number(otros_rep.val()))
            total.val(Number(subtotal_moa.val()) + Number(subtotal_mob.val()));
        };
        modaClientes.on('hidden.bs.modal', function (e) {
            cleanCliente();
        });

        modaVehiculosTerceros.on('hidden.bs.modal', function (e) {
            cleanVehi();
        });
        modalOrdenServivio.on('hidden.bs.modal', function (e) {
            LoadRecordsButtonOrden_Servicio.click();
            cleanOrdenServi();
        });

        function cleanOrdenServi() {
            table_servicios.html("");
            cCodConsecutivo.val("");
            idcCondicionPago.val("");
            nConsecutivo.val("");
            btn_ejecucion.prop('disabled', true);
            btn_cancelar.prop('disabled', true);
            btn_terminada.prop('disabled', true);
            idTecnico.val("");
            idAsesor.val("");

            btn_guardarOrden.prop('disabled', false);
            idTipoVehi_add.val("").trigger("change");
            idMoneda.val("1").trigger("change");
            tipoCliente_or.val("");
            id_cliente_tipo_or.val("");
            dFecRec.val("");
            horaRec.val("");
            tipo_totales_slec.val("");
            cCodConsecutivo.prop('disabled', false);
            dFecEntrega.val("");
            horaEnt.val("");
            servicios_select.val("").trigger("change");
            estado.val("");
            idcCondicionPago.val('1').trigger("change");
            documento_or.val("");
            distrito_ver.val("");
            distrito_or.val("");
            idDocumentoCli.val("01").trigger("change");
            razonsocial_cliente_or.val("");
            documento_or.val("");
            contacto_or.val("");
            direccion_or.val("");
            correo_electronico_or.val("");
            id_tipoDoc_Venta_or.val("").trigger("change");
            celular_or.val("");
            telefono_or.val("");
            cliente_id_or.val("");
            placa.val("");
            marca.val("");
            modelo.val("");
            chasis.val("");
            anio_fabricacion.val("");
            color.val("");
            idMoneda.val("").trigger("change");
            idTecnico.val("").trigger("change");
            id_tipomant.val("").trigger("change");
            idAsesor.val("").trigger("change");
            idDocumentoCli.val("").trigger("change");
            gru_revisiones.val("").trigger("change");
            articulo_dd_det.html("");
            nKilometraje.val("");
            observaciones.val("");
            $("#comentario_facturacion").val("");
            mo_revision.val("");
            mo_mecanica.val("");
            terceros.val("");
            otros_mo.val("");
            subtotal_moa.val("");
            repuestos.val("");
            accesorios.val("");
            lubricantes.val("");
            otros_rep.val("");
            subtotal_mob.val("");
            total.val("");
            motor_add.val("");
            motor.val("");
            totalMO.val("");
            totalDescuento.val("").trigger("change");
        }
        function cleanCliente() {
            cleanRequired();
            titleModalClientes.html('');
            tipodoc.val('01').trigger("change");
            id_tipocli.val('').trigger("change");
            razonsocial_cliente.val('');
            documento.val('');
            contacto.val('');
            direccion.val('');
            correo_electronico.val('');
            id_tipoDoc_Venta.val('');
            celular.val('');
            telefono.val('');
            cliente_id.val('');
            departamento.val('');
            provincia.val('');
            distrito.val('');
            idsector.val('');
            provincia.html('');
            idsector.html('');
            distrito.html('');
        };
        $('#btn_cambio_delete').click(function (e) {
            EliminarServiciosDetalle();
        })


        function EliminarServiciosDetalle() {

            if (nConsecutivo.val() != "") {
                var id = cCodConsecutivo.val() + "_" + nConsecutivo.val();
                var id_revision_array = [];
                $.each($('.idDetalleGrup'), function (idx, item) {
                    id_revision_array[idx] = $(item).val();

                });
                id_revision_array = id_revision_array.join(',');

                var params = {
                    'id_revision_array': id_revision_array,
                };

                RESTService.updated('orden_servicios/deleteDetalle', id, params, function (response) {
                    if (!_.isUndefined(response.status) && response.status) {
                        var data = response.dato;
                        console.log(data);
                        if (data[0].Mensaje != '') {
                            AlertFactory.textType({
                                title: '',
                                message: data[0].Mensaje,
                                type: 'info'
                            });
                            idMoneda.val(idMoneda.data("prev")).trigger("change");
                            id_tipocli.val(id_tipocli.data("prev")).trigger("change");
                            modalDeleteDetalle.modal("hide");
                        } else {
                            console.log(response.data);
                            console.log(response.datad);
                            table_servicios.html("");
                            idMoneda.data("prev", idMoneda.val());
                            id_tipocli.data("prev", id_tipocli.val());
                            if (id_tipocli.val() != '') {
                                id_cliente_tipo_or.val(id_tipocli.val()).trigger("change");
                            }
                            modalDeleteDetalle.modal("hide");

                            clean_totale();
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
                        id_cliente_tipo_or.val(id_tipocli.val()).trigger("change");
                        idMoneda.data("prev", idMoneda.val());
                        id_tipocli.data("prev", id_tipocli.val());
                        modalDeleteDetalle.modal("hide");
                    }
                });
            } else {
                modalDeleteDetalle.modal("hide");
                table_servicios.html("");
                clean_totale();
                sumar_key();
            }
        }
        $scope.EliminarOrden = function () {
            var id = idOrdenDelete.val();
            console.log(id);
            RESTService.get('orden_servicios/delete', id, function (response) {
                if (!_.isUndefined(response.status) && response.status) {
                    var dta = response.data;
                    if (dta[0]['Mensaje'] != "") {
                        AlertFactory.textType({
                            title: '',
                            message: dta[0]['Mensaje'],
                            type: 'info'
                        });
                        modalDeleteOrden.modal("hide");
                    } else {
                        AlertFactory.textType({
                            title: '',
                            message: 'El registro se eliminó correctamente',
                            type: 'success'
                        });
                        modalDeleteOrden.modal("hide");
                        LoadRecordsButtonOrden_Servicio.click();
                    }



                }
            });
        }
        function cleanVehi() {
            cleanRequired();
            titleModalVehiculosTerceros.html('');
            idMarca_add.html('');
            idModelo_add.val('');
            idVehiculo_add.val('');
            n_chasis_add.val('');
            anio_fabricacion_add.val('');
            color_add.val('');
            placa_add.val('');
        };
        $scope.saveOrdenServicio = function () {
            var bval = true;
            bval = bval && cCodConsecutivo.required();
            bval = bval && idMoneda.required();
            bval = bval && idcCondicionPago.required();

            bval = bval && dFecRec.required();
            bval = bval && horaRec.required();
            bval = bval && idTipoVehi_add.required();
            bval = bval && id_tipo.required();
            bval = bval && id_tipomant.required();

            bval = bval && documento_or.required();
            bval = bval && placa.required();
            bval = bval && documento_or.required();
            bval = bval && idDocumentoCli.required();
            bval = bval && distrito_ver.required();
            bval = bval && id_tipoDoc_Venta_or.required();
            bval = bval && nKilometraje.required();
            bval = bval && placa.required();
            bval = bval && $("#marca").required();
            if (idDocumentoCli.val() == "01") {
                if (id_tipoDoc_Venta_or.val() == "01") {
                    AlertFactory.showWarning({
                        title: '',
                        message: 'El documento de venta no puede ser una factura'
                    });
                    return false;
                }
            }
            if ($("#articulo_dd_det").html() == '') {
                AlertFactory.showWarning({
                    title: '',
                    message: 'Debe agregar un mínimo de 1 en mantenimientos'
                });
                return false;
            }
            if ($("#table_servicios").html() == '') {
                AlertFactory.showWarning({
                    title: '',
                    message: 'Debe agregar un mínimo de 1 en servicios'
                });
                return false;
            }
            acodigos.forEach(function (val, index) {

                var canr = $('#tr_cant' + val);
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
                var id_mantenimiento_array = [];
                $.each($('.id_mantenimiento_group'), function (idx, item) {
                    id_mantenimiento_array[idx] = $(item).val();
                });
                id_mantenimiento_array = id_mantenimiento_array.join(',');



                var id_revision_array = [];
                $.each($('.idRevision_select'), function (idx, item) {
                    id_revision_array[idx] = $(item).val();
                });
                id_revision_array = id_revision_array.join(',');

                var cantidDeta = [];
                $.each($('.cantOrde '), function (idx, item) {
                    cantidDeta[idx] = $(item).val();
                });
                cantidDeta = cantidDeta.join(',');

                var idDescuenDeta = [];
                $.each($('.descuentosSelect'), function (idx, item) {

                    var valo = $(item).val();
                    var arrayRe = valo.split("*");
                    var coded = arrayRe[0];
                    idDescuenDeta[idx] = coded
                });

                idDescuenDeta = idDescuenDeta.join(',');

                var id_tipo_array = [];
                $.each($('.idTipo_select'), function (idx, item) {
                    id_tipo_array[idx] = $(item).val();
                });
                id_tipo_array = id_tipo_array.join(',');

                var precio_array = [];
                $.each($('.precio_m'), function (idx, item) {
                    precio_array[idx] = $(item).val();
                });
                precio_array = precio_array.join(',');

                var modo_array_mant = [];
                $.each($('.modo_mant'), function (idx, item) {
                    modo_array_mant[idx] = $(item).val();
                });
                modo_array_mant = modo_array_mant.join(',');

                var modo_array_serv = [];
                $.each($('.modo_serDet'), function (idx, item) {
                    modo_array_serv[idx] = $(item).val();
                });
                modo_array_serv = modo_array_serv.join(',');

                var montoDeta = [];
                $.each($('.monto'), function (idx, item) {

                    var montod = $(item).val();
                    if (montod == "") {
                        montod = 0;
                    }
                    montoDeta[idx] = montod;
                });
                montoDeta = montoDeta.join(',');
                console.log(montoDeta);
                console.log("monto deta");
                var porDeta = [];
                $.each($('.porcent'), function (idx, item) {

                    var porcen = $(item).val();
                    if (porcen == "") {
                        porcen = 0;
                    }
                    porDeta[idx] = porcen;
                });
                porDeta = porDeta.join(',');

                var impuesto_servicio = [];
                $.each($('.totalImpuesto_servicio'), function (idx, item) {
                    impuesto_servicio[idx] = $(item).val();
                });
                impuesto_servicio = impuesto_servicio.join(',');


                var operacionGra = [];
                $.each($('.subtotal_repuesto '), function (idx, item) {
                    operacionGra[idx] = $(item).val();
                });
                operacionGra = operacionGra.join(',');

                var staOperacion = [];
                $.each($('.checkClass'), function (idx, item) {
                    var checkOpera = ($(this).prop('checked')) ? 'S' : 'N';
                    staOperacion[idx] = checkOpera;
                });
                console.log(staOperacion);
                console.log("operaciongrat");
                staOperacion = staOperacion.join(',');

                var idDetalleGrup = [];
                $.each($('.idDetalleGrup'), function (idx, item) {
                    idDetalleGrup[idx] = $(item).val();
                });
                idDetalleGrup = idDetalleGrup.join(',');


                var totalConse = cCodConsecutivo.val();
                var arrayConEn = totalConse.split("*");
                var con = $("#nConsecutivo").val();
                if ($("#nConsecutivo").val() == "") {
                    con = 0;
                };

                var val = totalDescuento.val();
                var arrayRe = val.split("*");
                var coded = arrayRe[0];
                var porcd = arrayRe[1];
                var montd = arrayRe[2];
                console.log(coded, porcd, montd);
                var porcenTotal = porcentajeTotal.val();
                if (porcenTotal == "") {
                    porcenTotal = 0;
                }
                var montoTotals = montoTotal.val();
                if (montoTotals == "") {
                    montoTotals = 0;
                }
                var params = {
                    'cCodConsecutivo': arrayConEn[0],
                    'nConsecutivo': con,
                    'id_tipo': id_tipo.val(),
                    'id_tipomant': id_tipomant.val(),
                    'IdMoneda': idMoneda.val(),
                    'dFecRec': dFecRec.val(),
                    'horaRec': horaRec.val(),
                    'dFecEntrega': dFecEntrega.val(),
                    'nIdDscto': coded,
                    'nPorcDescuento': porcenTotal,
                    'nDescuento': montoTotals,
                    'nOperGratuita': total.val(),
                    'horaEnt': horaEnt.val(),
                    'id_tipoveh': idTipoVehi_add.val(),
                    'cPlacaVeh': placa.val(),
                    'cMotor': motor.val(),
                    'cChasis': chasis.val(),
                    'iAnioFab': anio_fabricacion.val(),
                    'cColor': color.val(),
                    'nKilometraje': nKilometraje.val(),
                    'idCliente': cliente_id_or.val(),
                    'idTecnico': idTecnico.val(),
                    'idAsesor': idAsesor.val(),
                    'idcCondicionPago': idcCondicionPago.val(),
                    'cObservaciones': observaciones.val(),
                    'comentario_facturacion': $("#comentario_facturacion").val(),
                    'id_tipoDoc_Venta_or': id_tipoDoc_Venta_or.val(),
                    'mo_revision': mo_revision.val(),

                    'mo_mecanica': mo_mecanica.val(),
                    'terceros': terceros.val(),
                    'otros_mo': otros_mo.val(),
                    'respuestos': repuestos.val(),
                    'accesorios': accesorios.val(),
                    'impuesto_servicio': impuesto_servicio,
                    'lubricantes': lubricantes.val(),
                    'otros_rep': otros_rep.val(),
                    'total': desTotal.val(),
                    'id_mantenimiento_array': id_mantenimiento_array,
                    'id_revision_array': id_revision_array,
                    'idDetalleGrup': idDetalleGrup,
                    'id_tipo_array': id_tipo_array,
                    'precio_array': precio_array,

                    'modo_array_mant': modo_array_mant,
                    'modo_array_serv': modo_array_serv,
                    'cantidDeta': cantidDeta,
                    'idDescuenDeta': idDescuenDeta,
                    'montoDeta': montoDeta,
                    'porDeta': porDeta,
                    'operacionGra': operacionGra,
                    'staOperacion': staOperacion,



                };

                console.log(idDetalleGrup);
                console.log(operacionGra);
                console.log(porDeta);

                var id = (idOrden.val() === '') ? 0 : idOrden.val();
                RESTService.updated('orden_servicios/createOrden', id, params, function (response) {
                    if (!_.isUndefined(response.status) && response.status) {
                        var data_p = response.res;

                        if (Number(data_p[0].Mensaje)) {
                            $("#nConsecutivo").val(data_p[0].Mensaje);
                            estado.val("0");
                            // btn_guardarOrden.prop('disabled',true); 

                            cCodConsecutivo.prop('disabled', true);
                            AlertFactory.textType({
                                title: '',
                                message: 'La orden se registró correctamente.',
                                type: 'success'
                            });
                            if (estado.val() != '') {
                                if (estado.val() == 0 || estado.val() == 1) {
                                    btn_ejecucion.prop('disabled', false);
                                };
                                if (estado.val() == 1 || estado.val() == 2) {
                                    btn_cancelar.prop('disabled', false);
                                };
                                if (estado.val() == 2) {
                                    btn_terminada.prop('disabled', false);
                                };
                            }
                            llenarTablas(data_p[0].Mensaje);
                            LoadRecordsButtonOrden_Servicio.click();
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
        //          function getSunat() 
        // {
        //   $("#contenedor").slideDown(0);
        //   var dni='71980490';  


        //   // const url="https://dniruc.apisperu.com/api/v1/dni/71980490?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6InJleXNhbmdhbWE3QGdtYWlsLmNvbSJ9.hfobQC8FM5IyKKSaa7usUXV0aY1Y8YthAhdN8LoMlMM";
        //   // fetch(url)
        //   // .then(response=>response.json())
        //   // .then(data =>{
        //   //   console.log(data.razonSocial);

        //   // })


        // }
        function llenarTablas(Consecutivo) {
            var id = cCodConsecutivo.val() + '_' + Consecutivo;
            RESTService.get('orden_servicios/find', id, function (response) {
                if (!_.isUndefined(response.status) && response.status) {
                    // console.log("entro");
                    articulo_dd_det.html("");
                    table_servicios.html("");
                    var data = response.data;
                    //   console.log("borro");
                    var data_matenimiento = response.data_matenimiento;
                    _.each(data_matenimiento, function (b) {
                        var vto = b.idMantenimiento + '*' + b.nombre;
                        var modo_m = 1;
                        addMante(vto, modo_m);
                    });

                    var data_detalle = response.data_detalle;
                    console.log(data_detalle);
                    _.each(data_detalle, function (b) {
                        var vto = b.idProducto + '*' + b.description + '*' + b.nPrecioUnitario + '*' + b.impuesto;

                        var tipoTo = b.totaltipo;
                        var tipoText = b.descripcioText;
                        var modo_servi = 1;
                        var idte = b.idDetalleSer;
                        var cant = b.nCant;
                        var opera = b.cOperGrat;
                        var porcen = Number(b.nPorcDescuento);

                        var monto = Number(b.nDescuento);
                        if (porcen > 0) {
                            monto = 0;
                        };
                        var idDescuento = "";
                        if (b.nIdDscto != 0) {
                            idDescuento = b.nIdDscto + "*" + porcen + '*' + monto;
                        }

                        addServicios(vto, tipoTo, tipoText, modo_servi, idte, cant, opera, idDescuento, b.nImpuesto, Number(b.nPorcDescuento), Number(b.nDescuento));
                        //  function addServicios(vto,tipoTo,tipoText,modo_ser,iddet)
                    });


                    // _.each(data_detalle, function (b) {
                    //     var vto=b.idProducto;
                    //      var idDescuento=b.nIdDscto+"*"+porcen+'*'+monto;
                    //      $("#id_desc_"+vto).val(idDescuento).trigger("change");

                    // });



                    // gru_revisiones
                    // idTecnico
                    // idAsesor
                    // horaEnt
                    // nKilometraje
                    // if(data[0].iEstado!='0'){
                    //       btn_guardarOrden.prop('disabled',true); 
                    // }
                    // id_tipocli.data("prev",id_cliente_tipo_or.val());
                    // idMoneda.data("prev",idMoneda.val());
                    // if(estado.val()!=''){
                    //     if(estado.val()==0 || estado.val()==1){
                    //         btn_ejecucion.prop('disabled',false);
                    //     };
                    //     if(estado.val()==1 || estado.val()==2){
                    //         btn_cancelar.prop('disabled',false);
                    //     };
                    //     if(estado.val()==2){
                    //         btn_terminada.prop('disabled',false);
                    //     };
                    // }
                    var destotal = "";
                    if (data[0].nIdDscto != 0) {
                        var porcen = Number(data[0].porDes);
                        var monto = Number(data[0].montoDes);
                        destotal = data[0].nIdDscto + "*" + porcen + '*' + monto;
                    }
                    totalDescuento.val(destotal).trigger("change");
                    // modalOrdenServivio.modal("show");
                } else {
                    AlertFactory.textType({
                        title: '',
                        message: 'Hubo un error al obtener el Artículo. Intente nuevamente.',
                        type: 'error'
                    });
                }
            });
        }
        documento.keypress(function (e) {
            var code = (e.keyCode ? e.keyCode : e.which);
            if (code == 13) {
                $('#show_loading').removeClass('ng-hide');
                var documentoEnvio = documento.val();

                RESTService.get('orden_servicios/get_cliente_persona', documentoEnvio, function (response) {
                    if (!_.isUndefined(response.status) && response.status) {
                        var dataPersona = response.data;
                        console.log("entro 1111111111111");
                        if (dataPersona.length == 0) {
                            console.log("no hay en persona");
                            getDatosCliente();
                        } else {
                            console.log(dataPersona);
                            console.log("si hay ");
                            tipodoc.val(dataPersona[0].cTipodocumento).trigger('change');
                            var nclie = dataPersona[0].cRazonsocial;
                            if (nclie.length == 0) {
                                razonsocial_cliente.val(dataPersona[0].cNombrePersona);
                            } else {
                                razonsocial_cliente.val(dataPersona[0].cRazonsocial);
                            }

                            documento.val(dataPersona[0].cNumerodocumento);
                            // contacto.val(dataPersona[0].contacto);
                            direccion.val(dataPersona[0].cDireccion);
                            correo_electronico.val(dataPersona[0].cEmail);
                            celular.val(dataPersona[0].cCelular);

                            cEstadoCivil.val(dataPersona[0].cEstadoCivil);

                            getDepartamento(dataPersona[0].cDepartamento);
                            getProvincia(dataPersona[0].cProvincia, dataPersona[0].cDepartamento);
                            getDistrito(dataPersona[0].cCodUbigeo, dataPersona[0].cProvincia);
                            getSector("xxxxxx", dataPersona[0].cCodUbigeo);

                            
                            $("#cNombres_c").val(dataPersona[0].cNombres);
                            $("#cApepat_c").val(dataPersona[0].cApepat);
                            $("#cApemat_c").val(dataPersona[0].cApemat);
                        }


                    } else {
                        AlertFactory.textType({
                            title: '',
                            message: 'Hubo un error . Intente nuevamente.',
                            type: 'info'
                        });
                    }
                });

            }
        });
        function getDatosCliente() {
            // RESTService.get("https://dniruc.apisperu.com/api/v1/dni/71980490?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6InJleXNhbmdhbWE3QGdtYWlsLmNvbSJ9.hfobQC8FM5IyKKSaa7usUXV0aY1Y8YthAhdN8LoMlMM", '', function(response) {
            //            console.log(response);
            //          });
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                // Si nada da error
                if (this.readyState == 4 && this.status == 200) {
                    // La respuesta, aunque sea JSON, viene en formato texto, por lo que tendremos que hace run parse
                    var data = JSON.parse(this.responseText);
                    console.log(data);
                    if (data.nombres != null) {
                        var razon = data.nombres + ' ' + data.apellidoPaterno + ' ' + data.apellidoMaterno;
                        razonsocial_cliente.val(razon);
                        $("#cNombres_c").val(data.nombres);
                        $("#cApepat_c").val(data.apellidoPaterno);
                        $("#cApemat_c").val(data.apellidoMaterno);
                    } else if (data.razonSocial != null) {
                        var razon = data.razonSocial;
                        var direc = data.direccion;
                        razonsocial_cliente.val(razon);
                        direccion.val(direc);
                    } else {
                        razonsocial_cliente.val('');
                        direccion.val('');
                        AlertFactory.textType({
                            title: '',
                            message: 'No se encontró datos del cliente',
                            type: 'info'
                        });
                        $('#show_loading').addClass('ng-hide');
                    };
                    $('#show_loading').addClass('ng-hide');
                }
            };
            if (tipodoc.val() == '01') {
                if (documento.val().length == 8) {
                    var dni = documento.val();
                    xhttp.open("GET", "https://dniruc.apisperu.com/api/v1/dni/" + dni + "?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6InJleXNhbmdhbWE3QGdtYWlsLmNvbSJ9.hfobQC8FM5IyKKSaa7usUXV0aY1Y8YthAhdN8LoMlMM", true);
                    xhttp.setRequestHeader("Content-type", "application/json");
                    xhttp.send();
                } else {
                    AlertFactory.textType({
                        title: '',
                        message: 'dígitos del documento incompletos',
                        type: 'info'
                    });
                    razonsocial_cliente.val('');
                    direccion.val('');
                    $('#show_loading').addClass('ng-hide');
                }


            } else {
                if (documento.val().length == 11) {
                    var ruc = documento.val();
                    xhttp.open("GET", "https://dniruc.apisperu.com/api/v1/ruc/" + ruc + "?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6InJleXNhbmdhbWE3QGdtYWlsLmNvbSJ9.hfobQC8FM5IyKKSaa7usUXV0aY1Y8YthAhdN8LoMlMM", true);
                    xhttp.setRequestHeader("Content-type", "application/json");
                    xhttp.send();
                } else {
                    AlertFactory.textType({
                        title: '',
                        message: 'dígitos del documento incompletos',
                        type: 'info'
                    });
                    razonsocial_cliente.val('');
                    direccion.val('');
                    $('#show_loading').addClass('ng-hide');

                }

            }

        }

        // getSunat();

        $scope.saveVehiculos = function () {
            var bval = true;
            bval = bval && idMarca_add.required();
            bval = bval && idModelo_add.required();
            bval = bval && n_chasis_add.required();
            bval = bval && anio_fabricacion_add.required();
            bval = bval && color_add.required();
            bval = bval && placa_add.required();
            bval = bval && motor_add.required();
            if (bval) {
                var params = {
                    'idMarca': idMarca_add.val(),
                    'idModelo': idModelo_add.val(),
                    'motor': motor_add.val(),
                    'n_chasis': n_chasis_add.val(),
                    'anio_fabricacion': anio_fabricacion_add.val(),
                    'color': color_add.val(),
                    'placa': placa_add.val(),
                };

                var id = 0;

                RESTService.updated('orden_servicios/createVehiOrden', id, params, function (response) {
                    if (!_.isUndefined(response.status) && response.status) {
                        placa.val(placa_add.val());
                        getPlaca();
                        modaVehiculosTerceros.modal('hide');
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
        btn_save_cliente.click(function (e) {
            saveCliente();
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
                    RESTService.get('orden_servicios/get_precios_list', id, function (response) {
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
        function saveCliente() {
            var bval = true;
            bval = bval && tipodoc.required();
            bval = bval && documento.required();
            bval = bval && id_tipocli.required();
            bval = bval && id_tipoDoc_Venta.required();
            bval = bval && razonsocial_cliente.required();
            bval = bval && celular.required();
            bval = bval && distrito.required();
            // bval = bval && idsector.required();
            if (tipodoc.val() == '01') {
                $("#cApepat_c").required();   
                $("#cApemat_c").required();   
                $("#cNombres_c").required();   
            }
            if (tipodoc.val() == '01' && documento.val().length != 8) {
                AlertFactory.textType({
                    title: '',
                    message: 'Longitud de LE/DNI INCORRECTA',
                    type: 'info'
                });
                bval = false;
            };
            if (tipodoc.val() == '06' && documento.val().length != 11) {
                AlertFactory.textType({
                    title: '',
                    message: 'Longitud de RUC INCORRECTA',
                    type: 'info'
                });
                bval = false;
            };

            if (bval) {
                var params = {
                    'tipodoc': tipodoc.val(),
                    'razonsocial_cliente': razonsocial_cliente.val(),
                    'documento': documento.val(),
                    'contacto': contacto.val(),
                    'direccion': direccion.val(),
                    'correo_electronico': correo_electronico.val(),
                    'celular': celular.val(),
                    'telefono': telefono.val(),
                    'distrito': distrito.val(),
                    'id_tipocli': id_tipocli.val(),
                    'IdTipoDocumento': id_tipoDoc_Venta.val(),
                    'cEstadoCivil': cEstadoCivil.val(),
                    'idsector': idsector.val(),
                    'cNombres':$("#cNombres_c").val(),
                    'cApepat':$("#cApepat_c").val(),
                    'cApemat':$("#cApemat_c").val(),
                    'dFechanacimiento':$("#dFechanacimiento").val(),

                };
                var cli_id = (cliente_id.val() === '') ? 0 : cliente_id.val();
                RESTService.updated('orden_servicios/createClienteOrden', cli_id, params, function (response) {
                    if (!_.isUndefined(response.status) && response.status) {
                        documento_or.val(documento.val());
                        getCliente();
                        AlertFactory.textType({
                            title: '',
                            message: 'El Cliente se actualizó correctamente',
                            type: 'success'
                        });
                        modaClientes.modal('hide');
                        id_tipoDoc_Venta_or.focus();
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

        };

        function getDataFormCustomer() {
            RESTService.all('orden_servicios/data_formCliOrden', '', function (response) {
                if (!_.isUndefined(response.status) && response.status) {
                    var tip = response.tipoc_doc;
                    var tipo_clie = response.tipo_clie;
                    tip.map(function (index) {
                        tipodoc.append('<option value="' + index.Codigo + '">' + index.TipoDocumento + '</option>');
                    });

                    id_tipocli.append('<option value="">Seleccionar</option>');
                    tipo_clie.map(function (index) {
                        id_tipocli.append('<option value="' + index.id + '">' + index.descripcion + '</option>');
                    });

                    id_cliente_tipo_or.append('<option value="">Seleccionar</option>');
                    tipo_clie.map(function (index) {
                        id_cliente_tipo_or.append('<option value="' + index.id + '">' + index.descripcion + '</option>');
                    });
                }
            }, function () {
                getDataFormCustomer();
            });
        }
        getDataFormCustomer();

        function getDataFormOrden() {
            var id = 0;
            RESTService.get('orden_servicios/get_Placa', id, function (response) {
                if (!_.isUndefined(response.status) && response.status) {
                    idTipoVehi_add.append('<option value="" selected>Seleccionar</option>');
                    _.each(response.tipo_ve, function (item) {
                        idTipoVehi_add.append('<option value="' + item.id + '" >' + item.descripcion + '</option>');
                    });
                } else {
                    AlertFactory.textType({
                        title: '',
                        message: 'Hubo un error . Intente nuevamente.',
                        type: 'info'
                    });
                }
            });
        }
        getDataFormOrden();

        var tipos_doc_venta = [];

        function getDataForOrdenServicio() {
            RESTService.all('orden_servicios/data_form', '', function (response) {
                if (!_.isUndefined(response.status) && response.status) {

                    descuentos = response.descuentos;
                    redondeo = response.dataredondeo;
                    decimales_redondeo = response.decimales_redondeo;

                    console.log("redondeo");
                    console.log(redondeo);

                    $("#idmarca").append('<option value="" selected>Seleccionar</option>');
                    _.each(response.marca, function (item) {
                        $("#idmarca").append('<option value="' + item.Value + '">' + item.DisplayText + '</option>');
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

                    cCodConsecutivo.append('<option value="">Seleccionar</option>');
                    _.each(response.codigo, function (item) {
                        cCodConsecutivo.append('<option value="' + item.cCodConsecutivo + '">' + item.cCodConsecutivo + '</option>');
                    });
                    // cCodConsecutivo.append('<option value="'+item.cCodConsecutivo+'*'+item.nConsecutivo+'">'+item.cCodConsecutivo+'</option>');
                    idcCondicionPago.append('<option value="">Seleccionar</option>');
                    _.each(response.condicion_pago, function (item) {
                        if (item.id == 1) {
                            idcCondicionPago.append('<option value="' + item.id + '" selected>' + item.description + '</option>');
                        } else {
                            idcCondicionPago.append('<option value="' + item.id + '">' + item.description + '</option>');
                        }

                    });
                    _.each(response.tipo_servicio, function (item) {
                        id_tipo.append('<option value="' + item.id + '">' + item.descripcion + '</option>');
                    });
                    idDocumentoCli.append('<option value="">Seleccionar</option>');
                    _.each(response.tipo_document, function (item) {
                        idDocumentoCli.append('<option value="' + item.Codigo + '">' + item.TipoDocumento + '</option>');
                    });
                    id_tipoDoc_Venta_or.append('<option value="">Seleccionar</option>');
                    _.each(response.tipo_document_venta, function (item) {
                        id_tipoDoc_Venta_or.append('<option value="' + item.IdTipoDocumento + '">' + item.Descripcion + '</option>');
                    });
                    id_tipoDoc_Venta.append('<option value="">Seleccionar</option>');
                    _.each(response.tipo_document_venta, function (item) {
                        id_tipoDoc_Venta.append('<option value="' + item.IdTipoDocumento + '">' + item.Descripcion + '</option>');
                    });
                    gru_revisiones.append('<option value="" selected>Seleccionar </option>');
                    _.each(response.revisiones, function (item) {
                        gru_revisiones.append('<option value="' + item.id + '*' + item.nombre + '*' + item.mo_revision + '*' + item.mo_mecanica + '*' + item.terceros + '*' + item.otros_mo + '*' + item.repuestos + '*' + item.accesorios + '*' + item.lubricantes + '*' + item.otros_rep + '">' + item.nombre + '</option>');
                    });
                    idTecnico.append('<option value="">Seleccionar</option>');
                    _.each(response.tecnico, function (item) {
                        idTecnico.append('<option value="' + item.id + '">' + item.descripcion + '</option>');
                    });
                    idAsesor.append('<option value="">Seleccionar</option>');
                    _.each(response.asesor, function (item) {
                        idAsesor.append('<option value="' + item.id + '">' + item.descripcion + '</option>');
                    });
                    id_tipomant.append('<option value="">Seleccionar</option>');
                    _.each(response.tipoMantenimiento, function (item) {
                        id_tipomant.append('<option value="' + item.id + '">' + item.descripcion + '</option>');
                    });
                    //     servicios_select.append('<option value="" selected>Seleccionar </option>');
                    //    _.each(response.servicios, function(item) {
                    //     servicios_select.append('<option value="'+item.idProducto+'*'+item.producto+'*'+item.precio+'">'+item.producto+'</option>');
                    // });
                    servicios = response.servicios_todos;
                    servicios_select.html('');
                    servicios_select.append('<option value="" selected>Seleccionar </option>');
                    _.each(response.servicios_todos, function (item) {
                        servicios_select.append('<option  data-categoria="' + item.idCategoria + '" value="' + item.id + '">' + item.code_article + ' ' + item.description + '</option>');
                    });
                    idMoneda.append('<option value="">Seleccionar</option>');
                    _.each(response.moneda, function (item) {
                        idMoneda.append('<option value="' + item.IdMoneda + '">' + item.Descripcion + '</option>');
                    });
                    totales = response.totales;
                    tipo_totales_slec.append('<option value="">Tipo</option>');
                    _.each(response.totales, function (item) {
                        tipo_totales_slec.append('<option value="' + item.id + '">' + item.descripcion + '</option>');
                    });
                    // totalDescuento.append('<option value="">Seleccionar</option>');
                    descuentosTotales = response.descuentos;

                    tipos_doc_venta = response.tipo_document_venta;
                }
            }, function () {
                getDataForOrdenServicio();
            });
        }
        getDataForOrdenServicio();

        $(document).on("change", "#tipodoc", function (e) {
            e.preventDefault();
            $("#cNombres_c").val("");
            $("#cApepat_c").val("");
            $("#cApemat_c").val("");
            var valor = $(this).val();
            id_tipoDoc_Venta.html("");
            id_tipoDoc_Venta.append('<option value="">Seleccionar</option>');
            // console.log(tipos_doc_venta);
            if(valor == '06') {
                tipos_doc_venta.map(function (index) {
                    if(index.IdTipoDocumento == "01") {
                        id_tipoDoc_Venta.append('<option value="' + index.IdTipoDocumento + '">' + index.Descripcion + '</option>');
                    }
                });
            } else {
                tipos_doc_venta.map(function (index) {
                    id_tipoDoc_Venta.append('<option value="' + index.IdTipoDocumento + '">' + index.Descripcion + '</option>');
                });
            }
            if(valor != '06') {
                $(".persona_natural").show();

            } else {
                $(".persona_natural").hide();
            }
        });

        var search = getFormSearch('frm-search-Orden_Servicio', 'search_b', 'LoadRecordsButtonOrden_Servicio');

        var table_container_Orden_Servicio = $("#table_container_Orden_Servicio");

        table_container_Orden_Servicio.jtable({
            title: "Lista de Ordenes de Servicios",
            paging: true,
            sorting: true,
            actions: {
                listAction: base_url + '/orden_servicios/list',
            },
            messages: {
                addNewRecord: 'Nuevo Orden de Servicio',
                editRecord: 'Editar Orden de Servicio',
            },
            toolbar: {
                items: [{
                    cssClass: 'buscador',
                    text: search
                }, {
                    cssClass: 'btn-primary',
                    text: '<i class="fa fa-file-excel-o"></i> Exportar a Excel',
                    click: function () {
                        $scope.openDoc('orden_servicios/excel', {});
                    }
                }, {
                    cssClass: 'btn-danger-admin',
                    text: '<i class="fa fa-plus"></i> Nuevo Orden de Servicio',
                    click: function () {
                        newOrdenServicio();
                    }
                }]
            },
            fields: {
                cCodConsecutivo: {
                    title: 'Código',
                    key: true,
                    create: false,
                    edit: false,
                    list: true
                },
                nConsecutivo: {
                    title: 'Consecutivo',
                },
                dFecRec: {
                    title: 'Fecha Registro',
                    width: '20%',
                    sorting: false,
                    display: function (data) {
                        return moment(data.record.dFecRec).format('DD/MM/YYYY');
                    }

                },
                // idCliente: {
                //     title: 'Cliente',
                //     options: base_url + '/orden_servicios/getCliente',
                // },
                cliente: {
                    title: 'Cliente',
                  
                },
                iEstado: {
                    title: 'Estado',
                    options: { 0: 'Registrado', 1: 'Con Proforma', 2: 'En ejecución', 3: 'Terminada', 4: 'Cancelada' },

                },

                cPlacaVeh: {
                    title: 'Placa',
                    values: { 'I': 'Inactivo', 'A': 'Activo' },


                }, edit: {
                    width: '1%',
                    sorting: false,
                    edit: false,
                    create: false,
                    listClass: 'text-center',
                    display: function (data) {
                        return '<a href="javascript:void(0)" class="edit-orden" data-id="' + data.record.cCodConsecutivo
                            + '_' + data.record.nConsecutivo + '" title="Editar"><i class="fa fa-edit fa-1-5x"></i></a>';
                    }

                }, Eliminar: {
                    width: '1%',
                    sorting: false,
                    edit: false,
                    create: false,
                    listClass: 'text-center',
                    display: function (data) {
                        return '<a data-target="#"  data-ide="' + data.record.cCodConsecutivo + '_' + data.record.nConsecutivo + '"   title="Eliminar" class="jtable-command-button eliminar-Orden"><i class="fa fa-trash fa-1-5x fa-red"><span>Eliminar</span></i></a>';
                    }

                }
            },
            recordsLoaded: function (event, data) {
                $('.edit-orden').click(function (e) {
                    var id = $(this).attr('data-id');
                    findRegister_Orden(id);
                    e.preventDefault();
                });
                $('.eliminar-Orden').click(function (e) {
                    var ide = $(this).attr('data-ide');
                    idOrdenDelete.val(ide);
                    modalDeleteOrden.modal("show");
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
                    };
                });
            },
            formSubmitting: function (event, data) {
                var bval = true;
                bval = bval && data.form.find('input[name="Categoria"]').required();
                return bval;
            }
        });

        generateSearchForm('frm-search-Orden_Servicio', 'LoadRecordsButtonOrden_Servicio', function () {
            table_container_Orden_Servicio.jtable('load', {
                search: $('#search_b').val()
            });
        }, true);


        $(document).on("click", "#btn_buscar_vehiculo", function (event) {
            $("#modal-vehiculos").modal("show");
        });

        var search_SerieVehTer = getFormSearch('frm-search-SerieVehTer', 'search_SerieVehTer', 'LoadRecordsButtonSerieVehTer');

        var table_container_SerieVehTer = $("#table_container_SerieVehTer");

        table_container_SerieVehTer.jtable({
            title: "Lista de Vehiculos",
            paging: true,
            sorting: true,
            actions: {
                listAction: base_url + '/orden_servicios/list_vehiculos',
            },
            toolbar: {
                items: [{
                    cssClass: 'buscador',
                    text: search_SerieVehTer
                }]
            },
            fields: {
                serie: {
                    title: 'Serie',
                },
                chasis: {
                    title: 'Chasis',
                },
                motor: {
                    title: 'Motor',
                },
                color: {
                    title: 'Color',
                },
                aniofabriacion: {
                    title: 'Año Fabricación',
                },
                placa: {
                    title: 'Placa',
                },
                marca: {
                    title: 'Marca',
                },
                modelo: {
                    title: 'Modelo',
                },
                agregar: {
                    width: '1%',
                    sorting: false,
                    edit: false,
                    create: false,
                    listClass: 'text-center',
                    display: function (data) {
                        return '<a href="javascript:void(0)" class="agregar-vehiculo" data-placa="' + data.record.placa +  '" data-id="' + data.record.ID  +  '"  data-Tabla="' + data.record.Tabla  +  '" title="Agregar"><i class="fa fa-plus fa-1-5x"></i></a>';
                    }

                }
            },
            recordsLoaded: function (event, data) {
                $('.agregar-vehiculo').click(function (e) {
                    // var placa = $(this).attr('data-placa');
                   
                    // $("#placa").val(placa);
                    // getPlaca();

                    var id = $(this).attr('data-id');
                    var tabla = $(this).attr('data-tabla');
                    
                    if(tabla == "ERP_VehTerceros") {
                        $("#tipo_articulo").val("terceros");
                    }
                    if(tabla == "ERP_Serie") {
                        $("#tipo_articulo").val("series");
                    }
                    // alert(id);
                    $("#id_").val(id);
                    getVehiculo();

                    $("#modal-vehiculos").modal("hide");
                    e.preventDefault();
                });
               
            },

            formCreated: function (event, data) {
              
            },
            formSubmitting: function (event, data) {
              
            }
        });

        generateSearchForm('frm-search-SerieVehTer', 'LoadRecordsButtonSerieVehTer', function () {
            table_container_SerieVehTer.jtable('load', {
                search: $('#search_SerieVehTer').val()
            });
        }, true);
    }

    function Config($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('orden_servicios', {
                url: '/orden_servicios',
                templateUrl: base_url + '/templates/orden_servicios/base.html',
                controller: 'Orden_ServicioCtrl'
            });

        $urlRouterProvider.otherwise('/');
    }
})
    ();