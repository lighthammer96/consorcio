/**
 * Created by JAIR on 4/17/2017.
 */
(function () {
    'use strict';
    angular.module('sys.app.requirements')
        .config(Config)
        .controller('RequirementCtrl', RequirementCtrl);

    Config.$inject = ['$stateProvider', '$urlRouterProvider'];
    RequirementCtrl.$inject = ['$scope', '_', 'RESTService', 'AlertFactory'];

    function RequirementCtrl($scope, _, RESTService, AlertFactory) {
        moment.locale('es');

        var start = moment().startOf('month');
        var end = moment().endOf('month');

        var chk_date_range = $('#chk_date_range');
        chk_date_range.click(function () {
            $('#LoadRecordsButtonR').click();
        });

        var modalR;
        var modalP;
        var modalPr;
        var titleReq;
        var btnApprovalReq;
        var btnCancelReq;
        var reqDates = $('#reqDates');
        var req_states;
        var req_states_line;
        var req_user_default;

        var r_id;
        var r_code;
        var r_date_register;
        var r_date_required;
        var r_project_id;
        var r_project_code;
        var r_project_description;
        var r_state;
        var r_requested_by;
        var r_approved_by;
        var r_observation;

        var t_body_requirement;
        var load_matrix;
        var load_articles;
        var show_table;
        var project_default = '';

        generateCheckBox('.i-checks');

        var date_now = moment.tz('America/Lima').format('DD/MM/YYYY');

        function cleanRequirement() {
            cleanRequired();
            titleReq.html('');
            r_id.val('');
            r_code.val('');
            r_date_register.val(date_now);
            r_date_required.val('');
            r_project_id.val('');
            r_project_code.val('');
            r_project_description.val('');
            r_state.val('Registrado');
            r_requested_by.val(req_user_default);
            r_approved_by.val('');
            r_observation.val('');
            load_matrix.prop('disabled', true);
            load_articles.prop('disabled', true);
            project_default = '';
            cont_detail = 1;
            arr_detail = [];
            t_body_requirement.empty();
            validDetail();
            btnApprovalReq.addClass('hide');
            btnCancelReq.addClass('hide');
            $('.showReq').removeClass('hide');
            $('.formReq').prop('disabled', false);
        }

        function getDataRequirements() {
            req_states = $('#req_states');
            req_states.html('').change(function () {
                $('#LoadRecordsButtonR').click();
            });
            req_states_line = $('#req_states_line');
            req_states_line.html('').change(function () {
                $('#LoadRecordsButtonR').click();
            });
            RESTService.all('requirements/data_form', '', function (response) {
                if (!_.isUndefined(response.status) && response.status) {
                    _.each(response.states, function (item) {
                        req_states.append('<option value="' + item.Value + '">' + item.DisplayText + '</option>');
                    });
                    _.each(response.states_line, function (item) {
                        req_states_line.append('<option value="' + item.Value + '">' + item.DisplayText + '</option>');
                    });
                    req_user_default = response.user;
                    generateSearchRequirement();
                }
            }, function () {
                getDataRequirements();
            });
        }

        var showDate = function (from, to) {
            start = from;
            end = to;
            reqDates.find('span').html(from.format('MMM D, YYYY') + ' - ' + to.format('MMM D, YYYY'));
            if (chk_date_range.prop('checked')) {
                $('#LoadRecordsButtonR').click();
            }
        };
        generateDateRangePicker(reqDates, start, end, showDate);
        showDate(start, end);

        function overModals() {
            if (!call_m) {
                modalR = $('#modalR');
                modalP = $('#modalProject');
                modalPr = $('#modalProducts');
                titleReq = $('#title-req');
                btnApprovalReq = $('#btn_approval_req');
                btnCancelReq = $('#btn_cancel_req');

                r_id = $('#r_id');
                r_code = $('#r_code');
                r_date_register = $('#r_date_register');
                r_date_register.val(date_now);
                r_date_required = $('#r_date_required');
                r_project_id = $('#r_project_id');
                r_project_code = $('#r_project_code');
                r_project_description = $('#r_project_description');
                r_state = $('#r_state');
                r_state.val('Registrado');
                r_requested_by = $('#r_requested_by');
                r_requested_by.val(req_user_default);
                r_approved_by = $('#r_approved_by');
                r_observation = $('#r_observation');

                load_matrix = $('#load_matrix');
                load_articles = $('#load_articles');
                t_body_requirement = $('#t_body_requirement');
                show_table = $('#show_table');

                generateDatePicker(r_date_required);

                modalR.on('hidden.bs.modal', function (e) {
                    cleanRequirement();
                });

                modalP.on('hidden.bs.modal', function (e) {
                    $('#search_p').val('');
                    $('#LoadRecordsButtonP').click();
                    modalR.attr('style', 'display:block;');
                });
                modalP.on('show.bs.modal', function (e) {
                    $('#LoadRecordsButtonP').click();
                    modalR.attr('style', 'display:block; z-index:2030 !important');
                });

                modalPr.on('hidden.bs.modal', function (e) {
                    $('#search_pr').val('');
                    $('#LoadRecordsButtonPr').click();
                    modalR.attr('style', 'display:block;');
                });
                modalPr.on('show.bs.modal', function (e) {
                    $('#LoadRecordsButtonPr').click();
                    modalR.attr('style', 'display:block; z-index:2030 !important');
                });

                callModals();
            }
        }

        function newRequirement() {
            overModals();
            modalR.modal('show');
            titleReq.html('Nuevo Requerimiento');
        }

        $scope.saveRequirement = function () {
            var bval = true;
            bval = bval && r_requested_by.required();
            if (bval && r_project_id.val() === '') {
                AlertFactory.showWarning({
                    title: '',
                    message: 'Debe seleccionar el proyecto del requerimiento'
                });
                return false;
            }
            if (bval && t_body_requirement.html() === '') {
                AlertFactory.showWarning({
                    title: '',
                    message: 'Debe seleccionar los articulos del requerimiento o cargar la matriz del proyecto'
                });
                return false;
            }
            if (bval) {
                var articles_id = [];
                var articles_val = [];
                _.each($('.rowCon'), function (item) {
                    var _id = $(item).attr('data-id');
                    articles_id.push(_id);
                    articles_val.push($('#inpRow'+_id).val());
                });
                var params = {
                    'requested_by': r_requested_by.val(),
                    'date_required': r_date_required.val(),
                    'project_id': r_project_id.val(),
                    'observation': r_observation.val(),
                    'articles_id': articles_id.join('-'),
                    'articles_val': articles_val.join('-')
                };
                var requirement_id = (r_id.val() === '') ? 0 : r_id.val();

                RESTService.updated('requirements/saveRequirement', requirement_id, params, function (response) {
                    if (!_.isUndefined(response.status) && response.status) {
                        $scope.showAlert('', 'El requerimiento se guardó correctamente.', 'success');
                        modalR.modal('hide');
                        $('#LoadRecordsButtonR').click();
                    } else {
                        $scope.showAlert('', 'Hubo un error al guardar el requerimiento. Intente nuevamente.', 'error');
                    }
                });
            }
        };

        $scope.loadMatrix = function () {
            if (project_default !== '') {
                callMatrix(project_default);
            }
        };

        $scope.openProject = function () {
            modalP.modal('show');
        };

        $scope.openProducts = function () {
            modalPr.modal('show');
        };

        $scope.sendApproval = function () {
            AlertFactory.confirm({
                title: '',
                message: '¿Está seguro que desea enviar el requerimiento a aprobación?',
                confirm: 'Si',
                cancel: 'No'
            }, function() {
                RESTService.updated('requirements/sendApproval', r_id.val(), {}, function (response) {
                    if (!_.isUndefined(response.status) && response.status) {
                        AlertFactory.textType({
                            title: '',
                            message: 'El requerimiento se envió correctamente.',
                            type: 'success'
                        });
                        modalR.modal('hide');
                        $('#LoadRecordsButtonR').click();
                    } else {
                        AlertFactory.textType({
                            title: '',
                            message: 'Hubo un error al enviar el requerimiento a aprobación. Intente nuevamente.',
                            type: 'error'
                        });
                    }
                });
            });
        };

        $scope.cancelRequirement = function () {
            AlertFactory.confirm({
                title: '',
                message: '¿Está seguro que desea cancelar el requerimiento?',
                confirm: 'Si',
                cancel: 'No'
            }, function() {
                RESTService.updated('requirements/cancelRequirement', r_id.val(), {}, function (response) {
                    if (!_.isUndefined(response.status) && response.status) {
                        AlertFactory.textType({
                            title: '',
                            message: 'El requerimiento se canceló correctamente.',
                            type: 'success'
                        });
                        modalR.modal('hide');
                        $('#LoadRecordsButtonR').click();
                    } else {
                        AlertFactory.textType({
                            title: 'Hubo un error al cancelar el requerimiento',
                            message: response.message,
                            type: 'error'
                        });
                    }
                });
            });
        };

        function findRequirement(id) {
            overModals();
            titleReq.html('Editar Requerimiento');
            RESTService.get('requirements/find', id, function (response) {
                if (!_.isUndefined(response.status) && response.status) {
                    var data_r = response.data;
                    r_id.val(data_r.id);
                    r_code.val(data_r.code);
                    r_date_register.val(data_r.date_register);
                    r_date_required.val(data_r.date_required);
                    r_project_id.val(data_r.project_id);
                    r_project_code.val(data_r.project_code);
                    r_project_description.val(data_r.project_description);
                    r_state.val(data_r.state);
                    r_requested_by.val(data_r.requested_by);
                    r_approved_by.val(data_r.approved_by);
                    r_observation.val(data_r.observation);
                    var state_req = parseInt(data_r.requirement_state_id);
                    if (state_req === 1) {
                        btnApprovalReq.removeClass('hide');
                    } else {
                        if (state_req === 2 || state_req === 3) {
                            btnCancelReq.removeClass('hide');
                        }
                        $('.showReq').addClass('hide');
                        $('.formReq').prop('disabled', true);
                    }
                    _.each(data_r.detail, function (item) {
                        validItemDetail(item);
                    });
                    project_default = data_r.project_id;
                    load_matrix.prop('disabled', false);
                    load_articles.prop('disabled', false);
                    modalR.modal('show');
                } else {
                    AlertFactory.textType({
                        title: '',
                        message: 'Hubo un error al obtener el requerimiento. Intente nuevamente.',
                        type: 'error'
                    });
                }
            });
        }

        var search = getFormSearch('frm-search-r', 'search_r', 'LoadRecordsButtonR');

        var states = '<select id="req_states" class="search_input"></select>';
        var states_line = '<select id="req_states_line" class="search_input"></select>';

        var table_container_r = $("#table_container_r");

        table_container_r.jtable({
            title: "Lista de Requerimientos",
            paging: true,
            sorting: true,
            actions: {
                listAction: base_url + '/requirements/list',
                deleteAction: base_url + '/requirements/delete'
            },
            toolbar: {
                items: [{
                    cssClass: 'buscador',
                    text: states
                }, {
                    cssClass: 'buscador',
                    text: states_line
                }, {
                    cssClass: 'buscador',
                    text: search
                }, {
                    cssClass: 'btn-primary',
                    text: '<i class="fa fa-file-excel-o"></i> Exportar',
                    click: function () {
                        var data_excel = {
                            search: $('#search_r').val(),
                            check: (chk_date_range.prop('checked')),
                            from: start.format('YYYY-MM-DD'),
                            to: end.format('YYYY-MM-DD'),
                            state: req_states.val(),
                            state_line: req_states_line.val()
                        };
                        $scope.openDoc('requirements/excel', data_excel);
                    }
                }, {
                    cssClass: 'btn-success',
                    text: '<i class="fa fa-plus"></i> Nuevo',
                    click: function () {
                        newRequirement();
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
                    title: 'Requerimiento',
                    listClass: 'text-center',
                    width: '5%'
                },
                date_registration: {
                    title: 'F.Registro',
                    listClass: 'text-center',
                    width: '5%'
                },
                date_required: {
                    title: 'F.Requerida',
                    list: show_list_,
                    listClass: 'text-center',
                    width: '5%'
                },
                project_description: {
                    title: 'Proyecto',
                    width: '30%',
                    sorting: false
                },
                requested_by: {
                    title: 'Solicitado por',
                    list: show_list_
                },
                requirement_state_desc: {
                    title: 'Estado',
                    list: show_list_,
                    sorting: false,
                    width: '5%'
                },
                requirement_state_line_desc: {
                    title: 'Estado por Linea',
                    sorting: false,
                    list: show_list_
                },
                edit: {
                    width: '1%',
                    sorting: false,
                    edit: false,
                    create: false,
                    display: function (data) {
                        return '<a data-target="#" title="Editar" class="edit_r" data-code="' +
                            data.record.id + '"><i class="fa fa-pencil-square-o fa-1-5x fa-green"></i></a>';
                    }
                }
            },
            recordsLoaded: function (event, data) {
                $('.edit_r').click(function (e) {
                    var id = $(this).attr('data-code');
                    findRequirement(id);
                    e.preventDefault();
                });
            }
        });
        getDataRequirements();

        function generateSearchRequirement() {
            generateSearchForm('frm-search-r', 'LoadRecordsButtonR', function () {
                table_container_r.jtable('load', {
                    search: $('#search_r').val(),
                    check: (chk_date_range.prop('checked')),
                    from: start.format('YYYY-MM-DD'),
                    to: end.format('YYYY-MM-DD'),
                    state: req_states.val(),
                    state_line: req_states_line.val()
                });
            }, true);
        }

        var call_m = false;

        function callModals() {
            call_m = true;

            var search_p = getFormSearch('frm-search-p', 'search_p', 'LoadRecordsButtonP');

            var table_container_p = $("#table_container_p");

            table_container_p.jtable({
                title: "Lista de Proyectos",
                paging: true,
                sorting: true,
                actions: {
                    listAction: base_url + '/requirements/getProjects'
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
                        r_project_id.val(data_id);
                        r_project_code.val($(this).attr('data-code'));
                        r_project_description.val($(this).attr('data-description'));
                        modalP.modal('hide');
                        $('#search_p').val('');
                        load_matrix.prop('disabled', false);
                        load_articles.prop('disabled', false);
                        if (project_default !== data_id) {
                            cont_detail = 1;
                            arr_detail = [];
                            t_body_requirement.html('');
                            validDetail();
                        }
                        project_default = data_id;
                        e.preventDefault();
                    });
                }
            });

            generateSearchForm('frm-search-p', 'LoadRecordsButtonP', function () {
                table_container_p.jtable('load', {
                    search: $('#search_p').val(),
                    consolidated: true
                });
            }, false);

            var search_pr = getFormSearch('frm-search-pr', 'search_pr', 'LoadRecordsButtonPr');

            var table_container_pr = $("#table_container_pr");

            table_container_pr.jtable({
                title: "Lista de Artículos",
                paging: true,
                sorting: false,
                actions: {
                    listAction: base_url + '/requirements/getArticlesProject'
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
                        create: false,
                        edit: false,
                        list: false
                    },
                    code: {
                        title: 'Código Artículo',
                        width: '2%',
                        listClass: 'text-center'
                    },
                    matrix: {
                        title: 'Matriz',
                        width: '2%',
                        listClass: 'text-center'
                    },
                    product: {
                        title: 'Artículo'
                    },
                    um: {
                        title: 'U.M.',
                        width: '2%'
                    },
                    select: {
                        width: '1%',
                        sorting: false,
                        edit: false,
                        create: false,
                        listClass: 'text-center',
                        display: function (data) {
                            return '<a href="javascript:void(0)" title="Seleccionar" class="select_pr" data-id="' +
                                data.record.id + '"><i class="fa fa-' + icon_select + ' fa-1-5x"></i></a>';
                        }
                    }
                },
                recordsLoaded: function (event, data) {
                    $('.select_pr').click(function (e) {
                        var pr_id = $(this).attr('data-id');
                        var info = _.find(data.records, function(item) {
                            return item.id === parseInt(pr_id);
                        });
                        if (info) {
                            validItemDetail(info);
                        }
                        modalPr.modal('hide');
                        $('#search_pr').val('');
                        e.preventDefault();
                    });
                }
            });

            generateSearchForm('frm-search-pr', 'LoadRecordsButtonPr', function () {
                table_container_pr.jtable('load', {
                    search: $('#search_pr').val(),
                    project_id: project_default,
                    items: arr_detail
                });
            }, false);
        }

        function callMatrix(project_id) {
            RESTService.get('requirements/getMatrix', project_id, function (response) {
                if (!_.isUndefined(response.status) && response.status) {
                    _.each(response.data, function (item) {
                        validItemDetail(item);
                    });
                } else {
                    AlertFactory.textType({
                        title: '',
                        message: 'Hubo un error al obtener la matriz. Intente nuevamente.',
                        type: 'error'
                    });
                }
            });
        }

        var cont_detail = 1;
        var arr_detail = [];

        function validItemDetail(row) {
            if (!_.contains(arr_detail, row.id)) {
                generateDetail(row);
                arr_detail.push(row.id);
            }
        }

        function generateDetail(row) {
            var tr = $('<tr class="rowCon" data-id="'+row.id+'"></tr>');
            var td1 = $('<td class="text-center td_numbers">' + cont_detail + '</td>');
            var td2 = $('<td class="text-center">' + row.matrix + '</td>');
            var td3 = $('<td>' + row.product + '</td>');
            var td4 = $('<td>' + row.um + '</td>');
            var td5 = $('<td class="text-right">' + (parseFloat(row.quantity_requested)).toFixed(2) + '</td>');
            var inp = $('<span>' + row.quantity_served + '<span/>');
            if (!r_observation.prop('disabled')) {
                inp = $('<input style="width:75px" type="text" class="text-right inpRow" id="inpRow'+row.id+'" data-max="'+
                    row.quantity_requested+'" onclick="this.select()" onkeypress="return validDecimals(event, this, 3)" ' +
                    'onblur="return roundDecimals(this, 2)" value="' + row.quantity_served + '" />');
            }
            var td6 = $('<td class="text-right"></td>');
            td6.append(inp);
            var row_price = (_.isNull(row.price)) ? '.00' : row.price;
            var td7 = $('<td class="text-right">' + row_price + '</td>');
            var row_balance = (_.isNull(row.project_balance)) ? '' : row.project_balance;
            var td8 = $('<td class="text-right">' + row_balance + '</td>');
            var td9 = $('<td class="text-center showReq"><a data-target="#" title="Eliminar" class="deleteRow"><i class="fa fa-trash fa-1-5x fa-red"></i></a></td>');
            tr.append(td1).append(td2).append(td3).append(td4).append(td5).append(td6).append(td7).append(td8);

            if (!r_observation.prop('disabled')) {
                tr.append(td9);
            }
            t_body_requirement.append(tr);
            validDetail();
            cont_detail++;

            $('.inpRow').blur(function () {
                var that = $(this);
                var maxRow = that.attr('data-max');
                if (that.val() > parseFloat(maxRow) || that.val() === '') {
                    AlertFactory.showWarning({
                        title: 'Debe ingresar una cantidad menor o igual a la cantidad pedida',
                        message: ''
                    }, function () {
                        that.select();
                    });
                }
            });

            $('.deleteRow').click(function (e) {
                var tr_ = $(this).closest('tr');
                AlertFactory.confirm({
                    title: '',
                    message: '¿Está seguro que desea quitar esta artículo?',
                    confirm: 'Si',
                    cancel: 'No'
                }, function(){
                    var tr_id = tr_.attr('data-id');
                    tr_.remove();
                    arr_detail = _.reject(arr_detail, function(item) {
                        return item === parseInt(tr_id)
                    });
                    orderRows();
                    validDetail();
                });
                e.preventDefault();
            });
        }

        function orderRows() {
            cont_detail = 1;
            _.each($('.td_numbers'), function (item) {
                $(item).html(cont_detail);
                cont_detail++;
            });
        }

        function validDetail() {
            show_table.addClass('hide');
            if (t_body_requirement.html() !== '') {
                show_table.removeClass('hide');
            }
        }
    }

    function Config($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('requirements', {
                url: '/requirements',
                templateUrl: base_url + '/templates/requirements/base.html',
                controller: 'RequirementCtrl'
            });

        $urlRouterProvider.otherwise('/');
    }
})
();