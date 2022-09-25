/**
 * Created by JairVasquez on 28/08/2017.
 */

function projectInsertBeforeTr(tr, item, t_body_list_levels) {
    var parent_ = item.attr('data-level');
    parent_ = t_body_list_levels.find('tr[data-parent="' + parent_ + '"]');
    if (parent_.length > 0) {
        item = parent_.last();
        projectInsertBeforeTr(tr, $(item), t_body_list_levels);
    } else {
        tr.insertAfter(item);
    }
}

function validPercentageProject(that) {
    var val_ = $(that).val();
    if (val_ !== '' && parseFloat(val_) > 100) {
        swal('', 'El porcentage ingresado no debe ser mayor de 100', 'warning');
        $(that).focus();
        return false;
    }
    return true;
}

function setValueTotal(total, p_total) {
    p_total.val(numberFormat(total, 2));
}

function generateTableConsolidated(body_id, data, is_edit, class_edit, callback) {
    var t_body = $(body_id);
    t_body.empty();
    _.each(data, function (item) {
        var tr = $('<tr></tr>');
        var th1 = $('<th class="text-center">' + item.code + '</th>');
        var th2 = $('<th class="text-left">' + item.text + '</th>');
        var th3 = $('<th></th>');
        var th4 = $('<th></th>');
        var th5 = $('<th></th>');
        var th6 = $('<th class="text-right">' + numberFormat(item.lb_t, 2) + '</th>');
        var th7 = $('<th></th>');
        var th8 = $('<th></th>');
        var th9 = $('<th class="text-right">' + numberFormat(item.pv_t, 2) + '</th>');
        var th10 = $('<th></th>');
        var th11 = $('<th></th>');
        var th12 = $('<th class="text-right p_e_c_tot" id="p_e_c_' + item.code + '">' + numberFormat(item.me_t, 2) + '</th>');
        tr.append(th1).append(th2).append(th3).append(th4).append(th5).append(th6).append(th7).append(th8)
            .append(th9).append(th10).append(th11).append(th12);
        t_body.append(tr);
        _.each(item.nodes, function (item2) {
            tr = $('<tr data-parent="' + item.code + '"></tr>');
            var th1_ = $('<th class="text-center">' + item2.code + '</th>');
            var th2_ = $('<th class="text-left">' + item2.text + '</th>');
            var th3_ = $('<th></th>');
            var th4_ = $('<th></th>');
            var th5_ = $('<th></th>');
            var th6_ = $('<th class="text-right">' + numberFormat(item2.lb_t, 2) + '</th>');
            var th7_ = $('<th></th>');
            var th8_ = $('<th></th>');
            var th9_ = $('<th class="text-right">' + numberFormat(item2.pv_t, 2) + '</th>');
            var th10_ = $('<th></th>');
            var th11_ = $('<th></th>');
            var th12_ = $('<th class="text-right p_e_c_tot" id="p_e_c_' + item2.code + '">' + numberFormat(item2.me_t, 2) + '</th>');
            tr.append(th1_).append(th2_).append(th3_).append(th4_).append(th5_).append(th6_).append(th7_)
                .append(th8_).append(th9_).append(th10_).append(th11_).append(th12_);
            t_body.append(tr);
            _.each(item2.nodes, function (item3) {
                tr = $('<tr data-parent="' + item2.code + '"></tr>');
                var td1 = $('<th class="text-center text-success">' + item3.code + '</th>');
                var td2 = $('<th class="text-left text-success">' + item3.text + '</th>');
                var td3 = $('<td></td>');
                var td4 = $('<td></td>');
                var td5 = $('<td></td>');
                var td6 = $('<th class="text-right text-success">' + numberFormat(item3.lb_t, 2) + '</th>');
                var td7 = $('<td></td>');
                var td8 = $('<td></td>');
                var td9 = $('<th class="text-right text-success">' + numberFormat(item3.pv_t, 2) + '</th>');
                var td10 = $('<td></td>');
                var td11 = $('<td></td>');
                var td12 = $('<th class="text-right text-success p_e_c_tot" id="p_e_c_' + item3.code
                    + '">' + numberFormat(item3.me_t, 2) + '</th>');
                tr.append(td1).append(td2).append(td3).append(td4).append(td5).append(td6).append(td7)
                    .append(td8).append(td9).append(td10).append(td11).append(td12);
                t_body.append(tr);
                _.each(item3.nodes, function (item4) {
                    var tr = $('<tr data-parent="' + item3.code + '"></tr>');
                    var td1_ = $('<td class="text-center">' + item4.code + '</td>');
                    var td2_ = $('<td class="text-padding-l-20">' + item4.text + '</td>');
                    var td3_ = $('<td class="text-center">' + item4.um + '</td>');
                    var td4_ = $('<td class="text-right">' + numberFormat(item4.lb_q, 2) + '</td>');
                    var td5_ = $('<td class="text-right">' + numberFormat(item4.lb_p, 2) + '</td>');
                    var td6_ = $('<td class="text-right">' + numberFormat(item4.lb_t, 2) + '</td>');
                    var td7_ = $('<td class="text-right">' + numberFormat(item4.pv_q, 2) + '</td>');
                    var td8_ = $('<td class="text-right">' + numberFormat(item4.pv_p, 2) + '</td>');
                    var td9_ = $('<td class="text-right">' + numberFormat(item4.pv_t, 2) + '</td>');
                    var td10_ = $('<td class="text-right p_e_c_q">' + numberFormat(item4.me_q, 2) + '</td>');
                    var td11_;
                    if (is_edit && item4.is_del !== 1) {
                        td11_ = $('<td class="text-center"><input style="width: 50px" class="text-right ' +
                            class_edit + '" data-code="' + item4.code + '" data-value="' + item4.me_p + '" type="text" ' +
                            'value="' + roundValue(item4.me_p, 2) + '" onblur="roundDecimals(this, 2)" ' +
                            'onkeypress="return validDecimals(event, this, 3)" onclick="this.select()"></td>');
                    } else {
                        td11_ = $('<td class="text-right">' + numberFormat(item4.me_p, 2) + '</td>');
                    }
                    var td12_ = $('<td class="text-right p_e_c_tot">' + numberFormat(item4.me_t, 2) + '</td>');
                    tr.append(td1_).append(td2_).append(td3_).append(td4_).append(td5_).append(td6_)
                        .append(td7_).append(td8_).append(td9_).append(td10_).append(td11_).append(td12_);
                    t_body.append(tr);
                });
            });
        });
    });
    if (typeof callback === 'function') {
        callback();
    }
}

