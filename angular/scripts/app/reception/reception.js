/**
 * Created by JAIR on 4/17/2017.
 */
(function () {
    'use strict';
    angular.module('sys.app.receptions')
        .config(Config)
        .controller('ReceptionCtrl', ReceptionCtrl);

    Config.$inject = ['$stateProvider', '$urlRouterProvider'];
    ReceptionCtrl.$inject = ['$scope'];

    function ReceptionCtrl($scope)
    {
        moment.locale('es');

        var start = moment().startOf('month');
        var end = moment().endOf('month');

        var modalROC;
        var modalP;
        var modalPr;
        var titleReq;
        var btnActionReq;
        var reqDates = $('#reqDates');

        var showDate = function (start, end) {
            reqDates.find('span').html(start.format('MMM D, YYYY') + ' - ' + end.format('MMM D, YYYY'));
            //getListRooms(start.format('YYYY-MM-DD'), end.format('YYYY-MM-DD'));
        };

        reqDates.daterangepicker({
            startDate: start,
            endDate: end,
            opens: 'left',
            showDropdowns: true,
            alwaysShowCalendars: true,
            showCustomRangeLabel: false,
            ranges: {
                'Hoy': [moment(), moment()],
                'Ayer': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                'Últimos 7 días': [moment().subtract(6, 'days'), moment()],
                'Últimos 30 días': [moment().subtract(29, 'days'), moment()],
                'Este mes': [moment().startOf('month'), moment().endOf('month')],
                'Mes pasado': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
                'Este año': [moment().startOf('year'), moment().endOf('year')],
                'Año pasado': [moment().subtract(1, 'year').startOf('year'), moment().subtract(1, 'year').endOf('year')]
            },
            locale: {
                cancelLabel: 'Cancelar',
                applyLabel: 'Aplicar',
                daysOfWeek: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá'],
                monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre',
                    'Octubre', 'Noviembre', 'Diciembre']
            }
        }, showDate);

        showDate(start, end);

        function overModals() {
            modalROC = $('#modalROC');
            modalP = $('#modalProject');
            modalPr = $('#modalOrdenCompra');
            titleReq = $('#title-req');
            btnActionReq = $('#btn_action_req');

            modalP.on('hidden.bs.modal', function (e) {
                modalROC.attr('style', 'display:block;');
            });
            modalP.on('show.bs.modal', function (e) {
                modalROC.attr('style', 'display:block; z-index:2030 !important');
            });

            modalPr.on('hidden.bs.modal', function (e) {
                modalROC.attr('style', 'display:block;');
            });
            modalPr.on('show.bs.modal', function (e) {
                modalROC.attr('style', 'display:block; z-index:2030 !important');
            });

            callModals();
        }

        function newReception()
        {
            overModals();
            modalROC.modal('show');
            titleReq.html('Nueva Recepción');
            btnActionReq.addClass('hide');
        }

        $scope.openProject = function(){ 
            modalPr.modal('show');
        };

        $scope.openProducts = function(){
            console.log(modalPr);
            modalPr.modal('show');
        };

        var search = '<form class="form-search" id="frm-search-r">' +
            '<input type="text" id="search" class="input-sm" name="search" autocomplete="off" placeholder="Buscar..." />' +
            '<button type="button" id="LoadRecordsButtonR" class="btn btn-success btn-sm btn-search">' +
            '<i class="fa fa-search"></i>' +
            '</button>' +
            '</form>';

        var states = '<select id="states" class="search_input" style="display:none;">'+
            '<option value="">Todos</option>'+
            '<option value="">Registrado</option>'+
            '<option value="">Aprobado</option>'+
            '<option value="">Asignado</option>'+
            '<option value="">En proceso de compra</option>'+
            '<option value="">Comprado</option>'+
            '</select>';

        var table_container_r = $("#table_container_reception");

        table_container_r.jtable({
            title: "Lista de Recepción",
            paging: true,
            sorting: true,
            actions: {
                listAction: function (postData, jtParams) {
                    return {
                        "Result": "OK",
                        "Records": [
                            { "fecha_recepcion": "01/04/2017","Almacen":"Tarapoto", "Usuario": "AdminECR", "Orden_compra": "00045"},
                            { "fecha_recepcion": "03/05/2017","Almacen":"Tarapoto", "Usuario": "AdminECR", "Orden_compra": "00245"},
                            { "fecha_recepcion": "02/04/2017","Almacen":"Tarapoto", "Usuario": "AdminECR", "Orden_compra": "00342"}
                        ],
                        "TotalRecordCount": 4
                    };
                },
                deleteAction: base_url + '/receptions/delete'
            },
            toolbar: {
                items: [{
                    cssClass: 'buscador',
                    text: states
                },{
                    cssClass: 'buscador',
                    text: search
                },{
                    cssClass: 'btn-primary',
                    text: '<i class="fa fa-file-excel-o"></i> Exportar a Excel',
                    click: function () {
                        window.open(base_url+'/receptions/excel');
                    }
                },{
                    cssClass: 'btn-success',
                    text: '<i class="fa fa-plus"></i> Nuevo Recepción OC',
                    click: function () {
                        newReception();
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
                fecha_recepcion: {
                    title: (show_list_) ? 'Fecha Recepción' : 'Fech Recepción',
                    listClass:'text-center'
                },
                Almacen: {
                    title: 'Almacén'
                },
                Usuario: {

                    title: 'Usuario',
                    list:show_list_
                },
               Orden_compra: {

                    title: (show_list_) ? 'Orden de Compra': 'OC'
                },
                edit: {
                    width: '1%',
                    sorting: false,
                    edit: false,
                    create: false,
                    display: function (data) {
                        return '<a href="javascript:void(0)" title="Editar" class="edit_r" data-code="'+
                            data.record.id+'"><i class="fa fa-pencil-square-o fa-1-5x fa-green"></i></a>';
                    }
                }
            },
            recordsLoaded: function(event, data) {
                $('.edit_r').click(function(e){
                    //var code = $(this).attr('data-code');
                    overModals();
                    modalROC.modal('show');
                    titleReq.html('Editar Recepción');
                    btnActionReq.removeClass('hide');
                    e.preventDefault();
                });
            }
        });

        var LoadRecordsButtonR = $('#LoadRecordsButtonR');

        LoadRecordsButtonR.click(function (e) {
            e.preventDefault();
            table_container_r.jtable('load', {
                search: $('#search').val()
            });
        });

        LoadRecordsButtonR.click();

        $('#frm-search-r').submit(function (e) {
            e.preventDefault();
            LoadRecordsButtonR.click();
        });

        function callModals()
        {
            var search_p = '<form class="form-search" id="frm-search-p">' +
                '<input type="text" id="search_p" class="input-sm search_input" name="search" autocomplete="off" placeholder="Buscar..." />' +
                '<button type="submit" id="LoadRecordsButtonP" class="btn btn-success btn-sm btn-search">' +
                '<i class="fa fa-search"></i>' +
                '</button>' +
                '</form>';

            var table_container_p = $("#table_container_p");

            table_container_p.jtable({
                title: "Lista de Proyectos",
                paging: true,
                sorting: true,
                actions: {
                    listAction: base_url + '/receptions/getProjects'
                },
                toolbar: {
                    items: [{
                        cssClass: 'buscador',
                        text: search_p
                    }]
                },
                fields: {
                    IdProyecto: {
                        title: 'ID Proyecto',
                        width: '5%',
                    },
                    Proyecto: {
                        title: 'Proyecto'
                    },
                    select: {
                        width: '1%',
                        sorting: false,
                        edit: false,
                        create: false,
                        display: function (data) {
                            return '<a href="javascript:void(0)" title="Seleccionar" class="select_p" data-code="'+
                                data.record.IdProyecto+'"><i class="fa fa-check fa-1-5x"></i></a>';
                        }
                    }
                },
                recordsLoaded: function(event, data) {
                }
            });

            var LoadRecordsButtonP = $('#LoadRecordsButtonP');

            LoadRecordsButtonP.click(function (e) {
                e.preventDefault();
                table_container_p.jtable('load', {
                    search: $('#search_p').val()
                });
            });

            $('#frm-search-p').submit(function (e) {
                e.preventDefault();
                LoadRecordsButtonP.click();
            });
            var search_pr = '<form class="form-search" id="frm-search-pr">' +
                '<input type="text" id="search_pr" class="input-sm search_input" name="search" autocomplete="off" placeholder="Buscar..." />' +
                '<button type="submit" id="LoadRecordsButtonPr" class="btn btn-success btn-sm btn-search">' +
                '<i class="fa fa-search"></i>' +
                '</button>' +
                '</form>';

            var table_container_pr = $("#table_container_pr");

            table_container_pr.jtable({
                title: "Lista de Orden de Compra",
                paging: true,
                sorting: true,
                actions: {
                    listAction: function (postData, jtParams) {
                        return {
                            "Result": "OK",
                            "Records": [
                                        { "IdProyecto": '00467', "Proyecto": "001232"},
                                        { "IdProyecto": '00468', "Proyecto": "0012322017"},
                                        { "IdProyecto": '00465', "Proyecto": "01042017"},
                                        { "IdProyecto": '00464', "Proyecto": "012042017"},
                                        { "IdProyecto": '00463', "Proyecto": "13042017"},
                            ],
                            "TotalRecordCount": 4
                        };
                    }
                },
                toolbar: {
                    items: [{
                        cssClass: 'buscador',
                        text: search_pr
                    }]
                },
                fields: {
                    IdProyecto: {
                        title: 'ID OC',
                        width: '5%',
                    },
                    Proyecto: {
                        title: 'Descripción'
                    },
                    select: {
                        width: '1%',
                        sorting: false,
                        edit: false,
                        create: false,
                        display: function (data) {
                            return '<a href="javascript:void(0)" title="Seleccionar" class="select_pr" data-code="'+
                                data.record.IdProyecto+'"><i class="fa fa-circle-o fa-1-5x"></i></a>';
                        }
                    }
                },
                recordsLoaded: function(event, data) {
                }
            });

            var LoadRecordsButtonPr = $('#LoadRecordsButtonPr');

            LoadRecordsButtonPr.click(function (e) {
                e.preventDefault();
                table_container_pr.jtable('load', {
                    search: $('#search_pr').val()
                });
            });

            $('#frm-search-pr').submit(function (e) {
                e.preventDefault();
                LoadRecordsButtonPr.click();
            });

        }
    }

    function Config($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('receptions', {
                url: '/receptions',
                templateUrl: base_url + '/templates/receptions/base.html',
                controller: 'ReceptionCtrl'
            });

        $urlRouterProvider.otherwise('/');
    }
})
();