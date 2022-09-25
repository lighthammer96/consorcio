/**
 * Created by JAIR on 4/5/2017.
 */
  
(function () {
    'use strict';
    angular.module('sys.app.quality_controls')
        .config(Config)
        .controller('Quality_controlCtrl', Quality_controlCtrl);

    Config.$inject = ['$stateProvider', '$urlRouterProvider'];
    Quality_controlCtrl.$inject = ['$scope', '_', 'RESTService', 'AlertFactory'];

    function Quality_controlCtrl($scope, _, RESTService, AlertFactory)
    {   
        var modalControl=$("#modalControl");
        var titleModalControl=$("#titleModalControl");
        var cCodConsecutivoOS=$("#cCodConsecutivoOS");
        var nConsecutivoOS=$("#nConsecutivoOS");
        var dFechaRegistro=$("#dFechaRegistro");
        var w_state=$("#w_state");
        var state_state=$("#state_state");
        var iEstado=$("#iEstado");
        var cOtros=$("#cOtros");
        var idcontrol_calidad=$("#idcontrol_calidad");
        var datos_calidad=$("#datos_calidad");
        var btn_guardarCalida=$("#btn_guardarCalida");
        var btn_imprimirQc=$("#btn_imprimirQc");
        btn_imprimirQc.click(function(e){
            var id=idcontrol_calidad.val();
            if(id!=''){
                 var data = {
                        id: id,        
                };
              $scope.loadQualityControlPDF('quality_controls/pdf', data);
            }
        });
        function findRegister_Control(id)
        {
            
            RESTService.get('quality_controls/find', id, function(response) {
                if (!_.isUndefined(response.status) && response.status) {
                  
                    var data=response.data;
                    var detalle=response.detalle;
                    var dataProf=response.dataProforma;
                    console.log("/////////////");
                    console.log(data);
                    console.log(detalle);
                    console.log(dataProf);
                    console.log("/////////////");
                    titleModalControl.html('Editar Control');
                     cCodConsecutivoOS.append('<option value="'+dataProf[0].cCodConsecutivo+'*'+dataProf[0].nConsecutivo+'">'+dataProf[0].cCodConsecutivo+' '+dataProf[0].nConsecutivo+' '+dataProf[0].razonsocial_cliente+' '+dataProf[0].cPlacaVeh+'</option>');
                    var con=data[0].cCodConsecutivoOS+'*'+data[0].nConsecutivoOS;
                    cCodConsecutivoOS.val(con).trigger("change")
                    dFechaRegistro.val(data.dFechaRegistro2);
                    idcontrol_calidad.val(data[0].id);
                    iEstado.val(data[0].iEstado).trigger("change");
                    cOtros.val(data[0].cOtros);
                    _.each(detalle, function (index) {
                        var est=false;
                        if(index.iRevisado=='1'){
                            est=true
                        };
                        $('#idDeta'+index.idrevision).val(index.id);
                        $('#id_check'+index.idrevision).prop('checked', est);
                    });
                       $('.i-checks').iCheck({
                    checkboxClass: 'icheckbox_square-green'

                }).on('ifChanged', function (event) {
                    $(event.target).click();
                    $scope.chkState();
                });

                  if(data[0].iEstado!=0){
                         btn_guardarCalida.prop('disabled',true);
                       }
                    modalControl.modal("show");
                } else {
                    AlertFactory.textType({
                        title: '',
                        message: 'Hubo un error al obtener la Proforma. Intente nuevamente.',
                        type: 'error'
                    });
                }
            });
        };
          $('.i-checks').iCheck({
                    checkboxClass: 'icheckbox_square-green'
                }).on('ifChanged', function (event) {
                    $(event.target).click();
                    $scope.chkState();
                });
        cCodConsecutivoOS.select2();
        $.fn.modal.Constructor.prototype.enforceFocus = function () {};
         function newControl() {
            
            modalControl.modal('show');
            titleModalControl.html('Nuevo Control de Calidad');
        }
        modalControl.on('hidden.bs.modal', function (e) {
              cleanControlCalidad();
        });
        function cleanControlCalidad(){

            titleModalControl.html("");
            cCodConsecutivoOS.val("").trigger("change");
            nConsecutivoOS.val("");
            dFechaRegistro.val("");
            iEstado.val("");
            cOtros.val("");
            btn_guardarCalida.prop('disabled',false); 
            idcontrol_calidad.val("");
            getDataForProforma();
            // datos_calidad.html("");
         $('.valcheck').prop('checked', false);
          
              $('.i-checks').iCheck({
                    checkboxClass: 'icheckbox_square-green'
                }).on('ifChanged', function (event) {
                    $(event.target).click();
                    $scope.chkState();
                });
            getDataForCalidad();     

        }


        $scope.saveControlCalidad = function()
        {
            var bval = true;
            bval = bval && cCodConsecutivoOS.required();
            bval = bval && dFechaRegistro.required();
            if(bval){

                var id_Revision =[];
                $.each($('.id_Revision'), function (idx, item) {
                    id_Revision[idx] = $(item).val();
                });
                id_Revision = id_Revision.join(',');
                console.log(id_Revision);
                var id_RevisionDet =[];
                $.each($('.id_RevisionDet'), function (idx, item) {
                    id_RevisionDet[idx] = $(item).val();
                });
                id_RevisionDet = id_RevisionDet.join(',');
                console.log(id_RevisionDet);
                var valcheck =[];
                $.each($('.valcheck'), function (idx, item) {
                     valcheck[idx] = (($(item).prop('checked')) ? 1 : 0);
                });
                valcheck = valcheck.join(',');
                var val=cCodConsecutivoOS.val();
                var totRep=val.split('*');
                nConsecutivoOS.val(totRep[1]);
             
                var params = {
                    'cCodConsecutivoOS':totRep[0],
                    'nConsecutivoOS':totRep[1],
                    'dFechaRegistro':dFechaRegistro.val(),
                    'cOtros':cOtros.val(),
                    'id_Revision':id_Revision,
                    'valcheck':valcheck,
                    'id_RevisionDet':id_RevisionDet,
                 };


               console.log(idcontrol_calidad.val());
                var id = (idcontrol_calidad.val() === '') ? 0 : idcontrol_calidad.val();
                    RESTService.updated('quality_controls/createControl', id, params, function(response) {
                    if (!_.isUndefined(response.status) && response.status) {
                       var data_p =response.res;
                       console.log("*********");
                       console.log(response.conta);
                       console.log("*********");
                       console.log(response.contb);
                       console.log("*********");

                       iEstado.val(response.estado).trigger('change');
                      
                   
                        AlertFactory.textType({
                            title: '',
                            message: 'El registro se guardó correctamente',
                            type: 'success'
                        });
                        modalControl.modal("hide");
                        LoadRecordsButtonQuality_control.click();
                        
                    } else {
                        var msg_ = (_.isUndefined(response.message)) ?
                            'No se pudo guardar el Vehiculo. Intente nuevamente.' : response.message;
                        AlertFactory.textType({
                            title: '',
                            message: msg_,
                            type: 'info'
                        });
                    }
                        
                  });
            } 
        }
        cCodConsecutivoOS.change(function () {
                var val=cCodConsecutivoOS.val();
                var totRep=val.split('*');
                nConsecutivoOS.val(totRep[1]);
        }); 
        function getDataForProforma () { 
            RESTService.all('quality_controls/data_formProf', '', function(response) {
                if (!_.isUndefined(response.status) && response.status) {
                    cCodConsecutivoOS.html("");
                     cCodConsecutivoOS.append('<option value="">Seleccionar</option>');
                     _.each(response.getTotal_Orden_total_calidad, function(item) {
                        cCodConsecutivoOS.append('<option value="'+item.cCodConsecutivo+'*'+item.nConsecutivo+'">'+item.cCodConsecutivo+' '+item.nConsecutivo+' '+item.razonsocial_cliente+' '+item.cPlacaVeh+'</option>');
                    });
                } 
            }, function() {
                getDataForProforma();
            });
        }
        function crear_data(total){
                 var html='';
                    // html +='<div class="form-group">';
                    // html +=   '<label class="col-sm-10 control-label">Estado</label>';
                    // html +=   '<div class="col-sm-1">';
                    // html +=     '<label class="checkbox-inline i-checks">';
                    // html +=       '<input type="checkbox" >';
                    // html +=     '</label>';
                    // html +=   '</div>';
                    // html +='</div>';
                   
                    var cont=1;
                    console.log(total);
                    total.map(function(index) {
                        if(cont==index.idGrupo){
                             html+='<h5 class="linea"><span>'+index.nombre+'</span></h5>';
                             cont=cont+1;
                        }
                        html +='<div class="form-group">';
                        html +=   '<label class="col-sm-10 control-label">'+index.revision+'</label>';
                        html +=   '<div class="col-sm-1">';
                        html +=     '<label class="checkbox-inline i-checks idRevision">';
                        html +=       '<input id="idDeta'+index.idRev+'" class="id_RevisionDet"  type="hidden" value="0" >';
                        html +=       '<input  class="id_Revision"  type="hidden" value="'+index.idRev+'" >';
                        html +=       '<input id="id_check'+index.idRev+'" class="valcheck"  type="checkbox" >';
                        html +=     '</label>';
                        html +=   '</div>';
                        html +='</div>';
                    });
                    datos_calidad.append(html);
                    $('.i-checks').iCheck({
                    checkboxClass: 'icheckbox_square-green'
                    }).on('ifChanged', function (event) {
                        $(event.target).click();
                        $scope.chkState();
                    });
        }
        getDataForProforma();
         function getDataForCalidad () {
            RESTService.all('quality_controls/data_form', '', function(response) {
                if (!_.isUndefined(response.status) && response.status) {
                    datos_calidad.html("");
                    var total=response.data_grupos;
                    crear_data(total);
                } 
            }, function() {
                getDataForCalidad();
            });
        }
        getDataForCalidad();

       
        
         $scope.chkState = function () {
            var txt_state2 = (w_state.prop('checked')) ? 'Activo' : 'Inactivo';
            state_state.html(txt_state2);
        };
        
        var search = getFormSearch('frm-search-Quality_control', 'search_b', 'LoadRecordsButtonQuality_control');

        var table_container_Quality_control = $("#table_container_Quality_control");

        table_container_Quality_control.jtable({
            title: "Lista de Control de Calidad",
            paging: true,
            sorting: true,
            actions: { 
                listAction: base_url + '/quality_controls/list',
                deleteAction: base_url + '/quality_controls/delete',
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
                        $scope.openDoc('quality_controls/excel', {});
                    }
                },{
                    cssClass: 'btn-danger-admin',
                    text: '<i class="fa fa-plus"></i> Nuevo Control',
                    click: function () {
                        newControl();
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
                cCodConsecutivoOS: {
                    title: 'Código',
                     

                },
                 nConsecutivoOS: {
                    title: 'Nro',
                     

                },
                 dFechaRegistro: {
                    title: 'Fecha',
                      display: function (data) {
                            return moment(data.record.dFechaRegistro).format('DD/MM/YYYY');
                    }

                },
                iEstado: {
                    title: 'Estado',
                    values: { 0: 'Registrado', 1: 'Terminado' },
                    type: 'checkbox',
                   
                },
                edit: {
                    width: '1%',
                    sorting: false,
                    edit: false,
                    create: false,
                    listClass: 'text-center',
                    display: function (data) {
                        return '<a href="javascript:void(0)" class="edit-control" data-id="'+data.record.id+'" title="Editar"><i class="fa fa-edit fa-1-5x"></i></a>';
                    }

                }

            },
           recordsLoaded: function(event, data) {
                $('.edit-control').click(function(e){
                    var id = $(this).attr('data-id');
                    findRegister_Control(id);
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

        generateSearchForm('frm-search-Quality_control', 'LoadRecordsButtonQuality_control', function(){
            table_container_Quality_control.jtable('load', {
                search: $('#search_b').val()
            });
        }, true);
    }

    function Config($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('quality_controls', {
                url: '/quality_controls',
                templateUrl: base_url + '/templates/quality_controls/base.html',
                controller: 'Quality_controlCtrl'
            });

        $urlRouterProvider.otherwise('/');
    }
})
();