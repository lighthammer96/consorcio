/**
 * Created by JAIR on 4/5/2017.
 */
  
(function () {
    'use strict';
    angular.module('sys.app.modelos')
        .config(Config)
        .controller('ModeloCtrl', ModeloCtrl);

    Config.$inject = ['$stateProvider', '$urlRouterProvider'];
    ModeloCtrl.$inject = ['$scope'];

    function ModeloCtrl($scope)
    {
        
         $scope.chkState = function () {
            var txt_state2 = (w_state.prop('checked')) ? 'Activo' : 'Inactivo';
            state_state.html(txt_state2);
        };
        
        var search = getFormSearch('frm-search-Modelo', 'search_b', 'LoadRecordsButtonModelo');

        var table_container_Modelo = $("#table_container_Modelo");

        table_container_Modelo.jtable({
            title: "Lista de Modelos",
            paging: true,
            sorting: true,
            actions: { 
                listAction: base_url + '/modelos/list',
                createAction: base_url + '/modelos/create',
                updateAction: base_url + '/modelos/update',
                deleteAction: base_url + '/modelos/delete',
            },
            messages: {
                addNewRecord: 'Nuevo Modelo',
                editRecord: 'Editar Modelo',
            },
            toolbar: {
                items: [{
                    cssClass: 'buscador',
                    text: search
                },{
                    cssClass: 'btn-primary',
                    text: '<i class="fa fa-file-excel-o"></i> Exportar a Excel',
                    click: function () {
                        $scope.openDoc('modelos/excel', {});
                    }
                }]
            },
            fields: {
                idModelo: {
                    key: true,
                    create: false,
                    edit: false,
                    list: false
                },
                 idMarca: {
                    title: 'Marca',
                    options: base_url + '/modelos/getMarca' ,
                      listClass: 'text-center',
                },
                
                Modelo: {
                    title: 'Modelo',
                     listClass: 'text-center',
                     

                },
               
                estado: {
                    title: 'Estado',
                    values: { 'I': 'Inactivo', 'A': 'Activo' },
                    type: 'checkbox',
                    listClass: 'text-center',
                     defaultValue: 'A',
                   
                   
                },

            },
           

            formCreated: function (event, data) {
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
                bval = bval && data.form.find('input[name="Modelo"]').required();
                return bval;
            }
        });

        generateSearchForm('frm-search-Modelo', 'LoadRecordsButtonModelo', function(){
            table_container_Modelo.jtable('load', {
                search: $('#search_b').val()
            });
        }, true);
    }

    function Config($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('modelos', {
                url: '/modelos',
                templateUrl: base_url + '/templates/modelos/base.html',
                controller: 'ModeloCtrl'
            });

        $urlRouterProvider.otherwise('/');
    }
})
();