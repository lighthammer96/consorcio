/**
 * Created by JAIR on 4/4/2017.
 */

(function () {
    'use strict';

    angular.module('sys.api')
        .factory('ValidateFactory', ValidateFactory);

    ValidateFactory.$inject = ['RESTService', '$q', 'NUMBER', 'HelperFactory'];

    function ValidateFactory(RESTService, $q, NUMBER, HelperFactory) {
        var object = {
            findByDocument: findByDocument,
            findByEmail: findByEmail,
            cajaOpenToday: cajaOpenToday
        };

        return object;

        function cajaOpenToday() {

            var defer = $q.defer();

            var promise = defer.promise;

            RESTService.all('caja_open', null, function (response) {
                defer.resolve(response)
            }, function (error) {
                defer.reject(error);
            });
            return promise;
        }

        function findByDocument(document, rest_url, option) {
            option || ( option = 'document=' + document );

            var defer = $q.defer();

            var promise = defer.promise;

            RESTService.all(rest_url, option, function (response) {
                var result = false;
                if (response.count == 0) {
                    result = true;
                }
                defer.resolve(result);
            }, function (error) {
                defer.reject(error);
            });
            return promise;
        }

        function findByEmail(email, rest_url, option) {
            option || ( option = 'email=' + email );

            var defer = $q.defer();

            var promise = defer.promise;

            RESTService.all(rest_url, option, function (response) {
                var result = false;
                if (response.count == 0) {
                    result = true;
                }
                defer.resolve(result);
            }, function (error) {
                defer.reject(error);
            });
            return promise;
        }
    }
})();
