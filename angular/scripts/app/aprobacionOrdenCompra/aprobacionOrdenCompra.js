(function () {
    'use strict';
    angular.module('sys.app.aprobacionOrdenCompras')
        .config(Config)
        .controller('AprobacionOrdenCompraCtrl', AprobacionOrdenCompraCtrl);

    Config.$inject = ['$stateProvider', '$urlRouterProvider'];
    AprobacionOrdenCompraCtrl.$inject = ['$scope', '_', 'RESTService', 'AlertFactory'];

    function AprobacionOrdenCompraCtrl($scope, _, RESTService, AlertFactory)
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

        var modalOC = $("#modalOC");
        modalOC.on('hidden.bs.modal', function (e) {
            cleanOC();
        });
        var titleOC = $("#titleOC");
        var modalObservation = $("#modalObservation");
        modalObservation.on('show.bs.modal', function (e) {
            modalOC.attr('style', 'display:block; z-index:2030 !important');
        });
        modalObservation.on('hidden.bs.modal', function (e) {
            oc_add_comment_approval.val('');
            modalOC.attr('style', 'display:block; overflow-y: auto;');
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
        var oc_con_state_id = 0;
        var oc_con_id = 0;
        var oc_consecutive = $("input#oc_consecutive");
        var oc_nro_consecutive = $("input#oc_nro_consecutive");
        var oc_date_register = $("input#oc_date_register");
        var oc_state = $("input#oc_state");
        var oc_priority = $("input#oc_priority");
        var oc_date_required = $("input#oc_date_required");
        var oc_currency = $("input#oc_currency");
        var oc_provider = $("input#oc_provider");
        var oc_payment_condition = $("input#oc_payment_condition");
        var oc_address = $("input#oc_address");
        var oc_comment = $("textarea#oc_comment");
        var oc_comment_approval = $("textarea#oc_comment_approval");
        var oc_detail_a = $("tbody#oc_detail_a");

        var oc_igv_ = 0;
        var oc_q_final_a = $('th#oc_q_final_a');
        var oc_pt_final_a = $('th#oc_pt_final_a');
        var oc_vc_final_a = $('th#oc_vc_final_a');
        var oc_vcd_final_a = $('th#oc_vcd_final_a');
        var oc_imp_final_a = $('th#oc_imp_final_a');
        var oc_st_final_a = $('th#oc_st_final_a');

        var oc_is_igv = $("input#oc_is_igv");
        generateCheckBox(oc_is_igv);

        var oc_per_disc_total = $("input#oc_per_disc_total");
        var oc_amount_disc_total = $("input#oc_amount_disc_total");
        var oc_total_a = $('input#oc_total_a');

        var oc_add_comment_approval = $("textarea#oc_add_comment_approval");

        var oc_approvers = $("tbody#oc_approvers");

        function cleanOC() {
            cleanRequired();
            oc_id = 0;
            oc_con_state_id = 0;
            oc_consecutive.val('');
            oc_nro_consecutive.val('');
            oc_date_register.val('');
            oc_state.val('');
            oc_priority.val('');
            oc_currency.val('');
            oc_provider.val('');
            oc_payment_condition.val('');
            oc_address.val('');
            oc_comment.val('');
            oc_comment_approval.val('');
            oc_detail_a.empty();
            calculateTotalFooterOC();

            oc_is_igv.prop('checked', false).prop('disabled', false).iCheck('update');
            oc_per_disc_total.val(0);
            oc_amount_disc_total.val(0);

            oc_total_a.val('0.00');
        }

        $scope.openAddApproval = function () {
            modalObservation.modal('show');
        };

        $scope.showApproval = function () {
            RESTService.get('aprobacionOrdenCompras/getApprovers', oc_id, function (response) {
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
        };

        $scope.saveObservation = function() {
            var b_val = true;
            b_val = b_val && oc_add_comment_approval.required();
            if (b_val) {
                var params = {
                    'comment': oc_add_comment_approval.val(),
                };
                RESTService.updated('aprobacionOrdenCompras/updateCommentApproval', oc_id, params, function (response) {
                    if (!_.isUndefined(response.status) && response.status) {
                        $scope.showAlert('', 'El comentario se guardó correctamente', 'success');
                        oc_comment_approval.val(params.comment);
                        modalObservation.modal('hide');
                    } else {
                        $scope.showAlert('', response.message, 'warning');
                    }
                });
            }
        };

        $scope.approvalReject = function (option) {
            // var msg_ = (option === 1) ? 'aprobar' : 'rechazar';
            // $scope.showConfirm('', '¿Está seguro que desea ' + msg_ + ' la orden?', function () {
            //     setTimeout(function () {
                    var msg_ = (option === 1) ? 'de la aprobación' : 'del rechazo';
                    AlertFactory.prompt({
                        title: 'Observación',
                        message: 'Ingrese observación ' + msg_,
                        placeholder: 'Ingrese observación',
                        showLoaderOnConfirm: true,
                        closeOnConfirm: false,
                        error_message: 'Debe ingresar la observación'
                    }, function (comment) {
                        var params = {
                            'nCodConformidad': oc_con_id,
                            'aprobaComentario': comment,
                            'iEstado': option
                        };
                        RESTService.updated('aprobacionOrdenCompras/approvalReject', oc_id, params, function (response) {
                            if (!_.isUndefined(response.status) && response.status) {
                                msg_ = (option === 1) ? 'aprobó' : 'rechazó';
                                $scope.showAlert('', 'Se ' + msg_ + ' correctamente', 'warning');
                                modalOC.modal('hide');
                                $("#LoadRecordsButtonOC").click();
                            } else {
                                $scope.showAlert('', response.message, 'warning');
                            }
                        });
                    });
                // }, 100);
            // });
        };

        function findOC(id) {
            RESTService.get('aprobacionOrdenCompras/find', id, function (response) {
                if (!_.isUndefined(response.status) && response.status)
                {
                    var data_p = response.data;
                    oc_id = id;
                    oc_consecutive.val(data_p.cCodConsecutivo);
                    oc_nro_consecutive.val(data_p.nConsecutivo);
                    oc_date_register.val(data_p.fecha_registro);
                    oc_state.val(data_p.iEstado);
                    oc_priority.val(data_p.prioridad);
                    oc_date_required.val(data_p.fecha_requerida);
                    oc_currency.val(data_p.idMoneda);
                    oc_provider.val(data_p.idProveedor).trigger('change');
                    oc_payment_condition.val(data_p.idcondicion_pago);
                    oc_address.val(data_p.direccionEntrega);
                    oc_comment.val(data_p.comentario);
                    oc_comment_approval.val(data_p.comentarioAprobacion);

                    var chk_igv = (parseInt(data_p.impuesto) === 1);
                    oc_is_igv.prop('checked', chk_igv).iCheck('update').prop('disabled', true);

                    oc_per_disc_total.val(parseFloat(data_p.nPorcDescuento));
                    oc_amount_disc_total.val(parseFloat(data_p.nDescuento));
                    oc_total_a.val(numberFormat(data_p.total, 2));

                    addArticleDetail(data_p.detail);

                    titleOC.html('Aprobar Orden de Compra');
                    modalOC.modal("show");
                } else {
                    $scope.showAlert('', response.message, 'warning');
                }
            }, 'approval=1');
        }

        function addArticleDetail(det) {
            oc_detail_a.empty();
            _.each(det, function (info) {
                var tr_ = $('<tr></tr>');
                tr_.append('<td>' + info.description + '</td>');

                var q_ = (_.isUndefined(info.q)) ? 0 : info.q;
                tr_.append('<td class="text-right oc_q">' + q_ + '</td>');

                var q_p = (_.isUndefined(info.qp)) ? q_ : info.qp;
                tr_.append('<td class="text-right oc_qp">' + q_p + '</td>');

                var q_r = (_.isUndefined(info.qr)) ? 0 : info.qr;
                tr_.append('<td class="text-right oc_qr">' + q_r + '</td>');

                var q_d = (_.isUndefined(info.qd)) ? 0 : info.qd;
                tr_.append('<td class="text-right oc_qd">' + q_d + '</td>');

                var p_ = (_.isUndefined(info.p)) ? 0 : info.p;
                tr_.append('<td class="text-right oc_p">' + p_ + '</td>');

                var t_ = roundMath(p_ * q_, 2);
                tr_.append('<td class="text-right oc_t">' + numberFormat(t_, 2) + '</td>');

                var per_disc_ = (_.isUndefined(info.per_disc)) ? 0 : info.per_disc;
                tr_.append('<td class="text-right oc_per_disc">' + per_disc_ + '</td>');

                var tot_disc_ = (_.isUndefined(info.tot_disc)) ? 0 : info.tot_disc;
                tr_.append('<td class="text-right oc_tot_disc">' + tot_disc_ + '</td>');

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

                tr_.append('<td class="text-center oc_date">' + info.date + '</td>');

                var det_state_id = (_.isUndefined(info.state_id)) ? 2 : parseInt(info.state_id);
                var txt_ = 'Registrado';
                txt_ = (det_state_id === 2) ? 'Por Aprobar' : txt_;
                txt_ = (det_state_id === 3) ? 'Aprobado' : txt_;
                txt_ = (det_state_id === 4) ? 'Recibido' : txt_;
                txt_ = (det_state_id === 5) ? 'Backorder' : txt_;
                txt_ = (det_state_id === 6) ? 'Cerrado' : txt_;
                txt_ = (det_state_id === 7) ? 'Cancelado' : txt_;
                txt_ = (det_state_id === 8) ? 'Rechazado' : txt_;
                tr_.append('<td class="text-center oc_state">' + txt_ + '</td>');

                oc_detail_a.append(tr_);
            });
            calculateTotalFooterOC();
        }
        function calculateTotalFooterOC() {
            var tot_q_ = 0, tot_t_ = 0, tot_vc_ = 0, tot_vcd_ = 0, tot_imp_ = 0, tot_fin_ = 0;
            console.log(oc_detail_a.find('tr').length);
            _.each(oc_detail_a.find('tr'), function (tr) {
                var tr_ = $(tr);
                var tot_q_prev_ = replaceAll(tr_.find('td.oc_q').html(), ',', '');
                tot_q_prev_ = (tot_q_prev_ === '') ? 0 : parseFloat(tot_q_prev_);
                console.log(tot_q_prev_);
                tot_q_ += tot_q_prev_;
                tot_t_ += parseFloat(replaceAll(tr_.find('td.oc_t').html(), ',', ''));
                tot_vc_ += parseFloat(replaceAll(tr_.find('td.oc_vc').html(), ',', ''));
                tot_vcd_ += parseFloat(replaceAll(tr_.find('td.oc_vcd').html(), ',', ''));
                tot_imp_ += parseFloat(replaceAll(tr_.find('td.oc_imp').html(), ',', ''));
                tot_fin_ += parseFloat(replaceAll(tr_.find('td.oc_tf').html(), ',', ''));
            });
            oc_q_final_a.html(numberFormat(tot_q_, 2));
            oc_pt_final_a.html(numberFormat(tot_t_, 2));
            oc_vc_final_a.html(numberFormat(tot_vc_, 2));
            oc_vcd_final_a.html(numberFormat(tot_vcd_, 2));
            oc_imp_final_a.html(numberFormat(tot_imp_, 2));
            oc_st_final_a.html(numberFormat(tot_fin_, 2));
            oc_total_a.val(numberFormat(tot_fin_, 2));
        }

        var search = getFormSearch('frm-search-oc', 'search_oc', 'LoadRecordsButtonOC');

        var table_container_oc = $("#table_container_oc");

        table_container_oc.jtable({
            title: "Lista de Ordenes de Compra",
            paging: true,
            actions: {
                listAction: base_url + '/aprobacionOrdenCompras/list'
            },
            toolbar: {
                items: [{
                    cssClass: 'buscador',
                    text: search
                }]
            },
            fields: {
                idOrdenCompra: {
                    key: true,
                    list: false
                },
                Codigo: {
                    title: 'Codigo',
                    listClass: 'text-center'
                },
                Conformidad: {
                    title: 'Conformidad',
                    list: false
                },
                Consecutivo: {
                    title: 'Consecutivo',
                    listClass: 'text-center'
                },
                Usuario: {
                    title: 'Usuario',
                },
                state_: {
                    title: 'Estado Aprobación',
                    listClass: 'text-center'
                },
                Fecha: {
                    title: 'Fecha',
                    listClass: 'text-center'
                },
                FechaReq: {
                    title: 'Fecha Requerida',
                    listClass: 'text-center'
                },
                TipoDoc: {
                    title: 'TipoDoc',
                    listClass: 'text-center'
                },
                NumeroDoc: {
                    title: 'NumeroDoc',
                    listClass: 'text-center'
                },
                Proveedor: {
                    title: 'Proveedor',
                },
                Moneda: {
                    title: 'Moneda',
                    listClass: 'text-center'
                },
                Total: {
                    title: 'Total',
                    listClass: 'text-right'
                },
                EstadoOC: {
                    title: 'Estado Orden Compra',
                    listClass: 'text-center'
                },
                edit: {
                    width: '1%',
                    sorting: false,
                    edit: false,
                    create: false,
                    listClass: 'text-center',
                    display: function (data) {
                        return '<a href="javascript:void(0)" class="view_oc" data-id="' + data.record.idOrdenCompra +
                            '" title="Ver"><i class="fa fa-edit fa-1-5x"></i></a>';
                    }
                }
            },
            recordsLoaded: function (event, data) {
                table_container_oc.find('a.view_oc').off().on('click', function (e) {
                    var id_ = $(this).attr('data-id');
                    findOC(id_);
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
    }

    function Config($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('aprobacionOrdenCompras', {
                url: '/aprobacionOrdenCompras',
                templateUrl: base_url + '/templates/aprobacionOrdenCompras/base.html',
                controller: 'AprobacionOrdenCompraCtrl'
            });

        $urlRouterProvider.otherwise('/');
    }
})
();