function calculateTotalsConsolidated(body_id, code_) {
    var total_parent = 0;
    _.each($(body_id).find('tr[data-parent="' + code_ + '"]'), function (item) {
        total_parent += parseFloat(replaceAll($(item).find('.p_e_c_tot').html(), ',', ''));
    });
    var parent_ = $('#p_e_c_' + code_);
    parent_.html(numberFormat(total_parent, 2));
    code_ = parent_.closest('tr').attr('data-parent');
    if ($(body_id).find('tr[data-parent="' + code_ + '"]').length > 0) {
        calculateTotalsConsolidated(body_id, code_);
    }
}

function generateTableByMatrix(table_id, data, class_) {
    table_id = $(table_id);
    var t_body = $('<tbody class="t_gt_ hide"></tbody>');
    var tr = $('<tr data-code="1"></tr>');
    var th1 = $('<th colspan="2" class="text-center">1</th>');
    var th2 = $('<th class="text-left">TOTAL GASTOS GENERALES</th>');
    var th3 = $('<th></th>');
    var th3_1, th3_2;
    if (class_ === 'gg') {
        th3_1 = $('<th></th>');
        th3_2 = $('<th></th>');
    }
    var th4 = $('<th></th>');
    var th5 = $('<th></th>');
    var th6 = $('<th class="text-right p_e_' + class_ + '_tot" id="p_e_' + class_ + '_1">0.00</th>');
    tr.append(th1).append(th2).append(th3).append(th3_1).append(th3_2).append(th4).append(th5).append(th6);
    t_body.append(tr);
    table_id.append(t_body);
    _.each(data, function (item) {
        var is_transport = (class_ === 'transport');
        var txt_success = (is_transport) ? 'text-success' : '';
        t_body = $('<tbody class="t_gt_ hide"></tbody>');
        tr = $('<tr data-parent="1" data-code="' + item.code + '"></tr>');
        th1 = $('<th colspan="2" class="text-center ' + txt_success + '">' + item.code + '</th>');
        th2 = $('<th class="text-left ' + txt_success + '">' + item.text + '</th>');
        th3 = $('<th></th>');
        var th3_1, th3_2;
        if (class_ === 'gg') {
            th3_1 = $('<th></th>');
            th3_2 = $('<th></th>');
        }
        th4 = $('<th></th>');
        th5 = $('<th></th>');
        th6 = $('<th class="text-right ' + txt_success + ' p_e_' + class_ + '_tot" id="p_e_' + class_ + '_' + item.code + '">0.00</th>');
        tr.append(th1).append(th2).append(th3).append(th3_1).append(th3_2).append(th4).append(th5).append(th6);
        t_body.append(tr);
        table_id.append(t_body);
        if (is_transport) {
            var t_body2 = $('<tbody id="t_body_gt_' + item.code + '" class="t_body_gt hide"></tbody>');
            table_id.append(t_body2);
        } else {
            _.each(item['nodes'], function (item2) {
                t_body = $('<tbody class="t_gt_ hide"></tbody>');
                tr = $('<tr data-parent="' + item.code + '" data-code="' + item2.code + '"></tr>');
                th1 = $('<th colspan="2" class="text-center text-success">' + item2.code + '</th>');
                th2 = $('<th class="text-left text-success">' + item2.text + '</th>');
                th3 = $('<th></th>');
                var th3_1, th3_2;
                if (class_ === 'gg') {
                    th3_1 = $('<th></th>');
                    th3_2 = $('<th></th>');
                }
                th4 = $('<th></th>');
                th5 = $('<th></th>');
                th6 = $('<th class="text-right text-success p_e_' + class_ + '_tot" id="p_e_' + class_ + '_' + item2.code + '">0.00</th>');
                tr.append(th1).append(th2).append(th3).append(th3_1).append(th3_2).append(th4).append(th5).append(th6);
                t_body.append(tr);
                var t_body2 = $('<tbody id="t_body_gt_' + item2.code + '" class="t_body_gt hide"></tbody>');
                table_id.append(t_body).append(t_body2);
            });
        }
    });
}

