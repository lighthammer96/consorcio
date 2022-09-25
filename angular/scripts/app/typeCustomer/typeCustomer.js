/**
 * Created by JAIR on 4/5/2017.
 */
  
(function () {
    'use strict';
    angular.module('sys.app.typeCustomers')
        .config(Config)
        .controller('TypeCustomerCtrl', TypeCustomerCtrl);

    Config.$inject = ['$stateProvider', '$urlRouterProvider'];
    TypeCustomerCtrl.$inject = ['$scope'];

    function TypeCustomerCtrl($scope)
    {
        
         $scope.chkState = function () {
            var txt_state2 = (w_state.prop('checked')) ? 'Activo' : 'Inactivo';
            state_state.html(txt_state2);
        };
        
        var search = getFormSearch('frm-search-TypeCustomer', 'search_b', 'LoadRecordsButtonTypeCustomer');

        var table_container_TypeCustomer = $("#table_container_TypeCustomer");

        table_container_TypeCustomer.jtable({
            title: "Lista de Tipos de Clientes",
            paging: true,
            sorting: true,
            actions: { 
                listAction: base_url + '/typeCustomers/list',
                createAction: base_url + '/typeCustomers/create',
                updateAction: base_url + '/typeCustomers/update',
                deleteAction: base_url + '/typeCustomers/delete',
            },
            messages: {
                addNewRecord: 'Nuevo Tipo Cliente',
                editRecord: 'Editar Tipo Cliente',
            },
            toolbar: {
                items: [{
                    cssClass: 'buscador',
                    text: search
                },{
                    cssClass: 'btn-primary',
                    text: '<i class="fa fa-file-excel-o"></i> Exportar a Excel',
                    click: function () {
                        $scope.openDoc('typeCustomers/excel', {});
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
                    title: 'Tipo Cliente',
                     

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

        generateSearchForm('frm-search-TypeCustomer', 'LoadRecordsButtonTypeCustomer', function(){
            table_container_TypeCustomer.jtable('load', {
                search: $('#search_b').val()
            });
        }, true);
    }

    function Config($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('typeCustomers', {
                url: '/typeCustomers',
                templateUrl: base_url + '/templates/typeCustomers/base.html',
                controller: 'TypeCustomerCtrl'
            });

        $urlRouterProvider.otherwise('/');
    }
})
();