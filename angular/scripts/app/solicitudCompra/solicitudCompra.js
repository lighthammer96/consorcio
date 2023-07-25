/**
 * Created by JAIR on 4/5/2017.
 */

(function () {
    'use strict';
    angular.module('sys.app.solicitudCompras')
        .config(Config)
        .controller('SolicitudCompraCtrl', SolicitudCompraCtrl);

    Config.$inject = ['$stateProvider', '$urlRouterProvider'];
    SolicitudCompraCtrl.$inject = ['$scope', '_', 'RESTService'];

    function SolicitudCompraCtrl($scope, _, RESTService)
    {
        var date_now = moment.tz('America/Lima').format('DD/MM/YYYY');

        var modalSol = $("#modalSol");
        modalSol.on('hidden.bs.modal', function (e) {
            cleanSol();
        });
        var titleSol = $("#titleSol");
        var modalArticle = $("#modalArticle");
        modalArticle.on('show.bs.modal', function (e) {
            $('#search_art').val('');
            clearRowsSol();
            $('#LoadRecordsButtonArt').click();
            modalSol.attr('style', 'display:block; z-index:2030 !important');
        });
        modalArticle.on('hidden.bs.modal', function (e) {
            $('#LoadRecordsButtonArt').click();
            modalSol.attr('style', 'display:block; overflow-y: auto;');
        });

        var s_id = 0;
        var s_state_id = 0;
        var s_consecutive = $("select#s_consecutive");
        var s_nro_consecutive = $("input#s_nro_consecutive");
        var s_date_register = $("input#s_date_register");
        s_date_register.val(date_now);
        generateDatePicker(s_date_register);
        var s_state = $("input#s_state");
        var s_priority = $("select#s_priority");
        var s_date_required = $("input#s_date_required");
        s_date_required.val(date_now);
        generateDatePicker(s_date_required);
        var s_area = $("select#s_area");
        var s_observations = $("textarea#s_observations");
        var s_detail = $("tbody#s_detail");

        var btn_add_article = $("button#btn_add_article");
        var btn_movimiento_guardar = $("button#btn_movimiento_guardar");
        var btn_movimiento_aprobar = $("button#btn_movimiento_aprobar");
        var btn_movimiento_cancelar = $("button#btn_movimiento_cancelar");
        var btn_movimiento_cerrar = $("button#btn_movimiento_cerrar");

        // var aartML = []; //arrays para guardas los datos de lotes
        // var acodigos = [];//arrays de codigos;
        // var tipoCompra = []; //variable que contendrá los tipos de  compras
        // var aartMK = []; //arrays de id kits
        // var aartMLE = [];//arrays lotes exis
        // var naturalezaGeneral = 'E';
        // var aartMSN = [];//ARRAY DE series nueva
        // var aartMSE = [];//array series  exis
        var aartMN = [];//arrays de nada
        // var LocalizacionesSele;//variable para guardar localizaciones del almacen
        // var AlmacenesSele = [];//variable para guardar almacenes

        // var modalLote = $("#modalLote");
        // var modalNada = $("#modalNada");
        // modalNada.on('show.bs.modal', function (e) {
        //     modalArticle.attr('style', 'display:block; z-index:2030 !important');
        // });
        // modalNada.on('hidden.bs.modal', function (e) {
        //     cleanArtNada();
        //     modalArticle.attr('style', 'display:block; overflow-y: auto;');
        // });
        // var s_lote_ml_id = '';
        // var s_product_ml_id = '';
        // var desProductoML = $("#desProductoML");
        // var cantProductoML = $("#cantProductoML");
        // var lotProductoML = $("#lotProductoML");
        // var fIngrePrML = $("#fIngrePrML");
        // var fVenPrML = $("#fVenPrML");
        // var idSerieMS = $("#idSerieMS");
        // var idProductoMS = $("#idProductoMS");
        // var desProductoMS = $("#desProductoMS");
        // var cantProductoMS = $("#cantProductoMS");
        // var colorMS = $("#colorMS");
        // var chasisMS = $("#chasisMS");
        // var motorMS = $("#motorMS");
        // var anio_modeloMS = $("#anio_modeloMS");
        // var anio_fabricacionMS = $("#anio_fabricacionMS");
        // var s_lote_ml2_id = '';
        // var s_product_nad_id = '';
        // var desProductoMN = $("#desProductoMN");
        // var cantProductoMN = $("#cantProductoMN");
        // var s_product_m_id = '';
        // var desProductoMll = $("#desProductoMll");
        // var cantProductoMll = $("#cantProductoMll");
        // var modalLoteR = $("#modalLoteR");
        // var codigoLoteMll = $("#codigoLoteMll");
        // var fechaVl = $("#fechaVl");
        // var modalSerieR = $("#modalSerieR");
        // var s_product_ser_id = '';
        // var desProductoMss = $("#desProductoMss");
        // var btn_Lotd = $("#btn_Lotd");
        // var cantProductoMss = $("#cantProductoMss");
        // var table_serie_cabecera = $("#table_serie_cabecera");
        // var articulo_serie_det = $("#articulo_serie_det");
        // var btnAgreSer = $("#btnAgreSer");
        // var identiSelec = "I";
        // var table_container_cc4;
        // var btn_serC = $("#btn_serC");
        // var cont_check = 0;
        // var cont_table = 0;
        // var s_lote_m = '';
        // var s_lote_m2 = '';
        // var s_art_serie = '';//identificador para modificar el array de series esxisten
        // var btnSeleSerie = $("#btnSeleSerie");

        // $('.i-checks').iCheck({
        //     checkboxClass: 'icheckbox_square-green'
        // }).on('ifChanged', function (event) {
        //     $(event.target).click();
        //     $scope.chkState();
        // });

        // modalLote.on('hidden.bs.modal', function (e) {
        //     cleanArtLote();
        // });
        // modalSerieR.on('hidden.bs.modal', function (e) {
        //     cleanArtSeriess();
        // });
        // modalLoteR.on('hidden.bs.modal', function (e) {
        //     cleanArtLotell();
        // });

        function cleanSol() {
            cleanRequired();
            titleSol.empty();
            s_id = 0;
            s_state_id = 0;
            if (s_consecutive.html() !== '') {
                s_consecutive.val(s_consecutive.find('option:first').val());
            }
            s_consecutive.prop('disabled', false);
            s_nro_consecutive.val('');
            s_date_register.val(date_now).prop('disabled', false);
            s_state.val('');
            s_priority.val('').prop('disabled', false);
            s_date_required.val(date_now).prop('disabled', false);
            s_area.val('').prop('disabled', false);
            s_observations.val('').prop('disabled', false);
            s_detail.empty();

            // aartML = [];
            // acodigos = [];
            // aartMK = [];
            // aartMLE = [];
            // aartMSN = [];
            // aartMSE = [];
            // aartMN = [];

            btn_add_article.removeClass('hide');
            btn_movimiento_guardar.removeClass('hide');
            btn_movimiento_aprobar.addClass('hide');
            btn_movimiento_cancelar.addClass('hide');
            btn_movimiento_cerrar.addClass('hide');
        }

        function getDataSol() {
            RESTService.all('solicitudCompras/data_form', '', function (response) {
                if (!_.isUndefined(response.status) && response.status) {
                    s_consecutive.empty();
                    _.each(response.consecutive, function (con) {
                        s_consecutive.append('<option value="' + con + '">' + con + '</option>');
                    });
                    s_area.html('<option value="">--Seleccionar--</option>');
                    _.each(response.area, function (item) {
                        s_area.append('<option value="' + item.id + '">' + item.text + '</option>');
                    });
                    // AlmacenesSele = response.almacen_usuario;
                    // tipoCompra = response.tipoCompra;
                }
            }, function () {
                getDataSol();
            });
        }

        getDataSol();

        function newSol() {
            titleSol.html('Nueva Solicitud de Compra');
            modalSol.modal('show');
        }

        $scope.saveSol = function (state) {
            saveSol(state);
        };

        function saveSol(state_) {
            var b_val = true, params, msg_;
            if (state_ === 0 || state_ === 1) {
                b_val = b_val && s_consecutive.required();
                b_val = b_val && s_date_register.required();
                b_val = b_val && s_priority.required();
                b_val = b_val && s_date_required.required();
                b_val = b_val && s_area.required();
                if (b_val) {
                    var date_req = moment(s_date_required.val(), 'DD/MM/YYYY');
                    var date_reg = moment(s_date_register.val(), 'DD/MM/YYYY');
                    if (date_reg.diff(date_req, 'days', true) > 0) {
                        $scope.showAlert('', 'La fecha requerida no puede ser menor a fecha registro', 'warning');
                        return false;
                    }
                }
                if (b_val) {
                    if (state_ === 1 && s_detail.html() === '') {
                        $scope.showAlert('', 'Debe agregar minimo 1 articulo', 'warning');
                        return false;
                    }
                    var detail_ = [], valid_q = true, valid_date = true;
                    _.each(s_detail.find('tr'), function (tr) {
                        tr = $(tr);
                        var q_ = tr.find('input.s_q').val();
                        if (q_ === '' || parseFloat(q_) === 0) {
                            valid_q = false;
                        }
                        var date_ = tr.find('input.s_date').val();
                        var date_req_art = moment(date_, 'DD/MM/YYYY');
                        var date_reg = moment(s_date_register.val(), 'DD/MM/YYYY');
                        if (date_reg.diff(date_req_art, 'days', true) > 0) {
                            valid_date = false;
                        }
                        detail_.push({
                            'id': tr.attr('data-code'),
                            'q': q_,
                            'date': date_,
                            'observations': tr.find('input.s_observations').val(),
                        });
                    });
                    if (!valid_q && state_ === 1) {
                        $scope.showAlert('', 'No debe ingresar cantidades vacías o igual a 0 para cada artículo', 'warning');
                        return false;
                    }
                    if (!valid_date && state_ === 1) {
                        $scope.showAlert('', 'La fecha requerida del articulo no puede ser menor a fecha registro', 'warning');
                        return false;
                    }
                    params = {
                        'estado': state_,
                        'cCodConsecutivo': s_consecutive.val(),
                        'fecha_registro': s_date_register.val(),
                        'prioridad': s_priority.val(),
                        'fecha_requerida': s_date_required.val(),
                        'idArea': s_area.val(),
                        'observaciones': s_observations.val(),
                        'detail': detail_
                    };
                    msg_ = (state_ === 0) ? 'guardar' : 'aprobar';
                    $scope.showConfirm('', '¿Está seguro que desea ' + msg_ + ' la solicitud?', function () {
                        RESTService.updated('solicitudCompras/save', s_id, params, function (response) {
                            if (!_.isUndefined(response.status) && response.status) {
                                msg_ = (state_ === 0) ? 'guardó' : 'aprobó';
                                $scope.showAlert('', 'La solicitud se ' + msg_ + ' correctamente', 'success');
                                if (state_ === 0) {
                                    s_consecutive.prop('disabled', true);
                                    s_nro_consecutive.val(response.data.number);
                                    s_state.val(response.data.state);
                                    s_id = response.data.code;
                                    btn_movimiento_aprobar.removeClass('hide');
                                } else {
                                    modalSol.modal('hide');
                                }
                                $('button#LoadRecordsButtonSol').click();
                            } else {
                                $scope.showAlert('', response.message, 'warning');
                            }
                        });
                    });
                }
            } else if (state_ === 3 || state_ === 4) {
                params = {
                    'state': state_,
                };
                msg_ = (state_ === 3) ? 'cerrar' : 'cancelar';
                $scope.showConfirm('', '¿Está seguro que desea ' + msg_ + ' la solicitud?', function () {
                    RESTService.updated('solicitudCompras/cambiarEstado', s_id, params, function (response) {
                        if (!_.isUndefined(response.status) && response.status) {
                            msg_ = (state_ === 3) ? 'cerró' : 'canceló';
                            $scope.showAlert('', 'La solicitud se ' + msg_ + ' correctamente', 'success');
                            modalSol.modal('hide');
                            $('button#LoadRecordsButtonSol').click();
                        } else {
                            $scope.showAlert('', response.message, 'warning');
                        }
                    });
                });
            }
        }

        function findSolicitudCompra(id) {
            RESTService.get('solicitudCompras/find', id, function (response) {
                if (!_.isUndefined(response.status) && response.status) {
                    var data_p = response.data;
                    s_id = id;
                    s_state_id = parseInt(data_p.estado);
                    var disabled_ = (s_state_id > 0);
                    s_consecutive.val(data_p.cCodConsecutivo).prop('disabled', true);
                    s_nro_consecutive.val(data_p.nConsecutivo);
                    s_date_register.val(data_p.fecha_registro).prop('disabled', disabled_);
                    s_state.val(data_p.state);
                    s_priority.val(data_p.prioridad).prop('disabled', disabled_);
                    s_date_required.val(data_p.fecha_requerida).prop('disabled', disabled_);
                    s_area.val(data_p.idArea).prop('disabled', disabled_);
                    s_observations.val(data_p.observaciones).prop('disabled', disabled_);
                    _.each(data_p.detail, function (det) {
                        addArticleDetail(det);
                    });

                    // var lotE = response.data_movimiento_lote;
                    // var serE = response.data_movimiento_serie;

                    // naturalezaGeneral = data_p.naturaleza;
                    // aartMLE = [];
                    // aartMSE = [];
                    // if (lotE != '') {
                    //     lotE.map(function (index) {
                    //         var grubLE = {
                    //             'identificador': index.consecutivo,
                    //             'idProducto': index.idArticulo,
                    //             'idLote': index.idLote,
                    //             'fecha_vencimiento': index.fechaVencimiento,
                    //             'codig_lote': index.Lote,
                    //         }
                    //         aartMLE.push(grubLE);
                    //     });
                    // }
                    // if (serE != '') {
                    //     serE.map(function (index) {
                    //         var grubSE = {
                    //             'identificador': index.identificador,
                    //             'idProducto': index.idArticulo,
                    //             'serie': index.nombreSerie,
                    //             'idSerie': index.idSerie,
                    //             'cantidad': index.cantiTotal,
                    //         }
                    //         aartMSE.push(grubSE);
                    //     });
                    // }

                    if (s_state_id === 0) {
                        btn_movimiento_aprobar.removeClass('hide');
                    } else {
                        btn_add_article.addClass('hide');
                        btn_movimiento_guardar.addClass('hide');
                    }
                    if (s_state_id === 1) {
                        btn_movimiento_cancelar.removeClass('hide');
                    } else if (s_state_id === 2) {
                        btn_movimiento_cerrar.removeClass('hide');
                    }
                    // var mov_ar = response.movimiento_Ar;
                    // s_detail.empty();
                    // mov_ar.map(function (index) {
                    //     var ver = 'A';
                    //     var tipo = 'NA';
                    //     var codl = "";
                    //     var datl = "";
                    //     var obser = index.observaciones;
                    //     if (index.observaciones == null) {
                    //         obser = '';
                    //     }
                    //     addArticleDetail(index.consecutivo, index.idArticulo, index.description,
                    //         Math.trunc(index.cantidad), ver, index.consecutivo, tipo, codl, datl, index.estado,
                    //         index.fecha_requerida_ad, index.unidaMedida, obser);
                    // });
                    var txt_ = (s_state_id > 1) ? '' : 'Editar ';
                    titleSol.html(txt_ + 'Solicitud Compra');
                    modalSol.modal("show");
                } else {
                    $scope.showAlert('', response.message, 'warning');
                }
            });
        }

        var search = getFormSearch('frm-search-sol', 'search_b', 'LoadRecordsButtonSol');

        var table_container_sol = $("#table_container_sol");

        table_container_sol.jtable({
            title: "Lista de Solicitudes Compras",
            paging: true,
            actions: {
                listAction: base_url + '/solicitudCompras/list',
                deleteAction: base_url + '/solicitudCompras/delete',
            },
            toolbar: {
                items: [{
                    cssClass: 'buscador',
                    text: search
                }, {
                    cssClass: 'btn-primary',
                    text: '<i class="fa fa-file-excel-o"></i> Exportar',
                    click: function () {
                        $scope.openDoc('solicitudCompras/excel', {});
                    }
                }, {
                    cssClass: 'btn-danger-admin',
                    text: '<i class="fa fa-plus"></i> Solicitud',
                    click: function () {
                        newSol();
                    }
                }]
            },
            fields: {
                idMovimiento: {
                    key: true,
                    create: false,
                    edit: false,
                    list: false
                },
                cCodConsecutivo: {
                    title: 'Código',
                    listClass: 'text-center'
                },
                nConsecutivo: {
                    title: 'Consecutivo',
                    listClass: 'text-center'
                },
                fecha_registro: {
                    title: 'Fecha Registro',
                    listClass: 'text-center'
                },
                fecha_requerida: {
                    title: 'Fecha Requerida',
                    listClass: 'text-center'
                },
                area_: {
                    title: 'Area'
                },
                user_: {
                    title: 'Usuario'
                },
                observaciones: {
                    title: 'Observaciones'
                },
                state: {
                    title: 'Estado'
                },
                edit: {
                    width: '1%',
                    sorting: false,
                    edit: false,
                    create: false,
                    listClass: 'text-center',
                    display: function (data) {
                        return '<a href="javascript:void(0)" class="edit-sol" data-code="' + data.record.idMovimiento
                            + '" title="Editar"><i class="fa fa-edit fa-1-5x"></i></a>';
                    }
                }
            },
            recordsLoaded: function (event, data) {
                table_container_sol.find('a.edit-sol').click(function (e) {
                    var id = $(this).attr('data-code');
                    findSolicitudCompra(id);
                    e.preventDefault();
                });
            }
        });

        generateSearchForm('frm-search-sol', 'LoadRecordsButtonSol', function () {
            table_container_sol.jtable('load', {
                search: $('#search_b').val()
            });
        }, true);

        var search_art = getFormSearch('frm-search-art', 'search_art', 'LoadRecordsButtonArt');

        var table_container_art = $("#table_container_art");

        table_container_art.jtable({
            title: "Lista de Articulos",
            paging: true,
            selecting: true,
            multiselect: true,
            selectingCheckboxes: true,
            selectOnRowClick: false,
            actions: {
                listAction: base_url + '/solicitudCompras/getArticulosMinKit'
            },
            toolbar: {
                items: [{
                    cssClass: 'buscador',
                    text: search_art
                }]
            },
            fields: {
                id: {
                    key: true,
                    create: false,
                    edit: false,
                    list: false
                },
                code_article: {
                    title: 'Código'
                },
                description: {
                    title: 'Descripción'
                },
                und: {
                    title: 'Unidad Medida'
                },
                // select: {
                //     width: '1%',
                //     sorting: false,
                //     edit: false,
                //     create: false,
                //     listClass: 'text-center',
                //     display: function (data) {
                //         return '<a href="javascript:void(0)" title="Seleccionar" class="select_art" data-code="' +
                //             data.record.id + '"><i class="fa fa-' + icon_select + ' fa-1-5x"></i></a>';
                //     }
                // }
            },
            recordsLoaded: function (event, data) {
                generateCheckBox('.jtable-selecting-column input');
            }
            // recordsLoaded: function (event, data) {
            //     table_container_art.find('a.select_art').click(function (e) {
            //         var code_ = $(this).attr('data-code');
            //         var info = _.find(data.records, function (item) {
            //             return parseInt(item.id) === parseInt(code_);
            //         });
            //         if (info) {
            //             info.q = 0;
            //             info.date = s_date_required.val();
            //             info.observations = '';
            //             info.state = s_state.val();
            //             addArticleDetail(info);
            //         }
            //         e.preventDefault();
            //     });
            // }
        });

        generateSearchForm('frm-search-art', 'LoadRecordsButtonArt', function () {
            table_container_art.jtable('load', {
                search: $('#search_art').val()
            });
        }, false);

        $scope.openArticle = function () {
            modalArticle.modal('show');
        }
        $scope.addArticle = function () {
            var $selectedRows = table_container_art.jtable('selectedRows');
            if ($selectedRows.length > 0) {
                $selectedRows.each(function () {
                    var record = $(this).data('record');
                    record.q = 0;
                    record.date = s_date_required.val();
                    record.observations = '';
                    record.state = s_state.val();
                    addArticleDetail(record);
                });
                modalArticle.modal('hide');
            } else {
                $scope.showAlert('', 'Debe seleccionar minimo 1 articulo', 'warning');
            }
        }
        function addArticleDetail(info) {
            if (s_detail.find('tr[data-code=' +  info.id + ']').length > 0) {
                return;
            }
            var tr_ = $('<tr data-code="' + info.id + '"></tr>');
            tr_.append('<td>' + info.description + '</td>');

            var td_ = $('<td class="text-right"></td>');
            if (s_state_id === 0) {
                td_.append('<input type="text" onkeypress="return validDecimals(event, this, 3)" ' +
                    'onblur="return roundDecimals(this, 2)" onclick="this.select()" ' +
                    'class="form-control input-sm s_q" value="' + info.q + '" />');
            } else {
                td_.append('<span class="s_q">' + info.q + '</span>');
            }
            tr_.append(td_);

            tr_.append('<td>' + info.und + '</td>');

            td_ = $('<td class="text-center"></td>');
            if (s_state_id === 0) {
                td_.append('<input type="text" class="s_date form-control input-sm" value="' + info.date + '" readonly />');
            } else {
                td_.append('<span class="s_date">' + info.date + '</span>');
            }
            tr_.append(td_);

            td_ = $('<td class="text-center"></td>');
            if (s_state_id === 0) {
                td_.append('<input type="text" class="s_observations form-control input-sm" value="' + info.observations + '">');
            } else {
                td_.append('<span class="s_observations">' + info.observations + '</span>');
            }
            tr_.append(td_);

            tr_.append('<td class="text-center s_state">' + info.state + '</td>');

            td_ = $('<td class="text-center"></td>');
            if (s_state_id === 0) {
                td_.append('<button class="btn btn-danger btn-xs del_" title="Eliminar" type="button">' +
                    '<span class="fa fa-trash"></span></button>');
            }
            tr_.append(td_);

            s_detail.append(tr_);

            if (s_state_id === 0) {
                tr_ = s_detail.find('tr[data-code=' + info.id + ']');
                if (info.q === 0) {
                    tr_.find('input.s_q').focus();
                }
                generateDatePicker(tr_.find('input.s_date'));
                s_detail.find('button.del_').off().on('click', function (e) {
                    var tr_ = $(this).closest('tr');
                    $scope.showConfirm('', '¿Está seguro que desea quitar este artículo?', function () {
                        tr_.remove();
                    });
                    e.preventDefault();
                });
            }

            // acodigos.push(codigo);
            // naturalezaGeneral = 'E';
            //
            // var tr = $('<tr id="tr_idArticulo' + codigo + '"></tr>');
            // var td1 = $('<td>' + desProducto + '</td>');
            // var td12 = $('<td>' + unida + '</td>');
            //
            // var td3;
            // var td4;
            // var inp3;

            // if (ver == 'A') {
            //     td3 = $('<td class="text-center"></td>');
            //     inp3 = $('<input type="text" id="canMs_' + codigo + '" onkeypress="return soloNumeros(event)" ' +
            //         'class="m_articulo_cantidad form-control input-sm" value="' + cantProducto + '" />');
            // } else {
            //     td3 = $('<td><p>' + cantProducto + '</p></td>');
            //     inp3 = $('<input type="hidden" id="canMs_' + codigo + '" class="m_articulo_cantidad" value="' + cantProducto + '" />');
            // }
            // td3.append(inp3);
            // var td4 = $('<td class="text-center"></td>');
            // var tdObser = $('<td class="text-center"></td>');
            // var estadoda = $('<select id="estadoEnv_' + codigo + '" class="m_idestado form-control input-sm" disabled ><option value="N"></option><option value="0">Registrado</option><option value="1">Aprobado</option><option value="2">C/Orden de Compra</option><option value="3">Cerrado</option><option value="4">Cancelado</option></select>');
            // var td5 = $('<td class="text-center"></td>');
            // var inp5 = $('<input type="date" id="fechareEnv_' + codigo + '" class="fecharequerida form-control input-sm" value="' + fecharequerida + '" />');
            // var inpObse = $('<input type="input" id="observa_' + codigo + '" class="observrequerida form-control input-sm" value="' + obser + '" />');
            // td4.append(estadoda);
            // td5.append(inp5);
            // tdObser.append(inpObse);
            // var inp = $('<input type="hidden" class="m_articulo_id" value="' + idProducto + '" />');
            // var op = $('<option value="" selected>Seleccione</option>');
            // var fclt = $('<input type="hidden" class="m_codigo_lote" value="' + codl + '" />');
            // var fdlt = $('<input type="hidden" class="m_dato_lote" value="' + datl + '" />');
            // var identificador_serie_bd = $('<input type="hidden" class="identificador_serie_bd" value="' + codigo + '" />');
            // td1.append(inp).append(fclt).append(fdlt).append(identificador_serie_bd);
            // var td6 = $('<td class="text-center"></td>');
            // // var btn1 = $('<button class="btn btn-info btn-xs verUpdate" title="ver" data-cantiShow="' + cantProducto +
            // // '" data-descrip="' + desProducto + '" data-idProducto="' + idProducto + '" data-tShow="' + tipo + '" data-idv="' + codigo + '" type="button"><span class="fa fa-eye"></span></button>');
            // var td8 = $('<td class="text-center"></td>');
            // var btn3 = $('<button class="btn btn-danger btn-xs delMovPro"  data-idDetalle="' + idDetalle + '" data-tipo="' +
            //     tipo + '" title="Eliminar" data-id="' + codigo + '" type="button"><span class="fa fa-trash"></span></button>');
            // // td6.append(btn1);
            // td8.append(btn3);
            // tr.append(td1).append(td3).append(td12).append(td5).append(tdObser).append(td4).append(td6).append(td8);
            // s_detail.append(tr);
            // addAlmaSelec(codigo);
            // addlocSele(codigo);
            // $('#estadoEnv_' + codigo + ' option[value=' + estado + ']').prop('selected', 'selected').change();
            // $('.verUpdate').click(function (e) {
            //     var tipShow = $(this).attr('data-tShow');
            //     var codeShow = $(this).attr('data-idv');
            //     var idProduc = $(this).attr('data-idProducto');
            //     var descrip = $(this).attr('data-descrip');
            //     var cantshow = $(this).attr('data-cantiShow');
            //     // if (tipShow == "SE") {
            //     //     cantProductoMss.val($("#tr_idArticulo" + codeShow).find("td:eq(1)").children("input").val());
            //     //     desProductoMss.val(descrip);
            //     //     s_product_ser_id = idProduc;
            //     //     btnAgreSer.prop('disabled', true);
            //     //     btnAgreSer.trigger('change');
            //     //     btn_serC.prop('disabled', false);
            //     //     btn_serC.trigger('change');
            //     //     s_art_serie = codeShow;
            //     //     if (identiSelec == "A") {
            //     //         table_container_cc4.jtable('destroy');
            //     //     }
            //     //     cargarTableSerie(idProduc, aartMSE);
            //     //
            //     //     modalSerieR.modal('show');
            //     //
            //     // } elseif (tipShow == "SN") {
            //     //     cantProductoMss.val($("#tr_idArticulo" + codeShow).find("td:eq(1)").children("input").val());
            //     //     desProductoMss.val(descrip);
            //     //     s_product_ser_id = idProduc;
            //     //     btnSeleSerie.prop('disabled', true);
            //     //     btnSeleSerie.trigger('change');
            //     //     btn_serC.prop('disabled', false);
            //     //     btn_serC.trigger('change');
            //     //     create_caTableSer();
            //     //     s_art_serie = codeShow;
            //     //     addSerieTable(s_product_ser_id, desProductoMss.val(), cantProductoMss.val(), colorMS, chasisMS, motorMS, anio_modeloMS, anio_fabricacionMS)
            //     //     modalSerieR.modal('show');
            //     // } else
            //     if (tipShow == "LE") {
            //         modalLoteR.modal('show');
            //         s_product_m_id = idProduc;
            //         desProductoMll.val(descrip);
            //         cantProductoMll.val(cantshow);
            //         s_lote_m2 = idProduc;
            //         codigoLoteMll.prop("readonly", true);
            //         codigoLoteMll.trigger('change');
            //         aartMLE.map(function (index) {
            //             if (index.identificador == codeShow) {
            //                 codigoLoteMll.val(index.codig_lote);
            //                 fechaVl.val(index.fecha_vencimiento);
            //                 cantProductoMll.val($("#tr_idArticulo" + codeShow).find("td:eq(1)").children("input").val());
            //             }
            //
            //         })
            //
            //     } else if (tipShow == "LN") {
            //         s_product_ml_id = idProduc;
            //         desProductoML.val(descrip);
            //         s_lote_ml2_id = codeShow;
            //         aartML.map(function (index) {
            //             if (index.identificador == codeShow) {
            //                 lotProductoML.val(index.lote);
            //                 fIngrePrML.val(index.fecha_ingreso);
            //                 cantProductoML.val($("#tr_idArticulo" + codeShow).find("td:eq(1)").children("input").val());
            //                 fVenPrML.val(index.fecha_vencimiento);
            //             }
            //         })
            //         modalLote.modal("show");
            //     }
            //
            // });

            // $('.delMovPro').click(function (e) {
            //     var code = $(this).attr('data-id');
            //     var tip = $(this).attr('data-tipo');
            //     var idDet = $(this).attr('data-idDetalle');
            //     if (s_state_id > 0) {
            //         AlertFactory.textType({
            //             title: '',
            //             message: 'Solo se puede eliminar artículos de una Solicitud de compra en estado registrado',
            //             type: 'info'
            //         });
            //         return false;
            //     }
            //     AlertFactory.confirm({
            //         title: '',
            //         message: '¿Está seguro que desea quitar este Artículo?',
            //         confirm: 'Si',
            //         cancel: 'No'
            //     }, function () {
            //         if (tip == "NA") {
            //             var arrTna = aartMN.filter(function (car) {
            //                 return car.identificador !== code;
            //             })
            //             aartMN = arrTna;
            //         } else if (tip == "K") {
            //             var arrTK = aartMK.filter(function (car) {
            //                 return car.identificador !== code;
            //             })
            //             aartMK = arrTK;
            //         } else if (tip == "LE") {
            //             var arrTLE = aartMLE.filter(function (car) {
            //                 return car.identificador !== code;
            //             })
            //             aartMLE = arrTLE;
            //         } else if (tip == "LN") {
            //             var arrTLN = aartML.filter(function (car) {
            //                 return car.identificador !== code;
            //             })
            //             aartML = arrTLN;
            //         } else if (tip == "SN") {
            //             var arrTSN = aartMSN.filter(function (car) {
            //                 return car.identificador !== code;
            //             })
            //             aartMSN = arrTSN;
            //         } else if (tip == "SE") {
            //             var arrTSE = aartMSE.filter(function (car) {
            //                 return car.identificador !== code;
            //             })
            //             aartMSE = arrTSE;
            //         }
            //         if (s_id !== 0 && idDet != 0) {
            //             var id = s_id + '_' + idDet;
            //             RESTService.get('solicitudCompras/deleteDetalleSC', id, function (response) {
            //                 if (!_.isUndefined(response.status) && response.status) {
            //                     AlertFactory.textType({
            //                         title: '',
            //                         message: 'El Articulo se eliminó correctamente',
            //                         type: 'success'
            //                     });
            //                 } else {
            //                     var msg_ = (_.isUndefined(response.message)) ?
            //                         'No se pudo eliminar. Intente nuevamente.' : response.message;
            //                     AlertFactory.textType({
            //                         title: '',
            //                         message: msg_,
            //                         type: 'error'
            //                     });
            //                 }
            //             });
            //         }
            //         $('#tr_idArticulo' + code).remove();
            //     });
            //     e.preventDefault();
            // });
            // $('.m_articulo_cantidad').keyup(function (e) {
            //     var cantidap = $(this).val();
            //     var costo = $(this).closest("tr").find("td:eq(4)").children("input").val();
            //     var importe = Number(cantidap) * Number(costo);
            //     $(this).closest("tr").find("td:eq(5)").children("p").text(importe.toFixed(2));
            //     $(this).closest("tr").find("td:eq(5)").children("input").val(importe.toFixed(2));
            //     if (naturalezaGeneral == "S" || naturalezaGeneral == "A") {
            //         var preciUni = $(this).closest("tr").find("td:eq(6)").children("input").val();
            //         var precioTotal = Number(cantidap) * Number(preciUni);
            //         $(this).closest("tr").find("td:eq(7)").children("p").text(precioTotal.toFixed(2));
            //         $(this).closest("tr").find("td:eq(7)").children("input").val(precioTotal.toFixed(2));
            //     }
            // })

        }

        function clearRowsSol() {
            $('.jtable-column-header-selecting input').prop('checked', false).iCheck('update');
            $('.jtable-row-selected').removeClass('jtable-row-selected');
        }

        // function cleanArtLote() {
        //     s_lote_ml_id = '';
        //     s_lote_ml2_id = '';
        //     s_product_ml_id = '';
        //     desProductoML.val('');
        //     cantProductoML.val('');
        //     lotProductoML.val('');
        //     fIngrePrML.val('');
        //     fVenPrML.val('');
        // }

        // function cleanArtNada() {
        //     s_product_nad_id = '';
        //     desProductoMN.val("");
        //     cantProductoMN.val("");
        // }

        // function cleanArtLotell() {
        //     s_product_m_id = '';
        //     desProductoMll.val("");
        //     cantProductoMll.val("");
        //     codigoLoteMll.val("");
        //     fechaVl.val("");
        //     btn_Lotd.prop('disabled', true);
        //     btn_Lotd.trigger('change');
        //     codigoLoteMll.prop("readonly", false);
        //     codigoLoteMll.trigger('change');
        //     s_lote_m = '';
        //     s_lote_m2 = '';
        // }

        // function cleanArtSeriess() {
        //     s_product_ser_id = '';
        //     desProductoMss.val("");
        //     cantProductoMss.val("");
        //     btnSeleSerie.prop('disabled', false);
        //     btnSeleSerie.trigger('change');
        //     s_art_serie = '';
        //     if (identiSelec == "A") {
        //         table_container_cc4.jtable('destroy');
        //         identiSelec = "I";
        //     }
        //     table_serie_cabecera.empty();
        //     articulo_serie_det.empty();
        //     btn_serC.prop('disabled', true);
        //     btn_serC.trigger('change');
        // }

        // function cleanSolArticulo() {
        //     articulo_serie_det.empty();
        // }

        // codigoLoteMll.keypress(function (e) {
        //     var code = (e.keyCode ? e.keyCode : e.which);
        //     if (code == 13) {
        //         if (s_lote_m2 === '') {
        //             getlotes();
        //         }
        //     }
        // });
        // cantProductoMN.keypress(function (e) {
        //     var code = (e.keyCode ? e.keyCode : e.which);
        //     if (code == 13) {
        //         addArtNada();
        //     }
        // });

        // function getlotes() {
        //     var id = codigoLoteMll.val();
        //     RESTService.get('solicitudCompras/validateLote', id, function (response) {
        //         if (!_.isUndefined(response.status) && response.status) {
        //             if (response.data == "N") {
        //                 if (naturalezaGeneral == "S") {
        //                     AlertFactory.textType({
        //                         title: '',
        //                         message: 'No existe Lote . Intente nuevamente.',
        //                         type: 'info'
        //                     });
        //                 } else {
        //                     lotProductoML.val(codigoLoteMll.val());
        //                     s_product_ml_id = s_product_m_id;
        //                     desProductoML.val(desProductoMll.val());
        //                     modalLote.modal("show");
        //                 }
        //             } else {
        //                 fechaVl.val(response.fecha);
        //                 s_lote_m = response.codigol;
        //                 btn_Lotd.prop('disabled', false);
        //                 codigoLoteMll.prop("readonly", true);
        //                 codigoLoteMll.trigger('change');
        //                 btn_Lotd.trigger('change');
        //             }
        //
        //         } else {
        //             AlertFactory.textType({
        //                 title: '',
        //                 message: 'Hubo un error . Intente nuevamente.',
        //                 type: 'info'
        //             });
        //         }
        //
        //     });
        // }

        // function addlocSele(codigo) {
        //     var idLocali = $("#" + codigo);
        //     idLocali.append('<option value="" selected>Seleccionar</option>');
        //     _.each(LocalizacionesSele, function (item) {
        //         idLocali.append('<option value="' + item.idLocalizacion + '" >' + item.descripcion + '</option>');
        //     });
        //
        // }
        //
        // function addAlmaSelec(codigo) {
        //     console.log("entro1")
        //     var idAlmacenSele = $("#Al_" + codigo);
        //     idAlmacenSele.append('<option value="" selected>Seleccionar</option>');
        //     _.each(AlmacenesSele, function (item) {
        //         idAlmacenSele.append('<option value="' + item.idAlmacen + '" >' + item.descripcion + '</option>');
        //     });
        // }

        // function getStock(idl,idAl){
        //      var id=idl+','+idAl;
        //      RESTService.get('solicitudCompras/getStockLoc', id, function(response) {
        //          if (!_.isUndefined(response.status) && response.status) {
        //             console.log(response.data);
        //             var stock = Math.trunc(response.data);
        //             $('#tr_idArticulo'+ idAl).find("td:eq(2)").children("p").text(stock);
        //          }else {
        //             AlertFactory.textType({
        //                 title: '',
        //                 message: 'Hubo un error al obtener el Stock. Intente nuevamente.',
        //                 type: 'error'
        //             });
        //         }

        //        });
        // }
        // function getLocaStock(idl, ident, idPrAl, idLocalizacion) {
        //     var idLocali = $("#" + ident);
        //     var id = idl;
        //     RESTService.get('solicitudCompras/getLocaStock', id, function (response) {
        //         if (!_.isUndefined(response.status) && response.status) {
        //             console.log("dddd");
        //             idLocali.empty();
        //             idLocali.append('<option value="" selected>Seleccionar</option>');
        //             _.each(response.LocalizacionAlmacen, function (itemdos) {
        //                 var stock = 0;
        //                 _.each(response.data, function (item) {
        //                     if (idPrAl == item.idArticulo && itemdos.idLocalizacion == item.idLocalizacion) {
        //                         stock = Math.trunc(item.total);
        //                     }
        //                 });
        //                 if (naturalezaGeneral == "S") {
        //                     if (stock > 0) {
        //                         if (itemdos.idLocalizacion == idLocalizacion) {
        //                             idLocali.append('<option selected value="' + itemdos.idLocalizacion + '" >' + itemdos.descripcion + ' / ' + stock + '</option>');
        //                         } else {
        //                             idLocali.append('<option value="' + itemdos.idLocalizacion + '" >' + itemdos.descripcion + ' / ' + stock + '</option>');
        //                         }
        //                     }
        //                 } else {
        //                     if (itemdos.idLocalizacion == idLocalizacion) {
        //
        //                         idLocali.append('<option selected value="' + itemdos.idLocalizacion + '" >' + itemdos.descripcion + ' / ' + stock + '</option>');
        //                     } else {
        //
        //                         idLocali.append('<option value="' + itemdos.idLocalizacion + '" >' + itemdos.descripcion + ' / ' + stock + '</option>');
        //                     }
        //                 }
        //             });
        //         } else {
        //             if (naturalezaGeneral != 'C') {
        //
        //                 AlertFactory.textType({
        //                     title: '',
        //                     message: 'No se pudo obtener las Localizaciones. Intente nuevamente.',
        //                     type: 'info'
        //                 });
        //             }
        //         }
        //
        //     });
        // }

        // function selectArticle(code, description)
        // {
        //     // if (series == '1') {
        //     //     desProductoMss.val(description);
        //     //     s_product_ser_id = code;
        //     //     var nat2 = 'C';
        //     //     if (nat2 == 'S') {
        //     //         btnAgreSer.prop('disabled', true);
        //     //         btnAgreSer.trigger('change');
        //     //     } else {
        //     //         btnAgreSer.prop('disabled', false);
        //     //         btnAgreSer.trigger('change');
        //     //     }
        //     //     modalSerieR.modal('show');
        //     // } else
        //     // if (lot == '1') {
        //     //     modalLoteR.modal('show');
        //     //     s_product_m_id = code;
        //     //     desProductoMll.val(description);
        //     // } else {
        //     $('#cantProductoMN').attr('onkeypress', 'return soloNumeros(event)');
        //     s_product_nad_id = code;
        //     desProductoMN.val(description);
        //     modalNada.modal('show');
        //     // }
        // }

        // $scope.addArtNada = function () {
        //     var b_val = true;
        //     b_val = b_val && cantProductoMN.required();
        //     if (b_val) {
        //         var codigo = Math.random().toString(36).substr(2, 18);
        //         var grubNa = {
        //             'identificador': codigo,
        //             'idProducto': s_product_nad_id,
        //         }
        //         aartMN.push(grubNa);
        //         var ver = 'A';
        //         var tipoArt = 'NA';
        //         var codl = "";
        //         var datl = "";
        //         var estado = "N";
        //         var idpr = s_product_nad_id;
        //         var obser = '';
        //         var idDetalle = 0;
        //         RESTService.get('solicitudCompras/getDataArticulo', idpr, function (response) {
        //             var datapro = response.data;
        //             addArticleDetail(idDetalle, s_product_nad_id, desProductoMN.val(), cantProductoMN.val(), ver,
        //                 codigo, tipoArt, codl, datl, estado, s_date_required.val(), datapro[0].unidadMedida, obser);
        //             // modalNada.modal('hide');
        //             modalArticle.modal('hide');
        //         });
        //     }
        // }

        // function addArticleDetail(idDetalle, idProducto, desProducto, cantProducto, ver, codigo, tipo, codl, datl,
        //                           estado, fecharequerida, unida, obser) {

        // $scope.addtableSerie = function () {
        //     if (identiSelec == "A") {
        //         table_container_cc4.jtable('destroy');
        //     }
        //     identiSelec = "I";
        //     var b_val = true;
        //     b_val = b_val && cantProductoMss.required();
        //     if (b_val) {
        //         create_caTableSer();
        //         addSerieTable(s_product_ser_id, desProductoMss.val(), cantProductoMss.val(), colorMS, chasisMS, motorMS,
        //             anio_modeloMS, anio_fabricacionMS)
        //     }
        // }

        // function create_caTableSer() {
        //     table_serie_cabecera.empty();
        //     btn_serC.prop('disabled', false);
        //     btn_serC.trigger('change');
        //     var html = "<tr>";
        //     html += "<th width='250px'>Artículo</th>";
        //     html += "<th width='250px' height='20px'>Nr° Serie</th>";
        //     html += " <th width='250px' height='20px'>Chasis</th>";
        //     html += "<th width='200px' height='20px'>Motor</th>";
        //     html += "<th width='100px' height='20px'>Color</th>";
        //     html += "<th width='100px' height='20px'>Año fabricación</th>";
        //     html += "<th width='100px' height='20px'>Año Modelo</th>";
        //     html += "<th width='200px' height='20px'>Tipo Compra</th>";
        //     html += "<th width='100px' height='20px'>N° Poliza</th>";
        //     html += "<th width='100px' height='20px'>N° Lote</th>";
        //     html += "</tr>";
        //     table_serie_cabecera.append(html);
        // }

        // $scope.addSerieCompleTab = function () {
        //     var b_val = true;
        //     var cant = cantProductoMss.val();
        //     b_val = b_val && cantProductoMss.required();
        //     if (b_val) {
        //         if (identiSelec == "A") {
        //             var conta1 = 0;
        //             $(".valcheck:checked").each(function () {
        //                 conta1 = conta1 + 1
        //             });
        //             if (cant == conta1) {
        //                 if (s_art_serie !== '') {
        //                     var updteSe = aartMSE.filter(function (car) {
        //                         return car.identificador !== s_art_serie;
        //                     })
        //                     aartMSE = updteSe;
        //                     $(".check:checkbox:checked").each(function () {
        //                         var grubSE = {
        //                             'identificador': s_art_serie,
        //                             'idProducto': s_product_ser_id,
        //                             'serie': $(this).attr('data-code'),
        //                             'idSerie': $(this).attr('data_idSerie'),
        //                             'cantidad': cantProductoMss.val(),
        //                         }
        //                         aartMSE.push(grubSE);
        //                     });
        //                     $("#tr_idArticulo" + s_art_serie).find("td:eq(1)").children("p").text(cantProductoMss.val());
        //                     $("#tr_idArticulo" + s_art_serie).find("td:eq(1)").children("input").val(cantProductoMss.val());
        //                     modalSerieR.modal("hide");
        //                     modalArticle.modal("hide");
        //                 } else {
        //                     var vers = 'N';
        //                     var codigoLSr = Math.random().toString(36).substr(2, 18);
        //                     var tipoArtLSr = 'SE';
        //                     $(".check:checkbox:checked").each(function () {
        //                         var grubSE = {
        //                             'identificador': codigoLSr,
        //                             'idProducto': s_product_ser_id,
        //                             'serie': $(this).attr('data-code'),
        //                             'idSerie': $(this).attr('data_idSerie'),
        //                             'cantidad': cantProductoMss.val(),
        //                         }
        //                         aartMSE.push(grubSE);
        //                     });
        //                     var codl = "";
        //                     var datl = "";
        //                     var estado = "N";
        //                     var unida = "";
        //                     var idDetalle = 0;
        //                     addArticleDetail(idDetalle, s_product_ser_id, desProductoMss.val(), cantProductoMss.val(),
        //                         vers, codigoLSr, tipoArtLSr, codl, datl, estado, fecharequerida, unida);
        //                     modalSerieR.modal("hide");
        //                     modalArticle.modal("hide");
        //
        //                 }
        //             } else {
        //                 AlertFactory.textType({
        //                     title: '',
        //                     message: 'Las series seleccionadas debe ser igual a la cantidad',
        //                     type: 'info'
        //                 });
        //             }
        //         } else {
        //             var camposunicos = [];
        //             var vali = "";
        //
        //             for (var i = 0; i < cant; i++) {
        //                 var ident = "#s_serie" + i;
        //                 var ident = $(ident);
        //                 b_val = b_val && ident.required();
        //             }
        //             for (var i = 0; i < cant; i++) {
        //                 var ident = "#s_serie" + i;
        //                 var ident = $(ident).val();
        //                 camposunicos.push(ident);
        //             }
        //             for (var i = 0; i < cant; i++) {
        //                 var ident = "#s_serie" + i;
        //                 var ident = $(ident).val();
        //                 var ctr = 0;
        //                 for (var e in camposunicos) {
        //                     if (camposunicos[e] == ident) {
        //                         ctr = ctr + 1;
        //                         if (ctr == 2) {
        //                             vali = ident;
        //                             break;
        //                         }
        //                     }
        //
        //                 }
        //             }
        //             if (vali != "") {
        //                 AlertFactory.textType({
        //                     title: '',
        //                     message: 'La serie ' + vali + ' ya existe en esta lista',
        //                     type: 'info'
        //                 });
        //                 return false;
        //             }
        //             var validaSerie = "";
        //             var val = "";
        //             for (var i = 0; i < cant; i++) {
        //                 var ident = "#s_serie" + i;
        //                 var ident = $(ident);
        //
        //                 validaSerie = aartMSN.map(function (index) {
        //                     if (s_art_serie !== '') {
        //                         if (index.serie == ident.val()) {
        //                             if (index.identificador !== s_art_serie) {
        //                                 if (val == "") {
        //                                     val = index.serie;
        //                                 }
        //                             }
        //                         }
        //                     } else {
        //                         if (index.serie == ident.val()) {
        //                             if (val == "") {
        //
        //                                 val = index.serie;
        //                             }
        //                         }
        //                     }
        //
        //                 })
        //             }
        //             if (val != "") {
        //                 AlertFactory.textType({
        //                     title: '',
        //                     message: 'La serie ' + val + ' ya existe en este movimiento',
        //                     type: 'info'
        //                 });
        //                 return false;
        //             }
        //             ;
        //
        //             if (b_val) {
        //                 camposunicos = camposunicos.join(',');
        //                 RESTService.get('solicitudCompras/valida_series_serve', camposunicos, function (response) {
        //                     if (!_.isUndefined(response.status) && response.status) {
        //                         if (cant == cont_table) {
        //                             if (s_art_serie !== '') {
        //                                 var updteSN = aartMSN.filter(function (car) {
        //                                     return car.identificador !== s_art_serie;
        //                                 })
        //                                 aartMSN = updteSN;
        //                                 for (var i = 0; i < cant; i++) {
        //                                     var grubSN = {
        //                                         'identificador': s_art_serie,
        //                                         'idProducto': s_product_ser_id,
        //                                         'serie': $("#s_serie" + i).val(),
        //                                         'chasis': $("#s_chasis" + i).val(),
        //                                         'motor': $("#s_motor" + i).val(),
        //                                         'anio_fabricacion': $("#s_aniof" + i).val(),
        //                                         'anio_modelo': $("#s_aniom" + i).val(),
        //                                         'color': $("#s_color" + i).val(),
        //                                         'idTipoCompraVenta': $("#s_tipoCompra" + i).val(),
        //                                         'nPoliza': $("#s_nroPoliza" + i).val(),
        //                                         'nLoteCompra': $("#s_nroLote" + i).val(),
        //                                     }
        //                                     aartMSN.push(grubSN);
        //                                 }
        //                                 $("#tr_idArticulo" + s_art_serie).find("td:eq(1)").children("p").text(cantProductoMss.val());
        //                                 $("#tr_idArticulo" + s_art_serie).find("td:eq(1)").children("input").val(cantProductoMss.val());
        //                                 modalSerieR.modal("hide");
        //                                 modalArticle.modal("hide");
        //
        //                             } else {
        //                                 var ver = 'N';
        //                                 var codigoLr = Math.random().toString(36).substr(2, 18);
        //                                 var tipoArtLr = 'SN';
        //                                 for (var i = 0; i < cant; i++) {
        //                                     var grubSN = {
        //                                         'identificador': codigoLr,
        //                                         'idProducto': s_product_ser_id,
        //                                         'serie': $("#s_serie" + i).val(),
        //                                         'chasis': $("#s_chasis" + i).val(),
        //                                         'motor': $("#s_motor" + i).val(),
        //                                         'anio_fabricacion': $("#s_aniof" + i).val(),
        //                                         'anio_modelo': $("#s_aniom" + i).val(),
        //                                         'color': $("#s_color" + i).val(),
        //                                         'idTipoCompraVenta': $("#s_tipoCompra" + i).val(),
        //                                         'nPoliza': $("#s_nroPoliza" + i).val(),
        //                                         'nLoteCompra': $("#s_nroLote" + i).val(),
        //                                     }
        //                                     aartMSN.push(grubSN);
        //                                 }
        //                                 var codl = "";
        //                                 var datl = "";
        //                                 var estado = "N";
        //                                 var unida = "";
        //                                 var idDetalle = 0;
        //                                 addArticleDetail(idDetalle, s_product_ser_id, desProductoMss.val(),
        //                                     cantProductoMss.val(), ver, codigoLr, tipoArtLr, codl, datl, estado,
        //                                     fecharequerida, unida);
        //                                 modalSerieR.modal("hide");
        //                                 modalArticle.modal("hide");
        //                             }
        //                         } else {
        //                             AlertFactory.textType({
        //                                 title: '',
        //                                 message: 'Las series  debe ser igual a la cantidad',
        //                                 type: 'info'
        //                             });
        //                         }
        //
        //                     } else {
        //                         var msg_ = (_.isUndefined(response.message)) ?
        //                             'No se pudo guardar la Serie. Intente nuevamente.' : response.message;
        //                         AlertFactory.textType({
        //                             title: '',
        //                             message: msg_,
        //                             type: 'info'
        //                         });
        //
        //                     }
        //                 });
        //
        //
        //             }
        //         }
        //     }
        //
        //
        // }
        // $scope.addLoteExi = function () {
        //     var b_val = true;
        //     b_val = b_val && cantProductoMll.required();
        //     b_val = b_val && codigoLoteMll.required();
        //     if (b_val) {
        //         var ver = 'A';
        //         var codigoLr = Math.random().toString(36).substr(2, 18);
        //         var tipoArtLr = 'LE';
        //         var grubLE = {
        //             'identificador': codigoLr,
        //             'idProducto': s_product_m_id,
        //             'idLote': s_lote_ml_id,
        //             'fecha_vencimiento': fechaVl.val(),
        //             'codig_lote': codigoLoteMll.val(),
        //         }
        //         aartMLE.push(grubLE);
        //         var codl = s_lote_m;
        //         var datl = "";
        //         var estado = "N";
        //         var unida = "";
        //         var idDetalle = 0;
        //         addArticleDetail(idDetalle, s_product_m_id, desProductoMll.val(), cantProductoMll.val(), ver,
        //             codigoLr, tipoArtLr, codl, datl, estado, fecharequerida, unida);
        //         modalLoteR.modal('hide');
        //         modalArticle.modal('hide');
        //     }
        // }

        // $scope.addSeleccSerie = function () {
        //     table_serie_cabecera.empty();
        //     articulo_serie_det.empty();
        //
        //     var b_val = true;
        //     b_val = b_val && cantProductoMss.required();
        //     if (b_val) {
        //         var id = s_product_ser_id + '*' + cantProductoMss.val();
        //         RESTService.get('solicitudCompras/validateCantSerie', id, function (response) {
        //             if (!_.isUndefined(response.status) && response.status) {
        //                 if (response.data == 'N') {
        //                     AlertFactory.textType({
        //                         title: '',
        //                         message: 'No hay series de este Artículo ',
        //                         type: 'info'
        //                     });
        //                 } else if (response.data == 'S') {
        //                     AlertFactory.textType({
        //                         title: '',
        //                         message: 'Existen solo ' + response.cantidad + ' series de este Artículo . Ingrese Nueva cantidad.',
        //                         type: 'info'
        //                     });
        //                 } else {
        //                     identiSelec = "A";
        //                     cargarTableSerie(s_product_ser_id, aartMSE);
        //                     btn_serC.prop('disabled', false);
        //                     btn_serC.trigger('change');
        //
        //                 }
        //             } else {
        //                 AlertFactory.textType({
        //                     title: '',
        //                     message: 'Nose pudo obtener las Series . Intente nuevamente.',
        //                     type: 'info'
        //                 });
        //             }
        //         });
        //     }
        // }

        // $scope.addArtLote = function () {
        //     var b_val = true;
        //     b_val = b_val && cantProductoML.required();
        //     b_val = b_val && lotProductoML.required();
        //     b_val = b_val && fIngrePrML.required();
        //     b_val = b_val && fVenPrML.required();
        //     if (b_val) {
        //         if (s_lote_ml2_id === '') {
        //             var validaLote = aartML.map(function (index) {
        //                 if (index.lote == lotProductoML.val()) {
        //                     return index.lote;
        //                 }
        //
        //             })
        //             if (validaLote != "") {
        //                 AlertFactory.textType({
        //                     title: '',
        //                     message: 'El lote ' + validaLote + ' ya existe en este movimiento',
        //                     type: 'info'
        //                 });
        //                 return false;
        //             }
        //             ;
        //             var codigoLtr = Math.random().toString(36).substr(2, 18);
        //             var grubLN = {
        //                 'identificador': codigoLtr,
        //                 'idProducto': s_product_ml_id,
        //                 'cantidad': cantProductoML.val(),
        //                 'lote': lotProductoML.val(),
        //                 'fecha_ingreso': fIngrePrML.val(),
        //                 'fecha_vencimiento': fVenPrML.val(),
        //             }
        //             aartML.push(grubLN);
        //             var ver = 'A';
        //             var tipolr = 'LN';
        //             var codl = "";
        //             var datl = s_product_ml_id + '*' + cantProductoML.val() + '*' + lotProductoML.val() + '*' +
        //                 fIngrePrML.val() + '*' + fVenPrML.val();
        //             var estado = "N";
        //             var unida = '';
        //             var obser = '';
        //             var idDetalle = 0;
        //             addArticleDetail(idDetalle, s_product_ml_id, desProductoML.val(), cantProductoML.val(), ver,
        //                 codigoLtr, tipolr, codl, datl, estado, fecharequerida, unida, obser);
        //             modalLote.modal('hide');
        //             modalLoteR.modal('hide');
        //             modalArticle.modal('hide');
        //         } else {
        //             var updteSLN = aartML.filter(function (car) {
        //                 return car.identificador !== s_lote_ml2_id;
        //             })
        //             aartML = updteSLN;
        //             var grubLN = {
        //                 'identificador': s_lote_ml2_id,
        //                 'idProducto': s_product_ml_id,
        //                 'cantidad': cantProductoML.val(),
        //                 'lote': lotProductoML.val(),
        //                 'fecha_ingreso': fIngrePrML.val(),
        //                 'fecha_vencimiento': fVenPrML.val(),
        //             }
        //             aartML.push(grubLN);
        //             var datl = s_product_ml_id + '*' + cantProductoML.val() + '*' + lotProductoML.val() + '*' + fIngrePrML.val() + '*' + fVenPrML.val();
        //             $("#tr_idArticulo" + s_lote_ml2_id).find("td:eq(0)").children(".m_dato_lote").val(datl);
        //             $("#tr_idArticulo" + s_lote_ml2_id).find("td:eq(1)").children(".m_articulo_cantidad").val(cantProductoML.val());
        //             modalLote.modal('hide');
        //             modalLoteR.modal('hide');
        //             modalArticle.modal('hide');
        //
        //         }
        //     }
        //
        // }

        // function addSerieTable(idProductoMS, desProductoMS, cantProductoMS, colorMS, chasisMS, motorMS, anio_modeloMS, anio_fabricacionMS)
        // {
        //     articulo_serie_det.empty();
        //     if (s_art_serie !== '') {
        //         cont_table = 0;
        //         var contfila = 0;
        //         aartMSN.map(function (index) {
        //             if (index.identificador === s_art_serie) {
        //                 contfila = contfila + 1;
        //             }
        //         });
        //
        //         if (cantProductoMss.val() != contfila) {
        //             if (cantProductoMss.val() != 0) {
        //
        //                 crearTableSerie2(cantProductoMS, idProductoMS, desProductoMS);
        //             } else {
        //                 crearTableSerie();
        //             }
        //         } else if (cantProductoMS == contfila) {
        //             crearTableSerie();
        //         }
        //     } else {
        //         crearTableSerie2(cantProductoMS, idProductoMS, desProductoMS);
        //     }
        // }

        // function crearTableSerie2(cantProductoMS, idProductoMS, desProductoMS) {
        //     cont_table = 0;
        //     for (var i = 0; i < cantProductoMS; i++) {
        //         var html2 = "<tr id='tr_idArticulo_" + idProductoMS + "' ></tr>";
        //         html2 += "<td>" + desProductoMS + "</td>";
        //         html2 += "<td><input type='text' id='s_serie" + i + "' class='s_serie form-control input-sm'/></td>";
        //         html2 += "<td><input type='text' id='s_chasis" + i + "' class='s_chasis form-control input-sm'/></td>";
        //         html2 += "<td><input type='text' id='s_motor" + i + "' class='s_motor form-control input-sm'/></td>";
        //         html2 += "<td><input type='text' id='s_color" + i + "' class='s_color form-control input-sm'/></td>";
        //         html2 += "<td><input type='text' id='s_aniof" + i + "' class='s_aniof form-control input-sm' onkeypress='return soloNumeros(event)' maxlength='4' /></td>";
        //         html2 += "<td><input type='text' id='s_aniom" + i + "' class='s_aniom form-control input-sm' onkeypress='return soloNumeros(event)' maxlength='4'/></td>";
        //         html2 += "<td><select id='s_tipoCompra" + i + "' class='form-control input-sm'></select></td>";
        //         html2 += "<td><input type='text' id='s_nroPoliza" + i + "' class='s_motor form-control input-sm'/></td>";
        //         html2 += "<td><input type='text' id='s_nroLote" + i + "' class='s_color form-control input-sm'/></td>";
        //         html2 += "</tr>";
        //         articulo_serie_det.append(html2);
        //         cont_table = cont_table + 1;
        //         $("#s_tipoCompra" + i).append('<option value="" selected>Seleccionar</option>');
        //         _.each(tipoCompra, function (item) {
        //             $("#s_tipoCompra" + i).append('<option value="' + item.idTipoCompraVenta + '">' + item.descripcion + '</option>');
        //         });
        //     }
        // }

        // function crearTableSerie() {
        //     var contuni = 0;
        //     aartMSN.map(function (index) {
        //         if (index.identificador === s_art_serie) {
        //             var html2 = "<tr id='tr_idArticulo_" + s_product_ser_id + "' ></tr>";
        //             html2 += "<td>" + desProductoMss.val() + "</td>";
        //             html2 += "<td><input type='text' id='s_serie" + contuni + "' class='s_serie form-control input-sm' value='" + index.serie + "'/></td>";
        //             html2 += "<td><input type='text' id='s_chasis" + contuni + "' class='s_chasis form-control input-sm' value='" + index.chasis + "'/></td>";
        //             html2 += "<td><input type='text' id='s_motor" + contuni + "' class='s_motor form-control input-sm' value='" + index.motor + "'/></td>";
        //             html2 += "<td><input type='text' id='s_color" + contuni + "' class='s_color form-control input-sm' value='" + index.color + "'/></td>";
        //             html2 += "<td><input type='text' id='s_aniof" + contuni + "' class='s_aniof form-control input-sm' value='" + index.anio_fabricacion + "' onkeypress='return soloNumeros(event)' maxlength='4' /></td>";
        //             html2 += "<td><input type='text' id='s_aniom" + contuni + "' class='s_aniom form-control input-sm' value='" + index.anio_modelo + "' onkeypress='return soloNumeros(event)' maxlength='4'/></td>";
        //
        //             html2 += "<td><select id='s_tipoCompra" + contuni + "' class='form-control input-sm'></select></td>";
        //
        //             html2 += "<td><input type='text' id='s_nroPoliza" + contuni + "' class='s_motor form-control input-sm' value='" + index.nPoliza + "'/></td>";
        //             html2 += "<td><input type='text' id='s_nroLote" + contuni + "' class='s_color form-control input-sm' value='" + index.nLoteCompra + "'/></td>";
        //             html2 += "</tr>";
        //
        //             articulo_serie_det.append(html2);
        //             $("#s_tipoCompra" + contuni).append('<option value="" selected>Seleccionar</option>');
        //             _.each(tipoCompra, function (item) {
        //                 $("#s_tipoCompra" + contuni).append('<option value="' + item.idTipoCompraVenta + '">' + item.descripcion + '</option>');
        //             });
        //             $("#s_tipoCompra" + contuni).val(index.idTipoCompraVenta).trigger('change');
        //             cont_table = cont_table + 1;
        //             contuni = contuni + 1;
        //         }
        //     });
        // }

        // function cargarTableSerie(idProducto, aarraySe) {
        //     cont_check = 0;
        //     identiSelec = "A";
        //     var search_cc4 = getFormSearch('frm-search-cc4', 'search_cc4', 'LoadRecordsButtonCC4');
        //     table_container_cc4 = $("#table_container_Series_Articulo");
        //     var url = 'getProductoSerie';
        //     if (naturalezaGeneral == "S") {
        //         url = 'getProductoSerieStock';
        //     }
        //     ;
        //     table_container_cc4.jtable({
        //         title: "Lista de Series",
        //         paging: true,
        //         sorting: true,
        //         actions: {
        //             listAction: function (postData, jtParams) {
        //                 return $.Deferred(function ($dfd) {
        //                     $.ajax({
        //                         url: base_url + '/solicitudCompras/' + url,
        //                         type: 'POST',
        //                         dataType: 'json',
        //                         data: {postData: postData, idProducto: idProducto},
        //                         success: function (data) {
        //                             $dfd.resolve(data);
        //                         },
        //                         error: function () {
        //                             $dfd.reject();
        //                         }
        //                     });
        //                 });
        //             }
        //         },
        //         toolbar: {
        //             items: [{
        //                 cssClass: 'buscador',
        //                 text: search_cc4
        //             }]
        //         },
        //         fields: {
        //             idSerie: {
        //                 key: true,
        //                 create: false,
        //                 edit: false,
        //                 list: false
        //             },
        //             serie: {
        //                 create: false,
        //                 edit: false,
        //                 title: 'N° Serie'
        //             },
        //             chasis: {
        //                 create: false,
        //                 edit: false,
        //                 title: 'Chasis'
        //
        //             },
        //             motor: {
        //                 create: false,
        //                 edit: false,
        //                 title: 'Motor'
        //
        //             },
        //             anio_fabricacion: {
        //                 title: 'Año de Fabricación'
        //             },
        //             anio_modelo: {
        //                 title: 'Año de Modelo'
        //             },
        //             select: {
        //                 width: '1%',
        //                 sorting: false,
        //                 edit: false,
        //                 create: false,
        //                 listClass: 'text-center',
        //                 display: function (data) {
        //                     var ichc = 'N';
        //                     if (s_art_serie !== '') {
        //                         console.log("entro");
        //                         aartMSE.map(function (index) {
        //                             if (data.record.serie == index.serie && s_art_serie === index.identificador) {
        //                                 ichc = 'A';
        //                             }
        //                         });
        //                         if (ichc == 'A') {
        //                             cont_check = cont_check + 1;
        //                             ichc = 'N';
        //                             return '<label class="checkbox-inline i-checks"> <input class="check valcheck" type="checkbox" id="p_state" data_idSerie="' + data.record.idSerie + '" data-code="' + data.record.serie + '" checked ></label>';
        //                         } else {
        //                             return '<label class="checkbox-inline i-checks"> <input class="check valcheck" type="checkbox" id="p_state" data_idSerie="' + data.record.idSerie + '" data-code="' + data.record.serie + '"  ></label>';
        //                         }
        //                     } else {
        //                         return '<label class="checkbox-inline i-checks"> <input class="check valcheck" type="checkbox" id="p_state" data_idSerie="' + data.record.idSerie + '" data-code="' + data.record.serie + '"  ></label>';
        //                     }
        //
        //
        //                 }
        //             }
        //         },
        //         recordsLoaded: function (event, data) {
        //             // $('.select_cc').click(function(e){
        //             //     var codigo = $(this).attr('data-code');
        //             //     var descripcionArt = $(this).attr('data-name');
        //             //     var idTipoArt = $(this).attr('data-type');
        //             //     var serie = $(this).attr('data-serie');
        //             //     var lote = $(this).attr('data-lote');
        //             //     e.preventDefault();
        //             // });
        //
        //             $('.i-checks').iCheck({
        //                 checkboxClass: 'icheckbox_square-green'
        //             }).on('ifChanged', function (event) {
        //                 if ($(this).prop('checked')) {
        //                     cont_check = cont_check + 1
        //                 } else {
        //                     cont_check = cont_check - 1;
        //                 }
        //                 ;
        //                 var codigo = $(this).attr('data-code');
        //
        //                 // $(event.target).click();
        //             });
        //
        //         }
        //     });
        //
        //     generateSearchForm('frm-search-cc4', 'LoadRecordsButtonCC4', function () {
        //         table_container_cc4.jtable('load', {
        //             search: $('#search_cc4').val()
        //         });
        //     }, true);
        // }

    }


    function Config($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('solicitudCompras', {
                url: '/solicitudCompras',
                templateUrl: base_url + '/templates/solicitudCompras/base.html',
                controller: 'SolicitudCompraCtrl'
            });

        $urlRouterProvider.otherwise('/');
    }
})
();
