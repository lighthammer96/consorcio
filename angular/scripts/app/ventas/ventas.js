
/**
 * Created by JAIR on 4/5/2017.
 */

(function () {
    'use strict';
    angular.module('sys.app.ventas')
        .config(Config)
        .controller('VentasCtrl', VentasCtrl);

    Config.$inject = ['$stateProvider', '$urlRouterProvider'];
    VentasCtrl.$inject = ['$scope', 'AlertFactory', 'RESTService'];

    function VentasCtrl($scope, AlertFactory, RESTService) {

        // var search = getFormSearch('frm-search-ventas', 'search_b_ventas', 'LoadRecordsButtonVentas');
        var search = getFormSearchComprobantes('frm-search-ventas', 'search_b_ventas', 'LoadRecordsButtonVentas');

        var table_container_ventas = $("#table_container_ventas");

        table_container_ventas.jtable({
            title: "Documentos Emitidos",
            paging: true,
            sorting: true,
            actions: {
                listAction: base_url + '/ventas/list',
                // createAction: base_url + '/ventas/create',
                // updateAction: base_url + '/ventas/update',
                // deleteAction: base_url + '/ventas/delete',
            },
            // messages: {
            //     addNewRecord: 'Nuevo Banco',
            //     editRecord: 'Editar Banco'
            // },
            toolbar: {
                items: [{
                    cssClass: 'buscador',
                    text: search
                }, {
                    cssClass: 'btn-primary',
                    text: '<i class="fa fa-file-excel-o"></i> Exportar a Excel',
                    click: function () {
                        var data_excel = {
                            search: $('#search_b_comprobantes').val(),
                            FechaInicioFiltro: $('#FechaInicioFiltro').val(),
                            FechaFinFiltro: $('#FechaFinFiltro').val(),
                            idClienteFiltro: $('#idClienteFiltro').val(),
                            id_tipo_doc: $('#id_tipo_doc').val(),
                            estado_cpe: $('#estado_cpe').val(),
                        };

                        $scope.openDoc('ventas/excel', data_excel);

                    }
                }]
            },
            fields: {
                idventa: {
                    key: true,
                    create: false,
                    edit: false,
                    list: false,
                    title: 'Código',
                },
                cCodConsecutivo_solicitud: {
                    title: 'cCodConsecutivo',
                    create: false,
                    edit: false,
                    list: false,

                },
                nConsecutivo_solicitud: {
                    title: 'nConsecutivo',
                    create: false,
                    edit: false,
                    list: false,

                },
                tipo_solicitud: {
                    title: 'tipo_solicitud',
                    create: false,
                    edit: false,
                    list: false,

                },
                estado: {
                    title: 'estado',
                    create: false,
                    edit: false,
                    list: false,

                },
                IdTipoDocumento: {
                    title: 'IdTipoDocumento',
                    create: false,
                    edit: false,
                    list: false,

                },
                anticipo: {
                    title: 'anticipo',
                    create: false,
                    edit: false,
                    list: false,

                },
                idventa_referencia: {
                    title: 'idventa_referencia',
                    create: false,
                    edit: false,
                    list: false,

                },
                tipo_comprobante: {
                    title: 'tipo_comprobante',
                    create: false,
                    edit: false,
                    list: false,

                },
                // serie_comprobante: {
                //     title: 'Serie',

                // },
                // numero_comprobante: {
                //     title: 'Número',


                // },
                comprobante: {
                    title: 'Comprobante',

                },
                fecha_emision: {
                    title: 'Fecha',
                    display: function (data) {
                        return moment(data.record.fecha_emision).format('DD/MM/YYYY');
                    }

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
                anulado: {
                    title: 'Anulado',
                    values: { 'S': 'SI', 'N': 'NO', 'null': 'NO' },
                    type: 'checkbox',
                },
                estado_cpe: {
                    title: 'Estado',


                },
                dias_vencidos: {
                    title: 'dias_vencidos',
                    create: false,
                    edit: false,
                    list: false,

                },
                formapago: {
                    title: 'Forma de Pago',


                },
                edit: {
                    width: '1%',
                    sorting: false,
                    edit: false,
                    create: false,
                    listClass: 'text-center',
                    display: function (data) {
                        return '<a href="javascript:void(0)" class="emitir-nota" data-estado="' + data.record.estado + '"  data-tipo_solicitud="' + data.record.tipo_solicitud + '"  data-tipo_comprobante="' + data.record.tipo_comprobante + '"  data-idtipodocumento="' + data.record.IdTipoDocumento + '"  data-anticipo="' + data.record.anticipo + '" data-id="' + data.record.cCodConsecutivo_solicitud + '|' + data.record.nConsecutivo_solicitud + '|' + data.record.idventa + '" data-idventa="' + data.record.idventa + '" data-saldo="' + data.record.saldo + '" data-cCodConsecutivo="' + data.record.cCodConsecutivo_solicitud + '" data-nConsecutivo="' + data.record.nConsecutivo_solicitud + '"  data-idventa_referencia="' + data.record.idventa_referencia + '" title="Emitir Nota"><i class="fa fa-file-text fa-1-5x"></i></a>';
                    }

                },
                anular: {
                    width: '1%',
                    sorting: false,
                    edit: false,
                    create: false,
                    listClass: 'text-center',
                    display: function (data) {
                        return '<a href="javascript:void(0)" class="anular-nota" data-dias_vencidos="' + data.record.dias_vencidos + '" data-idventa="' + data.record.idventa + '"  data-anulado="' + data.record.anulado + '"   title="Anular"><i class="fa fa-times fa-1-5x fa-red"></i></a>';
                    }

                }
                ,
                reimprimir: {
                    width: '1%',
                    sorting: false,
                    edit: false,
                    create: false,
                    listClass: 'text-center',
                    display: function (data) {
                        return '<a href="javascript:void(0)" class="reimprimir-comprobante" data-estado="' + data.record.estado + '"  data-tipo_solicitud="' + data.record.tipo_solicitud + '" data-idtipodocumento="' + data.record.IdTipoDocumento + '"  data-anticipo="' + data.record.anticipo + '" data-id="' + data.record.cCodConsecutivo_solicitud + '|' + data.record.nConsecutivo_solicitud + '|' + data.record.idventa + '"   title="Reimprimir Comprobante"><i class="fa fa-print fa-1-5x"></i></a>';
                    }

                }

            },

            recordsLoaded: function (event, data) {

                $("#table_container_ventas").find(".jtable-title-text").removeClass("col-md-4").addClass("col-md-2");
                $("#table_container_ventas").find(".jtable-toolbar").removeClass("col-md-8").addClass("col-md-10");
                $('.anular-nota').click(function (e) {
                    var code = $(this).attr('data-idventa');
                    var anulado = $(this).attr('data-anulado');
                    var dias_vencidos = $(this).attr('data-dias_vencidos');
                    if(anulado == "S") {
                        AlertFactory.textType({
                            title: '',
                            message: "Este comprobante ya ha sido anulado!",
                            type: 'info'
                        });
                        return false
                    }
                    if(dias_vencidos > 3) {
                        AlertFactory.textType({
                            title: '',
                            message: "Ya pasaron los 3 dias, ya no puede anular!",
                            type: 'info'
                        });
                        return false
                    }
                    AlertFactory.confirm({
                        title: '',
                        message: '¿Está seguro que desea anular venta?',
                        confirm: 'Si',
                        cancel: 'No'
                    }, function () {
                        RESTService.get('ventas/anularventa', code, function (response) {
                            if (!_.isUndefined(response.status) && response.status) {
                                AlertFactory.textType({
                                    title: '',
                                    message: 'El documento se anuló correctamente',
                                    type: 'success'
                                });
                                LoadRecordsButtonVentas.click();
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
                    });
                    e.preventDefault();
                });
                $('.emitir-nota').click(function (e) {
                    var idventa = $(this).attr('data-idventa');
                    var idtipodocumento = $(this).attr('data-idtipodocumento');
                    var idventa_referencia = $(this).attr('data-idventa_referencia');
                    var cCodConsecutivo = $(this).attr('data-cCodConsecutivo');
                    var nConsecutivo = $(this).attr('data-nConsecutivo');
                    var tipo_comprobante = $(this).attr('data-tipo_comprobante');
                    var saldo = parseFloat($(this).attr('data-saldo'));
                    // alert(idventa_referencia);
                    var anulado = $(this).attr('data-anulado');
                   
                    if(anulado == "S") {
                        AlertFactory.textType({
                            title: '',
                            message: "Este comprobante se encuentra anulado!",
                            type: 'info'
                        });
                        return false
                    }

                    if (idtipodocumento == "07") {
                        return false;
                    }

                    // if (idventa_referencia != "null" && idventa_referencia != "" && condicion_pago != 1 && saldo <= 0) {
                    //     AlertFactory.textType({
                    //         title: '',
                    //         message: 'Ya se emitio una nota de este documento!',
                    //         type: 'info'
                    //     });
                    //     return false;
                    // }
                    
                    $.post("ventas/get_caja_diaria", {},
                        function (data, textStatus, jqXHR) {
                            // console.log();
                            if (data.length > 0) {
                               
                                $.post("ventas/validar_nota", { idventa: idventa },
                                    function (data, textStatus, jqXHR) {
                                        if(data.length > 0) {
                                            AlertFactory.textType({
                                                title: '',
                                                message: 'Ya se emitio una nota de crédito!',
                                                type: 'info'
                                            });
                                            return false;
                                           
                                        } else {
                                            find_documento(idventa);
                                        }
                                    },
                                    "json"
                                );
                        

                                   
                                

                            } else {
                                AlertFactory.textType({
                                    title: '',
                                    message: 'Primero debe apertura la caja del día',
                                    type: 'info'
                                });
                                return false;
                            }
                        },
                        "json"
                    );
                    e.preventDefault();
                });

                $('.reimprimir-comprobante').click(function (e) {
                    var id = $(this).attr('data-id');
                    var tipo_solicitud = $(this).attr('data-tipo_solicitud');
                    var idtipodocumento = $(this).attr('data-idtipodocumento');
                    var estado = $(this).attr('data-estado');
                    $.post("ventas/validar_ticket_pago_cuota", { id: id },
                        function (data, textStatus, jqXHR) {
                            // console.log(data);
                            if(data.length <= 0) {
                                if (idtipodocumento == "12") {
                                    if(tipo_solicitud != "null") {
                                        
                                        window.open("ventas/imprimir_ticket/" + id);
                                    } else {
                                        window.open("ventas/imprimir_ticket_movimiento_caja/" + id);
                                    }
                                } else {
                                    window.open("ventas/imprimir_comprobante/" + id);
                                    
                                }
                            } else {
                              
                                window.open("ventas/imprimir_ticket_pago_cuota/" + id);
                            }
                           
                        },
                        "json"
                    );
                    
                    
                    e.preventDefault();
                });

            },
            formCreated: function (event, data) {
                // data.form.find('input[name="banco"]').attr('onkeypress','return soloLetras(event)');
            },
            formSubmitting: function (event, data) {
                var bval = true;
                bval = bval && data.form.find('input[name="banco"]').required();
                return bval;
            }
        });

        generateSearchForm('frm-search-ventas', 'LoadRecordsButtonVentas', function () {
            table_container_ventas.jtable('load', {
                search: $('#search_b_ventas').val(),
                FechaInicioFiltro: $('#FechaInicioFiltro').val(),
                FechaFinFiltro: $('#FechaFinFiltro').val(),
                idClienteFiltro: $('#idClienteFiltro').val(),
                id_tipo_doc: $('#id_tipo_doc').val(),
                estado_cpe: $('#estado_cpe').val(),
                anulado: $('#anulado').val(),
            });
        }, true);

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

                    $("#idClienteFiltro").append('<option value="">Seleccionar</option>');
                    _.each(response.clientes, function (item) {
                        $("#idClienteFiltro").append('<option value="' + item.id + '">' + item.razonsocial_cliente + '</option>');
                    });
                    $("#idClienteFiltro").select2();

                }
            }, function () {
                obtener_data_for_venta();
            });
        }

        obtener_data_for_venta();

        $(document).on("change", "#serie_comprobante", function () {
            var serie_comprobante = $(this).val();
            if (serie_comprobante != "") {

                var actual = $("#serie_comprobante option[value=" + serie_comprobante + "]").attr("actual");
                $("#numero_comprobante").val(actual);
            }
            // alert(numero);
        });

        function select_comprobante(data) {
            $("#serie_comprobante").html("");
            $("#serie_comprobante").append('<option value="">Seleccionar</option>');
            _.each(data, function (item) {
                if (serie_comprobante == item.serie) {
                    $("#serie_comprobante").append('<option selected="selected" actual="' + item.actual + '" value="' + item.serie + '">' + item.serie + '</option>');
                } else {
                    $("#serie_comprobante").append('<option actual="' + item.actual + '" value="' + item.serie + '">' + item.serie + '</option>');
                }

            });
        }

        function find_documento(id) {
            $("#formulario-ventas").trigger("reset");
            $.post("ventas/find_documento", { idventa: id },
                function (data, textStatus, jqXHR) {

                    if (data.documento.length > 0) {

                        $("#cliente").val(data.documento[0].cliente);
                        $("#idcliente").val(data.documento[0].idcliente);
                        $("#documento").val(data.documento[0].documento);
                        $("#cCodConsecutivo").val(data.documento[0].cCodConsecutivo_solicitud);
                        $("#nConsecutivo").val(data.documento[0].nConsecutivo_solicitud);
                        $("#idventa").val(data.documento[0].idventa);
                        $("#anticipo").val(data.documento[0].anticipo);
                        $("#idmoneda").val(data.documento[0].idmoneda);
                        $("#tipo_comprobante").val(data.documento[0].tipo_comprobante);
                        $("#t_monto_total").val(parseFloat(data.documento[0].t_monto_total).toFixed(2));
                        $("#condicion_pago").val(parseFloat(data.documento[0].condicion_pago).toFixed(2));
                        $("#saldo").val(parseFloat(data.documento[0].saldo).toFixed(2));
                        if (data.documento[0].tipo_comprobante == "1") {
                            $("#monto").attr("readonly", "readonly");
                        } else {
                            $("#monto").removeAttr("readonly");
                        }

                        $("#monto").attr("max", parseFloat(data.documento[0].t_monto_total).toFixed(2));
                        $("#monto").val(parseFloat(data.documento[0].t_monto_total).toFixed(2));

                    }


                    $.post("ventas/obtener_consecutivo_comprobante", { tipo_documento: '07' },
                        function (data, textStatus, jqXHR) {
                            select_comprobante(data);
                        },
                        "json"
                    );


                    $("#modalVentas").modal("show");
                },
                "json"
            );




        }

        // $(document).on("keyup", "#monto", function () {
        //     var max_monto = parseFloat($(this).attr("monto"));

        // });

        $scope.guardar_venta = function () {
            var bval = true;
            bval = bval && $("#serie_comprobante").required();
            bval = bval && $("#numero_comprobante").required();
            bval = bval && $("#idmotivo").required();
            bval = bval && $("#monto").required();

            if (bval) {
                $.post("ventas/guardar_venta", $("#formulario-ventas").serialize(),
                    function (data, textStatus, jqXHR) {

                        if (data.status == "i") {


                            $("#modalVentas").modal("hide");

                            $("#formulario-ventas").trigger("reset");

                            var cCodConsecutivo_solicitud = (typeof data.datos[0].cCodConsecutivo_solicitud != "undefined") ? data.datos[0].cCodConsecutivo_solicitud : "0";
                            var nConsecutivo_solicitud = (typeof data.datos[0].nConsecutivo_solicitud != "undefined") ? data.datos[0].nConsecutivo_solicitud : "0";
                            var id = cCodConsecutivo_solicitud + "|" + nConsecutivo_solicitud + "|" + data.datos[0].idventa;
                            // console.log(id);
                            window.open("ventas/imprimir_comprobante/" + id);

                            LoadRecordsButtonVentas.click();

                            // nota de credito por un anticipo
                            var msg = "";
                            if (data.datos[0].devolucion_dinero == "1") {
                                msg += "Se registro un movimiento de devolución en movimientos de caja y se debe entregar el dinero al cliente."
                            }

                            if (data.datos[0].devolucion_producto == "1") {
                                msg += " ¡Importante! Se debe ingresar a almacén los articulos devueltos de la Nota de Crédito emitida.";
                            }

                            AlertFactory.textType({
                                title: '',
                                message: 'El documento se facturó correctamente. ' + msg,
                                type: 'success'
                            });







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

            .state('ventas', {
                url: '/ventas',
                templateUrl: base_url + '/templates/ventas/base.html',
                controller: 'VentasCtrl'
            });

        $urlRouterProvider.otherwise('/');
    }
})
    ();