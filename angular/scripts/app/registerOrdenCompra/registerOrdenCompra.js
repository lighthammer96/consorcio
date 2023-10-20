(function () {
    'use strict';
    angular.module('sys.app.registerOrdenCompras')
        .config(Config)
        .controller('RegisterOrdenCompraCtrl', RegisterOrdenCompraCtrl);

    Config.$inject = ['$stateProvider', '$urlRouterProvider'];
    RegisterOrdenCompraCtrl.$inject = ['$scope', '_', 'RESTService'];

    function RegisterOrdenCompraCtrl($scope, _, RESTService)
    {
        moment.locale('es');
        var start = moment().startOf('month');
        var end = moment().endOf('month');

        var chk_date_range = $('#chk_date_range');
        chk_date_range.click(function () {
            $('#LoadRecordsButtonOC').click();
        });
        generateCheckBox('.chk_date_range_oc');

        var reqDates = $('#reqDates');

        var showDate = function (from, to) {
            start = from;
            end = to;
            reqDates.find('span').html(from.format('MMM D, YYYY') + ' - ' + to.format('MMM D, YYYY'));
            if (chk_date_range.prop('checked')) {
                $('#LoadRecordsButtonOC').click();
            }
        };
        generateDateRangePicker(reqDates, start, end, showDate);
        showDate(start, end);

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

        var modalProvider = $('#modalProvider');
        modalProvider.on('show.bs.modal', function (e) {
            $('#LoadRecordsButtonProv').click();
            modalOC.attr('style', 'display:block; z-index:2030 !important');
        });
        modalProvider.on('hidden.bs.modal', function (e) {
            $('#search_prov').val('');
            $('#LoadRecordsButtonProv').click();
            modalOC.attr('style', 'display:block; overflow-y: auto;');
        });

        var modalRegisterProvider = $('#modalRegisterProvider');
        modalRegisterProvider.on('show.bs.modal', function (e) {
            modalOC.attr('style', 'display:block; z-index:2030 !important');
        });
        modalRegisterProvider.on('hidden.bs.modal', function (e) {
            cleanProvider();
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
        // var oc_provider = $("select#oc_provider");
        var oc_provider_id = '';
        var oc_provider = $("input#oc_provider");
        var oc_provider_btn = $("button#oc_provider_btn");
        var oc_provider_btn_new = $("button#oc_provider_btn_new");
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

        var p_type_doc = $('select#p_type_doc');
        p_type_doc.change(function(e) {
            p_name.val('');
            p_lastname.val('');
            p_lastname2.val('');
            var type_doc_ = $(this).val();
            if(type_doc_ !== '06') {
                $('div.p_natural_person').removeClass('hide');
            } else {
                $('div.p_natural_person').addClass('hide');
            }
            e.preventDefault();
        });
        var p_document = $('input#p_document');
        p_document.keypress(function (e) {
            var code_ = (e.keyCode ? e.keyCode : e.which);
            if (parseInt(code_) === 13) {
                getPersonProvider();
            }
        });
        var p_type_prov = $('select#p_type_prov');
        var p_type_doc_sale = $('select#p_type_doc_sale');
        var p_rs = $('input#p_rs');
        var p_lastname = $('input#p_lastname');
        p_lastname.keyup(function () {
            setRSProvider();
        });
        var p_lastname2 = $('input#p_lastname2');
        p_lastname2.keyup(function () {
            setRSProvider();
        });
        var p_name = $('input#p_name');
        p_name.keyup(function () {
            setRSProvider();
        });
        var p_address = $('input#p_address');
        var p_contact = $('input#p_contact');
        var p_email = $('input#p_email');
        var p_cellphone = $('input#p_cellphone');
        var p_phone = $('input#p_phone');
        var p_department = $('select#p_department');
        p_department.change(function () {
            getProvince('', p_department.val());
        });
        var p_province = $('select#p_province');
        p_province.change(function () {
            getDistrict('', p_province.val());
        });
        var p_district = $('select#p_district');
        var p_ec = $('select#p_ec');
        var p_imp = $('input#p_imp');
        generateCheckBox('input#p_imp');
        var p_con = $('input#p_con');
        generateCheckBox('input#p_con');
        var p_act = $('input#p_act');
        generateCheckBox('input#p_act');

        function setRSProvider() {
            var name_ = p_name.val().toString().trim();
            var ln_ = p_lastname.val().toString().trim();
            var ln2_ = p_lastname2.val().toString().trim();
            razonsocial.val(ln_ + ' ' + ln2_ + ' ' + name_);
        }

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
            oc_date_required.val(date_now).prop('disabled', false);
            oc_state.val(1);
            oc_priority.val('').prop('disabled', false);
            oc_currency.val('1').prop('disabled', false);
            // oc_provider.val('').trigger('change').prop('disabled', false);
            oc_provider_id = '';
            oc_provider.val('');
            oc_provider_btn.prop('disabled', false);
            oc_provider_btn_new.prop('disabled', false);
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

            $('button.btn-approval, div.div-approval, button.btn-cancel, button.btn-close').addClass('hide');
        }

        function cleanProvider() {
            p_type_doc.val('01').trigger('change');
            p_document.val('');
            p_type_prov.val('').trigger('change');
            p_type_doc_sale.val('').trigger('change');
            p_rs.val('');
            p_address.val('');
            p_contact.val('');
            p_email.val('');
            p_cellphone.val('');
            p_phone.val('');
            p_department.val('').trigger('change');
            p_province.val('').trigger('change');
            p_ec.val('');
            p_imp.prop('checked', true).iCheck('update');
            p_con.prop('checked', true).iCheck('update');
            p_act.prop('checked', true).iCheck('update');

        }

        function getDataOC() {
            RESTService.all('registerOrdenCompras/data_form', '', function (response) {
                if (!_.isUndefined(response.status) && response.status) {
                    oc_consecutive.empty();
                    _.each(response.consecutive, function (con) {
                        oc_consecutive.append('<option value="' + con + '">' + con + '</option>');
                    });

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

                    _.each(response.type_doc, function (item) {
                        p_type_doc.append('<option value="' + item.Codigo + '">' + item.TipoDocumento + '</option>');
                    });

                    p_type_prov.html('<option value="">Seleccionar</option>');
                    _.each(response.type_prov, function (item) {
                        p_type_prov.append('<option value="' + item.id + '">' + item.descripcion + '</option>');
                    });

                    p_type_doc_sale.append('<option value="">Seleccionar</option>');
                    _.each(response.type_doc_sale, function (item) {
                        p_type_doc_sale.append('<option value="' + item.IdTipoDocumento + '">' + item.Descripcion + '</option>');
                    });

                    p_department.html('<option value="" >Seleccione</option>');
                    _.each(response.departments, function (item) {
                        p_department.append('<option value="' + item.cDepartamento + '">' + item.cDepartamento + '</option>');
                    });
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
                        'idProveedor': oc_provider_id,
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
                    // oc_provider.val(data_p.idProveedor).trigger('change').prop('disabled', disabled_);
                    oc_provider_id = data_p.idProveedor;
                    oc_provider.val(data_p.provider_);
                    oc_provider_btn.prop('disabled', disabled_);
                    oc_provider_btn_new.prop('disabled', disabled_);
                    oc_payment_condition.val(data_p.idcondicion_pago).prop('disabled', disabled_);
                    oc_address.val(data_p.direccionEntrega).prop('disabled', disabled_);
                    oc_comment.val(data_p.comentario).prop('disabled', disabled_);
                    oc_comment_approval.val(data_p.comentarioAprobacion);

                    var chk_igv = (parseInt(data_p.impuesto) === 1);
                    oc_is_igv.prop('checked', chk_igv).iCheck('update').prop('disabled', disabled_);

                    oc_per_disc_total.val(parseFloat(data_p.nPorcDescuento)).prop('disabled', disabled_);
                    oc_amount_disc_total.val(parseFloat(data_p.nDescuento)).prop('disabled', disabled_);
                    oc_total.val(numberFormat(data_p.total, 2));

                    oc_detail.empty();
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
                        if (oc_state_id === 5) {
                            $('button.btn-close').removeClass('hide');
                        } else if (oc_state_id === 2 || oc_state_id === 3) {
                            $('button.btn-cancel').removeClass('hide');
                        }
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
                table_container_oc.find('a.edit-oc').off().on('click', function (e) {
                    var id = $(this).attr('data-id');
                    findOC(id);
                    e.preventDefault();
                });
            }
        });

        generateSearchForm('frm-search-oc', 'LoadRecordsButtonOC', function () {
            table_container_oc.jtable('load', {
                search: $('#search_oc').val(),
                check: (chk_date_range.prop('checked')),
                from: start.format('YYYY-MM-DD'),
                to: end.format('YYYY-MM-DD')
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

        var search_prov = getFormSearch('frm-search-prov', 'search_prov', 'LoadRecordsButtonProv');

        var table_container_prov = $("#table_container_prov");

        table_container_prov.jtable({
            title: "Lista de Proveedores",
            paging: true,
            actions: {
                listAction: base_url + '/registerOrdenCompras/listProvider'
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
                type_doc: {
                    title: 'Tipo Documento'
                },
                type_prov: {
                    title: 'Tipo Proveedor'
                },
                type_doc_v: {
                    title: 'Tipo Documento Venta'
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
                correo_electronico: {
                    title: 'Correo',
                },
                celular: {
                    title: 'Celular',
                },
                district: {
                    title: 'Distrito'
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
                        oc_provider_id = info.id;
                        oc_provider.val(info.documento + ' ' + info.razonsocial);
                    }
                    modalProvider.modal('hide');
                    e.preventDefault();
                });
            }
        });

        generateSearchForm('frm-search-prov', 'LoadRecordsButtonProv', function () {
            table_container_prov.jtable('load', {
                search: $('#search_prov').val(),
                active: true
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

        $scope.cancelOC = function () {
            $scope.showConfirm('', '¿Está seguro que desea cancelar la Orden de Compra?', function () {
                RESTService.updated('registerOrdenCompras/cancel', oc_id, {}, function (response) {
                    if (!_.isUndefined(response.status) && response.status) {
                        $scope.showAlert('', 'La Orden de compra se canceló correctamente.', 'success');
                        modalOC.modal('hide');
                        $('#LoadRecordsButtonOC').click();
                    } else {
                        $scope.showAlert('', response.message, 'warning');
                    }
                });
            });
        };

        $scope.closeOC = function () {
            $scope.showConfirm('', '¿Está seguro que desea cerrar la Orden de Compra?', function () {
                RESTService.updated('registerOrdenCompras/close', oc_id, {}, function (response) {
                    if (!_.isUndefined(response.status) && response.status) {
                        $scope.showAlert('', 'La Orden de compra se cerró correctamente.', 'success');
                        modalOC.modal('hide');
                        $('#LoadRecordsButtonOC').click();
                    } else {
                        $scope.showAlert('', response.message, 'warning');
                    }
                });
            });
        };

        $scope.openProvider = function () {
            modalProvider.modal('show');
        };
        $scope.newProvider = function () {
            modalRegisterProvider.modal('show');
        };
        function getPersonProvider() {
            RESTService.get('registerOrdenCompras/getProviderPerson', p_document.val(), function (response) {
                if (!_.isUndefined(response.status) && response.status) {
                    var data_ = response.data;
                    if (data_.length === 0) {
                        getDataProvider();
                    } else {
                        data_ = data_[0];
                        p_type_doc.val(data_.cTipodocumento).trigger('change');
                        p_document.val(data_.cNumerodocumento);

                        var rs_ = data_.cRazonsocial;
                        if (rs_.length === 0 || rs_ === '') {
                            p_rs.val(data_.cNombrePersona);
                        } else {
                            p_rs.val(rs_);
                        }
                        p_address.val(data_.cDireccion);
                        p_email.val(data_.cEmail);
                        p_cellphone.val(data_.cCelular);
                        p_ec.val(data_.cEstadoCivil);

                        p_department.val(data_.cDepartamento);
                        getProvince(data_.cProvincia, data_.cDepartamento);
                        getDistrict(data_.cCodUbigeo, data_.cProvincia);

                        p_name.val(data_.cNombres);
                        p_lastname.val(data_.cApepat);
                        p_lastname2.val(data_.cApemat);
                    }
                } else {
                    $scope.showAlert('', response.message, 'warning');
                }
            });
        }
        function getDataProvider() {
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (parseInt(this.readyState) === 4 && parseInt(this.status) === 200) {
                    var data = JSON.parse(this.responseText);
                    if (!_.isNull(data.nombres)) {
                        p_rs.val(data.nombres + ' ' + data.apellidoPaterno + ' ' + data.apellidoMaterno);
                        p_name.val(data.nombres);
                        p_lastname.val(data.apellidoPaterno);
                        p_lastname2.val(data.apellidoMaterno);
                    } else if (!_.isNull(data.razonSocial)) {
                        p_rs.val(data.razonSocial);
                        p_address.val(data.direccion);
                    } else {
                        p_rs.val('');
                        p_address.val('');
                        $scope.showAlert('', 'No se encontró datos del cliente', 'warning');
                    }
                }
            }
            if (p_type_doc.val() === '01') {
                if (p_document.val().length === 8) {
                    xhttp.open("GET", "https://dniruc.apisperu.com/api/v1/dni/" + p_document.val() +
                        "?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6InJleXNhbmdhbWE3QGdtYWlsLmNvbSJ9." +
                        "hfobQC8FM5IyKKSaa7usUXV0aY1Y8YthAhdN8LoMlMM", true);
                    xhttp.setRequestHeader("Content-type", "application/json");
                    xhttp.send();
                } else {
                    $scope.showAlert('', 'Dígitos del documento incompletos', 'warning');
                    p_rs.val('');
                    p_address.val('');
                }
            } else {
                if (p_document.val().length === 11) {
                    xhttp.open("GET", "https://dniruc.apisperu.com/api/v1/ruc/" + p_document.val() +
                        "?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6InJleXNhbmdhbWE3QGdtYWlsLmNvbSJ9." +
                        "hfobQC8FM5IyKKSaa7usUXV0aY1Y8YthAhdN8LoMlMM", true);
                    xhttp.setRequestHeader("Content-type", "application/json");
                    xhttp.send();
                } else {
                    $scope.showAlert('', 'Dígitos del documento incompletos', 'warning');
                    p_rs.val('');
                    p_address.val('');
                }
            }
        }

        function getProvince(p_id, region_id) {
            p_province.html('<option value="">Seleccione</option>');
            if (region_id !== '') {
                RESTService.get('registerOrdenCompras/getProvinces', region_id, function (response) {
                    if (!_.isUndefined(response.status) && response.status) {
                        _.each(response.data, function (item) {
                            var selected_ = (item.cProvincia === p_id) ? 'selected' : '';
                            p_province.append('<option value="' + item.cProvincia + '" ' + selected_ + '>' +
                                item.cProvincia + '</option>');

                        });
                    } else {
                        $scope.showAlert('', response.warning, 'warning');
                    }
                });
            }
        }
        function getDistrict(d_id, province_id) {
            p_district.html('<option value="">Seleccione</option>');
            if (province_id !== '') {
                RESTService.get('registerOrdenCompras/getDistricts', province_id, function (response) {
                    if (!_.isUndefined(response.status) && response.status) {
                        _.each(response.data, function (item) {
                            var selected_ = (item.cCodUbigeo === d_id) ? 'selected' : '';
                            p_district.append('<option value="' + item.cCodUbigeo + '" ' + selected_ + '>' +
                                item.cDistrito + '</option>');
                        });
                    } else {
                        $scope.showAlert('', response.warning, 'warning');
                    }
                });
            }
        }

        $scope.saveProvider = function () {
            var b_val = true;
            b_val = b_val && p_type_doc.required();
            b_val = b_val && p_document.required();
            b_val = b_val && p_type_prov.required();
            b_val = b_val && p_type_doc_sale.required();
            if(p_type_doc.val() === '01' && p_document.val().length !== 8){
                $scope.showAlert('', 'Longitud de LE/DNI INCORRECTA', 'warning');
                return;
            }
            if(p_type_doc.val() === '06' && p_document.val().length !== 11){
                $scope.showAlert('', 'Longitud de RUC INCORRECTA', 'warning');
                return;
            }
            if(p_type_doc.val() === '01' && p_type_doc_sale.val() === '01'){
                $scope.showAlert('', 'Tipo de documento del proveedor debe ser R.U.C para el tipo documento venta ' +
                    'factura', 'warning');
                return;
            }
            if (p_type_doc.val() === '01') {
                b_val = b_val && p_lastname.required();
                b_val = b_val && p_lastname2.required();
                b_val = b_val && p_name.required();
            }
            b_val = b_val && p_rs.required();
            b_val = b_val && p_cellphone.required();
            b_val = b_val && p_district.required();
            if (b_val) {
                var params = {
                    'tipodoc': p_type_doc.val(),
                    'documento': p_document.val(),
                    'id_tipoProveedor': p_type_prov.val(),
                    'IdTipoDocumento': p_type_doc_sale.val(),
                    'razonsocial': p_rs.val(),
                    'direccion': p_address.val(),
                    'contacto': p_contact.val(),
                    'correo_electronico': p_email.val(),
                    'celular': p_cellphone.val(),
                    'telefono': p_phone.val(),
                    'distrito': p_district.val(),
                    'cEstadoCivil': p_ec.val(),
                    'impuesto': (p_imp.prop('checked')) ? 'S' : 'N',
                    'congelado': (p_con.prop('checked')) ? 'S' : 'N',
                    'activo': (p_act.prop('checked')) ? 'S' : 'N',
                    'nombresP': p_name.val(),
                    'apellidopP': p_lastname.val(),
                    'apellidomP': p_lastname2.val(),
                    'idarray': '',
                    'idBanco_array': '',
                    'idBancoDescripcion_array': '',
                    'idMoneda_array': '',
                    'nrocuenta_array': '',
                };
                RESTService.updated('registerOrdenCompras/saveProvider', 0, params, function (response) {
                    if (!_.isUndefined(response.status) && response.status) {
                        oc_provider_id = response.id;
                        oc_provider.val(p_document.val() + ' ' + p_rs.val());
                        $scope.showAlert('', 'El proveedor se guardó correctamente', 'success');
                        modalRegisterProvider.modal('hide');
                    } else {
                        $scope.showAlert('', response.warning, 'warning');
                    }
                });
            }
        };

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
