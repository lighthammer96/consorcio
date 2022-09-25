/**
 * Created by JAIR on 4/4/2017.
 */

(function () {
    'use strict';

    var $rootScopeProvider = null;

    angular.module('sys.utils.libraries').
        run(Run)
        .factory('EventsFactory', EventsFactory);

    Run.$inject = ['$rootScope'];

    EventsFactory.$inject = [];

    function Run($rootScope) {
        $rootScopeProvider = $rootScope;
    }

    function EventsFactory() {
        var service = {
            pushBroadcast: pushBroadcast,

            pushEmit: pushEmit
        };

        return service;

        function pushBroadcast(event, args) {
            $rootScopeProvider.$broadcast(event, args);
        }

        function pushEmit(event, args) {
            $rootScopeProvider.$emit(event, args);
        }
    }
})();
