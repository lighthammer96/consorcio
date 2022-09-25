/**
 * Created by JAIR on 4/5/2017.
 */
  
(function () {
    'use strict';
    angular.module('sys.app.empresas')
        .config(Config)
        .controller('EmpresaCtrl', EmpresaCtrl);

    Config.$inject = ['$stateProvider', '$urlRouterProvider'];
    EmpresaCtrl.$inject = ['$scope'];

    function EmpresaCtrl($scope)
    {
        
         $scope.chkState = function () {
            var txt_state2 = (w_state.prop('checked')) ? 'Activo' : 'Inactivo';
            state_state.html(txt_state2);
        };
        
        var search = getFormSearch('frm-search-Empresa', 'search_b', 'LoadRecordsButtonEmpresa');

        var table_container_Empresa = $("#table_container_Empresa");

        table_container_Empresa.jtable({
            title: "Lista de Empresas",
            paging: true,
            sorting: true,
            actions: { 
                listAction: base_url + '/empresas/list',
                createAction: base_url + '/empresas/create',
                updateAction: base_url + '/empresas/update',
                deleteAction: base_url + '/empresas/delete',
            },
            messages: {
                addNewRecord: 'Nueva Empresa',
                editRecord: 'Editar Empresa',
            },
            toolbar: {
                items: [{
                    cssClass: 'buscador',
                    text: search
                },{
                    cssClass: 'btn-primary',
                    text: '<i class="fa fa-file-excel-o"></i> Exportar a Excel',
                    click: function () {
                        $scope.openDoc('empresas/excel', {});
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
                    title: 'Empresa',
                     

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

        generateSearchForm('frm-search-Empresa', 'LoadRecordsButtonEmpresa', function(){
            table_container_Empresa.jtable('load', {
                search: $('#search_b').val()
            });
        }, true);
    }

    function Config($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('empresas', {
                url: '/empresas',
                templateUrl: base_url + '/templates/empresas/base.html',
                controller: 'EmpresaCtrl'
            });

        $urlRouterProvider.otherwise('/');
    }
})
();