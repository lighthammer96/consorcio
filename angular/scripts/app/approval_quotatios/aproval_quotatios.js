/**
 * Created by JAIR on 4/25/2017.
 */
(function () {
    'use strict';
    angular.module('sys.app.approval_contests')
        .config(Config)
        .controller('ApprovalQuotationCtrl', ApprovalQuotationCtrl);

    Config.$inject = ['$stateProvider', '$urlRouterProvider'];
    ApprovalQuotationCtrl.$inject = ['$scope', 'AlertFactory'];

    function ApprovalQuotationCtrl($scope, AlertFactory)
    {
        moment.locale('es');

        var start = moment().startOf('month');
        var end = moment().endOf('month');

        var modalC;
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
            modalC = $('#modalC');
        }

        $scope.reject = function()
        {
            var modalCo = $('#modalComment');

            modalCo.on('hidden.bs.modal', function (e) {
                modalC.attr('style', 'display:block;');
            });
            modalCo.on('show.bs.modal', function (e) {
                modalC.attr('style', 'display:block; z-index:2030 !important');
                $('#comment_reject').focus();
            });

            modalCo.modal('show');
        };

        var search = getFormSearch('frm-search-q', 'search_q', 'LoadRecordsButtonQ');

        var table_container_q = $("#table_container_q");

        table_container_q.jtable({
            title: "Lista de Cotizaciones por Aprobar",
            paging: true,
            sorting: true,
            actions: {
                listAction: function (postData, jtParams) {
                    return {
                        "Result": "OK",
                        "Records": [
                            { "cotizacion": '20170158', "fecha_emision": "01/04/2017", "solictado_po": "JARRISON MORI",
                                "descripcion": "COTIZACION COMPRA MATERIALES" },
                            { "cotizacion": '20170159', "fecha_emision": "02/04/2017", "solictado_po": "JARRISON MORI",
                                "descripcion": "COTIZACION COMPRA MATERIALES CONTRUCCION" },
                            { "cotizacion": '20170160', "fecha_emision": "02/04/2017", "solictado_po": "JARRISON MORI",
                                "descripcion": "COTIZACION COMPRA MATERIALES CONTRUCCION VIVIENDA" },
                        ],
                        "TotalRecordCount": 3
                    };
                }
            },
            toolbar: {
                items: [{
                    cssClass: 'buscador',
                    text: search
                }]
            },
            fields: {
                id: {
                    key: true,
                    create: false,
                    edit: false,
                    list: false
                },
                cotizacion: {
                    title: 'Cotización',
                    width: '5%'
                },
                descripcion: {
                    title: 'Descripción',
                    width: '30%'
                },
                solictado_po: {
                    title: 'Solicitado por',
                    list: show_list_
                },
                fecha_emision: {
                    title: 'Fecha de Emisión',
                    list: show_list_
                },
                cuadro: {
                    width: '1%',
                    sorting: false,
                    edit: false,
                    create: false,
                    display: function (data) {
                        return '<a href="javascript:void(0)" title="Cuadro Comparativo" class="edit_q" data-code="'+
                            data.record.id+'"><i class="fa fa-list-alt fa-1-5x"></i></a>';
                    }
                }
            },
            recordsLoaded: function(event, data) {
                $('.edit_q').click(function(e){
                    //var code = $(this).attr('data-code');
                    overModals();
                    modalC.modal('show');
                    e.preventDefault();
                });
            }
        });

        generateSearchForm('frm-search-q', 'LoadRecordsButtonQ', function(){
            table_container_q.jtable('load', {
                search: $('#search_q').val()
            });
        }, true);
    }

    function Config($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('approval_contests', {
                url: '/approval_contests',
                templateUrl: base_url + '/templates/approval_quotations/base.html',
                controller: 'ApprovalQuotationCtrl'
            });

        $urlRouterProvider.otherwise('/');
    }
})
();