function addToMatrixGT(table_id, data, is_edit, class_, callback) {
    var t_body = $(table_id).find('tbody[id="t_body_gt_' + data.parent + '"]');
    var tr = $('<tr class="p_gg_tr_" id="p_gg_tr_' + data.matrix + '" data-parent="' + data.parent + '" data-code="' + data.matrix + '" ' +
        'data-type="' + data.type + '"></tr>');
    var td0 = $('<td width="20px" class="text-center"></td>');
    if (is_edit) {
        var a_del_ = $('<a href="#" title="Eliminar" class="p_e_del_gt"><i class="fa fa-trash fa-1-5x fa-red"></i></a>');
        td0.append(a_del_);
    }
    var td1 = $('<td width="100px" class="text-center">' + data.matrix + '</td>');
    var td2 = $('<td class="text-padding-l-20">' + data.description + '</td>');
    var td3 = $('<td class="text-center">' + data.um + '</td>');
    var td3_1, td3_2;
    if (parseInt(data.type) === 1) {
        if (is_edit) {
            td3_1 = $('<td class="text-center data-par"><input style="width: 40px" class="text-right p_e_edit_' +
                class_ + '" data-code="' + data.matrix + '" type="text" value="' + data.participation + '" ' +
                'onblur="roundDecimals(this, 2)" onkeypress="return validDecimals(event, this, 3)" ' +
                'onclick="this.select()"></td>');
            td3_2 = $('<td class="text-center data-m"><input style="width: 40px" class="text-right p_e_edit_' +
                class_ + '" data-code="' + data.matrix + '" type="text" value="' + data.months + '" ' +
                'onkeypress="return soloNumeros(event)" onclick="this.select()"></td>');
        } else {
            td3_1 = $('<td class="text-right">' + numberFormat(data.participation, 2) + '</td>');
            td3_2 = $('<td class="text-right">' + data.months + '</td>');
        }
    }
    var td4, td5;
    if (is_edit) {
        td4 = $('<td class="text-center data-q"><input style="width: 75px" class="text-right p_e_edit_' +
            class_ + '" data-code="' + data.matrix + '" type="text" value="' + data.quantity + '" ' +
            'onblur="roundDecimals(this, 2)" onkeypress="return validDecimals(event, this, 3)" ' +
            'onclick="this.select()"></td>');
        td5 = $('<td class="text-center data-p"><input style="width: 75px" class="text-right p_e_edit_' +
            class_ + '" data-code="' + data.matrix + '" type="text" value="' + data.price + '" ' +
            'onblur="roundDecimals(this, 2)" onkeypress="return validDecimals(event, this, 3)" ' +
            'onclick="this.select()"></td>');
    } else {
        td4 = $('<td class="text-right">' + numberFormat(data.quantity, 2) + '</td>');
        td5 = $('<td class="text-right">' + numberFormat(data.price, 2) + '</td>');
    }
    var td6 = $('<td class="text-right p_e_' + class_ + '_tot" id="p_e_' + class_ + '_' + data.matrix + '">' +
        numberFormat(data.total, 2) + '</td>');
    tr.append(td0).append(td1).append(td2).append(td3).append(td3_1).append(td3_2).append(td4).append(td5).append(td6);
    t_body.append(tr);
    validMatrixToShow(data.parent, table_id);
    if (typeof callback === 'function') {
        callback();
    }
}

