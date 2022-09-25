/**
 * Created by JAIR on 4/5/2017.
 */
  
(function () {
    'use strict';
    angular.module('sys.app.advisers')
        .config(Config)
        .controller('AdviserCtrl', AdviserCtrl);

    Config.$inject = ['$stateProvider', '$urlRouterProvider'];
    AdviserCtrl.$inject = ['$scope'];

    function AdviserCtrl($scope)
    {
        
         $scope.chkState = function () {
            var txt_state2 = (w_state.prop('checked')) ? 'Activo' : 'Inactivo';
            state_state.html(txt_state2);
        };
        
        var search = getFormSearch('frm-search-Adviser', 'search_b', 'LoadRecordsButtonAdviser');

        var table_container_Adviser = $("#table_container_Adviser");

        table_container_Adviser.jtable({
            title: "Lista de Asesores",
            paging: true,
            sorting: true,
            actions: { 
                listAction: base_url + '/advisers/list',
                createAction: base_url + '/advisers/create',
                updateAction: base_url + '/advisers/update',
                deleteAction: base_url + '/advisers/delete',
            },
            messages: {
                addNewRecord: 'Nuevo Asesor',
                editRecord: 'Editar Asesor',
            },
            toolbar: {
                items: [{
                    cssClass: 'buscador',
                    text: search
                },{
                    cssClass: 'btn-primary',
                    text: '<i class="fa fa-file-excel-o"></i> Exportar a Excel',
                    click: function () {
                        $scope.openDoc('advisers/excel', {});
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
                    title: 'Asesor',
                     

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
                bval = bval && data.form.find('input[name="descripcion"]').required();
                return bval;
            }
        });

        generateSearchForm('frm-search-Adviser', 'LoadRecordsButtonAdviser', function(){
            table_container_Adviser.jtable('load', {
                search: $('#search_b').val()
            });
        }, true);
    }

    function Config($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('advisers', {
                url: '/advisers',
                templateUrl: base_url + '/templates/advisers/base.html',
                controller: 'AdviserCtrl'
            });

        $urlRouterProvider.otherwise('/');
    }
})
();