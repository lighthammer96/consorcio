/**
 * Created by JAIR on 4/5/2017.
 */

(function () {
    'use strict';
    angular.module('sys.app.cajas')
        .config(Config)
        .controller('CajasCtrl', CajasCtrl);
 
    Config.$inject = ['$stateProvider', '$urlRouterProvider'];
    CajasCtrl.$inject = ['$scope','_', 'RESTService', 'AlertFactory', 'Notify'];

    function CajasCtrl($scope, _, RESTService, AlertFactory, Notify)
    { 
        var modalCajas=$("#modalCajas");
        var titleModalCajas=$("#titleModalCajas");
        var nombre_caja=$("#nombre_caja");
        var idtienda=$("#idtienda");
        var idusuario=$("#idusuario"); 
        var p_state = $('#p_state');
        var state_text = $('#state_text');
        var idcaja=$("#idcaja");
        var tableDetalleCaja=$("#tableDetalleCaja");

        idtienda.select2();
        idusuario.select2();


        function cleanCaja() {
            cleanRequired();
            titleModalCajas.html('');
            idtienda.val("").trigger("change");
            idusuario.val("").trigger("change");;
            nombre_caja.val("");
            tableDetalleCaja.html('');
            idcaja.val("");
            p_state.prop('checked', true).iCheck('update');
            state_text.html('SI');
            
        }
          modalCajas.on('hidden.bs.modal', function (e) {
            cleanCaja();
        });
        idusuario.change(function () {
            var user=$(this).val();
            var total=user.split("*");
            console.log(total[1]);
            var orden=1;
            var idcaja=0;
            if(user!=""){
                addUser(total[0],total[1],idcaja);
            }
           
        });
        function findCaja(id) {
         
            titleModalCajas.html('Editar Caja');
            RESTService.get('cajas/find', id, function (response) {

                if (!_.isUndefined(response.status) && response.status) {
                    var data_p = response.data;
                    var data_detalle = response.dataDetalle;
                    nombre_caja.val(data_p.nombre_caja);
                    idtienda.val(data_p.idtienda).trigger("change");
                    idcaja.val(data_p.idcaja);
                    var chk_state = (data_p.activo == 'S');
                    p_state.prop('checked', chk_state).iCheck('update');
                    $scope.chkState();

                    // idtienda.val(data_p.idtienda).trigger("change");
                    // idaprobacion.val(data_p.idaprobacion);
                    // nombre_aprobacion.val(data_p.nombre_aprobacion);
                   console.log(data_p);
                   console.log(data_detalle);
                    if(data_detalle!=[]){
                        _.each(data_detalle, function (c) {
                            addUser(c.idUsuario,c.usuario,c.idCaja);
                        });
                    }
                    modalCajas.modal('show');
                   
                } else {
                    AlertFactory.textType({
                        title: '',
                        message: 'Hubo un error al obtener la caja. Intente nuevamente.',
                        type: 'error'
                    });
                }
            });
        }
        $scope.saveCaja = function()
        {
            var bval = true;
            bval = bval && nombre_caja.required();
            bval = bval && idtienda.required();
           if($("#tableDetalleCaja").html()==''){
               AlertFactory.showWarning({
                    title: '',
                    message: 'Debe agregar un mínimo de 1 Usuario'
                });
                return false;  
            }
         
            if(bval){
                
                var idUsuario =[];
                $.each($('.idUsuario'), function (idx, item) {
                    idUsuario[idx] = $(item).val();
                });
                idUsuario = idUsuario.join(',');

                var idcajadet =[];
                $.each($('.idUsuario_det'), function (idx, item) {
                    idcajadet[idx] = $(item).val();
                });
                  idcajadet = idcajadet.join(',');
                 var nameUsuario =[];
                $.each($('.nameUsuario'), function (idx, item) {
                    nameUsuario[idx] = $(item).val();
                });
                nameUsuario = nameUsuario.join(',');

                var params = {
                    'idtienda':idtienda.val(),
                    'nombre_caja':nombre_caja.val(),
                    'estado': ((p_state.prop('checked')) ? 'S' : 'N'),
                    'idUsuario':idUsuario,
                    'idcajadet':idcajadet,
                    'nameUsuario':nameUsuario,
                 };
                //  console.log(dataOrden);
                //  console.log(idUsuario);
                //  console.log(idjer);
                console.log("acá");
                var id = (idcaja.val() === '') ? 0 : idcaja.val();
                RESTService.updated('cajas/saveCaja', id, params, function(response) {
                    if (!_.isUndefined(response.status) && response.status) {
                        console.log(response.data);
                        AlertFactory.textType({
                            title: '',
                            message: 'Se registró correctamente.',
                            type: 'success'
                        });
                         modalCajas.modal('hide');
                        LoadRecordsButtonCaja.click();
                    } else {
                        var msg_ = (_.isUndefined(response.message)) ?
                            'No se pudo guardar . Intente nuevamente.' : response.message;
                        AlertFactory.textType({
                            title: '',
                            message: msg_,
                            type: 'info'
                        });
                    }
                        
                  });  
            } 
        }
        function addUser(idusuarioE,username,nIdAprob) {
            var code=idusuarioE;
            if ($('#tr_b_' + code).length > 0) {
                AlertFactory.showWarning({
                    title: '',
                    message: 'Ya se asignó este usuario'
                });
                idusuario.val("").trigger("change");
                return false;
            }
             var tr = $('<tr id="tr_b_' + code + '"></tr>');
             var td1 = $('<td>' + username + '</td>');
             var td2 = $('<td class="text-center"></td>');
             var codigoUsuario = $('<input type="hidden" name="idUsuario[]" class="idUsuario"  value="' +idusuarioE+ '"  />');
             var nameUsuario = $('<input type="hidden" name="nameUsuarioe[]" class="nameUsuario"  value="' +username+ '"  />');
             var codigoUsuarioDetalle = $('<input type="hidden" name="idUsuario_det[]" class="idUsuario_det"  value="' +nIdAprob+ '"  />');
             var btn = $('<button class="btn btn-danger btn-xs delUsuario" data-idUsuario="'+idusuarioE+'" data-id="' + code + '" type="button"><span class="fa fa-trash"></span></button>');
             td2.append(btn).append(codigoUsuario).append(nameUsuario).append(codigoUsuarioDetalle);
             tr.append(td1).append(td2);
             tableDetalleCaja.append(tr);
             idusuario.val("").trigger("change");
              $('.delUsuario').click(function (e) {
                var code = $(this).attr('data-id');
                var idUsuario = $(this).attr('data-idUsuario');
                AlertFactory.confirm({
                    title: '',
                    message: '¿Está seguro que desea quitar este usuario?',
                    confirm: 'Si',
                    cancel: 'No'
                }, function () {
                    if(idcaja.val()!=''){
                        var id=idcaja.val()+"_"+idUsuario;
                        RESTService.get('cajas/deleteUsuario', id, function(response) {
                        if (!_.isUndefined(response.status) && response.status) {
                            var data=response.data;
                                AlertFactory.textType({
                                    title: '',
                                    message: 'El Usuario se eliminó correctamente',
                                    type: 'success'
                                });
                                $('#tr_b_' + code).remove();
                     }else {
                        var msg_ = (_.isUndefined(response.message)) ?
                            'No se pudo eliminar. Intente nuevamente.' : response.message;
                                AlertFactory.textType({
                                    title: '',
                                    message: msg_,
                                    type: 'error'
                                });
                         }
                        });

                    }else{
                        $('#tr_b_' + code).remove();
                    }
                    
                });
                e.preventDefault();
            });
        }
        function newCaja()
        {
            titleModalCajas.html('Nueva Caja');
            modalCajas.modal('show');
        }
        $('.i-checks').iCheck({
            checkboxClass: 'icheckbox_square-green'
        }).on('ifChanged', function (event) {
            $(event.target).click();
            $scope.chkState();
        });
        $scope.chkState = function() {
            var txt = (p_state.prop('checked')) ? 'Si' : 'No';
            state_text.html(txt);
        };

      

        function getDataFormDescuento () {

            RESTService.all('cajas/data_formDes', '', function(response) {
                if (!_.isUndefined(response.status) && response.status) {
                        idusuario.append('<option value="">Seleccionar</option>');
                       _.each(response.usuarios, function(item) {
                        idusuario.append('<option value="'+item.id+'*'+item.name+'">'+item.name+'</option>');

                    });
                } 
            }, function() {
                getDataFormDescuento();
            });
        }


        getDataFormDescuento();
        function getDataJerarquiaForm () {
            RESTService.all('cajas/data_formConfig', '', function(response) {
                if (!_.isUndefined(response.status) && response.status) {
                    var tiendaTotal=response.tienda;
                     idtienda.append('<option value="" selected>Seleccionar</option>');
                    _.each(tiendaTotal, function(item) {
                        idtienda.append('<option value="'+item.idTienda+'">'+item.descripcion+'</option>');
                    });
                }
            }, function() {
                getDataJerarquiaForm();
            });
        }
        getDataJerarquiaForm();

        var search = getFormSearch('frm-search-brand', 'search_b', 'LoadRecordsButtonCaja');

        var table_container_cajas = $("#table_container_cajas");

        table_container_cajas.jtable({
            title: "Lista de Cajas",
            paging: true,
            sorting: true,
            actions: {
                listAction: base_url + '/cajas/list',
                deleteAction: base_url + '/cajas/delete',
            },
            messages: {
                addNewRecord: 'Nueva Caja',
                editRecord: 'Editar Caja'
            },
            toolbar: {
                items: [{
                    cssClass: 'buscador',
                    text: search
                },{
                    cssClass: 'btn-primary',
                    text: '<i class="fa fa-file-excel-o"></i> Exportar a Excel',
                    click: function () {
                        $scope.openDoc('cajas/excel', {});
                    }
                },{
                    cssClass: 'btn-danger-admin',
                    text: '<i class="fa fa-plus"></i> Nueva Caja',
                    click: function () {
                        newCaja();
                    }
                }]
            },
            fields: {
                idcaja: {
                    key: true,
                    create: false,
                    edit: false,
                    list: false,
                },
                idtienda: {
                    title: 'Tienda',
                    options: base_url + '/cajas/getTiendas' 

                },
                nombre_caja: {
                    title: 'Nombre Caja'
                },
                activo: {
                    title: 'Activo',
                    values: { 'S': 'SI', 'N': 'NO' },
                    defaultValue: 'A',
                    type: 'checkbox',
                    listClass: 'text-center',
                   
                   
                },
                 edit: {
                    width: '1%',
                    sorting: false,
                    edit: false,
                    create: false,
                    listClass: 'text-center',
                    display: function (data) {
                        return '<a href="javascript:void(0)" title="Editar" class="edit_cont" data-code="' +
                            data.record.idcaja + '"><i class="fa fa-pencil-square-o fa-1-5x fa-green"></i></a>';
                    }
                }
                
            },
           
             recordsLoaded: function (event, data) {
                $('.edit_cont').click(function (e) {
                    var id = $(this).attr('data-code');
                    findCaja(id);
                    e.preventDefault();
                });
            }
        });

        generateSearchForm('frm-search-brand', 'LoadRecordsButtonCaja', function(){
            table_container_cajas.jtable('load', {
                search: $('#search_b').val()
            });
        }, true);
    }

    function Config($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('cajas', {
                url: '/cajas',
                templateUrl: base_url + '/templates/cajas/base.html',
                controller: 'CajasCtrl'
            });

        $urlRouterProvider.otherwise('/');
    }
})
();