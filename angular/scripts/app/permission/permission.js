/**
 * Created by JAIR on 5/3/2017.
 */
(function () {
    'use strict';
    angular.module('sys.app.permissions')
        .config(Config)
        .controller('PermissionCtrl', PermissionCtrl);

    Config.$inject = ['$stateProvider', '$urlRouterProvider'];
    PermissionCtrl.$inject = ['$scope', 'RESTService', '_', 'AlertFactory'];

    function PermissionCtrl($scope, RESTService, _, AlertFactory)
    {
        var listP = $("#listPermissions");
        var permissions = $("#permissions");
        var profile = $("#profile");

        RESTService.all('permissions/getProfiles', '', function(response) {
            _.each(response.Options, function(item, index){
                var selected = (index == 0) ? 'selected' : '';
                profile.append("<option value='" + item.Value + "' "+selected+">" + item.DisplayText + "</option>");
            });
            loadPermissions();
        });

        RESTService.all('permissions/list', '', function(response) {
            _.each(response.Records, function(item){
                listP.append("<option value='" + item.id + "'>" + item.modulo + "</option>");
            });
        });

        $scope.changeProfile = function() {
            loadPermissions();
        };

        function loadPermissions()
        {
            var profile_id = profile.val();
            profile_id = (profile_id == null) ? 1 : profile_id;

            permissions.html('');
            RESTService.all('permissions/getPermissions', 'id=' + profile_id, function(response) {
                _.each(response.Records, function(item){
                    permissions.append("<option value='" + item.id + "'>" + item.modulo + "</option>");
                });
            });
        }

        $scope.add = function () {
            var data = {
                'id': (listP.val()).join(),
                'profile_id': profile.val()
            };
            RESTService.updated('permissions/add', 0, data, function(response) {
                if(parseInt(response.validation_failed) == 0) {
                    loadPermissions();
                } else {
                    AlertFactory.textType({
                        title: '',
                        message: response.errors,
                        type: 'error'
                    });
                }
            });
        };

        $scope.del = function () {
            var data = {
                'id': (permissions.val()).join()
            };
            RESTService.updated('permissions/del', 0, data, function(response) {
                if(parseInt(response.validation_failed) == 0) {
                    loadPermissions();
                } else if(parseInt(response.validation_failed) == 1) {
                    AlertFactory.textType({
                        title: '',
                        message: 'Hubo un error al eliminar el permiso. Actualice su navegador porfavor',
                        type: 'error'
                    });
                } else {
                    AlertFactory.textType({
                        title: '',
                        message: 'Debe escoger un permiso para eliminar',
                        type: 'error'
                    });
                }
            });
        };

        $scope.reload = function() {
            location.reload();
        };
    }

    function Config($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('permissions', {
                url: '/permissions',
                templateUrl: base_url + '/templates/permissions/base.html',
                controller: 'PermissionCtrl'
            });

        $urlRouterProvider.otherwise('/');
    }
})
();