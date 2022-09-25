/**
 * Created by JAIR on 4/5/2017.
 */

(function () {
    'use strict';
    angular.module('sys.app.denominaciones')
        .config(Config)
        .controller('DenominacionesCtrl', DenominacionesCtrl);

    Config.$inject = ['$stateProvider', '$urlRouterProvider'];
    DenominacionesCtrl.$inject = ['$scope'];

    function DenominacionesCtrl($scope)
    {
        var search = getFormSearch('frm-search-brand', 'search_b', 'LoadRecordsButtonBrand');

        var table_container_denominaciones = $("#table_container_denominaciones");

        table_container_denominaciones.jtable({
            title: "Lista de Denominaciones",
            paging: true,
            sorting: true,
            actions: {
                listAction: base_url + '/denominaciones/list',
                createAction: base_url + '/denominaciones/create',
                updateAction: base_url + '/denominaciones/update',
                deleteAction: base_url + '/denominaciones/delete',
            },
            messages: {
                addNewRecord: 'Nueva Denominacion',
                editRecord: 'Editar Denominacion'
            },
            toolbar: {
                items: [{
                    cssClass: 'buscador', 
                    text: search
                },{
                    cssClass: 'btn-primary',
                    text: '<i class="fa fa-file-excel-o"></i> Exportar a Excel',
                    click: function () {
                        $scope.openDoc('denominaciones/excel', {});
                    }
                }]
            },
            fields: {
                id_denominacion: {
                    key: true,
                    create: false,
                    edit: false,
                    list: false,
                },
                idMoneda: {
                    title: 'Moneda',
                    options: base_url + '/type_change/getMonedas',
                    defaultValue: 1,
                },
                denominacion: {
                    title: 'Denominación'
                },
                valor: {
                    title: 'Valor',
                    display: function (data) {
                            var valo=Number(data.record.valor);
                            return valo;
                    }
                }
            },
            formCreated: function (event, data) {
                // data.form.find('input[name="codigo_formapago"]').attr('maxlength', '5');
                // data.form.find('input[name="denominacion"]').attr('onkeypress','return soloLetras(event)');
                data.form.find('input[name="valor"]').attr('onkeypress','return validDecimals(event, this, 5)');
                // console.log(data.form);
            },
            formSubmitting: function (event, data) {
                var bval = true;
                // bval = bval && data.form.find('input[name="codigo_formapago"]').required();
                bval = bval && data.form.find('input[name="denominacion"]').required();
                bval = bval && data.form.find('input[name="valor"]').required();
                return bval;
            }
        });

        generateSearchForm('frm-search-brand', 'LoadRecordsButtonBrand', function(){
            table_container_denominaciones.jtable('load', {
                search: $('#search_b').val()
            });
        }, true);
    }

    function Config($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('denominaciones', {
                url: '/denominaciones',
                templateUrl: base_url + '/templates/denominaciones/base.html',
                controller: 'DenominacionesCtrl'
            });

        $urlRouterProvider.otherwise('/');
    }
})
();