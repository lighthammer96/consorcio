/**
 * Created by JAIR on 4/4/2017.
 */

(function () {
    'use strict';
    angular.module('sys.utils.filters')
        .filter('dateFormatGrid', DateFormatGrid)
        .filter('dateFormatShort', DateFormatShort)
        .filter('dateFormatHour', DateFormatHour)
        .filter('dateFormatMedium', DateFormatMedium)
        .filter('showStatusSale', ShowStatusSale)
        .filter('removeAcentos', RemoveAcentos)
        .filter('moneyFormatSolesGrid', MoneyFormatSolesGrid);

    MoneyFormatSolesGrid.$inject = ['HelperFactory'];
    DateFormatGrid.$inject = ['_'];
    DateFormatHour.$inject = ['_'];
    ShowStatusSale.$inject = ['_', '$compile'];
    DateFormatMedium.$inject = ['_'];
    DateFormatShort.$inject = ['_'];
    RemoveAcentos.$inject = ['_'];

    function RemoveAcentos() {
        return function (source) {
            if (!angular.isDefined(source)) {
                return;
            }
            var accent = [
                    /[\300-\306]/g, /[\340-\346]/g, // A, a
                    /[\310-\313]/g, /[\350-\353]/g, // E, e
                    /[\314-\317]/g, /[\354-\357]/g, // I, i
                    /[\322-\330]/g, /[\362-\370]/g, // O, o
                    /[\331-\334]/g, /[\371-\374]/g, // U, u
                    /[\321]/g, /[\361]/g, // N, n
                    /[\307]/g, /[\347]/g, // C, c
                ],
                noaccent = ['A', 'a', 'E', 'e', 'I', 'i', 'O', 'o', 'U', 'u', 'N', 'n', 'C', 'c'];

            for (var i = 0; i < accent.length; i++) {
                source = source.replace(accent[i], noaccent[i]);
            }
            return source;
        };
    }
    
    function ShowStatusSale(_, $compile) {
        return function (value, scope) {
            var template = '<div>Pagado</div>';
            //if (_.isNull(value) || _.isUndefined(value) || _.isNaN(value)) {
            //    //TODO: que poner aquí cuando no tiene fecha
            //    scope.element = '<div>Pagado</div>';
            //}
            return scope.append($compile(template)(scope));
        };
    }

    function DateFormatHour(_) {
        return function (value) {
            if (_.isNull(value) || _.isUndefined(value) || _.isNaN(value)) {
                //TODO: que poner aquí cuando no tiene fecha
                return "sin fecha";
            }
            return moment(value).format('h:m a');
        };
    }

    function DateFormatMedium(_) {
        return function (value) {
            if (_.isNull(value) || _.isUndefined(value) || _.isNaN(value)) {
                //TODO: que poner aquí cuando no tiene fecha
                return "sin fecha";
            }
            return moment(value).format('DD MMM YYYY h:m a');
        };
    }

    function DateFormatShort() {
        return function (value) {
            if (_.isNull(value) || _.isUndefined(value) || _.isNaN(value)) {
                //TODO: que poner aquí cuando no tiene fecha
                return "sin fecha";
            }
            return moment(value).format('DD MMM YYYY');
        };
    }

    function DateFormatGrid(_) {
        return function (value) {
            if (_.isNull(value) || _.isUndefined(value) || _.isNaN(value)) {
                //TODO: que poner aquí cuando no tiene fecha
                return "sin fecha";
            }
            return moment(value).format('dddd MMM YYYY,  hA');
        };
    }

    function MoneyFormatSolesGrid(HelperFactory) {
        return function (value) {
            var new_value = HelperFactory.roundToTwo(value);
            return 'S/. ' + new_value.toFixed(2);
        };
    }
})();