/**
 * Created by EVER on 4/17/2017.
 */
(function () {
    'use strict';
    angular.module('sys.app.fronts')
        .config(Config)
        .controller('FrontCtrl', FrontCtrl);

    Config.$inject = ['$stateProvider', '$urlRouterProvider'];
    FrontCtrl.$inject = ['$scope', '_', 'RESTService', 'AlertFactory'];

    function FrontCtrl($scope, _, RESTService, AlertFactory)
    {
        var modalF;
        var modalClient;
        var titleFRE;
        var code;
        var description;
        var detail;
        var IdClient;
        var Ruc;
        var IdFront;
        var business_name;
        var state;
        var state_text;

        $scope.chkState = function() {
            var txt = (state.prop('checked')) ? 'Activo' : 'Inactivo';
            state_text.html(txt);
        };

        function overModals()
        {
            if (!call_m) {
                modalF = $('#modalFR');
                titleFRE = $('#title-fre');
                modalClient = $('#modalCliente');

                code = $('#code');
                description = $('#description');
                detail = $('#detail');
                IdClient = $('#client_id');
                Ruc = $('#ruc');
                IdFront = $("#front_id");
                business_name = $("#business_name");
                state = $("#state");
                state_text = $('#state_text');

                modalClient.on('hidden.bs.modal', function (e) {
                    modalF.attr('style', 'display:block;');
                });
                modalClient.on('show.bs.modal', function (e) {
                    modalF.attr('style', 'display:block; z-index:2030 !important');
                });
                modalF.on('shown.bs.modal', function (e) {
                    code.focus();
                });
                modalF.on('hidden.bs.modal', function (e) {
                    cleanFront();
                });
                callModals();

                $('.i-checks').iCheck({
                    checkboxClass: 'icheckbox_square-green'
                }).on('ifChanged', function (event) {
                    $(event.target).click();
                    $scope.chkState();
                });
            }
        }

        function cleanFront()
        {
            cleanRequired();
            titleFRE.html('');
            IdFront.val('');
            IdClient.val('');
            code.val('');
            description.val('');
            detail.val('');
            business_name.val('');
            Ruc.val('');
            state.prop('checked', true).iCheck('update');
            $scope.chkState();
        }

        function newFront()
        {
            overModals();
            titleFRE.html('Nuevo Frente');
            modalF.modal('show');
        }

        $scope.openClient = function () {
            $('#LoadRecordsButtonU').click();
            modalClient.modal('show');
        };

        function findFront(id)
        {
            overModals();
            titleFRE.html('Editar Frente');
            RESTService.get('fronts/find', id, function (response) {
                if (!_.isUndefined(response.status) && response.status) {
                    var data = response.data;
                    code.val(data.code);
                    IdFront.val(data.id);
                    description.val(data.description);
                    detail.val(data.detail);
                    state.prop('checked', (data.state === "1")).iCheck('update');
                    $scope.chkState();
                    if (data.entity !== null) {
                        IdClient.val(data.entity_id);
                        Ruc.val(data.entity.Documento);
                        business_name.val(data.entity.NombreEntidad);
                    }
                    modalF.modal('show');
                } else {
                    AlertFactory.textType({
                        title: '',
                        message: 'Hubo un error al obtener  frente. Intente nuevamente.',
                        type: 'error'
                    });
                }
            });
        }

        $scope.saveFront = function ()
        {
            var bval = true;
            bval = bval && code.required();
            bval = bval && description.required();
            bval = bval && detail.required();
            if (bval) {
                var params = {
                    'id': IdFront.val(),
                    'code': code.val(),
                    'description': description.val(),
                    'detail': detail.val(),
                    'entity_id': (IdClient.val() != '') ? IdClient.val() : null,
                    'state': (state.prop('checked')) ? 1 : 0
                };

                var Front_id = (IdFront.val() == '') ? 0 : IdFront.val();

                RESTService.updated('fronts/saveFront', Front_id, params, function (response) {
                    if (!_.isUndefined(response.status) && response.status == true) {
                        AlertFactory.textType({
                            title: '',
                            message: 'El registro se guardó correctamente.',
                            type: 'success'
                        });
                        modalF.modal('hide');
                        $("#LoadRecordsButtonFront").click();
                    } else {
                        var msg_ = (_.isUndefined(response.message)) ?
                            'Hubo un error al guardar frente. Intente nuevamente.' : response.message;
                        AlertFactory.textType({
                            title: '',
                            message: msg_,
                            type: 'error'
                        });
                    }
                });
            }
        };

        var search = getFormSearch('frm-search-front', 'search_front', 'LoadRecordsButtonFront');

        var table_container_b = $("#table_container_front");

        table_container_b.jtable({
            title: "Lista de Frentes",
            paging: true,
            sorting: true,
            actions: {
                listAction: base_url + '/fronts/list',
                deleteAction: base_url + '/fronts/delete'
            },
            toolbar: {
                items: [{
                    cssClass: 'buscador',
                    text: search
                }, {
                    cssClass: 'btn-primary',
                    text: '<i class="fa fa-file-excel-o"></i> Exportar a Excel',
                    click: function () {
                        $scope.openDoc('fronts/excel', {});
                    }
                }, {
                    cssClass: 'btn-success',
                    text: '<i class="fa fa-plus"></i> Nuevo Frente',
                    click: function () {
                        newFront();
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
                    width: '3%'
                },
                description: {
                    title: 'Descripción'
                },
                NombreEntidad: {
                    title: (show_list_) ? 'Razón Social/Nombres' : 'R.S/ Nombres',
                    sorting: false
                },
                edit: {
                    width: '1%',
                    sorting: false,
                    edit: false,
                    create: false,
                    listClass: 'text-center',
                    display: function (data) {
                        return '<a href="javascript:void(0)" title="Editar" class="edit_f" data-code="' +
                            data.record.id + '"><i class="fa fa-pencil-square-o fa-1-5x fa-green"></i></a>';
                    }
                }
            },
            recordsLoaded: function (event, data) {
                $('.edit_f').click(function (e) {
                    var code = $(this).attr('data-code');
                    findFront(code);
                    e.preventDefault();
                });
            }
        });
        generateSearchForm('frm-search-front', 'LoadRecordsButtonFront', function () {
            table_container_b.jtable('load', {
                search: $('#search_front').val()
            });
        }, true);

        var call_m = false;

        function callModals()
        {
            call_m = true;

            var search_u = getFormSearch('frm-search-u', 'search_u', 'LoadRecordsButtonU');

            var table_container_u = $("#table_container_cliente");

            table_container_u.jtable({
                title: "Lista de Clientes",
                paging: true,
                sorting: true,
                actions: {
                    listAction: base_url + '/fronts/listClient'
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
                    Documento: {
                        title: 'Documento',
                        width: '2%'
                    },
                    nombre_entidad: {
                        title: (show_list_) ? 'Razón Social/Nombres' : 'R.S/ Nombres'
                    },
                    select: {
                        width: '1%',
                        sorting: false,
                        edit: false,
                        create: false,
                        listClass: 'text-center',
                        display: function (data) {
                            return '<a href="javascript:void(0)" title="Seleccionar" class="select_u" data-code="' +
                                data.record.id + '" data-doc="' + data.record.Documento + '" data-name="' + data.record.nombre_entidad +
                                '"><i class="checks'+data.record.id+' fa fa-'+icon_select+' fa-1-5x"></i></a>';
                        }
                    }
                },
                recordsLoaded: function (event, data) {
                    $('.select_u').click(function (e) {
                        var code_u = $(this).attr('data-code');
                        var doc_u = $(this).attr('data-doc');
                        var name_u = $(this).attr('data-name');
                        IdClient.val(code_u);
                        Ruc.val(doc_u);
                        business_name.val(name_u);
                        modalClient.modal('hide');
                        e.preventDefault();
                    });
                }
            });

            generateSearchForm('frm-search-u', 'LoadRecordsButtonU', function () {
                table_container_u.jtable('load', {
                    search: $('#search_u').val()
                });
            }, false);
        }
    }

    function Config($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('fronts', {
                url: '/fronts',
                templateUrl: base_url + '/templates/fronts/base.html',
                controller: 'FrontCtrl'
            });

        $urlRouterProvider.otherwise('/');
    }
})();