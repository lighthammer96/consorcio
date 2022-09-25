/**
 * Created by JAIR on 4/4/2017.
 */

(function () {
    'use strict';

    angular.module('sys.api')
        .constant('REGEX', {
            'DNI_OR_RUC': /^[0-9](?:.{7}|.{10})$/,
            'RUC': /^[0-9]{11}$/,
            'EMAIL': /^[a-zA-Z0-9.!#$%&\'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/i,
            'EMAIL1': /^([a-z]+[a-z1-9._-]*)@{1}([a-z1-9\.]{2,})\.([a-z]{2,3})$/,
            'EMAIL-LONGITUD': /^.+@.+\.[a-z]{2,4}$/i,
            'URL': /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?$/,
            'PHONE-FIJO': /^(8|9)[0-9]{8}$/,
            'CELLPHONE': /^(6|7)[0-9]{8}$/,
            'SOLO-LETRAS': /^[a-zA-ZñÑ]+$/,
            'SOLO-NUMBER_REQUIRED': /^[0-9]+$/,
            'SOLO-NUMBER': /^\d*$/
        }).constant('URL', {
        'ROOT': 'http://recopro.dev'
    }).constant('CAJA', {
            'OPEN': true
        })
        .constant("CLIENT", {
            "TYPE": [
                {description: "Jurídico", id: 1},
                {description: "Natural", id: 2}
            ],
            "SEX": [
                {description: "Masculino", id: 'M'},
                {description: "Femenino", id: 'F'},
                {description: "Otros", id: 'O'}
            ],
            "STATUS": [
                {description: "Soltero", id: 1},
                {description: "Casado", id: 2},
                {description: "Otros", id: 3}
            ]
        })
        .constant("NUMBER", {
            ZERO: 0,
            ONE: 1
        })
        .constant("VOUCHER", {
            BOLETA: 1,
            FACTURA: 2
        })
        .constant("EXTEND_CLIENT", {
            NATIONALITY: 167,
            ORIGIN: 0,
            ISO : 'PE'
        })
        .constant("TYPE_RESERVATION", {
            ROOM: 1,
            GROUP: 2
        }).constant("KEY", {
        ENTER: 13
    }).constant("DASHBOARDS", {
        SALES: {
            TODAY_YESTERDAY: 'today-yesterday',
            THIS_LAST_WEEK: 'this-last-week',
            THIS_YEAR: 'this-year',
            CUSTOM: 0
        }
    }).constant("LOCALE_D3", {
            es_ES: {
                "decimal": ".",
                "thousands": ",",
                "grouping": [3],
                "currency": ["S/", ""],
                "dateTime": "%a %b %e %X %Y",
                "date": "%d/%m/%Y",
                "time": "%H:%M:%S",
                "periods": ["AM", "PM"],
                "days": ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
                "shortDays": ["Dom", "Lun", "Mar", "Mi", "Jue", "Vie", "Sab"],
                "months": ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
                "shortMonths": ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"]
            }
        })
        .constant("TYPE_DOCUMENT", {
            "DNI": 1,
            "RUC": 2
        });

})();
