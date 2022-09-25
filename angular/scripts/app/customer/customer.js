/**
 * Created by JAIR on 4/5/2017.
 */

(function () {
    'use strict';
    angular.module('sys.app.customers')
        .config(Config)
        .controller('CustomerCtrl', CustomerCtrl);

    Config.$inject = ['$stateProvider', '$urlRouterProvider'];
    CustomerCtrl.$inject = ['$scope', '_', 'RESTService', 'AlertFactory'];

    function CustomerCtrl($scope, _, RESTService, AlertFactory) {
        var modaClientes = $('#modaClientes');
        var titleModalClientes = $('#titleModalClientes');
        var id_tipoDoc_Venta = $("#id_tipoDoc_Venta");
        var departamento = $('#departamento');
        var provincia = $('#provincia');
        var distrito = $('#distrito');
        var id_tipocli = $("#id_tipocli");
        var tipodoc = $("#tipodoc");
        var razonsocial_cliente = $("#razonsocial_cliente");
        var documento = $("#documento");
        var contacto = $("#contacto");
        var direccion = $("#direccion");
        var correo_electronico = $("#correo_electronico");
        var celular = $("#celular");
        var telefono = $("#telefono");
        var cliente_id = $("#cliente_id");
        var cEstadoCivil = $("#cEstadoCivil");
        var idsector = $("#idsector");
        $scope.chkState = function () {
            var txt_state2 = (w_state.prop('checked')) ? 'Activo' : 'Inactivo';
            state_state.html(txt_state2);
        };

        var search = getFormSearch('frm-search-Customer', 'search_b', 'LoadRecordsButtonCustomer');

        var table_container_Customer = $("#table_container_Customer");

        function newCliente() {
            titleModalClientes.html('Nuevo Cliente');
            modaClientes.modal('show');
            var bandera = 'xxxxx';
            getDepartamento(bandera);
        }
        documento.keypress(function (e) {
            var code = (e.keyCode ? e.keyCode : e.which);
            if (code == 13) {
                $('#show_loading').removeClass('ng-hide');
                var documentoEnvio = documento.val();
                RESTService.get('customers/get_cliente_personaCus', documentoEnvio, function (response) {
                    if (!_.isUndefined(response.status) && response.status) {
                        var dataPersona = response.data;
                        if (dataPersona.length == 0) {
                            console.log("no hay en persona");
                            getDatosCliente();
                        } else {
                            console.log(dataPersona);
                            console.log("si hay ");
                            tipodoc.val(dataPersona[0].cTipodocumento).trigger('change');
                            var nclie = dataPersona[0].cRazonsocial;
                            if (nclie.length == 0) {
                                razonsocial_cliente.val(dataPersona[0].cNombrePersona);
                            } else {
                                razonsocial_cliente.val(dataPersona[0].cRazonsocial);
                            }

                            documento.val(dataPersona[0].cNumerodocumento);
                            // contacto.val(dataPersona[0].contacto);
                            direccion.val(dataPersona[0].cDireccion);
                            correo_electronico.val(dataPersona[0].cEmail);
                            celular.val(dataPersona[0].cCelular);

                            cEstadoCivil.val(dataPersona[0].cEstadoCivil);

                            getDepartamento(dataPersona[0].cDepartamento);
                            getProvincia(dataPersona[0].cProvincia, dataPersona[0].cDepartamento);
                            getDistrito(dataPersona[0].cCodUbigeo, dataPersona[0].cProvincia);
                            getSector("xxxxxx", dataPersona[0].cCodUbigeo);
                        }


                    } else {
                        AlertFactory.textType({
                            title: '',
                            message: 'Hubo un error . Intente nuevamente.',
                            type: 'info'
                        });
                    }
                });

            }
        });
        function getDatosCliente() {
            // RESTService.get("https://dniruc.apisperu.com/api/v1/dni/71980490?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6InJleXNhbmdhbWE3QGdtYWlsLmNvbSJ9.hfobQC8FM5IyKKSaa7usUXV0aY1Y8YthAhdN8LoMlMM", '', function(response) {
            //            console.log(response);
            //          });
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                // Si nada da error
                if (this.readyState == 4 && this.status == 200) {
                    // La respuesta, aunque sea JSON, viene en formato texto, por lo que tendremos que hace run parse
                    var data = JSON.parse(this.responseText);
                    console.log(data);
                    if (data.nombres != null) {
                        var razon = data.nombres + ' ' + data.apellidoPaterno + ' ' + data.apellidoMaterno;
                        razonsocial_cliente.val(razon);
                        $("#cNombres_c").val(data.nombres);
                        $("#cApepat_c").val(data.apellidoPaterno);
                        $("#cApemat_c").val(data.apellidoMaterno);
                    } else if (data.razonSocial != null) {
                        var razon = data.razonSocial;
                        var direc = data.direccion;
                        razonsocial_cliente.val(razon);
                        direccion.val(direc);
                       
                    } else {
                        razonsocial_cliente.val('');
                        direccion.val('');
                        AlertFactory.textType({
                            title: '',
                            message: 'No se encontró datos del cliente',
                            type: 'info'
                        });
                        $('#show_loading').addClass('ng-hide');
                    };
                    $('#show_loading').addClass('ng-hide');
                }
            };
            if (tipodoc.val() == '01') {
                if (documento.val().length == 8) {
                    var dni = documento.val();
                    xhttp.open("GET", "https://dniruc.apisperu.com/api/v1/dni/" + dni + "?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6InJleXNhbmdhbWE3QGdtYWlsLmNvbSJ9.hfobQC8FM5IyKKSaa7usUXV0aY1Y8YthAhdN8LoMlMM", true);
                    xhttp.setRequestHeader("Content-type", "application/json");
                    xhttp.send();
                } else {
                    AlertFactory.textType({
                        title: '',
                        message: 'dígitos del documento incompletos',
                        type: 'info'
                    });
                    razonsocial_cliente.val('');
                    direccion.val('');
                    $('#show_loading').addClass('ng-hide');
                }


            } else {
                if (documento.val().length == 11) {
                    var ruc = documento.val();
                    xhttp.open("GET", "https://dniruc.apisperu.com/api/v1/ruc/" + ruc + "?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6InJleXNhbmdhbWE3QGdtYWlsLmNvbSJ9.hfobQC8FM5IyKKSaa7usUXV0aY1Y8YthAhdN8LoMlMM", true);
                    xhttp.setRequestHeader("Content-type", "application/json");
                    xhttp.send();
                } else {
                    AlertFactory.textType({
                        title: '',
                        message: 'dígitos del documento incompletos',
                        type: 'info'
                    });
                    razonsocial_cliente.val('');
                    direccion.val('');
                    $('#show_loading').addClass('ng-hide');

                }

            }

        }

        function findCliente(id) {
            titleModalClientes.html('Editar Cliente');
            RESTService.get('customers/find', id, function (response) {
                if (!_.isUndefined(response.status) && response.status) {
                    var data_p = response.data;
                    tipodoc.val(data_p[0].tipodoc).trigger('change');
                    razonsocial_cliente.val(data_p[0].razonsocial_cliente);
                    documento.val(data_p[0].documento);
                    contacto.val(data_p[0].contacto);
                    direccion.val(data_p[0].direccion);
                    correo_electronico.val(data_p[0].correo_electronico);
                    celular.val(data_p[0].celular);
                    telefono.val(data_p[0].telefono);
                    cEstadoCivil.val(data_p[0].cEstadoCivil);
                    cliente_id.val(data_p[0].id);
                    id_tipocli.val(data_p[0].id_tipocli).trigger('change');
                    id_tipoDoc_Venta.val(data_p[0].IdTipoDocumento).trigger("change");
                    getDepartamento(data_p[0].cDepartamento);
                    getProvincia(data_p[0].cProvincia, data_p[0].cDepartamento);
                    getDistrito(data_p[0].cCodUbigeo, data_p[0].cProvincia);
                    getSector(data_p[0].idsector, data_p[0].cCodUbigeo);

                    modaClientes.modal('show');
                    console.log(data_p);
                } else {
                    AlertFactory.textType({
                        title: '',
                        message: 'Hubo un error al obtener el Cliente. Intente nuevamente.',
                        type: 'error'
                    });
                }
            });
        }

        function getDepartamento(bandera) {
            var id = "0";
            RESTService.get('customers/TraerDepartamentosCli', id, function (response) {
                if (!_.isUndefined(response.status) && response.status) {
                    var data_p = response.data;
                    departamento.html('');
                    departamento.append('<option value="" >Seleccione</option>');
                    _.each(response.data, function (item) {
                        if (item.cDepartamento == bandera) {
                            departamento.append('<option value="' + item.cDepartamento + '" selected >' + item.cDepartamento + '</option>');
                        } else {
                            departamento.append('<option value="' + item.cDepartamento + '" >' + item.cDepartamento + '</option>');
                        };

                    });

                } else {
                    AlertFactory.textType({
                        title: '',
                        message: 'Hubo un error al obtener el Artículo. Intente nuevamente.',
                        type: 'error'
                    });
                }

            });
        }
        function getProvincia(bandera, id) {
            RESTService.get('customers/TraerProvinciasCli', id, function (response) {
                if (!_.isUndefined(response.status) && response.status) {
                    var data_p = response.data;
                    console.log(data_p);
                    provincia.html('');
                    provincia.append('<option value="" >Seleccione</option>');
                    _.each(response.data, function (item) {
                        if (item.cProvincia == bandera) {
                            provincia.append('<option value="' + item.cProvincia + '" selected>' + item.cProvincia + '</option>');
                        } else {
                            provincia.append('<option value="' + item.cProvincia + '">' + item.cProvincia + '</option>');
                        }

                    });

                } else {
                    AlertFactory.textType({
                        title: '',
                        message: 'Hubo un error . Intente nuevamente.',
                        type: 'error'
                    });
                }

            });
        }
        function getDistrito(bandera, id) {
            RESTService.get('customers/TraerDistritosCli', id, function (response) {
                if (!_.isUndefined(response.status) && response.status) {
                    var data_p = response.data;
                    console.log(data_p);
                    distrito.html('');
                    distrito.append('<option value="" >Seleccione</option>');
                    _.each(response.data, function (item) {
                        if (item.cCodUbigeo == bandera) {
                            distrito.append('<option value="' + item.cCodUbigeo + '" selected>' + item.cDistrito + '</option>');
                        } else {
                            distrito.append('<option value="' + item.cCodUbigeo + '">' + item.cDistrito + '</option>');
                        }

                    });

                } else {
                    AlertFactory.textType({
                        title: '',
                        message: 'Hubo un error al obtener el Artículo. Intente nuevamente.',
                        type: 'error'
                    });
                }

            });
        }
        function getSector(bandera, id) {
            RESTService.get('customers/traerSectorli', id, function (response) {
                if (!_.isUndefined(response.status) && response.status) {
                    var data_p = response.data;
                    console.log(data_p);
                    idsector.html('');
                    idsector.append('<option value="" >Seleccione</option>');
                    _.each(response.data, function (item) {
                        if (item.id == bandera) {
                            idsector.append('<option value="' + item.id + '" selected>' + item.descripcion + '</option>');
                        } else {
                            idsector.append('<option value="' + item.id + '">' + item.descripcion + '</option>');
                        }

                    });

                } else {
                    AlertFactory.textType({
                        title: '',
                        message: 'Hubo un error al obtener el Artículo. Intente nuevamente.',
                        type: 'error'
                    });
                }

            });
        }
        departamento.change(function () {
            var bandera = 'xxxxxx';
            var id = departamento.val();
            getProvincia(bandera, id);
        });

        distrito.change(function () {
            var bandera = 'xxxxxx';
            var id = distrito.val();
            getSector(bandera, id);
        });

        provincia.change(function () {
            var bandera = 'xxxxxx';
            var id = provincia.val();
            getDistrito(bandera, id);

        });
        modaClientes.on('hidden.bs.modal', function (e) {
            cleanCliente();
        });
        function cleanCliente() {
            cleanRequired();
            titleModalClientes.html('');
            tipodoc.val('01').trigger("change");
            id_tipocli.val('').trigger("change");
            razonsocial_cliente.val('');
            documento.val('');
            id_tipoDoc_Venta.val("").trigger("change");
            contacto.val('');
            direccion.val('');
            correo_electronico.val('');
            celular.val('');
            telefono.val('');
            cliente_id.val('');
            departamento.val('');
            provincia.val('');
            distrito.val('');
            idsector.val("");
            cEstadoCivil.val('');
            provincia.html('');
            distrito.html('');
        };
        $scope.saveCliente = function () {
            var bval = true;
            bval = bval && tipodoc.required();
            bval = bval && id_tipocli.required();
            bval = bval && id_tipoDoc_Venta.required();
            bval = bval && razonsocial_cliente.required();
            bval = bval && documento.required();
            bval = bval && celular.required();
            bval = bval && distrito.required();
            // bval = bval && idsector.required();
            if (tipodoc.val() == '01' && documento.val().length != 8) {
                AlertFactory.textType({
                    title: '',
                    message: 'Longitud de LE/DNI INCORRECTA',
                    type: 'info'
                });
                bval = false;
            };
            if (tipodoc.val() == '06' && documento.val().length != 11) {
                AlertFactory.textType({
                    title: '',
                    message: 'Longitud de RUC INCORRECTA',
                    type: 'info'
                });
                bval = false;
            };
            if (id_tipoDoc_Venta.val() == '01' && tipodoc.val() == '01') {
                AlertFactory.textType({
                    title: '',
                    message: ' Tipo de documento del cliente debe ser R.U.C para el tipo documento venta factura',
                    type: 'info'
                });
                bval = false;
            }

            if (bval) {
                var params = {
                    'tipodoc': tipodoc.val(),
                    'razonsocial_cliente': razonsocial_cliente.val(),
                    'documento': documento.val(),
                    'contacto': contacto.val(),
                    'direccion': direccion.val(),
                    'correo_electronico': correo_electronico.val(),
                    'celular': celular.val(),
                    'telefono': telefono.val(),
                    'distrito': distrito.val(),
                    'id_tipocli': id_tipocli.val(),
                    'idsector': idsector.val(),
                    'IdTipoDocumento': id_tipoDoc_Venta.val(),
                    'cEstadoCivil': cEstadoCivil.val(),
                    'cNombres':$("#cNombres_c").val(),
                    'cApepat':$("#cApepat_c").val(),
                    'cApemat':$("#cApemat_c").val(),

                };
                var cli_id = (cliente_id.val() === '') ? 0 : cliente_id.val();
                RESTService.updated('customers/createCliente', cli_id, params, function (response) {
                    if (!_.isUndefined(response.status) && response.status) {
                        modaClientes.modal('hide');
                        AlertFactory.textType({
                            title: '',
                            message: 'El registro se guardó correctamente',
                            type: 'success'
                        });
                        LoadRecordsButtonCustomer.click();
                    } else {
                        var msg_ = (_.isUndefined(response.message)) ?
                            'No se pudo guardar el Cliente. Intente nuevamente.' : response.message;
                        AlertFactory.textType({
                            title: '',
                            message: msg_,
                            type: 'info'
                        });
                    }
                });
            }

        };
        function getDataFormCustomer() {
            RESTService.all('customers/data_form', '', function (response) {
                if (!_.isUndefined(response.status) && response.status) {
                    var tip = response.tipoc_doc;
                    var tipo_clie = response.tipo_clie;
                    var tipoc_doc_venta = response.tipoc_doc_venta;
                    tip.map(function (index) {
                        tipodoc.append('<option value="' + index.Codigo + '">' + index.TipoDocumento + '</option>');
                    });
                    id_tipocli.append('<option value="">Seleccionar</option>');
                    tipo_clie.map(function (index) {
                        id_tipocli.append('<option value="' + index.id + '">' + index.descripcion + '</option>');
                    });
                    id_tipoDoc_Venta.append('<option value="">Seleccionar</option>');
                    tipoc_doc_venta.map(function (index) {
                        id_tipoDoc_Venta.append('<option value="' + index.IdTipoDocumento + '">' + index.Descripcion + '</option>');
                    });

                    //  _.each(response.operaciones, function(item) {
                    //    
                    // });

                }
            }, function () {
                getDataFormCustomer();
            });
        }
        getDataFormCustomer();

        table_container_Customer.jtable({
            title: "Lista de Clientes",
            paging: true,
            sorting: true,
            actions: {
                listAction: base_url + '/customers/list',
                deleteAction: base_url + '/customers/delete',
            },
            messages: {
                addNewRecord: 'Nuevo Cliente',
                editRecord: 'Editar Cliente',
            },
            toolbar: {
                items: [{
                    cssClass: 'buscador',
                    text: search
                }, {
                    cssClass: 'btn-primary',
                    text: '<i class="fa fa-file-excel-o"></i> Exportar a Excel',
                    click: function () {
                        $scope.openDoc('customers/excel', {});
                    }
                }, {
                    cssClass: 'btn-danger-admin',
                    text: '<i class="fa fa-plus"></i> Nuevo Cliente',
                    click: function () {
                        newCliente();
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
                tipodoc: {
                    title: 'Tipo Documento',
                    options: base_url + '/customers/getTipoDocumento',
                },
                id_tipocli: {
                    title: 'Tipo Cliente',
                    options: base_url + '/customers/getTipoCliente',
                },
                IdTipoDocumento: {
                    title: 'Tipo Documento Venta',
                    options: base_url + '/customers/getTipoDocumentoVenta',
                },
                documento: {
                    title: 'Documento',
                },
                razonsocial_cliente: {
                    title: 'Razon Social',

                },
                contacto: {
                    title: 'Contacto',

                },
                direccion: {
                    title: 'Dirección',

                },
                correo_electronico: {
                    title: 'Correo',

                },
                celular: {
                    title: 'Celular',

                },
                ubigeo: {
                    title: 'Distrito',
                    options: base_url + '/customers/getDistritoCli'

                },
                edit: {
                    width: '1%',
                    sorting: false,
                    edit: false,
                    create: false,
                    listClass: 'text-center',
                    display: function (data) {
                        return '<a href="javascript:void(0)" class="edit-Cliente" data-id="' + data.record.id
                            + '" title="Editar"><i class="fa fa-edit fa-1-5x"></i></a>';
                    }
                }

            },
            recordsLoaded: function (event, data) {
                $('.edit-Cliente').click(function (e) {
                    var id = $(this).attr('data-id');
                    findCliente(id);
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
                bval = bval && data.form.find('input[name="tipodoc"]').required();
                bval = bval && data.form.find('input[name="documento"]').required();
                bval = bval && data.form.find('input[name="razonsocial_cliente"]').required();
                return bval;
            }
        });

        generateSearchForm('frm-search-Customer', 'LoadRecordsButtonCustomer', function () {
            table_container_Customer.jtable('load', {
                search: $('#search_b').val()
            });
        }, true);
    }

    function Config($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('customers', {
                url: '/customers',
                templateUrl: base_url + '/templates/customers/base.html',
                controller: 'CustomerCtrl'
            });

        $urlRouterProvider.otherwise('/');
    }
})
    ();