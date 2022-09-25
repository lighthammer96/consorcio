/**
 * Created by JAIR on 4/4/2017.
 */

(function () {
    'use strict';
    angular.module('sys.utils.libraries')
        .factory('DateRangePicker', DateRangePicker);


    function DateRangePicker() {
        var range = {
            make: create
        };

        return range;

        function create(element, callback) {

            $('input[name="'+element+'"]').daterangepicker({
                "showDropdowns": true,
                "showWeekNumbers": true,
                "autoApply": true,
                //"dateLimit": {
                //    "days": 7
                //},
                "ranges": {
                    "Hoy": [moment(), moment()],
                    "Ayer": [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                    "Esta semana": [moment().startOf('isoWeek'), moment().endOf('isoWeek')+1],
                    "Semana pasada": [moment().subtract(1, 'weeks').startOf('isoWeek'), moment().subtract(1, 'weeks').endOf('isoWeek')+1],
                    "Este mes": [moment().startOf('month'), moment().endOf('month')],
                    "Mes pasado": [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
                    "Este año": [moment().startOf('years'), moment().endOf('years')]
                },
                "locale": {
                    "format": "MM/DD/YYYY",
                    "separator": " - ",
                    "applyLabel": "Apply",
                    "cancelLabel": "Cancel",
                    "fromLabel": "From",
                    "toLabel": "To",
                    "customRangeLabel": "Custom",
                    "daysOfWeek": [
                        "Do",
                        "Lu",
                        "Mar",
                        "Mie",
                        "Jue",
                        "Vie",
                        "Sa"
                    ],
                    "monthNames": [
                        "Enero",
                        "Febrero",
                        "Marzo",
                        "Abril",
                        "Mayo",
                        "Junio",
                        "Julio",
                        "Agosto",
                        "Septiembre",
                        "Octubre",
                        "Noviembre",
                        "Diciembre"
                    ],
                    "firstDay": 1
                },
                "linkedCalendars": false,
                "startDate": moment().subtract(5, 'days'),
                "endDate": moment()
            }, function (start, end, label) {
                typeof callback == 'function' && callback(start, end, label);
            });
        }
    }

})();