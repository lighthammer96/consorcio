/**
 * Created by JAIR on 4/5/2017.
 */

(function () {
    'use strict';
    angular.module('sys.app.consecutivos_comprobantes')
        .config(Config)
        .controller('ConsecutivosComprobantesCtrl', ConsecutivosComprobantesCtrl);

    Config.$inject = ['$stateProvider', '$urlRouterProvider'];
    ConsecutivosComprobantesCtrl.$inject = ['$scope','_', 'RESTService', 'AlertFactory', 'Notify'];

    function ConsecutivosComprobantesCtrl($scope, _, RESTService, AlertFactory, Notify)
    {
         
        var modalConsecutivoCombro=$("#modalConsecutivoCombro");
        var titleConsecutivoCombro=$("#titleConsecutivoCombro");
        var idTipoDocumento=$("#IdTipoDocumento");
        var id_consecutivo=$("#id_consecutivo");
        var idtienda=$("#idtienda");
        var serie=$("#serie");
        var numero=$("#numero");
        var actual=$("#actual");
        var ultimo=$("#ultimo");
        var longitud=$("#longitud");
        var idusuario=$("#idusuario");
 
        var tableDetalleConsecutivo=$("#tableDetalleConsecutivo");

        idtienda.select2();
        idusuario.select2();
        idTipoDocumento.select2();
        longitud.keyup(function(){
          
            cambiarLongitud();
         }); 
        function cambiarLongitud(){
            var log=Number(longitud.val());
            numero.attr('maxlength', log);
            actual.attr('maxlength', log);
            ultimo.attr('maxlength', log);
        }
         function findConsecuCompro(id) {
          
            titleConsecutivoCombro.html('Editar Consecutivo');
            RESTService.get('consecutivos_comprobantes/find', id, function (response) {
                if (!_.isUndefined(response.status) && response.status) {
                    var data_p = response.data;
                    var data_detalle = response.dataDetalle;
                    id_consecutivo.val(data_p.id_consecutivo);
                    idtienda.val(data_p.idtienda).trigger("change");
                    serie.val(data_p.serie);
                    numero.val(data_p.numero);
                    actual.val(data_p.actual);
                    ultimo.val(data_p.ultimo);
                    longitud.val(data_p.longitud);
                    idTipoDocumento.val(data_p.IdTipoDocumento).trigger("change");
                   console.log(data_p);
                   console.log(data_detalle);
                    if(data_detalle!=[]){
                        _.each(data_detalle, function (c) {
                            addUser(c.idUsuario,c.name,c.idConsecutivo);
                        });
                    }
                    modalConsecutivoCombro.modal('show');
                     cambiarLongitud();
                } else {
                    AlertFactory.textType({
                        title: '',
                        message: 'Hubo un error al obtener la caja. Intente nuevamente.',
                        type: 'error'
                    });
                }
            });
        }
         function cleanConsecutivoCompro() {
            cleanRequired();
            titleConsecutivoCombro.html('');
            id_consecutivo.val("");
            idtienda.val("").trigger("change");
            serie.val("");
            numero.val("");
            actual.val("");
            ultimo.val("");
            longitud.val("");
            idusuario.val("").trigger("change");
            tableDetalleConsecutivo.html("");
            idTipoDocumento.val("").trigger("change");
        }
         idusuario.change(function () {
            var user=$(this).val();
            var total=user.split("*");
            console.log(total[1]);
            var orden=1;
            var id_consecutivo=0;
            if(user!=""){
                addUser(total[0],total[1],id_consecutivo);
            }
           
        });
         $scope.saveComprobante = function()
        {
            var bval = true;
            bval = bval && idtienda.required();
            bval = bval && serie.required();
            bval = bval && longitud.required();
            bval = bval && numero.required();
            bval = bval && actual.required();
            bval = bval && ultimo.required();
            bval = bval && idTipoDocumento.required();
           if($("#tableDetalleConsecutivo").html()==''){
               AlertFactory.showWarning({
                    title: '',
                    message: 'Debe agregar un mínimo de 1 Usuario'
                });
                return false;  
            }
            var log=longitud.val();
            var num=numero.val();
            var ac=actual.val();
            var ul=ultimo.val();
            // var lNum=num.length;
            // console.log(log);
            // console.log(log);
             if(Number(log)<Number(num.length) || Number(log)<Number(ac.length) || Number(log)<Number(ul.length)){
               AlertFactory.showWarning({
                    title: '',
                    message: 'Los dígitos exceden a la longitud'
                });
                return false;  
            }
            if(bval){
                
                var idUsuario =[];
                $.each($('.idUsuario'), function (idx, item) {
                    idUsuario[idx] = $(item).val();
                });
                idUsuario = idUsuario.join(',');

                var idConsedet =[];
                $.each($('.idUsuario_det'), function (idx, item) {
                    idConsedet[idx] = $(item).val();
                });
                idConsedet = idConsedet.join(',');

                var params = {
                    'idtienda':idtienda.val(),
                    'serie':serie.val(),
                    'numero':numero.val(),
                    'actual':actual.val(),
                    'ultimo':ultimo.val(),
                    'longitud':longitud.val(),
                    'IdTipoDocumento':idTipoDocumento.val(),
                    'idUsuario':idUsuario,
                    'idConsedet':idConsedet,
                 };
            
                var id = (id_consecutivo.val() === '') ? 0 : id_consecutivo.val();
                RESTService.updated('consecutivos_comprobantes/saveComprobante', id, params, function(response) {
                    if (!_.isUndefined(response.status) && response.status) {
                        console.log(response.data);
                        AlertFactory.textType({
                            title: '',
                            message: 'Se registró correctamente.',
                            type: 'success'
                        });
                         modalConsecutivoCombro.modal('hide');
                        LoadRecordsButtonCompro.click();
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
             tableDetalleConsecutivo.append(tr);
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
                    if(id_consecutivo.val()!=''){
                        var id=id_consecutivo.val()+"_"+idUsuario;
                        RESTService.get('consecutivos_comprobantes/deleteUsuario', id, function(response) {
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
          modalConsecutivoCombro.on('hidden.bs.modal', function (e) {
            cleanConsecutivoCompro();
        });
         function newComprobanteConse()
        {
            titleConsecutivoCombro.html('Nuevo Consecutivo');

            modalConsecutivoCombro.modal('show');
        }

        function getDataFormDescuento () {
            RESTService.all('consecutivos_comprobantes/data_formDescCc', '', function(response) {
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
            RESTService.all('consecutivos_comprobantes/data_formJerConComp', '', function(response) {
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

          function getDataForm () {
            RESTService.all('consecutivos_comprobantes/data_form', '', function(response) {
                if (!_.isUndefined(response.status) && response.status) {
                    var documentos=response.documento;
                     idTipoDocumento.append('<option value="" selected>Seleccionar</option>');
                    _.each(documentos, function(item) {
                        idTipoDocumento.append('<option value="'+item.IdTipoDocumento+'">'+item.Descripcion+'</option>');
                    });
                }
            }, function() {
                getDataForm();
            });
        }
        getDataForm();



        var search = getFormSearch('frm-search-brand', 'search_b', 'LoadRecordsButtonCompro');

        var table_container_consecutivos_comprobantes = $("#table_container_consecutivos_comprobantes");

        table_container_consecutivos_comprobantes.jtable({
            title: "Lista de Consecutivos Comprobantes",
            paging: true,
            sorting: true,
            actions: {
                listAction: base_url + '/consecutivos_comprobantes/list',
                deleteAction: base_url + '/consecutivos_comprobantes/delete',
            },
            messages: {
                addNewRecord: 'Nuevo Consecutivo',
                editRecord: 'Editar Consecutivo'
            },
            toolbar: {
                items: [{
                    cssClass: 'buscador',
                    text: search
                },{
                    cssClass: 'btn-primary',
                    text: '<i class="fa fa-file-excel-o"></i> Exportar a Excel',
                    click: function () {
                        $scope.openDoc('consecutivos_comprobantes/excel', {});
                    }
                },{
                    cssClass: 'btn-danger-admin',
                    text: '<i class="fa fa-plus"></i> Nueva Consecutivo',
                    click: function () {
                        newComprobanteConse();
                    }
                }]
            },
            fields: {
                id_consecutivo: {
                    key: true,
                    create: false,
                    edit: false,
                    list: false,
                },
                idtienda: {
                    title: 'Tienda',
                    options: base_url + '/consecutivos_comprobantes/getTiendas' 

                },
                IdTipoDocumento:{
                     title: 'Tipo Documento',
                    options: base_url + '/consecutivos_comprobantes/getDocumentos' 
                },
                serie: {
                    title: 'Serie'
                },
                numero: {
                    title: 'Inicio'
                },
                actual: {
                    title: 'Actual'
                },
                ultimo: {
                    title: 'Último'
                },
                longitud: {
                    title: 'Longitud'
                },
                 edit: {
                    width: '1%',
                    sorting: false,
                    edit: false,
                    create: false,
                    listClass: 'text-center',
                    display: function (data) {
                        return '<a href="javascript:void(0)" title="Editar" class="edit_cont" data-code="' +
                            data.record.id_consecutivo + '"><i class="fa fa-pencil-square-o fa-1-5x fa-green"></i></a>';
                    }
                }
            },
            recordsLoaded: function (event, data) {
                $('.edit_cont').click(function (e) {
                    var id = $(this).attr('data-code');
                    findConsecuCompro(id);
                    e.preventDefault();
                });
            },
            formCreated: function (event, data) {
     
                //data.form.find('input[name="convenio"]').attr('onkeypress','return soloLetras(event)');
               
            },
            formSubmitting: function (event, data) {
                var bval = true;
                // bval = bval && data.form.find('input[name="codigo_formapago"]').required();
                bval = bval && data.form.find('input[name="serie"]').required();
                bval = bval && data.form.find('input[name="numero"]').required();
                bval = bval && data.form.find('input[name="actual"]').required();
                bval = bval && data.form.find('input[name="ultimo"]').required();
                bval = bval && data.form.find('input[name="longitud"]').required();
                // bval = bval && data.form.find('input[name="longitud"]').required();
                return bval;
            }
        });

        generateSearchForm('frm-search-brand', 'LoadRecordsButtonCompro', function(){
            table_container_consecutivos_comprobantes.jtable('load', {
                search: $('#search_b').val()
            });
        }, true);
    }

    function Config($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('consecutivos_comprobantes', {
                url: '/consecutivos_comprobantes',
                templateUrl: base_url + '/templates/consecutivos_comprobantes/base.html',
                controller: 'ConsecutivosComprobantesCtrl'
            });

        $urlRouterProvider.otherwise('/');
    }
})
();