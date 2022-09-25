/**
 * Created by JAIR on 4/5/2017.
 */
  
(function () {
    'use strict';
    angular.module('sys.app.cancelarCerrarOcs')
        .config(Config)
        .controller('CancelarCerrarOcCtrl', CancelarCerrarOcCtrl);

    Config.$inject = ['$stateProvider', '$urlRouterProvider'];
    CancelarCerrarOcCtrl.$inject = ['$scope','_', 'RESTService', 'AlertFactory', 'Notify'];

    function CancelarCerrarOcCtrl($scope, _, RESTService, AlertFactory, Notify)
    {
        
         $scope.chkState = function () {
            var txt_state2 = (w_state.prop('checked')) ? 'Activo' : 'Inactivo';
            state_state.html(txt_state2);
        };
        function cambiarEstado(id,estadoCambio){
               var params = {
                    'estadoCambio':estadoCambio,
                  
                };  
               RESTService.updated('cancelarCerrarOcs/cambiarEstadoParcial',id, params, function(response) {
                    if (!_.isUndefined(response.status) && response.status) {

                        AlertFactory.textType({
                                title: '',
                                message:'el registró se modificó con éxito',
                                type: 'success'
                        });
                        $("#LoadRecordsButtonCancelarCerrarOc").click();
                      
                    } else {
                        var msg_ = (_.isUndefined(response.message)) ?
                            'No se pudo guardar el movimiento. Intente nuevamente.' : response.message;
                        AlertFactory.textType({
                            title: '',
                            message: msg_,
                            type: 'info'
                        });
                    }
                });
         }
        var search = getFormSearch('frm-search-CancelarCerrarOc', 'search_b', 'LoadRecordsButtonCancelarCerrarOc');

        var table_container_CancelarCerrarOc = $("#table_container_CancelarCerrarOc");

        table_container_CancelarCerrarOc.jtable({
            title: "Lista de Ordenes de Compra",
            paging: true,
            sorting: true,
            actions: { 
                listAction: base_url + '/cancelarCerrarOcs/list',
            },
            messages: {
                addNewRecord: 'Nueva Categoría',
                editRecord: 'Editar Categoría',
            },
            toolbar: {
                items: [{
                    cssClass: 'buscador',
                    text: search
                }]
            },
            fields: {

               ident: {
                    title: '#',
                    key: true,
                    list:false,
                    create: false,
                    listClass: 'text-center',
                },
                id: {
                    title: '#',
                    create: false,
                    listClass: 'text-center',
                },
                 cCodConsecutivo: {
                    title: 'Código',
                    
                },
                 nConsecutivo: {
                    title: 'Consecutivo',
                    
                },
                iEstado: {

                    title: 'Estado',
                    values: { '1': 'Registrado', '2': 'Por Aprobar','3':'Aprobado','4':'Recibido','5':'Backorder','6':'Cerrado','7':'Cancelado','8':'Rechazado'},
                    type: 'checkbox',
                    defaultValue: 'A',
                   
                },
                Cancelar: {
                    width: '1%',
                    sorting: false,
                    edit: false,
                    create: false,
                     title: 'Cancelar',
                    listClass: 'text-center',
                    display: function (data) {
                        return '<a href="javascript:void(0)" class="cancelar-nota" data-iEstado="' + data.record.iEstado + '"  data-idcompra="' + data.record.id + '"    title="Cancelar"><i class="fa fa-ban fa-1-5x fa-red"></i></a>';
                    }

                },
                 Cerrar: {
                     title: 'Cerrar',
                    width: '1%',
                    sorting: false,
                    edit: false,
                    create: false,
                    listClass: 'text-center',
                    display: function (data) {
                        return '<a href="javascript:void(0)" class="cerrar-nota" data-iEstado="' + data.record.iEstado + '"  data-idcompra="' + data.record.id + '"    title="Cerrar"><i class="fa fa-times fa-1-5x fa-red"></i></a>';
                    }

                }

            },
           
             recordsLoaded: function (event, data) {


                $('.cancelar-nota').click(function (e) {

                var code = $(this).attr('data-idcompra');
                var estado = $(this).attr('data-iEstado');
                console.log(estado);
                if(estado=='2' || estado=='3' ){
                    AlertFactory.confirm({
                    title: '',
                    message: '¿Está seguro que desea cancelar Orden de Compra?',
                    confirm: 'Si',
                    cancel: 'No'
                    }, function () {
                       cambiarEstado(code,7);

                    });
                    e.preventDefault();
                }else{
                    AlertFactory.textType({
                            title: '',
                            message: "Solo se puede cancelar Ordenes de Compra en estado Por Aprobar o Aprobado",
                            type: 'info'
                    });
                }
                

            })
                $('.cerrar-nota').click(function (e) {

                var code = $(this).attr('data-idcompra');
                 var estado = $(this).attr('data-iEstado');
                 console.log(estado);
                if(estado=='5'){
                    AlertFactory.confirm({
                    title: '',
                    message: '¿Está seguro que desea cerrar Orden de Compra?',
                    confirm: 'Si',
                    cancel: 'No'
                    }, function () {
                       cambiarEstado(code,6);
                    });
                    e.preventDefault();
                }else{
                    AlertFactory.textType({
                            title: '',
                            message: "Solo se puede cerrar Ordenes de Compra en estado Backorder ",
                            type: 'info'
                    });
                }
                
            })
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

        generateSearchForm('frm-search-CancelarCerrarOc', 'LoadRecordsButtonCancelarCerrarOc', function(){
            table_container_CancelarCerrarOc.jtable('load', {
                search: $('#search_b').val()
            });
        }, true);
    }

    function Config($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('cancelarCerrarOcs', {
                url: '/cancelarCerrarOcs',
                templateUrl: base_url + '/templates/cancelarCerrarOcs/base.html',
                controller: 'CancelarCerrarOcCtrl'
            });

        $urlRouterProvider.otherwise('/');
    }
})
();