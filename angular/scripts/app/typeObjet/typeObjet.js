/**
 * Created by JAIR on 4/5/2017.
 */
  
(function () {
    'use strict';
    angular.module('sys.app.typeObjets')
        .config(Config)
        .controller('TypeObjetCtrl', TypeObjetCtrl);

    Config.$inject = ['$stateProvider', '$urlRouterProvider'];
    TypeObjetCtrl.$inject = ['$scope'];

    function TypeObjetCtrl($scope)
    {
        
         $scope.chkState = function () {
            var txt_state2 = (w_state.prop('checked')) ? 'Activo' : 'Inactivo';
            state_state.html(txt_state2);
        };
        
        var search = getFormSearch('frm-search-TypeObjet', 'search_b', 'LoadRecordsButtonTypeObjet');

        var table_container_TypeObjet = $("#table_container_TypeObjet");

        table_container_TypeObjet.jtable({
            title: "Lista de Tipos de Objetivos",
            paging: true,
            sorting: true,
            actions: { 
                listAction: base_url + '/typeObjets/list',
                createAction: base_url + '/typeObjets/create',
                updateAction: base_url + '/typeObjets/update',
                deleteAction: base_url + '/typeObjets/delete',
            },
            messages: {
                addNewRecord: 'Nuevo Tipo de Objetivo',
                editRecord: 'Editar Tipo de Objetivo',
            },
            toolbar: {
                items: [{
                    cssClass: 'buscador',
                    text: search
                },{
                    cssClass: 'btn-primary',
                    text: '<i class="fa fa-file-excel-o"></i> Exportar a Excel',
                    click: function () {
                        $scope.openDoc('typeObjets/excel', {});
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
                    title: 'Tipo de Objetivo',
                     

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

        generateSearchForm('frm-search-TypeObjet', 'LoadRecordsButtonTypeObjet', function(){
            table_container_TypeObjet.jtable('load', {
                search: $('#search_b').val()
            });
        }, true);
    }

    function Config($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('typeObjets', {
                url: '/typeObjets',
                templateUrl: base_url + '/templates/typeObjets/base.html',
                controller: 'TypeObjetCtrl'
            });

        $urlRouterProvider.otherwise('/');
    }
})
();