function validMatrixToShow(code, table_id) {
    var t_body = $(table_id).find('tbody[id="t_body_gt_' + code + '"]');
    var tr_ = $(table_id).find('tr[data-code=' + code + ']');
    tr_.parent().addClass('hide');
    t_body.addClass('hide');
    if (t_body.html() !== '') {
        tr_.parent().removeClass('hide');
        t_body.removeClass('hide');
    }
    var tr_2 = $(table_id).find('tr[data-code=' + tr_.attr('data-parent') + ']');
    if (tr_2.length > 0) {
        var is_show = false;
        _.each($(table_id).find('tr[data-parent=' + tr_2.attr('data-code') + ']'), function (item) {
            if (!$(item).parent().hasClass('hide')) {
                is_show = true;
            }
        });
        tr_2.parent().addClass('hide');
        if (is_show) {
            tr_2.parent().removeClass('hide');
        }
        var tr_3 = $(table_id).find('tr[data-code=' + tr_2.attr('data-parent') + ']');
        if (tr_3.length > 0) {
            is_show = false;
            _.each($(table_id).find('tr[data-parent=' + tr_3.attr('data-code') + ']'), function (item) {
                if (!$(item).parent().hasClass('hide')) {
                    is_show = true;
                }
            });
            tr_3.parent().addClass('hide');
            if (is_show) {
                tr_3.parent().removeClass('hide');
            }
        }
    }
}

function calculateTotalsGT(body_id, code_, class_) {
    var total_parent = 0;
    _.each($(body_id).find('tr[data-parent="' + code_ + '"]'), function (item) {
        total_parent += parseFloat(replaceAll($(item).find('.p_e_' + class_ + '_tot').html(), ',', ''));
    });
    var parent_ = $('#p_e_' + class_ + '_' + code_);
    parent_.html(numberFormat(total_parent, 2));
    code_ = parent_.closest('tr').attr('data-parent');
    if ($(body_id).find('tr[data-parent="' + code_ + '"]').length > 0) {
        calculateTotalsGT(body_id, code_, class_);
    }
}

function generateConsolidatedClientProject(body_id, data) {
    body_id = $(body_id);
    body_id.empty();
    _.each(data, function (item, idx) {
        var is_active = (!_.isUndefined(item.show) && item.show);
        var t_ = (is_active) ? 'th' : 'td';
        var t_t_ = (!_.isUndefined(item.item)) ? 'th' : 'td';
        var t_t = (is_active) ? 'th' : t_t_;
        var t_class_ = (!_.isUndefined(item.item) && item.item.length > 0) ? '' : 'text-padding-l-20';
        var t_class = (is_active) ? '' : t_class_;
        var tr = (is_active) ? $('<tr class="info"></tr>') : $('<tr data-code="' + idx + '"></tr>');
        var td_1 = $('<' + t_ + ' class="text-center">' + item.code + '</' + t_ + '>');
        var td_2 = $('<' + t_ + ' class="text-left ' + t_class + '"> ' + item.text + '</td>');
        if (!_.isUndefined(item.item) && item.item.length > 0) {
            var btn_1 = $('<button class="btn btn-xs btn-default btn-p-show"></button>');
            var span_1 = $('<span class="fa fa-plus"></span>');
            var btn_2 = $('<button class="btn btn-xs btn-default btn-p-hide hide"></button>');
            var span_2 = $('<span class="fa fa-minus"></span>');
            btn_1.append(span_1);
            btn_2.append(span_2);
            td_2.prepend(btn_1).prepend(btn_2);
        }
        var td_3 = $('<' + t_t + ' class="text-right">' + item.lb + '</' + t_ + '>');
        var td_4 = $('<' + t_t + ' class="text-right">' + item.pv + '</' + t_ + '>');
        var td_5 = $('<' + t_t + ' class="text-center">' + item.per + '%</' + t_ + '>');
        var td_6 = $('<' + t_t + ' class="text-right">' + item.ev + '</' + t_ + '>');
        tr.append(td_1).append(td_2).append(td_3).append(td_4).append(td_5).append(td_6);
        body_id.append(tr);
        if (!_.isUndefined(item.item) && item.item.length > 0) {
            _.each(item.item, function (item2, idx2) {
                tr = $('<tr class="hide tr_' + idx + '" data-code="' + idx + '-' + idx2 + '"></tr>');
                td_1 = $('<td></td>');
                td_2 = $('<td class="text-left text-padding-l-20"> ' + item2.text + '</td>');
                if (!_.isUndefined(item2.item) && item2.item.length > 0) {
                    btn_1 = $('<button class="btn btn-xs btn-default btn-p-show"></button>');
                    span_1 = $('<span class="fa fa-plus"></span>');
                    btn_2 = $('<button class="btn btn-xs btn-default btn-p-hide hide"></button>');
                    span_2 = $('<span class="fa fa-minus"></span>');
                    btn_1.append(span_1);
                    btn_2.append(span_2);
                    td_2.prepend(btn_1).prepend(btn_2);
                }
                td_3 = $('<th class="text-right fa-blue">' + item2.lb + '</th>');
                td_4 = $('<th class="text-right fa-blue">' + item2.pv + '</th>');
                td_5 = $('<td></td>');
                td_6 = $('<th class="text-right fa-blue">' + item2.ev + '</th>');
                tr.append(td_1).append(td_2).append(td_3).append(td_4).append(td_5).append(td_6);
                body_id.append(tr);
                if (!_.isUndefined(item2.item) && item2.item.length > 0) {
                    _.each(item2.item, function (item3, idx3) {
                        tr = $('<tr class="hide tr_' + idx + '-' + idx2 + '" data-code="' + idx + '-' + idx2 + '-' + idx3 + '"></tr>');
                        td_1 = $('<td></td>');
                        td_2 = $('<td class="text-left text-padding-l-40"> ' + item3.text + '</td>');
                        if (!_.isUndefined(item3.item) && item3.item.length > 0) {
                            btn_1 = $('<button class="btn btn-xs btn-default btn-p-show"></button>');
                            span_1 = $('<span class="fa fa-plus"></span>');
                            btn_2 = $('<button class="btn btn-xs btn-default btn-p-hide hide"></button>');
                            span_2 = $('<span class="fa fa-minus"></span>');
                            btn_1.append(span_1);
                            btn_2.append(span_2);
                            td_2.prepend(btn_1).prepend(btn_2);
                        }
                        td_3 = $('<td class="text-right">' + item3.lb + '</td>');
                        td_4 = $('<td class="text-right">' + item3.pv + '</td>');
                        td_5 = $('<td></td>');
                        td_6 = $('<td class="text-right">' + item3.ev + '</td>');
                        tr.append(td_1).append(td_2).append(td_3).append(td_4).append(td_5).append(td_6);
                        body_id.append(tr);
                        if (!_.isUndefined(item3.item) && item3.item.length > 0) {
                            _.each(item3.item, function (item4) {
                                tr = $('<tr class="hide tr_' + idx + '-' + idx2 + '-' + idx3 + '"></tr>');
                                td_1 = $('<td></td>');
                                td_2 = $('<td class="text-left text-padding-l-60"> <small>' + item4.text + '</small></td>');
                                td_3 = $('<td class="text-right"><small>' + item4.lb + '</small></td>');
                                td_4 = $('<td class="text-right"><small>' + item4.pv + '</small></td>');
                                td_5 = $('<td></td>');
                                td_6 = $('<td class="text-right"><small>' + item4.ev + '</small></td>');
                                tr.append(td_1).append(td_2).append(td_3).append(td_4).append(td_5).append(td_6);
                                body_id.append(tr);
                            });
                        }
                    });
                }
            });
        }
    });
    $('.btn-p-show').click(function (e) {
        var tr_ = $(this).closest('tr');
        var code_ = tr_.attr('data-code');
        $('.tr_' + code_).removeClass('hide');
        tr_.find('button.btn-p-show').addClass('hide');
        tr_.find('button.btn-p-hide').removeClass('hide');
        e.preventDefault();
    });
    $('.btn-p-hide').click(function (e) {
        var tr_ = $(this).closest('tr');
        var code_ = tr_.attr('data-code');
        var tr_code = $('.tr_' + code_);
        tr_code.addClass('hide');
        tr_.find('button.btn-p-hide').addClass('hide');
        tr_.find('button.btn-p-show').removeClass('hide');
        _.each(tr_code, function (item) {
            var btn_ = $(item).find('button');
            if (btn_.length > 0) {
                $(item).find('button.btn-p-hide').click();
            }
        });
        e.preventDefault();
    });
}

