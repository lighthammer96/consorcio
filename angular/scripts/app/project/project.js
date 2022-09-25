/**
 * Created by JAIR on 4/20/2017.
 */
(function () {
    'use strict';
    angular.module('sys.app.projects')
        .config(Config)
        .controller('ProjectCtrl', ProjectCtrl);

    Config.$inject = ['$stateProvider', '$urlRouterProvider'];
    ProjectCtrl.$inject = ['$scope', '_', 'RESTService', 'AlertFactory'];

    function ProjectCtrl($scope, _, RESTService, AlertFactory) {
        moment.locale('es');

        var start = moment().startOf('month');
        var end = moment().endOf('month');

        var chk_date_range = $('.chk_date_range');
        chk_date_range.click(function () {
            $('#LoadRecordsButtonP').click();
        });

        generateCheckBox('.chk_date_range_div');

        var matrix = [];
        var matrix_apu = [];
        var is_over_ = false;
        var modalP;
        var modalSP;
        var modalClientProject;
        var modalLevel;
        var modalStructureLevel;
        var modalAnalysisIncome;
        var modalStructureIncome;
        var titleP;
        var reqDates = $('#reqDates');
        var project_states;
        var project_unities = [];

        var showDate = function (from, to) {
            start = from;
            end = to;
            reqDates.find('span').html(from.format('MMM D, YYYY') + ' - ' + to.format('MMM D, YYYY'));
            if (chk_date_range.prop('checked')) {
                $('#LoadRecordsButtonP').click();
            }
        };
        generateDateRangePicker(reqDates, start, end, showDate);
        showDate(start, end);

        var btn_return;

        var p_frm_tab_general;
        var p_id = 0;
        var p_code;
        var p_cost_load;
        var p_state;
        var p_description;
        var p_client_id;
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
        var p_sub_state = 0;
        var p_is_approval = false;

        var t_body_list_sub_projects;
        var p_sp_id = 0;
        var p_title_modal_sp;
        var p_sp_description;
        var p_search_front;
        var t_body_list_fronts;
        var p_title_modal_level;
        var p_sp_id_level;
        var p_sp_prev_level;
        var p_sp_code_level;
        var p_sp_name_level;
        var p_sp_idx_level = 0;
        var t_body_list_levels;
        var p_search_matrix_level;

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
        var p_search_matrix_income;

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

        function cleanProject() {
            cleanRequired();
            titleP.empty();
            btn_return.prop('disabled', false);
            p_id = 0;
            p_frm_tab_general.find('input, textarea').val('');
            p_cost_load.val(1);
            p_sub_state = 0;
            p_state.val('Registrado');
            activeTab('home');

            $('.tab_4, .tab5').addClass('hide');

            t_body_list_sub_projects.empty();
            p_inc_sub_projects.val('').trigger('change');
            p_inc_sub_projects.find('option:gt(0)').remove();
            p_is_approval = false;
            verifyReadonlyProjects();

            $('.send_approval').addClass('hide');
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
            cleanBorderRequired();
            p_sp_id = 0;
            p_sp_description.val('');
            p_search_front.empty().trigger('change');
            $('.chk_sp').prop('checked', false).iCheck('update');
            t_body_list_fronts.empty();
            t_body_list_levels.empty();
            activeTab('levels');
        }

        function cleanLevel() {
            cleanBorderRequired();
            p_sp_idx_level = 0;
            p_sp_id_level.val('');
            p_sp_prev_level.val('');
            p_sp_code_level.val('');
            p_sp_name_level.val('');
        }

        function cleanStructureLevel() {
            p_sp_idx_level = 0;
            p_search_matrix_level.empty().trigger('change');
            $('#tvLevels').find('input[name=chk_level_sp]').filter(':checked').prop('checked', false).iCheck('update');
            closeTreed('tvLevels');
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
        function cleanStructureIncome() {
            p_search_matrix_income.empty().trigger('change');
            $('#tvLevelsIncome').find('input[name=chk_level_inc]').filter(':checked').prop('checked', false).iCheck('update');
            closeTreed('tvLevelsIncome');
        }

        $scope.addSubProjects = function () {
            if (p_id === 0) {
                $scope.showAlert('', 'Para agregar subproyectos debe guardar el proyecto', 'warning');
                return false;
            }
            p_title_modal_sp.html('Agregar Subproyecto');
            modalSP.modal('show');
        };

        function getDataProject() {
            project_states = $('#project_states');
            project_states.empty().change(function () {
                $('#LoadRecordsButtonP').click();
            });
            RESTService.all('projects/getDataProject', '', function(response) {
                if (!_.isUndefined(response.status) && response.status) {
                    matrix = response.levels;
                    matrix_apu = response.apu;
                    _.each(response.states, function (item) {
                        project_states.append('<option value="' + item.Value + '">' + item.DisplayText + '</option>');
                    });
                    project_unities = response.unity;
                    generateSearchProject();
                } else {
                    getDataProject();
                }
            }, function () {
                getDataProject();
            });
        }

        function overModals() {
            if (!is_over_) {
                p_frm_tab_general = $('#frm_tab_general');

                p_code = $('#p_code');
                p_cost_load = $('#p_cost_load');
                p_state = $('#p_state');
                p_state.val('Registrado');
                p_description = $('#p_description');
                p_client_id = $('#p_client_id');
                p_client_code = $('#p_client_code');
                p_client_description = $('#p_client_description');
                p_gg_direct = $('#p_gg_direct');
                p_gg_indirect = $('#p_gg_indirect');
                p_transport = $('#p_transport');
                p_utils = $('#p_utils');
                p_date_start = $('#p_date_start');
                generateDatePicker(p_date_start);
                p_date_end = $('#p_date_end');
                generateDatePicker(p_date_end);
                p_days = $('#p_days');
                p_total = $('#p_total');

                t_body_list_sub_projects = $('#t_body_list_sub_projects');
                p_title_modal_sp = $('#p_title_modal_sp');
                p_sp_description = $('#p_sp_description');
                p_search_front = $('#p_search_front');
                generateSelect2Ajax(p_search_front, 'Buscar frente...', base_url+'/projects/searchFront');
                t_body_list_fronts = $('#t_body_list_fronts');
                p_title_modal_level = $('#p_title_modal_level');
                p_sp_id_level = $('#p_sp_id_level');
                p_sp_prev_level = $('#p_sp_prev_level');
                p_sp_code_level = $('#p_sp_code_level');
                p_sp_name_level = $('#p_sp_name_level');
                t_body_list_levels = $('#t_body_list_levels');
                p_search_matrix_level = $('#p_search_matrix_level');
                generateSelect2Ajax(p_search_matrix_level, 'Buscar...', base_url+'/projects/searchMatrix');
                p_search_matrix_level.change(function () {
                    if ($(this).val() !== '') {
                        $('#tvLevels').find('input[name=chk_level_sp]').filter(':checked').prop('checked', false).iCheck('update');
                    }
                });
                p_search_matrix_income = $('#p_search_matrix_income');
                generateSelect2Ajax(p_search_matrix_income, 'Buscar...', base_url+'/projects/searchAPU');
                p_search_matrix_income.change(function () {
                    if ($(this).val() !== '') {
                        $('#tvLevelsIncome').find('input[name=chk_apu_inc]').filter(':checked').prop('checked', false).iCheck('update');
                    }
                });

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
                p_inc_q_lb_activity.keyup(function () {
                    calculateTotalIncomeLBMain();
                });
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
                p_inc_hours_apu.keyup(function () {
                    changeInpApuIncome()
                });
                p_inc_mo_apu = $('#p_inc_mo_apu');
                p_inc_mo_apu.keyup(function () {
                    changeInpApuIncome()
                });
                p_inc_eq_apu = $('#p_inc_eq_apu');
                p_inc_eq_apu.keyup(function () {
                    changeInpApuIncome()
                });
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

                $scope.showMat_(3);
                $scope.showMat__(3);

                modalP = $('#modalP');
                modalSP = $('#modalSP');
                modalClientProject = $('#modalClientProject');
                modalLevel = $('#modalLevel');
                modalStructureLevel = $('#modalStructureLevel');
                modalAnalysisIncome = $('#modalAnalysisIncome');
                modalStructureIncome = $('#modalStructureIncome');
                titleP = $('#titleP');
                btn_return = $('#btn_return');

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
                modalClientProject.on('hidden.bs.modal', function (e) {
                    $('#search_client_p').val('');
                    $('#LoadRecordsButtonClientP').click();
                    modalP.attr('style', 'display:block; overflow-y: auto;');
                });
                modalClientProject.on('show.bs.modal', function (e) {
                    $('#LoadRecordsButtonClientP').click();
                    modalP.attr('style', 'display:block; z-index:2030 !important');
                });
                modalLevel.on('hidden.bs.modal', function (e) {
                    cleanLevel();
                    modalSP.attr('style', 'display:block; overflow-y: auto;');
                });
                modalLevel.on('show.bs.modal', function (e) {
                    modalSP.attr('style', 'display:block; z-index:2030 !important');
                });
                modalLevel.on('shown.bs.modal', function (e) {
                    p_sp_code_level.focus();
                });
                modalStructureLevel.on('hidden.bs.modal', function (e) {
                    cleanStructureLevel();
                    modalSP.attr('style', 'display:block; overflow-y: auto;');
                });
                modalStructureLevel.on('show.bs.modal', function (e) {
                    modalSP.attr('style', 'display:block; z-index:2030 !important');
                });
                modalAnalysisIncome.on('hidden.bs.modal', function (e) {
                    cleanAnalysisIncome();
                    modalP.attr('style', 'display:block; overflow-y: auto;');
                });
                modalAnalysisIncome.on('show.bs.modal', function (e) {
                    modalP.attr('style', 'display:block; z-index:2030 !important');
                });
                modalStructureIncome.on('hidden.bs.modal', function (e) {
                    cleanStructureIncome();
                    modalAnalysisIncome.attr('style', 'display:block; overflow-y: auto;');
                });
                modalStructureIncome.on('show.bs.modal', function (e) {
                    modalAnalysisIncome.attr('style', 'display:block; z-index:2030 !important');
                });

                $('.i-checks').iCheck({
                    checkboxClass: 'icheckbox_square-green'
                }).on('ifClicked', function (event) {
                    $(event.target).click();
                    var code_mat;
                    if ($(event.target).hasClass('mat_')) {
                        code_mat = $(event.target).attr('data-code');
                        $scope.showMat_(code_mat);
                    } else if ($(event.target).hasClass('mat__')) {
                        code_mat = $(event.target).attr('data-code');
                        $scope.showMat__(code_mat);
                    }
                });

                $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
                    var tab = $(e.target).attr('data-target');
                    var send_approval = $('.send_approval');
                    send_approval.addClass('hide');
                    if (tab === '#income' && !p_is_approval) {
                        send_approval.removeClass('hide');
                    }
                });

                generateListMatrix('table_gg', matrix);

                callModalsProject();
            }
        }

        function newProject() {
            overModals();
            titleP.html('Registrar Proyecto');
            modalP.modal('show');
        }

        function validPercentageProject(that) {
            var val_ = $(that).val();
            if (val_ !== '' && parseFloat(val_) > 100) {
                $scope.showAlert('', 'El porcentage ingresado no debe ser mayor de 100', 'warning');
                $(that).focus();
                return false;
            }
            return true;
        }
        $scope.saveProject = function () {
            var b_val = true;
            b_val = b_val && p_description.required();
            b_val = b_val && p_gg_direct.required();
            b_val = b_val && validPercentageProject(p_gg_direct);
            b_val = b_val && validPercentageProject(p_gg_indirect);
            b_val = b_val && validPercentageProject(p_transport);
            b_val = b_val && validPercentageProject(p_utils);
            if (!b_val) {
                activeTab('tab1');
            }
            if (b_val && p_client_id.val() === '') {
                $scope.showAlert('', 'Para poder guardar el proyecto debe seleccionar el cliente', 'warning');
                activeTab('tab1');
                return false;
            }
            if (b_val) {
                var income_mat = [];
                _.each($('.p_tr_income_materials'), function (item) {
                    var id_ = $(item).attr('data-id');
                    income_mat.push({
                        'id': id_,
                        'price': $('#p_inc_lb_price'+id_).val(),
                        'quantity': $('#p_inc_lb_quantity'+id_).val()
                    });
                });
                var activity_ = [];
                if (p_inc_activity_id !== 0) {
                    activity_.push({
                        'code': p_inc_activity_id,
                        'lb_q': p_inc_q_lb_activity.val(),
                        'um': p_inc_u_lb_activity.val()
                    });
                }
                var params = {
                    'description': p_description.val(),
                    'client_id': p_client_id.val(),
                    'date_start': p_date_start.val(),
                    'date_end': p_date_end.val(),
                    'cost_load': p_cost_load.val(),
                    'gg_direct': p_gg_direct.val(),
                    'gg_indirect': p_gg_indirect.val(),
                    'transport': p_transport.val(),
                    'utils': p_utils.val(),
                    'days': p_days.val(),
                    'income_mat': income_mat,
                    'activity': activity_
                };
                RESTService.updated('projects/saveProject', p_id, params, function (response) {
                    if (!_.isUndefined(response.status) && response.status) {
                        $scope.showAlert('', 'El proyecto se guardó correctamente.', 'success');
                        var info_project = response.info;
                        p_id = info_project.id;
                        titleP.html(p_description.val()+' - '+info_project.state);
                        p_state.val(info_project.state);
                        p_code.val(info_project.code);
                        p_total.val(roundValue(info_project.total, 2));
                        $('.p_inc_percentage').html(parseFloat(info_project.gg));
                        $('#LoadRecordsButtonP').click();
                    } else {
                        $scope.showAlert('', response.message, 'error');
                    }
                });
            }
        };

        $scope.saveSubProject = function () {
            var b_val = true;
            b_val = b_val && p_sp_description.required();
            if (b_val) {
                var list_fronts_ = [];
                _.each($('.tr_front_sp_'), function (item) {
                    var code_ = $(item).attr('data-id');
                    list_fronts_.push(code_);
                });
                var list_level_id = [], list_level_parent = [], list_level_code = [], list_level_name = [],
                    list_level_matrix = [], list_level_types = [];
                _.each(t_body_list_levels.find('tr'), function (item) {
                    var level_code_ = $(item).attr('data-level');
                    list_level_id.push($('input[id="sp_level_id'+level_code_+'"]').val());
                    list_level_code.push(level_code_);
                    list_level_parent.push($(item).attr('data-parent'));
                    list_level_name.push($('input[id="sp_level_name'+level_code_+'"]').val());
                    list_level_matrix.push($('input[id="sp_level_matrix'+level_code_+'"]').val());
                    list_level_types.push(parseInt($(item).attr('data-type')));
                });
                var params = {
                    'project_id': p_id,
                    'description': p_sp_description.val(),
                    'fronts': list_fronts_,
                    'level_id': list_level_id,
                    'level_parent': list_level_parent,
                    'level_code': list_level_code,
                    'level_name': list_level_name,
                    'level_matrix': list_level_matrix,
                    'level_type': list_level_types
                };
                RESTService.updated('projects/saveSubProject', p_sp_id, params, function (response) {
                    if (!_.isUndefined(response.status) && response.status) {
                        $scope.showAlert('', 'El subproyecto se guardó correctamente.', 'success');
                        modalSP.modal('hide');
                        loadSubProjects(p_id);
                    } else {
                        $scope.showAlert('', 'Hubo un error al guardar el subproyecto. Intente nuevamente.', 'error');
                    }
                });
            }
        };

        $scope.openClientProject = function () {
            modalClientProject.modal('show');
        };

        $scope.cleanClientProject = function () {
            p_client_id.val('');
            p_client_code.val('');
            p_client_description.val('');
        };

        function findProject(project_id) {
            overModals();
            RESTService.get('projects/find', project_id, function (response) {
                if (!_.isUndefined(response.status) && response.status) {
                    var data = response.data;
                    p_id = data.id;
                    p_sub_state = parseInt(data.sub_state_id);
                    if (p_sub_state === 2) {
                        p_is_approval = true;
                        verifyReadonlyProjects();
                    }
                    p_code.val(data.code);
                    p_cost_load.val(data.cost_load);
                    p_state.val(data.state);
                    p_description.val(data.description);
                    p_client_id.val(data.client_id);
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

        var search = getFormSearch('frm-search-p', 'search_p', 'LoadRecordsButtonP');

        var states = '<select id="project_states" class="search_input"></select>';

        var table_container_p = $("#table_container_p");

        table_container_p.jtable({
            title: 'Lista de Proyectos',
            paging: true,
            sorting: true,
            actions: {
                listAction: base_url + '/projects/list',
                deleteAction: base_url + '/projects/delete'
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
                            search: $('#search_p').val(),
                            check: (chk_date_range.prop('checked')),
                            from: start.format('YYYY-MM-DD'),
                            to: end.format('YYYY-MM-DD'),
                            state: project_states.val()
                        };
                        $scope.openDoc('projects/excel', data_excel);
                    }
                }, {
                    cssClass: 'btn-success',
                    text: '<i class="fa fa-plus"></i> Nuevo Proyecto',
                    click: function () {
                        newProject();
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
                    title: 'Código',
                    listClass: 'text-center',
                    width: '2%'
                },
                description: {
                    title: 'Descripción'
                },
                state: {
                    title: 'Estado',
                    sorting: false,
                    width: '3%',
                    list: show_list_
                },
                sub_state: {
                    title: 'Progreso',
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
                edit: {
                    width: '1%',
                    listClass: 'text-center',
                    sorting: false,
                    edit: false,
                    create: false,
                    display: function (data) {
                        return '<a href="javascript:void(0)" title="Editar" class="edit_p" data-code="' +
                            data.record.id + '"><i class="fa fa-edit fa-1-5x fa-green"></i></a>';
                    }
                }
            },
            recordsLoaded: function (event, data) {
                $('.edit_p').click(function (e) {
                    var id = $(this).attr('data-code');
                    findProject(id);
                    e.preventDefault();
                });
            }
        });
        getDataProject();

        function generateSearchProject() {
            generateSearchForm('frm-search-p', 'LoadRecordsButtonP', function () {
                table_container_p.jtable('load', {
                    search: $('#search_p').val(),
                    check: (chk_date_range.prop('checked')),
                    from: start.format('YYYY-MM-DD'),
                    to: end.format('YYYY-MM-DD'),
                    state: project_states.val(),
                    sub_state: true
                });
            }, true);

            createTreeSelect(matrix, 'table_sp', 'tvLevels', 'showLevels', 'chk_radio', 'chk_level_sp', function() {
                $('#tvLevels').find('input[name=chk_level_sp]').click(function () {
                    p_search_matrix_level.empty().trigger('change');
                });
            });

            createTreeSelect(matrix_apu, 'table_level_income', 'tvLevelsIncome', 'showLIncome', 'chk_radio_inc', 'chk_apu_inc', function() {
                $('#tvLevelsIncome').find('input[name=chk_apu_inc]').click(function () {
                    p_search_matrix_income.empty().trigger('change');
                });
            });
        }

        function callModalsProject() {
            is_over_ = true;

            var search_client_p = getFormSearch('frm-search-client-p', 'search_client_p', 'LoadRecordsButtonClientP');

            var table_container_client_project = $("#table_container_client_project");

            table_container_client_project.jtable({
                title: "Lista de Clientes",
                paging: true,
                sorting: false,
                actions: {
                    listAction: base_url + '/projects/clientsList'
                },
                toolbar: {
                    items: [{
                        cssClass: 'buscador',
                        text: search_client_p
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
                        title: 'Cliente'
                    },
                    DireccionLegal: {
                        title: 'Dirección Legal',
                        list: show_list_
                    },
                    select: {
                        width: '1%',
                        sorting: false,
                        edit: false,
                        create: false,
                        listClass: 'text-center',
                        display: function (data) {
                            return '<a href="javascript:void(0)" title="Seleccionar" class="select_client_p" data-id="' +
                                data.record.id + '"><i class="fa fa-' + icon_select + ' fa-1-5x"></i></a>';
                        }
                    }
                },
                recordsLoaded: function (event, data) {
                    $('.select_client_p').click(function (e) {
                        var pr_id = $(this).attr('data-id');
                        var info = _.find(data.records, function(item) {
                            return item.id === pr_id;
                        });
                        if (info) {
                            p_client_id.val(info.id);
                            p_client_code.val(info.Documento);
                            p_client_description.val(info.NombreEntidad);
                        }
                        modalClientProject.modal('hide');
                        e.preventDefault();
                    });
                }
            });

            generateSearchForm('frm-search-client-p', 'LoadRecordsButtonClientP', function () {
                table_container_client_project.jtable('load', {
                    search: $('#search_client_p').val()
                });
            }, false);
        }

        $scope.showMat_ = function (id) {
            $('.mat_').prop('checked', false).iCheck('update');
            $('#mat_' + id).prop('checked', true).iCheck('update');
            $('.show_list_mat_').addClass('hide');
            $('.show_list_' + id).removeClass('hide');
            if (id == 1 || id == 2) {
                $('.show_1_').addClass('hide');
                $('.show_2_').removeClass('hide');
            } else {
                $('.show_1_').removeClass('hide');
                $('.show_2_').addClass('hide');
            }
        };

        $scope.showMat__ = function (id) {
            $('.mat__').prop('checked', false).iCheck('update');
            $('#mat__' + id).prop('checked', true).iCheck('update');
            $('.show_list_mat__').addClass('hide');
            $('.show_list__' + id).removeClass('hide');
            if (id == 1 || id == 2) {
                $('.show_1__').addClass('hide');
                $('.show_2__').removeClass('hide');
            } else {
                $('.show_1__').removeClass('hide');
                $('.show_2__').addClass('hide');
            }
        };

        $scope.showAnalysisPro = function () {
            var modalAnalysis = $('#modalAnalysisPro');
            modalAnalysis.on('hidden.bs.modal', function (e) {
                modalP.attr('style', 'display:block; overflow-y: auto;');
            });
            modalAnalysis.on('show.bs.modal', function (e) {
                modalP.attr('style', 'display:block; z-index:2030 !important');
            });
            modalAnalysis.modal('show');
        };

        $scope.showAnalysisFro = function () {
            var modalAnalysis = $('#modalAnalysisFro');
            modalAnalysis.on('hidden.bs.modal', function (e) {
                modalP.attr('style', 'display:block; overflow-y: auto;');
            });
            modalAnalysis.on('show.bs.modal', function (e) {
                modalP.attr('style', 'display:block; z-index:2030 !important');
            });
            modalAnalysis.modal('show');
        };

        $scope.addGG = function () {
            var modalGG = $('#modalGG');
            modalGG.on('hidden.bs.modal', function (e) {
                modalP.attr('style', 'display:block; overflow-y: auto;');
            });
            modalGG.on('show.bs.modal', function (e) {
                modalP.attr('style', 'display:block; z-index:2030 !important');
            });
            modalGG.modal('show');
        };

        $scope.addLevel = function () {
            p_title_modal_level.html('Agregar Nivel');
            p_sp_idx_level = 0;
            modalLevel.modal('show');
        };
        
        $scope.saveLevelSP = function () {
            var b_val = true;
            b_val = b_val && p_sp_code_level.required();
            b_val = b_val && p_sp_name_level.required();
            if (b_val) {
                var l_code = p_sp_code_level.val();
                l_code = l_code.trim();
                if (p_sp_prev_level.val() !== '') {
                    if (l_code !== p_sp_prev_level.val()) {
                        var tt_idx_ = t_body_list_levels.find('tr[data-level="'+l_code+'"]');
                        if (tt_idx_.length > 0) {
                            $scope.showAlert('', 'Ya existe un nivel con este código.', 'warning');
                            return false;
                        }
                    }
                    editLevelToSP(p_sp_prev_level.val(), l_code, p_sp_name_level.val());
                } else {
                    var tt_idx = t_body_list_levels.find('tr[data-level="'+l_code+'"]');
                if (tt_idx.length > 0 || l_code === '0') {
                        $scope.showAlert('', 'Ya se agregó un nivel con este código. Por favor ingrese otro codigo.', 'warning');
                        return false;
                    }
                    addLevelToSP(p_sp_idx_level, p_sp_id_level.val(), l_code, p_sp_name_level.val(), '', 0);
                }
                modalLevel.modal('hide');
            }
        };

        function editLevelToSP(level_prev, level_code, level_name) {
            t_body_list_levels.find('tr[data-level="'+level_prev+'"]').attr('data-level', level_code);
            $('input[id="sp_level_id'+level_prev+'"]').attr('id', 'sp_level_id'+level_code);
            $('input[id="sp_level_name'+level_prev+'"]').attr('id', 'sp_level_name'+level_code).val(level_name);
            $('span[id="sp_level_txt_code'+level_prev+'"]').attr('id', 'sp_level_txt_code'+level_code).html(level_code);
            $('span[id="sp_level_txt_matrix'+level_prev+'"]').attr('id', 'sp_level_txt_matrix'+level_code);
            $('span[id="sp_level_txt_name'+level_prev+'"]').attr('id', 'sp_level_txt_name'+level_code).html(level_name);
            t_body_list_levels.find('tr[data-parent="'+level_prev+'"]').attr('data-parent', level_code);
        }

        function addLevelToSP(level_idx, level_id, level_code, level_name, level_matrix, level_type) {
            var padding = 0;
            if (level_idx !== 0) {
                var l = t_body_list_levels.find('tr[data-level="'+level_idx+'"]').attr('data-padding');
                padding = parseInt(l) + 20;
            }
            var tr_ = $('<tr data-level="'+level_code+'" data-padding="'+padding+'" data-parent="'+level_idx+
                '" data-type="'+level_type+'"></tr>');
            var inp1_ = $('<input type="hidden" id="sp_level_id'+level_code+'" value="'+level_id+'" />');
            var inp2_ = $('<input type="hidden" id="sp_level_name'+level_code+'" value="'+level_name+'" />');
            var inp3_ = $('<input type="hidden" id="sp_level_matrix'+level_code+'" value="'+level_matrix+'" />');
            var span_ = $('<div style="padding-left: '+padding+'px"><b><span id="sp_level_txt_code'+level_code+'">'+
                level_code+'</span></b> <b><span class="fa-red" id="sp_level_txt_matrix'+level_code+
                '">'+level_matrix+'</span></b> <span id="sp_level_txt_name'+level_code+'">'+level_name+'</span></div>');
            var td_1 = $('<td></td>');
            td_1.append(span_).append(inp1_).append(inp2_).append(inp3_);
            var td_2 = $('<td width="75px"></td>');
            var btn_g = $('<div class="btn-group btn-group-xs"></div>');
            var btn_0 = $('<button class="btn btn-xs btn-purple sp-level-edit" title="Editar Nivel">' +
                '<span class="fa fa-edit"></span></button>');
            var btn_1 = $('<button class="btn btn-xs btn-success sp-level-add" title="Agregar SubNivel">' +
                '<span class="fa fa-plus"></span></button>');
            var btn_2_1 = $('<button class="btn btn-xs btn-primary sp-level-add-str" title="Anexar Estructura">' +
                '<span class="fa fa-link"></span></button>');
            var btn_2_2 = $('<button class="btn btn-xs btn-warning hide sp-level-remove-str" title="Remover Estructura">' +
                '<span class="fa fa-chain-broken"></span></button>');
            var btn_3 = $('<button class="btn btn-xs btn-danger sp-level-del" title="Eliminar Nivel">' +
                '<span class="fa fa-close"></span></button>');
            btn_g.append(btn_0);
            if (padding < 40) {
                btn_g.append(btn_1);
            }
            if (padding === 40) {
                btn_g.append(btn_2_1).append(btn_2_2);
            }
            btn_g.append(btn_3);
            td_2.append(btn_g);
            tr_.append(td_1);
            if (!p_is_approval) {
                tr_.append(td_2);
            }

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
            validateMatrixLevel(level_code);

            if (level_idx !== 0) {
                var p_ = t_body_list_levels.find('tr[data-level="'+level_idx+'"]');
                p_.find('.sp-level-add-str').addClass('hide');
            }

            $('.sp-level-edit').click(function (e) {
                p_title_modal_level.html('Editar Nivel');
                p_sp_idx_level = $(this).closest('tr').attr('data-level');
                p_sp_id_level.val($('input[id="sp_level_id'+p_sp_idx_level+'"]').val());
                p_sp_prev_level.val(p_sp_idx_level);
                p_sp_code_level.val(p_sp_idx_level);
                p_sp_name_level.val($('input[id="sp_level_name'+p_sp_idx_level+'"]').val());
                modalLevel.modal('show');
                e.preventDefault();
            });

            $('.sp-level-add').click(function (e) {
                p_title_modal_level.html('Agregar Nivel');
                p_sp_idx_level = $(this).closest('tr').attr('data-level');
                modalLevel.modal('show');
                e.preventDefault();
            });

            $('.sp-level-add-str').click(function (e) {
                p_sp_idx_level = $(this).closest('tr').attr('data-level');
                addStructureLevel();
                e.preventDefault();
            });

            $('.sp-level-remove-str').click(function (e) {
                p_sp_idx_level = $(this).closest('tr').attr('data-level');
                $scope.showConfirm('', '¿Está seguro que desea desasociar del nivel?', function(){
                    $('input[id="sp_level_matrix'+p_sp_idx_level+'"]').val('');
                    $('span[id="sp_level_txt_matrix'+p_sp_idx_level+'"]').html('');
                    t_body_list_levels.find('tr[data-level="'+p_sp_idx_level+'"]').attr('data-type', '0');
                    validateMatrixLevel(p_sp_idx_level);
                });
                e.preventDefault();
            });

            $('.sp-level-del').click(function (e) {
                var tr_ = $(this).closest('tr');
                $scope.showConfirm('', '¿Está seguro que desea eliminar el nivel?', function(){
                    var idx_ = tr_.attr('data-level');
                    var parent_ = tr_.attr('data-parent');
                    tr_.remove();
                    deleteLevelIdx(idx_);
                    if (parent_ !== '0') {
                        var tt_idx = t_body_list_levels.find('tr[data-parent="'+parent_+'"]');
                        if (tt_idx.length === 0) {
                            var p_ = t_body_list_levels.find('tr[data-level="'+parent_+'"]');
                            p_.find('.sp-level-add-str').removeClass('hide');
                        }
                    }
                });
                e.preventDefault();
            });
        }

        function addStructureLevel() {
            modalStructureLevel.modal('show');
        }

        function validateMatrixLevel(code_) {
            var p_ = t_body_list_levels.find('tr[data-level="'+code_+'"]');
            p_.find('.sp-level-add').removeClass('hide');
            p_.find('.sp-level-add-str').removeClass('hide');
            p_.find('.sp-level-remove-str').addClass('hide');
            if ($('input[id="sp_level_matrix'+code_+'"]').val() !== '') {
                p_.find('.sp-level-add').addClass('hide');
                p_.find('.sp-level-add-str').addClass('hide');
                p_.find('.sp-level-remove-str').removeClass('hide');
            }
        }

        $scope.selectStructureLevel = function () {
            var matrix_id_s = p_search_matrix_level.val();
            var matrix_id_tree = $('input[name=chk_level_sp]').filter(':checked');
            var matrix_id_ = 0;
            var matrix_type_ = 0;
            if (matrix_id_tree.length > 0) {
                matrix_id_ = matrix_id_tree.val();
                matrix_type_ = matrix_id_tree.attr('data-type');
            }
            if (matrix_id_ === 0 && (!_.isNull(matrix_id_s) && matrix_id_s !== '')) {
                matrix_id_ = matrix_id_s;
                matrix_type_ = p_search_matrix_level.select2('data')[0].type;
            }
            if (matrix_id_ === 0) {
                $scope.showAlert('', 'Por favor seleccione el nivel. Puede hacerlo mediante la búsqueda o seleccionandolo en la estructura', 'warning');
                return false;
            }
            var tr_select_ = t_body_list_levels.find('tr[data-level="'+p_sp_idx_level+'"]');
            var valid_ = true;
            $.each(t_body_list_levels.find('tr[data-parent="'+tr_select_.attr('data-parent')+'"]'), function (idx, item) {
                var item_type = parseInt($(item).attr('data-type'));
                if (item_type !== 0 && item_type !== parseInt(matrix_type_)) {
                    var txt_ = (item_type === 1) ? 'material' : 'actividad';
                    $scope.showAlert('', 'Debe seleccionar un elemento de la matriz que sea tipo: '+txt_, 'warning');
                    valid_ = false;
                    return false;
                }
            });
            setTimeout(function () {
                if (valid_) {
                    $('input[id="sp_level_matrix'+p_sp_idx_level+'"]').val(matrix_id_);
                    $('span[id="sp_level_txt_matrix'+p_sp_idx_level+'"]').html(matrix_id_);
                    tr_select_.attr('data-type', matrix_type_);

                    validateMatrixLevel(p_sp_idx_level);
                    modalStructureLevel.modal('hide');
                }
            }, 200);
        };

        function deleteLevelIdx(idx) {
            var tt_idx = t_body_list_levels.find('tr[data-parent="'+idx+'"]');
            if (tt_idx.length > 0) {
                _.each(tt_idx, function (item) {
                    var idx_ = $(item).attr('data-level');
                    $(item).remove();
                    deleteLevelIdx(idx_);
                });
            }
        }

        function loadSubProjects(project_id) {
            RESTService.get('projects/subProjects', project_id, function (response) {
                if (!_.isUndefined(response.status) && response.status) {
                    var data = response.data;
                    setSubProjects(data);
                } else {
                    $scope.showAlert('', 'Hubo un error al obtener los subproyectos. Intente nuevamente.', 'error');
                }
            });
        }

        function setSubProjects(data) {
            t_body_list_sub_projects.empty();
            p_inc_sub_projects.val('').trigger('change');
            p_inc_sub_projects.find('option:gt(0)').remove();
            _.each(data, function (item) {
                var tr_ = $('<tr data-id="'+item.id+'"></tr>');
                var td_1_ = $('<td>'+item.description+'</td>');
                var a_1_ = $('<a data-target="#" title="Editar" class="edit_sp_"><i class="fa fa-edit fa-1-5x"></i></a>');
                var td_2_ = $('<td class="text-center"></td>');
                td_2_.append(a_1_);
                var a_2_ = $('<a data-target="#" title="Eliminar" class="del_sp_"><i class="fa fa-red fa-trash fa-1-5x"></i></a>');
                var td_3_ = $('<td class="text-center"></td>');
                td_3_.append(a_2_);
                tr_.append(td_1_).append(td_2_);
                if (!p_is_approval) {
                    tr_.append(td_3_);
                }
                t_body_list_sub_projects.append(tr_);

                p_inc_sub_projects.append('<option value="'+item.id+'">'+item.description+'</option>');
            });

            $('.edit_sp_').click(function (e) {
                var tr_ = $(this).closest('tr');
                var tr_id = tr_.attr('data-id');
                RESTService.get('projects/getSubProject', tr_id, function (response) {
                    if (!_.isUndefined(response.status) && response.status) {
                        var data_sp = response.data;
                        p_sp_id = data_sp.id;
                        p_sp_description.val(data_sp.description);
                        p_title_modal_sp.html('Editar - '+data_sp.description);
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

            $('.del_sp_').click(function (e) {
                var tr_ = $(this).closest('tr');
                $scope.showConfirm('', '¿Está seguro que desea eliminar el subproyecto?', function() {
                    var tr_id = tr_.attr('data-id');
                    RESTService.deleted('projects/deleteSubProject', tr_id, function (response) {
                        if (!_.isUndefined(response.status) && response.status) {
                            p_inc_sub_projects.val('').trigger('change');
                            p_inc_sub_projects.find('option[value="'+tr_id+'"]').remove();
                            tr_.remove();
                        } else {
                            $scope.showAlert('', 'Hubo un error al eliminar el subproyecto. Intente nuevamente.', 'error');
                        }
                    });
                });
                e.preventDefault();
            });
        }

        $scope.addFrontSP = function () {
            var front_val_ = p_search_front.val();
            if (_.isNull(front_val_) || front_val_ === '' ) {
                $scope.showAlert('', 'Debe seleccionar el frente para agregarlo.', 'warning');
                return false;
            }
            if ($('.tr_front_sp_'+front_val_).length > 0) {
                $scope.showAlert('', 'Ya se agregó este frente. Por favor seleccione otro.', 'warning');
                return false;
            }
            RESTService.get('projects/getFront', front_val_, function (response) {
                if (!_.isUndefined(response.status) && response.status) {
                    setFrontSubProject(response.data);
                } else {
                    $scope.showAlert('', 'Hubo un error al obtener el frente. Intente nuevamente.', 'error');
                }
            });
        };

        function setFrontSubProject(data) {
            var tr_ = $('<tr class="tr_front_sp_ tr_front_sp_'+data.id+'" data-id="'+data.id+'"></tr>');
            var td_1_ = $('<td class="text-center">'+data.code+'</td>');
            var td_2_ = $('<td>'+data.description+'</td>');
            var entity_ = '';
            if (!_.isNull(data.entity)) {
                entity_ = (_.isNull(data.entity.NombreEntidad)) ? data.entity.RazonSocial : data.entity.NombreEntidad;
            }
            var td_3_ = $('<td>'+entity_+'</td>');
            var a_1_ = $('<a data-target="#" title="Eliminar" class="del_front_sp_"><i class="fa fa-red fa-trash fa-1-5x"></i></a>');
            var td_4_ = $('<td class="text-center"></td>');
            td_4_.append(a_1_);
            tr_.append(td_1_).append(td_2_).append(td_3_);
            if (!p_is_approval) {
                td_4_.append(td_4_);
            }
            t_body_list_fronts.append(tr_);

            $('.del_front_sp_').click(function (e) {
                var tr_ = $(this).closest('tr');
                $scope.showConfirm('', '¿Está seguro que desea eliminar el frente del subproyecto?', function() {
                    tr_.remove();
                });
                e.preventDefault();
            });
        }

        function structureIncomeSP(sub_project_id) {
            p_table_structure_level.removeClass('hide');
            t_body_income_levels.empty();
            RESTService.get('projects/getLevelsSubProject', sub_project_id, function (response) {
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
            RESTService.all('projects/getActivityMaterialSubProject', params, function (response) {
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
                var tr_ = $('<tr class="p_tr_income_materials" data-id="'+item.id+'"></tr>');
                var td_1 = $('<td class="text-center">'+item.code+'</td>');
                var td_2 = $('<td class="text-center">'+item.level+'</td>');
                var td_3 = $('<td>'+item.text+'</td>');
                var td_4 = $('<td class="text-center">'+item.und+'</td>');
                var td_5 = $('<td><input id="p_inc_lb_price'+item.id+'" type="text" value="'+item.lb.price+'" ' +
                    'class="text-right form-control input-sm p_inc_edit_lb inp_show_approval" onblur="roundDecimals(this, 2)" ' +
                    'onkeypress="return validDecimals(event, this, 3)" onclick="this.select()"></td>');
                var td_6 = $('<td><input id="p_inc_lb_quantity'+item.id+'" type="text" value="'+item.lb.quantity+'" ' +
                    'class="text-right form-control input-sm p_inc_edit_lb inp_show_approval" onblur="roundDecimals(this, 2)" ' +
                    'onkeypress="return validDecimals(event, this, 3)" onclick="this.select()"></td>');
                var td_7 = $('<td class="text-right p_inc_total_lb" id="p_inc_lb_total'+item.id+'">'+item.lb.total+'</td>');
                total_ = (item.lb.total !== '') ? parseFloat(item.lb.total) + total_ : total_;
                tr_.append(td_1).append(td_2).append(td_3).append(td_4).append(td_5).append(td_6).append(td_7);
                p_income_list_materials.append(tr_);
            });
            verifyReadonlyProjects();
            p_income_total_materials.html((total_).toFixed(2));
            $('.p_inc_edit_lb').keyup(function (e) {
                var tr_id = $(this).closest('tr').attr('data-id');
                var price_ = ($('#p_inc_lb_price'+tr_id).val() === '') ? 0 : $('#p_inc_lb_price'+tr_id).val();
                var quantity_ = ($('#p_inc_lb_quantity'+tr_id).val() === '') ? 0 : $('#p_inc_lb_quantity'+tr_id).val();
                $('#p_inc_lb_total'+tr_id).html((price_*quantity_).toFixed(2));
                calculateTotalIncomeLB();
                e.preventDefault();
            });
        }
        function calculateTotalIncomeLB() {
            var total_ = 0;
            _.each($('.p_inc_total_lb'), function (item) {
                total_ = ($(item).html() !== '') ? parseFloat($(item).html()) + total_ : total_;
            });
            p_income_total_materials.html((total_).toFixed(2));
        }
        function calculateTotalIncomeLBMain() {
            var t_ = (p_inc_q_lb_activity.val() === '') ?
                0 : parseFloat(p_inc_q_lb_activity.val())*parseFloat(p_inc_p_lb_activity.val());
            p_inc_t_lb_activity.val(roundValue(t_, 2));
        }

        function generateListSubLevelsIncome(data) {
            _.each(data, function (item) {
                var span_ = $('<span></span>');
                var a_ = $('<a data-target="#" data-id="'+item.id+'" data-type="'+item.type+'" ' +
                    'class="list-group-item show_act_mat_inc_"></a>');
                var span_2_ = $('<span class="badge show_edit_level hide"></span>');
                var i_ = $('<i class="fa fa-edit"></i>');
                var span_3_ = $('<span>'+item.code+' '+item.level+' '+item.text+'</span>');
                span_2_.append(i_);
                a_.append(span_2_).append(span_3_);
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
                } else {
                    $scope.showAlert('', 'Este nivel no está asociado a ningún elemento de la matriz', 'warning');
                }
                e.preventDefault();
            });
        }

        var p_inc_activity_id = 0;
        function getIncomeActivityMaterial(id) {
            p_inc_activity_id = id;
            info_income_2.removeClass('hide');
            p_inc_u_lb_activity.empty();
            RESTService.get('projects/getInfoActivity', id, function (response) {
                if (!_.isUndefined(response.status) && response.status) {
                    var data_ = response.data;
                    _.each(project_unities, function (item) {
                        p_inc_u_lb_activity.append('<option value="' + item.Value + '">' + item.DisplayText + '</option>');
                    });
                    _.each(project_unities, function (item) {
                        p_inc_u_pv_activity.append('<option value="' + item.Value + '">' + item.DisplayText + '</option>');
                    });
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
                RESTService.get('projects/getActivity', p_inc_activity_id, function (response) {
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
        $scope.addStructureIncome = function () {
            modalStructureIncome.modal('show');
        };

        $scope.selectStructureIncome = function () {
            var matrix_id_s = p_search_matrix_income.val();
            var matrix_id_tree = $('input[name=chk_apu_inc]').filter(':checked');
            var matrix_id_ = 0;
            var matrix_type_ = 0;
            var matrix_description_ = '';
            var matrix_um_ = '';
            if (matrix_id_tree.length > 0) {
                matrix_id_ = matrix_id_tree.val();
                matrix_type_ = matrix_id_tree.attr('data-type');
                matrix_description_ = matrix_id_tree.attr('data-text');
                matrix_um_ = matrix_id_tree.attr('data-um');
            }
            if (matrix_id_ === 0 && (!_.isNull(matrix_id_s) && matrix_id_s !== '')) {
                matrix_id_ = matrix_id_s;
                matrix_type_ = p_search_matrix_income.select2('data')[0].type;
                matrix_description_ = p_search_matrix_income.select2('data')[0].description;
                matrix_um_ = p_search_matrix_income.select2('data')[0].um;
            }
            if (matrix_id_ === 0) {
                $scope.showAlert('', 'Por favor seleccione el recurso. Puede hacerlo mediante la búsqueda o seleccionandolo de la estructura', 'warning');
                return false;
            }
            addIncomeAPU({
                matrix: matrix_id_,
                description: matrix_description_,
                type: matrix_type_,
                um: matrix_um_,
                quantity: '',
                q_unity: '0.00',
                price: '',
                partial: '0.00'
            }, function (result) {
                if (result) {
                    modalStructureIncome.modal('hide');
                }
            });

        };
        function addIncomeAPU(data, callback) {
            if ($('#p_inc_apu_tr_'+data.matrix+'_'+data.type).length > 0) {
                $scope.showAlert('', 'Ya se agregó este recurso. Por favor seleccione otro', 'warning');
                if (typeof callback === 'function') {
                    callback(false);
                }
                return false;
            }
            var type_ = parseInt(data.type);
            var tr_ = $('<tr class="p_inc_apu_tr_" id="p_inc_apu_tr_'+data.matrix+'_'+data.type+'" ' +
                'data-code="'+data.matrix+'" data-type="'+type_+'"></tr>');
            var a_del_ = $('<a href="#" title="Eliminar" class="p_inc_apu_del_">' +
                '<i class="fa fa-trash fa-1-5x fa-red"></i></a>');
            var td_0 = $('<td class="text-center"></td>');
            if (!p_is_approval) {
                td_0.append(a_del_);
            }
            var td_1 = $('<td class="text-center">'+data.matrix+'</td>');
            var td_2 = $('<td>'+data.description+'</td>');
            var td_3 = $('<td class="text-center">'+data.um+'</td>');
            var td_4, td_5;
            if (type_ === 2 || type_ === 4) {
                td_4 = $('<td></td>');
                td_5 = $('<td><input type="text" class="text-right p_inc_apu_inp_ p_inc_apu_inp_q inp_show_approval" ' +
                    'value="'+data.quantity+'" style="width:75px;" onclick="this.select()" ' +
                    'onkeypress="return validDecimals(event, this, 3)" onblur="return roundDecimals(this, 2)"  /></td>');
            } else {
                td_4 = $('<td><input type="text" class="text-right p_inc_apu_inp_ p_inc_apu_inp_q inp_show_approval" ' +
                    'value="'+data.quantity+'" style="width:75px;" onclick="this.select()" ' +
                    'onkeypress="return validDecimals(event, this, 3)" onblur="return roundDecimals(this, 2)"  /></td>');
                td_5 = $('<td class="text-right p_inc_apu_inp_qu">'+data.q_unity+'</td>');
            }
            var td_6 = $('<td><input type="text" class="text-right p_inc_apu_inp_ p_inc_apu_inp_p inp_show_approval" ' +
                'value="'+data.price+'" style="width:75px;" onclick="this.select()" ' +
                'onkeypress="return validDecimals(event, this, 3)" onblur="return roundDecimals(this, 2)" /></td>');
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
            $('.p_inc_apu_del_').click(function (e) {
                var tr_ = $(this).closest('tr');
                $scope.showConfirm('', '¿Está seguro que desea eliminar el recurso del Análisis de Precios Unitarios?', function() {
                    var type_ = tr_.attr('data-type');
                    tr_.remove();
                    calculateTotalTypeIncomeAPU(parseInt(type_), true);
                });
                e.preventDefault();
            });
            $('.p_inc_apu_inp_').keyup(function (e) {
                calculateTotalResourceIncomeApu(type_, data.matrix, true);
                e.preventDefault();
            });
            if (typeof callback === 'function') {
                callback(true);
            }
        }
        function calculateTotalResourceIncomeApu(type, matrix, calculateTotal) {
            var tr_ = p_inc_apu_table.find('tr[id=p_inc_apu_tr_'+matrix+'_'+type+']');
            var quantity_ = tr_.find('input.p_inc_apu_inp_q').val();
            quantity_ = (quantity_ === '') ? 0 : parseFloat(quantity_);
            var price_ = tr_.find('input.p_inc_apu_inp_p').val();
            price_ = (price_ === '') ? 0 : parseFloat(price_);
            var partial_;
            if (type === 1 || type === 3) {
                var h_ = (p_inc_hours_apu.val() === '') ? 0 : parseFloat(p_inc_hours_apu.val());
                var mo_ = (p_inc_mo_apu.val() === '') ? 0 : parseFloat(p_inc_mo_apu.val());
                var eq_ = (p_inc_eq_apu.val() === '') ? 0 : parseFloat(p_inc_eq_apu.val());
                var q_unity;
                if (type === 1) {
                    q_unity = (mo_ === 0) ? 0 : quantity_/mo_*h_;
                } else {
                    q_unity = (eq_ === 0) ? 0 : quantity_/eq_*h_;
                }
                tr_.find('.p_inc_apu_inp_qu').html(q_unity.toFixed(2));
                partial_ = q_unity*price_;
            } else {
                partial_ = quantity_*price_;
            }
            tr_.find('.p_inc_apu_inp_tot').html((roundMath(partial_)).toFixed(2));
            if (calculateTotal) {
                calculateTotalTypeIncomeAPU(type, calculateTotal);
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
        function changeInpApuIncome() {
            _.each(p_inc_apu_table.find('tr'), function (item) {
                var type_ = parseInt($(item).attr('data-type'));
                var matrix_ = $(item).attr('data-code');
                calculateTotalResourceIncomeApu(type_, matrix_, false);
            });
            calculateTotalTypeIncomeAPU(1, true);
            calculateTotalFinalIncomeAPU();
        }
        function editAnalysisPriceUnitary(data) {
            _.each(data, function (item) {
                addIncomeAPU(item, '');
            });
            calculateTotalTypeIncomeAPU(1, true);
            calculateTotalFinalIncomeAPU();
        }
        $scope.saveAnalysisPriceUnitary = function () {
            var b_val = true;
            b_val = b_val && p_inc_hours_apu.required();
            b_val = b_val && p_inc_mo_apu.required();
            b_val = b_val && p_inc_eq_apu.required();
            if (b_val) {
                $.each($('.p_inc_apu_inp_'), function (idx, item) {
                    if ($(item).val() === '') {
                        b_val = false;
                        $(item).focus();
                        return false;
                    }
                });
            }
            if (b_val) {
                var p_types = [], p_matrix = [], p_quantity = [], p_price = [];
                _.each($('.p_inc_apu_tr_'), function (item) {
                    item = $(item);
                    var type_ = parseInt(item.attr('data-type'));
                    p_types.push(type_);
                    p_matrix.push(item.attr('data-code'));
                    p_quantity.push(item.find('input.p_inc_apu_inp_q').val());
                    p_price.push(item.find('input.p_inc_apu_inp_p').val());
                });
                var params = {
                    'apu_hours_day': p_inc_hours_apu.val(),
                    'apu_mo': p_inc_mo_apu.val(),
                    'apu_eq': p_inc_eq_apu.val(),
                    'type': p_types,
                    'matrix': p_matrix,
                    'quantity': p_quantity,
                    'price': p_price
                };
                RESTService.updated('projects/saveAnalysisPriceUnitary', p_inc_activity_id, params, function (response) {
                    if (!_.isUndefined(response.status) && response.status) {
                        $scope.showAlert('', 'El Análisis de Precios Unitarios se guardó correctamente.', 'success');
                        modalAnalysisIncome.modal('hide');
                        getIncomeActivityMaterial(p_inc_activity_id);
                        p_total.val(roundValue(response.total, 2));
                        $('#LoadRecordsButtonP').click();
                    } else {
                        $scope.showAlert('', response.message, 'error');
                    }
                });
            }
        };

        $scope.sendToApproval = function () {
            $scope.showConfirm('', '¿Está seguro que desea envíar a aprobación?', function() {
                RESTService.updated('projects/sendApproval', p_id, {}, function (response) {
                    if (!_.isUndefined(response.status) && response.status) {
                        $scope.showAlert('', 'El proyecto se envío a aprobación', 'warning');
                        modalP.modal('hide');
                        $('#LoadRecordsButtonP').click();
                    } else {
                        $scope.showAlert('', response.message, 'warning');
                    }
                });
            });
        };
    }

    function Config($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('projects', {
                url: '/projects',
                templateUrl: base_url + '/templates/projects/base.html',
                controller: 'ProjectCtrl'
            });

        $urlRouterProvider.otherwise('/');
    }
})
();