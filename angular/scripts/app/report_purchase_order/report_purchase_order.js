(function () {
    'use strict';
    angular.module('sys.app.report_purchase_order')
        .config(Config)
        .controller('ReportPurchaseOrderCtrl', ReportPurchaseOrderCtrl);

    Config.$inject = ['$stateProvider', '$urlRouterProvider'];
    ReportPurchaseOrderCtrl.$inject = ['$scope', '_', 'RESTService'];

    function ReportPurchaseOrderCtrl($scope, _, RESTService)
    {
        moment.locale('es');

        var start_date = moment().startOf('month');
        var end_date = moment().endOf('month');

        var datesRep = $('#datesRep');
        var showDate = function (from, to) {
            start_date = from;
            end_date = to;
            datesRep.find('span').html(from.format('MMM D, YYYY') + ' - ' + to.format('MMM D, YYYY'));
        };
        generateDateRangePicker(datesRep, start_date, end_date, showDate, 'right');
        showDate(start_date, end_date);

        var table_1 = $('div#table_1');
        var table_2 = $('div#table_2');
        var r_list1 = $('tbody#r_list1');
        var r_list2 = $('tbody#r_list2');

        var r_type = $('select#r_type');
        r_type.change(function () {
            verifyTypeR();
        });
        var r_state = $('select#r_state');
        var r_currency = $('select#r_currency');
        var r_nro_oc = $('input#r_nro_oc');
        var r_provider_id = '';
        var r_provider = $('input#r_provider');
        var r_buyer_id = '';
        var r_buyer = $('input#r_buyer');
        var r_category_id = '';
        var r_category = $('input#r_category');
        var r_product_id = '';
        var r_product = $('input#r_product');
        var r_pending = $('select#r_pending');

        var modalFilter = $('div#modalFilter');
        modalFilter.on('hidden.bs.modal', function (e) {
            cleanRequired();
        });
        var modalProvider = $('div#modalProvider');
        modalProvider.on('show.bs.modal', function (e) {
            $('#LoadRecordsButtonProv').click();
            modalFilter.attr('style', 'display:block; z-index:2030 !important');
        });
        modalProvider.on('hidden.bs.modal', function (e) {
            $('#search_prov').val('');
            $('#LoadRecordsButtonProv').click();
            modalFilter.attr('style', 'display:block; overflow-y: auto;');
        });
        var modalBuyer = $('div#modalBuyer');
        modalBuyer.on('show.bs.modal', function (e) {
            $('#LoadRecordsButtonBuyer').click();
            modalFilter.attr('style', 'display:block; z-index:2030 !important');
        });
        modalBuyer.on('hidden.bs.modal', function (e) {
            $('#search_buyer').val('');
            $('#LoadRecordsButtonBuyer').click();
            modalFilter.attr('style', 'display:block; overflow-y: auto;');
        });
        var modalCategory = $('div#modalCategory');
        modalCategory.on('show.bs.modal', function (e) {
            $('#LoadRecordsButtonCat').click();
            modalFilter.attr('style', 'display:block; z-index:2030 !important');
        });
        modalCategory.on('hidden.bs.modal', function (e) {
            $('#search_cat').val('');
            $('#LoadRecordsButtonCat').click();
            modalFilter.attr('style', 'display:block; overflow-y: auto;');
        });
        var modalProduct = $('div#modalProduct');
        modalProduct.on('show.bs.modal', function (e) {
            $('#LoadRecordsButtonProd').click();
            modalFilter.attr('style', 'display:block; z-index:2030 !important');
        });
        modalProduct.on('hidden.bs.modal', function (e) {
            $('#search_prod').val('');
            $('#LoadRecordsButtonProd').click();
            modalFilter.attr('style', 'display:block; overflow-y: auto;');
        });

        function verifyTypeR() {
            if (parseInt(r_type.val()) === 1) {
                $('div.r_detail_show').addClass('hide');
                r_category_id = '';
                r_category.val('');
                r_product_id = '';
                r_product.val('');
                r_pending.val('0');
            } else {
                $('div.r_detail_show').removeClass('hide');
            }
        }

        $scope.generateReport = function () {
            table_1.addClass('hide');
            table_2.addClass('hide');
            var params = {
                'start_date': start_date.format('YYYY-MM-DD'),
                'end_date': end_date.format('YYYY-MM-DD'),
                'type': r_type.val(),
                'state': r_state.val(),
                'currency': r_currency.val(),
                'number_oc': r_nro_oc.val(),
                'provider': r_provider_id,
                'buyer': r_buyer_id,
                'category': r_category_id,
                'product': r_product_id,
                'pending': r_pending.val(),
            };
            RESTService.updated('report_purchase_order/all', 0, params, function (response) {
                if (!_.isUndefined(response.status) && response.status) {
                    generateListOC(response.data);
                } else {
                    $scope.showAlert('', response.message, 'warning');
                }
            });
        };

        function generateListOC(data) {
            var type_ = parseInt(r_type.val());
            if (type_ === 1) {
                table_1.removeClass('hide');
            } else {
                table_2.removeClass('hide');
            }
            r_list1.empty();
            r_list2.empty();
            var count1 = 1, count2 = 1;
            _.each(data, function (info) {
                if (type_ === 1) {
                    var tr_ = $('<tr></tr>');
                    tr_.append('<td class="text-center">' + count1 + '</td>');
                    tr_.append('<td class="text-center">' + info.code + '</td>');
                    tr_.append('<td class="text-center">' + info.date_reg + '</td>');
                    tr_.append('<td class="text-center">' + info.date_req + '</td>');
                    tr_.append('<td>' + info.provider + '</td>');
                    tr_.append('<td class="text-center">' + info.payment_condition + '</td>');
                    tr_.append('<td>' + info.buyer + '</td>');
                    tr_.append('<td class="text-center">' + info.currency + '</td>');
                    tr_.append('<td class="text-right">' + info.total + '</td>');
                    tr_.append('<td class="text-center">' + info.state + '</td>');
                    r_list1.append(tr_);
                    count1++;
                } else {
                    _.each(info.detail, function (det) {
                        tr_ = $('<tr></tr>');
                        tr_.append('<td class="text-center">' + count2 + '</td>');
                        tr_.append('<td class="text-center">' + info.code + '</td>');
                        tr_.append('<td class="text-center">' + info.date_reg + '</td>');
                        tr_.append('<td class="text-center">' + info.date_req + '</td>');
                        tr_.append('<td>' + info.provider + '</td>');
                        tr_.append('<td class="text-center">' + info.payment_condition + '</td>');
                        tr_.append('<td>' + info.buyer + '</td>');
                        tr_.append('<td class="text-center">' + info.currency + '</td>');
                        tr_.append('<td class="text-right">' + det.total + '</td>');
                        tr_.append('<td class="text-center">' + det.state + '</td>');
                        tr_.append('<td>' + det.category + '</td>');
                        tr_.append('<td class="text-center">' + det.code + '</td>');
                        tr_.append('<td>' + det.text + '</td>');
                        tr_.append('<td class="text-right">' + det.q_rec + '</td>');
                        tr_.append('<td class="text-right">' + det.q_pen + '</td>');
                        r_list2.append(tr_);
                        count2++;
                    });
                }
            });
        }

        $scope.generateReportExcel = function () {
            $scope.openDoc('report_purchase_order/excel', {
                'start_date': start_date.format('YYYY-MM-DD'),
                'end_date': end_date.format('YYYY-MM-DD'),
                'type': r_type.val(),
                'state': r_state.val(),
                'currency': r_currency.val(),
                'number_oc': r_nro_oc.val(),
                'provider': r_provider_id,
                'buyer': r_buyer_id,
                'category': r_category_id,
                'product': r_product_id,
                'pending': r_pending.val(),
            });
        };

        $scope.openProvider = function () {
            modalProvider.modal('show');
        };
        $scope.cleanProvider = function () {
            r_provider_id = '';
            r_provider.val('');
        };

        $scope.openBuyer = function () {
            modalBuyer.modal('show');
        };
        $scope.cleanBuyer = function () {
            r_buyer_id = '';
            r_buyer.val('');
        };

        $scope.openCategory = function () {
            modalCategory.modal('show');
        };
        $scope.cleanCategory = function () {
            r_category_id = '';
            r_category.val('');
        };

        $scope.openProduct = function () {
            modalProduct.modal('show');
        };
        $scope.cleanProduct = function () {
            r_product_id = '';
            r_product.val('');
        };

        $scope.showFilters = function() {
            modalFilter.modal('show');
        };
        $scope.resetFilter = function () {
            r_type.val('1').trigger('change');
            r_state.val('');
            r_currency.val('');
            r_nro_oc.val('');
            r_provider_id = '';
            r_provider.val('');
            r_buyer_id = '';
            r_buyer.val('');
        };
        $scope.saveFilter = function () {
            $scope.generateReport();
            modalFilter.modal('hide');
        };
        
        var search_prov = getFormSearch('frm-search-prov', 'search_prov', 'LoadRecordsButtonProv');

        var table_container_prov = $("#table_container_prov");

        table_container_prov.jtable({
            title: "Lista de Proveedores",
            paging: true,
            actions: {
                listAction: base_url + '/report_purchase_order/listProv'
            },
            toolbar: {
                items: [{
                    cssClass: 'buscador',
                    text: search_prov
                }]
            },
            fields: {
                id: {
                    key: true,
                    create: false,
                    edit: false,
                    list: false
                },
                documento: {
                    title: 'Documento',
                },
                razonsocial: {
                    title: 'Razon Social',
                },
                contacto: {
                    title: 'Contacto',
                },
                direccion: {
                    title: 'Dirección',
                },
                edit: {
                    width: '1%',
                    sorting: false,
                    edit: false,
                    create: false,
                    listClass: 'text-center',
                    display: function (data) {
                        return '<a href="javascript:void(0)" class="sel-prov" data-id="' + data.record.id
                            + '" title="Seleccionar"><i class="fa fa-check-circle fa-1-5x"></i></a>';
                    }
                }
            },
            recordsLoaded: function (event, data) {
                table_container_prov.find('a.sel-prov').click(function (e) {
                    var id = $(this).attr('data-id');
                    var info = _.find(data.records, function (item) {
                        return parseInt(item.id) === parseInt(id);
                    });
                    if (info) {
                        r_provider_id = info.id;
                        r_provider.val(info.razonsocial);
                    }
                    modalProvider.modal('hide');
                    e.preventDefault();
                });
            }
        });

        generateSearchForm('frm-search-prov', 'LoadRecordsButtonProv', function () {
            table_container_prov.jtable('load', {
                search: $('#search_prov').val()
            });
        }, false);

        var search_buyer = getFormSearch('frm-search-buyer', 'search_buyer', 'LoadRecordsButtonBuyer');

        var table_container_buyer = $("#table_container_buyer");

        table_container_buyer.jtable({
            title: "Lista de Compradores",
            paging: true,
            actions: {
                listAction: base_url + '/report_purchase_order/listBuyer'
            },
            toolbar: {
                items: [{
                    cssClass: 'buscador',
                    text: search_buyer
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
                    title: 'Código'
                },
                description: {
                    title: 'Descripción'
                },
                name: {
                    title: 'Usuario',
                    sorting: false
                },
                edit: {
                    width: '1%',
                    sorting: false,
                    edit: false,
                    create: false,
                    listClass: 'text-center',
                    display: function (data) {
                        return '<a href="javascript:void(0)" class="sel-buyer" data-id="' + data.record.id
                            + '" title="Seleccionar"><i class="fa fa-check-circle fa-1-5x"></i></a>';
                    }
                }
            },
            recordsLoaded: function (event, data) {
                table_container_buyer.find('a.sel-buyer').click(function (e) {
                    var id = $(this).attr('data-id');
                    var info = _.find(data.records, function (item) {
                        return parseInt(item.id) === parseInt(id);
                    });
                    if (info) {
                        r_buyer_id = info.id;
                        r_buyer.val(info.description);
                    }
                    modalBuyer.modal('hide');
                    e.preventDefault();
                });
            }
        });

        generateSearchForm('frm-search-buyer', 'LoadRecordsButtonBuyer', function () {
            table_container_buyer.jtable('load', {
                search: $('#search_buyer').val()
            });
        }, false);

        var search_cat = getFormSearch('frm-search-cat', 'search_cat', 'LoadRecordsButtonCat');

        var table_container_cat = $("#table_container_cat");

        table_container_cat.jtable({
            title: "Lista de Categorias",
            paging: true,
            actions: {
                listAction: base_url + '/report_purchase_order/listCat'
            },
            toolbar: {
                items: [{
                    cssClass: 'buscador',
                    text: search_cat
                }]
            },
            fields: {
                idCategoria: {
                    key: true,
                    create: false,
                    edit: false,
                    list: false
                },
                Categoria: {
                    title: 'Categoría',
                },
                edit: {
                    width: '1%',
                    sorting: false,
                    edit: false,
                    create: false,
                    listClass: 'text-center',
                    display: function (data) {
                        return '<a href="javascript:void(0)" class="sel-cat" data-id="' + data.record.idCategoria
                            + '" title="Seleccionar"><i class="fa fa-check-circle fa-1-5x"></i></a>';
                    }
                }
            },
            recordsLoaded: function (event, data) {
                table_container_cat.find('a.sel-cat').click(function (e) {
                    var id = $(this).attr('data-id');
                    var info = _.find(data.records, function (item) {
                        return parseInt(item.idCategoria) === parseInt(id);
                    });
                    if (info) {
                        r_category_id = info.idCategoria;
                        r_category.val(info.Categoria);
                    }
                    modalCategory.modal('hide');
                    e.preventDefault();
                });
            }
        });

        generateSearchForm('frm-search-cat', 'LoadRecordsButtonCat', function () {
            table_container_cat.jtable('load', {
                search: $('#search_cat').val()
            });
        }, false);

        var search_prod = getFormSearch('frm-search-prod', 'search_prod', 'LoadRecordsButtonProd');

        var table_container_prod = $("#table_container_prod");

        table_container_prod.jtable({
            title: "Lista de Articulos",
            paging: true,
            actions: {
                listAction: base_url + '/report_purchase_order/listProd'
            },
            toolbar: {
                items: [{
                    cssClass: 'buscador',
                    text: search_prod
                }]
            },
            fields: {
                id: {
                    key: true,
                    create: false,
                    edit: false,
                    list: false
                },
                code_article: {
                    title:  'Código Artículo',
                    listClass:'text-center',
                    width: '2%'
                },
                description: {
                    title: 'Descripción'
                },
                code_matrix: {
                    title: 'Matriz del Artículo',
                    listClass:'text-center',
                    width: '3%'
                },
                edit: {
                    width: '1%',
                    sorting: false,
                    edit: false,
                    create: false,
                    listClass: 'text-center',
                    display: function (data) {
                        return '<a href="javascript:void(0)" class="sel-prod" data-id="' + data.record.id
                            + '" title="Seleccionar"><i class="fa fa-check-circle fa-1-5x"></i></a>';
                    }
                }
            },
            recordsLoaded: function (event, data) {
                table_container_prod.find('a.sel-prod').click(function (e) {
                    var id = $(this).attr('data-id');
                    var info = _.find(data.records, function (item) {
                        return parseInt(item.id) === parseInt(id);
                    });
                    if (info) {
                        r_product_id = info.id;
                        r_product.val(info.description);
                    }
                    modalProduct.modal('hide');
                    e.preventDefault();
                });
            }
        });

        generateSearchForm('frm-search-prod', 'LoadRecordsButtonProd', function () {
            table_container_prod.jtable('load', {
                search: $('#search_prod').val()
            });
        }, false);
    }

    function Config($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('report_purchase_order', {
                url: '/report_purchase_order',
                templateUrl: base_url + '/templates/report_purchase_order/base.html',
                controller: 'ReportPurchaseOrderCtrl'
            });

        $urlRouterProvider.otherwise('/');
    }
})
();