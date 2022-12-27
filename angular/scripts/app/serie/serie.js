/**
 * Created by JAIR on 4/5/2017.
 */

(function () {
    'use strict';
    angular.module('sys.app.series')
        .config(Config)
        .controller('SerieCtrl', SerieCtrl);

    Config.$inject = ['$stateProvider', '$urlRouterProvider'];
    SerieCtrl.$inject = ['$scope', '_', 'RESTService', 'AlertFactory'];

    function SerieCtrl($scope, _, RESTService, AlertFactory) {
        var modalSerie = $('#modalSerie');
        var producto = $('#p_product_id');
        var p_product_name = $('#p_product_name');
        var msg_cont = $('#msg_cont');
        var serie_id = $('#serie_id');
        var titleModalSerie = $("#titleModalSerie");

        var serie = $('#serie');
        var chasis = $('#chasis');
        var motor = $('#motor');
        var color = $('#color');
        var tipoCompra = $("#tipoCompra");
        var nrPoliza = $("#nrPoliza");
        var nrLote = $("#nrLote");
        var cPlacaVeh = $("#cPlacaVeh");
        var anio_fabricacion = $('#anio_fabricacion');
        var anio_modelo = $('#anio_modelo');

        var modalCC = $('#modalArticulo');



        function cleanserie() {
            cleanRequired();
            titleModalSerie.html('');
            cPlacaVeh.val('');
            producto.val('');
            serie_id.val('');
            p_product_name.val('');
            msg_cont.addClass('hide');
            tipoCompra.val('');
            nrPoliza.val('');
            nrLote.val('');
            serie.val('');
            chasis.val('');
            motor.val('');
            color.val('');
            anio_fabricacion.val('');
            anio_modelo.val('');
        };
        modalSerie.on('hidden.bs.modal', function (e) {
            cleanserie();
        });

        function newSerie() {
            titleModalSerie.html('Nueva Serie');
            $('#anio_fabricacion').attr('onkeypress', 'return soloNumeros(event)');
            $('#anio_modelo').attr('onkeypress', 'return soloNumeros(event)');
            modalSerie.modal('show');
        }

        $scope.type_cc = '';
        $scope.openCC = function (type) {
            $scope.type_cc = type;

            $.post("series/validar_registro", { producto_id: $("#p_product_id").val() },
                function (data, textStatus, jqXHR) {
                    // console.log(data);

                    if (data.data.TransaccionDetalle.length > 0 || data.data.MovimientoDetalle.length > 0) {
                        if (data.data.TransaccionDetalle.length > 0) {
                            AlertFactory.textType({
                                title: '',
                                message: "Ya se encuentra registrado en TransaccionDetalle",
                                type: 'info'
                            });
                        }

                        if (data.data.MovimientoDetalle.length > 0) {
                            AlertFactory.textType({
                                title: '',
                                message: "Ya se encuentra registrado en MovimientoDetalle",
                                type: 'info'
                            });
                        }

                    } else {
                        modalCC.modal('show');
                        $('#search_cc2').val('');
                        $('#LoadRecordsButtonCC2').click();
                    }
                },
                "json"
            );


        };
        $scope.clearCC = function (type) {
            $.post("series/validar_registro", { producto_id: $("#p_product_id").val() },
                function (data, textStatus, jqXHR) {
                    // console.log(data);

                    if (data.data.TransaccionDetalle.length > 0 || data.data.MovimientoDetalle.length > 0) {
                        if (data.data.TransaccionDetalle.length > 0) {
                            AlertFactory.textType({
                                title: '',
                                message: "Ya se encuentra registrado en TransaccionDetalle",
                                type: 'info'
                            });
                        }

                        if (data.data.MovimientoDetalle.length > 0) {
                            AlertFactory.textType({
                                title: '',
                                message: "Ya se encuentra registrado en MovimientoDetalle",
                                type: 'info'
                            });
                        }

                    } else {
                        producto.val('');
                        p_product_name.val('');
                    }
                },
                "json"
            );

        };
        $scope.saveserie = function () {
            msg_cont.addClass('hide');
            var bval = true;
            bval = bval && producto.required();
            if (!bval) {
                msg_cont.removeClass('hide');
                return false;
            }
            bval = bval && serie.required();
            // bval = bval && chasis.required();
            // bval = bval && motor.required();
            // bval = bval && color.required();
            // bval = bval && anio_fabricacion.required();
            // bval = bval && anio_modelo.required();
            if (bval) {
                var params = {
                    'idArticulo': producto.val(),
                    'nombreSerie': serie.val(),
                    'chasis': chasis.val(),
                    'motor': motor.val(),
                    'color': color.val(),
                    'anio_modelo': anio_modelo.val(),
                    'anio_fabricacion': anio_fabricacion.val(),
                    'idTipoCompraVenta': tipoCompra.val(),
                    'nPoliza': nrPoliza.val(),
                    'nLoteCompra': nrLote.val(),
                    'cPlacaVeh': cPlacaVeh.val(),
                };
                var serieIde_id = (serie_id.val() === '') ? 0 : serie_id.val();

                RESTService.updated('series/createserie', serieIde_id, params, function (response) {
                    if (!_.isUndefined(response.status) && response.status) {
                        // AlertFactory.textType({
                        //     title: '',
                        //     message: 'El registro se guardó correctamente con el código '+response.code,
                        //     type: 'success'
                        // });
                        modalSerie.modal('hide');
                        LoadRecordsButtonSerie.click();
                    } else {
                        var msg_ = (_.isUndefined(response.message)) ?
                            'No se pudo guardar la Serie. Intente nuevamente.' : response.message;
                        AlertFactory.textType({
                            title: '',
                            message: msg_,
                            type: 'info'
                        });
                    }
                });
            }

        };

        function findserie(id) {
            titleModalSerie.html('Editar serie');
            RESTService.get('series/find', id, function (response) {
                if (!_.isUndefined(response.status) && response.status) {
                    var data_p = response.data;
                    console.log(data_p);
                    producto.val(data_p[0].idArticulo);
                    p_product_name.val(data_p[0].Articulo);
                    serie_id.val(data_p[0].idSerie);
                    serie.val(data_p[0].nombreSerie);
                    chasis.val(data_p[0].chasis);
                    motor.val(data_p[0].motor);
                    color.val(data_p[0].color);
                    anio_fabricacion.val(data_p[0].anio_fabricacion);
                    anio_modelo.val(data_p[0].anio_modelo);
                    tipoCompra.val(data_p[0].idTipoCompraVenta).trigger('change');;
                    nrPoliza.val(data_p[0].nPoliza);
                    nrLote.val(data_p[0].nLoteCompra)
                    cPlacaVeh.val(data_p[0].cPlacaVeh)
                    modalSerie.modal('show');
                } else {
                    AlertFactory.textType({
                        title: '',
                        message: 'Hubo un error al obtener el serie. Intente nuevamente.',
                        type: 'error'
                    });
                }
            });
        }

        var search = getFormSearch('frm-search-Serie', 'search_Serie', 'LoadRecordsButtonSerie');

        var table_container_Serie = $("#table_container_Serie");

        function getDataFormSerie() {
            RESTService.all('series/data_form', '', function (response) {
                console.log("ddd");
                if (!_.isUndefined(response.status) && response.status) {
                    tipoCompra.append('<option value="" selected>Seleccionar</option>');
                    console.log(response.tipoCompra);
                    console.log("eee");
                    _.each(response.tipoCompra, function (item) {
                        tipoCompra.append('<option value="' + item.idTipoCompraVenta + '">' + item.descripcion + '</option>');
                    });
                }
            }, function () {
                getDataFormSerie();
            });
        }
        getDataFormSerie();

        table_container_Serie.jtable({
            title: "Lista de Series",
            paging: true,
            sorting: true,
            actions: {
                listAction: base_url + '/series/list',
                deleteAction: base_url + '/series/delete',
            },
            toolbar: {
                items: [{
                    cssClass: 'buscador',
                    text: search
                }, {
                    cssClass: 'btn-primary',
                    text: '<i class="fa fa-file-excel-o"></i> Exportar a Excel',
                    click: function () {
                        $scope.openDoc('series/excel', {});
                    }
                },
                {
                    cssClass: 'btn-danger-admin',
                    text: '<i class="fa fa-plus"></i> Nueva Serie',
                    click: function () {
                        newSerie();
                    }
                }

                ]
            },
            fields: {
                idSerie: {
                    key: true,
                    create: false,
                    edit: false,
                    list: false
                },
                cPlacaVeh: {
                    title: 'Placa',
                },
                serie: {
                    title: 'Serie',


                },
                idArticulo: {
                    title: 'Artículo',

                    options: base_url + '/series/getArticulos'
                },

                chasis: {
                    title: 'Chasis',
                },

                motor: {
                    title: 'Motor',
                },

                anio_fabricacion: {
                    title: 'Año de Fabricación',
                },

                anio_modelo: {
                    title: 'Año del Modelo',
                },
                edit: {
                    width: '1%',
                    sorting: false,
                    edit: false,
                    create: false,
                    listClass: 'text-center',
                    display: function (data) {
                        return '<a href="javascript:void(0)" class="edit-serie" data-id="' + data.record.idSerie
                            + '" title="Editar"><i class="fa fa-edit fa-1-5x"></i></a>';
                    }
                }


            },

            recordsLoaded: function (event, data) {
                $('.edit-serie').click(function (e) {
                    var id = $(this).attr('data-id');
                    findserie(id);
                    e.preventDefault();
                });
            }

        });

        generateSearchForm('frm-search-Serie', 'LoadRecordsButtonSerie', function () {
            table_container_Serie.jtable('load', {
                search: $('#search_Serie').val()
            });
        }, true);

        modalCC.on('hidden.bs.modal', function (e) {
            modalSerie.attr('style', 'display:block;');
        });
        modalCC.on('show.bs.modal', function (e) {
            modalSerie.attr('style', 'display:block; z-index:2030 !important');
        });
        var search_cc2 = getFormSearch('frm-search-cc2', 'search_cc2', 'LoadRecordsButtonCC2');
        var table_container_cc2 = $("#table_container_cc2");
        table_container_cc2.jtable({
            title: "Lista de Articulos",
            paging: true,
            sorting: true,
            actions: {
                listAction: base_url + '/series/getArticulosSerie'
            },
            toolbar: {
                items: [{
                    cssClass: 'buscador',
                    text: search_cc2
                }]
            },
            fields: {
                id: {
                    key: true,
                    create: false,
                    edit: false,
                    list: false
                },
                description: {
                    title: 'Articulos'

                },
                select: {
                    width: '1%',
                    sorting: false,
                    edit: false,
                    create: false,
                    listClass: 'text-center',
                    display: function (data) {
                        return '<a href="javascript:void(0)" title="Seleccionar" class="select_cc" data-name="' +
                            data.record.description + '" data-code="' + data.record.id + '"><i class="fa fa-' +
                            icon_select + ' fa-1-5x"></i></a>';
                    }
                }
            },
            recordsLoaded: function (event, data) {
                $('.select_cc').click(function (e) {
                    var code = $(this).attr('data-code');
                    var name_cc = $(this).attr('data-name');
                    producto.val(code);
                    p_product_name.val(name_cc);
                    modalCC.modal('hide');
                    e.preventDefault();
                });
            }
        });

        generateSearchForm('frm-search-cc2', 'LoadRecordsButtonCC2', function () {
            table_container_cc2.jtable('load', {
                search: $('#search_cc2').val()
            });
        }, false);

    }

    function Config($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('series', {
                url: '/series',
                templateUrl: base_url + '/templates/series/base.html',
                controller: 'SerieCtrl'
            });

        $urlRouterProvider.otherwise('/');
    }
})
    ();