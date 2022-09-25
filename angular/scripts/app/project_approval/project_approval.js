/**
 * Created by Admin on 22/08/2017.
 */
(function () {
    'use strict';
    angular.module('sys.app.project_approval')
        .config(Config)
        .controller('ProjectApprovalCtrl', ProjectApprovalCtrl);

    Config.$inject = ['$stateProvider', '$urlRouterProvider'];
    ProjectApprovalCtrl.$inject = ['$scope', '_', 'RESTService', 'AlertFactory'];

    function ProjectApprovalCtrl($scope, _, RESTService, AlertFactory) {
        moment.locale('es');

        var start = moment().startOf('month');
        var end = moment().endOf('month');

        var chk_date_range = $('.chk_date_range');
        chk_date_range.click(function () {
            $('#LoadRecordsButtonPA').click();
        });

        generateCheckBox('.i-checks');

        var call_m = false;
        var modalP;
        var modalSP;
        var modalAnalysisIncome;
        var titleP;
        var reqDates = $('#reqDates');
        var approval_states;

        var showDate = function (from, to) {
            start = from;
            end = to;
            reqDates.find('span').html(from.format('MMM D, YYYY') + ' - ' + to.format('MMM D, YYYY'));
            if (chk_date_range.prop('checked')) {
                $('#LoadRecordsButtonPA').click();
            }
        };
        generateDateRangePicker(reqDates, start, end, showDate);
        showDate(start, end);

        var p_frm_tab_general;
        var p_id = 0;
        var p_code;
        var p_cost_load;
        var p_state;
        var p_description;
        var p_client_code;
        var p_client_description;
        var p_gg_direct;
        var p_gg_indirect;
        var p_transport;
        var p_utils;
        var p_date_start;
        var p_date_end;
        var p_days;
        var p_total;
        var p_is_approval = true;

        var t_body_list_sub_projects;
        var p_sp_id = 0;
        var p_title_modal_sp;
        var p_sp_description;
        var t_body_list_fronts;
        var t_body_list_levels;

        var p_inc_sub_projects;
        var p_table_structure_level;
        var t_body_income_levels;
        var p_inc_list_activity;
        var info_income_1;
        var info_income_2;
        var p_income_list_materials;
        var p_income_total_materials;
        var p_inc_q_lb_activity;
        var p_inc_u_lb_activity;
        var p_inc_p_lb_activity;
        var p_inc_t_lb_activity;
        var p_inc_q_pv_activity;
        var p_inc_u_pv_activity;
        var p_inc_p_pv_activity;
        var p_inc_t_pv_activity;

        // APU Income
        var p_inc_level_apu;
        var p_inc_code_apu;
        var p_inc_description_apu;
        var p_inc_matrix_apu;
        var p_inc_hours_apu;
        var p_inc_mo_apu;
        var p_inc_eq_apu;
        var p_inc_total_apu;
        var p_inc_und_apu;
        var p_inc_apu_q_mo;
        var p_inc_apu_t_mo;
        var p_inc_apu_t_body_mo;
        var p_inc_apu_t_mat;
        var p_inc_apu_t_body_mat;
        var p_inc_apu_q_eq;
        var p_inc_apu_t_eq;
        var p_inc_apu_t_body_eq;
        var p_inc_apu_t_sc;
        var p_inc_apu_t_body_sc;
        var p_inc_apu_table;
        var p_inc_activity_id = 0;

        function cleanProject() {
            p_frm_tab_general.find('input, textarea').val('');
            activeTab('home');
            p_id = 0;

            t_body_list_sub_projects.empty();
            p_inc_sub_projects.val('').trigger('change');
            p_inc_sub_projects.find('option:gt(0)').remove();
            verifyReadonlyProjects();
        }

        function verifyReadonlyProjects() {
            p_frm_tab_general.find('input, textarea, select').prop('disabled', p_is_approval);
            $('.p_inc_frm_apu .form-control').prop('disabled', p_is_approval);
            $('.inp_show_approval').prop('disabled', p_is_approval);
            var show_not_approval = $('.show_not_approval');
            show_not_approval.removeClass('hide');
            if (p_is_approval) {
                show_not_approval.addClass('hide');
            }
        }

        function cleanSubProject() {
            t_body_list_fronts.empty();
            t_body_list_levels.empty();
            activeTab('levels');
        }

        function cleanIncome() {
            p_table_structure_level.addClass('hide');
            t_body_income_levels.empty();
            cleanIncomeInside();
        }
        function cleanIncomeInside() {
            info_income_1.addClass('hide');
            info_income_2.addClass('hide');
            p_inc_list_activity.empty();
            p_income_list_materials.empty();
            p_income_total_materials.empty();
            $('.p_inc_table_activity .form-control').val('');
            $('#p_inc_show_totals_apu').find('tr').empty();
            p_inc_u_lb_activity.empty();
            p_inc_u_pv_activity.empty();
            p_inc_activity_id = 0;
        }

        function cleanAnalysisIncome() {
            p_inc_level_apu.empty();
            p_inc_code_apu.empty();
            p_inc_matrix_apu.empty();
            p_inc_description_apu.empty();
            p_inc_und_apu.empty();
            $('.p_inc_frm_apu .form-control').val('');
            p_inc_total_apu.val('0.00');
            p_inc_apu_t_body_mo.empty();
            p_inc_apu_t_body_mat.empty();
            p_inc_apu_t_body_eq.empty();
            p_inc_apu_t_body_sc.empty();
            $('.p_inc_apu_tot').html('0.00');
        }

        function getDataProjectApproval() {
            approval_states = $('#approval_states');
            approval_states.empty().change(function () {
                $('#LoadRecordsButtonPA').click();
            });
            RESTService.all('project_approval/getDataProject', '', function(response) {
                if (!_.isUndefined(response.status) && response.status) {
                    _.each(response.states, function (item) {
                        approval_states.append('<option value="' + item.Value + '">' + item.DisplayText + '</option>');
                    });
                    generateSearchProjectApproval();
                } else {
                    getDataProjectApproval();
                }
            }, function () {
                getDataProjectApproval();
            });
        }

        function overModals() {
            if (!call_m) {
                p_frm_tab_general = $('#frm_tab_general');

                p_code = $('#p_code');
                p_cost_load = $('#p_cost_load');
                p_state = $('#p_state');
                p_description = $('#p_description');
                p_client_code = $('#p_client_code');
                p_client_description = $('#p_client_description');
                p_gg_direct = $('#p_gg_direct');
                p_gg_indirect = $('#p_gg_indirect');
                p_transport = $('#p_transport');
                p_utils = $('#p_utils');
                p_date_start = $('#p_date_start');
                p_date_end = $('#p_date_end');
                p_days = $('#p_days');
                p_total = $('#p_total');

                t_body_list_sub_projects = $('#t_body_list_sub_projects');
                p_title_modal_sp = $('#p_title_modal_sp');
                p_sp_description = $('#p_sp_description');
                t_body_list_fronts = $('#t_body_list_fronts');
                t_body_list_levels = $('#t_body_list_levels');

                p_table_structure_level = $('#p_table_structure_level');
                p_inc_sub_projects = $('#p_inc_sub_projects');
                p_inc_sub_projects.change(function () {
                    var val_ = $(this).val();
                    cleanIncome();
                    if (val_ !== '') {
                        structureIncomeSP(val_);
                    }
                });
                t_body_income_levels = $('#t_body_income_levels');
                p_inc_list_activity = $('#p_inc_list_activity');
                info_income_1 = $('.info_income_1');
                info_income_2 = $('.info_income_2');
                p_income_list_materials = $('#p_income_list_materials');
                p_income_total_materials = $('#p_income_total_materials');
                p_inc_q_lb_activity = $('#p_inc_q_lb_activity');
                p_inc_u_lb_activity = $('#p_inc_u_lb_activity');
                p_inc_p_lb_activity = $('#p_inc_p_lb_activity');
                p_inc_t_lb_activity = $('#p_inc_t_lb_activity');
                p_inc_q_pv_activity = $('#p_inc_q_pv_activity');
                p_inc_u_pv_activity = $('#p_inc_u_pv_activity');
                p_inc_p_pv_activity = $('#p_inc_p_pv_activity');
                p_inc_t_pv_activity = $('#p_inc_t_pv_activity');

                p_inc_code_apu = $('#p_inc_code_apu');
                p_inc_level_apu = $('#p_inc_level_apu');
                p_inc_matrix_apu = $('#p_inc_matrix_apu');
                p_inc_description_apu = $('#p_inc_description_apu');
                p_inc_hours_apu = $('#p_inc_hours_apu');
                p_inc_mo_apu = $('#p_inc_mo_apu');
                p_inc_eq_apu = $('#p_inc_eq_apu');
                p_inc_total_apu = $('#p_inc_total_apu');
                p_inc_und_apu = $('.p_inc_und_apu');
                p_inc_apu_q_mo = $('#p_inc_apu_q_mo');
                p_inc_apu_t_mo = $('#p_inc_apu_t_mo');
                p_inc_apu_t_body_mo = $('#p_inc_apu_t_body_mo');
                p_inc_apu_t_mat = $('#p_inc_apu_t_mat');
                p_inc_apu_t_body_mat = $('#p_inc_apu_t_body_mat');
                p_inc_apu_q_eq = $('#p_inc_apu_q_eq');
                p_inc_apu_t_eq = $('#p_inc_apu_t_eq');
                p_inc_apu_t_body_eq = $('#p_inc_apu_t_body_eq');
                p_inc_apu_t_sc = $('#p_inc_apu_t_sc');
                p_inc_apu_t_body_sc = $('#p_inc_apu_t_body_sc');
                p_inc_apu_table = $('#p_inc_apu_table');

                modalP = $('#modalP');
                modalSP = $('#modalSP');
                modalAnalysisIncome = $('#modalAnalysisIncome');
                titleP = $('#titleP');

                modalP.on('hidden.bs.modal', function (e) {
                    cleanProject();
                });
                modalSP.on('show.bs.modal', function (e) {
                    modalP.attr('style', 'display:block; z-index:2030 !important');
                });
                modalSP.on('hidden.bs.modal', function (e) {
                    cleanSubProject();
                    modalP.attr('style', 'display:block; overflow-y: auto;');
                });
                modalAnalysisIncome.on('hidden.bs.modal', function (e) {
                    cleanAnalysisIncome();
                    modalP.attr('style', 'display:block; overflow-y: auto;');
                });
                modalAnalysisIncome.on('show.bs.modal', function (e) {
                    modalP.attr('style', 'display:block; z-index:2030 !important');
                });

                call_m = true;
            }
        }

        $scope.approveProject = function () {
            AlertFactory.confirm({
                title: '',
                message: '¿Está seguro que desea aprobar el proyecto?',
                confirm: 'Si',
                cancel: 'No'
            }, function() {
                RESTService.updated('project_approval/approval', p_id, {}, function (response) {
                    if (!_.isUndefined(response.status) && response.status) {
                        modalP.modal('hide');
                        $('#LoadRecordsButtonPA').click();
                        $scope.showAlert('', 'Le proyecto se aprobó correctamente', 'success');
                    } else {
                        $scope.showAlert('', response.message, 'warning');
                    }
                });
            });
        };

        $scope.rejectProject = function () {
            AlertFactory.confirm({
                title: '',
                message: '¿Está seguro que desea rechazar el proyecto?',
                confirm: 'Si',
                cancel: 'No'
            }, function() {
                RESTService.updated('project_approval/reject', p_id, {}, function (response) {
                    if (!_.isUndefined(response.status) && response.status) {
                        modalP.modal('hide');
                        $('#LoadRecordsButtonPA').click();
                        $scope.showAlert('', 'Le proyecto se rechazó correctamente', 'success');
                    } else {
                        $scope.showAlert('', response.message, 'warning');
                    }
                });
            });
        };

        function findProject(project_id) {
            overModals();
            RESTService.get('project_approval/find', project_id, function (response) {
                if (!_.isUndefined(response.status) && response.status) {
                    var data = response.data;
                    p_id = data.id;
                    verifyReadonlyProjects();
                    p_code.val(data.code);
                    p_cost_load.val(data.cost_load);
                    p_state.val(data.state);
                    p_description.val(data.description);
                    p_client_code.val(data.client_document);
                    p_client_description.val(data.client_description);
                    p_gg_direct.val(data.gg_direct);
                    $('.p_inc_percentage').html(parseFloat(data.gg_direct));
                    p_gg_indirect.val(data.gg_indirect_);
                    p_transport.val(data.transport);
                    p_utils.val(data.utils);
                    p_date_start.val(data.date_start);
                    p_date_end.val(data.date_end);
                    p_days.val(data.days);
                    p_total.val(data.total);
                    titleP.html(data.description + ' - ' + data.state);
                    setSubProjects(data.sp);
                    modalP.modal('show');
                } else {
                    $scope.showAlert('', 'Hubo un error al obtener el proyecto. Intente nuevamente.', 'error');
                }
            });
        }

        var search = getFormSearch('frm-search-pa', 'search_pa', 'LoadRecordsButtonPA');

        var states = '<select id="approval_states" class="search_input"></select>';

        var table_container_pa = $('#table_container_pa');

        table_container_pa.jtable({
            title: "Lista de Proyectos por Aprobar",
            paging: true,
            sorting: true,
            actions: {
                listAction: base_url + '/project_approval/list'
            },
            toolbar: {
                items: [{
                    cssClass: 'buscador',
                    text: states
                }, {
                    cssClass: 'buscador',
                    text: search
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
                    listClass: 'text-center',
                    width: '2%'
                },
                description: {
                    title: 'Descripción'
                },
                sub_state: {
                    title: 'Estado',
                    sorting: false,
                    width: '3%',
                    list: show_list_
                },
                client_desc: {
                    title: 'Cliente',
                    sorting: false,
                    width: '7%',
                    list: show_list_
                },
                total: {
                    title: 'Total',
                    listClass: 'text-right',
                    width: '2%'
                },
                created_date: {
                    title: 'F.Registro',
                    listClass: 'text-center',
                    sorting: false,
                    width: '1%'
                },
                view: {
                    width: '1%',
                    listClass: 'text-center',
                    sorting: false,
                    edit: false,
                    create: false,
                    display: function (data) {
                        return '<a href="javascript:void(0)" title="Ver Proyecto" class="view_ap" data-code="' +
                            data.record.id + '"><i class="fa fa-edit fa-1-5x"></i></a>';
                    }
                }
            },
            recordsLoaded: function (event, data) {
                $('.view_ap').click(function (e) {
                    var id = $(this).attr('data-code');
                    findProject(id);
                    e.preventDefault();
                });
            }
        });
        getDataProjectApproval();

        function generateSearchProjectApproval() {
            generateSearchForm('frm-search-pa', 'LoadRecordsButtonPA', function () {
                table_container_pa.jtable('load', {
                    search: $('#search_pa').val(),
                    check: (chk_date_range.prop('checked')),
                    from: start.format('YYYY-MM-DD'),
                    to: end.format('YYYY-MM-DD'),
                    sub_state: approval_states.val()
                });
            }, true);
        }

        function addLevelToSP(level_idx, level_id, level_code, level_name, level_matrix, level_type) {
            var padding = 0;
            if (level_idx !== 0) {
                var l = t_body_list_levels.find('tr[data-level="'+level_idx+'"]').attr('data-padding');
                padding = parseInt(l) + 20;
            }
            var tr_ = $('<tr data-level="'+level_code+'" data-padding="'+padding+'" data-parent="'+level_idx+
                '" data-type="'+level_type+'"></tr>');
            var span_ = $('<div style="padding-left: '+padding+'px"><b><span>'+level_code+'</span></b> ' +
                '<b><span class="fa-red">'+level_matrix+'</span></b> <span>'+level_name+'</span></div>');
            var td_1 = $('<td></td>');
            td_1.append(span_);
            tr_.append(td_1);

            var parent_ = (level_idx === 0) ?
                level_idx : t_body_list_levels.find('tr[data-level="'+level_idx+'"]').attr('data-parent');
            var found_ = false;
            var parents_ = t_body_list_levels.find('tr[data-parent="'+parent_+'"]');
            $.each(parents_, function (idx, item) {
                if (found_) {
                    tr_.insertBefore($(item));
                    return false;
                }
                if ($(item).attr('data-level') === level_idx) {
                    found_ = true;
                    if (_.isUndefined(parents_[idx+1])) {
                        projectInsertBeforeTr(tr_, $(item), t_body_list_levels);
                        return false;
                    }
                }
            });
            if (!found_) {
                t_body_list_levels.append(tr_);
            }
        }

        function setSubProjects(data) {
            t_body_list_sub_projects.empty();
            p_inc_sub_projects.val('').trigger('change');
            p_inc_sub_projects.find('option:gt(0)').remove();
            _.each(data, function (item) {
                var tr_ = $('<tr data-id="'+item.id+'"></tr>');
                var td_1_ = $('<td>'+item.description+'</td>');
                var a_1_ = $('<a data-target="#" title="Ver" class="edit_sp_"><i class="fa fa-edit fa-1-5x"></i></a>');
                var td_2_ = $('<td class="text-center"></td>');
                td_2_.append(a_1_);
                tr_.append(td_1_).append(td_2_);
                t_body_list_sub_projects.append(tr_);

                p_inc_sub_projects.append('<option value="'+item.id+'">'+item.description+'</option>');
            });

            $('.edit_sp_').click(function (e) {
                var tr_ = $(this).closest('tr');
                var tr_id = tr_.attr('data-id');
                RESTService.get('project_approval/getSubProject', tr_id, function (response) {
                    if (!_.isUndefined(response.status) && response.status) {
                        var data_sp = response.data;
                        p_sp_id = data_sp.id;
                        p_sp_description.val(data_sp.description);
                        p_title_modal_sp.html('Ver - '+data_sp.description);
                        _.each(data_sp.fronts, function (item) {
                            setFrontSubProject(item);
                        });
                        _.each(data_sp.levels, function (item) {
                            addLevelToSP(item.parent, item.id, item.code, item.description, item.matrix, item.type);
                        });
                        modalSP.modal('show');
                    } else {
                        $scope.showAlert('', 'Hubo un error al obtener el subproyecto. Intente nuevamente.', 'error');
                    }
                });
                e.preventDefault();
            });
        }

        function setFrontSubProject(data) {
            var tr_ = $('<tr></tr>');
            var td_1_ = $('<td class="text-center">'+data.code+'</td>');
            var td_2_ = $('<td>'+data.description+'</td>');
            var entity_ = '';
            if (!_.isNull(data.entity)) {
                entity_ = (_.isNull(data.entity.NombreEntidad)) ? data.entity.RazonSocial : data.entity.NombreEntidad;
            }
            var td_3_ = $('<td>'+entity_+'</td>');
            tr_.append(td_1_).append(td_2_).append(td_3_);
            t_body_list_fronts.append(tr_);
        }

        function structureIncomeSP(sub_project_id) {
            p_table_structure_level.removeClass('hide');
            t_body_income_levels.empty();
            RESTService.get('project_approval/getLevelsSubProject', sub_project_id, function (response) {
                if (!_.isUndefined(response.status) && response.status) {
                    createTreeSelect(response.data, 't_body_income_levels', 'incLevels', 'levelsInc', 'inc_level_radio', 'chk_level_inc', function() {
                        t_body_income_levels.find('input[name=chk_level_inc]').click(function () {
                            var val_name_ = $(this).val();
                            var type_inp_ = parseInt($(this).attr('data-type'));
                            subStructureIncomeSP(sub_project_id, val_name_, type_inp_);
                        });
                    });
                } else {
                    $scope.showAlert('', 'Hubo un error al obtener los niveles. Intente nuevamente.', 'error');
                }
            });
        }
        function subStructureIncomeSP(sub_project_id, level_id, type) {
            var params = 'sub_project_id='+sub_project_id+'&level_id='+level_id+'&type='+type;
            cleanIncomeInside();
            RESTService.all('project_approval/getActivityMaterialSubProject', params, function (response) {
                if (!_.isUndefined(response.status) && response.status) {
                    if (type === 1) {
                        generateListMaterialsIncome(response.data);
                    } else {
                        generateListSubLevelsIncome(response.data);
                    }
                } else {
                    $scope.showAlert('', response.message, 'error');
                }
            });
        }

        function generateListMaterialsIncome(data) {
            info_income_1.removeClass('hide');
            var total_ = 0;
            _.each(data, function (item) {
                var tr_ = $('<tr data-id="'+item.id+'"></tr>');
                var td_1 = $('<td class="text-center">'+item.code+'</td>');
                var td_2 = $('<td class="text-center">'+item.level+'</td>');
                var td_3 = $('<td>'+item.text+'</td>');
                var td_4 = $('<td class="text-center">'+item.und+'</td>');
                var td_5 = $('<td class="text-right">'+item.lb.price+'</td>');
                var td_6 = $('<td class="text-right">'+item.lb.quantity+'</td>');
                var td_7 = $('<td class="text-right">'+item.lb.total+'</td>');
                total_ = (item.lb.total !== '') ? parseFloat(item.lb.total) + total_ : total_;
                tr_.append(td_1).append(td_2).append(td_3).append(td_4).append(td_5).append(td_6).append(td_7);
                p_income_list_materials.append(tr_);
            });
            verifyReadonlyProjects();
            p_income_total_materials.html((total_).toFixed(2));
        }

        function generateListSubLevelsIncome(data) {
            _.each(data, function (item) {
                var span_ = $('<span></span>');
                var a_ = $('<a data-target="#" data-id="'+item.id+'" data-type="'+item.type+'" ' +
                    'class="list-group-item show_act_mat_inc_"></a>');
                var span_3_ = $('<span>'+item.code+' '+item.level+' '+item.text+'</span>');
                a_.append(span_3_);
                span_.append(a_);
                p_inc_list_activity.append(span_);
            });
            $('.show_act_mat_inc_').click(function (e) {
                $('.show_act_mat_inc_').removeClass('active');
                $(this).addClass('active');
                var code_ = $(this).attr('data-id');
                var type_ = $(this).attr('data-type');
                if (parseInt(type_) === 2) {
                    getIncomeActivityMaterial(code_);
                }
                e.preventDefault();
            });
        }
        function getIncomeActivityMaterial(id) {
            p_inc_activity_id = id;
            info_income_2.removeClass('hide');
            p_inc_u_lb_activity.empty();
            RESTService.get('project_approval/getInfoActivity', id, function (response) {
                if (!_.isUndefined(response.status) && response.status) {
                    var data_ = response.data;
                    p_inc_u_lb_activity.append('<option value="' + data_.um + '">' + data_.um_text + '</option>');
                    p_inc_u_lb_activity.val(data_.um);
                    p_inc_q_lb_activity.val(data_.lb.quantity);
                    p_inc_p_lb_activity.val(roundValue(data_.lb.price, 2));
                    p_inc_t_lb_activity.val(roundValue(data_.lb.total, 2));
                    $('#p_inc_p_rend').html(roundValue(data_.apu.rend, 2));
                    $('#p_inc_p_hh').html(roundValue(data_.apu.hh, 2));
                    $('#p_inc_p_hm').html(roundValue(data_.apu.hm, 2));
                    $('#p_inc_p_mo').html(roundValue(data_.apu.mo, 2));
                    $('#p_inc_p_mat').html(roundValue(data_.apu.mat, 2));
                    $('#p_inc_p_eq').html(roundValue(data_.apu.eq, 2));
                    $('#p_inc_p_sc').html(roundValue(data_.apu.sc, 2));
                } else {
                    $scope.showAlert('', response.message, 'error');
                }
            });
        }

        $scope.showAnalysisIncome = function () {
            if (p_inc_activity_id !== 0) {
                RESTService.get('project_approval/getActivity', p_inc_activity_id, function (response) {
                    if (!_.isUndefined(response.status) && response.status) {
                        var data_ = response.data;
                        p_inc_level_apu.html(data_.level);
                        p_inc_code_apu.html(data_.code);
                        p_inc_matrix_apu.html(data_.matrix);
                        p_inc_description_apu.html(data_.description);
                        p_inc_und_apu.html(data_.um);
                        p_inc_hours_apu.val(data_.hours);
                        p_inc_mo_apu.val(data_.mo);
                        p_inc_eq_apu.val(data_.eq);
                        editAnalysisPriceUnitary(data_.detail);
                        modalAnalysisIncome.modal('show');
                    } else {
                        $scope.showAlert('', response.message, 'error');
                    }
                });
            }
        };
        function addIncomeAPU(data, callback) {
            var type_ = parseInt(data.type);
            var tr_ = $('<tr id="p_inc_apu_tr_'+data.matrix+'_'+data.type+'" ' +
                'data-code="'+data.matrix+'" data-type="'+type_+'"></tr>');
            var td_0 = $('<td class="text-center"></td>');
            var td_1 = $('<td class="text-center">'+data.matrix+'</td>');
            var td_2 = $('<td>'+data.description+'</td>');
            var td_3 = $('<td class="text-center">'+data.um+'</td>');
            var td_4, td_5;
            if (type_ === 2 || type_ === 4) {
                td_4 = $('<td></td>');
                td_5 = $('<td><input type="text" class="text-right p_inc_apu_inp_ p_inc_apu_inp_q inp_show_approval" ' +
                    'value="'+data.quantity+'" style="width:75px;" /></td>');
            } else {
                td_4 = $('<td><input type="text" class="text-right p_inc_apu_inp_ p_inc_apu_inp_q inp_show_approval" ' +
                    'value="'+data.quantity+'" style="width:75px;" /></td>');
                td_5 = $('<td class="text-right p_inc_apu_inp_qu">'+data.q_unity+'</td>');
            }
            var td_6 = $('<td><input type="text" class="text-right p_inc_apu_inp_ p_inc_apu_inp_p inp_show_approval" ' +
                'value="'+data.price+'" style="width:75px;" /></td>');
            var td_7 = $('<td class="text-right p_inc_apu_inp_tot">'+data.partial+'</td>');
            tr_.append(td_0).append(td_1).append(td_2).append(td_3).append(td_4).append(td_5).append(td_6).append(td_7);
            if (type_ === 1) {
                p_inc_apu_t_body_mo.append(tr_);
            } else if (type_ === 2) {
                p_inc_apu_t_body_mat.append(tr_);
            } else if (type_ === 3) {
                p_inc_apu_t_body_eq.append(tr_);
            } else if (type_ === 4) {
                p_inc_apu_t_body_sc.append(tr_);
            }
            verifyReadonlyProjects();
            if (typeof callback === 'function') {
                callback(true);
            }
        }

        function calculateTotalTypeIncomeAPU(type, calculateTotal) {
            var total_qu = 0, total_p = 0;
            _.each(p_inc_apu_table.find('tr[data-type='+type+']'), function (item) {
                total_qu += ($(item).find('.p_inc_apu_inp_qu').length > 0) ?
                    parseFloat($(item).find('.p_inc_apu_inp_qu').html()) : 0;
                total_p += parseFloat($(item).find('.p_inc_apu_inp_tot').html());
            });
            if (type === 1) {
                p_inc_apu_q_mo.html(total_qu.toFixed(2));
                p_inc_apu_t_mo.html(total_p.toFixed(2));
                $('.p_inc_apu_total_mo').html(total_p.toFixed(2));
                var p_ = $('.p_inc_percentage').first().html();
                var partial_per = parseFloat(p_)*total_p/100;
                $('.p_inc_apu_total_per').html((roundMath(partial_per)).toFixed(2));
                if (calculateTotal) {
                    calculateTotalTypeIncomeAPU(2, false);
                    calculateTotalTypeIncomeAPU(3, false);
                }
            } else if (type === 2) {
                p_inc_apu_t_mat.html(total_p.toFixed(2));
            } else if (type === 3) {
                p_inc_apu_q_eq.html(total_qu.toFixed(2));
                p_inc_apu_t_eq.html(total_p.toFixed(2));
            } else if (type === 4) {
                p_inc_apu_t_sc.html(total_p.toFixed(2));
            }
            calculateTotalFinalIncomeAPU();
        }
        function calculateTotalFinalIncomeAPU() {
            var tot_1 = parseFloat(p_inc_apu_t_mo.html());
            var tot_2 = parseFloat(p_inc_apu_t_mat.html());
            var tot_3 = parseFloat(p_inc_apu_t_eq.html());
            var tot_4 = parseFloat(p_inc_apu_t_sc.html());
            p_inc_total_apu.val((tot_1+tot_2+tot_3+tot_4).toFixed(2));
        }
        function editAnalysisPriceUnitary(data) {
            _.each(data, function (item) {
                addIncomeAPU(item, '');
            });
            calculateTotalTypeIncomeAPU(1, true);
            calculateTotalFinalIncomeAPU();
        }
    }

    function Config($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('project_approval', {
                url: '/project_approval',
                templateUrl: base_url + '/templates/project_approval/base.html',
                controller: 'ProjectApprovalCtrl'
            });

        $urlRouterProvider.otherwise('/');
    }
})
();