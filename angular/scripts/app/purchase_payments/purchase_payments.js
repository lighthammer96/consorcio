/**
 * Created by EVER on 4/17/2017.
 */
(function () {
    'use strict';
    angular.module('sys.app.purchase_payments')
        .config(Config)
        .controller('PurchasePaymentsCtrl', PurchasePaymentsCtrl);

    Config.$inject = ['$stateProvider', '$urlRouterProvider'];
    PurchasePaymentsCtrl.$inject = ['$scope', '_', 'RESTService', 'AlertFactory'];

    function PurchasePaymentsCtrl($scope, _, RESTService, AlertFactory)
    {
        var modalW;
        var modalUser;
        var titleWar;
        var default_type = '';
        var w_user_body;
        var PurchasePayments_id;
        var w_description;
        var w_code_internal;
        var w_type_id;
        var w_physical_location;
        var w_address;
        var w_state;
        var modalPurchaseBilling;
        var modalControlSaldo;
        var titleControlSaldo;

        function overModals() {
            modalW = $('#modalPP');
            titleWar = $('#title-sc');
            modalUser = $('#modalProvider');
            modalPurchaseBilling=$("#modalPurchaseBilling");
            w_user_body = $("#w_user_body");
            PurchasePayments_id = $("#PurchasePayments_id");
            w_description = $('#w_description');
            w_code_internal = $("#w_code_internal");
            w_type_id = $("#w_type_id");
            w_physical_location = $("#w_physical_location");
            w_address = $("#w_address");
            w_state = $("#w_state");
            modalControlSaldo=$("#modalControlSaldo");
            titleControlSaldo=$("#titleControlSaldo");


            modalUser.on('hidden.bs.modal', function (e) {
                modalW.attr('style', 'display:block;');
            });
            modalUser.on('show.bs.modal', function (e) {
                modalW.attr('style', 'display:block; z-index:2030 !important');
            });
            modalPurchaseBilling.on('hidden.bs.modal', function (e) {
                modalW.attr('style', 'display:block;');
            });
            modalPurchaseBilling.on('show.bs.modal', function (e) {
                modalW.attr('style', 'display:block; z-index:2030 !important');
            });
            modalW.on('hidden.bs.modal', function (e) {
                cleanPurchasePayments();
            });
          modalControlSaldo.on('hidden.bs.modal', function (e) {
                modalPurchaseBilling.attr('style', 'display:block;');
            });
            modalControlSaldo.on('show.bs.modal', function (e) {
                modalPurchaseBilling.attr('style', 'display:block; z-index:2030 !important');
            });

            if (!call_m) {
                callModals();
            }
        }

        $('.i-checks').iCheck({
            checkboxClass: 'icheckbox_square-green'
        }).on('ifChanged', function (event) {
            $(event.target).click();
            $scope.chkState();
        });

        function cleanPurchasePayments() {
            titleWar.html('');
            PurchasePayments_id.val('');
            w_description.val('');
            w_address.val('');
            w_code_internal.val('');
            w_state.prop('checked', false);
            w_physical_location.prop('checked', false);
            w_user_body.html('');
            activeTab('almacen');
        }

        function newPurchasePayments() {
            overModals();
            modalW.modal('show');
            titleWar.html('Nuevo Pagos de Compras y Gastos');
        }

       $scope.saveBalanceControl=function(){
         $("#modalControlSaldo").modal('hide');
         $("#modalPurchaseBilling").modal('hide');
       }

        $scope.openProvider = function () {
            $('#LoadRecordsButtonUser').click();
            modalUser.modal('show');
        };

        $scope.openPurchaseBilling = function () {
         //   $('#LoadRecordsButtonPurchaseBilling').click();
            modalPurchaseBilling.modal('show');
        };

/*        RESTService.all('purchase_payments/data_form', '', function (response) {
            if (!_.isUndefined(response.status) && response.status == true) {
                _.each(response.types, function (item) {
                    if (default_type == '') default_type = item.Value;
                    $("#w_type_id").append('<option value="' + item.Value + '">' + item.DisplayText + '</option>');
                });
            }
        });*/

        function findPurchasePayments(id) {
            overModals();
            titleWar.html('Editar Pagos de Compras y Gastos');
            modalW.modal('show');
/*            RESTService.get('purchase_payments/find', id, function (response) {
                if (!_.isUndefined(response.status) && response.status == true) {
                    console.log(response);
                    var data_p = response.data;
                    PurchasePayments_id.val(data_p.id);
                    var chk_state = (data_p.state == '1');
                    w_state.prop('checked', chk_state);
                    var chk_pl = (data_p.physical_location == '1');
                    w_physical_location.prop('checked', chk_pl);
                    w_description.val(data_p.description);
                    w_address.val(data_p.address);
                    w_code_internal.val(data_p.code_internal);
                    modalW.modal('show');
                    _.each(data_p.users, function (b) {
                        addToPurchasePayments(b.id, b.username, b.name);

                    });
                } else {
                    AlertFactory.textType({
                        title: '',
                        message: 'Hubo un error al obtener Cobros de Ventas. Intente nuevamente.',
                        type: 'error'
                    });
                }
            });*/
        }
        function ModalControlMonto(){
            overModals();
            $("#modalControlSaldo").modal('show');
            titleControlSaldo.html('Monto a Pagar'); 
        }

        $scope.savePurchasePayments = function () {
            var bval = true;
            bval = bval && w_description.required();
            bval = bval && w_type_id.required();
            bval = bval && w_address.required();
            bval = bval && w_code_internal.required();
            if (bval) {
                var users = [];
                $.each($('.w_user'), function (idx, item) {
                    users[idx] = $(item).val();
                });
                users = users.join(',');

                var params = {
                    'id': PurchasePayments_id.val(),
                    'code_internal': w_code_internal.val(),
                    'description': w_description.val(),
                    'type_id': w_type_id.val(),
                    'address': w_address.val(),
                    'state': ((w_state.prop('checked')) ? 1 : 0),
                    'physical_location': ((w_physical_location.prop('checked')) ? 1 : 0),
                    'users': users
                };

                var w_id = (PurchasePayments_id.val() == '') ? 0 : PurchasePayments_id.val();
                console.log(w_id);

                RESTService.updated('purchase_payments/savePurchasePayments', w_id, params, function (response) {
                    if (!_.isUndefined(response.status) && response.status == true) {
                        console.log(response);
                        AlertFactory.textType({
                            title: '',
                            message: 'El Almacén se guardó correctamente.',
                            type: 'success'
                        });
                        modalW.modal('hide');
                        LoadRecordsButtonPurchasePayments.click();
                    } else {
                        AlertFactory.textType({
                            title: '',
                            message: 'Hubo un error al guardar el Almacén. Intente nuevamente.',
                            type: 'error'
                        });
                    }
                });
            }

        };

        function addToPurchasePayments(code, username, name)
        {
            if ($('#tr_b_' + code).length > 0) {
                AlertFactory.showWarning({
                    title: '',
                    message: 'Ya se asignó este Pago'
                });
                return false;
            }
            var tr = $('<tr id="tr_b_' + code + '"></tr>');
            var td1 = $('<td>' + username + '</td>');
            var tdu = $('<td>' + name + '</td>');
            var inp = $('<input type="hidden" class="w_user" value="' + code + '" />');
            td1.append(inp);
            var td2 = $('<td class="text-center"></td>');
            var btn = $('<button class="btn btn-danger btn-xs delPurchasePayments" data-id="' + code + '" type="button"><span class="fa fa-trash"></span></button>');
            td2.append(btn);
            tr.append(td1).append(tdu).append(td2);
            $("#w_user_body").append(tr);
            $("#modalUsuario").modal('hide');

            $('.delPurchasePayments').click(function (e) {
                var code = $(this).attr('data-id');
                AlertFactory.confirm({
                    title: '',
                    message: '¿Está seguro que desea quitar este Almacén?',
                    confirm: 'Si',
                    cancel: 'No'
                }, function () {
                    $('#tr_b_' + code).remove();
                });
                e.preventDefault();
            });
        }

        var search = getFormSearch('frm-search-PurchasePayments', 'search_PurchasePayments', 'LoadRecordsButtonPurchasePayments');

        var table_container_wa = $("#table_container_purchase_payments");

        table_container_wa.jtable({
            title: "Lista de Pagos de Compras y Gastos",
            paging: true,
            sorting: true,
            actions: {
                    listAction: function (postData, jtParams) {
                    return {
                        "Result": "OK",
                        "Records": [
                            { "description": "ELECTROCENTRO SA","ruc":"10475835364","proyecto":"00123- PROYECTO PRUEBA","local":"LOCAL PRINCIPAL","Periodo_contable": "201701", "saldo": "2,456.00", "fecha_emision": "12/01/2017"},
                            { "description": "SYSTEM SA","ruc":"10475835362","proyecto":"00124- PROYECTO PRUEBA","local":"LOCAL PRINCIPAL","Periodo_contable": "201702", "saldo": "1,756.00", "fecha_emision": "12/02/2017"},
                            { "description": "CONSTRUCT SA","ruc":"10475835367","proyecto":"00125- PROYECTO PRUEBA","local":"LOCAL PRINCIPAL","Periodo_contable": "201703", "saldo": "3,656.00", "fecha_emision": "12/03/2017"},
                            { "description": "MALDONADO SA","ruc":"10475835366","proyecto":"00126- PROYECTO PRUEBA","local":"LOCAL PRINCIPAL","Periodo_contable": "201704", "saldo": "4,256.00", "fecha_emision": "12/04/2017"},
                        ],
                        "TotalRecordCount": 4
                    };
                  },
                deleteAction: base_url + '/purchase_payments/delete',
            },
            toolbar: {
                items: [{
                    cssClass: 'buscador',
                    text: search
                }, {
                    cssClass: 'btn-primary',
                    text: '<i class="fa fa-file-excel-o"></i> Exportar a Excel',
                    click: function () {
                        window.open(base_url + '/purchase_payments/excel');
                    }
                },
                    {
                        cssClass: 'btn-success',
                        text: '<i class="fa fa-plus"></i> Nuevo Pagos de Compras',
                        click: function () {
                            newPurchasePayments();
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
                    title: 'Proveedor'
                },
                ruc: {
                    title: 'Ruc',
                    width: '4%'
                },
                proyecto: {
                    title: 'Proyecto'
                },
                local: {
                    title: 'Local',
                    width: '7%'
                },
                Periodo_contable: {
                    title: 'Periodo Contable',
                    width: '3%'
                },
                saldo:{
                    title:'Monto Total',
                    listClass:'text-right',
                    width: '3%'
                },
                fecha_emision:{
                    title:'Fecha',
                    listClass: 'text-center',
                    list: show_list_,
                    width: '3%'
                },
                edit: {
                    width: '1%',
                    sorting: false,
                    edit: false,
                    create: false,
                    display: function (data) {
                        return '<a href="javascript:void(0)" title="Editar" class="edit_w" data-code="' +
                            data.record.id + '"><i class="fa fa-pencil-square-o fa-1-5x fa-green"></i></a>';
                    }
                }
            },
            recordsLoaded: function (event, data) {
                $('.edit_w').click(function (e) {
                    var id = $(this).attr('data-code');
                    findPurchasePayments(id);
                    e.preventDefault();
                });
            }
        });

        generateSearchForm('frm-search-PurchasePayments', 'LoadRecordsButtonPurchasePayments', function () {
            table_container_wa.jtable('load', {
                search: $('#search_PurchasePayments').val()
            });
        }, true);

        var call_m = false;

        function callModals() {
            call_m = true;

            var search_u = getFormSearch('frm-search-user', 'search_user', 'LoadRecordsButtonUser');

            var table_container_u = $("#table_container_provider");

            table_container_u.jtable({
                title: "Lista de Proveedores",
                paging: true,
                sorting: true,
                actions: {
                   listAction: base_url + '/fronts/listClient'
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
                    Documento: {
                        title: 'Ruc'
                    },
                    RazonSocial: {
                        title: 'Razón Social'
                    },
                    select: {
                        width: '1%',
                        sorting: false,
                        edit: false,
                        create: false,
                        display: function (data) {
                            return '<a href="javascript:void(0)" title="Seleccionar" class="select_u" data-code="' +
                                data.record.id + '" data-doc="' + data.record.Documento + '" data-name="' + data.record.RazonSocial +
                                '"><i class="fa fa-circle-o fa-1-5x"></i></a>';
                        }
                    }
                },
                recordsLoaded: function (event, data) {
                    $('.select_u').click(function (e) {
                        var code = $(this).attr('data-code');
                        var username = $(this).attr('data-title');
                        var name = $(this).attr('data-name');
                        addToPurchasePayments(code, username, name);
                        e.preventDefault();
                    });
                }
            });
            generateSearchForm('frm-search-user', 'LoadRecordsButtonUser', function () {
                table_container_u.jtable('load', {
                    search: $('#search_user').val()
                });
            }, false);


            var search_u = getFormSearch('frm-search-purchasebilling', 'search_purchasebilling', 'LoadRecordsButtonPurchaseBilling');

            var table_container_u = $("#table_container_purchasebilling");

            table_container_u.jtable({
                title: "Lista de Documentos",
                paging: true,
                sorting: true,
                actions: {
                 listAction: function (postData, jtParams) {
                    return {
                        "Result": "OK",
                        "Records": [
                            { "Comprobante": "FACTURA","numero":"001-0002","monto": "5000.00", "fecha": "12/01/2017"},
                            { "Comprobante": "FACTURA","numero":"001-0003","monto": "4000.00", "fecha": "13/01/2017"},
                            { "Comprobante": "FACTURA","numero":"001-0004","monto": "3000.00", "fecha": "12/10/2017"}
                        ],
                        "TotalRecordCount": 4
                    };
                },
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
                    Comprobante: {
                        title: (show_list_) ? 'Tipo Comprobante':'Tipo Comp'
                    },
                    numero: {
                        title: (show_list_) ? 'N° Comprobante':'N° Comp.'
                    },
                    monto: {
                        title: (show_list_) ? 'Monto Total': 'Total',
                        listClass: 'text-right'
                    },
                    fecha: {
                        title: 'Fecha Emisión',
                        listClass:'text-center',
                        list:show_list_
                    },
                    select: {
                        width: '1%',
                        sorting: false,
                        edit: false,
                        create: false,
                        display: function (data) {
                            return '<a href="javascript:void(0)" title="Seleccionar" class="select_u" data-code="' +
                                data.record.id + '" data-doc="' + data.record.Documento + '" data-name="' + data.record.RazonSocial +
                                '"><i class="fa fa-circle-o fa-1-5x"></i></a>';
                        }
                    }
                },
                recordsLoaded: function (event, data) {
                    $('.select_u').click(function (e) {
                        var code = $(this).attr('data-code');
                        ModalControlMonto(code);                     
                        e.preventDefault();
                    });
                }
            });
            generateSearchForm('frm-search-purchasebilling', 'LoadRecordsButtonPurchaseBilling', function () {
                table_container_u.jtable('load', {
                    search: $('#search_purchasebilling').val()
                });
            }, false);

        }
    }

    function Config($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('purchase_payments', {
                url: '/purchase_payments',
                templateUrl: base_url + '/templates/purchase_payments/base.html',
                controller: 'PurchasePaymentsCtrl'
            });

        $urlRouterProvider.otherwise('/');
    }
})
();