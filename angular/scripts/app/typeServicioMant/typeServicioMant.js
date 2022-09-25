/**
 * Created by JAIR on 4/5/2017.
 */
  
(function () {
    'use strict';
    angular.module('sys.app.typeServicioMants')
        .config(Config)
        .controller('TypeServicioMantCtrl', TypeServicioMantCtrl);

    Config.$inject = ['$stateProvider', '$urlRouterProvider'];
    TypeServicioMantCtrl.$inject = ['$scope'];

    function TypeServicioMantCtrl($scope)
    {
        
         $scope.chkState = function () {
            var txt_state2 = (w_state.prop('checked')) ? 'Activo' : 'Inactivo';
            state_state.html(txt_state2);
        };
        
        var search = getFormSearch('frm-search-TypeServicioMant', 'search_b', 'LoadRecordsButtonTypeServicioMant');

        var table_container_TypeServicioMant = $("#table_container_TypeServicioMant");

        table_container_TypeServicioMant.jtable({
            title: "Lista de Servicio de Mantenimiento",
            paging: true,
            sorting: true,
            actions: { 
                listAction: base_url + '/typeServicioMants/list',
                createAction: base_url + '/typeServicioMants/create',
                updateAction: base_url + '/typeServicioMants/update',
                deleteAction: base_url + '/typeServicioMants/delete',
            },
            messages: {
                addNewRecord: 'Nuevo Servicio de Mantenimiento',
                editRecord: 'Editar Servicio de Mantenimiento',
            },
            toolbar: {
                items: [{
                    cssClass: 'buscador',
                    text: search
                },{
                    cssClass: 'btn-primary',
                    text: '<i class="fa fa-file-excel-o"></i> Exportar a Excel',
                    click: function () {
                        $scope.openDoc('typeServicioMants/excel', {});
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
                    title: 'Tip. de Servicio',
                     

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

        generateSearchForm('frm-search-TypeServicioMant', 'LoadRecordsButtonTypeServicioMant', function(){
            table_container_TypeServicioMant.jtable('load', {
                search: $('#search_b').val()
            });
        }, true);
    }

    function Config($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('typeServicioMants', {
                url: '/typeServicioMants',
                templateUrl: base_url + '/templates/typeServicioMants/base.html',
                controller: 'TypeServicioMantCtrl'
            });

        $urlRouterProvider.otherwise('/');
    }
})
();