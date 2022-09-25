/**
 * Created by EVER on 4/17/2017.
 */
(function () {
    'use strict';
    angular.module('sys.app.departures')
        .config(Config)
        .controller('DepartureCtrl', DepartureCtrl);

    Config.$inject = ['$stateProvider', '$urlRouterProvider'];
    DepartureCtrl.$inject = ['$scope', '_', 'RESTService', 'AlertFactory'];

    function DepartureCtrl($scope, _, RESTService, AlertFactory) {
        moment.locale('es');

        var modalD;
        var modalPr;
        var titleDep;
        var d_departure_id;
        var d_departure_date;
        var d_user_id;
        var d_name;
        var d_warehouse_id;
        var d_observation;
        var default_ware = '';
        var product_detail;
        var state_departure;
        var d_button_article;
        var d_button_saveProcess;
        var d_button_save;

        function overModals() {
            if (!call_m) {
                modalD = $('#modalD');
                modalPr = $('#modalProduct');
                titleDep = $('#title-dep');
                product_detail = $("#product_detail");
                d_departure_id = $("#d_departure_id");
                d_departure_date = $("#d_departure_date");
                d_user_id = $("#d_user_id");
                d_name = $("#d_name");
                d_warehouse_id = $("#d_warehouse_id");
                d_observation = $("#d_observation");
                state_departure = 0;
                d_button_saveProcess = $("#d_button_saveProcess");
                d_button_save = $("#d_button_save");
                d_button_article = $("#d_button_article");

                d_departure_date.datepicker({
                    changeMonth: true,
                    changeYear: true,
                    dateFormat: 'dd/mm/yy',
                    beforeShow: function () {
                        setTimeout(function () {
                            $('.ui-datepicker').css('z-index', 2052);
                        });
                    }
                });

                modalPr.on('hidden.bs.modal', function (e) {
                    modalD.attr('style', 'display:block;');
                });
                modalPr.on('show.bs.modal', function (e) {
                    modalD.attr('style', 'display:block; z-index:2030 !important');
                });
                modalD.on('hidden.bs.modal', function (e) {
                    cleanDeparture();
                });
                callModals();
            }
            d_warehouse_id.select2();

            d_name.val(user_default);
        }

        function cleanDeparture() {
            cleanRequired();
            titleDep.html('');
            d_departure_id.val('');
            d_departure_date.val('').prop('disabled', false);
            d_warehouse_id.val(default_ware).prop('disabled', false);
            d_observation.val('');
            product_detail.html('');
            arr_detail = [];
            d_button_saveProcess.prop("disabled", false);
            d_button_save.prop("disabled", false);
            d_button_article.prop("disabled", false);
        }

        $scope.addDetail = function () {
            var $selectedRows = $("#table_container_pr").jtable('selectedRows');
            var count = 0;
            if ($selectedRows.length > 0) {
                $selectedRows.each(function () {
                    var record = $(this).data('record');
                    count++;
                    if (parseFloat(record.stock_p) <= 0 || parseFloat(record.stock_p) === '' || parseFloat(record.stock_p) === .00
                        || parseFloat(record.stock_p) === null || parseFloat(record.stock_p) === '') {
                        AlertFactory.showWarning({
                            title: '',
                            message: ' El stock debe ser mayor que 0'
                        });
                        return false;
                    }

                    validItemDetail(record);
                });
            } else {
                AlertFactory.textType({
                    title: '',
                    message: 'Debe seleccionar al menos un artículo a asignar.',
                    type: 'warning'
                });
                return false;
            }
            clearRowsAR();
        };

        function getDataForm() {
            RESTService.all('departures/data_form', '', function (response) {
                if (!_.isUndefined(response.status) && response.status) {
                    _.each(response.warehouse, function (item) {
                        if (default_ware === '') default_ware = item.Value;
                        $("#d_warehouse_id").append('<option value="' + item.Value + '">' + item.DisplayText + '</option>');
                    });
                }
            }, function () {
                getDataForm();
            });
        }

        getDataForm();

        function newDeparture() {
            overModals();
            modalD.modal('show');
            titleDep.html('Nueva Salida');
        }

        function findDeparture(id) {
            overModals();
            titleDep.html('Editar Salida');
            RESTService.get('departures/find', id, function (response) {
                if (!_.isUndefined(response.status) && response.status) {
                    var data = response.data;
                    d_departure_id.val(data.id);
                    d_departure_date.val(data.departure_date);
                    d_warehouse_id.val(data.warehouse_id).trigger('change');
                    d_observation.val(data.observation);
                    modalD.modal('show');
                    _.each(data.product, function (b) {
                        validItemDetail(b)
                    });
                    if (data.state_departure === '1') {
                        d_departure_date.prop('disabled', true);
                        d_warehouse_id.prop('disabled', true);
                        d_button_save.prop('disabled', true);
                        d_button_saveProcess.prop('disabled', true);
                        d_button_article.prop('disabled', true);
                    }
                } else {
                    AlertFactory.textType({
                        title: '',
                        message: 'Hubo un error al obtener  el ingreso. Intente nuevamente.',
                        type: 'error'
                    });
                }
            });
        }

        var arr_detail = [];

        function validItemDetail(row) {
            if (!_.contains(arr_detail, row.id)) {
                addToDeparture(row.id, row.code_article, row.description_detail, row.price, row.quantity, row.stock_p, row.state_departure);
                arr_detail.push(row.id);
            }
        }

        $scope.saveDepartureProcess = function () {
            state_departure = 1;
            SaveEndDeparture();
        };

        $scope.saveDeparture = function () {
            state_departure = 0;
            SaveEndDeparture();
        };


        function SaveEndDeparture() {
            var bval = true;
            bval = bval && d_departure_date.required();
            bval = bval && d_warehouse_id.required();

            if (bval && product_detail.html() === '') {
                AlertFactory.showWarning({
                    title: '',
                    message: 'Debe agregar mínimo 1 artículo'
                });
                return false;
            }
            if (bval) {
                var products = [];
                var price = [];
                var departures = [];
                var available = [];
                var condition_stock = false;
                _.each($('.p_product'), function (item) {
                    products.push($(item).val());
                });
                _.each($('.p_price'), function (item) {
                    price.push($(item).val());
                });
                _.each($('.p_departures'), function (item) {
                    departures.push($(item).val());
                });
                _.each($('.p_available'), function (item) {
                    available.push($(item).val());
                });

                $.each(available, function (idx, item) {
                    if (parseFloat(available[idx]) < parseFloat(departures[idx])) {
                        condition_stock = true;
                    }
                    console.log(available[idx]+'-'+departures[idx]+'\n');
                });
                if (condition_stock === true) {
                    AlertFactory.textType({
                        title: '',
                        message: 'La cantidad ingresada debe ser menor que la cantidad disponible'
                    });
                    condition_stock = false;
                    return false;
                }

                var params = {
                    'id': d_departure_id.val(),
                    'departure_date': d_departure_date.val(),
                    'warehouse_id': d_warehouse_id.val(),
                    'observation': d_observation.val(),
                    'product': products.join(','),
                    'price': price.join(','),
                    'departures': departures.join(','),
                    'state_departure': state_departure
                };
                AlertFactory.confirm({
                    title: '',
                    message: '¿Estas seguro?',
                    confirm: 'Si',
                    cancel: 'No'
                }, function () {
                    var d_id = (d_departure_id.val() === '') ? 0 : d_departure_id.val();

                    RESTService.updated('departures/saveDeparture', d_id, params, function (response) {
                        var condition = (state_departure === 1) ? 'procesó' : 'guardó';
                        if (!_.isUndefined(response.status) && response.status) {
                            AlertFactory.textType({
                                title: '',
                                message: 'La salida se ' + condition + ' correctamente.',
                                type: 'success'
                            });
                            modalD.modal('hide');
                            LoadRecordsButtonDeparture.click();
                        } else {
                            AlertFactory.textType({
                                title: '',
                                message: 'Hubo un error al ' + condition + ' la salida. Intente nuevamente.',
                                type: 'error'
                            });
                        }
                    });
                });
            }
        }

        $scope.openProducts = function () {
            $('#LoadRecordsButtonProduct').click();
            modalPr.modal('show');
        };
        function addToDeparture(id, code, description, price, departure, stock_p, state_departure) {
            if ($('#tr_p_' + id).length > 0) {
                AlertFactory.showWarning({
                    title: '',
                    message: 'Ya se asigno este artículo'
                });
                return false;
            }
            var tr = $('<tr data-id="' + id + '"></tr>');
            var td0 = $('<td>' + code + '</td>');
            var td1 = $('<td>' + description + '</td>');
            var td1a = $('<td  class="p_available" style="display: none">' + stock_p + '</td>');
            var row_price = (_.isNull(price)) ? '.00' : (_.isUndefined(price)) ? '0.0000' : price;
            var row_departure = (_.isNull(departure)) ? '0' : (_.isUndefined(departure)) ? '0' : departure;
            var tdp, tde;
            if (state_departure !== '1') {
                tdp = $('<td class="text-right"><input type="text" value="' + row_price + '" ' +
                    'class="form-control input-xs text-right p_price" onkeypress="return validDecimals(event, this, 5)" ' +
                    'onblur="return roundDecimals(this, 4)"></td>');
                tde = $('<td class="text-right"><input type="text" value="' + row_departure + '" ' +
                    'id="inpRow' + id + '" data-max="' + stock_p + '" onclick="this.select()"  ' +
                    'class="form-control input-xs text-right p_departures" onkeypress="return validDecimals(event, this, 3)" ' +
                    'onblur="return roundDecimals(this, 2)"></td>');
            } else {
                tdp = $('<td class="text-right"><input readonly type="text" value="' + row_price + '" ' +
                    'class="form-control input-xs text-right p_price" onkeypress="return validDecimals(event, this, 5)" ' +
                    'onblur="return roundDecimals(this, 4)"></td>');
                tde = $('<td class="text-right"><input readonly type="text" value="' + row_departure + '" ' +
                    'id="inpRow' + id + '" data-max="' + stock_p + '" onclick="this.select()"  ' +
                    'class="form-control input-xs text-right p_departures" onkeypress="return validDecimals(event, this, 3)" ' +
                    'onblur="return roundDecimals(this, 2)"></td>');
            }
            var inp = $('<input type="hidden" class="p_product" value="' + id + '" />');
            td1.append(inp);
            var td2 = $('<td class="text-center"></td>');
            var btn;
            if (state_departure !== '1') {
                btn = $('<button class="btn btn-danger btn-xs delProduct" data-id="' + id + '" type="button"><span class="fa fa-trash"></span></button>');
            } else {
                btn = $('<button class="btn btn-danger btn-xs delProduct" disabled data-id="' + id + '" type="button"><span class="fa fa-trash"></span></button>');
            }
            td2.append(btn);
            tr.append(td0).append(td1).append(tdp).append(tde).append(td1a).append(td2);
            product_detail.append(tr);

            $('.p_departures').blur(function () {
                var that = $(this);
                var maxRow = that.attr('data-max'); // alert(maxRow);
                if (that.val() > parseFloat(maxRow) || that.val() === '') {
                    AlertFactory.showWarning({
                        title: 'Debe ingresar una cantidad menor o igual a la cantidad pedida',
                        message: ''
                    }, function () {
                        that.select(); // ??
                    });
                }
            });

            $('.delProduct').click(function (e) {
                var tr_ = $(this).closest('tr');
                AlertFactory.confirm({
                    title: '',
                    message: '¿Está seguro que desea quitar esta artículo?',
                    confirm: 'Si',
                    cancel: 'No'
                }, function () {
                    var tr_id = tr_.attr('data-id');
                    console.log(tr_id);
                    tr_.remove();
                    arr_detail = _.reject(arr_detail, function (item) {
                        return item === parseInt(tr_id)
                    });
                    $('#LoadRecordsButtonProduct').click();
                });
                e.preventDefault();
            });
            modalPr.modal('hide');
        }


        var search = getFormSearch('frm-search-departure', 'search_departure', 'LoadRecordsButtonDeparture');


        var table_container_d = $("#table_container_departure");

        table_container_d.jtable({
            title: "Lista de Salidas",
            paging: true,
            sorting: true,
            actions: {
                listAction: base_url + '/departures/list',
                // deleteAction: base_url + '/departures/delete'
            },
            toolbar: {
                items: [{
                    cssClass: 'buscador',
                    text: search
                }, {
                    cssClass: 'btn-primary',
                    text: '<i class="fa fa-file-excel-o"></i> Exportar a Excel',
                    click: function () {
                        $scope.openDoc('departures/excel', {});
                    }
                }, {
                    cssClass: 'btn-success',
                    text: '<i class="fa fa-plus"></i> Nuevo Ingreso',
                    click: function () {
                        newDeparture();
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
                departure_date: {
                    title: (show_list_) ? 'Fecha Salida' : 'Fech Salida',
                    listClass: 'text-center',
                    width: '4%',
                    sorting: true
                },
                warehouse_d: {
                    title: 'Almacén',
                    sorting: true
                },
                name: {
                    title: 'Usuario',
                    list: show_list_,
                    width: '5%',
                    sorting: true
                },
                state_description: {
                    title: 'Estado',
                    width: '2%',
                    sorting: true
                },
                edit: {
                    width: '1%',
                    sorting: false,
                    edit: false,
                    create: false,
                    listClass: 'text-center',
                    display: function (data) {
                        if (data.record.state_description === 'GUARDADO') {
                            return '<a href="javascript:void(0)" title="Editar" class="edit_r" data-code="' +
                                data.record.id + '"><i class="fa fa-pencil-square-o fa-1-5x fa-green"></i></a>' +
                                '<a href="javascript:void(0)" title="Eliminar" class="delete_r" data-code="' +
                                data.record.id + '"><i class="fa fa-trash fa-1-5x fa-red"></i></a>';
                        } else {
                            return '<a href="javascript:void(0)" title="Ver" class="edit_r" data-code="' +
                                data.record.id + '"><i class="fa fa-eye fa-1-5x fa-green"></i></a>'
                        }
                    }
                }
            },
            recordsLoaded: function (event, data) {
                $('.edit_r').click(function (e) {
                    var code = $(this).attr('data-code');
                    findDeparture(code);
                    e.preventDefault();
                });
            }
        });

        generateSearchForm('frm-search-departure', 'LoadRecordsButtonDeparture', function () {
            table_container_d.jtable('load', {
                search: $('#search_departure').val()
            });
        }, true);

        var call_m = false;

        function callModals() {
            call_m = true;
            // var states = '<select id="states" class="search_input">' +
            //     '<option value="todos">Todos</option>' +
            //     '<option value="disponibles">Disponibles</option>' +
            //     '</select>';
            var search_pr = getFormSearch('frm-search-product', 'search_product', 'LoadRecordsButtonProduct');

            var table_container_pr = $("#table_container_pr");

            table_container_pr.jtable({
                title: "Lista de Artículos Disponibles",
                paging: true,
                sorting: true,
                selecting: true,
                multiselect: true,
                selectingCheckboxes: true,
                selectOnRowClick: false,
                actions: {
                    listAction: base_url + '/departures/getArticles'
                },
                toolbar: {
                    items: [{
                        cssClass: 'buscador',
                        text: search_pr
                    }]
                },
                fields: {
                    id: {
                        key: true,
                        edit: false,
                        create: false,
                        list: false
                    },
                    code_article: {
                        title: 'Código',
                        width: '4%'
                    },
                    description_detail: {
                        title: 'Descripción'
                    },
                    average_cost: {
                        title: 'Costo',
                        width: '2%',
                        listClass: 'text-right'
                    },
                    stock_p: {
                        title: 'Stock',
                        width: '2%',
                        listClass: 'text-right'
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

            generateSearchForm('frm-search-product', 'LoadRecordsButtonProduct', function () {
                table_container_pr.jtable('load', {
                    search: $('#search_product').val(),
                    items: arr_detail,
                    warehouse_id: d_warehouse_id.val()
                    // state: states.val()
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

            .state('departures', {
                url: '/departures',
                templateUrl: base_url + '/templates/departures/base.html',
                controller: 'DepartureCtrl'
            });

        $urlRouterProvider.otherwise('/');
    }
})
();