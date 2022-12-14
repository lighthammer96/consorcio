/**
 * Created by JAIR on 4/5/2017.
 */

(function () {
    'use strict';
    angular.module('sys.app.cierre_cuentas_cobrar')
        .config(Config)
        .controller('CierreCuentasCobrarCtrl', CierreCuentasCobrarCtrl);

    Config.$inject = ['$stateProvider', '$urlRouterProvider'];
    CierreCuentasCobrarCtrl.$inject = ['$scope', '_', 'RESTService', 'AlertFactory', 'Notify'];

    function CierreCuentasCobrarCtrl($scope, _, RESTService, AlertFactory, Notify) {
        var modalCierreCuentasCobrar = $("#modalCierreCuentasCobrar");
        var titlemodalCierreCuentasCobrar = $("#titlemodalCierreCuentasCobrar");


        var periodo = $("#periodo");
        var estado = $("#estado");
        var btnPreCierre = $("#btnPreCierre");
        var btnReversar = $("#btnReversar");
        var table_movi_cierre = $("#table_movi_cierre");
        var btnCierreInventario = $("#btnCierreInventario");
        var idMovimiento = $("#idMovimiento");
        var btnImprimir = $("#btnImprimir");
        var btnExcel = $("#btnExcel");

        // $("#btnExcel").click(function (e) {
        //     if (periodo.val() != '') {
        //         if (estado.val() != '') {
        //             var data_excel = {
        //                 periodo: periodo.val(),
        //                 estado: $("#estado option:selected").text(),
        //             }
        //             $scope.openDoc('cierre_cuentas_cobrar/excelPerido', data_excel);
        //         };
        //     }


        // });

        $("#btnExcel").click(function (e) {
            if (periodo.val() != '') {
                if (estado.val() != '') {
                    // var data_excel = {
                    //     periodo: periodo.val(),
                    //     estado: $("#estado option:selected").text(),
                    // }
                    // $scope.openDoc('cierre_cuentas_cobrar/excelPerido', data_excel);
                    //$scope.openDoc('cierre_cuentas_cobrar/excelCuentasxCobrar_cierre', data_excel);

                    var data_excel = periodo.val()+"|"+$("#estado option:selected").text();
                    window.open('cierre_cuentas_cobrar/excelCuentasxCobrar_cierre/'+ data_excel);
                };
            }


        });


        periodo.select2();
        $scope.chkState = function () {
            var txt_state2 = (w_state.prop('checked')) ? 'Activo' : 'Inactivo';
            state_state.html(txt_state2);
        };
        modalCierreCuentasCobrar.on('hidden.bs.modal', function (e) {
            cleanMoCi();
        });
        // $("#btnImprimir").click(function (e) {
        //     if (periodo.val() != '') {
        //         if (estado.val() != '') {
        //             var data_pdf = {
        //                 periodo: periodo.val(),
        //                 estado: $("#estado option:selected").text(),
        //             }
        //             $scope.loadQueryStockPDFCierre('cierre_cuentas_cobrar/pdf', data_pdf);
        //         };

        //     }

        // });

        $("#btnImprimir").click(function (e) {
            if (periodo.val() != '') {
                if (estado.val() != '') {
                    var data_pdf = {
                        periodo: periodo.val(),
                        estado: $("#estado option:selected").text(),
                    }
                    // $scope.loadQueryStockPDFCierre('cierre_cuentas_cobrar/pdf', data_pdf);
                    $scope.loadCCPDF('cierre_cuentas_cobrar/cuentasporcobrar_cierre', data_pdf);
                };

            }

        });

        function cleanMoCi() {
            periodo.val("").trigger("change");
            estado.val("");
            btnPreCierre.val("");
            idMovimiento.val("");
            periodo.prop('disabled', false);
            btnPreCierre.prop('disabled', false);
            btnReversar.prop('disabled', false);
            btnCierreInventario.prop('disabled', false);
        };
 
        btnCierreInventario.click(function (e) {
            saveCierre();
        });
        btnReversar.click(function (e) {
            AlertFactory.confirm({
                title: '',
                message: '??Est?? seguro que desea Reversar este periodo?',
                confirm: 'Si',
                cancel: 'No'
            }, function () {
                saveReversar();
            });

        });
        btnPreCierre.click(function (e) {

            savePreCierre();
        });
        function saveReversar() {

            var periodos = periodo.val();
            var myArray = periodos.split("*");
            var periodoEnvi = myArray[0];
            var id = periodoEnvi;
            RESTService.get('cierre_cuentas_cobrar/reversarCierre', id, function (response) {
                if (!_.isUndefined(response.status) && response.status) {
                    AlertFactory.textType({
                        title: '',
                        message: 'El registro se revers?? correctamente',
                        type: 'success'
                    });
                    btnPreCierre.prop('disabled', false);
                    btnReversar.prop('disabled', false);
                    btnCierreInventario.prop('disabled', true);
                    periodo.prop('disabled', false);
                    estado.val("");
                    periodo.val("").trigger("change");
                    $("#LoadRecordsButtonMovimiento_cierre").click();
                    // $("#LoadRecordsButtonMovimiento_cierre2").click();
                    $('#LoadRecordsButtonSolicitud').click();
                } else {
                    AlertFactory.textType({
                        title: '',
                        message: 'Hubo un error al obtener el Art??culo. Intente nuevamente.',
                        type: 'error'
                    });
                }
            });
        }
        function findRegister_movementCierre(id) {
            titlemodalCierreCuentasCobrar.html('Ver Cierre');
            RESTService.get('cierre_cuentas_cobrar/findMov', id, function (response) {
                if (!_.isUndefined(response.status) && response.status) {
                    var data_p = response.data;
                    periodo.html("");
                    periodo.append('<option value="">Seleccionar</option>');
                    _.each(response.periodos, function (item) {
                        periodo.append('<option value="' + item.periodo + '*' + item.estado_cc + '">' + item.periodo + '</option>');
                    });

                    var per = data_p[0].periodo + '*' + data_p[0].estado_cc;
                    console.log(per);
                    periodo.val(per).trigger("change");
                    periodo.prop('disabled', true);
                    if (estado.val() == 'C') {
                        btnPreCierre.prop('disabled', true);
                        btnReversar.prop('disabled', true);
                        btnCierreInventario.prop('disabled', true);
                    } else if (estado.val() == 'P') {
                        btnPreCierre.prop('disabled', true);
                        btnReversar.prop('disabled', false);
                        btnCierreInventario.prop('disabled', false);
                    }
                    // $("#LoadRecordsButtonMovimiento_cierre2").click();
                    $('#LoadRecordsButtonSolicitud').click();
                    modalCierreCuentasCobrar.modal('show');
                } else {
                    AlertFactory.textType({
                        title: '',
                        message: 'Hubo un error al obtener el Art??culo. Intente nuevamente.',
                        type: 'error'
                    });
                }
            });

        }
        function savePreCierre() {
            var bval = true;
            bval = bval && periodo.required();

            if (bval) {
                var periodos = periodo.val();
                var myArray = periodos.split("*");
                var periodoEnvi = myArray[0];
                var params = {
                    'periodo': periodoEnvi,
                    'estado': estado.val(),
                };

                var id_Movimiento = (idMovimiento.val() === '') ? 0 : idMovimiento.val();
                RESTService.updated('cierre_cuentas_cobrar/saveMovimientArticuloPreCierre', id_Movimiento, params, function (response) {
                    if (!_.isUndefined(response.status) && response.status) {
                        AlertFactory.textType({
                            title: '',
                            message: 'El registro se guard?? correctamente',
                            type: 'success'
                        });
                        periodo.prop('disabled', true);
                        btnPreCierre.prop('disabled', true);
                        btnReversar.prop('disabled', false);
                        btnCierreInventario.prop('disabled', false);
                        estado.val('P');
                        // $('#LoadRecordsButtonMovimiento_cierre2').click();
                        $('#LoadRecordsButtonSolicitud').click();
                        $('#LoadRecordsButtonMovimiento_cierre').click();
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
        function saveCierre() {
            var bval = true;
            bval = bval && periodo.required();
            if (bval) {
                var params = {
                    'periodo': periodo.val(),
                    'estado': estado.val(),
                };

                var id_Movimiento = (idMovimiento.val() === '') ? 0 : idMovimiento.val();
                RESTService.updated('cierre_cuentas_cobrar/saveMovimientArticuloCierre', id_Movimiento, params, function (response) {
                    if (!_.isUndefined(response.status) && response.status) {
                        AlertFactory.textType({
                            title: '',
                            message: 'El registro se guard?? correctamente',
                            type: 'success'
                        });
                        periodo.prop('disabled', true);
                        btnPreCierre.prop('disabled', true);
                        btnReversar.prop('disabled', true);
                        btnCierreInventario.prop('disabled', true);
                        estado.val('C');
                        // $('#LoadRecordsButtonMovimiento_cierre2').click();
                        // $('#LoadRecordsButtonMovimiento_cierre').click();

                        // $('#table_container_Cierre_cuentas_cobrar2').click();

                        $('#LoadRecordsButtonSolicitud').click();

                        $('#table_container_solicitud').click();
                        $('#table_container_Cierre_cuentas_cobrar').click();
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
        function getDataFormMovimientoCierre() {
            RESTService.all('cierre_cuentas_cobrar/data_formMoviCierre', '', function (response) {
                if (!_.isUndefined(response.status) && response.status) {
                    var periodosTotal = response.periodos;
                    console.log(periodosTotal);
                    periodo.html("");
                    periodo.append('<option value="">Seleccionar</option>');
                    _.each(response.periodos, function (item) {
                        periodo.append('<option value="' + item.periodo + '*' + item.estado_cc + '">' + item.periodo + '</option>');
                    });
                }
            }, function () {
                getDataFormMovimientoCierre();
            });
        }

        getDataFormMovimientoCierre();
        function newCierreMovimiento() {
            titlemodalCierreCuentasCobrar.html('Nuevo Cierre');
            modalCierreCuentasCobrar.modal('show');
            // $('#LoadRecordsButtonMovimiento_cierre2').click();
            $('#LoadRecordsButtonSolicitud').click();
        }
        periodo.change(function () {
            var periodos = periodo.val();
            var myArray = periodos.split("*");
            estado.val(myArray[1]);

        });

        var search = getFormSearch('frm-search-Movimiento_cierre', 'search_b', 'LoadRecordsButtonMovimiento_cierre');

        var table_container_Cierre_cuentas_cobrar = $("#table_container_Cierre_cuentas_cobrar");
    
        table_container_Cierre_cuentas_cobrar.jtable({
            title: "Lista de Cierres de Cuentas por Cobrar",
            paging: true,
            sorting: true,
            actions: {
                listAction: base_url + '/cierre_cuentas_cobrar/list',
            },
            messages: {
                addNewRecord: 'Nuevo Cierre',
                editRecord: 'Editar Cierre',
            },
            toolbar: {
                items: [{
                    cssClass: 'buscador',
                    text: search
                }, {
                    cssClass: 'btn-primary',
                    text: '<i class="fa fa-file-excel-o"></i> Exportar a Excel',
                    click: function () {
                        $scope.openDoc('cierre_cuentas_cobrar/excel', {});
                    }
                }, {
                    cssClass: 'btn-danger-admin',
                    text: '<i class="fa fa-plus"></i> Nuevo Cierre',
                    click: function () {
                        newCierreMovimiento();
                    }
                }]
            },
            fields: {
                periodo: {
                    title: '#',
                    key: true,
                    create: false,
                },
                estado: {
                    title: 'Estado',
                    values: { 'C': 'Cerrado', 'A': 'Abierto', 'P': 'Pre-Cerrado' },
                    type: 'checkbox',
                    defaultValue: 'A',
                }
                , edit: {
                    width: '1%',
                    sorting: false,
                    edit: false,
                    create: false,
                    listClass: 'text-center',
                    display: function (data) {
                        return '<a href="javascript:void(0)" class="edit-idMovimientoCierre" data-id="' + data.record.periodo
                            + '" title="Editar"><i class="fa fa-edit fa-1-5x"></i></a>';
                    }

                },

            },
            recordsLoaded: function (event, data) {
                $('.edit-idMovimientoCierre').click(function (e) {
                    var id = $(this).attr('data-id');
                    findRegister_movementCierre(id);
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

        generateSearchForm('frm-search-Movimiento_cierre', 'LoadRecordsButtonMovimiento_cierre', function () {
            table_container_Cierre_cuentas_cobrar.jtable('load', {
                search: $('#search_b').val()
            });
        }, true);



        var search_solicitud = getFormSearchCierreSolicitud('frm-search-solicitud', 'search_b_solicitud', 'LoadRecordsButtonSolicitud',$("#periodo").val(),$("#estado").val(),$("#idMovimiento").val());

        var table_container_solicitud = $("#table_container_solicitud");

        table_container_solicitud.jtable({
            title: "Lista de Solicitudes",
            paging: true,
            sorting: true,
            actions: {
                listAction: base_url + '/cierre_cuentas_cobrar/list_solicitudes',
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
                    text: search_solicitud
                },
                //  {
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
                    title: 'C??digo',
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
                    options: { '1': 'Contado', '2': 'Cr??dito Directo', '3': 'Cr??dito Financiero', '4': "Cr??dito" },

                },
                tipo_documento: {
                    title: 'Tipo Doc.',


                },
                numero_documento: {
                    title: 'N?? Documento',


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
                // edit: {
                //     width: '1%',
                //     sorting: false,
                //     edit: false,
                //     create: false,
                //     listClass: 'text-center',
                //     display: function (data) {
                //         return '<a href="javascript:void(0)" class="edit-solicitud" data-estado="' + data.record.estado
                //             + '" data-id="' + data.record.cCodConsecutivo
                //             + '_' + data.record.nConsecutivo + '" title="Editar"><i class="fa fa-edit fa-1-5x"></i></a>';
                //     }

                // }, Eliminar: {
                //     width: '1%',
                //     sorting: false,
                //     edit: false,
                //     create: false,
                //     listClass: 'text-center',
                //     display: function (data) {
                //         return '<a data-target="#"  data-cCodConsecutivo="' + data.record.cCodConsecutivo + '" data-nConsecutivo="' + data.record.nConsecutivo + '"  data-estado="' + data.record.estado
                //             + '" data-id="' + data.record.cCodConsecutivo + '_' + data.record.nConsecutivo + '"   title="Eliminar" class="jtable-command-button eliminar-solicitud"><i class="fa fa-trash fa-1-5x fa-red"><span>Eliminar</span></i></a>';
                //     }

                // }

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
                                    message: 'La solicitud se elimin?? correctamente.',
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
                periodo: $('#periodo').val()
            });
        }, true);

    

        var search2 = getFormSearchCierre('frm-search-Movimiento_cierre2', 'search_b2', 'LoadRecordsButtonMovimiento_cierre2', $("#periodo").val(), $("#estado").val(), $("#idMovimiento").val());

        var table_container_Cierre_cuentas_cobrar2 = $("#table_container_Cierre_cuentas_cobrar2");

        table_container_Cierre_cuentas_cobrar2.jtable({
            title: "Lista  Movimientos",
            paging: true,
            sorting: true,
            actions: {
                listAction: base_url + '/cierre_cuentas_cobrar/list_movimientosCerrados',
            },
            messages: {
                addNewRecord: 'Nuevo Cierre',
                editRecord: 'Editar Cierre',
            },
            toolbar: {
                items: [{
                    cssClass: 'buscador',
                    text: search2
                }]
            },
            fields: {
                id: {
                    title: '#',
                    key: true,
                    create: false,
                    list: false,
                },
                Almacen: {
                    title: 'Almacen',
                },
                Localizacion: {
                    title: 'Localizacion',

                },
                code_article: {
                    title: 'Cod. Art??culo',
                },
                Articulo: {
                    title: 'Articulo',
                },
                Unidad: {
                    title: 'Unidad',
                },
                Lote: {
                    title: 'Lote',
                },
                Serie: {
                    title: 'Serie',
                },
                Disponible: {
                    title: 'Disponible',
                },
                Transito: {
                    title: 'En transito',
                },
                Remitido: {
                    title: 'Remitido',
                },
                Total: {
                    title: 'Total',
                    width: '10%',
                },
                CostoCierre: {
                    title: 'Costo',
                },
                TotalCosto: {
                    title: 'Costo Total',
                    width: '10%',
                    display: function (data) {
                        var total = Number(data.record.Total) * Number(data.record.CostoCierre);
                        return total.toFixed(2);
                    },
                },


            },
            recordsLoaded: function (event, data) {
                $('.edit-idMovimiento').click(function (e) {
                    var id = $(this).attr('data-id');
                    // findRegister_movement(id);
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

        generateSearchForm('frm-search-Movimiento_cierre2', 'LoadRecordsButtonMovimiento_cierre2', function () {
            $("#table_container_Cierre_cuentas_cobrar2").jtable('load', {
                search: $('#search_b2').val(),
                perido_busquedad: $('#periodo').val(),
                // estado_busquedad:$('#estado').val(),
                // idMovimientoBusquedad:$('#idMovimiento').val(),
            });
        }, true);
    }



    function Config($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('cierre_cuentas_cobrar', {
                url: '/cierre_cuentas_cobrar',
                templateUrl: base_url + '/templates/cierre_cuentas_cobrar/base.html',
                controller: 'CierreCuentasCobrarCtrl'
            });

        $urlRouterProvider.otherwise('/');
    }
})
    ();