/**
 * Created by JAIR on 4/5/2017.
 */

(function () {
    'use strict';
    angular.module('sys.app.companias')
        .config(Config)
        .controller('CompaniaCtrl', CompaniaCtrl);

    Config.$inject = ['$stateProvider', '$urlRouterProvider'];
    CompaniaCtrl.$inject = ['$scope', '_', 'RESTService', 'AlertFactory'];

    function CompaniaCtrl($scope, _, RESTService, AlertFactory) {
        var modalCompania = $("#modalCompania");
        var titleModalCompania = $("#titleModalCompania");
        var idCompania = $("#IdCompania");
        var ruc = $("#Ruc");
        var nombreComercial = $("#NombreComercial");
        var razonSocial = $("#RazonSocial");
        var direccion = $("#Direccion");
        var telefono1 = $("#Telefono1");
        var telefono2 = $("#Telefono2");
        var telefono3 = $("#Telefono3");
        var telefono4 = $("#Telefono4");
        var estado = $("#Estado");
        var contacto = $("#Contacto");
        var correo = $("#Correo");
        var base = $("#Base");
        var rutaData = $("#RutaData");
        var rutaData = $("#RutaData");
        var rutaLog = $("#RutaLog");
        var fechaUltBackup = $("#FechaUltBackup");
        var state_text = $("#state_text");
        var lema1 = $("#lema1");
        var lema2 = $("#lema2");
        var direcciones_oficinas = $("#direcciones_oficinas");

        var departamento = $('#departamento');
        var provincia = $('#provincia');
        var distrito = $('#distrito');


        function getDepartamento(bandera) {
            var id = "0";
            RESTService.get('shops/TraerDepartamentos', id, function (response) {
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
            RESTService.get('shops/TraerProvincias', id, function (response) {
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
            RESTService.get('shops/TraerDistritos', id, function (response) {
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

        departamento.change(function () {
            var bandera = 'xxxxxx';
            var id = departamento.val();
            getProvincia(bandera, id);
        });

        provincia.change(function () {
            var bandera = 'xxxxxx';
            var id = provincia.val();
            getDistrito(bandera, id);

        });


        var bandera = 'xxxxx';
        getDepartamento(bandera);


        $('.i-checks').iCheck({
            checkboxClass: 'icheckbox_square-green'
        }).on('ifChanged', function (event) {
            $(event.target).click();
            $scope.chkState();
        });

        $scope.chkState = function () {
            var txt = (estado.prop('checked')) ? 'Activo' : 'Inactivo';
            state_text.html(txt);
        };
        function newCompania() {
            titleModalCompania.html('Nueva Compania');
            modalCompania.modal('show');
        }
        ruc.keypress(function (e) {
            var code = (e.keyCode ? e.keyCode : e.which);
            if (code == 13) {
                $('#show_loading').removeClass('ng-hide');
                getDatosCliente();
            }
        });
        function cleanCompania() {
            cleanRequired();
            titleModalCompania.val("");
            idCompania.val("");
            ruc.val("");
            nombreComercial.val("");
            razonSocial.val("");
            direccion.val("");
            telefono1.val("");
            telefono2.val("");
            telefono3.val("");
            telefono4.val("");
            estado.val("");
            contacto.val("");
            correo.val("");
            base.val("");
            rutaData.val("");
            rutaData.val("");
            rutaLog.val("");
            lema1.val("");
            lema2.val("");
            direcciones_oficinas.val("");
            fechaUltBackup.val("");
            estado.prop('checked', true).iCheck('update');
            $scope.chkState();
        }
        modalCompania.on('hidden.bs.modal', function (e) {
            cleanCompania();
        });
        function findCompania(id) {
            titleModalCompania.html('Editar Compania');
            RESTService.get('companias/find', id, function (response) {
                if (!_.isUndefined(response.status) && response.status) {
                    var data_p = response.data;
                    // console.log(data_p);
                    var fec = moment(data_p.FechaUltBackup).format('YYYY-MM-DD');
                    fechaUltBackup.val(fec);
                    idCompania.val(data_p.IdCompania);
                    ruc.val(data_p.Ruc);
                    nombreComercial.val(data_p.NombreComercial);
                    razonSocial.val(data_p.RazonSocial);
                    direccion.val(data_p.Direccion);
                    telefono1.val(data_p.Telefono1);
                    telefono2.val(data_p.Telefono2);
                    telefono3.val(data_p.Telefono3);
                    telefono4.val(data_p.Telefono4);
                    estado.val(data_p.Estado);
                    contacto.val(data_p.Contacto);
                    correo.val(data_p.Correo);
                    base.val(data_p.Base);
                    rutaData.val(data_p.RutaData);
                    rutaData.val(data_p.RutaData);
                    rutaLog.val(data_p.RutaLog);
                    lema1.val(data_p.lema1);
                    lema2.val(data_p.lema2);
                    $("#pie_1").val(data_p.pie_1);
                    $("#pie_2").val(data_p.pie_2);
                    $("#pie_3").val(data_p.pie_3);
                    $("#ruta_logo").val(data_p.ruta_logo);
                    direcciones_oficinas.val(data_p.direcciones_oficinas);
                    // alert(data_p.cDepartamento);
                    getDepartamento(data_p.cDepartamento);
                     getProvincia(data_p.cProvincia,data_p.cDepartamento);
                     getDistrito(data_p.cCodUbigeo,data_p.cProvincia);

                    var chk_state = (data_p.Estado == '1');

                    estado.prop('checked', chk_state).iCheck('update');
                    $scope.chkState();

                    modalCompania.modal('show');

                    
                } else {
                    AlertFactory.textType({
                        title: '',
                        message: 'Hubo un error al obtener el Grupo Contable. Intente nuevamente.',
                        type: 'error'
                    });
                }
            });
        }
        $scope.saveCompania = function () {
            var bval = true;
            bval = bval && ruc.required();
            bval = bval && razonSocial.required();
            bval = bval && direccion.required();
            bval = bval && telefono1.required();
            bval = bval && correo.required();
            bval = bval && base.required();
            bval = bval && rutaData.required();
            bval = bval && rutaData.required();
            bval = bval && rutaLog.required();
            bval = bval && fechaUltBackup.required();
            console.log(razonSocial.val());
            console.log("razon social");
            if (ruc.val().length != 11) {
                AlertFactory.textType({
                    title: '',
                    message: 'Longitud de RUC INCORRECTA',
                    type: 'info'
                });
                bval = false;
            };
            if (bval) {
                //  var params = {
                //     'Ruc':ruc.val(),
                //     'NombreComercial':nombreComercial.val(),
                //     'RazonSocial':razonSocial.val(),
                //     'Direccion':direccion.val(),
                //     'Telefono1':telefono1.val(),
                //     'Telefono2':telefono2.val(),
                //     'Telefono3':telefono3.val(),
                //     'Telefono4':telefono4.val(),
                //     'lema1':lema1.val(),
                //     'lema2':lema2.val(),
                //     'direcciones_oficinas':direcciones_oficinas.val(),
                //     'Estado':((estado.prop('checked')) ? '1' : '0'),
                //     'Contacto':contacto.val(),
                //     'Correo':correo.val(),
                //     'Base':base.val(),
                //     'RutaData':rutaData.val(),
                //     'RutaData':rutaData.val(),
                //     'RutaLog':rutaLog.val(),
                //     'FechaUltBackup':fechaUltBackup.val(),
                //  };

                var idPe = (idCompania.val() === '') ? 0 : idCompania.val();

                var formData = new FormData(document.getElementById("formulario-compania"));
                // alert($('#departamento option:selected').text());
                // console.log(formData);
                formData.append("departamento", $('#departamento option:selected').text());
                formData.append("provincia", $('#provincia option:selected').text());
                formData.append("distrito", $('#distrito option:selected').text());
                $.ajax({
                    url: 'companias/createCompania/' + idPe,
                    type: "post",
                    dataType: "json",
                    data: formData,
                    cache: false,
                    contentType: false,
                    processData: false
                }).done(function (response) {
                    // console.log(res);
                    if (!_.isUndefined(response.status) && response.status) {
                        modalCompania.modal('hide');
                        AlertFactory.textType({
                            title: '',
                            message: 'El registro se guardó correctamente',
                            type: 'success'
                        });
                        LoadRecordsButtonCompania.click();
                    } else {
                        var msg_ = (_.isUndefined(response.message)) ?
                            'No se pudo guardar la compania. Intente nuevamente.' : response.message;
                        AlertFactory.textType({
                            title: '',
                            message: msg_,
                            type: 'info'
                        });
                    }
                });

                //   RESTService.updated('companias/createCompania', idPe, params, function(response) {
                //     if (!_.isUndefined(response.status) && response.status) {
                //         modalCompania.modal('hide');
                //          AlertFactory.textType({
                //             title: '',
                //             message: 'El registro se guardó correctamente',
                //             type: 'success'
                //         });
                //         LoadRecordsButtonCompania.click();
                //     } else {
                //         var msg_ = (_.isUndefined(response.message)) ?
                //             'No se pudo guardar la compania. Intente nuevamente.' : response.message;
                //         AlertFactory.textType({
                //             title: '',
                //             message: msg_,
                //             type: 'info'
                //         });
                //     }
                // });
            }

        };
        function getDatosCliente() {

            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                // Si nada da error
                if (this.readyState == 4 && this.status == 200) {
                    // La respuesta, aunque sea JSON, viene en formato texto, por lo que tendremos que hace run parse
                    var data = JSON.parse(this.responseText);
                    console.log(data);
                    if (data.nombres != null) {
                        var razon = data.nombres + ' ' + data.apellidoPaterno + ' ' + data.apellidoMaterno;
                        // cApepat.val(data.apellidoPaterno);
                        // cApemat.val(data.apellidoMaterno);
                        razonSocial.val(razon);
                        // cNombres.val(data.nombres);
                    } else if (data.razonSocial != null) {
                        var razon = data.razonSocial;
                        var direc = data.direccion;
                        razonSocial.val(razon);
                        direccion.val(direc);
                    } else if (data.nombreComercial != null) {
                        var NCO = data.nombreComercial;
                        nombreComercial.val(NCO);
                    } else {
                        razonSocial.val("");
                        nombreComercial.val('');
                        direccion.val('');
                        AlertFactory.textType({
                            title: '',
                            message: 'No se encontró datos',
                            type: 'info'
                        });
                        $('#show_loading').addClass('ng-hide');
                    };
                    $('#show_loading').addClass('ng-hide');
                }
            };

            if (ruc.val().length == 11) {
                xhttp.open("GET", "https://dniruc.apisperu.com/api/v1/ruc/" + ruc.val() + "?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6InJleXNhbmdhbWE3QGdtYWlsLmNvbSJ9.hfobQC8FM5IyKKSaa7usUXV0aY1Y8YthAhdN8LoMlMM", true);
                xhttp.setRequestHeader("Content-type", "application/json");
                xhttp.send();
            } else {
                AlertFactory.textType({
                    title: '',
                    message: 'dígitos del ruc estan incompletos',
                    type: 'info'
                });
                nombreComercial.val('');
                direccion.val('');
                razonSocial.val("");
                $('#show_loading').addClass('ng-hide');

            }

        }

        var search = getFormSearch('frm-search-Compania', 'search_b', 'LoadRecordsButtonCompania');

        var table_container_Compania = $("#table_container_Compania");
        table_container_Compania.jtable({
            title: "Lista de Companias",
            paging: true,
            sorting: true,
            actions: {
                listAction: base_url + '/companias/list',
                deleteAction: base_url + '/companias/delete',
            },
            messages: {
                addNewRecord: 'Nueva Compania',
                editRecord: 'Editar Compania',
            },
            toolbar: {
                items: [{
                    cssClass: 'buscador',
                    text: search
                }, {
                    cssClass: 'btn-primary',
                    text: '<i class="fa fa-file-excel-o"></i> Exportar a Excel',
                    click: function () {
                        $scope.openDoc('companias/excel', {});
                    }
                }, {
                    cssClass: 'btn-danger-admin',
                    text: '<i class="fa fa-plus"></i> Nueva Compania',
                    click: function () {
                        newCompania();
                    }
                }]
            },
            fields: {
                IdCompania: {
                    key: true,
                    create: false,
                    edit: false,
                    list: false
                },
                RazonSocial: {
                    title: 'Razón Social',
                },
                NombreComercial: {
                    title: 'Nombre Comercial',
                },
                Direccion: {
                    title: 'Dirección',
                },
                Ruc: {
                    title: 'Ruc',
                },
                Telefono1: {
                    title: 'Telefono 1',

                },
                Telefono2: {
                    title: 'Telefono 2',
                    list: false,
                },
                Telefono3: {
                    title: 'Telefono 3',
                    list: false,
                },
                Telefono4: {
                    title: 'Telefono 4',
                    list: false,

                },
                Contacto: {
                    title: 'Contacto',
                    list: false,

                },
                Correo: {
                    title: 'Correo',
                    list: false,
                },
                Base: {
                    title: 'Base',
                    list: false,
                },
                Estado: {
                    title: 'Estado',
                    values: { '0': 'Inactivo', '1': 'Activo' },
                    type: 'checkbox',
                    defaultValue: '1',
                },
                RutaData: {
                    title: 'RutaData',
                    list: false,
                },
                RutaLog: {
                    title: 'RutaLog',
                    list: false,
                },
                FechaUltBackup: {
                    title: 'Fecha Backup',
                    type: 'date',
                    displayFormat: 'dd/mm/yy',
                    list: false,
                },
                edit: {
                    width: '1%',
                    sorting: false,
                    edit: false,
                    create: false,
                    listClass: 'text-center',
                    display: function (data) {
                        return '<a href="javascript:void(0)" title="Editar" class="edit_cont" data-code="' +
                            data.record.IdCompania + '"><i class="fa fa-pencil-square-o fa-1-5x fa-green"></i></a>';
                    }
                }
            },
            recordsLoaded: function (event, data) {
                $('.edit_cont').click(function (e) {
                    var id = $(this).attr('data-code');
                    findCompania(id);
                    e.preventDefault();
                });
            },


            formCreated: function (event, data) {
                data.form.find('input[name="Categoria"]').attr('onkeypress', 'return soloLetras(event)');
                $("#Edit-Ruc").attr('maxlength', '11');
                $('#Edit-Estado').parent().addClass('i-checks');

                $('.i-checks').iCheck({
                    checkboxClass: 'icheckbox_square-green'
                }).on('ifChanged', function (e) {
                    $(e.target).click();
                    if (e.target.value == '1') {
                        $("#Edit-Estado").val("0");
                        $(".i-checks span").text("Inactivo");

                    } else {
                        $("#Edit-Estado").val("1");
                        $(".i-checks span").text("Activo");
                    };
                });
            },
            formSubmitting: function (event, data) {
                var bval = true;
                bval = bval && data.form.find('input[name="RazonSocial"]').required();
                bval = bval && data.form.find('input[name="NombreComercial"]').required();
                bval = bval && data.form.find('input[name="Direccion"]').required();
                bval = bval && data.form.find('input[name="Ruc"]').required();
                bval = bval && data.form.find('input[name="Telefono1"]').required();
                bval = bval && data.form.find('input[name="Contacto"]').required();
                bval = bval && data.form.find('input[name="Correo"]').required();
                return bval;
            }
        });

        generateSearchForm('frm-search-Compania', 'LoadRecordsButtonCompania', function () {
            table_container_Compania.jtable('load', {
                search: $('#search_b').val()
            });
        }, true);
    }

    function Config($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('companias', {
                url: '/companias',
                templateUrl: base_url + '/templates/companias/base.html',
                controller: 'CompaniaCtrl'
            });

        $urlRouterProvider.otherwise('/');
    }
})
    ();