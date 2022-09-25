/**
 * Created by EVER on 4/17/2017.
 */
(function () {
    'use strict';
    angular.module('sys.app.transfers')
        .config(Config)
        .controller('TransferCtrl', TransferCtrl);

    Config.$inject = ['$stateProvider', '$urlRouterProvider'];
    TransferCtrl.$inject = ['$scope', '_', 'RESTService', 'AlertFactory'];

    function TransferCtrl($scope, _, RESTService, AlertFactory) {
        moment.locale('es');

        var modalTR;
        var modalProduct;
        var modalRG;
        var titleTr;
        var btnActionReq;
        var reqDates = $('#reqDates');
        var t_state;
        var state_state;
        var t_transfer_date;
        var transfer_detail;
        var default_ware = '';
        var default_proof = '';
        var default_MotTransfer = '';
        var warehouse;
        var t_warehouse_origin_id;
        var t_warehouse_destination_id;
        var rg_warehouse_origin_id;
        var rg_warehouse_destination_id;
        var t_name;
        var t_type_id;
        var t_transfer_id;
        var modalEnt;
        var rg_id;
        var rg_entity_id;
        var rg_document;
        var rg_social_reason;
        var rg_address;
        var modalTC;
        var default_warehouse = '';
        var rg_transport_company_id;
        var rg_transport_company_name;
        var rg_date;
        var warehouse_origin;
        var warehouse_destination;
        var rg_date_transfer;
        var address_destination;
        var rg_address_destination;
        var warehouse_local;
        var rg_local;
        var t_file_add;
        var t_file_provider;
        var rg_motive_transfer_id;
        var modalProj;
        var t_project_id;
        var t_project_description;
        var t_project_code;
        var rg_total;
        var rg_project_code;
        var rg_project_description;
        var t_file_description;
        var t_button_clear_id;
        var t_button_project_id;
        var rg_document_type_id;
        var rg_serial_type;
        var rg_type_number;
        var rg_transport_unit;
        var rg_license_plate;
        var rg_license;
        var rg_driver;
        var rg_oc_entity;
        var rg_type_entity;
        var state_entity;
        var state_transfer;
        var t_search_article_id;
        var t_button_transferProcess;
        var t_save_button_transferProcess;
        var t_save_button_transfer;
        var rg_observation;
        var s_serial;
        var s_number;
        var modalSerial;
        var rg_body_referral_guides;
        var transfer_id_create;
        var referral_id_create = 0;
        var button_print_referral_guide;
        var button_save_referral_guide;
        var state_referralGuide;
        var type_window;
        var modalState;
        var referral_id_create_serial = 0;
        var state_print = false;
        var array_numberSerial = [];

        $scope.chkState = function () {
            var txt_state2 = (t_state.prop('checked')) ? 'Activo' : 'Inactivo';
            state_state.html(txt_state2);
            var txt_state = (rg_type_entity.prop('checked')) ? 'Si' : 'No';
            state_entity.html(txt_state);
        };


        function overModals() {
            if (!call_m) {
                modalTR = $('#modalTR');
                modalTC = $("#modalTransportCompany");
                titleTr = $('#title-tr');
                rg_id = $("#rg_id");
                rg_entity_id = $("#rg_entity_id");
                rg_document = $("#rg_document");
                rg_social_reason = $("#rg_social_reason");
                rg_address = $("#rg_address");
                modalEnt = $("#modalEntity");
                btnActionReq = $('#btn_action_req');
                modalRG = $("#modalRG");
                t_state = $("#t_state");
                state_state = $("#state_state");
                t_transfer_date = $("#t_transfer_date");
                transfer_detail = $("#transfer_detail");
                t_warehouse_origin_id = $("#t_warehouse_origin_id");
                t_warehouse_destination_id = $("#t_warehouse_destination_id");
                rg_warehouse_origin_id = $("#rg_warehouse_origin_id");
                rg_warehouse_destination_id = $("#rg_warehouse_destination_id");
                t_name = $("#t_name");
                t_type_id = $("#t_type_id");
                t_transfer_id = $("#t_transfer_id");
                rg_transport_company_id = $("#rg_transport_company_id");
                rg_transport_company_name = $("#rg_transport_company_name");
                rg_date = $("#rg_date");
                rg_date_transfer = $("#rg_date_transfer");
                rg_address_destination = $("#rg_address_destination");
                rg_local = $("#rg_local");
                t_file_add = $('#t_file_add');
                rg_motive_transfer_id = $("#rg_motive_transfer_id");
                modalProj = $("#modalProject");
                t_project_id = $("#t_project_id");
                t_project_code = $("#t_project_code");
                t_project_description = $("#t_project_description");
                modalProduct = $("#modalProduct");
                rg_total = $("#rg_total");
                rg_project_code = $("#rg_project_code");
                rg_project_description = $("#rg_project_description");
                t_button_clear_id = $("#t_button_clear_id");
                t_button_project_id = $("#t_button_project_id");
                rg_oc_entity = $("#rg_oc_entity");
                rg_type_entity = $("#rg_type_entity");
                state_entity = $("#state_entity");
                t_search_article_id = $("#t_search_article_id");
                t_save_button_transferProcess = $("#t_save_button_transferProcess");
                t_save_button_transfer = $("#t_save_button_transfer");
                rg_observation = $("#rg_observation");
                s_serial = $("#s_serial");
                s_number = $("#s_number");
                modalSerial = $("#modalSerial");
                rg_document_type_id = $("#rg_document_type_id");
                rg_transport_unit = $("#rg_transport_unit");
                rg_license_plate = $("#rg_license_plate");
                rg_license = $("#rg_license");
                rg_driver = $("#rg_driver");
                rg_body_referral_guides = $('#rg_body_referral_guides');
                button_print_referral_guide = $("#button_print_referral_guide");
                button_save_referral_guide = $("#button_save_referral_guide");
                modalState = $("#modalState");

                t_file_add.fileinput({
                    language: "es",
                    uploadUrl: base_url + '/transfers/uploadTransfer',
                    uploadAsync: true,
                    showUpload: false
                }).on("filebatchselected", function (event, files) {
                    t_file_provider = '';
                    t_file_add.fileinput("upload");
                }).on('fileuploaded', function (event, data, id, index) {
                    if (!_.isUndefined(data.response.status) && data.response.status) {
                        var file_name = data.response.uploaded;
                        t_file_description = file_name;
                        t_file_provider = file_name;
                        $('.file-caption-name').attr('title', file_name)
                            .html('<i class="glyphicon glyphicon-file kv-caption-icon"></i> ' + file_name);
                    }
                }).on('filecleared', function (event) {
                    t_file_provider = '';
                }).on('fileuploaderror', function (event, data, msg) {
                    setTimeout(function () {
                        $('.kv-upload-progress').find('.progress-bar').removeClass('progress-bar-success')
                            .addClass('progress-bar-danger').html(data.response.error);
                    }, 200);
                });

                t_transfer_date.datepicker({
                    changeMonth: true,
                    changeYear: true,
                    dateFormat: 'dd/mm/yy',
                    beforeShow: function () {
                        setTimeout(function () {
                            $('.ui-datepicker').css('z-index', 2052);
                        });
                    }
                });

                rg_date_transfer.datepicker({
                    changeMonth: true,
                    changeYear: true,
                    dateFormat: 'dd/mm/yy',
                    beforeShow: function () {
                        setTimeout(function () {
                            $('.ui-datepicker').css('z-index', 2052);
                        });
                    }
                });

                modalRG.on('hidden.bs.modal', function (e) {
                    modalTR.attr('style', 'display:block;');

                });
                modalRG.on('show.bs.modal', function (e) {
                    modalTR.attr('style', 'display:block; z-index:2030 !important');
                });

                modalProj.on('hidden.bs.modal', function (e) {
                    modalTR.attr('style', 'display:block;');
                });
                modalProj.on('show.bs.modal', function (e) {
                    modalTR.attr('style', 'display:block; z-index:2030 !important');
                });
                modalProduct.on('hidden.bs.modal', function (e) {
                    modalTR.attr('style', 'display:block;');
                });
                modalProduct.on('show.bs.modal', function (e) {
                    modalTR.attr('style', 'display:block; z-index:2030 !important');
                });
                modalSerial.on('hidden.bs.modal', function (e) {
                    modalRG.attr('style', 'display:block;');
                });
                modalSerial.on('show.bs.modal', function (e) {
                    modalRG.attr('style', 'display:block; z-index:2030 !important');
                    $('#show_loading').addClass('hide');
                    getSerial(function () {
                        $('#show_loading').removeClass('hide');
                    });
                });

                modalTR.on('hidden.bs.modal', function (e) {
                    cleanTransfer();
                });

                $('.i-checks').iCheck({
                    checkboxClass: 'icheckbox_square-green'
                }).on('ifChanged', function (event) {
                    $(event.target).click();
                    $scope.chkState();
                });

                callModals();
            }
            t_name.val(user_default);

            t_warehouse_origin_id.change(function () {
                warehouse = t_warehouse_origin_id.val();
                warehouse_origin = warehouse;
            });

            t_warehouse_destination_id.change(function () {
                if (warehouse === t_warehouse_destination_id.val()) {
                    AlertFactory.textType({
                        title: '',
                        message: 'El almacén destino no puede ser igual que el almacen origin.',
                        type: 'warning'
                    });
                    t_warehouse_destination_id.val('');
                }
                warehouse_destination = t_warehouse_destination_id.val();
                address_destination = t_warehouse_destination_id.find("option:selected").attr('data-address');
                warehouse_local = t_warehouse_destination_id.find("option:selected").attr('data-local');

            });
            t_warehouse_origin_id.select2();
            t_warehouse_destination_id.select2();
        }

        function cleanTransfer() {
            cleanRequired();
            titleTr.html('');
            t_transfer_id.val('');
            t_transfer_date.val('').prop('disabled', false);
            t_project_id.val('');
            t_project_code.val('');
            t_project_description.val('');
            t_warehouse_origin_id.val(default_warehouse).prop('disabled', false);
            t_warehouse_destination_id.val(default_warehouse).prop('disabled', false);
            transfer_detail.html('');
            t_type_id.val(1).prop('disabled', false);
            t_state.prop('checked', true).iCheck('update');
            arr_detail = [];
            t_button_clear_id.prop('disabled', false);
            t_button_project_id.prop('disabled', false);
            t_file_add.prop('disabled', false);
            t_search_article_id.prop('disabled', false);
            t_save_button_transfer.prop("disabled", false);
            t_save_button_transferProcess.prop('disabled', false);
            rg_observation.val('');
            s_serial.val('');
            s_number.val('');
            rg_oc_entity.val('');
            button_save_referral_guide.prop('disabled', false);
            button_print_referral_guide.prop('disabled', true);
            $("#condition_print_detail").hide();
            array_numberSerial = [];
        }

        $scope.printReferralGuideTransfer = function () {
            modalSerial.modal('show');
        };


        $scope.addDetail = function () {
            var $selectedRows = $("#table_container_pr").jtable('selectedRows');
            if ($selectedRows.length > 0) {
                $selectedRows.each(function () {
                    var record = $(this).data('record');
                    if (parseFloat(record.stock_p) === 0) {
                        AlertFactory.showWarning({
                            title: '',
                            message: 'El stock debe ser mayor que 0'
                        });
                        return false;
                    }
                    else {
                        validItemDetail(record);
                    }
                });
            } else {
                AlertFactory.textType({
                    title: '',
                    message: 'Debe seleccionar al menos un artículo a asignar.',
                    type: 'warning'
                });
                return false;
            }
            clearRowsAR();
        };

        function getDataForm() {
            RESTService.all('transfers/data_form', '', function (response) {
                if (!_.isUndefined(response.status) && response.status) {
                    $("#t_warehouse_origin_id").append('<option value="" selected>SELECCIONAR</option>');
                    _.each(response.warehouse, function (item) {
                        if (default_ware === '') default_ware = item.Value;
                        $("#t_warehouse_origin_id").append('<option value="' + item.Value + '">' + item.DisplayText + '</option>');
                        $("#rg_warehouse_origin_id").append('<option value="' + item.Value + '">' + item.DisplayText + '</option>');
                    });
                    $("#t_warehouse_destination_id").append('<option value="" selected>SELECCIONAR</option>');
                    _.each(response.warehouse, function (item) {
                        if (default_ware === '') default_ware = item.Value;
                        $("#t_warehouse_destination_id").append('<option value="' + item.Value + '" data-address="' + item.Address + '"  data-local="' + item.Local + '" >' + item.DisplayText + '</option>');
                        $("#rg_warehouse_destination_id").append('<option value="' + item.Value + '" >' + item.DisplayText + '</option>');
                    });
                    _.each(response.DocumentType, function (item) {
                        if (default_proof === '') default_proof = item.Value;
                        if (item.Value === '09') {
                            $("#rg_document_type_id").append('<option value="' + item.Value + '" selected>' + item.DisplayText + '</option>');
                        }
                    });
                    _.each(response.MotiveTransfer, function (item) {
                        if (default_MotTransfer === '') default_MotTransfer = item.Value;
                        if (item.Value === 8) {
                            $("#rg_motive_transfer_id").append('<option value="' + item.Value + '" selected>' + item.DisplayText + '</option>');
                        }
                    });
                    _.each(response.NumberSerial, function (b) {
                        array_numberSerial.push(b.DisplayText);
                    });
                }
            }, function () {
                getDataForm();
            });
        }

        getDataForm();

        function newTransfer() {
            overModals();
            modalTR.modal('show');
            titleTr.html('Nueva Transferencia');
            btnActionReq.addClass('hide');
        }

        var arr_detail = [];

        function validItemDetail(row) {
            if (row.stock_p < 0 || row.stock_p === '' || row.stock_p === null) {
                AlertFactory.showWarning({
                    title: '',
                    message: 'El stock debe ser mayor que 0'
                });
                return false;
            } else {
                if (!_.contains(arr_detail, row.id)) {
                    addToTransfer(row.id, row.code_article, row.description_detail, row.um_id, row.average_cost, row.stock_p, row.transferred, row.state_transfer, row.toTransfer);
                    arr_detail.push(row.id);
                }
            }
        }

        function findTransfer(id) {
            overModals();
            titleTr.html('Editar Transferencia');
            RESTService.get('transfers/find', id, function (response) {
                if (!_.isUndefined(response.status) && response.status) {
                    var data = response.data;
                    t_transfer_id.val(data.id);
                    t_transfer_date.val(data.transfer_date);
                    t_project_id.val(data.project_id);
                    t_project_code.val(data.project_code);
                    t_type_id.val(data.type_id);
                    t_project_description.val(data.project_description);
                    t_warehouse_origin_id.val(data.warehouse_origin_id).trigger('change');
                    t_warehouse_destination_id.val(data.warehouse_destination_id).trigger('change');
                    rg_observation.val(data.observation);
                    s_serial.val('');
                    s_number.val('');
                    modalTR.modal('show');
                    _.each(data.product, function (record) {
                        validItemDetail(record);
                    });
                    if (data.state_transfer === '1') {
                        t_type_id.prop('disabled', true);
                        t_transfer_date.prop('disabled', true);
                        t_button_clear_id.prop('disabled', true);
                        t_warehouse_origin_id.prop('disabled', true);
                        t_warehouse_destination_id.prop('disabled', true);
                        t_button_project_id.prop('disabled', true);
                        t_file_add.prop('disabled', true);
                        t_search_article_id.prop('disabled', true);
                        t_save_button_transfer.prop('disabled', true);
                        t_save_button_transferProcess.prop('disabled', true);
                    }
                } else {
                    AlertFactory.textType({
                        title: '',
                        message: 'Hubo un error al obtener  la transferencia. Intente nuevamente.',
                        type: 'error'
                    });
                }
            });
        }

        function generateDetailRG() {
            rg_total.html(0);
            for (var i = 0; i < array_product_code.length; i++) {
                var tr = $('<tr class="rowCon"></tr>');
                var td1 = $('<td class="text-center td_numbers">' + array_product_code[i] + '</td>');
                var td2 = $('<td class="text-center">' + array_product_description[i] + '</td>');
                var td3 = $('<td>' + array_unit[i] + '</td>');
                var td5 = $('<td class="text-right">' + array_cost[i] + '</td>');
                var td6 = $('<td class="text-right">' + array_transferred[i] + '</td>');
                var rg_import = array_cost[i] * array_transferred[i];
                var td6a = $('<td class="text-right">' + rg_import.toFixed(2) + '</td>');
                tr.append(td1).append(td2).append(td3).append(td5).append(td6).append(td6a);
                rg_body_referral_guides.append(tr);

                var total_calculated = parseFloat(rg_total.html());
                if (isNaN(total_calculated)) {
                    total_calculated = 0;
                }
                total_calculated = parseFloat(total_calculated) + parseFloat(parseFloat(array_cost[i]) * parseFloat(array_transferred[i]));
                rg_total.html(total_calculated.toFixed(2));
            }
            array_product_id = [];
            array_product_code = [];
            array_product_description = [];
            array_cost = [];
            array_unit = [];
        }


        function getSerial(callback) {
            array_numberSerial = [];
            RESTService.all('referral_guides/data_search', '', function (response) {
                if (!_.isUndefined(response.status) && response.status) {
                    _.each(response.NumberSerial, function (b) {
                        array_numberSerial.push(parseFloat(parseFloat(b.DisplayText) + '' + parseFloat(b.DisplayNumber)));
                    });
                }
                if (_.isFunction(callback)) {
                    callback();
                }
            }, function () {
                getSerial('');
            });
        }

        getSerial('');


        $scope.saveTransferProcess = function () {
            state_transfer = 1;
            SaveValidationTransfer();
        };

        $scope.saveTransfer = function () {
            state_transfer = 0;
            SaveValidationTransfer();
        };

        function SaveValidationTransfer() {

            var bval = true;
            bval = bval && t_transfer_date.required();
            bval = bval && t_warehouse_origin_id.required();
            bval = bval && t_warehouse_destination_id.required();

            if (bval && transfer_detail.html() === '') {
                AlertFactory.showWarning({
                    title: '',
                    message: 'Debe agregar mínimo 1 artículo'
                });
                return false;
            }

            if (bval) {
                if (t_type_id.val() === '1') {
                    SaveEndTransfer();
                }
                else {
                    rg_warehouse_origin_id.val(warehouse_origin);
                    rg_warehouse_destination_id.val(warehouse_destination);
                    rg_date_transfer.val(t_transfer_date.val());
                    rg_date.val(t_transfer_date.val());
                    rg_address_destination.val(address_destination);
                    rg_local.val(warehouse_local);
                    rg_project_code.val(t_project_code.val());
                    rg_project_description.val(t_project_description.val());
                    _.each($('.p_productCode'), function (item, idx) {
                        array_product_code[idx] = $(item).html();
                    });
                    _.each($('.p_productDescription'), function (item, idx) {
                        array_product_description[idx] = $(item).html();
                    });
                    _.each($('.p_unit'), function (item, idx) {
                        array_unit[idx] = $(item).html();
                    });
                    _.each($('.p_productCost'), function (item, idx) {
                        array_cost[idx] = $(item).html();
                    });
                    _.each($('.p_toTransfer'), function (item, idx) {
                        array_transferred[idx] = $(item).val();
                    });
                    SaveEndTransfer();
                    // rg_body_referral_guides.html('');
                    // generateDetailRG();
                    // modalRG.modal('show');
                }
            }
        }

        $scope.saveReferralGuideTransfer = function () {
            state_transfer = 2;
            type_window = 'REGISTRADO';
            var bval = true;
            bval = bval && rg_date.required();
            if (bval) {
                activeTab('tb_entity');
            }
            bval = bval && rg_document.required();
            if (bval) {
                activeTab('tb_company');
            }
            bval = bval && rg_transport_company_name.required();
            if (bval) {
                activeTab('tb_detail');
            }
            bval = bval && rg_date_transfer.required();

            if (bval) {
                state_referralGuide = 1;
                SaveEndTransferReferralGuide('');
                button_save_referral_guide.prop('disabled', true);
                button_print_referral_guide.prop('disabled', false);
                // AlertFactory.confirm({
                //     title: '',
                //     message: '¿Está seguro que desea guardar esta guía de remisión?',
                //     confirm: 'Si',
                //     cancel: 'No'
                // }, function () {
                //     state_referralGuide = 1;
                //     SaveEndTransferReferralGuide('');
                //     // button_save_referral_guide.prop('disabled', true);
                //     button_print_referral_guide.prop('disabled', false);
                // });
            }
        };

        $scope.saveSerial = function (type) {
            var bval = true;
            bval = bval && s_serial.required();
            bval = bval && s_number.required();

            if (bval) {
                state_referralGuide = 0;
                type_window = 'IMPRESO';
                var there_data = false;
                var number = parseFloat(parseFloat($("#s_serial").val()) + '' + parseFloat($("#s_number").val()));
                _.each(array_numberSerial, function (b) {
                    if (parseFloat(b) === number) {
                        there_data = true;
                    }
                });

                if (there_data === true) {
                    AlertFactory.textType({
                        title: '',
                        message: 'Este numero de guía de remisión ya existe.',
                        type: 'warning'
                    });
                    return false;
                }


                // // // UPDATE
                // var vl = parseFloat(_.max(_.compact(array_numberSerial)));
                // console.log(vl);
                // var comp = vl + 1;
                // if (comp === '1' || comp !== number) {
                //     AlertFactory.textType({
                //         title: '',
                //         message: 'Los números de las guias de remisión deben ser continuas .',
                //         type: 'warning'
                //     });
                //     return false;
                // }

                var vl, condition, con = 0;
                vl = parseFloat(_.max(_.compact(array_numberSerial)));
                condition = _.isFinite(vl);
                if (condition === true) {
                    con = 1;
                } else {
                    con = 0;
                }
                var comp = vl + 1;
                console.log(con);
                if (con !== 0) {
                    if (comp !== number) {
                        AlertFactory.textType({
                            title: '',
                            message: 'Los números de las guias de remisión deben ser continuas .',
                            type: 'warning'
                        });
                        return false;
                    }
                }


                SaveEndTransferReferralGuide(type);
            }
        };

        function SaveEndTransferReferralGuide(type) {
            console.log('paso');
            var products = [];
            var available = [];
            var transferred = [];
            var toTransferred = [];

            _.each($('.p_product'), function (item) {
                var item_val = $(item).val();
                if (!_.contains(products, item_val)) {
                    products.push(item_val);

                }
            });
            _.each($('.p_available'), function (item) {
                available.push($(item).val());
            });

            _.each($('.p_transferred'), function (item) {
                transferred.push($(item).val());
            });

            _.each($('.p_toTransfer'), function (item) {
                toTransferred.push($(item).val());
            });
            console.log(toTransferred);
            var params = {
                'id': referral_id_create,
                'warehouse_origin_id': t_warehouse_origin_id.val(),
                'warehouse_destination_id': t_warehouse_destination_id.val(),
                'product': products.join(','),
                'available': available.join(','),
                'transferred': transferred.join(','),
                'toTransferred': toTransferred.join(','),
                'project_id': t_project_id.val(),
                'transfer_id': transfer_id_create,
                'guide_date': rg_date.val(),
                'document_type_id': rg_document_type_id.val(),
                'entity_id': rg_entity_id.val(),
                'transport_company_id': rg_transport_company_id.val(),
                'transport_unit': rg_transport_unit.val(),
                'license_plate': rg_license_plate.val(),
                'license': rg_license.val(),
                'driver': rg_driver.val(),
                'type_entity': ((rg_type_entity.prop('checked')) ? 1 : 0),
                'date_transfer': rg_date_transfer.val(),
                'motive_id': rg_motive_transfer_id.val(),
                'observation': rg_observation.val(),
                'serial': s_serial.val(),
                'number': s_number.val(),
                'order_purchase': rg_oc_entity.val(),
                'state_description': type_window
            };
            AlertFactory.confirm({
                title: '',
                message: '¿Está seguro?',
                confirm: 'Si',
                cancel: 'No'
            }, function () {
                var referral_id = (referral_id_create === '' || referral_id_create === 0) ? 0 : referral_id_create;
                referral_id_create_serial = referral_id;

                RESTService.updated('transfers/saveTransferReferral', referral_id, params, function (response) {
                    if (!_.isUndefined(response.status) && response.status) {
                        referral_id_create = response.referral_id;
                        console.log(referral_id_create);
                        AlertFactory.textType({
                            title: '',
                            message: 'La guía de remisión se guardó correctamente.',
                            type: 'success'
                        });
                        if (type_window === 'IMPRESO') {
                            modalSerial.modal('hide');
                            modalRG.modal('hide');
                            modalTR.modal('hide');
                            var data = {
                                referral_guide_id: referral_id
                            };
                            if (type === 1) {
                                $scope.openDoc('referral_guides/referralGuideExcel', data);
                            } else {
                                $scope.loadVouchersPDF('referral_guides/referralGuidePDF', data);
                            }
                            AlertFactory.confirm({
                                title: '',
                                message: '¿La guía de  remisión se imprimió correctamente?',
                                confirm: 'No',
                                cancel: 'Si'
                            }, function () {
                                $("#condition_print_detail").show();
                                $("#t_body_detail_serial").html('');
                                _.each(response.data_row, function (b) {
                                    addConditionSerial(b.id, b.code, b.number_guide)
                                });
                                $("#modalState").modal('show');
                            });
                        }
                    } else {
                        AlertFactory.textType({
                            title: '',
                            message: 'Hubo un error al guardar la guía de remisión. Intente nuevamente.',
                            type: 'error'
                        });
                    }
                });
            });
        }

        function addConditionSerial(id, code, number_guide) {
            state_print = true;
            var tr = $('<tr class="rowSerial" id="' + id + '"></tr>');
            var td1 = $('<td class="text-center sd_code">' + code + '</td>');
            var td2 = $('<td class="text-center sd_number_guide">' + number_guide + '</td>');
            var td3 = $('<td class="text-center"></td>');
            var td4 = $('<td class="text-center"></td>');
            var check = $('<label class="checkbox-inline i-checks_serial"><input class="check_serial" value="' + id + '" type="checkbox"></label>');
            td4.append(check);
            tr.append(td1).append(td2).append(td4);
            $("#t_body_detail_serial").append(tr);
            generateCheckBox('.i-checks_serial');
        }


        function SaveEndTransfer() {
            var products = [];
            var available = [];
            var transferred = [];
            var toTransferred = [];
            _.each($('.p_product'), function (item) {
                var item_val = $(item).val();
                if (!_.contains(products, item_val)) {
                    products.push(item_val);
                }
            });
            _.each($('.p_available'), function (item) {
                available.push($(item).val());
            });

            _.each($('.p_transferred'), function (item) {
                transferred.push($(item).val());
            });

            _.each($('.p_toTransfer'), function (item) {
                toTransferred.push($(item).val());
            });

            var f = _.contains(toTransferred, '0');
            console.log(f);
            if (f === true) {
                AlertFactory.textType({
                    title: '',
                    message: 'Ingrese una cantidad a transferir mayor que cero'
                });
                return false;
            }

            var params = {
                'id': t_transfer_id.val(),
                'transfer_date': t_transfer_date.val(),
                'warehouse_origin_id': t_warehouse_origin_id.val(),
                'warehouse_destination_id': t_warehouse_destination_id.val(),
                'type_id': t_type_id.val(),
                'product': products.join(','),
                'available': available.join(','),
                'transferred': transferred.join(','),
                'toTransferred': toTransferred.join(','),
                'project_id': t_project_id.val(),
                'archive': t_file_description,
                'state_transfer': state_transfer
            };

            AlertFactory.confirm({
                title: '',
                message: '¿Estas seguro?',
                confirm: 'Si',
                cancel: 'No'
            }, function () {
                var trans_id = (t_transfer_id.val() === '') ? 0 : t_transfer_id.val();

                RESTService.updated('transfers/saveTransfer', trans_id, params, function (response) {
                    if (!_.isUndefined(response.status) && response.status) {
                        AlertFactory.textType({
                            title: '',
                            message: 'La transferencia  se guardó correctamente.',
                            type: 'success'
                        });
                        transfer_id_create = response.transfer_id;
                        if (state_transfer !== 1) {
                            modalSerial.modal('hide');
                            modalRG.modal('hide');
                            modalTR.modal('hide');
                        }
                        if (t_type_id.val() === '1') {
                            modalSerial.modal('hide');
                            modalRG.modal('hide');
                            modalTR.modal('hide');
                        } else {
                            t_save_button_transferProcess.prop('disabled', true);
                            t_save_button_transfer.prop('disabled', true);

                            rg_body_referral_guides.html('');
                            generateDetailRG();
                            modalRG.modal('show');
                        }
                        LoadRecordsButtonTransfer.click();
                    } else {
                        AlertFactory.textType({
                            title: '',
                            message: 'Hubo un error al guardar la transferencia. Intente nuevamente.',
                            type: 'error'
                        });
                    }
                });
            });
        }

        $scope.clearProject = function () {
            t_project_id.val('');
            t_project_code.val('');
            t_project_description.val('');
            transfer_detail.html('');
        };

        $scope.openEntity = function () {
            $('#LoadRecordsButtonEntity').click();
            modalEnt.modal('show');
        };

        $scope.openTransportCompany = function () {
            $('#LoadRecordsButtonTC').click();
            modalTC.modal('show');
        };
        $scope.openProject = function () {
            arr_detail = [];
            $('#LoadRecordsButtonProject').click();
            modalProj.modal('show');

        };

        $scope.conditionPrint = function () {
            modalState.modal('hide');
            LoadRecordsButtonTransfer.click();
        };

        $scope.IncorrectlyPrinted = function () {
            var a_incorrectlyPrinted = [];
            var a_allPrinted = [];
            var state_check = false;
            _.each($('.check_serial'), function (item) {
                if ($(item).prop('checked')) {
                    a_incorrectlyPrinted.push($(item).val());
                    state_check = true;
                }
                a_allPrinted.push($(item).val());
            });
            if (state_check === false) {
                AlertFactory.textType({
                    title: '',
                    message: 'Debe Seleccionar Al menos una Guía de remisión '
                });
                return false;
            }

            var params = {
                'id': referral_id_create_serial,
                'state_description': 'ANULADO',
                'incorrectlyPrinted': a_incorrectlyPrinted.join(','),
                'a_allPrinted': a_allPrinted.join(',')
            };
            AlertFactory.confirm({
                title: '',
                message: '¿Está seguro ejecutar esta operación?',
                confirm: 'Si',
                cancel: 'No'
            }, function () {
                var referral_id = (referral_id_create_serial === '') ? 0 : referral_id_create_serial;
                RESTService.updated('referral_guides/saveSerial', referral_id, params, function (response) {
                    if (!_.isUndefined(response.status) && response.status) {
                        AlertFactory.textType({
                            title: '',
                            message: 'Datos procesados correctamente.',
                            type: 'success'
                        });
                        modalState.modal('hide');
                        LoadRecordsButtonTransfer.click();

                    } else {
                        AlertFactory.textType({
                            title: '',
                            message: 'Hubo un error al generar la guia de gemisión. Intente nuevamente.',
                            type: 'error'
                        });
                    }
                });
            });
        };

        $scope.notPrinted = function () {
            var a_allPrinted = [];
            var data_check = false;
            _.each($('.check_serial'), function (item) {
                a_allPrinted.push($(item).val());
                if ($(item).prop('checked')) {
                    data_check = true;
                }
            });
            if (data_check === true) {
                AlertFactory.textType({
                    title: '',
                    message: 'No se puede seleccionar una guía de remisión '
                });
                return false;
            }
            var params = {
                    'id': referral_id_create_serial,  //
                    'state_description': 'NO IMPRESO',
                    'serial': '',
                    'number': '',
                    'noPrinted': a_allPrinted.join(',')
                }
            ;
            AlertFactory.confirm({
                title: '',
                message: '¿Está seguro ejecutar esta operación?',
                confirm: 'Si',
                cancel: 'No'
            }, function () {
                var referral_id = (referral_id_create_serial === '') ? 0 : referral_id_create_serial;
                RESTService.updated('referral_guides/saveSerial', referral_id, params, function (response) {
                    if (!_.isUndefined(response.status) && response.status) {
                        AlertFactory.textType({
                            title: '',
                            message: 'Datos procesados correctamente.',
                            type: 'success'
                        });
                        modalState.modal('hide');
                        LoadRecordsButtonTransfer.click();

                    } else {
                        AlertFactory.textType({
                            title: '',
                            message: 'Hubo un error al generar la guia de remisión. Intente nuevamente.',
                            type: 'error'
                        });
                    }
                });
            });
        };


        $scope.openProducts = function () {
            // arr_detail = [];
            if (t_warehouse_origin_id.val() === '') {
                AlertFactory.showWarning({
                    title: '',
                    message: 'Debe seleccionar un almacén de origen'
                });
                return false;
            }
            else {
                if ($('.p_warehouse').val() !== t_warehouse_origin_id.val() && transfer_detail.html() !== '') {
                    AlertFactory.confirm({
                        title: '',
                        message: '¿Está seguro que desea cambiar de almacen origen?',
                        confirm: 'Si',
                        cancel: 'No'
                    }, function () {
                        transfer_detail.html('');
                        arr_detail = [];
                    });
                } else {
                    $('#LoadRecordsButtonProduct').click();
                    modalProduct.modal('show');
                }
            }
        };

        var array_product_id = [];
        var array_product_code = [];
        var array_product_description = [];
        var array_cost = [];
        var array_transferred = [];
        var array_unit = [];
        var i = 0;

        function addToTransfer(id, code, description, unit, cost, available, transferred, state_transfer, toTransfer) {
            if ($('#tr_p_' + id).length > 0) {
                AlertFactory.showWarning({
                    title: '',
                    message: 'Ya se asigno este artículo'
                });
                return false;
            }
            var tr = $('<tr class="Aggregated_products"  data-id="' + id + '"></tr>');
            var td0 = $('<td class="p_productCode">' + code + '</td>');
            var td1e = $('<td class="p_productDescription">' + description + '</td>');
            var row_unit = (_.isNull(unit)) ? '' : (_.isUndefined(unit)) ? '' : unit;
            var td1x = $('<td class="p_unit">' + row_unit + '</td>');
            var row_cost = (_.isNull(cost)) ? '0' : (_.isUndefined(cost)) ? '0' : cost;
            var td1a = $('<td class="text-right p_productCost">' + row_cost + '</td>');
            var row_available = (_.isNull(available)) ? '0' : (_.isUndefined(available)) ? '0' : available;
            var td1b = $('<td class="text-right">' + row_available + '<input type="hidden" class="p_available" ' +
                'value="' + row_available + '" /></td>');
            var row_transferred = (_.isNull(transferred)) ? '0' : (_.isUndefined(transferred)) ? '0' : transferred;
            var td1c = $('<td class="text-right">' + row_transferred + '<input type="hidden" class="p_transferred"' +
                ' value="' + row_transferred + '" /></td>');
            if (state_transfer !== '1') {
                var row_toTransfer = (_.isNull(toTransfer)) ? '0' : (_.isUndefined(toTransfer)) ? '0' : toTransfer;
                var tde = $('<td class="text-right"><input type="text" value="' + row_toTransfer + '"' +
                    ' id="inpRow' + id + '"  data-max="' + available + '" onclick="this.select()"   ' +
                    'class="form-control input-xs text-right p_toTransfer" onkeypress="return soloNumeros(event)"></td>');
            } else {
                var tde = $('<td class="text-right"><input type="text" value="0"   readonly ' +
                    'class="form-control input-xs text-right p_toTransfer" onkeypress="return soloNumeros(event)"></td>');
            }
            var inp_product_id = $('<input type="hidden" class="p_product" value="' + id + '" />');
            var input_warehouse = $('<input type="hidden" class="p_warehouse" value="' + t_warehouse_origin_id.val() + '" >');
            td1e.append(inp_product_id).append(input_warehouse);
            var td2 = $('<td class="text-center"></td>');
            if (state_transfer !== '1') {
                var btn = $('<button class="btn btn-danger btn-xs delProduct" data-id="' + id + '" type="button">' +
                    '<span class="fa fa-trash"></span></button>');
            } else {
                var btn = $('<button class="btn btn-danger btn-xs" data-count="' + i + '" data-id="' + id + '" ' +
                    'readonly type="button"><span class="fa fa-trash"></span></button>');
            }
            td2.append(btn);
            tr.append(td0).append(td1e).append(td1x).append(td1a).append(td1b).append(td1c).append(tde).append(td2);
            transfer_detail.append(tr);

            $('.p_toTransfer').blur(function () {
                var that = $(this);
                var maxRow = that.attr('data-max');
                if (that.val() > parseFloat(maxRow) || that.val() === '') {
                    AlertFactory.showWarning({
                        title: 'Debe ingresar una cantidad menor o igual a la cantidad pedida',
                        message: ''
                    }, function () {
                        that.select(); // ??
                    });
                }

            });
            $('.delProduct').click(function (e) {
                var tr_ = $(this).closest('tr');
                AlertFactory.confirm({
                    title: '',
                    message: '¿Está seguro que desea quitar esta artículo?',
                    confirm: 'Si',
                    cancel: 'No'
                }, function () {
                    var tr_id = tr_.attr('data-id');
                    tr_.remove();
                    arr_detail = _.reject(arr_detail, function (item) {
                        return item === parseInt(tr_id)
                    });
                    $('#LoadRecordsButtonProduct').click();
                });
                e.preventDefault();
            });

            modalProduct.modal('hide');
            i++;
        }


        var search_tr = getFormSearch('frm-search-transfer', 'search_transfer', 'LoadRecordsButtonTransfer');

        var table_container_tr = $("#table_container_transfer");

        table_container_tr.jtable({
            title: "Lista de Transferencia",
            paging: true,
            sorting: true,
            actions: {
                listAction: base_url + '/transfers/list'
                // deleteAction: base_url + '/transfers/delete'
            },
            toolbar: {
                items: [{
                    cssClass: 'buscador',
                    text: search_tr
                }, {
                    cssClass: 'btn-primary',
                    text: '<i class="fa fa-file-excel-o"></i> Exportar a Excel',
                    click: function () {
                        $scope.openDoc('transfers/excel', {});
                    }
                }, {
                    cssClass: 'btn-success',
                    text: '<i class="fa fa-plus"></i> Nueva Transferencia',
                    click: function () {
                        newTransfer();
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
                transfer_date: {
                    title: 'Fecha',
                    listClass: 'text-center',
                    width: '3%'
                },
                name: {
                    title: 'Usuario',
                    list: show_list_,
                    width: '5%'
                },
                warehouse_o: {

                    title: (show_list_) ? 'Almacén Origen' : 'Alm. Origen'
                },
                warehouse_d: {

                    title: (show_list_) ? 'Almacén Destino' : 'Alm. Destino'
                },
                type_description: {
                    title: 'Tipo',
                    width: '3%'
                },
                state_description: {
                    title: 'Estado',
                    width: '2%'
                },
                edit: {
                    width: '1%',
                    sorting: false,
                    edit: false,
                    create: false,
                    display: function (data) {
                        if (data.record.state_transfer === '0') {
                            return '<a href="javascript:void(0)" title="Editar" class="edit_r" data-code="' +
                                data.record.id + '"><i class="fa fa-pencil-square-o fa-1-5x fa-green"></i></a>' +
                                '<a href="javascript:void(0)" title="Eliminar" class="delete_r" data-code="' +
                                data.record.id + '"><i class="fa fa-trash fa-1-5x fa-red"></i></a>';
                        } else {
                            return '<a href="javascript:void(0)" title="Ver" class="edit_r" data-code="' +
                                data.record.id + '"><i class="fa fa-eye fa-1-5x fa-green"></i></a>'
                        }
                    }
                }
            },
            recordsLoaded: function (event, data) {
                $('.edit_r').click(function (e) {
                    var code = $(this).attr('data-code');
                    findTransfer(code);
                    e.preventDefault();
                });
            }
        });

        generateSearchForm('frm-search-transfer', 'LoadRecordsButtonTransfer', function () {
            table_container_tr.jtable('load', {
                search: $('#search_transfer').val()
            });
        }, true);


        var cont_detail = 1;

        var call_m = false;

        function callModals() {
            call_m = true;
            var search_project = getFormSearch('frm-search-project', 'search_project', 'LoadRecordsButtonProject');

            var table_container_project = $("#table_container_project");

            table_container_project.jtable({
                title: "Lista de Proyectos",
                paging: true,
                sorting: true,
                actions: {
                    listAction: base_url + '/referral_guides/getProjects'
                },
                toolbar: {
                    items: [{
                        cssClass: 'buscador',
                        text: search_project
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
                        title: 'Código Proyecto',
                        width: '5%',
                        listClass: 'text-center'
                    },
                    description: {
                        title: 'Proyecto'
                    },
                    select: {
                        width: '1%',
                        sorting: false,
                        edit: false,
                        create: false,
                        listClass: 'text-center',
                        display: function (data) {
                            return '<a href="javascript:void(0)" title="Seleccionar" class="select_p" data-id="' +
                                data.record.id + '" data-code="' + data.record.code + '" data-description="' +
                                data.record.description + '"><i class="fa fa-' + icon_select + ' fa-1-5x"></i></a>';
                        }
                    }
                },
                recordsLoaded: function (event, data) {
                    $('.select_p').click(function (e) {
                        var data_id = $(this).attr('data-id');
                        t_project_id.val(data_id);
                        t_project_code.val($(this).attr('data-code'));
                        t_project_description.val($(this).attr('data-description'));
                        modalProj.modal('hide');
                        transfer_detail.empty();
                        e.preventDefault();
                    });
                }
            });

            generateSearchForm('frm-search-project', 'LoadRecordsButtonProject', function () {
                table_container_project.jtable('load', {
                    search: $('#search_project').val()
                });
            }, false);


            var search_tc = getFormSearch('frm-search-tc', 'search_tc', 'LoadRecordsButtonTC');

            var table_container_tc = $("#table_container_transportCompany");

            table_container_tc.jtable({
                title: "Empresas de Transporte",
                paging: true,
                sorting: true,
                actions: {
                    listAction: base_url + '/referral_guides/listEntity'
                },
                toolbar: {
                    items: [{
                        cssClass: 'buscador',
                        text: search_tc
                    }]
                },
                fields: {
                    id: {
                        key: true,
                        create: false,
                        edit: false,
                        list: false
                    },
                    nombre_entidad: {
                        title: 'Nombre'
                    },
                    Documento: {
                        title: 'Documento',
                        width: '2%',
                        listClass: 'text-center'
                    },
                    direccion_legal: {
                        title: 'Dirección'
                    },
                    select: {
                        width: '1%',
                        sorting: false,
                        edit: false,
                        create: false,
                        listClass: 'text-center',
                        display: function (data) {
                            return '<a href="javascript:void(0)" title="Seleccionar" class="select_tc" data-id="' +
                                data.record.id + '" data-name="' + data.record.nombre_entidad + '">' +
                                '<i class="fa fa-' + icon_select + ' fa-1-5x"></i></a>';
                        }
                    }
                },
                recordsLoaded: function (event, data) {
                    $('.select_tc').click(function (e) {
                        var data_id = $(this).attr('data-id');
                        rg_transport_company_id.val(data_id);
                        rg_transport_company_name.val($(this).attr('data-name'));
                        modalTC.modal('hide');
                        e.preventDefault();
                    });
                }
            });

            generateSearchForm('frm-search-tc', 'LoadRecordsButtonTC', function () {
                table_container_tc.jtable('load', {
                    search: $('#search_tc').val()
                });
            }, false);


            var search_u = getFormSearch('frm-search-entity', 'search_entity', 'LoadRecordsButtonEntity');

            var table_container_e = $("#table_container_entity");

            table_container_e.jtable({
                title: "Lista de Entidades",
                paging: true,
                sorting: true,
                actions: {
                    listAction: base_url + '/referral_guides/listEntity'
                },
                toolbar: {
                    items: [{
                        cssClass: 'buscador',
                        text: search_u
                    }]
                },
                fields: {
                    id: {
                        key: true,
                        create: false,
                        edit: false,
                        list: false
                    },
                    nombre_entidad: {
                        title: 'Nombre'
                    },
                    Documento: {
                        title: 'Documento',
                        width: '2%',
                        listClass: 'text-center'
                    },
                    direccion_legal: {
                        title: 'Dirección'
                    },
                    select: {
                        width: '1%',
                        sorting: false,
                        edit: false,
                        create: false,
                        listClass: 'text-center',
                        display: function (data) {
                            return '<a href="javascript:void(0)" title="Seleccionar" class="select_e" data-code="' +
                                data.record.id + '" data-name="' + data.record.nombre_entidad + '"data-document="' + data.record.Documento +
                                '"data-address="' + data.record.direccion_legal +
                                '" ><i class="fa fa-' + icon_select + ' fa-1-5x"></i></a>';
                        }
                    }
                },
                recordsLoaded: function (event, data) {
                    $('.select_e').click(function (e) {
                        var code = $(this).attr('data-code');
                        var name = $(this).attr('data-name');
                        var document = $(this).attr('data-document');
                        var address = $(this).attr('data-address');
                        // console.log(document + "-" + address);
                        rg_entity_id.val(code).removeClass('border-red');
                        rg_social_reason.val(name).removeClass('border-red');
                        rg_document.val(document).removeClass('border-red');
                        rg_address.val(address).removeClass('border-red');
                        modalEnt.modal('hide');
                        e.preventDefault();
                    });
                }
            });
            generateSearchForm('frm-search-entity', 'LoadRecordsButtonEntity', function () {
                table_container_e.jtable('load', {
                    search: $('#search_entity').val()
                });
            }, false);

            var search_pr = getFormSearch('frm-search-product', 'search_product', 'LoadRecordsButtonProduct');

            var table_container_pr = $("#table_container_pr");

            table_container_pr.jtable({
                title: "Lista de Artículos ",
                paging: true,
                sorting: true,
                selecting: true,
                multiselect: true,
                selectingCheckboxes: true,
                selectOnRowClick: false,
                actions: {
                    listAction: base_url + '/transfers/getArticlesWithWithoutProject'
                },
                toolbar: {
                    items: [{
                        cssClass: 'buscador',
                        text: search_pr
                    }]
                },
                fields: {
                    id: {
                        key: true,
                        edit: false,
                        create: false,
                        list: false
                    },
                    code_article: {
                        title: 'Código',
                        width: '2%',
                        listClass: 'text-center'
                    },
                    description_detail: {
                        title: 'Descripción'
                    },
                    average_cost: {
                        title: 'Costo',
                        width: '2%',
                        listClass: 'text-right'
                    },
                    stock_p: {
                        title: 'Stock',
                        width: '2%',
                        listClass: 'text-right'
                    },
                    um_id: {
                        title: 'Unidad Medida',
                        edit: false,
                        create: false,
                        list: false
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
            generateSearchForm('frm-search-product', 'LoadRecordsButtonProduct', function () {
                table_container_pr.jtable('load', {
                    search: $('#search_product').val(),
                    warehouse_id: t_warehouse_origin_id.val(),
                    items: arr_detail,
                    project_id: t_project_id.val()
                });
            }, false);
        }

        function clearRowsAR() {
            $('.jtable-column-header-selecting input').prop('checked', false).iCheck('update');
            $('.jtable-row-selected').removeClass('jtable-row-selected');
        }
    }

    function Config($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('transfers', {
                url: '/transfers',
                templateUrl: base_url + '/templates/transfers/base.html',
                controller: 'TransferCtrl'
            });

        $urlRouterProvider.otherwise('/');
    }
})
();