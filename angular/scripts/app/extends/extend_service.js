(function () {
    'use strict';
    angular
        .module('sys.app.extends')
        .controller('ModalServiceCtrl', ModalServiceCtrl)
        .directive('modalService', modalService);

    ModalServiceCtrl.$inject = ['$scope', 'RESTService', '_'];

    function ModalServiceCtrl($scope, RESTService, _) {
        $scope.list_stores = [];
        $scope.list_products = [];
        $scope.store_selected = '';
        $scope.search_product = '';

        var myModalService = angular.element('#myModalService');

        $scope.showModalService = function () {
            $scope.list_stores = [];
            $scope.list_products = [];
            myModalService.modal('show');
            loadStores();
        };

        $scope.changeStore = function () {
            loadProductsStock();
        };

        $scope.checkProduct = function (item) {
            if (angular.element('#chk_product'+item.id).prop('checked')) {
                item.checked = true;
                item.quantity = 1;
                item.stock = item.stock - 1;
            } else {
                item.checked = false;
                item.quantity = '';
                item.stock = item.stock_original;
            }
        };

        $scope.changeQuantityProduct = function (item) {
            if (item.is_control) {
                var value = (item.quantity == '') ? 0 : item.quantity;
                if (value > item.stock_original) {
                    item.stock = 0;
                    item.quantity = item.stock_original;
                } else {
                    item.stock = item.stock_original - value;
                }
            }
        };

        $scope.verifyQuantityProduct = function (item) {
            if (angular.element('#chk_product'+item.id).prop('checked') && item.quantity == '') {
                item.quantity = 1;
                if (item.is_control) {
                    item.stock = item.stock_original - 1;
                }
            }
        };

        $scope.addToDetailReception = function () {
            myModalService.modal('hide');
            _.each($scope.list_products, function (item) {
                if (item.checked && item.quantity != '') {
                    var data = {
                        id: item.id,
                        description: item.description,
                        type_expense: 3,
                        nights: 1,
                        quantity: item.quantity,
                        quantity_orig: item.quantity,
                        stock: item.stock_original,
                        is_control: item.is_control,
                        price: item.price
                    };
                    $scope.reservation.push(data);
                }
            });
            $scope.calculateTotal();
        };

        var loadStores = function () {
            RESTService.all('stores', '', function (response) {
                if (!_.isUndefined(response.results)) {
                    $scope.list_stores = response.results;
                    if (!_.isUndefined($scope.list_stores[0])) {
                        $scope.store_selected = $scope.list_stores[0].id;
                        loadProductsStock();
                    }
                }
            });
        };

        var loadProductsStock = function () {
            if (!_.isNull($scope.store_selected)) {
                var data = 'store='+$scope.store_selected;
                RESTService.all('products_store', data, function (response) {
                    if (!_.isUndefined(response.status) && response.status == true) {
                        $scope.list_products = [];
                        _.each(response.products, function (item) {
                            var match = _.find($scope.reservation, function(r) {
                                if (r.id == item.id && r.type_expense == 3) {
                                    return item.id;
                                }
                            });
                            if (!match) {
                                item.checked = false;
                                item.quantity = '';
                                $scope.list_products.push(item);
                            }
                        });
                    }
                });
            }
        };

        $scope.formatNumber = function(i, l) {
            i = parseFloat(i);
            return i.toFixed(l);
        };
    }

    function modalService() {
        return {
            restrict: 'EA',
            require: '^ngModel',
            // scope: {
            //     columnsData: '= columnsData'
            // },
            templateUrl: '../../static/templates/partials/modal_services.html',
            controller: 'ModalServiceCtrl'
        };
    }

})();