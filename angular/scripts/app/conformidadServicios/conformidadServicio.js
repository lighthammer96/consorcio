(function () {
    'use strict';
    angular.module('sys.app.conformidadServicios')
        .config(Config)
        .controller('ConformidadServicioCtrl', ConformidadServicioCtrl);

    Config.$inject = ['$stateProvider', '$urlRouterProvider'];
    ConformidadServicioCtrl.$inject = ['$scope', '_', 'RESTService'];

    function ConformidadServicioCtrl($scope, _, RESTService)
    {
        moment.locale('es');
        var start = moment().startOf('month');
        var end = moment().endOf('month');

        var chk_date_range = $('#chk_date_range');
        chk_date_range.click(function () {
            $('#LoadRecordsButtonC').click();
        });
        generateCheckBox('.chk_date_range_cs');

        var reqDates = $('#reqDates');

        var showDate = function (from, to) {
            start = from;
            end = to;
            reqDates.find('span').html(from.format('MMM D, YYYY') + ' - ' + to.format('MMM D, YYYY'));
            if (chk_date_range.prop('checked')) {
                $('#LoadRecordsButtonC').click();
            }
        };
        generateDateRangePicker(reqDates, start, end, showDate);
        showDate(start, end);

        var modalC = $("#modalC");
        modalC.on('hidden.bs.modal', function (e) {
            cleanC();
        });
        var titleC = $("#titleC");
        var modalOC = $('#modalOC');
        modalOC.on('show.bs.modal', function (e) {
            $('#LoadRecordsButtonOC').click();
            modalC.attr('style', 'display:block; z-index:2030 !important');
        });
        modalOC.on('hidden.bs.modal', function (e) {
            $('#search_oc').val('');
            $('#LoadRecordsButtonOC').click();
            modalC.attr('style', 'display:block; overflow-y: auto;');
        });

        var c_id = 0;
        var c_mov = '';
        var c_state_id = 1;
        var c_code = $("input#c_code");
        var c_oc_id = '';
        var c_oc = $("input#c_oc");
        var c_oc_btn = $("button#c_oc_btn");
        var c_date = $("input#c_date");
        generateDatePicker(c_date);
        var c_operation = $("select#c_operation");
        var c_currency = $("select#c_currency");
        var c_observations = $("textarea#c_observations");
        var c_detail = $("tbody#c_detail");

        function cleanC() {
            cleanRequired();
            titleC.empty();
            c_id = 0;
            c_state_id = 1;
            c_code.val('');
            c_oc_id = '';
            c_oc.val('');
            c_oc_btn.prop('disabled', false);
            c_date.val('').prop('disabled', false);
            c_currency.val('');
            c_observations.val('');
            c_detail.empty();

            $('button.btn-save, button.btn-frm').removeClass('hide');
            $('button.btn-print').addClass('hide');
        }

        function getDataC() {
            RESTService.all('conformidadServicios/data_form', '', function (response) {
                if (!_.isUndefined(response.status) && response.status) {
                    c_operation.empty();
                    _.each(response.operations, function (item) {
                        if (parseInt(item.IdTipoOperacion) === 1) {
                            c_operation.append('<option value="' + item.IdTipoOperacion + '">' + item.descripcion + '</option>');
                        }
                    });
                    c_currency.empty();
                    _.each(response.currency, function (item) {
                        c_currency.append('<option value="' + item.Value + '">' + item.DisplayText + '</option>');
                    });
                }
            }, function () {
                getDataC();
            });
        }
        getDataC();

        $scope.openOC = function () {
            modalOC.modal('show');
        };

        $scope.printC = function () {
            if (c_id !== 0) {
                if (c_state_id < 2) {
                    $scope.showAlert('', 'Solo se puede imprimir cuando la conformidad este procesada', 'warning');
                    return false;
                }
                var data = {
                    id: c_mov,
                    idtipoOpe: c_operation.val(),
                    option: 'cs'
                };
                var params_ext = {
                    'title': 'CONFORMIDAD DE ORDEN DE SERVICIO',
                    'client_txt': 'PROVEEDOR: ',
                    'user_txt': 'COMPRADOR: '
                };
                $scope.loadMovimientoEntregaPDF('conformidadServicios/pdf', data, params_ext);
            }
        };

        function newC() {
            titleC.html('Nueva Conformidad');
            modalC.modal('show');
        }

        function findC(id) {
            RESTService.get('conformidadServicios/find', id, function (response) {
                if (!_.isUndefined(response.status) && response.status) {
                    c_id = id;
                    var data_ = response.data;
                    c_mov = data_.mov_id;
                    c_state_id = parseInt(data_.state_id);
                    var disabled_ = (c_state_id > 1);
                    c_code.val(data_.code);
                    c_oc_id = data_.purchase_order_id;
                    c_oc.val(data_.oc_);
                    c_oc_btn.prop('disabled', disabled_);
                    c_date.val(data_.date).prop('disabled', disabled_);
                    c_operation.val(data_.operation_id).trigger('change');
                    c_currency.val(data_.currency_id).trigger('change');
                    c_observations.val(data_.observation).prop('disabled', disabled_);
                    _.each(data_.detail_, function (det) {
                        addDetailC(det);
                    });
                    $('button.btn-print').removeClass('hide');
                    if (disabled_) {
                        $('button.btn-save, button.btn-frm').addClass('hide');
                    }
                    var txt_ = (c_state_id > 1) ? 'Ver' : 'Editar';
                    titleC.html(txt_ + ' Conformidad');
                    modalC.modal("show");
                } else {
                    $scope.showAlert('', response.message, 'warning');
                }
            });
        }

        var search = getFormSearch('frm-search-c', 'search_c', 'LoadRecordsButtonC');

        var table_container_c = $("#table_container_c");

        table_container_c.jtable({
            title: "Lista de conformidad de servicios",
            paging: true,
            actions: {
                listAction: base_url + '/conformidadServicios/list',
                deleteAction: base_url + '/conformidadServicios/delete'
            },
            toolbar: {
                items: [{
                    cssClass: 'buscador',
                    text: search
                }, {
                    cssClass: 'btn-danger-admin',
                    text: '<i class="fa fa-plus"></i> Conformidad',
                    click: function () {
                        newC();
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
                        return '<a href="javascript:void(0)" class="edit-c" data-code="' + data.record.id
                            + '" title="Editar"><i class="fa fa-edit fa-1-5x"></i></a>';
                    }
                }
            },
            recordsLoaded: function (event, data) {
                table_container_c.find('a.edit-c').click(function (e) {
                    var code_ = $(this).attr('data-code');
                    findC(code_);
                    e.preventDefault();
                });
            }
        });

        generateSearchForm('frm-search-c', 'LoadRecordsButtonC', function () {
            table_container_c.jtable('load', {
                search: $('#search_c').val(),
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
                listAction: base_url + '/conformidadServicios/listOC'
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
                        if (parseInt(c_oc_id) !== parseInt(info.id)) {
                            c_detail.empty();
                        }
                        c_oc_id = info.id;
                        c_oc.val(info.cCodConsecutivo + ' ' + info.nConsecutivo);
                        c_currency.val(info.idMoneda).trigger('change');
                        _.each(info.detail, function (det) {
                            addDetailC(det);
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
                type: 2,
                showDetail: true
            });
        }, false);

        $scope.saveC = function (type) {
            saveC(type);
        };

        function saveC(type_) {
            var b_val = true;
            b_val = b_val && c_oc.required();
            b_val = b_val && c_date.required();
            if (b_val && c_detail.html() === '') {
                $scope.showAlert('', 'Debe agregar mínimo 1 Servicio', 'warning');
                return false;
            }
            if (b_val) {
                var det_ = [], valid_ = true;
                _.each(c_detail.find('tr'), function (tr) {
                    var max_ = parseFloat($(tr).attr('data-q-max'));
                    var q_ = $(tr).find('input.c_reception').val();
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
                    'purchase_order_id': c_oc_id,
                    'date': c_date.val(),
                    'operation_id': c_operation.val(),
                    'observation': c_observations.val(),
                    'detail': det_
                };
                var txt_ = (type_ === 1) ? 'guardar' : 'procesar';
                $scope.showConfirm('', '¿Está seguro que desea ' + txt_ + ' la conformidad?', function () {
                    RESTService.updated('conformidadServicios/save', c_id, params, function (response) {
                        if (!_.isUndefined(response.status) && response.status) {
                            txt_ = (type_ === 1) ? 'guardó' : 'procesó';
                            $scope.showAlert('', 'La Conformidad se ' + txt_ + ' correctamente.', 'success');
                            modalC.modal('hide');
                            $("#LoadRecordsButtonC").click();
                        } else {
                            $scope.showAlert('', response.message, 'warning');
                        }
                    });
                });
            }
        }

        function addDetailC(info) {
            var code_ = info.ocd_id;
            var price_ = parseFloat(info.price);
            var quantity_ = parseFloat(info.quantity);
            var pending_ = parseFloat(info.pending);
            var reception_ = (_.isUndefined(info.reception)) ? 0 : parseFloat(info.reception);

            var tr_ = $('<tr data-code="' + code_ + '" data-product="' + info.product_id + '" data-q-max="' +
                pending_ + '"></tr>');
            tr_.append('<td>' + info.description + '</td>');

            tr_.append('<td class="text-right">' + price_ + '</td>');
            tr_.append('<td class="text-right">' + quantity_ + '</td>');
            tr_.append('<td class="text-right">' + pending_ + '</td>');

            var td_ = $('<td class="text-right"></td>');
            if (c_state_id === 1) {
                td_.append('<input type="text" class="form-control input-xs text-right c_reception" ' +
                    'onclick="this.select()"' + ' onkeypress="return validDecimals(event, this, 6)" ' +
                    'onblur="return roundDecimals(this, 5)" value="' + reception_ + '">');
            } else {
                td_.append('<span class="c_reception">' + numberFormat(reception_, 5) + '</span>');
            }
            tr_.append(td_);

            td_ = $('<td class="text-center"></td>');
            if (c_state_id === 1) {
                td_.append('<button class="btn btn-danger btn-xs del_" title="Eliminar" type="button">' +
                    '<span class="fa fa-trash"></span></button>');
            }
            tr_.append(td_);
            c_detail.append(tr_);

            if (c_state_id === 1) {
                c_detail.find('input.c_reception').off().on('blur', function (e) {
                    var that = $(this);
                    var tr_ = that.closest('tr');
                    var q_max_ = parseFloat(tr_.attr('data-q-max'));
                    if (that.val() === '' || that.val() > q_max_) {
                        $scope.showAlert('', 'Debe ingresar una cantidad menor o igual a la cantidad pendiente', 'warning');
                        that.val(q_max_);
                        that.select();
                    }
                });
                c_detail.find('button.del_').off().on('click', function (e) {
                    var tr_ = $(this).closest('tr');
                    $scope.showConfirm('', '¿Está seguro que desea quitar este servicio?', function () {
                        tr_.remove();
                    });
                    e.preventDefault();
                });
            }
        }
    }

    function Config($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('conformidadServicios', {
                url: '/conformidadServicios',
                templateUrl: base_url + '/templates/conformidadServicios/base.html',
                controller: 'ConformidadServicioCtrl'
            });

        $urlRouterProvider.otherwise('/');
    }
})
();