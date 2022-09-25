/**
 * Created by JAIR on 4/5/2017.
 */
  
(function () {
    'use strict';
    angular.module('sys.app.revision_cas')
        .config(Config)
        .controller('Revision_caCtrl', Revision_caCtrl);

    Config.$inject = ['$stateProvider', '$urlRouterProvider'];
    Revision_caCtrl.$inject = ['$scope'];

    function Revision_caCtrl($scope)
    {
        
         $scope.chkState = function () {
            var txt_state2 = (w_state.prop('checked')) ? 'Activo' : 'Inactivo';
            state_state.html(txt_state2);
        };
        
        var search = getFormSearch('frm-search-Revision_ca', 'search_b', 'LoadRecordsButtonRevision_ca');

        var table_container_Revision_ca = $("#table_container_Revision_ca");

        table_container_Revision_ca.jtable({
            title: "Lista de Revisiones",
            paging: true,
            sorting: true,
            actions: { 
                listAction: base_url + '/revision_cas/list',
                createAction: base_url + '/revision_cas/create',
                updateAction: base_url + '/revision_cas/update',
                deleteAction: base_url + '/revision_cas/delete',
            },
            messages: {
                addNewRecord: 'Nueva Revisión',
                editRecord: 'Editar Revisión',
            },
            toolbar: {
                items: [{
                    cssClass: 'buscador',
                    text: search
                },{
                    cssClass: 'btn-primary',
                    text: '<i class="fa fa-file-excel-o"></i> Exportar a Excel',
                    click: function () {
                        $scope.openDoc('revision_cas/excel', {});
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
                    title: 'Revisión',
                },
                idgrupo: {
                    title: 'Grupo',
                    options: base_url + '/revision_cas/getGrupo' ,
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
                bval = bval && data.form.find('input[name="nombre"]').required();
                return bval;
            }
        });

        generateSearchForm('frm-search-Revision_ca', 'LoadRecordsButtonRevision_ca', function(){
            table_container_Revision_ca.jtable('load', {
                search: $('#search_b').val()
            });
        }, true);
    }

    function Config($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('revision_cas', {
                url: '/revision_cas',
                templateUrl: base_url + '/templates/revision_cas/base.html',
                controller: 'Revision_caCtrl'
            });

        $urlRouterProvider.otherwise('/');
    }
})
();