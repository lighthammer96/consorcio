/**
 * Created by JAIR on 4/5/2017.
 */
  
(function () {
    'use strict';
    angular.module('sys.app.areas')
        .config(Config)
        .controller('AreaCtrl', AreaCtrl);

    Config.$inject = ['$stateProvider', '$urlRouterProvider'];
    AreaCtrl.$inject = ['$scope'];

    function AreaCtrl($scope)
    {
        
         $scope.chkState = function () {
            var txt_state2 = (w_state.prop('checked')) ? 'Activo' : 'Inactivo';
            state_state.html(txt_state2);
        };
        
        var search = getFormSearch('frm-search-Area', 'search_b', 'LoadRecordsButtonArea');

        var table_container_Area = $("#table_container_Area");

        table_container_Area.jtable({
            title: "Lista de Areas",
            paging: true,
            sorting: true,
            actions: { 
                listAction: base_url + '/areas/list',
                createAction: base_url + '/areas/create',
                updateAction: base_url + '/areas/update',
                deleteAction: base_url + '/areas/delete',
            },
            messages: {
                addNewRecord: 'Nueva Area',
                editRecord: 'Editar Area',
            },
            toolbar: {
                items: [{
                    cssClass: 'buscador',
                    text: search
                },{
                    cssClass: 'btn-primary',
                    text: '<i class="fa fa-file-excel-o"></i> Exportar a Excel',
                    click: function () {
                        $scope.openDoc('areas/excel', {});
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
                    title: 'Area',
                     

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

        generateSearchForm('frm-search-Area', 'LoadRecordsButtonArea', function(){
            table_container_Area.jtable('load', {
                search: $('#search_b').val()
            });
        }, true);
    }

    function Config($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('areas', {
                url: '/areas',
                templateUrl: base_url + '/templates/areas/base.html',
                controller: 'AreaCtrl'
            });

        $urlRouterProvider.otherwise('/');
    }
})
();