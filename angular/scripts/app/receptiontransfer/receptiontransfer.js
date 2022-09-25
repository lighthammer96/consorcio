/**
 * Created by EVER on 4/17/2017.
 */
(function () {
    'use strict';
    angular.module('sys.app.receptiontransfers')
        .config(Config)
        .controller('ReceptionTransferCtrl', ReceptionTransferCtrl);

    Config.$inject = ['$stateProvider', '$urlRouterProvider'];
    ReceptionTransferCtrl.$inject = ['$scope', '_', 'RESTService', 'AlertFactory'];

    function ReceptionTransferCtrl($scope, _, RESTService, AlertFactory) {
        moment.locale('es');

        var modalRT;
        var titleRT;
        var reqDates = $('#reqDates');
        var modalPDF;
        var rt_warehouse_origin_id;
        var rt_warehouse_destination_id;
        var rt_transfer_date;
        var rt_name;
        var detail_reception_transfer;
        var default_ware = '';
        var state_reception_transfer;
        var rt_id;
        var rt_transfer_id;
        var rt_button_process;
        var rt_button_save;

        function overModals() {
            modalRT = $('#modalRT');
            titleRT = $('#title-rt');
            modalPDF = $("#modalView");
            rt_warehouse_origin_id = $("#rt_warehouse_origin_id");
            rt_warehouse_destination_id = $("#rt_warehouse_destination_id");
            rt_transfer_date = $("#rt_transfer_date");
            rt_name = $("#rt_name");
            detail_reception_transfer = $("#detail_reception_transfer");
            rt_id = $("#rt_id");
            rt_transfer_id = $("#rt_transfer_id");
            rt_name.val(user_default);
            rt_button_process = $("#rt_button_process");
            rt_button_save = $("#rt_button_save");

            rt_transfer_date.datepicker({
                changeMonth: true,
                changeYear: true,
                dateFormat: 'dd/mm/yy',
                beforeShow: function () {
                    setTimeout(function () {
                        $('.ui-datepicker').css('z-index', 2052);
                    });
                }
            });
        }

        function cleanReceptionTransfer() {
            rt_button_process.prop('disabled', true);
            rt_button_save.prop('disabled', true);
            rt_transfer_date.prop('disabled', false);
        }

        function findReceptionTransfer(id) {
            overModals();
            cleanReceptionTransfer();
            var state_condition = false;
            RESTService.get('reception_transfers/find', id, function (response) {
                if (!_.isUndefined(response.status) && response.status) {
                    var data = response.data;
                    rt_id.val(data.id);
                    rt_transfer_id.val(data.transfer_id);
                    rt_transfer_date.val(data.transfer_date);
                    rt_warehouse_origin_id.val(data.warehouse_origin_id).trigger('change');
                    rt_warehouse_destination_id.val(data.warehouse_destination_id).trigger('change');
                    rt_transfer_id.val(data.transfer_id);
                    titleRT.html('Recepción de Transferencia');
                    modalRT.modal('show');
                    _.each(data.product, function (record) {
                        validItemDetail(record);
                        if (parseFloat(record.available) !== 0) {
                            state_condition = true;
                        }
                    });
                    if (state_condition === true) {
                        rt_button_process.prop('disabled', false);
                        rt_button_save.prop('disabled', false);
                    } else {
                        rt_transfer_date.prop('disabled', true);
                    }
                } else {
                    AlertFactory.textType({
                        title: '',
                        message: 'Hubo un error al obtener  la transferencia. Intente nuevamente.',
                        type: 'error'
                    });
                }
            });
        }

        $scope.saveReceptionTransferProcess = function () {
            state_reception_transfer = 1;
            SaveEndReceptionTransfer();
        };

        $scope.saveReceptionTransfer = function () {
            state_reception_transfer = 0;
            SaveEndReceptionTransfer();
        };


        function SaveEndReceptionTransfer() {
            var bval = true;
            var comp_count = false;
            var state_process = false;
            var state_description;
            if (bval) {
                var products = [];
                var toReceive = [];
                var p_available = [];
                _.each($('.p_product'), function (item) {
                    products.push($(item).val());
                });
                _.each($('.p_toReceived'), function (item) {
                    toReceive.push($(item).val());  //p_available
                });
                _.each($('.p_available'), function (item) {
                    p_available.push($(item).html());  //p_available
                });

                $.each(p_available, function (idx, item) {
                    if (p_available[idx] < toReceive[idx]) {
                        comp_count = true;
                    }
                    if (p_available[idx] === toReceive[idx]) {
                        state_process = true;
                    }
                });
                if (state_reception_transfer === 1) {
                    state_description = (state_process) ? 'PROCESADO' : 'EN PROCESO';
                } else {
                    state_description = 'GUARDADO';
                }
                console.log(state_description);
                if (comp_count === true) {
                    AlertFactory.textType({
                        title: '',
                        message: 'La cantidad ingresada debe ser menor que la cantidad disponible'
                    });
                    comp_count = false;
                    return false;
                }

                var params = {
                    'id': rt_id.val(),
                    'transfer_date': rt_transfer_date.val(),
                    'transfer_id': rt_transfer_id.val(),
                    'warehouse_destination_id': rt_warehouse_destination_id.val(),
                    'product': products.join(','),
                    'p_toReceived': toReceive.join(','),
                    'state_reception_transfer': state_reception_transfer,
                    'state_description': state_description
                };
                AlertFactory.confirm({
                    title: '',
                    message: '¿Está seguro?',
                    confirm: 'Si',
                    cancel: 'No'
                }, function () {
                    var t_id = (rt_id.val() === '') ? 0 : rt_id.val();

                    RESTService.updated('reception_transfers/saveReceptionTransfer', t_id, params, function (response) {
                        var condition = (state_reception_transfer === 1) ? 'procesó' : 'guardó';
                        if (!_.isUndefined(response.status) && response.status) {
                            AlertFactory.textType({
                                title: '',
                                message: 'La Recepción de transferencia se ' + condition + ' correctamente.',
                                type: 'success'
                            });
                            modalRT.modal('hide');
                            LoadRecordsButtonRT.click();
                        } else {
                            AlertFactory.textType({
                                title: '',
                                message: 'Hubo un error al ' + condition + ' la recepción de transferencia. Intente nuevamente.',
                                type: 'error'
                            });
                        }
                    });
                });
            }
        }

        function validItemDetail(row) {
            addToReceptionTransfer(row.id, row.code_article, row.description_detail, row.average_cost, row.available, row.received, row.toReceived);
        }

        function addToReceptionTransfer(id, code, description, cost, available, received, toReceived) {
            var state_available, row_toReceived;
            var tr = $('<tr class="p_id"  data-id="' + id + '"></tr>');
            var td0 = $('<td>' + code + '</td>');
            var td1e = $('<td>' + description + '</td>');
            var row_cost = (_.isNull(cost)) ? '0' : (_.isUndefined(cost)) ? '0' : cost;
            var td1a = $('<td class="text-right">' + row_cost + '</td>');
            var row_available = (_.isNull(available)) ? '0' : (_.isUndefined(available)) ? '0' : available;
            if ((row_available === '0')) {
                state_available = 'disabled';
                row_toReceived = 0;
            }
            else {
                state_available = '';
                row_toReceived = (_.isNull(toReceived)) ? '0' : (_.isUndefined(toReceived)) ? '0' : toReceived;
            }
            var td1b = $('<td class="text-right p_available">' + row_available + '</td>');
            var row_received = (_.isNull(received)) ? '0' : (_.isUndefined(received)) ? '0' : received;
            var td1c = $('<td class="text-right">' + row_received + '<input type="hidden" ' +
                'class="p_received" value="' + row_received + '" /></td>');
            var tde = $('<td class="text-right"><input  ' + state_available + ' type="text"' +
                ' value="' + row_toReceived + '" data-max="' + row_available + '" onclick="this.select()" ' +
                ' class="form-control input-xs text-right p_toReceived" onkeypress="return soloNumeros(event)"></td>');
            var inp_product_id = $('<input type="hidden" class="p_product" value="' + id + '" />');
            td1e.append(inp_product_id);
            tr.append(td0).append(td1e).append(td1a).append(td1b).append(td1c).append(tde);
            detail_reception_transfer.append(tr);
            $('.p_toReceived').blur(function () {
                var that = $(this);
                var maxRow = that.attr('data-max');
                if (that.val() > parseFloat(maxRow) || that.val() === '') {
                    AlertFactory.showWarning({
                        title: 'Debe ingresar una cantidad menor o igual a la cantidad transferida',
                        message: ''
                    }, function () {
                        that.select(); // ??
                    });
                }

            });
            modalRT.modal('show');
        }

        function getDataForm() {
            RESTService.all('transfers/data_form', '', function (response) {
                if (!_.isUndefined(response.status) && response.status) {
                    _.each(response.warehouse, function (item) {
                        if (default_ware === '') default_ware = item.Value;
                        $("#rt_warehouse_origin_id").append('<option value="' + item.Value + '">' + item.DisplayText + '</option>');
                    });
                    _.each(response.warehouse, function (item) {
                        if (default_ware === '') default_ware = item.Value;
                        $("#rt_warehouse_destination_id").append('<option value="' + item.Value + '" >' + item.DisplayText + '</option>');
                    });


                }
            }, function () {
                getDataForm();
            });
        }

        getDataForm();


        var search = getFormSearch('frm-search-rt', 'search_rt', 'LoadRecordsButtonRT');

        var table_container_r = $("#table_container_rt");

        table_container_r.jtable({
            title: "Lista de Recepción de Transferencias",
            paging: true,
            sorting: true,
            actions: {
                listAction: base_url + '/reception_transfers/list',
                // deleteAction: base_url + '/reception_transfers/delete'
            },
            toolbar: {
                items: [{
                    cssClass: 'buscador',
                    text: search
                }, {
                    cssClass: 'btn-primary',
                    text: '<i class="fa fa-file-excel-o"></i> Exportar a Excel',
                    click: function () {
                        $scope.openDoc('reception_transfers/excel', {});
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
                transfer_date: {
                    title: 'Fecha',
                    listClass: 'text-center'
                },
                name: {

                    title: 'Usuario',
                    list: show_list_
                },
                warehouse_o: {

                    title: (show_list_) ? 'Almacén Origen' : 'Alm. Origen'
                },
                warehouse_d: {

                    title: (show_list_) ? 'Almacén Destino' : 'Alm. Destino'
                },
                state_description: {
                    title: 'Estado',
                    width: '3%'
                    // listClass: 'text-center'
                },
                select: {
                    width: '1%',
                    sorting: false,
                    edit: false,
                    create: false,
                    display: function (data) {
                        return '<a href="javascript:void(0)" title="Archivo" class="show_pdf" data-code="' +
                            data.record.id + '"><i class="fa fa-clipboard fa-1-5x"></i></a>';
                    }
                },
                edit: {
                    width: '1%',
                    sorting: false,
                    edit: false,
                    create: false,
                    display: function (data) {
                        if (data.record.state_description === 'PROCESADO') {
                            return '<a href="javascript:void(0)" title="Ver" class="edit_r" data-code="' +
                                data.record.id + '"><i class="fa fa-eye fa-1-5x fa-green"></i></a>'
                        } else {
                            return '<a href="javascript:void(0)" title="Recepcionar" class="edit_r" data-code="' +
                                data.record.id + '"><i class="fa fa-pencil-square-o fa-1-5x fa-green"></i></a>';
                        }
                    }
                }
            },
            recordsLoaded: function (event, data) {
                $('.edit_r').click(function (e) {
                    var code = $(this).attr('data-code');
                    $("#detail_reception_transfer").html('');
                    findReceptionTransfer(code);
                    e.preventDefault();
                });
                $('.show_pdf').click(function (e) {
                    $("#modalView").modal('show');
                });
            }
        });

        generateSearchForm('frm-search-rt', 'LoadRecordsButtonRT', function () {
            table_container_r.jtable('load', {
                search: $('#search_rt').val()
            });
        }, true);

    }

    function Config($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('reception_transfers', {
                url: '/reception_transfers',
                templateUrl: base_url + '/templates/receptiontransfers/base.html',
                controller: 'ReceptionTransferCtrl'
            });

        $urlRouterProvider.otherwise('/');
    }
})
();