/*
 *
 *  * Copyright (C) 2016 eveR Vásquez.
 *  *
 *  * Licensed under the Apache License, Version 2.0 (the "License");
 *  * you may not use this file except in compliance with the License.
 *  * You may obtain a copy of the License at
 *  *
 *  *      http://www.apache.org/licenses/LICENSE-2.0
 *  *
 *  * Unless required by applicable law or agreed to in writing, software
 *  * distributed under the License is distributed on an "AS IS" BASIS,
 *  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  * See the License for the specific language governing permissions and
 *  * limitations under the License.
 *
 */
(function () {
    'use strict';
    angular
        .module('sys.app.extends')
        .config(Config)
        .constant("PANEL", {
            "SERVICE": {}
        })
        .factory('uiService', UiAddService)
        .controller('uiServiceCtrl', UiServiceCtrl);

    Config.$inject = ['panelsProvider'];
    UiAddService.$inject = ['panels', 'PANEL'];
    UiServiceCtrl.$inject = ['$scope', 'EXTEND_CLIENT', 'RESTService', '_', 'EventsFactory'];

    function Config(panelsProvider) {
        panelsProvider
            .add({
                id: 'add_service',
                position: 'right',
                size: '30%',
                templateUrl: '../../static/templates/reception/partial/extends_service.html',
                controller: 'uiServiceCtrl'
            });
    }

    function UiAddService(panels, PANEL) {

        var component = {
            show: show,
            close: close
        };

        return component;

        function show() {
            panels.open('add_service', "first_name");
            PANEL.SERVICE = panels;
        }

        function close() {
            panels.close();
        }
    }

    function UiServiceCtrl($scope, EXTEND_CLIENT, RESTService, _, EventsFactory) {

        init();

        $scope.$on('onDataNewClient', function (event, args) {

        });


        function init() {
            $scope.client = {};
            $scope.distrito = {};
            $scope.departaments = [];
            $scope.provinces = [];
            $scope.distrits = [];
            $scope.show_ubigeo = false;
        }
    }
})();