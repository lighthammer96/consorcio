/**
 * Created by EVER on 28/06/2017.
 */

(function () {
    'use strict';
    angular.module('sys.app.accounts_pay')
        .config(Config)
        .controller('AccountPayCtrl', AccountPayCtrl);

    Config.$inject = ['$stateProvider', '$urlRouterProvider'];
    AccountPayCtrl.$inject = ['$scope', '_', 'RESTService', 'AlertFactory'];

    function AccountPayCtrl($scope, _, RESTService, AlertFactory) {
        var modalAP;
        var modalUser;
        var titleAP;
        var code;
        var description;
        var state;
        var state_text;
        var user_id;
        var username;
        var AccountPay_id;
        var call_m = false;
        var modalDetailDocument;

        $scope.chkState = function () {
            var txt = (state.prop('checked')) ? 'Activo' : 'Inactivo';
            state_text.html(txt);
        };

        function overModals() {
            if (!call_m) {
                modalAP = $('#modalAP');
                titleAP = $('#title-ap');
                modalUser = $('#modalUser');
                modalDetailDocument = $("#modalDetailDocument");

                code = $('#code');
                description = $('#description');
                state = $('#state');
                state_text = $('#state_text');
                user_id = $('#user_id');
                username = $('#username');
                AccountPay_id = $("#AccountPay_id");

                modalDetailDocument.on('hidden.bs.modal', function (e) {
                    modalAP.attr('style', 'display:block;');
                });
                modalDetailDocument.on('show.bs.modal', function (e) {
                    modalAP.attr('style', 'display:block; z-index:2030 !important');
                });
                modalUser.on('hidden.bs.modal', function (e) {
                    modalAP.attr('style', 'display:block;');
                });
                modalUser.on('show.bs.modal', function (e) {
                    modalAP.attr('style', 'display:block; z-index:2030 !important');
                });
                modalAP.on('shown.bs.modal', function (e) {
                    code.focus();
                });
                modalAP.on('hidden.bs.modal', function (e) {
                    cleanAccountPay();
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

        function cleanAccountPay() {
            cleanRequired();
            titleAP.html('');
            AccountPay_id.val('');
            user_id.val('');
            code.val('');
            state.prop('checked', true).iCheck('update');
            $scope.chkState();
            description.val('');
            username.val('');
        }

        function newAccountPay() {
            overModals();
            modalAP.modal('show');
            titleAP.html('Nueva Cuenta por Pagar');
        }

        $scope.openDetalleDoc = function () {
            //$('#LoadRecordsButtonUser').click();
            modalDetailDocument.modal('show');
        };


        $scope.openUser = function () {
            $('#LoadRecordsButtonU').click();
            modalUser.modal('show');
        };

        function getDataForm () {
            RESTService.all('articles/data_form', '', function(response) {
                if (!_.isUndefined(response.status) && response.status) {
                    $("#p_retention_id").append('<option value="" selected>SIN RETENCIÓN</option>');
                    _.each(response.retentions, function(item) {
                        $("#p_retention_id").append('<option value="'+item.Value+'">'+item.DisplayText+'</option>');
                    });
                }
            }, function() {
                getDataForm();
            });
        }
        getDataForm();

        function findAccountPay(id) {
            overModals();
            titleAP.html('Editar Cuentas por Pagar');
            RESTService.get('AccountPays/find', id, function (response) {
                if (!_.isUndefined(response.status) && response.status) {
                    var data = response.data;
                    code.val(data.code);
                    AccountPay_id.val(data.id);
                    description.val(data.description);
                    state.prop('checked', (data.state === '1')).iCheck('update');
                    $scope.chkState();
                    user_id.val(data.user_id);
                    username.val(data.user.name);
                    modalAP.modal('show');
                } else {
                    AlertFactory.textType({
                        title: '',
                        message: 'Hubo un error al obtener la cuenta por pagar. Intente nuevamente.',
                        type: 'error'
                    });
                }
            });
        }

        $scope.saveAccountPay = function () {
            var bval = true;
            bval = bval && code.required();
            bval = bval && description.required();
            bval = bval && username.required();
            if (bval) {
                var params = {
                    'id': AccountPay_id.val(),
                    'code': code.val(),
                    'state': ((state.prop('checked')) ? 1 : 0),
                    'description': description.val(),
                    'user_id': user_id.val()
                };

                var AccountPay_id_ = (AccountPay_id.val() === '') ? 0 : AccountPay_id.val();

                RESTService.updated('AccountPays/saveAccountPay', AccountPay_id_, params, function (response) {
                    if (!_.isUndefined(response.status) && response.status) {
                        AlertFactory.textType({
                            title: '',
                            message: 'La cuent por pagar se guardo correctamente.',
                            type: 'success'
                        });
                        modalAP.modal('hide');
                        $("#LoadRecordsButtonAccountPay").click();
                    } else {
                        AlertFactory.textType({
                            title: '',
                            message: 'Hubo un error al guardar la cuenta por pagar. Intente nuevamente.',
                            type: 'error'
                        });
                    }
                });
            }
        };

        var search = getFormSearch('frm-search-AccountPay', 'search_AccountPay', 'LoadRecordsButtonAccountPay');

        var table_container_b = $("#table_container_account_pay");

        table_container_b.jtable({
            title: "Lista de Cuentas por Pagar",
            paging: true,
            sorting: true,
            actions: {
                listAction: function (postData, jtParams) {
                    return {
                        "Result": "OK",
                        "Records": [
                            {"provider": "PEREZ CASTRO", "ruc": "100104545542", "tipo_doc": "FACTURA", "numero": "001-0001", "monto":"345.00", "fecha_registro": "01/01/2017", "fecha_vencimiento":"04/04/2017"},
                            {"provider": "MELENDEZ SANCHEZ", "ruc": "100104545545", "tipo_doc": "BOLETA","numero": "001-0002","monto":"648.00", "fecha_registro": "01/01/2017", "fecha_vencimiento":"04/04/2017"},
                            {"provider": "VELASQUEZ GARCIA", "ruc": "100104545544", "tipo_doc": "FACTURA","numero": "001-0003","monto":"577.00", "fecha_registro": "01/01/2017", "fecha_vencimiento":"04/04/2017"},
                        ],
                        "TotalRecordCount": 4
                    };
                },
                deleteAction: base_url + '/AccountPays/delete'
            },
            toolbar: {
                items: [{
                    cssClass: 'buscador',
                    text: search
                }, {
                    cssClass: 'btn-primary',
                    text: '<i class="fa fa-file-excel-o"></i> Exportar a Excel',
                    click: function () {
                        $scope.openDoc('AccountPays/excel', {});
                    }
                }, {
                    cssClass: 'btn-success',
                    text: '<i class="fa fa-plus"></i> Nueva Cuenta por Pagar',
                    click: function () {
                        newAccountPay();
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
                provider: {
                    title: 'Proveedor'
                },
                ruc: {
                    title: 'Documento'
                },
                tipo_doc: {
                    title: 'Tipo Documento',
                    sorting: false
                },
                numero: {
                    title: 'Número'
                },
                monto: {
                    title: 'Monto',
                    listClass: 'text-right'
                },
                fecha_registro: {
                    title: 'Fecha Registro',
                    listClass: 'text-center'
                },
                fecha_vencimiento: {
                    title: 'Fecha Vencimento',
                    listClass: 'text-center'
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
                  ///  findAccountPay(code);
                    titleAP.html('Editar Cuentas por Pagar');
                    modalAP.modal('show');
                    e.preventDefault();
                });
            }
        });
        generateSearchForm('frm-search-AccountPay', 'LoadRecordsButtonAccountPay', function () {
            table_container_b.jtable('load', {
                search: $('#search_AccountPay').val()
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
                    listAction: base_url + '/AccountPays/listUser'
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

            .state('accounts_pay', {
                url: '/accounts_pay',
                templateUrl: base_url + '/templates/accounts_pay/base.html',
                controller: 'AccountPayCtrl'
            });

        $urlRouterProvider.otherwise('/');
    }
})();