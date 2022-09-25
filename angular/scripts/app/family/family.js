/**
 * Created by JAIR on 4/5/2017.
 */
  
(function () {
    'use strict';
    angular.module('sys.app.families')
        .config(Config)
        .controller('FamilyCtrl', FamilyCtrl);

    Config.$inject = ['$stateProvider', '$urlRouterProvider'];
    FamilyCtrl.$inject = ['$scope'];

    function FamilyCtrl($scope)
    {
        
         $scope.chkState = function () {
            var txt_state2 = (w_state.prop('checked')) ? 'Activo' : 'Inactivo';
            state_state.html(txt_state2);
        };
        
        var search = getFormSearch('frm-search-Family', 'search_b', 'LoadRecordsButtonFamily');

        var table_container_Family = $("#table_container_Family");

        table_container_Family.jtable({
            title: "Lista de Familias",
            paging: true,
            sorting: true,
            actions: { 
                listAction: base_url + '/families/list',
                createAction: base_url + '/families/create',
                updateAction: base_url + '/families/update',
                deleteAction: base_url + '/families/delete',
            },
            messages: {
                addNewRecord: 'Nueva Familia',
                editRecord: 'Editar Familia',
            },
            toolbar: {
                items: [{
                    cssClass: 'buscador',
                    text: search
                },{
                    cssClass: 'btn-primary',
                    text: '<i class="fa fa-file-excel-o"></i> Exportar a Excel',
                    click: function () {
                        $scope.openDoc('families/excel', {});
                    }
                }]
            },
            fields: {
                idFamilia: {
                    key: true,
                    create: false,
                    edit: false,
                    list: false
                },
                Familia: {
                    title: 'Familia',
                     

                },
                estado: {
                    title: 'Estado',
                    values: { 'I': 'Inactivo', 'A': 'Activo' },
                    type: 'checkbox',
                     defaultValue: 'A',
                   
                   
                },

            },
           

            formCreated: function (event, data) {
                data.form.find('input[name="Familia"]').attr('onkeypress','return soloLetras(event)');
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
                bval = bval && data.form.find('input[name="Familia"]').required();
                return bval;
            }
        });

        generateSearchForm('frm-search-Family', 'LoadRecordsButtonFamily', function(){
            table_container_Family.jtable('load', {
                search: $('#search_b').val()
            });
        }, true);
    }

    function Config($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('families', {
                url: '/families',
                templateUrl: base_url + '/templates/families/base.html',
                controller: 'FamilyCtrl'
            });

        $urlRouterProvider.otherwise('/');
    }
})
();