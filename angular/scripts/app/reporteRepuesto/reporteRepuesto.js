/**
 * Created by JAIR on 4/5/2017.
 */

(function () {
    'use strict';
    angular.module('sys.app.reporteRepuestos')
        .config(Config)
        .controller('ReporteRepuestoCtrl', ReporteRepuestoCtrl);

    Config.$inject = ['$stateProvider', '$urlRouterProvider'];
    ReporteRepuestoCtrl.$inject = ['$scope', '_', 'RESTService', 'AlertFactory', 'Helpers'];

    function ReporteRepuestoCtrl($scope, _, RESTService, AlertFactory, Helpers) {

        $scope.chkState = function () {
            var txt_state2 = (w_state.prop('checked')) ? 'Activo' : 'Inactivo';
            state_state.html(txt_state2);
        };

        var search = getFormSearchReporteRepuestos('frm-search-ReporteRepuesto', 'search_b', 'LoadRecordsButtonReporteRepuesto');

        var table_container_ReporteRepuesto = $("#table_container_ReporteRepuesto");

        table_container_ReporteRepuesto.jtable({
            title: "Lista de Solicitudes Aprobadas",
            paging: true,
            sorting: true,
            actions: {
                listAction: base_url + '/reporteRepuestos/list',
                // createAction: base_url + '/reporteRepuestos/create',
                // updateAction: base_url + '/reporteRepuestos/update',
                // deleteAction: base_url + '/reporteRepuestos/delete',
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
                    //         $scope.openDoc('reporteRepuestos/excel', {});
                    //     }
                    // },
                    // {
                    //     cssClass: 'btn-success',
                    //     text: '<i class="fa fa-file-pdf-o"></i> Reporte pdf',
                    //     click: function () {
                    //             var data_pdf = {
                    //                nConsecutivo:"",
                    //             };
                    //             $scope.loadReporteRepuestoPDF('reporteRepuestos/pdf',data_pdf);
                    //     }
                    // }
                ]
            },
            fields: {
                idventa_ca: {
                    key: true,
                    create: false,
                    edit: false,
                    list: false
                },
                cCodConsecutivo: {
                    title: 'Codigo',


                },

                nConsecutivo: {
                    title: 'N°',


                },
                documento_ven: {
                    title: 'Documento venta',


                },
                fecha: {
                    title: 'Fecha venta',
                    display: function (data) {
                        return moment(data.record.fecha).format('DD/MM/YYYY');
                    }

                },
                monto_total: {
                    title: 'Monto Total',
                    display: function (data) {
                        var saldo = data.record.monto_total;
                        var newsal = Number(saldo).toFixed(2);
                        return (addCommas(newsal));
                    }

                },
                razonsocial_cliente: {
                    title: 'Cliente',


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
        // $('.reporteRepuestos').click(function (e) {

        //             var data_pdf = {
        //                     nConsecutivo:"",
        //             };
        //             $scope.loadTarjetaCobranzaPDF('reporteRepuestos/tarjetaCobranza',data_pdf);

        //             e.preventDefault();
        // });
        generateSearchForm('frm-search-ReporteRepuesto', 'LoadRecordsButtonReporteRepuesto', function () {
            table_container_ReporteRepuesto.jtable('load', {
                search: $('#search_b').val(),
                filtro_tienda: $('#filtro_tienda').val(),
                idClienteFiltro: $('#idClienteFiltro').val(),
                idVendedorFiltro: $('#idVendedorFiltro').val(),
                FechaInicioFiltro: $('#FechaInicioFiltro').val(),
                FechaFinFiltro: $('#FechaFinFiltro').val(),

            });
        }, true);

        $("#btn_expExcel").click(function (e) {
            var data_excel = {
                filtro_tienda: $('#filtro_tienda').val(),
                idClienteFiltro: $('#idClienteFiltro').val(),
                idVendedorFiltro: $('#idVendedorFiltro').val(),
                FechaInicioFiltro: $('#FechaInicioFiltro').val(),
                FechaFinFiltro: $('#FechaFinFiltro').val(),
                search: '',
            };
            //             $scope.openDoc('projects/excel', data_excel);
            $scope.openDoc('reporteRepuestos/excel', data_excel);
        });
        $("#btn_expPDF").click(function (e) {
            var data_excel = {
                filtro_tienda: $('#filtro_tienda').val(),
                idClienteFiltro: $('#idClienteFiltro').val(),
                idVendedorFiltro: $('#idVendedorFiltro').val(),
                FechaInicioFiltro: $('#FechaInicioFiltro').val(),
                FechaFinFiltro: $('#FechaFinFiltro').val(),
                idcategoria: $("#idcategoria").val(),
                search: '',
            };
            //             $scope.openDoc('projects/excel', data_excel);
            $scope.loadReporteRepuestoPDF('reporteRepuestos/pdf', data_excel);
        });


        $(".jtable-title-text").removeClass('col-md-4');
        $(".jtable-title-text").addClass('col-md-2');
        $(".buscador").removeClass('jtable-toolbar-item');

        $(".jtable-toolbar").removeClass('col-md-8');
        $(".jtable-toolbar").addClass('col-md-10');
        function getDataForm() {
            RESTService.all('reporteRepuestos/data_form', '', function (response) {
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
    }

    function Config($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('reporteRepuestos', {
                url: '/reporteRepuestos',
                templateUrl: base_url + '/templates/reporteRepuestos/base.html',
                controller: 'ReporteRepuestoCtrl'
            });

        $urlRouterProvider.otherwise('/');
    }
})
();