/**
 * Created by JAIR on 4/5/2017.
 */

(function () {
    'use strict';
    angular.module('sys.app.objetivos')
        .config(Config)
        .controller('objetivoCtrl', objetivoCtrl);

    Config.$inject = ['$stateProvider', '$urlRouterProvider'];
    objetivoCtrl.$inject = ['$scope', '_', 'RESTService', 'AlertFactory'];

    function objetivoCtrl($scope, _, RESTService, AlertFactory) {
        var modalObjetivos = $("#modalObjetivos");
        var titlemodalObjetivos = $("#titlemodalObjetivos");
        var modalDetalle = $("#modalDetalle");
        var descripcion = $("#descripcion");
        var id_tipoobj = $("#id_tipoobj");
        var iEstado = $("#iEstado");
        var idMoneda = $("#IdMoneda");
        var nAno = $("#nAno");
        var id_objetivo = $("#id_objetivo");
        var btn_aprobar = $("#btn_aprobar");
        var nPeriodo = $("#nPeriodo");
        var id_TipoPers = $("#id_TipoPers");
        var id_Persona = $("#id_Persona");
        var nCant = $("#nCant");
        var nMonto = $("#nMonto");
        var btn_guardar_objetivo = $("#btn_guardar_objetivo");
        var w_objetivo_detalle = $("#w_objetivo_detalle");
        var idDetalle_Delete = [];

        function cleanmodalObjetivos() {
            cleanRequired();
            titlemodalObjetivos.html('');
            w_objetivo_detalle.html('');
            descripcion.val('');
            id_tipoobj.val('').trigger('change');
            iEstado.val('').trigger('change');
            idMoneda.val('').trigger('change');
            nAno.val("");
            btn_aprobar.prop('disabled', true);
            btn_guardar_objetivo.prop('disabled', false);
            idDetalle_Delete = [];
            id_objetivo.val("");
        }

        $scope.desaprobar_objetivo = function () {

            var id = id_objetivo.val();
            RESTService.get('objetivos/desaprobarObjetivo', id, function (response) {
                if (!_.isUndefined(response.status) && response.status) {
                    var data_p = response.data;
                    if (data_p.iEstado == 0) {
                        btn_aprobar.prop('disabled', false);
                        btn_guardar_objetivo.prop('disabled', false);
                        $("#btn_desaprobar").prop('disabled', true);
                        iEstado.val(0).trigger('change');
                        AlertFactory.textType({
                            title: '',
                            message: 'El objetivo se desaprobo correctamente',
                            type: 'success'
                        });
                    };
                    LoadRecordsButtonobjetivo.click();

                } else {
                    AlertFactory.textType({
                        title: '',
                        message: 'Hubo un error al obtener la lista. Intente nuevamente.',
                        type: 'error'
                    });
                }
            });
        }

        $scope.Aprobar_objetivo = function () {
            var id = id_objetivo.val();
            RESTService.get('objetivos/aprobarObjetivo', id, function (response) {
                if (!_.isUndefined(response.status) && response.status) {
                    var data_p = response.data;
                    if (data_p.iEstado == 1) {
                        btn_aprobar.prop('disabled', true);
                        btn_guardar_objetivo.prop('disabled', true);
                        iEstado.val(1).trigger('change');
                        AlertFactory.textType({
                            title: '',
                            message: 'El objetivo se aprobó correctamente',
                            type: 'success'
                        });
                    };
                    LoadRecordsButtonobjetivo.click();

                } else {
                    AlertFactory.textType({
                        title: '',
                        message: 'Hubo un error al obtener la lista. Intente nuevamente.',
                        type: 'error'
                    });
                }
            });
        }
        function cleanmodalDetalle() {
            cleanRequired();
            nPeriodo.val('').trigger('change');
            id_TipoPers.val('').trigger('change');
            id_Persona.val('').trigger('change');
            nCant.val('');
            nMonto.val('');
        }
        modalObjetivos.on('hidden.bs.modal', function (e) {
            cleanmodalObjetivos();
        });
        modalDetalle.on('hidden.bs.modal', function (e) {
            cleanmodalDetalle();
        });
        function findObjetivo(id) {
            titlemodalObjetivos.html('Editar Objetivo');
            RESTService.get('objetivos/find', id, function (response) {
                if (!_.isUndefined(response.status) && response.status) {
                    var data_p = response.data;
                    descripcion.val(data_p.descripcion);
                    id_tipoobj.val(data_p.id_tipoobj).trigger("change");
                    iEstado.val(data_p.iEstado).trigger("change");;
                    idMoneda.val(data_p.IdMoneda).trigger("change");;
                    nAno.val(data_p.nAno);
                    id_objetivo.val(data_p.id);

                    console.log(data_p.detalle);
                    _.each(data_p.detalle, function (c) {
                        var periodo = '';
                        if (c.nPeriodo == 1) {
                            periodo = 'Enero';
                        } else if (c.nPeriodo == 2) {
                            periodo = 'Febrero';
                        } else if (c.nPeriodo == 3) {
                            periodo = 'Marzo';
                        } else if (c.nPeriodo == 4) {
                            periodo = 'Abril';
                        } else if (c.nPeriodo == 5) {
                            periodo = 'Mayo';
                        } else if (c.nPeriodo == 6) {
                            periodo = 'Junio';
                        } else if (c.nPeriodo == 7) {
                            periodo = 'Julio';
                        } else if (c.nPeriodo == 8) {
                            periodo = 'Agosto';
                        } else if (c.nPeriodo == 9) {
                            periodo = 'Septiembre';
                        } else if (c.nPeriodo == 10) {
                            periodo = 'Obtubre';
                        } else if (c.nPeriodo == 11) {
                            periodo = 'Noviembre';
                        } else if (c.nPeriodo == 12) {
                            periodo = 'Diciembre';
                        }
                        addToLoca(c.id_obj, c.nPeriodo, periodo, c.id_TipoPers, c.tipo_persona, c.id_Persona, c.persona, Number(c.nCant), Number(c.nMonto));
                    });
                    if (data_p.iEstado == 0) {
                        btn_guardar_objetivo.prop('disabled', false);
                        btn_aprobar.prop('disabled', false);
                        iEstado.val(data_p.iEstado).trigger("change");
                        $("#btn_desaprobar").attr("disabled", "disabled");
                    } else {
                        $("#btn_desaprobar").removeAttr("disabled");
                        btn_guardar_objetivo.prop('disabled', true);
                    };
                    
                    modalObjetivos.modal('show');
                } else {
                    AlertFactory.textType({
                        title: '',
                        message: 'Hubo un error al obtener el modalObjetivos. Intente nuevamente.',
                        type: 'error'
                    });
                }
            });
        }

        $scope.chkState = function () {
            var txt_state2 = (w_state.prop('checked')) ? 'Activo' : 'Inactivo';
            state_state.html(txt_state2);
        };
        $scope.AgregarTable = function () {
            var bval = true;
            bval = bval && nPeriodo.required();
            bval = bval && id_TipoPers.required();
            bval = bval && id_Persona.required();
            bval = bval && nCant.required();
            bval = bval && nMonto.required();
            if (bval) {
                var tipo_persona = $("#id_TipoPers option:selected").text();
                var persona = $("#id_Persona option:selected").text();
                var periodo = $("#nPeriodo option:selected").text();
                if (id_objetivo.val() == '') {
                    var id_ob = 0;
                } else {
                    var id_ob = id_objetivo.val();
                };
                addToLoca(id_ob, nPeriodo.val(), periodo, id_TipoPers.val(), tipo_persona, id_Persona.val(), persona, nCant.val(), nMonto.val());
            }

        }
        id_Persona.select2();
        id_TipoPers.change(function () {
            var id = id_TipoPers.val();
            if (id != '') {
                RESTService.get('objetivos/get_personas', id, function (response) {
                    if (!_.isUndefined(response.status) && response.status) {
                        id_Persona.html('');
                        id_Persona.append('<option value="" selected>Seleccionar</option>');
                        _.each(response.personas, function (item) {
                            id_Persona.append('<option value="' + item.id + '" >' + item.descripcion + '</option>');
                        });
                    } else {
                        AlertFactory.textType({
                            title: '',
                            message: 'No se pudo. Intente nuevamente.',
                            type: 'info'
                        });
                    }

                });
            } else {
                id_Persona.html('');
            }

        });
        function getDataForm() {
            RESTService.all('objetivos/data_form', '', function (response) {
                if (!_.isUndefined(response.status) && response.status) {
                    id_tipoobj.append('<option value="" selected>Seleccionar</option>');
                    _.each(response.objetivo, function (item) {
                        id_tipoobj.append('<option value="' + item.id + '">' + item.descripcion + '</option>');
                    });
                    id_TipoPers.append('<option value="" selected>Seleccionar</option>');
                    _.each(response.tipoPersona, function (item) {
                        id_TipoPers.append('<option value="' + item.id + '">' + item.descripcion + '</option>');
                    });
                }
            }, function () {
                getDataForm();
            });
        }
        getDataForm();
        function getDataFormMoneda() {
            RESTService.all('objetivos/data_formRegis', '', function (response) {
                if (!_.isUndefined(response.status) && response.status) {
                    idMoneda.append('<option value="" selected>Seleccionar</option>');
                    _.each(response.moneda, function (item) {
                        idMoneda.append('<option  value="' + item.Value + '">' + item.DisplayText + '</option>');
                    });

                }
            }, function () {
                getDataFormMoneda();
            });
        }
        getDataFormMoneda();

        var search = getFormSearch('frm-search-objetivo', 'search_b', 'LoadRecordsButtonobjetivo');

        var table_container_objetivo = $("#table_container_objetivo");

        function newObjetvo() {
            $("#btn_desaprobar").attr("disabled", "disabled");
            modalObjetivos.modal('show');
            titlemodalObjetivos.html('Nuevo Objetivo');
        }
        $scope.addDetalle_objetivo = function () {
            var bval = true;
            bval = bval && descripcion.required();
            bval = bval && id_tipoobj.required();
            bval = bval && idMoneda.required();
            bval = bval && nAno.required();
            if (bval) {
                modalDetalle.modal('show');
            }
        }
        function addToLoca(id_ob, idPeriodo, periodo, idTipoPersona, tipo_persona, idPersona, persona, cantidad, monto) {
            var code = id_ob + '_' + idPeriodo + '_' + idTipoPersona + '_' + idPersona;
            console.log(code);
            if ($('#tr_loca_' + code).length > 0) {
                AlertFactory.showWarning({
                    title: '',
                    message: 'Ya se asignó esta persona en este mismo periodo'
                });
                return false;
            }
            var tr = $('<tr id="tr_loca_' + code + '"></tr>');
            var td1 = $('<td>' + periodo + '</td>');
            var td2 = $('<td>' + tipo_persona + '</td>');
            var td3 = $('<td>' + persona + '</td>');
            var td4 = $('<td></td>');
            var td5 = $('<td></td>');
            var inp = $('<input type="hidden" class="id_periodo_a" value="' + idPeriodo + '" />');
            var inp2 = $('<input type="hidden" class="id_tipo_persona_a" value="' + idTipoPersona + '" />');
            var inp3 = $('<input type="hidden" class="id_persona_a" value="' + idPersona + '" />');
            var inp4 = $('<input type="number" class="cantidad_a form-control input-sm" value="' + cantidad + '" />');
            var inp5 = $('<input type="number" class="monto_a form-control input-sm" min="1" value="' + monto + '" />');
            td1.append(inp);
            td2.append(inp2);
            td3.append(inp3);
            td4.append(inp4);
            td5.append(inp5);
            var td6 = $('<td class="text-center"></td>');
            var btn = $('<button class="btn btn-danger btn-xs delWarehouseLoca" data-id="' + code + '" type="button"><span class="fa fa-trash"></span></button>');
            td6.append(btn);
            tr.append(td1).append(td2).append(td3).append(td4).append(td5).append(td6);
            w_objetivo_detalle.append(tr);

            $('.delWarehouseLoca').click(function (e) {
                var code = $(this).attr('data-id');
                AlertFactory.confirm({
                    title: '',
                    message: '¿Está seguro que desea quitar esta información?',
                    confirm: 'Si',
                    cancel: 'No'
                }, function () {
                    $('#tr_loca_' + code).remove();
                    idDetalle_Delete.push(code);


                });
                e.preventDefault();
            });
            modalDetalle.modal("hide");
        }
        $scope.saveObjetivo = function () {
            var bval = true;
            bval = bval && descripcion.required();
            bval = bval && id_tipoobj.required();
            bval = bval && idMoneda.required();
            bval = bval && nAno.required();
            if (bval && w_objetivo_detalle.html() === '') {
                AlertFactory.showWarning({
                    title: '',
                    message: 'Debe agregar mínimo 1 persona para el objetivo'
                });
                return false;
            }
            if (bval) {
                var id_periodo_a = [];
                $.each($('.id_periodo_a'), function (idx, item) {
                    id_periodo_a[idx] = $(item).val();
                });
                id_periodo_a = id_periodo_a.join(',');

                var id_tipo_persona_a = [];
                $.each($('.id_tipo_persona_a'), function (idx, item) {
                    id_tipo_persona_a[idx] = $(item).val();
                });
                id_tipo_persona_a = id_tipo_persona_a.join(',');

                var id_persona_a = [];
                $.each($('.id_persona_a'), function (idx, item) {
                    id_persona_a[idx] = $(item).val();
                });
                id_persona_a = id_persona_a.join(',');

                var cantidad_a = [];
                $.each($('.cantidad_a'), function (idx, item) {
                    cantidad_a[idx] = $(item).val();
                });
                cantidad_a = cantidad_a.join(',');

                var monto_a = [];
                $.each($('.monto_a'), function (idx, item) {
                    monto_a[idx] = $(item).val();
                });
                monto_a = monto_a.join(',');
                var params = {

                    'descripcion': descripcion.val(),
                    'id_tipoobj': id_tipoobj.val(),
                    'IdMoneda': idMoneda.val(),
                    'nAno': nAno.val(),
                    'nPeriodo': id_periodo_a,
                    'id_TipoPers': id_tipo_persona_a,
                    'id_Persona': id_persona_a,
                    'nCant': cantidad_a,
                    'nMonto': monto_a,
                    'id_delete': idDetalle_Delete,
                };
                var w_id = (id_objetivo.val() === '') ? 0 : id_objetivo.val();

                RESTService.updated('objetivos/saveObjetivos', w_id, params, function (response) {
                    if (!_.isUndefined(response.status) && response.status) {
                        AlertFactory.textType({
                            title: '',
                            message: 'El objetivo se guardó correctamente.',
                            type: 'success'
                        });
                        modalObjetivos.modal('hide');
                        LoadRecordsButtonobjetivo.click();
                    } else {
                        var msg_ = (_.isUndefined(response.message)) ?
                            'No se pudo guardar el objetivo. Intente nuevamente.' : response.message;
                        AlertFactory.textType({
                            title: '',
                            message: msg_,
                            type: 'error'
                        });
                    }
                });
            }
        };
        table_container_objetivo.jtable({
            title: "Lista de Objetivos",
            paging: true,
            sorting: true,
            actions: {
                listAction: base_url + '/objetivos/list',
                deleteAction: base_url + '/objetivos/delete',
            },
            messages: {
                addNewRecord: 'Nuevo objetivo',
                editRecord: 'Editar objetivo',
            },
            toolbar: {
                items: [{
                    cssClass: 'buscador',
                    text: search
                }, {
                    cssClass: 'btn-primary',
                    text: '<i class="fa fa-file-excel-o"></i> Exportar a Excel',
                    click: function () {
                        $scope.openDoc('objetivos/excel', {});
                    }
                }, {
                    cssClass: 'btn-danger-admin',
                    text: '<i class="fa fa-plus"></i> Nuevo Objetivo',
                    click: function () {
                        newObjetvo();
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
                descripcion: {
                    title: 'Objetivo',
                },
                id_tipoobj: {
                    title: 'Tipo de Objetivo',
                    options: base_url + '/objetivos/getTipoObjetivo',
                },
                IdMoneda: {
                    title: 'Moneda',
                    options: base_url + '/objetivos/getMonedas',
                },
                nAno: {
                    title: 'Año',
                },
                iEstado: {
                    title: 'Estado',
                    values: { 0: 'Registrado', 1: 'Aprobado' },
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
                        return '<a href="javascript:void(0)" title="Editar" class="edit_w" data-code="' +
                            data.record.id + '"><i class="fa fa-pencil-square-o fa-1-5x fa-green"></i></a>';
                    }
                }

            },
            recordsLoaded: function (event, data) {
                $('.edit_w').click(function (e) {
                    var id = $(this).attr('data-code');
                    findObjetivo(id);
                    $("#btn_desaprobar").removeAttr("disabled");
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

        generateSearchForm('frm-search-objetivo', 'LoadRecordsButtonobjetivo', function () {
            table_container_objetivo.jtable('load', {
                search: $('#search_b').val()
            });
        }, true);
    }

    function Config($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('objetivos', {
                url: '/objetivos',
                templateUrl: base_url + '/templates/objetivos/base.html',
                controller: 'objetivoCtrl'
            });

        $urlRouterProvider.otherwise('/');
    }
})
    ();