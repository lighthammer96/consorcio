/**
 * Created by EVER on 4/17/2017.
 */
(function () {
    'use strict';
    angular.module('sys.app.consumer_returns')
        .config(Config)
        .controller('ConsumeReturnCtrl', ConsumeReturnCtrl);

    Config.$inject = ['$stateProvider', '$urlRouterProvider'];
    ConsumeReturnCtrl.$inject = ['$scope', '_', 'RESTService', 'AlertFactory'];

    function ConsumeReturnCtrl($scope, _, RESTService, AlertFactory) {
        moment.locale('es');

        var modalCR;
        var titleCr;
        var cr_date;
        var cr_name;
        var cr_warehouse_id;
        var cr_observation;
        var modalProject;
        var cr_project_id;
        var cr_project_code;
        var cr_project_description;
        var modalFront;
        var cr_front_id;
        var cr_front_description;
        var modalArticles;
        var cr_button_project;
        var cr_button_front;
        var cr_button_articles;
        var cr_button_saveConsumerProcess;
        var cr_button_saveConsumer;
        var default_ware = '';
        var cr_detail_consumer_return;
        var state_consumer_return;
        var cr_consumer_return_id;

        function overModals() {
            if (!call_m) {
                modalCR = $('#modalCR');
                titleCr = $('#title-cr');
                cr_date = $("#cr_date");
                cr_name = $("#cr_name");
                cr_warehouse_id = $("#cr_warehouse_id");
                cr_observation = $("#cr_observation");
                modalProject = $("#modalProject");
                cr_project_id = $("#cr_project_id");
                cr_project_code = $("#cr_project_code");
                cr_project_description = $("#cr_project_description");
                modalFront = $('#modalFront');
                cr_front_id = $("#cr_front_id");
                cr_front_description = $("#cr_front_description");
                modalArticles = $("#modalArticles");
                cr_button_project = $("#cr_button_project");
                cr_button_front = $("#cr_button_front");
                cr_button_articles = $("#cr_button_articles");
                cr_button_saveConsumerProcess = $("#cr_button_saveConsumerProcess");
                cr_button_saveConsumer = $("#cr_button_saveConsumer");
                cr_detail_consumer_return = $("#cr_detail_consumer_return");
                cr_consumer_return_id = $("#cr_consumer_return_id");

                modalProject.on('hidden.bs.modal', function (e) {
                    modalCR.attr('style', 'display:block;');
                });
                modalProject.on('show.bs.modal', function (e) {
                    modalCR.attr('style', 'display:block; z-index:2030 !important');
                });

                modalFront.on('hidden.bs.modal', function (e) {
                    modalCR.attr('style', 'display:block;');
                });
                modalFront.on('show.bs.modal', function (e) {
                    modalCR.attr('style', 'display:block; z-index:2030 !important');
                });

                modalArticles.on('hidden.bs.modal', function (e) {
                    modalCR.attr('style', 'display:block;');
                });
                modalArticles.on('show.bs.modal', function (e) {
                    modalCR.attr('style', 'display:block; z-index:2030 !important');
                });

                modalCR.on('hidden.bs.modal', function (e) {
                    cleanConsumerReturn();
                });

                cr_date.datepicker({
                    changeMonth: true,
                    changeYear: true,
                    dateFormat: 'dd/mm/yy',
                    beforeShow: function () {
                        setTimeout(function () {
                            $('.ui-datepicker').css('z-index', 2052);
                        });
                    }
                });

                callModals();
            }
            cr_warehouse_id.select2();
            cr_name.val(user_default);
        }


        function cleanConsumerReturn() {
            cleanRequired();
            cr_date.val('').prop('disabled', false);
            cr_name.val('');
            cr_warehouse_id.val(default_ware).prop('disabled', false);
            cr_observation.val('');
            cr_project_id.val('');
            cr_detail_consumer_return.empty();
            cr_project_code.val('');
            cr_project_description.val('');
            cr_front_id.val('');
            cr_consumer_return_id.val('');
            cr_front_description.val('');
            cr_button_project.prop('disabled', false);
            cr_button_front.prop('disabled', false);
            cr_button_articles.prop('disabled', false);
            cr_button_saveConsumerProcess.prop('disabled', false);
            cr_button_saveConsumer.prop('disabled', false);
            arr_detail = [];
        }

        function getDataForm() {
            RESTService.all('consumer_returns/data_form', '', function (response) {
                if (!_.isUndefined(response.status) && response.status) {
                    // $("#cr_warehouse_id").append('<option value="">SELECCIONE</option>');
                    _.each(response.warehouse, function (item) {
                        if (default_ware === '') default_ware = item.Value;
                        $("#cr_warehouse_id").append('<option value="' + item.Value + '">' + item.DisplayText + '</option>');
                    });
                }
            }, function () {
                getDataForm();
            });
        }

        getDataForm();

        function newConsumeReturn() {
            cleanRequired();
            overModals();
            modalCR.modal('show');
            titleCr.html('Nueva Devolución de Consumo');
        }

        $scope.openProject = function () {
            $('#LoadRecordsButtonProject').click();
            modalProject.modal('show');
        };

        $scope.openFront = function () {
            $('#LoadRecordsButtonFront').click();
            modalFront.modal('show');
        };

        $scope.saveConsumerProcess = function () {
            state_consumer_return = 1;
            SaveEndConsumer();
        };

        $scope.saveConsumer = function () {
            state_consumer_return = 0;
            SaveEndConsumer();
        };

        function SaveEndConsumer() {
            var bval = true;
            bval = bval && cr_date.required();
            bval = bval && cr_warehouse_id.required();
            bval = bval && cr_front_description.required();
            if (bval && cr_detail_consumer_return.html() === '') {
                AlertFactory.showWarning({
                    title: '',
                    message: 'Debe agregar mínimo 1 artículo'
                });
                return false;
            }

            if (bval) {
                var products = [];
                var toConsumeReturn = [];
                var p_available = [];
                _.each($('.p_product'), function (item) {
                    products.push($(item).val());
                });
                _.each($('.p_toConsumeReturn'), function (item) {
                    toConsumeReturn.push($(item).val());  //p_available
                });
                _.each($('.p_available'), function (item) {
                    p_available.push($(item).val());
                });


                var params = {
                    'id': cr_consumer_return_id.val(),
                    'date': cr_date.val(),
                    'warehouse_id': cr_warehouse_id.val(),
                    'observation': cr_observation.val(),
                    'project_id': cr_project_id.val(),
                    'front_id': cr_front_id.val(),
                    'product': products.join(','),
                    'toConsumeReturn': toConsumeReturn.join(','),
                    'state_consumer_return': state_consumer_return
                };
                AlertFactory.confirm({
                    title: '',
                    message: '¿Está seguro?',
                    confirm: 'Si',
                    cancel: 'No'
                }, function () {
                    var cr_id = (cr_consumer_return_id.val() === '') ? 0 : cr_consumer_return_id.val();

                    RESTService.updated('consumer_returns/saveConsumerReturn', cr_id, params, function (response) {
                        var condition = (state_consumer_return === 1) ? 'procesó' : 'guardó';
                        if (!_.isUndefined(response.status) && response.status) {
                            AlertFactory.textType({
                                title: '',
                                message: 'La devolución de consumo se ' + condition + ' correctamente.',
                                type: 'success'
                            });
                            modalCR.modal('hide');
                            LoadRecordsButtonConsumerReturn.click();
                        } else {
                            AlertFactory.textType({
                                title: '',
                                message: 'Hubo un error al ' + condition + ' la devolucion de consumo. Intente nuevamente.',
                                type: 'error'
                            });
                        }
                    });
                });
            }
        }

        function findConsumerReturn(id) {
            overModals();
            titleCr.html('Editar Devolución de Consumo');
            RESTService.get('consumer_returns/find', id, function (response) {
                if (!_.isUndefined(response.status) && response.status) {
                    var data = response.data;
                    cr_consumer_return_id.val(data.id);
                    cr_date.val(data.date);
                    cr_warehouse_id.val(data.warehouse_id).trigger('change');
                    cr_observation.val(data.observation);
                    cr_project_id.val(data.project_id);
                    cr_project_code.val(data.project_code);
                    cr_project_description.val(data.project_description);
                    cr_front_id.val(data.front_id);
                    cr_front_description.val(data.front_code);
                    modalCR.modal('show');
                    _.each(data.product, function (b) {
                        validItemDetail(b);
                    });
                    if (data.state_description === 'PROCESADO') {
                        cr_date.prop('disabled', true);
                        cr_warehouse_id.prop('disabled', true);
                        cr_button_saveConsumerProcess.prop('disabled', true);
                        cr_button_saveConsumer.prop('disabled', true);
                        cr_button_project.prop('disabled', true);
                        cr_button_front.prop('disabled', true);
                        cr_button_articles.prop('disabled', true);
                    }
                } else {
                    AlertFactory.textType({
                        title: '',
                        message: 'Hubo un error al obtener  la devolución de consumo. Intente nuevamente.',
                        type: 'error'
                    });
                }
            });
        }


        $scope.openArticles = function () {
            if (cr_warehouse_id.val() === '') {
                AlertFactory.showWarning({
                    title: '',
                    message: 'Debe seleccionar un almacén de origen'
                });
                return false;
            }
            else {
                if ($('.p_warehouse').val() !== cr_warehouse_id.val() && cr_detail_consumer_return.html() !== '') {
                    AlertFactory.confirm({
                        title: '',
                        message: '¿Está seguro que desea cambiar de almacen?',
                        confirm: 'Si',
                        cancel: 'No'
                    }, function () {
                        cr_detail_consumer_return.html('');
                        arr_detail = [];
                    });
                } else {
                    $('#LoadRecordsButtonArticle').click();
                    modalArticles.modal('show');
                }
            }
        };


        var arr_detail = [];

        $scope.addDetail = function () {
            var $selectedRows = $("#table_container_product").jtable('selectedRows');
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

        function validItemDetail(row) {
            if (!_.contains(arr_detail, row.id)) {
                addToConsumerReturn(row.id, row.code_article, row.description_detail, row.um_id, row.average_cost,
                    row.stock_p, row.refund_amount, row.toReturn, row.state);
                arr_detail.push(row.id);
            }
        }

        function addToConsumerReturn(id, code, description, unit, cost, available, consumption, toConsume, state) {
            var state_detail, cons;
            if ($('#tr_c_' + id).length > 0) {
                AlertFactory.showWarning({
                    title: '',
                    message: 'Ya se asigno este artículo'
                });
                return false;
            }
            state_detail = (state === 'PROCESADO') ? 'disabled' : '';

            var tr = $('<tr id="tr_c_' + id + '" data-id="' + id + '"></tr>');
            var td0 = $('<td class="rg_code">' + code + '</td>');
            var td1 = $('<td class="rg_description">' + description + '</td>');
            var row_unit = (_.isNull(unit)) ? '' : (_.isUndefined(unit)) ? '' : unit;
            var td2 = $('<td class="p_unit">' + row_unit + '</td>');
            var row_cost = (_.isNull(cost)) ? '0' : (_.isUndefined(cost)) ? '0' : cost;
            var td3 = $('<td class="text-right p_productCost">' + row_cost + '</td>');
            var row_consumption = (_.isNull(consumption)) ? '0' : (_.isUndefined(consumption)) ? '0' : consumption;
            var row_available = (_.isNull(available)) ? '0' : (_.isUndefined(available)) ? '0' : available;
            var td5 = $('<td class="text-right p_productCost">' + row_consumption + '</td>');
            var row_toConsume = (state === 'PROCESADO') ? 0 : ((_.isNull(toConsume)) ? '0' : (_.isUndefined(toConsume)) ? '0' : toConsume);

            var td6 = $('<td class="text-right"><input ' + state_detail + ' type="text" value="' + row_toConsume + '"' +
                ' id="inpRow' + id + '"   data-max="' + row_available + '"  class="form-control input-xs text-right p_toConsumeReturn" ' +
                'onkeypress="return soloNumeros(event)"></td>');
            var td7 = $('<td class="text-center"></td>');
            var disposable = $('<input type="hidden" class="p_available" value="' + row_available + '" >');
            var input_warehouse = $('<input type="hidden" class="p_warehouse" value="' + cr_warehouse_id.val() + '" >');
            var inp_product_id = $('<input type="hidden" class="p_product" value="' + id + '" />');

            var btn = $('<button ' + state_detail + ' class="btn btn-danger btn-xs delProduct"  data-id="' + id + '" ' +
                'readonly type="button"><span class="fa fa-trash"></span></button>');

            td7.append(btn).append(input_warehouse).append(inp_product_id).append(disposable);
            tr.append(td0).append(td1).append(td2).append(td3).append(td5).append(td6).append(td7);
            cr_detail_consumer_return.append(tr);

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
                    console.log(tr_id);
                    arr_detail = _.reject(arr_detail, function (item) {
                        return item === parseInt(tr_id)
                    });
                    $('#LoadRecordsButtonArticle').click();
                });
                e.preventDefault();
            });

            modalArticles.modal('hide');
        }


        var search = getFormSearch('frm-search-consumerReturn', 'search_consumerReturn', 'LoadRecordsButtonConsumerReturn');

        var table_container_cr = $("#table_container_consumer_return");

        table_container_cr.jtable({
            title: "Lista de Devolución de Consumos",
            paging: true,
            sorting: true,
            actions: {
                listAction: base_url + '/consumer_returns/list'
            },
            toolbar: {
                items: [{
                    cssClass: 'buscador',
                    text: search
                }, {
                    cssClass: 'btn-primary',
                    text: '<i class="fa fa-file-excel-o"></i> Exportar a Excel',
                    click: function () {
                        $scope.openDoc('consumer_returns/excel', {});
                    }
                }, {
                    cssClass: 'btn-success',
                    text: '<i class="fa fa-plus"></i> Nueva Devolución de  Consumo',
                    click: function () {
                        newConsumeReturn();
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
                date: {
                    title: (show_list_) ? 'Fecha Devolución' : 'Fecha',
                    listClass: 'text-center',
                    width: '5%'
                },
                project_description: {

                    title: 'Proyecto'
                },
                name: {

                    title: 'Usuario',
                    list: show_list_
                },
                warehouse_o: {

                    title: 'Almacén',
                    width: '7%'
                },
                state_description: {
                    title: 'Estado',
                    width: '3%'
                    // listClass: 'text-center'
                },
                edit: {
                    width: '1%',
                    sorting: false,
                    edit: false,
                    create: false,
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
                    findConsumerReturn(code);
                    e.preventDefault();
                });
            }
        });

        generateSearchForm('frm-search-consumerReturn', 'LoadRecordsButtonConsumerReturn', function () {
            table_container_cr.jtable('load', {
                search: $('#search_consumerReturn').val()
            });
        }, true);

        var call_m = false;

        function callModals() {
            call_m = true;

            var search_prj = getFormSearch('frm-search-project', 'search_project', 'LoadRecordsButtonProject');

            var table_container_project = $("#table_container_project");

            table_container_project.jtable({
                title: "Lista de Proyectos",
                paging: true,
                sorting: true,
                actions: {
                    listAction: base_url + '/consumer_returns/getProjects'
                },
                toolbar: {
                    items: [{
                        cssClass: 'buscador',
                        text: search_prj
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
                        title: 'Código Proyecto',
                        width: '5%',
                        listClass: 'text-center'
                    },
                    description: {
                        title: 'Proyecto'
                    },
                    select: {
                        width: '1%',
                        sorting: false,
                        edit: false,
                        create: false,
                        listClass: 'text-center',
                        display: function (data) {
                            return '<a href="javascript:void(0)" title="Seleccionar" class="select_p" data-id="' +
                                data.record.id + '" data-code="' + data.record.code + '" data-description="' +
                                data.record.description + '"><i class="fa fa-' + icon_select + ' fa-1-5x"></i></a>';
                        }
                    }
                },
                recordsLoaded: function (event, data) {
                    $('.select_p').click(function (e) {
                        var data_id = $(this).attr('data-id');
                        cr_project_id.val(data_id);
                        cr_project_code.val($(this).attr('data-code'));
                        cr_project_description.val($(this).attr('data-description'));
                        modalProject.modal('hide');
                        e.preventDefault();
                    });
                }
            });

            generateSearchForm('frm-search-project', 'LoadRecordsButtonProject', function () {
                table_container_project.jtable('load', {
                    search: $('#search_project').val()
                });
            }, false);


            var search_p = getFormSearch('frm-search-article', 'search_article', 'LoadRecordsButtonArticle');

            var table_container_product = $("#table_container_product");

            table_container_product.jtable({
                title: "Lista de Artículos",
                paging: true,
                sorting: true,
                selecting: true,
                multiselect: true,
                selectingCheckboxes: true,
                selectOnRowClick: false,
                actions: {
                    listAction: base_url + '/consumer_returns/getArticlesWithWithoutProject'
                },
                toolbar: {
                    items: [{
                        cssClass: 'buscador',
                        text: search_p
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
                        width: '2%',
                        listClass: 'text-center'
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
                    },
                    um_id: {
                        title: 'Unidad Medida',
                        edit: false,
                        create: false,
                        list: false
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
            generateSearchForm('frm-search-article', 'LoadRecordsButtonArticle', function () {
                table_container_product.jtable('load', {
                    search: $('#search_article').val(),
                    warehouse_id: cr_warehouse_id.val(),
                    items: arr_detail,
                    project_id: cr_project_id.val()
                });
            }, false);

            var search_fro = getFormSearch('frm-search-front', 'search_front', 'LoadRecordsButtonFront');


            var table_container_front = $("#table_container_fronts");

            table_container_front.jtable({
                title: "Lista de Frentes",
                paging: true,
                sorting: true,
                actions: {
                    listAction: base_url + '/consumer_returns/listFront'
                },
                toolbar: {
                    items: [{
                        cssClass: 'buscador',
                        text: search_fro
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
                        title: 'Código',
                        width: '5%',
                    },
                    description: {
                        title: 'Descripción',
                        width: '20%'
                    },
                    NombreEntidad: {
                        title: 'Razón Social'
                    },
                    select: {
                        width: '1%',
                        sorting: false,
                        edit: false,
                        create: false,
                        display: function (data) {
                            return '<a href="javascript:void(0)" title="Seleccionar" class="select_fr" data-id="' +
                                data.record.id + '"  data-code="' + data.record.code + '" data-description="' +
                                data.record.description + '"><i class="fa fa-circle-o fa-1-5x"></i></a>';
                        }
                    }
                },
                recordsLoaded: function (event, data) {
                    $('.select_fr').click(function (e) {
                        var id = $(this).attr('data-id');
                        var description = $(this).attr('data-description');
                        cr_front_id.val(id).removeClass('border-red');
                        cr_front_description.val(description).removeClass('border-red');
                        modalFront.modal('hide');
                        e.preventDefault();
                    });
                }
            });
            generateSearchForm('frm-search-front', 'LoadRecordsButtonFront', function () {
                table_container_front.jtable('load', {
                    search: $('#search_front').val()
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

            .state('consumer_returns', {
                url: '/consumer_returns',
                templateUrl: base_url + '/templates/consumer_returns/base.html',
                controller: 'ConsumeReturnCtrl'
            });

        $urlRouterProvider.otherwise('/');
    }
})
();