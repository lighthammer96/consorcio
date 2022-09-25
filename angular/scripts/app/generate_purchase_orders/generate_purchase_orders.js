/**
 * Created by JAIR on 4/19/2017.
 */
(function () {
    'use strict';
    angular.module('sys.app.generate_purchase_orders')
        .config(Config)
        .controller('GeneratePurchaseOrderCtrl', GeneratePurchaseOrderCtrl);

    Config.$inject = ['$stateProvider', '$urlRouterProvider'];
    GeneratePurchaseOrderCtrl.$inject = [];

    function GeneratePurchaseOrderCtrl()
    {
    }

    function Config($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('generate_purchase_orders', {
                url: '/generate_purchase_orders',
                templateUrl: base_url + '/templates/generate_purchase_orders/base.html',
                controller: 'GeneratePurchaseOrderCtrl'
            });

        $urlRouterProvider.otherwise('/');
    }
})
();