/**
 * Created by JAIR on 4/17/2017.
 */
(function () { 
    'use strict';
    angular.module('sys.app.warehouses')
        .config(Config)
        .controller('WarehouseCtrl', WarehouseCtrl);

    Config.$inject = ['$stateProvider', '$urlRouterProvider'];
    WarehouseCtrl.$inject = ['$scope', '_', 'RESTService', 'AlertFactory'];

    function WarehouseCtrl($scope, _, RESTService, AlertFactory)
    {
        var modalW;
        var modalUser;
        var titleWar;
        var w_user_body;
        var warehouse_id;
        var w_description;
        var w_code_internal;
        var w_type_id;
        var w_physical_location;
        var w_address;
        var w_state;
        var w_project_id;
        var w_project_code;
        var w_project_description;
        var w_local;
        var state_local;
        var state_state;
        var modalProject;

        var w_description_localizacion;
        var w_code_localizacion;
        var p_state_localizacion;
        var p_loc_text;
        var w_tienda_body ;
        var cod_localizacion_delete=[];//array de id eliminados

        $scope.chkState = function () {
            var txt_state = (w_physical_location.prop('checked')) ? 'Si' : 'No';
            state_local.html(txt_state);
            var txt_state2 = (w_state.prop('checked')) ? 'Activo' : 'Inactivo';
            state_state.html(txt_state2);
            var txt_state3 = (p_state_localizacion.prop('checked')) ? 'Activo' : 'Inactivo';
            p_loc_text.html(txt_state3);
        };

        function overModals() {
            if (!call_m) {
                modalW = $('#modalWA');
                titleWar = $('#title-war');
                modalUser = $('#modalUsuario');
                w_user_body = $("#w_user_body");
                warehouse_id = $("#warehouse_id");
                w_description = $('#w_description');
                w_code_internal = $("#w_code_internal");
                w_type_id = $("#w_type_id");
                w_physical_location = $("#w_physical_location");
                w_address = $("#w_address");
                w_state = $("#w_state");
                w_local = $("#w_local");
                w_project_id = $("#w_project_id");
                w_project_code = $("#w_project_code");
                w_project_description = $("#w_project_description");
                modalProject = $("#modalProject");

                w_description_localizacion=$("#w_description_localizacion");
                w_code_localizacion=$("#w_code_localizacion");
                p_state_localizacion=$("#p_state_localizacion");
                p_loc_text=$("#p_loc_text");
                w_tienda_body=$("#w_tienda_body");
                state_local = $('#state_local');
                state_state = $('#state_state');

                modalUser.on('hidden.bs.modal', function (e) {
                    modalW.attr('style', 'display:block;');
                });
                modalUser.on('show.bs.modal', function (e) {
                    modalW.attr('style', 'display:block; z-index:2030 !important');
                });
                modalProject.on('hidden.bs.modal', function (e) {
                    modalW.attr('style', 'display:block;');
                });
                modalProject.on('show.bs.modal', function (e) {
                    modalW.attr('style', 'display:block; z-index:2030 !important');
                });

                modalW.on('hidden.bs.modal', function (e) {
                    cleanWarehouse();
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


         function cleanLoca(){
                w_description_localizacion=$("#w_description_localizacion");
                w_code_localizacion=$("#w_code_localizacion");
                p_state_localizacion=$("#p_state_localizacion");
                p_loc_text=$("#p_loc_text");
                w_description_localizacion.val('');
                w_code_localizacion.val('');
                p_state_localizacion.prop('checked', true).iCheck('update');
                $scope.chkState();

         }   
        function cleanWarehouse() {
            cleanRequired();
            titleWar.html('');
            warehouse_id.val('');
            w_description.val('');
            w_address.val('');
            w_project_code.val('');
            w_project_description.val('');
            w_local.val('');
            w_code_internal.val('');
            w_state.prop('checked', true).iCheck('update');
            w_physical_location.prop('checked', true).iCheck('update');
            p_state_localizacion.prop('checked', true).iCheck('update');
            $scope.chkState();
            w_user_body.html('');

            w_description_localizacion.val('');
            w_code_localizacion.val('');
            w_tienda_body.html('');
            cod_localizacion_delete=[];
            activeTab('almacen');
        }

        function newWarehouse() {
            overModals();
            modalW.modal('show');
            titleWar.html('Nuevo Almacén');
        }

       
        $scope.openUser = function () {
            $('#LoadRecordsButtonUser').click();
            modalUser.modal('show');
        };

        $scope.AgregarLocaliza = function () {
            var bval = true;
            bval = bval && w_code_localizacion.required();
            bval = bval && w_description_localizacion.required();
            if(bval){
                w_code_localizacion=$("#w_code_localizacion").val();
                w_description_localizacion=$("#w_description_localizacion").val();
                p_state_localizacion= ((p_state_localizacion.prop('checked')) ? 'A' : 'I');
                var codigo=Math.random().toString(36).substr(2, 18);
                var codigoLocali='N';//PARA VERIFICAR SI ES UN NUEVA LOCALIZACION
                addToLoca(codigo,w_code_localizacion,w_description_localizacion,p_state_localizacion,codigoLocali);
            }
        };

        function addToLoca(codigo,code, username, estado,codigoLocali) {
            console.log(code);
            var estado_t="";
            if(estado=="I"){
                estado_t="Inactivo";
            }else{
                estado_t="Activo";
            };
            var tr = $('<tr id="tr_loca_' + codigo + '"></tr>');
            var td1 = $('<td>' + code + '</td>');
            var td2 = $('<td>' + username + '</td>');
            var td3 = $('<td>' + estado_t + '</td>');
            var inpcodigo = $('<input type="hidden" class="idLocalizacion_v" value="' + codigoLocali + '" />');
            var inp = $('<input type="hidden" class="w_locali_co" value="' + code + '" />');
            var inp2 = $('<input type="hidden" class="w_locali_des" value="' + username + '" />');
            var inp3 = $('<input type="hidden" class="w_locali_est" value="' + estado + '" />');
            td1.append(inp).append(inpcodigo);
            td2.append(inp2);
            td3.append(inp3);
            var td4 = $('<td class="text-center"></td>');
            var btn = $('<button class="btn btn-danger btn-xs delWarehouseLoca" data-id="' + codigo + '" type="button"><span class="fa fa-trash"></span></button>');
            td4.append(btn);
            tr.append(td1).append(td2).append(td3).append(td4);
            w_tienda_body.append(tr);
            cleanLoca();
            $('.delWarehouseLoca').click(function (e) {
                var code = $(this).attr('data-id');
                AlertFactory.confirm({
                    title: '',
                    message: '¿Está seguro que desea quitar esta localización?',
                    confirm: 'Si',
                    cancel: 'No'
                }, function () {
                    $('#tr_loca_' + code).remove(); 
                    cod_localizacion_delete.push(code);
                    console.log(cod_localizacion_delete);

                });
                e.preventDefault();
            });
        }

        $scope.openProject = function () {
            $('#LoadRecordsButtonProject').click();
            modalProject.modal('show');
        };

        function findWarehouse(id) {
            overModals();
            titleWar.html('Editar Almacén');
            RESTService.get('warehouses/find', id, function (response) {
                if (!_.isUndefined(response.status) && response.status) {
                    var data_p = response.data;
                    warehouse_id.val(data_p.id);
                    w_type_id.val(data_p.type_id);
                    // w_project_id.val(data_p.project_id);
                    var chk_state = (data_p.state == '1');
                    w_state.prop('checked', chk_state).iCheck('update');
                    var chk_pl = (data_p.physical_location == '1');
                    w_physical_location.prop('checked', chk_pl).iCheck('update');
                    $scope.chkState();
                    w_description.val(data_p.description);
                    w_address.val(data_p.address);
                    w_local.val(data_p.local);
                    w_code_internal.val(data_p.code_internal);
                    w_project_code.val(data_p.idTienda);
                    w_project_description.val(data_p.Tienda);
                    modalW.modal('show');
                    _.each(data_p.users, function (b) {
                        addToWarehouse(b.id, b.username, b.name);
                    });

                    _.each(data_p.localizacion, function (c) {
                        addToLoca(c.idLocalizacion,c.codigo, c.descripcion, c.estado,c.idLocalizacion);
                    });
                } else {
                    AlertFactory.textType({
                        title: '',
                        message: 'Hubo un error al obtener el almacén. Intente nuevamente.',
                        type: 'error'
                    });
                }
            });
        }

        $scope.saveWarehouse = function () {
            var bval = true;
            bval = bval && w_description.required();
            bval = bval && w_code_internal.required();
            bval = bval && w_address.required();
            bval = bval && w_local.required();
            activeTab('almacen');
            if (bval && w_project_description.val() === '' ) {
                AlertFactory.showWarning({
                    title: '',
                    message: 'Debe agregar una Tienda  para el almacén'
                });
                activeTab('almacen');
                return false;
            }
            if (bval && w_user_body.html() === '' ) {
                AlertFactory.showWarning({
                    title: '',
                    message: 'Debe agregar mínimo 1 usuario para el almacén'
                });
                activeTab('usuario');
                return false;
            }
            if (bval && w_tienda_body.html() === '' ) {
                AlertFactory.showWarning({
                    title: '',
                    message: 'Debe agregar mínimo 1 localización para el almacén'
                });
                activeTab('localizacion');
                return false;
            }
             
            if (bval) {
                var users = [];
                $.each($('.w_user'), function (idx, item) {
                    users[idx] = $(item).val();
                });
                users = users.join(',');

                var loca_codigo =[];
                $.each($('.w_locali_co'), function (idx, item) {
                    loca_codigo[idx] = $(item).val();
                });
                loca_codigo = loca_codigo.join(',');


                var idLocalizacion_v =[];
                $.each($('.idLocalizacion_v'), function (idx, item) {
                    idLocalizacion_v[idx] = $(item).val();
                });
                
                idLocalizacion_v = idLocalizacion_v.join(',');



                var loca_descr =[];
                $.each($('.w_locali_des'), function (idx, item) {
                    loca_descr[idx] = $(item).val();
                });
                loca_descr = loca_descr.join(',');

                 var loca_esta =[];
                $.each($('.w_locali_est'), function (idx, item) {
                    loca_esta[idx] = $(item).val();
                });
                loca_esta = loca_esta.join(',');
                console.log(users);
                console.log(loca_codigo);
                console.log(loca_descr);
                console.log(loca_esta);
                var params = {
                    'id': warehouse_id.val(),
                    'code_internal': w_code_internal.val(),
                    'description': w_description.val(),
                    'type_id': w_type_id.val(),
                    'project_id': w_project_id.val(),
                    'address': w_address.val(),
                    'state': ((w_state.prop('checked')) ? 1 : 0),
                    'physical_location': ((w_physical_location.prop('checked')) ? 1 : 0),
                    'idTienda': w_project_code.val(),
                    'users': users,
                    'local_codigo': loca_codigo,
                    'local_descripcion': loca_descr,
                    'local_estado': loca_esta,
                    'idLocalizacion_v':idLocalizacion_v,
                    'id_delete':cod_localizacion_delete,
                   
                };
                var w_id = (warehouse_id.val() === '') ? 0 : warehouse_id.val();

                RESTService.updated('warehouses/saveWarehouse', w_id, params, function (response) {
                    if (!_.isUndefined(response.status) && response.status) {
                        AlertFactory.textType({
                            title: '',
                            message: 'El Almacén se guardó correctamente.',
                            type: 'success'
                        });
                        modalW.modal('hide');
                        console.log(response.cont);
                        LoadRecordsButtonWarehouse.click();
                    } else {
                        var msg_ = (_.isUndefined(response.message)) ?
                            'No se pudo guardar el Almacén. Intente nuevamente.' : response.message;
                        AlertFactory.textType({
                            title: '',
                            message: msg_,
                            type: 'error'
                        });
                    }
                });
            }
        };

        function addToWarehouse(code, username, name) {
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
            var btn = $('<button class="btn btn-danger btn-xs delWarehouse" data-id="' + code + '" type="button"><span class="fa fa-trash"></span></button>');
            td2.append(btn);
            tr.append(td1).append(tdu).append(td2);
            w_user_body.append(tr);
            modalUser.modal('hide');

            $('.delWarehouse').click(function (e) {
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

        var search = getFormSearch('frm-search-warehouse', 'search_warehouse', 'LoadRecordsButtonWarehouse');

        var table_container_wa = $("#table_container_warehouse");

        table_container_wa.jtable({
            title: "Lista de Almacenes",
            paging: true,
            sorting: true,
            actions: {
                listAction: base_url + '/warehouses/list',
                deleteAction: base_url + '/warehouses/delete'
            },
            toolbar: {
                items: [{
                    cssClass: 'buscador',
                    text: search
                }, {
                    cssClass: 'btn-primary',
                    text: '<i class="fa fa-file-excel-o"></i> Exportar a Excel',
                    click: function () {
                        $scope.openDoc('warehouses/excel', {});
                    }
                }, {
                    cssClass: 'btn-danger-admin',
                    text: '<i class="fa fa-plus"></i> Nuevo Almacén',
                    click: function () {
                        newWarehouse();
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
                    title: 'Almacén'
                },
                code_internal: {
                    title: 'Código Interno'
                },
                type_id: {
                    title: 'Tipo',
                    options: {1: 'CONSUMO', 2: 'VENTA'},
                    list: show_list_
                },
                address: {
                    title: 'Dirección',
                    list: show_list_
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
                        return '<a href="javascript:void(0)" title="Editar" class="edit_w" data-code="' +
                            data.record.id + '"><i class="fa fa-pencil-square-o fa-1-5x fa-green"></i></a>';
                    }
                }
            },
            recordsLoaded: function (event, data) {
                $('.edit_w').click(function (e) {
                    var id = $(this).attr('data-code');
                    findWarehouse(id);
                    e.preventDefault();
                });
            }
        });

        generateSearchForm('frm-search-warehouse', 'LoadRecordsButtonWarehouse', function () {
            table_container_wa.jtable('load', {
                search: $('#search_warehouse').val()
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
                            return '<a href="javascript:void(0)" title="Seleccionar" class="select_u" data-code="' +
                                data.record.id + '" data-title="' + data.record.username + '"data-name="' + data.record.name +
                                '" ><i class="fa fa-' + icon_select + ' fa-1-5x"></i></a>';
                        }
                    }
                },
                recordsLoaded: function (event, data) {
                    $('.select_u').click(function (e) {
                        var code = $(this).attr('data-code');
                        var username = $(this).attr('data-title');
                        var name = $(this).attr('data-name');
                        addToWarehouse(code, username, name);
                        e.preventDefault();
                    });
                }
            });
            generateSearchForm('frm-search-user', 'LoadRecordsButtonUser', function () {
                table_container_u.jtable('load', {
                    search: $('#search_user').val()
                });
            }, false);

            // project
            var search_p = getFormSearch('frm-search-project', 'search_tienda', 'LoadRecordsButtonProject');

            var table_container_p = $("#table_container_p");

            table_container_p.jtable({
                title: "Lista de Tiendas",
                paging: true,
                sorting: true,
                actions: {
                     listAction: base_url +'/warehouses/getTiendasSelec'
                },
                toolbar: {
                    items: [{
                        cssClass: 'buscador',
                        text: search_p
                    }]
                },
                fields: {
                    idTienda: {
                        title: 'Código',
                        width: '5%',
                        key: true,
                        create: false,
                        edit: false,
                        list: false
                    },
                    Tienda: {
                        title: 'Tienda',
                    },
                    select: {
                        width: '1%',
                        sorting: false,
                        edit: false,
                        create: false,
                        listClass: 'text-center',
                        display: function (data) {
                            return '<a href="javascript:void(0)" title="Seleccionar" class="select_p"  data-name="'+
                            data.record.Tienda+'" data-code="'+data.record.idTienda+'" ><i class="fa fa-' +
                                icon_select + ' fa-1-5x"></i></a>';
                        }
                    }
                },
                recordsLoaded: function (event, data) {
                    $('.select_p').click(function (e) {
                            var code = $(this).attr('data-code');
                            var name_cc = $(this).attr('data-name');
                            w_project_code.val(code);
                            w_project_description.val(name_cc);
                            modalProject.modal('hide');
                            e.preventDefault();
                    });
                }
            });
            generateSearchForm('frm-search-project', 'LoadRecordsButtonProject', function () {
                table_container_p.jtable('load', {
                    search: $('#search_tienda').val()
                });
            }, false);

        }
    }

    function Config($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('warehouses', {
                url: '/warehouses',
                templateUrl: base_url + '/templates/warehouses/base.html',
                controller: 'WarehouseCtrl'
            });

        $urlRouterProvider.otherwise('/');
    }
})
();