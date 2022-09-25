/**
 * Created by JAIR on 4/5/2017.
 */
  
(function () {
    'use strict';
    angular.module('sys.app.tipoProveedors')
        .config(Config)
        .controller('TipoProveedorCtrl', TipoProveedorCtrl);

    Config.$inject = ['$stateProvider', '$urlRouterProvider'];
    TipoProveedorCtrl.$inject = ['$scope'];

    function TipoProveedorCtrl($scope)
    {
         $('.ui-dialog').css({ 'width':'600px' });
         $scope.chkState = function () {
            var txt_state2 = (w_state.prop('checked')) ? 'Activo' : 'Inactivo';
            state_state.html(txt_state2);
        };
        
        var search = getFormSearch('frm-search-TipoProveedor', 'search_b', 'LoadRecordsButtonTipoProveedor');

        var table_container_TipoProveedor = $("#table_container_TipoProveedor");

        table_container_TipoProveedor.jtable({
            title: "Lista de Tipo de Proveedores",
            paging: true,
            sorting: true,
            actions: { 
                listAction: base_url + '/tipoProveedors/list',
                createAction: base_url + '/tipoProveedors/create',
                updateAction: base_url + '/tipoProveedors/update',
                deleteAction: base_url + '/tipoProveedors/delete',
            },
            messages: {
                addNewRecord: 'Nuevo Tipo Proveedor',
                editRecord: 'Editar Tipo Proveedor',
            },
            toolbar: {
                items: [{
                    cssClass: 'buscador',
                    text: search
                },{
                    cssClass: 'btn-primary',
                    text: '<i class="fa fa-file-excel-o"></i> Exportar a Excel',
                    click: function () {
                        $scope.openDoc('tipoProveedors/excel', {});
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
                descripcion: {
                    title: 'Tipo Proveedor',
                },
                cuentaPagar: {
                    title: 'Cta. por Pagar',
                },
                cCostoCuentaPagar: {
                    title: 'Cen. Costo Pagar',
                },
                cuentaCierreDevito: {
                    title: 'Cta. Cierre Débito',
                   
                },

                cCostoCuentaCieDev: {
                    title: 'Cen. Costo Débito',
                   
                },

                cuentaCierreCredito: {
                    title: 'Cta. Cierre Crédito',
                   
                },

                cCostoCuentaCieCre: {
                    title: 'Cen. Costo Crédito',
                   
                },

                estado: {
                    title: 'Estado',
                    values: { 'I': 'Inactivo', 'A': 'Activo' },
                    type: 'checkbox',
                    defaultValue: 'A',
                   
                },

            },
           

            formCreated: function (event, data) {
                data.form.find('input[name="Categoria"]').attr('onkeypress','return soloLetras(event)');
                data.form.find('input[name="cuentaCierreDevito"]').removeClass('col-md-4');
                data.form.find('input[name="cuentaCierreDevito"]').addClass('col-md-3');
              
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
                bval = bval && data.form.find('input[name="descripcion"]').required();
                return bval;
            }
        });

        generateSearchForm('frm-search-TipoProveedor', 'LoadRecordsButtonTipoProveedor', function(){
            table_container_TipoProveedor.jtable('load', {
                search: $('#search_b').val()
            });
        }, true);

        $('.ui-dialog').css({ 'width':'600px' });

    }

    function Config($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('tipoProveedors', {
                url: '/tipoProveedors',
                templateUrl: base_url + '/templates/tipoProveedors/base.html',
                controller: 'TipoProveedorCtrl'
            });

        $urlRouterProvider.otherwise('/');
    }
})
();