function generateConsolidatedMetaProject(body_id, data) {
    body_id = $(body_id);
    body_id.empty();
    _.each(data, function (item, idx) {
        var is_active = (!_.isUndefined(item.show) && item.show);
        var tr = (is_active) ? $('<tr class="info"></tr>') : $('<tr></tr>');
        var td_1 = $('<th class="text-left fa-red">' + item.code + '</th>');
        var td_2 = $('<th class="text-left fa-red"> ' + item.text + '</th>');
        var per = (!_.isUndefined(item.per)) ? item.per + '%' : '';
        var td_3 = $('<th>' + per + '</th>');
        var td_4 = $('<th class="text-right fa-red">' + numberFormat(item.t, 2) + '</th>');
        var td_5 = $('<th class="text-right fa-red">0.00</th>');
        var td_6 = $('<th class="text-right fa-red">0.00</th>');
        tr.append(td_1).append(td_2).append(td_3).append(td_4).append(td_5).append(td_6);
        body_id.append(tr);
        if (!_.isUndefined(item.nodes)) {
            _.each(item.nodes, function (item2, idx2) {
                tr = $('<tr data-code="' + idx + '-' + idx2 + '"></tr>');
                td_1 = $('<th>' + item2.code + '</th>');
                td_2 = $('<th class="text-left"> ' + item2.text + '</th>');
                if (!_.isUndefined(item2.nodes)) {
                    btn_1 = $('<button class="btn btn-xs btn-default btn-p2-show"></button>');
                    span_1 = $('<span class="fa fa-plus"></span>');
                    btn_2 = $('<button class="btn btn-xs btn-default btn-p2-hide hide"></button>');
                    span_2 = $('<span class="fa fa-minus"></span>');
                    btn_1.append(span_1);
                    btn_2.append(span_2);
                    td_2.prepend(btn_1).prepend(btn_2);
                }
                per = (!_.isUndefined(item2.per)) ? item2.per + '%' : '';
                td_3 = $('<th>' + per + '</th>');
                td_4 = $('<th class="text-right">' + numberFormat(item2.t, 2) + '</th>');
                td_5 = $('<th class="text-right">0.00</th>');
                td_6 = $('<th class="text-right">0.00</th>');
                tr.append(td_1).append(td_2).append(td_3).append(td_4).append(td_5).append(td_6);
                body_id.append(tr);
                if (!_.isUndefined(item2.nodes)) {
                    _.each(item2.nodes, function (item3, idx3) {
                        tr = $('<tr class="hide tr_' + idx + '-' + idx2 + '" data-code="' + idx + '-' + idx2 + '-' + idx3 + '"></tr>');
                        td_1 = $('<td></td>');
                        var class_ = (!_.isUndefined(item3.nodes)) ? 'fa-blue' : '';
                        var t_ = (!_.isUndefined(item3.nodes)) ? 'th' : 'td';
                        td_2 = $('<' + t_ + ' class="text-left text-padding-l-20 ' + class_ + '"> ' + item3.code + '-' + item3.text + '</' + t_ + '>');
                        if (!_.isUndefined(item3.nodes)) {
                            btn_1 = $('<button class="btn btn-xs btn-default btn-p2-show"></button>');
                            span_1 = $('<span class="fa fa-plus"></span>');
                            btn_2 = $('<button class="btn btn-xs btn-default btn-p2-hide hide"></button>');
                            span_2 = $('<span class="fa fa-minus"></span>');
                            btn_1.append(span_1);
                            btn_2.append(span_2);
                            td_2.prepend(btn_1).prepend(btn_2);
                        }
                        td_3 = $('<th></th>');
                        td_4 = $('<' + t_ + ' class="text-right ' + class_ + '">' + numberFormat(item3.t, 2) + '</' + t_ + '>');
                        td_5 = $('<' + t_ + ' class="text-right ' + class_ + '">0.00</' + t_ + '>');
                        td_6 = $('<' + t_ + ' class="text-right ' + class_ + '">0.00</' + t_ + '>');
                        tr.append(td_1).append(td_2).append(td_3).append(td_4).append(td_5).append(td_6);
                        body_id.append(tr);
                        if (!_.isUndefined(item3.nodes)) {
                            _.each(item3.nodes, function (item4) {
                                tr = $('<tr class="hide tr_' + idx + '-' + idx2 + '-' + idx3 + '"></tr>');
                                td_1 = $('<td></td>');
                                td_2 = $('<td class="text-left text-padding-l-40">' + item4.code + '-' + item4.text + '</td>');
                                td_3 = $('<td></td>');
                                td_4 = $('<td class="text-right">' + numberFormat(item4.t, 2) + '</td>');
                                td_5 = $('<td class="text-right">0.00</td>');
                                td_6 = $('<td class="text-right">0.00</td>');
                                tr.append(td_1).append(td_2).append(td_3).append(td_4).append(td_5).append(td_6);
                                body_id.append(tr);
                            });
                        }
                    });
                }
            });
        }
    });
    $('.btn-p2-show').click(function (e) {
        var tr_ = $(this).closest('tr');
        var code_ = tr_.attr('data-code');
        $('.tr_' + code_).removeClass('hide');
        tr_.find('button.btn-p2-show').addClass('hide');
        tr_.find('button.btn-p2-hide').removeClass('hide');
        e.preventDefault();
    });
    $('.btn-p2-hide').click(function (e) {
        var tr_ = $(this).closest('tr');
        var code_ = tr_.attr('data-code');
        var tr_code = $('.tr_' + code_);
        tr_code.addClass('hide');
        tr_.find('button.btn-p2-hide').addClass('hide');
        tr_.find('button.btn-p2-show').removeClass('hide');
        _.each(tr_code, function (item) {
            var btn_ = $(item).find('button');
            if (btn_.length > 0) {
                $(item).find('button.btn-p2-hide').click();
            }
        });
        e.preventDefault();
    });
}

