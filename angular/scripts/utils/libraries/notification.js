/**
 * Created by JAIR on 4/4/2017.
 */

(function () {
    'use strict';

    angular.module('sys.utils.libraries')
        .config(Config)
        .factory('Notify', NotifyFactory);

    Config.$inject = ['growlProvider'];
    NotifyFactory.$inject = ['growl'];

    function Config(growlProvider) {
        growlProvider.onlyUniqueMessages(true);
        growlProvider.globalTimeToLive({success: 3000, error: 2000, warning: 4000, info: 4000});
        growlProvider.globalPosition('bottom-right');
    }

    function NotifyFactory(growl) {
        var notify = {
            warning: warning,
            info: info,
            error: error,
            success: success
        };
        return notify;

        function warning(message, config) {
            growl.warning(message, config);
        }

        function info(message, config) {
            growl.info(message, config);
        }

        function error(message, config) {
            growl.error(message, config);
        }

        function success(message, config) {
            growl.success(message, config);
        }
    }
})();
