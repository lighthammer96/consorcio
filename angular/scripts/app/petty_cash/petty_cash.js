/**
 * Created by ever-pc on 28/06/2017.
 */
(function () {
    'use strict';
    angular.module('sys.app.petty_cash')
        .config(Config)
        .controller('PettyCashCtrl', PettyCashCtrl);

    Config.$inject = ['$stateProvider', '$urlRouterProvider'];
    PettyCashCtrl.$inject = ['$scope', '_', 'RESTService', 'AlertFactory'];

    function PettyCashCtrl($scope, _, RESTService, AlertFactory)
    {
        var modalPC;
        var modalUser;
        var titlePca;
        var pc_user_body;
        var pc_id;
        var pc_code;
        var pc_description;
        var pc_liable_id;
        var pc_liable_name;
        var pc_liable_username;
        var pc_is_vale;
        var pc_vale_text;

        function chkVale() {
            var txt = (pc_is_vale.prop('checked')) ? 'SI' : 'NO';
            pc_vale_text.html(txt);
        }

        function overModals() {
            if (!call_m) {
                modalPC = $('#modalPC');
                titlePca = $('#title-pc');
                modalUser = $('#modalUser');
                pc_user_body = $("#pc_user_body");

                pc_id = $("#pc_id");
                pc_code = $("#pc_code");
                pc_description = $('#pc_description');
                pc_liable_id = $("#pc_liable_id");
                pc_liable_name = $("#pc_liable_name");
                pc_liable_username = $("#pc_liable_username");
                pc_is_vale = $('#pc_is_vale');
                pc_is_vale.click(function () {
                    chkVale();
                });
                generateCheckBox(pc_is_vale);
                pc_vale_text = $('#pc_vale_text');

                modalUser.on('hidden.bs.modal', function (e) {
                    modalPC.attr('style', 'display:block;');
                });
                modalUser.on('show.bs.modal', function (e) {
                    modalPC.attr('style', 'display:block; z-index:2030 !important');
                });

                modalPC.on('hidden.bs.modal', function (e) {
                    cleanPettyCash();
                });
                callModals();
            }
        }

        function cleanPettyCash() {
            cleanRequired();
            titlePca.empty();
            pc_id.val('');
            pc_description.val('');
            pc_code.val('');
            pc_liable_id.val('');
            pc_liable_name.val('');
            pc_liable_username.val('');
            pc_user_body.empty();
            pc_is_vale.prop('checked', false).iCheck('update');
            pc_vale_text.html('NO');
            activeTab('general');
        }

        function newPettyCash() {
            overModals();
            modalPC.modal('show');
            titlePca.html('Nueva Caja Chica');
        }

        var state_click = 0;

        $scope.openUser = function () {
            $('#LoadRecordsButtonUser').click();
            modalUser.modal('show');
            state_click = 1;
        };

        $scope.openLiable = function () {
            $('#LoadRecordsButtonUser').click();
            modalUser.modal('show');
            state_click = 0;
        };

        function findPettyCash(id) {
            overModals();
            titlePca.html('Editar Caja Chica');
            RESTService.get('petty_cash/find', id, function (response) {
                if (!_.isUndefined(response.status) && response.status) {
                    var data_p = response.data;
                    pc_id.val(data_p.id);
                    pc_description.val(data_p.description);
                    pc_code.val(data_p.code);
                    pc_liable_id.val(data_p.liable_id);
                    pc_liable_username.val(data_p.liable_username);
                    pc_liable_name.val(data_p.liable_name);
                    var chk_vale = (parseInt(data_p.is_vale) === 1);
                    pc_is_vale.prop('checked', chk_vale).iCheck('update');
                    chkVale();
                    modalPC.modal('show');
                    _.each(data_p.users, function (b) {
                        addToPettyCash(b.id, b.username, b.name);
                    });
                } else {
                    $scope.showAlert('', response.message, 'warning');
                }
            });
        }

        $scope.savePettyCash = function () {
            var bval = true;
            bval = bval && pc_code.required();
            bval = bval && pc_description.required();
            bval = bval && pc_liable_username.required();
            bval = bval && pc_liable_name.required();
            if (bval && pc_user_body.html() === '') {
                AlertFactory.showWarning({
                    title: '',
                    message: 'Debe agregar mínimo 1 usuario a la caja chica'
                });
                activeTab('user');
                return false;
            }
            if (bval) {
                var users = [];
                $.each($('.pc_user'), function (idx, item) {
                    users[idx] = $(item).val();
                });
                users = users.join(',');

                var params = {
                    'id': pc_id.val(),
                    'code': pc_code.val(),
                    'liable_id': pc_liable_id.val(),
                    'description': pc_description.val(),
                    'users': users,
                    'is_vale': (pc_is_vale.prop('checked')) ? 1 : 0,
                };
                var id = (pc_id.val() === '') ? 0 : pc_id.val();

                RESTService.updated('petty_cash/savePettyCash', id, params, function (response) {
                    if (!_.isUndefined(response.status) && response.status) {
                        AlertFactory.textType({
                            title: '',
                            message: 'La caja Chica  se guardó correctamente.',
                            type: 'success'
                        });
                        modalPC.modal('hide');
                        LoadRecordsButtonPettyCash.click();
                    } else {
                        var msg_ = (_.isUndefined(response.message)) ?
                            'Hubo un error al guardar la caja chica. Intente nuevamente.' : response.message;
                        AlertFactory.textType({
                            title: '',
                            message: msg_,
                            type: 'error'
                        });
                    }
                });
            }
        };

        function addToPettyCash(code, username, name) {
            if ($('#tr_b_' + code).length > 0) {
                AlertFactory.showWarning({
                    title: '',
                    message: 'Ya se asignó este Usuario'
                });
                return false;
            }
            var tr = $('<tr id="tr_b_' + code + '"></tr>');
            var td1 = $('<td>' + username + '</td>');
            var tdu = $('<td>' + name + '</td>');
            var inp = $('<input type="hidden" class="pc_user" value="' + code + '" />');
            td1.append(inp);
            var td2 = $('<td class="text-center"></td>');
            var btn = $('<button class="btn btn-danger btn-xs delPettyCash" data-id="' + code + '" type="button"><span class="fa fa-trash"></span></button>');
            td2.append(btn);
            tr.append(td1).append(tdu).append(td2);
            pc_user_body.append(tr);
            modalUser.modal('hide');

            $('.delPettyCash').click(function (e) {
                var code = $(this).attr('data-id');
                AlertFactory.confirm({
                    title: '',
                    message: '¿Está seguro que desea quitar este usuario?',
                    confirm: 'Si',
                    cancel: 'No'
                }, function () {
                    $('#tr_b_' + code).remove();
                });
                e.preventDefault();
            });
        }

        var search = getFormSearch('frm-search-PettyCash', 'search_PettyCash', 'LoadRecordsButtonPettyCash');

        var table_container_pc = $("#table_container_petty_cash");

        table_container_pc.jtable({
            title: "Lista de Caja Chica",
            paging: true,
            sorting: true,
            actions: {
                listAction: base_url + '/petty_cash/list',
                deleteAction: base_url + '/petty_cash/delete'
            },
            toolbar: {
                items: [{
                    cssClass: 'buscador',
                    text: search
                }, {
                    cssClass: 'btn-danger-admin',
                    text: '<i class="fa fa-plus"></i> Nueva Caja Chica',
                    click: function () {
                        newPettyCash();
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
                description: {
                    title: 'Descripción'
                },
                code: {
                    title: 'Código'
                },
                liable_name: {
                    title: 'Responsable'
                },
                total: {
                    title: 'Total',
                    listClass: 'text-right',
                },
                is_vale: {
                    title: 'Tiene Vale',
                    listClass: 'text-center',
                },
                edit: {
                    width: '1%',
                    sorting: false,
                    edit: false,
                    create: false,
                    listClass: 'text-center',
                    display: function (data) {
                        return '<a href="javascript:void(0)" title="Editar" class="edit_pc" data-code="' +
                            data.record.id + '"><i class="fa fa-pencil-square-o fa-1-5x fa-green"></i></a>';
                    }
                }
            },
            recordsLoaded: function (event, data) {
                $('.edit_pc').click(function (e) {
                    var id = $(this).attr('data-code');
                    findPettyCash(id);
                    e.preventDefault();
                });
            }
        });

        generateSearchForm('frm-search-PettyCash', 'LoadRecordsButtonPettyCash', function () {
            table_container_pc.jtable('load', {
                search: $('#search_PettyCash').val()
            });
        }, true);

        var call_m = false;

        function callModals() {
            call_m = true;

            var search_u = getFormSearch('frm-search-user', 'search_user', 'LoadRecordsButtonUser');

            var table_container_u = $("#table_container_usuario");

            table_container_u.jtable({
                title: "Lista de Usuarios",
                paging: true,
                sorting: true,
                actions: {
                    listAction: base_url + '/petty_cash/listUser'
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
                            return '<a href="javascript:void(0)" title="Seleccionar" class="select_u" data-code="' +
                                data.record.id + '" data-title="' + data.record.username + '"data-name="' + data.record.name +
                                '" ><i class="fa fa-' + icon_select + ' fa-1-5x"></i></a>';
                        }
                    }
                },
                recordsLoaded: function (event, data) {
                    $('.select_u').click(function (e) {
                        var id = $(this).attr('data-code');
                        var username = $(this).attr('data-title');
                        var name = $(this).attr('data-name');
                        if (state_click === 0) {
                            pc_liable_id.val(id);
                            pc_liable_username.val(username);
                            pc_liable_name.val(name);
                            modalUser.modal('hide');
                        } else {
                            addToPettyCash(id, username, name);
                        }
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

            .state('petty_cash', {
                url: '/petty_cash',
                templateUrl: base_url + '/templates/petty_cash/base.html',
                controller: 'PettyCashCtrl'
            });

        $urlRouterProvider.otherwise('/');
    }
})
();