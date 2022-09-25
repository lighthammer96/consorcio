/**
 * Created by JAIR on 4/5/2017.
 */

(function () {
    'use strict';
    angular.module('sys.app.descuentos')
        .config(Config)
        .controller('DescuentoCtrl', DescuentoCtrl);

    Config.$inject = ['$stateProvider', '$urlRouterProvider'];
    DescuentoCtrl.$inject = ['$scope', '_', 'RESTService', 'AlertFactory'];

    function DescuentoCtrl($scope, _, RESTService, AlertFactory) {
        var modalDescuento = $("#modalDescuento");
        var titleModalDescuento = $("#titleModalDescuento");
        var descripcion = $("#descripcion");
        var dFecIni = $("#dFecIni");
        var dFecFin = $("#dFecFin");
        var idDescuento = $("#idDescuento");
        var idTipo = $("#idTipo");
        var nPorcDescuento = $("#nPorcDescuento");
        var idMoneda = $("#idMoneda");
        var nMonto = $("#nMonto");

        var nLimiteUso = $("#nLimiteUso");
        var nCantUso = $("#nCantUso");
        var nSaldoUso = $("#nSaldoUso");

        var limit = $("#limit");
        var p_stateUsuar = $("#p_stateUsuar");
        var user_text = $("#user_text");
        var p_stateAplica = $("#p_stateAplica");
        var tipe_text = $("#tipe_text");
        $('#nPorcDescuento').attr('onkeypress', 'return validDecimals(event, this, 2)');
        $('#nLimiteUso').attr('onkeypress', 'return soloNumeros(event)');
        $('#nMonto').attr('onkeypress', 'return validDecimals(event, this, 2)');
        var p_state = $("#p_state");
        var state_text = $("#state_text");

        var table_usuario = $("#table_usuario");
        var table_articulo = $("#table_articulo");

        var usuarios_select = $("#usuarios_select");
        var productos_select = $("#productos_select");

        $('.i-checks').iCheck({
            checkboxClass: 'icheckbox_square-green'
        }).on('ifChanged', function (event) {
            $(event.target).click();
            $scope.chkState();
        });
        function findDescuento(id) {

            RESTService.get('descuentos/find', id, function (response) {
                if (!_.isUndefined(response.status) && response.status) {


                    var data = response.data;
                    var dataUsuario = response.dataUsuario;
                    var dataProduct = response.dataProducto;

                    console.log(data);
                    console.log(dataUsuario);
                    console.log(dataProduct);

                    titleModalDescuento.html('Editar Descuento' + '[' + data[0].id + ']');
                    // cCodConsecutivo.prop('disabled',true);


                    descripcion.val(data[0].descripcion);
                    dFecIni.val(data.dFecIni);
                    dFecFin.val(data.dFecFin);
                    idDescuento.val(data[0].id);
                    idTipo.val(data[0].idTipo).trigger("change");
                    nPorcDescuento.val(data[0].nPorcDescuento);
                    idMoneda.val(data[0].idMoneda);
                    nMonto.val(Number(data[0].nMonto));
                    nLimiteUso.val(data[0].nLimiteUso);
                    nCantUso.val(data[0].nCantUso);
                    nSaldoUso.val(data[0].nSaldoUso);
                    productos_select.val("").trigger("change");
                    usuarios_select.val("").trigger("change");
                    if (data[0].nLimiteUso == '0') {
                        limit.prop('checked', false).iCheck('update');
                    } else {
                        limit.prop('checked', true).iCheck('update');
                    }

                    if (data[0].nTodosUsusarios == '0') {
                        p_stateUsuar.prop('checked', false).iCheck('update');
                        usuarios_select.prop("disabled", false);
                    } else {
                        p_stateUsuar.prop('checked', true).iCheck('update');
                    }
                    if (data[0].cTipoAplica == 'L') {
                        //  productos_select.prop("disabled",false);
                        p_stateAplica.prop('checked', false).iCheck('update');
                    } else {
                        p_stateAplica.prop('checked', true).iCheck('update');
                    }

                    if (data[0].todos_articulos == 'N') {
                        productos_select.prop("disabled", false);
                        $("#todos_articulos").prop('checked', false).iCheck('update');
                    } else {
                        $("#todos_articulos").prop('checked', true).iCheck('update');
                    }

                    if (data[0].estado == 'I') {
                        p_state.prop('checked', false).iCheck('update');
                    } else {
                        p_state.prop('checked', true).iCheck('update');
                    }
                    $scope.chkState();
                    _.each(dataUsuario, function (b) {
                        addUsuar(b.nIdUsuario, b.name, b.nIdUsuario);
                    });
                    _.each(dataProduct, function (b) {
                        addProdu(b.nIdProducto, b.code_article, b.description, b.nIdProducto);
                    });

                    // nConsecutivo.val(data[0].nConsecutivo);
                    // idMoneda.val(data[0].IdMoneda).trigger("change");
                    // idcCondicionPago.val(data[0].idcCondicionPago).trigger("change");
                    // cliente_id_or.val(data[0].idCliente);
                    // console.log(data.dFecRec2);
                    // dFecRec.val(data.dFecRec2);
                    // horaEnt.val(data[0].horaEnt);
                    // horaRec.val(data[0].horaRec);
                    // dFecEntrega.val(data.dFecEntrega2);
                    // idTecnico.val(data[0].idTecnico).trigger('change');
                    // idAsesor.val(data[0].idAsesor).trigger("change");
                    // id_tipo.val(data[0].id_tipo).trigger("change");
                    // id_tipomant.val(data[0].id_tipomant).trigger("change");
                    // idTipoVehi_add.val(data[0].id_tipoveh).trigger("change");
                    // tipodoc.val(data[0].tipodoc).trigger("change");
                    // estado.val(data[0].iEstado).trigger("change");
                    // id_tipoDoc_Venta_or.val(data[0].idDocumentoVenta).trigger("change");
                    // var data_cliente=response.data_cliente;

                    // cliente_id_or.val(data_cliente[0].id);
                    // documento_or.val(data_cliente[0].documento);
                    // getCliente();
                    // observaciones.val(data[0].cObservaciones);
                    // nKilometraje.val(data[0].nKilometraje);
                    // placa.val(data[0].cPlacaVeh);

                    // var data_matenimiento=response.data_matenimiento;
                    // _.each(data_matenimiento, function (b) {
                    //     var vto=b.idMantenimiento+'*'+b.nombre;
                    //     var modo_m=1;
                    //      addMante(vto,modo_m);
                    // });

                    modalDescuento.modal('show');
                } else {
                    AlertFactory.textType({
                        title: '',
                        message: 'Hubo un error al obtener el Artículo. Intente nuevamente.',
                        type: 'error'
                    });
                }
            });
        }
        function getDataForOrdenServicio() {
            RESTService.all('descuentos/data_formOrde', '', function (response) {
                if (!_.isUndefined(response.status) && response.status) {
                    idMoneda.append('<option value="">Seleccionar</option>');
                    _.each(response.moneda, function (item) {
                        idMoneda.append('<option value="' + item.IdMoneda + '">' + item.Descripcion + '</option>');
                    });
                }
            }, function () {
                getDataForOrdenServicio();
            });
        }

        idTipo.change(function () {
            if (idTipo.val() == 'P') {
                nPorcDescuento.prop("disabled", false);
                idMoneda.prop("disabled", true);
                nMonto.prop("disabled", true);
                idMoneda.val("");
                nMonto.val("");
            } else if (idTipo.val() == 'M') {
                idMoneda.prop("disabled", false);
                nMonto.prop("disabled", false);
                nPorcDescuento.prop("disabled", true);
                nPorcDescuento.val("");
            }
        });
        usuarios_select.change(function () {
            var vto = $(this).val();
            var arrayRe = vto.split("*");
            var id = arrayRe[0];
            var name = arrayRe[1];
            var codDetalle = 0;
            if (vto != "") {
                addUsuar(id, name, codDetalle);
            }

        });
        productos_select.change(function () {
            var vto = $(this).val();
            var arrayRe = vto.split("*");
            var id = arrayRe[0];
            var code = arrayRe[1];
            var descrip = arrayRe[2];
            var codDetalle = 0;
            if (vto != "") {
                addProdu(id, code, descrip, codDetalle);
            }

        });


        function addProdu(code, codigo_articulo, username, codDetalle) {
            if ($('#tr_p_' + code).length > 0) {
                AlertFactory.showWarning({
                    title: '',
                    message: 'Ya se asignó este artículo'
                });
                productos_select.val("");
                return false;
            }
            var tr = $('<tr id="tr_p_' + code + '"></tr>');
            var td0 = $('<td>' + codigo_articulo + '</td>');
            var td1 = $('<td>' + username + '</td>');
            var td2 = $('<td class="text-center"></td>');
            var codigoProducto = $('<input type="hidden" class="idProducto"  value="' + code + '"  />');
            var codigoProductDetalle = $('<input type="hidden" class="idProductoDetalle"  value="' + codDetalle + '"  />');
            var btn = $('<button class="btn btn-danger btn-xs delPoducto" data-id="' + code + '" type="button"><span class="fa fa-trash"></span></button>');
            td2.append(btn).append(codigoProducto).append(codigoProductDetalle);
            tr.append(td0).append(td1).append(td2);
            table_articulo.append(tr);
            productos_select.val("");
            $('.delPoducto').click(function (e) {
                var code = $(this).attr('data-id');
                AlertFactory.confirm({
                    title: '',
                    message: '¿Está seguro que desea quitar este Producto?',
                    confirm: 'Si',
                    cancel: 'No'
                }, function () {
                    if (idDescuento.val() != '') {
                        var id = idDescuento.val() + "_" + code;
                        RESTService.get('descuentos/deleteProducto', id, function (response) {
                            if (!_.isUndefined(response.status) && response.status) {
                                AlertFactory.textType({
                                    title: '',
                                    message: 'El Artículo se eliminó correctamente',
                                    type: 'success'
                                });
                                $('#tr_p_' + code).remove();
                            } else {
                                var msg_ = (_.isUndefined(response.message)) ?
                                    'No se pudo eliminar. Intente nuevamente.' : response.message;
                                AlertFactory.textType({
                                    title: '',
                                    message: msg_,
                                    type: 'error'
                                });
                            }
                        });

                    } else {
                        $('#tr_p_' + code).remove();
                    }

                });
                e.preventDefault();
            });
        }

        function addUsuar(code, username, codiDetalle) {
            if ($('#tr_b_' + code).length > 0) {
                AlertFactory.showWarning({
                    title: '',
                    message: 'Ya se asignó este usuario'
                });
                usuarios_select.val("").trigger("change");
                return false;
            }
            var tr = $('<tr id="tr_b_' + code + '"></tr>');
            var td1 = $('<td>' + username + '</td>');
            var td2 = $('<td class="text-center"></td>');
            var codigoUsuario = $('<input type="hidden" class="idUsuario"  value="' + code + '"  />');
            var codigoUsuarioDetalle = $('<input type="hidden" class="idUsuario_det"  value="' + codiDetalle + '"  />');
            var btn = $('<button class="btn btn-danger btn-xs delUsuario" data-id="' + code + '" type="button"><span class="fa fa-trash"></span></button>');
            td2.append(btn).append(codigoUsuario).append(codigoUsuarioDetalle);
            tr.append(td1).append(td2);
            table_usuario.append(tr);
            usuarios_select.val("");
            $('.delUsuario').click(function (e) {
                var code = $(this).attr('data-id');
                AlertFactory.confirm({
                    title: '',
                    message: '¿Está seguro que desea quitar este usuario?',
                    confirm: 'Si',
                    cancel: 'No'
                }, function () {
                    var idcod = '#tr_' + code;
                    if (idDescuento.val() != '') {
                        var id = idDescuento.val() + "_" + code;
                        RESTService.get('descuentos/deleteUsuario', id, function (response) {
                            if (!_.isUndefined(response.status) && response.status) {
                                var data = response.data;
                                AlertFactory.textType({
                                    title: '',
                                    message: 'El Usuario se eliminó correctamente',
                                    type: 'success'
                                });
                                $('#tr_b_' + code).remove();
                            } else {
                                var msg_ = (_.isUndefined(response.message)) ?
                                    'No se pudo eliminar. Intente nuevamente.' : response.message;
                                AlertFactory.textType({
                                    title: '',
                                    message: msg_,
                                    type: 'error'
                                });
                            }
                        });

                    } else {
                        $('#tr_b_' + code).remove();
                    }

                });
                e.preventDefault();
            });
        }

        $scope.saveDescuento = function () {
            var bval = true;
            bval = bval && descripcion.required();
            bval = bval && dFecIni.required();
            bval = bval && dFecFin.required();
            bval = bval && idTipo.required();

            if (idTipo.val() == 'M') {
                bval = bval && idMoneda.required();
                bval = bval && nMonto.required();
            }
            else if (idTipo.val() == 'P') {
                bval = bval && nPorcDescuento.required();
            }
            if (limit.prop('checked')) {
                bval = bval && nLimiteUso.required();
            };
            if (!p_stateUsuar.prop('checked')) {
                if ($("#table_usuario").html() == '') {
                    AlertFactory.showWarning({
                        title: '',
                        message: 'Debe agregar un mínimo de 1 Usuario'
                    });
                    return false;
                }

            };
            if (!p_stateAplica.prop('checked') && !$("#todos_articulos").prop('checked')) {
                if ($("#table_articulo").html() == '') {
                    AlertFactory.showWarning({
                        title: '',
                        message: 'Debe agregar un mínimo de 1 Producto'
                    });
                    return false;
                }
            };

            // if($("#articulo_dd_det").html()==''){
            //    AlertFactory.showWarning({
            //         title: '',
            //         message: 'Debe agregar un mínimo de 1 en mantenimientos'
            //     });
            //     activeTab('trbajoES');
            //     return false;  
            // }
            // if($("#total").val()==0){
            //    AlertFactory.showWarning({
            //         title: '',
            //         message: 'El total no puede ser 0'
            //     });
            //     return false;  
            // }
            if (bval) {
                var idProducto = [];
                $.each($('.idProducto'), function (idx, item) {
                    idProducto[idx] = $(item).val();
                });
                idProducto = idProducto.join(',');



                var idProductoDeta = [];
                $.each($('.idProductoDetalle'), function (idx, item) {
                    idProductoDeta[idx] = $(item).val();
                });
                idProductoDeta = idProductoDeta.join(',');

                var idUsuario = [];
                $.each($('.idUsuario'), function (idx, item) {
                    idUsuario[idx] = $(item).val();
                });
                idUsuario = idUsuario.join(',');



                var idUsuarioDeta = [];
                $.each($('.idUsuario_det'), function (idx, item) {
                    idUsuarioDeta[idx] = $(item).val();
                });

                var limiteE = 0;

                if (limit.prop('checked')) {
                    limiteE = nLimiteUso.val();
                };

                var salUso = 0;
                var cant = 0;
                if (nCantUso.val() == '') {
                    salUso = Number(limiteE) - 0;
                } else {
                    cant = nCantUso.val();
                    salUso = Number(limiteE) - Number(nCantUso.val());
                }
                idUsuarioDeta = idUsuarioDeta.join(',');
                console.log(idUsuario);
                console.log(idUsuarioDeta);
                var params = {
                    'descripcion': descripcion.val(),
                    'dFecIni': dFecIni.val(),
                    'dFecFin': dFecFin.val(),
                    'idTipo': idTipo.val(),
                    'estado': ((p_state.prop('checked')) ? 'A' : 'I'),
                    'nPorcDescuento': nPorcDescuento.val(),
                    'idMoneda': idMoneda.val(),
                    'nMonto': nMonto.val(),
                    'nCantUso': cant,
                    'nSaldoUso': salUso,
                    'nLimiteUso': limiteE,
                    'idProducto': idProducto,
                    'idProductoDeta': idProductoDeta,
                    'idUsuario': idUsuario,
                    'idUsuarioDeta': idUsuarioDeta,
                    'nTodosUsusarios': ((p_stateUsuar.prop('checked')) ? '1' : '0'),
                    'cTipoAplica': ((p_stateAplica.prop('checked')) ? 'T' : 'L'),
                    'todos_articulos': (($("#todos_articulos").prop('checked')) ? 'S' : 'N'),

                };
                var id = (idDescuento.val() === '') ? 0 : idDescuento.val();
                RESTService.updated('descuentos/createDescuento', id, params, function (response) {
                    if (!_.isUndefined(response.status) && response.status) {
                        var data_p = response.res;
                        console.log(response.cTipoAplica);
                        if (Number(data_p[0].Mensaje)) {
                            AlertFactory.textType({
                                title: '',
                                message: 'El descuento se registró correctamente.',
                                type: 'success'
                            });
                            modalDescuento.modal('hide');
                            LoadRecordsButtonDescuento.click();
                        } else {
                            AlertFactory.textType({
                                title: '',
                                message: data_p[0].Mensaje,
                                type: 'info'
                            });
                        }
                    } else {
                        var msg_ = (_.isUndefined(response.message)) ?
                            'No se pudo guardar . Intente nuevamente.' : response.message;
                        AlertFactory.textType({
                            title: '',
                            message: msg_,
                            type: 'info'
                        });
                    }

                });
            }
        }
        getDataForOrdenServicio();

        function getDataFormDescuento() {
            RESTService.all('descuentos/data_form', '', function (response) {
                if (!_.isUndefined(response.status) && response.status) {
                    productos_select.html("");
                    console.log(response.productos);

                    productos_select.append('<option value="">Seleccionar</option>');
                    _.each(response.productos, function (item) {
                        productos_select.append('<option value="' + item.id + '*' + item.code_article + '*' + item.description + '">' + item.code_article + ' ' + item.description + '</option>');


                    });
                    usuarios_select.html("");
                    usuarios_select.append('<option value="">Seleccionar</option>');
                    _.each(response.usuarios, function (item) {
                        usuarios_select.append('<option value="' + item.id + '*' + item.name + '">' + item.name + '</option>');


                    });
                }
            }, function () {
                getDataFormDescuento();
            });
        }
        getDataFormDescuento();

        usuarios_select.select2();
        $.fn.modal.Constructor.prototype.enforceFocus = function () { };
        productos_select.select2();
        modalDescuento.on('hidden.bs.modal', function (e) {
            cleanDescuento();
        });
        function cleanDescuento() {
            cleanRequired();
            titleModalDescuento.html('');
            descripcion.val("");
            dFecIni.val("");
            dFecFin.val("");
            idTipo.val("");
            nPorcDescuento.val("");
            idMoneda.val("");
            nMonto.val("");
            nLimiteUso.val("");
            nCantUso.val("");
            nSaldoUso.val("");
            idDescuento.val("");
            table_usuario.html("");
            table_articulo.html("");
            usuarios_select.val("");
            productos_select.val("");

            usuarios_select.prop("disabled", true);
            productos_select.prop("disabled", true);

            nPorcDescuento.prop("disabled", true);
            idMoneda.prop("disabled", true);
            nMonto.prop("disabled", true);

            limit.prop('checked', false).iCheck('update');
            p_stateUsuar.prop('checked', true).iCheck('update');
            p_stateAplica.prop('checked', true).iCheck('update');
            p_state.prop('checked', true).iCheck('update');

        }

        $scope.chkState = function (e) {


            var txt_state2 = (p_state.prop('checked')) ? 'Activo' : 'Inactivo';
            state_text.html(txt_state2);

            var checkLimit = (limit.prop('checked')) ? '1' : '2';
            if (checkLimit == '1') {
                nLimiteUso.prop("readonly", false);
            } else {
                nLimiteUso.prop("readonly", true);
            }
            var checkUsuar = (p_stateUsuar.prop('checked')) ? '1' : '2';
            if (checkUsuar == "1") {
                usuarios_select.prop("disabled", true);
                borrarUsuarios();
            } else {
                usuarios_select.prop("disabled", false);


            }

            //comentado por manuel 11/06/2022
            var stateAplica = (p_stateAplica.prop('checked')) ? '1' : '2';


            if (stateAplica == "1") {
                $("#todos_articulos").prop('checked', false).iCheck('update');
                $(".todos_articulos").hide();
            }

            if (stateAplica == "2") {
                // $("#todos_articulos").prop('checked', true).iCheck('update');
                $(".todos_articulos").show();
            }


            var checkProducto = ($("#todos_articulos").prop('checked')) ? '1' : '2';
            if (checkProducto == "1") {
                productos_select.prop("disabled", true);
                borrarProductos();
            } else {
                productos_select.prop("disabled", false);


            }


        };
        function borrarUsuarios() {
            $('.i-checks').iCheck({
                checkboxClass: 'icheckbox_square-green'
            }).on('ifChanged', function (event) {
                $(event.target).click();
                $scope.chkState();
            });
            console.log("entro1");
            if (idDescuento.val() != '' && table_usuario.html() != "") {
                console.log("entro12");
                p_stateUsuar.prop('checked', false).iCheck('update');
                usuarios_select.prop("disabled", false);
                AlertFactory.confirm({
                    title: '',
                    message: '¿Los usuarios seleccionados se eliminaran?',
                    confirm: 'Si',
                    cancel: 'No'
                }, function () {
                    if (idDescuento.val() != '') {
                        var id = idDescuento.val();
                        RESTService.get('descuentos/deleteUsuarioTotal', id, function (response) {
                            if (!_.isUndefined(response.status) && response.status) {
                                p_stateUsuar.prop('checked', true).iCheck('update');
                                usuarios_select.prop("disabled", true);
                                table_usuario.html("");
                            } else {
                                var msg_ = (_.isUndefined(response.message)) ?
                                    'No se pudo eliminar. Intente nuevamente.' : response.message;
                                AlertFactory.textType({
                                    title: '',
                                    message: msg_,
                                    type: 'error'
                                });
                            }
                        });
                    } else {
                        table_usuario.html("");
                    }
                });

            } else {
                table_usuario.html("");
            }

        }
        function borrarProductos() {
            $('.i-checks').iCheck({
                checkboxClass: 'icheckbox_square-green'
            }).on('ifChanged', function (event) {
                $(event.target).click();
                $scope.chkState();
            });
            console.log("entro1");
            if (idDescuento.val() != '' && table_articulo.html() != "") {
                console.log("entro12");
                p_stateAplica.prop('checked', false).iCheck('update');
                productos_select.prop("disabled", false);
                AlertFactory.confirm({
                    title: '',
                    message: '¿Los Productos seleccionados se eliminaran?',
                    confirm: 'Si',
                    cancel: 'No'
                }, function () {
                    if (idDescuento.val() != '') {
                        var id = idDescuento.val();
                        RESTService.get('descuentos/deleteProductoTotal', id, function (response) {
                            if (!_.isUndefined(response.status) && response.status) {
                                p_stateAplica.prop('checked', true).iCheck('update');
                                productos_select.prop("disabled", true);
                                table_articulo.html("");
                            } else {
                                var msg_ = (_.isUndefined(response.message)) ?
                                    'No se pudo eliminar. Intente nuevamente.' : response.message;
                                AlertFactory.textType({
                                    title: '',
                                    message: msg_,
                                    type: 'error'
                                });
                            }
                        });
                    } else {
                        table_articulo.html("");
                    }
                });

            } else {
                table_articulo.html("");
            }
        }

        function newGrupoContable() {
            titleModalDescuento.html('Nuevo Descuento');
            modalDescuento.modal('show');
        }


        var search = getFormSearch('frm-search-Descuento', 'search_b', 'LoadRecordsButtonDescuento');

        var table_container_Descuento = $("#table_container_Descuento");

        table_container_Descuento.jtable({
            title: "Lista de Descuentos",
            paging: true,
            sorting: true,
            actions: {
                listAction: base_url + '/descuentos/list',
                deleteAction: base_url + '/descuentos/delete',
            },
            messages: {
                addNewRecord: 'Nuevo Descuento',
                editRecord: 'Editar Descuento',
            },
            toolbar: {
                items: [{
                    cssClass: 'buscador',
                    text: search
                },
                {
                    cssClass: 'btn-danger-admin',
                    text: '<i class="fa fa-plus"></i> Nuevo Descuento',
                    click: function () {
                        newGrupoContable();
                    }
                },
                {
                    cssClass: 'btn-primary',
                    text: '<i class="fa fa-file-excel-o"></i> Exportar a Excel',
                    click: function () {
                        $scope.openDoc('descuentos/excel', {});
                    }
                }]
            },
            fields: {
                id: {
                    key: true,
                    create: false,
                    edit: false,
                    list: true
                },
                descripcion: {
                    title: 'descripcion',
                },
                dFecIni: {
                    title: 'Fecha Incio',
                    width: '20%',
                    sorting: false,
                    display: function (data) {
                        return moment(data.record.dFecIni).format('DD/MM/YYYY');
                    }
                },
                dFecFin: {
                    title: 'Fecha Fin',
                    width: '20%',
                    sorting: false,
                    display: function (data) {
                        return moment(data.record.dFecFin).format('DD/MM/YYYY');
                    }
                },
                estado: {
                    title: 'Estado',
                    values: { 'I': 'Inactivo', 'A': 'Activo' },
                    type: 'checkbox',
                    defaultValue: 'A',

                },
                edit: {
                    width: '1%',
                    sorting: false,
                    edit: false,
                    create: false,
                    listClass: 'text-center',
                    display: function (data) {
                        return '<a href="javascript:void(0)" class="edit-descuento" data-id="' + data.record.id + '" title="Editar"><i class="fa fa-edit fa-1-5x"></i></a>';
                    }
                }
            },
            recordsLoaded: function (event, data) {
                $('.edit-descuento').click(function (e) {
                    var id = $(this).attr('data-id');
                    findDescuento(id);
                    e.preventDefault();
                });
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

        generateSearchForm('frm-search-Descuento', 'LoadRecordsButtonDescuento', function () {
            table_container_Descuento.jtable('load', {
                search: $('#search_b').val()
            });
        }, true);
    }

    function Config($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('descuentos', {
                url: '/descuentos',
                templateUrl: base_url + '/templates/descuentos/base.html',
                controller: 'DescuentoCtrl'
            });

        $urlRouterProvider.otherwise('/');
    }
})
    ();