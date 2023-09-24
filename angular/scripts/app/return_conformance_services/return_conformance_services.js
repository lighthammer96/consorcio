(function () {
    'use strict';
    angular.module('sys.app.return_conformance_services')
        .config(Config)
        .controller('ReturnConformanceServicesCtrl', ReturnConformanceServicesCtrl);

    Config.$inject = ['$stateProvider', '$urlRouterProvider'];
    ReturnConformanceServicesCtrl.$inject = ['$scope', '_', 'RESTService', 'AlertFactory'];

    function ReturnConformanceServicesCtrl($scope, _, RESTService, AlertFactory)
    {
        moment.locale('es');
        var start = moment().startOf('month');
        var end = moment().endOf('month');

        var chk_date_range = $('#chk_date_range');
        chk_date_range.click(function () {
            $('#LoadRecordsButtonDev').click();
        });
        generateCheckBox('.chk_date_range_cs');

        var reqDates = $('#reqDates');

        var showDate = function (from, to) {
            start = from;
            end = to;
            reqDates.find('span').html(from.format('MMM D, YYYY') + ' - ' + to.format('MMM D, YYYY'));
            if (chk_date_range.prop('checked')) {
                $('#LoadRecordsButtonDev').click();
            }
        };
        generateDateRangePicker(reqDates, start, end, showDate);
        showDate(start, end);

        var modalDev = $("#modalDev");
        modalDev.on('hidden.bs.modal', function (e) {
            clearDev();
        });
        var titleDev = $("#titleDev");
        var modalC = $('#modalC');
        modalC.on('show.bs.modal', function (e) {
            $('#LoadRecordsButtonRec').click();
            modalDev.attr('style', 'display:block; z-index:2030 !important');
        });
        modalC.on('hidden.bs.modal', function (e) {
            $('#search_rec').val('');
            $('#LoadRecordsButtonRec').click();
            modalDev.attr('style', 'display:block; overflow-y: auto;');
        });

        var d_id = 0;
        var d_mov = '';
        var d_state_id = 1;
        var d_code = $("input#d_code");
        var d_cs_id = '';
        var d_cs = $('input#d_cs');
        var d_cs_btn = $('button#d_cs_btn');
        var d_date = $('input#d_date');
        generateDatePicker(d_date);
        var d_operation = $('select#d_operation');
        var d_currency = $('input#d_currency');
        var d_observations = $('textarea#d_observations');
        var d_detail = $('tbody#d_detail');

        function clearDev() {
            cleanRequired();
            titleDev.empty();
            d_id = 0;
            d_state_id = 1;
            d_code.val('');
            d_cs_id = '';
            d_cs.val('');
            d_cs_btn.prop('disabled', false);
            d_date.val('').prop('disabled', false);
            d_currency.val('');
            d_observations.val('').prop('disabled', false);
            d_detail.empty();

            $('button.btn-save, button.btn-frm').removeClass('hide');
            $('button.btn-print').addClass('hide');
        }

        function getDataDev() {
            RESTService.all('return_conformance_services/data_form', '', function (response) {
                if (!_.isUndefined(response.status) && response.status) {
                    d_operation.empty();
                    _.each(response.operations, function (item) {
                        if (parseInt(item.IdTipoOperacion) === 10) {
                            d_operation.append('<option value="' + item.IdTipoOperacion + '">' + item.descripcion + '</option>');
                        }
                    });
                }
            }, function () {
                getDataDev();
            });
        }
        getDataDev();

        $scope.openCS = function () {
            modalC.modal('show');
        };

        $scope.printDev = function () {
            if (d_id !== 0) {
                if (d_state_id < 2) {
                    $scope.showAlert('', 'Solo se puede imprimir cuando la devolución este procesada', 'warning');
                    return false;
                }
                var data = {
                    id: d_mov,
                    idtipoOpe: d_operation.val(),
                    option: 'ret_cs'
                };
                var params_ext = {
                    'title': 'DEVOLUCIÓN DE ORDEN DE SERVICIO',
                    'client_txt': 'PROVEEDOR: ',
                    'user_txt': 'COMPRADOR: '
                };
                $scope.loadMovimientoEntregaPDF('return_conformance_services/pdf', data, params_ext);
            }
        };

        function newDev() {
            titleDev.html('Nueva Devolución');
            modalDev.modal('show');
        }

        function findDev(id) {
            RESTService.get('return_conformance_services/find', id, function (response) {
                if (!_.isUndefined(response.status) && response.status) {
                    d_id = id;
                    var data_ = response.data;
                    d_mov = data_.mov_id;
                    d_state_id = parseInt(data_.state_id);
                    var disabled_ = (d_state_id > 1);
                    d_code.val(data_.code);
                    d_cs_id = data_.cs_id;
                    d_cs.val(data_.cs_);
                    d_cs_btn.prop('disabled', disabled_);
                    d_date.val(data_.date).prop('disabled', disabled_);
                    d_operation.val(data_.operation_id);
                    d_currency.val(data_.currency_);
                    d_observations.val(data_.observation).prop('disabled', disabled_);
                    _.each(data_.detail_, function (det) {
                        addDetailRet(det);
                    });
                    $('button.btn-print').removeClass('hide');
                    if (disabled_) {
                        $('button.btn-save, button.btn-frm').addClass('hide');
                    }
                    var txt_ = (d_state_id > 1) ? 'Ver' : 'Editar';
                    titleDev.html(txt_ + ' Devolución');
                    modalDev.modal("show");
                } else {
                    $scope.showAlert('', response.message, 'warning');
                }
            });
        }

        var search = getFormSearch('frm-search-dev', 'search_dev', 'LoadRecordsButtonDev');

        var table_container_dev = $("#table_container_dev");

        table_container_dev.jtable({
            title: "Lista de devolución de ordenes de servicio",
            paging: true,
            actions: {
                listAction: base_url + '/return_conformance_services/list',
                deleteAction: base_url + '/return_conformance_services/delete'
            },
            toolbar: {
                items: [{
                    cssClass: 'buscador',
                    text: search
                    // }, {
                    //     cssClass: 'btn-primary',
                    //     text: '<i class="fa fa-file-excel-o"></i> Exportar a Excel',
                    //     click: function () {
                    //         $scope.openDoc('return_conformance_services/excel', {});
                    //     }
                }, {
                    cssClass: 'btn-danger-admin',
                    text: '<i class="fa fa-plus"></i> Devolución',
                    click: function () {
                        newDev();
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
                    listClass: 'text-center'
                },
                cs_: {
                    title: 'Conformidad',
                    listClass: 'text-center'
                },
                date: {
                    title: 'Fecha',
                    listClass: 'text-center'
                },
                currency_: {
                    title: 'Moneda',
                    listClass: 'text-center'
                },
                total: {
                    title: 'Total',
                    listClass: 'text-center'
                },
                state: {
                    title: 'Estado',
                    listClass: 'text-center'
                },
                edit: {
                    width: '1%',
                    sorting: false,
                    edit: false,
                    create: false,
                    listClass: 'text-center',
                    display: function (data) {
                        return '<a href="javascript:void(0)" class="edit-dev" data-code="' + data.record.id
                            + '" title="Editar"><i class="fa fa-edit fa-1-5x"></i></a>';
                    }
                }
            },
            recordsLoaded: function (event, data) {
                table_container_dev.find('a.edit-dev').click(function (e) {
                    var code_ = $(this).attr('data-code');
                    findDev(code_);
                    e.preventDefault();
                });
            }
        });

        generateSearchForm('frm-search-dev', 'LoadRecordsButtonDev', function () {
            table_container_dev.jtable('load', {
                search: $('#search_dev').val(),
                check: (chk_date_range.prop('checked')),
                from: start.format('YYYY-MM-DD'),
                to: end.format('YYYY-MM-DD')
            });
        }, true);

        var search_rec = getFormSearch('frm-search-rec', 'search_rec', 'LoadRecordsButtonRec');

        var table_container_rec = $("#table_container_rec");

        table_container_rec.jtable({
            title: "Conformidades de Ordenes de Servicio",
            paging: true,
            actions: {
                listAction: base_url + '/return_conformance_services/listC'
            },
            toolbar: {
                items: [{
                    cssClass: 'buscador',
                    text: search_rec
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
                    listClass: 'text-center'
                },
                oc: {
                    title: 'OC',
                    listClass: 'text-center'
                },
                date: {
                    title: 'Fecha',
                    listClass: 'text-center'
                },
                currency_: {
                    title: 'Moneda',
                    listClass: 'text-center'
                },
                total: {
                    title: 'Total',
                    listClass: 'text-center'
                },
                state: {
                    title: 'Estado',
                    listClass: 'text-center'
                },
                edit: {
                    width: '1%',
                    sorting: false,
                    edit: false,
                    create: false,
                    listClass: 'text-center',
                    display: function (data) {
                        return '<a href="javascript:void(0)" class="sel-rec" data-id="' + data.record.id
                            + '" title="Editar"><i class="fa fa-check-circle fa-1-5x"></i></a>';
                    }
                }
            },
            recordsLoaded: function (event, data) {
                table_container_rec.find('a.sel-rec').click(function (e) {
                    var id = $(this).attr('data-id');
                    var info = _.find(data.records, function (item) {
                        return parseInt(item.id) === parseInt(id);
                    });
                    if (info) {
                        if (parseInt(d_cs_id) !== parseInt(info.id)) {
                            d_detail.empty();
                        }
                        d_cs_id = info.id;
                        d_cs.val(info.code).removeClass('border-red');
                        d_currency.val(info.currency_);
                        _.each(info.detail_, function (item) {
                            addDetailRet(item);
                        });
                    }
                    modalC.modal('hide');
                    e.preventDefault();
                });
            }
        });

        generateSearchForm('frm-search-rec', 'LoadRecordsButtonRec', function () {
            table_container_rec.jtable('load', {
                search: $('#search_rec').val(),
                return_valid: true,
                no_associated_return: true,
                showDetail: true
            });
        }, false);

        $scope.saveDev = function (type) {
            saveDev(type);
        };

        function saveDev(type_) {
            var b_val = true;
            b_val = b_val && d_cs.required();
            b_val = b_val && d_date.required();
            if (b_val && d_detail.html() === '') {
                $scope.showAlert('', 'Debe seleccionar mínimo 1 servicio', 'warning');
                return false;
            }
            if (b_val) {
                var det_ = [], valid_ = true;
                _.each(d_detail.find('tr'), function (tr) {
                    var max_ = parseFloat($(tr).attr('data-q-max'));
                    var q_ = $(tr).find('input.d_return').val();
                    q_ = (q_ === '') ? 0 : parseFloat(q_);
                    det_.push({
                        'code': $(tr).attr('data-code'),
                        'product_id': $(tr).attr('data-product'),
                        'q': q_
                    });
                    if (q_ === 0) {
                        $scope.showAlert('', 'La cantidad ingresada debe ser mayor que cero', 'warning');
                        valid_ = false;
                        return false;
                    }
                    if (q_ > max_) {
                        $scope.showAlert('', 'Debe ingresar una cantidad menor o igual a la cantidad disponible', 'warning');
                        valid_ = false;
                        return false;
                    }
                });
                if (!valid_) {
                    return;
                }
                var params = {
                    'state_id': type_,
                    'cs_id': d_cs_id,
                    'date': d_date.val(),
                    'operation_id': d_operation.val(),
                    'observation': d_observations.val(),
                    'detail': det_
                };
                var txt_ = (type_ === 1) ? 'guardar' : 'procesar';
                $scope.showConfirm('', '¿Está seguro que desea ' + txt_ + ' la devolución?', function () {
                    RESTService.updated('return_conformance_services/save', d_id, params, function (response) {
                        if (!_.isUndefined(response.status) && response.status) {
                            txt_ = (type_ === 1) ? 'guardó' : 'procesó';
                            $scope.showAlert('', 'La Devolución se ' + txt_ + ' correctamente.', 'success');
                            modalDev.modal('hide');
                            $("#LoadRecordsButtonDev").click();
                        } else {
                            $scope.showAlert('', response.message, 'warning');
                        }
                    });
                });
            }
        }

        function addDetailRet(info)
        {
            var code_ = info.cd_id;
            var price_ = parseFloat(info.price);
            var quantity_ = parseFloat(info.reception);
            var pending_ = parseFloat(info.pending);
            var return_ = (_.isUndefined(info.return)) ? 0 : parseFloat(info.return);

            var tr_ = $('<tr data-code="' + code_ + '" data-product="' + info.product_id + '" ' +
                'data-q-max="' + pending_ + '"></tr>');
            tr_.append('<td>' + info.description + '</td>');
            tr_.append('<td class="text-right">' + price_ + '</td>');
            tr_.append('<td class="text-right">' + quantity_ + '</td>');
            tr_.append('<td class="text-right">' + pending_ + '</td>');

            var td_ = $('<td class="text-right"></td>');
            if (d_state_id === 1) {
                td_.append('<input type="text" class="form-control input-xs text-right d_return" ' +
                    'onclick="this.select()"' + ' onkeypress="return validDecimals(event, this, 6)" ' +
                    'onblur="return roundDecimals(this, 5)" value="' + return_ + '">');
            } else {
                td_.append('<span class="d_return">' + numberFormat(return_, 5) + '</span>');
            }
            tr_.append(td_);

            td_ = $('<td class="text-center"></td>');
            if (d_state_id === 1) {
                td_.append('<button class="btn btn-danger btn-xs del_" title="Eliminar" type="button">' +
                    '<span class="fa fa-trash"></span></button>');
            }
            tr_.append(td_);
            d_detail.append(tr_);

            if (d_state_id === 1) {
                d_detail.find('input.d_return').off().on('blur', function (e) {
                    var that = $(this);
                    var tr_ = that.closest('tr');
                    var q_max_ = parseFloat(tr_.attr('data-q-max'));
                    if (that.val() === '' || that.val() > q_max_) {
                        $scope.showAlert('', 'Debe ingresar una cantidad menor o igual a la cantidad pendiente', 'warning');
                        that.val(q_max_);
                        that.select();
                    }
                });
                d_detail.find('button.del_').off().on('click', function (e) {
                    var tr_ = $(this).closest('tr');
                    $scope.showConfirm('', '¿Está seguro que desea quitar este artículo?', function () {
                        tr_.remove();
                    });
                    e.preventDefault();
                });
            }
        }
    }

    function Config($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('return_conformance_services', {
                url: '/return_conformance_services',
                templateUrl: base_url + '/templates/return_conformance_services/base.html',
                controller: 'ReturnConformanceServicesCtrl'
            });

        $urlRouterProvider.otherwise('/');
    }
})
();