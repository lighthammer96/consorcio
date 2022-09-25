/**
 * Created by JAIR on 4/4/2017.
 */

(function () {
   'use strict';

    angular.module('sys.utils.services')
        .constant('URL', {
            'WEB_SERVICE_URL': 'http://webservice.miasoftware.net/service/sunat/ruc.php?wsdl',
            'TEST': 'http://ws.insite.pe/sunat/trial.php?wsdl'
        })
        .factory('QueryRUC', QueryRUC);

    QueryRUC.$inject = ['ApiService', 'AlertFactory', 'URL'];

    function QueryRUC(ApiService, AlertFactory, URL) {
        var ruc = {
            valid_ruc: valid_ruc
        };

        return ruc;

        function valid_ruc($attributes, callback) {

            var Model = ApiService.query(URL.WEB_SERVICE_URL);

            Model.save($attributes).$promise.then(function (response) {
                if (typeof callback === "function") {
                    callback(response);
                }
            }, function (error) {
                AlertFactory.showErrors({
                    title: "Algo salio mal!",
                    message: error.data.message
                });
                return false;
            });
        }

    }
})();