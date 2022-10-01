
/**
 * Created by JAIR on 4/5/2017.
 */

(function () {
    'use strict';
    angular.module('sys.app.reporteDocumentosEmitidos')
        .config(Config)
        .controller('ReporteDocumentosEmitidosCtrl', ReporteDocumentosEmitidosCtrl);

    Config.$inject = ['$stateProvider', '$urlRouterProvider'];
    ReporteDocumentosEmitidosCtrl.$inject = ['$scope', 'AlertFactory', 'RESTService'];

    function ReporteDocumentosEmitidosCtrl($scope, AlertFactory, RESTService) {

        //var search = getFormSearch('frm-search-ventas', 'search_b_ventas', 'LoadRecordsButtonVentas');
        var search = getFormSearchComprobantes('frm-search-ventas', 'search_b_ventas', 'LoadRecordsButtonVentas');

        var table_container_ventas = $("#table_container_ventas");

        table_container_ventas.jtable({
            title: "Reporte de Documentos Emitidos",
            paging: true,
            sorting: true,
            actions: {
                listAction: base_url + '/reporteDocumentosEmitidos/list',
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
                            search: $('#search_b_ventas').val(),
                            FechaInicioFiltro: $('#FechaInicioFiltro').val(),
                            FechaFinFiltro: $('#FechaFinFiltro').val(),
                            idClienteFiltro: $('#idClienteFiltro').val(),
                            id_tipo_doc: $('#id_tipo_doc').val(),
                            estado_cpe: $('#estado_cpe').val(),
                        };

                        $scope.openDoc('reporteDocumentosEmitidos/excel', data_excel);
                    }
                }]
            },
            fields: {
                TipoDoc: {
                    title: 'Tipo Doc.'
                },
                TipoDocumento: {
                    title: 'Tipo Documento'
                },
                Documento: {
                    key: true,
                    title: 'Documento',
                },
                FechaEmision: {
                    title: 'Fecha Emision',
                    /*
                    display: function (data) {
                        return moment(data.record.FechaEmision).format('DD/MM/YYYY');
                    }
                    */
                },
                NumeroDoc: {
                    title: 'Numero Doc.',
                    list: false,

                },
                Cliente: {
                    title: 'Cliente',
                },
                Moneda: {
                    title: 'Moneda',
                },
                Total: {
                    title: 'Total',
                },
                Solarizado: {
                    title: 'Solarizado',
                },
                Glosa: {
                    title: 'Glosa',
                },
                Anulado: {
                    title: 'Anulado',
                },
                EstadoSunat: {
                    title: 'Estado Sunat',
                },
                TipoDocRef: {
                    title: 'Tipo Doc. Ref.',
                },
                DocumentoRef: {
                    title: 'Documento Ref.',
                },
                FechaEmisionRef: {
                    title: 'Fecha Emision Ref.',
                    display: function (data) {
                        var fecha = moment(data.record.FechaEmisionRef);
                        if (fecha.isValid())
                            return moment(data.record.FechaEmisionRef).format('YYYY/MM/DD');
                        else
                            return '';
                    }
                }
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
            RESTService.all('reporteDocumentosEmitidos/data_form', '', function (response) {
                if (!_.isUndefined(response.status) && response.status) {
                    $("#idClienteFiltro").append('<option value="">Seleccionar</option>');
                    _.each(response.clientes, function (item) {
                        $("#idClienteFiltro").append('<option value="' + item.razonsocial_cliente + '">' + item.razonsocial_cliente + '</option>');
                    });
                    $("#idClienteFiltro").select2();
                }
            }, function () {
                obtener_data_for_venta();
            });
        }

        obtener_data_for_venta();
    }

    function Config($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('reporteDocumentosEmitidos', {
                url: '/reporteDocumentosEmitidos',
                templateUrl: base_url + '/templates/reporteDocumentosEmitidos/base.html',
                controller: 'ReporteDocumentosEmitidosCtrl'
            });

        $urlRouterProvider.otherwise('/');
    }
})
();
