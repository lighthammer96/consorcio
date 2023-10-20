(function () {
    'use strict';
    angular.module('sys.app.reporteVentaClientes')
        .config(Config)
        .controller('ReporteVentaClienteCtrl', ReporteVentaClienteCtrl);

    Config.$inject = ['$stateProvider', '$urlRouterProvider'];
    ReporteVentaClienteCtrl.$inject = ['$scope', '_', 'RESTService', 'AlertFactory'];

    function ReporteVentaClienteCtrl($scope, _, RESTService, AlertFactory)
    {
        moment.locale('es');
        var start = moment().startOf('month');
        var end = moment().endOf('month');

        var chk_date_range = $('#chk_date_range');
        chk_date_range.click(function () {
            $('#LoadRecordsButtonRVC').click();
        });
        generateCheckBox('.chk_date_range_ven');

        var reqDates = $('#reqDates');

        var showDate = function (from, to) {
            start = from;
            end = to;
            reqDates.find('span').html(from.format('MMM D, YYYY') + ' - ' + to.format('MMM D, YYYY'));
            if (chk_date_range.prop('checked')) {
                $('#LoadRecordsButtonRVC').click();
            }
        };
        generateDateRangePicker(reqDates, start, end, showDate);
        showDate(start, end);

        var modalCobradores = $("#modalCobradores");
        var idCobrador = $("#idCobrador");

        $scope.chkState = function () {
            var txt_state2 = (w_state.prop('checked')) ? 'Activo' : 'Inactivo';
            state_state.html(txt_state2);
        };

        var search = getFormSearchReporteVenta('frm-search-ReporteVentaCliente', 'search_b',
            'LoadRecordsButtonRVC');

        var table_container_ReporteVentaCliente = $("#table_container_ReporteVentaCliente");

        table_container_ReporteVentaCliente.jtable({
            title: "Lista de Ventas",
            paging: true,
            sorting: true,
            actions: {
                listAction: base_url + '/reporteVentaClientes/list',
            },
            messages: {
                addNewRecord: 'Nueva Categoría',
                editRecord: 'Editar Categoría',
            },
            toolbar: {
                items: [{
                    cssClass: 'buscador',
                    text: search
                }]
            },
            fields: {
                idCategoria: {
                    key: true,
                    create: false,
                    edit: false,
                    list: false
                },
                Documento: {
                    title: 'Documento',
                },
                tipo_solicitud: {
                    title: 'tipo_solicitud',
                    options: {'1': 'CONTADO', '2': 'CRÉDITO DIRECTO', '3': 'CRÉDITO FINANCIERO', '4': 'CRÉDITO'},
                },
                convenio: {
                    title: 'convenio',
                },
                Fecha: {
                    title: 'FECHA',
                    display: function (data) {
                        return moment(data.record.Fecha).format('DD/MM/YYYY');
                    }
                },
                DocumentoCliente: {
                    title: 'DNI/RUC',
                },
                razonsocial_cliente: {
                    title: 'CLIENTE',
                },
                Direccion: {
                    title: 'DIRECCIÓN',
                },
                celular: {
                    title: 'CELULAR',
                },
                Modelo: {
                    title: 'MODELO',
                },
                Motor: {
                    title: 'MOTOR',
                },
                numero_serie: {
                    title: 'SERIE',
                },
                Color: {
                    title: 'COLOR',
                },
                cuota_inicial: {
                    title: 'INICIAL',
                    display: function (data) {
                        var saldo = data.record.cuota_inicial;
                        var newsal = Number(saldo).toFixed(2);
                        return (addCommas(newsal));
                    }
                },
                precio_unitario: {
                    title: 'PRECIO UNITARIO',
                    display: function (data) {
                        var saldo = data.record.precio_unitario;
                        var newsal = Number(saldo).toFixed(2);
                        return (addCommas(newsal));
                    }
                },
                Moneda: {
                    title: 'MONEDA',
                },
                condicion_pago: {
                    title: 'FORMA PAGO',
                },

                usuario: {
                    title: 'VENDEDOR',
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

        generateSearchForm('frm-search-ReporteVentaCliente', 'LoadRecordsButtonRVC', function () {
            table_container_ReporteVentaCliente.jtable('load', {
                search: $('#search_b').val(),
                check: (chk_date_range.prop('checked')),
                from: start.format('YYYY-MM-DD'),
                to: end.format('YYYY-MM-DD'),
                filtro_tienda: $('#filtro_tienda').val(),
                idClienteFiltro: $('#idClienteFiltro').val(),
                idVendedorFiltro: $('#idVendedorFiltro').val(),
                idcategoria: $("#idcategoria").val(),
                idTipoSolicitud: $('#idTipoSolicitud').val(),
                idConvenio: $("#idConvenio").val(),
            });
        }, true);

        $("#btn_expExcel").click(function (e) {
            var data_excel = {
                filtro_tienda: $('#filtro_tienda').val(),
                idClienteFiltro: $('#idClienteFiltro').val(),
                idVendedorFiltro: $('#idVendedorFiltro').val(),
                idcategoria: $("#idcategoria").val(),
                idTipoSolicitud: $('#idTipoSolicitud').val(),
                idConvenio: $("#idConvenio").val(),
                search: '',
                check: (chk_date_range.prop('checked')),
                from: start.format('YYYY-MM-DD'),
                to: end.format('YYYY-MM-DD'),
            };
            //             $scope.openDoc('projects/excel', data_excel);
            $scope.openDoc('reporteVentaClientes/excel', data_excel);
        });
        $("#btn_expPDF").click(function (e) {
            var data_excel = {
                filtro_tienda: $('#filtro_tienda').val(),
                idClienteFiltro: $('#idClienteFiltro').val(),
                idVendedorFiltro: $('#idVendedorFiltro').val(),
                idcategoria: $("#idcategoria").val(),
                idTipoSolicitud: $('#idTipoSolicitud').val(),
                idConvenio: $("#idConvenio").val(),
                search: '',
                check: (chk_date_range.prop('checked')),
                from: start.format('YYYY-MM-DD'),
                to: end.format('YYYY-MM-DD'),
            };
            //             $scope.openDoc('projects/excel', data_excel);
            $scope.loadPDFVC('reporteVentaClientes/pdf', data_excel);
        });


        $(".jtable-title-text").removeClass('col-md-4');
        $(".jtable-title-text").addClass('col-md-2');
        $(".buscador").removeClass('jtable-toolbar-item');

        $(".jtable-toolbar").removeClass('col-md-8');
        $(".jtable-toolbar").addClass('col-md-10');

        function getDataForm() {
            RESTService.all('reporteVentaClientes/data_form', '', function (response) {
                if (!_.isUndefined(response.status) && response.status) {
                    var cobradores = response.cobrador;
                    var cobradores = response.cobrador;
                    var clientes = response.cliente;
                    var tiendas = response.tienda;
                    var usuarios = response.usuarios;
                    var categorias = response.categorias;
                    idCobrador.append('<option value="" selected>Seleccionar</option>');
                    cobradores.map(function (index) {
                        idCobrador.append('<option value="' + index.id + '">' + index.descripcion + '</option>');
                    });
                    $("#idVendedorFiltro").append('<option value="" selected>Vendedor</option>');
                    usuarios.map(function (index) {
                        $("#idVendedorFiltro").append('<option value="' + index.idvendedor + '">' + index.descripcion + '</option>');
                    });
                    $("#idcategoria").append('<option value="" selected>Categoría</option>');
                    categorias.map(function (index) {
                        $("#idcategoria").append('<option value="' + index.idCategoria + '">' + index.descripcion + '</option>');
                    });

                    $("#idClienteFiltro").append('<option value="" selected>Clientes</option>');
                    clientes.map(function (index) {
                        $("#idClienteFiltro").append('<option value="' + index.id + '">' + index.razonsocial_cliente + '</option>');
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
        $("#idClienteFiltro").select2();

        function getConvenio() {
            var id = 0;
            RESTService.get('reporteVentaClientes/traerConvenios', id, function (response) {
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
    }

    function Config($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('reporteVentaClientes', {
                url: '/reporteVentaClientes',
                templateUrl: base_url + '/templates/reporteVentaClientes/base.html',
                controller: 'ReporteVentaClienteCtrl'
            });

        $urlRouterProvider.otherwise('/');
    }
})
();