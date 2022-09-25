/**
 * Created by JAIR on 4/5/2017.
 */

(function () {
    'use strict';
    angular.module('sys.app.avance_morosidad')
        .config(Config)
        .controller('AvanceMorosidadCtrl', AvanceMorosidadCtrl);

    Config.$inject = ['$stateProvider', '$urlRouterProvider'];
    AvanceMorosidadCtrl.$inject = ['$scope', '_', 'RESTService', 'AlertFactory'];

    function AvanceMorosidadCtrl($scope, _, RESTService, AlertFactory) {


        $(document).on("change", "#tipo_solicitud", function () {
            var tipo_solicitud = $(this).val();
            if (tipo_solicitud == "3") {
                $(".convenio").show();
            } else {
                $(".convenio").hide();
            }
        })
        var departamento = $('#departamento');
        var provincia = $('#provincia');
        var distrito = $('#distrito');
        var idsector=$("#idsector");

        function getDepartamento(bandera) {
            var id = "0";
            RESTService.get('avance_morosidad/TraerDepartamentos', id, function (response) {
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
            RESTService.get('avance_morosidad/TraerProvincias', id, function (response) {
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
            RESTService.get('avance_morosidad/TraerDistritos', id, function (response) {
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
                        message: 'Hubo un error al obtener el Sector. Intente nuevamente.',
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

        distrito.change(function () {
            var bandera = 'xxxxxx';
            var id = distrito.val();
            getSector(bandera, id);
        });

        var bandera = 'xxxxx';
        getDepartamento(bandera);

        function chkState(id) {
            id = id.substr(13);
            var input_val = $('#input_option_' + id);
            var is_check = $('#check_option_' + id).prop('checked');
            input_val.prop('readonly', !is_check);
            if (!is_check) {
                input_val.val('');
            } else {
                input_val.focus();
            }
        }

        function verifyChkOption3(verify) {
            if (verify) {
                $('.chk_main30').prop('checked', false).iCheck('update');
                setTimeout(function () {
                    $('.chk_main3').prop('checked', true).iCheck('update').parent().addClass('checked');
                });
            } else {
                $('.chk_main3').prop('checked', ($('.chk_main30:checked').length == 0)).iCheck('update');
            }
        }

        $('.i-checks').iCheck({
            checkboxClass: 'icheckbox_square-green'
        }).on('ifChanged', function (event) {
            $(event.target).click();
            var id = $(event.target).prop('id');
            if ($(event.target).hasClass('chk_option3')) {
                verifyChkOption3($(event.target).hasClass('chk_main3'));
            } else {
                chkState(id);
            }
        });


        function obtener_data_for_reporte() {
            RESTService.all('avance_morosidad/data_form', '', function (response) {
                if (!_.isUndefined(response.status) && response.status) {


                    $("#idcobrador").append('<option value="" selected>Todos</option>');
                    response.cobrador.map(function (index) {
                        $("#idcobrador").append('<option value="' + index.id + '">' + index.descripcion + '</option>');
                    });


                    $("#idtienda").append('<option value="" selected>Todos</option>');
                    response.tiendas.map(function (index) {
                        $("#idtienda").append('<option value="' + index.idTienda + '">' + index.descripcion + '</option>');
                    });



                    $("#idconvenio").append('<option value="">Todos</option>');
                    _.each(response.convenios, function (item) {
                        $("#idconvenio").append('<option value="' + item.idconvenio + '">' + item.descripcionconvenio + '</option>');
                    });

                    $("#idcobrador").select2();
                    $("#idtienda").select2();



                }
            }, function () {
                obtener_data_for_reporte();
            });
        }

        obtener_data_for_reporte();

        // function getConfigs() {
        //     RESTService.all('avance_morosidad/all', '', function (response) {
        //         if (!_.isUndefined(response.status) && response.status) {
        //             _.each(response.Data, function (item) {
        //                 var id = item.id;
        //                 $('#config_'+id).val(item.description);
        //                 $('#check_option_'+id).prop('checked', (item.check == '1')).iCheck('update');
        //                 if (id == 3) {
        //                     var value = (item.value).split('-');
        //                     _.each(value, function (chk, idx) {
        //                         $('#check_option_3'+idx).prop('checked', (chk == '1')).iCheck('update');
        //                     });
        //                 } else {
        //                     $('#input_option_'+id).val(item.value).prop('readonly', (item.check != '1'));
        //                 }
        //             });
        //         } else {
        //             getConfigs();
        //         }
        //     });
        // }
        // getConfigs();

        // $scope.ver_reporte_ = function () {
        //     var bval = true;
        //     bval = bval && $("#fecha_inicio").required();
        //     bval = bval && $("#fecha_fin").required();
        //     // bval = bval && $("#idcobrador").required();
        //     if (bval) {

        //         // alert("reporte");
        //         $("#formulario-reporte").attr("action", base_url + "/avance_morosidad/imprimir_lista_cobraza_cuotas");
        //         $("#formulario-reporte").attr("method", "GET");
        //         $("#formulario-reporte").attr("target", "imprimir_lista_cobraza_cuotas");


        //         window.open('', 'imprimir_lista_cobraza_cuotas');
        //         document.getElementById('formulario-reporte').submit();
        //     }
        // }

        $scope.ver_reporte = function () {
            var bval = true;
        
            var idtienda = $("#idtienda").val();
            var tipo_solicitud = $("#tipo_solicitud").val();
            var idcobrador = $("#idcobrador").val();

            // bval = bval && $("#fecha_inicio").required();
            // bval = bval && $("#fecha_fin").required();
            // bval = bval && $("#idcobrador").required();
            if (bval) { 

                $.post("avance_morosidad/ver_reporte_avance_morosidad", { idtienda: idtienda, tipo_solicitud: tipo_solicitud, idcobrador: idcobrador },
                    function (data, textStatus, jqXHR) {
                       
                        var html = '';
                        html += '<tr>';
                        html += '   <td>[Cuentas por Vencer]</td>';
                        html += '   <td>'+data.cuentas_vencer.monto_soles+'</td>';
                        html += '   <td>'+data.cuentas_vencer.monto_dolares+'</td>';
                        html += '   <td>'+data.cuentas_vencer.clientes+'</td>';
                        html += '   <td>'+data.cuentas_vencer.mora_porcentaje+'</td>';
                        
                        html += '</td>';

                        html += '<tr>';
                        html += '   <td>[Cuentas Vencidas]</td>';
                        html += '   <td>'+data.cuentas_vencidas.monto_soles+'</td>';
                        html += '   <td>'+data.cuentas_vencidas.monto_dolares+'</td>';
                        html += '   <td>'+data.cuentas_vencidas.clientes+'</td>';
                        html += '   <td>'+data.cuentas_vencidas.mora_porcentaje+'</td>';
                        
                        html += '</td>';

                        html += '<tr>';
                        html += '   <td>[DE 1 a 8 días]</td>';
                        html += '   <td>'+data.de_1_8.monto_soles+'</td>';
                        html += '   <td>'+data.de_1_8.monto_dolares+'</td>';
                        html += '   <td>'+data.de_1_8.clientes+'</td>';
                        html += '   <td>'+data.de_1_8.mora_porcentaje+'</td>';
                        
                        html += '</td>';

                        html += '<tr>';
                        html += '   <td>[DE 9 a 30 días]</td>';
                        html += '   <td>'+data.de_9_30.monto_soles+'</td>';
                        html += '   <td>'+data.de_9_30.monto_dolares+'</td>';
                        html += '   <td>'+data.de_9_30.clientes+'</td>';
                        html += '   <td>'+data.de_9_30.mora_porcentaje+'</td>';
                        
                        html += '</td>';

                        html += '<tr>';
                        html += '   <td>[DE 31 a 60 días]</td>';
                        html += '   <td>'+data.de_31_60.monto_soles+'</td>';
                        html += '   <td>'+data.de_31_60.monto_dolares+'</td>';
                        html += '   <td>'+data.de_31_60.clientes+'</td>';
                        html += '   <td>'+data.de_31_60.mora_porcentaje+'</td>';
                        
                        html += '</td>';

                        html += '<tr>';
                        html += '   <td>[DE 61 a 90 días]</td>';
                        html += '   <td>'+data.de_61_90.monto_soles+'</td>';
                        html += '   <td>'+data.de_61_90.monto_dolares+'</td>';
                        html += '   <td>'+data.de_61_90.clientes+'</td>';
                        html += '   <td>'+data.de_61_90.mora_porcentaje+'</td>';
                        
                        html += '</td>';

                        html += '<tr>';
                        html += '   <td>[DE 91 a 120 días]</td>';
                        html += '   <td>'+data.de_91_120.monto_soles+'</td>';
                        html += '   <td>'+data.de_91_120.monto_dolares+'</td>';
                        html += '   <td>'+data.de_91_120.clientes+'</td>';
                        html += '   <td>'+data.de_91_120.mora_porcentaje+'</td>';
                        
                        html += '</td>';

                        html += '<tr>';
                        html += '   <td>[DE 121 a 150 días]</td>';
                        html += '   <td>'+data.de_121_150.monto_soles+'</td>';
                        html += '   <td>'+data.de_121_150.monto_dolares+'</td>';
                        html += '   <td>'+data.de_121_150.clientes+'</td>';
                        html += '   <td>'+data.de_121_150.mora_porcentaje+'</td>';
                        
                        html += '</td>';

                        html += '<tr>';
                        html += '   <td>[DE 151 a 270 días]</td>';
                        html += '   <td>'+data.de_151_270.monto_soles+'</td>';
                        html += '   <td>'+data.de_151_270.monto_dolares+'</td>';
                        html += '   <td>'+data.de_151_270.clientes+'</td>';
                        html += '   <td>'+data.de_151_270.mora_porcentaje+'</td>';
                        
                        html += '</td>';

                        html += '<tr>';
                        html += '   <td>[DE 271 a 360 días]</td>';
                        html += '   <td>'+data.de_271_360.monto_soles+'</td>';
                        html += '   <td>'+data.de_271_360.monto_dolares+'</td>';
                        html += '   <td>'+data.de_271_360.clientes+'</td>';
                        html += '   <td>'+data.de_271_360.mora_porcentaje+'</td>';
                        
                        html += '</td>';

                        html += '<tr>';
                        html += '   <td>[DE 361 a más días]</td>';
                        html += '   <td>'+data.de_361.monto_soles+'</td>';
                        html += '   <td>'+data.de_361.monto_dolares+'</td>';
                        html += '   <td>'+data.de_361.clientes+'</td>';
                        html += '   <td>'+data.de_361.mora_porcentaje+'</td>';

                       
                        var total_monto_soles = parseFloat(data.cuentas_vencer.monto_soles.replace(',', '')) + parseFloat( data.cuentas_vencidas.monto_soles.replace(',', ''));
                        var total_monto_dolares = parseFloat(data.cuentas_vencer.monto_dolares.replace(',', '')) + parseFloat(data.cuentas_vencidas.monto_dolares.replace(',', ''));
                        var total_clientes = parseInt(data.cuentas_vencer.clientes) + parseInt(data.cuentas_vencidas.clientes);

                        html += '</td>';
                        html += '<tr>';
                        html += '   <th>TOTAL POR COBRAR</th>';
                        html += '   <th>'+(new Intl.NumberFormat().format(total_monto_soles))+'</th>';
                        html += '   <th>'+(new Intl.NumberFormat().format(total_monto_dolares))+'</th>';
                        html += '   <th>'+total_clientes+'</th>';
                        html += '   <th></th>';
                        
                        html += '</td>';

               

                        $("#data-reporte").html(html);
                        
                        $(".reporte").show();
                    },
                    "json"
                );
            }
        }

        $scope.imprimir_reporte = function () {
            var bval = true;
            // bval = bval && $("#fecha_inicio").required();
            // bval = bval && $("#fecha_fin").required();
            // bval = bval && $("#idcobrador").required();
            if (bval) {

                // alert("reporte");
                $("#formulario-reporte").attr("action", base_url + "/avance_morosidad/imprimir_avance_morosidad");
                $("#formulario-reporte").attr("method", "GET");
                $("#formulario-reporte").attr("target", "imprimir_avance_morosidad");


                window.open('', 'imprimir_avance_morosidad');
                document.getElementById('formulario-reporte').submit();
            }
        }


        $scope.excel = function () {
            var bval = true;
            bval = bval && $("#fecha_inicio").required();
            bval = bval && $("#fecha_fin").required();
            // bval = bval && $("#idcobrador").required();
            if (bval) {

                // alert("reporte");
                // $("#formulario-reporte").attr("action", base_url + "/avance_morosidad/excel_avance_morosidad");
                // $("#formulario-reporte").attr("method", "GET");
                // $("#formulario-reporte").attr("target", "excel_avance_morosidad");


                // window.open('', 'excel_avance_morosidad');
                // document.getElementById('formulario-reporte').submit();

                $scope.openDoc("avance_morosidad/excel_avance_morosidad", {
                    fecha_inicio: $("#fecha_inicio").val(),
                    fecha_fin: $("#fecha_fin").val(),
                    idcobrador: $("#idcobrador").val(),
                    idtienda: $("#idtienda").val(),
                    tipo_solicitud: $("#tipo_solicitud").val(),
                    ubigeo: $("#ubigeo").val(),
                    idconvenio: $("#idconvenio").val(),
                    idsector: $("#idsector").val(),

                })
            }
        }

     

    }

    function Config($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('avance_morosidad', {
                url: '/avance_morosidad',
                templateUrl: base_url + '/templates/avance_morosidad/base.html',
                controller: 'AvanceMorosidadCtrl'
            });

        $urlRouterProvider.otherwise('/');
    }
})
    ();