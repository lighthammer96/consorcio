/**
 * Created by EVER on 4/17/2017.
 */
(function () {
    'use strict';
    angular.module('sys.app.consumptions')
        .config(Config)
        .controller('ConsumptionCtrl', ConsumptionCtrl);

    Config.$inject = ['$stateProvider', '$urlRouterProvider'];
    ConsumptionCtrl.$inject = ['$scope', '_', 'RESTService', 'AlertFactory'];

    function ConsumptionCtrl($scope, _, RESTService, AlertFactory) {
        moment.locale('es');
        var modalCON;
        var modalProject;
        var titleCon;
        var btnActionReq;
        var reqDates = $('#reqDates');
        var modalArticles;
        var modalRequirements;
        var modalFront;
        var c_consumption_date;
        var default_ware = '';
        var c_front_id;
        var c_project_id;
        var c_project_description;
        var c_project_code;
        var c_front_description;
        var c_front_code;
        var c_requirement_id;
        var c_requirement_code;
        var c_warehouse_id;
        var c_name;
        var c_observation;
        var c_detail_consumption;
        var warehouse;
        var state_consumption;
        var c_consumption_id;
        var c_button_saveConsumptionProcess;
        var c_button_saveConsumption;
        var c_button_articles;
        var c_button_project;
        var c_button_requirement;
        var c_button_front;

        function overModals() {
            if (!call_m) {
                modalCON = $('#modalCON');
                modalProject = $('#modalProject');
                titleCon = $('#title-con');
                btnActionReq = $('#btn_action_req');
                modalArticles = $('#modalArticles');
                modalRequirements = $('#modalRequirements');
                modalFront = $('#modalFront');
                c_consumption_date = $("#c_consumption_date");
                c_front_id = $("#c_front_id");
                c_front_code = $("#c_front_code");
                c_project_id = $("#c_project_id");
                c_project_description = $("#c_project_description");
                c_project_code = $("#c_project_code");
                c_front_description = $("#c_front_description");
                c_requirement_id = $("#c_requirement_id");
                c_requirement_code = $("#c_requirement_code");
                c_name = $("#c_name");
                c_observation = $("#c_observation");
                c_warehouse_id = $("#c_warehouse_id");
                c_detail_consumption = $("#c_detail_consumption");
                c_consumption_id = $("#c_consumption_id");
                c_button_saveConsumption = $("#c_button_saveConsumption");
                c_button_saveConsumptionProcess = $("#c_button_saveConsumptionProcess");
                c_button_project = $("#c_button_project");
                c_button_requirement = $("#c_button_requirement");
                c_button_front = $("#c_button_front");
                c_button_articles = $("#c_button_articles");

                modalFront.on('hidden.bs.modal', function (e) {
                    modalCON.attr('style', 'display:block;');
                });
                modalFront.on('show.bs.modal', function (e) {
                    modalCON.attr('style', 'display:block; z-index:2030 !important');
                });

                modalRequirements.on('hidden.bs.modal', function (e) {
                    modalCON.attr('style', 'display:block;');
                });
                modalRequirements.on('show.bs.modal', function (e) {
                    modalCON.attr('style', 'display:block; z-index:2030 !important');
                });

                modalArticles.on('hidden.bs.modal', function (e) {
                    modalCON.attr('style', 'display:block;');
                });
                modalArticles.on('show.bs.modal', function (e) {
                    modalCON.attr('style', 'display:block; z-index:2030 !important');
                });

                modalProject.on('hidden.bs.modal', function (e) {
                    modalCON.attr('style', 'display:block;');
                });
                modalProject.on('show.bs.modal', function (e) {
                    modalCON.attr('style', 'display:block; z-index:2030 !important');
                });
                modalCON.on('hidden.bs.modal', function (e) {
                    cleanConsumption();
                });

                c_consumption_date.datepicker({
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
            c_warehouse_id.select2();
            c_name.val(user_default);

            c_warehouse_id.change(function () {
                warehouse = c_warehouse_id.val();
            });

        }

        function cleanConsumption() {
            cleanRequired();
            titleCon.html('');
            c_consumption_id.val('');
            c_project_id.val('');
            c_project_code.val('');
            c_project_description.val('');
            c_requirement_id.val('');
            c_requirement_code.val('');
            c_front_id.val('');
            c_front_code.val('');
            c_front_description.val('');
            c_consumption_date.val('').prop('disabled', false);
            c_warehouse_id.val(default_ware).prop('disabled', false);
            c_observation.val('');
            c_detail_consumption.html('');
            arr_detail = [];
            c_button_saveConsumptionProcess.prop("disabled", false);
            c_button_saveConsumption.prop("disabled", false);
            c_button_project.prop('disabled', false);
            c_button_requirement.prop('disabled', false);
            c_button_front.prop('disabled', false);
            c_button_articles.prop('disabled', false);
        }


        $scope.addDetail = function () {
            var $selectedRows = $("#table_container_articles").jtable('selectedRows');
            if ($selectedRows.length > 0) {
                $selectedRows.each(function () {
                    var record = $(this).data('record');
                    if (parseFloat(record.stock_p) <= 0 || parseFloat(record.stock_p) === '' || parseFloat(record.stock_p) === .00
                        || parseFloat(record.stock_p) === null || parseFloat(record.stock_p) === '') {
                        AlertFactory.showWarning({
                            title: '',
                            message: 'El stock debe ser mayor que 0'
                        });
                        return false;
                    }
                    else {
                        validItemDetail(record);
                    }
                });
            } else {
                AlertFactory.textType({
                    title: '',
                    message: 'Debe seleccionar al menos un artículo a asignar.',
                    type: 'warning'
                });
                return false;
            }
            // clearRowsAR();
        };

        function findConsumption(id) {
            overModals();
            titleCon.html('Editar Consumo');
            RESTService.get('consumptions/find', id, function (response) {
                if (!_.isUndefined(response.status) && response.status) {
                    var data = response.data;
                    c_consumption_id.val(data.id);
                    c_consumption_date.val(data.date);
                    c_warehouse_id.val(data.warehouse_id);
                    c_observation.val(data.observation);
                    c_project_id.val(data.project_id);
                    c_project_code.val(data.project_code);
                    c_project_description.val(data.project_description);
                    c_requirement_id.val(data.requirement_id);
                    c_requirement_code.val(data.requirement_code);
                    c_front_id.val(data.front_id);
                    c_front_code.val(data.front_code);
                    c_front_description.val(data.front_description);
                    modalCON.modal('show');
                    _.each(data.product, function (b) {
                        validItemDetail(b);
                    });
                    if (data.state_description === 'PROCESADO') {
                        c_consumption_date.prop('disabled', true);
                        c_warehouse_id.prop('disabled', true);
                        c_button_saveConsumptionProcess.prop('disabled', true);
                        c_button_saveConsumption.prop('disabled', true);
                        c_button_project.prop('disabled', true);
                        c_button_requirement.prop('disabled', true);
                        c_button_front.prop('disabled', true);
                        c_button_articles.prop('disabled', true);
                    }
                } else {
                    AlertFactory.textType({
                        title: '',
                        message: 'Hubo un error al obtener  el consumo. Intente nuevamente.',
                        type: 'error'
                    });
                }
            });
        }

        var arr_detail = [];

        function validItemDetail(row) {
            if (!_.contains(arr_detail, row.id)) {
                addToConsumption(row.id, row.code_article, row.description_detail, row.um_id, row.average_cost,
                    row.stock_p, row.consumption, row.toConsume, row.state);
                arr_detail.push(row.id);
            }
        }

        function addToConsumption(id, code, description, unit, cost, available, consumption, toConsume, state) {
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
            var row_available = (_.isNull(available)) ? '0' : (_.isUndefined(available)) ? '0' : available;
            var td4 = $('<td class="text-right p_available" style="display: none;">' + row_available + '</td>');
            var row_consumption = (_.isNull(consumption)) ? '0' : (_.isUndefined(consumption)) ? '0' : consumption;
            var td5 = $('<td class="text-right p_productCost">' + row_consumption + '</td>');

            var row_toConsume = (state === 'PROCESADO') ? 0 : ((_.isNull(toConsume)) ? '0' : (_.isUndefined(toConsume)) ? '0' : toConsume);

            var td6 = $('<td class="text-right"><input ' + state_detail + ' type="text" value="' + row_toConsume + '"' +
                ' id="inpRow' + id + '"  data-max="' + available + '" onclick="this.select()"   ' +
                'class="form-control input-xs text-right p_toConsume"  onkeypress="return soloNumeros(event)"></td>');
            var td7 = $('<td class="text-center"></td>');
            var input_warehouse = $('<input type="hidden" class="p_warehouse" value="' + c_warehouse_id.val() + '" >');
            var inp_product_id = $('<input type="hidden" class="p_product" value="' + id + '" />');

            var btn = $('<button ' + state_detail + ' class="btn btn-danger btn-xs delProduct"  data-id="' + id + '" ' +
                'readonly type="button"><span class="fa fa-trash"></span></button>');

            td7.append(btn).append(input_warehouse).append(inp_product_id);
            tr.append(td0).append(td1).append(td2).append(td3).append(td4).append(td5).append(td6).append(td7);
            c_detail_consumption.append(tr);

            $('.p_toConsume').blur(function () {
                var that = $(this);
                var maxRow = that.attr('data-max');
                if (that.val() > parseFloat(maxRow) || that.val() === '') {
                    AlertFactory.showWarning({
                        title: 'Debe ingresar una cantidad menor o igual a la cantidad disponible',
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


        function newConsumption() {
            overModals();
            modalCON.modal('show');
            titleCon.html('Nuevo Consumo');
            btnActionReq.addClass('hide');
        }


        function getDataForm() {
            RESTService.all('consumptions/data_form', '', function (response) {
                if (!_.isUndefined(response.status) && response.status) {
                    $("#c_warehouse_id").append('<option value="">SELECCIONE</option>');
                    _.each(response.warehouse, function (item) {
                        if (default_ware === '') default_ware = item.Value;
                        $("#c_warehouse_id").append('<option value="' + item.Value + '">' + item.DisplayText + '</option>');
                    });
                }
            }, function () {
                getDataForm();
            });
        }

        getDataForm();


        $scope.openProject = function () {
            $('#LoadRecordsButtonProject').click();
            modalProject.modal('show');
        };

        $scope.openArticles = function () {
            // arr_detail = [];
            if (c_warehouse_id.val() === '') {
                AlertFactory.showWarning({
                    title: '',
                    message: 'Debe seleccionar un almacén de origen'
                });
                return false;
            }
            else {
                if ($('.p_warehouse').val() !== c_warehouse_id.val() && c_detail_consumption.html() !== '') {
                    AlertFactory.confirm({
                        title: '',
                        message: '¿Está seguro que desea cambiar de almacen origen?',
                        confirm: 'Si',
                        cancel: 'No'
                    }, function () {
                        c_detail_consumption.html('');
                        arr_detail = [];
                    });
                } else {
                    $('#LoadRecordsButtonArticle').click();
                    modalArticles.modal('show');
                }
            }
        };

        $scope.openRequirements = function () {
            if (c_project_id.val() === '') {
                AlertFactory.textType({
                    title: '',
                    message: 'Debe busca proyecto antes de buscar requerimiento.',
                    type: 'warning'
                });
                return false;
            }
            $('#LoadRecordsButtonRequirement').click();
            modalRequirements.modal('show');
        };

        $scope.openFront = function () {
            $('#LoadRecordsButtonFront').click();
            modalFront.modal('show');
        };

        $scope.saveConsumptionProcess = function () {
            state_consumption = 1;
            SaveValidationConsumption();
        };

        $scope.saveConsumption = function () {
            state_consumption = 0;
            SaveValidationConsumption();
        };


        function SaveValidationConsumption() {
            var bval = true;
            var products = [];
            var p_toConsume = [];
            var condition_stock = false;
            var available=[];
            bval = bval && c_consumption_date.required();
            bval = bval && c_name.required();
            bval = bval && c_warehouse_id.required();
            // bval = bval && c_observation.required();
            bval = bval && c_project_code.required();
            // bval = bval && c_requirement_code.required();
            bval = bval && c_front_code.required();

            if (bval && c_detail_consumption.html() === '') {
                AlertFactory.showWarning({
                    title: '',
                    message: 'Debe agregar mínimo 1 artículo'
                });
                return false;
            }
            if (bval) {
                _.each($('.p_product'), function (item) {
                    products.push($(item).val());
                });

                _.each($('.p_toConsume'), function (item) {
                    p_toConsume.push($(item).val());
                });

                _.each($('.p_available'), function (item) {
                    available.push($(item).html());
                });

                $.each(available, function (idx, item) {
                    if (parseFloat(available[idx]) < parseFloat(p_toConsume[idx])) {
                        condition_stock = true;
                    }
                    console.log(available[idx] + '-' + p_toConsume[idx] + '\n');
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
                    'id': c_consumption_id.val(),
                    'date': c_consumption_date.val(),
                    'warehouse_id': c_warehouse_id.val(),
                    'observation': c_observation.val(),
                    'project_id': c_project_id.val(),
                    'requirement_id': c_requirement_id.val(),
                    'state_consumption': state_consumption,
                    'front_id': c_front_id.val(),
                    'product': products.join(','),
                    'toConsume': p_toConsume.join(',')
                };
                AlertFactory.confirm({
                    title: '',
                    message: '¿Estas seguro?',
                    confirm: 'Si',
                    cancel: 'No'
                }, function () {
                    var con_id = (c_consumption_id.val() === '') ? 0 : c_consumption_id.val();
                    RESTService.updated('consumptions/saveConsumption', con_id, params, function (response) {
                        var condition = (state_consumption === 1) ? 'procesó' : 'guardó';
                        if (!_.isUndefined(response.status) && response.status) {
                            AlertFactory.textType({
                                title: '',
                                message: 'El consumo  se ' + condition + ' correctamente.',
                                type: 'success'
                            });
                            modalCON.modal('hide');
                            $("#LoadRecordsButtonConsumption").click();
                        } else {
                            AlertFactory.textType({
                                title: '',
                                message: 'Hubo un error al ' + condition + '  el consumo. Intente nuevamente.',
                                type: 'error'
                            });
                        }
                    });
                });
            }
        }


        var search = getFormSearch('frm-search-consumption', 'search_consumption', 'LoadRecordsButtonConsumption');

        var table_container_consumption = $("#table_container_consumption");

        table_container_consumption.jtable({
            title: "Lista de Consumos",
            paging: true,
            sorting: true,
            actions: {
                listAction: base_url + '/consumptions/list'
            },
            toolbar: {
                items: [{
                    cssClass: 'buscador',
                    text: search
                }, {
                    cssClass: 'btn-primary',
                    text: '<i class="fa fa-file-excel-o"></i> Exportar a Excel',
                    click: function () {
                        $scope.openDoc('consumptions/excel', {});
                    }
                }, {
                    cssClass: 'btn-success',
                    text: '<i class="fa fa-plus"></i> Nuevo Consumo',
                    click: function () {
                        newConsumption();
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
                    title: (show_list_) ? 'Fecha Consumo' : 'Fecha',
                    listClass: 'text-center',
                    width: '5%'
                },
                name: {

                    title: 'Usuario',
                    list: show_list_,
                    width: '7%'
                },
                description_project: {

                    title: 'Proyecto'
                },
                warehouse_o: {

                    title: 'Almacén',
                    width: '7%'
                },
                state_description: {

                    title: 'Estado',
                    width: '3%'
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
                    findConsumption(code);
                    e.preventDefault();
                });
            }
        });

        generateSearchForm('frm-search-consumption', 'LoadRecordsButtonConsumption', function () {
            table_container_consumption.jtable('load', {
                search: $('#search_consumption').val()
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
                    listAction: base_url + '/consumptions/getProjects'
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
                        c_project_id.val(data_id);
                        c_project_code.val($(this).attr('data-code'));
                        c_project_description.val($(this).attr('data-description'));
                        modalProject.modal('hide');
                        c_requirement_id.val('');
                        c_requirement_code.val('');
                        e.preventDefault();
                    });
                }
            });

            generateSearchForm('frm-search-project', 'LoadRecordsButtonProject', function () {
                table_container_project.jtable('load', {
                    search: $('#search_project').val()
                });
            }, false);


            var search_ar = getFormSearch('frm-search-article', 'search_article', 'LoadRecordsButtonArticle');

            var table_container_article = $("#table_container_articles");

            table_container_article.jtable({
                title: "Lista de Artículos",
                paging: true,
                sorting: true,
                selecting: true,
                multiselect: true,
                selectingCheckboxes: true,
                selectOnRowClick: false,
                actions: {
                    listAction: base_url + '/transfers/getArticlesWithWithoutProject'
                },
                toolbar: {
                    items: [{
                        cssClass: 'buscador',
                        text: search_ar
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
                table_container_article.jtable('load', {
                    search: $('#search_article').val(),
                    warehouse_id: c_warehouse_id.val(),
                    items: arr_detail,
                    project_id: c_project_id.val()
                });
            }, false);


            var search_req = getFormSearch('frm-search-requirement', 'search_requirement', 'LoadRecordsButtonRequirement');

            var table_container_requirement = $("#table_container_requirements");

            table_container_requirement.jtable({
                title: "Lista de Requerimientos",
                paging: true,
                sorting: true,
                actions: {
                    listAction: base_url + '/consumptions/getRequirement'
                },
                toolbar: {
                    items: [{
                        cssClass: 'buscador',
                        text: search_req
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
                        title: 'Code',
                        width: '5%'
                    },
                    // issue_date: {
                    //     title: (show_list_) ? 'Fecha Emisión' : 'Fecha',
                    //     listClass: 'text-center'
                    // },
                    project_description: {
                        title: 'Proyecto',
                        width: '30%'
                    },
                    requested_by: {
                        title: 'Solicitado por',
                        list: show_list_
                    },
                    select: {
                        width: '1%',
                        sorting: false,
                        edit: false,
                        create: false,
                        display: function (data) {
                            return '<a href="javascript:void(0)" title="Seleccionar" class="select_req" data-id="' +
                                data.record.id + '"data-code-req="' + data.record.code + '"><i class="fa fa-circle-o fa-1-5x"></i></a>';
                        }
                    }
                },
                recordsLoaded: function (event, data) {
                    $('.select_req').click(function (e) {
                        var id = $(this).attr('data-id');
                        var code_requirement = $(this).attr('data-code-req');
                        console.log(c_project_id.val());
                        c_requirement_id.val(id).removeClass('border-red');
                        c_requirement_code.val(code_requirement).removeClass('border-red');
                        modalRequirements.modal('hide');
                        e.preventDefault();
                    });

                }
            });

            generateSearchForm('frm-search-requirement', 'LoadRecordsButtonRequirement', function () {
                table_container_requirement.jtable('load', {
                    search: $('#search_requirement').val(),
                    project_id: c_project_id.val()
                });
            }, false);


            var search_fro = getFormSearch('frm-search-front', 'search_front', 'LoadRecordsButtonFront');


            var table_container_front = $("#table_container_fronts");

            table_container_front.jtable({
                title: "Lista de Frentes",
                paging: true,
                sorting: true,
                actions: {
                    listAction: base_url + '/consumptions/listFront'
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
                                data.record.id + '"  data-code="' + data.record.code + '" data-description="' + data.record.description + '"><i class="fa fa-circle-o fa-1-5x"></i></a>';
                        }
                    }
                },
                recordsLoaded: function (event, data) {
                    $('.select_fr').click(function (e) {
                        var id = $(this).attr('data-id');
                        var description = $(this).attr('data-description');
                        var code = $(this).attr('data-code');
                        c_front_id.val(id).removeClass('border-red');
                        c_front_code.val(code).removeClass('border-red');
                        c_front_description.val(description).removeClass('border-red');

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
    }

    function Config($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('consumptions', {
                url: '/consumptions',
                templateUrl: base_url + '/templates/consumptions/base.html',
                controller: 'ConsumptionCtrl'
            });

        $urlRouterProvider.otherwise('/');
    }
})
();