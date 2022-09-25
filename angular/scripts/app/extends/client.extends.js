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
            "CLIENT": {}
        })
        .factory('uiClient', UiNewClient)
        .controller('uiClientCtrl', UiClientCtrl);

    Config.$inject = ['panelsProvider'];
    UiNewClient.$inject = ['panels', 'PANEL'];
    UiClientCtrl.$inject = ['$scope', 'PANEL', 'CLIENT', 'EXTEND_CLIENT', 'RESTService', '_', 'EventsFactory', '$timeout',
        'AlertFactory'];

    function Config(panelsProvider) {
        panelsProvider
            .add({
                id: 'new_client',
                position: 'right',
                size: '30%',
                templateUrl: '../../static/templates/reception/partial/extends_client.html',
                controller: 'uiClientCtrl'
            });
    }

    function UiNewClient(panels, PANEL) {

        var component = {
            show: show,
            close: close
        };

        return component;

        function show() {
            panels.open('new_client', "first_name");
            PANEL.CLIENT = panels;
        }

        function close() {
            panels.close();
        }
    }

    function UiClientCtrl($scope, PANEL, CLIENT, EXTEND_CLIENT, RESTService, _, EventsFactory, $timeout, AlertFactory) {

        init();

        $scope.$on('onDataNewClient', function (event, args) {
            $scope.result = args;
            $timeout(function () {
                $scope.type_document = args.type_documents[0].id;
                $scope.nationality = args.countries[EXTEND_CLIENT.NATIONALITY].id;
                $scope.countrySelected = $scope.country = args.countries[EXTEND_CLIENT.NATIONALITY].id;
                $scope.show_ubigeo = false;
                $scope.departament = undefined;
                if ($scope.countrySelected != 0) {
                    $scope.onChangeOrigin($scope.countrySelected);
                }
            }, 100);

            if (!_.isUndefined(args.current_client)) {
                setCurrentClient(args.current_client);
            }
            $scope.panelEdit = !_.isUndefined($scope.client.id);
        });

        $scope.onChangeOrigin = function (country_id) {
            if (!_.isUndefined(country_id)) {
                var country = $scope.result.countries.filter(function (element) {
                    return element.id == country_id;
                    //return element.id == model.id && element.$$hashKey == model.$$hashKey ;
                })[0];

                if (!_.isUndefined(country)) {
                    if (country.iso == EXTEND_CLIENT.ISO) {
                        var param = "query=departament";
                        RESTService.all('ubigeos', param, function (response) {
                            $scope.show_ubigeo = true;
                            $scope.departaments = response.results;

                            if (!_.isUndefined($scope.result.current_client)) {
                                $timeout(function () {
                                    if ($scope.result.current_client.client_reservation.ubigeo.length > 0) {
                                        $scope.departamentSelected = $scope.result.current_client.client_reservation.ubigeo[0].departamento;
                                        $scope.onDepartamentChange($scope.departamentSelected);
                                    }
                                }, 100);
                            }

                        });
                    } else {
                        $scope.show_ubigeo = false;
                        $scope.departament = undefined;
                    }
                }
            }
        };

        $scope.onDepartamentChange = function (departament) {
            $scope.districts = [];
            $scope.provinces = [];
            var param = "query=province&departament=" + departament;
            RESTService.all('ubigeos', param, function (response) {
                $scope.provinces = response.results;
                if (!_.isUndefined($scope.result.current_client)) {
                    $timeout(function () {
                        if ($scope.result.current_client.client_reservation.ubigeo.length > 0) {
                            $scope.provinceSelected = $scope.result.current_client.client_reservation.ubigeo[0].provincia;
                            // $scope.onProvinceChange($scope.provinceSelected);
                        }
                    }, 100);
                }
            });
        };

        $scope.onProvinceChange = function (province) {
            if (!_.isNull(province)) {

                var param = "query=district&province=" + province;
                RESTService.all('ubigeos', param, function (response) {
                    $scope.districts = response.results;
                    if (!_.isUndefined($scope.result.current_client)) {
                        $timeout(function () {
                            if ($scope.result.current_client.client_reservation.ubigeo.length > 0) {
                                $scope.districtSelected = $scope.result.current_client.client_reservation.ubigeo[0].distrito;
                            }
                        }, 100);
                    }

                });
            }
        };

        $scope.close = function () {
            closePanel();
        };

        function closePanel() {
            PANEL.CLIENT.close();
            EventsFactory.pushBroadcast('updateTemplate');
        }

        $scope.save = function () {
            $scope.client.nationality = $scope.nationality;
            $scope.client.type_document = $scope.type_document;
            $scope.client.country = $scope.country;

            if(_.isUndefined($scope.client.country)){
                $scope.client.country = EXTEND_CLIENT.NATIONALITY;
            }

            if (!_.isUndefined($scope.departament)) {
                // $scope.client.ubigeo = $scope.distrito;
                $scope.client.ubigeo = $scope.departament;
            } else {
                $scope.client.ubigeo = 0;
            }
            console.log($scope.client);
            RESTService.save('clients', $scope.client, function (response) {
                if (!_.isUndefined(response.status) && response.status == 'Error') {
                    var msg = response.message;
                    var msg_ = msg.split("['");
                    if (!_.isUndefined(msg_[1])) {
                        msg = msg_[1].split("']")[0];
                    }
                    AlertFactory.showWarning({
                        title: "",
                        message: msg
                    });
                } else {
                    EventsFactory.pushBroadcast('onNewClientDetailReception', response);
                    closePanel();
                }
            });
        };

        $scope.edit = function () {
            $scope.client.nationality = $scope.nationality;
            $scope.client.type_document = $scope.type_document;
            $scope.client.country = $scope.country;

            if (!_.isUndefined($scope.departament)) {
                $scope.client.ubigeo = $scope.departament;
            } else {
                $scope.client.ubigeo = 0;
            }

            RESTService.updated('clients', $scope.client.id, $scope.client, function (response) {
                if (!_.isUndefined(response.status) && response.status == 'Error') {
                    var msg = response.message;
                    var msg_ = msg.split("['");
                    if (!_.isUndefined(msg_[1])) {
                        msg = msg_[1].split("']")[0];
                    }
                    AlertFactory.showWarning({
                        title: "",
                        message: msg
                    });
                } else {
                    EventsFactory.pushBroadcast('onNewClientDetailReception', response);
                    closePanel();
                }
            });

        };

        //region FUNCTIONS
        function init() {
            $scope.panelEdit = false;
            $scope.client = {};
            $scope.distrito = {};
            $scope.departaments = [];
            $scope.provinces = [];
            $scope.distrits = [];
            $scope.show_ubigeo = false;
        }

        function setCurrentClient(client) {
            $scope.client.first_name = client.first_name;
            $scope.client.last_name = client.last_name;
            $scope.client.document = client.document;
            $scope.client.phone = client.phone;
            $scope.client.email = client.email;
            $scope.client.id = client.id;
            $scope.client.observations = client.observations;

            $timeout(function () {
                $scope.nationality = client.nationality;
                $scope.type_document = client.type_document;
                $scope.countrySelected = client.client_reservation.country;
                $scope.country = client.client_reservation.country;
                var num = client.client_reservation.ubigeo.length;
                if (num > 0) {
                    $scope.departament = client.client_reservation.ubigeo[0].id;
                }
                $scope.onChangeOrigin($scope.countrySelected);
            }, 100);
        }
    }

})();