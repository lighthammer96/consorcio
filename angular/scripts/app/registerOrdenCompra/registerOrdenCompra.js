/**
 * Created by JAIR on 4/5/2017.
 */

(function () {
    'use strict';
    angular.module('sys.app.registerOrdenCompras')
        .config(Config)
        .controller('RegisterOrdenCompraCtrl', RegisterOrdenCompraCtrl);

    Config.$inject = ['$stateProvider', '$urlRouterProvider'];
    RegisterOrdenCompraCtrl.$inject = ['$scope', '_', 'RESTService'];

    function RegisterOrdenCompraCtrl($scope, _, RESTService)
    {
        var date_now = moment.tz('America/Lima').format('DD/MM/YYYY');

        var modalOC = $("#modalOC");
        modalOC.on('hidden.bs.modal', function (e) {
            cleanOC();
        });
        var titleOC = $("#titleOC");

        var modalArticle = $("#modalArticle");
        modalArticle.on('show.bs.modal', function (e) {
            $('#LoadRecordsButtonArt').click();
            modalOC.attr('style', 'display:block; z-index:2030 !important');
        });
        modalArticle.on('hidden.bs.modal', function (e) {
            $('#search_art').val('');
            clearRowsOC();
            $('#LoadRecordsButtonArt').click();
            modalOC.attr('style', 'display:block; overflow-y: auto;');
        });

        var modalArticleSol = $("#modalArticleSol");
        modalArticleSol.on('show.bs.modal', function (e) {
            $('#LoadRecordsButtonArtSol').click();
            modalOC.attr('style', 'display:block; z-index:2030 !important');
        });
        modalArticleSol.on('hidden.bs.modal', function (e) {
            $('#search_art_sol').val('');
            clearRowsOC();
            $('#LoadRecordsButtonArtSol').click();
            modalOC.attr('style', 'display:block; overflow-y: auto;');
        });

        var modalFormat = $('#modalFormat');
        modalFormat.on('show.bs.modal', function (e) {
            if (modalOC.hasClass('in')) {
                modalOC.attr('style', 'display:block; z-index:2030 !important');
            }
        });
        modalFormat.on('hidden.bs.modal', function (e) {
            if (modalOC.hasClass('in')) {
                modalOC.attr('style', 'display:block; overflow-y: auto;');
            }
        });

        var modalFilter = $('#modalFilter');
        modalFilter.on('show.bs.modal', function (e) {
            modalArticleSol.attr('style', 'display:block; z-index:2030 !important');
        });
        modalFilter.on('hidden.bs.modal', function (e) {
            modalArticleSol.attr('style', 'display:block; overflow-y: auto;');
        });

        var modalApprovers = $("#modalApprovers");
        modalApprovers.on('show.bs.modal', function (e) {
            modalOC.attr('style', 'display:block; z-index:2030 !important');
        });
        modalApprovers.on('hidden.bs.modal', function (e) {
            oc_approvers.empty();
            modalOC.attr('style', 'display:block; overflow-y: auto;');
        });

        var oc_id = 0;
        var oc_state_id = 1;
        var oc_consecutive = $("select#oc_consecutive");
        var oc_nro_consecutive = $("input#oc_nro_consecutive");
        var oc_date_register = $("input#oc_date_register");
        oc_date_register.val(date_now);
        generateDatePicker(oc_date_register);
        var oc_state = $("select#oc_state");
        var oc_priority = $("select#oc_priority");
        var oc_date_required = $("input#oc_date_required");
        oc_date_required.val(date_now);
        generateDatePicker(oc_date_required);
        var oc_currency = $("select#oc_currency");
        var oc_provider = $("select#oc_provider");
        var oc_payment_condition = $("select#oc_payment_condition");
        var oc_address = $("input#oc_address");
        var oc_comment = $("textarea#oc_comment");
        var oc_comment_approval = $("textarea#oc_comment_approval");
        var oc_detail = $("tbody#oc_detail");

        var oc_igv_ = 0;
        var oc_q_final = $('th#oc_q_final');
        var oc_pt_final = $('th#oc_pt_final');
        var oc_vc_final = $('th#oc_vc_final');
        var oc_vcd_final = $('th#oc_vcd_final');
        var oc_imp_final = $('th#oc_imp_final');
        var oc_st_final = $('th#oc_st_final');

        var oc_is_igv = $("input#oc_is_igv");
        oc_is_igv.click(function () {
            calculateTotalByClickIGV();
        });
        generateCheckBox(oc_is_igv);

        var oc_per_disc_total = $("input#oc_per_disc_total");
        oc_per_disc_total.keyup(function () {
            updatePercentageDiscountOCGlobal();
        });

        var oc_amount_disc_total = $("input#oc_amount_disc_total");
        oc_amount_disc_total.keyup(function () {
            updateDiscountOCGlobal();
        });

        var oc_total = $('input#oc_total');

        var oc_approvers = $("tbody#oc_approvers");

        var oc_btn_add_article = $("button#oc_btn_add_article");
        var oc_btn_add_article_sol = $("button#oc_btn_add_article_sol");
        var oc_btn_save = $("button#oc_btn_save");
        var oc_btn_send_approval = $("button#oc_btn_send_approval");

        function cleanOC() {
            cleanRequired();
            titleOC.empty();
            oc_id = 0;
            oc_state_id = 1;
            if (oc_consecutive.html() !== '') {
                oc_consecutive.val(oc_consecutive.find('option:first').val());
            }
            oc_consecutive.prop('disabled', false);
            oc_nro_consecutive.val('');
            oc_date_register.val(date_now).prop('disabled', false);
            oc_state.val(1);
            oc_priority.val('').prop('disabled', false);
            oc_currency.val('1').prop('disabled', false);
            oc_provider.val('').trigger('change').prop('disabled', false);
            oc_payment_condition.val('').prop('disabled', false);
            oc_address.val('').prop('disabled', false);
            oc_comment.val('').prop('disabled', false);
            oc_comment_approval.val('');
            oc_detail.empty();
            calculateTotalFooterOC();

            oc_is_igv.prop('checked', false).prop('disabled', false).iCheck('update');
            oc_per_disc_total.val(0).prop('disabled', false);
            oc_amount_disc_total.val(0).prop('disabled', false);

            oc_total.val('0.00');


            oc_btn_add_article.removeClass('hide');
            oc_btn_add_article_sol.removeClass('hide');
            oc_btn_save.removeClass('hide');
            oc_btn_send_approval.removeClass('hide');

            $('button.btn-approval, div.div-approval').addClass('hide');
        }

        function getDataOC() {
            RESTService.all('registerOrdenCompras/data_form', '', function (response) {
                if (!_.isUndefined(response.status) && response.status) {
                    oc_consecutive.empty();
                    _.each(response.consecutive, function (con) {
                        oc_consecutive.append('<option value="' + con + '">' + con + '</option>');
                    });

                    oc_provider.html('<option value="">--Seleccionar--</option>');
                    _.each(response.providers, function (item) {
                        oc_provider.append('<option value="' + item.id + '">' + item.razonsocial + '</option>');
                    });
                    oc_provider.select2();

                    oc_payment_condition.html('<option value="">--Seleccionar--</option>');
                    _.each(response.payment_condition, function (item) {
                        var selected_ = (parseInt(item.id) === 1) ? 'selected' : '';
                        oc_payment_condition.append('<option value="' + item.id + '" ' + selected_ + '>' +
                            item.description + '</option>');
                    });

                    oc_currency.empty();
                    _.each(response.currency, function (item) {
                        oc_currency.append('<option value="' + item.Value + '">' + item.DisplayText + '</option>');
                    });
                    oc_currency.val('1').trigger('change');

                    oc_igv_ = parseFloat(response.igv);
                }
            }, function () {
                getDataOC();
            });
        }
        getDataOC();

        function newOC() {
            titleOC.html('Nueva Orden de Compra');
            modalOC.modal('show');
        }

        $scope.saveOC = function (state_) {
            saveOC(state_);
        };
        function saveOC(state_, callback) {
            var params, msg_;
            if (_.contains([0, 1, 2], state_)) {
                var b_val = true;
                b_val = b_val && oc_consecutive.required();
                b_val = b_val && oc_date_register.required();
                b_val = b_val && oc_priority.required();
                b_val = b_val && oc_date_required.required();
                b_val = b_val && oc_currency.required();
                b_val = b_val && oc_provider.required();
                b_val = b_val && oc_payment_condition.required();
                if (b_val) {
                    var date_req = moment(oc_date_required.val(), 'DD/MM/YYYY');
                    var date_reg = moment(oc_date_register.val(), 'DD/MM/YYYY');
                    if (date_reg.diff(date_req, 'days', true) > 0) {
                        $scope.showAlert('', 'La fecha requerida no puede ser menor a fecha registro', 'warning');
                        return false;
                    }
                }
                if (b_val) {
                    if (state_ === 2 && oc_detail.html() === '') {
                        $scope.showAlert('', 'Debe agregar minimo 1 articulo', 'warning');
                        return false;
                    }
                    var detail_ = [], valid_q = true, valid_p = true, valid_date = true;
                    _.each(oc_detail.find('tr'), function (tr) {
                        tr = $(tr);
                        var q_ = tr.find('input.oc_q').val();
                        if (q_ === '' || parseFloat(q_) <= 0) {
                            valid_q = false;
                        }
                        var p_ = tr.find('input.oc_p').val();
                        if (p_ === '' || parseFloat(p_) <= 0) {
                            valid_p = false;
                        }
                        var per_disc_ = tr.find('input.oc_per_disc').val();
                        per_disc_ = (per_disc_ === '' || parseFloat(per_disc_) <= 0) ? 0 : parseFloat(per_disc_);
                        var tot_disc_ = tr.find('input.oc_tot_disc').val();
                        tot_disc_ = (tot_disc_ === '' || parseFloat(tot_disc_) <= 0) ? 0 : parseFloat(tot_disc_);
                        var date_ = tr.find('input.oc_date').val();
                        var date_oc_ = moment(date_, 'DD/MM/YYYY');
                        var date_reg = moment(oc_date_register.val(), 'DD/MM/YYYY');
                        if (date_reg.diff(date_oc_, 'days', true) > 0) {
                            valid_date = false;
                        }
                        detail_.push({
                            'id': tr.attr('data-code'),
                            'sol_id': tr.attr('data-sol'),
                            'q': q_,
                            'qp': parseFloat(replaceAll(tr.find('td.oc_qp').html(), ',', '')),
                            'qr': parseFloat(replaceAll(tr.find('td.oc_qr').html(), ',', '')),
                            'qd': parseFloat(replaceAll(tr.find('td.oc_qd').html(), ',', '')),
                            'p': p_,
                            'pt': parseFloat(replaceAll(tr.find('td.oc_t').html(), ',', '')),
                            'per_disc': per_disc_,
                            'tot_disc': tot_disc_,
                            'vc': parseFloat(replaceAll(tr.find('td.oc_vc').html(), ',', '')),
                            'vcd': parseFloat(replaceAll(tr.find('td.oc_vcd').html(), ',', '')),
                            'imp': parseFloat(replaceAll(tr.find('td.oc_imp').html(), ',', '')),
                            'tf': parseFloat(replaceAll(tr.find('td.oc_tf').html(), ',', '')),
                            'date': date_,
                        });
                    });
                    if (!valid_q && state_ === 2) {
                        $scope.showAlert('', 'No debe ingresar cantidades vacías o igual o menor a 0 para cada artículo', 'warning');
                        return false;
                    }
                    if (!valid_p && state_ === 2) {
                        $scope.showAlert('', 'No debe ingresar precios vacíos o igual o menor a 0 para cada artículo', 'warning');
                        return false;
                    }
                    if (!valid_date && state_ === 2) {
                        $scope.showAlert('', 'La fecha requerida del articulo no puede ser menor a fecha registro', 'warning');
                        return false;
                    }

                    var amount_disc_ = oc_amount_disc_total.val();
                    amount_disc_ = (amount_disc_ === '') ? 0 : parseFloat(amount_disc_);
                    var per_tot_disc_ = oc_per_disc_total.val();
                    per_tot_disc_ = (per_tot_disc_ === '') ? 0 : parseFloat(per_tot_disc_);

                    msg_ = (state_ === 1) ? 'guardar' : 'enviar a aprobación';
                    params = {
                        'state': (state_ === 0) ? 1 : state_,
                        'cCodConsecutivo': oc_consecutive.val(),
                        'dFecRegistro': oc_date_register.val(),
                        'prioridad': oc_priority.val(),
                        'dFecRequerida': oc_date_required.val(),
                        'idProveedor': oc_provider.val(),
                        'idMoneda': oc_currency.val(),
                        'idcondicion_pago': oc_payment_condition.val(),
                        'subtotal': parseFloat(replaceAll(oc_pt_final.html(), ',', '')),
                        'nDescuento': amount_disc_,
                        'nPorcDescuento': per_tot_disc_,
                        'valorCompra': parseFloat(replaceAll(oc_vc_final.html(), ',', '')),
                        'valorCompraDescuento': parseFloat(replaceAll(oc_vcd_final.html(), ',', '')),
                        'impuesto': (oc_is_igv.prop('checked')) ? 1 : 0,
                        'nImpuesto': parseFloat(replaceAll(oc_imp_final.html(), ',', '')),
                        'total': parseFloat(replaceAll(oc_total.val(), ',', '')),
                        'direccionEntrega': oc_address.val(),
                        'comentario': oc_comment.val(),
                        'detail': detail_,
                    };
                    if (state_ !== 0) {
                        $scope.showConfirm('', '¿Está seguro que desea ' + msg_ + ' la orden?', function () {
                            RESTService.updated('registerOrdenCompras/save', oc_id, params, function (response) {
                                if (!_.isUndefined(response.status) && response.status) {
                                    msg_ = (state_ === 1) ? 'guardó' : 'envió';
                                    $scope.showAlert('', 'La orden se ' + msg_ + ' correctamente', 'success');
                                    if (state_ === 1) {
                                        oc_consecutive.prop('disabled', true);
                                        oc_nro_consecutive.val(response.data.number);
                                        oc_id = response.data.code;
                                    } else {
                                        modalOC.modal('hide');
                                    }
                                    $('button#LoadRecordsButtonOC').click();
                                } else {
                                    $scope.showAlert('', response.message, 'warning');
                                }
                            });
                        });
                    } else {
                        RESTService.updated('registerOrdenCompras/save', oc_id, params, function (response) {
                            if (!_.isUndefined(response.status) && response.status) {
                                $('#LoadRecordsButtonOC').click();
                                callback();
                            } else {
                                $scope.showAlert('', response.message, 'warning');
                            }
                        });
                    }
                }
            } else {
                params = {
                    'state': state_
                };
                RESTService.updated('registerOrdenCompras/cambiarEstado', oc_id, params, function (response) {
                    if (!_.isUndefined(response.status) && response.status) {
                        var valorPorApr = response.val;
                        if (valorPorApr[0].msg === 'OK') {
                            $scope.showAlert('', 'El registro se modificó con éxito', 'success');
                            modalOC.modal('hide');
                            $('button#LoadRecordsButtonOC').click();
                        } else {
                            $scope.showAlert('', valorPorApr[0].msg, 'info');
                        }
                    } else {
                        $scope.showAlert('', response.message, 'warning');
                    }
                });
            }
        }

        $scope.printOC = function () {
            if (oc_state_id > 1) {
                $scope.showIFrame('#modal_pdf_show', '#modal_pdf_load', 'oc_load_iFrame',
                    '/registerOrdenCompras/format/' + oc_id, '#modalTitlePDF', 'Orden de Compra');
                modalFormat.modal('show');
            } else {
                saveOC(0, function () {
                    $scope.showIFrame('#modal_pdf_show', '#modal_pdf_load', 'oc_load_iFrame',
                        '/registerOrdenCompras/format/' + oc_id, '#modalTitlePDF', 'Orden de Compra');
                    modalFormat.modal('show');
                });
            }
        };

        function findOC(id) {
            RESTService.get('registerOrdenCompras/find', id, function (response) {
                if (!_.isUndefined(response.status) && response.status) {
                    var data_p = response.data;
                    oc_id = id;
                    oc_state_id = parseInt(data_p.iEstado);
                    var disabled_ = (oc_state_id > 1);
                    oc_consecutive.val(data_p.cCodConsecutivo).prop('disabled', true);
                    oc_nro_consecutive.val(data_p.nConsecutivo);
                    oc_date_register.val(data_p.fecha_registro).prop('disabled', disabled_);
                    oc_state.val(data_p.iEstado);
                    oc_priority.val(data_p.prioridad).prop('disabled', disabled_);
                    oc_date_required.val(data_p.fecha_requerida).prop('disabled', disabled_);
                    oc_currency.val(data_p.idMoneda).prop('disabled', disabled_);
                    oc_provider.val(data_p.idProveedor).trigger('change').prop('disabled', disabled_);
                    oc_payment_condition.val(data_p.idcondicion_pago).prop('disabled', disabled_);
                    oc_address.val(data_p.direccionEntrega).prop('disabled', disabled_);
                    oc_comment.val(data_p.comentario).prop('disabled', disabled_);
                    oc_comment_approval.val(data_p.comentarioAprobacion);

                    var chk_igv = (parseInt(data_p.impuesto) === 1);
                    oc_is_igv.prop('checked', chk_igv).iCheck('update').prop('disabled', disabled_);

                    oc_per_disc_total.val(parseFloat(data_p.nPorcDescuento)).prop('disabled', disabled_);
                    oc_amount_disc_total.val(parseFloat(data_p.nDescuento)).prop('disabled', disabled_);
                    oc_total.val(numberFormat(data_p.total, 2));

                    _.each(data_p.detail, function (det) {
                        addArticleDetail(det);
                    });
                    calculateTotalFooterOC();

                    if (oc_state_id > 1) {
                        oc_btn_add_article.addClass('hide');
                        oc_btn_add_article_sol.addClass('hide');
                        oc_btn_save.addClass('hide');
                        oc_btn_send_approval.addClass('hide');
                        $('button.btn-approval, div.div-approval').removeClass('hide');
                    }
                    var txt_ = (oc_state_id > 1) ? '' : 'Editar ';
                    titleOC.html(txt_ + 'Orden de Compra');
                    modalOC.modal("show");
                } else {
                    $scope.showAlert('', response.message, 'warning');
                }
            });
        }

        var search = getFormSearch('frm-search-oc', 'search_oc', 'LoadRecordsButtonOC');

        var table_container_oc = $("#table_container_oc");

        table_container_oc.jtable({
            title: "Lista de Ordenes de Compras",
            paging: true,
            actions: {
                listAction: base_url + '/registerOrdenCompras/list',
                deleteAction: base_url + '/registerOrdenCompras/delete'
            },
            toolbar: {
                items: [{
                    cssClass: 'buscador',
                    text: search
                }, {
                    cssClass: 'btn-primary',
                    text: '<i class="fa fa-file-excel-o"></i> Exportar',
                    click: function () {
                        $scope.openDoc('registerOrdenCompras/excel', {});
                    }
                }, {
                    cssClass: 'btn-danger-admin',
                    text: '<i class="fa fa-plus"></i> Orden de Compra',
                    click: function () {
                        newOC();
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
                        return '<a href="javascript:void(0)" class="edit-oc" data-id="' + data.record.id
                            + '" title="Editar"><i class="fa fa-edit fa-1-5x"></i></a>';
                    }
                }
            },
            recordsLoaded: function (event, data) {
                table_container_oc.find('a.edit-oc').click(function (e) {
                    var id = $(this).attr('data-id');
                    findOC(id);
                    e.preventDefault();
                });
            }
        });

        generateSearchForm('frm-search-oc', 'LoadRecordsButtonOC', function () {
            table_container_oc.jtable('load', {
                search: $('#search_oc').val()
            });
        }, true);

        var search_art = getFormSearch('frm-search-art', 'search_art', 'LoadRecordsButtonArt');

        var table_container_art = $("#table_container_art");

        table_container_art.jtable({
            title: "Lista de Articulos",
            paging: true,
            selecting: true,
            multiselect: true,
            selectingCheckboxes: true,
            selectOnRowClick: false,
            actions: {
                listAction: base_url + '/registerOrdenCompras/getArticulosMinKit'
            },
            toolbar: {
                items: [{
                    cssClass: 'buscador',
                    text: search_art
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
                    title: 'Código'
                },
                description: {
                    title: 'Descripción'
                },
                und: {
                    title: 'Unidad Medida'
                }
            },
            recordsLoaded: function (event, data) {
                generateCheckBox('.jtable-selecting-column input');
            }
        });

        generateSearchForm('frm-search-art', 'LoadRecordsButtonArt', function () {
            table_container_art.jtable('load', {
                search: $('#search_art').val()
            });
        }, false);

        var search_art_sol = getFormSearch('frm-search-art_sol', 'search_art_sol', 'LoadRecordsButtonArtSol');

        var table_container_art_sol = $("#table_container_art_sol");

        table_container_art_sol.jtable({
            title: "Lista de Articulos",
            paging: true,
            selecting: true,
            multiselect: true,
            selectingCheckboxes: true,
            selectOnRowClick: false,
            actions: {
                listAction: base_url + '/registerOrdenCompras/getScompraArticulo'
            },
            toolbar: {
                items: [{
                    cssClass: 'btn-default btn-sm',
                    text: '<i class="fa fa-list"></i> Filtros',
                    click: function () {
                        showFilters();
                    }
                }, {
                    cssClass: 'buscador',
                    text: search_art_sol
                }]
            },
            fields: {
                id: {
                    key: true,
                    create: false,
                    edit: false,
                    list: false
                },
                cod_consecutive: {
                    title: 'Código',
                    listClass:' text-center'
                },
                nConsecutivo: {
                    title: 'Consecutivo',
                    listClass:' text-center'
                },
                product: {
                    title: 'Artículo'
                },
                und: {
                    title: 'Unida Medida',
                    listClass:' text-center'
                },
                cantidad: {
                    title: 'Cantidad',
                    listClass:' text-right'
                },
                fecha_requerida: {
                    title: 'Fecha Requerida',
                    listClass:' text-center'
                },
            },
            recordsLoaded: function (event, data) {
                generateCheckBox('.jtable-selecting-column input');
            }
        });

        generateSearchForm('frm-search-art_sol', 'LoadRecordsButtonArtSol', function () {
            table_container_art_sol.jtable('load', {
                search: $('#search_art_sol').val(),
                consecutive: oc_con_s_,
                date_required: oc_date_s_,
                is_process: true
            });
        }, false);

        $scope.openArticle = function () {
            modalArticle.modal('show');
        }
        $scope.addArticle = function () {
            var $selectedRows = table_container_art.jtable('selectedRows');
            if ($selectedRows.length > 0) {
                $selectedRows.each(function () {
                    var record = $(this).data('record');
                    record.date = oc_date_required.val();
                    addArticleDetail(record);
                });
                modalArticle.modal('hide');
            } else {
                $scope.showAlert('', 'Debe seleccionar minimo 1 articulo', 'warning');
            }
        }

        $scope.openArticleSol = function () {
            modalArticleSol.modal('show');
        }

        $scope.addArticleSol = function () {
            var $selectedRows = table_container_art_sol.jtable('selectedRows');
            if ($selectedRows.length > 0) {
                $selectedRows.each(function () {
                    var record = $(this).data('record');
                    addArticleDetail({
                        'id': record.idArticulo,
                        'sol_id': record.id,
                        'description': record.product,
                        'q': record.cantidad,
                        'date': record.fecha_requerida
                    });
                });
                modalArticleSol.modal('hide');
            } else {
                $scope.showAlert('', 'Debe seleccionar minimo 1 articulo', 'warning');
            }
        }

        function addArticleDetail(info) {
            if (oc_detail.find('tr[data-code=' +  info.id + ']').length > 0) {
                return;
            }
            var sol_ = (_.isUndefined(info.sol_id)) ? '' : info.sol_id;
            var tr_ = $('<tr data-code="' + info.id + '" data-sol="' + sol_ + '"></tr>');
            tr_.append('<td>' + info.description + '</td>');

            var td_ = $('<td class="text-right"></td>');
            var q_ = (_.isUndefined(info.q)) ? 0 : info.q;
            if (oc_state_id === 1) {
                td_.append('<input type="text" onkeypress="return validDecimals(event, this, 3)" ' +
                    'onblur="return roundDecimals(this, 2)" onclick="this.select()" ' +
                    'class="form-control input-sm oc_q text-right" value="' + q_ + '" />');
            } else {
                td_.append('<span class="oc_q">' + q_ + '</span>');
            }
            tr_.append(td_);

            var q_p = (_.isUndefined(info.qp)) ? q_ : info.qp;
            tr_.append('<td class="text-right oc_qp">' + q_p + '</td>');

            var q_r = (_.isUndefined(info.qr)) ? 0 : info.qr;
            tr_.append('<td class="text-right oc_qr">' + q_r + '</td>');

            var q_d = (_.isUndefined(info.qd)) ? 0 : info.qd;
            tr_.append('<td class="text-right oc_qd">' + q_d + '</td>');

            td_ = $('<td class="text-right"></td>');
            var p_ = (_.isUndefined(info.p)) ? 0 : info.p;
            if (oc_state_id === 1) {
                td_.append('<input type="text" onkeypress="return validDecimals(event, this, 3)" ' +
                    'onblur="return roundDecimals(this, 2)" onclick="this.select()" ' +
                    'class="form-control input-sm oc_p text-right" value="' + p_ + '" />');
            } else {
                td_.append('<span class="oc_p">' + p_ + '</span>');
            }
            tr_.append(td_);

            var t_ = roundMath(p_ * q_, 2);
            tr_.append('<td class="text-right oc_t">' + numberFormat(t_, 2) + '</td>');

            td_ = $('<td class="text-right"></td>');
            var per_disc_ = (_.isUndefined(info.per_disc)) ? 0 : info.per_disc;
            if (oc_state_id === 1) {
                td_.append('<input type="text" onkeypress="return validDecimals(event, this, 3)" ' +
                    'onblur="return roundDecimals(this, 2)" onclick="this.select()" ' +
                    'class="form-control input-sm oc_per_disc text-right" value="' + per_disc_ + '" />');
            } else {
                td_.append('<span class="oc_per_disc">' + per_disc_ + '</span>');
            }
            tr_.append(td_);

            td_ = $('<td class="text-right"></td>');
            var tot_disc_ = (_.isUndefined(info.tot_disc)) ? 0 : info.tot_disc;
            if (oc_state_id === 1) {
                td_.append('<input type="text" onkeypress="return validDecimals(event, this, 3)" ' +
                    'onblur="return roundDecimals(this, 2)" onclick="this.select()" ' +
                    'class="form-control input-sm oc_tot_disc text-right" value="' + tot_disc_ + '" />');
            } else {
                td_.append('<span class="oc_tot_disc">' + tot_disc_ + '</span>');
            }
            tr_.append(td_);

            var vc_ = roundMath(t_ - tot_disc_, 2);
            tr_.append('<td class="text-right oc_vc">' + numberFormat(vc_, 2) + '</td>');

            var per_tot_disc_ = oc_per_disc_total.val();
            per_tot_disc_ = (per_tot_disc_ === '') ? 0 : parseFloat(per_tot_disc_);
            var vcd_ = roundMath(vc_ - (vc_ * per_tot_disc_ / 100), 2);
            tr_.append('<td class="text-right oc_vcd">' + numberFormat(vcd_, 2) + '</td>');

            var imp_ = (oc_is_igv.prop('checked')) ? vcd_ * (oc_igv_ / 100) : 0;
            imp_ = (_.isUndefined(info.imp)) ? imp_ : parseFloat(info.imp);
            tr_.append('<td class="text-right oc_imp">' + numberFormat(imp_, 2) + '</td>');

            var tf_ = roundMath(vcd_ + imp_, 2);
            tr_.append('<td class="text-right oc_tf">' + numberFormat(tf_, 2) + '</td>');

            td_ = $('<td class="text-center"></td>');
            if (oc_state_id === 1) {
                td_.append('<input type="text" class="oc_date form-control input-sm" value="' + info.date + '" readonly />');
            } else {
                td_.append('<span class="oc_date">' + info.date + '</span>');
            }
            tr_.append(td_);

            tr_.append('<td><select class="oc_state form-control input-sm" disabled><option value="1">Registrado</option>' +
                '<option value="2">Por Aprobar</option><option value="3">Aprobado</option><option value="4">Recibido</option>' +
                '<option value="5">Backorder</option><option value="6">Cerrado</option><option value="7">Cancelado</option>' +
                '<option value="8">Rechazado</option></select></td>');

            td_ = $('<td class="text-center"></td>');
            if (oc_state_id === 1) {
                td_.append('<button class="btn btn-danger btn-xs del_" title="Eliminar" type="button">' +
                    '<span class="fa fa-trash"></span></button>');
            }
            tr_.append(td_);

            oc_detail.append(tr_);

            tr_ = oc_detail.find('tr[data-code=' + info.id + ']');
            var det_state_id = (_.isUndefined(info.state_id)) ? oc_state_id : info.state_id;
            tr_.find('select.oc_state').val(det_state_id).trigger('change');

            if (oc_state_id === 1) {
                if (q_ === 0) {
                    tr_.find('input._q').focus();
                }
                generateDatePicker(tr_.find('input.oc_date'));
                oc_detail.find('input.oc_q').off().on('keyup', function (e) {
                    var tr_ = $(this).closest('tr');
                    var q_ = $(this).val();
                    q_ = (q_ === '') ? 0 : parseFloat(q_);
                    tr_.find('td.oc_qp').html(q_);
                    var code_ = tr_.attr('data-code');
                    updatePriceOC(code_);
                });
                oc_detail.find('input.oc_p').off().on('keyup', function (e) {
                    var tr_ = $(this).closest('tr');
                    var code_ = tr_.attr('data-code');
                    updatePriceOC(code_);
                });
                oc_detail.find('input.oc_per_disc').off().on('keyup', function (e) {
                    var tr_ = $(this).closest('tr');
                    var code_ = tr_.attr('data-code');
                    updatePercentageDiscountOC(code_);
                });
                oc_detail.find('input.oc_tot_disc').off().on('keyup', function (e) {
                    var tr_ = $(this).closest('tr');
                    var code_ = tr_.attr('data-code');
                    updateDiscountOC(code_);
                });
                oc_detail.find('button.del_').off().on('click', function (e) {
                    var tr_ = $(this).closest('tr');
                    $scope.showConfirm('', '¿Está seguro que desea quitar este artículo?', function () {
                        tr_.remove();
                    });
                    e.preventDefault();
                });
            }
        }

        function updatePriceOC(code_) {
            var tr_ = oc_detail.find('tr[data-code=' + code_ + ']');
            if (tr_) {
                var q_ = tr_.find('td.oc_qp').html();
                q_ = (q_ === '') ? 0 : parseFloat(q_);
                var p_ = tr_.find('input.oc_p').val();
                p_ = (p_ === '') ? 0 : parseFloat(p_);
                var t_ = numberFormat(q_ * p_, 2);
                tr_.find('td.oc_t').html(t_);
                updateDiscountOC(code_);
            }
        }
        function updateDiscountOC(code_) {
            var tr_ = oc_detail.find('tr[data-code=' + code_ + ']');
            if (tr_) {
                var tot_disc_ = tr_.find('input.oc_tot_disc').val();
                tot_disc_ = (tot_disc_ === '') ? 0 : parseFloat(tot_disc_);
                var tot_ = parseFloat(replaceAll(tr_.find('td.oc_t').html(), ',', ''));
                var per_disc_ = tr_.find('input.oc_per_disc');
                var vc_ = tr_.find('td.oc_vc');
                var per_ = (tot_ === 0) ? 0 : parseFloat(tot_disc_ * 100 / tot_);
                per_disc_.val(roundMath(per_, 2));
                vc_.html(roundMath(tot_ - tot_disc_, 2));
                updateVCDiscountOC(code_);
                calculateTaxOC(code_);
                calculateTotalFooterOC();
            }
        }
        function updatePercentageDiscountOC(code_) {
            var tr_ = oc_detail.find('tr[data-code=' + code_ + ']');
            if (tr_) {
                var per_disc_ = tr_.find('input.oc_per_disc').val();
                per_disc_ = (per_disc_ === '') ? 0 : parseFloat(per_disc_);
                var tot_disc_ = tr_.find('input.oc_tot_disc');
                var tot_ = parseFloat(replaceAll(tr_.find('td.oc_t').html(), ',', ''));
                var vc_ = tr_.find('td.oc_vc');
                var amount_disc_ = roundMath(tot_ * (per_disc_ / 100), 2);
                tot_disc_.val(amount_disc_);
                vc_.html(roundMath(tot_ - amount_disc_, 2));
                updateVCDiscountOC(code_);
                calculateTaxOC(code_);
                calculateTotalFooterOC();
            }
        }
        function updateVCDiscountOC(code_) {
            var tr_ = oc_detail.find('tr[data-code=' + code_ + ']');
            if (tr_) {
                var vc_ = parseFloat(replaceAll(tr_.find('td.oc_vc').html(), ',', ''));
                var per_tot_disc_ = oc_per_disc_total.val();
                per_tot_disc_ = (per_tot_disc_ === '') ? 0 : parseFloat(per_tot_disc_);
                var vcd_ = vc_ - (vc_ * (per_tot_disc_ / 100));
                tr_.find('td.oc_vcd').html(numberFormat(vcd_, 2));
            }
        }
        function calculateTotalByClickIGV() {
            _.each(oc_detail.find('tr'), function (tr) {
                var code_ = $(tr).attr('data-code');
                calculateTaxOC(code_);
            });
            calculateTotalFooterOC();
        }
        function updatePercentageDiscountOCGlobal() {
            var per_disc_ = oc_per_disc_total.val();
            per_disc_ = (per_disc_ === '') ? 0 : parseFloat(per_disc_);
            _.each(oc_detail.find('tr'), function (tr) {
                var code_ = $(tr).attr('data-code');
                updateVCDiscountOC(code_);
                calculateTaxOC(code_);
            });
            calculateTotalFooterOC();
            var vc_ = parseFloat(replaceAll(oc_vc_final.html(), ',', ''));
            oc_amount_disc_total.val(roundMath(parseFloat(vc_ * per_disc_ / 100), 2));
        }
        function updateDiscountOCGlobal() {
            var amount_disc_ = oc_amount_disc_total.val();
            amount_disc_ = (amount_disc_ === '') ? 0 : parseFloat(amount_disc_);
            var vc_ = parseFloat(replaceAll(oc_vc_final.html(), ',', ''));
            if (amount_disc_ > vc_) {
                amount_disc_ = 0;
                oc_amount_disc_total.val(0);
                oc_per_disc_total.val(0);
            }
            var per_ = (vc_ === 0) ? 0 : parseFloat(100 * amount_disc_ / vc_);
            oc_per_disc_total.val(roundMath(per_, 2));
            _.each(oc_detail.find('tr'), function (tr) {
                var code_ = $(tr).attr('data-code');
                updateVCDiscountOC(code_);
                calculateTaxOC(code_);
            });
            calculateTotalFooterOC();
        }
        function calculateTaxOC(code_) {
            var tr_ = oc_detail.find('tr[data-code=' + code_ + ']');
            if (tr_) {
                var vcd_ = parseFloat(replaceAll(tr_.find('td.oc_vcd').html(), ',', ''));
                var imp_ = (oc_is_igv.prop('checked')) ? vcd_ * (oc_igv_ / 100) : 0;
                tr_.find('td.oc_imp').html(numberFormat(imp_, 2));
                tr_.find('td.oc_tf').html(numberFormat(vcd_ + imp_, 2));
            }
        }
        function calculateTotalFooterOC() {
            var tot_q_ = 0, tot_t_ = 0, tot_vc_ = 0, tot_vcd_ = 0, tot_imp_ = 0, tot_fin_ = 0;
            _.each(oc_detail.find('tr'), function (tr) {
                var tr_ = $(tr);
                var tot_q_prev_ = (oc_state_id === 1) ?
                    tr_.find('input.oc_q').val() :  replaceAll(tr_.find('span.oc_q').html(), ',', '');
                tot_q_prev_ = (tot_q_prev_ === '') ? 0 : parseFloat(tot_q_prev_);
                tot_q_ += tot_q_prev_;
                tot_t_ += parseFloat(replaceAll(tr_.find('td.oc_t').html(), ',', ''));
                tot_vc_ += parseFloat(replaceAll(tr_.find('td.oc_vc').html(), ',', ''));
                tot_vcd_ += parseFloat(replaceAll(tr_.find('td.oc_vcd').html(), ',', ''));
                tot_imp_ += parseFloat(replaceAll(tr_.find('td.oc_imp').html(), ',', ''));
                tot_fin_ += parseFloat(replaceAll(tr_.find('td.oc_tf').html(), ',', ''));
            });
            oc_q_final.html(numberFormat(tot_q_, 2));
            oc_pt_final.html(numberFormat(tot_t_, 2));
            oc_vc_final.html(numberFormat(tot_vc_, 2));
            oc_vcd_final.html(numberFormat(tot_vcd_, 2));
            oc_imp_final.html(numberFormat(tot_imp_, 2));
            oc_st_final.html(numberFormat(tot_fin_, 2));
            oc_total.val(numberFormat(tot_fin_, 2));
        }

        $scope.showApprovalOC = function () {
            RESTService.get('registerOrdenCompras/getApprovers', oc_id, function (response) {
                if (!_.isUndefined(response.status) && response.status) {
                    _.each(response.data, function (d) {
                        var tr_ = $('<tr></tr>');
                        tr_.append('<td>' + d.name + '</td>');
                        tr_.append('<td>' + d.comment + '</td>');
                        tr_.append('<td class="text-center">' + d.date_reg + '</td>');
                        tr_.append('<td class="text-center">' + d.date_upd + '</td>');
                        tr_.append('<td class="text-center">' + d.state + '</td>');
                        oc_approvers.append(tr_);
                    });
                    modalApprovers.modal('show');
                } else {
                    $scope.showAlert('', response.message, 'warning');
                }
            });
        }

        var oc_con_s_ = '';
        var oc_con_s = $('input#oc_con_s');
        var oc_date_s_ = '';
        var oc_date_s = $('input#oc_date_s');
        generateDatePicker(oc_date_s);

        function showFilters() {
            oc_con_s.val(oc_con_s_);
            oc_date_s.val(oc_date_s_);
            modalFilter.modal('show');
        }
        $scope.resetFilter = function () {
            oc_con_s.val('');
            oc_date_s.val('');
        };
        $scope.saveFilter = function () {
            oc_con_s_ = oc_con_s.val();
            oc_date_s_ = oc_date_s.val();
            $("#LoadRecordsButtonArtSol").click();
            modalFilter.modal('hide');
        };

        function clearRowsOC() {
            $('.jtable-column-header-selecting input').prop('checked', false).iCheck('update');
            $('.jtable-row-selected').removeClass('jtable-row-selected');
        }
    }

    function Config($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('registerOrdenCompras', {
                url: '/registerOrdenCompras',
                templateUrl: base_url + '/templates/registerOrdenCompras/base.html',
                controller: 'RegisterOrdenCompraCtrl'
            });

        $urlRouterProvider.otherwise('/');
    }
})
();
