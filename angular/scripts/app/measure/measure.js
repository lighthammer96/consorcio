/**
 * Created by JAIR on 4/5/2017.
 */

(function () {
    'use strict';
    angular.module('sys.app.measures')
        .config(Config)
        .controller('MeasureCtrl', MeasureCtrl);

    Config.$inject = ['$stateProvider', '$urlRouterProvider'];
    MeasureCtrl.$inject = ['$scope'];

    function MeasureCtrl($scope)
    {
        var search = getFormSearch('frm-search-Measure', 'search_b', 'LoadRecordsButtonMeasure');

        var table_container_Measure = $("#table_container_measure");

        table_container_Measure.jtable({
            title: "Lista de Unidades de Medidas",
            paging: true,
            sorting: true,
            actions: {
                listAction: base_url + '/measures/list',
                createAction: base_url + '/measures/create',
                updateAction: base_url + '/measures/update',
                deleteAction: base_url + '/measures/delete',
            },
            messages: {
                addNewRecord: 'Nueva Unidad de Medidad',
                editRecord: 'Editar Unidad de Medidad',
            },
            toolbar: {
                items: [{
                    cssClass: 'buscador',
                    text: search
                },{
                    cssClass: 'btn-primary',
                    text: '<i class="fa fa-file-excel-o"></i> Exportar a Excel',
                    click: function () {
                        $scope.openDoc('measures/excel', {});
                    }
                }]
            },
            fields: {
                IdUnidadMedida: {
                    key: true,
                    create: false,
                    edit: false,
                    list: false
                },
                Medida: {
                    title: 'Medida'
                },

                 Equivalencia: {
                    title: 'Equivalencia Sunat'
                },
                Abreviatura: {
                    title: 'Abreviatura'
                },
               
               
                
                
            },
            formCreated: function (event, data) {
                data.form.find('input[name="Medida"]').attr('onkeypress','return soloLetras(event)');
                 data.form.find('input[name="Equivalencia"]').attr('onkeypress','return soloNumeros(event)');
                   data.form.find('input[name="Abreviatura"]').attr('maxlength','3');
            },
          
            formSubmitting: function (event, data) {
                var bval = true;
                bval = bval && data.form.find('input[name="Medida"]').required();
                bval = bval && data.form.find('input[name="Equivalencia"]').required();
                return bval;
            }
        });

        generateSearchForm('frm-search-Measure', 'LoadRecordsButtonMeasure', function(){
            table_container_Measure.jtable('load', {
                search: $('#search_b').val()
            });
        }, true);
    }

    function Config($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('measures', {
                url: '/measures',
                templateUrl: base_url + '/templates/measures/base.html',
                controller: 'MeasureCtrl'
            });

        $urlRouterProvider.otherwise('/');
    }
})
();