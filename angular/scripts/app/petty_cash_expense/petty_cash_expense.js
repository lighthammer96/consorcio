/**
 * Created by EVER on 28/04/2017.
 */
(function () {
    'use strict';
    angular.module('sys.app.petty_cash_expense')
        .config(Config)
        .controller('PettyCashExpenseCtrl', PettyCashExpenseCtrl);

    Config.$inject = ['$stateProvider', '$urlRouterProvider'];
    PettyCashExpenseCtrl.$inject = ['$scope', '_', 'RESTService'];

    function PettyCashExpenseCtrl($scope, _, RESTService)
    {
        moment.locale('es');
        var start = moment().startOf('month');
        var end = moment().endOf('month');

        var chk_date_range = $('#chk_date_range');
        chk_date_range.click(function () {
            $('#LoadRecordsButtonPCE').click();
        });
        generateCheckBox('.chk_date_range_pce');

        var reqDates = $('#reqDates');

        var showDate = function (from, to) {
            start = from;
            end = to;
            reqDates.find('span').html(from.format('MMM D, YYYY') + ' - ' + to.format('MMM D, YYYY'));
            if (chk_date_range.prop('checked')) {
                $('#LoadRecordsButtonPCE').click();
            }
        };
        generateDateRangePicker(reqDates, start, end, showDate);
        showDate(start, end);

        var call_m = false;
        var modalPCE;
        var titlePCE;
        var modalDocument;
        var modalCash;
        var modalClassificationAcquisition;
        var modalDocumentType;
        var modalProvider;
        var modalVoucher;
        var modalCCo;
        var modalCostCenter;
        var modalDocumentClose;

        var pce_id = 0;
        var pce_state_id = 1;
        var pce_code;
        var pce_date;
        var pce_accounting_period;
        var pce_pc_id = '';
        var pce_pc_is_voucher = false;
        var pce_pc;
        var pce_pc_btn;
        var pce_pc_total;
        var pce_total;
        var pce_observation;
        var pce_detail;
        var pce_detail_select_ = '';
        var pce_vouchers;
        var pce_voucher_select_ = '';
        var pce_detail2;

        var ap_id = 0;
        var ap_register_date;
        var ap_emission_date;
        var ap_period;
        var ap_type_change;
        var ap_payment_condition;
        var ap_expired_date;
        var ap_classification_acquisition_id = '';
        var ap_classification_acquisition;
        var ap_classification_acquisition_btn;
        var ap_operation_destination;
        var ap_provider_id = '';
        var ap_provider;
        var ap_provider_btn;
        var ap_currency;
        var ap_document_type_id = '';
        var ap_document_type;
        var ap_document_type_btn;
        var ap_document_number;
        var ap_gloss;
        var ap_unaffected;
        var ap_affection;
        var ap_exonerated;
        var ap_igv;
        var ap_is_igv;
        var ap_percentage_igv = 0;
        var ap_total;
        var ap_account_id = '';
        var ap_account;
        var ap_account_btn;
        var ap_cost_center_id = '';
        var ap_cost_center;
        var ap_cost_center_btn;

        var pce_v_chk;

        var gv_id = 0;
        var gv_code;
        var gv_date;
        var gv_gloss;
        var gv_responsible;
        var gv_amount;
        var gv_is_consumed;

        var ap_close_id = 0;
        var ap_close_number;
        var ap_close_gloss;
        var ap_close_responsible;
        var ap_close_total;

        var ap_payment_condition_data = [];
        var ap_operation_destination_data = [];
        var ap_currency_data = [];

        function cleanPCE() {
            cleanRequired();
            activeTab('general');
            titlePCE.empty();
            pce_id = 0;
            pce_state_id = 1;
            pce_code.val('');
            pce_date.val('').prop('disabled', false);
            pce_accounting_period.val('');
            pce_pc_id = '';
            pce_pc_is_voucher = false;
            pce_pc.val('');
            pce_pc_btn.prop('disabled', false);
            pce_pc_total.val('');
            pce_total.val('');
            pce_observation.val('').prop('disabled', false);
            pce_detail.empty();
            pce_detail_select_ = '';
            pce_detail2.empty();
            $('li#pce_li_vouchers').addClass('hide');
            pce_vouchers.empty();
            pce_voucher_select_ = '';
            $('button.btn-frm').removeClass('hide');
        }

        function cleanDocument() {
            ap_id = 0;
            ap_register_date.val('').prop('disabled', false);
            ap_emission_date.val('').prop('disabled', false);
            ap_period.val('');
            ap_type_change.val('');
            ap_payment_condition.val('').trigger('change').prop('disabled', false);
            ap_expired_date.val('');
            ap_classification_acquisition_id = '';
            ap_classification_acquisition.val('');
            ap_classification_acquisition_btn.prop('disabled', false);
            ap_operation_destination.val('').trigger('change').prop('disabled', false);
            ap_provider_id = '';
            ap_provider.val('');
            ap_provider_btn.prop('disabled', false);
            ap_currency.val('1').prop('disabled', false);
            ap_document_type_id = '';
            ap_document_type.val('');
            ap_document_type_btn.prop('disabled', false);
            ap_document_number.val('').prop('disabled', false);
            ap_gloss.val('').prop('disabled', false);
            ap_unaffected.val('').prop('disabled', false);
            ap_affection.val('').prop('disabled', false);
            ap_exonerated.val('').prop('disabled', false);
            ap_is_igv.prop('disabled', false).iCheck('update');
            ap_igv.val('').prop('disabled', false);
            ap_total.val('');
            ap_account_id = '';
            ap_account.val('');
            ap_account_btn.prop('disabled', false);
            ap_cost_center_id = '';
            ap_cost_center.val('');
            ap_cost_center_btn.prop('disabled', false);

            pce_v_chk.prop('checked', false).iCheck('update');
            $('span.pce_v_chk_content').removeClass('hide');
        }

        function cleanGV() {
            gv_id = 0;
            gv_code.val('').prop('disabled', false);
            gv_date.val('').prop('disabled', false);
            gv_gloss.val('').prop('disabled', false);
            gv_responsible.val('').prop('disabled', false);
            gv_amount.val('').prop('disabled', false);
            gv_is_consumed.prop('disabled', false).iCheck('update');
        }

        function cleanDocumentClose() {
            ap_close_id = 0;
            ap_close_number.val('');
            ap_close_gloss.val('');
            ap_close_responsible.val('');
            ap_close_total.val('');
        }

        function getDataForm() {
            RESTService.all('petty_cash_expense/data_form', '', function (response) {
                if (!_.isUndefined(response.status) && response.status) {
                    ap_payment_condition_data = response.payment_condition;
                    ap_operation_destination_data = response.operation_destination;
                    ap_currency_data = response.currency;
                    ap_percentage_igv = parseFloat(response.per_igv);
                } else {
                    getDataForm();
                }
            }, function () {
                getDataForm();
            });
        }

        function overModals() {
            if (!call_m) {
                pce_code = $("input#pce_code");
                pce_date = $("input#pce_date");
                generateDatePicker(pce_date);
                pce_accounting_period = $("input#pce_accounting_period");
                pce_pc = $("input#pce_pc");
                pce_pc_btn = $("button#pce_pc_btn");
                pce_pc_total = $("input#pce_pc_total");
                pce_total = $("input#pce_total");
                pce_observation = $("textarea#pce_observation");
                pce_detail = $("tbody#pce_detail");
                pce_detail2 = $("tbody#pce_detail2");
                pce_vouchers = $("tbody#pce_vouchers");

                ap_register_date = $('input#ap_register_date');
                ap_register_date.change(function () {
                    calculateDateExpirationAP();
                });
                generateDatePicker(ap_register_date);
                ap_emission_date = $('#ap_emission_date');
                ap_emission_date.prop('readonly', true).addClass('readonly-white').datepicker({
                    changeMonth: true,
                    changeYear: true,
                    dateFormat: 'dd/mm/yy',
                    beforeShow: function () {
                        setTimeout(function () {
                            $('.ui-datepicker').css('z-index', 2052);
                        });
                    },
                    onSelect: function (dateText, instance) {
                        validTypeChangeAP(this.value, instance.lastVal);
                    }
                });
                ap_period = $('input#ap_period');
                ap_type_change = $('#ap_type_change');

                ap_payment_condition = $('#ap_payment_condition');
                ap_payment_condition.html('<option value="">SELECCIONAR</option>');
                _.each(ap_payment_condition_data, function (item) {
                    ap_payment_condition.append('<option value="' + item.Value + '" data-pc_day="' +
                        item.DisplayTextTwo + '">' + item.DisplayTextOne + '</option>');
                });
                ap_payment_condition.change(function () {
                    calculateDateExpirationAP();
                });

                ap_expired_date = $("#ap_expired_date");
                ap_classification_acquisition = $("#ap_classification_acquisition");
                ap_classification_acquisition_btn = $("#ap_classification_acquisition_btn");

                ap_operation_destination = $('#ap_operation_destination');
                ap_operation_destination.html('<option value="">SELECCIONAR</option>');
                _.each(ap_operation_destination_data, function (item) {
                    ap_operation_destination.append('<option value="' + item.Value + '" ' +
                        'data-operation_description="' + item.DisplayTextTwo + '">' + item.DisplayTextOne + '</option>');
                });

                ap_provider = $("input#ap_provider");
                ap_provider_btn = $("button#ap_provider_btn");

                ap_currency = $('#ap_currency');
                ap_currency.empty();
                _.each(ap_currency_data, function (item) {
                    ap_currency.append('<option value="' + item.Value + '">' + item.DisplayText + '</option>');
                });

                ap_document_type = $("#ap_document_type");
                ap_document_type_btn = $("#ap_document_type_btn");
                ap_document_number = $("#ap_document_number");

                ap_gloss = $("#ap_gloss");
                ap_gloss.keyup(function () {
                    if (this.value !== '') {
                        ap_gloss.removeClass('border-red');
                    }
                });

                ap_unaffected = $("#ap_unaffected");
                ap_unaffected.keyup(function () {
                    apCalculateTotal();
                });
                ap_affection = $("#ap_affection");
                ap_affection.keyup(function () {
                    apCalculateTotal();
                });
                ap_exonerated = $("#ap_exonerated");
                ap_exonerated.keyup(function () {
                    apCalculateTotal();
                });
                ap_igv = $("#ap_igv");
                ap_is_igv = $("input#ap_is_igv");
                ap_is_igv.click(function () {
                    apCalculateTotal();
                });
                generateCheckBox('input#ap_is_igv');
                ap_total = $("#ap_total");
                $('span.ap_per_igv_').html(ap_percentage_igv);

                ap_account = $("input#ap_account");
                ap_account_btn = $("button#ap_account_btn");
                ap_cost_center = $("input#ap_cost_center");
                ap_cost_center_btn = $("button#ap_cost_center_btn");

                pce_v_chk = $('input#pce_v_chk');
                pce_v_chk.click(function () {
                    chkVouchers(0);
                });
                generateCheckBox('input#pce_v_chk');

                gv_code = $('input#gv_code');
                gv_date = $('input#gv_date');
                generateDatePicker(gv_date);
                gv_gloss = $('textarea#gv_gloss');
                gv_responsible = $('input#gv_responsible');
                gv_amount = $('input#gv_amount');
                gv_is_consumed = $("input#gv_is_consumed");
                generateCheckBox('input#gv_is_consumed');

                ap_close_number = $('input#ap_close_number');
                ap_close_gloss = $('textarea#ap_close_gloss');
                ap_close_responsible = $('input#ap_close_responsible');
                ap_close_total = $('input#ap_close_total');

                modalPCE = $('#modalPCE');
                modalPCE.on('hidden.bs.modal', function (e) {
                    cleanPCE();
                });

                titlePCE = $('#titlePCE');

                modalCash = $('#modalCash');
                modalCash.on('show.bs.modal', function (e) {
                    $('#LoadRecordsButtonCash').click();
                    modalPCE.attr('style', 'display:block; z-index:2030 !important');
                });
                modalCash.on('hidden.bs.modal', function (e) {
                    $('#search_cash').val('');
                    $('#LoadRecordsButtonCash').click();
                    modalPCE.attr('style', 'display:block; overflow-y: auto;');
                });

                modalDocument = $('#modalDocument');
                modalDocument.on('show.bs.modal', function (e) {
                    modalPCE.attr('style', 'display:block; z-index:2030 !important');
                });
                modalDocument.on('hidden.bs.modal', function (e) {
                    modalPCE.attr('style', 'display:block; overflow-y: auto;');
                    cleanDocument();
                });

                modalDocumentClose = $('#modalDocumentClose');
                modalDocumentClose.on('show.bs.modal', function (e) {
                    modalPCE.attr('style', 'display:block; z-index:2030 !important');
                });
                modalDocumentClose.on('hidden.bs.modal', function (e) {
                    modalPCE.attr('style', 'display:block; overflow-y: auto;');
                    cleanDocumentClose();
                });

                modalClassificationAcquisition = $('#modalClassificationAcquisition');
                modalClassificationAcquisition.on('show.bs.modal', function (e) {
                    $('#LoadRecordsButtonCA').click();
                    modalDocument.attr('style', 'display:block; z-index:2030 !important');
                });
                modalClassificationAcquisition.on('hidden.bs.modal', function (e) {
                    $('#search_ca').val('');
                    $('#LoadRecordsButtonCA').click();
                    modalDocument.attr('style', 'display:block; overflow-y: auto;');
                });

                modalDocumentType = $('#modalDocumentType');
                modalDocumentType.on('show.bs.modal', function (e) {
                    $('#LoadRecordsButtonDocumentType').click();
                    modalDocument.attr('style', 'display:block; z-index:2030 !important');
                });
                modalDocumentType.on('hidden.bs.modal', function (e) {
                    $('#search_document_type').val('');
                    $('#LoadRecordsButtonDocumentType').click();
                    modalDocument.attr('style', 'display:block; overflow-y: auto;');
                });

                modalProvider = $('#modalProvider');
                modalProvider.on('show.bs.modal', function (e) {
                    $('#LoadRecordsButtonProvider').click();
                    modalDocument.attr('style', 'display:block; z-index:2030 !important');
                });
                modalProvider.on('hidden.bs.modal', function (e) {
                    $('#search_provider').val('');
                    $('#LoadRecordsButtonProvider').click();
                    modalDocument.attr('style', 'display:block; overflow-y: auto;');
                });

                modalVoucher = $('#modalVoucher');
                modalVoucher.on('show.bs.modal', function (e) {
                    modalPCE.attr('style', 'display:block; z-index:2030 !important');
                });
                modalVoucher.on('hidden.bs.modal', function (e) {
                    modalPCE.attr('style', 'display:block; overflow-y: auto;');
                    cleanGV();
                });

                modalCCo = $('#modalCCo');
                modalCCo.on('hidden.bs.modal', function (e) {
                    $('#search_cco').val('');
                    $('#LoadRecordsButtonCCo').click();
                    modalDocument.attr('style', 'display:block;');
                });
                modalCCo.on('show.bs.modal', function (e) {
                    $('#LoadRecordsButtonCCo').click();
                    modalDocument.attr('style', 'display:block; z-index:2030 !important');
                });

                modalCostCenter = $('#modalCostCenter');
                modalCostCenter.on('hidden.bs.modal', function (e) {
                    $('#search_cce').val('');
                    $('#LoadRecordsButtonCCe').click();
                    modalDocument.attr('style', 'display:block;');
                });
                modalCostCenter.on('show.bs.modal', function (e) {
                    $('#LoadRecordsButtonCCe').click();
                    modalDocument.attr('style', 'display:block; z-index:2030 !important');
                });

                callModals();
            }
        }

        function newPettyCashExpense() {
            overModals();
            titlePCE.html('Nueva Rendición de Caja Chica');
            modalPCE.modal('show');
        }

        $scope.openPettyCash = function () {
            modalCash.modal('show');
        };
        $scope.openClassificationAcquisition = function () {
            modalClassificationAcquisition.modal('show');
        };
        $scope.openDocumentType = function () {
            modalDocumentType.modal('show');
        };
        $scope.openProvider = function () {
            modalProvider.modal('show');
        };

        $scope.openDocument = function () {
            if (pce_id === 0) {
                $scope.showAlert('', 'Para agregar documentos debe guardar la rendición', 'warning');
                return false;
            }
            modalDocument.modal('show');
        };

        $scope.openVoucher = function () {
            if (pce_id === 0) {
                $scope.showAlert('', 'Para agregar vales debe guardar la rendición', 'warning');
                return false;
            }
            modalVoucher.modal('show');
        };

        $scope.openAccount = function() {
            modalCCo.modal('show');
        };

        $scope.openCostCenter = function() {
            modalCostCenter.modal('show');
        };

        $scope.openDocumentClose = function () {
            if (pce_id === 0) {
                $scope.showAlert('', 'Para agregar documentos debe guardar la rendición', 'warning');
                return false;
            }
            modalDocumentClose.modal('show');
        };

        function validTypeChangeAP(date, last_date) {
            date = moment(date, 'DD/MM/YYYY').format('YYYY-MM-DD');
            RESTService.get('petty_cash_expense/validTypeChange', date, function (response) {
                if (!_.isUndefined(response.status) && response.status) {
                    ap_type_change.val(response.data.tc);
                    ap_period.val(response.data.ap);
                } else {
                    $scope.showAlert('', response.message, 'warning');
                    ap_emission_date.val(last_date);
                }
            });
        }

        function calculateDateExpirationAP() {
            if (ap_payment_condition.val() === '' || ap_register_date.val() === '') {
                ap_expired_date.val('');
            } else {
                var days_ = ap_payment_condition.find('option:selected').attr('data-pc_day');
                var date_e_ = moment(ap_register_date.val(), 'DD/MM/YYYY')
                    .add(parseFloat(days_), 'days').format('DD/MM/YYYY');
                ap_expired_date.val(date_e_);
            }
        }

        function loadDocuments(pce_id) {
            RESTService.get('petty_cash_expense/documents', pce_id, function (response) {
                if (!_.isUndefined(response.status) && response.status) {
                    pce_detail.empty();
                    _.each(response.data.documents, function (row) {
                        addPCEDetail(row);
                    });
                    pce_detail2.empty();
                    _.each(response.data.documents_close, function (row) {
                        addPCEDetail2(row);
                    });
                    pce_vouchers.empty();
                    _.each(response.data.vouchers, function (row) {
                        addPCEVouchers(row);
                    });
                } else {
                    $scope.showAlert('', 'Hubo un error al obtener los documentos. Intente nuevamente.', 'warning');
                }
            });
        }
        function addPCEDetail(row)
        {
            var tr_ = $('<tr data-id="' + row.id + '" data-tot="' + row.total_sol + '"></tr>');
            tr_.append('<td>' + row.document_number + '</td>');
            tr_.append('<td>' + row.provider_name + '</td>');
            tr_.append('<td>' + row.gloss + '</td>');
            tr_.append('<td class="text-center">' + row.account + '</td>');
            var subtotal_ = (_.isNull(row.subtotal) || _.isUndefined(row.subtotal)) ? 0 : row.subtotal;
            var igv_ = (_.isNull(row.igv) || _.isUndefined(row.igv)) ? 0 : row.igv;
            var total_ = (_.isNull(row.total) || _.isUndefined(row.total)) ? 0 : row.total;
            tr_.append('<td class="text-right">' + row.currency + ' ' + numberFormat(subtotal_, 2) + '</td>');
            tr_.append('<td class="text-right">' + row.currency + ' ' + numberFormat(igv_, 2) + '</td>');
            tr_.append('<td class="text-right">' + row.currency + ' ' + numberFormat(total_, 2) + '</td>');
            var td_ = $('<td class="text-center"></td>');
            td_.append('<button class="btn btn-primary btn-xs editPCE" title="Editar" ' +
                'type="button"><span class="fa fa-edit"></span></button>');
            if (pce_state_id < 2) {
                td_.append('&nbsp;<button class="btn btn-danger btn-xs deletePCE" title="Eliminar" ' +
                    'type="button"><span class="fa fa-trash"></span></button>');
            }
            tr_.append(td_);
            pce_detail.append(tr_);

            pceCalculateTot();

            pce_detail.find('button.editPCE').off().on('click', function (e) {
                var tr_ = $(this).closest('tr');
                pce_detail_select_ = tr_.attr('data-code');
                var tr_id = tr_.attr('data-id');
                findAccountPay(tr_id);
                e.preventDefault();
            });

            pce_detail.find('button.deletePCE').off().on('click', function (e) {
                var tr_ = $(this).closest('tr');
                $scope.showConfirm('', '¿Está seguro que desea quitar este documento?', function () {
                    tr_.remove();
                    pceCalculateTot();
                });
                e.preventDefault();
            });
        }
        function addPCEDetail2(row)
        {
            var tr_ = $('<tr data-id="' + row.id + '" data-tot="' + row.total + '"></tr>');
            tr_.append('<td class="text-center">' + row.number + '</td>');
            tr_.append('<td>' + row.gloss + '</td>');
            tr_.append('<td>' + row.responsible + '</td>');
            var total_ = (_.isNull(row.total) || _.isUndefined(row.total)) ? 0 : row.total;
            tr_.append('<td class="text-right">' + numberFormat(total_, 2) + '</td>');
            var td_ = $('<td class="text-center"></td>');
            if (pce_state_id < 2) {
                td_.append('<button class="btn btn-primary btn-xs editPCEC" title="Editar" ' +
                    'type="button"><span class="fa fa-edit"></span></button>');
                td_.append('&nbsp;<button class="btn btn-danger btn-xs deletePCEC" title="Eliminar" ' +
                    'type="button"><span class="fa fa-trash"></span></button>');
            }
            tr_.append(td_);
            pce_detail2.append(tr_);

            pceCalculateTot();

            if (pce_state_id < 2) {
                pce_detail2.find('button.editPCEC').off().on('click', function (e) {
                    var tr_ = $(this).closest('tr');
                    var tr_id = tr_.attr('data-id');
                    findDocumentClose(tr_id);
                    e.preventDefault();
                });
                pce_detail2.find('button.deletePCEC').off().on('click', function (e) {
                    var tr_ = $(this).closest('tr');
                    $scope.showConfirm('', '¿Está seguro que desea quitar este documento de cierre?', function () {
                        tr_.remove();
                        pceCalculateTot();
                    });
                    e.preventDefault();
                });
            }

        }
        function addPCEVouchers(row)
        {
            var tr_ = $('<tr data-id="' + row.id + '"></tr>');
            tr_.append('<td class="text-center">' + row.code + '</td>');
            tr_.append('<td class="text-center">' + row.date + '</td>');
            tr_.append('<td>' + row.gloss + '</td>');
            tr_.append('<td>' + row.responsible + '</td>');

            var chk_ = (row.is_consumed === 'SI') ? 'checked' : '';
            var td_ = $('<td class="text-center"></td>');
            var inp_chk = (pce_state_id < 2) ?
                $('<input type="checkbox" class="pce_v_chk pce_v_chk' + row.id + '" ' + chk_ + ' />') :
                $('<span>' + row.is_consumed + '</span>');
            td_.append(inp_chk);
            tr_.append(td_);

            // tr_.append('<td class="text-center">' + row.is_consumed + '</td>');
            tr_.append('<td class="text-right">' + numberFormat(row.amount, 2) + '</td>');
            td_ = $('<td class="text-center"></td>');
            td_.append('<button class="btn btn-primary btn-xs editPCE" title="Editar" ' +
                'type="button"><span class="fa fa-edit"></span></button>');
            if (pce_state_id < 2) {
                td_.append('&nbsp;<button class="btn btn-danger btn-xs deletePCE" title="Eliminar" ' +
                    'type="button"><span class="fa fa-trash"></span></button>');
            }
            tr_.append(td_);
            pce_vouchers.append(tr_);

            pce_vouchers.find('button.editPCE').off().on('click', function (e) {
                var tr_ = $(this).closest('tr');
                pce_voucher_select_ = tr_.attr('data-code');
                var tr_id = tr_.attr('data-id');
                findVoucher(tr_id);
                e.preventDefault();
            });

            if (pce_state_id < 2) {
                pce_vouchers.find('button.deletePCE').off().on('click', function (e) {
                    var tr_ = $(this).closest('tr');
                    $scope.showConfirm('', '¿Está seguro que desea quitar este vale?', function () {
                        tr_.remove();
                    });
                    e.preventDefault();
                });
                pce_vouchers.find('input.pce_v_chk').off().on('click', function (e) {
                    chkVouchers(1);
                });
                generateCheckBox('input.pce_v_chk' + row.id);
            }
        }

        $scope.savePCE = function () {
            savePCE(1);
        };

        $scope.processPCE = function () {
            savePCE(2);
        };

        function savePCE(type) {
            var b_val = true;
            b_val = b_val && pce_date.required();
            b_val = b_val && pce_pc.required();
            if (b_val) {
                var document_ = [], vouchers_ = [], document_close_ = [];
                _.each(pce_detail.find('tr'), function (item) {
                    document_.push($(item).attr('data-id'));
                });
                _.each(pce_detail2.find('tr'), function (item) {
                    document_close_.push($(item).attr('data-id'));
                });
                _.each(pce_vouchers.find('tr'), function (item) {
                    vouchers_.push({
                        'id': $(item).attr('data-id'),
                        'is_consumed': ($(item).find('input.pce_v_chk').prop('checked')) ? 1 : 0
                    });
                });
                if (type === 2) {
                    var valid_ = false;
                    valid_ = (pce_pc_is_voucher === 0 && document_.length === 0) ? true : valid_;
                    valid_ = (pce_pc_is_voucher === 1 && document_.length === 0 && vouchers_.length === 0) ? true : valid_;
                    if (valid_) {
                        var txt_ = (pce_pc_is_voucher === 0) ? 'documento' : 'documento/vale de gasolina';
                        $scope.showAlert('', 'Debe ingresar minimo un ' + txt_ + ' para poder procesar la rendición.',
                            'warning');
                        return false;
                    }
                }
                var total_bal = replaceAll(pce_total.val(), ',', '');
                var total_cash = replaceAll(pce_pc_total.val(), ',', '');
                total_cash = (total_cash === '') ? 0 : parseFloat(total_cash);
                if (type === 1 && parseFloat(total_cash) <= 0) {
                    $scope.showAlert('', 'Para guardar la rendición el Saldo en Caja debe ser mayor que 0', 'warning');
                    return false;
                }
                if (parseFloat(total_bal) > parseFloat(total_cash)) {
                    $scope.showAlert('', 'La cantidad del saldo debe ser menor que el saldo de caja.', 'warning');
                    return false;
                }
            }
            if (b_val) {
                var params = {
                    'date': pce_date.val(),
                    'petty_cash_id': pce_pc_id,
                    'total': parseFloat(total_bal),
                    'observation': pce_observation.val(),
                    'documents': document_,
                    'documents_close': document_close_,
                    'vouchers': vouchers_,
                    'type': type
                };
                var txt_confirm_ = (type === 1) ? 'guardar' : 'procesar';
                var txt_success_ = (type === 1) ? 'guardó' : 'procesó';
                $scope.showConfirm('', '¿Está seguro que desea ' + txt_confirm_ + ' la rendición?', function () {
                    RESTService.updated('petty_cash_expense/save', pce_id, params, function (response) {
                        if (!_.isUndefined(response.status) && response.status === true) {
                            $scope.showAlert('', 'La rendición se ' + txt_success_ + ' correctamente.', 'success');
                            modalPCE.modal('hide');
                            $('#LoadRecordsButtonPCE').click();
                        } else {
                            $scope.showAlert('', response.message, 'warning');
                        }
                    });
                });
            }
        }

        function findPCE(id) {
            overModals();
            RESTService.get('petty_cash_expense/find', id, function (response) {
                if (!_.isUndefined(response.status) && response.status) {
                    var data_ = response.data;
                    pce_id = id;
                    pce_state_id = parseInt(data_.state_id);
                    var disabled_ = (pce_state_id > 1);
                    pce_code.val(data_.code);
                    pce_date.val(data_.date).prop('disabled', disabled_);
                    pce_accounting_period.val(data_.accounting_period);
                    pce_pc_id = data_.petty_cash_id;
                    pce_pc_is_voucher = data_.is_voucher;
                    if (pce_pc_is_voucher === 1) {
                        $('li#pce_li_vouchers').removeClass('hide');
                    }
                    pce_pc.val(data_.pc_description);
                    pce_pc_btn.prop('disabled', disabled_);
                    pce_pc_total.val(data_.pc_total);
                    pce_total.val(numberFormat(data_.total, 2));
                    pce_observation.val(data_.observation).prop('disabled', disabled_);
                    pce_detail.empty();
                    _.each(data_.documents_, function (row) {
                        addPCEDetail(row);
                    });
                    pce_detail2.empty();
                    _.each(data_.documents_close_, function (row) {
                        addPCEDetail2(row);
                    });
                    pce_vouchers.empty();
                    _.each(data_.vouchers_, function (row) {
                        addPCEVouchers(row);
                    });
                    if (disabled_) {
                        $('button.btn-frm, span.pce_v_chk_content').addClass('hide');
                    }
                    var txt_ = (pce_state_id === 1) ? 'Editar ' : '';
                    titlePCE.html(txt_ + 'Rendición de Caja Chica');
                    modalPCE.modal('show');
                } else {
                    $scope.showAlert('', response.message, 'warning');
                }
            });
        }

        $scope.saveDocument = function () {
            var b_val = true;
            b_val = b_val && ap_register_date.required();
            b_val = b_val && ap_emission_date.required();
            b_val = b_val && ap_payment_condition.required();
            b_val = b_val && ap_classification_acquisition.required();
            if (b_val && ap_document_type_id !== '02' && ap_operation_destination.val() === '') {
                b_val = b_val && ap_operation_destination.required();
            }
            b_val = b_val && ap_provider.required();
            b_val = b_val && ap_document_type.required();
            if (b_val && ap_classification_acquisition_id === '0' &&
                !_.contains(['00', '02', '09', '20', '30', '31', '32', '33', '34', '35', '36', '37', '91'], ap_document_type_id)) {
                $scope.showAlert('', 'No puede usar este Tipo de Documento cuando la Clasif Adquis es NO DEFINIDO', 'warning');
                return false;
            }
            b_val = b_val && ap_document_number.required();
            // b_val = b_val && ap_account.required();
            b_val = b_val && ap_gloss.required();
            b_val = b_val && ap_affection.required();
            b_val = b_val && ap_unaffected.required();
            b_val = b_val && ap_exonerated.required();
            if (b_val) {
                var amount_ = parseFloat(replaceAll(ap_total.html(), ',', ''));
                var type_change_ = parseFloat(ap_type_change.val());
                amount_ = (parseInt(ap_currency.val()) === 1) ? amount_ : amount_*type_change_;

                var total_doc_ = 0, pce_pc_total_ = parseFloat(replaceAll(pce_pc_total.val(), ',', ''));
                _.each(pce_detail.find('tr'), function (item) {
                    var tr_doc_ = $(item);
                    if (parseInt(tr_doc_.attr('data-id')) !== parseInt(ap_id)) {
                        total_doc_ += parseFloat(tr_doc_.attr('data-tot'));
                    }
                });
                _.each(pce_detail2.find('tr'), function (item) {
                    total_doc_ += parseFloat($(item).attr('data-tot'));
                });
                if ((total_doc_ + amount_) > pce_pc_total_) {
                    $scope.showAlert('', 'La sumatoria de los documentos a ingresar: ' +
                        numberFormat(total_doc_+amount_, 2) +
                        ', supera el total de la caja chica: ' + numberFormat(pce_pc_total_, 2) +
                        '. Por favor verifique el detalle del documento', 'warning');
                    return false;
                }
                var params = {
                    'petty_cash_expense_id': pce_id,
                    'register_date': ap_register_date.val(),
                    'emission_date': ap_emission_date.val(),
                    'payment_condition_id': ap_payment_condition.val(),
                    'expiration_date': ap_expired_date.val(),
                    'classification_acquisition_id': ap_classification_acquisition_id,
                    'operation_destination_id': ap_operation_destination.val(),
                    'provider_id': ap_provider_id,
                    'currency_id': ap_currency.val(),
                    'document_type_id': ap_document_type_id,
                    'document_number': ap_document_number.val(),
                    'gloss': ap_gloss.val(),
                    'affection': ap_affection.val(),
                    'unaffected': ap_unaffected.val(),
                    'exonerated': ap_exonerated.val(),
                    // 'igv': ap_igv.val(),
                    'is_igv': (ap_is_igv.prop('checked')) ? 1 : 0,
                    'IdCuenta': ap_account_id,
                    'IdCentroCosto': ap_cost_center_id,
                };
                $scope.showConfirm('', '¿Está seguro que desea guardar el Documento?', function () {
                    RESTService.updated('petty_cash_expense/saveDocument', ap_id, params, function (response) {
                        if (!_.isUndefined(response.status) && response.status) {
                            $scope.showAlert('', 'El Registro de Documento se guardó correctamente.', 'success');
                            modalDocument.modal('hide');
                            loadDocuments(pce_id);
                        } else {
                            $scope.showAlert('', response.message, 'warning');
                        }
                    });
                });
            }
        }

        function pceCalculateTot() {
            var total_ = 0;
            _.each(pce_detail.find('tr'), function (tr) {
                total_ += parseFloat($(tr).attr('data-tot'));
            });
            _.each(pce_detail2.find('tr'), function (tr) {
                total_ += parseFloat($(tr).attr('data-tot'));
            });
            pce_total.val(numberFormat(total_, 2));
        }

        function apCalculateTotal() {
            var is_igv_ = (ap_is_igv.prop('checked'));
            var unaffected_ = ap_unaffected.val();
            unaffected_ = (unaffected_ === '') ? 0 : parseFloat(unaffected_);
            var affection_ = ap_affection.val();
            affection_ = (affection_ === '') ? 0 : parseFloat(affection_);
            var exonerated_ = ap_exonerated.val();
            exonerated_ = (exonerated_ === '') ? 0 : parseFloat(exonerated_);
            var igv_ = (is_igv_ && affection_ > 0) ? roundMath(affection_ * ap_percentage_igv / 100, 2) : 0;
            ap_igv.val(numberFormat(igv_, 2));
            ap_total.val(numberFormat(affection_ + unaffected_ + exonerated_ + igv_, 2));
        }

        function findAccountPay(id) {
            RESTService.get('petty_cash_expense/findDocument', id, function (response) {
                if (!_.isUndefined(response.status) && response.status) {
                    var data = response.data;
                    ap_id = id;
                    var disabled_ = (pce_state_id > 1);
                    ap_register_date.val(data.register_date).prop('disabled', disabled_);
                    ap_emission_date.val(data.emission_date).prop('disabled', disabled_);
                    ap_period.val(data.accounting_period);
                    ap_type_change.val(data.type_change);
                    ap_payment_condition.val(data.payment_condition_id).trigger('change').prop('disabled', disabled_);
                    ap_classification_acquisition_id = data.classification_acquisition_id;
                    ap_classification_acquisition.val(data.classification_acquisition_);
                    ap_classification_acquisition_btn.prop('disabled', disabled_);
                    ap_operation_destination.val(data.operation_destination_id).trigger('change')
                        .prop('disabled', disabled_);
                    ap_provider_id = data.provider_id;
                    ap_provider.val(data.provider_);
                    ap_provider_btn.prop('disabled', disabled_);
                    ap_currency.val(data.currency_id).prop('disabled', disabled_);
                    ap_document_type_id = data.document_type_id;
                    ap_document_type.val(data.document_type_);
                    ap_document_type_btn.prop('disabled', disabled_);
                    ap_document_number.val(data.document_number).prop('disabled', disabled_);
                    ap_account_id = data.IdCuenta;
                    ap_account.val(data.account_);
                    ap_account_btn.prop('disabled', disabled_);
                    ap_cost_center_id = data.IdCentroCosto;
                    ap_cost_center.val(data.cost_center_);
                    ap_cost_center_btn.prop('disabled', disabled_);
                    ap_gloss.val(data.gloss).prop('disabled', disabled_);
                    var chk_igv = ((parseInt(data.is_igv)) === 1);
                    ap_is_igv.prop('disabled', false);
                    ap_is_igv.prop('checked', chk_igv).iCheck('update').prop('disabled', disabled_);
                    ap_affection.val(data.affection).prop('disabled', disabled_);
                    ap_unaffected.val(data.unaffected).prop('disabled', disabled_);
                    ap_exonerated.val(data.exonerated).prop('disabled', disabled_);
                    apCalculateTotal();
                    modalDocument.modal('show');
                } else {
                    $scope.showAlert('', response.message, 'warning');
                }
            });
        }

        $scope.saveVoucher = function () {
            var b_val = true;
            b_val = b_val && gv_code.required();
            b_val = b_val && gv_date.required();
            b_val = b_val && gv_gloss.required();
            b_val = b_val && gv_responsible.required();
            b_val = b_val && gv_amount.required();
            if (b_val) {
                var amount_ = (gv_amount.val() === '') ? 0 : parseFloat(gv_amount.val());
                var params = {
                    'petty_cash_expense_id': pce_id,
                    'code': gv_code.val(),
                    'date': gv_date.val(),
                    'gloss': gv_gloss.val(),
                    'responsible': gv_responsible.val(),
                    'amount': amount_,
                    'is_consumed': (gv_is_consumed.prop('checked')) ? 1 : 0,
                };
                $scope.showConfirm('', '¿Está seguro que desea guardar el Vale?', function () {
                    RESTService.updated('petty_cash_expense/saveVoucher', gv_id, params, function (response) {
                        if (!_.isUndefined(response.status) && response.status) {
                            $scope.showAlert('', 'El Vale de Gasolina se guardó correctamente.', 'success');
                            modalVoucher.modal('hide');
                            loadDocuments(pce_id);
                        } else {
                            $scope.showAlert('', response.message, 'warning');
                        }
                    });
                });
            }
        }

        function findVoucher(id) {
            RESTService.get('petty_cash_expense/findVoucher', id, function (response) {
                if (!_.isUndefined(response.status) && response.status) {
                    var data = response.data;
                    gv_id = id;
                    var disabled_ = (pce_state_id > 1);
                    gv_code.val(data.code).prop('disabled', disabled_);
                    gv_date.val(data.date).prop('disabled', disabled_);
                    gv_gloss.val(data.gloss).prop('disabled', disabled_);
                    gv_responsible.val(data.responsible).prop('disabled', disabled_);
                    var chk_is_consumed = ((parseInt(data.is_consumed)) === 1);
                    gv_is_consumed.prop('disabled', false);
                    gv_is_consumed.prop('checked', chk_is_consumed).iCheck('update').prop('disabled', disabled_);
                    gv_amount.val(data.amount).prop('disabled', disabled_);
                    modalVoucher.modal('show');
                } else {
                    $scope.showAlert('', response.message, 'warning');
                }
            });
        }

        $scope.saveDocumentClose = function () {
            var b_val = true;
            b_val = b_val && ap_close_number.required();
            b_val = b_val && ap_close_gloss.required();
            b_val = b_val && ap_close_responsible.required();
            b_val = b_val && ap_close_total.required();
            if (b_val) {
                var amount_ = (ap_close_total.val() === '') ? 0 : parseFloat(ap_close_total.val());

                var total_doc_ = 0, pce_pc_total_ = parseFloat(replaceAll(pce_pc_total.val(), ',', ''));
                _.each(pce_detail.find('tr'), function (item) {
                    total_doc_ += parseFloat($(item).attr('data-tot'));
                });
                _.each(pce_detail2.find('tr'), function (item) {
                    var tr_doc_ = $(item);
                    if (parseInt(tr_doc_.attr('data-id')) !== parseInt(ap_close_id)) {
                        total_doc_ += parseFloat(tr_doc_.attr('data-tot'));
                    }
                });
                if ((total_doc_ + amount_) > pce_pc_total_) {
                    $scope.showAlert('', 'La sumatoria de los documentos a ingresar: ' +
                        numberFormat(total_doc_+amount_, 2) +
                        ', supera el total de la caja chica: ' + numberFormat(pce_pc_total_, 2) +
                        '. Por favor verifique el detalle del documento', 'warning');
                    return false;
                }
                var params = {
                    'petty_cash_expense_id': pce_id,
                    'number': ap_close_number.val(),
                    'gloss': ap_close_gloss.val(),
                    'responsible': ap_close_responsible.val(),
                    'total': amount_
                };
                $scope.showConfirm('', '¿Está seguro que desea guardar el Documento de Cierre?', function () {
                    RESTService.updated('petty_cash_expense/saveDocumentClose', ap_close_id, params, function (response) {
                        if (!_.isUndefined(response.status) && response.status) {
                            $scope.showAlert('', 'El Documento de Cierre se guardó correctamente.', 'success');
                            modalDocumentClose.modal('hide');
                            loadDocuments(pce_id);
                        } else {
                            $scope.showAlert('', response.message, 'warning');
                        }
                    });
                });
            }
        }

        function findDocumentClose(id) {
            RESTService.get('petty_cash_expense/findDocumentClose', id, function (response) {
                if (!_.isUndefined(response.status) && response.status) {
                    var data = response.data;
                    ap_close_id = id;
                    var disabled_ = (pce_state_id > 1);
                    ap_close_number.val(data.number).prop('disabled', disabled_);
                    ap_close_gloss.val(data.gloss).prop('disabled', disabled_);
                    ap_close_responsible.val(data.responsible).prop('disabled', disabled_);
                    ap_close_total.val(data.total).prop('disabled', disabled_);
                    modalDocumentClose.modal('show');
                } else {
                    $scope.showAlert('', response.message, 'warning');
                }
            });
        }

        var search_pce = getFormSearch('frm-search-pc_expense', 'search_pc_expense', 'LoadRecordsButtonPCE');

        var table_container_pce = $("#table_container_pce");

        table_container_pce.jtable({
            title: "Lista de Gastos de Caja Chica",
            paging: true,
            actions: {
                listAction: base_url + '/petty_cash_expense/list',
                deleteAction: base_url + '/petty_cash_expense/delete'
            },
            toolbar: {
                items: [{
                    cssClass: 'buscador',
                    text: search_pce
                }, {
                    cssClass: 'btn-danger-admin',
                    text: '<i class="fa fa-plus"></i> Rendición',
                    click: function () {
                        newPettyCashExpense();
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
                petty_cash_: {
                    title: 'Caja',
                    width: '5%'
                },
                code: {
                    title: 'N°Rendición',
                    listClass: 'text-center',
                    width: '5%'
                },
                liable_name: {
                    title: 'Responsable'
                },
                observation: {
                    title: 'Glosa'
                },
                date: {
                    title: 'F.Emisión',
                    width: '5%',
                    listClass: 'text-center'
                },
                // pc_total: {
                //     title: 'Saldo Caja (S/.)',
                //     listClass: 'text-right',
                //     width: '5%'
                // },
                total: {
                    title: 'Total Documentos (S/.)',
                    listClass: 'text-right',
                    width: '5%'
                },
                total_v: {
                    title: 'Total Vales (S/.)',
                    listClass: 'text-right',
                    width: '5%'
                },
                // accounting_period: {
                //     title: 'Periodo',
                //     width: '5%',
                //     listClass: 'text-center'
                // },
                state_: {
                    title: 'Estado',
                    width: '5%'
                },
                // user_created: {
                //     title: 'U.Creación',
                //     width: '5%'
                // },
                excel: {
                    width: '1%',
                    edit: false,
                    create: false,
                    listClass: 'text-center',
                    display: function (data) {
                        return '<a href="javascript:void(0)" title="Exportar" class="excel_gcc_" data-code="' +
                            data.record.id + '"><i class="fa fa-file-excel-o fa-1-5x fa-green"></i></a>';
                    }
                },
                edit: {
                    width: '1%',
                    edit: false,
                    create: false,
                    listClass: 'text-center',
                    display: function (data) {
                        return '<a href="javascript:void(0)" title="Editar" class="edit_gcc_" data-code="' +
                            data.record.id + '"><i class="fa fa-pencil-square-o fa-1-5x"></i></a>';
                    }
                }
            },
            recordsLoaded: function (event, data) {
                table_container_pce.find('a.edit_gcc_').click(function (e) {
                    var id = $(this).attr('data-code');
                    findPCE(id);
                    e.preventDefault();
                });
                table_container_pce.find('a.excel_gcc_').click(function (e) {
                    var id = $(this).attr('data-code');
                    $scope.openDoc('petty_cash_expense/excel/' + id);
                    e.preventDefault();
                });
            }
        });

        generateSearchForm('frm-search-pc_expense', 'LoadRecordsButtonPCE', function () {
            table_container_pce.jtable('load', {
                search: $('#search_pc_expense').val(),
                check: (chk_date_range.prop('checked')),
                from: start.format('YYYY-MM-DD'),
                to: end.format('YYYY-MM-DD')
            });
        }, true);

        function callModals()
        {
            call_m = true;

            var search_cc = getFormSearch('frm-search-cash', 'search_cash', 'LoadRecordsButtonCash');

            var table_container_cc = $("#table_container_cash");

            table_container_cc.jtable({
                title: "Lista de Cajas Chicas",
                paging: true,
                actions: {
                    listAction: base_url + '/petty_cash_expense/getPettyCash'
                },
                toolbar: {
                    items: [{
                        cssClass: 'buscador',
                        text: search_cc
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
                    liable_name: {
                        title: 'Responsable'
                    },
                    total: {
                        title: 'Saldo',
                        listClass: 'text-right'
                    },
                    select: {
                        width: '1%',
                        edit: false,
                        create: false,
                        listClass: 'text-center',
                        display: function (data) {
                            return '<a href="javascript:void(0)" title="Seleccionar" class="select_cc" data-id="' +
                                data.record.id + '"><i class="fa fa-' + icon_select + ' fa-1-5x"></i></a>';
                        }
                    }
                },
                recordsLoaded: function (event, data) {
                    table_container_cc.find('a.select_cc').click(function (e) {
                        var cc_id_ = $(this).attr('data-id');
                        var info_ = _.find(data.records, function (item) {
                            return parseInt(item.id) === parseInt(cc_id_);
                        });
                        if (info_) {
                            if (parseFloat(info_.total) <= 0 && parseInt(info_.is_vale) === 0) {
                                $scope.showAlert('', 'Por favor seleccione una Caja con saldo mayor que 0', 'warning');
                                return false;
                            }
                            pce_pc_id = cc_id_;
                            pce_pc_is_voucher = parseInt(info_.is_vale);
                            if (pce_pc_is_voucher === 0) {
                                $('li#pce_li_vouchers').addClass('hide');
                                pce_vouchers.empty();
                            } else {
                                $('li#pce_li_vouchers').removeClass('hide');
                            }
                            pce_pc.val(info_.code + ' ' + info_.description).removeClass('border-red');
                            pce_pc_total.val(info_.total);
                        }
                        modalCash.modal('hide');
                        e.preventDefault();
                    });
                }
            });
            generateSearchForm('frm-search-cash', 'LoadRecordsButtonCash', function () {
                table_container_cc.jtable('load', {
                    search: $('#search_cash').val()
                });
            }, false);

            var search_ca = getFormSearch('frm-search-ca', 'search_ca', 'LoadRecordsButtonCA');

            var table_container_ca = $("#table_container_classification_acquisition");

            table_container_ca.jtable({
                title: "Lista de Clasificación de Adquisición",
                paging: true,
                actions: {
                    listAction: base_url + '/petty_cash_expense/getClassificationAcquisition'
                },
                toolbar: {
                    items: [{
                        cssClass: 'buscador',
                        text: search_ca
                    }]
                },
                fields: {
                    IdClasificacionBSAdquiridos: {
                        key: true,
                        create: false,
                        edit: false,
                        list: false
                    },
                    Descripcion: {
                        title: 'Descripción'
                    },

                    select: {
                        width: '1%',
                        listClass: 'text-center',
                        edit: false,
                        create: false,
                        display: function (data) {
                            return '<a href="javascript:void(0)" title="Seleccionar" class="select_ca_" data-code="' +
                                data.record.IdClasificacionBSAdquiridos + '"><i class="fa fa-' + icon_select + ' fa-1-5x"></i></a>';
                        }
                    }
                },
                recordsLoaded: function (event, data) {
                    table_container_ca.find('a.select_ca_').click(function (e) {
                        var code = $(this).attr('data-code');
                        var info_ = _.find(data.records, function (item) {
                            return item.IdClasificacionBSAdquiridos === code;
                        });
                        if (info_) {
                            ap_classification_acquisition_id = code;
                            ap_classification_acquisition.val(info_.Descripcion);
                        }
                        modalClassificationAcquisition.modal('hide');
                        e.preventDefault();
                    });
                }
            });

            generateSearchForm('frm-search-ca', 'LoadRecordsButtonCA', function () {
                table_container_ca.jtable('load', {
                    search: $('#search_ca').val()
                });
            }, false);

            var search_dt = getFormSearch('frm-search-document_type', 'search_document_type', 'LoadRecordsButtonDocumentType');

            var table_container_dt = $("#table_container_document_type");

            table_container_dt.jtable({
                title: "Lista de Tipos de Documentos",
                paging: true,
                actions: {
                    listAction: base_url + '/petty_cash_expense/getDocumentType'
                },
                toolbar: {
                    items: [{
                        cssClass: 'buscador',
                        text: search_dt
                    }]
                },
                fields: {
                    IdTipoDocumento: {
                        key: true,
                        create: false,
                        edit: false,
                        list: false
                    },
                    EquivalenciaSunat: {
                        title: 'Equivalente Sunat',
                        width: '2%'
                    },
                    Descripcion: {
                        title: 'Descripción'
                    },
                    select: {
                        width: '1%',
                        listClass: 'text-center',
                        edit: false,
                        create: false,
                        display: function (data) {
                            return '<a href="javascript:void(0)" title="Seleccionar" class="select_dt_" data-code="' +
                                data.record.IdTipoDocumento + '"><i class="fa fa-' + icon_select + ' fa-1-5x"></i></a>';
                        }
                    }
                },
                recordsLoaded: function (event, data) {
                    table_container_dt.find('a.select_dt_').click(function (e) {
                        var code = $(this).attr('data-code');
                        var info_ = _.find(data.records, function (item) {
                            return item.IdTipoDocumento === code;
                        });
                        if (info_) {
                            ap_document_type_id = code;
                            ap_document_type.val(info_.Descripcion);
                        }
                        modalDocumentType.modal('hide');
                        e.preventDefault();
                    });
                }
            });

            generateSearchForm('frm-search-document_type', 'LoadRecordsButtonDocumentType', function () {
                table_container_dt.jtable('load', {
                    search: $('#search_document_type').val(),
                    without_letter: true,
                    without_notes: true
                });
            }, false);

            var search_provider = getFormSearch('frm-search-provider', 'search_provider', 'LoadRecordsButtonProvider');

            var table_container_provider = $("#table_container_provider");

            table_container_provider.jtable({
                title: "Lista de Proveedores",
                paging: true,
                actions: {
                    listAction: base_url + '/petty_cash_expense/providersList'
                },
                toolbar: {
                    items: [{
                        cssClass: 'buscador',
                        text: search_provider
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
                        title: 'Dirección Legal'
                    },
                    contact: {
                        title: 'Contacto',
                        width: '3%'
                    },
                    contact_phone: {
                        title: 'Teléf. de Contacto',
                        width: '3%'
                    },
                    select: {
                        width: '1%',
                        listClass: 'text-center',
                        edit: false,
                        create: false,
                        display: function (data) {
                            return '<a href="javascript:void(0)" title="Seleccionar" class="select_prov" data-code="' +
                                data.record.id + '"><i class="fa fa-check-circle fa-1-5x"></i></a>';
                        }
                    },
                },
                recordsLoaded: function (event, data) {
                    table_container_provider.find('a.select_prov').click(function (e) {
                        var code_ = $(this).attr('data-code');
                        var info_ = _.find(data.records, function (item) {
                            return item.id === code_;
                        });
                        if (info_) {
                            ap_provider_id = code_;
                            ap_provider.val(info_.Documento + ' ' + info_.NombreEntidad);
                        }
                        modalProvider.modal('hide');
                        e.preventDefault();
                    });
                }
            });

            generateSearchForm('frm-search-provider', 'LoadRecordsButtonProvider', function () {
                table_container_provider.jtable('load', {
                    search: $('#search_provider').val()
                });
            }, false);

            var search_cco = getFormSearch('frm-search-cco', 'search_cco', 'LoadRecordsButtonCCo');

            var table_container_cco = $("#table_container_cco");

            table_container_cco.jtable({
                title: "Lista de Cuentas Contables",
                paging: true,
                sorting: true,
                actions: {
                    listAction: base_url + '/petty_cash_expense/getCC'
                },
                toolbar: {
                    items: [{
                        cssClass: 'buscador',
                        text: search_cco
                    }]
                },
                fields: {
                    IdCuenta: {
                        title: 'ID Cuenta',
                        width: '4%'
                    },
                    NombreCuenta: {
                        title: 'Cuenta'
                    },
                    select: {
                        width: '1%',
                        sorting: false,
                        edit: false,
                        create: false,
                        listClass: 'text-center',
                        display: function (data) {
                            return '<a href="javascript:void(0)" title="Seleccionar" class="select_cco" data-code="'+
                                data.record.IdCuenta+'"><i class="fa fa-'+icon_select+' fa-1-5x"></i></a>';
                        }
                    }
                },
                recordsLoaded: function(event, data) {
                    table_container_cco.find('a.select_cco').click(function(e) {
                        var code = $(this).attr('data-code');
                        var info_cc = _.find(data.records, function (item) {
                            return item.IdCuenta === code;
                        });
                        if (info_cc) {
                            ap_account_id = code;
                            ap_account.val(code + ' ' + info_cc.NombreCuenta);
                        }
                        modalCCo.modal('hide');
                        e.preventDefault();
                    });
                }
            });

            generateSearchForm('frm-search-cco', 'LoadRecordsButtonCCo', function(){
                table_container_cco.jtable('load', {
                    search: $('#search_cco').val()
                });
            }, false);

            var search_cce = getFormSearch('frm-search-cce', 'search_cce', 'LoadRecordsButtonCCe');

            var table_container_cce = $("#table_container_cce");

            table_container_cce.jtable({
                title: "Centros de Costo",
                paging: true,
                sorting: true,
                actions: {
                    listAction: base_url + '/petty_cash_expense/getCCe'
                },
                toolbar: {
                    items: [{
                        cssClass: 'buscador',
                        text: search_cce
                    }]
                },
                fields: {
                    IdCentroCosto: {
                        title: 'ID',
                        width: '4%'
                    },
                    Descripcion: {
                        title: 'Descripción'
                    },
                    select: {
                        width: '1%',
                        sorting: false,
                        edit: false,
                        create: false,
                        listClass: 'text-center',
                        display: function (data) {
                            return '<a href="javascript:void(0)" title="Seleccionar" class="select_cce" data-code="'+
                                data.record.IdCentroCosto + '"><i class="fa fa-' + icon_select + ' fa-1-5x"></i></a>';
                        }
                    }
                },
                recordsLoaded: function(event, data) {
                    table_container_cce.find('a.select_cce').click(function(e) {
                        var code = $(this).attr('data-code');
                        var info_cce = _.find(data.records, function (item) {
                            return item.IdCentroCosto === code;
                        });
                        if (info_cce) {
                            ap_cost_center_id = code;
                            ap_cost_center.val(info_cce.Descripcion);
                        }
                        modalCCe.modal('hide');
                        e.preventDefault();
                    });
                }
            });

            generateSearchForm('frm-search-cce', 'LoadRecordsButtonCCe', function(){
                table_container_cce.jtable('load', {
                    search: $('#search_cce').val()
                });
            }, false);
        }

        getDataForm();

        function chkVouchers(origin) {
            if (origin === 0) {
                var is_chk = pce_v_chk.prop('checked');
                pce_vouchers.find('input.pce_v_chk').prop('checked', is_chk).iCheck('update');
            } else {
                var is_chk_ = true;
                _.each(pce_vouchers.find('input.pce_v_chk'), function (inp) {
                    if (!$(inp).prop('checked')) {
                        is_chk_ = false;
                        return false;
                    }
                });
                pce_v_chk.prop('checked', is_chk_).iCheck('update');
            }
        }
    }

    function Config($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('petty_cash_expense', {
                url: '/petty_cash_expense',
                templateUrl: base_url + '/templates/petty_cash_expense/base.html',
                controller: 'PettyCashExpenseCtrl'
            });

        $urlRouterProvider.otherwise('/');
    }
})
();