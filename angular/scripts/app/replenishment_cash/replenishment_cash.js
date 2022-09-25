/**
 * Created by EVER on 28/04/2017.
 */
(function () {
    'use strict';
    angular.module('sys.app.replenishment_cashs')
        .config(Config)
        .controller('ReplenishmentcashCtrl', ReplenishmentcashCtrl);

    Config.$inject = ['$stateProvider', '$urlRouterProvider'];

    ReplenishmentcashCtrl.$inject = ['$scope', '_', 'RESTService', '$rootScope', 'AlertFactory', 'Notify'];

    function ReplenishmentcashCtrl($scope, _, RESTService, $rootScope, AlertFactory, Notify) {

        var modalW;
        var modalDocument;
        var titleWar;
        var type_id;
        var default_type = '';
        var w_user_body;
        var Replenishmentcash_id;
        var w_description;
        var w_code_internal;
        var w_type_id;
        var w_physical_location;
        var w_address;
        var w_state;
        var modalCash;
        var modalProyect;
        var modalProvider;

        function overModals() {
            modalW = $('#modalRC');
            titleWar = $('#title-rc');
            modalDocument = $('#modalDocument');
            modalCash= $("#modalCash");
            modalProyect=$("#modalProyect");
            modalProvider=$("#modalProvider");
     
            w_user_body = $("#w_user_body");
            Replenishmentcash_id = $("#Replenishmentcash_id");
            w_description = $('#w_description');
            w_code_internal = $("#w_code_internal");
            w_type_id = $("#w_type_id");
            w_physical_location = $("#w_physical_location");
            w_address = $("#w_address");
            w_state = $("#w_state");


            modalDocument.on('hidden.bs.modal', function (e) {
                modalW.attr('style', 'display:block;');
            });
            modalDocument.on('show.bs.modal', function (e) {
                modalW.attr('style', 'display:block; z-index:2030 !important');
            });
           modalCash.on('hidden.bs.modal', function (e) {
                modalW.attr('style', 'display:block;');
            });
            modalCash.on('show.bs.modal', function (e) {
                modalW.attr('style', 'display:block; z-index:2030 !important');
            });
           modalProvider.on('hidden.bs.modal', function (e) {
                modalW.attr('style', 'display:block;');
            });
            modalProvider.on('show.bs.modal', function (e) {
                modalW.attr('style', 'display:block; z-index:2030 !important');
            });
            
            
            modalW.on('hidden.bs.modal', function (e) {
                cleanReplenishmentcash();
            });
            if (!call_m) {
                callModals();
            }
        }

        function cleanReplenishmentcash()
        {
            titleWar.html('');
            Replenishmentcash_id.val('');
            w_description.val('');
            w_address.val('');
            w_code_internal.val('');
            w_state.prop('checked', false);
            w_physical_location.prop('checked',false);
            w_user_body.html('');
            activeTab('almacen');
        }

        function newReplenishmentcash() {
            overModals();
            modalW.modal('show');
            titleWar.html('Nueva Reposición de Caja Chica');
        }


        $scope.openDocument = function () {
            //$('#LoadRecordsButtonUser').click();
            modalDocument.modal('show');
        };

        $scope.openCash = function () {
            //$('#LoadRecordsButtonUser').click();
            modalCash.modal('show');
        };
        
        $scope.openProyect = function () {
            //$('#LoadRecordsButtonUser').click();
            modalProyect.modal('show');
        };

        $scope.openProvider = function () {
            //$('#LoadRecordsButtonUser').click();
            modalProvider.modal('show');
        };


/*        RESTService.all('Replenishmentcashs/data_form', '', function (response) {
            if (!_.isUndefined(response.status) && response.status == true) {
                _.each(response.types, function (item) {
                    if (default_type == '') default_type = item.Value;
                    $("#w_type_id").append('<option value="' + item.Value + '">' + item.DisplayText + '</option>');
                });
            }
        });*/

    function findReplenishmentcash(id)
        {
            overModals();
             modalW.modal('show');
             titleWar.html('Editar Reposición de Caja Chica');
/*            titleWar.html('Editar Almacén');
            RESTService.get('Replenishmentcashs/find', id, function(response) {
                if (!_.isUndefined(response.status) && response.status == true) {
                    console.log(response);
                    var data_p = response.data;
                    Replenishmentcash_id.val(data_p.id);
                    var chk_state = (data_p.state == '1');
                    w_state.prop('checked', chk_state);
                    var chk_pl = (data_p.physical_location == '1');
                    w_physical_location.prop('checked', chk_pl);
                    w_description.val(data_p.description);
                    w_address.val(data_p.address);
                    w_code_internal.val(data_p.code_internal);

                    modalW.modal('show');
                    _.each(data_p.users, function(b) {
                        addToReplenishmentcash(b.id, b.username,b.name);

                    });
                } else {
                    AlertFactory.textType({
                        title: '',
                        message: 'Hubo un error al obtener el Usuario. Intente nuevamente.',
                        type: 'error'
                    });
                }
            });*/
        }


        $scope.saveReplenishmentcash = function () {
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
                    'id': Replenishmentcash_id.val(),
                    'code_internal': w_code_internal.val(),
                    'description': w_description.val(),
                    'type_id': w_type_id.val(),
                    'address': w_address.val(),
                    'state': ((w_state.prop('checked')) ? 1 : 0),
                    'physical_location': ((w_physical_location.prop('checked')) ? 1 : 0),
                    'users': users
                };

                var w_id = (Replenishmentcash_id.val() == '') ? 0 : Replenishmentcash_id.val();
                console.log(w_id);

                RESTService.updated('Replenishmentcashs/saveReplenishmentcash', w_id, params, function (response) {
                    if (!_.isUndefined(response.status) && response.status == true) {
                        console.log(response);
                        AlertFactory.textType({
                            title: '',
                            message: 'El Almacén se guardó correctamente.',
                            type: 'success'
                        });
                        modalW.modal('hide');
                        LoadRecordsButtonReplenishmentcash.click();
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

        function addToReplenishmentcash(code, username, name) {
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
            var btn = $('<button class="btn btn-danger btn-xs delReplenishmentcash" data-id="' + code + '" type="button"><span class="fa fa-trash"></span></button>');
            td2.append(btn);
            tr.append(td1).append(tdu).append(td2);
            $("#w_user_body").append(tr);
            $("#modalUsuario").modal('hide');

            $('.delReplenishmentcash').click(function (e) {
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

        var search = getFormSearch('frm-search-replenishmentcash', 'search_replenishmentcash', 'LoadRecordsButtonReplenishmentcash');

        var table_container_rc = $("#table_container_rc");

        table_container_rc.jtable({
            title: "Lista de reposición de Caja",
            paging: true,
            sorting: true,
            actions: {
                    listAction: function (postData, jtParams) {
                    return {
                        "Result": "OK",
                        "Records": [
                            { "description": "Caja chica morales","Responsable": "JUAN MESTANZA","proyecto":"6375471-PROYECTO PRUEBA","glosa":"POR 	ALAMBRADO ELECTRICO","cheque":"0000352", "saldo": "456.00", "fecha": "12/01/2017"},
                            { "description": "Caja chica Tarapoto","Responsable": "PEDRO DE LA CRUZ","proyecto":"7375473-PROYECTO PRUEBA","glosa":"POR 	ALUMBRADO ELECTRICO","cheque":"0000354", "saldo": "756.00", "fecha": "12/02/2017"},
                            { "description": "Caja chica Lima","Responsable": "FAUSTINO SANCHEXZ","proyecto":"8775473-PROYECTO PRUEBA","glosa":"POR CONSTRUCCION DE DUCTOS","cheque":"0000358", "saldo": "656.00", "fecha": "12/03/2017"},
                            { "description": "Caja chica Chiclayo","Responsable": "FIORELA GARCIA","proyecto":"5475472-PROYECTO PRUEBA","glosa":"POR 	TRANSPORTE DE MATERIALES","cheque":"0000356", "saldo": "256.00", "fecha": "12/04/2017"},
                        ],
                        "TotalRecordCount": 4
                    };
                  },
                  deleteAction: base_url + '/receptions/delete'
            },
            toolbar: {
                items: [{
                    cssClass: 'buscador',
                    text: search
                }, {
                    cssClass: 'btn-primary',
                    text: '<i class="fa fa-file-excel-o"></i> Exportar a Excel',
                    click: function () {
                        window.open(base_url + '/chexpensegirls/excel');
                    }
                },
                    {
                        cssClass: 'btn-success',
                        text: '<i class="fa fa-plus"></i> Nuevo Reposición de Caja Chica',
                        click: function () {
                            newReplenishmentcash();
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
                    title: 'Caja',
                    width: '7%'
                },
                Responsable: {
                    title: 'Responsable',
                    width: '7%'
                },
                proyecto: {
                    title: 'Proyecto'
                },
                glosa: {
                    title: 'Glosa'
                },
                cheque: {
                    title: 'Cheque',
                    width: '4%'
                },
                saldo:{
                    title:'Saldo',
                    listClass: 'text-right',
                    width: '4%'
                },
                fecha:{
                    title:'Fecha',
                    listClass: 'text-center',
                    width: '4%'
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
                    findReplenishmentcash(id);
                    e.preventDefault();
                });
            }
        });

        generateSearchForm('frm-search-replenishmentcash', 'LoadRecordsButtonReplenishmentcash', function () {
            table_container_rc.jtable('load', {
                search: $('#search_replenishmentcash').val()
            });
        }, true);

        var call_m = false;

        function callModals() {
            call_m = true;

            var search_u = getFormSearch('frm-search-cash', 'search_cash', 'LoadRecordsButtonCash');

            var table_container_c = $("#table_container_cash");

            table_container_c.jtable({
                title: "Lista de Cajas Chicas",
                paging: true,
                sorting: true,
                actions: {
                    listAction: function (postData, jtParams) {
                    return {
                        "Result": "OK",
                        "Records": [
                            { "description": "Caja chica morales"},
                            { "description": "Caja chica Tarapoto"},
                            { "description": "Caja chica Lima"},
                            { "description": "Caja chica Chiclayo"},
                        ],
                        "TotalRecordCount": 4
                    };
                  }
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
                    description: {
                        title: 'Caja'
                    },
                    select: {
                        width: '1%',
                        sorting: false,
                        edit: false,
                        create: false,
                        display: function (data) {
                            return '<a href="javascript:void(0)" title="Seleccionar" class="select_u" data-code="' +
                                data.record.id + '" data-title="' + data.record.username + '"data-name="' + data.record.name + '" ><i class="fa fa-circle-o fa-1-5x"></i></a>';
                        }
                    }
                },
                recordsLoaded: function (event, data) {
                    $('.select_u').click(function (e) {
                        var code = $(this).attr('data-code');
                        var username = $(this).attr('data-title');
                        var name = $(this).attr('data-name');
                        addToReplenishmentcash(code, username, name);
                        e.preventDefault();
                    });
                }
            });
            generateSearchForm('frm-search-cash', 'LoadRecordsButtonCash', function () {
                table_container_c.jtable('load', {
                    search: $('#search_cash').val()
                });
            },false);
        // proyecto

           var search_p = getFormSearch('frm-search-proyect', 'search_proyect', 'LoadRecordsButtonProyect');

            var table_container_c = $("#table_container_provider");

            table_container_c.jtable({
                title: "Lista de Proyectos",
                paging: true,
                sorting: true,
                actions: {
                    listAction: function (postData, jtParams) {
                    return {
                        "Result": "OK",
                        "Records": [
                            { "description": "Construción SA","code":"9875443"},
                            { "description": "Construccion de un puente","code":"6375471"},
                            { "description": "Enchapado de piso","code":"6375458"},
                            { "description": "Planos de puentes","code":"8375443"},
                        ],
                        "TotalRecordCount": 4
                    };
                  }
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
                    description: {
                        title: 'Proyecto'
                    },
                    code:{
                        title:'Código'
                    }
                    ,
                    select: {
                        width: '1%',
                        sorting: false,
                        edit: false,
                        create: false,
                        display: function (data) {
                            return '<a href="javascript:void(0)" title="Seleccionar" class="select_u" data-code="' +
                                data.record.id + '" data-title="' + data.record.username + '"data-name="' + data.record.name + '" ><i class="fa fa-circle-o fa-1-5x"></i></a>';
                        }
                    }
                },
                recordsLoaded: function (event, data) {
                    $('.select_u').click(function (e) {
                        var code = $(this).attr('data-code');
                        var username = $(this).attr('data-title');
                        var name = $(this).attr('data-name');
                        addToReplenishmentcash(code, username, name);
                        e.preventDefault();
                    });
                }
            });
            generateSearchForm('frm-search-cash', 'LoadRecordsButtonCash', function () {
                table_container_c.jtable('load', {
                    search: $('#search_cash').val()
                });
            },false);
           // proveedor

         var search_p = getFormSearch('frm-search-provider', 'search_provider', 'LoadRecordsButtonProvider');

            var table_container_pr = $("#table_container_providerd");

            table_container_pr.jtable({
                title: "Lista de Proveedor",
                paging: true,
                sorting: true,
                actions: {
                    listAction: function (postData, jtParams) {
                    return {
                        "Result": "OK",
                        "Records": [
                            { "razon_social": "Construción SA","ruc":"35946576892"},
                            { "razon_social": "Solución SA","ruc":"45946576891"},
                            { "razon_social": "Peralta S.R.L","ruc":"64946576865"},
                        ],
                        "TotalRecordCount": 4
                    };
                  }
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
                    razon_social: {
                        title: 'Razón Social'
                    },
                    ruc:{
                        title:'Ruc'
                    }
                    ,
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
                        addToReplenishmentcash(code, username, name);
                        e.preventDefault();
                    });
                }
            });

            generateSearchForm('frm-search-provider', 'LoadRecordsButtonProvider', function () {
                table_container_pr.jtable('load', {
                    search: $('#search_provider').val()
                });
            },false);
        }
    }

    function Config($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('replenishment_cashs', {
                url: '/replenishment_cashs',
                templateUrl: base_url + '/templates/replenishment_cashs/base.html',
                controller: 'ReplenishmentcashCtrl'
            });

        $urlRouterProvider.otherwise('/');
    }
})
();