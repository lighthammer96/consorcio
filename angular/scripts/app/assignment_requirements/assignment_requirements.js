/**
 * Created by JAIR on 4/24/2017.
 */
(function () {
    'use strict';
    angular.module('sys.app.assignment_requirements')
        .config(Config)
        .controller('AssignmentRequirementCtrl', AssignmentRequirementCtrl);

    Config.$inject = ['$stateProvider', '$urlRouterProvider'];
    AssignmentRequirementCtrl.$inject = ['$scope', '_', 'RESTService', 'AlertFactory'];

    function AssignmentRequirementCtrl ($scope, _, RESTService, AlertFactory)
    {
        moment.locale('es');

        var start = moment().startOf('month');
        var end = moment().endOf('month');

        var chk_date_range = $('#chk_date_range');
        chk_date_range.click(function () {
            $('#LoadRecordsButtonR').click();
        });

        generateCheckBox('.i-checks');

        var modalR;
        var reqDates = $('#reqDates');

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

                callModals();

                modalR = $('#modalR');

                modalR.on('show.bs.modal', function (e) {
                    $('#LoadRecordsButtonC').click();
                });

                call_m = true;
            }
        }

        var search = getFormSearch('frm-search-r', 'search_r', 'LoadRecordsButtonR');

        var states = '<select class="search_input" id="assignment_req_option">'+
            '<option value="">Todos</option>'+
            '<option value="1">Asignados</option>'+
            '<option value="2">Sin Asignar</option>'+
            '</select>';

        var table_container_r = $("#table_container_aa");

        table_container_r.jtable({
            title: "Lista de Requerimientos por Asignar",
            paging: true,
            sorting: true,
            selecting: true,
            multiselect: true,
            selectingCheckboxes: true,
            selectOnRowClick: false,
            actions: {
                listAction: base_url + '/assignment_requirements/list'
            },
            toolbar: {
                items: [{
                    cssClass: 'buscador',
                    text: states
                },{
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
                code: {
                    title: 'Requerimiento',
                    listClass: 'text-center',
                    width: '5%'
                },
                date_registration: {
                    title: 'F.Registro',
                    list: show_list_,
                    listClass: 'text-center',
                    width: '3%'
                },
                date_required: {
                    title: 'F.Requerida',
                    list: show_list_,
                    listClass: 'text-center',
                    width: '3%'
                },
                project_description: {
                    title: 'Proyecto',
                    width: '24%',
                    sorting: false
                },
                requested_by: {
                    title: 'Solicitado por',
                    list: show_list_
                },
                buyer_desc: {
                    title: 'Comprador',
                    sorting: false
                }
            },
            recordsLoaded: function(event, data) {
                generateCheckBox('.jtable-selecting-column input');
            }
        });

        var assignment_req = $('#assignment_req_option');

        generateSearchForm('frm-search-r', 'LoadRecordsButtonR', function(){
            table_container_r.jtable('load', {
                search: $('#search_r').val(),
                check: (chk_date_range.prop('checked')),
                from: start.format('YYYY-MM-DD'),
                to: end.format('YYYY-MM-DD'),
                state: 3,
                show_buyer: true,
                assignment_req: assignment_req.val()
            });
        }, true);

        assignment_req.change(function () {
            $('#LoadRecordsButtonR').click();
        });

        var row_list;

        $scope.assignBuyer = function () {
            var $selectedRows = table_container_r.jtable('selectedRows');

            if ($selectedRows.length > 0) {
                row_list = [];
                $selectedRows.each(function () {
                    var record = $(this).data('record');
                    row_list.push(record.id);
                });
                console.log(row_list);
                overModals();
                modalR.modal('show');
            } else {
                AlertFactory.textType({
                    title: '',
                    message: 'Debe seleccionar los requerimientos a asignar.',
                    type: 'warning'
                });
                return false;
            }
        };

        $scope.rejectBuyer = function () {
            var $selectedRows = table_container_r.jtable('selectedRows');

            if ($selectedRows.length > 0) {
                row_list = [];
                $selectedRows.each(function () {
                    var record = $(this).data('record');
                    row_list.push(record.id);
                });
                console.log(row_list);
                AlertFactory.confirm({
                    title: '',
                    message: '¿Está seguro que desea desasignar el comprador a los requerimientos seleccionados?',
                    confirm: 'Si',
                    cancel: 'No',
                    closeOnConfirm: false,
                    showLoaderOnConfirm: true
                }, function(){
                    var params = {
                        requirements: row_list
                    };
                    RESTService.updated('assignment_requirements/reject', 0, params, function (response) {
                        if (!_.isUndefined(response.status) && response.status) {
                            AlertFactory.textType({
                                title: '',
                                message: 'Se deasignó el comprador.',
                                type: 'success'
                            });
                            clearRowsAR();
                        } else {
                            AlertFactory.textType({
                                title: '',
                                message: 'Hubo un error al desasignar los requerimientos. Intente nuevamente.',
                                type: 'error'
                            });
                        }
                    });
                });
            } else {
                AlertFactory.textType({
                    title: '',
                    message: 'Debe seleccionar los requerimientos a desasignar.',
                    type: 'warning'
                });
                return false;
            }
        };

        function callModals()
        {
            var search2 = getFormSearch('frm-search-c', 'search_c', 'LoadRecordsButtonC');

            var table_container_c = $("#table_container_c");

            table_container_c.jtable({
                title: "Lista de Compradores",
                paging: true,
                sorting: true,
                actions: {
                    listAction: base_url + '/assignment_requirements/listBuyer'
                },
                toolbar: {
                    items: [{
                        cssClass: 'buscador',
                        text: search2
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
                        listClass: 'text-center',
                        width: '4%'
                    },
                    description: {
                        title: 'Descripción'
                    },
                    username: {
                        title: 'Usuario',
                        width: '4%'
                    },
                    edit: {
                        width: '1%',
                        listClass: 'text-center',
                        sorting: false,
                        edit: false,
                        create: false,
                        display: function (data) {
                            return '<a href="javascript:void(0)" title="Asignar" class="select_c" data-code="'+
                                data.record.id+'"><i class="fa fa-' + icon_select + ' fa-1-5x"></i></a>';
                        }
                    }
                },
                recordsLoaded: function(event, data) {
                    $('.select_c').click(function(e){
                        var buyer_id = $(this).attr('data-code');
                        AlertFactory.confirm({
                            title: '',
                            message: '¿Está seguro que desea asignar el comprador a los requerimientos seleccionados?',
                            confirm: 'Si',
                            cancel: 'No',
                            closeOnConfirm: false,
                            showLoaderOnConfirm: true
                        }, function(){
                            var params = {
                                buyer: buyer_id,
                                requirements: row_list
                            };
                            RESTService.updated('assignment_requirements/assign', 0, params, function (response) {
                                if (!_.isUndefined(response.status) && response.status) {
                                    AlertFactory.textType({
                                        title: '',
                                        message: 'Se asignó el comprador.',
                                        type: 'success'
                                    });
                                    modalR.modal('hide');
                                    clearRowsAR();
                                } else {
                                    AlertFactory.textType({
                                        title: '',
                                        message: 'Hubo un error al asignar los requerimientos. Intente nuevamente.',
                                        type: 'error'
                                    });
                                }
                            });
                        });
                        e.preventDefault();
                    });
                }
            });

            generateSearchForm('frm-search-c', 'LoadRecordsButtonC', function(){
                table_container_c.jtable('load', {
                    search: $('#search_c').val()
                });
            }, false);
        }

        function clearRowsAR() {
            $('.jtable-column-header-selecting input').prop('checked', false).iCheck('update');
            $('.jtable-row-selected').removeClass('jtable-row-selected');
            $('#LoadRecordsButtonR').click();
        }
    }

    function Config($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('assignment_requirements', {
                url: '/assignment_requirements',
                templateUrl: base_url + '/templates/assignment_requirements/base.html',
                controller: 'AssignmentRequirementCtrl'
            });

        $urlRouterProvider.otherwise('/');
    }
})
();