function addProvidersMaterialsFrontHeader(fronts) {
    $('#p_fro_col_mat').attr('colspan', (2 * (fronts.length) + 1));
    var p_fro_col_pro = $('#p_fro_col_pro');
    p_fro_col_pro.empty();
    var p_fro_col_ct = $('#p_fro_col_ct');
    p_fro_col_ct.empty();
    var th_, div_;
    _.each(fronts, function (front) {
        th_ = $('<th colspan="2"></th>');
        div_ = $('<div class="front_desc">' + front.text + '</div>');
        th_.append(div_);
        p_fro_col_pro.append(th_);
        p_fro_col_ct.append('<th class="text-center">CANT</th>');
        p_fro_col_ct.append('<th class="text-center">TOTAL</th>');
    });
    th_ = $('<th rowspan="2"></th>');
    div_ = $('<div style="min-width: 60px;">TOTAL</div>');
    th_.append(div_);
    p_fro_col_pro.append(th_);
}
function addProvidersMaterialsFront(is_edit, id_, q_, p_, data) {
    var p_fro_col_det = $('#p_fro_col_det');
    var tr_ = $('<tr class="p_tr_front_mat_" data-id="'+id_+'" data-q="' + q_ + '" data-p="' + p_ + '"></tr>');
    var total_ = 0;
    _.each(data, function (d) {
        var td_1 = (is_edit) ? $('<td class="text-center"></td>') : $('<td class="text-right"></td>');
        var inp_1 = (is_edit) ? $('<input class="p_front_mat_q_ text-right" data-id="' + id_ + '" data-f="' + d.id + '" type="text" ' +
            'style="width: 40px" value="' + d.q + '" onkeypress="return validDecimals(event, this, 3)" ' +
            'onblur="return roundDecimals(this, 2)" onclick="this.select()" >') :
            $('<span>' + numberFormat(d.q, 2) + '</span>');
        var td_2 = $('<td class="text-right"></td>');
        var inp_2 = $('<span class="p_front_tot_' + id_ + '-' + d.id + ' p_front_tot_' + d.id + ' p_front_tot_">' +
            numberFormat(d.q * p_, 2) + '</span>');
        td_1.append(inp_1);
        td_2.append(inp_2);
        tr_.append(td_1).append(td_2);
        total_ += parseFloat(d.q) * parseFloat(p_);
    });
    tr_.append('<th class="text-right p_front_tot_h">' + numberFormat(total_, 2) + '</th>');
    p_fro_col_det.append(tr_);

    $('.p_front_mat_q_').keyup(function (e) {
        var that_ = $(this);
        var q_ = that_.val();
        q_ = (q_ === '') ? 0 : parseFloat(q_);
        var tr_ = that_.closest('tr');
        var p_ = parseFloat(tr_.attr('data-p'));
        var id_ = that_.attr('data-id');
        var f_ = that_.attr('data-f');
        $('.p_front_tot_'+id_+'-'+f_).html(numberFormat(q_ * p_, 2));
        var total = 0;
        _.each(tr_.find('.p_front_tot_'), function (d) {
            total += parseFloat(replaceAll($(d).html(), ',', ''));
        });
        tr_.find('.p_front_tot_h').html(numberFormat(total, 2));
        total = 0;
        _.each($('.p_front_tot_'+f_), function (d) {
            total += parseFloat(replaceAll($(d).html(), ',', ''));
        });
        $('.p_front_tot_v_'+f_).html(numberFormat(total, 2));
        total = 0;
        _.each($('.p_front_tot_v_'), function (d) {
            total += parseFloat(replaceAll($(d).html(), ',', ''));
        });
        $('.p_front_tot_mat_').html(numberFormat(total, 2));
        e.preventDefault();
    });
}
function addProvidersMaterialsFrontFooter(fronts) {
    var p_fro_col_f = $('#p_fro_col_f');
    p_fro_col_f.empty();
    var tr_ = $('<tr></tr>');
    var total = 0;
    _.each(fronts, function (front) {
        tr_.append('<th></th>');
        var total_ = 0;
        _.each($('.p_front_tot_'+front.id), function (f) {
            total_ += parseFloat(replaceAll($(f).html(), ',', ''));
        });
        total += total_;
        tr_.append('<th class="text-right p_front_tot_v_'+front.id+' p_front_tot_v_">' + numberFormat(total_, 2) + '</th>');
    });
    tr_.append('<th class="text-right p_front_tot_mat_">' + numberFormat(total, 2) + '</th>');
    p_fro_col_f.append(tr_);
}

