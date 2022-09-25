/**
 * Created by EVER on 4/17/2017.
 */
(function () {
    'use strict';
    angular.module('sys.app.sales_charges')
        .config(Config)
        .controller('SalesChargesCtrl', SalesChargesCtrl);

    Config.$inject = ['$stateProvider', '$urlRouterProvider'];
    SalesChargesCtrl.$inject = ['$scope', '_', 'RESTService', 'AlertFactory'];

    function SalesChargesCtrl($scope, _, RESTService, AlertFactory)
    {
        var modalSC;
        var modalClient;
        var titleSC;
        var default_type = '';
        var sc_document_body;
        var modalDirectBilling;
        var modalControlSaldo;
        var titleControlSaldo;
        var sc_charges_id;
        var sc_client_id;
        var sc_client;
        var sc_local_id;
        var sc_way_payment_id;
        var sc_number_way_payment;
        var sc_amount;
        var sc_registration_date;
        var sc_payment_date;
        var sc_money_id;
        var sc_bank_id;
        var sc_current_account_number;
        var sc_ruc;

        function overModals() {
            modalSC = $('#modalSC');
            titleSC = $('#title-sc');
            modalClient = $('#modalClient');
            modalDirectBilling = $('#modalDirectBilling');
            sc_document_body = $("#sc_document_body");
            modalControlSaldo=$("#modalControlSaldo");
            titleControlSaldo=$("#titleControlSaldo");

            sc_charges_id = $("#sc_charges_id");
            sc_client_id = $('#sc_client_id');
            sc_client = $("#sc_client");
            sc_local_id = $("#sc_local_id");
            sc_way_payment_id = $("#sc_way_payment_id");
            sc_number_way_payment = $("#sc_number_way_payment");
            sc_amount = $("#sc_amount");
            sc_registration_date=$("#sc_registration_date");
            sc_payment_date= $("#sc_payment_date");
            sc_money_id= $("#sc_money_id");
            sc_bank_id= $("#sc_bank_id");
            sc_current_account_number= $("#sc_current_account_number");
            sc_ruc=$("#sc_ruc");

            modalClient.on('hidden.bs.modal', function (e) {
                modalSC.attr('style', 'display:block;');
            });
            modalClient.on('show.bs.modal', function (e) {
                modalSC.attr('style', 'display:block; z-index:2030 !important');
            });
            modalDirectBilling.on('hidden.bs.modal', function (e) {
                modalSC.attr('style', 'display:block;');
            });
            modalDirectBilling.on('show.bs.modal', function (e) {
                modalSC.attr('style', 'display:block; z-index:2030 !important');
            });
            modalControlSaldo.on('hidden.bs.modal', function (e) {
                modalDirectBilling.attr('style', 'display:block;');
            });
            modalControlSaldo.on('show.bs.modal', function (e) {
                modalDirectBilling.attr('style', 'display:block; z-index:2030 !important');
            });

            modalSC.on('hidden.bs.modal', function (e) {
                cleanSalesCharges();
            });
            if (!call_m) {
                callModals();
            }
        }

        function cleanSalesCharges() {
          //   titleSC.html('');
          // //  sc_document_body.html('');
          //   sc_charges_id.val('');
          //   sc_client_id.val('');
          //   sc_client.val('');
          //   sc_local_id.val('');
          //   sc_way_payment_id.val('');
          //   sc_number_way_payment.val('');
          //   sc_amount.val('');
          //   sc_registration_date.val('');
          //   sc_payment_date.val('');
          //   sc_money_id.val('');
          //   sc_bank_id.val('');
          //   sc_current_account_number.val('');
          //   activeTab('almacen');
        }

        function newSalesCharges() {
            overModals();
            modalSC.modal('show');
            titleSC.html('Nuevo Cobro de Ventas');
        }


        $scope.openClient = function () {
            $('#LoadRecordsButtonClient').click();
            modalClient.modal('show');
        };

        $scope.openDirectBilling = function () {
            $('#LoadRecordsButtonDirectbilling').click();
            modalDirectBilling.modal('show');
        };

/*        RESTService.all('sales_charges/data_form', '', function (response) {
            if (!_.isUndefined(response.status) && response.status == true) {
                _.each(response.types, function (item) {
                    if (default_type == '') default_type = item.Value;
                    $("#sc_local_id").append('<option value="' + item.Value + '">' + item.DisplayText + '</option>');
                });
            }
        });*/

        function findSalesCharges(id) {
            overModals();
            titleSC.html('Editar Cobros de Ventas');
            modalSC.modal('show');
/*            RESTService.get('sales_charges/find', id, function (response) {
                if (!_.isUndefined(response.status) && response.status == true) {
                    console.log(response);
                    var data_p = response.data;
                    sc_charges_id.val(data_p.id);
                    var chk_state = (data_p.state == '1');
                    sc_amount.prop('checked', chk_state);
                    var chk_pl = (data_p.physical_location == '1');
                    sc_way_payment_id.prop('checked', chk_pl);
                    sc_client_id.val(data_p.description);
                    sc_number_way_payment.val(data_p.address);
                    sc_client.val(data_p.code_internal);
                    modalSC.modal('show');
                    _.each(data_p.users, function (b) {
                        addToSalesCharges(b.id, b.username, b.name);

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

       $scope.saveBalanceControl=function(){
         $("#modalControlSaldo").modal('hide');
         $("#modalDirectBilling").modal('hide');
       }


        $scope.saveSalesCharges = function () {
            var bval = true;
            bval = bval && sc_charges_id.required(); 
            bval = bval && sc_client_id.required();
            bval = bval && sc_client.required();
            bval = bval && sc_local_id.required();
            bval = bval && sc_way_payment_id.required();
            bval = bval && sc_number_way_payment.required();
            bval = bval && sc_amount.required();
            bval = bval && sc_registration_date.required();
            bval = bval && sc_payment_date.required();
            bval = bval && sc_money_id.required();
            bval = bval && sc_bank_id.required();
            bval = bval && sc_current_account_number.required();
            if (bval) {
                var users = [];
                $.each($('.sc_document'), function (idx, item) {
                    users[idx] = $(item).val();
                });
                users = users.join(',');

                var params = {
                    'id': sc_charges_id.val(),
                    'client_id': sc_client_id.val(),
                    'local_id': sc_local_id.val(),
                    'address': sc_way_payment_id.val(),
                    'state': ((sc_amount.prop('checked')) ? 1 : 0),
                    'physical_location': ((sc_way_payment_id.prop('checked')) ? 1 : 0),
                    'users': users
                };

                var w_id = (sc_charges_id.val() == '') ? 0 : sc_charges_id.val();
                console.log(w_id);

                RESTService.updated('sales_charges/saveSalesCharges', w_id, params, function (response) {
                    if (!_.isUndefined(response.status) && response.status == true) {
                        console.log(response);
                        AlertFactory.textType({
                            title: '',
                            message: 'El Cobro de Ventas se guardó correctamente.',
                            type: 'success'
                        });
                        modalSC.modal('hide');
                        LoadRecordsButtonSalesCharges.click();
                    } else {
                        AlertFactory.textType({
                            title: '',
                            message: 'Hubo un error al guardar el  Cobro de Ventas. Intente nuevamente.',
                            type: 'error'
                        });
                    }
                });
            }

        };

        function ModalControlMonto(){
            overModals();
            $("#modalControlSaldo").modal('show');
            titleControlSaldo.html('Monto a Cobrar'); 
        }

        function addToSalesCharges(code, username, name)
        {
            if ($('#tr_b_' + code).length > 0) {
                AlertFactory.showWarning({
                    title: '',
                    message: 'Ya se asignó este Documento'
                });
                return false;
            }
            var tr = $('<tr id="tr_b_' + code + '"></tr>');
            var td1 = $('<td>' + username + '</td>');
            var tdu = $('<td>' + name + '</td>');
            var inp = $('<input type="hidden" class="sc_document" value="' + code + '" />');
            td1.append(inp);
            var td2 = $('<td class="text-center"></td>');
            var btn = $('<button class="btn btn-danger btn-xs delSalesCharges" data-id="' + code + '" type="button"><span class="fa fa-trash"></span></button>');
            td2.append(btn);
            tr.append(td1).append(tdu).append(td2);
            $("#sc_document_body").append(tr);
            $("#modalUsuario").modal('hide');

            $('.delSalesCharges').click(function (e) {
                var code = $(this).attr('data-id');
                AlertFactory.confirm({
                    title: '',
                    message: '¿Está seguro que desea quitar este Documento?',
                    confirm: 'Si',
                    cancel: 'No'
                }, function () {
                    $('#tr_b_' + code).remove();
                });
                e.preventDefault();
            });
        }

        var search = getFormSearch('frm-search-SalesCharges', 'search_SalesCharges', 'LoadRecordsButtonSalesCharges');

        var table_container_wa = $("#table_container_sales_charges");

        table_container_wa.jtable({
            title: "Lista de Cobros de Ventas",
            paging: true,
            sorting: true,
            actions: {
                    listAction: function (postData, jtParams) {
                    return {
                        "Result": "OK",
                        "Records": [
                            { "description": "ELECTROCENTRO SA","ruc":"10475835361","proyecto":"11231-PROYECTO PRUEBA","local":"LOCAL PRINCIPAL","Periodo_contable": "201703", "saldo": "4,456.00", "fecha_emision": "12/01/2017"},
                            { "description": "SYSTEM SA","ruc":"10475835364","proyecto":"11234-PROYECTO PRUEBA","local":"LOCAL PRINCIPAL","Periodo_contable": "201702", "saldo": "4,756.00", "fecha_emision": "12/02/2017"},
                            { "description": "CONSTRUCT SA","ruc":"10475835362","proyecto":"11232-PROYECTO PRUEBA","local":"LOCAL PRINCIPAL","Periodo_contable": "201701", "saldo": "3,656.00", "fecha_emision": "12/03/2017"},
                            { "description": "MALDONADO SA","ruc":"10475835365","proyecto":"11233-PROYECTO PRUEBA","local":"LOCAL PRINCIPAL","Periodo_contable": "201702", "saldo": "2,256.00", "fecha_emision": "12/04/2017"}
                        ],
                        "TotalRecordCount": 4
                    };
                  },
                deleteAction: base_url + '/sales_charges/delete',
            },
            toolbar: {
                items: [{
                    cssClass: 'buscador',
                    text: search
                }, {
                    cssClass: 'btn-primary',
                    text: '<i class="fa fa-file-excel-o"></i> Exportar a Excel',
                    click: function () {
                        window.open(base_url + '/sales_charges/excel');
                    }
                },
                    {
                        cssClass: 'btn-success',
                        text: '<i class="fa fa-plus"></i> Nuevo Cobros de Ventas',
                        click: function () {
                            newSalesCharges();
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
                    title: 'Cliente'
                },
                ruc: {
                    title: 'Ruc',
                    width: '4%'
                },
                proyecto: {
                    title: 'Proyecto',
                },
                local: {
                    title: 'Local',
                    width: '8%'
                },
                Periodo_contable: {
                    title: 'Periodo Contable',
                    width: '3%'
                },
                saldo:{
                    title: (show_list_) ? 'Monto Total': 'Total',
                    listClass: 'text-right',
                    width: '3%'
                },
                fecha_emision:{
                    title: 'Fecha',
                    listClass: 'text-center',
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
                    findSalesCharges(id);
                    e.preventDefault();
                });
            }
        });

        generateSearchForm('frm-search-SalesCharges', 'LoadRecordsButtonSalesCharges', function () {
            table_container_wa.jtable('load', {
                search: $('#search_SalesCharges').val()
            });
        }, true);

        var call_m = false;

        function callModals() {
            call_m = true;

            var search_c = getFormSearch('frm-search-client', 'search_client', 'LoadRecordsButtonClient');

            var table_container_c = $("#table_container_client");

            table_container_c.jtable({
                title: "Lista de Clientes",
                paging: true,
                sorting: true,
                actions: {
                    listAction: base_url + '/fronts/listClient'
                },
                toolbar: {
                    items: [{
                        cssClass: 'buscador',
                        text: search_c
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
                            return '<a href="javascript:void(0)" title="Seleccionar" class="select_c" data-code="' +
                                data.record.id + '" data-doc="' + data.record.Documento + '" data-name="' + data.record.RazonSocial +
                                '"><i class="fa fa-circle-o fa-1-5x"></i></a>';
                        }
                    }
                },
                recordsLoaded: function (event, data) {
                    $('.select_c').click(function (e) {
                        var code_c = $(this).attr('data-code');
                        var doc_c = $(this).attr('data-doc');
                        var name_c = $(this).attr('data-name');
                        sc_client_id.val(code_c);
                        sc_ruc.val(doc_c);
                        sc_client.val(name_c);
                        modalClient.modal('hide');                 
                        e.preventDefault();
                    });
                }   
            });
            generateSearchForm('frm-search-client', 'LoadRecordsButtonClient', function () {
                table_container_c.jtable('load', {
                    search: $('#search_client').val()
                });
            }, false);


            var search_fd = getFormSearch('frm-search-directbilling', 'search_directbilling', 'LoadRecordsButtonDirectbilling');

            var table_container_fd = $("#table_container_directbilling");

            table_container_fd.jtable({
                title: "Lista de Documentos",
                paging: true,
                sorting: true,
                actions: {
                 listAction: function (postData, jtParams) {
                    return {
                        "Result": "OK",
                        "Records": [
                            {"Comprobante": "FACTURA","numero":"001-0002","monto": "5000.00", "fecha": "12/01/2017"},
                            {"Comprobante": "FACTURA","numero":"001-0003","monto": "4000.00", "fecha": "13/01/2017"},
                            {"Comprobante": "FACTURA","numero":"001-0004","monto": "3000.00", "fecha": "12/10/2017"}
                        ],
                        "TotalRecordCount": 4
                    };
                },
                },
                toolbar: {
                    items: [{
                        cssClass: 'buscador',
                        text: search_fd
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
                        title: (show_list_) ? 'Tipo Comprobante' : 'Tipo Comp.'
                    },
                    numero: {
                        title: (show_list_) ? 'N° Comprobante' : 'N° Comp.'
                    },
                    monto: {
                        title: (show_list_) ? 'Monto Total' : 'Total',
                        listClass: 'text-right'
                    },
                    fecha: {
                        title: 'Fecha Emisión',
                        listClass:'text-center',
                        list: show_list_
                    },
                    select: {
                        width: '1%',
                        sorting: false,
                        edit: false,
                        create: false,
                        display: function (data) {
                            return '<a href="javascript:void(0)" title="Seleccionar" class="select_db" data-code="' +
                                data.record.id + '" data-doc="' + data.record.numero + '" data-name="' + data.record.RazonSocial +
                                '"><i class="checks'+data.record.id+' fa fa-circle-o fa-1-5x"></i></a>';
                        }
                    }
                },
                recordsLoaded: function (event, data) {
                    $('.select_db').click(function (e) {
                        var code = $(this).attr('data-code');
                       //$(".checks"+code).removeClass('fa-circle-o fa-1-5x');
                       //$(".checks"+code).addClass('fa-check-circle-o fa-1-5x');
                        ModalControlMonto(code);                     
                        e.preventDefault();
                    });
                }
            });
            generateSearchForm('frm-search-directbilling', 'LoadRecordsButtonDirectbilling', function () {
                table_container_fd.jtable('load', {
                    search: $('#search_directbilling').val()
                });
            }, false);

        }
    }

    function Config($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('sales_charges', {
                url: '/sales_charges',
                templateUrl: base_url + '/templates/sales_charges/base.html',
                controller: 'SalesChargesCtrl'
            });

        $urlRouterProvider.otherwise('/');
    }
})
();