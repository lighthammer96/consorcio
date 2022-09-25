/**
 * Created by JAIR on 4/5/2017.
 */

(function () {
    'use strict';
    angular.module('sys.app.renegociacion_mora')
        .config(Config)
        .controller('RenegociacionMoraCtrl', RenegociacionMoraCtrl);

    Config.$inject = ['$stateProvider', '$urlRouterProvider'];
    RenegociacionMoraCtrl.$inject = ['$scope', 'AlertFactory', 'RESTService'];

    function RenegociacionMoraCtrl($scope, AlertFactory, RESTService) {

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
                    // $.post("renegociacion_mora/get_caja_diaria", {},
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
                            html += '<td><span class="inputs-hidden" nrocuota="'+data.solicitud_cronograma[index].nrocuota+'" ></span>'+data.solicitud_cronograma[index].fecha_vencimiento+'</td>';
                            
                            html += '<td class="valor-cuota">'+parseFloat(data.solicitud_cronograma[index].valor_cuota).toFixed(2)+'</td>';
                            html += '<td class="int-moratorio">'+parseFloat(data.solicitud_cronograma[index].int_moratorio).toFixed(2)+'</td>';
                            html += '<td class="">'+parseFloat(data.solicitud_cronograma[index].saldo_cuota).toFixed(2)+'</td>';
                            html += '<td class="">'+parseFloat(data.solicitud_cronograma[index].monto_pago).toFixed(2)+'</td>';
                            // html += '<td>'+parseFloat(data.solicitud_cronograma[index].valor_cuota).toFixed(2)+'</td>';
                            // html += '<td class="saldo-cuota">'+parseFloat(data.solicitud_cronograma[index].saldo_cuota).toFixed(2)+'</td>';
                            // html += '<td>'+parseFloat(data.solicitud_cronograma[index].int_moratorio).toFixed(2)+'</td>';
                            
                            // if(parseFloat(data.solicitud_cronograma[index].saldo_cuota) == 0) {
                            //     disabled = 'disabled="disabled"';
                            //     checked = 'checked="checked"';
                            // }
                           
                            // html += '<td><center><input '+disabled+' '+checked+' saldo_pagar="'+saldo_pagar.toFixed(2)+'"  type="checkbox" nrocuota="'+data.solicitud_cronograma[index].nrocuota+'" class="check-cuota" /></center></td>';
                            // html += '<td class="monto-pagar-cuota"></td>';
                            html += '<td>'+data.solicitud_cronograma[index].nrocuota+'</td>';
                            if(parseFloat(data.solicitud_cronograma[index].saldo_cuota) > 0) {

                                
                                if(!isNaN(data.solicitud_cronograma[index].pagado_mora) && data.solicitud_cronograma[index].pagado_mora != null) {
                                    pagado_mora = parseFloat(data.solicitud_cronograma[index].pagado_mora).toFixed(2)
                                }

                                if(!isNaN(data.solicitud_cronograma[index].saldo_mora) && data.solicitud_cronograma[index].saldo_mora != null) {
                                    saldo_mora = parseFloat(data.solicitud_cronograma[index].saldo_mora).toFixed(2)
                                }

                                html += '<td class=""><input int_moratorio="'+parseFloat(data.solicitud_cronograma[index].int_moratorio).toFixed(2)+'" type="number" name="monto[]" class="form-control input-sm" /></td>';
                                html += '<td class=""><input type="text" name="motivo[]" class="form-control input-sm"/></td>';
                                html += '<input type="hidden" class="" name="nrocuota[]" value="'+data.solicitud_cronograma[index].nrocuota+'" >';
                                html += '<input type="hidden" class="" name="int_moratorio[]" value="'+data.solicitud_cronograma[index].int_moratorio+'" >';
                                html += '<input type="hidden" class="" name="valor_cuota[]" value="'+data.solicitud_cronograma[index].valor_cuota+'" >';
                                html += '<input type="hidden" class="" name="monto_pago[]" value="'+data.solicitud_cronograma[index].monto_pago+'" >';
                                html += '<input type="hidden" class="" name="pagado_mora[]" value="'+pagado_mora+'" >';
                                html += '<input type="hidden" class="" name="saldo_mora[]" value="'+saldo_mora+'" >';
                                html += '<input type="hidden" class="" name="saldo_cuota[]" value="'+data.solicitud_cronograma[index].saldo_cuota+'" >';


                            } else {
                                html += '<td class=""></td>';
                                html += '<td class=""></td>';
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


        $scope.guardar_renegociacion_mora = function () {
            var bval = true;
            // bval = bval && $("#serie_comprobante").required();
            // bval = bval && $("#numero_comprobante").required();
            // bval = bval && $("#idmotivo").required();
            // bval = bval && $("#monto").required();
            var mora = (($("#mora").prop('checked')) ? 1 : 0);
            // console.log(mora);
            if (bval) {
                $.post("renegociacion_mora/guardar_renegociacion_mora", $("#formulario-solicitud-credito").serialize()+"&nomora="+mora,
                    function (data, textStatus, jqXHR) {

                        if (data.status == "i") {


                            $("#modalSolicitudCredito").modal("hide");

                            $("#formulario-solicitud-credito").trigger("reset");

                            LoadRecordsButtonSolicitudCreditos.click();
                            AlertFactory.textType({
                                title: '',
                                message: 'La Renegociación de la mora se guardó correctamente.',
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

            .state('renegociacion_mora', {
                url: '/renegociacion_mora',
                templateUrl: base_url + '/templates/renegociacion_mora/base.html',
                controller: 'RenegociacionMoraCtrl'
            });

        $urlRouterProvider.otherwise('/');
    }
})
    ();