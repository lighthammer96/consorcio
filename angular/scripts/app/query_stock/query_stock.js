/**
 * Created by JAIR on 4/5/2017.
 */

(function () {
    'use strict';
    angular.module('sys.app.query_stocks')
        .config(Config)
        .controller('Query_StockCtrl', Query_StockCtrl);

    Config.$inject = ['$stateProvider', '$urlRouterProvider'];
    Query_StockCtrl.$inject = ['$scope', '_', 'RESTService', 'AlertFactory', 'Notify'];

    function Query_StockCtrl($scope, _, RESTService, AlertFactory, Notify) {

        $scope.chkState = function () {
            var txt_state2 = (w_state.prop('checked')) ? 'Activo' : 'Inactivo';
            state_state.html(txt_state2);
        };

        var search = getFormSearch2('frm-search-Query_Stock', 'search_b', 'LoadRecordsButtonQuery_Stock');

        var table_container_Query_Stock = $("#table_container_Query_Stock");
        var filtro_idAlm = '<select id="filtro_idAlm" class="form-control input-sm""><option value="">Almacen</option></select>';
        var filtro_idLoc = '<select id="filtro_idLoc" class="form-control input-sm""><option value="">Localizacion</option></select>';
        var filtro_cate = '<select id="filtro_cate" class="form-control input-sm""><option value="">Categoría</option></select>';
        var filtro_art = '<select id="filtro_art"  style="width: 100%" class="form-control input-sm""><option value="">Árticulo</option></select>';

        // var data_stock={Almacen: "Piso N° 1",Articulo: "MOTOCAR NL 150",Categoria: "TRIMOVIL",Costo_Promedio_Unitario: "6400.00",Costo_Total: "6400.00",Disponible: "1.0000",Localizacion: "E-F1-C1",Lote: "",Remitido: ".0000",Serie: "8WAKRFS51ML048094",Total: "1.0000",Transito: ".0000",Unidad: "UND",id: "6524" };
        var btn_exportar_QS = $("#btn_exportar_QS");

        table_container_Query_Stock.jtable({
            title: "Lista de Articulos con Stock",
            paging: true,
            sorting: true,
            actions: {
                listAction: base_url + '/query_stocks/list',
                // createAction: base_url + '/query_stocks/create',
                // updateAction: base_url + '/query_stocks/update',
                // deleteAction: base_url + '/query_stocks/delete',
            },
            messages: {
                addNewRecord: 'Nueva Categoría',
                editRecord: 'Editar Categoría',
            },
            toolbar: {
                items: [
                    {
                        cssClass: 'buscador',
                        text: search
                    }]
            },
            fields: {
                id: {
                    title: '#',
                    key: true,
                    create: false,
                    edit: false,
                    list: true
                },
                code_article: {
                    title: 'Cod. Artículo',
                },
                Articulo: {
                    title: 'Articulo'
                },
                Categoria: {
                    title: 'Categoria'
                },
                Unidad: {
                    title: 'Uni.',
                    width: '3%'
                },
                Almacen: {
                    title: 'Alm.',
                    width: '6%'
                },
                Localizacion: {
                    title: 'Loc.',
                    width: '6%'
                },
                Lote: {
                    title: 'Lote'
                },
                Serie: {
                    title: 'Serie'
                },
                tipoCompraVenta: {
                    title: 'Tipo Compra Venta',
                    listClass: 'text-right',
                    width: '3%'
                },
                Disponible: {
                    title: 'Disponible',
                },
                Remitido: {
                    title: 'Remitido',
                    listClass: 'text-right',
                    width: '3%'
                },
                Total: {
                    title: 'S.Total',
                    listClass: 'text-right',
                    width: '3%'
                },
                Transito: {
                    title: 'Tránsito',
                    listClass: 'text-right',
                    width: '3%'
                },
                Costo_Promedio_Unitario: {
                    title: 'Costo',
                    listClass: 'text-right',
                    width: '3%'
                },
                Costo_Total: {
                    title: 'C.Total',
                    listClass: 'text-right',
                    width: '3%'
                },
                Chasis: {
                    title: 'Chasis',
                    listClass: 'text-right',
                    width: '3%'
                },
                Motor: {
                    title: 'Motor',
                    listClass: 'text-right',
                    width: '3%'
                },
                Color: {
                    title: 'Color',
                    listClass: 'text-right',
                    width: '3%'
                },
                Ano: {
                    title: 'Año',
                    listClass: 'text-right',
                    width: '3%'
                },
                Ingreso: {
                    title: 'Ingreso',
                    listClass: 'text-right',
                    width: '3%'
                }
            },


            formCreated: function (event, data) {
                data.form.find('input[name="Categoria"]').attr('onkeypress', 'return soloLetras(event)');
                $('#Edit-estado').parent().addClass('i-checks');

                $('.i-checks').iCheck({
                    checkboxClass: 'icheckbox_square-green'
                }).on('ifChanged', function (e) {
                    $(e.target).click();
                    if (e.target.value == 'A') {
                        $("#Edit-estado").val("I");
                        $(".i-checks span").text("Inactivo");

                    } else {
                        $("#Edit-estado").val("A");
                        $(".i-checks span").text("Activo");
                    };
                });
            },
            formSubmitting: function (event, data) {
                var bval = true;
                bval = bval && data.form.find('input[name="Categoria"]').required();
                return bval;
            }
        });

        generateSearchForm('frm-search-Query_Stock', 'LoadRecordsButtonQuery_Stock', function () {
            table_container_Query_Stock.jtable('load', {
                search: '',
                filtro_art: $('#filtro_art').val(),
                filtro_idAlm: $('#filtro_idAlm').val(),
                filtro_idLoc: $('#filtro_idLoc').val(),
                filtro_cate: $('#filtro_cate').val(),
            });
        }, false);

        getDataFiltro();
        $('#filtro_art').select2();
        $('#filtro_idAlm').change(function () {
            var descrip = $('#filtro_idAlm').val();
            RESTService.get('query_stocks/get_localizacion', descrip, function (response) {
                filtro_idLoc.html("");
                filtro_idLoc.append('<option value="">Localización</option>');
                _.each(response.localizaciones, function (item) {
                    filtro_idLoc.append('<option value="' + item.descripcion + '">' + item.descripcion + '</option>');
                });
            });
        });
        function getDataFiltro() {
            filtro_idAlm = $('#filtro_idAlm');
            filtro_idLoc = $('#filtro_idLoc');
            filtro_cate = $('#filtro_cate');
            filtro_art = $('#filtro_art');

            // filtro_idAlm.empty().change(function () {
            //     $('#LoadRecordsButtonQuery_Stock').click();
            // });
            RESTService.all('query_stocks/getDataFiltro', '', function (response) {
                if (!_.isUndefined(response.status) && response.status) {
                    // matrix = response.levels;
                    // matrix_apu = response.apu;
                    filtro_idAlm.append('<option value="">Almacén</option>');
                    _.each(response.d_Almacen, function (item) {
                        filtro_idAlm.append('<option value="' + item.description + '">' + item.description + '</option>');
                    });
                    filtro_idLoc.append('<option value="">Localización</option>');
                    // _.each(response.d_localizacion, function (item) {
                    //     filtro_idLoc.append('<option value="' + item.descripcion + '">' + item.descripcion + '</option>');
                    // });
                    filtro_cate.append('<option value="">Categoría</option>');
                    _.each(response.d_categoria, function (item) {
                        filtro_cate.append('<option value="' + item.descripcion + '">' + item.descripcion + '</option>');
                    });
                    filtro_art.append('<option value="">Artículo</option>');
                    _.each(response.d_articulo, function (item) {
                        filtro_art.append('<option value="' + item.code_article + '">' + item.code_article + ' ' + item.description + '</option>');
                    });
                    // data_stock=response.data_complete;
                    // console.log(data_stock);
                    // project_unities = response.unity;
                    // generateSearchProject();
                } else {
                    getDataFiltro();
                }
            }, function () {
                getDataFiltro();
            });
        }
        $("#btn_exportar_QS").click(function (e) {
            var data_excel = {
                filtro_idAlm: $('#filtro_idAlm').val(),
                filtro_idLoc: $('#filtro_idLoc').val(),
                filtro_cate: $('#filtro_cate').val(),
                filtro_art: $('#filtro_art').val(),
                search: '',
            };
            //             $scope.openDoc('projects/excel', data_excel);
            $scope.openDoc('query_stocks/excel', data_excel);
        });
        $("#btn_exportar_QS_PDF").click(function (e) {
            var data_pdf = {
                filtro_idAlm: $('#filtro_idAlm').val(),
                filtro_idLoc: $('#filtro_idLoc').val(),
                filtro_cate: $('#filtro_cate').val(),
                filtro_art: $('#filtro_art').val(),
                search: '',
            };
            $scope.loadQueryStockPDF('query_stocks/pdf', data_pdf);
            //             $scope.openDoc('projects/excel', data_pdf);
            // $scope.openDoc('query_movements/pdf',data_pdf);
        });
        $(".jtable-title-text").removeClass('col-md-4');
        $(".jtable-title-text").addClass('col-md-3');

        $(".jtable-toolbar").removeClass('col-md-8');
        $(".jtable-toolbar").addClass('col-md-9');
    }

    function Config($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('query_stocks', {
                url: '/query_stocks',
                templateUrl: base_url + '/templates/query_stocks/base.html',
                controller: 'Query_StockCtrl'
            });

        $urlRouterProvider.otherwise('/');
    }
})
    ();
