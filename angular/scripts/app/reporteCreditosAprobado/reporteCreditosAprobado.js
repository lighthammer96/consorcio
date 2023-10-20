(function () {
    'use strict';
    angular.module('sys.app.reporteCreditosAprobados')
        .config(Config)
        .controller('ReporteCreditosAprobadoCtrl', ReporteCreditosAprobadoCtrl);

    Config.$inject = ['$stateProvider', '$urlRouterProvider'];
    ReporteCreditosAprobadoCtrl.$inject = ['$scope', '_', 'RESTService', 'AlertFactory'];

    function ReporteCreditosAprobadoCtrl($scope, _, RESTService, AlertFactory) {
        moment.locale('es');
        var start = moment().startOf('month');
        var end = moment().endOf('month');

        var chk_date_range = $('#chk_date_range');
        chk_date_range.click(function () {
            $('#LoadRecordsButtonRCA').click();
        });
        generateCheckBox('.chk_date_range_r');

        var reqDates = $('#reqDates');

        var showDate = function (from, to) {
            start = from;
            end = to;
            reqDates.find('span').html(from.format('MMM D, YYYY') + ' - ' + to.format('MMM D, YYYY'));
            if (chk_date_range.prop('checked')) {
                $('#LoadRecordsButtonRCA').click();
            }
        };
        generateDateRangePicker(reqDates, start, end, showDate);
        showDate(start, end);

        var modalClient = $('div#modalClient');
        modalClient.on('show.bs.modal', function (e) {
            $('#LoadRecordsButtonCli').click();
        });
        modalClient.on('hidden.bs.modal', function (e) {
            $('#search_cli').val('');
            $('#LoadRecordsButtonCli').click();
        });

        var r_client_id = '';
        var r_client = $('input#r_client');

        $scope.chkState = function () {
            var txt_state2 = (w_state.prop('checked')) ? 'Activo' : 'Inactivo';
            state_state.html(txt_state2);
        };

        var search = getFormSearchReporteCreditosAprobados('frm-search-ReporteCreditosAprobado',
            'search_b', 'LoadRecordsButtonRCA');

        var table_container_ReporteCreditosAprobado = $("#table_container_ReporteCreditosAprobado");

        table_container_ReporteCreditosAprobado.jtable({
            title: "Lista de Ventas",
            paging: true,
            sorting: true,
            actions: {
                listAction: base_url + '/reporteCreditosAprobados/list',
            },
            messages: {
                addNewRecord: 'Nueva Categoría',
                editRecord: 'Editar Categoría',
            },
            toolbar: {
                items: [{
                    cssClass: 'buscador',
                    text: search
                },
                    // {
                    //     cssClass: 'btn-primary',
                    //     text: '<i class="fa fa-file-excel-o"></i> Exportar a Excel',
                    //     click: function () {
                    //         $scope.openDoc('reporteCreditosAprobados/excel', {});
                    //     }
                    // },
                    // {
                    //     cssClass: 'btn-success',
                    //     text: '<i class="fa fa-file-pdf-o"></i> Reporte pdf',
                    //     click: function () {
                    //             var data_pdf = {
                    //                nConsecutivo:"",
                    //             };
                    //             $scope.loadReporteCreditosAprobadoPDF('reporteCreditosAprobados/pdf',data_pdf);
                    //     }
                    // }
                ]
            },
            fields: {
                cCodConsecutivo: {
                    title: 'Codigo',
                },

                nConsecutivo: {
                    title: 'N°',
                },
                tipo_solicitud: {
                    title: 'tipo_solicitud',
                    options: {'1': 'CONTADO', '2': 'CRÉDITO DIRECTO', '3': 'CRÉDITO FINANCIERO', '4': 'CRÉDITO'},
                },
                convenio: {
                    title: 'convenio',
                },
                fecha_solicitud: {
                    title: 'Fecha venta',
                    display: function (data) {
                        return moment(data.record.fecha_solicitud).format('DD/MM/YYYY');
                    }

                },
                razonsocial_cliente: {
                    title: 'Cliente',


                },
                fecdoc: {
                    title: 'Fecha venta',
                    display: function (data) {
                        return moment(data.record.fecdoc).format('DD/MM/YYYY');
                    }

                },
                serie_comprobante: {
                    title: 'Serie',


                },
                numero_comprobante: {
                    title: 'N° Comprobante',
                },
                Credito: {
                    title: 'Crédito',
                    display: function (data) {
                        var saldo = data.record.Credito;
                        var newsal = redondeodecimale(saldo).toFixed(2);
                        return (addCommas(newsal));
                    }
                },
                vendedor: {
                    title: 'Vendedor',
                },
                estado: {
                    title: 'Estado',
                    options: {
                        '1': 'Registrado',
                        '2': 'Vigente',
                        '3': 'Por Aprobar',
                        '4': 'Aprobado',
                        '5': 'Rechazado',
                        '6': 'Facturado',
                        '7': 'Despachado'
                    },
                },
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
        // $('.reporteCreditosAprobados').click(function (e) {

        //             var data_pdf = {
        //                     nConsecutivo:"",
        //             };
        //             $scope.loadTarjetaCobranzaPDF('reporteCreditosAprobados/tarjetaCobranza',data_pdf);

        //             e.preventDefault();
        // });
        generateSearchForm('frm-search-ReporteCreditosAprobado', 'LoadRecordsButtonRCA', function () {
            table_container_ReporteCreditosAprobado.jtable('load', {
                search: $('#search_b').val(),
                filtro_tienda: $('#filtro_tienda').val(),
                idClienteFiltro: r_client_id,
                idVendedorFiltro: $('#idVendedorFiltro').val(),
                idTipoSolicitud: $('#idTipoSolicitud').val(),
                idConvenio: $("#idConvenio").val(),
                check: (chk_date_range.prop('checked')),
                from: start.format('YYYY-MM-DD'),
                to: end.format('YYYY-MM-DD')
            });
        }, true);

        $("#btn_expExcel").click(function (e) {
            $scope.openDoc('reporteCreditosAprobados/excel', {
                filtro_tienda: $('#filtro_tienda').val(),
                idClienteFiltro: r_client_id,
                idVendedorFiltro: $('#idVendedorFiltro').val(),
                idTipoSolicitud: $('#idTipoSolicitud').val(),
                idConvenio: $("#idConvenio").val(),
                check: (chk_date_range.prop('checked')),
                from: start.format('YYYY-MM-DD'),
                to: end.format('YYYY-MM-DD')
            });
        });
        $("#btn_expPDF").click(function (e) {
            $scope.loadReporteCreditosAprobadoPDF('reporteCreditosAprobados/pdf', {
                filtro_tienda: $('#filtro_tienda').val(),
                idClienteFiltro: r_client_id,
                idVendedorFiltro: $('#idVendedorFiltro').val(),
                idcategoria: $("#idcategoria").val(),
                idTipoSolicitud: $('#idTipoSolicitud').val(),
                idConvenio: $("#idConvenio").val(),
                check: (chk_date_range.prop('checked')),
                from: start.format('YYYY-MM-DD'),
                to: end.format('YYYY-MM-DD')
            });
        });


        $(".jtable-title-text").removeClass('col-md-4');
        $(".jtable-title-text").addClass('col-md-2');
        $(".buscador").removeClass('jtable-toolbar-item');

        $(".jtable-toolbar").removeClass('col-md-8');
        $(".jtable-toolbar").addClass('col-md-10');

        function getDataForm() {
            RESTService.all('reporteCreditosAprobados/data_form', '', function (response) {
                if (!_.isUndefined(response.status) && response.status) {
                    // var cobradores = response.cobrador;
                    // var clientes = response.cliente;
                    var tiendas = response.tienda;
                    var vendedores = response.vendedores;
                    var categorias = response.categorias;
                    // idCobrador.append('<option value="" selected>Seleccionar</option>');
                    // cobradores.map(function (index) {
                    //    idCobrador.append('<option value="'+index.id+'">'+index.descripcion+'</option>');
                    // });
                    $("#idVendedorFiltro").append('<option value="" selected>Vendedor</option>');
                    vendedores.map(function (index) {
                        $("#idVendedorFiltro").append('<option value="' + index.idvendedor + '">' + index.descripcion + '</option>');
                    });
                    $("#idcategoria").append('<option value="" selected>Categoría</option>');
                    categorias.map(function (index) {
                        $("#idcategoria").append('<option value="' + index.idCategoria + '">' + index.descripcion + '</option>');
                    });

                    $("#filtro_tienda").append('<option value="" selected>Tiendas</option>');
                    tiendas.map(function (index) {
                        $("#filtro_tienda").append('<option value="' + index.idTienda + '">' + index.descripcion + '</option>');
                    });

                }
            }, function () {
                getDataForm();
            });
        }

        getDataForm();
        $("#idVendedorFiltro").select2();


        function getConvenio() {
            var id = 0;
            RESTService.get('reporteCreditosAprobados/traerConvenios', id, function (response) {
                if (!_.isUndefined(response.status) && response.status) {
                    var data_p = response.data;
                    $("#idConvenio").html('');
                    $("#idConvenio").append('<option value="" >Convenio</option>');
                    _.each(response.data, function (item) {
                        $("#idConvenio").append('<option value="' + item.idconvenio + '">' + item.descripcionconvenio + '</option>');
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

        $("#idTipoSolicitud").val();
        $("#idConvenio").val();

        $("#idTipoSolicitud").change(function () {
            var id = $("#idTipoSolicitud").val();
            if (id == '3') {
                getConvenio();
            } else {
                $("#idConvenio").html('');
                $("#idConvenio").append('<option value="" >Convenio</option>');
            }

        });

        var search_cli = getFormSearch('frm-search-cli', 'search_cli', 'LoadRecordsButtonCli');

        var table_container_client = $("#table_container_client");

        table_container_client.jtable({
            title: "Lista de Clientes",
            paging: true,
            actions: {
                listAction: base_url + '/reporteCreditosAprobados/listClient'
            },
            toolbar: {
                items: [{
                    cssClass: 'buscador',
                    text: search_cli
                }]
            },
            fields: {
                id: {
                    key: true,
                    create: false,
                    edit: false,
                    list: false
                },
                documento: {
                    title: 'Documento',
                },
                razonsocial_cliente: {
                    title: 'Razon Social',
                },
                contacto: {
                    title: 'Contacto',
                },
                direccion: {
                    title: 'Dirección',
                },
                correo_electronico: {
                    title: 'Correo',
                },
                celular: {
                    title: 'Celular',
                },
                edit: {
                    width: '1%',
                    sorting: false,
                    edit: false,
                    create: false,
                    listClass: 'text-center',
                    display: function (data) {
                        return '<a href="javascript:void(0)" class="sel-cli" data-id="' + data.record.id
                            + '" title="Seleccionar"><i class="fa fa-check-circle fa-1-5x"></i></a>';
                    }
                }
            },
            recordsLoaded: function (event, data) {
                table_container_client.find('a.sel-cli').click(function (e) {
                    var id = $(this).attr('data-id');
                    var info = _.find(data.records, function (item) {
                        return parseInt(item.id) === parseInt(id);
                    });
                    if (info) {
                        r_client_id = info.id;
                        r_client.val(info.razonsocial_cliente);
                    }
                    modalClient.modal('hide');
                    e.preventDefault();
                });
            }
        });

        generateSearchForm('frm-search-cli', 'LoadRecordsButtonCli', function () {
            table_container_client.jtable('load', {
                search: $('#search_cli').val()
            });
        }, false);

        $scope.openClient = function () {
            modalClient.modal('show');
        };

        $scope.cleanClient = function () {
            r_client_id = '';
            r_client.val('');
        };

    }

    function Config($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('reporteCreditosAprobados', {
                url: '/reporteCreditosAprobados',
                templateUrl: base_url + '/templates/reporteCreditosAprobados/base.html',
                controller: 'ReporteCreditosAprobadoCtrl'
            });

        $urlRouterProvider.otherwise('/');
    }
})
();