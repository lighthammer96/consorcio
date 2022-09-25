/**
 * Created by Admin on 20/07/2017.
 */
(function () {
    'use strict';
    angular.module('sys.app.consolidated_projects')
        .config(Config)
        .controller('ConsolidatedProjectCtrl', ConsolidatedProjectCtrl);

    Config.$inject = ['$stateProvider', '$urlRouterProvider'];
    ConsolidatedProjectCtrl.$inject = ['$scope', '_', 'RESTService', 'AlertFactory'];

    function ConsolidatedProjectCtrl($scope, _, RESTService, AlertFactory)
    {
        var search_project = $('#search_project');
        search_project.select2({
            placeholder: 'Buscar proyecto......'
        });
        var option_consolidated = $('#option_consolidated');
        var show_txt_project = $('.show_txt_project');

        $scope.generateConsolidated = function () {
            var b_val = true;
            b_val = b_val && search_project.required();
            if (b_val) {
                $('.report_project').addClass('hide');
                show_txt_project.html(search_project.find('option:selected').html());
                $('.report_'+option_consolidated.val()).removeClass('hide');
            }
        };

        function getDataConsolidatedProject() {
            RESTService.all('consolidated_projects/getData', '', function(response) {
                if (!_.isUndefined(response.status) && response.status) {
                    console.log(response);
                    var table_10 = $('#table_10');
                    generateListMatrix_(table_10, response._10);
                } else {
                    getDataConsolidatedProject();
                }
            }, function () {
                getDataConsolidatedProject();
            });
        }
        // getDataConsolidatedProject();

        $scope.show = function (code) {
            $('#show_'+code).addClass('hide');
            $('#hide_'+code).removeClass('hide');
            $('.table_'+code).removeClass('hide');
        };

        $scope.hide = function (code) {
            $('#show_'+code).removeClass('hide');
            $('#hide_'+code).addClass('hide');
            $('.table_'+code).addClass('hide');
        };
    }

    function Config($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('consolidated_projects', {
                url: '/consolidated_projects',
                templateUrl: base_url + '/templates/consolidated_projects/base.html',
                controller: 'ConsolidatedProjectCtrl'
            });

        $urlRouterProvider.otherwise('/');
    }
})
();