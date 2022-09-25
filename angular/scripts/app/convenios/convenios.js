/**
 * Created by JAIR on 4/5/2017.
 */

(function () {
    'use strict';
    angular.module('sys.app.convenios')
        .config(Config)
        .controller('ConveniosCtrl', ConveniosCtrl);

    Config.$inject = ['$stateProvider', '$urlRouterProvider'];
    ConveniosCtrl.$inject = ['$scope'];

    function ConveniosCtrl($scope)
    {
        var search = getFormSearch('frm-search-brand', 'search_b', 'LoadRecordsButtonBrand');

        var table_container_convenios = $("#table_container_convenios");

        table_container_convenios.jtable({
            title: "Lista de Convenios",
            paging: true,
            sorting: true,
            actions: {
                listAction: base_url + '/convenios/list',
                createAction: base_url + '/convenios/create',
                updateAction: base_url + '/convenios/update',
                deleteAction: base_url + '/convenios/delete',
            },
            messages: {
                addNewRecord: 'Nuevo Convenio',
                editRecord: 'Editar Convenio'
            },
            toolbar: {
                items: [{
                    cssClass: 'buscador',
                    text: search
                },{
                    cssClass: 'btn-primary',
                    text: '<i class="fa fa-file-excel-o"></i> Exportar a Excel',
                    click: function () {
                        $scope.openDoc('convenios/excel', {});
                    }
                }]
            },
            fields: {
                idconvenio: {
                    key: true,
                    create: false,
                    edit: false,
                    list: false,
                },
                convenio: {
                    title: 'Convenio'
                },
                estado: {
                    title: 'Estado',
                    values: { 0: 'No Vigente', 1: 'Vigente' },
                    type: 'checkbox',
                    listClass: 'text-center',
                     defaultValue: 1,
                   
                   
                },
            },
            formCreated: function (event, data) {
     
                // data.form.find('input[name="convenio"]').attr('onkeypress','return soloLetras(event)');
                $('#Edit-estado').parent().addClass('i-checks');
               
                $('.i-checks').iCheck({
                    checkboxClass: 'icheckbox_square-green'
                }).on('ifChanged', function (e) {
                    $(e.target).click();
                    // alert(e.target.value);
                     if(e.target.value==1){
                        $("#Edit-estado").val(0);
                        $(".i-checks span").text("No Vigente");

                     }else{
                        $("#Edit-estado").val(1);
                        $(".i-checks span").text("Vigente");
                     };
                });
                // console.log(data.form);
            },
            formSubmitting: function (event, data) {
                var bval = true;
                // bval = bval && data.form.find('input[name="codigo_formapago"]').required();
                bval = bval && data.form.find('input[name="convenio"]').required();
                bval = bval && data.form.find('input[name="estado"]').required();
                return bval;
            }
        });

        generateSearchForm('frm-search-brand', 'LoadRecordsButtonBrand', function(){
            table_container_convenios.jtable('load', {
                search: $('#search_b').val()
            });
        }, true);
    }

    function Config($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('convenios', {
                url: '/convenios',
                templateUrl: base_url + '/templates/convenios/base.html',
                controller: 'ConveniosCtrl'
            });

        $urlRouterProvider.otherwise('/');
    }
})
();