function addProviderActivityFront(is_edit, data, callback) {
    $('#p_fro_col_act').attr('colspan', (2 * (data.fronts.length) + 1));
    var p_fro_tr_act = $('#p_fro_tr_act');
    var p_fro_tr_ct = $('#p_fro_tr_ct');
    var p_fro_act_body = $('#p_fro_act_body');
    p_fro_tr_act.empty();
    p_fro_tr_ct.empty();
    p_fro_act_body.empty();
    var tr_1 = $('<tr class="p_tr_front_act_" style="height:25px" data-q="' + data.quantity + '" data-p="' + data.price + '"></tr>');
    var tr_2 = $('<tr></tr>');
    var tr_3 = $('<tr></tr>');
    var tr_4 = $('<tr></tr>');
    var tr_5 = $('<tr></tr>');
    var total_ = 0, total_sc = 0;
    _.each(data.fronts, function (f) {
        var th_ = $('<th colspan="2"></th>');
        div_ = $('<div class="front_desc">' + f.text + '</div>');
        th_.append(div_);
        p_fro_tr_act.append(th_);
        p_fro_tr_ct.append('<th class="text-center">CANT</th>');
        p_fro_tr_ct.append('<th class="text-center">TOTAL</th>');

        var td_1 = (is_edit) ? $('<td class="text-center"></td>') : $('<td class="text-right"></td>');
        var inp_1 = (is_edit) ? $('<input class="p_front_act_q_ text-right" data-f="' + f.id + '" type="text" ' +
            'style="width: 40px" value="' + f.q + '" onkeypress="return validDecimals(event, this, 3)" ' +
            'onblur="return roundDecimals(this, 2)" onclick="this.select()" >') :
            $('<span>' + numberFormat(f.q, 2) + '</span>');
        var td_2 = $('<td class="text-right"></td>');
        var inp_2 = $('<span class="p_front_tot_act_' + f.id + ' p_front_tot_act_">' +
            numberFormat(parseFloat(f.q)*parseFloat(data.price), 2) + '</span>');
        td_1.append(inp_1);
        td_2.append(inp_2);
        tr_1.append(td_1).append(td_2);
        total_ += parseFloat(f.q) * parseFloat(data.price);

        var td_2_ = $('<td class="text-center" colspan="2"></td>');
        var btn_2 = $('<button class="btn btn-sm btn-primary btn-front-act" type="button" data-code="'+f.id+'">APU</button>');
        td_2_.append(btn_2);
        tr_2.append(td_2_);

        tr_3.append('<th colspan="2">SUBCONTRATO</th>');
        tr_4.append('<th>PRECIO</th>').append('<th>TOTAL</th>');
        tr_5.append('<td class="text-right p_front_tot_act_p_sc_' + f.id + '">'+numberFormat(f.p, 2)+'</td>');
        tr_5.append('<td class="text-right p_front_tot_act_t_sc_' + f.id + ' p_front_tot_act_sc_">'+numberFormat(f.t, 2)+'</td>');

        total_sc += parseFloat(f.t);
    });
    th_ = $('<th rowspan="2"></th>');
    div_ = $('<div style="min-width: 60px;">TOTAL</div>');
    th_.append(div_);
    p_fro_tr_act.append(th_);
    tr_1.append('<th class="text-right p_front_tot_act_tot">' + numberFormat(total_, 2) + '</th>');
    tr_2.append('<th></th>');
    tr_3.append('<th rowspan="2">SUBCONTRATO<br>TOTAL</th>');
    tr_5.append('<th class="text-right p_front_tot_act_tot_sc">' + numberFormat(total_sc, 2) + '</th>');
    p_fro_act_body.append(tr_1).append(tr_2).append(tr_3).append(tr_4).append(tr_5);

    $('.p_front_act_q_').keyup(function (e) {
        var that_ = $(this);
        var q_ = that_.val();
        q_ = (q_ === '') ? 0 : parseFloat(q_);
        var tr_ = that_.closest('tr');
        var p_ = parseFloat(tr_.attr('data-p'));
        var f_ = that_.attr('data-f');
        $('.p_front_tot_act_'+f_).html(numberFormat(q_ * p_, 2));
        var p_sc = parseFloat(replaceAll($('td.p_front_tot_act_p_sc_'+f_).html(), ',', ''));
        $('.p_front_tot_act_t_sc_'+f_).html(numberFormat(q_ * p_sc, 2));
        var total = 0;
        _.each(tr_.find('.p_front_tot_act_'), function (d) {
            total += parseFloat(replaceAll($(d).html(), ',', ''));
        });
        tr_.find('.p_front_tot_act_tot').html(numberFormat(total, 2));
        var total_sc = 0;
        _.each($('.p_front_tot_act_sc_'), function (sc) {
            total_sc += parseFloat(replaceAll($(sc).html(), ',', ''));
        });
        $('.p_front_tot_act_tot_sc').html(numberFormat(total_sc, 2));
        e.preventDefault();
    });

    if (_.isFunction(callback)) {
        callback();
    }
}

function activeChkAPU(class_) {
    $(class_).click(function () {
        var chk = $(this).prop('checked');
        var tr_ = $(this).closest('tr');
        tr_.removeClass('info');
        if (chk) {
            tr_.addClass('info');
        }
        calculateTotalsSubCApu();
    });
}

function calculateTotalsSubCApu() {
    var total = 0;
    _.each($('#p_inc_apu_table').find('tr.info'), function (tr) {
        total += parseFloat(replaceAll($(tr).find('td.p_inc_apu_inp_tot').html(), ',', ''));
    });
    $('.p_apu_sub_c_total').html(numberFormat(total, 2));
}