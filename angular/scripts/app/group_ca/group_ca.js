/**
 * Created by JAIR on 4/5/2017.
 */
  
(function () {
    'use strict';
    angular.module('sys.app.group_cas')
        .config(Config)
        .controller('Group_caCtrl', Group_caCtrl);

    Config.$inject = ['$stateProvider', '$urlRouterProvider'];
    Group_caCtrl.$inject = ['$scope'];

    function Group_caCtrl($scope)
    {
        
         $scope.chkState = function () {
            var txt_state2 = (w_state.prop('checked')) ? 'Activo' : 'Inactivo';
            state_state.html(txt_state2);
        };
        
        var search = getFormSearch('frm-search-Group_ca', 'search_b', 'LoadRecordsButtonGroup_ca');

        var table_container_Group_ca = $("#table_container_Group_ca");

        table_container_Group_ca.jtable({
            title: "Lista de Grupos",
            paging: true,
            sorting: true,
            actions: { 
                listAction: base_url + '/group_cas/list',
                createAction: base_url + '/group_cas/create',
                updateAction: base_url + '/group_cas/update',
                deleteAction: base_url + '/group_cas/delete',
            },
            messages: {
                addNewRecord: 'Nuevo Grupo',
                editRecord: 'Editar Grupo',
            },
            toolbar: {
                items: [{
                    cssClass: 'buscador',
                    text: search
                },{
                    cssClass: 'btn-primary',
                    text: '<i class="fa fa-file-excel-o"></i> Exportar a Excel',
                    click: function () {
                        $scope.openDoc('group_cas/excel', {});
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
                nombre: {
                    title: 'Grupo',
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

        generateSearchForm('frm-search-Group_ca', 'LoadRecordsButtonGroup_ca', function(){
            table_container_Group_ca.jtable('load', {
                search: $('#search_b').val()
            });
        }, true);
    }

    function Config($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('group_cas', {
                url: '/group_cas',
                templateUrl: base_url + '/templates/group_cas/base.html',
                controller: 'Group_caCtrl'
            });

        $urlRouterProvider.otherwise('/');
    }
})
();