/**
 * Created by JAIR on 4/25/2017.
 */
(function () {
    'use strict';
    angular.module('sys.app.approval_autonomy')
        .config(Config)
        .controller('ApprovalAutonomyCtrl', ApprovalAutonomyCtrl);

    Config.$inject = ['$stateProvider', '$urlRouterProvider'];
    ApprovalAutonomyCtrl.$inject = ['$scope', '_', 'RESTService', 'AlertFactory'];

    function ApprovalAutonomyCtrl($scope, _, RESTService, AlertFactory) {
        var modalU = $("#modalU");
        var approval_autonomy_id = $("#approval_autonomy_id");
        var user_id = $("#user_id");
        var user = $("#user");
        var username = $("#username");
        var from = $("#from");
        var to = $("#to");
        var approval_body = $("#approval_body");

        function getDataForm() {
            RESTService.all('approval_autonomy/data_grid', '', function (response) {
                if (!_.isUndefined(response.status) && response.status) {
                    var data_p = response.data;
                    _.each(data_p, function (b) {
                        // console.log(b.id+'<br>' +b.user_id+'<br>' +b.username+'<br>' +b.from+'<br>' +b.to);
                        addToAAutonomy(b.id, b.user_id, b.name, b.username, b.from, b.to);
                    });
                } else {
                    AlertFactory.textType({
                        title: '',
                        message: 'Hubo un error al obtener los datos . Intente nuevamente.',
                        type: 'error'
                    });
                }
            }, function () {
                getDataForm();
            });
        }

        getDataForm();

        $scope.saveApproval = function () {
            var bval = true;
            if (bval && approval_body.html() === '') {
                AlertFactory.showWarning({
                    title: '',
                    message: 'Debe registrar una autonomía de aprobación al menos.'
                });
                return false;
            }
            if (bval) {
                var user_id = [], from = [], to = [], aa_id = [];

                _.each($('.aa_user_id'), function (item) {
                    user_id.push($(item).val());
                });
                $.each($('.aa_from'), function (item) {
                    from.push($(item).val());
                });
                $.each($('.aa_to'), function (item) {
                    to.push($(item).val());
                });
                $.each($('.aa_id'), function (item) {
                    aa_id.push($(item).val());
                });

                var params = {
                    'approval_id': aa_id.join(','),
                    'user_id': user_id.join(','),
                    'from': from.join(','),
                    'to': to.join(',')
                };
                var aa_i = (approval_autonomy_id.val() === '') ? 0 : approval_autonomy_id.val();

                RESTService.updated('approval_autonomy/saveApproval_autonomy', aa_i, params, function (response) {
                    if (!_.isUndefined(response.status) && response.status) {
                        AlertFactory.textType({
                            title: '',
                            message: 'La autonomía de aprobación se guardó correctamente.',
                            type: 'success'
                        });
                    } else {
                        AlertFactory.textType({
                            title: '',
                            message: 'Hubo un error al guardar la autonomía de aprovación. Intente nuevamente.',
                            type: 'error'
                        });
                    }
                });
            }
        };
        var count = 0;

        $scope.addApproval = function () {
            var bval = true;
            bval = bval && from.required();
            bval = bval && to.required();
            bval = bval && username.required();

            var arr_from = [];

            $.each($('.aa_user_id'), function (idx, item) {
                if ($(item).val() === user_id.val()) {
                    bval = false;
                    AlertFactory.showWarning({
                        title: '',
                        message: 'Este usuario ya está asignado a una autonomía de aprobación.'
                    });
                    return false;
                }
            })

            $.each($('.aa_from'), function (idx, item) {
                arr_from[idx] = $(item).val();
            });

            $.each($('.aa_to'), function (idx, item) {
                if ((parseFloat(arr_from[idx]) <= parseFloat(from.val()) && parseFloat(from.val()) <= parseFloat($(item).val()))
                    || (parseFloat(arr_from[idx]) <= parseFloat(to.val()) && parseFloat(to.val()) <= parseFloat($(item).val()))) {
                    bval = false;
                    AlertFactory.showWarning({
                        title: '',
                        message: 'El rango que desea agregar se traslapa con valores ya agregados.'
                    });
                    return false;
                }
                if (parseFloat(from.val()) < parseFloat(arr_from[idx]) && parseFloat(to.val()) > parseFloat(arr_from[idx])) {
                    bval = false;
                    AlertFactory.showWarning({
                        title: '',
                        message: 'Este usuario ya está asignado a una autonomía de aprobación.'
                    });
                    return false;
                }
            });


            if (bval) {
                addToAAutonomy(0, user_id.val(), user.val(), username.val(), from.val(), to.val());
            }
        };

        function addToAAutonomy(v_id, v_user_id, v_user, v_username, v_from, v_to) {

            var tr = $('<tr id="tr_b_' + count + '"></tr>');
            var tdu = $('<td>' + v_user + '</td>');
            var tdun = $('<td>' + v_username + '</td>');
            var tdf = $('<td class="text-right" width="16%">' + v_from + '</td>');
            var tdt = $('<td class="text-right" width="16%">' + v_to + '</td>');
            var inp1 = $('<input type="hidden" class="aa_user_id" value="' + v_user_id + '" />');
            var inp2 = $('<input type="hidden" class="aa_from" value="' + v_from + '" />');
            var inp3 = $('<input type="hidden" class="aa_to" value="' + v_to + '" />');
            var inp4 = $('<input type="hidden" class="aa_id" value="' + v_id + '" />');
            tdu.append(inp1);
            tdu.append(inp2);
            tdu.append(inp3);
            tdu.append(inp4);
            var td2 = $('<td class="text-center"></td>');
            var btn = $('<button class="btn btn-danger btn-xs delApprovalAutonomy"  data-id="' + count + '"  type="button"><span class="fa fa-trash"></span></button>');
            td2.append(btn);
            tr.append(tdu).append(tdun).append(tdf).append(tdt).append(td2);
            approval_body.append(tr);
            modalU.modal('hide');

            $('.delApprovalAutonomy').click(function (e) {
                var count = $(this).attr('data-id');
                AlertFactory.confirm({
                    title: '',
                    message: '¿Está seguro que desea quitar la Autonomía de Aprobación?',
                    confirm: 'Si',
                    cancel: 'No'
                }, function () {
                    $('#tr_b_' + count).remove();
                });
                e.preventDefault();
            });
            count++;
            user_id.val('');
            user.val('');
            username.val('');
            from.val('').focus();
            to.val('');
        }


        $scope.openUser = function () {
            var modalU = $('#modalU');

            var search = getFormSearch('frm-search-u', 'search_u', 'LoadRecordsButtonU');

            var table_container_u = $("#table_container_u");

            table_container_u.jtable({
                title: "Lista de Usuarios",
                paging: true,
                sorting: true,
                actions: {
                    listAction: base_url + '/approval_autonomy/listUser'
                },
                toolbar: {
                    items: [{
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
                    name: {
                        title: 'Nombre'
                    },
                    username: {
                        title: 'Usuario'
                    },
                    select: {
                        width: '1%',
                        sorting: false,
                        edit: false,
                        create: false,
                        listClass: 'text-center',
                        display: function (data) {
                            return '<a href="javascript:void(0)" title="Seleccionar" class="select_u" data-code="' +
                                data.record.id + '" data-title="' + data.record.name + '" data-username="' + data.record.username + '"><i class="fa fa-' + icon_select + ' fa-1-5x"></i></a>';
                        }
                    }
                },
                recordsLoaded: function (event, data) {
                    $('.select_u').click(function (e) {
                        var code = $(this).attr('data-code');
                        var name = $(this).attr('data-title');
                        var usern = $(this).attr('data-username');
                        user_id.val(code);
                        user.val(name);
                        username.val(usern);
                        modalU.modal('hide');
                        e.preventDefault();
                    });
                }
            });

            generateSearchForm('frm-search-u', 'LoadRecordsButtonU', function () {
                table_container_u.jtable('load', {
                    search: $('#search_u').val()
                });
            }, true);

            modalU.modal('show');
        };
    }

    function Config($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('approval_autonomy', {
                url: '/approval_autonomy',
                templateUrl: base_url + '/templates/approval_autonomy/base.html',
                controller: 'ApprovalAutonomyCtrl'
            });

        $urlRouterProvider.otherwise('/');
    }
})();