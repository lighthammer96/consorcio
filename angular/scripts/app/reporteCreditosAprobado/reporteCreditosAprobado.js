/**
 * Created by JAIR on 4/5/2017.
 */

(function () {
    'use strict';
    angular.module('sys.app.reporteCreditosAprobados')
        .config(Config)
        .controller('ReporteCreditosAprobadoCtrl', ReporteCreditosAprobadoCtrl);

    Config.$inject = ['$stateProvider', '$urlRouterProvider'];
    ReporteCreditosAprobadoCtrl.$inject = ['$scope', '_', 'RESTService', 'AlertFactory', 'Helpers'];

    function ReporteCreditosAprobadoCtrl($scope, _, RESTService, AlertFactory, Helpers) {

        $scope.chkState = function () {
            var txt_state2 = (w_state.prop('checked')) ? 'Activo' : 'Inactivo';
            state_state.html(txt_state2);
        };

        var search = getFormSearchReporteCreditosAprobados('frm-search-ReporteCreditosAprobado', 'search_b', 'LoadRecordsButtonReporteCreditosAprobado');

        var table_container_ReporteCreditosAprobado = $("#table_container_ReporteCreditosAprobado");

        table_container_ReporteCreditosAprobado.jtable({
            title: "Lista de Ventas",
            paging: true,
            sorting: true,
            actions: {
                listAction: base_url + '/reporteCreditosAprobados/list',
                // createAction: base_url + '/reporteCreditosAprobados/create',
                // updateAction: base_url + '/reporteCreditosAprobados/update',
                // deleteAction: base_url + '/reporteCreditosAprobados/delete',
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
                    options: { '1': 'CONTADO', '2': 'CRÉDITO DIRECTO', '3': 'CRÉDITO FINANCIERO', '4': 'CRÉDITO' },
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
                    title: 'Vndedor',


                },
                estado: {
                    title: 'Estado',
                    options: { '1': 'Registrado', '2': 'Vigente', '3': 'Por Aprobar', '4': 'Aprobado', '5': 'Rechazado', '6': 'Facturado', '7': 'Despachado' },
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
        // $('.reporteCreditosAprobados').click(function (e) {

        //             var data_pdf = {
        //                     nConsecutivo:"",
        //             };
        //             $scope.loadTarjetaCobranzaPDF('reporteCreditosAprobados/tarjetaCobranza',data_pdf);

        //             e.preventDefault();
        // });
        generateSearchForm('frm-search-ReporteCreditosAprobado', 'LoadRecordsButtonReporteCreditosAprobado', function () {
            table_container_ReporteCreditosAprobado.jtable('load', {
                search: $('#search_b').val(),
                filtro_tienda: $('#filtro_tienda').val(),
                idClienteFiltro: $('#idClienteFiltro').val(),
                idVendedorFiltro: $('#idVendedorFiltro').val(),
                FechaInicioFiltro: $('#FechaInicioFiltro').val(),
                FechaFinFiltro: $('#FechaFinFiltro').val(),
                idTipoSolicitud: $('#idTipoSolicitud').val(),
                idConvenio: $("#idConvenio").val(),

            });
        }, true);

        $("#btn_expExcel").click(function (e) {
            var data_excel = {
                filtro_tienda: $('#filtro_tienda').val(),
                idClienteFiltro: $('#idClienteFiltro').val(),
                idVendedorFiltro: $('#idVendedorFiltro').val(),
                FechaInicioFiltro: $('#FechaInicioFiltro').val(),
                FechaFinFiltro: $('#FechaFinFiltro').val(),
                idTipoSolicitud: $('#idTipoSolicitud').val(),
                idConvenio: $("#idConvenio").val(),
                search: '',
            };
            //             $scope.openDoc('projects/excel', data_excel);
            $scope.openDoc('reporteCreditosAprobados/excel', data_excel);
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
            $scope.loadReporteCreditosAprobadoPDF('reporteCreditosAprobados/pdf', data_excel);
        });


        $(".jtable-title-text").removeClass('col-md-4');
        $(".jtable-title-text").addClass('col-md-2');
        $(".buscador").removeClass('jtable-toolbar-item');

        $(".jtable-toolbar").removeClass('col-md-8');
        $(".jtable-toolbar").addClass('col-md-10');
        function getDataForm() {
            RESTService.all('reporteCreditosAprobados/data_form', '', function (response) {
                if (!_.isUndefined(response.status) && response.status) {
                    var cobradores = response.cobrador;
                    var cobradores = response.cobrador;
                    var clientes = response.cliente;
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