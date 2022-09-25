/**
 * Created by JAIR on 4/28/2017.
 */
(function () {
    'use strict';
    angular.module('sys.app.requirements_contests')
        .config(Config)
        .controller('RequirementQuotationCtrl', RequirementQuotationCtrl);

    Config.$inject = ['$stateProvider', '$urlRouterProvider'];
    RequirementQuotationCtrl.$inject = ['$scope', '_', 'RESTService', 'AlertFactory'];

    function RequirementQuotationCtrl($scope, _, RESTService, AlertFactory)
    {
        moment.locale('es');

        var start = moment().startOf('month');
        var end = moment().endOf('month');

        var chk_date_range = $('#chk_date_range');
        chk_date_range.click(function () {
            $('#LoadRecordsButtonRC').click();
        });

        var reqDates = $('#reqDates');
        var req_states;
        var req_states_line;

        generateCheckBox('.i-checks');

        function getDataRequirementsContests() {
            req_states = $('#req_states_c');
            req_states.empty().change(function () {
                $('#LoadRecordsButtonRC').click();
            });
            req_states_line = $('#req_states_c_line');
            req_states_line.empty().change(function () {
                $('#LoadRecordsButtonRC').click();
            });
            RESTService.all('requirements_contests/data_form', '', function (response) {
                if (!_.isUndefined(response.status) && response.status) {
                    _.each(response.states, function (item) {
                        req_states.append('<option value="' + item.Value + '">' + item.DisplayText + '</option>');
                    });
                    _.each(response.states_line, function (item) {
                        req_states_line.append('<option value="' + item.Value + '">' + item.DisplayText + '</option>');
                    });
                }
            }, function () {
                getDataRequirementsContests();
            });
        }

        var showDate = function (from, to) {
            start = from;
            end = to;
            reqDates.find('span').html(from.format('MMM D, YYYY') + ' - ' + to.format('MMM D, YYYY'));
            if (chk_date_range.prop('checked')) {
                $('#LoadRecordsButtonRC').click();
            }
        };
        generateDateRangePicker(reqDates, start, end, showDate);
        showDate(start, end);

        var show_table_req_con = $('#show_table_req_con');
        var show_no_req_con = $('#show_no_req_con');
        var t_body_table_req_con = $('#t_body_table_req_con');

        function showQuotations(code)
        {
            cleanTableReqCon();
            RESTService.get('requirements_contests/getContests', code, function (response) {
                if (!_.isUndefined(response.status) && response.status) {
                    if (response.data.length > 0) {
                        _.each(response.data, function (item) {
                            var tr_req_con = $('<tr></tr>');
                            var td1 = $('<td class="text-center">'+item.code+'</td>');
                            var td2 = $('<td>'+item.document+'</td>');
                            var td3 = $('<td>'+item.business_name+'</td>');
                            var td4 = $('<td>'+item.state+'</td>');
                            tr_req_con.append(td1).append(td2).append(td3).append(td4);
                            t_body_table_req_con.append(tr_req_con);
                        });
                        show_table_req_con.removeClass('hide');
                    } else {
                        show_no_req_con.removeClass('hide');
                    }
                } else {
                    AlertFactory.textType({
                        title: '',
                        message: 'Hubo un error al obtener los concursos. Intente nuevamente.',
                        type: 'error'
                    });
                }
            });
        }

        function cleanTableReqCon() {
            show_table_req_con.addClass('hide');
            show_no_req_con.addClass('hide');
            t_body_table_req_con.empty();
        }

        var search = getFormSearch('frm-search-rc', 'search_rc', 'LoadRecordsButtonRC');

        var states = '<select id="req_states_c" class="search_input"></select>';
        var states_line = '<select id="req_states_c_line" class="search_input"></select>';

        var table_container_r = $("#table_container_requirements_vs_contests");

        table_container_r.jtable({
            title: "Lista de Requerimientos",
            paging: true,
            sorting: true,
            actions: {
                listAction: base_url + '/requirements_contests/list'
            },
            toolbar: {
                items: [{
                    cssClass: 'buscador',
                    text: states
                },{
                    cssClass: 'buscador',
                    text: states_line
                },{
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
                view: {
                    width: '1%',
                    sorting: false,
                    edit: false,
                    create: false,
                    listClass: 'text-center',
                    display: function (data) {
                        return '<a href="javascript:void(0)" title="Ver Cotizaciones" class="select_rc" data-code="'+
                            data.record.id+'"><i class="fa fa-database fa-1-5x"></i></a>';
                    }
                },
                code: {
                    title: 'Requerimiento',
                    listClass: 'text-center',
                    width: '5%'
                },
                date_registration: {
                    title: 'F.Registro',
                    listClass: 'text-center',
                    width: '5%'
                },
                date_required: {
                    title: 'F.Requerida',
                    list: show_list_,
                    listClass: 'text-center',
                    width: '5%'
                },
                project_description: {
                    title: 'Proyecto',
                    width: '30%',
                    sorting: false
                },
                requested_by: {
                    title: 'Solicitado por',
                    list: show_list_
                },
                requirement_state_desc: {
                    title: 'Estado',
                    list: show_list_,
                    sorting: false,
                    width: '5%'
                },
                requirement_state_line_desc: {
                    title: 'Estado por Linea',
                    sorting: false,
                    list: show_list_
                }
            },
            recordsLoaded: function(event, data) {
                $('.select_rc').click(function(e){
                    console.log(this.closest('tr'));
                    var rc_code = $(this).attr('data-code');
                    $('.jtable-row-selected').removeClass('jtable-row-selected');
                    $(this).closest('tr').addClass('jtable-row-selected');
                    showQuotations(rc_code);
                    e.preventDefault();
                });
            }
        });
        getDataRequirementsContests();

        generateSearchForm('frm-search-rc', 'LoadRecordsButtonRC', function(){
            cleanTableReqCon();
            table_container_r.jtable('load', {
                search: $('#search_rc').val(),
                check: (chk_date_range.prop('checked')),
                from: start.format('YYYY-MM-DD'),
                to: end.format('YYYY-MM-DD'),
                state: req_states.val(),
                state_line: req_states_line.val()
            });
        }, true);
    }

    function Config($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('requirements_contests', {
                url: '/requirements_contests',
                templateUrl: base_url + '/templates/requirements_quotations/base.html',
                controller: 'RequirementQuotationCtrl'
            });

        $urlRouterProvider.otherwise('/');
    }
})
();