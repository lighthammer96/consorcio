/**
 * Created by EVER on 18/08/2017.
 */

(function () {
    'use strict';
    angular.module('sys.app.stocks')
        .config(Config)
        .controller('StockCtrl', StockCtrl);

    Config.$inject = ['$stateProvider', '$urlRouterProvider'];
    StockCtrl.$inject = ['$scope', '_', 'RESTService', 'AlertFactory'];

    function StockCtrl($scope, _, RESTService, AlertFactory) {
        var modalW;
        var s_warehouse;
        // var s_button_multiple = $("#s_button_multiple");

        function overModals() {
            if (!call_m) {
                modalW = $("#modalWarehouse");
                modalW.on('hidden.bs.modal', function (e) {
                    cleanStock();
                });
                modalW.on('show.bs.modal', function (e) {
                    cleanStock();
                });
                callModals();
            }
        }

        function cleanStock() {
            cleanRequired();
            arr_detail = [];
            clearRowsAR();
        }

        var state_type = false;
        $scope.seeStock = function () {
            var $selectedRows = $("#table_container_warehouse").jtable('selectedRows');
            if ($selectedRows.length > 0) {
                $selectedRows.each(function () {
                    var record = $(this).data('record');
                    arr_detail.push(record.id);
                });
                generateSearchWarehouse();
                state_type = true;
                console.log(state_type);
                $("#s_warehouse_id").html('<option value="">Varios</option>').prop('disabled', true);
                $("#modalWarehouse").modal('hide');
            } else {
                AlertFactory.textType({
                    title: '',
                    message: 'Debe seleccionar al menos un almacén a asignar.',
                    type: 'warning'
                });
                return false;
            }
        };
        function getDataWarehouse() {
            s_warehouse = $("#s_warehouse_id");
            s_warehouse.html('').change(function () {
                arr_detail = [];
                arr_detail.push(s_warehouse.val());
                $(".select2-results__option").css({'overflow-y': 'visible'});
                $('#LoadRecordsButtonStock').click();
            });

            RESTService.all('departures/data_form', '', function (response) {
                if (!_.isUndefined(response.status) && response.status) {

                    s_warehouse.append('<option value="0">Todos los almacenes</option>');
                    _.each(response.warehouse, function (item) {
                        s_warehouse.append('<option value="' + item.Value + '">' + item.DisplayText + '</option>');
                    });
                    generateSearchWarehouse();
                }
            }, function () {
                getDataWarehouse();
            });
        }

        var arr_detail = [];

        var search = getFormSearch('frm-search-stock', 'search_stock', 'LoadRecordsButtonStock');
        var state_name_w = '<div class="form-inline" style="margin-bottom:-3px">' +
            '<span><label class="control-label" style="font-size: 13px; margin-top:-12px">Almacén:</label></span>' +
            '</div>';

        var state_warehouse = '<div class="form-inline" style="margin-bottom:-3px;"><div class="input-group input-group-sm select_all">' +
            '<select id="s_warehouse_id" class="form-control search_input hide"  style="width: 180px;"></select>' +
            '<span class="input-group-btn">' +
            '<button type="button" id="s_button_openStock" class="btn btn-primary" title="Varios">' +
            '<i class="fa fa-bars"></i>' +
            '</button>' +
            '<button type="button" id="load_warehouse" class="btn btn-success" title="Actualizar">' +
            '<i class="fa fa-refresh"></i>' +
            '</button>' +
            '</span>' +
            '</div>' +
            '</div>';

        var table_container_stock = $("#table_container_stock");

        table_container_stock.jtable({
            title: "Lista de Stock por Almacén",
            paging: true,
            sorting: true,
            actions: {
                listAction: base_url + '/stocks/list'
            },
            toolbar: {
                items: [{
                    cssClass: 'buscador',
                    text: state_name_w
                }, {
                    cssClass: 'buscador',
                    text: state_warehouse
                }, {
                    cssClass: 'buscador',
                    text: search
                }, {
                    cssClass: 'btn-primary',
                    text: '<i class="fa fa-file-excel-o"></i> Exportar a Excel',
                    click: function () {
                        $scope.openDoc('stocks/excel', {});
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
                code_article: {
                    title: 'Código Artículo',
                    width: '2%'
                },
                description_article: {
                    title: 'Artículo'
                },
                code_internal: {
                    title: 'Código Almacén',
                    width: '4%'
                },
                warehouse_o: {
                    title: 'Almacén',
                    width: '6%'
                },
                stock: {
                    title: 'Disponible',
                    width: '2%',
                    listClass: 'text-right'
                }
            },
            recordsLoaded: function (event, data) {
            }
        });

        getDataWarehouse();

        function generateSearchWarehouse() {
            generateSearchForm('frm-search-stock', 'LoadRecordsButtonStock', function () {
                table_container_stock.jtable('load', {
                    search: $('#search_stock').val(),
                    warehouse_list: arr_detail
                });
            }, true);
        }


        $("#s_warehouse_id").select2();

        $(".select_all span .selection").addClass('text-left');


        $("#s_button_openStock").click(function () {
            overModals();
            $('#LoadRecordsButtonWarehouse').click();
            $("#modalWarehouse").modal('show');
        });

        $("#load_warehouse").click(function () {
            s_warehouse.html('').prop('disabled', false);
            getDataWarehouse();
        });

        var call_m = false;

        function callModals() {
            call_m = true;
            var search_wa = getFormSearch('frm-search-warehouse', 'search_warehouse', 'LoadRecordsButtonWarehouse');

            var table_container_warehouse = $("#table_container_warehouse");

            table_container_warehouse.jtable({
                title: "Lista de Almacenes",
                paging: true,
                sorting: true,
                selecting: true,
                multiselect: true,
                selectingCheckboxes: true,
                selectOnRowClick: false,
                actions: {
                    listAction: base_url + '/stocks/listWarehouse'
                },
                toolbar: {
                    items: [{
                        cssClass: 'buscador',
                        text: search_wa
                    }]
                },
                fields: {
                    id: {
                        key: true,
                        edit: false,
                        create: false,
                        list: false
                    },
                    code_internal: {
                        title: 'Código',
                        width: '4%'
                    },
                    description: {
                        title: 'Descripción'
                    }
                },
                recordsLoaded: function (event, data) {
                    $('.jtable-selecting-column input').iCheck({
                        checkboxClass: 'icheckbox_square-green'
                    }).on('ifChanged', function (event) {
                        $(event.target).click();
                    });
                }
            });

            generateSearchForm('frm-search-warehouse', 'LoadRecordsButtonWarehouse', function () {
                table_container_warehouse.jtable('load', {
                    search: $('#search_warehouse').val()
                });
            }, false);

        }

        function clearRowsAR() {
            $('.jtable-column-header-selecting input').prop('checked', false).iCheck('update');
            $('.jtable-row-selected').removeClass('jtable-row-selected');
        }
    }

    function Config($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('stocks', {
                url: '/stocks',
                templateUrl: base_url + '/templates/stocks/base.html',
                controller: 'StockCtrl'
            });

        $urlRouterProvider.otherwise('/');
    }
})
();