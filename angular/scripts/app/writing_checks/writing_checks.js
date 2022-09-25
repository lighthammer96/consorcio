/**
 * Created by EVER on 4/17/2017.
 */
(function () {
    'use strict';
    angular.module('sys.app.writing_checks')
        .config(Config)
        .controller('WritingChecksCtrl', WritingChecksCtrl);

    Config.$inject = ['$stateProvider', '$urlRouterProvider'];
    WritingChecksCtrl.$inject = ['$scope', '_', 'RESTService', 'AlertFactory'];

    function WritingChecksCtrl($scope, _, RESTService, AlertFactory)
    {
        var modalW;
        var modalUser;
        var titleWar;
        var default_type = '';
        var w_user_body;
        var WritingChecks_id;
        var w_description;
        var w_code_internal;
        var w_type_id;
        var w_physical_location;
        var w_address;
        var w_state;

        function overModals() {
            modalW = $('#modalWC');
            titleWar = $('#title-wc');
            modalUser = $('#modalProyect');
            w_user_body = $("#w_user_body");
            WritingChecks_id = $("#WritingChecks_id");
            w_description = $('#w_description');
            w_code_internal = $("#w_code_internal");
            w_type_id = $("#w_type_id");
            w_physical_location = $("#w_physical_location");
            w_address = $("#w_address");
            w_state = $("#w_state");


            modalUser.on('hidden.bs.modal', function (e) {
                modalW.attr('style', 'display:block;');
            });
            modalUser.on('show.bs.modal', function (e) {
                modalW.attr('style', 'display:block; z-index:2030 !important');
            });
            modalW.on('hidden.bs.modal', function (e) {
                cleanWritingChecks();
            });
            if (!call_m) {
                callModals();
            }
        }

        function cleanWritingChecks() {
            titleWar.html('');
            WritingChecks_id.val('');
            w_description.val('');
            w_address.val('');
            w_code_internal.val('');
            w_state.prop('checked', false);
            w_physical_location.prop('checked', false);
            w_user_body.html('');
            activeTab('almacen');
        }

        function newWritingChecks() {
            overModals();
            modalW.modal('show');
            titleWar.html('Nuevo Emisión de Cheque');
        }


        $scope.openProyect = function () {
            $('#LoadRecordsButtonUser').click();
            modalUser.modal('show');
        };

/*        RESTService.all('writing_checks/data_form', '', function (response) {
            if (!_.isUndefined(response.status) && response.status == true) {
                _.each(response.types, function (item) {
                    if (default_type == '') default_type = item.Value;
                    $("#w_type_id").append('<option value="' + item.Value + '">' + item.DisplayText + '</option>');
                });
            }
        });*/

        function findWritingChecks(id) {
            overModals();
            titleWar.html('Editar Emisión de Cheque');
            modalW.modal('show');
/*            RESTService.get('writing_checks/find', id, function (response) {
                if (!_.isUndefined(response.status) && response.status == true) {
                    console.log(response);
                    var data_p = response.data;
                    WritingChecks_id.val(data_p.id);
                    var chk_state = (data_p.state == '1');
                    w_state.prop('checked', chk_state);
                    var chk_pl = (data_p.physical_location == '1');
                    w_physical_location.prop('checked', chk_pl);
                    w_description.val(data_p.description);
                    w_address.val(data_p.address);
                    w_code_internal.val(data_p.code_internal);
                    modalW.modal('show');
                    _.each(data_p.users, function (b) {
                        addToWritingChecks(b.id, b.username, b.name);

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


        $scope.saveWritingChecks = function () {
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
                    'id': WritingChecks_id.val(),
                    'code_internal': w_code_internal.val(),
                    'description': w_description.val(),
                    'type_id': w_type_id.val(),
                    'address': w_address.val(),
                    'state': ((w_state.prop('checked')) ? 1 : 0),
                    'physical_location': ((w_physical_location.prop('checked')) ? 1 : 0),
                    'users': users
                };

                var w_id = (WritingChecks_id.val() == '') ? 0 : WritingChecks_id.val();
                console.log(w_id);

                RESTService.updated('writing_checks/saveWritingChecks', w_id, params, function (response) {
                    if (!_.isUndefined(response.status) && response.status == true) {
                        console.log(response);
                        AlertFactory.textType({
                            title: '',
                            message: 'El Almacén se guardó correctamente.',
                            type: 'success'
                        });
                        modalW.modal('hide');
                        LoadRecordsButtonWritingChecks.click();
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

        function addToWritingChecks(code, username, name)
        {
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
            var inp = $('<input type="hidden" class="w_user" value="' + code + '" />');
            td1.append(inp);
            var td2 = $('<td class="text-center"></td>');
            var btn = $('<button class="btn btn-danger btn-xs delWritingChecks" data-id="' + code + '" type="button"><span class="fa fa-trash"></span></button>');
            td2.append(btn);
            tr.append(td1).append(tdu).append(td2);
            $("#w_user_body").append(tr);
            $("#modalUsuario").modal('hide');

            $('.delWritingChecks').click(function (e) {
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

        var search = getFormSearch('frm-search-WritingChecks', 'search_WritingChecks', 'LoadRecordsButtonWritingChecks');

        var table_container_wa = $("#table_container_writing_checks");

        table_container_wa.jtable({
            title: "Lista de Gestión de Emisión de Cheques",
            paging: true,
            sorting: true,
            actions: {
                    listAction: function (postData, jtParams) {
                    return {
                        "Result": "OK",
                        "Records": [
                            { "description": "CHEQUES  NEGOCIABLE","responsable":"LOPEZ GARCIA","proyecto":"CONEXIONES MASIVAS","cheque":"009299","banco":"CONTINENTAL","periodo": "201701","saldo": "8,456.00", "fecha_emision": "12/01/2017"},
                            { "description": "CHEQUES  NEGOCIABLE","responsable":"LOPEZ GARCIA","proyecto":"ENOSA_CONSORCIO SANTA CRUZ","cheque":"009299","banco":"BCP","periodo": "201702", "saldo": "9,756.00", "fecha_emision": "12/02/2017"},
                            { "description": "CHEQUES  NEGOCIABLE","responsable":"LOPEZ GARCIA","proyecto":"OI - EECOL-CERCADO","cheque":"009299","banco":"MI BANCO","periodo": "201703", "saldo": "12,656.00", "fecha_emision": "12/03/2017"},
                            { "description": "CHEQUES  NEGOCIABLE","responsable":"LOPEZ GARCIA","proyecto":" ENSA_CONSORCIO SAN JUDAS TADEO-SELVA","cheque":"009299","periodo": "201704","banco":"BCP", "saldo": "8,256.00", "fecha_emision": "12/04/2017"},
                        ],
                        "TotalRecordCount": 4
                    };
                  },
                deleteAction: base_url + '/writing_checks/delete',
            },
            toolbar: {
                items: [{
                    cssClass: 'buscador',
                    text: search
                }, {
                    cssClass: 'btn-primary',
                    text: '<i class="fa fa-file-excel-o"></i> Exportar a Excel',
                    click: function () {
                        window.open(base_url + '/writing_checks/excel');
                    }
                },
                    {
                        cssClass: 'btn-success',
                        text: '<i class="fa fa-plus"></i> Nuevo Emisión de Cheque',
                        click: function () {
                            newWritingChecks();
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
                    title: (show_list_) ? 'Forma de Ingreso' : 'Frm. Ingreso',
                    width: '8%'
                },
                proyecto: {
                    title: 'Proyecto'
                },
                responsable: {
                    title: 'Responsable',
                    width: '6%'
                },
                cheque: {
                    title: 'Cheque',
                    width: '3%'
                },
                banco: {
                    title: 'Banco',
                    width: '4%'
                },
                periodo:{
                    title:'Periodo Contable',
                    list: show_list_,
                    width: '3%'
                },
                fecha_emision:{
                    title:'Fecha',
                    listClass: 'text-center',
                    list: show_list_,
                    width: '3%'
                },
                saldo:{
                    title: (show_list_) ? 'Monto Total' : 'Total',
                    listClass:'text-right',
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
                    findWritingChecks(id);
                    e.preventDefault();
                });
            }
        });

        generateSearchForm('frm-search-WritingChecks', 'LoadRecordsButtonWritingChecks', function () {
            table_container_wa.jtable('load', {
                search: $('#search_WritingChecks').val()
            });
        }, true);

        var call_m = false;

        function callModals() {
            call_m = true;

            var search_u = getFormSearch('frm-search-proyect', 'search_proyect', 'LoadRecordsButtonProyect');

            var table_container_u = $("#table_container_proyect");

            table_container_u.jtable({
                title: "Lista de Proyectos",
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
                        title: 'Código'
                    },
                    name: {
                        title: 'Descripción'
                    },
                    select: {
                        width: '1%',
                        sorting: false,
                        edit: false,
                        create: false,
                        display: function (data) {
                            return '<a href="javascript:void(0)" title="Seleccionar" class="select_u" data-code="' +
                                data.record.id + '" data-title="' + data.record.username + '"data-name="' + data.record.name + '" ><i class="fa fa-check-circle-o fa-1-5x"></i></a>';
                        }
                    }
                },
                recordsLoaded: function (event, data) {
                    $('.select_u').click(function (e) {
                        var code = $(this).attr('data-code');
                        var username = $(this).attr('data-title');
                        var name = $(this).attr('data-name');
                        addToWritingChecks(code, username, name);
                        e.preventDefault();
                    });
                }
            });
            generateSearchForm('frm-search-proyect', 'LoadRecordsButtonProyect', function () {
                table_container_u.jtable('load', {
                    search: $('#search_proyect').val()
                });
            }, false);

        }
    }

    function Config($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('writing_checks', {
                url: '/writing_checks',
                templateUrl: base_url + '/templates/writing_checks/base.html',
                controller: 'WritingChecksCtrl'
            });

        $urlRouterProvider.otherwise('/');
    }
})
();