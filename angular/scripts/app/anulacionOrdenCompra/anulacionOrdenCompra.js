/**
 * Created by JAIR on 4/5/2017.
 */
  
(function () {
    'use strict';
    angular.module('sys.app.anulacionOrdenCompras')
        .config(Config)
        .controller('AnulacionOrdenCompraCtrl', AnulacionOrdenCompraCtrl);

    Config.$inject = ['$stateProvider', '$urlRouterProvider'];
    AnulacionOrdenCompraCtrl.$inject =['$scope','_', 'RESTService', 'AlertFactory', 'Notify'];

    function AnulacionOrdenCompraCtrl($scope, _, RESTService, AlertFactory, Notify)
    {
        
         $scope.chkState = function () {
            var txt_state2 = (w_state.prop('checked')) ? 'Activo' : 'Inactivo';
            state_state.html(txt_state2);
        };
        
        var search = getFormSearch('frm-search-AnulacionOrdenCompra', 'search_b', 'LoadRecordsButtonAnulacionOrdenCompra');

        var table_container_AnulacionOrdenCompra = $("#table_container_AnulacionOrdenCompra");

        table_container_AnulacionOrdenCompra.jtable({
            title: "Lista de Ordenes de Compra",
            paging: true,
            sorting: true,
            actions: { 
                listAction: base_url + '/anulacionOrdenCompras/list',
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
                idOrden: {
                    title: 'id',
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
                Anular: {
                    width: '1%',
                    sorting: false,
                    edit: false,
                    create: false,
                     title: 'Anular',
                    listClass: 'text-center',
                    display: function (data) {
                        return '<a href="javascript:void(0)" class="anular-nota" data-iEstado="' + data.record.iEstado + '"  data-idcompra="' + data.record.id + '"    title="Cancelar"><i class="fa fa-ban fa-1-5x fa-red"></i></a>';
                    }

                }

            },
           recordsLoaded: function (event, data) {

                $('.anular-nota').click(function (e) {
                var code = $(this).attr('data-idcompra');
                var estado = $(this).attr('data-iEstado');
                console.log(estado);
                AlertFactory.confirm({
                title: '',
                message: '¿Está seguro que desea anular está orden de compra?',
                confirm: 'Si',
                cancel: 'No'
                }, function () {
                   // cambiarEstado(code,7);
                });
                e.preventDefault();
          
                

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

        generateSearchForm('frm-search-AnulacionOrdenCompra', 'LoadRecordsButtonAnulacionOrdenCompra', function(){
            table_container_AnulacionOrdenCompra.jtable('load', {
                search: $('#search_b').val()
            });
        }, true);
    }

    function Config($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('anulacionOrdenCompras', {
                url: '/anulacionOrdenCompras',
                templateUrl: base_url + '/templates/anulacionOrdenCompras/base.html',
                controller: 'AnulacionOrdenCompraCtrl'
            });

        $urlRouterProvider.otherwise('/');
    }
})
();