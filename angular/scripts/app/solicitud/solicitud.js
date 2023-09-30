(function () {
    'use strict';
    angular.module('sys.app.solicitud')
        .config(Config)
        .controller('SolicitudCtrl', SolicitudCtrl);

    Config.$inject = ['$stateProvider', '$urlRouterProvider'];
    SolicitudCtrl.$inject = ['$scope', '_', 'RESTService', 'AlertFactory', 'Helpers'];

    function SolicitudCtrl($scope, _, RESTService, AlertFactory, Helpers)
    {
        moment.locale('es');

        var start_sol = moment().subtract(6, 'days');
        var end_sol = moment();

        var chk_date_range_sol = $('#chk_date_range_sol');
        chk_date_range_sol.click(function () {
            $('#LoadRecordsButtonSolicitud').click();
        });
        generateCheckBox('#chk_date_range_sol');

        var solDates = $('#solDates');

        var showDateSol = function (from, to) {
            start_sol = from;
            end_sol = to;
            solDates.find('span').html(from.format('MMM D, YYYY') + ' - ' + to.format('MMM D, YYYY'));
            if (chk_date_range_sol.prop('checked')) {
                $('#LoadRecordsButtonSolicitud').click();
            }
        };
        generateDateRangePicker(solDates, start_sol, end_sol, showDateSol);
        showDateSol(start_sol, end_sol);

        var modalSolicitud = $('#modalSolicitud');
        var titlemodalSolicitud = $('#titleModalSolicitud');
        var redondeo;
        var decimales_redondeo;
        var idsector=$("#idsector");
        var cambCan;
        var cambioChe;
        var cambioDes;
        var acodigos = [];
        var totalMO = $("#totalMO");
        var totales;
        var btn_imprimir = $(".btn_imprimir");
        var igv;
        var desTotal = $("#desTotal");
        var descuentos;
        var servicios;
        var porcentajeTotal = $("#porcentajeTotal");
        // var t_monto_descuento = $("#t_monto_descuento");
        var valor_moneda;
        var btn_save_cliente = $("#btn_save_cliente");
        var id_tipoDoc_Venta_solicitud = $("#id_tipoDoc_Venta_solicitud");
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
        var id_tipoDoc_Venta_or_solicitud = $("#id_tipoDoc_Venta_or_solicitud");
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
        var idsector_ver=$("#idsector_ver");

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
        var idconvenio = $("#idconvenio");
        var idvendedor = $("#idvendedor");

        var AlmacenesSele;//variable para guardar almacenes
        var LotesSele;//variable para guardar lotes
        var DescuentosSele;//variable para guardar los decuentos
        var LocalizacionesSele;//variable para guardar localizaciones del almacen



        function newSolicitud() {
            $(".imprimir-cronograma").hide();
            $(".cancelar-solicitud").hide();
            // var hoy = new Date();
            // var hAnio=hoy.getFullYear();
            // var hmes=hoy.getMonth()+1;
            // if(Number(hmes)<10){
            //     hmes='0'+String(hmes);
            // }

            // var hdia=hoy.getDate();
            // if(Number(hdia)<10){
            //     hdia='0'+String(hdia);
            // }
            // var hora = hoy.getHours();
            // if(Number(hora)<10){
            //     hora='0'+String(hora);
            // }
            // var minutos= hoy.getMinutes();
            // if(Number(minutos)<10){
            //     minutos='0'+String(minutos);
            // }
            // var actu=hAnio+'-'+hmes+'-'+hdia;
            // var hora_ac=hora+':'+minutos;
            // dFecRec.val(actu);
            // horaRec.val(hora_ac);
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
            modalSolicitud.modal('show');
            titlemodalSolicitud.html('Nueva Solicitud');
            $(".imprimir-solicitud").hide();
            $(".imprimir-clausula-solicitud").hide();
            habilitar_inputs();
            $(".enviar_solicitud").hide();
            $(".aprobaciones").hide();
            $(".separaciones").hide();
            $(".copiar-solicitud").hide();
            $("#articulo_mov_det").html("");
            $("#formulario-solicitud").trigger("reset");
            $("#formulario-creditos").trigger("reset");
            $("#formulario-persona").trigger("reset");
            $("#formulario-solicitud").find("input[type=hidden]").val("");
            $("#formulario-creditos").find("input[type=hidden]").val("");
            $("#formulario-persona").find("input[type=hidden]").val("");


            $("#comentario_facturacion").attr("readonly", "readonly");
            $("#tipo_sol").val("N");
            $("#idconvenio").attr("idconvenio", "");
        }

        var tipos_doc_venta = [];
        function obtener_data_for_solicitud() {
            RESTService.all('solicitud/data_form', '', function (response) {
                if (!_.isUndefined(response.status) && response.status) {

                    if(response.parametro_dia_vencimiento == "S") {
                        $(".dia_vencimiento_cuota").show();
                    } else {
                        $(".dia_vencimiento_cuota").hide();
                    }


                    if (response.parametro_igv.length > 0) {
                        // alert(response.parametro_igv[0].value);
                        $("#valor_igv").val(response.parametro_igv[0].value);
                    }
                    redondeo = response.dataredondeo;
                    decimales_redondeo = response.decimales_redondeo;
                    // descuentos = response.descuentos;
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
                                    totalDescuento.append('<option idTipo="' + item.idTipo + '" value="' + item.id + '*' + por + '*' + monto + '" >' + item.descripcion + '</option>');
                                }
                            }
                        }
                    });
                    cCodConsecutivo.append('<option value="">Seleccionar</option>');
                    _.each(response.codigo, function (item) {
                        cCodConsecutivo.append('<option value="' + item.cCodConsecutivo + '">' + item.cCodConsecutivo + '</option>');
                    });
                    // cCodConsecutivo.append('<option value="'+item.cCodConsecutivo+'*'+item.nConsecutivo+'">'+item.cCodConsecutivo+'</option>');
                    $("#condicion_pago").append('<option value="">Seleccionar</option>');
                    _.each(response.condicion_pago, function (item) {
                        $("#condicion_pago").append('<option days="'+item.days+'" value="' + item.id + '">' + item.description + '</option>');
                    });
                    // _.each(response.tipo_servicio, function (item) {
                    //     id_tipo.append('<option value="' + item.id + '">' + item.descripcion + '</option>');
                    // });
                    idDocumentoCli.append('<option value="">Seleccionar</option>');
                    _.each(response.tipo_document, function (item) {
                        idDocumentoCli.append('<option value="' + item.Codigo + '">' + item.TipoDocumento + '</option>');
                    });
                    id_tipoDoc_Venta_or_solicitud.append('<option value="">Seleccionar</option>');
                    _.each(response.tipo_document_venta, function (item) {
                        id_tipoDoc_Venta_or_solicitud.append('<option value="' + item.IdTipoDocumento + '">' + item.Descripcion + '</option>');
                    });
                    id_tipoDoc_Venta_solicitud.append('<option value="">Seleccionar</option>');
                    _.each(response.tipo_document_venta, function (item) {
                        id_tipoDoc_Venta_solicitud.append('<option value="' + item.IdTipoDocumento + '">' + item.Descripcion + '</option>');
                    });
                    tipos_doc_venta = response.tipo_document_venta;
                    // gru_revisiones.append('<option value="" selected>Seleccionar </option>');
                    // _.each(response.revisiones, function (item) {
                    //     gru_revisiones.append('<option value="' + item.id + '*' + item.nombre + '*' + item.mo_revision + '*' + item.mo_mecanica + '*' + item.terceros + '*' + item.otros_mo + '*' + item.repuestos + '*' + item.accesorios + '*' + item.lubricantes + '*' + item.otros_rep + '">' + item.nombre + '</option>');
                    // });
                    // idTecnico.append('<option value="">Seleccionar</option>');
                    // _.each(response.tecnico, function (item) {
                    //     idTecnico.append('<option value="' + item.id + '">' + item.descripcion + '</option>');
                    // });
                    // idAsesor.append('<option value="">Seleccionar</option>');
                    // _.each(response.asesor, function (item) {
                    //     idAsesor.append('<option value="' + item.id + '">' + item.descripcion + '</option>');
                    // });
                    // id_tipomant.append('<option value="">Seleccionar</option>');
                    // _.each(response.tipoMantenimiento, function (item) {
                    //     id_tipomant.append('<option value="' + item.id + '">' + item.descripcion + '</option>');
                    // });

                    // servicios = response.servicios;
                    idMoneda.append('<option value="">Seleccionar</option>');
                    _.each(response.moneda, function (item) {
                        idMoneda.append('<option data-simbolo="' + item.Simbolo + '" value="' + item.IdMoneda + '">' + item.Descripcion + '</option>');
                    });

                    idconvenio.append('<option value="">Seleccionar</option>');
                    _.each(response.convenios, function (item) {
                        idconvenio.append('<option value="' + item.idconvenio + '">' + item.descripcionconvenio + '</option>');
                    });

                    idvendedor.append('<option value="">Seleccionar</option>');
                    _.each(response.vendedores, function (item) {
                        idvendedor.append('<option  value="' + item.idvendedor + '">' + item.descripcion + '</option>');
                    });

                    // $("#idconyugue").append('<option value="">Seleccionar</option>');
                    // _.each(response.personas, function (item) {
                    //     $("#idconyugue").append('<option value="' + item.idPersona + '">' + item.cNombres + ' ' + item.cApepat + ' ' + item.cApemat + '</option>');
                    // });

                    // $("#idfiador").append('<option value="">Seleccionar</option>');
                    // _.each(response.personas, function (item) {
                    //     $("#idfiador").append('<option value="' + item.idPersona + '">' + item.cNombres + ' ' + item.cApepat + ' ' + item.cApemat + '</option>');
                    // });

                    // $("#idfiadorconyugue").append('<option value="">Seleccionar</option>');
                    // _.each(response.personas, function (item) {
                    //     $("#idfiadorconyugue").append('<option value="' + item.idPersona + '">' + item.cNombres + ' ' + item.cApepat + ' ' + item.cApemat + '</option>');
                    // });
                    // totales = response.totales;
                    // tipo_totales_slec.append('<option value="">Tipo</option>');
                    // _.each(response.totales, function (item) {
                    //     tipo_totales_slec.append('<option value="' + item.id + '">' + item.descripcion + '</option>');
                    // });

                    AlmacenesSele = response.almacen_usuario;
                    LotesSele = response.lotes;
                    DescuentosSele = response.descuentos;



                }
            }, function () {
                obtener_data_for_solicitud();
            });
        }

        obtener_data_for_solicitud();

        $(document).on("change", "#tipodoc", function (e) {
            e.preventDefault();
            $("#cNombres_c").val("");
            $("#cApepat_c").val("");
            $("#cApemat_c").val("");
            var valor = $(this).val();
            id_tipoDoc_Venta_solicitud.html("");
            id_tipoDoc_Venta_solicitud.append('<option value="">Seleccionar</option>');
            // console.log(tipos_doc_venta);
            if(valor == '06') {
                tipos_doc_venta.map(function (index) {
                    if(index.IdTipoDocumento == "01") {
                        id_tipoDoc_Venta_solicitud.append('<option value="' + index.IdTipoDocumento + '">' + index.Descripcion + '</option>');
                    }
                });
            } else {
                tipos_doc_venta.map(function (index) {
                    id_tipoDoc_Venta_solicitud.append('<option value="' + index.IdTipoDocumento + '">' + index.Descripcion + '</option>');
                });
            }
            if(valor != '06') {
                $(".persona_natural").show();

            } else {
                $(".persona_natural").hide();
            }
        });


        // CLIENTES
        var btn_editar_cliente = $("#btn_editar_cliente");
        var cEstadoCivil = $("#cEstadoCivil");
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
                RESTService.get('solicitud/find', id, function (response) {
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
                        id_tipoDoc_Venta_solicitud.val(data_p[0].IdTipoDocumento).trigger("change");
                        console.log(data_p[0].cDepartamento,'departamento ob');
                        getDepartamento(data_p[0].cDepartamento);
                        getProvincia(data_p[0].cProvincia, data_p[0].cDepartamento);
                        getDistrito(data_p[0].cCodUbigeo, data_p[0].cProvincia);
                        getSector(data_p[0].idsector,data_p[0].cCodUbigeo);
                        modaClientes.modal('show');
                        console.log(data_p);

                        $.post("solicitud/validar_cliente", { id_cliente: id },
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

        // PERSONAS

        var modalPersona = $("#modalPersona");
        var titleModalPersona = $("#titleModalPersona");
        var idPersona = $("#idPersona");
        var cTipopersona = $("#cTipopersona");
        var cDireccion = $("#cDireccion");
        var cReferencia = $("#cReferencia");
        var cDigitoVerificador = $("#cDigitoVerificador");
        var cTipodocumento = $("#cTipodocumento");
        var cNumerodocumento = $("#cNumerodocumento");
        var dFechacaducidad = $("#dFechacaducidad");
        var cRegion = $("#cRegion");
        var cProvincia = $("#cProvincia");
        var cUbigeo = $("#cUbigeo");
        var cEmail = $("#cEmail");
        var cCelular = $("#cCelular");
        var dFechanacimiento = $("#dFechanacimiento");
        var cEstadoCivil = $("#cEstadoCivil");
        var cApepat = $("#cApepat");
        var cApemat = $("#cApemat");
        var cNombres = $("#cNombres");
        var cRazonsocial = $("#cRazonsocial");
        var cNombrePersona = $("#cNombrePersona");
        var cSexo = $("#cSexo");

        $(".btn-editar-persona").click(function (e) {
            var tipo = $(this).data("tipo");
            // alert(tipo );
            if ($("#id" + tipo).val() == '') {
                AlertFactory.textType({
                    title: '',
                    message: 'Debe seleccionar un ' + tipo,
                    type: 'info'
                });
            } else {
                var id = $("#id" + tipo).val();
                // alert(id);
                findPersona(id);
            }
        });

        function findPersona(id) {
            titleModalPersona.html('Editar Persona');
            RESTService.get('personas/find', id, function (response) {
                if (!_.isUndefined(response.status) && response.status) {
                    var data_p = response.data;


                    idPersona.val(data_p[0].idPersona);
                    cTipopersona.val(data_p[0].cTipopersona).trigger('change');
                    cDireccion.val(data_p[0].cDireccion);
                    cReferencia.val(data_p[0].cReferencia);
                    cDigitoVerificador.val(data_p[0].cDigitoVerificador);
                    cTipodocumento.val(data_p[0].cTipodocumento).trigger('change');;
                    cNumerodocumento.val(data_p[0].cNumerodocumento);
                    dFechacaducidad.val(data_p.dFechacaducidad2);

                    cEmail.val(data_p[0].cEmail);
                    cCelular.val(data_p[0].cCelular);
                    dFechanacimiento.val(data_p.dFechanacimiento2);
                    cEstadoCivil.val(data_p[0].cEstadoCivil).trigger('change');;
                    cApepat.val(data_p[0].cApepat);
                    cApemat.val(data_p[0].cApemat);
                    cNombres.val(data_p[0].cNombres);
                    cRazonsocial.val(data_p[0].cRazonsocial);
                    cNombrePersona.val(data_p[0].cNombrePersona);
                    cSexo.val(data_p[0].cSexo);

                    getDepartamentoPersona(data_p[0].cDepartamento);
                    getProvinciaPersona(data_p[0].cProvincia, data_p[0].cDepartamento);
                    getDistritoPersona(data_p[0].cCodUbigeo, data_p[0].cProvincia);

                    modalPersona.modal('show');
                    console.log(data_p);
                } else {
                    AlertFactory.textType({
                        title: '',
                        message: 'Hubo un error al obtener el Cliente. Intente nuevamente.',
                        type: 'error'
                    });
                }
            });
        }

        documento_or.keypress(function (e) {
            var code = (e.keyCode ? e.keyCode : e.which);
            if (code == 13) {
                getCliente();
            }
        });

        $(".documento-persona").keypress(function (e) {

            var tipo = $(this).data("tipo");
            var code = (e.keyCode ? e.keyCode : e.which);
            if (code == 13) {
                getPersona(tipo);
            }
        });



        btn_save_cliente.click(function (e) {
            saveCliente();
        });

        function saveCliente() {
            var bval = true;
            bval = bval && tipodoc.required();
            bval = bval && documento.required();
            bval = bval && id_tipocli.required();
            bval = bval && id_tipoDoc_Venta_solicitud.required();
            bval = bval && razonsocial_cliente.required();
            bval = bval && celular.required();
            bval = bval && distrito.required();
            if (tipodoc.val() == '01') {
                bval = bval && $("#cApepat_c").required();
                bval = bval && $("#cApemat_c").required();
                bval = bval && $("#cNombres_c").required();
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
                    'IdTipoDocumento': id_tipoDoc_Venta_solicitud.val(),
                    'cEstadoCivil': cEstadoCivil.val(),
                    'idsector':idsector.val(),
                    'cNombres':$("#cNombres_c").val(),
                    'cApepat':$("#cApepat_c").val(),
                    'cApemat':$("#cApemat_c").val(),
                    'dFechanacimiento':$("#dFechanacimiento").val(),

                };
                var cli_id = (cliente_id.val() === '') ? 0 : cliente_id.val();
                RESTService.updated('solicitud/createCliente', cli_id, params, function (response) {
                    if (!_.isUndefined(response.status) && response.status) {
                        documento_or.val(documento.val());
                        getCliente();
                        modaClientes.modal('hide');

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
            RESTService.all('solicitud/data_form_customer', '', function (response) {
                if (!_.isUndefined(response.status) && response.status) {
                    var tip = response.tipoc_doc;
                    var tipo_clie = response.tipo_clie;
                    var tipo_persona = response.tipo_persona;

                    tipodoc.append('<option value="">Seleccionar</option>');
                    $("#cTipodocumento").append('<option value="">Seleccionar</option>');
                    $("#tipo_documento_conyugue").append('<option value="">Seleccionar</option>');
                    $("#tipo_documento_fiador").append('<option value="">Seleccionar</option>');
                    $("#tipo_documento_fiadorconyugue").append('<option value="">Seleccionar</option>');
                    tip.map(function (index) {
                        tipodoc.append('<option value="' + index.Codigo + '">' + index.TipoDocumento + '</option>');

                        $("#tipo_documento_conyugue").append('<option value="' + index.Codigo + '">' + index.TipoDocumento + '</option>');

                        $("#tipo_documento_fiador").append('<option value="' + index.Codigo + '">' + index.TipoDocumento + '</option>');

                        $("#tipo_documento_fiadorconyugue").append('<option value="' + index.Codigo + '">' + index.TipoDocumento + '</option>');

                        $("#cTipodocumento").append('<option value="' + index.Codigo + '">' + index.TipoDocumento + '</option>');
                    });

                    id_tipocli.append('<option value="">Seleccionar</option>');
                    tipo_clie.map(function (index) {
                        id_tipocli.append('<option value="' + index.id + '">' + index.descripcion + '</option>');

                        // id_tipocli.append('<option value="' + index.id + '">' + index.descripcion + '</option>');
                    });

                    $("#cTipopersona").append('<option value="">Seleccionar</option>');
                    tipo_persona.map(function (index) {
                        $("#cTipopersona").append('<option value="' + index.cCodigo + '">' + index.cDescripcion + '</option>');
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

        function getCliente() {
            var bval = true;
            bval = bval && documento_or.required();
            if (bval) {
                var id = documento_or.val();
                RESTService.get('solicitud/get_cliente', id, function (response) {
                    if (!_.isUndefined(response.status) && response.status) {
                        var datos = response.data;
                        if (datos.length == 0) {
                            $("#formulario-clientes").trigger("reset");

                            titleModalClientes.html('Nuevo Cliente');
                            modaClientes.modal('show');
                            var bandera = 'xxxxx';
                            getDepartamento(bandera);
                            distrito_ver.val("");
                            idsector_ver.val("");
                            distrito_or.val("");
                            idDocumentoCli.val("");
                            razonsocial_cliente_or.val("");
                            documento.val(documento_or.val());
                            documento_or.val("");
                            contacto_or.val("");
                            direccion_or.val("");
                            correo_electronico_or.val("");
                            id_tipoDoc_Venta_or_solicitud.val("").trigger('change');
                            celular_or.val("");
                            telefono_or.val("");
                            cliente_id_or.val("");
                            tipoCliente_or.val("");
                            id_tipocli.data("prev", id_cliente_tipo_or.val());
                            id_tipocli.val(id_cliente_tipo_or.val());
                            // id_cliente_tipo_or.val("")
                            // llenarServicios();
                        } else {
                            idsector_ver.val(datos[0].sector);
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
                            id_tipoDoc_Venta_or_solicitud.val(datos[0].IdTipoDocumento).trigger("change");
                            if (nConsecutivo.val() == "") {
                                id_tipoDoc_Venta_or_solicitud.focus();
                            }





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



        function getPersona(tipo) {
            //    alert(tipo);
            var bval = true;
            bval = bval && $("#documento_" + tipo).required();
            if (bval) {
                var id = $("#documento_" + tipo).val();
                // alert("#documento_" + tipo+ ": " + id);
                RESTService.get('personas/get_persona_documento', id, function (response) {
                    if (!_.isUndefined(response.status) && response.status) {
                        var datos = response.data;
                        if (datos.length == 0) {
                            $("#titleModalPersona").html('Nueva Persona');
                            $("#modalPersona").modal('show');
                            $("#formulario-persona").trigger("reset");
                            $("#tipo_persona").val(tipo);
                            var bandera = 'xxxxx';
                            getDepartamentoPersona(bandera);
                            $("#cNumerodocumento").val($("#documento_" + tipo).val());
                            $("#cNumerodocumento").focus();
                            $("." + tipo).val("");

                        } else {

                            // alert(tipo);
                            // alert(datos[0].cTipodocumento);
                            $("#tipo_documento_" + tipo).val(datos[0].cTipodocumento);
                            $("#id" + tipo).val(datos[0].idPersona);
                            // alert($("#nombres_" + tipo).val());
                            $("#nombres_" + tipo).val(datos[0].cNombres);
                            // alert(datos[0].cNombres);
                            // alert($("#nombres_" + tipo).val());
                            $("#apellido_paterno_" + tipo).val(datos[0].cApepat);
                            $("#apellido_materno_" + tipo).val(datos[0].cApemat);

                        }
                    } else {
                        // AlertFactory.textType({
                        //     title: '',
                        //     message: 'Hubo un error . Intente nuevamente.',
                        //     type: 'info'
                        // });
                    }


                });
            }
        }


        function getDepartamentoPersona(bandera) {
            var id = "0";
            RESTService.get('solicitud/TraerDepartamentos', id, function (response) {
                if (!_.isUndefined(response.status) && response.status) {
                    var data_p = response.data;
                    cRegion.html('');
                    cRegion.append('<option value="" >Seleccione</option>');
                    _.each(response.data, function (item) {
                        if (item.cDepartamento == bandera) {
                            cRegion.append('<option value="' + item.cDepartamento + '" selected >' + item.cDepartamento + '</option>');
                        } else {
                            cRegion.append('<option value="' + item.cDepartamento + '" >' + item.cDepartamento + '</option>');
                        };

                    });

                } else {
                    AlertFactory.textType({
                        title: '',
                        message: 'Hubo un error al obtener departamentos de persona. Intente nuevamente.',
                        type: 'error'
                    });
                }

            });
        }
        function getProvinciaPersona(bandera, id) {
            RESTService.get('solicitud/TraerProvincias', id, function (response) {
                if (!_.isUndefined(response.status) && response.status) {
                    var data_p = response.data;
                    console.log(data_p);
                    cProvincia.html('');
                    cProvincia.append('<option value="" >Seleccione</option>');
                    _.each(response.data, function (item) {
                        if (item.cProvincia == bandera) {
                            cProvincia.append('<option value="' + item.cProvincia + '" selected>' + item.cProvincia + '</option>');
                        } else {
                            cProvincia.append('<option value="' + item.cProvincia + '">' + item.cProvincia + '</option>');
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
        function getDistritoPersona(bandera, id) {
            RESTService.get('solicitud/TraerDistritos', id, function (response) {
                if (!_.isUndefined(response.status) && response.status) {
                    var data_p = response.data;
                    console.log(data_p);
                    cUbigeo.html('');
                    cUbigeo.append('<option value="" >Seleccione</option>');
                    _.each(response.data, function (item) {
                        if (item.cCodUbigeo == bandera) {
                            cUbigeo.append('<option value="' + item.cCodUbigeo + '" selected>' + item.cDistrito + '</option>');
                        } else {
                            cUbigeo.append('<option value="' + item.cCodUbigeo + '">' + item.cDistrito + '</option>');
                        }

                    });

                } else {
                    AlertFactory.textType({
                        title: '',
                        message: 'Hubo un error al obtener distritos de persona. Intente nuevamente.',
                        type: 'error'
                    });
                }

            });
        }
        cRegion.change(function () {
            var bandera = 'xxxxxx';
            var id = cRegion.val();
            getProvinciaPersona(bandera, id);
        });

        cProvincia.change(function () {
            var bandera = 'xxxxxx';
            var id = cProvincia.val();
            getDistritoPersona(bandera, id);

        });
        distrito.change(function () {
            var bandera='xxxxxx';
            var id=distrito.val();
            getSector(bandera,id);
        });
        cNumerodocumento.keypress(function (e) {
            var bval = true;
            bval = bval && $("#cTipodocumento").required();
            var code = (e.keyCode ? e.keyCode : e.which);
            if (code == 13) {
                if (bval) {
                    $('#show_loading').removeClass('ng-hide');
                    getDatosPersona();
                }

            }
        });

        function getDatosPersona() {

            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                // Si nada da error
                if (this.readyState == 4 && this.status == 200) {
                    // La respuesta, aunque sea JSON, viene en formato texto, por lo que tendremos que hace run parse
                    var data = JSON.parse(this.responseText);
                    console.log(data);
                    if (data.nombres != null) {
                        var razon = data.nombres + ' ' + data.apellidoPaterno + ' ' + data.apellidoMaterno;
                        cApepat.val(data.apellidoPaterno);
                        cApemat.val(data.apellidoMaterno);
                        cNombrePersona.val(razon);
                        cNombres.val(data.nombres);
                    } else if (data.razonSocial != null) {
                        var razon = data.razonSocial;
                        var direc = data.direccion;
                        cRazonsocial.val(razon);
                        cDireccion.val(direc);
                    } else {
                        cDireccion.val('');
                        cRazonsocial.val('');
                        AlertFactory.textType({
                            title: '',
                            message: 'No se encontró datos de la persona',
                            type: 'info'
                        });
                        $('#show_loading').addClass('ng-hide');
                    };
                    $('#show_loading').addClass('ng-hide');
                }
            };
            if (cTipodocumento.val() == '01') {
                if (cNumerodocumento.val().length == 8) {
                    var dni = cNumerodocumento.val();
                    xhttp.open("GET", "https://dniruc.apisperu.com/api/v1/dni/" + dni + "?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6InJleXNhbmdhbWE3QGdtYWlsLmNvbSJ9.hfobQC8FM5IyKKSaa7usUXV0aY1Y8YthAhdN8LoMlMM", true);
                    xhttp.setRequestHeader("Content-type", "application/json");
                    xhttp.send();
                } else {
                    AlertFactory.textType({
                        title: '',
                        message: 'dígitos del documento incompletos',
                        type: 'info'
                    });
                    cDireccion.val('');
                    cRazonsocial.val('');
                    $('#show_loading').addClass('ng-hide');
                }


            } else {
                if (cNumerodocumento.val().length == 11) {
                    var ruc = cNumerodocumento.val();
                    xhttp.open("GET", "https://dniruc.apisperu.com/api/v1/ruc/" + ruc + "?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6InJleXNhbmdhbWE3QGdtYWlsLmNvbSJ9.hfobQC8FM5IyKKSaa7usUXV0aY1Y8YthAhdN8LoMlMM", true);
                    xhttp.setRequestHeader("Content-type", "application/json");
                    xhttp.send();
                } else {
                    AlertFactory.textType({
                        title: '',
                        message: 'dígitos del documento incompletos',
                        type: 'info'
                    });
                    cDireccion.val('');
                    cRazonsocial.val('');
                    $('#show_loading').addClass('ng-hide');

                }

            }

        }
        $scope.savePersona = function () {
            var bval = true;
            bval = bval && cTipopersona.required();
            bval = bval && cTipodocumento.required();
            bval = bval && cNumerodocumento.required();
            bval = bval && cDigitoVerificador.required();
            bval = bval && dFechacaducidad.required();


            // bval = bval && cReferencia.required();




            bval = bval && cRegion.required();
            bval = bval && cProvincia.required();
            bval = bval && cUbigeo.required();
            bval = bval && cCelular.required();
            bval = bval && cEmail.required();
            bval = bval && cDireccion.required();

            // bval = bval && dFechanacimiento.required();
            // bval = bval && cEstadoCivil.required();
            // bval = bval && cSexo.required();
            if (cTipodocumento.val() == '01' && cNumerodocumento.val().length != 8) {
                AlertFactory.textType({
                    title: '',
                    message: 'Longitud de LE/DNI INCORRECTA',
                    type: 'info'
                });
                bval = false;
            };
            if (cTipodocumento.val() == '06' && cNumerodocumento.val().length != 11) {
                AlertFactory.textType({
                    title: '',
                    message: 'Longitud de RUC INCORRECTA',
                    type: 'info'
                });
                bval = false;
            };
            if (bval) {
                var params = {
                    'cTipopersona': cTipopersona.val(),
                    'cDireccion': cDireccion.val(),
                    'cReferencia': cReferencia.val(),
                    'cDigitoVerificador': cDigitoVerificador.val(),
                    'cTipodocumento': cTipodocumento.val(),
                    'cNumerodocumento': cNumerodocumento.val(),
                    'dFechacaducidad': dFechacaducidad.val(),
                    'cRegion': cRegion.val(),
                    'cProvincia': cProvincia.val(),
                    'cUbigeo': cUbigeo.val(),
                    'cCelular': cCelular.val(),
                    'cEmail': cEmail.val(),
                    'dFechanacimiento': dFechanacimiento.val(),
                    'cEstadoCivil': cEstadoCivil.val(),
                    'cApepat': cApepat.val(),
                    'cApemat': cApemat.val(),
                    'cNombres': cNombres.val(),
                    'cRazonsocial': cRazonsocial.val(),
                    'cNombrePersona': cNombrePersona.val(),
                    'cSexo': cSexo.val(),

                };
                var idPe = (idPersona.val() === '') ? 0 : idPersona.val();
                RESTService.updated('personas/createPersona', idPe, params, function (response) {
                    if (!_.isUndefined(response.status) && response.status) {
                        // documento_or.val(documento.val());
                        getPersona($("#tipo_persona").val());
                        modalPersona.modal('hide');
                        AlertFactory.textType({
                            title: '',
                            message: 'El registro se guardó correctamente',
                            type: 'success'
                        });
                        // LoadRecordsButtonPersona.click();
                    } else {
                        var msg_ = (_.isUndefined(response.message)) ?
                            'No se pudo guardar la persona. Intente nuevamente.' : response.message;
                        AlertFactory.textType({
                            title: '',
                            message: msg_,
                            type: 'info'
                        });
                    }
                });
            }

        };
        function getDepartamento(bandera) {
            var id = "0";
            // console.log("entro departaen");
            RESTService.get('solicitud/TraerDepartamentos', id, function (response) {
                if (!_.isUndefined(response.status) && response.status) {
                    var data_p = response.data;
                    departamento.html('');
                    departamento.append('<option value="" selected >Seleccione</option>');
                    _.each(response.data, function (item) {
                        if (item.cDepartamento == bandera) {
                            departamento.append('<option value="'+item.cDepartamento+'"  selected >' + item.cDepartamento + '</option>');
                        } else {
                            departamento.append('<option value="'+item.cDepartamento+'" >' + item.cDepartamento + '</option>');
                        };

                    });

                } else {
                    AlertFactory.textType({
                        title: '',
                        message: 'Hubo un error al obtener departamentos. Intente nuevamente.',
                        type: 'error'
                    });
                }

            });
        }
        departamento.change(function () {
            var bandera = 'xxxxxx';
            var id = departamento.val();
            getProvincia(bandera, id);
        });

        function getProvincia(bandera, id) {
            RESTService.get('solicitud/TraerProvincias', id, function (response) {
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

        provincia.change(function () {
            var bandera = 'xxxxxx';
            var id = provincia.val();
            getDistrito(bandera, id);

        });
        function getSector(bandera,id){
            RESTService.get('solicitud/traerSectorOrd', id, function(response) {
                if (!_.isUndefined(response.status) && response.status) {
                    var data_p = response.data;
                    console.log(data_p);
                    idsector.html('');
                    idsector.append('<option value="" >Seleccione</option>');
                    _.each(response.data, function(item) {
                        if(item.id==bandera){
                            idsector.append('<option value="'+item.id+'" selected>'+item.descripcion+'</option>');
                        }else{
                            idsector.append('<option value="'+item.id+'">'+item.descripcion+'</option>');
                        }

                    });

                }else {
                    AlertFactory.textType({
                        title: '',
                        message: 'Hubo un error al obtener sectores. Intente nuevamente.',
                        type: 'error'
                    });
                }

            });
        }
        function getDistrito(bandera, id) {
            RESTService.get('solicitud/TraerDistritos', id, function (response) {
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
                        message: 'Hubo un error al obtener distritos. Intente nuevamente.',
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
                RESTService.get('solicitud/get_cliente_persona', documentoEnvio, function (response) {
                    if (!_.isUndefined(response.status) && response.status) {
                        var dataPersona = response.data;
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
                            getSector("xxxxxx",dataPersona[0].cCodUbigeo);

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

        var titlemodalMovimietoArticulo = $("#titlemodalMovimietoArticulo");
        var idenifcador_table_art = $("#idenifcador_table_art");
        var table_container_cc2;
        var modalMovimietoArticulo = $("#modalMovimietoArticulo");
        $scope.addArticulo = function () {
            var bval = true;
            // bval = bval && idTipoOperacion.required();
            if (!idMoneda.prop("disabled")) {
                bval = bval && idMoneda.required();
            }
            bval = bval && documento_or.required();
            bval = bval && razonsocial_cliente_or.required();
            if (bval) {
                // if(idMovimiento.val()==""){
                //     saveMovimientoCab();
                // }
                titlemodalMovimietoArticulo.html('Nuevo Articulo');


                if (idenifcador_table_art.val() != 'I') {
                    table_container_cc2.jtable('destroy');
                }
                cargartableMovAr();
                idenifcador_table_art.val("A");


                modalMovimietoArticulo.modal('show');

                $('#search_cc2').val('');
                $('#LoadRecordsButtonCC2').click();
                $('#search_cc22').val('');
                $('#LoadRecordsButtonCC22').click();
                $("#table_container_Register_Articulo .jtable-main-container .jtable-bottom-panel .jtable-left-area .jtable-goto-page select ").val("1").trigger("change");
            }



        }

        function cargartableMovAr() {
            var search_cc2 = getFormSearch('frm-search-cc2', 'search_cc2', 'LoadRecordsButtonCC2');
            table_container_cc2 = $("#table_container_Register_Articulo");
            table_container_cc2.jtable({
                title: "Lista de Articulos",
                paging: true,
                sorting: true,
                cache: false,
                actions: {
                    listAction: base_url + '/solicitud/getArticulosSelect'
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
                    um_id: {
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
                    // costo: {
                    //     title: 'costo'

                    // },
                    select: {
                        width: '1%',
                        sorting: false,
                        edit: false,
                        create: false,
                        listClass: 'text-center',
                        display: function (data) {
                            return '<a href="javascript:void(0)" title="Seleccionar" class="select_cc" data-costo="' + data.record.costo + '" data-name="' +
                                data.record.description + '" data-type="' + data.record.type_id + '"  data-um_id="' + data.record.um_id + '"     data-serie="' + data.record.serie + '" data-lote="' + data.record.lote + '" data-code="' + data.record.id + '" data-impuesto="' + data.record.impuesto + '"><i class="fa fa-' +
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
                        var impuesto = $(this).attr('data-impuesto');
                        var um_id = $(this).attr('data-um_id');

                        seleccionarModal(codigo, descripcionArt, idTipoArt, serie, lote, costo, impuesto, um_id);
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

        var desProductoMss = $("#desProductoMss");
        var idProductoMss = $("#idProductoMss");
        var costoMK = $("#costoMK");
        var costoNa = $("#costoNa");
        var costoAS = $("#costoAS");
        var costoAL = $("#costoAL");
        var modalSerieR = $("#modalSerieR");

        var idProductoMN = $("#idProductoMN");
        var desProductoMN = $("#desProductoMN");
        var cantProductoMN = $("#cantProductoMN");
        var modalNada = $("#modalNada");

        cantProductoMN.keypress(function (e) {
            var code = (e.keyCode ? e.keyCode : e.which);
            if (code == 13) {
                addArtNada();
            }
        });

        var aartMN = [];//arrays de nada
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

                var id_tipo_cliente = id_cliente_tipo_or.val();
                var id = idProductoMN.val() + "_" + id_tipo_cliente + "_" + idMoneda.val();
                // alert(id);
                RESTService.get('solicitud/get_precios_list', id, function (response) {
                    if (!_.isUndefined(response.status) && response.status) {
                        if (response.newPrecio != "") {
                            precio = response.newPrecio;
                        } else {
                            AlertFactory.textType({
                                title: '',
                                message: 'Ingrese el precio del producto.',
                                type: 'info'
                            });
                            return false;
                        }

                        var impuesto_articulo = $("#impuesto_articulo").val();
                        var lote_articulo = $("#lote_articulo").val();
                        var cOperGrat = "N"
                        var posee_serie = $("#posee-serie").val();
                        var um_id = $("#um_id").val();
                        // alert(responsa.data[0].type_id);
                        addArticuloTable(idProductoMN.val(), desProductoMN.val(), cantProductoMN.val(), ver, codigo, tipoArt, codl, datl, idAlmacen, idLocalizacion, costo, costo_total, precio, precioTotal, impuesto_articulo, lote_articulo, cOperGrat, "", posee_serie, um_id, "", "", response.data[0].type_id, response.data[0].idCategoria, '', '');
                        modalNada.modal('hide');
                        modalMovimietoArticulo.modal('hide');
                    } else {
                        AlertFactory.textType({
                            title: '',
                            message: 'Hubo un error . Intente nuevamente.',
                            type: 'info'
                        });
                    }
                })


            }

        }

        $(document).on("change", "#id_tipoDoc_Venta_or_solicitud, #id_tipoDoc_Venta_solicitud", function () {
            var id_tipoDoc_Venta_or_solicitud = $(this).val();

            // alert(id_tipoDoc_Venta_or_solicitud+" <=> "+idDocumentoCli.val().toString().length);
            if ($("#cliente_id_or").val() != "" && id_tipoDoc_Venta_or_solicitud == "01" && idDocumentoCli.val() != "06") {
                AlertFactory.textType({
                    title: '',
                    message: 'El Tipo Documento del Cliente debe ser R.U.C.',
                    type: 'info'
                });
                $(".btn_guardarOrden").attr("disabled", "disabled");
            } else {
                $(".btn_guardarOrden").removeAttr("disabled");
            }


            if ($("#estado").val() <= 8 || $("#estado").val() == "") {
                // alert("hola manus");
                $(".btn_guardarOrden").removeAttr("disabled");
            } else {

                $(".btn_guardarOrden").attr("disabled", "disabled");
            }

        });

        function seleccionarModal(codigo, descripcionArt, idTipoArt, serie, lote, costo, impuesto, um_id) {
            // comentado por manuel 02/01/2022
            // alert("idTipoArt " + idTipoArt);
            // alert("lote " + lote);
            // alert("serie " + serie);
            // if (idTipoArt == '3') {
            //     modalKit.modal('show');
            //     $('#cantProductoMK').attr('onkeypress', 'return soloNumeros(event)');
            //     desProductoMK.val(descripcionArt);
            //     idProductoMK.val(codigo);
            //     costoMK.val(costo);
            // } else if (serie == '1') {
            //     // $('#cantProductoMS').attr('onkeypress','return soloNumeros(event)');
            //     // $('#anio_modeloMS').attr('onkeypress','return soloNumeros(event)');
            //     // $('#anio_fabricacionMS').attr('onkeypress','return soloNumeros(event)');
            //     desProductoMss.val(descripcionArt);
            //     idProductoMss.val(codigo);
            //     // var str2=idTipoOperacion.val();
            //     // var complet2=str2.split("*");
            //     // var nat2=complet2[1];
            //     costoAS.val(costo);
            //     // if(nat2=='S'){

            //     //     btnAgreSer.prop('disabled',true);
            //     //     btnAgreSer.trigger('change');
            //     // }else{
            //     //     btnAgreSer.prop('disabled',false);
            //     //     btnAgreSer.trigger('change');
            //     // }
            //     modalSerieR.modal('show');
            // } else if (lote == '1') {
            //     modalLoteR.modal('show');
            //     idProductoMll.val(codigo);
            //     desProductoMll.val(descripcionArt);
            //     costoAL.val(costo);
            // } else {
            $('#cantProductoMN').attr('onkeypress', 'return soloNumeros(event)');
            idProductoMN.val(codigo);
            desProductoMN.val(descripcionArt);
            $("#impuesto_articulo").val(impuesto);
            $("#lote_articulo").val(lote);
            $("#posee-serie").val(serie);
            $("#um_id").val(um_id);
            // alert("focusss selectsssss");

            modalNada.modal('show');
            $("#cantProductoMN").focus();
            $("#cantProductoMN").select();
            costoNa.val(costo);

            // }

        }

        var table_serie_cabecera = $("#table_serie_cabecera");
        var articulo_serie_det = $("#articulo_serie_det");
        var cantProductoMss = $("#cantProductoMss");
        var identiSelec = "I";
        var aartMSN = [];//ARRAY DE series nueva
        var aartMSE = [];



        modalNada.on('hidden.bs.modal', function (e) {
            cleanArtNada();
        });

        function cleanArtNada() {
            idProductoMN.val("");
            desProductoMN.val("");
            cantProductoMN.val(1);

        }

        $scope.addSeleccSerie = function () {
            table_serie_cabecera.html("");
            articulo_serie_det.html("");

            var bval = true;
            bval = bval && cantProductoMss.required();
            if (bval) {
                var id = idProductoMss.val() + '*' + cantProductoMss.val();
                RESTService.get('solicitud/validateCantSerie', id, function (response) {
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
                            // console.log(aartMSE);
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

        var cont_check = 0;
        var cont_table = 0;
        var table_container_cc4;
        var naturalezaGeneral;
        var btn_serC = $("#btn_serC");
        var identSerAr = $("#identSerAr");//identificador para modificar el array de series esxisten

        function cargarTableSerie(idProducto, aarraySe) {

            // console.log($("#table_container_Series_Articulo").find(".jtable-main-container"));



            cont_check = 0;
            identiSelec = "A";
            var search_cc4 = getFormSearch('frm-search-cc4', 'search_cc4', 'LoadRecordsButtonCC4');
            table_container_cc4 = $("#table_container_Series_Articulo");
            // var url = 'getProductoSerie';
            var url = 'getProductoSerieStock';
            // if (naturalezaGeneral == "S") {
            //     url = 'getProductoSerieStock';
            // };
            table_container_cc4.jtable({
                title: "Lista de Series",
                paging: true,
                sorting: true,
                actions: {
                    listAction: function (postData, jtParams) {
                        return $.Deferred(function ($dfd) {
                            $.ajax({
                                url: base_url + '/solicitud/' + url,
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
                    tipo_compra_venta: {
                        title: 'Tipo Compra Venta'
                    },
                    color: {
                        title: 'Color'
                    },
                    select: {
                        width: '1%',
                        sorting: false,
                        edit: false,
                        create: false,
                        listClass: 'text-center',
                        display: function (data) {
                            var ichc = 'N';

                            var codigo_tr = $("#btnSeleSerie").attr("codigo_tr");
                            var tr = $("#tr_idArticulo"+codigo_tr);
                            var arr_series = []
                            // console.log(tr.find("td").eq(0).find(".list-series").find("input[name='series_id[]']"));
                            if(tr.find("td").eq(0).find(".list-series").find("input[name='series_id[]']").length > 0) {

                                arr_series = tr.find("td").eq(0).find(".list-series").find("input[name='series_id[]']").val().split(",");
                            }

                            // console.log(arr_series);
                            // console.log(data.record);


                            if (identSerAr.val() != "") {
                                console.log("entro");
                                aartMSE.map(function (index) {
                                    if (data.record.serie == index.serie && identSerAr.val() == index.identificador) {
                                        ichc = 'A';
                                    }
                                });
                                // console.log("ichc: "+ichc);
                                if (ichc == 'A' || arr_series.indexOf(data.record.idSerie) != -1) {
                                    cont_check = cont_check + 1;
                                    ichc = 'N';
                                    return '<label class="checkbox-inline i-checks"> <input class="check valcheck" type="checkbox" id="p_state" data_idSerie="' + data.record.idSerie + '" data-code="' + data.record.serie + '" checked ></label>';
                                } else {
                                    return '<label class="checkbox-inline i-checks"> <input class="check valcheck" type="checkbox" id="p_state" data_idSerie="' + data.record.idSerie + '" data-code="' + data.record.serie + '"  ></label>';
                                }
                            } else {
                                console.log(arr_series.indexOf(data.record.idSerie));
                                if(arr_series.indexOf(data.record.idSerie) != -1) {
                                    return '<label class="checkbox-inline i-checks"> <input class="check valcheck" type="checkbox" id="p_state" data_idSerie="' + data.record.idSerie + '" data-code="' + data.record.serie + '" checked ></label>';
                                } else {
                                    return '<label class="checkbox-inline i-checks"> <input class="check valcheck" type="checkbox" id="p_state" data_idSerie="' + data.record.idSerie + '" data-code="' + data.record.serie + '"  ></label>';
                                }

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

                    $('.valcheck').on('ifChanged', function(event){
                        var idserie = $(this).attr("data_idSerie");
                        // console.log($(this).attr("data_idSerie"));
                        if ($(this).prop('checked')) {
                            $.post("solicitud/validar_serie", { idserie: idserie},
                                function (data, textStatus, jqXHR) {
                                    if(data.length > 0) {
                                        AlertFactory.textType({
                                            title: '',
                                            message: 'La serie ya ha sido asignada a una solicitud anterior: '+data[0].cCodConsecutivo+"-"+data[0].nConsecutivo,
                                            type: 'info'
                                        });
                                        $("#btn_serC").attr("disabled", "disabled");

                                    } else {
                                        $("#btn_serC").removeAttr("disabled");
                                    }
                                },
                                "json"
                            );
                            // alert(event.type + ' checked');
                        } else {
                            // alert(event.type + ' unchecked');
                        };
                    });

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

        $scope.addSerieCompleTab = function () {
            var bval = true;
            var cant = cantProductoMss.val();
            var series_id = [];
            var articulos_id = [];
            bval = bval && cantProductoMss.required();
            if (bval) {
                // alert(identiSelec);
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
                                series_id.push($(this).attr('data_idSerie'));
                                articulos_id.push(idProductoMss.val());
                                aartMSE.push(grubSE);
                            });
                            $("#tr_idArticulo" + identSerAr.val()).find("td:eq(3)").children("p").text(cantProductoMss.val());
                            $("#tr_idArticulo" + identSerAr.val()).find("td:eq(3)").children("input").val(cantProductoMss.val());
                            modalSerieR.modal("hide");
                            modalMovimietoArticulo.modal("hide");
                        } else {
                            var vers = 'N';
                            //var codigoLSr = Math.random().toString(36).substr(2, 18);
                            var codigoLSr = $("#codigo-tr").val();
                            // alert(codigoLSr);
                            var tipoArtLSr = 'SE';
                            $(".check:checkbox:checked").each(function () {
                                var grubSE = {
                                    'identificador': codigoLSr,
                                    'idProducto': idProductoMss.val(),
                                    'serie': $(this).attr('data-code'),
                                    'idSerie': $(this).attr('data_idSerie'),
                                    'cantidad': cantProductoMss.val(),
                                }
                                series_id.push($(this).attr('data_idSerie'));
                                articulos_id.push(idProductoMss.val());
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
                            // addArticuloTable(idProductoMss.val(), desProductoMss.val(), cantProductoMss.val(), vers, codigoLSr, tipoArtLSr, codl, datl, idAlmacen, idLocalizacion, costo, costo_total, precio, precioTotal);
                            modalSerieR.modal("hide");
                            modalMovimietoArticulo.modal("hide");

                        }

                        var html = "";
                        html += '<input type="hidden" name="series_id[]" value="' + series_id.join(",") + '" />';
                        html += '<input type="hidden" name="articulos_id[]" value="' + articulos_id.join(",") + '" />';

                        $("#tr_idArticulo" + codigoLSr).find("td").eq(0).find(".list-series").html(html);
                        // $("#tr_idArticulo" + codigoLSr).find("td").eq(0).append('<input type="hidden" name="articulos_id[]" value="' + articulos_id.join(",") + '" />');
                    } else {
                        AlertFactory.textType({
                            title: '',
                            message: 'Las series seleccionadas debe ser igual a la cantidad',
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
                        RESTService.get('register_movements/valida_series_serve', camposunicos, function (response) {
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
                                        // addArticuloTable(idProductoMss.val(), desProductoMss.val(), cantProductoMss.val(), ver, codigoLr, tipoArtLr, codl, datl, idAlmacen, idLocalizacion, costo, costo_total, precio, precioTotal);
                                        modalSerieR.modal("hide");
                                        modalMovimietoArticulo.modal("hide");
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

        var articulo_mov_det = $("#articulo_mov_det");
        var LocalizacionesSele;//variable para guardar localizaciones del almacen


        function addArticuloTable(idProducto, desProducto, cantProducto, ver, codigo, tipo, codl, datl, idAlmacen, idLocalizacion, costo, costo_total, precio, presio_total, impuesto_articulo, lote_articulo, cOperGrat, iddescuento, posee_serie, um_id, series_id_sd, articulos_id_sd, type_id, idCategoria, descripcion_articulo, id_solicitud_articulo) {


            if ($("#articulo_mov_det").html() != "") {
                if (parseFloat($("#t_impuestos").val()) > 0) {
                    if (impuesto_articulo != 1) {
                        AlertFactory.textType({
                            title: '',
                            message: 'Todos los productos del detalle deben tener activo la opcion de  calcular impuestos',
                            type: 'info'
                        });
                        return false;
                    }
                } else {
                    if (impuesto_articulo != 0) {
                        AlertFactory.textType({
                            title: '',
                            message: 'Todos los productos del detalle no deben tener activo la opcion de  calcular impuestos',
                            type: 'info'
                        });
                        return false;
                    }
                }
            }
            acodigos.push(codigo);
            // alert(costo+" c "+ costo_total+" c "+ precio);
            // console.log(idLocalizacion);
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
            // alert(pretotal);
            //  if(naturalezaGeneral=="C"){
            //     impor=0;
            //  }
            var tr = $('<tr id="tr_idArticulo' + codigo + '" type_id="'+type_id+'" idCategoria="'+idCategoria+'"></tr>');
            var td1 = $('<td>' + desProducto + '</td>');

            var td3;
            var inp3;
            // if(naturalezaGeneral=="S" || naturalezaGeneral=="A" ){
            //     var tdpr = $('<td></td>');
            //     var inpr = $('<input type="number" id="preMs_'+codigo+'" min="1" class="m_articulo_precio form-control input-sm" value="' + precionew + '" />');
            // }else{
            // precionew = "";
            var tdpr = $('<td><p>0</p></td>');

            var inpr = $('<input type="hidden"  name="porcentaje_descuento[]" id="preMs_' + codigo + '" min="1" class="m_articulo_precio form-control input-sm"  /><input type="hidden"  name="um_id[]" id="um_id_' + codigo + '"  value="' + um_id + '" class="form-control input-sm"  />');
            // }

            // if(naturalezaGeneral=="E" || naturalezaGeneral=="C"){
            //     var td4 = $('<td></td>');
            //     var inp4 = $('<input type="number" id="cosMs_'+codigo+'" min="1" class="m_articulo_costo form-control input-sm" value="' + costonew + '" />');
            // }else{
            // alert("precio new " + precionew);
            var td4 = $('<td style="width: 40px !important;"><input style="width: 60px !important;" data-precioOrigen="' + precionew + '" impuesto_articulo="' + impuesto_articulo + '" name="precio_unitario[]" onkeypress="return validDecimals(event, this, 2)" type="text" codigo="' + codigo + '"  id="precio_unitario_' + codigo + '" min="1" class="m_articulo_precio_unitario form-control input-sm"  value="' + precionew.toFixed(decimales_redondeo) + '" /></td>');
            var inp4 = $('<input name="costo[]"  id="costo_' + codigo + '" type="hidden"   value="' + costonew + '" /><input name="costo_total[]" id="costo_total_' + codigo + '"  type="hidden" value="' + impor + '" />');
            // }

            // if(naturalezaGeneral=="C"){
            //     var tdy = $('<td></td>');
            //     var td2 = $('<td></td>');
            //     var inpy=$('<select  data-arts="'+idProducto+'" id="Al_'+codigo+'" data-idAraAl="'+codigo+'" class="m_articulo_idAlm form-control input-sm" disabled></select>');
            //     var inpl=$('<select id="'+codigo+'" data-idArl="'+idProducto+'" class="m_articulo_idLoc form-control input-sm" disabled ></select>');
            //     var td3 = $('<td><p></p></td>');
            //     var inp3 = $('<input type="hidden" id="canMs_'+codigo+'" class="m_articulo_cantidad" value="0" />');
            // }else{
            if (ver == 'A') {
                var td3 = $('<td style="width: 40px !important;" class="text-center"></td>');
                var inp3 = $('<input type="text" style="width: 40px !important;" id="canMs_' + codigo + '" codigo="' + codigo + '" onkeypress="return soloNumeros(event)" codigo="' + codigo + '" name="cantidad[]" class="m_articulo_cantidad form-control input-sm" value="' + cantProducto + '" />');
            } else {
                var td3 = $('<td style="width: 30px !important;"><p>' + cantProducto + '</p></td>');
                var inp3 = $('<input type="hidden" style="width: 30px !important;" id="canMs_' + codigo + '" class="m_articulo_cantidad"  impuesto_articulo="' + impuesto_articulo + '" codigo="' + codigo + '" name="cantidad[]" value="' + cantProducto + '" />');
            }
            var td2 = $('<td></td>');
            var tdy = $('<td></td>');
            var inpy = $('<select name="idalmacen[]" data-arts="' + idProducto + '" id="Al_' + codigo + '" data-idAraAl="' + codigo + '" class="m_articulo_idAlm form-control input-sm"></select>');
            var inpl = $('<select name="idlocalizacion[]" id="' + codigo + '" data-idArl="' + idProducto + '" class="m_articulo_idLoc form-control input-sm"></select>');

            var td_lote = $('<td></td>');
            var disabled_lote = "";
            if (lote_articulo == "0") {
                disabled_lote = 'disabled="disabled"';
            }

            var select_lote = $('<select ' + disabled_lote + ' name="idlote[]" id="lote_' + codigo + '" class="select_lote form-control input-sm" lote_articulo="' + lote_articulo + '"></select>');

            var td_descuentos = $('<td></td>');
            var select_descuento = $('<select impuesto_articulo="' + impuesto_articulo + '" name="iddescuento[]" codigo="' + codigo + '" id="descuento_' + codigo + '" class="select_descuento form-control input-sm"></select>');

            // }

            var td5 = $('<td><p>' + pretotal.toFixed(decimales_redondeo) + '</p></td>');
            var tdpreT = $('<td><p></p></td>');

            var inp = $('<input type="hidden" class="m_articulo_id" name="idarticulo[]" posee-serie="' + posee_serie + '" value="' + idProducto + '"  cantidad="' + cantProducto + '" producto="' + desProducto + '" />');

            var inp5 = $('<input type="hidden" cOperGrat="'+cOperGrat+'" class="m_articulo_precioTotal" name="precio_total[]" codigo="' + codigo + '"  value="' + pretotal.toFixed(decimales_redondeo) + '" />');
            var inpPreTo = $('<input type="hidden" class="m_articulo_montoDescuento" codigo="' + codigo + '"  name="monto_descuento[]" />');

            var html_list_series = '';
            if(series_id_sd != "" && articulos_id_sd != "") {
                html_list_series += '<input type="hidden" name="series_id[]" value="' + series_id_sd + '" />';
                html_list_series += '<input type="hidden" name="articulos_id[]" value="' + articulos_id_sd + '" />';
            } else {
                html_list_series = '<input type="hidden" name="series_id[]" value="" /><input type="hidden" name="articulos_id[]" value="" />';
            }

            var op = $('<option value="" selected>Seleccione</option>');
            var fclt = $('<input type="hidden" class="m_codigo_lote" value="' + codl + '" />');
            var fdlt = $('<input type="hidden" class="m_dato_lote" value="' + datl + '" />');
            var identificador_serie_bd = $('<input type="hidden" class="identificador_serie_bd" value="' + codigo + '" /><span class="list-series">'+html_list_series+'</span>');
            td1.append(inp).append(fclt).append(fdlt).append(identificador_serie_bd);


            td2.append(inpy);
            tdy.append(inpl);
            td_lote.append(select_lote);
            td_descuentos.append(select_descuento);
            td3.append(inp3);
            td4.append(inp4);
            td5.append(inp5);
            tdpr.append(inpr);
            tdpreT.append(inpPreTo);
            // var td6 = $('<td class="text-center"></td>');
            // var btn1 = $('<button class="btn btn-info btn-xs verUpdate" title="ver" data-cantiShow="' + cantProducto + '" data-descrip="' + desProducto + '" data-idProducto="' + idProducto + '" data-tShow="' + tipo + '" data-idv="' + codigo + '" type="button"><span class="fa fa-eye"></span></button>');
            var td8 = $('<td class="text-center"></td>');

            var button_series = "";
            // alert($("#estado").val());
            var tipo_solicitud = $("#tipo_solicitud").val();
            var estado = $("#estado").val();

            if (posee_serie == "1") {
                if(tipo_solicitud == "1" || (tipo_solicitud == "2" && estado >= 4) || (tipo_solicitud == "3" && estado >= 4)) {
                    button_series = '&nbsp;&nbsp;<button data-cantidad="' + cantProducto + '" class="btn btn-success btn-xs agregar-series" data-tipo="' + tipo + '" title="Agregar Series" data-id="' + codigo + '" data-idarticulo="' + idProducto + '" data-articulo="' + desProducto + '" data-costo="' + costo + '"  data-posee-serie="' + posee_serie + '" type="button"><span class="fa fa-plus"></span>&nbsp;Agregar Series</button>';
                }

            }
            // boton ver series
            var button_ver_series = "";
            if(series_id_sd != "" && articulos_id_sd != "") {
                button_ver_series = '&nbsp;&nbsp;<button  class="btn btn-primary btn-xs ver-series" data-id_solicitud_articulo="' + id_solicitud_articulo + '" title="Ver Series" type="button"><span class="fa fa-search"></span>&nbsp;Ver Series</button>';
            }

            var desactivar_del = "";
            if ($("#estado").val() == "4") {
                desactivar_del = 'disabled="disabled"';
            }

            var btn3 = $('<center><button ' + desactivar_del + ' class="btn btn-danger btn-xs delMovPro" data-tipo="' + tipo + '" title="Eliminar" data-id="' + codigo + '" type="button"><span class="fa fa-trash"></span></button>' + button_series + button_ver_series + '</center>');
            // td6.append(btn1);

            var monto_exonerado = 0;
            var monto_afecto = 0;
            var monto_inafecto = 0;
            var impuestos = 0;
            var valor_igv = parseFloat($("#valor_igv").val());
            var monto_subtotal = 0;
            // alert(impuesto_articulo);
            // console.log("cOperGrat: "+cOperGrat);
            if (cOperGrat != "S") {
                monto_subtotal = pretotal;
                if (impuesto_articulo == "0") {
                    monto_exonerado = pretotal;
                } else {
                    // alert(valor_igv);
                    monto_afecto = pretotal;
                    impuestos = pretotal * valor_igv / 100;
                    pretotal = pretotal + impuestos;
                }
            } else {
                pretotal = 0;
            }



            // console.log(codigo+" => "+monto_subtotal);

            var html = '<td codigo="' + codigo + '" class="monto_descuento_prorrateado"><p>0</p><input type="hidden" codigo="' + codigo + '" name="monto_descuento_prorrateado[]" value="0"></td>';
            html += '<td codigo="' + codigo + '" class="monto_subtotal"><p>' + monto_subtotal.toFixed(decimales_redondeo) + '</p><input type="hidden" codigo="' + codigo + '" name="monto_subtotal[]" value="' + monto_subtotal.toFixed(decimales_redondeo) + '"><input type="hidden" codigo="' + codigo + '" name="monto_subtotal_sin_descuento_prorrateado[]" value="' + monto_subtotal.toFixed(decimales_redondeo) + '"></td>';

            html += '<td codigo="' + codigo + '" class="monto_exonerado"><p>' + monto_exonerado.toFixed(decimales_redondeo) + '</p><input type="hidden" codigo="' + codigo + '" name="monto_exonerado[]" value="' + monto_exonerado.toFixed(decimales_redondeo) + '"></td>';
            html += '<td codigo="' + codigo + '" class="monto_afecto"><p>' + monto_afecto.toFixed(decimales_redondeo) + '</p><input type="hidden" codigo="' + codigo + '" name="monto_afecto[]" value="' + monto_afecto.toFixed(decimales_redondeo) + '"></td>';
            html += '<td codigo="' + codigo + '" class="monto_inafecto"><p>' + monto_inafecto.toFixed(decimales_redondeo) + '</p><input type="hidden" codigo="' + codigo + '" name="monto_inafecto[]" value="' + monto_inafecto.toFixed(decimales_redondeo) + '"></td>';
            html += '<td codigo="' + codigo + '" class="impuestos"><p>' + impuestos.toFixed(decimales_redondeo) + '</p><input type="hidden" codigo="' + codigo + '" name="impuestos[]" value="' + impuestos.toFixed(decimales_redondeo) + '"></td>';
            html += '<td codigo="' + codigo + '" class="total"><p>' + pretotal.toFixed(decimales_redondeo) + '</p><input type="hidden" codigo="' + codigo + '" name="monto_total[]" value="' + pretotal.toFixed(decimales_redondeo) + '"></td>';

            var check = "";
            var valor_cOperGrat = "N";
            if (cOperGrat == "S") {
                check = "checked";
                valor_cOperGrat = "S";
            }

            var disabled_check = "";
            if ($("#estado").val() == "4") {
                disabled_check = 'disabled="disabled"';
            }
            var chek = $('<td><div class="col-sm-1"><label class="checkbox-inline i-checks"><input data-idCheck="' + codigo + '"  class="checkClass"  ' + disabled_check + ' type="checkbox" id="pOper' + codigo + '" ' + check + '  > <input type="hidden" name="cOperGrat[]" codigo="' + codigo + '" id="cOperGrat_' + codigo + '" value="'+valor_cOperGrat+'" /> <input type="hidden" name="nOperGratuita[]" codigo="' + codigo + '" id="nOperGratuita_' + codigo + '" /> </label></div></td>');


            td8.append(btn3);
            tr.append(td1).append('<td><input type="text" class="form-control input-sm" name="descripcion_articulo[]" value="'+descripcion_articulo+'" /></td>').append(td2).append(tdy).append(td_lote).append(td3).append(td4).append(chek).append(td5).append(td_descuentos).append(tdpr).append(tdpreT).append(html).append(td8);
            articulo_mov_det.append(tr);
            addAlmaSelec(codigo);
            addlocSele(codigo);
            obtener_descuentos(codigo, idProducto);
            obtener_lotes(codigo);

            if (iddescuento != "") {
                $("#descuento_" + codigo).val(iddescuento).trigger("change");
            }


            $('.delMovPro').click(function (e) {
                var code = $(this).attr('data-id');
                var tip = $(this).attr('data-tipo');
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
                    $('#tr_idArticulo' + code).remove();

                    if($("#tipo_sol").val() == "N") {
                        calcular_totales();
                    }

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
            // $('.m_articulo_cantidad').keyup(function (e) {
            //     var cantidap = $(this).val();
            //     var costo = $(this).closest("tr").find("td:eq(4)").children("input").val();
            //     var importe = Number(cantidap) * Number(costo);
            //     $(this).closest("tr").find("td:eq(5)").children("p").text(importe.toFixed(decimales_redondeo));
            //     $(this).closest("tr").find("td:eq(5)").children("input").val(importe.toFixed(decimales_redondeo));
            //     if (naturalezaGeneral == "S" || naturalezaGeneral == "A") {
            //         var preciUni = $(this).closest("tr").find("td:eq(6)").children("input").val();
            //         var precioTotal = Number(cantidap) * Number(preciUni);
            //         $(this).closest("tr").find("td:eq(7)").children("p").text(precioTotal.toFixed(decimales_redondeo));
            //         $(this).closest("tr").find("td:eq(7)").children("input").val(precioTotal.toFixed(decimales_redondeo));
            //     }
            // })
            $('.m_articulo_precio').keyup(function (e) {
                var preciop = $(this).val();
                var cantidad = $(this).closest("tr").find("td:eq(3)").children("input").val();
                var precioTotal = Number(cantidad) * Number(preciop);
                $(this).closest("tr").find("td:eq(7)").children("p").text(precioTotal.toFixed(decimales_redondeo));
                $(this).closest("tr").find("td:eq(7)").children("input").val(precioTotal.toFixed(decimales_redondeo));
            })

            $('.m_articulo_precio').change(function (e) {
                var preciop = $(this).val();
                var cantidad = $(this).closest("tr").find("td:eq(3)").children("input").val();
                var precioTotal = Number(cantidad) * Number(preciop);
                $(this).closest("tr").find("td:eq(7)").children("p").text(precioTotal.toFixed(decimales_redondeo));
                $(this).closest("tr").find("td:eq(7)").children("input").val(precioTotal.toFixed(decimales_redondeo));
            })

            $('.m_articulo_costo').keyup(function (e) {
                var costop = $(this).val();
                var cantidad = $(this).closest("tr").find("td:eq(3)").children("input").val();
                var importe = Number(cantidad) * Number(costop);
                $(this).closest("tr").find("td:eq(5)").children("p").text(importe.toFixed(decimales_redondeo));
                $(this).closest("tr").find("td:eq(5)").children("input").val(importe.toFixed(decimales_redondeo));
            })
            $('#cosMs_' + codigo).change(function (e) {
                var costop = $(this).val();
                var cantidad = $(this).closest("tr").find("td:eq(3)").children("input").val();
                var importe = Number(cantidad) * Number(costop);
                $(this).closest("tr").find("td:eq(5)").children("p").text(importe.toFixed(decimales_redondeo));
                $(this).closest("tr").find("td:eq(5)").children("input").val(importe.toFixed(decimales_redondeo));
            })

            if (idAlmacen != "") {
                // alert(idAlmacen);
                $("#Al_" + codigo).val(idAlmacen).trigger('change');
                $("#" + codigo).val(idLocalizacion).trigger('change');

                // $("#cosMs_" + codigo).val(Number(costo));
                // var cos = Number(costo_total);
                // $("#tr_idArticulo" + codigo).find("td:eq(5)").children("p").text(cos);
                // $("#tr_idArticulo" + codigo).find("td:eq(5)").children("input").val(cos);
            };

            if($("#tipo_sol").val() == "N") {
                calcular_totales();
            }

            if ($("#tipo_solicitud").val() == "2" || $("#tipo_solicitud").val() == "3") {
                $("#tipo_solicitud").trigger("change");
            }

            $('.i-checks').iCheck({
                checkboxClass: 'icheckbox_square-green'
            }).on('ifChanged', function (event) {
                $(event.target).click();


                var codigo = $(this).data("idcheck");
                if ($("#pOper" + codigo).prop('checked')) {

                    $(".m_articulo_precioTotal[codigo='" + codigo + "']").val(0);
                    $(".m_articulo_precioTotal[codigo='" + codigo + "']").siblings("p").text(0);

                    $(".select_descuento[codigo='" + codigo + "']").val("");
                    $(".select_descuento[codigo='" + codigo + "']").attr("disabled", "disabled");
                    // console.log($(".select_descuento[codigo='" + codigo + "']")[0]);
                    $(".m_articulo_precio[codigo='" + codigo + "']").val(0);
                    $(".m_articulo_precio[codigo='" + codigo + "']").siblings("p").text(0);

                    $(".m_articulo_montoDescuento[codigo='" + codigo + "']").val(0);
                    $(".m_articulo_montoDescuento[codigo='" + codigo + "']").siblings("p").text(0);


                    $("input[name='monto_subtotal[]'][codigo=" + codigo + "]").val(0);
                    $(".monto_subtotal[codigo=" + codigo + "]").find("p").text(0);

                    $("input[name='monto_exonerado[]'][codigo=" + codigo + "]").val(0);
                    $(".monto_exonerado[codigo=" + codigo + "]").find("p").text(0);

                    $("input[name='monto_afecto[]'][codigo=" + codigo + "]").val(0);
                    $(".monto_afecto[codigo=" + codigo + "]").find("p").text(0);

                    $("input[name='monto_inafecto[]'][codigo=" + codigo + "]").val(0);
                    $(".monto_inafecto[codigo=" + codigo + "]").find("p").text(0);

                    $("input[name='impuestos[]'][codigo=" + codigo + "]").val(0);
                    $(".impuestos[codigo=" + codigo + "]").find("p").text(0);

                    $("input[name='monto_total[]'][codigo=" + codigo + "]").val(0);
                    $(".total[codigo=" + codigo + "]").find("p").text(0);

                    var cantidad = parseFloat($("input[name='cantidad[]'][codigo=" + codigo + "]").val());
                    var precio = parseFloat($("#precio_unitario_" + codigo).val());
                    // alert(cantidad);
                    // alert(precio);
                    var nOperGratuita = cantidad * precio;
                    $("input[name='nOperGratuita[]'][codigo=" + codigo + "]").val(nOperGratuita);
                    $("input[name='cOperGrat[]'][codigo=" + codigo + "]").val("S");

                } else {
                    // alert("hola");
                    $("#canMs_" + codigo).trigger("keyup");
                    $(".select_descuento[codigo='" + codigo + "']").removeAttr("disabled");
                    $("input[name='cOperGrat[]'][codigo=" + codigo + "]").val("N");
                    $("input[name='nOperGratuita[]'][codigo=" + codigo + "]").val(0);


                }

                if($("#tipo_sol").val() == "N") {
                    calcular_totales();
                }

            });







        }



        $(document).on("blur", "input[name='precio_unitario[]']", function () {
            // console.log($(this).val());
            var precio_unitario = parseFloat($(this).val());

            if(isNaN(precio_unitario)) {
                precio_unitario = 0;
            }
            // console.log(precio_unitario);
            if(precio_unitario <= 0) {
                AlertFactory.textType({
                    title: '',
                    message: 'El precio unitario debe ser mayor a cero, si no se va a cobrar al cliente marcar el check de Operación Gratuita.',
                    type: 'info'
                });
                $(this).val("");
                return false;
            }

            var type_id = $(this).parent("td").parent("tr").attr("type_id");
            var idCategoria = $(this).parent("td").parent("tr").attr("idCategoria");
            // alert(type_id +" "+idCategoria);
            var preciofin = $(this).val();
            var precioOr = $(this).attr('data-precioorigen');
            var codigo = $(this).attr("codigo");
            // alert(precioOr);
            var newpp = Number(precioOr) + Number(redondeo);
            var newpn = Number(precioOr) - Number(redondeo);

            $.post("solicitud/validar_parametro_categoria", {},
                function (data, textStatus, jqXHR) {
                    // console.log(data);
                    if(data.length > 0) {
                        if(type_id != 2 && idCategoria != data[0].value) {
                            if (preciofin > newpp || preciofin < newpn) {
                                AlertFactory.textType({
                                    title: '',
                                    message: 'El precio del producto solo se puede ajustar +- ' + redondeo,
                                    type: 'info'
                                });

                                $(this).val(precioOr);

                            }
                        }

                    } else {
                        AlertFactory.textType({
                            title: '',
                            message: 'No existe el parametro <<Código de categoría que permite registrar libremente el precio>>',
                            type: 'info'
                        });
                    }

                },
                "json"
            );


            $("#canMs_" + codigo).trigger("keyup");
            // calcular_total_MO();
            // sumar_key();

        });


        $(document).on("click", ".ver-series", function () {
            var id_solicitud_articulo = $(this).data("id_solicitud_articulo");
            // alert(id_solicitud_articulo);
            $.post("solicitud/obtener_series", { id_solicitud_articulo: id_solicitud_articulo },
                function (data, textStatus, jqXHR) {
                    if (data.length > 0) {
                        var html = '';
                        $("#detalle-series").html("");
                        for (var i = 0; i < data.length; i++) {
                            html += '<tr>';

                            html += '   <td>' + data[i].nombreSerie + '</td>';
                            html += '   <td>' + data[i].chasis + '</td>';
                            html += '   <td>' + data[i].motor + '</td>';
                            html += '   <td>' + data[i].anio_fabricacion + '</td>';
                            html += '   <td>' + data[i].anio_modelo + '</td>';
                            html += '   <td>' + data[i].color + '</td>';
                            html += '</tr>';
                        }
                        $("#detalle-series").html(html);
                        $("#modal-series").modal("show");
                    } else {
                        AlertFactory.textType({
                            title: '',
                            message: 'No hay datos!',
                            type: 'info'
                        });
                    }
                },
                "json"
            );

        })

        $(document).on("click", ".agregar-series", function () {
            var costo = $(this).data("costo");
            var idarticulo = $(this).data("idarticulo");
            var articulo = $(this).data("articulo");
            var codigo_tr = $(this).data("id");
            var cantidad = $(this).data("cantidad");
            $("#btnSeleSerie").attr("codigo_tr", codigo_tr);
            desProductoMss.val(articulo);
            idProductoMss.val(idarticulo);
            costoAS.val(costo);
            $("#codigo-tr").val(codigo_tr);
            modalSerieR.modal('show');
            // $("#table_container_Series_Articulo").html("");
            if($("#table_container_Series_Articulo").find(".jtable-main-container").length > 0) {
                $('#table_container_Series_Articulo').jtable('destroy');
                $("#table_container_Series_Articulo").empty();
            }
            // alert(cantidad);
            $("#cantProductoMss").val(cantidad);
            $("#cantProductoMss").focus();
            $("#cantProductoMss").select();
        });


        $(document).on("change", "#IdMoneda", function () {
            if ($(this).val() != "") {

                var simbolo = $(this).find("option[value=" + $(this).val() + "]").data("simbolo");
                // alert("hola " + simbolo);
                $(".simbolo-moneda").text(simbolo);
            }
        })

        function calcular_totales_detalle(codigo, impuesto_articulo) {
            var porcentaje_descuento = 0;
            var monto_descuento = 0;
            // var tipo_descuento = $(this).val();
            // var codigo = $(this).attr("codigo");
            // var impuesto_articulo = $(this).attr("impuesto_articulo");
            var idtipo = "";
            var descuento = 0;

            var precio_total = parseFloat($(".m_articulo_precioTotal[codigo='" + codigo + "']").val());
            var copergrat = $(".m_articulo_precioTotal[codigo='" + codigo + "']").attr("copergrat");
            // console.log("ccopergrat: ",copergrat);
            // console.log("precio_total => "+precio_total);

            if (typeof precio_total == "undefined") {
                precio_total = 0;
            }

            //PRORRATEO EN CASO DE EXISTIR DESCUENTO SOBRE EL TOTAL
            var descuento_total = (!isNaN(parseFloat($("#t_monto_descuento").val()))) ? parseFloat($("#t_monto_descuento").val()) : 0;
            var monto_descuento_prorrateado = 0;

            var sum_precios = 0;
            $.each($("input[name='precio_unitario[]']"), function (indexInArray, precio_unitario) {
                // alert(typeof nOperGratuita.value);
                sum_precios += parseFloat(precio_unitario.value);

            });

            monto_descuento_prorrateado = precio_total * descuento_total / sum_precios;
            // alert(monto_descuento_prorrateado);
            $("input[name='monto_descuento_prorrateado[]'][codigo=" + codigo + "]").val(monto_descuento_prorrateado.toFixed(decimales_redondeo));
            $(".monto_descuento_prorrateado[codigo=" + codigo + "]").find("p").text(monto_descuento_prorrateado.toFixed(decimales_redondeo));

            var dom_descuento = $("#descuento_" + codigo);

            if (dom_descuento.val() != "") {
                porcentaje_descuento = parseFloat(dom_descuento.find("option[value=" + dom_descuento.val() + "]").attr("nPorcDescuento"));
                monto_descuento = parseFloat(dom_descuento.find("option[value=" + dom_descuento.val() + "]").attr("nMonto"));
                idtipo = dom_descuento.find("option[value=" + dom_descuento.val() + "]").attr("idtipo");
            }

            // alert(precio_total);
            if (idtipo == "P") {

                descuento = precio_total * porcentaje_descuento / 100;
            } else {
                descuento = monto_descuento;
            }

            if (isNaN(descuento)) {
                descuento = 0;
            }

            // console.log("descuento: "+descuento);
            // alert(descuento);
            if (isNaN(porcentaje_descuento)) {
                porcentaje_descuento = 0;
            }
            // console.log("porcentaje_descuento => "+porcentaje_descuento);
            $("#preMs_" + codigo).val(porcentaje_descuento);
            $("#preMs_" + codigo).siblings("p").text(porcentaje_descuento.toString());

            $(".m_articulo_montoDescuento[codigo='" + codigo + "']").val(descuento.toFixed(decimales_redondeo));
            $(".m_articulo_montoDescuento[codigo='" + codigo + "']").siblings("p").text(descuento.toFixed(decimales_redondeo));

            var nuevo_total = 0;

            // alert(nuevo_total);

            var monto_exonerado = 0;
            var monto_afecto = 0;
            // var monto_inafecto = 0;
            var impuestos = 0;
            var valor_igv = parseFloat($("#valor_igv").val());
            var monto_subtotal = 0;
            var monto_subtotal_sin_descuento_prorrateado = 0;
            // console.log(copergrat);
            if(copergrat != "S") {
                nuevo_total = precio_total - descuento - monto_descuento_prorrateado;
                monto_subtotal = nuevo_total;
                if (impuesto_articulo == "0") {
                    monto_exonerado = nuevo_total;
                } else {
                    monto_afecto = nuevo_total;
                    impuestos = nuevo_total * valor_igv / 100;
                    nuevo_total = nuevo_total + impuestos;
                }

                monto_subtotal_sin_descuento_prorrateado = precio_total - descuento;
            }


            $("input[name='monto_exonerado[]'][codigo=" + codigo + "]").val(monto_exonerado.toFixed(decimales_redondeo));
            $(".monto_exonerado[codigo=" + codigo + "]").find("p").text(monto_exonerado.toFixed(decimales_redondeo));

            $("input[name='monto_subtotal[]'][codigo=" + codigo + "]").val(monto_subtotal.toFixed(decimales_redondeo));
            $("input[name='monto_subtotal_sin_descuento_prorrateado[]'][codigo=" + codigo + "]").val(monto_subtotal_sin_descuento_prorrateado.toFixed(decimales_redondeo));

            if (isNaN(monto_subtotal)) {
                monto_subtotal = 0;
            }


            $(".monto_subtotal[codigo=" + codigo + "]").find("p").text(monto_subtotal.toFixed(decimales_redondeo));

            $("input[name='monto_afecto[]'][codigo=" + codigo + "]").val(monto_afecto.toFixed(decimales_redondeo));
            $(".monto_afecto[codigo=" + codigo + "]").find("p").text(monto_afecto.toFixed(decimales_redondeo));

            $("input[name='impuestos[]'][codigo=" + codigo + "]").val(impuestos.toFixed(decimales_redondeo));
            $(".impuestos[codigo=" + codigo + "]").find("p").text(impuestos.toFixed(decimales_redondeo));

            $(".total[codigo=" + codigo + "]").find("p").text(nuevo_total.toFixed(decimales_redondeo));
            $("input[name='monto_total[]'][codigo=" + codigo + "]").val(nuevo_total.toFixed(decimales_redondeo));

        }

        $(document).on("change", ".select_descuento", function () {

            totalDescuento.trigger("change");

        });

        totalDescuento.change(function () {
            // var codigo=$(this).attr('data-desc');
            var val = $(this).val();
            var idtipo = "";
            var porTotal = 0.0;
            var code = "";
            var porc = 0;
            var mont = 0;
            if (val == "" || val == null) {

                porcentajeTotal.val(0);
                $("#t_monto_descuento").val(0);


            } else {
                // console.log(val);
                var arrayRe = val.split("*");
                code = arrayRe[0];
                porc = parseFloat(arrayRe[1]);
                mont = parseFloat(arrayRe[2]);
                // alert();


            }

            var total_sin_descuento_prorrateado = 0;

            $.each($("input[name='monto_subtotal_sin_descuento_prorrateado[]']"), function (indexInArray, monto_subtotal_sin_descuento_prorrateado) {

                total_sin_descuento_prorrateado += parseFloat(monto_subtotal_sin_descuento_prorrateado.value);

            });

            // alert(total_sin_descuento_prorrateado);

            idtipo = $(this).find("option[value='" + $(this).val() + "']").attr("idtipo");
            if (idtipo == "P") {

                porTotal = Number((Number(porc) * Number(total_sin_descuento_prorrateado)) / 100);
            } else {
                porTotal = mont;
            }

            // alert("desc " + porTotal.toFixed(decimales_redondeo));
            $("#porcentajeTotal").val(porc);
            $("#t_monto_descuento").val(porTotal.toFixed(decimales_redondeo));

            // var totalDes = parseFloat($("#desTotal").attr("importe_original"));
            // totalDes = Number(totalDes);

            // totalDes = totalDes - porTotal;

            // desTotal.val(totalDes.toFixed(decimales_redondeo));
            if($("#tipo_sol").val() == "N") {
                calcular_totales();
            }
            // $("#tipo_solicitud").trigger("change");
            // $("#cuota_inicial").trigger("keyup");
            // $("#nro_cuotas").trigger("keyup");

        });

        $(document).on("keyup", ".m_articulo_cantidad", function () {
            var cantidad = parseInt($(this).val());
            if (isNaN(cantidad)) {
                cantidad = 0;
            }

            var codigo = $(this).attr("codigo");
            var precio = parseFloat($("#precio_unitario_" + codigo).val());
            var precio_total = cantidad * precio;
            var costo = parseFloat($("#costo_" + codigo).val());


            var costo_total = cantidad * costo;
            // alert(precio_total);
            $("#costo_total_" + codigo).val(costo_total);
            $(".m_articulo_precioTotal[codigo='" + codigo + "']").val(precio_total.toFixed(decimales_redondeo));
            $(".m_articulo_precioTotal[codigo='" + codigo + "']").siblings("p").text(precio_total.toFixed(decimales_redondeo));
            $(".select_descuento").trigger("change");
        })

        function calcular_totales() {
            // console.log("hola s");
            // console.log($("input[name='monto_subtotal[]']").val());
            var t_monto_descuento = 0;
            var t_monto_subtotal = 0;
            var t_monto_exonerado = 0;
            var t_monto_afecto = 0;
            var t_monto_inafecto = 0;
            var t_impuestos = 0;
            var t_total = 0;
            var t_nOperGratuita = 0;


            $.each($("input[name='precio_unitario[]']"), function (indexInArray, precio_unitario) {
                // alert(typeof nOperGratuita.value);
                var codigo = precio_unitario.getAttribute("codigo");
                var impuesto_articulo = precio_unitario.getAttribute("impuesto_articulo");
                // console.log(precio_unitario);
                calcular_totales_detalle(codigo, impuesto_articulo);

            });

            $.each($("input[name='monto_descuento[]']"), function (indexInArray, monto_descuento) {
                t_monto_descuento += parseFloat(monto_descuento.value);

            });

            $.each($("input[name='monto_subtotal[]']"), function (indexInArray, monto_subtotal) {
                t_monto_subtotal += parseFloat(monto_subtotal.value);
            });

            $.each($("input[name='monto_exonerado[]']"), function (indexInArray, monto_exonerado) {
                t_monto_exonerado += parseFloat(monto_exonerado.value);
            });

            $.each($("input[name='monto_afecto[]']"), function (indexInArray, monto_afecto) {
                t_monto_afecto += parseFloat(monto_afecto.value);
            });

            $.each($("input[name='monto_inafecto[]']"), function (indexInArray, monto_inafecto) {
                t_monto_inafecto += parseFloat(monto_inafecto.value);
            });

            $.each($("input[name='impuestos[]']"), function (indexInArray, impuestos) {
                t_impuestos += parseFloat(impuestos.value);
            });

            $.each($("input[name='monto_total[]']"), function (indexInArray, total) {
                t_total += parseFloat(total.value);
                // alert(t_total);
            });

            $.each($("input[name='nOperGratuita[]']"), function (indexInArray, nOperGratuita) {
                // alert(typeof nOperGratuita.value);
                t_nOperGratuita += parseFloat(nOperGratuita.value);
            });
            // alert(t_nOperGratuita);
            if (isNaN(t_nOperGratuita)) {
                t_nOperGratuita = 0;
            }




            var descuento_total = (!isNaN(parseFloat($("#t_monto_descuento").val()))) ? parseFloat($("#t_monto_descuento").val()) : 0;



            // if(descuento_total > 0) {
            //     // alert(descuento_total);
            //     $.each($("input[name='precio_unitario[]']"), function (indexInArray, monto_descuento_prorrateo) {
            //         // alert(typeof nOperGratuita.value);
            //         var codigo = monto_descuento_prorrateo.getAttribute("codigo");
            //         // console.log(codigo);
            //         $(".select_descuento[codigo='"+codigo+"']").trigger("change");
            //     });
            // }

            // TOTALES CREDITO

            var monto_venta = t_total;
            var cuota_inicial = (!isNaN(parseFloat($("#cuota_inicial").val()))) ? parseFloat($("#cuota_inicial").val()) : 0;
            // alert(monto_venta);
            if ($("#tipo_solicitud").val() != "1") {
                $("#monto_venta").val(monto_venta.toFixed(decimales_redondeo));
                $("#cuota_inicial").attr("max", monto_venta.toFixed(decimales_redondeo));
                var total_financiado = monto_venta - cuota_inicial;
                $("#total_financiado").val(total_financiado.toFixed(decimales_redondeo));
            }

            // MONTOS TOTALES DEL DETALLE
            $("#monto_descuento_detalle").val(t_monto_descuento.toFixed(decimales_redondeo));
            $("#subtotal_detalle").val(t_monto_subtotal.toFixed(decimales_redondeo));
            $("#monto_exonerado_detalle").val(t_monto_exonerado.toFixed(decimales_redondeo));
            $("#monto_afecto_detalle").val(t_monto_afecto.toFixed(decimales_redondeo));
            $("#monto_inafecto_detalle").val(t_monto_inafecto.toFixed(decimales_redondeo));
            $("#impuestos_detalle").val(t_impuestos.toFixed(decimales_redondeo));
            $("#monto_total_detalle").val(t_total.toFixed(decimales_redondeo));


            // TOTALES FINALES
            var intereses = (!isNaN(parseFloat($("#intereses").val()))) ? parseFloat($("#intereses").val()) : 0;

            t_monto_subtotal = intereses + t_monto_subtotal;
            $("#t_monto_subtotal").val(t_monto_subtotal.toFixed(decimales_redondeo)); // antes
            console.log(t_monto_subtotal);
            // alert("d" + t_monto_subtotal);
            // $("#t_monto_subtotal").val(t_monto_subtotal.toFixed(decimales_redondeo));

            var monto_exonerado = 0;
            var monto_afecto = 0;
            var valor_igv = 0;
            var impuestos = 0;
            var total = 0;

            if (t_impuestos > 0) {
                valor_igv = parseFloat($("#valor_igv").val());
                impuestos = t_monto_subtotal * valor_igv / 100;
                monto_afecto = t_monto_subtotal;
            } else {
                monto_exonerado = t_monto_subtotal;
            }


            $("#t_monto_exonerado").val(monto_exonerado.toFixed(decimales_redondeo));
            $("#t_monto_afecto").val(monto_afecto.toFixed(decimales_redondeo));
            $("#t_monto_inafecto").val(t_monto_inafecto.toFixed(decimales_redondeo));
            $("#t_impuestos").val(impuestos.toFixed(decimales_redondeo));

            total = monto_exonerado + monto_afecto + t_monto_inafecto + impuestos;
            $("#desTotal").val(total.toFixed(decimales_redondeo));
            // $("#desTotal").attr("importe_original", total.toFixed(decimales_redondeo));
            $("#t_nOperGratuita").val(t_nOperGratuita.toFixed(decimales_redondeo));
            // console.log(t_monto_descuento, t_monto_subtotal, t_monto_exonerado, t_monto_afecto, t_monto_inafecto, t_impuestos, t_total);


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

        function obtener_lotes(codigo) {
            var idLoteSele = $("#lote_" + codigo);
            idLoteSele.append('<option value="" selected>Seleccionar</option>');
            _.each(LotesSele, function (item) {
                idLoteSele.append('<option  value="' + item.idLote + '" >' + item.Lote + '</option>');
            });
        }

        function obtener_descuentos(codigo, idarticulo) {
            var idDescSele = $("#descuento_" + codigo);
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
            idDescSele.append('<option value="" selected>Seleccionar</option>');
            _.each(DescuentosSele, function (item) {
                // console.log(item);
                // idDescSele.append('<option nPorcDescuento="' + item.nPorcDescuento + '" nMonto="' + item.nMonto + '" idTipo="' + item.idTipo + '" value="' + item.id + '" >' + item.descripcion + '</option>');

                var mo = idMoneda.val();
                var por = Number(item.nPorcDescuento);
                var monto = Number(item.nMonto);

                if (item.cTipoAplica == 'T' && descuentos_agregados.indexOf(item.id) == -1) {

                    if ((item.idMoneda == mo || item.nPorcDescuento != 0) && (item.nSaldoUso > 0 || item.nLimiteUso == 0) && item.cTipoAplica == 'L') {
                        if (item.dFecIni <= actu && item.dFecFin > actu) {
                            var valDes = item.id + '*' + por + '*' + monto;
                            // console.log(valDes,idDescuento);
                            // if(valDes==idDescuento){
                            //     selectDescuento.append('<option value="'+item.id+'*'+por+'*'+monto+'" selected>'+item.descripcion+'</option>');
                            // }else{
                            idDescSele.append('<option nPorcDescuento="' + item.nPorcDescuento + '" nMonto="' + item.nMonto + '" idTipo="' + item.idTipo + '" value="' + item.id + '" >' + item.descripcion + '</option>');
                            // }


                        }
                    }
                } else {

                    if(item.cTipoAplica == 'L' && descuentos_agregados.indexOf(item.id) == -1) {
                        if(item.todos_articulos == "N") {

                            if (item.nIdProducto == idarticulo ) {

                                if ((item.idMoneda == mo || item.nPorcDescuento != 0) && (item.nSaldoUso > 0 || item.nLimiteUso == 0)) {
                                    if (item.dFecIni <= actu && item.dFecFin > actu) {
                                        var valDes = item.id + '*' + por + '*' + monto;

                                        idDescSele.append('<option nPorcDescuento="' + item.nPorcDescuento + '" nMonto="' + item.nMonto + '" idTipo="' + item.idTipo + '" value="' + item.id + '" >' + item.descripcion + '</option>');
                                        // }


                                    }
                                }
                            }
                        } else {
                            if ((item.idMoneda == mo || item.nPorcDescuento != 0) && (item.nSaldoUso > 0 || item.nLimiteUso == 0)) {
                                if (item.dFecIni <= actu && item.dFecFin > actu) {
                                    var valDes = item.id + '*' + por + '*' + monto;

                                    idDescSele.append('<option nPorcDescuento="' + item.nPorcDescuento + '" nMonto="' + item.nMonto + '" idTipo="' + item.idTipo + '" value="' + item.id + '" >' + item.descripcion + '</option>');


                                }
                            }
                        }
                    }
                }

                descuentos_agregados.push(item.id);
            });
        }



        function getLocaStock(idl, ident, idPrAl, idLocalizacion) {
            naturalezaGeneral = "S";
            var idLocali = $("#" + ident);
            var id = idl;
            // alert(id);
            RESTService.get('solicitud/getLocaStock', id, function (response) {
                if (!_.isUndefined(response.status) && response.status) {

                    idLocali.html('');
                    idLocali.append('<option value="" selected>Seleccionar</option>');
                    _.each(response.LocalizacionAlmacen, function (itemdos) {

                        var stock = 0;
                        _.each(response.data, function (item) {
                            // console.table(item);
                            // if(item.idArticulo == 11) {
                            // console.log("lasttt " +idPrAl);
                            // console.log(idPrAl +"=="+ item.idArticulo +"&&"+ itemdos.idLocalizacion +"=="+ item.idLocalizacion);
                            if (idPrAl == item.idArticulo && itemdos.idLocalizacion == item.idLocalizacion) {
                                // alert("hola");
                                stock = Math.trunc(item.total);
                            }
                            // }

                        });

                        // console.log("hola", naturalezaGeneral);
                        if (naturalezaGeneral == "S") {
                            // console.log("stock: "+ stock);
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

                    if ($("#tipo_solicitud").val() == "1") {
                        if (naturalezaGeneral != 'C') {

                            AlertFactory.textType({
                                title: '',
                                message: 'No se pudo obtener las Localizaciones. Intente nuevamente.',
                                type: 'info'
                            });
                        }
                    }

                }

            });
        }
        $scope.datos_credito = function () {
            // $("#idconyugue").focus();


            if (articulo_mov_det.html() == "") {
                AlertFactory.textType({
                    title: '',
                    message: 'Debe ingresar al menos un articulo al detalle!',
                    type: 'info'
                });
                return false;
            }

            $("#modal-creditos").modal("show");
        }

        $(document).on("keyup", "#cuota_inicial", function () {
            var cuota_inicial = parseFloat($(this).val());
            var monto_venta = parseFloat($("#monto_venta").val());
            if (isNaN(cuota_inicial)) {
                cuota_inicial = 0;
            }
            if(cuota_inicial >= monto_venta) {
                $("#cuota_inicial").val("");
                AlertFactory.textType({
                    title: '',
                    message: 'La cuota inicial no debe ser mayor que el monto de la venta!',
                    type: 'info'
                });
                return false;

            }
            // var total_financiado = monto_venta - cuota_inicial;
            // $("#total_financiado").val(total_financiado.toFixed(decimales_redondeo));
            $("#nro_cuotas").trigger("keyup");
        });

        $(document).on("keyup", "#nro_cuotas", function () {
            var nro_cuotas = parseFloat($(this).val());
            var total_financiado = parseFloat($("#total_financiado").val());
            if (isNaN(nro_cuotas)) {
                nro_cuotas = 0;
            }

            $.post("solicitud/factor_credito", { nro_cuotas: nro_cuotas },
                function (data, textStatus, jqXHR) {

                    if($("#tipo_sol").val() == "N") {
                        calcular_totales();
                    }

                    var porcentaje = 0;
                    var intereses = 0;
                    var valor_cuota = 0;

                    if (data.length > 0) {
                        porcentaje = parseFloat(data[0].porcentaje);
                    }

                    if (porcentaje > 0) {

                        valor_cuota = total_financiado * porcentaje;
                    } else {
                        valor_cuota = total_financiado / nro_cuotas;
                    }
                    // console.log(valor_cuota);
                    if (porcentaje > 0) {

                        intereses = (Math.ceil(valor_cuota) * nro_cuotas) - total_financiado;
                    }
                    // console.log(intereses);
                    $("#valor_cuota").val(Math.ceil(valor_cuota));
                    var nuevo_total = parseFloat($("#desTotal").val());

                    // CALCULAR NUEVO IGV PARA VALOR CUOTA FINAL IGV
                    var t_impuestos = (!isNaN(parseFloat($("#t_impuestos").val()))) ? parseFloat($("#t_impuestos").val()) : 0;

                    var valor_igv = parseFloat($("#valor_igv").val());
                    var valor_cuota_final = Math.ceil(valor_cuota);


                    if (t_impuestos > 0) {
                        valor_cuota_final = valor_cuota_final + (valor_cuota_final * valor_igv / 100);
                    }


                    $("#intereses").val(intereses.toFixed(decimales_redondeo));
                    $("#valor_cuota_final").val(valor_cuota_final.toFixed(decimales_redondeo));
                    nuevo_total += intereses;
                    $("#desTotal").val(nuevo_total.toFixed(decimales_redondeo));
                    // $("#desTotal").attr("importe_original", nuevo_total.toFixed(decimales_redondeo));
                    totalDescuento.trigger("change");
                },
                "json"
            );

        });

        $scope.guardar_solicitud = function () {
            // alert($("#ingreso_neto_mensual").val());
            // return false;
            var bval = true;
            bval = bval && cCodConsecutivo.required();

            bval = bval && idMoneda.required();
            bval = bval && $("#tipo_solicitud").required();
            bval = bval && idvendedor.required();
            bval = bval && documento_or.required();

            if ($("#tipo_solicitud").val() == "2") {
                bval = bval && $("#cuota_inicial").required();
                bval = bval && $("#nro_cuotas").required();
                bval = bval && $("#valor_cuota").required();
                bval = bval && $("#valor_cuota_final").required();
            }
            // alert($("#tipo_solicitud").val());
            if ($("#tipo_solicitud").val() == "3") {
                bval = bval && $("#idconvenio").required();
            }

            if ($("#tipo_solicitud").val() == "4") {
                bval = bval && $("#condicion_pago").required();
            }

            if ($("#tipo_solicitud").val() == "2" && $("#ingreso_neto_mensual").val() == "") {
                AlertFactory.textType({
                    title: '',
                    message: 'Por Favor Ingrese los datos del credito: ',
                    type: 'info'
                });
                return false;
            }
            bval = bval && $("#fecha_vencimiento").required();

            if (bval) {

                if ($("#tipo_solicitud").val() == "1") {
                    var cont = 0;
                    $.each($("select[name='idalmacen[]']"), function (indexInArray, idalmacen) {
                        var type_id = $(this).parent("td").parent("tr").attr("type_id");

                        if (idalmacen.value == "" && type_id != 2) { // no valida para type_id que son servicios
                            idalmacen.classList.add("border-red");
                            idalmacen.focus();
                            cont++;

                        }
                    });

                    $.each($("select[name='idlocalizacion[]']"), function (indexInArray, idlocalizacion) {
                        // console.log(idlocalizacion);
                        var type_id = $(this).parent("td").parent("tr").attr("type_id");
                        if (idlocalizacion.value == "" && type_id != 2) { // no valida para type_id que son servicios
                            idlocalizacion.classList.add("border-red");
                            idlocalizacion.focus();
                            cont++;

                        }
                    });

                    $.each($("select[name='idlote[]']"), function (indexInArray, idlote) {
                        // console.log(idlote);
                        var lote_articulo = idlote.getAttribute("lote_articulo");
                        if (lote_articulo == "1" && idlote.value == "") {
                            idlote.classList.add("border-red");
                            idlote.focus();
                            cont++;

                        }
                    });

                    // validacion de serie
                    // var articulos_id = $("input[name='idarticulo[]']");
                    // var series_id = $("input[name='series_id[]']");
                    // // console.log(articulos_id);
                    // for (var ar = 0; ar < articulos_id.length; ar++) {
                    //     // console.log(articulos_id[ar]);
                    //     var posee_serie = articulos_id[ar].getAttribute("posee-serie");
                    //     var cantidad = articulos_id[ar].getAttribute("cantidad");
                    //     var producto = articulos_id[ar].getAttribute("producto");
                    //     if (posee_serie == "1") {
                    //         // console.log(series_id);
                    //         // console.log(ar, series_id[ar]);
                    //         // alert(typeof series_id[ar] == "undefined");
                    //         // alert(series_id[ar]);
                    //         if (typeof series_id[ar] == "undefined" || series_id[ar].value == "0" || series_id[ar].value == "") {
                    //             // console.log(series_id[ar]);
                    //             AlertFactory.textType({
                    //                 title: '',
                    //                 message: 'Por Favor Agregue las series del producto: ' + producto,
                    //                 type: 'info'
                    //             });

                    //             return false;
                    //         } else {

                    //             var cant = series_id[ar].value.split(",");

                    //             if (cant.length != cantidad) {
                    //                 AlertFactory.textType({
                    //                     title: '',
                    //                     message: 'Por Favor Agregue la cantidad de ' + cantidad + ' series del producto: ' + producto,
                    //                     type: 'info'
                    //                 });

                    //                 return false;
                    //             }
                    //         }
                    //     }

                    // }
                    // return false;
                }
                // alert(cont);
                if (cont > 0) {

                    return false;
                }


                if($("#nConsecutivo").val() != "" && $("#estado").val() != "4") {
                    $(".m_articulo_idAlm").removeAttr("disabled");
                    $(".m_articulo_idLoc").removeAttr("disabled");
                    $(".select_lote").removeAttr("disabled");
                    $(".select_descuento").removeAttr("disabled");
                }

                $(".btn_guardarOrden").attr("disabled", "disabled");

                $.post("solicitud/guardar_solicitud", $("#formulario-solicitud").serialize() + "&" + $("#formulario-creditos").serialize() + "&cCodConsecutivo=" + cCodConsecutivo.val() + "&tipo_solicitud=" + $("#tipo_solicitud").val() + "&idmoneda=" + $("#IdMoneda").val() + "&id_tipoDoc_Venta_or_solicitud=" + $("#id_tipoDoc_Venta_or_solicitud").val() + "&idvendedor=" + $("#idvendedor").val() + "&descuento_id=" + $("#totalDescuento").val()+ "&estado=" + $("#estado").val(),
                    function (data, textStatus, jqXHR) {

                        $(".btn_guardarOrden").removeAttr("disabled");
                        // console.log("nConsecutivo " +$("#nConsecutivo").val() );
                        // console.log("estado " +$("#estado").val()  );
                        if($("#nConsecutivo").val() != "" && $("#estado").val() != "4") {
                            // console.log("disactivar de nuvoooo");
                            $(".m_articulo_idAlm").attr("disabled", "disabled");
                            $(".m_articulo_idLoc").attr("disabled", "disabled");
                            $(".select_lote").attr("disabled", "disabled");
                            $(".select_descuento").attr("disabled", "disabled");
                        }

                        if (data.status == "i" || data.status == "m") {

                            if(data.status == "i") {
                                AlertFactory.textType({
                                    title: '',
                                    message: 'La solicitud se registró correctamente.',
                                    type: 'success'
                                });
                            }

                            if(data.status == "m") {
                                AlertFactory.textType({
                                    title: '',
                                    message: 'La solicitud se modificó correctamente.',
                                    type: 'success'
                                });
                            }

                            LoadRecordsButtonSolicitud.click();
                            $("#nConsecutivo").val(data.datos[0].nConsecutivo);
                            $("#estado").val(data.datos[0].estado);

                            $(".enviar_solicitud").show();
                            $(".copiar-solicitud").show();
                            $(".separaciones").show();
                            $(".imprimir-solicitud").show();
                            $(".imprimir-clausula-solicitud").show();

                            if (data.datos[0].estado == "1" || data.datos[0].estado == "2" || data.datos[0].estado == "3" || data.datos[0].estado == "4") {


                                $(".cancelar-solicitud").show();
                            } else {
                                $(".cancelar-solicitud").hide();
                            }

                            $("#idventa").empty();
                            $("#idventa").append('<option value="">Seleccionar</option>');
                            _.each(data.separaciones, function (item) {
                                $("#idventa").append('<option value="' + item.idventa + '|'+item.serie_comprobante+'|'+item.numero_comprobante+'|'+item.t_monto_total+'">' + item.serie_comprobante + '-'+item.numero_comprobante+'</option>');
                            });
                            $("#idventa").select2();

                            if($("#tipo_solicitud").val() == "4") {
                                $(".separaciones").hide();
                            }

                        } else {
                            AlertFactory.textType({
                                title: '',
                                message: data.msg,
                                type: 'info'
                            });
                        }

                    },
                    "json"
                );
            }
        }

        $scope.mostrar_aprobaciones = function () {
            var bval = true;
            bval = bval && cCodConsecutivo.required();
            bval = bval && nConsecutivo.required();

            if (bval) {
                $.post("solicitud/mostrar_aprobaciones", { cCodConsecutivo: cCodConsecutivo.val(), nConsecutivo: nConsecutivo.val() },
                    function (data, textStatus, jqXHR) {
                        if (data.length > 0) {
                            var html = '';
                            $("#detalle-aprobaciones").html("");
                            for (var i = 0; i < data.length; i++) {
                                html += '<tr>';
                                // html += '   <td>' + data[i].aprobacion + '</td>';
                                // html += '   <td>' + data[i].nOrden + '</td>';
                                // html += '   <td>' + data[i].usuario + '</td>';
                                // html += '   <td>' + data[i].dFecReg + '</td>';
                                // html += '   <td>' + data[i].iEstado + '</td>';
                                // html += '   <td>' + data[i].cObservacion + '</td>';

                                html += '   <td>' + data[i].usuario + '</td>';
                                html += '   <td>' + data[i].nombre_usuario + '</td>';
                                html += '   <td>' + data[i].iEstado + '</td>';
                                html += '   <td>' + data[i].cObservacion + '</td>';
                                html += '   <td>' + data[i].dFecReg + '</td>';
                                html += '   <td>' + data[i].updated_at + '</td>';
                                html += '</tr>';
                            }
                            $("#detalle-aprobaciones").html(html);
                            $("#modal-aprobaciones").modal("show");
                        } else {
                            AlertFactory.textType({
                                title: '',
                                message: 'No hay datos!',
                                type: 'info'
                            });
                        }
                    },
                    "json"
                );
            }
        }

        $scope.imprimir_solicitud = function () {

            var cCodConsecutivo = $("#cCodConsecutivo").val();
            var nConsecutivo = $("#nConsecutivo").val();

            var id = cCodConsecutivo + "|" + nConsecutivo;

            window.open("solicitud/imprimir_solicitud/" + id);

        }

        $scope.imprimir_clausula_solicitud = function () {

            var cCodConsecutivo = $("#cCodConsecutivo").val();
            var nConsecutivo = $("#nConsecutivo").val();

            var id = cCodConsecutivo + "|" + nConsecutivo;
            // alert(id);

            window.open("solicitud/imprimir_clausula_solicitud/" + id);

        }

        $scope.imprimir_cronograma = function () {

            var cCodConsecutivo = $("#cCodConsecutivo").val();
            var nConsecutivo = $("#nConsecutivo").val();

            var id = cCodConsecutivo + "|" + nConsecutivo;
            window.open("solicitud/imprimir_cronograma/" + id);

        }

        $scope.cancelar_solicitud = function () {

            var cCodConsecutivo = $("#cCodConsecutivo").val();
            var nConsecutivo = $("#nConsecutivo").val();

            var cuota_inicial = parseFloat($("#cuota_inicial").val());
            var estado = $("#estado").val();
            if(isNaN(cuota_inicial)) {
                cuota_inicial = 0;
            }

            if((estado == "3" || estado == "4") && cuota_inicial > 0) {
                AlertFactory.textType({
                    title: '',
                    message: "Debe anular el documento de venta de la cuota inicial!",
                    type: 'info'
                });
                return false;
            }


            $.post("solicitud/anular_solicitud", { cCodConsecutivo: cCodConsecutivo, nConsecutivo: nConsecutivo},
                function (data, textStatus, jqXHR) {


                    if (data.status == "m") {

                        $("#estado").val(data.datos[0].estado);
                        AlertFactory.textType({
                            title: '',
                            message: 'La solicitud se anuló correctamente.',
                            type: 'success'
                        });

                    } else {
                        AlertFactory.textType({
                            title: '',
                            message: data.msg,
                            type: 'info'
                        });
                    }
                },
                "json"
            );



        }

        $scope.agregar_separaciones = function () {
            $(".agregar-separacion").attr("disabled", "disabled");
            $(".guardar-separaciones").attr("disabled", "disabled");
            $("#idventa").prop("disabled", true);

            $.post("solicitud/obtener_separaciones", { cCodConsecutivo: cCodConsecutivo.val(), nConsecutivo: nConsecutivo.val() },
                function (data, textStatus, jqXHR) {

                    $("#detalle-separaciones").empty();
                    // console.log(data);
                    if(data.length > 0) {
                        var html = "";
                        for (var index = 0; index < data.length; index++) {
                            html += '<tr>';
                            html += '<td>'+data[index].serie_comprobante+'</td>';
                            html += '<td>'+data[index].numero_comprobante+'</td>';
                            html += '<td>'+data[index].t_monto_total+'</td>';

                            if($("#estado").val() == "1" || $("#estado").val() == "") {
                                html += '<td><center><button title="Eliminar Separación" type="button" class="eliminar-separacion btn btn-danger btn-xs"><i class="fa fa-trash"></i></button></center></td>';
                            } else{

                                html += '<td>-.-</td>';
                            }

                            html += '</tr>';


                        }
                        $("#detalle-separaciones").html(html);
                    } else {

                    }

                    if($("#estado").val() == "1" || $("#estado").val() == "") {
                        $(".agregar-separacion").removeAttr("disabled");
                        $(".guardar-separaciones").removeAttr("disabled");
                        $("#idventa").prop("disabled", false);
                    } else {

                    }

                },
                "json"
            );

            $("#modal-separaciones").modal("show");


        }

        $(document).on("change", "#idventa", function (e) {

        });

        $scope.agregar_separacion = function () {
            var bval = true;
            bval = bval && $("#idventa").required();

            if(bval) {

                var valor = $("#idventa").val();
                var array = valor.split("|");
                var idventa = array[0];
                var serie_comprobante = array[1];
                var numero_comprobante = array[2];
                var t_monto_total = array[3];

                var cont = 0;
                $.each($("input[name='idseparacion[]']"), function (indexInArray, valueOfElement) {

                    // console.log(valueOfElement.value +"=="+idventa);

                    if(valueOfElement.value == idventa) {
                        cont ++;
                    }

                });

                // alert(cont);
                if(cont > 0) {

                    return false;
                }

                var html = '<tr>';
                html += '<td>'+serie_comprobante+'</td>';
                html += '<td>'+numero_comprobante+'</td>';
                html += '<td>'+t_monto_total+'</td>';
                html += '<td><center><button title="Eliminar Separación" type="button" class="eliminar-separacion btn btn-danger btn-xs"><i class="fa fa-trash"></i></button></center></td>';
                html += '<input type="hidden" name="idseparacion[]" value="'+idventa+'" />';
                html += '</tr>';
                $("#detalle-separaciones").append(html);
            }

        }

        $scope.guardar_separaciones = function () {
            // alert($("#formulario-separaciones").serialize());
            $.post("solicitud/guardar_separaciones", $("#formulario-separaciones").serialize()+"&cCodConsecutivo="+cCodConsecutivo.val()+"&nConsecutivo="+nConsecutivo.val(),
                function (data, textStatus, jqXHR) {
                    if (data.status == "i") {

                        AlertFactory.textType({
                            title: '',
                            message: 'Las separaciones se guardaron correctamente!',
                            type: 'success'
                        });

                    } else {
                        AlertFactory.textType({
                            title: '',
                            message: data.msg,
                            type: 'info'
                        });
                    }
                },
                "json"
            );
        }

        $(document).on("click", ".eliminar-separacion", function (e) {
            // console.log(e);
            $(this).parent("center").parent("td").parent("tr").remove();
        });

        $scope.copy_solicitud = function () {
            var bval = true;
            bval = bval && $("#numero_solicitudes").required();
            if(bval) {
                // alert("copy_solicitud");
                $.post("solicitud/copiar_solicitud", $("#formulario-solicitud").serialize() + "&" + $("#formulario-creditos").serialize() + "&cCodConsecutivo=" + cCodConsecutivo.val() + "&tipo_solicitud=" + $("#tipo_solicitud").val() + "&idmoneda=" + $("#IdMoneda").val() + "&id_tipoDoc_Venta_or_solicitud=" + $("#id_tipoDoc_Venta_or_solicitud").val() + "&idvendedor=" + $("#idvendedor").val() + "&descuento_id=" + $("#totalDescuento").val()+ "&estado=" + $("#estado").val()+ "&numero_solicitudes=" + $("#numero_solicitudes").val(),
                    function (data, textStatus, jqXHR) {
                        // console.log(data);
                        if(data[0].return_value == "0") {
                            AlertFactory.textType({
                                title: '',
                                message: 'La solicitud se copió correctamente.',
                                type: 'success'
                            });
                        } else {
                            AlertFactory.textType({
                                title: '',
                                message: data[0].msg,
                                type: 'info'
                            });
                        }
                    },
                    "json"
                );
            }
        }

        $scope.enviar_solicitud = function () {
            var bval = true;
            bval = bval && cCodConsecutivo.required();
            bval = bval && nConsecutivo.required();
            bval = bval && $("#estado").required();


            if (bval) {


                if ($("#tipo_solicitud").val() == "1") {
                    var cont = 0;

                    var articulos_id = $("input[name='idarticulo[]']");
                    var series_id = $("input[name='series_id[]']");
                    // console.log(articulos_id);
                    for (var ar = 0; ar < articulos_id.length; ar++) {
                        // console.log(articulos_id[ar]);
                        var posee_serie = articulos_id[ar].getAttribute("posee-serie");
                        var cantidad = articulos_id[ar].getAttribute("cantidad");
                        var producto = articulos_id[ar].getAttribute("producto");
                        if (posee_serie == "1") {
                            // console.log(series_id);
                            // console.log(ar, series_id[ar]);
                            // alert(typeof series_id[ar] == "undefined");
                            // alert(series_id[ar]);
                            if (typeof series_id[ar] == "undefined" || series_id[ar].value == "0" || series_id[ar].value == "") {
                                // console.log(series_id[ar]);
                                AlertFactory.textType({
                                    title: '',
                                    message: 'Por Favor Agregue las series del producto: ' + producto,
                                    type: 'info'
                                });

                                return false;
                            } else {

                                var cant = series_id[ar].value.split(",");

                                if (cant.length != cantidad) {
                                    AlertFactory.textType({
                                        title: '',
                                        message: 'Por Favor Agregue la cantidad de ' + cantidad + ' series del producto: ' + producto,
                                        type: 'info'
                                    });

                                    return false;
                                }
                            }
                        }

                    }
                    // return false;
                }
                // alert(cont);
                if (cont > 0) {

                    return false;
                }
                // alert($("#estado").val());
                $.post("solicitud/enviar_solicitud", $("#formulario-solicitud").serialize() + "&estado=" + $("#estado").val(),
                    function (data, textStatus, jqXHR) {
                        if (data.status == "i") {
                            LoadRecordsButtonSolicitud.click();
                            $("#estado").val(data.datos.estado);
                            // alert($("#estado option[value='"+$("#estado").val()+"']").text());
                            AlertFactory.textType({
                                title: '',
                                message: 'La solicitud se envio correctamente. Se cambio al estado: ' + $("#estado option[value='" + $("#estado").val() + "']").text(),
                                type: 'success'
                            });
                            $(".aprobaciones").show();
                        } else {
                            AlertFactory.textType({
                                title: '',
                                message: data.msg,
                                type: 'info'
                            });
                        }


                    }, "json");
            }


        }

        $(document).on("change", "#condicion_pago", function () {
            var fecha_actual_user = Helpers.ObtenerFechaActual("user");
            var days = $("#condicion_pago option:selected").attr("days");
            var nueva_fecha = Helpers.sumarDias(days, fecha_actual_user);
            $("#fecha_vencimiento").val(Helpers.formato_fecha(nueva_fecha, "server"));
            // alert(nueva_fecha);
        })

        $(document).on("change", "#tipo_solicitud", function () {
            var tipo_solicitud = $(this).val();
            var fecha_actual = Helpers.ObtenerFechaActual("server");

            if($("#idconvenio").attr("idconvenio") == "") {
                $("#idconvenio").val("");
            }

            $(".condicion_pago").hide();
            // alert(fecha_actual);
            // alert("change " + tipo_solicitud);
            // $("#fecha_vencimiento").val("");
            if(tipo_solicitud == "1") {
                $("#fecha_vencimiento").val(fecha_actual);
            }

            if(tipo_solicitud == "4") {
                $("#fecha_vencimiento").val(fecha_actual);
                $(".condicion_pago").show();
            }

            if (tipo_solicitud == "1" || tipo_solicitud == "3") {
                $(".credito").hide();
            } else {
                $(".credito").show();
            }

            if (tipo_solicitud == "3") {
                $(".convenio").show();
                // $("#cuota_inicial").val("");
                $("#nro_cuotas").attr("readonly", "readonly");

            } else {
                if (tipo_solicitud == "2") {
                    $("#nro_cuotas").removeAttr("readonly");
                    $(".inputs-credito").removeAttr("readonly");
                }



                $(".convenio").hide();
            }

            if (tipo_solicitud != "2") {

                $(".montos-credito").val(0);
                $(".inputs-credito").attr("readonly", "readonly");
            }

            if (tipo_solicitud == "2" || tipo_solicitud == "3") {

                if($("#tipo_sol").val() == "N") {
                    calcular_totales();
                }

            }

            if (tipo_solicitud == "3") {

                $("#cuota_inicial").removeAttr("readonly");

            }
        });

        function find_solicitud(id) {
            $("#formulario-solicitud").trigger("reset");
            $("#formulario-creditos").trigger("reset");
            $("#formulario-persona").trigger("reset");
            $.post("solicitud/find", { id: id },
                function (data, textStatus, jqXHR) {
                    // console.log(data);


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
                    _.each(data.descuentos, function (item) {
                        if (item.cTipoAplica == 'T') {
                            var mo = idMoneda.val();
                            var por = Number(item.nPorcDescuento);
                            var monto = Number(item.nMonto);
                            if ((item.idMoneda == mo || item.nPorcDescuento != '0') && (item.nSaldoUso > 0 || item.nLimiteUso == '0')) {
                                if (item.dFecIni <= actu && item.dFecFin > actu) {
                                    totalDescuento.append('<option idTipo="' + item.idTipo + '" value="' + item.id + '*' + por + '*' + monto + '" >' + item.descripcion + '</option>');
                                }
                            }
                        }


                    });

                    $("#idventa").empty();
                    $("#idventa").append('<option value="">Seleccionar</option>');
                    _.each(data.separaciones, function (item) {
                        $("#idventa").append('<option value="' + item.idventa + '|'+item.serie_comprobante+'|'+item.numero_comprobante+'|'+item.t_monto_total+'">' + item.serie_comprobante + '-'+item.numero_comprobante+'</option>');
                    });
                    $("#idventa").select2();


                    Helpers.set_datos_formulario("formulario-solicitud", data.solicitud[0]);
                    $("#idconvenio").attr("idconvenio", data.solicitud[0].idconvenio);
                    $("#tipo_sol").val(data.solicitud[0].tipo);
                    if (data.solicitud_credito.length > 0) {
                        Helpers.set_datos_formulario("formulario-creditos", data.solicitud_credito[0]);
                        $("#dia_vencimiento_cuota").val(data.solicitud_credito[0].dia_vencimiento_cuota);
                    }

                    $("#documento_or").val(data.solicitud[0].documento);
                    getCliente();
                    $("#tipo_solicitud").trigger("change");
                    $("#IdMoneda").trigger("change");


                    if (data.solicitud_articulo.length > 0) {
                        $("#articulo_mov_det").html("");
                        for (var i = 0; i < data.solicitud_articulo.length; i++) {

                            var arr_id_series = []
                            var arr_id_articulos = []
                            if(data.solicitud_detalle.length > 0) {
                                if(data.solicitud_articulo[i].serie == 1) {
                                    for (var isd = 0; isd < data.solicitud_detalle.length; isd++) {
                                        arr_id_series.push(data.solicitud_detalle[isd].idSerie);
                                        arr_id_articulos.push(data.solicitud_detalle[isd].idarticulo);

                                    }
                                }

                            }

                            var codigo = Math.random().toString(36).substr(2, 18);
                            // console.log("um_id => "+data.solicitud_articulo[i].um_id);
                            addArticuloTable(data.solicitud_articulo[i].idarticulo, data.solicitud_articulo[i].producto, data.solicitud_articulo[i].cantidad, 'A', codigo, 'NA', "", "", data.solicitud_articulo[i].idalmacen, data.solicitud_articulo[i].idlocalizacion, data.solicitud_articulo[i].costo, data.solicitud_articulo[i].costo_total, data.solicitud_articulo[i].precio_unitario, data.solicitud_articulo[i].precio_total, data.solicitud_articulo[i].impuesto, data.solicitud_articulo[i].lote, data.solicitud_articulo[i].cOperGrat, data.solicitud_articulo[i].iddescuento, data.solicitud_articulo[i].serie, data.solicitud_articulo[i].um_id, arr_id_series.join(","), arr_id_articulos.join(","), data.solicitud_articulo[i].type_id, data.solicitud_articulo[i].idCategoria, data.solicitud_articulo[i].descripcion_articulo, data.solicitud_articulo[i].id);

                        }
                    }

                    if (data.solicitud_credito.length > 0) {

                        $("#cuota_inicial").val(data.solicitud_credito[0].cuota_inicial);
                        $("#total_financiado").val(data.solicitud_credito[0].total_financiado);
                        $("#monto_venta").val(data.solicitud_credito[0].monto_venta);
                        $("#nro_cuotas").val(data.solicitud_credito[0].nro_cuotas);
                        $("#valor_cuota").val(data.solicitud_credito[0].valor_cuota);
                        $("#valor_cuota_final").val(data.solicitud_credito[0].valor_cuota_final);
                        $("#intereses").val(data.solicitud_credito[0].intereses);
                        $("#documento_fiador").val(data.solicitud_credito[0].documento_fiador);
                        $("#documento_conyugue").val(data.solicitud_credito[0].documento_conyugue);
                        $("#documento_fiadorconyugue").val(data.solicitud_credito[0].documento_fiadorconyugue);

                        if (data.solicitud_credito[0].documento_fiador != null) {
                            getPersona("fiador");
                        }

                        if (data.solicitud_credito[0].documento_conyugue != null) {
                            getPersona("conyugue");
                        }

                        if (data.solicitud_credito[0].documento_fiadorconyugue != null) {
                            getPersona("fiadorconyugue");
                        }

                    }

                    if (data.solicitud[0].estado == "1" || data.solicitud[0].estado == "2" || data.solicitud[0].estado == "3" || data.solicitud[0].estado == "4"  ) {

                        $(".cancelar-solicitud").show();
                    } else {
                        $(".cancelar-solicitud").hide();
                    }

                    if (data.solicitud[0].estado == "1") {
                        habilitar_inputs();
                        $(".enviar_solicitud").show();
                    } else {

                        deshabilitar_inputs();
                    }

                    // solo para credito directo
                    if (data.solicitud[0].tipo_solicitud == "2" && (data.solicitud[0].estado >= 6 || data.solicitud[0].estado == 4)) {
                        $(".imprimir-cronograma").show();
                    } else {
                        $(".imprimir-cronograma").hide();
                    }

                    if(data.solicitud[0].estado == "2") { // solo cuando es vigente se activa
                        $("#comentario_facturacion").removeAttr("readonly");

                    } else {
                        $("#comentario_facturacion").attr("readonly", "readonly");

                    }

                    if(data.solicitud[0].estado <= 8) {
                        $("#descripcion_adicional_clausula").removeAttr("readonly");
                    } else {
                        $("#descripcion_adicional_clausula").attr("readonly", "readonly");
                    }

                    $("#tipo_sol").val(data.solicitud[0].tipo);
                    $(".aprobaciones").show();
                    $(".copiar-solicitud").show();
                    $(".separaciones").show();
                    $(".imprimir-solicitud").show();
                    $(".imprimir-clausula-solicitud").show();
                    // alert($("#tipo_solicitud").val());
                    if($("#tipo_solicitud").val() == "4") {
                        $(".separaciones").hide();
                    }
                    $("#modalSolicitud").modal("show");
                },
                "json"
            );
        }

        function habilitar_inputs() {

            $("#agregar-articulo").show();
            $("#btn_editar_cliente").show();

            $("#btn_editar_conyugue").show();
            $("#btn_editar_fiador").show();
            $("#btn_editar_fiadorconyugue").show();


            $("#cCodConsecutivo").removeAttr("disabled");
            $("#IdMoneda").removeAttr("disabled");
            // $("#id_tipoDoc_Venta_or_solicitud").removeAttr("disabled");
            $("#tipo_solicitud").removeAttr("disabled");
            $("#idconvenio").removeAttr("disabled");
            $("#idvendedor").removeAttr("disabled");
            $("#totalDescuento").removeAttr("disabled");

            $("#fecha_vencimiento").removeAttr("readonly");
            $("#documento_or").removeAttr("readonly");
            $("#comentarios").removeAttr("readonly");

            $("#formulario-creditos").find("input").removeAttr("readonly");
            $("#formulario-creditos").find("select").removeAttr("disabled");
            $("#condicion_pago").removeAttr("disabled");
            $(".datos-persona").attr("readonly", "readonly");
            $(".select-persona").attr("disabled", "disabled");

            $("#total_ingresos").attr("readonly", "readonly");
            $("#total_ingresos_fiador").attr("readonly", "readonly");
            $("#numero_solicitudes").val("");
            // alert("hola 2");
        }

        function deshabilitar_inputs() {

            $("#formulario-solicitud").find("input").attr("readonly", "readonly");
            $("#formulario-solicitud").find("select").attr("disabled", "disabled");
            $("#formulario-solicitud").find("textarea").attr("readonly", "readonly");
            $("#formulario-creditos").find("input").attr("readonly", "readonly");
            $("#formulario-creditos").find("select").attr("disabled", "disabled");

            $("#agregar-articulo").hide();
            $("#btn_editar_cliente").hide();
            $(".enviar_solicitud").hide();
            $("#btn_editar_conyugue").hide();
            $("#btn_editar_fiador").hide();

            $("#btn_editar_fiadorconyugue").hide();

            if ($("#estado").val() == "4") {
                $(".m_articulo_idAlm").removeAttr("disabled");
                $(".m_articulo_idLoc").removeAttr("disabled");
                // $(".select_lote").removeAttr("disabled");
            }

            $("#numero_solicitudes").removeAttr("readonly");
            $("#numero_solicitudes").val("");

        }

        function calcular_total_ingresos_comprador() {

            var ingreso_neto_mensual = 0;
            var ingreso_neto_conyugue = 0;
            var otros_ingresos = 0;
            var total_ingresos = 0;

            if (!isNaN($("#ingreso_neto_mensual").val())) {
                ingreso_neto_mensual = parseFloat($("#ingreso_neto_mensual").val());
            }

            if (!isNaN($("#ingreso_neto_conyugue").val())) {
                ingreso_neto_conyugue = parseFloat($("#ingreso_neto_conyugue").val());
            }

            if (!isNaN($("#otros_ingresos").val())) {
                otros_ingresos = parseFloat($("#otros_ingresos").val());
            }

            total_ingresos = ingreso_neto_mensual + ingreso_neto_conyugue + otros_ingresos;



            $("#total_ingresos").val(total_ingresos);
        }

        function calcular_total_ingresos_fiador() {
            var ingreso_neto_mensual_fiador = 0;
            var ingreso_neto_conyugue_fiador = 0;
            var otros_ingresos_fiador = 0;
            var total_ingresos_fiador = 0;

            if (!isNaN($("#ingreso_neto_mensual_fiador").val())) {
                ingreso_neto_mensual_fiador = parseFloat($("#ingreso_neto_mensual_fiador").val());
            }

            if (!isNaN($("#ingreso_neto_conyugue_fiador").val())) {
                ingreso_neto_conyugue_fiador = parseFloat($("#ingreso_neto_conyugue_fiador").val());
            }

            if (!isNaN($("#otros_ingresos_fiador").val())) {
                otros_ingresos_fiador = parseFloat($("#otros_ingresos_fiador").val());
            }

            total_ingresos_fiador = ingreso_neto_mensual_fiador + ingreso_neto_conyugue_fiador + otros_ingresos_fiador;
            $("#total_ingresos_fiador").val(total_ingresos_fiador);
        }

        $(document).on("keyup", "#ingreso_neto_mensual", function () {
            calcular_total_ingresos_comprador();
        });

        $(document).on("keyup", "#ingreso_neto_conyugue", function () {
            calcular_total_ingresos_comprador();
        });

        $(document).on("keyup", "#otros_ingresos", function () {
            calcular_total_ingresos_comprador();
        });

        $(document).on("keyup", "#ingreso_neto_mensual_fiador", function () {
            calcular_total_ingresos_fiador();
        });

        $(document).on("keyup", "#ingreso_neto_conyugue_fiador", function () {
            calcular_total_ingresos_fiador();
        });

        $(document).on("keyup", "#otros_ingresos_fiador", function () {
            calcular_total_ingresos_fiador();
        });
        var search = getFormSearch('frm-search-solicitud', 'search_b_solicitud', 'LoadRecordsButtonSolicitud');

        var table_container_solicitud = $("#table_container_solicitud");

        table_container_solicitud.jtable({
            title: "Lista de Solicitudes",
            paging: true,
            sorting: true,
            actions: {
                listAction: base_url + '/solicitud/list',
                // createAction: base_url + '/solicitud/create',
                // updateAction: base_url + '/solicitud/update',
                // deleteAction: base_url + '/solicitud/delete',
            },
            messages: {
                addNewRecord: 'Nueva Caja',
                editRecord: 'Editar Caja'
            },
            toolbar: {
                items: [{
                    cssClass: 'buscador',
                    text: search
                }, {
                    cssClass: 'btn-primary',
                    text: '<i class="fa fa-file-excel-o"></i> Exportar a Excel',
                    click: function () {
                        $scope.openDoc('solicitud/excel', {
                            search: $('#search_b_solicitud').val(),
                            check: (chk_date_range_sol.prop('checked')),
                            from: start_sol.format('YYYY-MM-DD'),
                            to: end_sol.format('YYYY-MM-DD')
                        });
                    }
                }, {
                    cssClass: 'btn-danger-admin',
                    text: '<i class="fa fa-plus"></i> Nueva Solicitud',
                    click: function () {
                        newSolicitud();
                    }
                }]
            },
            fields: {
                cCodConsecutivo: {
                    key: true,
                    create: false,
                    edit: false,
                    list: true,
                    title: 'Código',
                },
                nConsecutivo: {
                    title: 'Nro',
                },

                fecha_solicitud: {
                    title: 'Fecha',
                    display: function (data) {
                        return moment(data.record.fecha_solicitud).format('DD/MM/YYYY');
                    }

                },
                cliente: {
                    title: 'Cliente',
                },
                tipo_solicitud: {
                    title: 'Tipo Solicitud',
                    options: { '1': 'Contado', '2': 'Crédito Directo', '3': 'Crédito Financiero', '4': "Crédito" },

                },
                tipo_documento: {
                    title: 'Tipo Doc.',


                },
                numero_documento: {
                    title: 'N° Documento',


                },
                moneda: {
                    title: 'Moneda',


                },
                t_monto_total: {
                    title: 'Monto',


                },
                pagado: {
                    title: 'Pagado',


                },
                saldo: {
                    title: 'Saldo',

                },
                facturado: {
                    title: 'Facturado',
                },
                estado: {
                    title: 'Estado',
                    options: { '1': 'Registrado', '2': 'Vigente', '3': 'Por Aprobar', '4': 'Aprobado', '5': 'Rechazado', '6': 'Facturado', '7': 'Despachado', '8': 'Despachado Parcial', '9': 'Refinanciado', '10': 'Anulado' },
                },
                edit: {
                    width: '1%',
                    sorting: false,
                    edit: false,
                    create: false,
                    listClass: 'text-center',
                    display: function (data) {
                        return '<a href="javascript:void(0)" class="edit-solicitud" data-estado="' + data.record.estado
                            + '" data-id="' + data.record.cCodConsecutivo
                            + '_' + data.record.nConsecutivo + '" title="Editar"><i class="fa fa-edit fa-1-5x"></i></a>';
                    }

                }, Eliminar: {
                    width: '1%',
                    sorting: false,
                    edit: false,
                    create: false,
                    listClass: 'text-center',
                    display: function (data) {
                        return '<a data-target="#"  data-cCodConsecutivo="' + data.record.cCodConsecutivo + '" data-nConsecutivo="' + data.record.nConsecutivo + '"  data-estado="' + data.record.estado
                            + '" data-id="' + data.record.cCodConsecutivo + '_' + data.record.nConsecutivo + '"   title="Eliminar" class="jtable-command-button eliminar-solicitud"><i class="fa fa-trash fa-1-5x fa-red"><span>Eliminar</span></i></a>';
                    }

                }

            },
            recordsLoaded: function (event, data) {
                $('.edit-solicitud').click(function (e) {
                    var id = $(this).attr('data-id');
                    var estado = $(this).data('estado');

                    // if (estado != "1" && estado != "4") {
                    //     AlertFactory.textType({
                    //         title: '',
                    //         message: 'No se puede modificar, la solicitud ya no se encuentra en estado Registrado',
                    //         type: 'info'
                    //     });
                    //     return false;
                    // }


                    find_solicitud(id);
                    e.preventDefault();
                });
                $('.eliminar-solicitud').click(function (e) {
                    var id = $(this).attr('data-id');
                    var estado = $(this).data('estado');
                    var ccodconsecutivo = $(this).data('ccodconsecutivo');
                    var nconsecutivo = $(this).data('nconsecutivo');

                    if (estado != "1") {
                        AlertFactory.textType({
                            title: '',
                            message: 'No se puede eliminar, la solicitud ya no se encuentra en estado Registrado',
                            type: 'info'
                        });
                        return false;
                    }
                    $.post("solicitud/eliminar_solicitud", { cCodConsecutivo: ccodconsecutivo, nConsecutivo: nconsecutivo },
                        function (data, textStatus, jqXHR) {
                            console.log(data);
                            if (data.status == "e") {
                                LoadRecordsButtonSolicitud.click();

                                AlertFactory.textType({
                                    title: '',
                                    message: 'La solicitud se eliminó correctamente.',
                                    type: 'success'
                                });

                            } else {
                                AlertFactory.textType({
                                    title: '',
                                    message: data.msg,
                                    type: 'info'
                                });
                            }
                        },
                        "json"
                    );

                    e.preventDefault();
                });
            },
            formCreated: function (event, data) {

                //data.form.find('input[name="convenio"]').attr('onkeypress','return soloLetras(event)');
                $('#Edit-activo').parent().addClass('i-checks');

                $('.i-checks').iCheck({
                    checkboxClass: 'icheckbox_square-green'
                }).on('ifChanged', function (e) {
                    $(e.target).click();
                    if (e.target.value == 'S') {
                        $("#Edit-activo").val("N");
                        $(".i-checks span").text("Inactivo");

                    } else {
                        $("#Edit-activo").val("S");
                        $(".i-checks span").text("Activo");
                    };
                });
            },
            formSubmitting: function (event, data) {
                var bval = true;
                // bval = bval && data.form.find('input[name="codigo_formapago"]').required();
                bval = bval && data.form.find('input[name="nombre_caja"]').required();
                bval = bval && data.form.find('input[name="usuario"]').required();
                bval = bval && data.form.find('input[name="activo"]').required();
                return bval;
            }
        });

        generateSearchForm('frm-search-solicitud', 'LoadRecordsButtonSolicitud', function () {
            table_container_solicitud.jtable('load', {
                search: $('#search_b_solicitud').val(),
                check: (chk_date_range_sol.prop('checked')),
                from: start_sol.format('YYYY-MM-DD'),
                to: end_sol.format('YYYY-MM-DD')
            });
        }, true);

    }

    function Config($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('solicitud', {
                url: '/solicitud',
                templateUrl: base_url + '/templates/solicitud/base.html',
                controller: 'SolicitudCtrl'
            });

        $urlRouterProvider.otherwise('/');
    }
})
();