/**
 * Created by JAIR on 4/5/2017.
 */

(function () {
    'use strict';
    angular.module('sys.app.reporteComisiones')
        .config(Config)
        .controller('ReporteComisiones', ReporteComisiones);

    Config.$inject = ['$stateProvider', '$urlRouterProvider'];
    ReporteComisiones.$inject = ['$scope', '_', 'RESTService', 'AlertFactory', 'Helpers'];

    function ReporteComisiones($scope, _, RESTService, AlertFactory, Helpers) {


        var modalCobradores = $("#modalCobradores");
        var idCobrador = $("#idCobrador");

        $scope.chkState = function () {
            var txt_state2 = (w_state.prop('checked')) ? 'Activo' : 'Inactivo';
            state_state.html(txt_state2);
        };

        var search = getFormSearchReporteComisiones('frm-search-ReporteComisiones', 'search_b', 'LoadRecordsButtonReporteComisiones');

        var table_container_ReporteComisiones = $("#table_container_ReporteComisiones");

        table_container_ReporteComisiones.jtable({
            title: "Lista de Comisiones",
            paging: true,
            sorting: true,
            actions: {
                listAction: base_url + '/reporteComisiones/list',
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
                IdVendedor: {
                    key: true,
                    create: false,
                    edit: false,
                    list: false
                },
                Vendedor: {
                    title: 'Vendedor',
                },
                Cliente: {
                    title: 'Cliente',

                },
                Documento: {
                    title: 'Documento',
                },
                Numero: {
                    title: 'Numero',

                },
                FechaDoc: {
                    title: 'FechaDoc',
                },
                Monto: {
                    title: 'Monto',
                },
                TipoCambio: {
                    title: 'TipoCambio',
                },
                Moneda: {
                    title: 'Moneda',
                },
                PorcComision: {
                    title: 'PorcComision',
                },
                ComisionSoles: {
                    title: 'ComisionSoles',
                },
                CondPago: {
                    title: 'CondPago',
                },
                Vehículo: {
                    title: 'Vehículo',
                },
                Convenio: {
                    title: 'Convenio',

                },
                PrecioLista: {
                    title: 'PrecioLista',

                },
                Descuento: {
                    title: 'Descuento',
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
                    };
                });
            },
            formSubmitting: function (event, data) {
                var bval = true;
                bval = bval && data.form.find('input[name="Categoria"]').required();
                return bval;
            }
        });

        generateSearchForm('frm-search-ReporteComisiones', 'LoadRecordsButtonReporteComisiones', function () {
            table_container_ReporteComisiones.jtable('load', {
                search: $('#search_b').val(),
                filtro_tienda: $('#filtro_tienda').val(),
                idClienteFiltro: $('#idClienteFiltro').val(),
                idVendedorFiltro: $('#idVendedorFiltro').val(),
                FechaInicioFiltro: $('#FechaInicioFiltro').val(),
                FechaFinFiltro: $('#FechaFinFiltro').val(),
                idcategoria: $("#idcategoria").val(),
                idTipoSolicitud: $('#idTipoSolicitud').val(),
                idConvenio: $("#idConvenio").val(),

            });
        }, true);

        $("#btn_expExcel").click(function (e) {
            var data_excel = {
                // filtro_tienda: $('#filtro_tienda').val(),
                idClienteFiltro: $('#idClienteFiltro').val(),
                idVendedorFiltro: $('#idVendedorFiltro').val(),
                FechaInicioFiltro: $('#FechaInicioFiltro').val(),
                FechaFinFiltro: $('#FechaFinFiltro').val(),
                // idcategoria: $("#idcategoria").val(),
                // idTipoSolicitud: $('#idTipoSolicitud').val(),
                // idConvenio: $("#idConvenio").val(),
                search: '',
            };
            //             $scope.openDoc('projects/excel', data_excel);
            $scope.openDoc('reporteComisiones/excel', data_excel);
        });
        $("#btn_expPDF").click(function (e) {
            var data_excel = {
                filtro_tienda: $('#filtro_tienda').val(),
                idClienteFiltro: $('#idClienteFiltro').val(),
                idVendedorFiltro: $('#idVendedorFiltro').val(),
                FechaInicioFiltro: $('#FechaInicioFiltro').val(),
                FechaFinFiltro: $('#FechaFinFiltro').val(),
                idcategoria: $("#idcategoria").val(),
                idTipoSolicitud: $('#idTipoSolicitud').val(),
                idConvenio: $("#idConvenio").val(),
                search: '',
            };
            //             $scope.openDoc('projects/excel', data_excel);
            $scope.loadPDFVC('reporteComisiones/pdf', data_excel);
        });


        $(".jtable-title-text").removeClass('col-md-4');
        $(".jtable-title-text").addClass('col-md-2');
        $(".buscador").removeClass('jtable-toolbar-item');

        $(".jtable-toolbar").removeClass('col-md-8');
        $(".jtable-toolbar").addClass('col-md-10');
        function getDataForm() {
            RESTService.all('reporteComisiones/data_form', '', function (response) {
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
            RESTService.get('reporteComisiones/traerConvenios', id, function (response) {
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

            .state('reporteComisiones', {
                url: '/reporteComisiones',
                templateUrl: base_url + '/templates/reporteComisiones/base.html',
                controller: 'ReporteComisiones'
            });

        $urlRouterProvider.otherwise('/');
    }
})
    ();