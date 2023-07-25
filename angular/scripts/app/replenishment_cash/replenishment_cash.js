/**
 * Created by EVER on 28/04/2017.
 */
(function () {
    'use strict';
    angular.module('sys.app.replenishment_cashs')
        .config(Config)
        .controller('ReplenishmentCashCtrl', ReplenishmentCashCtrl);

    Config.$inject = ['$stateProvider', '$urlRouterProvider'];

    ReplenishmentCashCtrl.$inject = ['$scope', '_', 'RESTService'];

    function ReplenishmentCashCtrl($scope, _, RESTService)
    {
        var modalRC;
        var titleRC;
        var modalPettyCash;
        var modalPaymentMethod;
        var call_m = false;

        var rc_id = 0;
        var rc_state = 1;
        var rc_date;
        var rc_accounting_period;
        var rc_type_change;
        var rc_petty_cash_id = '';
        var rc_petty_cash;
        var rc_responsible;
        var rc_user_required;
        var rc_currency;
        var rc_concept;
        var rc_payment_method_id = '';
        var rc_payment_method;
        var rc_origin_change = 0;
        var rc_number;
        var rc_bank_id;
        var rc_current_account_id;
        var rc_amount;

        var rc_currency_data = [];
        var rc_bank_data = [];
        var rc_bank_account_data = [];

        function clearRC() {
            cleanRequired();
            titleRC.empty();
            rc_id = 0;
            rc_state = 1;
            rc_date.val('').prop('disabled', false);
            rc_accounting_period.val('');
            rc_type_change.val('');
            rc_petty_cash_id = '';
            rc_petty_cash.val('');
            rc_petty_cash.next('span').find('button').prop('disabled', false);
            rc_responsible.val('');
            rc_user_required.val('').prop('disabled', false);
            rc_currency.val('1').prop('disabled', false);
            rc_concept.val('').prop('disabled', false);
            rc_payment_method_id = '';
            rc_payment_method.val('');
            rc_payment_method.next('span').find('button').prop('disabled', false);
            rc_origin_change = 0;
            rc_number.val('').prop('disabled', false);
            rc_bank_id.val('').prop('disabled', false).trigger('change.select2');
            rc_current_account_id.val('').trigger('change.select2');
            rc_current_account_id.prop('disabled', true);
            rc_amount.val('').prop('disabled', false);
            $('button.btn-save').removeClass('hide');
            $('button.btn-process').addClass('hide');
        }

        function getDataForm() {
            RESTService.all('replenishment_cashs/data_form', '', function (response) {
                if (!_.isUndefined(response.status) && response.status) {
                    rc_currency_data = response.currency;
                    rc_bank_data = response.bank;
                    rc_bank_account_data = response.bankAccount;
                }
            }, function () {
                getDataForm();
            });
        }

        function overModals() {
            if (!call_m) {
                titleRC = $('#titleRC');
                rc_date = $("#rc_date");
                rc_date.addClass('readonly-white').datepicker({
                    changeMonth: true,
                    changeYear: true,
                    dateFormat: 'dd/mm/yy',
                    beforeShow: function () {
                        setTimeout(function () {
                            $('.ui-datepicker').css('z-index', 2052);
                        });
                    },
                    onSelect: function (dateText, instance) {
                        validTypeChangeRC(this.value, instance.lastVal);
                    }
                });
                rc_accounting_period = $("#rc_accounting_period");
                rc_type_change = $("#rc_type_change");
                rc_petty_cash = $("#rc_petty_cash");
                rc_responsible = $("#rc_responsible");
                rc_user_required = $("#rc_user_required");
                rc_currency = $('#rc_currency');
                rc_currency.empty();
                _.each(rc_currency_data, function (item) {
                    rc_currency.append('<option value="' + item.Value + '">' + item.DisplayText + '</option>');
                });
                rc_concept = $('#rc_concept');
                rc_payment_method = $("#rc_payment_method");
                rc_number = $("#rc_number");

                rc_bank_id = $('#rc_bank_id');
                rc_bank_id.html('<option value="">SELECCIONAR</option>');
                _.each(rc_bank_data, function (item) {
                    rc_bank_id.append('<option value="' + item.Value + '">' + item.DisplayText + '</option>');
                });
                rc_bank_id.select2();
                rc_bank_id.change(function (e) {
                    if (rc_payment_method.val() === '' && rc_origin_change === 0) {
                        $scope.showAlert('', 'Debe seleccionar forma de ingreso.', 'warning');
                        rc_bank_id.val('').trigger('change.select2');
                        return false;
                    } else {
                        loadBankAccount(rc_bank_id.val());
                        rc_current_account_id.prop('disabled', false);
                    }
                    e.preventDefault();
                });

                rc_current_account_id = $('#rc_current_account_id');
                rc_current_account_id.html('<option value="">SELECCIONAR</option>');
                _.each(rc_bank_account_data, function (item) {
                    rc_current_account_id.append('<option value="' + item.Value + '">' + item.Value + ' ' + item.DisplayText + '</option>');
                });
                rc_current_account_id.select2();
                rc_current_account_id.change(function () {
                    if (rc_bank_id.val() === '' && rc_origin_change === 0) {
                        $scope.showAlert('', 'Debe Seleccionar banco.', 'warning');
                        rc_current_account_id.val('');
                        return false;
                    }
                });
                rc_amount = $('#rc_amount');

                modalRC = $('#modalRC');
                modalRC.on('hidden.bs.modal', function (e) {
                    clearRC();
                });

                modalPettyCash = $('#modalPettyCash');
                modalPettyCash.on('show.bs.modal', function (e) {
                    $('#LoadRecordsButtonCash').click();
                    modalRC.attr('style', 'display:block; z-index:2030 !important');
                });
                modalPettyCash.on('hidden.bs.modal', function (e) {
                    $('#search_cash').val('');
                    $('#LoadRecordsButtonCash').click();
                    modalRC.attr('style', 'display:block; overflow-y: auto;');
                });

                modalPaymentMethod = $("#modalPaymentMethod");
                modalPaymentMethod.on('show.bs.modal', function (e) {
                    $('#LoadRecordsButtonPaymentMethod').click();
                    modalRC.attr('style', 'display:block; z-index:2030 !important');
                });
                modalPaymentMethod.on('hidden.bs.modal', function (e) {
                    $('#search_pm').val('');
                    $('#LoadRecordsButtonPaymentMethod').click();
                    modalRC.attr('style', 'display:block;');
                });

                call_m = true;

                callModals();
            }
        }

        function newRC() {
            overModals();
            titleRC.html('Nueva Reposición de Caja Chica');
            modalRC.modal('show');
        }

        $scope.openPettyCash = function () {
            modalPettyCash.modal('show');
        };

        $scope.openPaymentMethod = function () {
            modalPaymentMethod.modal('show');
        };

        $scope.saveRC = function (option) {
            var b_val = true;
            b_val = b_val && rc_date.required();
            b_val = b_val && rc_petty_cash.required();
            b_val = b_val && rc_user_required.required();
            b_val = b_val && rc_concept.required();
            b_val = b_val && rc_payment_method.required();
            if (b_val && rc_payment_method_id !== 'EFE') {
                b_val = b_val && rc_number.required();
            }
            if (b_val && rc_payment_method_id !== 'EFE') {
                if (rc_bank_id.val() === '') {
                    rc_bank_id.select2('open');
                    return false;
                }
                if (rc_current_account_id.val() === '') {
                    rc_current_account_id.select2('open');
                    return false;
                }
            }
            b_val = b_val && rc_amount.required();
            if (b_val) {
                var params = {
                    'option': option,
                    'date': rc_date.val(),
                    'petty_cash_id': rc_petty_cash_id,
                    'delivered_to': rc_user_required.val(),
                    'currency_id': rc_currency.val(),
                    'concept': rc_concept.val(),
                    'payment_method_id': rc_payment_method_id,
                    'number': rc_number.val(),
                    'bank_id': rc_bank_id.val(),
                    'current_account_id': rc_current_account_id.val(),
                    'total': rc_amount.val()
                };
                var txt_confirm_ = (option === 1) ? 'guardar' : 'procesar';
                $scope.showConfirm('', '¿Está seguro que desea ' + txt_confirm_ + ' la reposición?', function () {
                    RESTService.updated('replenishment_cashs/save', rc_id, params, function (response) {
                        if (!_.isUndefined(response.status) && response.status) {
                            var txt_success_ = (option === 1) ? 'guardó' : 'procesó';
                            $scope.showAlert('', 'Reposición de caja chica se ' + txt_success_ + ' correctamente.', 'success');
                            modalRC.modal('hide');
                            $('#LoadRecordsButtonRC').click();
                        } else {
                            $scope.showAlert('', response.message, 'warning');
                        }
                    });
                });
            }
        };

        function findRC(id) {
            overModals();
            RESTService.get('replenishment_cashs/find', id, function (response) {
                if (!_.isUndefined(response.status) && response.status) {
                    var data = response.data;
                    rc_id = id;
                    rc_state = parseInt(data.state_id);
                    var disabled_ = (rc_state > 1);
                    rc_date.val(data.date).prop('disabled', disabled_);
                    rc_accounting_period.val(data.period_id);
                    rc_petty_cash_id = data.petty_cash_id;
                    rc_petty_cash.val(data.petty_cash_);
                    rc_petty_cash.next('span').find('button').prop('disabled', disabled_);
                    rc_responsible.val(data.liable_);
                    rc_user_required.val(data.delivered_to).prop('disabled', disabled_);
                    rc_currency.val(data.currency_id).prop('disabled', disabled_);
                    rc_type_change.val(data.type_change_);
                    rc_concept.val(data.concept).prop('disabled', disabled_);
                    rc_payment_method_id = data.payment_method_id;
                    rc_payment_method.val(data.payment_method_);
                    rc_payment_method.next('span').find('button').prop('disabled', disabled_);
                    rc_number.val(data.number).prop('disabled', disabled_);
                    if (data.payment_method_id === 'EFE') {
                        rc_bank_id.val(data.bank_id).prop('disabled', true).trigger('change.select2');
                        rc_current_account_id.val(data.current_account_id).prop('disabled', true).trigger('change.select2');
                    } else {
                        rc_bank_id.val(data.bank_id).prop('disabled', disabled_).trigger('change.select2');
                        rc_current_account_id.val(data.current_account_id).prop('disabled', true).trigger('change.select2');
                    }
                    var total_ = (disabled_) ? numberFormat(data.total, 2) : data.total;
                    rc_amount.val(total_).prop('disabled', disabled_);
                    if (disabled_) {
                        $('button.btn-save').addClass('hide');
                    } else {
                        $('button.btn-process').removeClass('hide');
                    }
                    var txt_ = (rc_state > 1) ? 'Ver' : 'Editar';
                    titleRC.html(txt_ + ' Reposición de Caja Chica');
                    modalRC.modal('show');
                } else {
                    $scope.showAlert('', response.message, 'warning');
                }
            });
        }

        var search = getFormSearch('frm-search-rc', 'search_rc', 'LoadRecordsButtonRC');

        var table_container_rc = $("#table_container_rc");

        table_container_rc.jtable({
            title: "Lista de Reposición de Caja",
            paging: true,
            actions: {
                listAction: base_url + '/replenishment_cashs/list',
                deleteAction: base_url + '/replenishment_cashs/delete'
            },
            toolbar: {
                items: [{
                    cssClass: 'buscador',
                    text: search
                }, {
                    cssClass: 'btn-danger-admin',
                    text: '<i class="fa fa-plus"></i> Nuevo',
                    click: function () {
                        newRC();
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
                    width: '4%'
                },
                liable_: {
                    title: 'Responsable',
                    width: '5%'
                },
                payment_method_: {
                    title: 'Forma de Ingreso',
                    width: '7%'
                },
                number: {
                    title: 'Número Op.',
                    listClass: 'text-center',
                    width: '5%'
                },
                date: {
                    title: 'Fecha',
                    listClass: 'text-center',
                    width: '5%'
                },
                concept: {
                    title: 'Concepto',
                    width: '7%'
                },
                total: {
                    title: 'Monto',
                    listClass: 'text-right',
                    width: '5%'
                },
                state_: {
                    title: 'Estado',
                    width: '5%'
                },
                edit: {
                    width: '1%',
                    sorting: false,
                    edit: false,
                    create: false,
                    display: function (data) {
                        return '<a href="javascript:void(0)" title="Editar" class="edit_rc" data-code="' +
                            data.record.id + '"><i class="fa fa-pencil-square-o fa-1-5x fa-green"></i></a>';
                    }
                }
            },
            recordsLoaded: function (event, data) {
                table_container_rc.find('a.edit_rc').click(function (e) {
                    var code_ = $(this).attr('data-code');
                    findRC(code_);
                    e.preventDefault();
                });
            }
        });

        generateSearchForm('frm-search-rc', 'LoadRecordsButtonRC', function () {
            table_container_rc.jtable('load', {
                search: $('#search_rc').val()
            });
        }, true);

        function callModals()
        {
            var search_cc = getFormSearch('frm-search-cash', 'search_cash', 'LoadRecordsButtonCash');

            var table_container_cc = $("#table_container_cash");

            table_container_cc.jtable({
                title: "Lista de Cajas Chicas",
                paging: true,
                actions: {
                    listAction: base_url + '/replenishment_cashs/getPettyCash'
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
                        sorting: false,
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
                        var mod_id = $(this).attr('data-id');
                        var info_ = _.find(data.records, function (item) {
                            return parseInt(item.id) === parseInt(mod_id);
                        });
                        if (info_) {
                            rc_petty_cash_id = mod_id;
                            rc_petty_cash.val(info_.code + ' - ' + info_.description).removeClass('border-red');
                            rc_responsible.val(info_.liable_name);
                        }
                        modalPettyCash.modal('hide');
                        e.preventDefault();
                    });
                }
            });
            generateSearchForm('frm-search-cash', 'LoadRecordsButtonCash', function () {
                table_container_cc.jtable('load', {
                    search: $('#search_cash').val()
                });
            }, false);

            var search_pm = getFormSearch('frm-search-pm', 'search_pm', 'LoadRecordsButtonPaymentMethod');

            var table_container_pm = $("#table_container_payment_method");

            table_container_pm.jtable({
                title: "Lista de Forma de Ingreso",
                paging: true,
                actions: {
                    listAction: base_url + '/replenishment_cashs/getPaymentMethod'
                },
                toolbar: {
                    items: [{
                        cssClass: 'buscador',
                        text: search_pm
                    }]
                },
                fields: {
                    codigo_formapago: {
                        key: true,
                        create: false,
                        edit: false,
                        title: 'Código',
                        width: '2%',
                        listClass: 'text-center'
                    },
                    forma_pago: {
                        title: 'Descripción'
                    },
                    select: {
                        width: '1%',
                        edit: false,
                        create: false,
                        listClass: 'text-center',
                        display: function (data) {
                            return '<a href="javascript:void(0)" title="Seleccionar" class="select_pm" data-id="' +
                                data.record.codigo_formapago + '"><i class="fa fa-' + icon_select + ' fa-1-5x"></i></a>';
                        }
                    }
                },
                recordsLoaded: function (event, data) {
                    table_container_pm.find('a.select_pm').click(function (e) {
                        var mod_id = $(this).attr('data-id');
                        var info_ = _.find(data.records, function (item) {
                            return item.codigo_formapago === mod_id;
                        });
                        if (info_) {
                            rc_payment_method_id = mod_id;
                            rc_payment_method.val(info_.forma_pago).removeClass('border-red');
                            if (mod_id === 'EFE') {
                                rc_origin_change = 1;
                                rc_bank_id.prop('disabled', true).val('').trigger('change.select2');
                                rc_current_account_id.prop('disabled', true).val('').trigger('change.select2');
                            } else {
                                rc_origin_change = 0;
                                rc_bank_id.prop('disabled', false);
                            }
                        }
                        modalPaymentMethod.modal('hide');
                        e.preventDefault();
                    });
                }
            });
            generateSearchForm('frm-search-pm', 'LoadRecordsButtonPaymentMethod', function () {
                table_container_pm.jtable('load', {
                    search: $('#search_pm').val()
                });
            }, false);
        }

        function validTypeChangeRC(date, last_date) {
            date = moment(date, 'DD/MM/YYYY').format('YYYY-MM-DD');
            RESTService.get('replenishment_cashs/validTypeChange', date, function (response) {
                if (!_.isUndefined(response.status) && response.status) {
                    rc_accounting_period.val(response.data.ap);
                    rc_type_change.val(response.data.tc);
                    rc_date.removeClass('border-red');
                } else {
                    $scope.showAlert('', response.message, 'warning');
                    rc_date.val(last_date);
                }
            });
        }

        function loadBankAccount(bank) {
            rc_current_account_id.html('<option value="">SELECCIONAR</option>');
            if (bank !== '' && !_.isUndefined(bank)) {
                RESTService.get('replenishment_cashs/findBankAccount', bank, function (response) {
                    _.each(response.bankAccount, function (item) {
                        rc_current_account_id.append('<option value="' + item.Value + '">' + item.Value + ' - ' + item.DisplayText + '</option>');
                    });
                });
            }
        }

        getDataForm();
    }

    function Config($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('replenishment_cashs', {
                url: '/replenishment_cashs',
                templateUrl: base_url + '/templates/replenishment_cashs/base.html',
                controller: 'ReplenishmentCashCtrl'
            });

        $urlRouterProvider.otherwise('/');
    }
})
();