/**
 * Created by JAIR on 4/20/2017.
 */
(function () {
    'use strict';
    angular.module('sys.app.direct_billing')
        .config(Config)
        .controller('DirectBillingCtrl', DirectBillingCtrl);

    Config.$inject = ['$stateProvider', '$urlRouterProvider'];
    DirectBillingCtrl.$inject = ['$scope', 'AlertFactory'];

    function DirectBillingCtrl($scope, AlertFactory)
    {
        moment.locale('es');

        var start = moment().startOf('month');
        var end = moment().endOf('month');

        var modalDB;
        var titleDB;
        var reqDates = $('#reqDates');

        var showDate = function (start, end) {
            reqDates.find('span').html(start.format('MMM D, YYYY') + ' - ' + end.format('MMM D, YYYY'));
            //getListRooms(start.format('YYYY-MM-DD'), end.format('YYYY-MM-DD'));
        };

        reqDates.daterangepicker({
            startDate: start,
            endDate: end,
            opens: 'left',
            showDropdowns: true,
            alwaysShowCalendars: true,
            showCustomRangeLabel: false,
            ranges: {
                'Hoy': [moment(), moment()],
                'Ayer': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                'Últimos 7 días': [moment().subtract(6, 'days'), moment()],
                'Últimos 30 días': [moment().subtract(29, 'days'), moment()],
                'Este mes': [moment().startOf('month'), moment().endOf('month')],
                'Mes pasado': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
                'Este año': [moment().startOf('year'), moment().endOf('year')],
                'Año pasado': [moment().subtract(1, 'year').startOf('year'), moment().subtract(1, 'year').endOf('year')]
            },
            locale: {
                cancelLabel: 'Cancelar',
                applyLabel: 'Aplicar',
                daysOfWeek: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá'],
                monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre',
                    'Octubre', 'Noviembre', 'Diciembre']
            }
        }, showDate);

        showDate(start, end);

        function overModals() {
            modalDB = $('#modalDB');
            titleDB = $('#titleDB');
        }

        var states = '<select id="states" class="search_input">'+
            '<option value="">Todos</option>'+
            '<option value="">Pendiente</option>'+
            '<option value="">Anulado</option>'+
            '</select>';

        var search = '<form class="form-search" id="frm-search-db">' +
            '<input type="text" id="search_db" class="input-sm search_input" name="search" autocomplete="off" placeholder="Buscar..." />' +
            '<button type="button" id="LoadRecordsButtonDB" class="btn btn-success btn-sm btn-search">' +
            '<i class="fa fa-search"></i>' +
            '</button>' +
            '</form>';

        var table_container_db = $("#table_container_db");

        table_container_db.jtable({
            title: "Lista de Facturaciones Directas",
            paging: true,
            sorting: true,
            actions: {
                listAction: function (postData, jtParams) {
                    return {
                        "Result": "OK",
                        "Records": [
                            { "code": '00228', "comprobante": "Factura", "serie": "0001", "numero": "0000000471",
                                "ruc": "20102708394", "descripcion": "ELECTRONOROESTE SA", "emision": "20/02/2017",
                                "estado": "Pendiente" },
                            { "code": '00227', "comprobante": "Factura", "serie": "0001", "numero": "0000000470",
                                "ruc": "", "descripcion": "", "emision": "20/02/2017", "estado": "Anulado" },
                            { "code": '00226', "comprobante": "Factura", "serie": "0001", "numero": "0000000469",
                                "ruc": "", "descripcion": "", "emision": "21/02/2017", "estado": "Pendiente" },
                            { "code": '00225', "comprobante": "Factura", "serie": "0001", "numero": "0000000468",
                                "ruc": "20206018411", "descripcion": "TECSUR SA", "emision": "17/02/2017",
                                "estado": "Pendiente" }
                        ],
                        "TotalRecordCount": 4
                    };
                },
                deleteAction: base_url + '/direct_billing/delete'
            },
            toolbar: {
                items: [{
                    cssClass: 'buscador',
                    text: states
                },{
                    cssClass: 'buscador',
                    text: search
                },{
                    cssClass: 'btn-primary',
                    text: '<i class="fa fa-file-excel-o"></i> Exportar a Excel',
                    click: function () {
                        window.open(base_url+'/direct_billing/excel');
                    }
                },{
                    cssClass: 'btn-success',
                    text: '<i class="fa fa-plus"></i> Nueva Facturación Directa',
                    click: function () {
                        overModals();
                        titleDB.html('Nueva Facturación Directa');
                        modalDB.modal('show');
                    }
                }]
            },
            fields: {
                id: {
                    key: true,
                    create: false,
                    edit: false,
                    list: false
                },
                code: {
                    title: 'ID',
                    width: '4%'
                },
                comprobante: {
                    title: 'Comprobante'
                },
                serie: {
                    title: 'Serie'
                },
                numero: {
                    title: 'Número'
                },
                ruc: {
                    title: 'Ruc',
                    list: show_list_
                },
                descripcion: {
                    title: 'Descripción',
                    list: show_list_
                },
                emision: {
                    title: 'Fecha Emisión',
                    list: show_list_,
                    listClass:'text-center'
                },
                estado: {
                    title: 'Estado',
                    list: show_list_
                },
                edit: {
                    width: '1%',
                    sorting: false,
                    edit: false,
                    create: false,
                    display: function (data) {
                        return '<a href="javascript:void(0)" title="Editar" class="edit_db" data-code="'+
                            data.record.id+'"><i class="fa fa-edit fa-1-5x fa-green"></i></a>';
                    }
                }
            },
            recordsLoaded: function(event, data) {
                $('.edit_db').click(function(e){
                    overModals();
                    titleDB.html('Editar Facturación Directa');
                    modalDB.modal('show');
                    e.preventDefault();
                });
            }
        });

        var LoadRecordsButtonDB = $('#LoadRecordsButtonDB');

        LoadRecordsButtonDB.click(function (e) {
            e.preventDefault();
            table_container_db.jtable('load', {
                search: $('#search_db').val()
            });
        });

        LoadRecordsButtonDB.click();

        $('#frm-search-db').submit(function (e) {
            e.preventDefault();
            LoadRecordsButtonDB.click();
        });
    }

    function Config($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('direct_billing', {
                url: '/direct_billing',
                templateUrl: base_url + '/templates/direct_billing/base.html',
                controller: 'DirectBillingCtrl'
            });

        $urlRouterProvider.otherwise('/');
    }
})
();