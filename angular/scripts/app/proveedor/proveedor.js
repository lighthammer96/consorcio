/**
 * Created by JAIR on 4/5/2017.
 */
  
(function () {
    'use strict';
    angular.module('sys.app.proveedors')
        .config(Config)
        .controller('ProveedorCtrl', ProveedorCtrl);

    Config.$inject = ['$stateProvider', '$urlRouterProvider'];
    ProveedorCtrl.$inject = ['$scope'  ,'_', 'RESTService', 'AlertFactory'];

    function ProveedorCtrl($scope, _, RESTService, AlertFactory)
    {
        var modaClientes = $('#modaClientes');
        var titleModalClientes = $('#titleModalClientes');
        var id_tipoDoc_Venta=$("#id_tipoDoc_Venta");
        var departamento = $('#departamento');
        var provincia = $('#provincia');
        var distrito = $('#distrito');
        var id_tipocli=$("#id_tipocli");
        var tipodoc=$("#tipodoc");
        var razonsocial=$("#razonsocial");
        var documento=$("#documento");
        var contacto=$("#contacto");
        var direccion=$("#direccion");
        var correo_electronico=$("#correo_electronico");
        var celular=$("#celular");
        var telefono=$("#telefono");
        var cliente_id=$("#cliente_id");
        var cEstadoCivil=$("#cEstadoCivil");
        var nombresP;
        var apellidopP;
        var apellidomP;
        var impuesto=$("#impuesto");
        var congelado=$("#congelado");
        var activo=$("#activo");
        var idBanco=$("#idBanco");
        var idMoneda=$("#idMoneda");
        var nro_cuenta=$("#nro_cuenta");
        var descripcion_banco=$("#descripcion_banco");
        var modalDetalle=$("#modalDetalle");
         $scope.chkState = function () {
            var txt_state2 = (w_state.prop('checked')) ? 'Activo' : 'Inactivo';
            state_state.html(txt_state2);
        };
        modalDetalle.on('hidden.bs.modal', function (e) {
            cleanGrupoContableDeta();

        });

        $scope.AgregarTable = function()
        {   


            var bval = true;

            bval = bval && idBanco.required();
            bval = bval && idMoneda.required();
            bval = bval && nro_cuenta.required();
            bval = bval && descripcion_banco.required();
            if(bval){
                var idBancoe= idBanco.val();
                var idMonedae= idMoneda.val();
                var nro_cuentae=nro_cuenta.val();
                var bancoe=$('select[name="idBanco"] option:selected').text();
                var monedae=$('select[name="idMoneda"] option:selected').text();
                var descripcion_bancoe=descripcion_banco.val();
                var codigoe=Math.random().toString(36).substr(2, 18);
                var ident=0;
                addToDeta(ident,codigoe,idBancoe,bancoe,idMonedae,monedae, descripcion_bancoe,nro_cuentae)
            }

        }

        function cleanGrupoContableDeta () {
            cleanRequired();
            idBanco.val('').trigger('change');
            idMoneda.val('').trigger('change');
            nro_cuenta.val("");
            descripcion_banco.val('');
        }

        
        var search = getFormSearch('frm-search-Proveedor', 'search_b', 'LoadRecordsButtonProveedor');

        var table_container_Proveedor = $("#table_container_Proveedor");

        function newCliente()
        {
            titleModalClientes.html('Nuevo Proveedor');
            nombresP=null;
            apellidopP=null;
            apellidomP=null;
            modaClientes.modal('show');
            var bandera='xxxxx';
            $("#w_contable_detalle").html("");
            getDepartamento(bandera);
        }
        documento.keypress(function(e) {
        var code = (e.keyCode ? e.keyCode : e.which);
        if(code==13){
              $('#show_loading').removeClass('ng-hide');
                var documentoEnvio=documento.val();
                 RESTService.get('proveedors/get_cliente_personaCus', documentoEnvio, function(response) {
                             if (!_.isUndefined(response.status) && response.status) {
                                    var dataPersona=response.data;
                                    if(dataPersona.length==0){
                                        console.log("no hay en persona");
                                         getDatosCliente();
                                    }else{
                                        console.log(dataPersona);
                                        console.log("si hay ");
                                         tipodoc.val(dataPersona[0].cTipodocumento).trigger('change');
                                         var nclie=dataPersona[0].cRazonsocial;
                                         console.log(nclie);

                                         console.log("entro cliente");
                                         if(nclie.length==0 || nclie==''){
                                            console.log("entro if ");
                                            razonsocial.val(dataPersona[0].cNombrePersona);
                                         }else{
                                            razonsocial.val(dataPersona[0].cRazonsocial);
                                         }
                                        
                                        documento.val(dataPersona[0].cNumerodocumento);
                                        // contacto.val(dataPersona[0].contacto);
                                        direccion.val(dataPersona[0].cDireccion);
                                        correo_electronico.val(dataPersona[0].cEmail);
                                        celular.val(dataPersona[0].cCelular);
                                       
                                        cEstadoCivil.val(dataPersona[0].cEstadoCivil);
                                      
                                         getDepartamento(dataPersona[0].cDepartamento);
                                         getProvincia(dataPersona[0].cProvincia,dataPersona[0].cDepartamento);
                                         getDistrito(dataPersona[0].cCodUbigeo,dataPersona[0].cProvincia);
                                    }


                             }else {
                                AlertFactory.textType({
                                    title: '',
                                    message: 'Hubo un error . Intente nuevamente.',
                                    type: 'info'
                                });
                            }
                           });
                
        }
});
function getDatosCliente(){
      // RESTService.get("https://dniruc.apisperu.com/api/v1/dni/71980490?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6InJleXNhbmdhbWE3QGdtYWlsLmNvbSJ9.hfobQC8FM5IyKKSaa7usUXV0aY1Y8YthAhdN8LoMlMM", '', function(response) {
      //            console.log(response);
      //          });
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      // Si nada da error
      if (this.readyState == 4 && this.status == 200) {
        // La respuesta, aunque sea JSON, viene en formato texto, por lo que tendremos que hace run parse
        var data=JSON.parse(this.responseText);
        console.log(data);
        if(data.nombres!=null){
            var razon=data.nombres+' '+data.apellidoPaterno+' '+data.apellidoMaterno;
            razonsocial.val(razon);
            nombresP=data.nombres;
            apellidopP=data.apellidoPaterno;
            apellidomP=data.apellidoMaterno;
        }else if(data.razonSocial!=null){
             var razon=data.razonSocial;
             var direc=data.direccion;
            razonsocial.val(razon);
            direccion.val(direc);
        }else{
              razonsocial.val(''); 
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
    if(tipodoc.val()=='01'){
          if(documento.val().length==8){
             var dni=documento.val();
            xhttp.open("GET", "https://dniruc.apisperu.com/api/v1/dni/"+dni+"?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6InJleXNhbmdhbWE3QGdtYWlsLmNvbSJ9.hfobQC8FM5IyKKSaa7usUXV0aY1Y8YthAhdN8LoMlMM", true);
            xhttp.setRequestHeader("Content-type", "application/json");
            xhttp.send();
        }else{
             AlertFactory.textType({
                            title: '',
                            message: 'dígitos del documento incompletos',
                            type: 'info'
            });
              razonsocial.val('');
                direccion.val('');
              $('#show_loading').addClass('ng-hide');
        }
       

    }else{
        if(documento.val().length==11){
             var ruc=documento.val();
            xhttp.open("GET", "https://dniruc.apisperu.com/api/v1/ruc/"+ruc+"?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6InJleXNhbmdhbWE3QGdtYWlsLmNvbSJ9.hfobQC8FM5IyKKSaa7usUXV0aY1Y8YthAhdN8LoMlMM", true);
            xhttp.setRequestHeader("Content-type", "application/json");
            xhttp.send();
        }else{
            AlertFactory.textType({
                            title: '',
                            message: 'dígitos del documento incompletos',
                            type: 'info'
            });
             razonsocial.val('');
                direccion.val('');
            $('#show_loading').addClass('ng-hide');

        }
       
    }
   
}
        $('.i-checks').iCheck({
            checkboxClass: 'icheckbox_square-green'
        }).on('ifChanged', function (event) {
            $(event.target).click();
        });
         function findCliente(id)
        { 
            titleModalClientes.html('Editar Proveedor');
            RESTService.get('proveedors/find', id, function(response) {
                if (!_.isUndefined(response.status) && response.status) {
                     var data_p = response.data;
                     var dataDetalle = response.dataDetalle;
                      
                    tipodoc.val(data_p[0].tipodoc).trigger('change');
                    razonsocial.val(data_p[0].razonsocial);
                    documento.val(data_p[0].documento);
                    contacto.val(data_p[0].contacto);
                    direccion.val(data_p[0].direccion);
                    correo_electronico.val(data_p[0].correo_electronico);
                    celular.val(data_p[0].celular);
                    telefono.val(data_p[0].telefono);
                    cEstadoCivil.val(data_p[0].cEstadoCivil);
                    cliente_id.val(data_p[0].id);
                    id_tipocli.val(data_p[0].id_tipoProveedor).trigger('change');
                    id_tipoDoc_Venta.val(data_p[0].IdTipoDocumento).trigger("change");
                    var chk_statea = (data_p[0].impuesto == 'S');
                    impuesto.prop('checked', chk_statea).iCheck('update');
                    var chk_stateb = (data_p[0].congelado == 'S');
                    congelado.prop('checked', chk_stateb).iCheck('update');
                    var chk_statec = (data_p[0].activo == 'S');
                    activo.prop('checked', chk_statec).iCheck('update');
                    nombresP=data_p[0].cNombres;
                    apellidopP=data_p[0].cApepat;
                    apellidomP=data_p[0].cApemat;
                     getDepartamento(data_p[0].cDepartamento);
                     getProvincia(data_p[0].cProvincia,data_p[0].cDepartamento);
                     getDistrito(data_p[0].cCodUbigeo,data_p[0].cProvincia);
                     console.log(dataDetalle);
                     console.log("esto es el detalle");
                     dataDetalle.map(function(index) {
                        addToDeta(index.idProveedorCuentaBanco,index.idProveedorCuentaBanco,index.idBanco,index.bancos_descripcion,index.idMoneda,index.moneda_descripcion, index.prb_descripcion,index.Nrocuenta)
                      });
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
        function addToDeta(ident,codigo,idBanco,banco,idMoneda,moneda, descripcion,nrocuenta){
            var tr = $('<tr id="tr_contDetalle_' + codigo + '"></tr>');
                var td1 = $('<td>' + banco + '</td>');
                var td2 = $('<td>' + moneda + '</td>');
                var td3 = $('<td>' + descripcion + '</td>');
                var td4 = $('<td>' + nrocuenta + '</td>');
                var inp0 = $('<input type="hidden" class="w_ident" value="' + ident + '" />');
                var inp = $('<input type="hidden" class="w_idBanco" value="' + idBanco + '" />');
                var inp2 = $('<input type="hidden" class="w_descripcion" value="' + descripcion + '" />');
                var inp3 = $('<input type="hidden" class="w_idMoneda" value="' + idMoneda + '" />');
                var inp4 = $('<input type="hidden" class="w_nrocuenta" value="' + nrocuenta + '" />');
                td1.append(inp).append(inp0);
                td2.append(inp2);
                td3.append(inp3);
                td4.append(inp4);
                var td5 = $('<td class="text-center"></td>');
                var btn = $('<button class="btn btn-danger btn-xs delAccoun"  data-ident="'+ident+'" data-id="' + codigo + '" type="button"><span class="fa fa-trash"></span></button>');
                td5.append(btn);
                tr.append(td1).append(td2).append(td3).append(td4).append(td5);
                $("#w_contable_detalle").append(tr);
                 modalDetalle.modal('hide');
                 $('.delAccoun').click(function (e) {
                    var code = $(this).attr('data-id');
                    var identd = $(this).attr('data-ident');
                    AlertFactory.confirm({
                        title: '',
                        message: '¿Está seguro que desea quitar estos datos?',
                        confirm: 'Si',
                        cancel: 'No'
                    }, function () {
                       if(cliente_id.val()!='' && identd){
                        var id=identd;
                        RESTService.get('proveedors/deleteDetalleBanco', id, function(response) {
                        if (!_.isUndefined(response.status) && response.status) {
                            var data=response.data;
                                AlertFactory.textType({
                                    title: '',
                                    message: 'Se eliminó correctamente',
                                    type: 'success'
                                });
                        }else {
                            var msg_ = (_.isUndefined(response.message)) ?
                                'No se pudo eliminar. Intente nuevamente.' : response.message;
                                    AlertFactory.textType({
                                        title: '',
                                        message: msg_,
                                        type: 'error'
                                    });
                             }
                        });
                       }
                      $('#tr_contDetalle_' + code).remove();
                    });
                    e.preventDefault();
             });
        }
      
        function getDepartamento(bandera){
            var id="0";
            RESTService.get('proveedors/TraerDepartamentos', id, function(response) {
                 if (!_.isUndefined(response.status) && response.status) {
                     var data_p = response.data;
                     departamento.html('');
                      departamento.append('<option value="" >Seleccione</option>');
                     _.each(response.data, function(item) {
                        if(item.cDepartamento==bandera){
                             departamento.append('<option value="'+item.cDepartamento+'" selected >'+item.cDepartamento+'</option>');
                        }else{
                             departamento.append('<option value="'+item.cDepartamento+'" >'+item.cDepartamento+'</option>');
                        };
            
                    });

                 }else {
                    AlertFactory.textType({
                        title: '',
                        message: 'Hubo un error al obtener el Artículo. Intente nuevamente.',
                        type: 'error'
                    });
                }

               });
        } 
          function getProvincia(bandera,id){
                RESTService.get('proveedors/TraerProvincias', id, function(response) {
                 if (!_.isUndefined(response.status) && response.status) {
                     var data_p = response.data;
                     console.log(data_p);
                      provincia.html('');
                      provincia.append('<option value="" >Seleccione</option>');
                     _.each(response.data, function(item) {
                        if(item.cProvincia==bandera){
                             provincia.append('<option value="'+item.cProvincia+'" selected>'+item.cProvincia+'</option>');
                         }else{
                             provincia.append('<option value="'+item.cProvincia+'">'+item.cProvincia+'</option>');
                         }
                       
                    });

                 }else {
                    AlertFactory.textType({
                        title: '',
                        message: 'Hubo un error . Intente nuevamente.',
                        type: 'error'
                    });
                }

               });
       }
        function getDistrito(bandera,id){
        RESTService.get('proveedors/TraerDistritos', id, function(response) {
                 if (!_.isUndefined(response.status) && response.status) {
                     var data_p = response.data;
                     console.log(data_p);
                       distrito.html('');
                      distrito.append('<option value="" >Seleccione</option>');
                     _.each(response.data, function(item) {
                        if(item.cCodUbigeo==bandera){
                             distrito.append('<option value="'+item.cCodUbigeo+'" selected>'+item.cDistrito+'</option>');
                         }else{
                             distrito.append('<option value="'+item.cCodUbigeo+'">'+item.cDistrito+'</option>');
                         }
                       
                    });

                 }else {
                    AlertFactory.textType({
                        title: '',
                        message: 'Hubo un error al obtener el Artículo. Intente nuevamente.',
                        type: 'error'
                    });
                }

               });
       }
        departamento.change(function () {
            var bandera='xxxxxx';
            var id=departamento.val();
            getProvincia(bandera,id);
        });
        
        provincia.change(function () {
                var bandera='xxxxxx';
                var id=provincia.val();
                getDistrito(bandera,id);
           
        });
         modaClientes.on('hidden.bs.modal', function (e) {
              cleanCliente();
        });
        function cleanCliente () {
            cleanRequired();
            titleModalClientes.html('');
            $("#w_contable_detalle").html("");
            tipodoc.val('01').trigger("change");
            id_tipocli.val('').trigger("change");
            razonsocial.val('');
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
            cEstadoCivil.val('');
            provincia.html('');
            distrito.html('');
            congelado.prop('checked', true).iCheck('update');
            activo.prop('checked', true).iCheck('update');
            impuesto.prop('checked', true).iCheck('update');
        };
        $scope.saveCliente = function()
        {
            var bval = true;
            bval = bval && tipodoc.required();
            bval = bval && id_tipocli.required();
            bval = bval && id_tipoDoc_Venta.required();
            bval = bval && razonsocial.required();
            bval = bval && documento.required();
            bval = bval && celular.required();
            bval = bval && distrito.required(); 
            
            if(tipodoc.val()=='01' && documento.val().length!=8){
                AlertFactory.textType({
                            title: '',
                            message: 'Longitud de LE/DNI INCORRECTA',
                            type: 'info'
                });
             bval = false;
            };
            if(tipodoc.val()=='06' && documento.val().length!=11){
                AlertFactory.textType({
                            title: '',
                            message: 'Longitud de RUC INCORRECTA',
                            type: 'info'
                });
             bval = false;
            };    
             if(id_tipoDoc_Venta.val()=='01' && tipodoc.val()=='01'){
                AlertFactory.textType({
                            title: '',
                            message: ' Tipo de documento del cliente debe ser R.U.C para el tipo documento venta factura',
                            type: 'info'
                });
                bval = false;
             }
             var idBanco_array =[];
            
                   $.each($('.w_idBanco'), function (idx, item) {
                        idBanco_array[idx] = $(item).val();
                    });
                    idBanco_array = idBanco_array.join(',');

                    var idarray =[];
                    $.each($('.w_ident'), function (idx, item) {
                        idarray[idx] = $(item).val();
                    });
                    idarray = idarray.join(',');

                    var idBancoDescripcion_array =[];
                    $.each($('.w_descripcion'), function (idx, item) {
                        idBancoDescripcion_array[idx] = $(item).val();
                    });
                    idBancoDescripcion_array = idBancoDescripcion_array.join(',');

                     var idMoneda_array =[];
                    $.each($('.w_idMoneda'), function (idx, item) {
                        idMoneda_array[idx] = $(item).val();
                    });
                    idMoneda_array = idMoneda_array.join(',');

                    var nrocuenta_array =[];
                    $.each($('.w_nrocuenta'), function (idx, item) {
                        nrocuenta_array[idx] = $(item).val();
                    });
                    nrocuenta_array = nrocuenta_array.join(',');
            if(bval){
                 var params = {
                    'tipodoc': tipodoc.val(),
                    'razonsocial': razonsocial.val(),
                    'documento': documento.val(),
                    'contacto': contacto.val(),
                    'direccion': direccion.val(),
                    'correo_electronico': correo_electronico.val(),
                    'celular': celular.val(),
                    'telefono': telefono.val(),
                    'distrito': distrito.val(),
                    'id_tipoProveedor':id_tipocli.val(),
                    'IdTipoDocumento':id_tipoDoc_Venta.val(),
                    'cEstadoCivil':cEstadoCivil.val(),
                    'nombresP':nombresP,
                    'apellidopP':apellidopP,
                    'apellidomP':apellidomP,
                    'impuesto': ((impuesto.prop('checked')) ? 'S' : 'N'),
                    'congelado': ((congelado.prop('checked')) ? 'S' : 'N'),
                    'activo': ((activo.prop('checked')) ? 'S' : 'N'),
                    'idarray':idarray,
                    'idBanco_array':idBanco_array,
                    'idBancoDescripcion_array':idBancoDescripcion_array,
                    'idMoneda_array':idMoneda_array,
                    'nrocuenta_array':nrocuenta_array,
                 };

                var cli_id = (cliente_id.val() === '') ? 0 : cliente_id.val();
                  RESTService.updated('proveedors/createCliente', cli_id, params, function(response) {
                    if (!_.isUndefined(response.status) && response.status) {
                        modaClientes.modal('hide');
                         AlertFactory.textType({
                            title: '',
                            message: 'El registro se guardó correctamente',
                            type: 'success'
                        });
                        LoadRecordsButtonProveedor.click();
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
        $('#btn_agregarCuenta').click(function(e){
                  $("#modalDetalle").modal('show');
        });
        function getDataFormProveedor () {
            RESTService.all('proveedors/data_form', '', function(response) { 
                if (!_.isUndefined(response.status) && response.status) {
                    var tip=response.tipoc_doc;
                    var tipo_clie=response.tipo_clie;
                    var tipo_prove=response.tipo_prove;
                    var tipoc_doc_venta=response.tipoc_doc_venta;
                    var moneda=response.moneda;
                    var idBanco=response.idBanco;
                      tip.map(function(index) {
                         tipodoc.append('<option value="'+index.Codigo+'">'+index.TipoDocumento+'</option>');
                      });
                        id_tipocli.append('<option value="">Seleccionar</option>');
                        tipo_prove.map(function(index) {
                        id_tipocli.append('<option value="'+index.id+'">'+index.descripcion+'</option>');
                      });
                        id_tipoDoc_Venta.append('<option value="">Seleccionar</option>');
                        tipoc_doc_venta.map(function(index) {
                        id_tipoDoc_Venta.append('<option value="'+index.IdTipoDocumento+'">'+index.Descripcion+'</option>');
                      });

                      $("#idBanco").append('<option value="">Seleccionar</option>');
                      idBanco.map(function(index) {
                      $("#idBanco").append('<option value="'+index.idbanco+'">'+index.descripcion+'</option>');
                      });
                      
                      $("#idMoneda").append('<option value="">Seleccionar</option>');
                       moneda.map(function(index) {
                       $("#idMoneda").append('<option value="'+index.IdMoneda+'">'+index.Descripcion+'</option>');
                      });  
                  
                    //  _.each(response.operaciones, function(item) {
                    //    
                    // });
                  
                }
            }, function() {
                getDataFormProveedor();
            });
        }
        getDataFormProveedor();

        table_container_Proveedor.jtable({
            title: "Lista de Proveedores",
            paging: true,
            sorting: true,
            actions: { 
                listAction: base_url + '/proveedors/list',
                deleteAction: base_url + '/proveedors/delete',
            },
            messages: {
                addNewRecord: 'Nuevo Cliente',
                editRecord: 'Editar Cliente',
            },
            toolbar: {
                items: [{
                    cssClass: 'buscador',
                    text: search
                },{
                    cssClass: 'btn-primary',
                    text: '<i class="fa fa-file-excel-o"></i> Exportar a Excel',
                    click: function () {
                        $scope.openDoc('proveedors/excel', {});
                    }
                },{
                    cssClass: 'btn-danger-admin',
                    text: '<i class="fa fa-plus"></i> Nuevo Proveedor  ',
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
                      options: base_url + '/proveedors/getTipoDocumento' ,
                },
                id_tipoProveedor: {
                    title: 'Tipo Proveedor',
                      options: base_url + '/proveedors/getTipoCliente' ,
                },
                 IdTipoDocumento: {
                    title: 'Tipo Documento Venta',
                      options: base_url + '/proveedors/getTipoDocumentoVenta' ,
                },
                documento: {
                    title: 'Documento',
                },
                razonsocial: {
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
                     options: base_url + '/proveedors/getDistrito' 

                },
                edit: {
                    width: '1%',
                    sorting: false,
                    edit: false,
                    create: false,
                    listClass: 'text-center',
                    display: function (data) {
                        return '<a href="javascript:void(0)" class="edit-Cliente" data-id="'+data.record.id
                            +'" title="Editar"><i class="fa fa-edit fa-1-5x"></i></a>';
                    }
                }

            },
            recordsLoaded: function(event, data) {
                $('.edit-Cliente').click(function(e){
                    var id = $(this).attr('data-id');
                    findCliente(id);
                    e.preventDefault();
                });
           }, 
            formCreated: function (event, data) {
                data.form.find('input[name="Categoria"]').attr('onkeypress','return soloLetras(event)');
                $('#Edit-estado').parent().addClass('i-checks');
               
                $('.i-checks').iCheck({
                    checkboxClass: 'icheckbox_square-green'
                }).on('ifChanged', function (e) {
                    $(e.target).click();
                     if(e.target.value=='A'){
                        $("#Edit-estado").val("I");
                        $(".i-checks span").text("Inactivo");

                     }else{
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
                bval = bval && data.form.find('input[name="razonsocial"]').required();
                return bval;
            }
        });

        generateSearchForm('frm-search-Proveedor', 'LoadRecordsButtonProveedor', function(){
            table_container_Proveedor.jtable('load', {
                search: $('#search_b').val()
            });
        }, true);
    }

    function Config($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('proveedors', {
                url: '/proveedors',
                templateUrl: base_url + '/templates/proveedors/base.html',
                controller: 'ProveedorCtrl'
            });

        $urlRouterProvider.otherwise('/');
    }
})
();