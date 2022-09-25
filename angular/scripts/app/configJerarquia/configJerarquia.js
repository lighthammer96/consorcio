/**
 * Created by JAIR on 4/5/2017.
 */
  
(function () {
    'use strict';
    angular.module('sys.app.configJerarquias')
        .config(Config)
        .controller('ConfigJerarquiaCtrl', ConfigJerarquiaCtrl);

    Config.$inject = ['$stateProvider', '$urlRouterProvider'];
    ConfigJerarquiaCtrl.$inject = ['$scope','_', 'RESTService', 'AlertFactory', 'Notify'];

    function ConfigJerarquiaCtrl($scope, _, RESTService, AlertFactory, Notify)
    {
        
         $scope.chkState = function () {
            var txt_state2 = (w_state.prop('checked')) ? 'Activo' : 'Inactivo';
            state_state.html(txt_state2);
        };
        var modalConfigJerarquias=$("#modalConfigJerarquias");
        var titleModalConfigJerarquias=$("#titleModalConfigJerarquias");
        var nIdTienda=$("#nIdTienda");
        var nIdTipoSolicitud=$("#nIdTipoSolicitud");
        var dFecIni=$("#dFecIni");
        var dFecFin=$("#dFecFin");
        var nIdUsuario=$("#nIdUsuario");
        var tableDetalleJerarquia=$("#tableDetalleJerarquia");
        var nIdAprob=$("#nIdAprob");
        nIdTienda.select2();
        nIdUsuario.select2();
        nIdUsuario.change(function () {
            var user=$(this).val();
            var total=user.split("*");
            console.log(total[1]);
            var orden=1;
            var idJer=0;
            if(user!=""){
                addUser(total[0],total[1],orden,idJer);
            }
           
        });
          function addUser(idusuario,username,orden,idJer) {
            var code=idusuario;
            if ($('#tr_b_' + code).length > 0) {
                AlertFactory.showWarning({
                    title: '',
                    message: 'Ya se asignó este usuario'
                });
                nIdUsuario.val("").trigger("change");
                return false;
            }
             var tr = $('<tr id="tr_b_' + code + '"></tr>');
             var td1 = $('<td>' + username + '</td>');
             var tdOrden = $('<td></td>');
             var td2 = $('<td class="text-center"></td>');
             var orden = $('<input type="number"  class="detOrden form-control input-sm"   value="' +orden+ '"  />');
             var codigoUsuario = $('<input type="hidden" class="idUsuario"  value="' +idusuario+ '"  />');
             var codigoUsuarioDetalle = $('<input type="hidden" class="idUsuario_det"  value="' +idJer+ '"  />');
             var btn = $('<button class="btn btn-danger btn-xs delUsuario" data-idUsuario="'+idusuario+'" data-id="' + code + '" type="button"><span class="fa fa-trash"></span></button>');
             tdOrden.append(orden);
             td2.append(btn).append(codigoUsuario).append(codigoUsuarioDetalle);
             tr.append(td1).append(tdOrden).append(td2);
             tableDetalleJerarquia.append(tr);
             nIdUsuario.val("").trigger("change");
              $('.delUsuario').click(function (e) {
                var code = $(this).attr('data-id');
                var idUsuario = $(this).attr('data-idUsuario');
                AlertFactory.confirm({
                    title: '',
                    message: '¿Está seguro que desea quitar este usuario?',
                    confirm: 'Si',
                    cancel: 'No'
                }, function () {
                    if(nIdAprob.val()!=''){
                        var id=nIdAprob.val()+"_"+idUsuario;
                        RESTService.get('configJerarquias/deleteUsuario', id, function(response) {
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
        $scope.saveConfJerq = function()
        {
            var bval = true;
            bval = bval && nIdTienda.required();
            bval = bval && nIdTipoSolicitud.required();
            bval = bval && dFecIni.required();
            bval = bval && dFecFin.required();
           if($("#tableDetalleJerarquia").html()==''){
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

                

                var idjer =[];
                $.each($('.idUsuario_det'), function (idx, item) {
                    idjer[idx] = $(item).val();
                });

                idjer = idjer.join(',');

                var dataOrden =[];
                $.each($('.detOrden'), function (idx, item) {
                    dataOrden[idx] = $(item).val();
                });
                dataOrden = dataOrden.join(',');

                var params = {
                    'nIdTienda':nIdTienda.val(),
                    'nIdTipoSolicitud':nIdTipoSolicitud.val(),
                    'dFecIni':dFecIni.val(),
                    'dFecFin':dFecFin.val(),

                    'idUsuario':idUsuario,
                    'idjer':idjer,
                    'dataOrden': dataOrden,
                 };
                 console.log(dataOrden);
                 console.log(idUsuario);
                 console.log(idjer);
                var id = (nIdAprob.val() === '') ? 0 : nIdAprob.val();
                RESTService.updated('configJerarquias/createConfigJerar', id, params, function(response) {
                    if (!_.isUndefined(response.status) && response.status) {
                        AlertFactory.textType({
                            title: '',
                            message: 'Se registró correctamente.',
                            type: 'success'
                        });
                         modalConfigJerarquias.modal('hide');
                        LoadRecordsButtonConfigJerarquia.click();
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
        function cleanConfigJerarquia() {
            cleanRequired();
            titleModalConfigJerarquias.html('');
            nIdTienda.val("").trigger("change");
            nIdTipoSolicitud.val("").trigger("change");
            dFecIni.val("");
            dFecFin.val("");
            nIdUsuario.val("").trigger("change");
            tableDetalleJerarquia.html('');
            nIdAprob.val("");
        }
          modalConfigJerarquias.on('hidden.bs.modal', function (e) {
            cleanConfigJerarquia();
        });
        function findJerarquia(id) {
         
            titleModalConfigJerarquias.html('Editar Jerarquia');
            RESTService.get('configJerarquias/find', id, function (response) {
                if (!_.isUndefined(response.status) && response.status) {
                    var data_p = response.data;
                    var data_detalle = response.dataDetalle;
                    nIdAprob.val(data_p.nIdAprob);
                    nIdTienda.val(data_p.nIdTienda).trigger("change");
                    nIdTipoSolicitud.val(data_p.nIdTipoSolicitud).trigger("change");
                    dFecIni.val(data_p.dFecInicio2);
                    dFecFin.val(data_p.dFechaFin2);

                   console.log(data_p);
                   console.log(data_detalle);
                    if(data_detalle!=[]){
                        _.each(data_detalle, function (c) {
                            addUser(c.nIdUsuario,c.name,c.nOrden,c.nIdAprob)
                        });
                    }
                    modalConfigJerarquias.modal('show');
                   
                } else {
                    AlertFactory.textType({
                        title: '',
                        message: 'Hubo un error al obtener el Jerarquía. Intente nuevamente.',
                        type: 'error'
                    });
                }
            });
        }
         function newConfigJerarquia()
        {
            titleModalConfigJerarquias.html('Nueva Jerarquía');
            modalConfigJerarquias.modal('show');
        }
         function getDataFormDescuento () {
            RESTService.all('descuentos/data_form', '', function(response) {
                if (!_.isUndefined(response.status) && response.status) {
                        nIdUsuario.append('<option value="">Seleccionar</option>');
                       _.each(response.usuarios, function(item) {
                        nIdUsuario.append('<option value="'+item.id+'*'+item.name+'">'+item.name+'</option>');

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

                     nIdTienda.append('<option value="" selected>Seleccionar</option>');
                    _.each(tiendaTotal, function(item) {
                        nIdTienda.append('<option value="'+item.idTienda+'">'+item.descripcion+'</option>');
                    });
                }
            }, function() {
                getDataJerarquiaForm();
            });
        }
        getDataJerarquiaForm();

        var search = getFormSearch('frm-search-ConfigJerarquia', 'search_b', 'LoadRecordsButtonConfigJerarquia');

        var table_container_ConfigJerarquia = $("#table_container_ConfigJerarquia");

        table_container_ConfigJerarquia.jtable({
            title: "Lista de Jerarquias",
            paging: true,
            sorting: true,
            actions: { 
                listAction: base_url + '/configJerarquias/list',
                deleteAction: base_url + '/configJerarquias/delete',
            },
            messages: {
                addNewRecord: 'Nueva Jerarquia',
                editRecord: 'Editar Jerarquia',
            },
            toolbar: {
                items: [{
                    cssClass: 'buscador',
                    text: search
                },{
                    cssClass: 'btn-primary',
                    text: '<i class="fa fa-file-excel-o"></i> Exportar a Excel',
                    click: function () {
                        $scope.openDoc('configJerarquias/excel', {});
                    }
                },{
                    cssClass: 'btn-danger-admin',
                    text: '<i class="fa fa-plus"></i> Nueva Jerarquia',
                    click: function () {
                        newConfigJerarquia();
                    }
                }]
            },
            fields: {
                nIdAprob: {
                    key: true,
                    create: false,
                    edit: false,
                    list: false
                },
                nIdTipoSolicitud: {
                    title: 'Tipo Solicitud',
                    options: { '1': 'Contado', '2': 'Crédito Directo','3':'Crédito Financiero','4':'Crédito'},
                },
                nIdTienda: {
                    title: 'Tienda',
                    options: base_url + '/shops/getTienda' ,
                },
                dFecIni: {
                    title: 'Fecha Inicio',
                    // options: base_url + '/modelos/getMarca' ,
                    display: function (data) {
                            return moment(data.record.dFecIni).format('DD/MM/YYYY');
                        }
                },
                dFecFin: {
                    title: 'Fecha Fin',
                    display: function (data) {
                            return moment(data.record.dFecFin).format('DD/MM/YYYY');
                        }
                },edit: {
                    width: '1%',
                    sorting: false,
                    edit: false,
                    create: false,
                    listClass: 'text-center',
                    display: function (data) {
                        return '<a href="javascript:void(0)" class="edit-config" data-id="'+data.record.nIdAprob+'" title="Editar"><i class="fa fa-edit fa-1-5x"></i></a>';
                    }

                },
            },
           
             recordsLoaded: function (event, data) {
                $('.edit-config').click(function (e) {
                    var id = $(this).attr('data-id');
                    findJerarquia(id);
                    e.preventDefault();
                });
            },
            formCreated: function (event, data) {
                data.form.find('input[name="Categoria"]').attr('onkeypress','return soloLetras(event)');
                $('#Edit-estado').parent().addClass('i-checks');
               
                $('.i-checks').iCheck({
                    checkboxClass: 'icheckbox_square-green'
                }).on('ifChanged', function (e) {
                    $(e.target).click();
                     if(e.target.value=='A'){
                        $("#Edit-estado").val("I");
                        $(".i-checks span").text("Inactivo");

                     }else{
                        $("#Edit-estado").val("A");
                        $(".i-checks span").text("Activo");
                     };
                });
            },
            formSubmitting: function (event, data) {
                var bval = true;
                bval = bval && data.form.find('input[name="Categoria"]').required();
                return bval;
            }
        });

        generateSearchForm('frm-search-ConfigJerarquia', 'LoadRecordsButtonConfigJerarquia', function(){
            table_container_ConfigJerarquia.jtable('load', {
                search: $('#search_b').val()
            });
        }, true);
    }

    function Config($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('configJerarquias', {
                url: '/configJerarquias',
                templateUrl: base_url + '/templates/configJerarquias/base.html',
                controller: 'ConfigJerarquiaCtrl'
            });

        $urlRouterProvider.otherwise('/');
    }
})
();