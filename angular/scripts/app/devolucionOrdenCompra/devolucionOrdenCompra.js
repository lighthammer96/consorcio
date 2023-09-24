(function () {
    'use strict';
    angular.module('sys.app.devolucionOrdenCompras')
        .config(Config)
        .controller('DevolucionOrdenCompraCtrl', DevolucionOrdenCompraCtrl);

    Config.$inject = ['$stateProvider', '$urlRouterProvider'];
    DevolucionOrdenCompraCtrl.$inject = ['$scope', '_', 'RESTService'];

    function DevolucionOrdenCompraCtrl($scope, _, RESTService)
    {
        moment.locale('es');
        var start = moment().startOf('month');
        var end = moment().endOf('month');

        var chk_date_range = $('#chk_date_range');
        chk_date_range.click(function () {
            $('#LoadRecordsButtonDev').click();
        });
        generateCheckBox('.chk_date_range_r');

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
        var modalRec = $('#modalRec');
        modalRec.on('show.bs.modal', function (e) {
            $('#LoadRecordsButtonRec').click();
            modalDev.attr('style', 'display:block; z-index:2030 !important');
        });
        modalRec.on('hidden.bs.modal', function (e) {
            $('#search_rec').val('');
            $('#LoadRecordsButtonRec').click();
            modalDev.attr('style', 'display:block; overflow-y: auto;');
        });
        var modalSeriesProduct = $('#modalSeriesProduct');
        modalSeriesProduct.on('show.bs.modal', function (e) {
            modalDev.attr('style', 'display:block; z-index:2030 !important');
        });
        modalSeriesProduct.on('hidden.bs.modal', function (e) {
            cleanSeries();
            modalDev.attr('style', 'display:block; overflow-y: auto;');
        });
        var modalSeries = $('#modalSeries');
        modalSeries.on('show.bs.modal', function (e) {
            $('#LoadRecordsButtonSer').click();
            modalSeriesProduct.attr('style', 'display:block; z-index:2030 !important');
        });
        modalSeries.on('hidden.bs.modal', function (e) {
            $('#search_ser').val('');
            $('#LoadRecordsButtonSer').click();
            modalSeriesProduct.attr('style', 'display:block; overflow-y: auto;');
        });

        var d_id = 0;
        var d_mov = '';
        var d_state_id = 1;
        var d_code = $("input#d_code");
        var d_reception_id = '';
        var d_reception = $('input#d_reception');
        var d_reception_btn = $('button#d_reception_btn');
        var d_date = $('input#d_date');
        generateDatePicker(d_date);
        var d_warehouse = $("input#d_warehouse");
        var d_operation = $('select#d_operation');
        var d_currency = $('input#d_currency');
        var d_observations = $('textarea#d_observations');
        var d_detail = $('tbody#d_detail');
        var d_detail_selected_ = '';
        var d_detail_product_ = '';
        var d_data_series = [];
        var d_series_text = $("input#d_series_text");
        var d_series_q = $("input#d_series_q");
        var d_series_detail = $("tbody#d_series_detail");

        function clearDev() {
            cleanRequired();
            titleDev.empty();
            d_id = 0;
            d_state_id = 1;
            d_code.val('');
            d_reception_id = '';
            d_reception.val('');
            d_reception_btn.prop('disabled', false);
            d_date.val('').prop('disabled', false);
            d_warehouse.val('');
            d_currency.val('');
            d_observations.val('').prop('disabled', false);
            d_detail.empty();
            d_detail_selected_ = '';
            d_detail_product_ = '';
            d_data_series = [];

            $('button.btn-save, button.btn-frm').removeClass('hide');
            $('button.btn-print').addClass('hide');
        }

        function cleanSeries() {
            d_detail_selected_ = '';
            d_detail_product_ = '';
            d_series_text.val('');
            d_series_q.val('');
            d_series_detail.empty();
        }

        function getDataDev() {
            RESTService.all('devolucionOrdenCompras/data_form', '', function (response) {
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

        $scope.openReception = function () {
            modalRec.modal('show');
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
                    option: 'ret'
                };
                var params_ext = {
                    'title': 'DEVOLUCIÓN DE ORDEN DE COMPRA',
                    'client_txt': 'PROVEEDOR: ',
                    'user_txt': 'COMPRADOR: '
                };
                $scope.loadMovimientoEntregaPDF('devolucionOrdenCompras/pdf', data, params_ext);
            }
        };

        function newDev() {
            titleDev.html('Nueva Devolución');
            modalDev.modal('show');
        }

        function findDev(id) {
            RESTService.get('devolucionOrdenCompras/find', id, function (response) {
                if (!_.isUndefined(response.status) && response.status) {
                    d_id = id;
                    var data_ = response.data;
                    d_mov = data_.mov_id;
                    d_state_id = parseInt(data_.state_id);
                    var disabled_ = (d_state_id > 1);
                    d_code.val(data_.code);
                    d_reception_id = data_.reception_id;
                    d_reception.val(data_.reception_);
                    d_reception_btn.prop('disabled', disabled_);
                    d_date.val(data_.date).prop('disabled', disabled_);
                    d_warehouse.val(data_.warehouse_);
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
            title: "Lista de devolución de ordenes de compra",
            paging: true,
            actions: {
                listAction: base_url + '/devolucionOrdenCompras/list',
                deleteAction: base_url + '/devolucionOrdenCompras/delete'
            },
            toolbar: {
                items: [{
                    cssClass: 'buscador',
                    text: search
                }, {
                    cssClass: 'btn-primary',
                    text: '<i class="fa fa-file-excel-o"></i> Exportar',
                    click: function () {
                        $scope.openDoc('devolucionOrdenCompras/excel', {
                            search: $('#search_dev').val(),
                            check: (chk_date_range.prop('checked')),
                            from: start.format('YYYY-MM-DD'),
                            to: end.format('YYYY-MM-DD')
                        });
                    }
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
                reception_: {
                    title: 'Recepción',
                    listClass: 'text-center'
                },
                date: {
                    title: 'Fecha',
                    listClass: 'text-center'
                },
                wh: {
                    title: 'Almacén',
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
            title: "Recepciones de Ordenes de Compra",
            paging: true,
            actions: {
                listAction: base_url + '/devolucionOrdenCompras/listRec'
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
                wh: {
                    title: 'Almacén',
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
                        if (parseInt(d_reception_id) !== parseInt(info.id)) {
                            d_detail.empty();
                        }
                        d_reception_id = info.id;
                        d_reception.val(info.code).removeClass('border-red');
                        d_currency.val(info.currency_);
                        d_warehouse.val(info.wh);
                        _.each(info.detail_, function (item) {
                            addDetailRet(item);
                        });
                    }
                    modalRec.modal('hide');
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

        var search_ser = getFormSearch('frm-search-ser', 'search_ser', 'LoadRecordsButtonSer');

        var table_container_series = $("#table_container_series");

        table_container_series.jtable({
            title: "Lista de Series",
            paging: true,
            actions: {
                listAction: base_url + '/devolucionOrdenCompras/listSeries'
            },
            toolbar: {
                items: [{
                    cssClass: 'buscador',
                    text: search_ser
                }]
            },
            fields: {
                idSerie: {
                    key: true,
                    create: false,
                    edit: false,
                    list: false
                },
                serie: {
                    title: 'N° Serie'
                },
                chasis: {
                    title: 'Chasis'
                },
                motor: {
                    title: 'Motor'
                },
                anio_fabricacion: {
                    title: 'Año de Fabricación'
                },
                anio_modelo: {
                    title: 'Año de Modelo'
                },
                select: {
                    width: '1%',
                    listClass: 'text-center',
                    display: function (data) {
                        var tr_ser_ = d_series_detail.find('tr[data-series=' + data.record.idSerie + ']');
                        var chk_ = (tr_ser_.length > 0) ? 'checked' : '';
                        return '<input class="chk_ser" type="checkbox" data-code="' + data.record.idSerie + '" ' + chk_ + ' />';
                    }
                }
            },
            recordsLoaded: function (event, data) {
                table_container_series.find('input.chk_ser').click(function (e) {
                    var ser_id = $(this).attr('data-code');
                    var info = _.find(data.records, function (item) {
                        return parseInt(item.idSerie) === parseInt(ser_id);
                    });
                    if (info) {
                        var chk_ = table_container_series.find('input.chk_ser[data-code=' + ser_id + ']');
                        var is_chk_ = (chk_.prop('checked'));
                        if (is_chk_) {
                            var max_ = parseFloat(d_series_q.val());
                            var q_det_ = d_series_detail.find('tr').length;
                            var pending_ = (parseInt(max_ - q_det_) > 0) ? parseInt(max_ - q_det_) : 0;
                            if (pending_ > 0) {
                                addSeriesToList(info, 0);
                            } else {
                                $scope.showAlert('', 'Ya se agregó la cantidad maxima de series', 'warning');
                                setTimeout(function () {
                                    chk_.prop('checked', false).iCheck('update');
                                });
                            }
                        } else {
                            d_series_detail.find('tr[data-series=' + ser_id + ']').remove();
                        }
                    }
                    e.preventDefault();
                });
                generateCheckBox('input.chk_ser');
            }
        });

        generateSearchForm('frm-search-ser', 'LoadRecordsButtonSer', function () {
            table_container_series.jtable('load', {
                search: $('#search_ser').val(),
                product_id: d_detail_product_,
                rod_id: d_detail_selected_,
                rod_active: true
            });
        }, false);

        $scope.saveDev= function (type) {
            saveDev(type);
        };

        function saveDev(type_) {
            var b_val = true;
            b_val = b_val && d_reception.required();
            b_val = b_val && d_date.required();
            if (b_val && d_detail.html() === '') {
                $scope.showAlert('', 'Debe seleccionar mínimo 1 artículo', 'warning');
                return false;
            }
            if (b_val) {
                var det_ = [], valid_ = true;
                _.each(d_detail.find('tr'), function (tr) {
                    var max_ = parseFloat($(tr).attr('data-q-max'));
                    var q_ = $(tr).find('input.d_return').val();
                    q_ = (q_ === '') ? 0 : parseFloat(q_);
                    var series_ = [];
                    if (parseInt($(tr).attr('data-is-serie')) === 1) {
                        series_ = getDataSeries($(tr).attr('data-product'));
                        if (type_ === 2 && q_ > 0 && q_ !== series_.length) {
                            $scope.showAlert('', 'La cantidad de series para el artículo ' + $(tr).find('td:first').text() +
                                ' no es igual a la cantidad por devolver', 'warning');
                            valid_ = false;
                            return false;
                        }
                    }
                    det_.push({
                        'code': $(tr).attr('data-code'),
                        'product_id': $(tr).attr('data-product'),
                        'lote_id': $(tr).attr('data-lote'),
                        'localization': $(tr).attr('data-localization'),
                        'q': q_,
                        'series': series_
                    });
                    // if (type_ === 2 && $(tr).attr('data-localization') === '') {
                    //     $scope.showAlert('', 'Debe seleccionar localización para cada artículo', 'warning');
                    //     valid_ = false;
                    //     return false;
                    // }
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
                var d_operation_ = d_operation.val();
                var params = {
                    'state_id': type_,
                    'reception_id': d_reception_id,
                    'date': d_date.val(),
                    'operation_id': d_operation.val(),
                    'observation': d_observations.val(),
                    'detail': det_
                };
                var txt_ = (type_ === 1) ? 'guardar' : 'procesar';
                $scope.showConfirm('', '¿Está seguro que desea ' + txt_ + ' la devolución?', function () {
                    RESTService.updated('devolucionOrdenCompras/save', d_id, params, function (response) {
                        if (!_.isUndefined(response.status) && response.status) {
                            txt_ = (type_ === 1) ? 'guardó' : 'procesó';
                            if (type_ === 1) {
                                $scope.showAlert('', 'La Devolución se ' + txt_ + ' correctamente.', 'success');
                            } else {
                                var mov_id_ = response.mov;
                                $scope.showConfirm('', 'La Devolución se ' + txt_ + ' correctamente. ¿Desea imprimirla?', function () {
                                    var data = {
                                        id: mov_id_,
                                        idtipoOpe: d_operation_,
                                        option: 'ret'
                                    };
                                    var params_ext = {
                                        'title': 'DEVOLUCIÓN DE ORDEN DE COMPRA',
                                        'client_txt': 'PROVEEDOR: ',
                                        'user_txt': 'COMPRADOR: '
                                    };
                                    $scope.loadMovimientoEntregaPDF('devolucionOrdenCompras/pdf', data, params_ext);
                                });
                            }
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
            var code_ = info.rd_id;
            var price_ = parseFloat(info.price);
            var quantity_ = parseFloat(info.reception);
            var pending_ = parseFloat(info.pending);
            var return_ = (_.isUndefined(info.return)) ? 0 : parseFloat(info.return);
            var localization_id_ = (_.isUndefined(info.localization_id)) ? '' : info.localization_id;
            var localization_ = (_.isUndefined(info.localization)) ? '' : info.localization;
            var lote_id_ = (_.isUndefined(info.lote_id)) ? '' : info.lote_id;
            var lote_ = (_.isUndefined(info.lote)) ? '' : info.lote;
            var info_series_ = (_.isUndefined(info.data_series)) ? [] : info.data_series;
            verifySeries(1, info.product_id, info_series_);

            var tr_ = $('<tr data-code="' + code_ + '" data-product="' + info.product_id + '" data-lote="' + lote_id_ + '" ' +
                'data-q-max="' + pending_ + '" data-localization="' + localization_id_ + '" data-is-serie="' +
                info.is_serie + '" data-is-lote="' + info.is_lote + '"></tr>');
            tr_.append('<td>' + info.description + '</td>');
            tr_.append('<td class="text-center">' + localization_ + '</td>');
            tr_.append('<td class="text-center">' + lote_ + '</td>');
            tr_.append('<td class="text-right">' + price_ + '</td>');
            tr_.append('<td class="text-right">' + quantity_ + '</td>');
            tr_.append('<td class="text-right">' + pending_ + '</td>');

            var td_ = $('<td class="text-right"></td>');
            if (d_state_id === 1) {
                td_.append('<input type="text" class="form-control input-xs text-right d_return" ' +
                    'onclick="this.select()"' + ' onkeypress="return validDecimals(event, this, 3)" ' +
                    'onblur="return roundDecimals(this, 2)" value="' + return_ + '">');
            } else {
                td_.append('<span class="d_return">' + numberFormat(return_, 2) + '</span>');
            }
            tr_.append(td_);

            td_ = $('<td class="text-center"></td>');
            if (info.is_serie === 1) {
                td_.append('<button class="btn btn-info btn-xs btn-info-ser" title="Series" ' +
                    'type="button"><span class="fa fa-eye"></span></button>');
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
            d_detail.find('button.btn-info-ser').off().on('click', function (e) {
                var tr_ = $(this).closest('tr');
                var code_ = tr_.attr('data-code');
                var product_id_ = tr_.attr('data-product');
                var text_ = tr_.find('td:first').text();
                d_detail_selected_ = code_;

                var q_ = (d_state_id === 1) ? tr_.find('input.d_return').val() : tr_.find('span.d_return').html();
                q_ = (q_ === '') ? 0 : parseFloat(q_);
                if (q_ === 0) {
                    $scope.showAlert('', 'Debe ingresar cantidad mayor a 0', 'warning');
                    return;
                }
                d_series_q.val(q_);
                d_series_text.val(text_);
                d_detail_product_ = product_id_;
                loadDataSeries();
                modalSeriesProduct.modal('show');
            });
        }

        function verifySeries(option, prod_id, data) {
            var isset = false;
            _.each(d_data_series, function (ser) {
                if (parseInt(ser.product) === parseInt(prod_id)) {
                    isset = true;
                }
            });
            if (isset) {
                d_data_series = _.reject(d_data_series, {product: prod_id});
            }
            if (option === 1) {
                d_data_series.push({
                    'product': prod_id,
                    'detail': data
                })
            }
        }

        function getDataSeries(prod_id) {
            var data_ = [];
            _.each(d_data_series, function (ser) {
                if (parseInt(ser.product) === parseInt(prod_id)) {
                    data_ = ser.detail;
                }
            });
            return data_;
        }

        function loadDataSeries() {
            var data_ = getDataSeries(d_detail_product_);
            _.each(data_, function (d, idx) {
                addSeriesToList(d, idx);
            });
        }

        function addSeriesToList(info, idx) {
            var code_temp_ = codeUniqueTime() + idx;
            var tr_ = $('<tr data-code="' + code_temp_ + '" data-series="' + info.idSerie + '"></tr>');
            tr_.append('<td>' + d_series_text.val() + '</td>');
            tr_.append('<td class="text-center s_serie">' + info.serie + '</td>');
            tr_.append('<td class="text-center s_chasis">' + info.chasis + '</td>');
            tr_.append('<td class="text-center s_motor">' + info.motor + '</td>');
            tr_.append('<td class="text-center s_color">' + info.color + '</td>');
            tr_.append('<td class="text-center s_year_f">' +
                ((_.isNull(info.anio_fabricacion)) ? '' : info.anio_fabricacion) + '</td>');
            tr_.append('<td class="text-center s_year_m">' +
                ((_.isNull(info.anio_modelo)) ? '' : info.anio_modelo) + '</td>');
            tr_.append('<td class="text-center s_type_c">' +
                ((_.isNull(info.tipo_compra_venta)) ? '' : info.tipo_compra_venta) + '</td>');
            tr_.append('<td class="text-center s_nro_pol">' +
                ((_.isNull(info.nPoliza)) ? '' : info.nPoliza) + '</td>');
            tr_.append('<td class="text-center s_nro_lote">' +
                ((_.isNull(info.nLoteCompra)) ? '' : info.nLoteCompra) + '</td>');
            d_series_detail.append(tr_);
        }

        $scope.addSeriesProduct = function () {
            var max_ = parseFloat(d_series_q.val());
            var q_det_ = d_series_detail.find('tr').length;
            var pending_ = (parseInt(max_ - q_det_) > 0) ? parseInt(max_ - q_det_) : 0;
            if (pending_ > 0) {
                $scope.showAlert('', 'Debe ingresar cantidad de series igual a la cantidad a devolver', 'warning');
                return false;
            }
            var data_ = [], valid_ = true;
            _.each(d_series_detail.find('tr'), function (tr) {
                if (!valid_) {
                    return;
                }
                tr = $(tr);
                data_.push({
                    'idSerie': tr.attr('data-series'),
                    'serie': tr.find('td.s_serie').html(),
                    'chasis': tr.find('td.s_chasis').html(),
                    'motor': tr.find('td.s_motor').html(),
                    'color': tr.find('td.s_color').html(),
                    'anio_fabricacion': tr.find('td.s_year_f').html(),
                    'anio_modelo': tr.find('td.s_year_m').html(),
                    'tipo_compra_venta': tr.find('td.s_type_c').html(),
                    'nPoliza': tr.find('td.s_nro_pol').html(),
                    'nLoteCompra': tr.find('td.s_nro_lote').html(),
                });
            });
            if (!valid_) {
                return false;
            }
            _.each(d_data_series, function (ser, idx) {
                if (parseInt(ser.product) === parseInt(d_detail_product_)) {
                    d_data_series[idx]['detail'] = data_;
                }
            });
            modalSeriesProduct.modal('hide');
        }

        $scope.selectSeries = function () {
            modalSeries.modal('show');
        }
    }

    function Config($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('devolucionOrdenCompras', {
                url: '/devolucionOrdenCompras',
                templateUrl: base_url + '/templates/devolucionOrdenCompras/base.html',
                controller: 'DevolucionOrdenCompraCtrl'
            });

        $urlRouterProvider.otherwise('/');
    }
})
();