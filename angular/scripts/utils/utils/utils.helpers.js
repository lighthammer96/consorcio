/**
 * Created by JAIR on 4/4/2017.
 */

(function () {
    'use strict';

    angular.module('sys.utils.utils')
        .factory('HelperFactory', HelperFactory);

    HelperFactory.$inject = ['$location', '_'];

    function HelperFactory($location, _) {
        var functions = {
            roundToTwo: roundToTwo,
            addZerosLeft: addZerosLeft,
            capitalizeFirstLetter: capitalizeFirstLetter,
            getDateShort: getDateShort,
            getSubDomain: getSubDomain,
            calculateIGV: calculateIGV,
            cleanObject: cleanObject,
            arrayToHtml: arrayToHtml,
            getCurrentDateHora: getCurrentDateHora,
            getParseDate: getParseDate,
            getUniqueId: getUniqueId,
            slugify: slugify
        };
        return functions;

        function slugify(text) {
            return text.toString().toLowerCase()
                .replace(/\s+/g, '-')           // Replace spaces with -
                .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
                .replace(/\-\-+/g, '-')         // Replace multiple - with single -
                .replace(/^-+/, '')             // Trim - from start of text
                .replace(/-+$/, '');
        }

        function getUniqueId() {
            var d = new Date().getTime();
            var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                var r = (d + Math.random() * 16) % 16 | 0;
                d = Math.floor(d / 16);
                return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
            });
            return uuid;
        }

        function getParseDate(date) {
            if (_.isNull(date) || _.isUndefined(date)) {
                return null;
            }
            return moment(date).format('YYYY-MM-DD');
        }

        function getCurrentDateHora() {
            var today = new Date();
            var dd = today.getDate();
            var mm = today.getMonth() + 1; //January is 0!
            var yyyy = today.getFullYear();
            var hh = today.getHours();
            var m = today.getMinutes();
            var secs = today.getSeconds();
            var now = yyyy + "-" + mm + "-" + dd + "T" + hh + ":" + m + ":" + secs;
            return now;
        }

        function arrayToHtml(object) {
            if (_.isArray(object)) {
                console.log(true);
            }
        }

        function cleanObject(object, keys) {
            for (var key in object) {
                var is_exists = keys.indexOf(key);
                if (is_exists == -1) {
                    delete object[key];
                }
            }
            return object;
        }

        function roundToTwo(num) {
            return +(Math.round(num + "e+2") + "e-2");
        }

        function addZerosLeft(num, max) {
            num = num.toString();
            return num.length < max ? addZerosLeft("0" + num, max) : num;
        }

        function capitalizeFirstLetter(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        }

        function getDateShort(date) {
            return moment(date).format('YYYY-MM-DD');
        }

        function getSubDomain() {
            var host = $location.host();
            if (host.indexOf('.') < 0)
                return null;
            else
                return host.split('.')[0];
        }

        function calculateIGV(price, taxe) {
            return this.roundToTwo(parseFloat(price) * parseFloat(taxe) / 100);
        }
    }
})();
