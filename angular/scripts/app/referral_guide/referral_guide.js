/**
 * Created by EVER on 4/17/2017.
 */
(function () {
    'use strict';
    angular.module('sys.app.referral_guides')
        .config(Config)
        .controller('ReferralGuideCtrl', ReferralGuideCtrl);

    Config.$inject = ['$stateProvider', '$urlRouterProvider'];
    ReferralGuideCtrl.$inject = ['$scope', '_', 'RESTService', 'AlertFactory'];

    function ReferralGuideCtrl($scope, _, RESTService, AlertFactory) {
        var modalRG;
        var titleRG;
        var modalEnt;
        var rg_id;
        var rg_entity_id;
        var rg_document;
        var rg_social_reason;
        var rg_address;
        var rg_type_entity;
        var state_local;
        var rg_warehouse_origin_id;
        var rg_warehouse_destination_id;
        var default_ware = '';
        var default_motive = '';
        var default_document = '';
        var warehouse;
        var rg_date;
        var rg_date_transfer;
        var modalProj;
        var rg_project_id;
        var rg_project_code;
        var rg_project_description;
        var rg_total;
        var rg_serial_type;
        var modalTC;
        var rg_transport_company_id;
        var rg_transport_company_name;
        var rg_transport_unit;
        var rg_license_plate;
        var rg_license;
        var rg_driver;
        var rg_document_type_id;
        var warehouse_local;
        var address_destination;
        var rg_local;
        var rg_address_arrival;
        var referral_guide_detail;
        var referral_id_create = 0;

        var rg_code;
        var rg_description;
        var rg_unit_measure;
        var rg_cost_transfer;
        var rg_quantity;
        var rg_motive_id;
        var rg_observation;
        var modalSerial;
        var s_serial;
        var s_number;
        var default_warehouse = '';
        var rg_oc_entity;
        var button_search_entity;
        var button_search_company;
        var button_search_project;
        var add_detail_button;
        var button_save_referral_guide;
        var button_print_referral_guide;
        var state_referralGuide = 0;
        var update_data = false;
        var update_data_key = false;
        var modalState;
        var list_select = [];
        var state_print = false;
        var condition_print_detail;
        var t_body_detail_serial;
        var array_numberSerial = [];

        function overModals() {
            if (!call_m) {
                modalRG = $('#modalRG');
                titleRG = $("#titleRW");
                modalEnt = $("#modalEntity");
                rg_id = $("#rg_id");
                rg_entity_id = $("#rg_entity_id");
                rg_document = $("#rg_document");
                rg_social_reason = $("#rg_social_reason");
                rg_address = $("#rg_address");
                rg_type_entity = $("#rg_type_entity");
                state_local = $("#state_local");
                rg_warehouse_origin_id = $("#rg_warehouse_origin_id");
                rg_warehouse_destination_id = $("#rg_warehouse_destination_id");
                rg_date = $("#rg_date");
                rg_date_transfer = $("#rg_date_transfer");
                modalProj = $("#modalProject");
                rg_project_code = $("#rg_project_code");
                rg_project_description = $("#rg_project_description");
                rg_project_id = $("#rg_project_id");
                rg_total = $("#rg_total");
                modalTC = $("#modalTransportCompany");
                rg_transport_company_id = $("#rg_transport_company_id");
                rg_transport_company_name = $("#rg_transport_company_name");

                rg_document_type_id = $("#rg_document_type_id");
                rg_local = $("#rg_local");
                rg_address_arrival = $("#rg_address_arrival");
                referral_guide_detail = $("#referral_guide_detail");
                rg_code = $("#rg_code");
                rg_description = $("#rg_description");
                rg_unit_measure = $("#rg_unit_measure");
                rg_cost_transfer = $("#rg_cost_transfer");
                rg_quantity = $("#rg_quantity");
                rg_transport_unit = $("#rg_transport_unit");
                rg_license_plate = $("#rg_license_plate");
                rg_license = $("#rg_license");
                rg_driver = $("#rg_driver");
                rg_motive_id = $("#rg_motive_id");
                rg_observation = $("#rg_observation");
                modalSerial = $("#modalSerial");
                s_serial = $("#s_serial");
                s_number = $("#s_number");
                rg_oc_entity = $("#rg_oc_entity");
                button_search_entity = $("#button_search_entity");
                button_search_company = $("#button_search_company");
                button_search_project = $("#button_search_project");
                add_detail_button = $("#add_detail_button");
                button_save_referral_guide = $("#button_save_referral_guide");
                button_print_referral_guide = $("#button_print_referral_guide");
                modalState = $("#modalState");
                condition_print_detail = $("#condition_print_detail");
                t_body_detail_serial = $("#t_body_detail_serial");


                rg_date.datepicker({
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
                $scope.chkState = function () {
                    var txt_state = (rg_type_entity.prop('checked')) ? 'Si' : 'No';
                    //var text_state_serial = $('.check_serial').prop('checked');
                    state_local.html(txt_state);
                };
                modalEnt.on('hidden.bs.modal', function (e) {
                    modalRG.attr('style', 'display:block;');
                });
                modalEnt.on('show.bs.modal', function (e) {
                    modalRG.attr('style', 'display:block; z-index:2030 !important');
                });
                modalProj.on('hidden.bs.modal', function (e) {
                    modalRG.attr('style', 'display:block;');
                });
                modalProj.on('show.bs.modal', function (e) {
                    modalRG.attr('style', 'display:block; z-index:2030 !important');
                });
                modalTC.on('hidden.bs.modal', function (e) {
                    modalRG.attr('style', 'display:block;');
                });
                modalTC.on('show.bs.modal', function (e) {
                    modalRG.attr('style', 'display:block; z-index:2030 !important');
                });
                modalSerial.on('hidden.bs.modal', function (e) {
                    if (modalRG.hasClass('in')) {
                        modalRG.attr('style', 'display:block;');
                    }
                    $('#show_loading').addClass('hide');
                    getSerial(function () {
                        $('#show_loading').removeClass('hide');
                    });
                });
                modalSerial.on('show.bs.modal', function (e) {
                    if (modalRG.hasClass('in')) {  // si esta mostrandose
                        modalRG.attr('style', 'display:block; z-index:2030 !important');
                        $('#show_loading').addClass('hide');
                        getSerial(function () {
                            $('#show_loading').removeClass('hide');
                        });
                    }
                });
                modalRG.on('hidden.bs.modal', function (e) {
                    cleanReferralGuide();
                });

                $('.i-checks').iCheck({
                    checkboxClass: 'icheckbox_square-green'
                }).on('ifChanged', function (event) {
                    $(event.target).click();
                    $scope.chkState();
                });

                callModals();
            }
            rg_warehouse_origin_id.change(function () {
                warehouse = rg_warehouse_origin_id.val();
                if (update_data === true) {
                    update_data_key = true;
                }
            });

            rg_warehouse_destination_id.change(function () {
                if (warehouse === rg_warehouse_destination_id.val()) {
                    AlertFactory.textType({
                        title: '',
                        message: 'El almacén destino no puede ser igual que el almacen origin.',
                        type: 'warning'
                    });
                    rg_warehouse_destination_id.val('');
                }
                rg_address_arrival.val(rg_warehouse_destination_id.find("option:selected").attr('data-address'));
                rg_local.val(rg_warehouse_destination_id.find("option:selected").attr('data-local'));
                if (update_data === true) {
                    update_data_key = true;
                }
            });
            rg_warehouse_origin_id.select2();
            rg_warehouse_destination_id.select2();
        }

        function cleanReferralGuide() {
            cleanRequired();
            titleRG.html('');
            rg_id.val('');
            rg_date.val('').prop('disabled', false);
            rg_entity_id.val('');
            rg_document.val('');
            rg_social_reason.val('');
            rg_address.val('');
            rg_oc_entity.val('').prop('disabled', false);
            rg_transport_company_id.val('');
            rg_transport_company_name.val('');
            rg_transport_unit.val('').prop('disabled', false);
            rg_license_plate.val('').prop('disabled', false);
            rg_license.val('').prop('disabled', false);
            rg_driver.val('').prop('disabled', false);
            rg_warehouse_origin_id.val('').prop('disabled', false);
            rg_warehouse_destination_id.val('').prop('disabled', false);
            rg_address_arrival.val('').prop('disabled', false);
            rg_local.val('');
            rg_date_transfer.val('').prop('disabled', false);
            rg_observation.val('');
            rg_project_id.val('');
            rg_project_code.val('');
            rg_project_description.val('');
            referral_guide_detail.html('');
            rg_total.val('');
            activeTab('tb_general');
            s_serial.val('');
            s_number.val('');
            button_search_entity.prop('disabled', false);
            button_search_company.prop('disabled', false);
            button_search_project.prop('disabled', false);
            add_detail_button.prop('disabled', false);
            button_save_referral_guide.prop('disabled', false);
            button_print_referral_guide.prop('disabled', true);
            state_print = false;
            $("#condition_print_detail").hide();
            array_numberSerial = [];
            list_select = [];
            t_body_detail_serial.html('');
        }

        $scope.openProject = function () {
            $('#LoadRecordsButtonP').click();
            modalProj.modal('show');
        };

        $scope.openTransportCompany = function () {
            $('#LoadRecordsButtonTC').click();
            modalTC.modal('show');
        };

        $scope.openEntity = function () {
            $('#LoadRecordsButtonEntity').click();
            modalEnt.modal('show');
        };

        function printReferralGuide() {
            $('#show_loading').addClass('hide');
            getSerial(function () {
                $('#show_loading').removeClass('hide');
            });

            var state_select = false;
            var $selectedRows = table_container_rg.jtable('selectedRows');
            $("#t_body_detail_serial").html('');
            $("#s_serial").val('');
            $("#s_number").val('');
            if ($selectedRows.length > 0) {
                var row_list = [];
                var row_noSelect = [];
                var count = 0;
                var check_noPrint = [];
                $selectedRows.each(function () {
                    var record = $(this).data('record');  // QUITAR || record.state_description === 'NO IMPRESO'
                    if (record.state_description === 'REGISTRADO' || record.state_description === 'NO IMPRESO') {
                        row_list.push(record.id);
                        list_select = row_list.join(',');
                        addConditionSerial(record.id, record.code_guide, record.number_guide);
                    } else {
                        row_noSelect.push(record.id, record.number_guide);
                        state_select = true;
                        check_noPrint[count] = $(this).attr('data-record-key');
                        count++;
                    }

                });
                if (state_select === true && count < $selectedRows.length) {
                    AlertFactory.confirm({
                        title: '',
                        message: count + ' guia/s de remisión ya fueron impresa/s por lo tanto no serán seleccionadas. ¿Deseas continuar?',
                        confirm: 'Si',
                        cancel: 'No'
                    }, function () {
                        $.each(check_noPrint, function (index, value) {
                            // alert( index + ": " + value );
                            $(".jtable").find('tr[data-record-key="' + value + '"]').find('input[type=checkbox]').prop('checked', false).iCheck('update');
                            $(".jtable").find('tr[data-record-key="' + value + '"]').removeClass('jtable-row-selected');
                            $('.jtable-column-header-selecting input').prop('checked', false).iCheck('update');
                        });
                        $("#condition_print_detail").show();
                        $("#modalSerial").modal('show');
                    });
                } else {
                    if (count !== $selectedRows.length) {
                        $("#condition_print_detail").show();
                        $("#modalSerial").modal('show');
                    } else {
                        AlertFactory.textType({
                            title: '',
                            message: 'Todas las guias de remisión ya fueron impresas',
                            type: 'warning'
                        });
                    }
                }
            } else {
                AlertFactory.textType({
                    title: '',
                    message: 'Debe seleccionar al menos una guía de remisión a imprimir.',
                    type: 'warning'
                });
                return false;
            }
        }

        // function clearRowsAR() {
        //     $('.jtable-column-header-selecting input').prop('checked', false).iCheck('update');
        //     $('.jtable-row-selected').removeClass('jtable-row-selected');
        // }

        function addConditionSerial(id, code, number_guide, number) {
            state_print = true;
            var tr = $('<tr class="rowSerial" id="' + id + '"></tr>');
            var td1 = $('<td class="text-center sd_code">' + code + '</td>');
            var td2 = $('<td class="text-center sd_number_guide">' + number_guide + '</td>');
            var td3 = $('<td class="text-center number_guide" style="display: none;">' + number + '</td>');
            var td4 = $('<td class="text-center"></td>');
            var check = $('<label class="radio-inline i-checks_serial"><input name="guide_check" class="check_serial" value="' + id + '" type="checkbox"></label>');
            td4.append(check);
            tr.append(td1).append(td2).append(td3).append(td4);
            $("#t_body_detail_serial").append(tr);
            generateCheckBox('.i-checks_serial');
        }

        function findReferralGuide(id) {
            overModals();
            titleRG.html('Editar Guia de remisión');
            RESTService.get('referral_guides/find', id, function (response) {
                if (!_.isUndefined(response.status) && response.status) {
                    var data_p = response.data;
                    rg_id.val(data_p.id);
                    rg_date.val(data_p.date);
                    rg_entity_id.val(data_p.entity_id);
                    rg_document.val(data_p.document);
                    rg_social_reason.val(data_p.name_entity);
                    referral_id_create = data_p.id;
                    rg_address.val(data_p.address);
                    rg_oc_entity.val(data_p.order_purchase);
                    var chk_state = (data_p.type_entity === '1');
                    rg_type_entity.prop('checked', chk_state).iCheck('update');
                    $scope.chkState();
                    rg_transport_company_id.val(data_p.transport_company_id);
                    rg_transport_company_name.val(data_p.transport_company_name);
                    rg_transport_unit.val(data_p.transport_unit);
                    rg_license_plate.val(data_p.license_plate);
                    rg_license.val(data_p.license);
                    rg_driver.val(data_p.driver);
                    rg_warehouse_origin_id.val(data_p.warehouse_origin_id).trigger('change');
                    rg_warehouse_destination_id.val(data_p.warehouse_destination_id).trigger('change');
                    rg_date_transfer.val(data_p.date_transfer);
                    rg_observation.val(data_p.observation);
                    rg_project_id.val(data_p.project_id);
                    rg_project_code.val(data_p.project_code);
                    rg_project_description.val(data_p.project_description);
                    s_serial.val(data_p.serial);
                    s_number.val(data_p.number);
                    button_print_referral_guide.prop('disabled', false);
                    update_data = true;
                    update_data_key = false;
                    if (data_p.state_description === 'IMPRESO' || data_p.state_description === 'ANULADO'

                    ) {  //poner || data_p.state_description === 'NO IMPRESO'
                        rg_date.prop('disabled', true);
                        rg_oc_entity.prop('disabled', true);
                        button_search_entity.prop('disabled', true);
                        button_search_company.prop('disabled', true);
                        rg_transport_unit.prop('disabled', true);
                        rg_license_plate.prop('disabled', true);
                        rg_license.prop('disabled', true);
                        rg_driver.prop('disabled', true);
                        rg_warehouse_origin_id.prop('disabled', true);
                        rg_warehouse_destination_id.prop('disabled', true);
                        rg_address_arrival.prop('disabled', true);
                        rg_date_transfer.prop('disabled', true);
                        button_search_project.prop('disabled', true);
                        add_detail_button.prop('disabled', true);
                        button_save_referral_guide.prop('disabled', true);
                        button_print_referral_guide.prop('disabled', true);
                    }

                    modalRG.modal('show');
                    _.each(data_p.product, function (b) {
                        addDetailReferralGuide(b.id, b.code, b.description, b.unit, b.cost, b.quantity);
                        console.log(b.id);
                    });
                } else {
                    AlertFactory.textType({
                        title: '',
                        message: 'Hubo un error al obtener la guía de remisión. Intente nuevamente.',
                        type: 'error'
                    });
                }
            });
        }


        $scope.printReferralGuide = function () {
            if (update_data_key === true && update_data === true) {
                AlertFactory.showWarning({
                    title: '',
                    message: 'Para imprimir es necesario guardar los datos actualizados'
                });
                return false;
            }
            modalSerial.modal('show');
            state_referralGuide = 2;
        };

        $scope.saveReferralGuide = function () {
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
            bval = bval && rg_warehouse_origin_id.required();
            bval = bval && rg_warehouse_destination_id.required();
            bval = bval && rg_date_transfer.required();
            if (bval && referral_guide_detail.html() === '') {
                AlertFactory.showWarning({
                    title: '',
                    message: 'Debe agregar mínimo un producto  al detalle'
                });
                return false;
            }

            if (bval) {
                AlertFactory.confirm({
                    title: '',
                    message: '¿Está seguro que desea guardar esta guía de remisión?',
                    confirm: 'Si',
                    cancel: 'No'
                }, function () {
                    state_referralGuide = 1;
                    endReferralGuide();
                    button_save_referral_guide.prop('disabled', true);
                    button_print_referral_guide.prop('disabled', false);
                });
            }
        };


        function endReferralGuide() {
            update_data_key = false;
            update_data = false;
            var code = [];
            var description = [];
            var unit = [];
            var cost = [];
            var quantity = [];
            _.each($('.rg_code'), function (item) {
                code.push($(item).html());
            });
            _.each($('.rg_description'), function (item) {
                description.push($(item).html());
            });
            _.each($('.rg_unit'), function (item) {
                unit.push($(item).html());
            });
            _.each($('.rg_cost'), function (item) {
                cost.push($(item).html());
            });
            _.each($('.rg_quantity'), function (item) {
                quantity.push($(item).html());
            });

            var params = {
                'id': rg_id.val(),
                'guide_date': rg_date.val(),
                'document_type_id': rg_document_type_id.val(),
                'entity_id': rg_entity_id.val(),
                'transport_company_id': rg_transport_company_id.val(),
                'transport_unit': rg_transport_unit.val(),
                'license_plate': rg_license_plate.val(),
                'license': rg_license.val(),
                'driver': rg_driver.val(),
                'type_entity': ((rg_type_entity.prop('checked')) ? 1 : 0),
                'warehouse_origin_id': rg_warehouse_origin_id.val(),
                'warehouse_destination_id': rg_warehouse_destination_id.val(),
                'date_transfer': rg_date_transfer.val(),
                'motive_id': rg_motive_id.val(),
                'observation': rg_observation.val(),
                'project_id': rg_project_id.val(),
                'code_article': code.join(','),
                'description': description.join(','),
                'unit_measure': unit.join(','),
                'average_cost': cost.join(','),
                'quantity': quantity.join(','),
                'order_purchase': rg_oc_entity.val(),
                'state_ReferralGuide': state_referralGuide,
                'state_description': 'REGISTRADO'
            };
            var referral_guide_id = (rg_id.val() === '') ? 0 : rg_id.val();

            RESTService.updated('referral_guides/saveReferralGuide', referral_guide_id, params, function (response) {
                if (!_.isUndefined(response.status) && response.status) {
                    AlertFactory.textType({
                        title: '',
                        message: 'La guía de remisión se guardó correctamente.',
                        type: 'success'
                    });
                    referral_id_create = response.referral_id;
                    LoadRecordsButtonRG.click();
                    if (state_referralGuide !== 1) {
                        modalSerial.modal('hide');
                        modalRG.modal('hide');
                    }
                } else {
                    AlertFactory.textType({
                        title: '',
                        message: 'Hubo un error al guardar la guia de remisión. Intente nuevamente.',
                        type: 'error'
                    });
                }
            });

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

        $scope.updateForm = function () {
            update_data_key = true;
        };


        $scope.saveSerial = function (type) {
            var bval = true;
            var there_data = false;
            // bval = bval && $("#s_serial").required();
            // bval = bval && s_number.required();
            console.log(array_numberSerial);
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


            // // UPDATE
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
            // //END

            var params = {
                'id': referral_id_create,
                'serial': $("#s_serial").val(),  /// CAMBIAR
                'number': $("#s_number").val(),
                'state_description': 'IMPRESO',
                'raw_select': list_select
            };
            if (bval) {
                var dat = [];
                var dat_all = [];
                AlertFactory.confirm({
                    title: '',
                    message: '¿Está seguro?',
                    confirm: 'Si',
                    cancel: 'No'
                }, function () {
                    var referral_id = (referral_id_create === '') ? 0 : referral_id_create;
                    RESTService.updated('referral_guides/saveSerial', referral_id, params, function (response) {
                        if (!_.isUndefined(response.status) && response.status) {
                            $("#modalSerial").modal('hide');
                            $("#modalRG").modal('hide');
                            clearRowsAR();
                            var data = {
                                referral_guide_id: referral_id_create,
                                array_guide: list_select
                            };
                            $("#LoadRecordsButtonRG").click();
                            if (type === 1) {
                                $scope.openDoc('referral_guides/referralGuideExcel', data);
                            } else {
                                console.log('paso por impresión');
                                $scope.loadVouchersPDF('referral_guides/referralGuidePDF', data);
                            }
                            AlertFactory.confirm({
                                title: '',
                                message: (state_print === true) ? '¿ Todas las ruías  de remisión se imprimieron correctamente?' : '¿La guía de  remisión se imprimió correctamente?',
                                confirm: 'No',
                                cancel: 'Si'
                            }, function () {
                                $("#condition_print_detail").show();
                                $("#t_body_detail_serial").html('');
                                _.each(response.data_row, function (b) {
                                    addConditionSerial(b.id, b.code, b.number_guide, b.number)
                                });
                                $("#modalState").modal('show');
                            });
                        } else {
                            AlertFactory.textType({
                                title: '',
                                message: 'Hubo un error al generar la guia de remisión. Intente nuevamente.',
                                type: 'error'
                            });
                        }
                    });
                });
            }
        };


        $scope.notPrinted = function () {
            var data_check = false;
            var a_notPrinted = [];

            if (state_print === true) {
                _.each($('.check_serial'), function (item) {
                    if ($(item).prop('checked')) {
                        a_notPrinted.push($(item).val());
                        data_check = true;
                    }
                });
                if (data_check === true) {
                    AlertFactory.textType({
                        title: '',
                        message: 'Para este caso no se puede seleccionar las  guias de remisión.'
                    });
                    return false;
                }
            }
            var params = {
                    'id': referral_id_create,  //
                    'state_description': 'REGISTRADO',
                    'serial': '',
                    'number': '',
                    'noPrinted': list_select
                }
            ;
            console.log(list_select);
            AlertFactory.confirm({
                title: '',
                message: '¿Estas seguro?',
                confirm: 'Si',
                cancel: 'No'
            }, function () {
                var referral_id = (referral_id_create === '') ? 0 : referral_id_create;
                RESTService.updated('referral_guides/saveSerial', referral_id, params, function (response) {
                    if (!_.isUndefined(response.status) && response.status) {
                        AlertFactory.textType({
                            title: '',
                            message: 'El proceso culminó satisfactoriamente',
                            type: 'success'
                        });
                        $("#LoadRecordsButtonRG").click();
                        if (state_print === false) {
                            console.log(response.data_row);
                            $("#t_body_detail_serial").html('');
                            _.each(response.data_row, function (b) {
                                addConditionSerial(b.id, b.code, b.number_guide)
                            });

                            $("#modalState").modal('hide');
                        }

                    } else {
                        AlertFactory.textType({
                            title: '',
                            message: 'Hubo un error al generar la guia de remisión. Intente nuevamente.',
                            type: 'error'
                        });
                    }
                });
                $("#modalState").modal('hide');
            });
            clearRowsAR();
        };


        $scope.IncorrectlyPrinted = function () {
            var a_incorrectlyPrinted = [];
            var a_allPrinted = [];
            var state_check = false;
            var all_code = [];
            var all_codeSelect = [];
            var a_print = [];
            var a_noPrint = [];
            var i = 0;
            var noPrint = [];
            var state_cons = '';
            $.each($('.number_guide'), function (idx, item) {
                all_code[idx] = parseFloat($(item).html());
            });
            $.each($('.check_serial'), function (idx, item) {
                if ($(item).prop('checked')) {
                    a_incorrectlyPrinted.push($(item).val());
                    all_codeSelect[i] = all_code[idx];
                    state_check = true;
                    i++;
                }
                a_allPrinted.push($(item).val());
                if (state_check === true) {
                    a_noPrint.push($(item).val());
                } else {
                    a_print.push($(item).val());
                }
            });
            noPrint = _.difference(a_noPrint, a_incorrectlyPrinted);

            console.log(a_allPrinted + ' \n' + a_print + ' \n' + a_incorrectlyPrinted + '\n' + noPrint.join(','));

            for (var i = 0; i < all_codeSelect.length - 1; i++) {
                if (all_codeSelect[i + 1] - all_codeSelect[i] !== 1) {
                    AlertFactory.textType({
                        title: '',
                        message: 'Solo se puede seleccionar guias de remisión consecutivos'
                    });
                    return false;
                }
            }
            if (state_check === false) {
                AlertFactory.textType({
                    title: '',
                    message: 'Debe seleccionar al menos una guía de remisión '
                });
                return false;
            }

            var params = {
                'id': referral_id_create,
                'state_description': 'ANULADO',
                'incorrectlyPrinted': a_incorrectlyPrinted.join(','),
                'a_allPrinted': a_allPrinted.join(','),
                'a_print': a_print.join(','),
                'a_noPrint': noPrint.join(',')
            };


            AlertFactory.confirm({
                title: '',
                message: '¿Está seguro ejecutar esta operación?',
                confirm: 'Si',
                cancel: 'No'
            }, function () {
                var referral_id = (referral_id_create === '') ? 0 : referral_id_create;
                RESTService.updated('referral_guides/saveSerial', referral_id, params, function (response) {
                    if (!_.isUndefined(response.status) && response.status) {
                        AlertFactory.textType({
                            title: '',
                            message: 'Datos Procesados correctamente.',
                            type: 'success'
                        });
                        $("#modalState").modal('hide');
                        $("#LoadRecordsButtonRG").click();

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


        function newReferralGuide() {
            clearRowsAR();
            overModals();
            titleRG.html('Nueva Guía de Remisión');
            modalRG.modal('show');
        }

        function getDataForm() {
            RESTService.all('referral_guides/data_form', '', function (response) {
                if (!_.isUndefined(response.status) && response.status) {
                    $("#rg_warehouse_origin_id").append('<option value="" selected>SELECCIONAR</option>');
                    _.each(response.warehouse, function (item) {
                        if (default_ware === '') default_ware = item.Value;
                        $("#rg_warehouse_origin_id").append('<option value="' + item.Value + '">' + item.DisplayText + '</option>');
                    });
                    $("#rg_warehouse_destination_id").append('<option value="" selected>SELECCIONAR</option>');
                    _.each(response.warehouse, function (item) {
                        if (default_ware === '') default_ware = item.Value;
                        $("#rg_warehouse_destination_id").append('<option value="' + item.Value + '" data-address="' + item.Address + '"  data-local="' + item.Local + '" >' + item.DisplayText + '</option>');
                    });
                    _.each(response.DocumentType, function (item) {
                        if (default_document === '') default_document = item.Value;
                        if (item.Value === '09') {
                            $("#rg_document_type_id").append('<option value="' + item.Value + '" selected>' + item.DisplayText + '</option>');
                        }
                    });
                    _.each(response.MotiveTransfer, function (item) {
                        if (default_motive === '') default_motive = item.Value;
                        if (item.Value === 8) {
                            $("#rg_motive_id").append('<option value="' + item.Value + '" selected>' + item.DisplayText + '</option>');
                        }
                    });
                    // _.each(response.NumberSerial, function (b) {
                    //     array_numberSerial.push(b.DisplayText);
                    // });
                }
            }, function () {
                getDataForm();
            });
        }

        getDataForm();

        $scope.addDetail = function () {
            var bval = true;
            bval = bval && rg_code.required();
            bval = bval && rg_description.required();
            bval = bval && rg_unit_measure.required();
            // bval = bval && rg_cost_transfer.required();
            bval = bval && rg_quantity.required();
            if (bval) {
                if (update_data === true) {
                    update_data_key = true;
                }
                addDetailReferralGuide('', rg_code.val(), rg_description.val(), rg_unit_measure.val(), rg_cost_transfer.val(), rg_quantity.val());
            }
        };

        function addDetailReferralGuide(product_id, code, description, unit, cost, quantity) {

            var table_id = (product_id === '' || product_id === null) ? code : product_id;
            if ($('#tr_rg_' + table_id).length > 0) {
                AlertFactory.showWarning({
                    title: '',
                    message: 'Ya se asigno este artículo'
                });
                return false;
            }
            var tr = $('<tr id="tr_rg_' + table_id + '"></tr>');
            var td0 = $('<td class="rg_code">' + code + '</td>');
            var td1 = $('<td class="rg_description">' + description + '</td>');
            var td2 = $('<td class="rg_unit">' + unit + '</td>');
            var row_cost = (_.isNull(cost)) ? '0' : (_.isUndefined(cost)) ? '0' : cost;
            row_cost = parseFloat(row_cost);
            if (isNaN(row_cost)) {
                row_cost = 0;
            }
            var td3 = $('<td class="text-right rg_cost">' + row_cost + '</td>');
            var row_quantity = (_.isNull(quantity)) ? '0' : (_.isUndefined(quantity)) ? '0' : quantity;
            var td4 = $('<td class="text-right rg_quantity">' + row_quantity + '</td>');
            var rg_import = row_cost * row_quantity;
            var btn = $('<button class="btn btn-danger btn-xs delProduct" data-import="' + rg_import + '" type="button"><span class="fa fa-trash"></span></button>');
            var td5 = $('<td class="text-right">' + rg_import.toFixed(2) + '</td>');
            var td6 = $('<td class="text-center"></td>');
            td6.append(btn);
            tr.append(td0).append(td1).append(td2).append(td3).append(td4).append(td4).append(td5).append(td6);
            referral_guide_detail.append(tr);

            var total_calculated = parseFloat(rg_total.val());
            if (isNaN(total_calculated)) {
                total_calculated = 0;
            }
            var v_row_cost = parseFloat(row_cost);
            if (isNaN(v_row_cost) || v_row_cost === 'NaN') {
                v_row_cost = 0;
            }

            total_calculated = parseFloat(total_calculated) + parseFloat(v_row_cost * parseFloat(row_quantity));
            rg_total.val(total_calculated.toFixed(2));

            $('.delProduct').click(function (e) {
                var total_quit = $(this).attr('data-import');
                var tr_ = $(this).closest('tr');
                AlertFactory.confirm({
                    title: '',
                    message: '¿Está seguro que desea quitar esta artículo?',
                    confirm: 'Si',
                    cancel: 'No'
                }, function () {
                    if (update_data === true) {
                        update_data_key = true;
                    }
                    var total = rg_total.val();
                    total = parseFloat(total);
                    if (isNaN(total)) {
                        total = 0;
                    }
                    total = parseFloat(total) - parseFloat(total_quit);
                    total = parseFloat(total).toFixed(2);
                    rg_total.val(total);
                    tr_.remove();
                });
                e.preventDefault();
            });
            clear_product();
        }

        function clear_product() {
            rg_code.val('').focus();
            rg_description.val('');
            rg_unit_measure.val('');
            rg_cost_transfer.val('');
            rg_quantity.val('');

        }


        var search = getFormSearch('frm-search-rg', 'search_rg', 'LoadRecordsButtonRG');

        var table_container_rg = $("#table_container_rg");

        table_container_rg.jtable({
            title: "Lista Guía de Remisión",
            paging: true,
            sorting: true,
            selecting: true,
            multiselect: true,
            selectingCheckboxes: true,
            selectOnRowClick: false,
            actions: {
                listAction: base_url + '/referral_guides/list'
            },
            toolbar: {
                items: [{
                    cssClass: 'buscador',
                    text: search
                }, {
                    cssClass: 'btn-primary',
                    text: '<i class="fa fa-file-excel-o"></i> Exportar a Excel',
                    click: function () {
                        $scope.openDoc('referral_guides/excel', {});
                    }
                },
                    {
                        cssClass: 'btn-info',
                        text: '<i class="fa fa-print"></i> Imprimir',
                        click: function () {
                            printReferralGuide();
                        }
                    },
                    {
                        cssClass: 'btn-success',
                        text: '<i class="fa fa-plus"></i> Nueva Guía de Remisión',
                        click: function () {
                            newReferralGuide();
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
                code_guide: {
                    title: 'Código',
                    width: '2%'
                },
                number_guide: {
                    title: (show_list_) ? 'Nro. Guía' : 'N° Guía',
                    width: '2%'
                },
                description_motive: {
                    title: 'Motivo',
                    width: '5%'
                },
                description_project: {
                    title: (show_list_) ? 'Descrip, Proyecto' : 'Proyecto',
                    width: '10%'
                },
                name_carrier: {
                    title: 'Transportista',
                    width: '7%'
                },
                date: {
                    title: 'Fecha Emisión',
                    list: show_list_,
                    listClass: 'text-center',
                    width: '2%'
                },
                origin_guide: {
                    title: 'Origen',
                    width: '2%'
                },
                state_description: {
                    title: 'Estado',
                    width: '1%'
                },
                edit: {
                    width: '1%',
                    sorting: false,
                    edit: false,
                    create: false,
                    display: function (data) {
                        if (data.record.state_description === 'IMPRESO' || data.record.state_description === 'ANULADO'

                        ) { //poner || data.record.state_description === 'NO IMPRESO'
                            return '<a href="javascript:void(0)" title="Ver"class="edit_rw" data-code="' +
                                data.record.id + '"><i class="fa fa-eye fa-1-5x fa-green"></i></a>'
                        } else {
                            return '<a href="javascript:void(0)" title="Editar" class="edit_rw" data-code="' +
                                data.record.id + '"><i class="fa fa-pencil-square-o fa-1-5x fa-green"></i></a>' +
                                '<a href="javascript:void(0)" title="Eliminar" class="delete_rw" data-code="' +
                                data.record.id + '" ><i class="fa fa-trash fa-1-5x fa-red"></i></a>';
                        }
                        // var array_numberSerial=[];
                        // array_numberSerial.push(data.record.number);
                    }
                }
            },
            recordsLoaded: function (event, data) {
                $('.jtable-selecting-column input').iCheck({
                    checkboxClass: 'icheckbox_square-green'
                }).on('ifChanged', function (event) {
                    $(event.target).click();
                });
                $('.edit_rw').click(function (e) {
                    var id = $(this).attr('data-code');
                    list_select = [];
                    findReferralGuide(id);
                    e.preventDefault();
                });
            }
        });

        generateSearchForm('frm-search-rg', 'LoadRecordsButtonRG', function () {
            table_container_rg.jtable('load', {
                search: $('#search_rg').val()
            });
        }, true);


        var call_m = false;

        function callModals() {
            call_m = true;


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
                        if (update_data === true) {
                            update_data_key = true;
                        }
                        e.preventDefault();
                    });
                }
            });

            generateSearchForm('frm-search-tc', 'LoadRecordsButtonTC', function () {
                table_container_tc.jtable('load', {
                    search: $('#search_tc').val()
                });
            }, false);


            var search_p = getFormSearch('frm-search-p', 'search_p', 'LoadRecordsButtonP');

            var table_container_p = $("#table_container_p");

            table_container_p.jtable({
                title: "Lista de Proyectos",
                paging: true,
                sorting: true,
                actions: {
                    listAction: base_url + '/referral_guides/getProjects'
                },
                toolbar: {
                    items: [{
                        cssClass: 'buscador',
                        text: search_p
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
                        rg_project_id.val(data_id);
                        rg_project_code.val($(this).attr('data-code'));
                        rg_project_description.val($(this).attr('data-description'));
                        modalProj.modal('hide');
                        if (update_data === true) {
                            update_data_key = true;
                        }
                        e.preventDefault();
                    });
                }
            });

            generateSearchForm('frm-search-p', 'LoadRecordsButtonP', function () {
                table_container_p.jtable('load', {
                    search: $('#search_p').val()
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
                        title: 'Documento'
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
                        rg_entity_id.val(code).removeClass('border-red');
                        rg_social_reason.val(name).removeClass('border-red');
                        rg_document.val(document).removeClass('border-red');
                        rg_address.val(address).removeClass('border-red');
                        modalEnt.modal('hide');
                        if (update_data === true) {
                            update_data_key = true;
                        }
                        e.preventDefault();
                    });
                }
            });
            generateSearchForm('frm-search-entity', 'LoadRecordsButtonEntity', function () {
                table_container_e.jtable('load', {
                    search: $('#search_entity').val()
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

            .state('referral_guides', {
                url: '/referral_guides',
                templateUrl: base_url + '/templates/referral_guides/base.html',
                controller: 'ReferralGuideCtrl'
            });

        $urlRouterProvider.otherwise('/');
    }
})
();