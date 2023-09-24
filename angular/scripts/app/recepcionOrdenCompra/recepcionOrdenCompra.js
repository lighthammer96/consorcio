(function () {
    'use strict';
    angular.module('sys.app.recepcionOrdenCompras')
        .config(Config)
        .controller('RecepcionOrdenCompraCtrl', RecepcionOrdenCompraCtrl);

    Config.$inject = ['$stateProvider', '$urlRouterProvider'];
    RecepcionOrdenCompraCtrl.$inject = ['$scope', '_', 'RESTService'];

    function RecepcionOrdenCompraCtrl($scope, _, RESTService)
    {
        moment.locale('es');
        var start = moment().startOf('month');
        var end = moment().endOf('month');

        var chk_date_range = $('#chk_date_range');
        chk_date_range.click(function () {
            $('#LoadRecordsButtonR').click();
        });
        generateCheckBox('.chk_date_range_r');

        var reqDates = $('#reqDates');

        var showDate = function (from, to) {
            start = from;
            end = to;
            reqDates.find('span').html(from.format('MMM D, YYYY') + ' - ' + to.format('MMM D, YYYY'));
            if (chk_date_range.prop('checked')) {
                $('#LoadRecordsButtonR').click();
            }
        };
        generateDateRangePicker(reqDates, start, end, showDate);
        showDate(start, end);

        var modalRec = $("#modalRec");
        modalRec.on('hidden.bs.modal', function (e) {
            cleanRec();
        });
        var titleRec = $("#titleRec");
        var modalOC = $('#modalOC');
        modalOC.on('show.bs.modal', function (e) {
            $('#LoadRecordsButtonOC').click();
            modalRec.attr('style', 'display:block; z-index:2030 !important');
        });
        modalOC.on('hidden.bs.modal', function (e) {
            $('#search_oc').val('');
            $('#LoadRecordsButtonOC').click();
            modalRec.attr('style', 'display:block; overflow-y: auto;');
        });
        var modalLocalization = $('#modalLocalization');
        modalLocalization.on('show.bs.modal', function (e) {
            $('#LoadRecordsButtonLoc').click();
            modalRec.attr('style', 'display:block; z-index:2030 !important');
        });
        modalLocalization.on('hidden.bs.modal', function (e) {
            $('#search_loc').val('');
            $('#LoadRecordsButtonLoc').click();
            modalRec.attr('style', 'display:block; overflow-y: auto;');
        });
        var modalLote = $('#modalLote');
        modalLote.on('show.bs.modal', function (e) {
            $('#LoadRecordsButtonLote').click();
            modalRec.attr('style', 'display:block; z-index:2030 !important');
        });
        modalLote.on('hidden.bs.modal', function (e) {
            $('#search_lote').val('');
            $('#LoadRecordsButtonLote').click();
            modalRec.attr('style', 'display:block; overflow-y: auto;');
        });
        var modalSeriesProduct = $('#modalSeriesProduct');
        modalSeriesProduct.on('show.bs.modal', function (e) {
            modalRec.attr('style', 'display:block; z-index:2030 !important');
        });
        modalSeriesProduct.on('hidden.bs.modal', function (e) {
            cleanSeries();
            modalRec.attr('style', 'display:block; overflow-y: auto;');
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

        var r_id = 0;
        var r_mov = '';
        var r_state_id = 1;
        var r_code = $("input#r_code");
        var r_oc_id = '';
        var r_oc = $("input#r_oc");
        var r_oc_btn = $("button#r_oc_btn");
        var r_date = $("input#r_date");
        generateDatePicker(r_date);
        var r_warehouse = $("select#r_warehouse");
        var r_operation = $("select#r_operation");
        var r_currency = $("select#r_currency");
        var r_observations = $("textarea#r_observations");
        var r_detail = $("tbody#r_detail");
        var r_detail_selected_ = '';
        var r_detail_product_ = '';
        var r_data_series = [];
        var r_series_text = $("input#r_series_text");
        var r_series_q = $("input#r_series_q");
        var r_series_detail = $("tbody#r_series_detail");

        var r_type_c = [];

        function cleanRec() {
            cleanRequired();
            titleRec.empty();
            r_id = 0;
            r_state_id = 1;
            r_code.val('');
            r_oc_id = '';
            r_oc.val('');
            r_oc_btn.prop('disabled', false);
            r_date.val('').prop('disabled', false);
            r_warehouse.val('').prop('disabled', false);
            r_currency.val('');
            r_observations.val('');
            r_detail.empty();
            r_detail_selected_ = '';
            r_detail_product_ = '';
            r_data_series = [];

            $('button.btn-save, button.btn-frm').removeClass('hide');
            $('button.btn-print').addClass('hide');
        }

        function cleanSeries() {
            r_detail_selected_ = '';
            r_detail_product_ = '';
            r_series_text.val('');
            r_series_q.val('');
            r_series_detail.empty();
        }

        function getDataRPO() {
            RESTService.all('recepcionOrdenCompras/data_form', '', function (response) {
                if (!_.isUndefined(response.status) && response.status) {
                    r_warehouse.append('<option value="">--Seleccione--</option>');
                    _.each(response.warehouses, function (item) {
                        r_warehouse.append('<option  value="' + item.idAlmacen + '">' + item.descripcion + '</option>');
                    });
                    r_operation.empty();
                    _.each(response.operations, function (item) {
                        if (parseInt(item.IdTipoOperacion) === 1) {
                            r_operation.append('<option value="' + item.IdTipoOperacion + '">' + item.descripcion + '</option>');
                        }
                    });
                    r_currency.empty();
                    _.each(response.currency, function (item) {
                        r_currency.append('<option value="' + item.Value + '">' + item.DisplayText + '</option>');
                    });

                    r_type_c = response.type_comp;
                }
            }, function () {
                getDataRPO();
            });
        }
        getDataRPO();

        $scope.openOC = function () {
            modalOC.modal('show');
        };

        $scope.printRec = function () {
            if (r_id !== 0) {
                if (r_state_id < 2) {
                    $scope.showAlert('', 'Solo se puede imprimir cuando la recepción este procesada', 'warning');
                    return false;
                }
                var data = {
                    id: r_mov,
                    idtipoOpe: r_operation.val(),
                    option: 'rpo'
                };
                var params_ext = {
                    'title': 'RECEPCIÓN DE ORDEN DE COMPRA',
                    'client_txt': 'PROVEEDOR: ',
                    'user_txt': 'COMPRADOR: '
                };
                $scope.loadMovimientoEntregaPDF('recepcionOrdenCompras/pdf', data, params_ext);
            }
        };

        function newRec() {
            titleRec.html('Nueva Recepción');
            modalRec.modal('show');
        }

        function findRec(id) {
            RESTService.get('recepcionOrdenCompras/find', id, function (response) {
                if (!_.isUndefined(response.status) && response.status) {
                    r_id = id;
                    var data_ = response.data;
                    r_mov = data_.mov_id;
                    r_state_id = parseInt(data_.state_id);
                    var disabled_ = (r_state_id > 1);
                    r_code.val(data_.code);
                    r_oc_id = data_.purchase_order_id;
                    r_oc.val(data_.oc_);
                    r_oc_btn.prop('disabled', disabled_);
                    r_date.val(data_.date).prop('disabled', disabled_);
                    r_warehouse.val(data_.warehouse_id).trigger('change');
                    r_operation.val(data_.operation_id).trigger('change');
                    r_currency.val(data_.currency_id).trigger('change');
                    r_observations.val(data_.observation).prop('disabled', disabled_);
                    _.each(data_.detail_, function (det) {
                        addDetailOC(det);
                    });
                    $('button.btn-print').removeClass('hide');
                    if (disabled_) {
                        $('button.btn-save, button.btn-frm').addClass('hide');
                    }
                    var txt_ = (r_state_id > 1) ? 'Ver' : 'Editar';
                    titleRec.html(txt_ + ' Recepción');
                    modalRec.modal("show");
                } else {
                    $scope.showAlert('', response.message, 'warning');
                }
            });
        }

        var search = getFormSearch('frm-search-rpo', 'search_rpo', 'LoadRecordsButtonR');

        var table_container_rpo = $("#table_container_rpo");

        table_container_rpo.jtable({
            title: "Lista de recepción de ordenes de compra",
            paging: true,
            actions: {
                listAction: base_url + '/recepcionOrdenCompras/list',
                deleteAction: base_url + '/recepcionOrdenCompras/delete'
            },
            toolbar: {
                items: [{
                    cssClass: 'buscador',
                    text: search
                }, {
                    cssClass: 'btn-primary',
                    text: '<i class="fa fa-file-excel-o"></i> Exportar',
                    click: function () {
                        $scope.openDoc('recepcionOrdenCompras/excel', {
                            search: $('#search_rpo').val(),
                            check: (chk_date_range.prop('checked')),
                            from: start.format('YYYY-MM-DD'),
                            to: end.format('YYYY-MM-DD')
                        });
                    }
                }, {
                    cssClass: 'btn-danger-admin',
                    text: '<i class="fa fa-plus"></i> Recepción',
                    click: function () {
                        newRec();
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
                        return '<a href="javascript:void(0)" class="edit-rec" data-code="' + data.record.id
                            + '" title="Editar"><i class="fa fa-edit fa-1-5x"></i></a>';
                    }
                }
            },
            recordsLoaded: function (event, data) {
                table_container_rpo.find('a.edit-rec').click(function (e) {
                    var code_ = $(this).attr('data-code');
                    findRec(code_);
                    e.preventDefault();
                });
            }
        });

        generateSearchForm('frm-search-rpo', 'LoadRecordsButtonR', function () {
            table_container_rpo.jtable('load', {
                search: $('#search_rpo').val(),
                check: (chk_date_range.prop('checked')),
                from: start.format('YYYY-MM-DD'),
                to: end.format('YYYY-MM-DD')
            });
        }, true);

        var search_oc = getFormSearch('frm-search-oc', 'search_oc', 'LoadRecordsButtonOC');

        var table_container_oc = $("#table_container_oc");

        table_container_oc.jtable({
            title: "Lista de Ordenes de Compra",
            paging: true,
            actions: {
                listAction: base_url + '/recepcionOrdenCompras/listOC'
            },
            toolbar: {
                items: [{
                    cssClass: 'buscador',
                    text: search_oc
                }]
            },
            fields: {
                id: {
                    key: true,
                    create: false,
                    edit: false,
                    list: false
                },
                cCodConsecutivo: {
                    title: 'Código',
                    listClass: 'text-center'
                },
                nConsecutivo: {
                    title: 'Consecutivo',
                    listClass: 'text-center'
                },
                dFecRegistro: {
                    title: 'Fecha Registro',
                    listClass: 'text-center'
                },
                dFecRequerida: {
                    title: 'Fecha Requerida',
                    listClass: 'text-center'
                },
                provider_: {
                    title: 'Proveedor'
                },
                currency_: {
                    title: 'Moneda',
                    listClass: 'text-center'
                },
                total: {
                    title: 'Monto',
                    listClass: 'text-right'
                },
                payment_condition_: {
                    title: 'Condición Pago'
                },
                state: {
                    title: 'Estado'
                },
                comentario: {
                    title: 'Comentarios'
                },
                edit: {
                    width: '1%',
                    sorting: false,
                    edit: false,
                    create: false,
                    listClass: 'text-center',
                    display: function (data) {
                        return '<a href="javascript:void(0)" class="sel-oc" data-id="' + data.record.id
                            + '" title="Editar"><i class="fa fa-check-circle fa-1-5x"></i></a>';
                    }
                }
            },
            recordsLoaded: function (event, data) {
                table_container_oc.find('a.sel-oc').click(function (e) {
                    var id = $(this).attr('data-id');
                    var info = _.find(data.records, function (item) {
                        return parseInt(item.id) === parseInt(id);
                    });
                    if (info) {
                        if (parseInt(r_oc_id) !== parseInt(info.id)) {
                            r_detail.empty();
                        }
                        r_oc_id = info.id;
                        r_oc.val(info.cCodConsecutivo + ' ' + info.nConsecutivo);
                        r_currency.val(info.idMoneda).trigger('change');
                        _.each(info.detail, function (det) {
                            addDetailOC(det);
                        });
                    }
                    modalOC.modal('hide');
                    e.preventDefault();
                });
            }
        });

        generateSearchForm('frm-search-oc', 'LoadRecordsButtonOC', function () {
            table_container_oc.jtable('load', {
                search: $('#search_oc').val(),
                state: 'reception',
                type: 1,
                showDetail: true
            });
        }, false);

        var search_loc = getFormSearch('frm-search-loc', 'search_loc', 'LoadRecordsButtonLoc');

        var table_container_loc = $("#table_container_loc");

        table_container_loc.jtable({
            title: "Lista de Localizaciones",
            paging: true,
            actions: {
                listAction: base_url + '/recepcionOrdenCompras/listLoc'
            },
            toolbar: {
                items: [{
                    cssClass: 'buscador',
                    text: search_loc
                }]
            },
            fields: {
                id: {
                    key: true,
                    create: false,
                    edit: false,
                    list: false
                },
                descripcion: {
                    title: 'Descripción'
                },
                edit: {
                    width: '1%',
                    sorting: false,
                    edit: false,
                    create: false,
                    listClass: 'text-center',
                    display: function (data) {
                        return '<a href="javascript:void(0)" class="sel-loc" data-id="' + data.record.id
                            + '" title="Editar"><i class="fa fa-check-circle fa-1-5x"></i></a>';
                    }
                }
            },
            recordsLoaded: function (event, data) {
                table_container_loc.find('a.sel-loc').click(function (e) {
                    var id = $(this).attr('data-id');
                    var info = _.find(data.records, function (item) {
                        return parseInt(item.id) === parseInt(id);
                    });
                    if (info) {
                        var tr_ = r_detail.find('tr[data-code=' + r_detail_selected_ + ']');
                        if (tr_.length > 0) {
                            tr_.attr('data-localization', id);
                            tr_.find('input.r_localization').val(info.descripcion);
                        }
                    }
                    modalLocalization.modal('hide');
                    e.preventDefault();
                });
            }
        });

        generateSearchForm('frm-search-loc', 'LoadRecordsButtonLoc', function () {
            table_container_loc.jtable('load', {
                search: $('#search_loc').val(),
                state: 'A',
                wh: r_warehouse.val()
            });
        }, false);

        var search_lote = getFormSearch('frm-search-lote', 'search_lote', 'LoadRecordsButtonLote');

        var table_container_lote = $("#table_container_lote");

        table_container_lote.jtable({
            title: "Lista de Lotes",
            paging: true,
            actions: {
                listAction: base_url + '/recepcionOrdenCompras/listLote'
            },
            toolbar: {
                items: [{
                    cssClass: 'buscador',
                    text: search_lote
                }]
            },
            fields: {
                idLote: {
                    key: true,
                    create: false,
                    edit: false,
                    list: false
                },
                Lote: {
                    title: 'Lote',
                },
                cantidad: {
                    title: 'Cantidad',
                },
                fechaIngreso: {
                    title: 'Fecha de Ingreso',
                    type: 'date',
                    displayFormat: 'dd/mm/yy'
                },
                FechaVencimiento: {
                    title: 'Fecha de Vencimiento',
                    type: 'date',
                    displayFormat: 'dd/mm/yy'
                },
                edit: {
                    width: '1%',
                    sorting: false,
                    edit: false,
                    create: false,
                    listClass: 'text-center',
                    display: function (data) {
                        return '<a href="javascript:void(0)" class="sel-lote" data-id="' + data.record.idLote
                            + '" title="Editar"><i class="fa fa-check-circle fa-1-5x"></i></a>';
                    }
                }
            },
            recordsLoaded: function (event, data) {
                table_container_lote.find('a.sel-lote').click(function (e) {
                    var id = $(this).attr('data-id');
                    var info = _.find(data.records, function (item) {
                        return parseInt(item.idLote) === parseInt(id);
                    });
                    if (info) {
                        var tr_ = r_detail.find('tr[data-code=' + r_detail_selected_ + ']');
                        if (tr_.length > 0) {
                            tr_.attr('data-lote', id);
                            tr_.find('input.r_lote').val(info.Lote);
                        }
                    }
                    modalLote.modal('hide');
                    e.preventDefault();
                });
            }
        });

        generateSearchForm('frm-search-lote', 'LoadRecordsButtonLote', function () {
            table_container_lote.jtable('load', {
                search: $('#search_lote').val(),
                product: r_detail_product_
            });
        }, false);

        var search_ser = getFormSearch('frm-search-ser', 'search_ser', 'LoadRecordsButtonSer');

        var table_container_series = $("#table_container_series");

        table_container_series.jtable({
            title: "Lista de Series",
            paging: true,
            actions: {
                listAction: base_url + '/recepcionOrdenCompras/listSeries'
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
                        var tr_ser_ = r_series_detail.find('tr[data-series=' + data.record.idSerie + ']');
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
                            var max_ = parseFloat(r_series_q.val());
                            var q_det_ = r_series_detail.find('tr').length;
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
                            r_series_detail.find('tr[data-series=' + ser_id + ']').remove();
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
                idProducto: r_detail_product_
            });
        }, false);

        $scope.saveRec = function (type) {
            saveRec(type);
        };

        function saveRec(type_) {
            var b_val = true;
            b_val = b_val && r_oc.required();
            b_val = b_val && r_date.required();
            b_val = b_val && r_warehouse.required();
            if (b_val && r_detail.html() === '') {
                $scope.showAlert('', 'Debe agregar mínimo 1 Artículo', 'warning');
                return false;
            }
            if (b_val) {
                var det_ = [], valid_ = true;
                _.each(r_detail.find('tr'), function (tr) {
                    var max_ = parseFloat($(tr).attr('data-q-max'));
                    var q_ = $(tr).find('input.r_reception').val();
                    q_ = (q_ === '') ? 0 : parseFloat(q_);
                    var series_ = [];
                    if (parseInt($(tr).attr('data-is-serie')) === 1) {
                        series_ = getDataSeries($(tr).attr('data-product'));
                        if (type_ === 2 && q_ > 0 && q_ !== series_.length) {
                            $scope.showAlert('', 'La cantidad de series para el artículo ' + $(tr).find('td:first').text() +
                                ' no es igual a la cantidad por recepcionar', 'warning');
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
                    if (type_ === 2 && $(tr).attr('data-localization') === '') {
                        $scope.showAlert('', 'Debe seleccionar localización para cada artículo', 'warning');
                        valid_ = false;
                        return false;
                    }
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
                var r_operation_ = r_operation.val();
                var params = {
                    'state_id': type_,
                    'purchase_order_id': r_oc_id,
                    'date': r_date.val(),
                    'warehouse_id': r_warehouse.val(),
                    'operation_id': r_operation_,
                    'observation': r_observations.val(),
                    'detail': det_
                };
                var txt_ = (type_ === 1) ? 'guardar' : 'procesar';
                $scope.showConfirm('', '¿Está seguro que desea ' + txt_ + ' la recepción?', function () {
                    RESTService.updated('recepcionOrdenCompras/save', r_id, params, function (response) {
                        if (!_.isUndefined(response.status) && response.status) {
                            txt_ = (type_ === 1) ? 'guardó' : 'procesó';
                            if (type_ === 1) {
                                $scope.showAlert('', 'La Recepción se ' + txt_ + ' correctamente.', 'success');
                            } else {
                                var mov_id_ = response.mov;
                                $scope.showConfirm('', 'La Recepción se ' + txt_ + ' correctamente. ¿Desea imprimirla?', function () {
                                    var data = {
                                        id: mov_id_,
                                        idtipoOpe: r_operation_,
                                        option: 'rpo'
                                    };
                                    var params_ext = {
                                        'title': 'RECEPCIÓN DE ORDEN DE COMPRA',
                                        'client_txt': 'PROVEEDOR: ',
                                        'user_txt': 'COMPRADOR: '
                                    };
                                    $scope.loadMovimientoEntregaPDF('recepcionOrdenCompras/pdf', data, params_ext);
                                });
                            }
                            modalRec.modal('hide');
                            $("#LoadRecordsButtonR").click();
                        } else {
                            $scope.showAlert('', response.message, 'warning');
                        }
                    });
                });
            }
        }

        function addDetailOC(info) {
            var code_ = info.ocd_id;
            var price_ = parseFloat(info.price);
            var quantity_ = parseFloat(info.quantity);
            var pending_ = parseFloat(info.pending);
            var reception_ = (_.isUndefined(info.reception)) ? 0 : parseFloat(info.reception);
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

            var td_ = $('<td class="text-center"></td>');
            if (r_state_id === 1) {
                var ig_ = $('<div class="input-group"></div>');
                ig_.append('<input type="text" class="form-control input-sm r_localization" readonly value="' +
                    localization_ + '">');
                var igb = $('<div class="input-group-btn"></div>');
                igb.append('<button class="btn btn-success btn-sm btn-group_sm btn-localization" type="button">' +
                    '<span class="fa fa-search-plus"></span></button>');
                ig_.append(igb);
                td_.append(ig_);
            } else {
                td_.append('<span>' + localization_ + '</span>');
            }
            tr_.append(td_);

            td_ = $('<td class="text-center"></td>');
            if (info.is_lote === 1) {
                if (r_state_id === 1) {
                    ig_ = $('<div class="input-group"></div>');
                    ig_.append('<input type="text" class="form-control input-sm r_lote" readonly value="' +
                        lote_ + '">');
                    igb = $('<div class="input-group-btn"></div>');
                    igb.append('<button class="btn btn-success btn-sm btn-group_sm btn-lote" type="button">' +
                        '<span class="fa fa-search-plus"></span></button>');
                    ig_.append(igb);
                    td_.append(ig_);
                } else {
                    td_.append('<span>' + lote_ + '</span>');
                }
            }
            tr_.append(td_);

            tr_.append('<td class="text-right">' + price_ + '</td>');
            tr_.append('<td class="text-right">' + quantity_ + '</td>');
            tr_.append('<td class="text-right">' + pending_ + '</td>');

            td_ = $('<td class="text-right"></td>');
            if (r_state_id === 1) {
                td_.append('<input type="text" class="form-control input-xs text-right r_reception" ' +
                    'onclick="this.select()"' + ' onkeypress="return validDecimals(event, this, 3)" ' +
                    'onblur="return roundDecimals(this, 2)" value="' + reception_ + '">');
            } else {
                td_.append('<span class="r_reception">' + numberFormat(reception_, 2) + '</span>');
            }
            tr_.append(td_);

            td_ = $('<td class="text-center"></td>');
            if (info.is_serie === 1) {
                td_.append('<button class="btn btn-info btn-xs btn-info-ser" title="Series" ' +
                    'type="button"><span class="fa fa-eye"></span></button>');
            }
            tr_.append(td_);

            td_ = $('<td class="text-center"></td>');
            if (r_state_id === 1) {
                td_.append('<button class="btn btn-danger btn-xs del_" title="Eliminar" type="button">' +
                    '<span class="fa fa-trash"></span></button>');
            }
            tr_.append(td_);
            r_detail.append(tr_);

            if (r_state_id === 1) {
                r_detail.find('button.btn-localization').off().on('click', function (e) {
                    r_detail_selected_ = $(this).closest('tr').attr('data-code');
                    if (r_warehouse.val() === '') {
                        $scope.showAlert('', 'Seleccione Almacen', 'warning');
                        return;
                    }
                    modalLocalization.modal('show');
                    e.preventDefault();
                });
                r_detail.find('button.btn-lote').off().on('click', function (e) {
                    var tr_ = $(this).closest('tr');
                    r_detail_selected_ = tr_.attr('data-code');
                    r_detail_product_ = tr_.attr('data-product');
                    modalLote.modal('show');
                    e.preventDefault();
                });
                r_detail.find('input.r_reception').off().on('blur', function (e) {
                    var that = $(this);
                    var tr_ = that.closest('tr');
                    var q_max_ = parseFloat(tr_.attr('data-q-max'));
                    if (that.val() === '' || that.val() > q_max_) {
                        $scope.showAlert('', 'Debe ingresar una cantidad menor o igual a la cantidad pendiente', 'warning');
                        that.val(q_max_);
                        that.select();
                    }
                });
                r_detail.find('button.del_').off().on('click', function (e) {
                    var tr_ = $(this).closest('tr');
                    $scope.showConfirm('', '¿Está seguro que desea quitar este artículo?', function () {
                        tr_.remove();
                    });
                    e.preventDefault();
                });
            }
            r_detail.find('button.btn-info-ser').off().on('click', function (e) {
                var tr_ = $(this).closest('tr');
                var code_ = tr_.attr('data-code');
                var product_id_ = tr_.attr('data-product');
                var text_ = tr_.find('td:first').text();
                r_detail_selected_ = code_;

                var q_ = (r_state_id === 1) ? tr_.find('input.r_reception').val() : tr_.find('span.r_reception').html();
                q_ = (q_ === '') ? 0 : parseFloat(q_);
                if (q_ === 0) {
                    $scope.showAlert('', 'Debe ingresar cantidad mayor a 0', 'warning');
                    return;
                }
                r_series_q.val(q_);
                r_series_text.val(text_);
                r_detail_product_ = product_id_;
                loadDataSeries();
                modalSeriesProduct.modal('show');
            });
        }

        function verifySeries(option, prod_id, data) {
            var isset = false;
            _.each(r_data_series, function (ser) {
                if (parseInt(ser.product) === parseInt(prod_id)) {
                    isset = true;
                }
            });
            if (isset) {
                r_data_series = _.reject(r_data_series, {product: prod_id});
            }
            if (option === 1) {
                r_data_series.push({
                    'product': prod_id,
                    'detail': data
                })
            }
        }

        function getDataSeries(prod_id) {
            var data_ = [];
            _.each(r_data_series, function (ser) {
                if (parseInt(ser.product) === parseInt(prod_id)) {
                    data_ = ser.detail;
                }
            });
            return data_;
        }

        function loadDataSeries() {
            var data_ = getDataSeries(r_detail_product_);
            _.each(data_, function (d, idx) {
                if (d.idSerie === '') {
                    addSeriesPending(d, idx);
                } else {
                    addSeriesToList(d, idx);
                }
            });
        }

        $scope.addSeries = function () {
            r_series_detail.empty();
            var max_ = parseFloat(r_series_q.val());
            var q_det_ = r_series_detail.find('tr').length;
            var pending_ = (parseInt(max_ - q_det_) > 0) ? parseInt(max_ - q_det_) : 0;
            if (pending_ > 0) {
                var numbers_ = _.range(1, pending_ + 1);
                _.each(numbers_, function (num) {
                    addSeriesPending({}, num);
                });
            }
        };

        function addSeriesPending(info, idx) {
            var code_temp_ = codeUniqueTime() + idx;
            var tr_ = $('<tr data-code="' + code_temp_ + '" data-series=""></tr>');
            tr_.append('<td>' + r_series_text.val() + '</td>');
            var serie_ = (_.isUndefined(info.serie)) ? '' : info.serie;
            tr_.append('<td class="text-center">' +
                '<input type="text" class="s_serie form-control input-sm" value="' + serie_ + '" /></td>');
            var chasis_ = (_.isUndefined(info.chasis)) ? '' : info.chasis;
            tr_.append('<td class="text-center">' +
                '<input type="text" class="s_chasis form-control input-sm" value="' + chasis_ + '" /></td>');
            var motor_ = (_.isUndefined(info.motor)) ? '' : info.motor;
            tr_.append('<td class="text-center">' +
                '<input type="text" class="s_motor form-control input-sm" value="' + motor_ + '" /></td>');
            var color_ = (_.isUndefined(info.color)) ? '' : info.color;
            tr_.append('<td class="text-center">' +
                '<input type="text" class="s_color form-control input-sm" value="' + color_ + '" /></td>');
            var anio_fabricacion_ = (_.isUndefined(info.anio_fabricacion)) ? '' : info.anio_fabricacion;
            tr_.append('<td class="text-center">' +
                '<input type="text" class="s_year_f form-control input-sm" value="' + anio_fabricacion_ + '" ' +
                'onkeypress="return soloNumeros(event)" maxlength="4" /></td>');
            var anio_modelo_ = (_.isUndefined(info.anio_modelo)) ? '' : info.anio_modelo;
            tr_.append('<td class="text-center">' +
                '<input type="text" class="s_year_m form-control input-sm" value="' + anio_modelo_ + '" ' +
                'onkeypress="return soloNumeros(event)" maxlength="4" /></td>');

            var td_ = $('<td class="text-center"></td>');
            var sel_ = $('<select class="form-control input-sm s_type_c"></select>');
            sel_.append('<option value="">Seleccionar</option>');
            var tipo_compra_venta_id_ = (_.isUndefined(info.tipo_compra_venta_id)) ? '' : info.tipo_compra_venta_id;
            _.each(r_type_c, function (item) {
                var selected_ = (tipo_compra_venta_id_ === item.idTipoCompraVenta) ? 'selected' : '';
                sel_.append('<option value="' + item.idTipoCompraVenta + '" ' + selected_ + '>' +
                    item.descripcion + '</option>');
            });
            td_.append(sel_);
            tr_.append(td_);

            var nPoliza_ = (_.isUndefined(info.nPoliza)) ? '' : info.nPoliza;
            tr_.append('<td class="text-center">' +
                '<input type="text" class="s_nro_pol form-control input-sm" value="' + nPoliza_ + '" /></td>');
            var nLoteCompra_ = (_.isUndefined(info.nLoteCompra)) ? '' : info.nLoteCompra;
            tr_.append('<td class="text-center">' +
                '<input type="text" class="s_nro_lote form-control input-sm" value="' + nLoteCompra_ + '" /></td>');

            r_series_detail.append(tr_);
        }

        function addSeriesToList(info, idx) {
            var code_temp_ = codeUniqueTime() + idx;
            var tr_ = $('<tr data-code="' + code_temp_ + '" data-series="' + info.idSerie + '"></tr>');
            tr_.append('<td>' + r_series_text.val() + '</td>');
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
            r_series_detail.append(tr_);
        }

        $scope.addSeriesProduct = function () {
            var max_ = parseFloat(r_series_q.val());
            var q_det_ = r_series_detail.find('tr').length;
            var pending_ = (parseInt(max_ - q_det_) > 0) ? parseInt(max_ - q_det_) : 0;
            if (pending_ > 0) {
                $scope.showAlert('', 'Debe ingresar cantidad de series igual a la cantidad a recepcionar', 'warning');
                return false;
            }
            var data_ = [], valid_ = true, codes_ = [];
            _.each(r_series_detail.find('tr'), function (tr) {
                if (!valid_) {
                    return;
                }
                tr = $(tr);
                var id_series = tr.attr('data-series');
                var code_ = tr.attr('data-code');
                if (id_series === '') {
                    var series_val_ = tr.find('input.s_serie');
                    if (series_val_.val() === '') {
                        series_val_.focus();
                        valid_ = false;
                        return;
                    }
                    var is_exists_ = false;
                    _.each(r_series_detail.find('tr'), function (tr2) {
                        var series_1 = series_val_.val();
                        var series_2 = $(tr2).find('input.s_serie').val();
                        if (series_2.trim() === series_1.trim() && $(tr2).attr('data-code') !== code_) {
                            is_exists_ = true;
                        }
                    });
                    if (is_exists_) {
                        $scope.showAlert('', 'No puede agregar series con el mismo número', 'warning');
                        valid_ = false;
                        return;
                    }
                    if (tr.find('input.s_chasis').val() === '') {
                        tr.find('input.s_chasis').focus();
                        valid_ = false;
                        return;
                    }
                    if (tr.find('input.s_motor').val() === '') {
                        tr.find('input.s_motor').focus();
                        valid_ = false;
                        return;
                    }
                    if (tr.find('input.s_color').val() === '') {
                        tr.find('input.s_color').focus();
                        valid_ = false;
                        return;
                    }
                    if (tr.find('input.s_year_f').val() === '') {
                        tr.find('input.s_year_f').focus();
                        valid_ = false;
                        return;
                    }
                    if (tr.find('input.s_year_m').val() === '') {
                        tr.find('input.s_year_m').focus();
                        valid_ = false;
                        return;
                    }
                    if (tr.find('select.s_type_c').val() === '') {
                        tr.find('select.s_type_c').focus();
                        valid_ = false;
                        return;
                    }
                    data_.push({
                        'idSerie': '',
                        'serie': series_val_.val(),
                        'chasis': tr.find('input.s_chasis').val(),
                        'motor': tr.find('input.s_motor').val(),
                        'color': tr.find('input.s_color').val(),
                        'anio_fabricacion': tr.find('input.s_year_f').val(),
                        'anio_modelo': tr.find('input.s_year_m').val(),
                        'tipo_compra_venta_id': tr.find('select.s_type_c').val(),
                        'nPoliza': tr.find('input.s_nro_pol').val(),
                        'nLoteCompra': tr.find('input.s_nro_lote').val(),
                    });
                    codes_.push(series_val_.val());
                } else {
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
                }
            });
            if (!valid_) {
                return false;
            }
            if (codes_.length > 0) {
                RESTService.get('recepcionOrdenCompras/valida_series_serve', codes_.join(','), function (response) {
                    if (!_.isUndefined(response.status) && response.status) {
                        _.each(r_data_series, function (ser, idx) {
                            if (parseInt(ser.product) === parseInt(r_detail_product_)) {
                                r_data_series[idx]['detail'] = data_;
                            }
                        });
                        modalSeriesProduct.modal('hide');
                    } else {
                        $scope.showAlert('', response.message, 'warning');
                    }
                });
            } else {
                _.each(r_data_series, function (ser, idx) {
                    if (parseInt(ser.product) === parseInt(r_detail_product_)) {
                        r_data_series[idx]['detail'] = data_;
                    }
                });
                modalSeriesProduct.modal('hide');
            }
        }

        $scope.selectSeries = function () {
            r_series_detail.empty();
            var code_ = r_detail_product_ + '*' + r_series_q.val();
            RESTService.get('recepcionOrdenCompras/validateCantSerie', code_, function (response) {
                if (!_.isUndefined(response.status) && response.status) {
                    if (response.data === 'N') {
                        $scope.showAlert('', 'No hay series de este artículo', 'warning');
                    } else if (response.data === 'S') {
                        $scope.showAlert('', 'Existen solo ' + response.cantidad +
                            ' series de este artículo. Ingrese nueva cantidad.', 'warning');
                    } else {
                        modalSeries.modal('show');
                    }
                } else {
                    $scope.showAlert('', response.message, 'warning');
                }
            });
        }
    }

    function Config($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('recepcionOrdenCompras', {
                url: '/recepcionOrdenCompras',
                templateUrl: base_url + '/templates/recepcionOrdenCompras/base.html',
                controller: 'RecepcionOrdenCompraCtrl'
            });

        $urlRouterProvider.otherwise('/');
    }
})
();