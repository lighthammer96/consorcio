/**
 * Created by JAIR on 4/5/2017.
 */

(function () {
    'use strict';
    angular.module('sys.app.refinanciamientos')
        .config(Config)
        .controller('RefinanciamientosCtrl', RefinanciamientosCtrl);

    Config.$inject = ['$stateProvider', '$urlRouterProvider'];
    RefinanciamientosCtrl.$inject = ['$scope', 'AlertFactory', 'RESTService', 'Helpers'];

    function RefinanciamientosCtrl($scope, AlertFactory, RESTService, Helpers) {

        var redondeo;
        var cCodConsecutivo = $("#cCodConsecutivo");
        var idMoneda = $("#IdMoneda");
        var idcCondicionPago = $("#idcCondicionPago");
        var id_tipoDoc_Venta = $("#id_tipoDoc_Venta");
        var tipoCliente_or = $("#tipoCliente_or");
        var id_tipocli = $("#id_tipocli");
        var id_cliente_tipo_or = $("#id_cliente_tipo_or");

        var id_tipoDoc_Venta_or = $("#id_tipoDoc_Venta_or");        
        var distrito_ver = $('#distrito_ver');
        var nConsecutivo = $('#nConsecutivo');

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
        var AlmacenesSele;//variable para guardar almacenes
        var LotesSele;//variable para guardar lotes
        var DescuentosSele;//variable para guardar los decuentos
        var LocalizacionesSele;//variable para guardar localizaciones del almacen

        var idconvenio = $("#idconvenio");
        var idvendedor = $("#idvendedor");
        var articulo_mov_det = $("#articulo_mov_det");
        var totalDescuento = $("#totalDescuento");

        $('.i-checks').iCheck({
            checkboxClass: 'icheckbox_square-green'
        }).on('ifChanged', function (e) {
            $(e.target).click();
            if(e.target.value=='S'){
                $("#calcular_intereses").val("N");
            }else{
                $("#calcular_intereses").val("S");            
            };
            
            $("#nrocuotas_refinanciamiento").trigger("keyup");
        });


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

        $(document).on("change", "#tipo_solicitud", function () {
            var tipo_solicitud = $(this).val();
            // alert("change " + tipo_solicitud);   
            $(".condicion_pago").hide();
            if(tipo_solicitud == "4") {
              
                $(".condicion_pago").show();
            }

            if (tipo_solicitud == "1" || tipo_solicitud == "3") {
                $(".credito").hide();

            } else {

                $(".credito").show();
            }



            if (tipo_solicitud == "3") {
                $(".convenio").show();

            } else {

                if (tipo_solicitud == "1") {
                    $(".montos-credito").val(0);
                }
                $(".convenio").hide();
            }


        });

        function obtener_data_for_solicitud() {
            RESTService.all('solicitud/data_form', '', function (response) {
                if (!_.isUndefined(response.status) && response.status) {
                    if (response.parametro_igv.length > 0) {
                        // alert(response.parametro_igv[0].value);
                        $("#valor_igv").val(response.parametro_igv[0].value);
                    }
                    redondeo = response.dataredondeo
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

                    $("#forma_pago").append('<option value="">Seleccionar</option>');
                    _.each(response.formas_pago, function (item) {
                        $("#forma_pago").append('<option value="' + item.codigo_formapago + '">' + item.descripcion_subtipo + '</option>');
                    });


                    idcCondicionPago.append('<option value="">Seleccionar</option>');
                    _.each(response.condicion_pago, function (item) {
                        idcCondicionPago.append('<option value="' + item.id + '">' + item.description + '</option>');
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

                    // servicios = response.servicios;
                    idMoneda.append('<option value="">Seleccionar</option>');
                    _.each(response.moneda, function (item) {
                        idMoneda.append('<option data-simbolo="' + item.Simbolo + '" value="' + item.IdMoneda + '">' + item.Descripcion + '</option>');
                    });

                    $("#moneda").append('<option value="">Seleccionar</option>');
                    _.each(response.moneda, function (item) {
                        $("#moneda").append('<option data-simbolo="' + item.Simbolo + '" value="' + item.IdMoneda + '">' + item.Descripcion + '</option>');
                    });

                    idconvenio.append('<option value="">Seleccionar</option>');
                    _.each(response.convenios, function (item) {
                        idconvenio.append('<option value="' + item.idconvenio + '">' + item.descripcionconvenio + '</option>');
                    });

                    idvendedor.append('<option value="">Seleccionar</option>');
                    _.each(response.vendedores, function (item) {
                        idvendedor.append('<option  value="' + item.idvendedor + '">' + item.descripcion + '</option>');
                    });


                    AlmacenesSele = response.almacen_usuario;
                    LotesSele = response.lotes;
                    DescuentosSele = response.descuentos;



                }
            }, function () {
                obtener_data_for_solicitud();
            });
        }

        obtener_data_for_solicitud();

        $(document).on("change", "#IdMoneda", function () {
            if ($(this).val() != "") {

                var simbolo = $(this).find("option[value=" + $(this).val() + "]").data("simbolo");
                // alert("hola " + simbolo);
                $(".simbolo-moneda").text(simbolo);
                $(".simbolo-moneda-2").text(simbolo);
            }
        })
        

        function getCliente() {
            var bval = true;
            bval = bval && documento_or.required();
            if (bval) {
                var id = documento_or.val();
                RESTService.get('refinanciamientos/get_cliente', id, function (response) {
                    if (!_.isUndefined(response.status) && response.status) {
                        var datos = response.data;
                        if (datos.length == 0) {
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
                RESTService.get('refinanciamientos/get_persona_documento', id, function (response) {
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
        };
        
        function find_solicitud(id) {
            $("#formulario-solicitud").find("input").attr("readonly", "readonly");
            $("#formulario-solicitud").find("select").attr("disabled", "disabled");
            $("#formulario-creditos").find("input").attr("readonly", "readonly");
            $("#formulario-creditos").find("select").attr("disabled", "disabled");

            $.post("solicitud/find", { id: id },
                function (data, textStatus, jqXHR) {
                    // console.log(data);
                    Helpers.set_datos_formulario("formulario-solicitud", data.solicitud[0]);
                    if (data.solicitud_credito.length > 0) {
                        Helpers.set_datos_formulario("formulario-creditos", data.solicitud_credito[0]);
                    }
                    $("#correo_electronico").val(data.solicitud[0].correo_electronico);

                    $("#documento_or").val(data.solicitud[0].documento);
                    getCliente();
                    $("#tipo_solicitud").trigger("change");
                    $("#IdMoneda").trigger("change");
                    $("#moneda").trigger("change");

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
                        $("#dia_vencimiento_cuota").val(data.solicitud_credito[0].dia_vencimiento_cuota);
                        if (data.solicitud_credito[0].documento_fiador != null) {
                            getPersona("fiador");
                        }

                        if (data.solicitud_credito[0].documento_conyugue != null) {
                            getPersona("conyugue");
                        }

                        if (data.solicitud_credito[0].documento_fiadorconyugue != null) {
                            getPersona("documento_fiadorconyugue");
                        }
                    }

                    if (data.solicitud_articulo.length > 0) {
                        $("#articulo_mov_det").html("");
                        var html = '';
                        for (var i = 0; i < data.solicitud_articulo.length; i++) {
                            html += '<tr>';
                            html += '   <td>' + data.solicitud_articulo[i].producto + '</td>';
                            html += '   <td>' + data.solicitud_articulo[i].almacen + '</td>';
                            html += '   <td>' + data.solicitud_articulo[i].localizacion + '</td>';
                            html += '   <td>' + data.solicitud_articulo[i].lote + '</td>';
                            html += '   <td>' + data.solicitud_articulo[i].cantidad + '</td>';
                            html += '   <td>' + data.solicitud_articulo[i].precio_unitario + '</td>';
                            html += '   <td>' + data.solicitud_articulo[i].cOperGrat + '</td>';
                            html += '   <td>' + data.solicitud_articulo[i].precio_total + '</td>';
                            html += '   <td>' + data.solicitud_articulo[i].descuento + '</td>';
                            html += '   <td>' + data.solicitud_articulo[i].porcentaje_descuento + '</td>';
                            html += '   <td>' + data.solicitud_articulo[i].monto_descuento + '</td>';
                            html += '   <td>' + data.solicitud_articulo[i].monto_descuento_prorrateado + '</td>';
                            html += '   <td>' + data.solicitud_articulo[i].monto_subtotal + '</td>';
                            html += '   <td>' + data.solicitud_articulo[i].monto_exonerado + '</td>';
                            html += '   <td>' + data.solicitud_articulo[i].monto_afecto + '</td>';
                            html += '   <td>' + data.solicitud_articulo[i].monto_inafecto + '</td>';
                            html += '   <td>' + data.solicitud_articulo[i].impuestos + '</td>';
                            html += '   <td>' + data.solicitud_articulo[i].monto_total + '</td>';
                            html += '</tr>';

                        }
                        $("#articulo_mov_det").html(html);
                    }
                    // $("#enviar_solicitud").show();
                    // $("#aprobaciones").show();
                    $("#modalSolicitud").modal("show");
                },
                "json"
            );
        }

        $(document).on("keyup", "#nrocuotas_refinanciamiento", function () {
            var nro_cuotas = parseFloat($(this).val());
            var total_financiado = parseFloat($("#monto_refinanciamiento").val());
            if (isNaN(nro_cuotas)) {
                nro_cuotas = 0;
            }

            $.post("solicitud/factor_credito", { nro_cuotas: nro_cuotas },
                function (data, textStatus, jqXHR) {
              
                    var porcentaje = 0;
                    var intereses = 0;
                    var valor_cuota = 0;
                    // alert($("#calcular_intereses").val());
                    if (data.length > 0 && $("#calcular_intereses").val() == "S") {
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
                    $("#valor_cuota_refinanciamiento").val(Math.ceil(valor_cuota).toFixed(2));
                    // var nuevo_total = parseFloat($("#desTotal").val());

                    // CALCULAR NUEVO IGV PARA VALOR CUOTA FINAL IGV
                    // var t_impuestos = (!isNaN(parseFloat($("#t_impuestos").val()))) ? parseFloat($("#t_impuestos").val()) : 0;

                    // var valor_igv = parseFloat($("#valor_igv").val());
                    var valor_cuota_final = Math.ceil(valor_cuota);


                    // if (t_impuestos > 0) {
                    //     valor_cuota_final = valor_cuota_final + (valor_cuota_final * valor_igv / 100);
                    // }


                    $("#intereses_refinanciamiento").val(intereses.toFixed(2));
                    $("#valor_cuota_final_refinanciamiento").val(valor_cuota_final.toFixed(2));
                  
                   
            
                },
                "json"
            );

        });


        var search_solicitud = getFormSearch('frm-search-solicitud', 'search_b_solicitud', 'LoadRecordsButtonSolicitud');

        var table_container_solicitud = $("#table_container_solicitud");

        table_container_solicitud.jtable({
            title: "Lista de Solicitudes",
            paging: true,
            sorting: true,
            actions: {

                listAction: base_url + '/refinanciamientos/list_solicitudes_refinanciamiento', 
            },
            // messages: {
            //     addNewRecord: 'Nueva Caja',
            //     editRecord: 'Editar Caja'
            // },
            toolbar: {
                items: [{
                    cssClass: 'buscador',
                    text: search_solicitud
                }
                    // , {
                    //     cssClass: 'btn-primary',
                    //     text: '<i class="fa fa-file-excel-o"></i> Exportar a Excel',
                    //     click: function () {
                    //         $scope.openDoc('solicitud/excel', {});
                    //     }
                    // }, {
                    //     cssClass: 'btn-danger-admin',
                    //     text: '<i class="fa fa-plus"></i> Nueva Solicitud',
                    //     click: function () {
                    //         newSolicitud();
                    //     }
                    // }
                ]
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
                tipo_solicitud: {
                    title: 'Tipo Solicitud',
                    options: { '1': 'Contado', '2': 'Crédito Directo', '3': 'Crédito Financiero' },

                },
                tipo_documento: {
                    title: 'Tipo Doc.',


                },
                numero_documento: {
                    title: 'N° Documento',

                },
                cliente: {
                    title: 'Cliente',

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
                    options: { '1': 'Registrado', '2': 'Vigente', '3': 'Por Aprobar', '4': 'Aprobado', '5': 'Rechazado', '6': 'Facturado', '7': 'Despachado' },
                },
                edit: {
                    width: '1%',
                    sorting: false,
                    edit: false,
                    create: false,
                    listClass: 'text-center',
                    display: function (data) {
                        return '<a href="javascript:void(0)" class="emitir-comprobante" data-estado="' + data.record.estado
                            + '" data-id="' + data.record.cCodConsecutivo
                            + '_' + data.record.nConsecutivo + '" title="Emitir Comprobante"><i class="fa fa-edit fa-1-5x"></i></a>';
                    }

                }

            },
            recordsLoaded: function (event, data) {
                $('.emitir-comprobante').click(function (e) {
                    var id = $(this).attr('data-id');
                    find_solicitud(id);
                    e.preventDefault();
                });
                $('.eliminar-Orden').click(function (e) {
                    var ide = $(this).attr('data-ide');
                    var estado = $(this).data('estado');

                    if (estado != "1") {
                        AlertFactory.textType({
                            title: '',
                            message: 'No se puede eliminar, la solicitud ya no se encuentra en estado Registrado',
                            type: 'info'
                        });
                        return false;
                    }
                    idOrdenDelete.val(ide);
                    modalDeleteOrden.modal("show");
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

                bval = bval && data.form.find('input[name="nombre_caja"]').required();
                bval = bval && data.form.find('input[name="usuario"]').required();
                bval = bval && data.form.find('input[name="activo"]').required();
                return bval;
            }
        });

        generateSearchForm('frm-search-solicitud', 'LoadRecordsButtonSolicitud', function () {
            table_container_solicitud.jtable('load', {
                search: $('#search_b_solicitud').val()
            });
        }, true);


       


      

        

        function select_comprobante() {
            $.post("refinanciamientos/get_caja_tienda", {},
                function (data, textStatus, jqXHR) {
                    // console.log();

                    if (data.length > 0) {

                        $.post("refinanciamientos/obtener_consecutivo_comprobante", { tipo_documento: '07' },
                            function (data, textStatus, jqXHR) {
                                $("#serie_comprobante").html("");
                                $("#serie_comprobante").append('<option value="">Seleccionar</option>');
                                _.each(data, function (item) {
                                    if (serie_comprobante == item.serie) {
                                        $("#serie_comprobante").append('<option selected="selected" actual="' + item.actual + '" value="' + item.serie + '">' + item.serie + '</option>');
                                    } else {
                                        $("#serie_comprobante").append('<option actual="' + item.actual + '" value="' + item.serie + '">' + item.serie + '</option>');
                                    }
                    
                                });
                            },
                            "json"
                        );
                    } else {
                        AlertFactory.textType({
                            title: '',
                            message: 'El usuario no tiene asignado una caja',
                            type: 'info'
                        });
                        return false;
                    }
                },
                "json"
            );
           
           
        }

        select_comprobante();

        $(document).on("change", "#serie_comprobante", function () {
            var serie_comprobante = $(this).val();
            if (serie_comprobante != "") {

                var actual = $("#serie_comprobante option[value=" + serie_comprobante + "]").attr("actual");
                $("#numero_comprobante").val(actual);
            }
            // alert(numero);
        });

        function obtener_data_for_venta() {
            RESTService.all('ventas/data_form', '', function (response) {
                if (!_.isUndefined(response.status) && response.status) {
                    // if (response.parametro_igv.length > 0) {
                    //     // alert(response.parametro_igv[0].value);
                    //     // $("#valor_igv").val(response.parametro_igv[0].value);
                    // }

                    $("#idmotivo").append('<option value="">Seleccionar</option>');
                    _.each(response.motivos, function (item) {
                        $("#idmotivo").append('<option value="' + item.codigo + '">' + item.descripcion + '</option>');
                    });

                }
            }, function () {
                obtener_data_for_venta();
            });
        }

        obtener_data_for_venta();

        $scope.refinanciamiento = function () {
            var saldo = parseFloat($("#saldo").val());
            if(isNaN(saldo)) {
                saldo = 0;
            }

            if(saldo == 0) {
                AlertFactory.textType({
                    title: '',
                    message: 'El saldo de la solicitud es cero!',
                    type: 'info'
                });
                return false;
            }
            $("#monto_refinanciamiento").val(saldo.toFixed(2));
            $("#modal-refinanciamiento").modal("show");
        }

        $scope.generar_refinanciamiento = function () {
            var bval = true;
            bval = bval && $("#serie_documento").required();
            bval = bval && $("#numero_documento").required();
            bval = bval && $("#fecha_refinanciamiento").required();
            bval = bval && $("#monto_refinanciamiento").required();
            bval = bval && $("#nrocuotas_refinanciamiento").required();
           
            // console.log(mora);
            if (bval) {
                // alert("hola");
                $.post("refinanciamientos/generar_refinanciamiento", $("#formulario-solicitud").serialize()+"&"+$("#formulario-refinanciamiento").serialize()+ "&cCodConsecutivo=" + $("#cCodConsecutivo").val() + "&nConsecutivo=" + $("#nConsecutivo").val(),
                    function (data, textStatus, jqXHR) {

                        if (data.status == "i") {


                            $("#modal-refinanciamiento").modal("hide");
                            $("#modalSolicitud").modal("hide");

                            $("#formulario-refinanciamiento").trigger("reset");

                            LoadRecordsButtonSolicitud.click();
                            AlertFactory.textType({
                                title: '',
                                message: 'El refinanciamiento se generó correctamente.',
                                type: 'success'
                            });

                           
                            var id = data.datos[0].cCodConsecutivo_solicitud+ "|" + data.datos[0].nConsecutivo_solicitud;

                            // window.open("movimientoCajas/imprimir_cronograma/" + id);
                            window.open("refinanciamientos/imprimir_cronograma/" + id);

                             //NUEVA VENTA
                            var id = data.datos[0].cCodConsecutivo_solicitud + "|" + data.datos[0].nConsecutivo_solicitud + "|" + data.datos[0].idventa;

    
                            // window.open("movimientoCajas/imprimir_comprobante/" + id);
                            window.open("refinanciamientos/imprimir_comprobante/" + id);

                            // NOTA DE CREDITO
                            var id = data.datos[0].cCodConsecutivo_solicitud + "|" + data.datos[0].nConsecutivo_solicitud + "|" + data.idnota;

    
                            // window.open("movimientoCajas/imprimir_comprobante/" + id);
                            window.open("refinanciamientos/imprimir_comprobante/" + id);


                        } else {
                            AlertFactory.textType({
                                title: '',
                                message: data.msg,
                                type: 'info'
                            });
                        }
                        // console.log(data);
                    },
                    "json"
                );
            }
        }
    }




    function Config($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('refinanciamientos', {
                url: '/refinanciamientos',
                templateUrl: base_url + '/templates/refinanciamientos/base.html',
                controller: 'RefinanciamientosCtrl'
            });

        $urlRouterProvider.otherwise('/');
    }
})
    ();