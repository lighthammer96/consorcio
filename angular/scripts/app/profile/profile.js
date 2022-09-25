/**
 * Created by JAIR on 4/4/2017.
 */
(function () {
    'use strict';
    angular.module('sys.app.profiles')
        .config(Config)
        .controller('ProfileCtrl', ProfileCtrl);

    Config.$inject = ['$stateProvider', '$urlRouterProvider'];
    ProfileCtrl.$inject = [];

    function ProfileCtrl()
    {
        var search = getFormSearch('frm-search-profile', 'search_p', 'LoadRecordsButtonProfile');

        var table_container_profile = $("#table_container_profile");

        table_container_profile.jtable({
            title: "Lista de Perfiles",
            paging: true,
            sorting: true,
            actions: {
                listAction: base_url + '/profiles/list',
                createAction: base_url + '/profiles/create',
                updateAction: base_url + '/profiles/update',
                deleteAction: base_url + '/profiles/delete',
            },
            messages: {
                addNewRecord: 'Nuevo Perfil',
                editRecord: 'Editar Perfil'
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
                perfil: {
                    title: 'Perfil'
                }
            },
            formCreated: function (event, data) {
                data.form.find('input[name="perfil"]').attr('onkeypress','return soloLetras(event)');
            },
            formSubmitting: function (event, data) {
                var bval = true;
                bval = bval && data.form.find('input[name="perfil"]').required();
                return bval;
            }
        });

        generateSearchForm('frm-search-profile', 'LoadRecordsButtonProfile', function(){
            table_container_profile.jtable('load', {
                search: $('#search_p').val()
            });
        }, true);
    }

    function Config($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('profiles', {
                url: '/profiles',
                templateUrl: base_url + '/templates/profiles/base.html',
                controller: 'ProfileCtrl'
            });

        $urlRouterProvider.otherwise('/');
    }
})
();
