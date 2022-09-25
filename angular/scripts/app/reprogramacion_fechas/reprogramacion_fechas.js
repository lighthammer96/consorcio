/**
 * Created by JAIR on 4/5/2017.
 */

(function () {
    'use strict';
    angular.module('sys.app.reprogramacion_fechas')
        .config(Config)
        .controller('ReprogramacionFechasCtrl', ReprogramacionFechasCtrl);

    Config.$inject = ['$stateProvider', '$urlRouterProvider'];
    ReprogramacionFechasCtrl.$inject = ['$scope', 'AlertFactory', 'RESTService'];

    function ReprogramacionFechasCtrl($scope, AlertFactory, RESTService) {

        $('.i-checks').iCheck({
            checkboxClass: 'icheckbox_square-green'
        }).on('ifChanged', function (event) {
            $(event.target).click();
            $scope.chkState();
        });
        $scope.chkState = function() {
            var txt = ($("#mora").prop('checked')) ? 'Si' : 'No';
            $("#text_mora").html(txt);
        };

        //CREDITOS
        var search_solicitud_creditos = getFormSearch('frm-search-solicitud-creditos', 'search_b_solicitud_creditos', 'LoadRecordsButtonSolicitudCreditos');

        var table_container_solicitud_creditos = $("#table_container_solicitud_creditos");
        // alert(base_url + '/solicitud/list_creditos');
        table_container_solicitud_creditos.jtable({
            title: "Lista de Solicitudes",
            paging: true,
            sorting: true,
            actions: {
        
                listAction: base_url + '/solicitud/list_creditos',
            },
            // messages: {
            //     addNewRecord: 'Nueva Caja',
            //     editRecord: 'Editar Caja'
            // },
            toolbar: {
                items: [{
                    cssClass: 'buscador',
                    text: search_solicitud_creditos
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
                    options: { '1': 'Registrado', '2': 'Vigente', '3': 'Por Aprobar', '4': 'Aprobado', '5': 'Rechazado', '6': 'Facturado', '7': 'Despachado', '8': 'Despachado Parcial', '9': 'Refinanciado', '10': 'Anulado' },
                },
                edit: {
                    width: '1%',
                    sorting: false,
                    edit: false,
                    create: false,
                    listClass: 'text-center',
                    display: function (data) {
                        return '<a href="javascript:void(0)" class="emitir-pago" data-estado="' + data.record.estado
                            + '" data-id="' + data.record.cCodConsecutivo
                            + '_' + data.record.nConsecutivo + '" title="Emitir Pago"><i class="fa fa-money fa-1-5x"></i></a>';
                    }

                }

            },
            recordsLoaded: function (event, data) {
                $('.emitir-pago').click(function (e) {
                    var id = $(this).attr('data-id');
                    // $.post("reprogramacion_fechas/get_caja_diaria", {},
                    //     function (data, textStatus, jqXHR) {
                    //         // console.log();

                    //         if (data.length > 0) {

                                find_solicitud_credito(id);
                    //         } else {
                    //             AlertFactory.textType({
                    //                 title: '',
                    //                 message: 'Primero debe apertura la caja del día',
                    //                 type: 'info'
                    //             });
                    //             return false;
                    //         }
                    //     },
                    //     "json"
                    // );
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

        generateSearchForm('frm-search-solicitud-creditos', 'LoadRecordsButtonSolicitudCreditos', function () {
            table_container_solicitud_creditos.jtable('load', {
                search: $('#search_b_solicitud_creditos').val()
            });
        }, true);


        function find_solicitud_credito(id) {

            $.post("solicitud/find", { id: id },
                function (data, textStatus, jqXHR) {

                    if (data.solicitud.length > 0) {
                        $("#documento_credito").val(data.solicitud[0].documento);
                        $("#cliente_credito").val(data.solicitud[0].razonsocial_cliente);
                        $("#monto_credito").val(data.solicitud[0].t_monto_total);
                        $("#monto_pagado_credito").val(data.solicitud[0].pagado);
                        $("#saldo_capital_credito").val(data.solicitud[0].saldo);
                        $("#fecha_pago_credito").val(data.solicitud[0].fecha_pago);

                        $("#idmoneda_credito").val(data.solicitud[0].IdMoneda);
                        // $("#simbolo_moneda_credito").val(data.solicitud[0].Simbolo);
                        $(".simbolo-moneda").text(data.solicitud[0].simbolo_moneda);
                        $(".simbolo-moneda-2").text(data.solicitud[0].simbolo_moneda);
                        $("#correo_electronico").val(data.solicitud[0].correo_electronico);
                        $("#cCodConsecutivo_credito").val(data.solicitud[0].cCodConsecutivo);
                        $("#nConsecutivo_credito").val(data.solicitud[0].nConsecutivo);
                    }

                    var prox_venc = "";
                    if (data.solicitud_cronograma.length > 0) {
                        var html = "";
                        var disabled = "";
                        var checked = "";
                        var pagado_mora = 0;
                        var saldo_mora = 0;
                        for (var index = 0; index < data.solicitud_cronograma.length; index++) {
                            pagado_mora = 0;
                            saldo_mora = 0;
                            disabled = "";
                            checked = "";
                            //    console.log(data.solicitud_cronograma[index].saldo_cuota);
                            if (data.solicitud_cronograma[index].saldo_cuota != 0 && prox_venc == "") {
                                prox_venc = data.solicitud_cronograma[index].fecha_vencimiento_credito;
                            }

                            // var saldo_pagar = parseFloat(data.solicitud_cronograma[index].saldo_cuota) + parseFloat(data.solicitud_cronograma[index].int_moratorio);

                            html += '<tr>';

                            if(parseFloat(data.solicitud_cronograma[index].saldo_cuota) > 0) {
                                html += '<td><span class="inputs-hidden" nrocuota="'+data.solicitud_cronograma[index].nrocuota+'" ></span><input value="'+data.solicitud_cronograma[index].fecha_vencimiento_credito+'" type="date" name="fecha_vencimiento[]" class="form-control input-sm" /></td>';
                                
                                html += '<td class="valor-cuota"><input pagado="'+parseFloat(data.solicitud_cronograma[index].monto_pago).toFixed(2)+'" int_moratorio="'+parseFloat(data.solicitud_cronograma[index].int_moratorio).toFixed(2)+'" nrocuota="'+data.solicitud_cronograma[index].nrocuota+'" valor_cuota="'+parseFloat(data.solicitud_cronograma[index].valor_cuota).toFixed(2)+'" value="'+parseFloat(data.solicitud_cronograma[index].valor_cuota).toFixed(2)+'" type="number" name="valor_cuota[]" class="form-control input-sm" /></td>';
                            } else {
                                html += '<td><span class="inputs-hidden" nrocuota="'+data.solicitud_cronograma[index].nrocuota+'" ></span>'+data.solicitud_cronograma[index].fecha_vencimiento_credito+'</td>';
                                
                                html += '<td class="valor-cuota">'+parseFloat(data.solicitud_cronograma[index].valor_cuota).toFixed(2)+'</td>';
                            }
                            html += '<td class="int-moratorio">'+parseFloat(data.solicitud_cronograma[index].int_moratorio).toFixed(2)+'</td>';

                            if(parseFloat(data.solicitud_cronograma[index].saldo_cuota) > 0) {

                                html += '<td class=""><input readonly="readonly" nrocuota="'+data.solicitud_cronograma[index].nrocuota+'" value="'+parseFloat(data.solicitud_cronograma[index].saldo_cuota).toFixed(2)+'" type="number" name="saldo_cuota[]" class="form-control input-sm" /></td>';
                            } else {
                                html += '<td class="">'+parseFloat(data.solicitud_cronograma[index].saldo_cuota).toFixed(2)+'</td>';
                            }

                            html += '<td class="pagado">'+parseFloat(data.solicitud_cronograma[index].monto_pago).toFixed(2)+'</td>';
                            
                            html += '<td>'+data.solicitud_cronograma[index].nrocuota+'</td>';
                            if(parseFloat(data.solicitud_cronograma[index].saldo_cuota) > 0) {

                                
                                if(!isNaN(data.solicitud_cronograma[index].pagado_mora) && data.solicitud_cronograma[index].pagado_mora != null) {
                                    pagado_mora = parseFloat(data.solicitud_cronograma[index].pagado_mora).toFixed(2)
                                }

                                if(!isNaN(data.solicitud_cronograma[index].saldo_mora) && data.solicitud_cronograma[index].saldo_mora != null) {
                                    saldo_mora = parseFloat(data.solicitud_cronograma[index].saldo_mora).toFixed(2)
                                }

                                
                                html += '<input type="hidden" class="" name="nrocuota[]" value="'+data.solicitud_cronograma[index].nrocuota+'" >';
                                html += '<input type="hidden" class="" name="int_moratorio[]" value="'+data.solicitud_cronograma[index].int_moratorio+'" >';
                               
                                html += '<input type="hidden" class="" name="monto_pago[]" value="'+data.solicitud_cronograma[index].monto_pago+'" >';
                                html += '<input type="hidden" class="" name="pagado_mora[]" value="'+pagado_mora+'" >';
                                html += '<input type="hidden" class="" name="saldo_mora[]" value="'+saldo_mora+'" >';
                                

                            } 
                            html += '</tr>';
                        }
                        // alert(html);
                        $("#cuotas-credito").html(html);
                        // alert(prox_venc);
                        $("#prox_venc_credito").val(prox_venc);
                    }

                    $("#modalSolicitudCredito").modal("show");
                },
                "json"
            );

        }

        $(document).on("keyup", "input[name='monto[]']", function (e) {
            var monto = parseFloat($(this).val());
            var int_moratorio = parseFloat($(this).attr("int_moratorio"));
            if(isNaN(monto)) {
                monto = 0;
            }
            if(monto > int_moratorio) {
                $(this).val(int_moratorio);
            }
            // console.log("int_moratorio " + int_moratorio, monto);
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

        function obtener_total_saldos() {
            var saldos_cuota = $("input[name='saldo_cuota[]']");
          
            
            var subtotal_saldo_cuota = 0;
            
            for (var i = 0; i < saldos_cuota.length; i++) {
                subtotal_saldo_cuota += parseFloat(saldos_cuota[i].value);
                
            }
            return subtotal_saldo_cuota;
        }

        

        $(document).on("keyup", "input[name='valor_cuota[]']", function (e) {
            var valor_cuota = parseFloat($(this).val());
            var valor_cuota_original = parseFloat($(this).attr("valor_cuota_original"));
            if(isNaN(valor_cuota)) {
                valor_cuota = 0;
            }
            var int_moratorio = parseFloat($(this).attr("int_moratorio"));
            var nrocuota = parseFloat($(this).attr("nrocuota"));
            var pagado = parseFloat($(this).attr("pagado"));
            var saldo_cuota = valor_cuota + int_moratorio - pagado;
            var saldo_capital_credito = parseFloat($("#saldo_capital_credito").val());

            $("input[name='saldo_cuota[]'][nrocuota="+nrocuota+"]").val(saldo_cuota.toFixed(2));
            var subtotal_saldo_cuota = obtener_total_saldos();


            // if(subtotal_saldo_cuota  > saldo_capital_credito) {
            //     $(this).val(valor_cuota_original.toFixed(2));
            // }
            return subtotal_saldo_cuota;
            // alert(subtotal_saldo_cuota);
            // console.log(e);
        });

        $scope.guardar_reprogramacion_fechas = function () {
            var bval = true;
            // bval = bval && $("#serie_comprobante").required();
            // bval = bval && $("#numero_comprobante").required();
            // bval = bval && $("#idmotivo").required();
            // bval = bval && $("#monto").required();
            // var mora = (($("#mora").prop('checked')) ? 1 : 0);
            // console.log(mora);
            var saldo_capital_credito = parseFloat($("#saldo_capital_credito").val());
            var subtotal_saldo_cuota = obtener_total_saldos();

            if(subtotal_saldo_cuota != saldo_capital_credito) {
                AlertFactory.textType({
                    title: '',
                    message: 'La sumatoria de saldo a pagar es diferente al saldo capital!',
                    type: 'info'
                });
                return false;
            }
            if (bval) {
                $.post("reprogramacion_fechas/guardar_reprogramacion_fechas", $("#formulario-solicitud-credito").serialize(),
                    function (data, textStatus, jqXHR) {

                        if (data.status == "i") {

                            $("#modalSolicitudCredito").modal("hide");

                            $("#formulario-solicitud-credito").trigger("reset");

                            LoadRecordsButtonSolicitudCreditos.click();
                            AlertFactory.textType({
                                title: '',
                                message: 'La Reprogramación se guardó correctamente.',
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
            .state('reprogramacion_fechas', {
                url: '/reprogramacion_fechas',
                templateUrl: base_url + '/templates/reprogramacion_fechas/base.html',
                controller: 'ReprogramacionFechasCtrl'
            });

        $urlRouterProvider.otherwise('/');
    }
})
    ();