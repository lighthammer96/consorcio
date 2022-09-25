/**
 * Created by JAIR on 4/4/2017.
 */

(function () {
    'use strict';
    angular.module('sys.api')
        .factory('RESTService', RESTService);

    RESTService.$inject = ['ApiService', 'AlertFactory', '_'];

    function RESTService(ApiService, AlertFactory, _) {
        var module = "rest";

        var rest = {
            all: all,
            get: get,
            updated: updated,
            deleted: deleted,
            save: save
        };

        return rest;

        function all(model, action, callback, callbackError) {
            var Model = ApiService.instance(module, model);
            var query = Model.query({action: action});
            query.$promise.then(function (response) {
                if (typeof callback === "function") {
                    callback(response);
                }
            }).catch(function (error) {
                if (typeof callbackError === "function") {
                    callbackError(error);
                } else {
                    AlertFactory.showErrors({
                        title: "Hubo un error",
                        message: error.data.message
                    });
                }
            });
        }

        function get(model, id, callback, action, callbackError) {
            var Model = ApiService.instance(module, model);
            var query = Model.query({id: id},{action: action});
            query.$promise.then(function (response) {
                if (typeof callback === "function") {
                    callback(response);
                }
            }).catch(function (error) {
                AlertFactory.showErrors(
                    {
                        title: "Hubo un error",
                        message: error.data.message
                    }, callbackError
                );

            });
        } 

        function updated(model, $id, $attributes, callback) {
          
            var Model = ApiService.instance(module, model);
            Model.update({id: $id}, $attributes).$promise.then(function (response) {
                if (typeof callback === "function") {
                    callback(response);
                }
            }).catch(function (error) {
                AlertFactory.showErrors(
                    {
                        title: "Hubo un error",
                        message: error.data.message
                    }
                );
            });
        }

        function deleted(model, $id, callback) {
            var Model = ApiService.instance(module, model);
            Model.delete({id: $id}).$promise.then(function (response) {
                if (typeof callback === "function") {
                    callback(response);
                }
            }).catch(function (error) {
                AlertFactory.showErrors(
                    {
                        title: "Hubo un error",
                        message: error.data.message
                    }
                )
            });
        }

        function save(model, $attributes, callback) {

            var Model = ApiService.instance(module, model);

            Model.save($attributes).$promise.then(function (response) {
                if (typeof callback === "function") {
                    callback(response);
                }
            }, function (error) {
                AlertFactory.showErrors(
                    {
                        title: "Hubo un error",
                        message: error.data.message
                    }
                )
            });
        }
    }

})();
