/**
 * Created by EVER on 4/17/2017.
 */
(function () {
    'use strict';
    angular.module('sys.app.entrys')
        .config(Config)
        .controller('EntryCtrl', EntryCtrl);

    Config.$inject = ['$stateProvider', '$urlRouterProvider'];
    EntryCtrl.$inject = ['$scope', '_', 'RESTService', 'AlertFactory'];

    function EntryCtrl($scope, _, RESTService, AlertFactory) {
        moment.locale('es');

        var modalE;
        var modalPr;
        var titleEnt;
        var product_detail;
        var e_entry_id;
        var e_entry_date;
        var e_user_id;
        var e_name;
        var e_warehouse_id;
        var e_observation;
        var default_ware = '';
        var state_entry;
        var button_saveProcess;
        var button_save;
        var button_article;

        function overModals() {
            if (!call_m) {
                modalE = $('#modalE');
                modalPr = $('#modalProduct');
                titleEnt = $('#title-ent');
                product_detail = $("#product_detail");
                e_entry_id = $("#e_entry_id");
                e_entry_date = $("#e_entry_date");
                e_user_id = $("#e_user_id");
                e_name = $("#e_name");
                e_observation = $("#e_observation");
                e_warehouse_id = $("#e_warehouse_id");
                state_entry = 0;
                button_saveProcess = $("#button_saveProcess");
                button_save = $("#button_save");
                button_article = $("#button_article");

                e_entry_date.datepicker({
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
                    modalE.attr('style', 'display:block;');
                });
                modalPr.on('show.bs.modal', function (e) {
                    modalE.attr('style', 'display:block; z-index:2030 !important');
                });
                modalE.on('hidden.bs.modal', function (e) {
                    cleanEntry();
                });
                callModals();

            }
            e_warehouse_id.select2();

            e_name.val(user_default);
        }

        function cleanEntry() {
            cleanRequired();
            titleEnt.html('');
            e_entry_id.val('');
            e_entry_date.val('').prop('disabled', false);
            e_warehouse_id.val(default_ware).trigger('change').prop('disabled', false);
            e_observation.val('');
            product_detail.html('');
            arr_detail = [];
            button_article.prop('disabled', false);
            button_saveProcess.prop('disabled', false);
            button_save.prop('disabled', false);
        }

        $scope.addDetail = function () {
            var $selectedRows = $("#table_container_pr").jtable('selectedRows');
            if ($selectedRows.length > 0) {
                $selectedRows.each(function () {
                    var record = $(this).data('record');
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
            RESTService.all('entrys/data_form', '', function (response) {
                if (!_.isUndefined(response.status) && response.status) {
                    _.each(response.warehouse, function (item) {
                        if (default_ware === '') default_ware = item.Value;
                        $("#e_warehouse_id").append('<option value="' + item.Value + '">' + item.DisplayText + '</option>');
                    });
                }
            }, function () {
                getDataForm();
            });
        }

        getDataForm();


        function newEntry() {
            overModals();
            modalE.modal('show');
            titleEnt.html('Nuevo Ingreso');
        }

        function findEntry(id) {
            overModals();
            titleEnt.html('Editar Ingreso');
            RESTService.get('entrys/find', id, function (response) {
                if (!_.isUndefined(response.status) && response.status) {
                    var data = response.data;
                    e_entry_id.val(data.id);
                    e_entry_date.val(data.entry_date);
                    e_warehouse_id.val(data.warehouse_id).trigger('change');
                    e_observation.val(data.observation);
                    modalE.modal('show');
                    _.each(data.product, function (record) {
                        validItemDetail(record);
                    });
                    if (data.state_entry === '1') {
                        e_warehouse_id.prop('disabled', true);
                        e_entry_date.prop('disabled', true);
                        button_save.prop('disabled', true);
                        button_saveProcess.prop('disabled', true);
                        button_article.prop('disabled', true);
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
                addToEntry(row.id, row.code_article, row.description_detail, row.price, row.quantity, row.state_entry);
                arr_detail.push(row.id);
            }
        }

        $scope.saveEntryProcess = function () {
            state_entry = 1;
            SaveEnd();
        };

        $scope.saveEntry = function () {
            state_entry = 0;
            SaveEnd();
        };

        function SaveEnd() {
            var bval = true;
            bval = bval && e_entry_date.required();
            bval = bval && e_warehouse_id.required();

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
                var entries = [];
                var entries_bofore = [];
                _.each($('.p_product'), function (item) {
                    products.push($(item).val());
                });
                _.each($('.p_price'), function (item) {
                    price.push($(item).val());
                });
                _.each($('.p_entries'), function (item) {
                    entries.push($(item).val());
                });
                _.each($('.p_entries_before'), function (item) {
                    entries_bofore.push($(item).val());
                });

                var params = {
                    'id': e_entry_id.val(),
                    'entry_date': e_entry_date.val(),
                    'warehouse_id': e_warehouse_id.val(),
                    'observation': e_observation.val(),
                    'product': products.join(','),
                    'price': price.join(','),
                    'entries': entries.join(','),
                    'entries_before': entries_bofore.join(','),
                    'state_entry': state_entry
                };

                var e_id = (e_entry_id.val() === '') ? 0 : e_entry_id.val();

                RESTService.updated('entrys/saveEntry', e_id, params, function (response) {
                    var condition = (state_entry === 1) ? 'procesó' : 'guardó';
                    if (!_.isUndefined(response.status) && response.status) {
                        AlertFactory.textType({
                            title: '',
                            message: 'El Ingreso se ' + condition + ' correctamente.',
                            type: 'success'
                        });
                        modalE.modal('hide');
                        LoadRecordsButtonEntry.click();
                    } else {
                        AlertFactory.textType({
                            title: '',
                            message: 'Hubo un error al ' + condition + ' el ingreso. Intente nuevamente.',
                            type: 'error'
                        });
                    }
                });
            }
        }


        $scope.openProducts = function () {
            $('#LoadRecordsButtonProduct').click();
            modalPr.modal('show');
        };

        function addToEntry(id, code, description, price, entry, state_entry) {
            if ($('#tr_p_' + id).length > 0) {
                AlertFactory.showWarning({
                    title: '',
                    message: 'Ya se asigno este artículo'
                });
                return false;
            }
            console.log(state_entry);
            var tr = $('<tr  data-id="' + id + '"></tr>');
            var td0 = $('<td>' + code + '</td>');
            var td1 = $('<td>' + description + '</td>');
            var row_price = (_.isNull(price)) ? '.00' : (_.isUndefined(price)) ? '0.0000' : price;
            var row_entry = (_.isNull(entry)) ? '0' : (_.isUndefined(entry)) ? '0' : entry;
            if (state_entry !== '1') {
                var tdp = $('<td class="text-right"><input type="text" value="' + row_price + '"' +
                    ' class="form-control input-xs text-right p_price" onkeypress="return validDecimals(event, this, 5)" ' +
                    'onblur="return roundDecimals(this, 4)"></td>');
                var tde = $('<td class="text-right"><input type="text" value="' + row_entry + '" ' +
                    'class="form-control input-xs text-right p_entries" onkeypress="return validDecimals(event, this, 3)" ' +
                    'onblur="return roundDecimals(this, 2)"></td>');
            } else {
                var tdp = $('<td class="text-right"><input type="text" readonly  value="' + row_price + '" ' +
                    'class="form-control input-xs text-right p_price" onkeypress="return validDecimals(event, this, 5)" ' +
                    'onblur="return roundDecimals(this, 4)"></td>');
                var tde = $('<td class="text-right"><input type="text" readonly value="' + row_entry + '" ' +
                    'class="form-control input-xs text-right p_entries" onkeypress="return validDecimals(event, this, 3)" ' +
                    'onblur="return roundDecimals(this, 2)"></td>');
            }
            var inp = $('<input type="hidden" class="p_product" value="' + id + '" />');
            var inp1 = $('<input type="hidden" class="p_entries_before" value="' + row_entry + '" />');
            td1.append(inp).append(inp1);
            var td2 = $('<td class="text-center"></td>');
            if (state_entry !== '1') {
                var btn = $('<button class="btn btn-danger btn-xs delProduct" data-id="' + id + '" type="button"><span class="fa fa-trash"></span></button>');
            } else {
                var btn = $('<button disabled class="btn btn-danger btn-xs delProduct" data-id="' + id + '" type="button"><span class="fa fa-trash"></span></button>');
            }
            td2.append(btn);
            tr.append(td0).append(td1).append(tdp).append(tde).append(td2);
            product_detail.append(tr);

            $('.delProduct').click(function (e) {
                var tr_ = $(this).closest('tr');
                AlertFactory.confirm({
                    title: '',
                    message: '¿Está seguro que desea quitar esta artículo?',
                    confirm: 'Si',
                    cancel: 'No'
                }, function () {
                    var tr_id = tr_.attr('data-id');
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

        var search = getFormSearch('frm-search-entry', 'search_entry', 'LoadRecordsButtonEntry');

        var table_container_e = $("#table_container_entry");

        table_container_e.jtable({
            title: "Lista de Ingresos",
            paging: true,
            sorting: true,
            actions: {
                listAction: base_url + '/entrys/list',
                // deleteAction: base_url + '/entrys/delete'
            },
            toolbar: {
                items: [{
                    cssClass: 'buscador',
                    text: search
                }, {
                    cssClass: 'btn-primary',
                    text: '<i class="fa fa-file-excel-o"></i> Exportar a Excel',
                    click: function () {
                        $scope.openDoc('entrys/excel', {});
                    }
                }, {
                    cssClass: 'btn-success',
                    text: '<i class="fa fa-plus"></i> Nuevo Ingreso',
                    click: function () {
                        newEntry();
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
                entry_date: {
                    title: (show_list_) ? 'Fecha Ingreso' : 'Fech Ingreso',
                    listClass: 'text-center',
                    width: '4%',
                    sorting: true
                },
                warehouse_e: {
                    title: 'Almacén',
                    sorting: true
                },
                name: {
                    title: 'Usuario',
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
                        if (data.record.state_entry === '0') {
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
                    findEntry(code);
                    e.preventDefault();
                });
            }
        });

        generateSearchForm('frm-search-entry', 'LoadRecordsButtonEntry', function () {
            table_container_e.jtable('load', {
                search: $('#search_entry').val()
            });
        }, true);

        var call_m = false;

        function callModals() {
            call_m = true;
            var search_pr = getFormSearch('frm-search-product', 'search_product', 'LoadRecordsButtonProduct');

            var table_container_pr = $("#table_container_pr");

            table_container_pr.jtable({
                title: "Artículos Disponibles",
                paging: true,
                sorting: true,
                selecting: true,
                multiselect: true,
                selectingCheckboxes: true,
                selectOnRowClick: false,
                actions: {
                    listAction: base_url + '/entrys/getArticles'
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
                        width: '4%',
                        listClass: 'text-center'
                    },
                    description_detail: {
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

            generateSearchForm('frm-search-product', 'LoadRecordsButtonProduct', function () {
                table_container_pr.jtable('load', {
                    search: $('#search_product').val(),
                    items: arr_detail
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

            .state('entrys', {
                url: '/entrys',
                templateUrl: base_url + '/templates/entrys/base.html',
                controller: 'EntryCtrl'
            });

        $urlRouterProvider.otherwise('/');
    }
})
();