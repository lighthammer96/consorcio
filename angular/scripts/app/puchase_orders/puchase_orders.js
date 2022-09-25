/**
 * Created by JAIR on 4/17/2017.
 */
(function () {
    'use strict';
    angular.module('sys.app.purchase_orders')
        .config(Config)
        .controller('PurchaseOrderCtrl', PurchaseOrderCtrl);

    Config.$inject = ['$stateProvider', '$urlRouterProvider'];
    PurchaseOrderCtrl.$inject = ['$scope', 'AlertFactory'];

    function PurchaseOrderCtrl($scope, AlertFactory)
    {
        moment.locale('es');

        var start = moment().startOf('month');
        var end = moment().endOf('month');

        var modalPO;
        var reqDates = $('#reqDates');

        $('.i-checks').iCheck({
            checkboxClass: 'icheckbox_square-green'
        }).on('ifChanged', function (event) {
            $(event.target).click();
        });

        var showDate = function (start, end) {
            reqDates.find('span').html(start.format('MMM D, YYYY') + ' - ' + end.format('MMM D, YYYY'));
            //getListRooms(start.format('YYYY-MM-DD'), end.format('YYYY-MM-DD'));
        };
        generateDateRangePicker(reqDates, start, end, showDate);
        showDate(start, end);

        function overModals() {
            modalPO = $('#modalPO');

            $('.i-checks').iCheck({
                checkboxClass: 'icheckbox_square-green'
            }).on('ifChanged', function (event) {
                $(event.target).click();
            });
        }

        function newPurchaseOrder()
        {
            overModals();
            modalPO.modal('show');
            $('.show_new').removeClass('hide');
            $('.show_edit').addClass('hide');
        }

        var states = '<select id="states" class="search_input">'+
            '<option value="">Todos</option>'+
            '<option value="">Registrado</option>'+
            '<option value="">Aprobado</option>'+
            '<option value="">Recibido</option>'+
            '<option value="">Recibido Parcial</option>'+
            '<option value="">Cancelado</option>'+
            '<option value="">Cerrado</option>'+
            '</select>';

        var search = getFormSearch('frm-search-po', 'search_po', 'LoadRecordsButtonPO');

        var table_container_po = $("#table_container_po");

        table_container_po.jtable({
            title: "Lista de Ordenes de Compra",
            paging: true,
            sorting: true,
            actions: {
                listAction: function (postData, jtParams) {
                    return {
                        "Result": "OK",
                        "Records": [
                            { "oc": '20170504', "proyecto": "INVERSIONES-TALLER", "proveedor": "IMPORTACIONES GELCO",
                                "estado": 1, "fecha_emision": "02/04/2017" },
                            { "oc": '20170518', "proyecto": "CONEXIONES MASIVAS", "proveedor": "CLAUDIO PIÑAN ROSARIO",
                                "estado": 0, "fecha_emision": "13/04/2017" }
                        ],
                        "TotalRecordCount": 2
                    };
                },
                deleteAction: base_url + '/purchase_orders/delete',
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
                        window.open(base_url+'/purchase_orders/excel');
                    }
                },{
                    cssClass: 'btn-success',
                    text: '<i class="fa fa-plus"></i> Nueva Orden de Compra',
                    click: function () {
                        newPurchaseOrder();
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
                    title: 'Nro. O/C',
                    listClass: 'text-center'
                },
                proyecto: {
                    title: (show_list_) ? 'Descrip, Proyecto' : 'Proyecto'
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
                editar: {
                   width: '1%',
                   sorting: false,
                   edit: false,
                   create: false,
                   display: function (data) {
                       return '<a href="javascript:void(0)" title="Editar" class="edit_po" data-code="'+
                           data.record.id+'"><i class="fa fa-check-circle-o fa-1-5x"></i></a>';
                   }
                }
            },
            recordsLoaded: function(event, data) {
                $('.edit_po').click(function(e){
                    $('.show_new').addClass('hide');
                    $('.show_edit').removeClass('hide');
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

        $scope.closePO = function() {
            var modalClose = $('#modalClose');
            modalClose.on('hidden.bs.modal', function (e) {
                modalPO.attr('style', 'display:block;');
            });
            modalClose.on('show.bs.modal', function (e) {
                modalPO.attr('style', 'display:block; z-index:2030 !important');
            });
            modalClose.modal('show');
        };
    }

    function Config($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('purchase_orders', {
                url: '/purchase_orders',
                templateUrl: base_url + '/templates/purchase_orders/base.html',
                controller: 'PurchaseOrderCtrl'
            });

        $urlRouterProvider.otherwise('/');
    }
})
();