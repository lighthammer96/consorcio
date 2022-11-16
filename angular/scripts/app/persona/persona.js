/**
 * Created by JAIR on 4/5/2017.
 */
  
(function () {
    'use strict';
    angular.module('sys.app.personas')
        .config(Config)
        .controller('PersonaCtrl', PersonaCtrl);

    Config.$inject = ['$stateProvider', '$urlRouterProvider'];
    PersonaCtrl.$inject = ['$scope', '_', 'RESTService','AlertFactory'];

    function PersonaCtrl($scope,_, RESTService ,AlertFactory)
    {
        var modalPersona=$("#modalPersona");
        var titleModalPersona=$("#titleModalPersona");
        var idPersona=$("#idPersona");
        var cTipopersona=$("#cTipopersona");
        var cDireccion=$("#cDireccion");
        var cReferencia=$("#cReferencia");
        var cDigitoVerificador=$("#cDigitoVerificador");
        var cTipodocumento=$("#cTipodocumento");
        var cNumerodocumento=$("#cNumerodocumento");
        var dFechacaducidad=$("#dFechacaducidad");
        var cRegion=$("#cRegion");
        var cProvincia=$("#cProvincia");
        var cUbigeo=$("#cUbigeo");
        var cEmail=$("#cEmail");
        var cCelular=$("#cCelular");
        var dFechanacimiento=$("#dFechanacimiento");
        var cEstadoCivil=$("#cEstadoCivil");
        var cApepat=$("#cApepat");
        var cApemat=$("#cApemat");
        var cNombres=$("#cNombres");
        var cRazonsocial=$("#cRazonsocial");
        var cNombrePersona=$("#cNombrePersona");
        var cSexo=$("#cSexo");
        cNumerodocumento.keypress(function(e) {
        var code = (e.keyCode ? e.keyCode : e.which);
        if(code==13){
              $('#show_loading').removeClass('ng-hide');
                getDatosCliente();
        }
    });
function getDatosCliente(){
   
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      // Si nada da error
      if (this.readyState == 4 && this.status == 200) {
        // La respuesta, aunque sea JSON, viene en formato texto, por lo que tendremos que hace run parse
        var data=JSON.parse(this.responseText);
        console.log(data);
        if(data.nombres!=null){
            var razon=data.nombres+' '+data.apellidoPaterno+' '+data.apellidoMaterno;
            cApepat.val(data.apellidoPaterno);
            cApemat.val(data.apellidoMaterno);
            cNombrePersona.val(razon);
            cNombres.val(data.nombres);
        }else if(data.razonSocial!=null){
             var razon=data.razonSocial;
             var direc=data.direccion;
            cRazonsocial.val(razon);
            cDireccion.val(direc);
        }else{
              cDireccion.val('');
                cRazonsocial.val('');
            AlertFactory.textType({
                            title: '',
                            message: 'No se encontró datos de la persona',
                            type: 'info'
            });
             $('#show_loading').addClass('ng-hide');
        };
        $('#show_loading').addClass('ng-hide');
      }
    };
    if(cTipodocumento.val()=='01'){
          if(cNumerodocumento.val().length==8){
             var dni=cNumerodocumento.val();
            xhttp.open("GET", "https://dniruc.apisperu.com/api/v1/dni/"+dni+"?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6InJleXNhbmdhbWE3QGdtYWlsLmNvbSJ9.hfobQC8FM5IyKKSaa7usUXV0aY1Y8YthAhdN8LoMlMM", true);
            xhttp.setRequestHeader("Content-type", "application/json");
            xhttp.send();
        }else{
             AlertFactory.textType({
                            title: '',
                            message: 'dígitos del documento incompletos',
                            type: 'info'
            });
              cDireccion.val('');
                cRazonsocial.val('');
              $('#show_loading').addClass('ng-hide');
        }
       

    }else{
        if(cNumerodocumento.val().length==11){
             var ruc=cNumerodocumento.val();
            xhttp.open("GET", "https://dniruc.apisperu.com/api/v1/ruc/"+ruc+"?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6InJleXNhbmdhbWE3QGdtYWlsLmNvbSJ9.hfobQC8FM5IyKKSaa7usUXV0aY1Y8YthAhdN8LoMlMM", true);
            xhttp.setRequestHeader("Content-type", "application/json");
            xhttp.send();
        }else{
            AlertFactory.textType({
                            title: '',
                            message: 'dígitos del documento incompletos',
                            type: 'info'
            });
             cDireccion.val('');
                cRazonsocial.val('');
            $('#show_loading').addClass('ng-hide');

        }
       
    }
   
}
         function findPersona(id)
        { 
            titleModalPersona.html('Editar Persona');
            RESTService.get('personas/find', id, function(response) {
                if (!_.isUndefined(response.status) && response.status) {
                     var data_p = response.data;
                   

                    idPersona.val(data_p[0].idPersona);
                    cTipopersona.val(data_p[0].cTipopersona).trigger('change');
                    cDireccion.val(data_p[0].cDireccion);
                    cReferencia.val(data_p[0].cReferencia);
                    cDigitoVerificador.val(data_p[0].cDigitoVerificador);
                    cTipodocumento.val(data_p[0].cTipodocumento).trigger('change');;
                    cNumerodocumento.val(data_p[0].cNumerodocumento);
                    dFechacaducidad.val(data_p.dFechacaducidad2);
                    
                    cEmail.val(data_p[0].cEmail);
                    cCelular.val(data_p[0].cCelular);
                    // dFechanacimiento.val(data_p.dFechanacimiento2);
                    dFechanacimiento.val(data_p[0].dFechanacimiento_server);
                    cEstadoCivil.val(data_p[0].cEstadoCivil).trigger('change');;
                    cApepat.val(data_p[0].cApepat);
                    cApemat.val(data_p[0].cApemat);
                    cNombres.val(data_p[0].cNombres);
                    cRazonsocial.val(data_p[0].cRazonsocial);
                    cNombrePersona.val(data_p[0].cNombrePersona);
                    cSexo.val(data_p[0].cSexo);

                     getDepartamento(data_p[0].cDepartamento);
                     getProvincia(data_p[0].cProvincia,data_p[0].cDepartamento);
                     getDistrito(data_p[0].cCodUbigeo,data_p[0].cProvincia);

                     modalPersona.modal('show');
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
          function cleanPersona () {
            cleanRequired();
            titleModalPersona.val("");
            idPersona.val("");
            cTipopersona.val("").trigger("change");
            cDireccion.val("");
            cReferencia.val("");
            cDigitoVerificador.val("");
            cTipodocumento.val("").trigger("change");
            cNumerodocumento.val("");
            dFechacaducidad.val("");
            cRegion.val("");
            cProvincia.val("");
            cUbigeo.val("");
            cEmail.val("");
            cCelular.val("");
            dFechanacimiento.val("");
            cEstadoCivil.val("");
            cApepat.val("");
            cApemat.val("");
            cNombres.val("");
            cRazonsocial.val("");
            cNombrePersona.val("");
            cSexo.val("").trigger("change");
        }
        modalPersona.on('hidden.bs.modal', function (e) {
            cleanPersona();
        });
        $scope.savePersona = function()
        {
            var bval = true;
            bval = bval && cTipopersona.required();
            bval = bval && cTipodocumento.required();
            bval = bval && cNumerodocumento.required();
            // bval = bval && cDigitoVerificador.required();
            // bval = bval && dFechacaducidad.required();
           

            // bval = bval && cReferencia.required();
            
        
           
            
            bval = bval && cRegion.required();
            bval = bval && cProvincia.required();
            bval = bval && cUbigeo.required();
            // bval = bval && cCelular.required();
            // bval = bval && cEmail.required();
            bval = bval && cDireccion.required();

            // bval = bval && dFechanacimiento.required();
            // bval = bval && cEstadoCivil.required();
            // bval = bval && cSexo.required();
            if(cTipodocumento.val()=='01' && cNumerodocumento.val().length!=8){
                AlertFactory.textType({
                            title: '',
                            message: 'Longitud de LE/DNI INCORRECTA',
                            type: 'info'
                });
             bval = false;
            };
            if(cTipodocumento.val()=='06' && cNumerodocumento.val().length!=11){
                AlertFactory.textType({
                            title: '',
                            message: 'Longitud de RUC INCORRECTA',
                            type: 'info'
                });
             bval = false;
            };
            if(bval){
                 var params = {
                    'cTipopersona':cTipopersona.val(),
                    'cDireccion':cDireccion.val(),
                    'cReferencia':cReferencia.val(),
                    'cDigitoVerificador':cDigitoVerificador.val(),
                    'cTipodocumento':cTipodocumento.val(),
                    'cNumerodocumento':cNumerodocumento.val(),
                    'dFechacaducidad':dFechacaducidad.val(),
                    'cRegion':cRegion.val(),
                    'cProvincia':cProvincia.val(),
                    'cUbigeo':cUbigeo.val(),
                    'cCelular':cCelular.val(),
                    'cEmail':cEmail.val(),
                    'dFechanacimiento':dFechanacimiento.val(),
                    'cEstadoCivil':cEstadoCivil.val(),
                    'cApepat':cApepat.val(),
                    'cApemat':cApemat.val(),
                    'cNombres':cNombres.val(),
                    'cRazonsocial':cRazonsocial.val(),  
                    'cNombrePersona':cNombrePersona.val(),
                    'cSexo':cSexo.val(),

                 };
                var idPe = (idPersona.val() === '') ? 0 : idPersona.val();
                  RESTService.updated('personas/createPersona', idPe, params, function(response) {
                    if (!_.isUndefined(response.status) && response.status) {
                        modalPersona.modal('hide');
                         AlertFactory.textType({
                            title: '',
                            message: 'El registro se guardó correctamente',
                            type: 'success'
                        });
                        LoadRecordsButtonPersona.click();
                    } else {
                        var msg_ = (_.isUndefined(response.message)) ?
                            'No se pudo guardar la persona. Intente nuevamente.' : response.message;
                        AlertFactory.textType({
                            title: '',
                            message: msg_,
                            type: 'info'
                        });
                    }
                });
            }

        };
        function getDataFormCustomer () {
            RESTService.all('personas/data_formCusPerson', '', function(response) {
                if (!_.isUndefined(response.status) && response.status) {
                    var tip=response.tipoc_doc;
                    var tipo_clie=response.tipo_clie;
                    var tipoc_doc_venta=response.tipoc_doc_venta;
                    var tipo_persona=response.tipo_persona;
                   cTipodocumento.append('<option value="">Seleccionar</option>');
                  tip.map(function(index) {
                     cTipodocumento.append('<option value="'+index.Codigo+'">'+index.TipoDocumento+'</option>');
                  });


                   cTipopersona.append('<option value="">Seleccionar</option>');
                  tipo_persona.map(function(index) {
                     cTipopersona.append('<option value="'+index.cCodigo+'">'+index.cDescripcion+'</option>');
                  });



                }
            }, function() {
                getDataFormCustomer();
            });
        }
        getDataFormCustomer();
        function getDepartamento(bandera){
            var id="0";
            RESTService.get('personas/TraerDepartamentosPerso', id, function(response) {
                 if (!_.isUndefined(response.status) && response.status) {
                     var data_p = response.data;
                     cRegion.html('');
                      cRegion.append('<option value="" >Seleccione</option>');
                     _.each(response.data, function(item) {
                        if(item.cDepartamento==bandera){
                             cRegion.append('<option value="'+item.cDepartamento+'" selected >'+item.cDepartamento+'</option>');
                        }else{
                             cRegion.append('<option value="'+item.cDepartamento+'" >'+item.cDepartamento+'</option>');
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
                RESTService.get('personas/TraerProvinciasPerso', id, function(response) {
                 if (!_.isUndefined(response.status) && response.status) {
                     var data_p = response.data;
                     console.log(data_p);
                      cProvincia.html('');
                      cProvincia.append('<option value="" >Seleccione</option>');
                     _.each(response.data, function(item) {
                        if(item.cProvincia==bandera){
                             cProvincia.append('<option value="'+item.cProvincia+'" selected>'+item.cProvincia+'</option>');
                         }else{
                             cProvincia.append('<option value="'+item.cProvincia+'">'+item.cProvincia+'</option>');
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
        RESTService.get('personas/TraerDistritosPerso', id, function(response) {
                 if (!_.isUndefined(response.status) && response.status) {
                     var data_p = response.data;
                     console.log(data_p);
                       cUbigeo.html('');
                      cUbigeo.append('<option value="" >Seleccione</option>');
                     _.each(response.data, function(item) {
                        if(item.cCodUbigeo==bandera){
                             cUbigeo.append('<option value="'+item.cCodUbigeo+'" selected>'+item.cDistrito+'</option>');
                         }else{
                             cUbigeo.append('<option value="'+item.cCodUbigeo+'">'+item.cDistrito+'</option>');
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
         cRegion.change(function () {
            var bandera='xxxxxx';
            var id=cRegion.val();
            getProvincia(bandera,id);
        });
        
        cProvincia.change(function () {
                var bandera='xxxxxx';
                var id=cProvincia.val();
                getDistrito(bandera,id);
           
        });
          function newPersona()
        {
            titleModalPersona.html('Nueva Persona');
            modalPersona.modal('show');
            var bandera='xxxxx';
            getDepartamento(bandera);
        }
        var search = getFormSearch('frm-search-Persona', 'search_b', 'LoadRecordsButtonPersona');

        var table_container_Persona = $("#table_container_Persona");

        table_container_Persona.jtable({
            title: "Lista de Personas",
            paging: true,
            sorting: true,
            actions: { 
                listAction: base_url + '/personas/list',
                deleteAction: base_url + '/personas/delete', 
            },
            messages: {
                addNewRecord: 'Nueva Categoría',
                editRecord: 'Editar Categoría',
            },
            toolbar: {
                items: [{
                    cssClass: 'buscador',
                    text: search
                },{
                    cssClass: 'btn-primary',
                    text: '<i class="fa fa-file-excel-o"></i> Exportar a Excel',
                    click: function () {
                        $scope.openDoc('personas/excel', {});
                    }
                },{
                    cssClass: 'btn-danger-admin',
                    text: '<i class="fa fa-plus"></i> Nueva Persona',
                    click: function () {
                        newPersona();
                    }
                }]
            },





            fields: {
                idPersona: {
                    key: true,
                    create: false,
                    edit: false,
                    list: false
                },
                TipoPersona: {
                    title: 'Tipo Persona',
                   
                },
                TipoDocumento: {
                    title: 'Tipo Documento',
                   
                },
                cNumerodocumento: {
                    title: 'Nro Documento',
                },
                cNumerodocum: {
                    title: 'Nombre o Razón Social',
                     display: function (data) {
                      var raz=data.record.cRazonsocial;
                      if(data.record.cRazonsocial==''){
                          raz=data.record.cNombrePersona
                        }
                          return '<p>'+raz+'</p>';
                      }

                },
                cDistrito: {
                    title: 'Distrito',
                },
                edit: {
                    width: '1%',
                    sorting: false,
                    edit: false,
                    create: false,
                    listClass: 'text-center',
                    display: function (data) {
                        return '<a href="javascript:void(0)" class="edit-Persona" data-id="'+data.record.idPersona
                            +'" title="Editar"><i class="fa fa-edit fa-1-5x"></i></a>';
                    }
                }
               

            },
            recordsLoaded: function(event, data) {
                $('.edit-Persona').click(function(e){
                    var id = $(this).attr('data-id');
                    findPersona(id);
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
                return bval;
            }
        });

        generateSearchForm('frm-search-Persona', 'LoadRecordsButtonPersona', function(){
            table_container_Persona.jtable('load', {
                search: $('#search_b').val()
            });
        }, true);
    }

    function Config($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('personas', {
                url: '/personas',
                templateUrl: base_url + '/templates/personas/base.html',
                controller: 'PersonaCtrl'
            });

        $urlRouterProvider.otherwise('/');
    }
})
();