/**
 * Created by JAIR on 4/5/2017.
 */
  
(function () {
    'use strict';
    angular.module('sys.app.categories')
        .config(Config)
        .controller('OperationCtrl', OperationCtrl);

    Config.$inject = ['$stateProvider', '$urlRouterProvider'];
    OperationCtrl.$inject = ['$scope' ,'_', 'RESTService', 'AlertFactory'];

    function OperationCtrl($scope, _, RESTService, AlertFactory)
    {
        var titleModalOperacion = $('#titleModalOperacion');
        var modaOperacion = $('#modaOperacion');
        var state_text = $('#state_text');
        var p_state = $('#p_state');
        var idTipoOperacion = $('#idTipoOperacion');
        var descripcion = $('#descripcion');
        var idNaturaleza = $('#idNaturaleza');

        var w_usuario_detalle=$("#w_usuario_detalle");
        var modalUsuario=$("#modalUsuario");
        $('.i-checks').iCheck({
            checkboxClass: 'icheckbox_square-green'
        }).on('ifChanged', function (event) {
            $(event.target).click();
            $scope.chkState();
        });

        function cleanOperacion () {
            cleanRequired();
            titleModalOperacion.html('');
            p_state.prop('checked', true).iCheck('update');
            state_text.html('Activo');
            w_usuario_detalle.html('');
            descripcion.val('');
            idNaturaleza.val('').trigger('change');
            modaOperacion.val('');
            idTipoOperacion.val('');
        }

        $scope.saveOperacion = function()
        {   
            var bval = true;
            bval = bval && descripcion.required();
            bval = bval && idNaturaleza.required();
            if(bval){
                if (w_usuario_detalle.html() === ''){
                    var params = {
                    'idTipoOperacion': idTipoOperacion.val(),
                    'descripcion': descripcion.val(),
                    'estado': ((p_state.prop('checked')) ? 'A' : 'I'),
                    'idNaturaleza':idNaturaleza.val(),
                   };
                }else{
                    var users = [];
                    $.each($('.w_user'), function (idx, item) {
                    users[idx] = $(item).val();
                     });
                    users = users.join(',');
                    var params = {
                   'idTipoOperacion': idTipoOperacion.val(),
                    'descripcion': descripcion.val(),
                    'estado': ((p_state.prop('checked')) ? 'A' : 'I'),
                    'idNaturaleza':idNaturaleza.val(),
                    'users': users,
                   };

                }
                var w_id = (idTipoOperacion.val() === '') ? 0 : idTipoOperacion.val();
                RESTService.updated('operations/saveOperacion', w_id, params, function (response) {
                    if (!_.isUndefined(response.status) && response.status) {
                        AlertFactory.textType({
                            title: '',
                            message: 'La Operación se guardó correctamente.',
                            type: 'success'
                        });
                        modaOperacion.modal('hide');
                        LoadRecordsButtonOperation.click();
                    } else {
                        var msg_ = (_.isUndefined(response.message)) ?
                            'Hubo un error al guardar La Operación. Intente nuevamente.' : response.message;
                        AlertFactory.textType({
                            title: '',
                            message: msg_,
                            type: 'error'
                        });
                    }
                });
            }

        }
        $scope.addDetalleUsuario = function()
        {   
            var bval = true;
            bval = bval && descripcion.required();
            bval = bval && idNaturaleza.required();

            if(bval){

                modalUsuario.modal('show');
                $('#search_cc2').val('');
                $('#LoadRecordsButtonCC2').click();
            }

        }

         $scope.chkState = function () {
            var txt_state = (p_state.prop('checked')) ? 'Activo' : 'Inactivo';
            state_text.html(txt_state);
        };

        function newOperacion()
        {
            titleModalOperacion.html('Nuevo Tipo de Operación');
            modaOperacion.modal('show');
        }
          modaOperacion.on('hidden.bs.modal', function (e) {
            cleanOperacion();
        });

         function addToUser(code, username, name) {
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
            var btn = $('<button class="btn btn-danger btn-xs delOperation" data-id="' + code + '" type="button"><span class="fa fa-trash"></span></button>');
            td2.append(btn);
            tr.append(td1).append(tdu).append(td2);
            w_usuario_detalle.append(tr);
            modalUsuario.modal('hide');

            $('.delOperation').click(function (e) {
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
        function findOperation(id) {
         
            titleModalOperacion.html('Editar Tipo Operacion');
            RESTService.get('operations/find', id, function (response) {
                if (!_.isUndefined(response.status) && response.status) {
                    var data_p = response.data;
                    console.log(data_p);
                    idTipoOperacion.val(data_p.idTipoOperacion);
                    descripcion.val(data_p.descripcion);
                    idNaturaleza.val(data_p.idNaturaleza).trigger('change');
                    var chk_state = (data_p.estado == 'A');
                    p_state.prop('checked', chk_state).iCheck('update');
                    $scope.chkState();
                    if(data_p.users!=[]){
                         _.each(data_p.users, function (b) {
                            addToUser(b.id, b.username, b.name);
                        });
                    }
                    modaOperacion.modal('show');
                   
                   
                } else {
                    AlertFactory.textType({
                        title: '',
                        message: 'Hubo un error al obtener el Grupo Contable. Intente nuevamente.',
                        type: 'error'
                    });
                }
            });
        }
        var search = getFormSearch('frm-search-Operation', 'search_b', 'LoadRecordsButtonOperation');

        var table_container_Operation = $("#table_container_Operation");

        table_container_Operation.jtable({
            title: "Lista de Tipos de Operaciones",
            paging: true,
            sorting: true,
            actions: { 
                listAction: base_url + '/operations/list',
                deleteAction: base_url + '/operations/delete',
            },
            toolbar: {
                items: [{
                    cssClass: 'buscador',
                    text: search
                },{
                    cssClass: 'btn-primary',
                    text: '<i class="fa fa-file-excel-o"></i> Exportar a Excel',
                    click: function () {
                        $scope.openDoc('operations/excel', {});
                    }
                }, {
                    cssClass: 'btn-danger-admin',
                    text: '<i class="fa fa-plus"></i> Nuevo Tipo de Operación',
                    click: function () {
                        newOperacion();
                    }
                }
                ]
            },
            fields: {
                idTipoOperacion: {
                    key: true,
                    create: false,
                    edit: false,
                    list: false
                },
                Operacion: {
                    title: 'Tipo de Operación',
                     

                }, 
                idNaturaleza: {
                    title: 'Naturaleza',
                    options: base_url + '/operations/getNaturaleza'

                },
                estado: {
                    title: 'Estado',
                    values: { 'I': 'Inactivo', 'A': 'Activo' },
                    type: 'checkbox',
                     defaultValue: 'A',
                   
                }, edit: {
                    width: '1%',
                    sorting: false,
                    edit: false,
                    create: false,
                    listClass: 'text-center',
                    display: function (data) {
                        return '<a href="javascript:void(0)" title="Editar" class="edit_Opera" data-code="' +
                            data.record.idTipoOperacion + '"><i class="fa fa-pencil-square-o fa-1-5x fa-green"></i></a>';
                    }
                }

            },
            recordsLoaded: function (event, data) {
                $('.edit_Opera').click(function (e) {
                    var id = $(this).attr('data-code');
                    findOperation(id);
                    e.preventDefault();
                });
            }
        });

        generateSearchForm('frm-search-Operation', 'LoadRecordsButtonOperation', function(){
            table_container_Operation.jtable('load', {
                search: $('#search_b').val()
            });
        }, true);

        var search_cc2 = getFormSearch('frm-search-cc2', 'search_cc2', 'LoadRecordsButtonCC2');
        var table_container_cc2 = $("#table_container_ccUsuarios");         
         table_container_cc2.jtable({
            title: "Lista de Usuarios",
            paging: true,
            sorting: true,
            actions: {
                 listAction: base_url+'/operations/listUser'
            },
            toolbar: {
                items: [{
                    cssClass: 'buscador',
                    text: search_cc2
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
                        addToUser(code, username, name);
                        e.preventDefault();
                    });
                }
        });

        generateSearchForm('frm-search-cc2', 'LoadRecordsButtonCC2', function(){
            table_container_cc2.jtable('load', {
                search: $('#search_cc2').val()
            });
        }, false);

        function getDataForm () {
            RESTService.all('operations/data_form', '', function(response) {
                if (!_.isUndefined(response.status) && response.status) {
                     idNaturaleza.append('<option value="" selected>Seleccionar</option>');
                    _.each(response.datos, function(item) {
                        idNaturaleza.append('<option value="'+item.Value+'">'+item.DisplayText+'</option>');
                    });
                }
            }, function() {
                getDataForm();
            });
        }
        getDataForm();
    }

    function Config($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('operations', {
                url: '/operations',
                templateUrl: base_url + '/templates/operations/base.html',
                controller: 'OperationCtrl'
            });

        $urlRouterProvider.otherwise('/');
    }
})
();