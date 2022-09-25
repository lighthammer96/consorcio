/**
 * Created by JAIR on 4/5/2017.
 */

 (function () {
    'use strict';
    angular.module('sys.app.visita_cliente')
        .config(Config)
        .controller('VisitaClienteCtrl', VisitaClienteCtrl);

    Config.$inject = ['$stateProvider', '$urlRouterProvider'];
    VisitaClienteCtrl.$inject = ['$scope', 'AlertFactory', 'RESTService'];

    function VisitaClienteCtrl($scope, AlertFactory, RESTService)
    {

        var search = getFormSearch('frm-search-visita_cliente', 'search_b_visita_cliente', 'LoadRecordsButtonvisita_cliente');

        var table_container_visita_cliente = $("#table_container_visita_cliente");

        table_container_visita_cliente.jtable({
            title: "Lista de Visitas a Clientes ",
            paging: true,
            sorting: true,
            actions: {
                listAction: base_url + '/visita_cliente/list',
                // createAction: base_url + '/visita_cliente/create',
                // updateAction: base_url + '/visita_cliente/update',
                // deleteAction: base_url + '/visita_cliente/delete',
            },
            // messages: {
            //     addNewRecord: 'Nuevo Banco',
            //     editRecord: 'Editar Banco'
            // },
            toolbar: {
                items: [{
                    cssClass: 'buscador',
                    text: search
                },
                // {
                //     cssClass: 'btn-primary',
                //     text: '<i class="fa fa-file-excel-o"></i> Exportar a Excel',
                //     click: function () {
                //         $scope.openDoc('visita_cliente/excel', {});
                //     }
                // }, 
                {
                    cssClass: 'btn-danger-admin',
                    text: '<i class="fa fa-plus"></i> Nueva Visita',
                    click: function () {
                        newVisitaCliente();
                    }
                }]
            },
            fields: {
                id: {
                    key: true,
                    create: false,
                    edit: false,
                    list: true,
                    title: 'N° Visita',
                },
                fechareg: {
                    title: 'Fecha',
                    display: function (data) {
                        return moment(data.record.fechareg).format('DD/MM/YYYY');
                    }

                },
                cobrador: {
                    title: 'Cobrador',


                },
                estado: {
                    title: 'Estado',


                },
                edit: {
                    width: '1%',
                    sorting: false,
                    edit: false,
                    create: false,
                    listClass: 'text-center',
                    display: function (data) {
                        return '<a href="javascript:void(0)" class="ingresar-resultados" data-estado="' + data.record.estado + '"   data-id="' + data.record.id +'"  title="Ingresar Resultados"><i class="fa fa-edit fa-1-5x"></i></a>';
                    }

                },procesar: {
                    width: '1%',
                    sorting: false,
                    edit: false,
                    create: false,
                    listClass: 'text-center',
                    display: function (data) {
                        return '<a data-target="#" data-estado="' + data.record.estado + '" data-id="' + data.record.id +'"   title="Procesar Visita" class="jtable-command-button procesar-visita"><i class="fa fa-cogs fa-1-5x fa-red"><span>Procesar Visita</span></i></a>';
                    }

                }
                ,imprimir: {
                    width: '1%',
                    sorting: false,
                    edit: false,
                    create: false,
                    listClass: 'text-center',
                    display: function (data) {
                        return '<a data-target="#" data-estado="' + data.record.estado + '" data-id="' + data.record.id +'"   title="Imprimir Cartas Cobranza" class="jtable-command-button imprimir-cartas-cobranza"><i class="fa fa-book fa-1-5x"><span>Imprimir Cartas Cobranza</span></i></a>';
                    }

                }
                ,imprimir_visita: {
                    width: '1%',
                    sorting: false,
                    edit: false,
                    create: false,
                    listClass: 'text-center',
                    display: function (data) {
                        return '<a data-target="#" data-estado="' + data.record.estado + '" data-id="' + data.record.id +'"   title="Imprimir Visita" class="jtable-command-button imprimir-visita"><i class="fa fa-file-pdf-o fa-1-5x fa-red"><span>Imprimir Visita</span></i></a>';
                    }

                }

            },  
            
            recordsLoaded: function (event, data) {
               
                $('.ingresar-resultados').click(function (e) {
                    var estado = $(this).attr('data-estado');
                    var id = $(this).attr('data-id');
                    // alert(estado);

                    // if(estado == "Proceso") {
                        $.post("visita_cliente/find_visita", { id: id},
                            function (data, textStatus, jqXHR) {
                                // console.log(data);
                                $(".resultados").show();
                                $(".registro").hide();
                                $(".input-registro").attr("readonly", "readonly");
                                $(".input-registro").prop("disabled", true);

                                $("#fechareg").val(data.visita_cliente[0].fechareg);
                                $("#idcobrador").val(data.visita_cliente[0].idcobrador);
                                $("#idcobrador").trigger("change");
                                $("#idvisita").val(data.visita_cliente[0].id);
                                
                               

                                var cuotas = [];

                                if(data.visita_cliente_cuota.length > 0) {
                                    for (var vcc = 0; vcc < data.visita_cliente_cuota.length; vcc++) {
                                        cuotas.push(data.visita_cliente_cuota[vcc].nrocuota);
                                        
                                    }
                                }

                                if(data.visita_cliente_solicitud.length > 0) {
                                    var html_s = "";
                                   

                                    for (var vcs = 0; vcs < data.visita_cliente_solicitud.length; vcs++) {
                                        html_s = '<tr idsolicitud="'+data.visita_cliente_solicitud[vcs].cCodConsecutivo+'_'+data.visita_cliente_solicitud[vcs].nConsecutivo+'">';
                                        html_s += '    <input type="hidden" name="cuotas[]" value="'+cuotas.join(",")+'" />';
                                        html_s += '    <input type="hidden" name="idcliente[]" value="'+data.visita_cliente_solicitud[vcs].idcliente+'" />';
                                        html_s += '    <input type="hidden" name="idsolicitud[]" value="'+data.visita_cliente_solicitud[vcs].cCodConsecutivo+'_'+data.visita_cliente_solicitud[vcs].nConsecutivo+'" />';
                                     
                                        html_s += '    <td>'+data.visita_cliente_solicitud[vcs].razonsocial_cliente+'</td>';
                                        html_s += '    <td>'+data.visita_cliente_solicitud[vcs].cCodConsecutivo+'_'+data.visita_cliente_solicitud[vcs].nConsecutivo+'</td>';
                                        html_s += '    <td>'+parseFloat(data.visita_cliente_solicitud[vcs].saldo).toFixed(2)+'</td>';
                                        html_s += '    <td>['+cuotas.join(",")+']</td>';
                                        html_s += '    <td><input style="width: 100%;" type="text" name="cObservacion[]" value="'+data.visita_cliente_solicitud[vcs].cObservacion+'" class="form-control input-xs" /></td>';
                                        html_s += '    <td><center><button type="button" title="Agregar Resultados" idcliente="'+data.visita_cliente_solicitud[vcs].idcliente+'" estado="'+data.visita_cliente[0].estado+'" idsolicitud="'+data.visita_cliente_solicitud[vcs].cCodConsecutivo+'_'+data.visita_cliente_solicitud[vcs].nConsecutivo+'" class="btn btn-info btn-xs agregar-resultados" id_visita="'+data.visita_cliente_solicitud[vcs].id+'" ><i class="fa fa-plus"></i></button></center><span  idsolicitud="'+data.visita_cliente_solicitud[vcs].cCodConsecutivo+'_'+data.visita_cliente_solicitud[vcs].nConsecutivo+'" class="datos-resultados"></span></td>';
                                        html_s += '</tr>';
                                      
                                    }
                                    // alert(html_s);
                                    $("#detalle-visitas").html(html_s);
                                }

                            
                                if(data.visita_cliente[0].estado == "3") {
                                    $("input").attr("readonly", "readonly");
                                } else {
                                    $("input").removeAttr("readonly");
                                }
                                $("#modal-visita").modal("show");
                            },
                            "json"
                        );
                    // }
                })

                $(".procesar-visita").click(function() {
                    var id = $(this).attr('data-id');
                    // alert(id);
                    var estado = $(this).attr('data-estado');
                 
                    if(estado != "Registrado") {
                        return false;
                    }
                    $.post("visita_cliente/procesar_visita", { id : id },
                        function (data, textStatus, jqXHR) {
                            if (data.status == "m") {
                                AlertFactory.textType({
                                    title: '',
                                    message: "La visita se proceso Correctamente!",
                                    type: 'success'
                                });
                                LoadRecordsButtonvisita_cliente.click();
        
                            } else {
                                AlertFactory.textType({
                                    title: '',
                                    message: data.msg,
                                    type: 'info'
                                });
                            }
                            console.log(data);
                        },
                        "json"
                    );
                })
                $(".imprimir-cartas-cobranza").click(function() {
                    var id = $(this).attr('data-id');
                    // alert(id);
                    window.open("visita_cliente/imprimir_cartas_cobranza/" + id);
                })
                $(".imprimir-visita").click(function() {
                    var id = $(this).attr('data-id');
                    // alert(id);
                    window.open("visita_cliente/imprimir_visita/" + id);
                })
               
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

        generateSearchForm('frm-search-visita_cliente', 'LoadRecordsButtonvisita_cliente', function(){
            table_container_visita_cliente.jtable('load', {
                search: $('#search_b_visita_cliente').val()
            });
        }, true);

        function obtener_data_for_visita() {
            RESTService.all('visita_cliente/data_form', '', function (response) {
                if (!_.isUndefined(response.status) && response.status) {
                    // if (response.parametro_igv.length > 0) {
                    //     // alert(response.parametro_igv[0].value);
                    //     // $("#valor_igv").val(response.parametro_igv[0].value);
                    // }
                  
                    $("#idmotivo").append('<option value="">Seleccionar</option>');
                    _.each(response.motivos, function (item) {
                        $("#idmotivo").append('<option value="' + item.codigo + '">' + item.descripcion + '</option>');
                    });


                    $("#idcobrador").append('<option value="" selected>Seleccionar</option>');
                    response.cobrador.map(function (index) {
                       $("#idcobrador").append('<option value="'+index.id+'">'+index.descripcion+'</option>');
                    });


                    $("#idcliente").append('<option value="" selected>Seleccionar</option>');
                    response.clientes.map(function (index) {
                       $("#idcliente").append('<option data-cliente="'+index.razonsocial_cliente+'" value="'+index.id+'">'+index.razonsocial_cliente+'</option>');
                    });



                    $("#idcobrador").select2();
                    $("#idcliente").select2();
                   

                }
            }, function () {
                obtener_data_for_visita();
            });
        }

        obtener_data_for_visita();

        function newVisitaCliente() {
            // alert("hola");
            $(".resultados").hide();
            $(".registro").show();
            $(".input-registro").removeAttr("readonly");
            $(".input-registro").prop("disabled", false);

            $("#idcliente").val("");
            $("#idcliente").trigger("change");
            $("#idvisita").val("");
            $("#idsolicitud").val("");
            $("#idsolicitud").trigger("change");
            $("#idcobrador").val("");
            $("#idcobrador").trigger("change");
            $("#fechareg").val("");
            $("#cuotas-credito").html("");
            $("#detalle-visitas").html("");
            
            $("#modal-visita").modal("show");
        }


        $(document).on("change", "#idcliente", function (event, idsolicitud, id_visita, estado) {
            var idcliente = $(this).val();
            // alert(idsolicitud);
            $("#idsolicitud").html("");
            if(idcliente == "") {
                return false;
            }
            $.post("visita_cliente/obtener_solicitud", { idcliente: idcliente, idsolicitud: idsolicitud},
                function (data, textStatus, jqXHR) {
                    // console.log(data);
                    if(data.length > 0) {
                        $("#idsolicitud").append('<option value="" selected>Seleccionar</option>');
                        data.map(function (index) {
                            // console.log(typeof idsolicitud);
                            if(typeof idsolicitud != "undefined" && idsolicitud == index.id) {
                                $("#idsolicitud").append('<option selected="selected" data-saldo="'+index.saldo+'" value="'+index.id+'">'+index.descripcion+'</option>');
                            } else {

                                $("#idsolicitud").append('<option data-saldo="'+index.saldo+'" value="'+index.id+'">'+index.descripcion+'</option>');
                            }
                        });
                        $("#idsolicitud").select2();
                        $("#idsolicitud").trigger("change", [estado]);
                    }  else {
                        AlertFactory.textType({
                            title: '',
                            message: 'El cliente no tiene solicitudes a credito con cuotas pendientes.',
                            type: 'info'
                        });
                    }
                    
                },  
                "json"
            );
        });

        $(document).on("click", ".agregar-resultados", function () {
            var idcliente = $(this).attr("idcliente");
            var idsolicitud = $(this).attr("idsolicitud");
            var id_visita = $(this).attr("id_visita");
            var estado = $(this).attr("estado");
            $("#idcliente").val(idcliente).trigger("change", [idsolicitud, id_visita, estado]);
            
            $("#modal-detalle").modal("show");
           
        });

        function draw_cuotas(data) {
            var html = "";
               
            for (var index = 0; index < data.length; index++) {
                if($("#idvisita").val() == "") {
                    html += '<tr>';
                    html += '<td><span class="inputs-hidden" nrocuota="'+data[index].nrocuota+'" ></span>'+data[index].fecha_vencimiento+'</td>';
                    
                    html += '<td class="valor-cuota">'+parseFloat(data[index].valor_cuota).toFixed(2)+'</td>';
                    html += '<td class="int-moratorio">'+parseFloat(data[index].int_moratorio).toFixed(2)+'</td>';
                    html += '<td class="">'+parseFloat(data[index].saldo_cuota).toFixed(2)+'</td>';
                    html += '<td class="">'+parseFloat(data[index].monto_pago).toFixed(2)+'</td>';
                    
                    html += '<td>'+data[index].nrocuota+'</td>';
                    if(parseFloat(data[index].saldo_cuota) > 0) {
                      
                        html += '<input type="hidden" class="" name="nrocuota[]" value="'+data[index].nrocuota+'" >';
    
                        html += '<td><center><input type="checkbox" nrocuota="'+data[index].nrocuota+'" value="'+data[index].nrocuota+'" class="check-cuota" /></center></td>';
                        
                    } else {
                       
                        html += '<td class=""></td>';
                        // html += '<td class=""></td>';
                        
                        
                    }
                
                    html += '</tr>';
                } else {
                    if(data[index].nrocuota_v != null) {
                        html += '<tr>';
                        html += '<td><span class="inputs-hidden" nrocuota="'+data[index].nrocuota+'" ></span>'+data[index].fecha_vencimiento+'</td>';
                        
                        html += '<td class="valor-cuota">'+parseFloat(data[index].valor_cuota).toFixed(2)+'</td>';
                        html += '<td class="int-moratorio">'+parseFloat(data[index].int_moratorio).toFixed(2)+'</td>';
                        html += '<td class="">'+parseFloat(data[index].saldo_cuota).toFixed(2)+'</td>';
                        html += '<td class="">'+parseFloat(data[index].monto_pago).toFixed(2)+'</td>';
                        
                        html += '<td>'+data[index].nrocuota+'</td>';
                    
                        // console.log("d =>"+$("#idvisita").val());
    
                        html += '<td class=""><input type="date" class="form-control input-sm fecha_pago"  value="'+data[index].fecha_pago+'" /></td>';
                        html += '<td class=""><input type="number" class="form-control input-sm monto_pago" value="'+parseFloat(data[index].monto_pago_v).toFixed(2)+'" /></td>';
                        html += '<td class=""><input type="text" class="form-control input-sm cObservacion" value="'+data[index].cObservacion+'" /></td>';    
    
                  
                        html += '</tr>';
                    }
                }
               
            }
            // alert(html);

            return html;
        }

        $(document).on("change", "#idsolicitud", function (event, estado) {
            var id = $(this).val();
            var idvisita = $("#idvisita").val();
           
            if(id == "" && idvisita == "") {
                return false;
            }
            $.post("visita_cliente/obtener_cuotas_cronograma", { id: id, idvisita: idvisita },
                function (data, textStatus, jqXHR) {

                    if (data.length > 0) {
                        var html = draw_cuotas(data);
                        // alert(html);
                        $("#cuotas-credito").html(html);
                        
                        if(estado == "3") {
                            $("input").attr("readonly", "readonly");
                        } else {
                            $("input").removeAttr("readonly");
                        }   
                    
                    }
                },
                "json"
            );
        })

      

        function find_documento(id) {
            
            $.post("visita_cliente/find_documento", { idventa: id },
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

                        $("#monto").attr("max", parseFloat(data.documento[0].t_monto_total).toFixed(2));
                        $("#monto").val(parseFloat(data.documento[0].t_monto_total).toFixed(2));
                      
                    }

                    
                    $.post("consecutivos_comprobantes/obtener_consecutivo_comprobante", { tipo_documento: '07' },
                        function (data, textStatus, jqXHR) {
                            select_comprobante(data);
                        },
                        "json"
                    );


                    $("#modalvisita_cliente").modal("show");
                },
                "json"
            );
    
            
    
           
        }

        $scope.agregar_solicitud = function () {
            // alert("hola");
            $("#idcliente").val("");
            $("#idsolicitud").val("");
            $("#cuotas-credito").html("");
            $("#modal-detalle").modal("show");
        }

       

        $scope.agregar_solicitud_detalle = function () {
            // alert("hola");
            var cliente = $('#idcliente').find(':selected').data('cliente');
            var saldo = parseFloat($('#idsolicitud').find(':selected').data('saldo'));
            var idcliente = $("#idcliente").val();
            var idsolicitud = $("#idsolicitud").val();


            var checks = $(".check-cuota");
            var cuotas = [];
            for (var check = 0; check < checks.length; check++) {
                if($(checks[check]).is(":checked")) {
                    cuotas.push($(checks[check]).val());
                  
                }

              
            }

            
            var html = "";

            if($("#idvisita").val() == "") {
                html = '<tr>';
                html += '    <input type="hidden" name="cuotas[]" value="'+cuotas.join(",")+'" />';
                html += '    <input type="hidden" name="idcliente[]" value="'+idcliente+'" />';
                html += '    <input type="hidden" name="idsolicitud[]" value="'+idsolicitud+'" />';
                html += '    <td>'+cliente+'</td>';
                html += '    <td>'+idsolicitud+'</td>';
                html += '    <td>'+saldo.toFixed(2)+'</td>';
                html += '    <td>['+cuotas.join(",")+']</td>';
                html += '    <td><center><button type="button" class="btn btn-danger btn-xs eliminar-detalle-solicitud"><i class="fa fa-trash"></i></button></center></td>';
                html += '</tr>';

                $("#detalle-visitas").append(html);
            } else {

                var fecha_pago = $(".fecha_pago");
                var fechas_pago = [];
                var montos_pago = [];
                var observaciones = [];
                for (var i = 0; i < fecha_pago.length; i++) {
                    
                    fechas_pago.push($(fecha_pago[i]).val());
                    montos_pago.push($(".monto_pago").eq(i).val());
                    observaciones.push($(".cObservacion").eq(i).val());
                }
                html += '<input type="hidden" name="fecha_pago[]" value="'+fechas_pago.join("|")+'" />';
                html += '<input type="hidden" name="monto_pago[]" value="'+montos_pago.join("|")+'" />';
                html += '<input type="hidden" name="cObservacion_v[]" value="'+observaciones.join("|")+'" />';
                // console.log(html);
                $(".datos-resultados[idsolicitud='"+idsolicitud+"']").html(html);
                AlertFactory.textType({
                    title: '',
                    message: 'Los datos del resultado se agregaron correctamente.',
                    type: 'success'
                });
            }
            
            // $("#modal-detalle").modal("hide");  
        }

        $(document).on("click", '.eliminar-detalle-solicitud', function(e) {
            e.preventDefault();
            $(this).parent("center").parent("td").parent("tr").remove();
        })

        $scope.guardar_visita = function () {
            var bval = true;
            bval = bval && $("#fechareg").required();
            bval = bval && $("#idcobrador").required();

            if($("#detalle-visitas").html() == "") {
                AlertFactory.textType({
                    title: '',
                    message: "Debe ingresar al menos una solicitud al detalle!",
                    type: 'info'
                });
                return false;
            }

            if(bval) {
                $.post("visita_cliente/guardar_visita", $("#formulario-visita").serialize(),
                    function (data, textStatus, jqXHR) {

                        if (data.status == "i") {

                    
                            $("#modal-visita").modal("hide");
                        
                            $("#formulario-visita").trigger("reset");

                            // var id = data.datos[0].cCodConsecutivo_solicitud + "|" + data.datos[0].nConsecutivo_solicitud + "|" + data.datos[0].idventa;

                            // window.open("movimientoCajas/imprimir_comprobante/" + id);
                            
                            LoadRecordsButtonvisita_cliente.click();
                            // AlertFactory.textType({
                            //     title: '',
                            //     message: 'El documento se facturó correctamente.',
                            //     type: 'success'
                            // });

                        


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

            .state('visita_cliente', {
                url: '/visita_cliente',
                templateUrl: base_url + '/templates/visita_cliente/base.html',
                controller: 'VisitaClienteCtrl'
            });

        $urlRouterProvider.otherwise('/');
    }
})
();