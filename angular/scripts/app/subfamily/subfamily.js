/**
 * Created by JAIR on 4/5/2017.
 */
  
(function () {
    'use strict';
    angular.module('sys.app.subfamilies')
        .config(Config)
        .controller('SubFamilyCtrl', SubFamilyCtrl);

    Config.$inject = ['$stateProvider', '$urlRouterProvider'];
    SubFamilyCtrl.$inject = ['$scope'];

    function SubFamilyCtrl($scope)
    {
        
         $scope.chkState = function () {
            var txt_state2 = (w_state.prop('checked')) ? 'Activo' : 'Inactivo';
            state_state.html(txt_state2);
        };
        
        var search = getFormSearch('frm-search-SubFamily', 'search_b', 'LoadRecordsButtonSubFamily');

        var table_container_SubFamily = $("#table_container_SubFamily");

        table_container_SubFamily.jtable({
            title: "Lista de Sub Familias",
            paging: true,
            sorting: true,
            actions: { 
                listAction: base_url + '/subfamilies/list',
                createAction: base_url + '/subfamilies/create',
                updateAction: base_url + '/subfamilies/update',
                deleteAction: base_url + '/subfamilies/delete',
            },
            messages: {
                addNewRecord: 'Nueva Sub Familia',
                editRecord: 'Editar Sub Familia',
            },
            toolbar: {
                items: [{
                    cssClass: 'buscador',
                    text: search
                },{
                    cssClass: 'btn-primary',
                    text: '<i class="fa fa-file-excel-o"></i> Exportar a Excel',
                    click: function () {
                        $scope.openDoc('subfamilies/excel', {});
                    }
                }]
            },
            fields: {
                idSubFamilia: {
                    key: true,
                    create: false,
                    edit: false,
                    list: false
                },
                
                idFamilia: {
                    title: 'Familia',
                    options: base_url + '/subfamilies/getFamilies' 

                },
                SubFamilia: {
                    title: 'Sub Familia',
                     

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

        generateSearchForm('frm-search-SubFamily', 'LoadRecordsButtonSubFamily', function(){
            table_container_SubFamily.jtable('load', {
                search: $('#search_b').val()
            });
        }, true);
    }

    function Config($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('subfamilies', {
                url: '/subfamilies',
                templateUrl: base_url + '/templates/subfamilies/base.html',
                controller: 'SubFamilyCtrl'
            });

        $urlRouterProvider.otherwise('/');
    }
})
();