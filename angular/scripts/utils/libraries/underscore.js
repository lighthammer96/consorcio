/**
 * Created by JAIR on 4/4/2017.
 */

(function () {
    'use strict';

    angular.module('sys.utils.libraries')
        .factory('_', Underscore);

    Underscore.$inject = ['$window'];

    function Underscore($window) {
        return $window._;
    }

})();
