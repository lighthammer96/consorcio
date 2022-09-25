/**
 * Created by JAIR on 4/5/2017.
 */
  
(function () {
    'use strict';
    angular.module('sys.app.generation_remisions')
        .config(Config)
        .controller('Generation_RemisionCtrl', Generation_RemisionCtrl);

    Config.$inject = ['$stateProvider', '$urlRouterProvider'];
    Generation_RemisionCtrl.$inject = ['$scope'];

    function Generation_RemisionCtrl($scope)
    {    


        var titlemodalRemision=$("#titlemodalRemision");
        var modalRemision=$("#modalRemision");

        function newRemision()
        {
            titlemodalRemision.html('Nueva Remision');
            modalRemision.modal('show');
        }
        
         $scope.chkState = function () {
            var txt_state2 = (w_state.prop('checked')) ? 'Activo' : 'Inactivo';
            state_state.html(txt_state2);
        };
        
        var search = getFormSearch('frm-search-Generation_Remision', 'search_b', 'LoadRecordsButtonGeneration_Remision');

        var table_container_Generation_Remision = $("#table_container_Generation_Remision");

        table_container_Generation_Remision.jtable({
            title: "Lista de Categorías",
            paging: true,
            sorting: true,
            actions: { 
                listAction: base_url + '/categories/list',
                // createAction: base_url + '/generation_remisions/create',
                // updateAction: base_url + '/generation_remisions/update',
                // deleteAction: base_url + '/generation_remisions/delete',
            },
            messages: {
                addNewRecord: 'Nueva Categoría',
                editRecord: 'Editar Categoría',
            },
            toolbar: {
                items: [{
                    cssClass: 'buscador',
                    text: search
                },{
                    cssClass: 'btn-primary',
                    text: '<i class="fa fa-file-excel-o"></i> Exportar a Excel',
                    click: function () {
                        $scope.openDoc('generation_remisions/excel', {});
                    }
                },{
                    cssClass: 'btn-danger-admin',
                    text: '<i class="fa fa-plus"></i> Nueva generación remisión',
                    click: function () {
                        newRemision();
                    }
                }]
            },
            fields: {
                idCategoria: {
                    key: true,
                    create: false,
                    edit: false,
                    list: false
                },
                Categoria: {
                    title: 'Categoría',
                     

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

        generateSearchForm('frm-search-Generation_Remision', 'LoadRecordsButtonGeneration_Remision', function(){
            table_container_Generation_Remision.jtable('load', {
                search: $('#search_b').val()
            });
        }, true);
    }

    function Config($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('generation_remisions', {
                url: '/generation_remisions',
                templateUrl: base_url + '/templates/generation_remisions/base.html',
                controller: 'Generation_RemisionCtrl'
            });

        $urlRouterProvider.otherwise('/');
    }
})
();