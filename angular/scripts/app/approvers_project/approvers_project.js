/**
 * Created by ever-pc on 25/05/2017.
 */
(function () {
    'use strict';
    angular.module('sys.app.approvers_projects')
        .config(Config)
        .controller('ApproverProjectCtrl', ApproverProjectCtrl);

    Config.$inject = ['$stateProvider', '$urlRouterProvider'];
    ApproverProjectCtrl.$inject = ['$scope', '_', 'RESTService', 'AlertFactory'];

    function ApproverProjectCtrl($scope, _, RESTService, AlertFactory)
    {
        moment.locale('es');

        var states_approve = [{
            'id': 0, 'text': 'TODOS'
        }, {
            'id': 1, 'text': 'LB'
        }, {
            'id': 2, 'text': 'PV'
        }, {
            'id': 3, 'text': 'META'
        }];

        var start = moment().startOf('month');
        var end = moment().endOf('month');

        var chk_date_range = $('.chk_date_range');
        chk_date_range.click(function () {
            $('#LoadRecordsButtonAP').click();
        });
        generateCheckBox('.i-checks');

        var modalAP;
        var titleAP;
        var modalUser;
        var ap_user_body;
        var call_m = false;
        var project_states;
        var reqDates = $('#reqDates');
        var ap_id = 0;

        function getDataApproverProject() {
            project_states = $('#a_project_states');
            project_states.empty().change(function () {
                $('#LoadRecordsButtonP').click();
            });
            RESTService.all('approvers_projects/getDataProject', '', function(response) {
                if (!_.isUndefined(response.status) && response.status) {
                    _.each(response.states, function (item) {
                        project_states.append('<option value="' + item.Value + '">' + item.DisplayText + '</option>');
                    });
                    generateSearchApproverProject();
                } else {
                    getDataApproverProject();
                }
            }, function () {
                getDataApproverProject();
            });
        }

        function overModals() {
            if (!call_m) {
                modalAP = $("#modalAP");
                titleAP = $('#titleAP');
                modalUser = $("#modalUser");
                ap_user_body = $("#ap_user_body");

                modalUser.on('hidden.bs.modal', function (e) {
                    modalAP.attr('style', 'display:block;');
                    $('#search_user').val('');
                    $('#LoadRecordsButtonUser').click();
                });
                modalUser.on('show.bs.modal', function (e) {
                    $('#LoadRecordsButtonUser').click();
                    modalAP.attr('style', 'display:block; z-index:2030 !important');
                });
                callModals();
            }
        }

        var showDate = function (from, to) {
            start = from;
            end = to;
            reqDates.find('span').html(from.format('MMM D, YYYY') + ' - ' + to.format('MMM D, YYYY'));
            if (chk_date_range.prop('checked')) {
                $('#LoadRecordsButtonAP').click();
            }
        };
        generateDateRangePicker(reqDates, start, end, showDate);
        showDate(start, end);

        $scope.openUser = function () {
            modalUser.modal('show');
        };

        $scope.saveAP = function () {
            var user_ = [], states_ = [];
            _.each(ap_user_body.find('tr'), function (item) {
                item = $(item);
                user_.push(item.attr('data-code'));
                states_.push(item.find('select').val());
            });
            var params = {
                'user': user_,
                'states': states_
            };
            RESTService.updated('approvers_projects/save', ap_id, params, function (response) {
                if (!_.isUndefined(response.status) && response.status) {
                    modalAP.modal('hide');
                    $scope.showAlert('', 'Los aprobadores se guardaron correctamente', 'success');
                } else {
                    $scope.showAlert('', response.message, 'error');
                }
            });
        };

        function addUserToAP(code, username, name, approve) {
            if ($('#tr_ap_' + code).length > 0) {
                $scope.showAlert('', 'Ya se asignó este usuario', 'warning');
                return false;
            }
            var tr = $('<tr id="tr_ap_' + code + '" data-code="' + code + '"></tr>');
            var td1 = $('<td>' + username + '</td>');
            var td2 = $('<td>' + name + '</td>');
            var select_ = $('<select class="form-control input-sm"></select>');
            _.each(states_approve, function (item) {
                var selected_ = (approve === item.id) ? 'selected' : '';
                select_.append('<option value="'+item.id+'" '+selected_+'>'+item.text+'</option>');
            });
            var td3 = $('<td></td>');
            td3.append(select_);
            var td4 = $('<td class="text-center"></td>');
            var btn = $('<button class="btn btn-danger btn-xs delAP" type="button">' +
                '<span class="fa fa-trash"></span></button>');
            td4.append(btn);
            tr.append(td1).append(td2).append(td3).append(td4);
            ap_user_body.append(tr);

            modalUser.modal('hide');

            $('.delAP').click(function (e) {
                var tr_ = $(this).closest('tr');
                AlertFactory.confirm({
                    title: '',
                    message: '¿Está seguro que desea quitar este usuario?',
                    confirm: 'Si',
                    cancel: 'No'
                }, function () {
                    tr_.remove();
                });
                e.preventDefault();
            });
        }

        function findProject(id, title) {
            overModals();
            RESTService.get('approvers_projects/project', id, function (response) {
                if (!_.isUndefined(response.status) && response.status) {
                    var data = response.data;
                    titleAP.html('Proyecto: '+title);
                    ap_user_body.empty();
                    _.each(data, function (item) {
                        addUserToAP(item.code, item.user, item.name, parseInt(item.approve));
                    });
                    modalAP.modal('show');
                } else {
                    $scope.showAlert('', response.message, 'error');
                }
            });
        }

        var search = getFormSearch('frm-search-ap', 'search_ap', 'LoadRecordsButtonAP');

        var states = '<select id="a_project_states" class="search_input"></select>';

        var table_container_p = $("#table_container_ap");

        table_container_p.jtable({
            title: "Lista de Proyectos",
            paging: true,
            sorting: true,
            actions: {
                listAction: base_url + '/approvers_projects/list'
            },
            toolbar: {
                items: [{
                    cssClass: 'buscador',
                    text: states
                }, {
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
                    title: 'Código',
                    listClass: 'text-center',
                    width: '2%'
                },
                description: {
                    title: 'Descripción'
                },
                state: {
                    title: 'Estado',
                    sorting: false,
                    width: '3%',
                    list: show_list_
                },
                sub_state: {
                    title: 'Progreso',
                    sorting: false,
                    width: '3%',
                    list: show_list_
                },
                client_desc: {
                    title: 'Cliente',
                    sorting: false,
                    width: '7%',
                    list: show_list_
                },
                created_date: {
                    title: 'F.Registro',
                    listClass: 'text-center',
                    sorting: false,
                    width: '1%'
                },
                edit: {
                    width: '1%',
                    sorting: false,
                    edit: false,
                    create: false,
                    listClass: 'text-center',
                    display: function (data) {
                        return '<a href="javascript:void(0)" title="Editar" class="edit_p" data-code="' +
                            data.record.id + '" data-title="' + data.record.description + '"><i class="' +
                            'fa fa-orange fa-users fa-1-5x"></i></a>';
                    }
                }
            },
            recordsLoaded: function (event, data) {
                $('.edit_p').click(function (e) {
                    var id = $(this).attr('data-code');
                    var title = $(this).attr('data-title');
                    ap_id = id;
                    findProject(id, title);
                    e.preventDefault();
                });
            }
        });
        getDataApproverProject();

        function generateSearchApproverProject() {
            generateSearchForm('frm-search-ap', 'LoadRecordsButtonAP', function () {
                table_container_p.jtable('load', {
                    search: $('#search_ap').val(),
                    check: (chk_date_range.prop('checked')),
                    from: start.format('YYYY-MM-DD'),
                    to: end.format('YYYY-MM-DD'),
                    state: project_states.val(),
                    sub_state: true
                });
            }, true);
        }

        function callModals() {
            call_m = true;

            var search_u = getFormSearch('frm-search-user', 'search_user', 'LoadRecordsButtonUser');

            var table_container_u = $("#table_container_user");

            table_container_u.jtable({
                title: "Lista de Usuarios",
                paging: true,
                sorting: true,
                actions: {
                    listAction: base_url + '/warehouses/listUser'
                },
                toolbar: {
                    items: [{
                        cssClass: 'buscador',
                        text: search_u
                    }]
                },
                fields: {
                    id: {
                        key: true,
                        create: false,
                        edit: false,
                        list: false
                    },
                    username: {
                        title: 'Usuario'
                    },
                    name: {
                        title: 'Nombre'
                    },
                    select: {
                        width: '1%',
                        sorting: false,
                        edit: false,
                        create: false,
                        listClass: 'text-center',
                        display: function (data) {
                            return '<a href="javascript:void(0)" title="Seleccionar" class="select_u_ap" data-code="' +
                                data.record.id + '" data-user="' + data.record.username + '"data-name="' + data.record.name +
                                '" ><i class="fa fa-' + icon_select + ' fa-1-5x"></i></a>';
                        }
                    }
                },
                recordsLoaded: function (event, data) {
                    $('.select_u_ap').click(function (e) {
                        var code = $(this).attr('data-code');
                        var username = $(this).attr('data-user');
                        var name = $(this).attr('data-name');
                        addUserToAP(code, username, name, 0);
                        e.preventDefault();
                    });
                }
            });
            generateSearchForm('frm-search-user', 'LoadRecordsButtonUser', function () {
                table_container_u.jtable('load', {
                    search: $('#search_user').val()
                });
            }, false);
        }
    }

    function Config($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('approvers_projects', {
                url: '/approvers_projects',
                templateUrl: base_url + '/templates/approvers_projects/base.html',
                controller: 'ApproverProjectCtrl'
            });

        $urlRouterProvider.otherwise('/');
    }
})
();