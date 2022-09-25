/**
 * Created by JAIR on 5/3/2017.
 */
(function () {
    'use strict';
    angular.module('sys.app.users')
        .config(Config)
        .controller('UserCtrl', UserCtrl);

    Config.$inject = ['$stateProvider', '$urlRouterProvider'];
    UserCtrl.$inject = ['AlertFactory', 'RESTService', '_'];

    function UserCtrl(AlertFactory, RESTService, _)
    {
        var search = getFormSearch('frm-search-u', 'search_u', 'LoadRecordsButtonU');

        var table_container_user = $("#table_container_user");

        table_container_user.jtable({
            title: "Lista de Usuarios",
            paging: true,
            sorting: true,
            actions: {
                listAction: base_url + '/users/list',
                createAction: base_url + '/users/create',
                updateAction: base_url + '/users/update',
                deleteAction: base_url + '/users/delete'
            },
            messages: {
                addNewRecord: 'Nuevo usuario',
                editRecord: 'Editar usuario'
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
                name: {
                    title: 'Nombres'
                },
                username: {
                    title: 'Usuario'
                },
                password: {
                    title: 'Contraseña',
                    type: 'password',
                    edit: false,
                    list: false
                },
                profile_id: {
                    title: 'Perfil',
                    options: base_url + '/users/getProfiles'
                },
                
                expiration_password: {
                    title: 'Expiración de Contraseña',
                    type: 'checkbox',
                    values: { 0: '', 1: '' },
                    defaultValue: 1,
                    list: false
                },
                edit: {
                    width: '1%',
                    sorting: false,
                    edit: false,
                    create: false,
                    listClass: 'text-center',
                    display: function (data) {
                        return '<a data-target="#" class="reset-user" data-id="'+data.record.id
                            +'" title="Resetear Contraseña"><i class="fa fa-refresh fa-1-5x"></i></a>';
                    }
                }
            },
            formCreated: function (event, data) {
                data.form.find('input[name="name"]').attr('onkeypress','return soloLetras(event)');
                data.form.find('select[name="supervisor"]').select2();
                $('#Edit-expiration_password').parent().addClass('i-checks');
                $('.i-checks').iCheck({
                    checkboxClass: 'icheckbox_square-green'
                }).on('ifChanged', function (e) {
                    $(e.target).click();
                });
            },
            formSubmitting: function (event, data) {
                var bval = true;
                bval = bval && data.form.find('input[name="name"]').required();
                bval = bval && data.form.find('input[name="username"]').required();
                bval = bval && data.form.find('input[name="password"]').required();
                return bval
            },
            recordsLoaded: function(event, data) {
                $('.reset-user').click(function(e){
                    var id = $(this).attr('data-id');

                    AlertFactory.prompt({
                        title: 'Resetear Contraseña',
                        message: 'Ingrese la nueva contraseña que usara el usuario para ingresar el sistema',
                        inputType: 'password',
                        placeholder: 'Ingrese contraseña',
                        showLoaderOnConfirm: true,
                        error_message: 'Ingrese correctamente la contraseña'
                    }, function (pass) {
                        RESTService.updated('users/reset', id, {pass:pass}, function(response) {
                            if (!_.isUndefined(response.status) && response.status) {
                                AlertFactory.textType({
                                    title: '',
                                    message: 'La contraseña del usuario se reseteó correctamente.',
                                    type: 'success'
                                });
                            } else {
                                AlertFactory.textType({
                                    title: '',
                                    message: 'Hubo un error al resetear la contraseña. Intente nuevamente.',
                                    type: 'error'
                                });
                            }
                        });
                    });

                    // var message = 'Si resetea la contraseña se cambiará a "123456" y deberá '+
                    //     'iniciar sesión para poder cambiarla ' +
                    //     '¿Está seguro que desea resetear la contraseña del usuario?';
                    //
                    // AlertFactory.confirm({
                    //     title: 'Resetear Contraseña',
                    //     message: message,
                    //     confirm: 'Si',
                    //     cancel: 'No'
                    // }, function(){
                    //     RESTService.updated('users/reset', id, {}, function(response) {
                    //         if (!_.isUndefined(response.status) && response.status) {
                    //             AlertFactory.textType({
                    //                 title: '',
                    //                 message: 'La contraseña del usuario se reseteó correctamente.',
                    //                 type: 'success'
                    //             });
                    //         } else {
                    //             AlertFactory.textType({
                    //                 title: '',
                    //                 message: 'Hubo un error al resetear la contraseña. Intente nuevamente.',
                    //                 type: 'error'
                    //             });
                    //         }
                    //     });
                    // });
                    e.preventDefault();
                });
            } 
        });

        generateSearchForm('frm-search-u', 'LoadRecordsButtonU', function(){
            table_container_user.jtable('load', {
                search: $('#search_u').val()
            });
        }, true);
    }

    function Config($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('users', {
                url: '/users',
                templateUrl: base_url + '/templates/users/base.html',
                controller: 'UserCtrl'
            });

        $urlRouterProvider.otherwise('/');
    }
})
();