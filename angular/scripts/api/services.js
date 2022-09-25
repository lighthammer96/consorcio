/**
 * Created by JAIR on 4/4/2017.
 */

(function () {
    'use strict';
    angular.module('sys.api')
        .factory('ApiService', ApiService);

    ApiService.$inject = ['$resource'];

    function ApiService($resource) {

        var service = {
            instance: instance,
            query: query
        };

        return service;

        function query(url) {
            return $resource(url, null,
                {
                    'query': {method: 'GET', isArray: false},
                    'get': {method: 'GET'},
                    'update': {method: 'PUT'},
                    'save': {method: 'POST'},
                    'remove': {method: 'DELETE'},
                    'delete': {method: 'DELETE'}
                });
        }

        function instance(module, model) {
            var url = base_url + '/' + model + '/:id/?:action';

            return resource();

            function resource(){
                return $resource(url, {id: '@id', action: '@action'},
                {
                    'query': {method: 'GET', isArray: false},
                    'get': {method: 'GET'},
                    'update': {method: 'PUT'},
                    'save': {method: 'POST'},
                    'remove': {method: 'DELETE'},
                    'delete': {method: 'DELETE'}
                });

            }

        }
    }

})();