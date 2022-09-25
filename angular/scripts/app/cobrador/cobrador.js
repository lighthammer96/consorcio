/**
 * Created by JAIR on 4/5/2017.
 */
  
(function () {
    'use strict';
    angular.module('sys.app.cobradors')
        .config(Config)
        .controller('CobradorCtrl', CobradorCtrl);

    Config.$inject = ['$stateProvider', '$urlRouterProvider'];
    CobradorCtrl.$inject = ['$scope'];

    function CobradorCtrl($scope)
    {
        
         $scope.chkState = function () {
            var txt_state2 = (w_state.prop('checked')) ? 'Activo' : 'Inactivo';
            state_state.html(txt_state2);
        };
        
        var search = getFormSearch('frm-search-Cobrador', 'search_b', 'LoadRecordsButtonCobrador');

        var table_container_Cobrador = $("#table_container_Cobrador");

        table_container_Cobrador.jtable({
            title: "Lista de Cobradores",
            paging: true,
            sorting: true,
            actions: { 
                listAction: base_url + '/cobradors/list',
                createAction: base_url + '/cobradors/create',
                updateAction: base_url + '/cobradors/update',
                deleteAction: base_url + '/cobradors/delete',
            },
            messages: {
                addNewRecord: 'Nuevo Cobrador',
                editRecord: 'Editar Cobrador',
            },
            toolbar: {
                items: [{
                    cssClass: 'buscador',
                    text: search
                },{
                    cssClass: 'btn-primary',
                    text: '<i class="fa fa-file-excel-o"></i> Exportar a Excel',
                    click: function () {
                        $scope.openDoc('cobradors/excel', {});
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
                    title: 'Cobrador',
                     

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

        generateSearchForm('frm-search-Cobrador', 'LoadRecordsButtonCobrador', function(){
            table_container_Cobrador.jtable('load', {
                search: $('#search_b').val()
            });
        }, true);
    }

    function Config($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('cobradors', {
                url: '/cobradors',
                templateUrl: base_url + '/templates/cobradors/base.html',
                controller: 'CobradorCtrl'
            });

        $urlRouterProvider.otherwise('/');
    }
})
();