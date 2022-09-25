/**
 * Created by JAIR on 4/5/2017.
 */

(function () {
    'use strict';
    angular.module('sys.app.motivos')
        .config(Config)
        .controller('MotivosCtrl', MotivosCtrl);

    Config.$inject = ['$stateProvider', '$urlRouterProvider'];
    MotivosCtrl.$inject = ['$scope'];

    function MotivosCtrl($scope)
    {
        var search = getFormSearch('frm-search-motivos', 'search_b', 'LoadRecordsButtonMotivos');

        var table_container_motivos = $("#table_container_motivos");

        table_container_motivos.jtable({
            title: "Lista de Motivos",
            paging: true,
            sorting: true,
            actions: {
                listAction: base_url + '/motivos/list',
                createAction: base_url + '/motivos/create',
                updateAction: base_url + '/motivos/update',
                deleteAction: base_url + '/motivos/delete',
            },
            messages: {
                addNewRecord: 'Nuevo Motivo',
                editRecord: 'Editar Motivo'
            },
            toolbar: {
                items: [{
                    cssClass: 'buscador',
                    text: search
                },{
                    cssClass: 'btn-primary',
                    text: '<i class="fa fa-file-excel-o"></i> Exportar a Excel',
                    click: function () {
                        // alert("hola");
                        $scope.openDoc('motivos/excel', {});
                    }
                }]
            },
            fields: {
                codigo: {
                    key: true,
                    create: true,
                    edit: false,
                    list: true,
                    title: 'Código',
                   
                },
                descripcion: {
                    title: 'Motivo'
                },
                estado: {
                    title: 'Estado',
                    values: { 'I': 'Inactivo', 'A': 'Activo' },
                    type: 'checkbox',
                    defaultValue: 'A',
                   
                },
            },
            formCreated: function (event, data) {
                data.form.find('input[name="codigo"]').attr('maxlength', '5');
                // data.form.find('input[name="forma_pago"]').attr('onkeypress','return soloLetras(event)');

                // console.log(data.form);

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
                bval = bval && data.form.find('input[name="codigo"]').required();
                bval = bval && data.form.find('input[name="descripcion"]').required();
                return bval;
            }
        });

        generateSearchForm('frm-search-motivos', 'LoadRecordsButtonMotivos', function(){
            table_container_motivos.jtable('load', {
                search: $('#search_b').val()
            });
        }, true);
    }

    function Config($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('motivos', {
                url: '/motivos',
                templateUrl: base_url + '/templates/motivos/base.html',
                controller: 'MotivosCtrl'
            });

        $urlRouterProvider.otherwise('/');
    }
})
();