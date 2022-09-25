/**
 * Created by JAIR on 4/17/2017.
 */
(function () {
    'use strict';
    angular.module('sys.app.quotations')
        .config(Config)
        .controller('QuotationCtrl', QuotationCtrl);

    Config.$inject = ['$stateProvider', '$urlRouterProvider'];
    QuotationCtrl.$inject = ['$scope', '_', 'RESTService', 'AlertFactory'];

    function QuotationCtrl($scope, _, RESTService, AlertFactory) {
        moment.locale('es');

        var start = moment().startOf('month');
        var end = moment().endOf('month');

        var chk_date_range = $('#chk_date_range');
        chk_date_range.click(function () {
            $('#LoadRecordsButtonQ').click();
        });
        generateCheckBox('#chk_date_range');

        var modalQ;
        var modalRequirementQuotation;
        var modalProviderListContest;
        var modalItemProviderListContest;
        var modalPr;
        var modalC;
        var titleQ;
        var reqDates = $('#reqDates');
        var quo_states;
        var q_requirement_modified = false;

        var q_id = 0;
        var q_description;
        var q_user_request;
        var q_date_request;
        var q_show_req;
        var q_body_requirements;
        var q_body_requirements_consolidated;
        var q_show_buttons_consolidated;

        var q_p_id = 0;
        var q_body_quotations_providers;
        var q_p_number;
        var q_p_date_emission;
        var q_p_delivery_days;
        var q_p_delivery_date;
        var q_p_file_add;
        var q_p_file_provider;
        var q_p_provider_id = '';
        var q_p_ruc;
        var q_p_business_name;
        var q_p_payment_advance;
        var q_p_address_provider;
        var q_p_date_send;
        var q_p_contact;
        var q_p_contact_phone;
        var q_p_payment_condition;
        var q_data_payment_condition = [];
        var q_p_currency;
        var q_data_currency = [];
        var q_p_default_currency = '';
        var q_p_user_request;
        var q_p_date_request;

        var q_percentage_igv = 0;
        var q_change_today = 0;
        var q_p_subtotal;
        var q_p_igv_percentage;
        var q_p_igv;
        var q_p_igv_checked;
        var q_p_total;
        var q_p_subtotal_local;
        var q_p_igv_local;
        var q_p_total_local;
        var q_p_subtotal_dollar;
        var q_p_igv_dollar;
        var q_p_total_dollar;
        var q_p_table_items_provider;
        var c_c_requirement_detail;
        var c_c_contest_id;
        var c_c_quotations_detail;
        var c_c_quotations_head;
        var contest_provider_id = [];

        var date_now = moment.tz('America/Lima').format('DD/MM/YYYY');

        function cleanQuotation() {
            cleanRequired();
            titleQ.empty();
            q_id = 0;
            q_description.val('');
            q_user_request.val(user_default);
            q_date_request.val(date_now);
            q_show_req.addClass('hide');
            q_body_requirements.empty();
            q_body_requirements_consolidated.empty();
            q_show_buttons_consolidated.addClass('hide');
            arr_det_req_con = [];
            activeTab('tab1');

            q_body_quotations_providers.empty();
            cleanQuotationProvider();
            q_requirement_modified = false;
        }

        function cleanQuotationProvider() {
            cleanBorderRequired();
            q_p_id = 0;
            q_p_payment_condition.val('');
            q_p_currency.val(q_p_default_currency);
            q_p_date_emission.val(date_now);
            q_p_number.val('');
            q_p_delivery_days.val('');
            q_p_delivery_date.val('');
            q_p_file_add.val('');
            q_p_file_provider = '';
            q_p_ruc.val('');
            q_p_business_name.val('');
            q_p_payment_advance.val('');
            q_p_address_provider.val('');
            q_p_date_send.val('');
            q_p_contact.val('');
            q_p_contact_phone.val('');
            q_p_provider_id = '';
            q_p_user_request.val(user_default);
            q_p_date_request.val(date_now);
            q_p_subtotal.val('');
            q_p_igv.val('');
            q_p_igv_checked.prop('checked', true).iCheck('update');
            q_p_total.val('');
            q_p_subtotal_local.val('');
            q_p_igv_local.val('');
            q_p_total_local.val('');
            q_p_subtotal_dollar.val('');
            q_p_igv_dollar.val('');
            q_p_total_dollar.val('');
            q_p_table_items_provider.empty();
            activeTab('tab11');
            arr_det_item_con = [];
            cont_detail = 1;
        }

        function cleanCompareQuotations() {
            c_c_contest_id.val('');
            c_c_quotations_head.empty();
            c_c_requirement_detail.empty();
            c_c_quotations_detail.empty();
        }

        $scope.addDetailRequirement = function () {
            var $selectedRows = $("#table_container_rc").jtable('selectedRows');
            if ($selectedRows.length > 0) {
                $selectedRows.each(function () {
                    var record = $(this).data('record');
                    validItemRequirementDetail(record, true);
                });
                modalRequirementQuotation.modal('hide');
            } else {
                AlertFactory.textType({
                    title: '',
                    message: 'Debe seleccionar al menos un requerimiento a asignar.',
                    type: 'warning'
                });
                return false;
            }
            clearRowsAR();
        };

        $scope.addDetailItem = function () {
            var $selectedRows = $("#table_container_item_provider_contest").jtable('selectedRows');
            if ($selectedRows.length > 0) {
                $selectedRows.each(function () {
                    var record = $(this).data('record');
                    validItemToProviderQuotation(record);
                });
                modalItemProviderListContest.modal('hide');
            } else {
                AlertFactory.textType({
                    title: '',
                    message: 'Debe seleccionar al menos un requerimiento a asignar.',
                    type: 'warning'
                });
                return false;
            }
            clearRowsAR();
        };

        function getDataQuotations() {
            quo_states = $('#quo_states');
            quo_states.empty().change(function () {
                $('#LoadRecordsButtonQ').click();
            });
            RESTService.all('contests/data_form', '', function (response) {
                if (!_.isUndefined(response.status) && response.status) {
                    _.each(response.states, function (item) {
                        quo_states.append('<option value="' + item.Value + '">' + item.DisplayText + '</option>');
                    });
                    generateSearchContest();
                    q_data_payment_condition = response.payment_conditions;
                    q_data_currency = response.currency;
                    q_percentage_igv = response.igv;
                    q_change_today = response.change;
                    if (!response.change_status) {
                        AlertFactory.showWarning({
                            title: '',
                            message: 'No se ha detectado un tipo de cambio con la fecha de hoy. ' +
                            'Por favor dirigete al módulo de Tipo de Cambio para registrarlo, de lo contrario ' +
                            'se usuará una con la fecha más reciente.'
                        });
                    }
                }
            }, function () {
                getDataQuotations();
            });
        }

        var showDate = function (from, to) {
            start = from;
            end = to;
            reqDates.find('span').html(from.format('MMM D, YYYY') + ' - ' + to.format('MMM D, YYYY'));
            if (chk_date_range.prop('checked')) {
                $('#LoadRecordsButtonQ').click();
            }
        };
        generateDateRangePicker(reqDates, start, end, showDate);
        showDate(start, end);

        function overModals() {
            if (!call_m) {
                modalQ = $('#modalQ');
                modalRequirementQuotation = $('#modalRequirementQuotation');
                modalProviderListContest = $('#modalProviderListContest');
                modalItemProviderListContest = $('#modalItemProviderListContest');
                modalPr = $('#modalProviders');
                modalC = $('#modalC');
                titleQ = $('#title-quo');

                q_description = $('#q_description');
                q_show_req = $('#q_show_req');
                q_body_requirements = $('#q_body_requirements');
                q_body_requirements_consolidated = $('#q_body_requirements_consolidated');
                q_show_buttons_consolidated = $('.show_buttons_consolidated');
                q_user_request = $('#q_user_request');
                q_user_request.val(user_default);
                q_date_request = $('#q_date_request');
                q_date_request.val(date_now);
                c_c_requirement_detail = $("#c_c_requirement_detail");
                c_c_contest_id = $('#c_c_contest_id');
                c_c_quotations_detail = $("#c_c_quotations_detail");
                c_c_quotations_head = $("#c_c_quotations_head");

                q_body_quotations_providers = $('#q_body_quotations_providers');
                q_p_number = $('#q_p_number');
                q_p_date_emission = $('#q_p_date_emission');
                q_p_date_emission.val(date_now);
                q_p_delivery_days = $('#q_p_delivery_days');
                q_p_delivery_date = $('#q_p_delivery_date');
                q_p_file_add = $('#q_p_file_add');
                q_p_file_add.fileinput({
                    language: "es",
                    uploadUrl: base_url + '/contests/uploadProvider',
                    uploadAsync: true,
                    showUpload: false
                }).on("filebatchselected", function (event, files) {
                    q_p_file_provider = '';
                    q_p_file_add.fileinput("upload");
                }).on('fileuploaded', function (event, data, id, index) {
                    if (!_.isUndefined(data.response.status) && data.response.status) {
                        var file_name = data.response.uploaded;
                        q_p_file_provider = file_name;
                        $('.file-caption-name').attr('title', file_name)
                            .html('<i class="glyphicon glyphicon-file kv-caption-icon"></i> ' + file_name);
                    }
                }).on('filecleared', function (event) {
                    q_p_file_provider = '';
                }).on('fileuploaderror', function (event, data, msg) {
                    setTimeout(function () {
                        $('.kv-upload-progress').find('.progress-bar').removeClass('progress-bar-success')
                            .addClass('progress-bar-danger').html(data.response.error);
                    }, 200);
                });
                q_p_delivery_date.datepicker({
                    changeMonth: true,
                    changeYear: true,
                    dateFormat: 'dd/mm/yy',
                    beforeShow: function () {
                        setTimeout(function () {
                            $('.ui-datepicker').css('z-index', 2052);
                        });
                    }
                });
                generateDatePicker(q_p_delivery_date);

                q_p_user_request = $('#q_p_user_request');
                q_p_user_request.val(user_default);
                q_p_date_request = $('#q_p_date_request');
                q_p_date_request.val(date_now);
                q_p_payment_condition = $('#q_p_payment_condition');
                q_p_payment_condition.empty();
                q_p_currency = $('#q_p_currency');
                q_p_currency.empty();
                q_p_subtotal = $('#q_p_subtotal');
                q_p_igv_percentage = $('#q_p_igv_percentage');
                q_p_igv_percentage.val(q_percentage_igv);
                q_p_igv = $('#q_p_igv');
                q_p_igv_checked = $('#q_p_igv_checked');
                q_p_igv_checked.click(function () {
                    calculateTotalQuotation();
                });
                generateCheckBox('#q_p_igv_checked');
                q_p_total = $('#q_p_total');
                q_p_subtotal_local = $('#q_p_subtotal_local');
                q_p_igv_local = $('#q_p_igv_local');
                q_p_total_local = $('#q_p_total_local');
                q_p_subtotal_dollar = $('#q_p_subtotal_dollar');
                q_p_igv_dollar = $('#q_p_igv_dollar');
                q_p_total_dollar = $('#q_p_total_dollar');
                _.each(q_data_payment_condition, function (item) {
                    q_p_payment_condition.append('<option value="' + item.Value + '">' + item.DisplayText + '</option>');
                });
                _.each(q_data_currency, function (item, idx) {
                    if (idx === 0) {
                        q_p_default_currency = item.Value;
                    }
                    q_p_currency.append('<option value="' + item.Value + '">' + item.DisplayText + '</option>');
                });
                q_p_currency.change(function () {
                    calculateTotalsChange(0);
                });
                q_p_ruc = $('#q_p_ruc');
                q_p_business_name = $('#q_p_business_name');
                q_p_payment_advance = $('#q_p_payment_advance');
                q_p_address_provider = $('#q_p_address_provider');
                q_p_date_send = $('#q_p_date_send');
                generateDatePicker(q_p_date_send);
                q_p_contact = $('#q_p_contact');
                q_p_contact_phone = $('#q_p_contact_phone');

                q_p_table_items_provider = $('#q_p_table_items_provider');

                modalQ.on('hidden.bs.modal', function (e) {
                    cleanQuotation();
                });
                // modalQ.on('show.bs.modal', function (e) {
                //     $('#show_loading').addClass('hide');
                //     getSerial(function () {
                //         $('#show_loading').removeClass('hide');
                //     });
                // });
                //

                modalRequirementQuotation.on('hidden.bs.modal', function (e) {
                    modalQ.attr('style', 'display:block;');
                    $('#search_rq').val('');
                    $('#LoadRecordsButtonRC').click();
                });
                modalRequirementQuotation.on('show.bs.modal', function (e) {
                    $('#LoadRecordsButtonRC').click();
                    modalQ.attr('style', 'display:block; z-index:2030 !important');
                });

                modalPr.on('hidden.bs.modal', function (e) {
                    modalQ.attr('style', 'display:block;');
                    cleanQuotationProvider();
                });
                modalPr.on('show.bs.modal', function (e) {
                    calculateTotalQuotation();
                    modalQ.attr('style', 'display:block; z-index:2030 !important');
                });

                modalProviderListContest.on('hidden.bs.modal', function (e) {
                    modalPr.attr('style', 'display:block;');
                    $('#search_pc').val('');
                    $('#LoadRecordsButtonPC').click();
                });
                modalProviderListContest.on('show.bs.modal', function (e) {
                    $('#LoadRecordsButtonPC').click();
                    modalPr.attr('style', 'display:block; z-index:2031 !important');
                });

                modalItemProviderListContest.on('hidden.bs.modal', function (e) {
                    modalPr.attr('style', 'display:block;');
                    $('#search_ipc').val('');
                    $('#LoadRecordsButtonIPC').click();
                });
                modalItemProviderListContest.on('show.bs.modal', function (e) {
                    $('#LoadRecordsButtonIPC').click();
                    modalPr.attr('style', 'display:block; z-index:2031 !important');
                });
                modalC.on('hidden.bs.modal', function (e) {
                    cleanCompareQuotations();
                });
                callModals();
            }
        }

        function newQuotation() {
            overModals();
            modalQ.modal('show');
            titleQ.html('Nuevo Concurso');
        }

        $scope.saveQuotation = function () {
            var bval = true;
            bval = bval && q_description.required();
            if (bval && q_body_requirements.html() === '') {
                AlertFactory.showWarning({
                    title: '',
                    message: 'Debe seleccionar el(los) requerimiento(s) del concurso'
                });
                return false;
            }
            if (bval) {
                var req_cont_id = [];
                _.each($('.rowReqContest'), function (item) {
                    var _id = $(item).attr('data-id');
                    req_cont_id.push(_id);
                });
                var params = {
                    'description': q_description.val(),
                    'requirements': req_cont_id.join('-')
                };
                RESTService.updated('contests/save', q_id, params, function (response) {
                    if (!_.isUndefined(response.status) && response.status) {
                        AlertFactory.textType({
                            title: '',
                            message: 'El concurso se guardó correctamente.',
                            type: 'success'
                        });
                        // modalQ.modal('hide');
                        titleQ.html('Editar Concurso');
                        q_id = response.id;
                        $('#LoadRecordsButtonQ').click();
                        q_requirement_modified = false;
                    } else {
                        AlertFactory.textType({
                            title: '',
                            message: 'Hubo un error al guardar el concurso. Intente nuevamente.',
                            type: 'error'
                        });
                    }
                });
            }
        };

        $scope.saveQuotationProvider = function () {
            var bval = true;
            if (q_p_provider_id === '') {
                activeTab('tab12');
                q_p_ruc.addClass('border-red').focus();
                return false;
            }
            cleanBorderRequired();
            var detail_items_ = $('.rowItemQuotation');
            _.each(detail_items_, function (item) {
                var code_ = $(item).attr('data-id');
                bval = bval && $('#item_q' + code_).required();
                bval = bval && $('#quantity_q' + code_).required();
                bval = bval && $('#price_q' + code_).required();
                bval = bval && $('#discount_p_q' + code_).required();
                bval = bval && $('#discount_q' + code_).required();
                if (!bval) {
                    activeTab('tab13');
                }
            });
            if (bval) {
                var codes_ = [], description_ = [], quantity_ = [], price_ = [], discount_p_ = [], discount_ = [];
                _.each(detail_items_, function (item) {
                    var code_ = $(item).attr('data-id');
                    // console.log('ver:' + code_);
                    codes_.push(code_);
                    description_.push($('#item_q' + code_).val());
                    quantity_.push($('#quantity_q' + code_).val());
                    price_.push($('#price_q' + code_).val());
                    discount_p_.push($('#discount_p_q' + code_).val());
                    discount_.push($('#discount_q' + code_).val());
                });
                var params = {
                    'contest_id': q_id,
                    'number': q_p_number.val(),
                    'delivery_days': q_p_delivery_days.val(),
                    'file': q_p_file_provider,
                    'provider_id': q_p_provider_id,
                    'payment_condition_id': q_p_payment_condition.val(),
                    'payment_advance': q_p_payment_advance.val(),
                    'delivery_date': q_p_delivery_date.val(),
                    'shipping_date': q_p_date_send.val(),
                    'currency_id': q_p_currency.val(),
                    'is_igv': (q_p_igv_checked.prop('checked')) ? 1 : 0,
                    'item_code': codes_.join('-'),
                    'item_description': description_.join('_/-/_'),
                    'item_quantity': quantity_.join('-'),
                    'item_price': price_.join('-'),
                    'item_percentage': discount_p_.join('-'),
                    'item_discount': discount_.join('-')
                };
                console.log('xx:' + q_p_id);
                RESTService.updated('contests/saveProvider', q_p_id, params, function (response) {
                    if (!_.isUndefined(response.status) && response.status) {
                        AlertFactory.textType({
                            title: '',
                            message: 'La cotización del proveedor se guardó correctamente.',
                            type: 'success'
                        });
                        loadQuotationProvider(q_id);
                        modalPr.modal('hide');
                    } else {
                        AlertFactory.textType({
                            title: '',
                            message: 'Hubo un error al guardar la cotización del proveedor. Intente nuevamente.',
                            type: 'error'
                        });
                    }
                });
            }
        };

        $scope.openRequirements = function () {
            $('#LoadRecordsButtonRC').click();
            modalRequirementQuotation.modal('show');
        };

        $scope.openProvider = function () {
            if (q_id === 0 || q_requirement_modified) {
                AlertFactory.showWarning({
                    title: '',
                    message: 'Debe guardar el concurso para poder agregar cotizaciones'
                });
                return false;
            }
            overModals();
            modalPr.modal('show');
        };

        $scope.openListProvidersContest = function () {
            modalProviderListContest.modal('show');
        };

        function findContest(id) {
            overModals();
            titleQ.html('Editar Concurso');
            RESTService.get('contests/find', id, function (response) {
                if (!_.isUndefined(response.status) && response.status) {
                    var data_c = response.data;
                    q_id = data_c.id;
                    q_description.val(data_c.description);
                    q_user_request.val(data_c.requested_by);
                    q_date_request.val(data_c.date);
                    _.each(data_c.requirements, function (item) {
                        validItemRequirementDetail(item, false);
                    });
                    loadQuotationProvider(q_id);

                    q_requirement_modified = false;
                    if (!modalQ.hasClass('in')) {
                        modalQ.modal('show');
                    }
                } else {
                    AlertFactory.textType({
                        title: '',
                        message: 'Hubo un error al obtener el concurso. Intente nuevamente.',
                        type: 'error'
                    });
                }
            });
        }

        function compareContest(id) {
            overModals();
            RESTService.get('contests/find', id, function (response) {
                if (!_.isUndefined(response.status) && response.status) {
                    var data_c = response.data;
                    c_c_contest_id.val(data_c.id);
                    _.each(data_c.requirements, function (item) {
                        loadItemRequirementDetailCompare(item);
                    });
                    loadQuotationProviderCompare(data_c.id, function () {
                        getConsolidatedRequirementsCompare(data_c.id);
                    });
                    modalC.modal('show');
                } else {
                    AlertFactory.textType({
                        title: '',
                        message: 'Hubo un error al obtener el concurso. Intente nuevamente.',
                        type: 'error'
                    });
                }
            });
        }

        function loadItemRequirementDetailCompare(row) {
            var tr = $('<tr class="row_c_requirement" data-id="' + row.id + '"></tr>');
            var td1 = $('<td class="text-center">' + row.code + '</td>');
            var td2 = $('<td class="text-center">' + row.date_registration + '</td>');
            var td3 = $('<td>' + row.project_description + '</td>');
            var td4 = $('<td>' + row.requested_by + '</td>');
            tr.append(td1).append(td2).append(td3).append(td4);
            c_c_requirement_detail.append(tr);
        }

        function loadQuotationProviderCompare(contest_id, callback) {
            RESTService.get('contests/quotationsProviders', contest_id, function (response) {
                if (!_.isUndefined(response.status) && response.status) {
                    c_c_quotations_head.empty();
                    var size_data = (response.data.length) * 4;
                    var tr = $('<tr class="text-center"></tr>');
                    var td_1 = $('<th colspan="2" rowspan="2">CONSOLIDADO DE REQUERIMIENTOS</th>');
                    var td_2 = $('<th class="text-center" colspan="' + size_data + '">PROVEEDORES</th>');
                    var tr1 = $('<tr class="text-center"></tr>');
                    var tr2 = $('<tr></tr>');
                    var tdp_1 = $('<th class="text-center">ARTICULO</th>');
                    var tdp_2 = $('<th class="text-center">CANTIDAD TOTAL</th>');
                    tr2.append(tdp_1).append(tdp_2);
                    _.each(response.data, function (item) {
                        var td1_1 = $('<th  class="text-center c_contest_provider" data-id="' + item.id + '"' +
                            ' colspan="4">' + item.description + '</th>');
                        var td2_1 = $('<th class="text-right">CANTIDAD</th>');
                        var td2_2 = $('<th class="text-right" style="">PRECIO</th>');
                        var td2_3 = $('<th class="text-right" colspan="2">TOTAL</th>');
                        tr1.append(td1_1);
                        tr2.append(td2_1).append(td2_2).append(td2_3);
                    });
                    tr.append(td_1).append(td_2);
                    c_c_quotations_head.append(tr).append(tr1).append(tr2);
                    if (_.isFunction(callback)) {
                        callback();
                    }
                }
            });

        }


        function getConsolidatedRequirementsCompare(contest_id) {
            var req_cont_id = [];
            var dat_article = [];
            _.each($('.row_c_requirement'), function (item) {
                var _id = $(item).attr('data-id');
                req_cont_id.push(_id);
            });
            _.each($('.c_consolidated_article'), function (item) {
                var _id = $(item).attr('data-id');
                dat_article.push(_id);
            });

            console.log(dat_article);
            var params = 'params_all=' + req_cont_id.join('-') + ',' + contest_id;

            var td5_, td6_, td7_, tdc1, td_detail = '', table = '';

            RESTService.all('contests/consolidatedRequirementDetail', params, function (response) {
                if (!_.isUndefined(response.status) && response.status) {
                    c_c_quotations_detail.empty();
                    var data_consolidated = response.data.product_consolidated;
                    $.each(data_consolidated, function (idx, item) {
                        var data_detail = item.detail;
                        table += '<tr class="c_consolidated_article" data-id="' + item.id + '">';
                        table += '<td>' + item.description + '</td>';
                        table += '<td>' + (parseFloat(item.quantity)).toFixed(2) + '</td>';
                        table += '<tr>';
                        $.each(data_detail, function (idx, item) {

                        });
                        // var tr_ = $('<tr class="c_consolidated_article" data-id="' + item.id + '"></tr>');
                        // var td2_ = $('<td>' + item.description + '</td>');
                        // var td4_ = $('<td class="text-right" >' + (parseFloat(item.quantity)).toFixed(2) + '</td>');
                        // //detail
                        // var data_detail = item.detail;
                        // // console.log(data_detail);
                        // $.each(data_detail, function (idx, item) {
                        //     td5_ = $('<td class="text-right" >0</td>');
                        //     td6_ = $('<td class="text-right" ><input type="text" value="0" class="text-right"></td>');
                        //     td7_ = $('<td class="text-right" >40</td>');
                        //     tdc1 = $('<td><input type="checkbox"></td>');
                        //     td_detail.append(td5_).append(td6_).append(td7_).append(tdc1);
                        //
                        // });
                        // //detail
                        // tr_.append(td2_).append(td4_);
                    });
                    c_c_quotations_detail.append(table);
                }
            });
        }

        // function detail_contest_provider(contest_id) {
        //     var dat_provider = [];
        //     var dat_article = [];
        //     _.each($('.c_contest_provider'), function (item) {
        //         var _id = $(item).attr('data-id');
        //         dat_provider.push(_id);
        //     });
        //     _.each($('.c_consolidated_article'), function (item) {
        //         var _id = $(item).attr('data-id');
        //         dat_article.push(_id);
        //     });
        //     console.log(dat_article);
        //     RESTService.get('contests/detailContestProvider', contest_id, function (response) {
        //         if (!_.isUndefined(response.status) && response.status) {
        //             $.each(response.data, function (idx, item) {
        //                 // var tr_ = $('<tr class="c_consolidated_article" data-id="' + item.id + '"></tr>');
        //                 // var td2_ = $('<td>' + item.description + '</td>');
        //                 // var td4_ = $('<td class="text-right" >' + (parseFloat(item.quantity)).toFixed(2) + '</td>');
        //                 // tr_.append(td2_).append(td4_);
        //                 // c_c_quotations_detail.append(tr_);
        //             });
        //         }
        //     });
        // }

        var search = getFormSearch('frm-search-q', 'search_q', 'LoadRecordsButtonQ');

        var states = '<select id="quo_states" class="search_input"></select>';

        var table_container_q = $("#table_container_q");

        table_container_q.jtable({
            title: "Lista de Concursos",
            paging: true,
            sorting: true,
            actions: {
                listAction: base_url + '/contests/list',
                deleteAction: base_url + '/contests/delete'
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
                        var data_excel = {
                            search: $('#search_q').val(),
                            check: (chk_date_range.prop('checked')),
                            from: start.format('YYYY-MM-DD'),
                            to: end.format('YYYY-MM-DD'),
                            state: quo_states.val()
                        };
                        $scope.openDoc('contests/excel', data_excel);
                    }
                }, {
                    cssClass: 'btn-success',
                    text: '<i class="fa fa-plus"></i> Nuevo Concurso',
                    click: function () {
                        newQuotation();
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
                    title: 'Concurso',
                    listClass: 'text-center',
                    width: '5%'
                },
                description: {
                    title: 'Descripción',
                    width: '30%'
                },
                requested_by: {
                    title: 'Solicitado por',
                    list: show_list_
                },
                date: {
                    title: 'Fecha de Emisión',
                    list: show_list_,
                    listClass: 'text-center'
                },
                state_desc: {
                    title: 'Estado',
                    list: show_list_
                },
                cuadro: {
                    width: '1%',
                    sorting: false,
                    edit: false,
                    create: false,
                    display: function (data) {
                        return '<a href="javascript:void(0)" title="Cuadro Comparativo" class="compare_contest" data-code="' +
                            data.record.id + '"><i class="fa fa-list-alt fa-1-5x"></i></a>';
                    }
                },
                edit: {
                    width: '1%',
                    sorting: false,
                    edit: false,
                    create: false,
                    display: function (data) {
                        return '<a data-target="#" title="Editar" class="edit_contest" data-code="' +
                            data.record.id + '"><i class="fa fa-pencil-square-o fa-1-5x fa-green"></i></a>';
                    }
                }
            },
            recordsLoaded: function (event, data) {
                $('.compare_contest').click(function (e) {
                    var id = $(this).attr('data-code');
                    //  overModals();
                    // modalC.modal('show');
                    compareContest(id);
                    e.preventDefault();
                });
                $('.edit_contest').click(function (e) {
                    var id = $(this).attr('data-code');
                    findContest(id);
                    e.preventDefault();
                });
            }
        });
        getDataQuotations();

        function generateSearchContest() {
            generateSearchForm('frm-search-q', 'LoadRecordsButtonQ', function () {
                table_container_q.jtable('load', {
                    search: $('#search_q').val(),
                    check: (chk_date_range.prop('checked')),
                    from: start.format('YYYY-MM-DD'),
                    to: end.format('YYYY-MM-DD'),
                    state: quo_states.val()
                });
            }, true);
        }

        var call_m = false;

        function callModals() {
            call_m = true;

            var search_rq = getFormSearch('frm-search-rq', 'search_rq', 'LoadRecordsButtonRC');

            var table_container_rc = $("#table_container_rc");

            table_container_rc.jtable({
                title: "Lista de Requerimientos",
                paging: true,
                sorting: true,
                selecting: true,
                multiselect: true,
                selectingCheckboxes: true,
                selectOnRowClick: false,
                actions: {
                    listAction: base_url + '/contests/requirementsList'
                },
                toolbar: {
                    items: [{
                        cssClass: 'buscador',
                        text: search_rq
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
                        title: 'Requerimiento',
                        listClass: 'text-center'
                    },
                    date_registration: {
                        title: 'F.Registro',
                        listClass: 'text-center'
                    },
                    project_description: {
                        title: 'Proyecto',
                        width: '30%',
                        sorting: false
                    },
                    requested_by: {
                        title: 'Solicitado por',
                        list: show_list_
                    }
                },
                recordsLoaded: function (event, data) {
                    $('.jtable-selecting-column input').iCheck({
                        checkboxClass: 'icheckbox_square-green'
                    }).on('ifChanged', function (event) {
                        $(event.target).click();
                    });
                }
            });

            generateSearchForm('frm-search-rq', 'LoadRecordsButtonRC', function () {
                table_container_rc.jtable('load', {
                    search: $('#search_rq').val(),
                    state: 3,
                    assignment_req: '1',
                    is_assignment: '1',
                    items: arr_det_req_con
                });
            }, false);

            var search_pc = getFormSearch('frm-search-pc', 'search_pc', 'LoadRecordsButtonPC');

            var table_container_pc = $("#table_container_provider_contest");

            table_container_pc.jtable({
                title: "Lista de Proveedores",
                paging: true,
                sorting: true,
                actions: {
                    listAction: base_url + '/contests/providersList'
                },
                toolbar: {
                    items: [{
                        cssClass: 'buscador',
                        text: search_pc
                    }]
                },
                fields: {
                    id: {
                        key: true,
                        create: false,
                        edit: false,
                        list: false
                    },
                    Documento: {
                        title: 'Documento',
                        width: '2%',
                        listClass: 'text-center'
                    },
                    NombreEntidad: {
                        title: 'Razón Social'
                    },
                    DireccionLegal: {
                        title: 'Dirección Legal',
                        list: show_list_
                    },
                    contact: {
                        title: 'Contacto',
                        width: '3%'
                    },
                    contact_phone: {
                        title: 'Teléf. de Contacto',
                        list: show_list_,
                        width: '3%'
                    },
                    select: {
                        width: '1%',
                        listClass: 'text-center',
                        sorting: false,
                        edit: false,
                        create: false,
                        display: function (data) {
                            return '<a href="javascript:void(0)" title="Seleccionar" class="select_prov" data-code="' +
                                data.record.id + '"><i class="fa fa-' + icon_select + ' fa-1-5x"></i></a>';
                        }
                    }
                },
                recordsLoaded: function (event, data) {
                    $('.select_prov').click(function (e) {
                        var prov_id = $(this).attr('data-code');
                        var info = _.find(data.records, function (item) {
                            return item.id === prov_id;
                        });
                        if (info) {
                            console.log('proveedor:' + info);
                            addProviderToQuotation(info);
                        }
                        modalProviderListContest.modal('hide');
                        e.preventDefault();
                    });
                }
            });

            generateSearchForm('frm-search-pc', 'LoadRecordsButtonPC', function () {
                table_container_pc.jtable('load', {
                    search: $('#search_pc').val()
                });
            }, false);

            var search_ipc = getFormSearch('frm-search-ipc', 'search_ipc', 'LoadRecordsButtonIPC');

            var table_container_ipc = $("#table_container_item_provider_contest");

            table_container_ipc.jtable({
                title: "Lista de Items",
                paging: true,
                sorting: true,
                selecting: true,
                multiselect: true,
                selectingCheckboxes: true,
                selectOnRowClick: false,
                actions: {
                    listAction: base_url + '/contests/providersItemsList'
                },
                toolbar: {
                    items: [{
                        cssClass: 'buscador',
                        text: search_ipc
                    }]
                },
                fields: {
                    id: {
                        key: true,
                        create: false,
                        edit: false,
                        list: false
                    },
                    product: {
                        title: 'Artículo'
                    },
                    um: {
                        title: 'U.M.',
                        list: show_list_,
                        width: '3%',
                        listClass: 'text-center'
                    },
                    quantity: {
                        title: 'Cantidad',
                        width: '3%',
                        listClass: 'text-right'
                    }
                },
                recordsLoaded: function (event, data) {
                    $('.jtable-selecting-column input').iCheck({
                        checkboxClass: 'icheckbox_square-green'
                    }).on('ifChanged', function (event) {
                        $(event.target).click();
                    });
                }
            });

            generateSearchForm('frm-search-ipc', 'LoadRecordsButtonIPC', function () {
                table_container_ipc.jtable('load', {
                    search: $('#search_ipc').val(),
                    contest: q_id,
                    items: arr_det_item_con
                });
            }, false);
        }

        var cont_detail = 1;
        var arr_det_req_con = [];
        var arr_det_item_con = [];

        function validItemRequirementDetail(row, modified) {
            if (!_.contains(arr_det_req_con, row.id)) {
                console.log(row.id);
                generateDetailContest(row, modified);
                arr_det_req_con.push(row.id);
            }
        }

        function validItemToProviderQuotation(row) {
            if (!_.contains(arr_det_item_con, row.article_id)) {
                generateDetailItemQuotation(row);
                arr_det_item_con.push(row.article_id);
            }
        }

        function generateDetailContest(row, modified) {
            var tr = $('<tr class="rowReqContest" data-id="' + row.id + '"></tr>');
            var td1 = $('<td class="text-center">' + row.code + '</td>');
            var td2 = $('<td class="text-center">' + row.date_registration + '</td>');
            var td3 = $('<td>' + row.project_description + '</td>');
            var td4 = $('<td>' + row.requested_by + '</td>');
            var td_a = $('<a data-target="#" title="Eliminar" class="delReqCon"><i class="fa fa-trash fa-1-5x fa-red"></i></a>');
            var td5 = $('<td class="text-center"></td>');
            td5.append(td_a);
            tr.append(td1).append(td2).append(td3).append(td4).append(td5);

            q_body_requirements.append(tr);
            validRequirementContest();

            if (modified) {
                q_requirement_modified = true;
            }

            $('.delReqCon').click(function (e) {
                var tr_ = $(this).closest('tr');
                AlertFactory.confirm({
                    title: '',
                    message: '¿Está seguro que desea quitar este requerimiento?',
                    confirm: 'Si',
                    cancel: 'No'
                }, function () {
                    var tr_id = tr_.attr('data-id');
                    tr_.remove();
                    arr_det_req_con = _.reject(arr_det_req_con, function (item) {
                        return item === parseInt(tr_id)
                    });
                    validRequirementContest();
                    q_requirement_modified = true;
                });
                e.preventDefault();
            });
        }

        function generateDetailItemQuotation(row) {
            var td_a = $('<a data-target="#" title="Eliminar" class="delItemQuo"><i class="fa fa-trash fa-1-5x fa-red"></i></a>');
            var td0 = $('<td class="text-center"></td>');
            td0.append(td_a);
            var tr = $('<tr class="rowItemQuotation" data-id="' + row.article_id + '"></tr>');
            var td1 = $('<td class="text-center td_item_numbers">' + cont_detail + '</td>');
            var td2 = $('<td><textarea id="item_q' + row.article_id + '" class="form-control input-sm" rows="1">' + row.product + '</textarea></td>');
            var td3 = $('<td class="text-center">' + row.um + '</td>');
            var td4 = $('<td class="text-center">' + row.model + '</td>');
            var td5 = $('<td class="text-right">' + row.average_price + '</td>');
            var td6 = $('<td><input id="quantity_q' + row.article_id + '" onclick="this.select()" data-max="' +
                row.quantity + '" onkeypress="return validDecimals(event, this, 3)" onblur="return roundDecimals(this, 2)" ' +
                'class="calculate_ text-right form-control input-sm input-quantity-q" value="' + row.quantity + '" /></td>');
            tr.append(td0).append(td1).append(td2).append(td3).append(td4).append(td5).append(td6);
            var row_price = (_.isNull(row.price)) ? '.00' : (_.isUndefined(row.price)) ? '0.00' : row.price;
            var td7 = $('<td><input id="price_q' + row.article_id + '" onclick="this.select()" ' +
                'onkeypress="return validDecimals(event, this, 3)" onblur="return roundDecimals(this, 2)" ' +
                'class="calculate_ text-right form-control input-sm" value="' + row_price + '" /></td>');
            var td8 = $('<td class="text-right"><span id="subtotal' + row.article_id + '"></span></td>');
            var row_discount_percentage = (_.isNull(row.discount_percentage)) ? '.00' : (_.isUndefined(row.discount_percentage)) ? '.00' : row.discount_percentage;
            var td9 = $('<td><input id="discount_p_q' + row.article_id + '" onclick="this.select()" ' +
                'onkeypress="return validDecimals(event, this, 3)" onkeypress="return roundDecimals(this, 2)" ' +
                'class="discount_p_ text-right form-control input-sm" value="' + row_discount_percentage + '" " /></td>');
            var row_discount = (_.isNull(row.discount)) ? '.00' : (_.isUndefined(row.discount)) ? '.00' : row.discount;
            var td10 = $('<td><input id="discount_q' + row.article_id + '" onclick="this.select()" ' +
                'onkeypress="return validDecimals(event, this, 3)" onkeypress="return roundDecimals(this, 2)" ' +
                'class="discount_ text-right form-control input-sm" value="' + row_discount + '" /></td>');
            var td11 = $('<td class="text-right"><span class="totals_" id="total' + row.article_id + '"></span></td>');
            var td12 = $('<td class="text-right"><span class="totals_l" id="total_l' + row.article_id + '"></span></td>');
            var td13 = $('<td class="text-right"><span class="totals_d" id="total_d' + row.article_id + '"></span></td>');
            tr.append(td0).append(td1).append(td2).append(td3).append(td4).append(td5).append(td6).append(td7)
                .append(td8).append(td9).append(td10).append(td11).append(td12).append(td13);

            q_p_table_items_provider.append(tr);
            cont_detail++;

            $('.calculate_').keyup(function () {
                var code_ = $(this).closest('tr').attr('data-id');
                calculateTotals(code_);
            });

            $('.discount_p_').keyup(function () {
                var code_ = $(this).closest('tr').attr('data-id');
                calculateDiscount(code_, 1);
            });

            $('.discount_').keyup(function () {
                var code_ = $(this).closest('tr').attr('data-id');
                calculateDiscount(code_, 2);
            });

            $('.input-quantity-q').blur(function () {
                var that = $(this);
                var maxRow = that.attr('data-max');
                if (that.val() > parseFloat(maxRow) || that.val() === '') {
                    AlertFactory.showWarning({
                        title: 'Debe ingresar una cantidad menor o igual a la cantidad requerida',
                        message: ''
                    }, function () {
                        that.val(maxRow);
                        that.select();
                    });
                }
            });

            $('.delItemQuo').click(function (e) {
                var tr_ = $(this).closest('tr');
                AlertFactory.confirm({
                    title: '',
                    message: '¿Está seguro que desea quitar este item?',
                    confirm: 'Si',
                    cancel: 'No'
                }, function () {
                    var tr_id = tr_.attr('data-id');
                    tr_.remove();
                    arr_det_item_con = _.reject(arr_det_item_con, function (item) {
                        return item === tr_id
                    });
                    orderItemsRows();
                    calculateTotalQuotation();
                });
                e.preventDefault();
            });

            calculateTotals(row.article_id);
        }

        function calculateTotalsChange(article_id) {
            if (article_id === 0) {
                _.each($('.rowItemQuotation'), function (item) {
                    var id_ = parseFloat($(item).attr('data-id'));
                    calculateTotalsChangeArticle(id_);
                });
            } else {
                calculateTotalsChangeArticle(article_id);
            }
            calculateTotalQuotation();
        }

        function calculateTotalsChangeArticle(article_id) {
            var t_ = parseFloat($('#total' + article_id).html());
            var total_l, total_d;
            if (parseInt(q_p_currency.val()) === 1) {
                total_l = t_;
                total_d = (t_ === 0) ? 0 : t_ / q_change_today;
            } else {
                total_l = t_ * q_change_today;
                total_d = t_;
            }
            $('#total_l' + article_id).html((total_l).toFixed(2));
            $('#total_d' + article_id).html((total_d).toFixed(2));
        }

        function calculateTotals(article_id) {
            var q_ = $('#quantity_q' + article_id).val();
            q_ = (q_ === '') ? 0 : q_;
            var p_ = $('#price_q' + article_id).val();
            p_ = (p_ === '') ? 0 : p_;
            var st_ = q_ * p_;
            $('#subtotal' + article_id).html((st_).toFixed(2));
            calculateDiscount(article_id, 1);
        }

        function calculateDiscount(article_id, type) {
            var s_t_ = $('#subtotal' + article_id).html();
            s_t_ = parseFloat(s_t_);
            var d_p_ = $('#discount_p_q' + article_id).val();
            d_p_ = (d_p_ === '') ? 0 : parseFloat(d_p_);
            var d_ = $('#discount_q' + article_id).val();
            d_ = (d_ === '') ? 0 : parseFloat(d_);
            if (type === 1) {
                d_ = (s_t_ * d_p_) / 100;
                $('#discount_q' + article_id).val((d_).toFixed(2));
            } else {
                d_p_ = (s_t_ === 0) ? 0 : (d_ * 100) / s_t_;
                $('#discount_p_q' + article_id).val(d_p_);
            }
            var t_ = s_t_ - d_;
            $('#total' + article_id).html((t_).toFixed(2));
            calculateTotalsChange(article_id);
        }

        function calculateTotalQuotation() {
            var total_ = 0;
            _.each($('.totals_'), function (item) {
                total_ += parseFloat($(item).html());
            });
            q_p_subtotal.val((total_).toFixed(2));
            var igv_ = (q_p_igv_checked.prop('checked')) ? q_percentage_igv : 0;
            igv_ = (total_ === 0) ? 0 : (igv_ / 100) * total_;
            q_p_igv.val((igv_).toFixed(2));
            q_p_total.val((total_ + igv_).toFixed(2));

            var subtotal_l, igv_l, subtotal_d, igv_d;
            if (parseInt(q_p_currency.val()) === 1) {
                subtotal_l = total_;
                subtotal_d = (total_ === 0) ? 0 : total_ / q_change_today;
                igv_l = igv_;
                igv_d = (igv_ === 0) ? 0 : igv_ / q_change_today;
            } else {
                subtotal_l = total_ * q_change_today;
                subtotal_d = total_;
                igv_l = igv_ * q_change_today;
                igv_d = igv_;
            }
            q_p_subtotal_local.val(subtotal_l.toFixed(2));
            q_p_igv_local.val(igv_l.toFixed(2));
            q_p_total_local.val((subtotal_l + igv_l).toFixed(2));
            q_p_subtotal_dollar.val(subtotal_d.toFixed(2));
            q_p_igv_dollar.val(igv_d.toFixed(2));
            q_p_total_dollar.val((subtotal_d + igv_d).toFixed(2));
        }

        function orderItemsRows() {
            cont_detail = 1;
            _.each($('.td_item_numbers'), function (item) {
                $(item).html(cont_detail);
                cont_detail++;
            });
        }

        function validRequirementContest() {
            q_show_req.addClass('hide');
            q_show_buttons_consolidated.addClass('hide');
            if (q_body_requirements.html() !== '') {
                q_show_req.removeClass('hide');
                q_show_buttons_consolidated.removeClass('hide');
            }
            getConsolidatedRequirements();
        }

        function getConsolidatedRequirements() {
            var req_cont_id = [];
            _.each($('.rowReqContest'), function (item) {
                var _id = $(item).attr('data-id');
                req_cont_id.push(_id);
            });
            // console.log('d:' + req_cont_id);
            var params = 'requirements=' + req_cont_id.join('-');
            $('#show_loading').addClass('hide');
            RESTService.all('contests/consolidatedRequirement', params, function (response) {
                if (!_.isUndefined(response.status) && response.status) {
                    q_body_requirements_consolidated.empty();
                    q_p_table_items_provider.empty();
                    $.each(response.data, function (idx, item) {
                        var tr_ = $('<tr></tr>');
                        var td1_ = $('<td class="text-center">' + (idx + 1) + '</td>');
                        var td2_ = $('<td>' + item.description + '</td>');
                        var td3_ = $('<td class="text-center">' + item.um + '</td>');
                        var td4_ = $('<td class="text-right">' + (parseFloat(item.quantity)).toFixed(2) + '</td>');
                        tr_.append(td1_).append(td2_).append(td3_).append(td4_);
                        q_body_requirements_consolidated.append(tr_);
                    });
                }
                $('#show_loading').removeClass('hide');
            }, function () {
                getConsolidatedRequirements();
            });
        }

        function loadQuotationProvider(contest_id) {
            RESTService.get('contests/quotationsProviders', contest_id, function (response) {
                if (!_.isUndefined(response.status) && response.status) {
                    console.log(response);
                    q_body_quotations_providers.empty();
                    _.each(response.data, function (item) {
                        var tr_ = $('<tr data-id="' + item.id + '"></tr>');
                        var td_1 = $('<td class="text-center">' + item.number + '</td>');
                        var td_2 = $('<td>' + item.document + '</td>');
                        var td_3 = $('<td>' + item.description + '</td>');
                        var td_4 = $('<td class="text-right">' + item.total + '</td>');
                        var button_document = $('<button class="btn btn-success btn-xs provider_document" ' +
                            'ng-click="showPDF()" title="Ver Documento"><span class="fa fa-file-pdf-o"></span></button>');
                        var button_edit = $('<button class="btn btn-primary btn-xs provider_edit" title="Editar" ' +
                            ' type="button" data-id="' + item.id + '"><span class="fa fa-edit"></span></button>');
                        var button_delete = $('<button class="btn btn-danger btn-xs provider_delete" title="Eliminar" ' +
                            'type="button"><span class="fa fa-trash-o"></span></button>');
                        var td_5 = $('<td class="text-center"></td>');
                        td_5.append(button_document).append(button_edit).append(button_delete);
                        tr_.append(td_1).append(td_2).append(td_3).append(td_4).append(td_5);
                        q_body_quotations_providers.append(tr_);

                        $(".provider_edit").click(function () {
                            var contest_id = $(this).attr('data-id');
                            loadQuotationsProviderEdit(contest_id);
                            overModals();
                            modalPr.modal('show');
                        });
                        $(".provider_delete").click(function (e) {
                            var tr_ = $(this).closest('tr');
                            AlertFactory.confirm({
                                title: '',
                                message: '¿Está seguro que desea quitar este concurso de proveedor?',
                                confirm: 'Si',
                                cancel: 'No'
                            }, function () {
                                var tr_id = tr_.attr('data-id');
                                tr_.remove();
                                arr_det_item_con = _.reject(arr_det_item_con, function (item) {
                                    return item === parseInt(tr_id)
                                });
                                deleteContestProvider(tr_id);
                            });
                            e.preventDefault();
                        });
                    });
                }
            });
        }

        function deleteContestProvider() {

        }

        function loadQuotationsProviderEdit(contest_id) {
            RESTService.get('contests/findContestProvider', contest_id, function (response) {
                if (!_.isUndefined(response.status) && response.status) {
                    var data_c = response.data;
                    q_p_id = data_c.id;
                    // console.log(q_p_id);
                    q_p_number.val(data_c.number);
                    q_p_date_emission.val(data_c.date_emission);
                    q_p_delivery_days.val(data_c.delivery_days);
                    q_p_delivery_date.val(data_c.delivery_date);
                    q_p_date_send.val(data_c.shipping_date);
                    q_p_provider_id = data_c.provider_id;
                    console.log('ev:' + q_p_provider_id);
                    q_p_ruc.val(data_c.ruc);
                    q_p_business_name.val(data_c.bussiness_name);
                    q_p_address_provider.val(data_c.adrress_provider);
                    q_p_contact.val(data_c.contact);
                    q_p_contact_phone.val(data_c.contact_phone);
                    q_p_payment_condition.val(data_c.payment_condition_id);
                    q_p_payment_advance.val(data_c.payment_advance);
                    q_p_currency.val(data_c.currency_id);
                    _.each(data_c.item_product, function (item) {
                        validItemToProviderQuotation(item);
                    });
                    q_p_subtotal.val(data_c.subtotal);
                    q_p_subtotal_local.val(data_c.subtotal_local);
                    q_p_subtotal_dollar.val(data_c.subtotal_dollar);
                    var chk_igv = (data_c.is_igv === '1');
                    q_p_igv_checked.prop('checked', chk_igv).iCheck('update');
                    q_p_igv.val(data_c.igv);
                    q_p_igv_local.val(data_c.igv_local);
                    q_p_igv_dollar.val(data_c.igv_dollar);
                    q_p_total.val(data_c.total);
                    q_p_total_local.val(data_c.total_local);
                    q_p_total_dollar.val(data_c.total_dollar);
                } else {
                    AlertFactory.textType({
                        title: '',
                        message: 'Hubo un error al obtener la cotización del proveedor. Intente nuevamente.',
                        type: 'error'
                    });
                }
            });
        }

        $scope.consolidatedRequirementExport = function (type) {
            if (q_id === 0) {
                AlertFactory.showWarning({
                    title: '',
                    message: 'Debe guardar el concurso para poder exportar el Consolidado'
                });
                return false;
            }
            var req_cont_id = [];
            _.each($('.rowReqContest'), function (item) {
                var _id = $(item).attr('data-id');
                req_cont_id.push(_id);
            });
            var data = {
                requirements: req_cont_id
            };
            if (type === 1) {
                $scope.openDoc('contests/consolidatedRequirementExcel', data);
            } else {
                $scope.loadPDF('contests/consolidatedRequirementPDF', data);
            }
        };

        function addProviderToQuotation(data) {
            q_p_provider_id = data.id;
            q_p_ruc.val(data.Documento);
            q_p_business_name.val(data.NombreEntidad);
            q_p_address_provider.val(data.DireccionLegal);
            q_p_contact.val(data.contact);
            q_p_contact_phone.val(data.contact_phone);
        }

        $scope.addItemQuotationProvider = function () {
            modalItemProviderListContest.modal('show');
        };

        $scope.showPDF = function () {
            var modalView = $('#modalView');
            modalView.on('hidden.bs.modal', function (e) {
                modalQ.attr('style', 'display:block;');
            });
            modalView.on('show.bs.modal', function (e) {
                modalQ.attr('style', 'display:block; z-index:2030 !important');
            });
            modalView.modal('show');
        };

        function clearRowsAR() {
            $('.jtable-column-header-selecting input').prop('checked', false).iCheck('update');
            $('.jtable-row-selected').removeClass('jtable-row-selected');
        }
    }

    function Config($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('contests', {
                url: '/contests',
                templateUrl: base_url + '/templates/quotations/base.html',
                controller: 'QuotationCtrl'
            });

        $urlRouterProvider.otherwise('/');
    }
})
();