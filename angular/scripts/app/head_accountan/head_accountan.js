/**
 * Created by JAIR on 4/5/2017.
 */
  
(function () {
    'use strict';
    angular.module('sys.app.head_accountans')
        .config(Config)
        .controller('Head_AccountanCtrl', Head_AccountanCtrl);

    Config.$inject = ['$stateProvider', '$urlRouterProvider'];
    Head_AccountanCtrl.$inject = ['$scope', '_', 'RESTService','AlertFactory'];

    function Head_AccountanCtrl($scope,_, RESTService ,AlertFactory)
    {   

        var modalGrupoContable = $('#modalGrupoContable');
        var titleModalGrupoContable = $('#titleModalGrupoContable');
        var p_state = $('#p_state');
        var state_text = $('#state_text');
        var grupoContable=$("#grupoContable");
        var modalDetalle=$("#modalDetalle");
        var id_operacion=$("#id_operacion");
        var w_contable_detalle=$("#w_contable_detalle");
        var grupoContable=$("#grupoContable");
        var grupoContableDeta=$("#grupoContableDeta");
        var centrocosto=$("#centrocosto");
        var cuenta=$("#cuenta");
        var id_operacion=$("#id_operacion");
        var grupoContable_id=$("#grupoContable_id");
        var identDetalle=$("#identDetalle");
        var idDetalle_Delete=[];

        $('.i-checks').iCheck({
            checkboxClass: 'icheckbox_square-green'
        }).on('ifChanged', function (event) {
            $(event.target).click();
            $scope.chkState();
        });
        $scope.chkState = function() {
            var txt = (p_state.prop('checked')) ? 'Activo' : 'Inactivo';
            state_text.html(txt);
        };

        function cleanGrupoContable () {
            cleanRequired();
            titleModalGrupoContable.html('');
            p_state.prop('checked', true).iCheck('update');
            state_text.html('Activo');
            w_contable_detalle.html('');
            grupoContable.val('');
            identDetalle.val('');
            grupoContable_id.val('');
            idDetalle_Delete=[];
        }
         function cleanGrupoContableDeta () {
            cleanRequired();
            centrocosto.val('');
            cuenta.val('');
            
            id_operacion.val('').trigger('change');
        }
        modalGrupoContable.on('hidden.bs.modal', function (e) {
            cleanGrupoContable();
        });
        modalDetalle.on('hidden.bs.modal', function (e) {
            cleanGrupoContableDeta();
        });
        function newGrupoContable()
        {
            titleModalGrupoContable.html('Nuevo Grupo Contable');
            modalGrupoContable.modal('show');
        }

        $scope.addDetalle = function()
        {   
            var bval = true;
            bval = bval && grupoContable.required();
            if(bval){

                modalDetalle.modal('show');
            }

        }
        $scope.saveGrupoContable = function()
        {   
            var bval = true;
            bval = bval && grupoContable.required();
            if(bval){

                 

                if (w_contable_detalle.html() === ''){
                    var params = {
                    'idGrupoContableCabecera': grupoContable_id.val(),
                    'descripcion': grupoContable.val(),
                    'estado': ((p_state.prop('checked')) ? 'A' : 'I'),
                    'idDetalle_Delete':idDetalle_Delete,
                    // 'idTienda': w_project_code.val(),
                    // 'users': users,
                    // 'local_codigo': loca_codigo,
                    // 'local_descripcion': loca_descr,
                    // 'local_estado': loca_esta,
                   };
                }else{
                    var codigo_operacion =[];
                    $.each($('.w_idOperacion'), function (idx, item) {
                        codigo_operacion[idx] = $(item).val();
                    });
                    codigo_operacion = codigo_operacion.join(',');

                    var d_cuenta =[];
                    $.each($('.w_cuenta'), function (idx, item) {
                        d_cuenta[idx] = $(item).val();
                    });
                    d_cuenta = d_cuenta.join(',');

                     var d_centro_costo =[];
                    $.each($('.w_centrocosto'), function (idx, item) {
                        d_centro_costo[idx] = $(item).val();
                    });
                    d_centro_costo = d_centro_costo.join(',');
                    var params = {
                    'idGrupoContableCabecera': grupoContable_id.val(),
                    'descripcion': grupoContable.val(),
                    'estado': ((p_state.prop('checked')) ? 'A' : 'I'),
                    'contable_idoperacion': codigo_operacion,
                    'contable_cuenta': d_cuenta,
                    'contable_centrocosto': d_centro_costo,
                    'idDetalle_Delete':idDetalle_Delete,
                   };

                }
                var w_id = (grupoContable_id.val() === '') ? 0 : grupoContable_id.val();
                RESTService.updated('head_accountans/saveGrupoContable', w_id, params, function (response) {
                    if (!_.isUndefined(response.status) && response.status) {
                        AlertFactory.textType({
                            title: '',
                            message: 'El Grupo Contable se guardó correctamente.',
                            type: 'success'
                        });
                        modalGrupoContable.modal('hide');
                        LoadRecordsButtonHead_Accountan.click();
                    } else {
                        var msg_ = (_.isUndefined(response.message)) ?
                            'Hubo un error al guardar el Grupo Contable. Intente nuevamente.' : response.message;
                        AlertFactory.textType({
                            title: '',
                            message: msg_,
                            type: 'error'
                        });
                    }
                });
            }

        }
        function addToDeta(codigo,textOperation, cuentade, centrodet,idoperacion){
            var tr = $('<tr id="tr_contDetalle_' + codigo + '"></tr>');
                var td1 = $('<td id="tr_identO_' + idoperacion + '">' + textOperation + '</td>');
                var td2 = $('<td>' + cuentade + '</td>');
                var td3 = $('<td>' + centrodet + '</td>');
                var inp = $('<input type="hidden" class="w_idOperacion" value="' + idoperacion + '" />');
                var inp2 = $('<input type="hidden" class="w_cuenta" value="' + cuentade + '" />');
                var inp3 = $('<input type="hidden" class="w_centrocosto" value="' + centrodet + '" />');
                td1.append(inp);
                td2.append(inp2);
                td3.append(inp3);
                var td4 = $('<td class="text-center"></td>');
                var btn = $('<button class="btn btn-danger btn-xs delAccoun" data-id="' + codigo + '" type="button"><span class="fa fa-trash"></span></button>');
                td4.append(btn);
                tr.append(td1).append(td2).append(td3).append(td4);
                w_contable_detalle.append(tr);
                modalDetalle.modal('hide');
                 $('.delAccoun').click(function (e) {
                var code = $(this).attr('data-id');
                AlertFactory.confirm({
                    title: '',
                    message: '¿Está seguro que desea quitar estos datos?',
                    confirm: 'Si',
                    cancel: 'No'
                }, function () {
                    $('#tr_contDetalle_' + code).remove();
                    idDetalle_Delete.push(code);

                });
                e.preventDefault();
             });
        }

         $scope.AgregarTable = function()
        {   


            var bval = true;
            bval = bval && id_operacion.required();
            bval = bval && cuenta.required();
            bval = bval && centrocosto.required();
           

            if(bval){
                var idoperacion= id_operacion.val();
                var cuentade= cuenta.val();
                var centrodet=centrocosto.val();
                var textOperation=$('select[name="nOperacion"] option:selected').text();
                var codigo=Math.random().toString(36).substr(2, 18);
                if ($('#tr_identO_' + idoperacion).length > 0) {
                AlertFactory.showWarning({
                    title: '',
                    message: 'Ya se asignó esta Operación'
                });
                return false;
                };   
                addToDeta(codigo,textOperation, cuentade, centrodet,idoperacion);
            }

        }
        function findGupoCont(id) {
         
            titleModalGrupoContable.html('Editar Grupo Contable');
            RESTService.get('head_accountans/find', id, function (response) {
                if (!_.isUndefined(response.status) && response.status) {
                    var data_p = response.data;
                    console.log(data_p);
                    grupoContable_id.val(data_p.idGrupoContableCabecera);
                    grupoContable.val(data_p.descripcion);
                    var chk_state = (data_p.estado == 'A');
                    p_state.prop('checked', chk_state).iCheck('update');
                    $scope.chkState();
                   
                    modalGrupoContable.modal('show');
                    if(data_p.GrupoDetalle!=[]){
                        _.each(data_p.GrupoDetalle, function (c) {
                          var codigo=String(c.idGrupoContableCabecera)+'_'+String(c.idTipoOperacion);
                           addToDeta(codigo,c.operacion, c.cuenta, c.centrocosto,c.idTipoOperacion)
                        });
                    }
                   
                } else {
                    AlertFactory.textType({
                        title: '',
                        message: 'Hubo un error al obtener el Grupo Contable. Intente nuevamente.',
                        type: 'error'
                    });
                }
            });
        }
        function getDataForm () {
            RESTService.all('head_accountans/data_form', '', function(response) {
                if (!_.isUndefined(response.status) && response.status) {
                     id_operacion.append('<option value="" selected>Seleccionar</option>');
                    _.each(response.operacion, function(item) {
                        id_operacion.append('<option value="'+item.Value+'">'+item.DisplayText+'</option>');
                    });
                }
            }, function() {
                getDataForm();
            });
        }
        getDataForm();
        var search = getFormSearch('frm-search-Head_Accountan', 'search_b', 'LoadRecordsButtonHead_Accountan');

        var table_container_Head_Accountan = $("#table_container_Head_Accountan");

        table_container_Head_Accountan.jtable({
            title: "Lista de Grupos Contables ",
            paging: true,
            sorting: true, 
            actions: { 
                listAction: base_url + '/head_accountans/list',
                deleteAction: base_url + '/head_accountans/delete',
            },
            messages: {
                addNewRecord: 'Nuevo Grupo Contable',
                editRecord: 'Editar Grupo Contable',
            },
            toolbar: {
                items: [{
                    cssClass: 'buscador',
                    text: search
                },{
                    cssClass: 'btn-primary',
                    text: '<i class="fa fa-file-excel-o"></i> Exportar a Excel',
                    click: function () {
                        $scope.openDoc('head_accountans/excel', {});
                    }
                },
                {
                    cssClass: 'btn-danger-admin',
                    text: '<i class="fa fa-plus"></i> Nuevo Grupo Contable',
                    click: function () {
                        newGrupoContable();
                    }
                }]
            },
            fields: {
                idGrupoContableCabecera: {
                    key: true,
                    create: false,
                    edit: false,
                    list: false
                },
                grupocontcab: {
                    title: 'Grupo Contable ',
                    listClass: 'text-center',
                     

                },
                estado: {
                    title: 'Estado',
                    values: { 'I': 'Inactivo', 'A': 'Activo' },
                    type: 'checkbox',
                    listClass: 'text-center',
                    defaultValue: 'A',
                   
                   
                },
                edit: {
                    width: '1%',
                    sorting: false,
                    edit: false,
                    create: false,
                    listClass: 'text-center',
                    display: function (data) {
                        return '<a href="javascript:void(0)" title="Editar" class="edit_cont" data-code="' +
                            data.record.idGrupoContableCabecera + '"><i class="fa fa-pencil-square-o fa-1-5x fa-green"></i></a>';
                    }
                }

            },
            recordsLoaded: function (event, data) {
                $('.edit_cont').click(function (e) {
                    var id = $(this).attr('data-code');
                    findGupoCont(id);
                    e.preventDefault();
                });
            }
        });

        generateSearchForm('frm-search-Head_Accountan', 'LoadRecordsButtonHead_Accountan', function(){
            table_container_Head_Accountan.jtable('load', {
                search: $('#search_b').val()
            });
        }, true);
    }

    function Config($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('head_accountans', {
                url: '/head_accountans',
                templateUrl: base_url + '/templates/head_accountans/base.html',
                controller: 'Head_AccountanCtrl'
            });

        $urlRouterProvider.otherwise('/');
    }
})
();