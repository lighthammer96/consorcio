/**
 * Created by EVER on 4/17/2017.
 */
(function () {
    'use strict';
    angular.module('sys.app.buyers')
        .config(Config)
        .controller('BuyerCtrl', BuyerCtrl);

    Config.$inject = ['$stateProvider', '$urlRouterProvider'];
    BuyerCtrl.$inject = ['$scope', '_', 'RESTService', 'AlertFactory'];

    function BuyerCtrl($scope, _, RESTService, AlertFactory) {
        var modalB;
        var modalUser;
        var titleBuy;
        var code;
        var description;
        var state;
        var state_text;
        var user_id;
        var username;
        var buyer_id;
        var call_m = false;

        $scope.chkState = function () {
            var txt = (state.prop('checked')) ? 'Activo' : 'Inactivo';
            state_text.html(txt);
        };

        function overModals() {
            if (!call_m) {
                modalB = $('#modalB');
                titleBuy = $('#title-buy');
                modalUser = $('#modalUser');

                code = $('#code');
                description = $('#description');
                state = $('#state');
                state_text = $('#state_text');
                user_id = $('#user_id');
                username = $('#username');
                buyer_id = $("#buyer_id");

                modalUser.on('hidden.bs.modal', function (e) {
                    modalB.attr('style', 'display:block;');
                });
                modalUser.on('show.bs.modal', function (e) {
                    modalB.attr('style', 'display:block; z-index:2030 !important');
                });
                modalB.on('shown.bs.modal', function (e) {
                    code.focus();
                });
                modalB.on('hidden.bs.modal', function (e) {
                    cleanBuyer();
                });

                callModals();

                $('.i-checks').iCheck({
                    checkboxClass: 'icheckbox_square-green'
                }).on('ifChanged', function (event) {
                    $(event.target).click();
                    $scope.chkState();
                });
            }
        }

        function cleanBuyer() {
            cleanRequired();
            titleBuy.html('');
            buyer_id.val('');
            user_id.val('');
            code.val('');
            state.prop('checked', true).iCheck('update');
            $scope.chkState();
            description.val('');
            username.val('');
        }

        function newBuyer() { 
            overModals();
            modalB.modal('show');
            titleBuy.html('Nuevo Comprador');
        }

        $scope.openUser = function () {
            $('#LoadRecordsButtonU').click();
            modalUser.modal('show');
        };

        function findBuyer(id) {
            overModals();
            titleBuy.html('Editar Comprador');
            RESTService.get('buyers/find', id, function (response) {
                if (!_.isUndefined(response.status) && response.status) {
                    var data = response.data;
                    code.val(data.code);
                    buyer_id.val(data.id);
                    description.val(data.description);
                    state.prop('checked', (data.state === '1')).iCheck('update');
                    $scope.chkState();
                    user_id.val(data.user_id);
                    username.val(data.user.name);
                    modalB.modal('show');
                } else {
                    AlertFactory.textType({
                        title: '',
                        message: 'Hubo un error al obtener el Comprador. Intente nuevamente.',
                        type: 'error'
                    });
                }
            });
        }

        $scope.saveBuyer = function () {
            var bval = true;
            bval = bval && code.required();
            bval = bval && description.required();
            bval = bval && username.required();
            if (bval) {
                var params = {
                    'id': buyer_id.val(),
                    'code': code.val(),
                    'state': ((state.prop('checked')) ? 1 : 0),
                    'description': description.val(),
                    'user_id': user_id.val()
                };

                var buyer_id_ = (buyer_id.val() === '') ? 0 : buyer_id.val();

                RESTService.updated('buyers/saveBuyer', buyer_id_, params, function (response) {
                    if (!_.isUndefined(response.status) && response.status) {
                        AlertFactory.textType({
                            title: '',
                            message: 'El comprador se guardo correctamente.',
                            type: 'success'
                        });
                        modalB.modal('hide');
                        $("#LoadRecordsButtonBuyer").click();
                    } else {
                        var msg_ = (_.isUndefined(response.message)) ?
                            'Hubo un error al guardar el comprador. Intente nuevamente.' : response.message;
                        AlertFactory.textType({
                            title: '',
                            message: msg_,
                            type: 'error'
                        });
                    }
                });
            }
        };

        var search = getFormSearch('frm-search-buyer', 'search_buyer', 'LoadRecordsButtonBuyer');

        var table_container_b = $("#table_container_buyer");

        table_container_b.jtable({
            title: "Lista de Compradores",
            paging: true,
            sorting: true,
            actions: {
                listAction: base_url + '/buyers/list',
                deleteAction: base_url + '/buyers/delete'
            },
            toolbar: {
                items: [{
                    cssClass: 'buscador',
                    text: search
                }, {
                    cssClass: 'btn-primary',
                    text: '<i class="fa fa-file-excel-o"></i> Exportar a Excel',
                    click: function () {
                        $scope.openDoc('buyers/excel', {});
                    }
                }, {
                    cssClass: 'btn-danger-admin',
                    text: '<i class="fa fa-plus"></i> Nuevo Comprador',
                    click: function () {
                        newBuyer();
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
                    title: 'Código'
                },
                description: {
                    title: 'Descripción'
                },
                name: {
                    title: 'Usuario',
                    sorting: false
                },
                state: {
                    title: 'Estado',
                    options: {1: 'Activo', 0: 'Inactivo'},
                    list: show_list_
                },
                edit: {
                    width: '1%',
                    sorting: false,
                    edit: false,
                    create: false,
                    listClass: 'text-center',
                    display: function (data) {
                        return '<a href="javascript:void(0)" title="Editar" class="edit_b" data-code="' +
                            data.record.id + '"><i class="fa fa-pencil-square-o fa-1-5x fa-green"></i></a>';
                    }
                }
            },
            recordsLoaded: function (event, data) {
                $('.edit_b').click(function (e) {
                    var code = $(this).attr('data-code');
                    findBuyer(code);
                    e.preventDefault();
                });
            }
        });
        generateSearchForm('frm-search-buyer', 'LoadRecordsButtonBuyer', function () {
            table_container_b.jtable('load', {
                search: $('#search_buyer').val()
            });
        }, true);

        function callModals() {
            call_m = true;

            var search_u = getFormSearch('frm-search-u', 'search_u', 'LoadRecordsButtonU');

            var table_container_u = $("#table_container_usuario");

            table_container_u.jtable({
                title: "Lista de Usuarios",
                paging: true,
                sorting: true,
                actions: {
                    listAction: base_url + '/buyers/listUser'
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
                                data.record.id + '" data-title="' + data.record.name + '"><i class="fa fa-' + icon_select + ' fa-1-5x"></i></a>';
                        }
                    }
                },
                recordsLoaded: function (event, data) {
                    $('.select_u').click(function (e) {
                        var code = $(this).attr('data-code');
                        var user = $(this).attr('data-title');
                        user_id.val(code);
                        username.val(user).removeClass('border-red');
                        modalUser.modal('hide');
                        e.preventDefault();
                    });
                }
            });

            generateSearchForm('frm-search-u', 'LoadRecordsButtonU', function () {
                table_container_u.jtable('load', {
                    search: $('#search_u').val()
                });
            }, false);
        }
    }

    function Config($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('buyers', {
                url: '/buyers',
                templateUrl: base_url + '/templates/buyers/base.html',
                controller: 'BuyerCtrl'
            });

        $urlRouterProvider.otherwise('/');
    }
})();