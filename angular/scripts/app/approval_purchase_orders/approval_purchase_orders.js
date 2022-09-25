/**
 * Created by JAIR on 4/19/2017.
 */
(function () {
    'use strict';
    angular.module('sys.app.approval_purchase_orders')
        .config(Config)
        .controller('ApprovalPurchaseOrderCtrl', ApprovalPurchaseOrderCtrl);

    Config.$inject = ['$stateProvider', '$urlRouterProvider'];
    ApprovalPurchaseOrderCtrl.$inject = ['$scope', 'AlertFactory'];

    function ApprovalPurchaseOrderCtrl($scope, AlertFactory)
    {
        moment.locale('es');

        var start = moment().startOf('month');
        var end = moment().endOf('month');

        var modalPO;

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
            modalPO = $('#modalPO');
        }

        var search = getFormSearch('frm-search-po', 'search_po', 'LoadRecordsButtonPO');

        var table_container_po = $("#table_container_apo");

        table_container_po.jtable({
            title: "Lista de Ordenes de Compra por Aprobar",
            paging: true,
            sorting: true,
            actions: {
                listAction: function (postData, jtParams) {
                    return {
                        "Result": "OK",
                        "Records": [
                            { "oc": '20170518', "proyecto": "CONEXIONES MASIVAS", "proveedor": "CLAUDIO PIÑAN ROSARIO",
                                "estado": 0, "fecha_emision": "13/04/2017" }
                        ],
                        "TotalRecordCount": 1
                    };
                }
            },
            toolbar: {
                items: [{
                    cssClass: 'buscador',
                    text: search
                },{
                    cssClass: 'btn-primary',
                    text: '<i class="fa fa-file-excel-o"></i> Exportar a Excel',
                    click: function () {
                        window.open(base_url+'/purchase_orders/excel');
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
                oc: {
                    title: 'Nro. O/C'
                },
                proyecto: {
                    title: 'Proyecto'
                },
                proveedor: {
                    title: 'Proveedor'
                },
                estado: {
                    title: 'Estado',
                    options: { 1: 'Aprobado', 0: 'Registrado' },
                    list: show_list_
                },
                fecha_emision: {
                    title: 'Fecha Emisión',
                    list: show_list_,
                    listClass:'text-center'
                },
                edit: {
                    width: '1%',
                    sorting: false,
                    edit: false,
                    create: false,
                    display: function (data) {
                        return '<a href="javascript:void(0)" title="Ver" class="edit_po" data-code="'+
                            data.record.id+'"><i class="fa fa-edit fa-1-5x"></i></a>';
                    }
                }
            },
            recordsLoaded: function(event, data) {
                $('.edit_po').click(function(e){
                    //var code = $(this).attr('data-code');
                    overModals();
                    modalPO.modal('show');
                    e.preventDefault();
                });
            }
        });

        generateSearchForm('frm-search-po', 'LoadRecordsButtonPO', function(){
            table_container_po.jtable('load', {
                search: $('#search_po').val()
            });
        }, true);
    }

    function Config($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('approval_purchase_orders', {
                url: '/approval_purchase_orders',
                templateUrl: base_url + '/templates/approval_purchase_orders/base.html',
                controller: 'ApprovalPurchaseOrderCtrl'
            });

        $urlRouterProvider.otherwise('/');
    }
})
();