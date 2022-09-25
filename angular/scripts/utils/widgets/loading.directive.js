/**
 * Created by JAIR on 4/4/2017.
 */

(function(){
    'use strict';

    angular.module('sys.utils.widgets')
        .directive('sysLoading', SysLoading)
        .controller('LoadingCtrl', LoadingCtrl);

    LoadingCtrl.$inject = ['$scope', '$state', '$element', '$attrs'];

    function SysLoading(){
        return {
            restrict: 'E',
            scope: false,
            templateUrl: '../static/templates/layouts/partials/loading.html',
            controller: 'LoadingCtrl'
        };
    }

    function LoadingCtrl($scope, $state, $element, $attrs){
        var element = $($element);
        element.parent().addClass('position-relative');

        //events
        $scope.$on("showSysLoading", function(e, args){
            $scope.showMessage = args.message;
            element.children("div").removeClass("display-none");
        });

        $scope.$on("hideSysLoading", function(e, args){
            element.children("div").addClass("display-none");
        });

    }
})();
