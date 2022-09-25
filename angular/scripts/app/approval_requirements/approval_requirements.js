/**
 * Created by JAIR on 4/19/2017.
 */
(function () {
    'use strict';
    angular.module('sys.app.approval_requirements')
        .config(Config)
        .controller('ApprovalRequirementCtrl', ApprovalRequirementCtrl);

    Config.$inject = ['$stateProvider', '$urlRouterProvider'];
    ApprovalRequirementCtrl.$inject = ['$scope', '_', 'RESTService', 'AlertFactory'];

    function ApprovalRequirementCtrl($scope, _, RESTService, AlertFactory) {
        moment.locale('es');

        var start = moment().startOf('month');
        var end = moment().endOf('month');

        var chk_date_range = $('#chk_date_range');
        chk_date_range.click(function () {
            $('#LoadRecordsButtonR').click();
        });

        generateCheckBox('.i-checks');

        var modalRApproval;
        var btnApproveReq;
        var btnRejectReq;
        var reqDates = $('#reqDates');

        var r_id = '';
        var r_code;
        var r_date_register;
        var r_date_required;
        var r_project_code;
        var r_project_description;
        var r_state;
        var r_requested_by;
        var r_approved_by;
        var r_observation;

        var t_body_requirement;
        var cont_detail = 1;

        function cleanApprovalRequirement() {
            cleanRequired();
            r_id = '';
            r_code.val('');
            r_date_register.val('');
            r_date_required.val('');
            r_project_code.val('');
            r_project_description.val('');
            r_state.val('');
            r_requested_by.val('');
            r_approved_by.val('');
            r_observation.val('');
            cont_detail = 1;
            t_body_requirement.empty();
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

        var call_m = false;

        function overModals() {
            if (!call_m) {
                modalRApproval = $('#modalRApproval');
                btnApproveReq = $('#btn_approve_req');
                btnRejectReq = $('#btn_reject_req');

                r_code = $('#r_code');
                r_date_register = $('#r_date_register');
                r_date_required = $('#r_date_required');
                r_project_code = $('#r_project_code');
                r_project_description = $('#r_project_description');
                r_state = $('#r_state');
                r_requested_by = $('#r_requested_by');
                r_approved_by = $('#r_approved_by');
                r_observation = $('#r_observation');

                t_body_requirement = $('#t_body_requirement');

                modalRApproval.on('hidden.bs.modal', function (e) {
                    cleanApprovalRequirement();
                });

                call_m = true;
            }
        }

        $scope.approveRequirement = function () {
            AlertFactory.confirm({
                title: '',
                message: '¿Está seguro que desea aprobar el requerimiento?',
                confirm: 'Si',
                cancel: 'No'
            }, function() {
                RESTService.updated('approval_requirements/approveRequirement', r_id, {}, function (response) {
                    if (!_.isUndefined(response.status) && response.status) {
                        AlertFactory.textType({
                            title: '',
                            message: 'El requerimiento se aprobó correctamente.',
                            type: 'success'
                        });
                        modalRApproval.modal('hide');
                        $('#LoadRecordsButtonR').click();
                    } else {
                        AlertFactory.textType({
                            title: '',
                            message: 'Hubo un error al aprobar el requerimiento. Intente nuevamente.',
                            type: 'error'
                        });
                    }
                });
            });
        };

        $scope.rejectRequirement = function () {
            AlertFactory.confirm({
                title: '',
                message: '¿Está seguro que desea rechazar el requerimiento?',
                confirm: 'Si',
                cancel: 'No'
            }, function() {
                RESTService.updated('approval_requirements/rejectRequirement', r_id, {}, function (response) {
                    if (!_.isUndefined(response.status) && response.status) {
                        AlertFactory.textType({
                            title: '',
                            message: 'El requerimiento se rechazó correctamente.',
                            type: 'success'
                        });
                        modalRApproval.modal('hide');
                        $('#LoadRecordsButtonR').click();
                    } else {
                        AlertFactory.textType({
                            title: '',
                            message: 'Hubo un error al rechazar el requerimiento. Intente nuevamente.',
                            type: 'error'
                        });
                    }
                });
            });
        };

        function findRequirement(id) {
            overModals();
            RESTService.get('approval_requirements/find', id, function (response) {
                if (!_.isUndefined(response.status) && response.status) {
                    var data_r = response.data;
                    r_id = data_r.id;
                    r_code.val(data_r.code);
                    r_date_register.val(data_r.date_register);
                    r_date_required.val(data_r.date_required);
                    r_project_code.val(data_r.project_code);
                    r_project_description.val(data_r.project_description);
                    r_state.val(data_r.state);
                    r_requested_by.val(data_r.requested_by);
                    r_approved_by.val(data_r.approved_by);
                    r_observation.val(data_r.observation);
                    _.each(data_r.detail, function (item) {
                        generateDetailApprovalRequirement(item);
                    });
                    modalRApproval.modal('show');
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

        var table_container_r = $("#table_container_ar");

        table_container_r.jtable({
            title: "Lista de Requerimientos por Aprobar",
            paging: true,
            sorting: true,
            actions: {
                listAction: base_url + '/approval_requirements/list'
            },
            toolbar: {
                items: [{
                    cssClass: 'buscador',
                    text: search
                }, {
                    cssClass: 'btn-primary',
                    text: '<i class="fa fa-file-excel-o"></i> Exportar a Excel',
                    click: function () {
                        var data_excel = {
                            search: $('#search_r').val(),
                            check: (chk_date_range.prop('checked')),
                            from: start.format('YYYY-MM-DD'),
                            to: end.format('YYYY-MM-DD'),
                            state: 2,
                            supervisor: true
                        };
                        $scope.openDoc('approval_requirements/excel', data_excel);
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
                    width: '30%'
                },
                requested_by: {
                    title: 'Solicitado por',
                    list: show_list_
                },
                edit: {
                    width: '1%',
                    sorting: false,
                    edit: false,
                    create: false,
                    display: function (data) {
                        return '<a href="javascript:void(0)" title="Ver" class="edit_r" data-code="' +
                            data.record.id + '"><i class="fa fa-edit fa-1-5x"></i></a>';
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

        generateSearchForm('frm-search-r', 'LoadRecordsButtonR', function () {
            table_container_r.jtable('load', {
                search: $('#search_r').val(),
                check: (chk_date_range.prop('checked')),
                from: start.format('YYYY-MM-DD'),
                to: end.format('YYYY-MM-DD'),
                state: 2,
                supervisor: true
            });
        }, true);

        function generateDetailApprovalRequirement(row) {
            var tr = $('<tr></tr>');
            var td1 = $('<td class="text-center">' + cont_detail + '</td>');
            var td2 = $('<td class="text-center">' + row.matrix + '</td>');
            var td3 = $('<td>' + row.product + '</td>');
            var td4 = $('<td>' + row.um + '</td>');
            var td5 = $('<td class="text-right">' + (parseFloat(row.quantity_requested)).toFixed(2) + '</td>');
            var td6 = $('<td class="text-right">' + row.quantity_served + '</td>');
            var row_price = (_.isNull(row.price)) ? '.00' : row.price;
            var td7 = $('<td class="text-right">' + row_price + '</td>');
            var row_balance = (_.isNull(row.project_balance)) ? '' : row.project_balance;
            var td8 = $('<td class="text-right">' + row_balance + '</td>');
            tr.append(td1).append(td2).append(td3).append(td4).append(td5).append(td6).append(td7).append(td8);

            t_body_requirement.append(tr);
            cont_detail++;
        }
    }

    function Config($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('approval_requirements', {
                url: '/approval_requirements',
                templateUrl: base_url + '/templates/approval_requirements/base.html',
                controller: 'ApprovalRequirementCtrl'
            });

        $urlRouterProvider.otherwise('/');
    }
})
();