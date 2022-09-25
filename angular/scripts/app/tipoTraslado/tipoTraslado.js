/**
 * Created by JAIR on 4/5/2017.
 */
  
(function () {
    'use strict';
    angular.module('sys.app.tipoTraslados')
        .config(Config)
        .controller('TipoTrasladoCtrl', TipoTrasladoCtrl);

    Config.$inject = ['$stateProvider', '$urlRouterProvider'];
    TipoTrasladoCtrl.$inject = ['$scope'];

    function TipoTrasladoCtrl($scope)
    {
        
         $scope.chkState = function () {
            var txt_state2 = (w_state.prop('checked')) ? 'Activo' : 'Inactivo';
            state_state.html(txt_state2);
        };
        
        var search = getFormSearch('frm-search-TipoTraslado', 'search_b', 'LoadRecordsButtonTipoTraslado');

        var table_container_TipoTraslado = $("#table_container_TipoTraslado");

        table_container_TipoTraslado.jtable({
            title: "Lista de Tipos de Traslados",
            paging: true,
            sorting: true,
            actions: { 
                listAction: base_url + '/tipoTraslados/list',
                createAction: base_url + '/tipoTraslados/create',
                updateAction: base_url + '/tipoTraslados/update',
                deleteAction: base_url + '/tipoTraslados/delete',
            },
            messages: {
                addNewRecord: 'Nuevo Traslado',
                editRecord: 'Editar Traslado',
            },
            toolbar: {
                items: [{
                    cssClass: 'buscador',
                    text: search
                },{
                    cssClass: 'btn-primary',
                    text: '<i class="fa fa-file-excel-o"></i> Exportar a Excel',
                    click: function () {
                        $scope.openDoc('tipoTraslados/excel', {});
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
                    title: 'Tipo Traslado',
                     

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

        generateSearchForm('frm-search-TipoTraslado', 'LoadRecordsButtonTipoTraslado', function(){
            table_container_TipoTraslado.jtable('load', {
                search: $('#search_b').val()
            });
        }, true);
    }

    function Config($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('tipoTraslados', {
                url: '/tipoTraslados',
                templateUrl: base_url + '/templates/tipoTraslados/base.html',
                controller: 'TipoTrasladoCtrl'
            });

        $urlRouterProvider.otherwise('/');
    }
})
();