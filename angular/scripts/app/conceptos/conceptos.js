/**
 * Created by JAIR on 4/5/2017.
 */

(function () {
    'use strict';
    angular.module('sys.app.conceptos')
        .config(Config)
        .controller('ConceptosCtrl', ConceptosCtrl);

    Config.$inject = ['$stateProvider', '$urlRouterProvider'];
    ConceptosCtrl.$inject = ['$scope'];

    function ConceptosCtrl($scope) {

        $scope.chkState = function () {
            var txt_state2 = (w_state.prop('checked')) ? 'Activo' : 'Inactivo';
            state_state.html(txt_state2);
        };

        var search = getFormSearch('frm-search-conceptos', 'search_b', 'LoadRecordsButtonConceptos');

        var table_container_Conceptos = $("#table_container_conceptos");

        table_container_Conceptos.jtable({
            title: "Lista de Conceptos",
            paging: true,
            sorting: true,
            actions: {
                listAction: base_url + '/conceptos/list',
                createAction: base_url + '/conceptos/create',
                updateAction: base_url + '/conceptos/update',
                deleteAction: base_url + '/conceptos/delete',
            },
            messages: {
                addNewRecord: 'Nuevo Concepto',
                editRecord: 'Editar Concepto',
            },
            toolbar: {
                items: [{
                    cssClass: 'buscador',
                    text: search
                }, {
                    cssClass: 'btn-primary',
                    text: '<i class="fa fa-file-excel-o"></i> Exportar a Excel',
                    click: function () {
                        $scope.openDoc('conceptos/excel', {});
                    }
                }]
            },
            fields: {
                idconcepto: {
                    key: true,
                    create: false,
                    edit: false,
                    list: false
                },
                descripcion: {
                    title: 'Concepto',
                },
                cuenta_contable: {
                    title: 'Cuenta Contable',
                },
                centro_costo: {
                    title: 'Centro Costo',
                },
                estado: {
                    title: 'Estado',
                    values: { 'I': 'Inactivo', 'A': 'Activo' },
                    type: 'checkbox',
                    defaultValue: 'A',

                },

            },


            formCreated: function (event, data) {
                data.form.find('input[name="decripcion"]').attr('onkeypress', 'return soloLetras(event)');
                $('#Edit-estado').parent().addClass('i-checks');

                $('.i-checks').iCheck({
                    checkboxClass: 'icheckbox_square-green'
                }).on('ifChanged', function (e) {
                    $(e.target).click();
                    if (e.target.value == 'A') {
                        $("#Edit-estado").val("I");
                        $(".i-checks span").text("Inactivo");

                    } else {
                        $("#Edit-estado").val("A");
                        $(".i-checks span").text("Activo");
                    };
                });
            },
            formSubmitting: function (event, data) {
                var bval = true;
                bval = bval && data.form.find('input[name="descripcion"]').required();
                return bval;
            }
        });

        generateSearchForm('frm-search-Conceptos', 'LoadRecordsButtonConceptos', function () {
            table_container_Conceptos.jtable('load', {
                search: $('#search_b').val()
            });
        }, true);
    }

    function Config($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('conceptos', {
                url: '/conceptos',
                templateUrl: base_url + '/templates/conceptos/base.html',
                controller: 'ConceptosCtrl'
            });

        $urlRouterProvider.otherwise('/');
    }
})
();