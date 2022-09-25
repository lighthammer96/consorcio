/**
 * Created by JAIR on 5/19/2017.
 */
(function () {
    'use strict';
    angular.module('sys.app.params')
        .config(Config)
        .controller('ParamCtrl', ParamCtrl);

    Config.$inject = ['$stateProvider', '$urlRouterProvider'];
    ParamCtrl.$inject = [];

    function ParamCtrl()
    {
        var search = getFormSearch('frm-search-param', 'search_p', 'LoadRecordsButtonP');

        var table_container_param = $("#table_container_param");

        table_container_param.jtable({
            title: "Lista de Parámetros",
            paging: true,
            sorting: true,
            actions: {
                listAction: base_url + '/params/list',
                updateAction: base_url + '/params/update',
            },
            messages: {
                addNewRecord: 'Nuevo parámetro',
                editRecord: 'Editar parámetro'
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
                description: {
                    title: 'Descripción'
                },
                value: {
                    title: 'Valor'
                }
            },
            formSubmitting: function (event, data) {
                var bval = true;
                bval = bval && data.form.find('input[name="description"]').required();
                bval = bval && data.form.find('input[name="value"]').required();
                return bval;
            }
        });

        generateSearchForm('frm-search-param', 'LoadRecordsButtonP', function(){
            table_container_param.jtable('load', {
                search: $('#search_p').val()
            });
        }, true);
    }

    function Config($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('params', {
                url: '/params',
                templateUrl: base_url + '/templates/params/base.html',
                controller: 'ParamCtrl'
            });

        $urlRouterProvider.otherwise('/');
    }
})
();