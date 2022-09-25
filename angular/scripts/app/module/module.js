/**
 * Created by JAIR on 4/10/2017.
 */
(function () {
    'use strict';
    angular.module('sys.app.modules')
        .config(Config)
        .controller('ModuleCtrl', ModuleCtrl);

    Config.$inject = ['$stateProvider', '$urlRouterProvider'];
    ModuleCtrl.$inject = [];

    function ModuleCtrl()
    {
        var search = getFormSearch('frm-search-m', 'search_m', 'LoadRecordsButtonModule');

        var table_container_module = $("#table_container_module");
 
        table_container_module.jtable({
            title: "Lista de Modulos",
            paging: true,
            sorting: true,
            actions: {
                listAction: base_url + '/modules/list',
                createAction: base_url + '/modules/create',
                updateAction: base_url + '/modules/update',
                deleteAction: base_url + '/modules/delete'
            },
            messages: {
                addNewRecord: 'Nuevo Módulo',
                editRecord: 'Editar Módulo'
            },
            toolbar: {
                items: [{
                    cssClass: 'buscador',
                    text: search
                }]
            },
            fields: {
                id: {
                    key: true,
                    create: false,
                    edit: false,
                    list: false
                },
                modulo: {
                    title: 'Modulo'
                },
                url: {
                    title: 'Url',
                    list: show_list_
                },
                icon: {
                    title: 'Icono',
                    list: show_list_
                },
                order: {
                    title: 'Orden',
                    list: show_list_
                },
                modulo_padre: {
                    title: 'Modulo Padre',
                    options: function(data) {
                        if (data.source == 'list') {
                            return base_url + '/modules/parents';
                        }
                        data.clearCache();
                        return base_url + '/modules/parents';
                    }
                }
            },
            formCreated: function (event, data) {
                data.form.find('input[name="modulo"]').attr('onkeypress','return soloLetras(event)');
                data.form.find('input[name="order"]').attr('onkeypress','return soloNumeros(event)');
            },
            formSubmitting: function (event, data) {
                var bval = true;
                bval = bval && data.form.find('input[name="modulo"]').required();
                bval = bval && data.form.find('input[name="url"]').required();
                bval = bval && data.form.find('input[name="order"]').required();
                bval = bval && data.form.find('input[name="modulo_padre"]').required();
                return bval;
            }
        });

        generateSearchForm('frm-search-module', 'LoadRecordsButtonModule', function(){
            table_container_module.jtable('load', {
                search: $('#search_m').val()
            });
        }, true);
    }

    function Config($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('modules', {
                url: '/modules',
                templateUrl: base_url + '/templates/modules/base.html',
                controller: 'ModuleCtrl'
            });

        $urlRouterProvider.otherwise('/');
    }
})
();