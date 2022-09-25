/**
 * Created by JAIR on 4/5/2017.
 */

(function () {
    'use strict';
    angular.module('sys.app.aprobacion')
        .config(Config)
        .controller('AprobacionCtrl', AprobacionCtrl);

    Config.$inject = ['$stateProvider', '$urlRouterProvider'];
    AprobacionCtrl.$inject = ['$scope','_', 'RESTService', 'AlertFactory', 'Notify'];

    function AprobacionCtrl($scope, _, RESTService, AlertFactory, Notify)
    {
        
        var modalAprobacionSoliVentas=$("#modalAprobacionSoliVentas");
        var titleModalAprobacionSoliVentas=$("#titleModalAprobacionSoliVentas");

        var idtienda=$("#idtienda");
        var idusuario=$("#idusuario");
        var idaprobacion=$("#idaprobacion");
        var nombre_aprobacion=$("#nombre_aprobacion");
        var tableDetalleAprobacion=$("#tableDetalleAprobacion");

        idtienda.select2();
        idusuario.select2();
        idusuario.change(function () {
            var user=$(this).val();
            var total=user.split("*");
            console.log(total[1]);
            var orden=1;
            var nIdAprob=0;
            if(user!=""){
                addUser(total[0],total[1],nIdAprob);
            }
           
        });
         function findAprobacionSoli(id) {
         
            titleModalAprobacionSoliVentas.html('Editar Aprobación');
            RESTService.get('aprobacion/find', id, function (response) {
                if (!_.isUndefined(response.status) && response.status) {
                    var data_p = response.data;
                    var data_detalle = response.dataDetalle;
                    idtienda.val(data_p.idtienda).trigger("change");
                    idaprobacion.val(data_p.idaprobacion);
                    nombre_aprobacion.val(data_p.nombre_aprobacion);
                   console.log(data_p);
                   console.log(data_detalle);
                    if(data_detalle!=[]){
                        _.each(data_detalle, function (c) {
                            addUser(c.idUsuario,c.usuario,c.idAprobacion);
                        });
                    }
                    modalAprobacionSoliVentas.modal('show');
                   
                } else {
                    AlertFactory.textType({
                        title: '',
                        message: 'Hubo un error al obtener el Jerarquía. Intente nuevamente.',
                        type: 'error'
                    });
                }
            });
        }
         function cleanAprobacion() {
            cleanRequired();
            titleModalAprobacionSoliVentas.html('');
            idtienda.val("").trigger("change");
            idusuario.val("").trigger("change");;
            idaprobacion.val("");
            nombre_aprobacion.val("").trigger("change");
            tableDetalleAprobacion.html('');
            
        }
          modalAprobacionSoliVentas.on('hidden.bs.modal', function (e) {
            cleanAprobacion();
        });
          $scope.saveAprobacioSolicitud = function()
        {
            var bval = true;
            bval = bval && idtienda.required();
            bval = bval && nombre_aprobacion.required();
           if($("#tableDetalleAprobacion").html()==''){
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

                

                var idApr =[];
                $.each($('.idUsuario_det'), function (idx, item) {
                    idApr[idx] = $(item).val();
                });
                  idApr = idApr.join(',');
                 var nameUsuario =[];
                $.each($('.nameUsuario'), function (idx, item) {
                    nameUsuario[idx] = $(item).val();
                });
                nameUsuario = nameUsuario.join(',');

                var params = {
                    'idtienda':idtienda.val(),
                    'nombre_aprobacion':nombre_aprobacion.val(),
                    'idUsuario':idUsuario,
                    'idApr':idApr,
                    'nameUsuario':nameUsuario,
                 };
                //  console.log(dataOrden);
                //  console.log(idUsuario);
                //  console.log(idjer);
                
                
                var id = (idaprobacion.val() === '') ? 0 : idaprobacion.val();
                RESTService.updated('aprobacion/saveAprobaSoli', id, params, function(response) {
                    if (!_.isUndefined(response.status) && response.status) {
                        console.log(response.data);
                        AlertFactory.textType({
                            title: '',
                            message: 'Se registró correctamente.',
                            type: 'success'
                        });
                         modalAprobacionSoliVentas.modal('hide');
                        LoadRecordsButtonAproba.click();
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
             tableDetalleAprobacion.append(tr);
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
                    if(idaprobacion.val()!=''){
                        var id=idaprobacion.val()+"_"+idUsuario;
                        RESTService.get('aprobacion/deleteUsuario', id, function(response) {
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
        function newAprobacion()
        {
            titleModalAprobacionSoliVentas.html('Nueva Aprobación');
            modalAprobacionSoliVentas.modal('show');
        }

         function getDataFormDescuento () {
            RESTService.all('descuentos/data_form', '', function(response) {
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
            RESTService.all('configJerarquias/data_form', '', function(response) {
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

        var search = getFormSearch('frm-search-brand', 'search_b', 'LoadRecordsButtonAproba');

        var table_container_aprobacion = $("#table_container_aprobacion");

        table_container_aprobacion.jtable({
            title: "Lista de Aprobacion",
            paging: true,
            sorting: true, 
            actions: {
                listAction: base_url + '/aprobacion/list',
                deleteAction: base_url + '/aprobacion/delete',
            },
            messages: {
                addNewRecord: 'Nueva Aprobacion',
                editRecord: 'Editar Aprobacion'
            },
            toolbar: {
                items: [{
                    cssClass: 'buscador',
                    text: search
                },{
                    cssClass: 'btn-primary',
                    text: '<i class="fa fa-file-excel-o"></i> Exportar a Excel',
                    click: function () {
                        $scope.openDoc('aprobacion/excel', {});
                    }
                },{
                    cssClass: 'btn-danger-admin',
                    text: '<i class="fa fa-plus"></i> Nueva Aprobación',
                    click: function () {
                        newAprobacion();
                    }
                }]
            },
            fields: {
                idaprobacion: {
                    key: true,
                    create: false,
                    edit: false,
                    list: false,
                },
                idtienda: {
                    title: 'Tienda',
                    options: base_url + '/aprobacion/getTiendas' 

                },
                nombre_aprobacion: {
                    title: 'Nombre Aprobacion'
                },edit: {
                    width: '1%',
                    sorting: false,
                    edit: false,
                    create: false,
                    listClass: 'text-center',
                    display: function (data) {
                        return '<a href="javascript:void(0)" class="edit-config" data-id="'+data.record.idaprobacion+'" title="Editar"><i class="fa fa-edit fa-1-5x"></i></a>';
                    }

                },
               
                
            },
            recordsLoaded: function (event, data) {
                $('.edit-config').click(function (e) {
                    var id = $(this).attr('data-id');
                    findAprobacionSoli(id);
                    e.preventDefault();
                });
            },
            formCreated: function (event, data) {
     
                //data.form.find('input[name="convenio"]').attr('onkeypress','return soloLetras(event)');
              
            },
            formSubmitting: function (event, data) {
                var bval = true;
                // bval = bval && data.form.find('input[name="codigo_formapago"]').required();
                bval = bval && data.form.find('input[name="nombre_aprobacion"]').required();
     
                return bval;
            }
        });

        generateSearchForm('frm-search-brand', 'LoadRecordsButtonAproba', function(){
            table_container_aprobacion.jtable('load', {
                search: $('#search_b').val()
            });
        }, true);
    }

    function Config($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('aprobacion', {
                url: '/aprobacion',
                templateUrl: base_url + '/templates/aprobacion/base.html',
                controller: 'AprobacionCtrl'
            });

        $urlRouterProvider.otherwise('/');
    }
})
();