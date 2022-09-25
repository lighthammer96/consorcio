/**
 * Created by EVER CARLOS ROJAS on 30/05/2017.
 */

(function () {
    'use strict';
    angular.module('sys.app.valorizations')
        .config(Config)
        .controller('ValorizationCtrl', ValorizationCtrl);

    Config.$inject = ['$stateProvider', '$urlRouterProvider'];
    ValorizationCtrl.$inject = ['$scope', 'AlertFactory'];

    function ValorizationCtrl($scope, AlertFactory) {
        moment.locale('es');

        var start = moment().startOf('month');
        var end = moment().endOf('month');

        var modalP;
        var modalSP;
        var titleP;
        var reqDates = $('#reqDates');

        var showDate = function (start, end) {
            reqDates.find('span').html(start.format('MMM D, YYYY') + ' - ' + end.format('MMM D, YYYY'));
            //getListRooms(start.format('YYYY-MM-DD'), end.format('YYYY-MM-DD'));
        };
        generateDateRangePicker(reqDates, start, end, showDate);
        showDate(start, end);

        var btn_return;
        var pv1_class;
        var expense_class;

        $scope.editSP = function () {
            overModals();
            $('#titleModalSP').html('Editar Subproyecto');
            $('#input_sp').val('LINEA PRIMARIA');
            modalSP.modal('show');
            $('.chk_sp').prop('checked', true).iCheck('update');
        };

        $scope.addSubProjects = function () {
            overModals();
            $('#titleModalSP').html('Agregar Subproyecto');
            $('#input_sp').val('');
            modalSP.modal('show');
            $('.chk_sp').prop('checked', false).iCheck('update');
        };

        $('.i-checks').iCheck({
            checkboxClass: 'icheckbox_square-green'
        }).on('ifChanged', function (event) {
            $(event.target).click();
        });

        function overModals() {
            modalP = $('#modalV');
            modalSP = $('#modalSP');
            titleP = $('#titleV');
            btn_return = $('#btn_return');
            pv1_class = $('.show_pv1');
            expense_class = $('.show_expense');

            modalP.on('hidden.bs.modal', function (e) {
                btn_return.prop('disabled', false);
                pv1_class.removeClass('hide');
                expense_class.removeClass('hide');
                activeTab('tab1');
            });
            modalSP.on('hidden.bs.modal', function (e) {
                activeTab('levels');
                modalP.attr('style', 'display:block; overflow-y: auto;');
            });
            modalSP.on('show.bs.modal', function (e) {
                modalP.attr('style', 'display:block; z-index:2030 !important');
            });

            $('.select_front').select2({
                language: "es",
                placeholder: 'Buscar frente...'
            });

            $('.i-checks').iCheck({
                checkboxClass: 'icheckbox_square-green'
            }).on('ifChanged', function (event) {
                $(event.target).click();
            });
        }

        function showActivity() {
            btn_return.prop('disabled', true);
            pv1_class.addClass('hide');
        }

        function showExpense() {
            activeTab('tab3');
            expense_class.addClass('hide');
        }

        var search = getFormSearch('frm-search-p', 'search_p', 'LoadRecordsButtonP');

        var states = '<select id="states" class="search_input">' +
            '<option value="">Todos los Estados</option>' +
            '<option value="">Registrado</option>' +
            '<option value="">Aprobado</option>' +
            '<option value="">Facturado</option>' +
            '</select>';

        var table_container_p = $("#table_container_v");

        table_container_p.jtable({
            title: "Lista de Valorizaciones",
            paging: true,
            sorting: true,
            actions: {
                listAction: function (postData, jtParams) {
                    return {
                        "Result": "OK",
                        "Records": [
                            {
                                "code": '00047', "descripcion": "VALORIZACIÓN N° 016 - FEBRERO DEL 2017","proyecto": "CONEXIONES MASIVAS",
                                "total" : "12,000.00","estado" : "REGISTRADO"
                            },
                            {
                                "code": '00048', "descripcion": "VALORIZACIÓN N° 017 - FEBRERO DEL 2017","proyecto":  "ENOSA_CONSORCIO SANTA CRUZ",
                                "total" : "9,000.00","estado" : "APROBADO"
                            },
                            {
                                "code": '00020', "descripcion": "VALORIZACIÓN N° 018 - FEBRERO DEL 2017","proyecto": "OI - EECOL-CERCADO",
                                "total" : "8,000.00","estado" : "FACTURADO"
                            },
                            {
                                "code": '00023', "descripcion": "VALORIZACIÓN N° 019 - FEBRERO DEL 2017","proyecto": "ENSA_CONSORCIO SAN JUDAS TADEO-SELVA CENTRAL",
                                "total" : "7,000.00","estado" : "REGISTRADO"
                            },
                        ],
                        "TotalRecordCount": 4
                    };
                },
                deleteAction: base_url + '/projects/delete'
            },
            toolbar: {
                items: [{
                    cssClass: 'buscador',
                    text: states
                }, {
                    cssClass: 'buscador',
                    text: search
                }, {
                    cssClass: 'btn-primary',
                    text: '<i class="fa fa-file-excel-o"></i> Exportar a Excel',
                    click: function () {
                        window.open(base_url + '/purchase_orders/excel');
                    }
                }, {
                    cssClass: 'btn-success',
                    text: '<i class="fa fa-plus"></i> Nueva Valorización',
                    click: function () {
                        overModals();
                        titleP.html('VALORIZACIÓN N° 016 - FEBRERO DEL 2017');
                        modalP.modal('show');
                    }
                }]
            },
            fields: {
                id: {
                    key: true,
                    create: false,
                    edit: false,
                    list: false
                },
                code: {
                    title: 'Código',
                    width: '2%'
                },
                descripcion: {
                    title: 'Descripción'
                },
                proyecto: {
                    title: 'Proyecto',
                    list: show_list_
                },
                total: {
                    title: 'Total',
                    listClass: 'text-right',
                    width: '3%'
                },
                estado: {
                    title: 'Estado',
                    width: '3%'
                },
                // activity: {
                //     width: '1%',
                //     sorting: false,
                //     edit: false,
                //     create: false,
                //     display: function (data) {
                //         return '<a href="javascript:void(0)" title="Recursos por Actividad" class="activity_p" data-code="'+
                //             data.record.id+'"><i class="fa fa-history fa-1-5x"></i></a>';
                //     }
                // },
                // expenses: {
                //     width: '1%',
                //     sorting: false,
                //     edit: false,
                //     create: false,
                //     display: function (data) {
                //         return '<a href="javascript:void(0)" title="Gastos" class="expense_p" data-code="'+
                //             data.record.id+'"><i class="fa fa-money fa-1-5x fa-orange"></i></a>';
                //     }
                // },
                edit: {
                    width: '1%',
                    sorting: false,
                    edit: false,
                    create: false,
                    display: function (data) {
                        return '<a href="javascript:void(0)" title="Editar" class="edit_p" data-code="' +
                            data.record.id + '"><i class="fa fa-edit fa-1-5x fa-green"></i></a>';
                    }
                }
            },
            recordsLoaded: function (event, data) {
                $('.edit_p').click(function (e) {
                    overModals();
                    titleP.html('Editar Proyecto');
                    modalP.modal('show');
                    e.preventDefault();
                });
                $('.activity_p').click(function (e) {
                    overModals();
                    titleP.html('Recursos por Actividad - Proyecto');
                    showActivity();
                    modalP.modal('show');
                    e.preventDefault();
                });
                $('.expense_p').click(function (e) {
                    overModals();
                    titleP.html('Gastos - Proyecto');
                    showExpense();
                    modalP.modal('show');
                    e.preventDefault();
                });
            }
        });

        generateSearchForm('frm-search-p', 'LoadRecordsButtonP', function () {
            table_container_p.jtable('load', {
                search: $('#search_p').val()
            });
        }, true);

        $scope.showMat = function (id) {
            console.log(id);
            $('.mat').prop('checked', false).iCheck('update');
            $('#mat' + id).prop('checked', true).iCheck('update');
            $('.show_list_mat').addClass('hide');
            $('.show_list' + id).removeClass('hide');
            if (id == 1 || id == 2) {
                $('.show_1').addClass('hide');
                $('.show_2').removeClass('hide');
            } else {
                $('.show_1').removeClass('hide');
                $('.show_2').addClass('hide');
            }
        };
        setTimeout(function () {
            $scope.showMat(3);
        }, 2000);
    }

    function Config($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('valorizations', {
                url: '/valorizations',
                templateUrl: base_url + '/templates/valorizations/base.html',
                controller: 'ValorizationCtrl'
            });

        $urlRouterProvider.otherwise('/');
    }
})
();